# from Monster import Monster as Monster
# from jsonPuller import get_data as Player
#jsonPuller needs to be able to grab Player information

def encounter(monster:str, surprise:bool, level:int, number:int ):
    r'''
    Used when a player enters a room that contains an enemy.

    Args:
        monster: monster name
        surprise: surprise attack or not
        level: level of encounter
        number: number of monsters
    '''
    #player should be dict if we do it one-by-one
    #inside player, there should be action1, action2, action(num)
    #surprise is if the attack is surprise
    #level is the level of the encounter

    userin = ""

    while (userin != "quit"):

        print(f"{monster}\n{surprise}\n{level}\n{number}\n")

        userin = input("Enter attack: ")

    print("\nFunction Used\n-----------\n")

    # overall_level = monster["# of Atk"] // level
    
    # player_damage = player["action " + action]["damage"]
    # monster_damage = monster[""]

    # if surprise:
    
    #   pass
