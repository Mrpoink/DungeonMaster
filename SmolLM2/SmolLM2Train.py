from transformers import AutoTokenizer, AutoModelForCausalLM, Trainer, TrainingArguments, BitsAndBytesConfig, DataCollatorForLanguageModeling, EarlyStoppingCallback, AddedToken
from datasets import load_dataset, Dataset, concatenate_datasets
from peft import get_peft_model, LoraConfig, prepare_model_for_kbit_training
from torch.distributed.fsdp import FullyShardedDataParallel as FSDP
from torch.distributed.fsdp.wrap import wrap
import torch.distributed as dist
import torch
import json
import os
import math
import evaluate
import numpy as np
import pandas as pd
from datasets import Dataset, concatenate_datasets

torch.cuda.empty_cache()


df3 = pd.read_csv('Datasets/Scene_Action_Outcome.csv')
df4 = pd.read_csv('Datasets/Scene_Action_Check.csv')

df3.columns = df3.columns.str.strip()
df4.columns = df4.columns.str.strip()

rename_dict3 = {
    '|user|:[/EXTRA INFO]: info from vector database[/PLAYER]: character_backstory [/ACTION]: player_input[/CHECK]: check_required[/PASS/FAIL]: outcome_type|end|' : 'input',
    '|assistant|: [/GENERATED OUTCOME]: outcome_description|end|' : 'output'
}

rename_dict4 = {
    '|user|:[/EXTRA INFO]: info from vector database[/PLAYER]: character_backstory [/ACTION]: player_input|end|' : 'input',
    '|assistant|: [/GENERATED CHECK]: check_required|end|' : 'output'
}

df3.rename(columns=rename_dict3, inplace=True)
df4.rename(columns=rename_dict4, inplace=True)

combined_df = pd.concat([df3, df4], ignore_index=True)

dataset = Dataset.from_pandas(combined_df)

def format_data(examples):
    return {"text": [
        f"input: {d_in}\noutput: {d_out}" for d_in, d_out in zip(examples['input'], examples['output'])
    ]}

formatted_dataset = dataset.map(format_data, batched=True)

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
    r=16,
    lora_alpha=32,
    lora_dropout=0.05,
    bias="none",
    task_type="CAUSAL_LM",
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj",
                        "gate_proj", "up_proj", "down_proj"]
)


tokenizer = AutoTokenizer.from_pretrained("SmolLM2\SmolTokenizer")
#quantization_config=bnb_config
if tokenizer.pad_token is None:
    tokenizer.pad_token = tokenizer.eos_token
model = AutoModelForCausalLM.from_pretrained("HuggingFaceTB/SmolLM2-360M-Instruct", attn_implementation='eager' )
model.resize_token_embeddings(len(tokenizer))
model = prepare_model_for_kbit_training(model)
model.gradient_checkpointing_enable()
model = get_peft_model(model, lora_config)

def tokenize_function(examples):
    tokenized = tokenizer(examples["text"], padding="max_length", truncation=True, max_length=750)
    return tokenized

formatted_dataset = dataset.map(format_data, batched=True)
tokenized_dataset = formatted_dataset.map(tokenize_function, batched=True)
split_dataset = tokenized_dataset.train_test_split(test_size=0.2)
data_collator = DataCollatorForLanguageModeling(tokenizer=tokenizer, mlm=False)


training_args = TrainingArguments(
    output_dir = "prompt_classifier_Smol",
    eval_strategy= 'epoch',
    save_strategy='epoch',
    load_best_model_at_end=True,
    metric_for_best_model='loss',
    push_to_hub=False,
    per_device_train_batch_size=4,
    num_train_epochs=16, #<----------REPLACE WITH 32!!!!
    gradient_accumulation_steps=4,
    report_to=['tensorboard'],
    learning_rate = 2e-4,
    lr_scheduler_type="cosine",
    ddp_find_unused_parameters=False
)

trainer = Trainer(
    model = model,
    args = training_args,
    train_dataset=split_dataset['train'],
    eval_dataset=split_dataset['test'],
    data_collator=data_collator,
    callbacks=[EarlyStoppingCallback(early_stopping_patience=5)]
)



trainer.train()

log_history = trainer.state.log_history

output_log_file = "training_logs_smol.txt"

with open(output_log_file, "w") as f:
    for log_entry in log_history:
        f.write(str(log_entry) + "\n")

print(f"Training logs saved to {output_log_file}")
