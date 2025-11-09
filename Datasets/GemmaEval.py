from transformers import AutoTokenizer, AutoModelForCausalLM, Trainer, TrainingArguments, BitsAndBytesConfig, DataCollatorForLanguageModeling
from datasets import load_dataset, Dataset
import warnings
from peft import get_peft_model, LoraConfig, prepare_model_for_kbit_training, PeftModel
import torch
import json
import evaluate
import numpy as np

metric = evaluate.load('accuracy')

warnings.filterwarnings("ignore", category=UserWarning, module="peft.peft_model")

bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.bfloat16
)

lora_config = LoraConfig(
    r=8,
    lora_alpha=16,
    target_modules=["q_proj", "v_proj"],
    lora_dropout=0.05,
    bias="none",
    task_type="CAUSAL_LM"
)


tokenizer = AutoTokenizer.from_pretrained("google/gemma-3-270m")
base_model = AutoModelForCausalLM.from_pretrained(
    "google/gemma-3-270m",
    dtype = torch.bfloat16,
    device_map = "cuda"
    )
model = base_model

model.eval()


prompt = "What is the meaning of life in your opinion?"



inputs = tokenizer(prompt, return_tensors="pt").to("cuda")

with torch.no_grad():
    ouputs = base_model.generate(
        **inputs, 
    )

print(len(ouputs))

decoded_ouput = tokenizer.decode(ouputs[0], skip_special_tokens = True)

print(f"Model Output: {decoded_ouput}")
