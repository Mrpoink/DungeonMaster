import torch
print(torch.cuda.is_available())

from huggingface_hub import login

login()