'use client'
import Nav from "@/app/components/nav/nav";
import { useState, useEffect } from "react";
import Background from "@/app/components/assets/mainBackground.jpg";
import { API_BASE_URL } from "@/app/config/api";
import StarWars from "@/app/components/assets/star_wars.png";
import Avatar from "@/app/components/assets/avatar.png";
import LordOfRings from "@/app/components/assets/lord_of_rings.png";
import HarryPotter from "@/app/components/assets/harry_potter.png";
import Scenario1 from "@/app/components/assets/Scenario_1.png";
import Dice from "@/app/components/dice/dice";
import Roll from "@/app/components/dice/roll";
import GameManager from "@/app/components/gameManager/gameManager";
import { useRouter } from "next/navigation";
import {AbilityBars} from "@/app/components/character/abilities/abilities";
import { CharacterIcon } from "@/app/components/character/characterIcon";
import { API_ENDPOINTS } from "@/config/api";

type ConversationItem = {
    sender: 'User' | 'DM' | string;
    text: string;
};


interface Option {
    option: string;
    ability: string;
    dc: number;
    dice: string;
    success: {
        next: string;
        narration: string;
        ability_change: { [key: string]: number };
    };
    failure: {
        next: string;
        narration: string;
        ability_change: { [key: string]: number };
    };
}

interface OptionsProps {
    options: (Option | string)[];
    onOptionClick: (option: Option | string) => void;
}

