from transformers import AutoTokenizer, AutoModelForCausalLM, Trainer, TrainingArguments, BitsAndBytesConfig, DataCollatorForLanguageModeling
from datasets import load_dataset, Dataset
from peft import get_peft_model, LoraConfig, prepare_model_for_kbit_training, PeftModel
import torch
import json
import evaluate
import numpy as np

metric = evaluate.load('accuracy')


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
    quantization_config = bnb_config,
    torch_dtype = torch.bfloat16,
    device_map = "auto"
    )
model = PeftModel.from_pretrained(base_model, "prompt_classifier/checkpoint-4032")

model.eval()


prompt = "input: I attempt to pickpocket the guard in the alley.\noutput:"



inputs = tokenizer(prompt, return_tensors="pt").to("cuda")

with torch.no_grad():
    ouputs = model.generate(
        **inputs,
        max_new_tokens = 256
    )

decoded_ouput = tokenizer.decode(ouputs[0], skip_special_tokens = True)

print(decoded_ouput)
