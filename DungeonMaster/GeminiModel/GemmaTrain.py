from transformers import AutoTokenizer, AutoModelForCausalLM, Trainer, TrainingArguments, BitsAndBytesConfig, DataCollatorForLanguageModeling
from datasets import load_dataset, Dataset
from peft import get_peft_model, LoraConfig, prepare_model_for_kbit_training
import torch
import json
import evaluate
import numpy as np

with open("Prompts.json", "r") as f:
    data = json.load(f)

# 2. Convert to Hugging Face Dataset
dataset = Dataset.from_dict({"text": [
    f"input: {d['input']}\noutput: {d['output']}" for d in data
]})

print(dataset)

metric = evaluate.load('accuracy')

def compute_metrics(eval_prediction):
    logits, labels = eval_prediction

    predictions = np.argmax(logits, axis=-1)

    return metric.compute(predictions=predictions, references=labels)

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
model = AutoModelForCausalLM.from_pretrained("google/gemma-3-270m")
model = prepare_model_for_kbit_training(model)
model.gradient_checkpointing_enable()
model = get_peft_model(model, lora_config)

def tokenize_function(examples):
    tokenized = tokenizer(examples["text"])
    return tokenized

tokenized_dataset = dataset.map(tokenize_function, batched=True)
split_dataset = tokenized_dataset.train_test_split(test_size=0.1)
data_collator = DataCollatorForLanguageModeling(tokenizer=tokenizer, mlm=False)


training_args = TrainingArguments(
    output_dir = "prompt_classifier",
    eval_strategy= 'epoch',
    push_to_hub=False,
    per_device_train_batch_size=2,
    num_train_epochs=16,
    gradient_accumulation_steps=32,
    fp16=True,
    report_to=None
)

trainer = Trainer(
    model = model,
    args = training_args,
    train_dataset=split_dataset['train'],
    eval_dataset=split_dataset['test'],
    data_collator=data_collator
)

torch.cuda.empty_cache()

trainer.train()

