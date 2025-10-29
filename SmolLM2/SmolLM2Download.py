from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

model_id = "HuggingFaceTB/SmolLM2-360M-Instruct"

# Load the tokenizer
tokenizer = AutoTokenizer.from_pretrained(model_id, trust_remote_code=True)

# Load the model
# Use 'cuda' for GPU, or other devices as appropriate
device = "cuda"
model = AutoModelForCausalLM.from_pretrained(
    model_id,
    device_map=device,
    trust_remote_code=True,
)

# The model will download automatically when this code is executed.
print("Model and tokenizer downloaded successfully.")