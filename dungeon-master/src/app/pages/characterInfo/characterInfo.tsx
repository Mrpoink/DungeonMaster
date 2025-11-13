'use client'

import { BottomNav } from "@/app/components/nav/nav";
import { API_BASE_URL } from "@/app/config/api";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { DEFAULT_CHARACTER, raceOptions } from "@/app/components/character/defaultCharacter";
import { BiPencil } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import {CharacterIcon } from "@/app/components/character/characterIcon";
import SelectIcon from "@/app/components/character/characterIcon";
import Character from "@/app/components/character/characterType";
import { InformationIcon, skill_map } from "@/app/components/character/abilities/descriptions";
import { AbilityScore } from "@/app/components/character/abilities/abilities";

    
const all_skills = Object.values(skill_map).flat();
const thresholds = { lvl1: 10, lvl2: 20, lvl3:25 }
const maxScore = 120;

const updateProficiencies = (currentStats: { [x: string]: number; }, setCharacterData: Dispatch<SetStateAction<Character>>) =>{
    let skillsToGrant: { [key: string]: boolean } = {};

    (Object.keys(skill_map) as (keyof typeof skill_map)[]).forEach((abilityKey) => {
        const score = currentStats[abilityKey] || 0;
        const governedSkills = skill_map[abilityKey];

        let skillsGranted = 0;

        if (score >= thresholds.lvl3){
            skillsGranted = 3;
        } else if (score >= thresholds.lvl2){
            skillsGranted = 2;
        } else if (score >= thresholds.lvl1){
            skillsGranted = 1;
        }
        governedSkills.forEach((skill: string, index: number) => {
            skillsToGrant[skill] = index < skillsGranted;
        });
    });

    setCharacterData((prevCharacter) => {
        const newSkillsState = {
            ...prevCharacter.skills,
            ...skillsToGrant
        };
        return {
            ...prevCharacter,
            skills: newSkillsState
        };
    });
    
}

const EditInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input 
        className="edit-input"
        {...props}
    />
);

 // --- MAIN COMPONENT ---
 export default function CharacterInfo() {
    const [characterData, setCharacterData] = useState(DEFAULT_CHARACTER);

    useEffect(() => {
        updateProficiencies(characterData.stats, setCharacterData);
    }, [characterData.stats]);


    // --- EDITING STATES ---
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingBasic, setIsEditingBasic] = useState(false);
    const [isEditingStats, setIsEditingStats] = useState(false);
    const [isEditingBackstory, setIsEditingBackstory] = useState(false);

    // Temporary form states
    const [tempName, setTempName] = useState(characterData.name);
    const [tempRace, setTempRace] = useState(characterData.race);
    const [tempClass, setTempClass] = useState(characterData.class);
    const [tempSubclass, setTempSubclass] = useState(characterData.subclass);
    const [tempStats, setTempStats] = useState(characterData.stats);
    const [tempBackstory, setTempBackstory] = useState(characterData.backstory);
    const [tempIcon, setTempIcon] = useState(0);

    const [validationMessage, setValidationMessage] = useState('')
    const totalScore = Object.values(tempStats).reduce((sum,score) => sum + (Number(score) || 0), 0)
    const pointsRemaining = maxScore-totalScore

    // --- SAVE HANDLERS ---
    const handleSaveName = () => {
        setCharacterData(prev => ({ ...prev, name: tempName }));
        setIsEditingName(false);
    };

    const handleSaveBasic = () => {
        setCharacterData(prev => ({ 
            ...prev, 
            icon: tempIcon,
            race: tempRace,
            class: tempClass,
            subclass: tempSubclass
         }));
        setIsEditingBasic(false);
    }

    const handleSaveStats = () => {
        setValidationMessage('');
        const savedStats = Object.fromEntries(
            Object.entries(tempStats).map(([key, value]) => [key, Number(value) || 0])
        );
        const newTotalScore = Object.values(savedStats).reduce((sum,score) => sum + (Number(score) || 0), 0);
         if (newTotalScore > maxScore){
            setValidationMessage('Total ability score (${newTotalScore}) cannot exceed maxium limit of (${maxScore}).');
            return;
         }

        setCharacterData(prev => ({ ...prev, stats: savedStats }));
        setIsEditingStats(false);
    };

    
    const handleSaveBackstory = () => {
        setCharacterData(prev => ({ ...prev, backstory: tempBackstory }));
        setIsEditingBackstory(false);
    };



    // --- RENDER FUNCTIONS ---
    const renderHeader = () => {
        if (isEditingName) {
            return (
                <div className="space-y-4">
                    <div className="heading-with-edit border-none pb-0 mb-4">
                        <h2 className="text-2xl font-bold">Change Name</h2>
                        <div className="edit-controls">
                            <button onClick={handleSaveName} className="edit-save-btn"><FaCheck className="w-5 h-5" /></button>
                            <button onClick={() => setIsEditingName(false)} className="edit-cancel-btn"><IoClose className="w-5 h-5" /></button>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm block mb-1">Character Name</label>
                        <EditInput value={tempName} onChange={(e) => setTempName(e.target.value)} />
                    </div>
                </div>
            );
        }
        
        return (
            <div className="relative">
                <div className="name-heading">
                    <h1 className="char-name">{characterData.name}</h1>
                    <button 
                        onClick={() => { setIsEditingName(true);}}
                        className="edit-button"
                        title="Edit Name"
                    >
                        <BiPencil className="w-4 h-4" />
                    </button>
                </div>
            </div>
        );
    };

    const renderBasic = () => {
        if (isEditingBasic) {
            return (
                <div className="content-block">
                    <div className="heading-with-edit">
                        <h3 className="heading-text">Edit Basic Information</h3>
                        <div className="edit-controls">
                            <button onClick={handleSaveBasic} className="edit-save-btn"><FaCheck className="w-5 h-5" /></button>
                            <button onClick={() => setIsEditingBasic(false)} className="edit-cancel-btn"><IoClose className="w-5 h-5" /></button>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm block mb-1">Select your Icon</label>
                        <div>
                            <SelectIcon
                                onIconSelect={setTempIcon} 
                                currentIconId={tempIcon}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-sm block mb-1">Character Race</label>
                        <div className="race-button-container">
                            {raceOptions.map((race) => (
                                <button
                                    key={race}
                                    onClick={() => setTempRace(race)}
                                    className={`race-button ${tempRace === race ? 'race-selected' : ''}`}
                                >
                                    {race}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="text-sm block mb-1">Character Class</label>
                        <EditInput value={tempClass} onChange={(e) => setTempClass(e.target.value)} />
                    </div>
                    <div>
                        <label className="text-sm block mb-1">Character Subclass</label>
                        <EditInput value={tempSubclass} onChange={(e) => setTempSubclass(e.target.value)} />
                    </div>
                </div>
            );
        }

        return (
            <div className="content-block relative">
                <div className="heading-with-edit border-b pb-2">
                    <h3 className="heading-text">BASIC INFO</h3>
                    <button 
                        onClick={() => { setIsEditingBasic(true);}}
                        className="edit-button"
                        title="Edit Basic Information"
                    >
                        <BiPencil className="w-4 h-4" />
                    </button>
                </div>
                <div className="basic-info-grid">
                    <div className="basicInfo-icon-div">
                        <CharacterIcon id={tempIcon}/>
                    </div>
                    <p className="basicInfo-text">
                        {characterData.race}
                    </p>
                    <p className="basicInfo-text">
                        {characterData.class}
                    </p>
                    <p className="basicInfo-text">
                        {characterData.subclass}
                    </p>
                </div>
            </div>
        );
    };

    
    const renderStats = () => {
        if (isEditingStats) {
            return (
                <div className="content-block">
                    <div className="heading-with-edit">
                        <h3 className="heading-text">Edit Ability Scores</h3>
                        <div className="edit-controls">
                            <button onClick={handleSaveStats} className="edit-save-btn"><FaCheck className="w-5 h-5" /></button>
                            <button onClick={() => {setIsEditingStats(false); setValidationMessage('')}} className="edit-cancel-btn"><IoClose className="w-5 h-5" /></button>
                        </div>
                    </div>
                    {validationMessage && (
                        <div className="p-3 mb-4 text-sm font-medium text-red-100 bg-red-800/70 rounded-lg">
                            {validationMessage}
                        </div>
                    )}
                    <div className="mb-4 p-3 rounded-lg flex justify-between items-center text-sm font-semibold">
                        <span>Total Score: <span className="text-green-400">{totalScore}</span> / {maxScore}</span>
                        <span className={`font-bold ${pointsRemaining >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {pointsRemaining >= 0 ? `Remaining: ${pointsRemaining}` : `Over Limit: ${Math.abs(pointsRemaining)}`}
                        </span>
                    </div>
                    <div className="ability-scores-grid">
                        {Object.entries(tempStats).map(([name, score]) => {
                            return (
                                <div key={name} className="flex flex-col items-start">
                                    <label className="text-sm uppercase font-medium mb-1">
                                        <div>
                                            {name}
                                            <InformationIcon name={name}/>
                                        </div>
                                    </label>
                                    <EditInput
                                        name={name}
                                        type="number"
                                        min="1"
                                        max="30"
                                        value={score}
                                        onChange={(e) => {
                                          const { name, value } = e.target;
                                          const newValue = Number(value); 
  
                                          setTempStats(prev => ({ 
                                          ...prev, 
                                          [name]: newValue
                                          }));

                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }

        return (
            <div className="content-block relative">
                <div className="heading-with-edit border-b pb-2">
                    <h3 className="heading-text">ABILITY SCORES</h3>
                    <button 
                        onClick={() => {
                            setTempStats(characterData.stats); 
                            setIsEditingStats(true);
                        }}
                        className="edit-button"
                        title="Edit Stats"
                    >
                        <BiPencil className="w-4 h-4" />
                    </button>
                </div>
                <div className="ability-scores-grid">
                    {Object.entries(characterData.stats).map(([name, score]) => (
                        <div key={name}>
                            <div>
                                <InformationIcon name={name} />
                            </div>
                            <AbilityScore name={name} score={score} />
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderSkills = () => {

        return (
            <div className="content-block relative">
                <div className="heading-with-edit border-b pb-2">
                    <h3 className="heading-text">
                        SKILLS
                    </h3>
                    
                </div>
                <div className="skills-grid">
                    {all_skills.map((skillName) => {
                        const isProficient = !!characterData.skills[skillName];
                        return (
                            <div 
                                key={skillName} 
                                className={`skill-item ${isProficient ? 'skill-proficient' : 'skill-not-proficient'}`}
                            >
                            <div className="skill-indicator"></div>
                                <span>{skillName}</span>
                                <InformationIcon name={skillName} />
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    };

    const renderBackstory = () => {
        if (isEditingBackstory) {
            return (
                <div className="content-block p-6">
                    <div className="heading-with-edit">
                        <h3 className="heading-text">
                            Edit Backstory
                        </h3>
                        <div className="edit-controls">
                            <button onClick={handleSaveBackstory} className="edit-save-btn"><FaCheck className="w-5 h-5" /></button>
                            <button onClick={() => setIsEditingBackstory(false)} className="edit-cancel-btn"><IoClose className="w-5 h-5" /></button>
                        </div>
                    </div>
                    <textarea
                        value={tempBackstory}
                        onChange={(e) => setTempBackstory(e.target.value)}
                        className="edit-input backstory-textarea"
                    ></textarea>
                </div>
            );
        }

        return (
            <div className="content-block p-6 relative">
                <div className="heading-with-edit border-b pb-2">
                    <h3 className="heading-text">
                        BACKSTORY
                    </h3>
                    <button 
                        onClick={() => {setTempBackstory(characterData.backstory); setIsEditingBackstory(true);}}
                        className="edit-button"
                        title="Edit Backstory"
                    >
                        <BiPencil className="w-4 h-4" />
                    </button>
                </div>
                <p className="backstory-text">
                    {characterData.backstory}
                </p>
            </div>
        );
    };
    
    return (
        <div className="root-container">
            <div className="char-sheet-container" style={{ transform: 'scale(0.88)', transformOrigin: 'top center' }}>
                <header className="sheet-header">
                    {renderHeader()}
                </header>
                <div className="main-grid">
                    <div className="space-y-8 lg:col-span-1 lg:order-1">
                        {renderBasic()}
                    </div>
                    <div className="space-y-8 lg:col-span-2 lg:order-4">
                        {renderStats()}
                    </div>
                    <div className="space-y-8 lg:col-span-2 lg:order-2">
                        {renderSkills()}
                    </div>
                    <div className="space-y-8 lg:col-span-1 lg:order-3">
                        {renderBackstory()}
                    </div>
                </div>

                <div className="action-button-container">
                    <button 
                        className="action-button" 
                        onClick={async () => {
                            try {
                                const username = localStorage.getItem('username');
                                if (!username) {
                                    throw new Error('No username found');
                                }

                                const characterDataToSend = {
                                    username: username,
                                    name: characterData.name,
                                    race: characterData.race,
                                    class: characterData.class,
                                    sub: characterData.subclass,
                                    str: characterData.stats.MIGHT,
                                    dex: characterData.stats.AGILITY,
                                    con: characterData.stats.PRESENCE,
                                    int: characterData.stats.INTELLECT,
                                    wis: characterData.stats.WISDOM,
                                    cha: characterData.stats.SPIRIT,
                                    backstory: characterData.backstory
                                };

                                const response = await fetch(`${API_BASE_URL}/characters`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(characterDataToSend)
                                });

                                const result = await response.json();

                                if (!response.ok) {
                                    throw new Error(result.details || result.error || 'Failed to save character');
                                }

                                if (result.status === 'success') {
                                    console.log(result.message); // Log success message
                                    // Redirect to lobby after successful character creation
                                    window.location.href = '/pages/lobby';
                                } else {
                                    throw new Error(result.message || 'Failed to save character');
                                }
                            } catch (err) {
                                console.error('Error saving character:', err);
                                // You might want to show an error message to the user here
                            }
                        }}
                    >
                        Save Character
                    </button>
                    <div>
                        <BottomNav/>
                    </div>
                </div>
            </div>
        </div>
    );
};
