'use client'

import { BottomNav } from "@/app/components/nav/nav";
import { API_BASE_URL } from "@/app/config/api";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { DEFAULT_CHARACTER } from "@/app/components/character/defaultCharacter";
import { BiPencil } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import {CharacterIcon } from "@/app/components/character/basicInfo/characterIcon";
import SelectIcon from "@/app/components/character/basicInfo/characterIcon";
import Character from "@/app/components/character/characterType";
import { InformationIcon, skill_map } from "@/app/components/character/abilities/descriptions";
import { AbilityScore } from "@/app/components/character/abilities/abilities";
import { CharacterOptions } from "@/app/components/character/basicInfo/characterOptions";
import { race_class_map, subclass_map, allClasses, allSubclasses } from "@/app/components/character/basicInfo/basicInfoMaps";
import { raceDescriptions, classDescriptions, nestedSubclassDescriptions } from "@/app/components/character/basicInfo/descriptions";
import HelpIcon from "@/app/components/helpIcon/helpIcon";
import { useLoadingNavigation, usePageLoaded } from "@/app/hooks/useLoadingNavigation";
import loginBg from "@/app/components/assets/Login_Page.jpeg";

    
const all_skills = Object.values(skill_map).flat();
const thresholds = { lvl1: 10, lvl2: 20, lvl3:25 }
const maxScore = 120;
const allRaces = Object.keys(raceDescriptions);

