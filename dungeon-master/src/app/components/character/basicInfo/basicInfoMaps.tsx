'use client'

export const race_class_map = {
    Human: ['Knight', 'Ranger', 'Scholar', 'Bard'],
    Elf: ['Druid', 'Archer', 'Mage'],
    Dwarf: ['Warrior', 'Smith', 'Guardian'],
    Halfling: ['Rogue', 'Minstrel', 'Scout'],
    'Mystic Born': ['Seer', 'Monk', 'Elementalist']
}

export const subclass_map = {
    Knight: ['Paladin', 'Cavalier', 'Templar'],
    Ranger: ['Hunter', 'Tracker', 'Beastmaster'],
    Scholar: ['Alchemist', 'Sage', 'Librarian'],
    Bard: ['Skald', 'Illusionist', 'Storyweaver'],
    Druid: ['Shapeshifter', 'Warden', 'Healer'],
    Archer: ['Sniper', 'Windstrider', 'Pathfinder'],
    Mage: ['Enchanter', 'Elementalist', 'Chronomancer'],
    Warrior: ['Berserker', 'Defender', 'Rundeblade'],
    Smith: ['Runesmith', 'Forgemaster', 'Artificer'],
    Guardian: ['Shieldbearer', 'Stoneheart', 'Iron Sentinel'],
    Rogue: ['Thief', 'Assassin', 'Trickster'],
    Minstrel: ['Skald', 'Melodist', 'Harmony Weaver'],
    Scout: ['Pathfinder', 'Shadowrunner', 'Windtoe'],
    Seer: ['Oracle', 'Dreamwalker', 'Prophet'],
    Monk: ['Ascendant', 'Spiritblade', 'Balance Keeper'],
    Elementalist: ['Fire Adept', 'Water Sage', 'Stormcaller']
}

export const allClasses = Object.values(race_class_map).flat().filter((v, i, a) => a.indexOf(v) === i);
export const allSubclasses = Object.values(subclass_map).flat().filter((v, i, a) => a.indexOf(v) === i);