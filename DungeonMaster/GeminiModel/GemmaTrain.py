from transformers import AutoTokenizer, AutoModelForCausalLM, Trainer, TrainingArguments, BitsAndBytesConfig, DataCollatorForLanguageModeling, EarlyStoppingCallback
from datasets import load_dataset, Dataset, concatenate_datasets
from peft import get_peft_model, LoraConfig, prepare_model_for_kbit_training
import torch
import json
import evaluate
import numpy as np
torch.cuda.empty_cache()

dataset2 = load_dataset('csv', data_files='DungeonMaster/Datasets/Action_Check_Outcome.csv')
dataset3 = load_dataset('csv', data_files='DungeonMaster/Datasets/Scene_Action_Outcome.csv')
dataset5 = load_dataset('csv', data_files='DungeonMaster/Datasets/Action_Check.csv')
dataset6 = load_dataset('csv', data_files='DungeonMaster/Datasets/Scene_Action_Check.csv')

dataset2 = dataset2['train'].rename_columns({
    'input:  [ACTION]: player_input [CHECK]: check_required [PASS/FAIL]: outcome_type' : 'input',
    'output: [OUTCOME]: outcome_description' : 'output'
})
dataset3 = dataset3['train'].rename_columns({
    'input: [SCENE]: scene_context [ACTION]: player_input [CHECK]: check_required [PASS/FAIL]: outcome_type' : 'input',
    'output: [OUTCOME]: outcome_description' : 'output'
})
dataset5 = dataset5['train'].rename_columns({
    'input:  [ACTION]: player_input' : 'input',
    'output: [CHECK]: check_required' : 'output'
})
dataset6 = dataset6['train'].rename_columns({
    'input: [SCENE]: scene_context [ACTION]: player_input' : 'input',
    'output: [CHECK]: check_required' : 'output'
})

dataset = concatenate_datasets([dataset2, dataset3, dataset5])


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
    print(examples)
    tokenized = tokenizer(examples["text"])
    return tokenized

formatted_dataset = dataset.map(format_data, batched=True)
tokenized_dataset = formatted_dataset.map(tokenize_function, batched=True)
split_dataset = tokenized_dataset.train_test_split(test_size=0.1)
data_collator = DataCollatorForLanguageModeling(tokenizer=tokenizer, mlm=False)


training_args = TrainingArguments(
    output_dir = "prompt_classifier",
    eval_strategy= 'epoch',
    save_strategy='epoch',
    load_best_model_at_end=True,
    metric_for_best_model='loss',
    push_to_hub=False,
    per_device_train_batch_size=3,
    num_train_epochs=512, #<----------REPLACE WITH 32!!!!
    gradient_accumulation_steps=128,
    fp16=True,
    report_to=['tensorboard']
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

output_log_file = "training_logs.txt"

with open(output_log_file, "w") as f:
    for log_entry in log_history:
        f.write(str(log_entry) + "\n")

print(f"Training logs saved to {output_log_file}")
