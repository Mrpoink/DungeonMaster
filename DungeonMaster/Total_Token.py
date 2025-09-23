from transformers import AutoTokenizer, AutoModelForCausalLM, Trainer, TrainingArguments, BitsAndBytesConfig, DataCollatorForLanguageModeling, EarlyStoppingCallback
from datasets import load_dataset, Dataset, concatenate_datasets
from peft import get_peft_model, LoraConfig, prepare_model_for_kbit_training
import torch
import json
import evaluate
import numpy as np

dataset3 = load_dataset('csv', data_files='DungeonMaster/Datasets/Scene_Action_Outcome.csv')
dataset2 = load_dataset('csv', data_files='DungeonMaster/Datasets/Action_Check.csv')

dataset3 = dataset3['train'].rename_columns({
    'input: [SCENE]: scene_context [ACTION]: player_input [CHECK]: check_required [PASS/FAIL]: outcome_type' : 'input',
    'output: [OUTCOME]: outcome_description' : 'output'
})

dataset2 = dataset2['train'].rename_columns({
    'input:  [ACTION]: player_input' : 'input', 
    'output: [CHECK]: check_required' : 'output'
})

dataset = concatenate_datasets([dataset3, dataset2])


def format_data(examples):
    return {"text": [
        f"input: {d_in}\noutput: {d_out}" for d_in, d_out in zip(examples['input'], examples['output'])
    ]}

tokenizer = AutoTokenizer.from_pretrained("mistralai/Mistral-7B-Instruct-v0.3")

def tokenize_function(examples):
    tokenized = tokenizer(examples["text"]) 
    return tokenized

formatted_dataset = dataset.map(format_data, batched=True)
tokenized_dataset = formatted_dataset.map(tokenize_function, batched=True)


tokens = 0
for split in tokenized_dataset:
    tokens += len(split["input_ids"])

print(f"Total tokens in the dataset: {tokens}")


def find_quickest_setup(total_tokens):
    total_time = 0
    steps = 999999999999999999
    for z in range(1, 512):
        this_it = ((total_tokens/(32 * z)) * 32)

    if this_it < steps:
        steps = this_it
        print(f"Epochs: 32 Batches: 32 Gradient: {z}")

    print("Best it steps: " + str(steps))
    print("Total time: " + str((((steps * 0.08)/60)/60)) + " Hours")

find_quickest_setup(tokens)

new_time = ((tokens / (32 * 31)) * 20)
new_time_hours = (((new_time/60)/60))

print("New time: " + str(new_time_hours))
