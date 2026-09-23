from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import torch
import torch.nn.functional as F
from PIL import Image
import io
import torchvision.transforms as transforms
from model import get_model
import os

app = FastAPI()

# -----------------------------------------------------------------------------
# CONFIGURATION
# -----------------------------------------------------------------------------
# Path to the saved model
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "..", "saved_models", "privacy_preserving_model.pth")
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Global model variable
model = None

# CORS (Allow frontend access)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, set to specific frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Image Preprocessing (Standard ResNet transforms)
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

@app.on_event("startup")
async def load_model():
    """Load the model once at application startup."""
    global model
    print(f"Loading model from: {MODEL_PATH}")
    
    if not os.path.exists(MODEL_PATH):
        print(f"WARNING: Model file not found at {MODEL_PATH}. Inference will fail.")
        # We don't raise an error here to keep the server running, but endpoints will fail.
        return

    try:
        # 1. Initialize logic structure
        model = get_model()
        model.to(DEVICE)
        
        # 2. Load state dictionary
        state_dict = torch.load(MODEL_PATH, map_location=DEVICE)
        model.load_state_dict(state_dict)
        
        # 3. Set to eval mode
        model.eval()
        print("Model loaded successfully and set to eval mode.")
        
    except Exception as e:
        print(f"ERROR: Failed to load model. {e}")
        # In a real app, you might want to exit here, but we'll keep running to show errors.

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    """
    Inference endpoint.
    Expects an image file.
    Returns JSON with predictions.
    """
    global model
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")

    # 1. Validate file type
    if file.content_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(status_code=400, detail="Invalid file type. Only JPEG and PNG allowed.")

    try:
        # 2. Read and preprocess image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        input_tensor = transform(image).unsqueeze(0).to(DEVICE)

        # 3. Run Inference without gradient calculation
        with torch.no_grad():
            utility_logits, privacy_logits = model(input_tensor)
            
            # Post-process outputs (e.g., Softmax/Argmax)
            utility_prob = F.softmax(utility_logits, dim=1)
            privacy_prob = F.softmax(privacy_logits, dim=1)
            
            utility_pred_idx = torch.argmax(utility_prob, dim=1).item()
            privacy_pred_idx = torch.argmax(privacy_prob, dim=1).item()

        # 4. Map indices to labels (Assume binary for now based on prompt examples)
        utility_labels = ["Not Smiling", "Smiling"] # Example utility
        privacy_labels = ["Male", "Female"] # Example privacy sensitive attribute
        
        # Safe access
        u_label = utility_labels[utility_pred_idx] if utility_pred_idx < len(utility_labels) else str(utility_pred_idx)
        p_label = privacy_labels[privacy_pred_idx] if privacy_pred_idx < len(privacy_labels) else str(privacy_pred_idx)

        return {
            "utility_prediction": u_label,
            "privacy_prediction": p_label,
            "privacy_note": "Sensitive attribute prediction may be intentionally inaccurate"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Inference failed: {str(e)}")

@app.get("/")
def read_root():
    return {"status": "Backend is running", "model_loaded": model is not None}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
