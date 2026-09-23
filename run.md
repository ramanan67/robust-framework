# Manual Setup Guide: Robust Privacy-Preserving AI Model

This guide explains how to manually set up and run the system on any machine from scratch.

## 📋 Prerequisites
Before starting, ensure the target system has the following installed:
- **Python 3.10 or higher** (For the FastAPI backend and AI models)
- **Node.js 18.x or higher** (For the React/Vite frontend)
- **FFmpeg** (Recommended for image/video processing dependencies)
- **Internet Access** (To download model weights if necessary)

---

## 🛠️ Step 1: Backend Setup (Python)

The backend handles AI processing and inference using the privacy-preserving model.

1. **Open a terminal** and navigate to the project root.
2. **Move into the backend directory**:
   ```bash
   cd backend
   ```
3. **Create a virtual environment** (recommended):
   ```bash
   python -m venv venv
   ```
4. **Activate the virtual environment**:
   - **Windows**: `venv\Scripts\activate`
   - **macOS/Linux**: `source venv/bin/activate`
5. **Install all dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
6. **Start the backend server**:
   ```bash
   python main.py
   ```
   *You should see: `Uvicorn running on http://0.0.0.0:8000`.*

---

## 🎨 How to run Frontend

1. **Open a new terminal window** (keep the backend terminal running).
2. **Navigate to the project root**:
   ```bash
   cd "project robust preserving"
   ```
3. **Install frontend dependencies**:
   ```bash
   npm install
   ```
4. **Launch the development server**:
   ```bash
   npm run dev
   ```
5. **Access the application**:
   Open **http://localhost:5173** in your browser.

*Note: The frontend uses Tailwind CSS and Framer Motion for the premium UI. Ensure you have Node.js installed.*

---

## 🚀 Troubleshooting

- **Backend Connection Error**: Ensure the backend terminal is still running on port 8000.
- **Model Loading Failed**: Ensure the model file `privacy_preserving_model.pth` exists in the `saved_models` directory at the project root.
- **Port Conflict**: If port 8000 or 5173 is already in use, you can change them in `backend/main.py` (for the backend) or let Vite pick another port (for the frontend).
- **Python Version**: If you have multiple Python versions, use `python3` instead of `python` in the commands.
