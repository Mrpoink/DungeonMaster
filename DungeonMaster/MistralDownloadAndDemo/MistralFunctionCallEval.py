from Encounter_Turn import encounter
from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig, GenerationConfig
from datasets import load_dataset, Dataset
from peft import get_peft_model, LoraConfig, prepare_model_for_kbit_training, PeftModel
import intel_npu_acceleration_library
import torch
import random
import math
import json
import evaluate
import numpy as np

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

#model = torch.compile(model, backend="npu")

model.eval()

userin = ""


conversation = [{"role":"system",
                "content":"You are required to use the encounter tool if there are enemies in the room in the format {'monster': 'race','surprise':'bool','level': 'int','number': 'int'}. If someone in the party attempts to enter a different room, output [SCENE CHANGE]"}]


scenes = import_campaign("/home/mrpoink/github-repos/DungeonMaster/DungeonMaster/MistralDownloadAndDemo/Small_dungeon.json")

print(scenes)

scene ="[SCENE]: The initial room of The Dungeon of Secrets. It is a long corridor"
tools = [encounter]



while (userin != "quit"):

    scene_num = 0

    userin = input("Enter prompt: ")

    if userin == "con":
        for item in conversation:
            print(f"\n-----------\n{item}\n-----------\n")
            continue

    user_in = {"role": "user",
               "content": f"input: {scene} [ACTION]: {userin}\noutput: [OUTCOME]"}

    conversation.append(user_in)
    # format and tokenize the tool use prompt 
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
    
    transition_scores = model.compute_transition_scores(outputs.sequences, outputs.scores, outputs.beam_indices, normalize_logits=False)
    
    print(f"OUTPUT LENGTH: {len(outputs)}\n")
    
    decoded_ouput = tokenizer.decode(outputs.sequences[0], skip_special_tokens = True)
    decoded_output = decoded_ouput.split("input: ")
    probabilities = transition_scores
    print(len(decoded_output))

    num_out = 0
    for item in decoded_output:
        print(f"DECODED_OUTPUT {num_out}: {item}")
        if userin in item:
            final_output = section_string("output: ", decoded_output[num_out])
        num_out += 1

    print(f"MODEL_OUTPUT: {final_output}\n")

    if "[SCENE CHANGE]" in final_output:
        scene = choose_scene(scenes)

    if "[ENCOUNTER]" in final_output:
        print("\nENCOUNTER STARTED\n")

    if 'level' in final_output:
        if '(' in final_output:
            encounter_args = section_string('(', final_output, ')')
            print(f"ENCOUNTER ARGS: {encounter_args}")
        if '{' in final_output:
            encounter_args = section_string('{', final_output, '}')
            print(f"ENCOUNTER ARGS: {encounter_args}")

    conversation.append({"role": "assistant",
                         "content": f"{final_output}"})

def pass_fail():
    num = random.randint(0,1)
    if num == 0:
        return "Pass"
    else:
        return "Fail"

