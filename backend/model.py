import torch
import torch.nn as nn
from torchvision.models import resnet18

# -----------------------------------------------------------------------------
# MODEL ARCHITECTURE SKELETON
# -----------------------------------------------------------------------------
# IMPORTANT: The class definitions below MUST match the architecture 
# used when saving "privacy_preserving_model.pth".
# If the layer sizes or structure differ, load_state_dict will fail.

class PrivacyPreservingModel(nn.Module):
    def __init__(self, latent_dim=512, num_utility_classes=2, num_privacy_classes=2):
        super(PrivacyPreservingModel, self).__init__()
        
        # 1. Encoder (ResNet-based based on project description)
        # Assuming resnet18 without the final fc layer
        base_model = resnet18(pretrained=False)
        self.encoder = nn.Sequential(*list(base_model.children())[:-1]) # Output: [Batch, 512, 1, 1]
        self.latent_dim = latent_dim

        # 2. Utility Classifier
        self.utility_classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(latent_dim, 256),
            nn.ReLU(),
            nn.Linear(256, num_utility_classes)
        )

        # 3. Privacy Adversary (with Gradient Reversal Layer support)
        self.privacy_adversary = nn.Sequential(
            nn.Flatten(),
            nn.Linear(latent_dim, 256),
            nn.ReLU(),
            nn.Linear(256, num_privacy_classes)
        )

    def forward(self, x):
        features = self.encoder(x)
        latent = torch.flatten(features, 1)
        
        utility_out = self.utility_classifier(latent)
        privacy_out = self.privacy_adversary(latent)
        
        return utility_out, privacy_out

# Factory function to initialize the model
def get_model():
    model = PrivacyPreservingModel()
    return model
