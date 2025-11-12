'use client'
import Nav from "@/app/components/nav/nav";
import { useState, useEffect } from "react";
import Background from "@/app/components/assets/mainBackground.jpg";
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
            bottom: '150px', // Adjust as needed
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
                            <li key={index} className="option-item" style={{
                                padding: '10px',
                                borderBottom: '1px solid #6b4a2e',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(107, 74, 46, 0.1)'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                <span onClick={() => onOptionClick(option)} style={{ flexGrow: 1 }}>{`${index + 1}. ${option.option}`}</span>
                                <div className="info-icon-container" style={{ position: 'relative', marginLeft: '10px' }}>
                                    <span className="info-icon" style={{
                                        cursor: 'pointer',
                                        display: 'inline-block',
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        backgroundColor: '#6b4a2e',
                                        color: 'white',
                                        textAlign: 'center',
                                        lineHeight: '20px',
                                        fontWeight: 'bold',
                                    }}>i</span>
                                    <div className="tooltip" style={{
                                        visibility: 'hidden',
                                        width: '250px',
                                        backgroundColor: 'black',
                                        color: '#fff',
                                        textAlign: 'left',
                                        borderRadius: '6px',
                                        padding: '10px',
                                        position: 'absolute',
                                        zIndex: 1,
                                        bottom: '125%',
                                        left: '50%',
                                        marginLeft: '-125px',
                                        opacity: 0,
                                        transition: 'opacity 0.3s',
                                    }}>
                                        <strong>Success:</strong> {option.success.narration}<br />
                                        <strong>Failure:</strong> {option.failure.narration}<br />
                                    </div>
                                </div>
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
            <style jsx>{`
                .info-icon-container:hover .tooltip {
                    visibility: visible;
                    opacity: 1;
                }
            `}</style>
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

    const getChangeText = (change: { [key: string]: number } | undefined) => {
        if (!change) return "";
        return Object.entries(change)
            .map(([key, amount]) => `${key} changes by ${amount}`)
            .join(', ');
    };

    const outcomeText = info.outcome === 'success' 
        ? info.success 
        : info.failure;
    
    const abilityChangeText = info.outcome === 'success'
        ? getChangeText(info.success_ability_change)
        : getChangeText(info.failure_ability_change);

    console.log("Ability change text:", abilityChangeText); // <-- ADDING LOG

    return (
        <div className="options-container" style={{
            position: 'absolute',
            bottom: '150px',
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
                    <h3 style={{ marginBottom: '15px' }}>Roll a {info.ability} check with {info.dice}. DC: {info.dc}</h3>
                    <div style={{ textAlign: 'left', padding: '0 15px' }}>
                        <p style={{ marginBottom: '10px' }}><strong>Success:</strong> {info.success} {info.success_ability_change && `(${getChangeText(info.success_ability_change)})`}</p>
                        <p><strong>Failure:</strong> {info.failure} {info.failure_ability_change && `(${getChangeText(info.failure_ability_change)})`}</p>
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
        const payload = { message: option, username: username, step: 'get_roll_info', turn_num: turn_num };
        const response = await fetch('http://localhost:1068/userin', {
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
            roll: rollInfo.rollResult,
            step: 'get_outcome',
            description: pendingAction.description,
            skills: skills,
            turn_num: turn_num
        };
        const response = await fetch('http://localhost:1068/userin', {
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
                characterData: characterData,
                turn_num: turn_num
            };

            const response = await fetch('http://localhost:1068/userin', {
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
    } catch (error) {
      console.error("Something went wrong with fetch dm message, line 81", error);
      setDMmessage("Error: could not fetch python response, something went wrong, line 82");
    }
    setIsLoading(false);
    setIsHistoryOpen(false);
  };

  const fetchDMmessage = async (username: string) => {
    try {
      const response = await fetch('http://localhost:1068/DMout');
      const data = await response.json();

      setDMmessage(data.dm_text);
      setScene("Background: " + data.scene || '');
      setOptions(data.options || []);
      setTurnNum(data.turn_num || '0');
      setConversation([{sender : 'DM', text : data.dm_text}]); // Start conversation with DM message
      
      // After getting the initial message, fetch the character data
      if (username) {
        fetchCharacterData(username);
      }
    } catch (error) {
      console.error("Something went wrong with fetch dm message, line 81", error);
      setDMmessage("Error: could not fetch python response, something went wrong, line 82");
    }
  };

  const fetchCharacterData = async (username: string) => {
    try {
      const response = await fetch('http://localhost:1068/character-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
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
      fetchDMmessage(savedUsername);
    } else {
        // Handle case where there is no saved username, maybe redirect to login
        fetchDMmessage('');
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
    <div className="root-container">
        <Nav title="QuestWeaver" showLeaveButton={true} />
        <div className="main-session-box">
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
          <main className="game-box" style={{ position: 'relative' }}>
            <img src={background.src} alt="" style={{ filter: 'brightness(0.7)' }} />
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
            <div className="party-box" style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '280px',
              backgroundColor: 'rgba(246, 233, 201, 0.9)',
              padding: '15px',
              borderRadius: '8px',
              border: '1px solid #6b4a2e',
              color: '#6b4a2e',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              zIndex: 10,
            }}>
              <AbilityBars characterData={characterData} />
              <div className="skills-box" style={{
                marginTop: '20px',
                paddingRight: '10px'
              }}>
                <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Skills</h2>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {(skills || []).map((skill, index) => (
                    <li key={index} style={{ padding: '5px 0', borderBottom: '1px solid #6b4a2e' }}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
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
