from datasets import load_dataset, Dataset
import warnings
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

class player:

    def __init__(self, campaign_dict):
        r'''
        Character creation \
        parameters: The attribute scores for each player. Needed campaign dict because the original campaigns dicts determine skills for players. \
        
        To use: \
        Initialize class to create player \
        run get_skills function to get player skills \
        Don't need getters due to class attributes \
        run change_ability to change abilities \
        run level_up to level up character, each automatically starts at 1 \
        run add_item to add items
        '''
        self.attributes = {
            'Might': None,
            'Agility': None,
            'Presence': None,
            'Wisdom': None,
            'Spirit': None,
            'Intelligence': None
        }
        self.level = 1
        self.inventory = []
        self.skills = []
        self.data = campaign_dict
        
    @classmethod    
    async def load_player(cls, username):
        r'''
        Load player data from database using username
        '''
        instance = cls()
        instance.vb = vector_database.get_from_db()
        
        await instance.vb.connect()
        
        player_data = await instance.vb.get_player_data(username)[0]
        
        instance.attributes = {
            'Might': player_data.get('str', None),
            'Agility': player_data.get('dex', None),
            'Presence': player_data.get('cha', None),
            'Wisdom': player_data.get('wis', None),
            'Spirit': player_data.get('con', None),
            'Intelligence': player_data.get('int', None)
        }
        
        print(instance.attributes)
        

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

    def change_ability(self, ability_dict , amount):
        for ability, change in ability_dict.items():
            # Ensure the attribute exists before trying to modify it
            if self.attributes.get(ability) is None:
                self.attributes[ability] = 0
            
            if ability == 'Might':
                self.attributes['Might'] += change
            elif ability == 'Agility':
                self.attributes['Agility'] += change
            elif ability == 'Presence':
                self.attributes['Presence'] += change
            elif ability == 'Wisdom':
                self.attributes['Wisdom'] += change
            elif ability == 'Spirit':
                self.attributes['Spirit'] += change
            elif ability == 'Intelligence':
                self.attributes['Intelligence'] += change

        print(f"Changed {ability} by {ability_dict[ability]} based on roll of {amount}")
                
    
    async def save_player_attr(self, username):
        await self.vb.update_player_stats(
            username,
            self.attributes
        )
        
        print("Successfully saved player attributes to database.")
        
    async def get_player_attr(self, username):
        player_data = await self.vb.get_character_attributes(username)
        
        self.attributes = {
            'Might': player_data.get('str', None),
            'Agility': player_data.get('dex', None),
            'Presence': player_data.get('cha', None),
            'Wisdom': player_data.get('wis', None),
            'Spirit': player_data.get('con', None),
            'Intelligence': player_data.get('int', None)
        }
        
        print("Successfully retrieved player attributes from database.")

    

    def level_up(self, hp_roll):
        self.level += 1
        self.hp += hp_roll

    def add_item(self, item):
        self.inventory.append(item)



