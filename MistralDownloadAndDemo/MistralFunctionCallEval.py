from Encounter_Turn import encounter
from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig
from peft import get_peft_model, LoraConfig, prepare_model_for_kbit_training, PeftModel
import torch
import random
import json
import evaluate
import numpy as np
import sys
import os
import asyncio
import time
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

sys.path.append(project_root)

import vector_database as vector_database



def import_campaign(json_file):
    with open(json_file, 'r') as file:
        data = json.load(file)
    
    return data

def find_average(data_list):
    
    total = 0

    for item in data_list:
        total += item

    return total/len(data_list)

def get_return_output(outputs, probs):
    num_items = len(probs)
    top_prob = 0

    for i in range(num_items):
        probs[i] = probs[i] * -1

        if probs[i] > top_prob:
            top_prob = i

    return outputs[i]

def section_string(start_phrase, initial_string, end_string = None):

    if end_string:
        initial_string = initial_string.split(start_phrase)
        final_string = initial_string[1].split(end_string)

        return final_string


    final_string = initial_string.split(start_phrase)

    return final_string[len(final_string) -1]

def choose_scene(scene_list):
    num = random.randint(0, len(scene_list)-1)

    return scene_list[num]

#torch.cuda.empty_cache()
metric = evaluate.load('accuracy')


bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.bfloat16,
    llm_int8_enable_fp32_cpu_offload=True
)



tokenizer = AutoTokenizer.from_pretrained("mistralai/Mistral-7B-Instruct-v0.3")
base_model = AutoModelForCausalLM.from_pretrained(
    "mistralai/Mistral-7B-Instruct-v0.3",
    quantization_config = bnb_config,
    dtype = torch.bfloat16,
    device_map="cuda",
    )

model = PeftModel.from_pretrained(base_model, "/home/mrpoink/github-repos/DungeonMaster_Research/prompt_classifier_mistral/checkpoint-5980")

#model = torch.compile(model, backend="npu")

model.eval()

tools = []

end_time = 0

async def main():

    print(f"Model is on device: {next(model.parameters()).device}")
    

    seed = random.randint(20, 65)

    print(type(seed))

    userin = ""


    scenes = import_campaign("/home/mrpoink/github-repos/DungeonMaster_Research/MistralDownloadAndDemo/Small_dungeon.json")

    conversation = [{"role": "system", "content":"<\s>Each message begins with <\s> and ends with </s>, your output MUST contain [/OUTCOME] </s>"}]


    scene ="[/SCENE]: The initial room of The Dungeon of Secrets. It is a long corridor"

    vb = vector_database.get_from_db()

    await vb.connect()

    await vb.add_session('all-MiniLM-L6-v2', scene, seed)

    player_order = ["Nema", "Soma", "Finklfich"]

    player_num = 0

    while (userin != "quit"):
        torch.cuda.empty_cache()
        start_time = time.time()
        player_num += 1

        if player_num == 3:
            player_num = 1

        userin = input(f"{player_order[player_num]} Enter prompt: ")

        print(userin)
        
        similarities = await vb.best_result(0.0,'all-MiniLM-L6-v2', userin, seed)

        extra_info = ""

        initial_confidence = 0.0

        for item in similarities:

            name, entry, confidence = item

            text = entry['text']

            userin_list = userin.split(' ')

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

                extra_info = f"[/{name.replace("VECTOR", "")}], {entry['text']},"

            else:
                print(name)

        user_in = f"[/PLAYER]: {player_order[player_num]}. {scene} [/ACTION]: {userin}"
        
        
        
        await vb.add_session('all-MiniLM-L6-v2', str(user_in), seed)

        user_in = "<\s>" + user_in + f"\n [/EXTRA INFO]: {extra_info}" + "</s>"
        print(user_in)
        
        conversation.append({'role':'user', 'content':user_in})

        inputs = tokenizer.apply_chat_template(
                    conversation,
                    tools=tools,
                    add_generation_prompt=True,
                    return_dict=True,
                    return_tensors="pt",
        )

        inputs.to(model.device)
        outputs = model.generate(
            **inputs, 
            max_new_tokens = 256,
            num_beams=2,
            num_return_sequences=2,
            return_dict_in_generate=True,
            output_scores=True,
            do_sample=True,
            top_p = 0.5) #WAS 0.5
        
        decoded_ouput = tokenizer.decode(outputs.sequences[0], skip_special_tokens = True)
        decoded_output = decoded_ouput.replace(user_in, "")
        decoded_output = decoded_output.split("[/OUTCOME]:")
        print(len(decoded_output))

        end_time = time.time()

        print(f"\n---------\n{decoded_ouput}\n--------------\n")

        final_output = decoded_output[1]

        model_out = {"role": "assistant",
                            "content": f"<\s>{final_output}</s>"}
        
        await vb.add_session('all-MiniLM-L6-v2', str(model_out), seed)

        print(f"MODEL_OUTPUT: {final_output}\n")
        print(f"Total time: {end_time - start_time}")

        conversation.append(model_out)
        conversation.pop(0)

        

def pass_fail():
    num = random.randint(0,1)
    if num == 0:
        return "Pass"
    else:
        return "Fail"

asyncio.run(main())