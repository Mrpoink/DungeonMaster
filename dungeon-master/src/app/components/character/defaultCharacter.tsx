'use client'
import Character from './characterType';

export const DEFAULT_CHARACTER: Character = {
    name: "Default Hero",
    race: "Human",
    class: "Rogue",
    subclass: "Thief",
    stats: {
        MIGHT: 20,
        AGILITY: 20,
        SPIRIT: 20,
        INTELLECT: 20,
        WISDOM: 20,
        PRESENCE: 20,
    },
    skills: {
        "Arcana": true,
        "Investigation": false, 
        "Engineering": false, 

        "Athletics": true,
        "Brawling": false,
        "Endurance": false,

        "Stealth": true, 
        "Acrobatics": false,
        "Sleight of Hand": false, 

        "Persuasion": true, 
        "Deception": false, 
        "Performance": false, 

        "Insight": true, 
        "Survival": false,
        "Medicine": false, 

        "Faith": true, 
        "Willpower": false, 
        "Attunement": false, 

    },
    backstory: "He was a super cool hero or something",
    iconId: 0
};

export const raceOptions = [
    'Human',
    'Elf',
    'Dwarf',
    'Halfling',
    'Dragonborn',
    'Gnome',
    'Tiefling',
    'Half-Elf',
    'Half-Orc'
]