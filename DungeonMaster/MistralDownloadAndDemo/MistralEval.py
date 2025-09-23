from transformers import AutoTokenizer, AutoModelForCausalLM, Trainer, TrainingArguments, BitsAndBytesConfig, DataCollatorForLanguageModeling
from datasets import load_dataset, Dataset
from peft import get_peft_model, LoraConfig, prepare_model_for_kbit_training, PeftModel
import torch
import json
import evaluate
import numpy as np

torch.cuda.empty_cache()
metric = evaluate.load('accuracy')


bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.bfloat16,
    llm_int8_enable_fp32_cpu_offload=True
)

lora_config = LoraConfig(
    r=8,
    lora_alpha=16,
    target_modules=["q_proj", "v_proj"],
    lora_dropout=0.05,
    bias="none",
    task_type="CAUSAL_LM"
)


tokenizer = AutoTokenizer.from_pretrained("mistralai/Mistral-7B-Instruct-v0.3")
base_model = AutoModelForCausalLM.from_pretrained(
    "mistralai/Mistral-7B-Instruct-v0.3",
    quantization_config = bnb_config,
    dtype = torch.bfloat16
    )
model = PeftModel.from_pretrained(base_model, "/home/mrpoink/github-repos/DungeonMaster/DungeonMaster/prompt_classifier_mistral/checkpoint-5733")

model.eval()


prompt = "input: [SCENE]: The party is in a bar and there is a magical item in the bar on the third floor. [ACTION] I try to seduce the barkeep.\noutput:"



inputs = tokenizer(prompt, return_tensors="pt").to("cuda")

with torch.no_grad():
    ouputs = model.generate(
        **inputs,
        max_new_tokens = 128
    )

decoded_ouput = tokenizer.decode(ouputs[0], skip_special_tokens = True)

print(decoded_ouput)
