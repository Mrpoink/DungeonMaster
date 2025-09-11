from datasets import load_dataset, Dataset
import torch
from transformers import AutoTokenizer, TrainingArguments, AutoModelForSequenceClassification, Trainer, BitsAndBytesConfig
from peft import get_peft_model, LoraConfig, prepare_model_for_kbit_training
import numpy as np
import evaluate
import csv

reader = csv.reader('DungeonMaster/Datasets/Prompts2.csv')

def csv_reader(file_name):

    overall_dict = {}

    with open(file_name, 'r', encoding='utf-8') as file:

        reader = csv.reader(file)

        #print(next(reader))

        headers = next(reader)

        #print(headers)


        #7 = attack, 0 = name, 1 = level
        spell_name_list = []

        current_num = 0

        for row in reader:

            current_num += 1
                
            spell = {}

            for i in range(0, len(headers)):

                spell[str(headers[i])] = str(row[i])

            overall_dict[str(current_num)] = spell

        #print(spell_name_list)
    
    return overall_dict

data  = csv_reader('DungeonMaster/Datasets/Prompts2.csv')

dataset = Dataset.from_csv('DungeonMaster/Datasets/Prompts2.csv')

print(dataset[1])

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

model = AutoModelForSequenceClassification.from_pretrained("mistralai/Mistral-7B-v0.3", num_labels=4, device_map='auto', quantization_config=BitsAndBytesConfig(load_in_4bit=True))
model = prepare_model_for_kbit_training(model)
model.gradient_checkpointing_enable()

lora_config = LoraConfig(
    r=8,
    lora_alpha=16,
    target_modules=["q_proj", "v_proj"],
    lora_dropout=0.05,
    bias="none",
    task_type="SEQ_CLS"
)

model = get_peft_model(model, lora_config)

training_args = TrainingArguments(
    output_dir = "prompt_classifier",
    eval_strategy= 'epoch',
    push_to_hub=False,
    per_device_train_batch_size=1,
    num_train_epochs=1,
    gradient_accumulation_steps=1,
    fp16=True
)

trainer = Trainer(
    model = model,
    args = training_args,
    train_dataset=dataset[0],
    eval_dataset=dataset[1],
    compute_metrics=compute_metrics
)

trainer.train()
