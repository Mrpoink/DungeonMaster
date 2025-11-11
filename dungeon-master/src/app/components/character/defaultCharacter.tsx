'use client'
import Character from './characterType';
import { CgProfile } from "react-icons/cg";
import { GiAquarium, GiArrowed, GiAstronautHelmet, GiPlagueDoctorProfile, GiRabbit } from "react-icons/gi"

export const DEFAULT_CHARACTER: Character = {
    name: "Default Hero",
    race: "Human",
    class: "Rogue",
    subclass: "Thief",
    stats: {
        MIGHT: 14,
        AGILITY: 12,
        SPIRIT: 13,
        INTELLECT: 10,
        WISDOM: 11,
        PRESENCE: 15,
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
    backstory: "He was a super cool hero or something"
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