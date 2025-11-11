from transformers import AutoModelForCausalLM, AutoTokenizer
import random
import json

with open('Datasets/echoes_of_the_ember_king_v2.json', 'r') as file:
    data = json.load(file)

def roll_dice(sides):
    return random.randint(1, int(sides))

class player:

    def __init__(self, Might, Agility, Presence, Wisdom, Spirit, campaign_dict):
        self.attributes = {
            'Might': Might,
            'Agility': Agility,
            'Presence': Presence,
            'Wisdom': Wisdom,
            'Spirit': Spirit
        }
        self.level = 1
        self.hp = roll_dice(20)
        self.inventory = []
        self.skills = []
        self.data = campaign_dict

    def get_skills(self):

        self.skills = []

        for attr_name, attr_value in self.attributes.items():
        # Check if this attribute exists in the main abilities data
            if attr_name in self.data:
                
                # Get the list of skills for this attribute
                skills_list = self.data[attr_name].get("skills", [])
                
                # Check each skill in that list
                for skill in skills_list:
                    # If the character's score meets or exceeds the threshold...
                    if attr_value >= skill["threshold"]:
                        # ...add the skill name to the list.
                        self.skills.append(skill["name"])

    

    def level_up(self):
        self.level += 1
        self.hp += roll_dice(6)

    def add_item(self, item):
        self.inventory.append(item)

    
def run_model(prompt):
    global messages

    device = "cuda"

    tokenizer = AutoTokenizer.from_pretrained("HuggingFaceTB/SmolLM2-360M-Instruct", trust_remote_code=True)
    model = AutoModelForCausalLM.from_pretrained("HuggingFaceTB/SmolLM2-360M-Instruct").to(device)

    new_message = {'role': 'user', 'content': prompt}

    messages.append(new_message)

    input_text = tokenizer.apply_chat_template(messages, tokenize=False)

    inputs = tokenizer.encode(input_text, return_tensors="pt").to(device)

    outputs = model.generate(inputs, max_new_tokens=256, do_sample=True, temperature=0.7, top_p=0.9)

    response = tokenizer.decode(outputs[0], skip_special_tokens=True)

    return response


def get_campaign(data):

    scene_and_options = []

    for entry in data['scenes']:
        options = []
        for choice in entry['choices']:
            options.append(choice)
        scene_and_options.append((entry['description'], options))

    return scene_and_options

#campaign[scene][choices]['options' = option desctription, 'ability' = ability to check, 'dc' = difficulty class, 'dice' = dice to roll]


campaign = get_campaign(data)

def get_turn_info(campaign, index):
    next_scene_description = campaign[index][0]
    options = []
    i = 0
    for item in campaign[index][1]:
        i += 1
        options.append(item['option'])

    return options

def get_option_info(campaign, index, choice_index):

    choice = campaign[index][1][choice_index]
    ability_check = choice['ability']
    dc = choice['dc']
    dice = choice['dice']
    

    return choice, ability_check, dc, dice

def get_success_or_failure(campaign, index, choice_index, roll_result):

    choice, ability_check, dc, dice = get_option_info(campaign, index, choice_index)

    if roll_result >= dc:
        return "success", choice['success']
    else:
        return "failure", choice['failure']
    
def change_ability(player, ability_dict , amount):
    for ability, change in ability_dict.items():
        if ability == 'Might':
            player.attributes['Might'] += change
        elif ability == 'Agility':
            player.attributes['Agility'] += change
        elif ability == 'Presence':
            player.attributes['Presence'] += change
        elif ability == 'Wisdom':
            player.attributes['Wisdom'] += change
        elif ability == 'Spirit':
            player.attributes['Spirit'] += change

    # print(f"Changed {ability} by {ability_dict[ability]} based on roll of {amount}")


def run_campaign(campaign, first_prompt, campaign_index=0):
    global messages
    global player1

    campaign_index += 1

    print(first_prompt)

    while True:

        options = get_turn_info(campaign, campaign_index-1)

        next_scene_description = campaign[campaign_index][0]

        userin = input("Enter choice: ")

        if userin.lower() in ['exit', 'quit']:
            break

        if userin in options:
            choice_index = options.index(userin)
        elif userin.isdigit() and 1 <= int(userin) <= len(options):
            choice_index = int(userin) - 1
        else:
            print("Invalid choice. Please try again.")
            continue
        
        option_info = get_option_info(campaign, campaign_index-1, choice_index)

        user_roll = input(f'Roll for {option_info[1]} (d{option_info[3]}), would you like to roll (y/N): ')

        if user_roll.lower() == 'y':
            roll = roll_dice(option_info[3].replace('1d', ''))
            print(f'You rolled a {roll}')
        else:
            break

        success, outcome_description = get_success_or_failure(campaign, campaign_index -1, choice_index, roll)


        change_ability(player1, outcome_description['ability_change'], roll)

        next_options = get_turn_info(campaign, campaign_index)


        final_prompt = f'Previous scene: {campaign[campaign_index-1][0]} User chose: {userin} Choice outcome: {outcome_description['narration']} Next scene: {next_scene_description} Choices: {next_options}'

        model_response = run_model(final_prompt)

        model_response = model_response.split('assistant')[len(model_response.split('assistant'))-1].strip()

        print(model_response)

        messages.append({'role': 'assistant', 'content': model_response})

        print(f'{next_scene_description} What do you do? ')

        for item in next_options:
            print(f'- {item}')

        campaign_index += 1

        if len(messages) > 3:
            messages.pop(1)

messages = [{f'role': 'system', 'content' : """
**ROLE:** You are a master Dungeon Master narrating a dark fantasy RPG.
**TONE:** Your narration should be atmospheric, descriptive, and slightly grim.
**TASK:** You will receive the previous scene, the player's action, the outcome of that action, and the new scene. Your job is to weave these elements into a single, seamless narrative response.

**RULES:**
1.  **Narrate the Outcome:** Start by describing the result of the player's last action (which will be provided as 'Choice outcome').
2.  **Transition to the New Scene:** Smoothly connect that outcome to the description of the *next* scene.
3.  **Be Descriptive:** Use senses. What does the player see, hear, or smell?
4.  **Be Concise:** Do not be overly wordy. Stick to 2-4 sentences.
5.  **DO NOT Repeat:** Do not list the "Choices" or say "What do you do?". The user's program will handle that. Your job is *only* to provide the narrative text.
6.  **Stay in Character:** Never break character. Do not speak as an AI.
"""}]

first_prompt = f'{campaign[0][0]} What do you do? Options: 1. {campaign[0][1][0]['option']} 2. {campaign[0][1][1]['option']}'

#

for item in campaign:
    print(item[0])
    for choice in item[1]:
        print(f'{choice}\n-')

    print('===================')

player1 = player(roll_dice(20), roll_dice(20), roll_dice(20), roll_dice(20), roll_dice(20), data['abilities'])
player1.get_skills()

print("Player Skills:", player1.skills)
print("Player HP:", player1.hp)

print(get_turn_info(campaign, 0))

print(get_option_info(campaign, 0, 0))

print(get_success_or_failure(campaign, 0, 0, 15))

#RUNNING CAMPAIGN


print("\n\nStarting Campaign...\n\n")
run_campaign(campaign, first_prompt, campaign_index=0)