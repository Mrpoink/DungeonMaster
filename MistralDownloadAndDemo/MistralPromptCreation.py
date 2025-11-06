from transformers import AutoTokenizer, AutoModelForCausalLM, Trainer, TrainingArguments, BitsAndBytesConfig, DataCollatorForLanguageModeling
from datasets import load_dataset, Dataset
from peft import get_peft_model, LoraConfig, prepare_model_for_kbit_training, PeftModel
import torch
import json
import evaluate
import numpy as np
import random
import csv
import sys
import os
import asyncio



# You are an expert Dungeon Master known for your improvisational skill and engaging narrative style. Your primary rule is "Yes, and..."\n

# The following is a structured input from a D&D scenario:\n
# Your task is to rewrite the final outcome to be more interesting, using the "Yes, and" principle. \n
# This means confirming the player's success AND immediately introducing a new complication, new information, or a choice for the player.\n

# ---
# [SCENARIO]
# Scene Context: [Paste the content of /EXTRA INFO]
# Player: [Paste the content of /PLAYER]
# Action: [Paste the content of /ACTION]
# Check Passed: [Paste the content of /CHECK]

# [EXISTING OUTCOME]
# [Paste the current content of /GENERATED OUTCOME]
# ---

# Rewrite ONLY the [EXISTING OUTCOME] content, making it a "Yes, and" outcome. Do not include any other text or tags. The rewritten outcome must be descriptive and end with a hook or a choice.


#|user|:[/EXTRA INFO]: ITEMS {'id': 2628 'text': 'Mithral Chain Shirt has  Rarity : Uncommon Attunement : No Cost (gp) : 1733 Armor Cost : 50 Rare Material : Mithral MatCost : 1050'} [/PLAYER]: character_backstory [/ACTION]: player_input[/CHECK]: check_required[/PASS/FAIL]: outcome_type|end|,|assistant|: [/GENERATED OUTCOME]: outcome_description|end|

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
model = base_model

model.eval()

def create_prompt(info, player, scene, action, check, pass_fail, outcome):

    prompt = f"" \
    "You are an expert Dungeon Master known for your improvisational skill and engaging narrative style. Your primary rule is 'Yes, and...'\n" \
    "The following is a structured input from a D&D scenario:\n" \
    "Your task is to rewrite the final outcome to be more interesting, using the 'Yes, and' principle. \n" \
    "This means confirming the player's success AND immediately introducing a new complication, new information, or a choice for the player.\n" \
    "\n" \
    "---\n" \
    "[SCENARIO]\n" \
    f"Info From a Vector DB: {info} \n" \
    f"Scene Context: {scene} \n" \
    f"Player: {player} \n" \
    f"Action: {action} \n" \
    f"Check: {check} \n" \
    f"Check Passed: {pass_fail} \n" \
    "\n" \
    "[EXISTING OUTCOME]:\n" \
    f"{outcome}\n" \
    "---\n" \
    "\n" \
    "Rewrite ONLY the [EXISTING OUTCOME] content, making it a 'Yes, and' outcome. Do not include any other text or tags. The rewritten outcome must be descriptive and end with a hook or a choice.\n"
    return prompt

def csv_to_prompt(filename, extra_info_list):

    data_list = []
    
    with open(filename, 'r', newline='') as file:
        
        number = 0
        csv_reader = csv.reader(file)
        for row in csv_reader:
            if len(row) < 7:
                print(row)
                print("error")
            print(number)

            if row[4] == "None":
                row[4] = "[NO_CHECK]"

            else:
                prompt = create_prompt(
                    random.choice(extra_info_list),
                    row[1],
                    row[2],
                    row[3],
                    row[4],
                    row[5],
                    row[6]
                )

            data_list.append(prompt)
            number+=1

    return data_list

def outputs_from_prompt(prompt_list):

    output_list = []

    for prompt in prompt_list:

        inputs = tokenizer(prompt, return_tensors="pt").to("cuda")

        with torch.no_grad():
            ouputs = base_model.generate(
                **inputs, 
                max_new_tokens=512
            )

        print(len(ouputs))

        decoded_ouput = tokenizer.decode(ouputs[0], skip_special_tokens = True)

        real_output = decoded_ouput.replace(prompt, "")
        real_output = real_output.split('[REWRITTEN OUTCOME]:')[1].strip()
        real_output = real_output.replace('---','').strip()

        output_list.append(real_output)

    print(f"Model Output: {output_list}")
    return output_list

def read_csv(filename):
    
    data_list = []
    
    with open(filename, 'r', newline='') as file:
        
        csv_reader = csv.reader(file)
        for row in csv_reader:
            data_list.append(row)
    return data_list

def returned_output_to_csv(output_list, filename):

    with open(filename, 'w', newline='') as file:
        csv_writer = csv.writer(file)

        for output in output_list:
            csv_writer.writerow([output])


extra_info_list = read_csv('extra_info.csv')
prompt_list = csv_to_prompt('Datasets/Prompts.csv', extra_info_list)
output_list = outputs_from_prompt(prompt_list)
returned_output_to_csv(output_list, 'Mistral_Eval_Output.csv')
