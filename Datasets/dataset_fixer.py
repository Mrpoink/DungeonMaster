import csv
import json
import asyncio
import random
from vector_database import get_from_db

async def csv_to_SAC(filename):

    data_list = []
    
    with open(filename, 'r', newline='') as file:

        special_tokens = []
        
        number = 0
        csv_reader = csv.reader(file)
        extra_info = await make_random_list()
        for row in csv_reader:
            if len(row) < 7:
                print(row)
                print("error")
            print(number)

            if row[4] not in special_tokens:
                special_tokens.append(row[4])

            if row[4] == "None":

                input_string = "|user|:" + "[/EXTRA INFO]: " + random.choice(extra_info)  + "[/PLAYER]: " + row[1] + " [/ACTION]: " + row[3] +"|end|"
                output_string = "|assistant|:" + " [/GENERATED OUTCOME]: "+row[6]  + "|end|"
            else:
                input_string = "|user|:" + "[/EXTRA INFO]: " + random.choice(extra_info)   + "[/PLAYER]: " + row[1] + " [/ACTION]: " + row[3] +"|end|"
                output_string = "|assistant|:" + " [/GENERATED OUTCOME]: Roll for "+row[4]  + "|end|"

            total_list = [input_string, output_string]
            data_list.append(total_list)
            number+=1

    print(special_tokens)

    return data_list

async def csv_to_SAO(filename):

    data_list = []
    
    with open(filename, 'r', newline='') as file:
        
        number = 0
        csv_reader = csv.reader(file)
        extra_info = await make_random_list()
        for row in csv_reader:
            if len(row) < 7:
                print(row)
                print("error")
            print(number)

            if row[4] == "None":
                row[4] = "[NO_CHECK]"

            else:
                input_string = "|user|:" + "[/EXTRA INFO]: " + random.choice(extra_info).replace(",", "") + " [/PLAYER]: " + row[1] + " [/ACTION]: " + row[3] + "[/CHECK]: " + row[4] + "[/PASS/FAIL]: " + row[5] +"|end|"
                output_string = "|assistant|:" + " [/GENERATED OUTCOME]: "+row[6]  + "|end|"

            total_list = [input_string, output_string]
            data_list.append(total_list)
            number+=1

    return data_list

async def encounter_to_csv(filename):
    attack_array = [
        "I attack the zombie with my shortsword",
        "I punch the skeleton",
        "I swing my sword",
        "I throw my knife",
        "I hurl my axe at the witch",
        "I stab the goblin",
        "I swish my swash at the mimic",
        "I hack at the ward",
        "I grab the skeleton and kick it in the face",
        "I kick the wizard",
        "I slyth my slith at the sloth",
        "We attack at once",
        "We hurl books at the book keeper",
        "We attack the zombie with our longswords",
        "We throw our punches at the mimic"
    ]
    encounter_array = [
        "I sneak up on the zombie",
        "I walk into the mimic",
        "I await the trap set by the wizard",
        "I talk to the zombie"
    ]
    

async def few_prompt_csv():

    for i in range(100):

        sac = "|user|: [/EXTRA] extra info from vector database, [/PLAYER] player backstory, [/ACTION] player input|end|, |assistant|: [/GENERATED CHECK] required check|end|"
        sao = "|user|: [/EXTRA] extra info from vector database, [/PLAYER] player backstory, [/ACTION] player input, [/CHECK] generated check, [/PASS/FAIL] check result|end|, |assistant|: [/GENERATED OUTCOME] generated outcome|end|"

async def make_random_list():
    vb = get_from_db()
    await vb.connect()

    number = 0

    result_list = []

    initial_list = ["zombie", "shortsword", "fireball", "death finger", "armor", "backpack", "area", "14", "left", "wizard", "rogue", "hard", "shield", "tunic", "skeleton", "living armor", "love", "mimic"]

    for item in initial_list:
        print(f"{number} out of 18")
        extra_info = await vb.for_training(item)
        result_list.append(extra_info)
        number += 1

    return result_list


def dict_to_csv(data, filename):

    fieldNames = ['input', 'output']

    with open(filename, 'w', newline='', encoding='utf-8') as file:

        writer = csv.DictWriter(file, fieldnames=fieldNames)
        writer.writeheader()
        writer.writerows(data)

def list_to_csv(data, filename):

    with open(filename, "w", newline='') as file:

        csv_writer = csv.writer(file)

        csv_writer.writerows(data)

def to_json(data, output_file, w_or_r=None):

    if w_or_r is None: w_or_r = 'w'

    try:

        with open(output_file, w_or_r) as file:

            json.dump(data, file, indent=4)

    except Exception as e:

        print(e)

async def main():
    vb = get_from_db()

    await vb.connect()


    #sao = await csv_to_SAO('Datasets/Prompts.csv')
    sac = await csv_to_SAC('Datasets/Prompts.csv')

    # list_to_csv(sao, 'Scene_Action_Outcome.csv')
    # list_to_csv(sac, "Scene_Action_Check.csv")

asyncio.run(main())

#dict_to_csv(input, 'Prompts2.csv')