class campaign:

    def __init__(self):
        r'''
        Run create_dm to make the vector database instance so we can add user data \
        get the seed from it so we can decide what campaign to do, and also where to store the information (if we do at all) \
        We will need the user input \
        We will need the roll result \
        And we will return all the other information I think. \
        
        Flow works as follows: \
        use the turn_num to get the index of scene_and_options \
        from scene_and_options you get the description and options of the scene \
        you can use get_background to get the background field for each scene \
        have the player choose a choice from the options given \
        Pop the user input into user_choice along with the given options \
        You will get the option info and choice index from user_choice \
        Use that to get the roll needed from option_info[1] and option_info[3] \
        Roll \
        Use the result of the roll, the turn_num, and the choice_index to get the success, outcome_description, and narration from the success or failure \
        Use that change the players abilities in the player class \
        rinse and repeat
        '''

        self.turn_num = 0

    @classmethod
    async def create_dm(cls):
        r'''
        returns seed, \
        adds session \
        returns the scene information \
        defines the turn_number \
        return instance with these items'''
    
        instance = cls()

        instance.vb = vector_database.get_from_db()
        instance.bvb = vector_database.use_vector_db()
        await instance.vb.connect()
        await instance.bvb.connect()
        instance.seed = await instance.vb.get_session_id() + 1
        print("Seed: ", instance.seed)
        await instance.vb.add_session('all-MiniLM-L6-v2', "start of session", instance.seed)

        instance.player_says = None
        
        instance.roll_number = 0

        instance.check = None #If false, check required, else generate outcome

        return instance
    

    def create_campaign_from_file(instance, seed):
        r'''
        Needs the seed to decide the campaign to roll with \
        sets the campaign information'''

        campaign_num = seed % 5 #set back to instance.seed and then remove seed from parameters

        match campaign_num:

            case 0:
                with open('Datasets/echoes_of_the_force.json', 'r') as file:
                    instance.campaign = json.load(file)
            case 1:
                with open('Datasets/the_last_ember_of_balance.json', 'r') as file:
                    instance.campaign = json.load(file)
            case 2:
                with open('Datasets/the_shattered_crown_of_elarion.json', 'r') as file:
                    instance.campaign = json.load(file)
            case 3:
                with open('Datasets/the_shattered_hourglass.json', 'r') as file:
                    instance.campaign = json.load(file)
            case 4:
                with open('Datasets/echoes_of_the_ember_king_v2.json', 'r') as file:
                    instance.campaign = json.load(file)
                    
    def get_background(self):
        r'''
        parameters: choice_index which helps to specify the exact scene we are getting information from \
        returns: the background information of the specified scene'''
        scenes = self.campaign['scenes'][self.turn_num]
        
        return scenes['background']
        
        
        
    def get_campaign(self):
        r'''
        converts the campaign data into usable data for the scenes \
        different due to there being different items within the given jsons'''

        self.scene_and_options = []

        for entry in self.campaign['scenes']:
            options = []
            for choice in entry['choices']:
                options.append(choice)
            self.scene_and_options.append((entry['description'], options))

    def get_turn_info(self):
        r'''
        makes the turn info for the given turn. Has no return statement'''
        self.next_scene_description = self.campaign[self.turn_num][0]
        self.options = []
        i = 0
        for item in self.campaign[self.turn_num][1]:
            i += 1
            self.options.append(item['option'])

    def get_option_info(self, turn_num, choice_index):
        r'''
        parameters: choice_index which helps to specify the exact scene we are getting information from \
        returns: the choice description, the ability check required, the dc (minimum) for said choice, and the dice required'''

        choice = self.campaign['scenes'][turn_num]['choices'][choice_index]
        ability_check = choice['ability']
        dc = choice['dc']
        dice = choice['dice']
        

        return choice, ability_check, dc, dice
    
    def user_choice(self, options, userin):
        r'''
        parameters: the options for the given scene, user input \
        returns: option info from get_option_info, and the choice_index which is needed for deciding how to move forward with such a choice'''

        choice_index = -1
        try:
            if userin.isdigit() and 1 <= int(userin) <= len(options):
                choice_index = int(userin) - 1
            else:
                for i, item in enumerate(options):
                    if userin.lower() in item['option'].lower():
                        choice_index = i
                        break
        
            if choice_index == -1:
                return "Error", -1

        except Exception as e:
            print(e)
            return "Error", -1


        option_info = self.get_option_info(self.turn_num, choice_index)

        return option_info, choice_index
    
    def get_success_or_failure(self, turn_num, choice_index, roll_result):
        r'''
        parameters: the choice index, and the users roll result \
        returns: the result of thier roll on the choice given the dc, the full choice incase that is needed, and the narration that comes with it
        '''

        choice, ability_check, dc, dice = self.get_option_info(turn_num, choice_index)

        if roll_result >= dc:
            return "success", choice['success'], choice['success'].get('narration')
        else:
            return "failure", choice['failure'], choice['failure'].get('narration')
    




    async def add_user_data(instance, name, username, password):

        await instance.bvb.add_user_data(name, username, password)

        return "added data"
    
    async def check_creds(instance, username, password):

        result = await instance.bvb.check_user_data(username, password)

        print("From backend: ", result)

        return result





def mock_campaign():
    r'''
    used for mock campaign and debugging'''

    print("RUNNING MOCK CAMPAIGN")

    mock_campaign = campaign()

    mock_campaign.create_campaign_from_file(23)


    mock_campaign.get_campaign()

    # for description, options in mock_campaign.scene_and_options:
    #     print("DESCRIPTION: ", description)
    #     for item in options:
    #         print(f"Option: {item['option']}")

    player1 = player(12, 12, 12, 12, 12, 12, mock_campaign.campaign)

    turn_num = 0
    
    print(mock_campaign.get_background())

    for description, options in mock_campaign.scene_and_options:

        print(f"{description}")

        for i in range(len(options)):

            print(f"Option {i+1}. {options[i]['option']}")
        
        print("\n---------\n")

        
        userin = input("What will you do?: ")

        if userin.lower() in ['exit', 'quit']:
            break

        option_info, choice_index = mock_campaign.user_choice(options, userin)

        print("\n---------\n")

        roll_prompt = input(f'Roll for {option_info[1]} (d{option_info[3]}), would you like to roll (y/N): ')

        if roll_prompt.lower() == 'y':
            user_roll = random.randint(1, int(option_info[3].replace('1d', '')))
            print(f"you rolled: {user_roll}")
        else:
            break

        print("\n---------\n")

        success, outcome_description, narration = mock_campaign.get_success_or_failure( turn_num, choice_index, user_roll)

        print(f"\n{narration}\n\n")

        player1.change_ability(outcome_description['ability_change'], random.randint(1, 20))