function Options({ options, onOptionClick }: OptionsProps) {
    if (!options || options.length === 0) {
        return null;
    }

    const isComplexOption = (option: any): option is Option => {
        return typeof option === 'object' && option !== null && 'success' in option && 'failure' in option;
    };

  return (
    <div className="options-container" style={{
      position: 'absolute',
      bottom: 'clamp(12px, 12vh, 150px)', // responsive offset from bottom
            left: '50%',
            transform: 'translateX(-50%)',
      width: '80%',
            maxWidth: '600px',
            backgroundColor: 'rgba(246, 233, 201, 0.9)',
            padding: '15px',
            borderRadius: '8px',
            border: '1px solid #6b4a2e',
            color: '#6b4a2e',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            zIndex: 10,
        }}>
            <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Choose your action:</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {options.map((option, index) => {
                    if (isComplexOption(option)) {
                        return (
              <li
                key={index}
                className="option-item"
                onClick={() => onOptionClick(option)}
                style={{
                padding: '10px',
                borderBottom: '1px solid #6b4a2e',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(107, 74, 46, 0.1)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                {`${index + 1}. ${option.option}`}
              </li>
                        );
                    }
                    // Fallback for simple string options
                    return (
                        <li key={index} className="option-item" onClick={() => onOptionClick(option)} style={{
                            padding: '10px',
                            borderBottom: '1px solid #6b4a2e',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(107, 74, 46, 0.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            {`${index + 1}. ${option}`}
                        </li>
                    );
                })}
            </ul>
      {/* info icon and tooltip removed for cleaner, consistent layout */}
        </div>
    );
}

interface RollInfoProps {
    info: {
        success: string;
        failure: string;
        dc: number;
        ability: string;
        dice: string;
        rollResult?: number;
        outcome?: 'success' | 'failure';
        success_ability_change?: { [key: string]: number };
        failure_ability_change?: { [key: string]: number };
    };
    onContinue: () => void;
}

function RollInfo({ info, onContinue }: RollInfoProps) {
    console.log("RollInfo received:", info); // <-- ADDING LOG

    const getChangeText = (change: { [key: string]: number } | undefined, isSuccess: boolean) => {
        if (!change) return "";
        return Object.entries(change)
            .map(([key, amount]) => {
                // Apply halving logic: if success and negative change, halve it
                const actualAmount = (isSuccess && amount < 0) ? Math.floor(amount / 2) : amount;
                return `${key} changes by ${actualAmount}`;
            })
            .join(', ');
    };

    const outcomeText = info.outcome === 'success' 
        ? info.success 
        : info.failure;
    
    const abilityChangeText = info.outcome === 'success'
        ? getChangeText(info.success_ability_change, true)
        : getChangeText(info.failure_ability_change, false);

    console.log("Ability change text:", abilityChangeText); // <-- ADDING LOG

    return (
    <div className="options-container" style={{
      position: 'absolute',
      bottom: 'clamp(12px, 12vh, 150px)',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            maxWidth: '600px',
            backgroundColor: 'rgba(246, 233, 201, 0.9)',
            padding: '15px',
            borderRadius: '8px',
            border: '1px solid #6b4a2e',
            color: '#6b4a2e',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            zIndex: 10,
            textAlign: 'center'
        }}>
            {!info.rollResult ? (
                <>
                    <h3 style={{ marginBottom: '15px' }}>Roll a {info.ability} check with {info.dice}.</h3>
                    <div style={{ textAlign: 'left', padding: '0 15px' }}>
                        <p style={{ marginBottom: '10px' }}><strong>Success:</strong> {info.success} {info.success_ability_change && `(${getChangeText(info.success_ability_change, true)})`}</p>
                        <p><strong>Failure:</strong> {info.failure} {info.failure_ability_change && `(${getChangeText(info.failure_ability_change, false)})`}</p>
                    </div>
                </>
            ) : (
                <>
                    <h3 style={{ marginBottom: '10px' }}>
                        Roll: {info.rollResult} vs DC: {info.dc} - <span style={{ color: info.outcome === 'success' ? 'green' : 'red' }}>{info.outcome?.toUpperCase()}</span>
                    </h3>
                    <p style={{ padding: '0 15px', textAlign: 'left' }}>{outcomeText}</p>
                    <p style={{ padding: '0 15px', textAlign: 'left', fontWeight: 'bold' }}>{abilityChangeText}</p>
                    <button onClick={onContinue} style={{
                        marginTop: '15px',
                        padding: '10px 20px',
                        backgroundColor: '#6b4a2e',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}>Continue</button>
                </>
            )}
        </div>
    );
}


type Character = {
    name: string;
    // Add other character properties here as needed
    [key: string]: any; 
};

export default function Game() {
  const router = useRouter()
  const [sides, setSides] = useState<number>(20);
  const [activeDice, setActiveDice] = useState("d20");
  const [DMmessage, setDMmessage] = useState("Connecting...");
  const [scene, setScene] = useState('');
  const [options, setOptions] = useState<(Option | string)[]>([]);
  const [username, setUsername] = useState('');
  const [seed, setSeed] = useState('');
  const [turn_num, setTurnNum] = useState('');
  const [characterData, setCharacterData] = useState<Character | null>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [rollInfo, setRollInfo] = useState<{
    success: string;
    failure: string;
    dc: number;
    ability: string;
    dice: string;
    rollResult?: number;
    outcome?: 'success' | 'failure';
    success_ability_change?: { [key: string]: number };
    failure_ability_change?: { [key: string]: number };
  } | null>(null);
  const [pendingAction, setPendingAction] = useState<{
    description: string;
    action: string;
    ability: string;
    dc: number;
    dice: string;
    options: string[];
  } | null>(null);
  const [background, setBackground] = useState(Background);
  const [userin, setUserin] = useState('');
  const [conversation, setConversation] = useState<ConversationItem[]>([
      { sender: 'DM', text: DMmessage }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  // campaign metadata mapping (seed -> campaign info)
  const campaignMeta: { [key: string]: { title: string; notes: string } } = {
    '1': {
      title: 'Echoes of the Force',
      notes: 'Star Wars–inspired adventure set post-Clone Wars. Player is a Force-adept with amnesia. Includes Force alignment tracking and familiar cameos via holocrons and references. Abilities 0–30 (sum 120), skill thresholds 10/20/25, multiple endings.'
    },
    '2': {
      title: 'The Last Ember of Balance',
      notes: 'Avatar-inspired adventure. Classical era tone, mystical and introspective. Player is the Avatar, traveling with a trusted friend and Appa. Abilities 0–30 (sum 120), skill thresholds 10/20/25. Multiple endings.'
    },
    '3': {
      title: 'The Shattered Crown of Elarion',
      notes: 'LOTR-inspired epic. Classic hopeful tone, lyrical narration with verses in plain text. Familiar places and figures as references. Abilities 0–30 (sum 120), skill thresholds 10/20/25. Shadow corruption meter with multiple endings.'
    },
    '4': {
      title: 'The Shattered Hourglass',
      notes: 'Hogwarts mystery with time distortions. Familiar names included as cameos. Abilities 0–30 (sum 120). Hidden skill-gated options. Multiple endings.'
    },
    '5': {
      title: 'Echoes of the Ember King',
      notes: 'Classic fantasy interactive fiction with dice. Abilities 0-30; total 120; skill thresholds at 10/20/25. This export includes hidden, skill-gated options in several scenes.'
    }
  };

  const currentCampaign = campaignMeta[seed] || { title: 'Unknown Campaign', notes: '' };

  const handleDiceSelect = (selectedSides: number) => {
    setSides(selectedSides);
  }
  const handleActiveSelect = (dice: string) => {
    setActiveDice(dice);
  }

  const handleOptionClick = async (option: Option | string) => {
    if (isLoading) return;

    console.log("Option clicked:", option); // <-- ADDING LOG

    const optionText = typeof option === 'string' ? option : option.option;
    setConversation(prev => [...prev, { sender: characterData?.name || 'User', text: optionText }]);

    // Always send the option to the backend to handle.
    setIsLoading(true);
    try {
        const payload = { message: option, username: username, seed: seed, step: 'get_roll_info', turn_num: turn_num };
        const response = await fetch(`${API_BASE_URL}/userin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        const result = await response.json();

        if (result.requires_roll) {
            setRollInfo({
                success: result.success_narration || "You succeed.", // Provide fallbacks
                failure: result.failure_narration || "You fail.",   // Provide fallbacks
                dc: result.dc,
                ability: result.ability,
                dice: result.dice,
                success_ability_change: result.success_ability_change,
                failure_ability_change: result.failure_ability_change
            });
            setPendingAction({
                description: result.description,
                action: optionText,
                ability: result.ability,
                dc: result.dc,
                dice: result.dice,
                options: result.options || []
            });
            setOptions([]);
        } else {
            setConversation(prev => [...prev, { sender: 'DM', text: result.message }]);
            setScene('Background: ' + (result.scene || ''));
            setOptions(result.options || []);
            setTurnNum(result.turn_num || '0');
            setSkills(result.skills || skills);
        }
    } catch (error) {
        console.error("Error during action selection:", error);
        setConversation(prev => [...prev, { sender: 'DM', text: "Something went wrong. Please try again." }]);
    } finally {
        setIsLoading(false);
    }
  };

  const handleRoll = async (rollResult: number) => {
    if (!pendingAction || !rollInfo || isLoading) return;

    setIsLoading(true);
    const outcome = rollResult >= pendingAction.dc ? 'success' : 'failure';

    // Update the rollInfo state to show the result
    setRollInfo(prev => prev ? { ...prev, rollResult, outcome } : null);
    
    // The conversation log can be updated here or in handleContinue
    setConversation(prev => [...prev, { sender: characterData?.name || 'User', text: `(Rolled a ${rollResult} for ${pendingAction.ability} - ${outcome.toUpperCase()})` }]);

    // No backend call here yet, just show the result. The user will click "Continue".
    setIsLoading(false);
  };

  const handleContinue = async () => {
    if (!pendingAction || !rollInfo || !rollInfo.rollResult) return;

    setIsLoading(true);
    
    try {
        const payload = {
            message: pendingAction.action,
            username: username,
            seed: seed,
            roll: rollInfo.rollResult,
            step: 'get_outcome',
            description: pendingAction.description,
            skills: skills,
            turn_num: turn_num
        };
        const response = await fetch(`${API_BASE_URL}/userin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        const result = await response.json();

        setConversation(prev => [...prev, { sender: 'DM', text: result.message }]);
        setScene('Background: ' + (result.scene || ''));
        setOptions(result.options || []);
        setSkills(result.skills || skills);
        setTurnNum(result.turn_num || turn_num);

        if (result.characterData) {
            setCharacterData(result.characterData);
        }

    } catch (error) {
        console.error("Error during roll submission:", error);
        setConversation(prev => [...prev, { sender: 'DM', text: "The DM seems confused by your roll. Try again." }]);
    } finally {
        setRollInfo(null); // Clear the roll info/result box
        setPendingAction(null); // Reset pending action
        setIsLoading(false);
    }
  };

  const handleSend = async (message?: string) => {
        const userMessage = message || userin.trim();
        if (!userMessage || isLoading) return;

        setUserin('');
        setIsLoading(true);

        setConversation(prev => [...prev, { sender: username || 'User', text: userMessage }]);
        
        try {
            const payload = {
                message: userMessage,
                username: username,
                seed: seed,
                characterData: characterData,
                turn_num: turn_num
            };

            const response = await fetch(`${API_BASE_URL}/userin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            
            setConversation(prev => [...prev, { sender: 'DM', text: result.message || "The DM responds, 'Silence falls over the area...'" }]);
            setScene('Background: ' + (result.scene || ''));
            setOptions(result.options || []);
            setDMmessage(result.message);
            setTurnNum(result.turn_num || '0');
            setSkills(result.skills || skills);
    } catch (error) {
      console.error("Something went wrong with fetch dm message, line 81", error);
      setDMmessage("Error: could not fetch python response, something went wrong, line 82");
    }
    setIsLoading(false);
    setIsHistoryOpen(false);
  };

  const fetchDMmessage = async (username: string, seed: string | null) => {
    try {
      const response = await fetch(`${API_BASE_URL}/DMout`);
      const data = await response.json();

      setDMmessage(data.dm_text);
      setScene("Background: " + data.scene || '');
      setOptions(data.options || []);
      setTurnNum(data.turn_num || '0');
      setConversation([{sender : 'DM', text : data.dm_text}]); // Start conversation with DM message
      
      // After getting the initial message, fetch the character data
      if (username) {
        fetchCharacterData(username, seed);
      }
    } catch (error) {
      console.error("Something went wrong with fetch dm message, line 81", error);
      setDMmessage("Error: could not fetch python response, something went wrong, line 82");
    }
  };

  const fetchCharacterData = async (username: string, seed: string | null) => {
    if (!seed) {
        console.error("No seed provided, cannot fetch character data.");
        return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/character-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, seed }),
      });
      
      if (!response.ok) throw new Error('Failed to fetch character data');
      
      const data = await response.json();
      // The backend sends an array with one character, so we take the first element
      setCharacterData(data.characterData);
      setSkills(data.skills || []);
    } catch (error) {
      console.error('Error fetching character data:', error);
    }
  };

  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    const campaignId = localStorage.getItem('campaignId');
    const savedTurnNum = localStorage.getItem('turn_num');

    if (campaignId) {
      setSeed(campaignId);
      switch (campaignId) {
        case '1':
          setBackground(StarWars);
          break;
        case '2':
          setBackground(Avatar);
          break;
        case '3':
          setBackground(LordOfRings);
          break;
        case '4':
          setBackground(HarryPotter);
          break;
        case '5':
          setBackground(Scenario1);
          break;
        default:
          setBackground(Background);
      }
    }

    if (savedUsername) {
      setUsername(savedUsername);
      fetchDMmessage(savedUsername, campaignId);
    } else {
        // Handle case where there is no saved username, maybe redirect to login
        fetchDMmessage('', null);
    }
    if (savedTurnNum) {
        setTurnNum(savedTurnNum);
    }
    else {
        setTurnNum('0');
    }
  }, []);

  useEffect(() => {

    if (turn_num) {
        localStorage.setItem('turn_num', turn_num);
    }
  }, [turn_num]);

  const latestMessage = conversation[conversation.length - 1];

  return (
    <div className="root-container" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
  <Nav title="QuestWeaver" showLeaveButton={true} onBookClick={() => setIsInfoOpen(v => !v)} noShadow={true} characterIconId={characterData?.iconId} />
        <div className="main-session-box" style={{ flex: 1, height: '100%', display: 'flex', alignItems: 'stretch', position: 'relative', minHeight: 0 }}>
            <div className="dice-box" style={{
              position: 'absolute',
              top: '50%',
              left: '20px',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              padding: '15px',
              borderRadius: '8px',
              border: '1px solid #4a4a4a',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px'
            }}>
              <div>
                <Dice 
                  onDiceSelect={handleDiceSelect} 
                  activeDice={activeDice} 
                  onSetActiveDice={handleActiveSelect}
                />
              </div>
              <div>
                <Roll 
                  sides={pendingAction ? parseInt(pendingAction.dice.replace('1d', '')) : sides} 
                  onRollClick={handleRoll}
                  disabled={!pendingAction}
                />
              </div>
            </div>
          <main className="game-box" style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
            <img src={background.src} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7)' }} />
            <div className="scene-box" style={{
              position: 'absolute',
              top: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80%',
              maxWidth: '800px',
            }}>
              <p className="scene-box-p">
                {scene || 'The scene is about to unfold...'}
              </p>
            </div>
            <div className={`message-display-toggle ${isHistoryOpen ? 'full-history' : 'latest-message'}`} 
                 style={{
                    backgroundColor: 'rgba(246, 233, 201, 0.9)',
                    color: '#6b4a2e',
                    border: '1px solid #6b4a2e'
                 }}
                 onClick={() => setIsHistoryOpen(!isHistoryOpen)}>
            {isHistoryOpen ? (
              <div className="full-conversation-log">
                {conversation.map((item, index) => (
                  <p key={index} className={item.sender === 'User' ? 'user-text' : 'dm-text'}>
                    <strong>{item.sender}</strong> {item.text}
                  </p>
                ))}
              </div>
            ) : (
              <p className={latestMessage.sender === 'User' ? 'user-text' : 'dm-text'}>
                <strong>{latestMessage.sender}</strong> {latestMessage.text}
                <span className="click-prompt">(Click to see history)</span>
              </p>
            )}
          </div>
          {rollInfo ? (
              <RollInfo info={rollInfo} onContinue={handleContinue} />
          ) : (
              <Options options={options} onOptionClick={handleOptionClick} />
          )}
            {/* persistent character attributes on game page */}
            <div className="party-box" style={{
              position: 'absolute',
              top: 'clamp(15px, 2vh, 20px)',
              right: 'clamp(10px, 2vw, 20px)',
              width: 'clamp(180px, 22vw, 240px)',
              backgroundColor: 'rgba(246, 233, 201, 0.9)',
              padding: 'clamp(5px, 0.8vh, 8px)',
              borderRadius: '8px',
              border: '1px solid #6b4a2e',
              color: '#6b4a2e',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              zIndex: 10,
              maxHeight: 'calc(100vh - 40px)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ flex: '0 0 auto', minHeight: 0, overflow: 'visible', transform: 'scale(0.95)', transformOrigin: 'top right', marginBottom: 'clamp(3px, 0.4vh, 6px)' }}>
                <AbilityBars characterData={characterData} compact={true} />
              </div>
              <div className="skills-box" style={{ marginTop: 'clamp(0px, 0vh, 2px)', flex: '1 1 auto', minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <h2 style={{ fontSize: 'clamp(15px, 2.5vh, 20px)', textAlign: 'center', marginBottom: 'clamp(2px, 0.3vh, 4px)', flexShrink: 0 }}>Skills</h2>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, overflow: 'hidden' }}>
                  {(skills || []).slice(0, 12).map((skill, index) => (
                    <li
                      key={index}
                      style={{
                        fontSize: 'clamp(15px, 2.5vh, 20px)',
                        padding: 'clamp(1px, 0.2vh, 2px) clamp(8px, 1vw, 12px)',
                        margin: 'clamp(1px, 0.2vh, 3px) 0',
                        backgroundColor: 'rgba(107, 74, 46, 0.10)',
                        color: '#6b4a2e',
                        border: '1px solid rgba(107, 74, 46, 0.4)',
                        borderRadius: '9999px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                      title={skill}
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* nav book icon toggles this popout */}
            {isInfoOpen && (
              <div
                className="info-popout"
                style={{
                  position: 'absolute',
                  top: 'clamp(60px, 8vh, 80px)',
                  right: 'clamp(10px, 2vw, 20px)',
                  width: 'clamp(250px, 22vw, 320px)',
                  maxHeight: 'calc(100vh - 100px)',
                  backgroundColor: 'rgba(246, 233, 201, 0.95)',
                  padding: 'clamp(8px, 1.5vh, 12px)',
                  borderRadius: '8px',
                  border: '1px solid #6b4a2e',
                  color: '#6b4a2e',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                  zIndex: 20,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <h2 style={{ fontSize: 'clamp(14px, 1.8vh, 18px)', fontWeight: 700, textAlign: 'center', marginBottom: 'clamp(4px, 0.8vh, 8px)', lineHeight: 1.2, flexShrink: 0 }}>
                  {currentCampaign.title}
                </h2>
                
                <div style={{ fontSize: 'clamp(9px, 1.2vh, 11px)', lineHeight: 1.2, marginBottom: 'clamp(4px, 0.8vh, 8px)', flexShrink: 0 }}>
                  <div style={{ marginBottom: 'clamp(2px, 0.4vh, 4px)' }}>
                    <strong>Player:</strong> {characterData?.name || 'Unknown'}
                  </div>
                  <div style={{ marginBottom: 'clamp(2px, 0.4vh, 4px)' }}>
                    <strong>Class:</strong> {characterData?.cla || 'n/a'}{characterData?.subclass ? ` (${characterData.subclass})` : ''}
                  </div>
                  <div style={{ marginBottom: 'clamp(2px, 0.4vh, 4px)' }}>
                    <strong>Race:</strong> {characterData?.race || 'n/a'}
                  </div>
                  <div style={{ marginBottom: 'clamp(2px, 0.4vh, 4px)' }}>
                    <strong>Turn:</strong> {characterData?.current_turn || '0'}
                  </div>
                </div>

                <div style={{ fontSize: 'clamp(8px, 1vh, 10px)', lineHeight: 1.2, marginTop: 'clamp(4px, 0.8vh, 8px)', paddingTop: 'clamp(4px, 0.8vh, 8px)', borderTop: '1px solid #6b4a2e', flex: '1 1 auto', minHeight: 0, overflow: 'hidden' }}>
                  <strong style={{ fontSize: 'clamp(9px, 1.2vh, 11px)' }}>Campaign Notes:</strong>
                  <p style={{ marginTop: 'clamp(2px, 0.4vh, 4px)', marginBottom: 0, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 6, WebkitBoxOrient: 'vertical' }}>
                    {currentCampaign.notes.replace(/'/g, "'")}
                  </p>
                </div>
              </div>
            )}
            <div className="game">
              {/* <GameManager 
              userin={userin}
              setUserin={setUserin}
              handleSend={() => handleSend()}
              isLoading={isLoading}          /> */}
              <div className="player-actions">
              </div>
            </div>
          </main>
        </div>
    </div>
  )
};