// Validation function - only allow alphanumeric characters and spaces
const validateTextInput = (value: string) => {
    return /^[a-zA-Z0-9 ]*$/.test(value);
};

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
    usePageLoaded(); // Hide loading when page is ready
    const { navigateWithLoading } = useLoadingNavigation();
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
    const [tempSubclass, setTempSubclass] = useState(characterData.subclass || '');
    const [tempStats, setTempStats] = useState(characterData.stats);
    const [tempBackstory, setTempBackstory] = useState(characterData.backstory);
    const [tempIcon, setTempIcon] = useState(characterData.iconId);

    const [validationMessage, setValidationMessage] = useState('')
    const [fieldValidationError, setFieldValidationError] = useState('')
    const totalScore = Object.values(tempStats).reduce((sum,score) => sum + (Number(score) || 0), 0)
    const pointsRemaining = maxScore-totalScore

    const handleSelectRace = (race: string) => {
        if (race !== tempRace) {
            setTempClass(''); 
            setTempSubclass('');
        }
        setTempRace(race);
    }

    const handleSelectClass = (className: string) => {
        if (className !== tempClass) {
            setTempSubclass('');
        }
        setTempClass(className);
    };

    const handleSelectSubclass = (subclass:string) => {
        setTempSubclass(subclass);
    };

    // Validation handlers for text inputs
    const handleNameChange = (value: string) => {
        if (validateTextInput(value) || value === '') {
            setTempName(value);
            setFieldValidationError('');
        } else {
            setFieldValidationError('Only letters, numbers, and spaces are allowed. No special characters.');
        }
    };

    const handleClassChange = (value: string) => {
        if (validateTextInput(value) || value === '') {
            setTempClass(value);
            setFieldValidationError('');
        } else {
            setFieldValidationError('Only letters, numbers, and spaces are allowed. No special characters.');
        }
    };

    const handleSubclassChange = (value: string) => {
        if (validateTextInput(value) || value === '') {
            setTempSubclass(value);
            setFieldValidationError('');
        } else {
            setFieldValidationError('Only letters, numbers, and spaces are allowed. No special characters.');
        }
    };

    const handleBackstoryChange = (value: string) => {
        if (validateTextInput(value) || value === '') {
            setTempBackstory(value);
            setFieldValidationError('');
        } else {
            setFieldValidationError('Only letters, numbers, and spaces are allowed. No special characters.');
        }
    };

    // --- SAVE HANDLERS ---
    const handleSaveName = () => {
        if (!validateTextInput(tempName)) {
            setFieldValidationError('Only letters, numbers, and spaces are allowed. No special characters.');
            return;
        }
        setCharacterData(prev => ({ ...prev, name: tempName }));
        setIsEditingName(false);
        setFieldValidationError('');
    };

    const handleSaveBasic = () => {
        const race = tempRace;
        const className = race && race_class_map[race as keyof typeof race_class_map]?.includes(tempClass) ? tempClass : '';
        const subclass = className && subclass_map[className as keyof typeof subclass_map]?.includes(tempSubclass) ? tempSubclass : '';

        if (!validateTextInput(tempClass || '') || !validateTextInput(tempSubclass || '')) {
            setFieldValidationError('Only letters, numbers, and spaces are allowed. No special characters.');
            return;
        }
        setCharacterData(prev => ({ 
            ...prev, 
            iconId: tempIcon,
            race: race,
            class: className,
            subclass: subclass
         }));
        setIsEditingBasic(false);
        setFieldValidationError('');
    }

    const handleSaveStats = () => {
        setValidationMessage('');
        const savedStats = Object.fromEntries(
            Object.entries(tempStats).map(([key, value]) => [key, Number(value) || 0])
        );
        const newTotalScore = Object.values(savedStats).reduce((sum,score) => sum + (Number(score) || 0), 0);
         if (newTotalScore !== maxScore){
            setValidationMessage(`Your total attributes must equal exactly ${maxScore} points. Currently ${newTotalScore > maxScore ? `${newTotalScore - maxScore} points over limit` : `${maxScore - newTotalScore} points remaining`}.`);
            return;
         }

        setCharacterData(prev => ({ ...prev, stats: savedStats }));
        setIsEditingStats(false);
    };

    
    const handleSaveBackstory = () => {
        if (!validateTextInput(tempBackstory || '')) {
            setFieldValidationError('Only letters, numbers, and spaces are allowed. No special characters.');
            return;
        }
        setCharacterData(prev => ({ ...prev, backstory: tempBackstory }));
        setIsEditingBackstory(false);
        setFieldValidationError('');
    };

    const DescriptionBox: React.FC<{ description: string | null }> = ({ description }) => (
        description ? (
            <div className="basic-desc">
                {description}
            </div>
        ) : null
    );



    // --- RENDER FUNCTIONS ---
    const renderHeader = () => {
        if (isEditingName) {
            return (
                <div className="space-y-4">
                    <div className="heading-with-edit border-none pb-0 mb-4">
                        <h2 className="text-2xl font-bold">Change Name</h2>
                        <div className="edit-controls">
                            <button onClick={handleSaveName} className="edit-save-btn"><FaCheck className="w-5 h-5" /></button>
                            <button onClick={() => {setIsEditingName(false); setFieldValidationError('');}} className="edit-cancel-btn"><IoClose className="w-5 h-5" /></button>
                        </div>
                    </div>
                    {fieldValidationError && (
                        <div className="p-3 mb-2 text-sm font-medium" style={{ 
                            color: '#6b4a2e', 
                            backgroundColor: 'rgba(246, 233, 201, 0.95)', 
                            borderRadius: '8px'
                        }}>
                            ⚠️ {fieldValidationError}
                        </div>
                    )}
                    <div>
                        <label className="text-sm block mb-1">Character Name</label>
                        <EditInput 
                            value={tempName} 
                            onChange={(e) => handleNameChange(e.target.value)}
                            placeholder="Letters, numbers, and spaces only"
                        />
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
                            <button onClick={() => {setIsEditingBasic(false); setFieldValidationError('');}} className="edit-cancel-btn"><IoClose className="w-5 h-5" /></button>
                        </div>
                    </div>
                    {fieldValidationError && (
                        <div className="p-3 mb-2 text-sm font-medium" style={{ 
                            color: '#6b4a2e', 
                            backgroundColor: 'rgba(246, 233, 201, 0.95)', 
                            borderRadius: '8px'
                        }}>
                            ⚠️ {fieldValidationError}
                        </div>
                    )}
                    <div>
                        <label className="text-sm block mb-2 font-semibold">Select your Icon</label>
                        <div>
                            <SelectIcon
                                onIconSelect={setTempIcon} 
                                currentIconId={tempIcon}
                            />
                        </div>
                    </div>
                    <div className="race-button-container">
                        <CharacterOptions
                            title = "Select Race" 
                            type="Race" 
                            selectedOption={tempRace}
                            allOptions={allRaces}
                            prerequisiteOption={null}
                            dependencyMap={{}}
                            onSelect={handleSelectRace}
                        />
                    </div>
                    <DescriptionBox description={tempRace ? raceDescriptions[tempRace as keyof typeof raceDescriptions] : null} />

                    <div className="race-button-container">
                        <CharacterOptions
                            title="Select Class"
                            type="Class"
                            selectedOption={tempClass}
                            allOptions={allClasses}
                            prerequisiteOption={tempRace} // Race is the prerequisite
                            dependencyMap={race_class_map} 
                            onSelect={handleSelectClass}
                        />
                    </div>
                    <DescriptionBox description={tempClass ? classDescriptions[tempClass as keyof typeof classDescriptions] : null} />

                    <div className="race-button-container">
                        <CharacterOptions
                            title="Select Subclass"
                            type="Subclass"
                            selectedOption={tempSubclass}
                            allOptions={allSubclasses}
                            prerequisiteOption={tempClass} // Class is the prerequisite
                            dependencyMap={subclass_map}
                            onSelect={handleSelectSubclass}
                        />
                    </div>
                    <DescriptionBox 
                        description={tempClass && tempSubclass ? (nestedSubclassDescriptions[tempClass as keyof typeof nestedSubclassDescriptions] as any)?.[tempSubclass] : null} 
                    />
                </div>
            );
        }

        return (
            <div className="content-block relative">
                <div className="heading-with-edit border-b pb-2">
                    <h3 className="heading-text">BASIC INFO</h3>
                    <button 
                        onClick={() => { 
                            setIsEditingBasic(true);
                            setTempRace(characterData.race);
                            setTempClass(characterData.class);
                            setTempSubclass(characterData.subclass || '');
                            setTempIcon(characterData.iconId);
                        }}
                        className="edit-button"
                        title="Edit Basic Information"
                    >
                        <BiPencil className="w-4 h-4" />
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <HelpIcon 
                            content={
                                <div>
                                    <strong>Step 2: Basic Info</strong><br/>
                                    Click the edit button to customize your character's appearance (icon), 
                                    race, class, and subclass. These define your character's identity!
                                </div>
                            }
                            position="left"
                            size={24}
                        />
                        <button 
                            onClick={() => { setIsEditingBasic(true);}}
                            className="edit-button"
                            title="Edit Basic Information"
                        >
                            <BiPencil className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                <div className="basic-info-grid">
                    <div className="basicInfo-icon-div">
                        <CharacterIcon id={characterData.iconId}/>
                    </div>
                    <p className="basicInfo-text">
                        {characterData.race || 'Unselected Race' }
                    </p>
                    <p className="basicInfo-text">
                        {characterData.class || 'Unselected Class' }
                    </p>
                    <p className="basicInfo-text">
                        {characterData.subclass || 'Unselected Subclass' }
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
                        <div className="p-3 mb-4 text-sm font-medium" style={{ 
                            color: '#6b4a2e', 
                            backgroundColor: 'rgba(246, 233, 201, 0.95)', 
                            borderRadius: '8px'
                        }}>
                            {validationMessage}
                        </div>
                    )}
                    <div className="mb-4 p-3 rounded-lg flex justify-between items-center text-sm font-semibold">
                        <span>Total Score: <span className={totalScore === maxScore ? 'text-green-400' : 'text-yellow-400'}>{totalScore}</span> / {maxScore}</span>
                        <span className={`font-bold ${pointsRemaining === 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {pointsRemaining === 0 ? '✓ Perfect!' : pointsRemaining > 0 ? `Remaining: ${pointsRemaining}` : `Over Limit: ${Math.abs(pointsRemaining)}`}
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <HelpIcon 
                            content={
                                <div>
                                    <strong>Ability Scores are KEY!</strong><br/>
                                    Your 6 attributes (Might, Agility, Presence, Wisdom, Spirit, Intellect) 
                                    determine your skills and success in challenges. You have <strong>120 points</strong> to 
                                    distribute. Higher scores = better chances! Click edit to customize.
                                </div>
                            }
                            position="left"
                            size={24}
                        />
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <h3 className="heading-text">
                            SKILLS
                        </h3>
                        <HelpIcon 
                            content={
                                <div>
                                    <strong>Skills Unlock Automatically!</strong><br/>
                                    Your skills are determined by your ability scores:
                                    <br/>• 10+ = 1 skill unlocked
                                    <br/>• 20+ = 2 skills unlocked
                                    <br/>• 25+ = 3 skills unlocked
                                    <br/>Increase your attributes to unlock more skills!
                                </div>
                            }
                            position="left"
                            size={24}
                        />
                    </div>
                    
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
                            <button onClick={() => {setIsEditingBackstory(false); setFieldValidationError('');}} className="edit-cancel-btn"><IoClose className="w-5 h-5" /></button>
                        </div>
                    </div>
                    {fieldValidationError && (
                        <div className="p-3 mb-2 text-sm font-medium" style={{ 
                            color: '#6b4a2e', 
                            backgroundColor: 'rgba(246, 233, 201, 0.95)', 
                            borderRadius: '8px'
                        }}>
                            {fieldValidationError}
                        </div>
                    )}
                    <textarea
                        value={tempBackstory}
                        onChange={(e) => handleBackstoryChange(e.target.value)}
                        className="edit-input backstory-textarea"
                        placeholder="Letters, numbers, and spaces only"
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
        <div 
            className="root-container" 
            style={{
                backgroundImage: `url(${loginBg.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh'
            }}
        >
            <div className="char-sheet-container" style={{ transform: 'scale(0.88)', transformOrigin: 'top center' }}>
                <header className="sheet-header">
                    {renderHeader()}
                </header>
                <div className="main-grid">
                    <div className="space-y-8 lg:col-span-2 lg:order-1">
                        {renderBasic()}
                    </div>
                    <div className="space-y-8 lg:col-span-3 lg:order-3">
                        {renderStats()}
                    </div>
                    <div className="space-y-8 lg:col-span-3 lg:order-4">
                        {renderSkills()}
                    </div>
                    <div className="space-y-8 lg:col-span-1 lg:order-2">
                        {renderBackstory()}
                    </div>
                </div>

                <div className="action-button-container" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', paddingTop: '2rem' }}>
                    <button 
                        className="action-button" 
                        style={{
                            backgroundColor: '#dc2626',
                            color: '#ffffff',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '50px',
                            fontWeight: '700',
                            fontSize: '1rem',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
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
                                    backstory: characterData.backstory,
                                    icon: characterData.iconId
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
                                    navigateWithLoading('/pages/lobby', 'Loading your adventures...');
                                } else {
                                    throw new Error(result.message || 'Failed to save character');
                                }
                            } catch (err) {
                                console.error('Error saving character:', err);
                                // You might want to show an error message to the user here
                            }
                        }}
                    >
                        Create Character
                    </button>
                    <BottomNav/>
                </div>
            </div>
        </div>
    );
}
