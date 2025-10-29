from transformers import AutoTokenizer, AutoModelForCausalLM, Trainer, TrainingArguments, BitsAndBytesConfig, DataCollatorForLanguageModeling
from datasets import load_dataset, Dataset
import warnings
from peft import get_peft_model, LoraConfig, prepare_model_for_kbit_training, PeftModel
import torch
import asyncio
import json
import evaluate
import random
import numpy as np
import sys
import os
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

sys.path.append(project_root)

import vector_database

metric = evaluate.load('accuracy')

warnings.filterwarnings("ignore", category=UserWarning, module="peft.peft_model")



def section_string(initial : str, beginning : str, ending : str):
    first_section = initial.split(beginning)
    final = first_section[1].split(ending)

    return final[0]

def remove_parts(initial : str):
    sections = initial.split("[")
    if "|" in sections[0]:
        sections = sections[0].split("|")
    final = sections[0]

    return final


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

def def_model():
    torch.cuda.empty_cache()
    tokenizer = AutoTokenizer.from_pretrained("SmolLM2/SmolTokenizer")
    base_model = AutoModelForCausalLM.from_pretrained(
        "HuggingFaceTB/SmolLM2-360M-Instruct",
        dtype = torch.bfloat16,
        device_map = "cuda"
        )
    model = base_model

    model.to("cuda")

    model.eval()

    model=torch.compile(model)
    torch.cuda.empty_cache()

    return model, tokenizer


async def model_output(userin : str, model, tokenizer):
    torch.cuda.empty_cache()
    inputs = tokenizer(userin, return_tensors="pt", padding=True).to("cuda")

    with torch.no_grad():
        outputs = model.generate(
            **inputs, 
            max_new_tokens = 256,
            num_beams=2,
            num_return_sequences=1,
            return_dict_in_generate=True,
            output_scores=True,
            do_sample=True,
            # top_p = .65,
            # top_k = 40,
            # pad_token_id=tokenizer.eos_token_id,
            # eos_token_id=tokenizer.eos_token_id,
            repetition_penalty = 3.3
            #temperature = 0.85
            )
    decoded_ouput = tokenizer.decode(outputs[0][0], skip_special_tokens = True)
    print(decoded_ouput)
    final_output = decoded_ouput.split('[/GENERATED OUTCOME]:')
    final_output = final_output[1].split('|end|')
    print(len(final_output))
    
    torch.cuda.empty_cache()

    return final_output[0]

async def model_output_check(userin : str, model, tokenizer):
    torch.cuda.empty_cache()
    inputs = tokenizer(userin, return_tensors="pt", padding=True).to("cuda")

    with torch.no_grad():
        outputs = model.generate(
            **inputs, 
            max_new_tokens = 256,
            num_beams=2,
            num_return_sequences=1,
            return_dict_in_generate=True,
            output_scores=True,
            do_sample=True,
            # top_p = .65,
            # top_k = 40,
            # pad_token_id=tokenizer.eos_token_id,
            # eos_token_id=tokenizer.eos_token_id,
            repetition_penalty = 3.3
            # temperature = 0.85
            )
    decoded_ouput = tokenizer.decode(outputs[0][0], skip_special_tokens = True)
    print(decoded_ouput)
    final_output = decoded_ouput.split('[/GENERATED CHECK]:')
    final_output = final_output[1].split('|end|')
    print(len(final_output))
    
    torch.cuda.empty_cache()

    
    return final_output[0]


async def final_prompt(prompt : str, vb, seed : int, turn_num : int):

    similarities = await vb.best_result(0.0,'all-MiniLM-L6-v2', prompt, seed)


    extra_info = ""

    initial_confidence = 0.0

    for item in similarities:
        name, entry, confidence = item
        text = entry['text']

        userin_list = prompt.split(' ')
        text_split = text.split(' ')

        is_in = False

        for item in userin_list:
            if item not in text_split:
                continue
            else:
                is_in = True

        if is_in == False:
            continue

        if confidence > initial_confidence and (name != "SESSION"):
            print(name)
            initial_confidence = confidence
            extra_info = f"{extra_info} {name} {entry['text']},"

        elif ((confidence > initial_confidence) and (name == "SESSION")) or (turn_num != 0):
            print(name)
            initial_confidence = confidence
            extra_info = f"{extra_info} {name} {entry['text']},"

    final_input = f"|user|: [/EXTRA INFO]: {extra_info} {prompt}"
    print(final_input)

    return final_input


#'all-MiniLM-L6-v2' 


class DungeonMaster:

    check = False

    def __init__(self):
        self.turn_num = 0
        
        self.vb = None
        
    @classmethod
    async def create_dm(cls):
        
        instance = cls()

        instance.model, instance.tokenizer = def_model()

        instance.vb = vector_database.get_from_db()
        await instance.vb.connect()
        instance.seed = await instance.vb.get_session_id() + 1
        print("Seed: ", instance.seed)
        await instance.vb.add_session('all-MiniLM-L6-v2', "start of session", instance.seed)

        instance.check = None #If false, check required, else generate outcome

        return instance
    
    @classmethod
    async def create_backend(cls):
        instance = cls()

        instance.bvb = vector_database.use_vector_db()
        await instance.bvb.connect()

        return instance
        

    async def model_output(instance, userin : str):

        print("running check script")

        scene = "[/SCENE]: The well known streets of Zanzebar"

        prompt = f"{scene} [/ACTION]: {userin}"

        final_input = await final_prompt(prompt, instance.vb, instance.seed, instance.turn_num)

        final_input = f"{final_input} |end|\n|assistant|: [/GENERATED CHECK]:"

        print("final input: ", final_input, "\n--------------\n")

        modelOut = await model_output_check(final_input, instance.model, instance.tokenizer)

        await instance.vb.add_session('all-MiniLM-L6-v2', str(f"|user| {prompt}"), instance.seed)

        await instance.vb.add_session('all-MiniLM-L6-v2', str(f"{modelOut}"), instance.seed)

        instance.check = modelOut

        instance.turn_num += 1

        return modelOut
    
    
    async def model_output_check(instance, userin : str, pass_fail):

        print("running script WITH check")

        scene = "[/SCENE]: The well known streets of Zanzebar"

        prompt = f"{scene} [/ACTION]: {userin} [/CHECK]: {instance.check} [/PASS/FAIL]: {pass_fail}"

        

        final_input = await final_prompt(prompt, instance.vb, instance.seed, instance.turn_num)

        final_input = f"{final_input}  |end|\n|assistant|: [/GENERATED OUTCOME]:"

        print("Final input: ", final_input, "\n------------\n")

        modelOut = await model_output(final_input, instance.model, instance.tokenizer)

        await instance.vb.add_session('all-MiniLM-L6-v2', str(f"|user| {prompt}"), instance.seed)

        await instance.vb.add_session('all-MiniLM-L6-v2', str(f"{modelOut}"), instance.seed)

        instance.turn_num +=1 

        return modelOut


    async def add_user_data(instance, name, username, password):

        await instance.bvb.add_user_data(name, username, password)

        return "added data"
    
    async def check_creds(instance, username, password):

        result = await instance.bvb.check_user_data(username, password)

        print("From backend: ", result)

        return result

    
