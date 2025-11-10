'use client'
import { useState, useEffect, SetStateAction } from "react";
import Background from "@/app/components/assets/mainBackground.jpg";
import Dice from "@/app/components/dice/dice";
import Roll from "@/app/components/dice/roll";
import Party from "@/app/components/party/party";
import GameManager from "@/app/components/gameManager/gameManager";
import { useRouter } from "next/navigation";

type ConversationItem = {
    sender: 'User' | 'DM' | string;
    text: string;
};

interface OptionsProps {
    options: string[];
    onOptionClick: (option: string) => void;
}

function Options({ options, onOptionClick }: OptionsProps) {
    if (!options || options.length === 0) {
        return null;
    }

    return (
        <div className="options-container" style={{
            position: 'absolute',
            bottom: '150px', // Adjust as needed
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            maxWidth: '600px',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: '15px',
            borderRadius: '8px',
            border: '1px solid #4a4a4a',
            color: '#fff',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            zIndex: 10,
        }}>
            <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Choose your action:</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {options.map((option, index) => (
                    <li key={index} className="option-item" onClick={() => onOptionClick(option)} style={{
                        padding: '10px',
                        borderBottom: '1px solid #4a4a4a',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                        {`${index + 1}. ${option}`}
                    </li>
                ))}
            </ul>
        </div>
    );
}


export default function Game() {
  const router = useRouter()
  const [sides, setSides] = useState<number>(20);
  const [activeDice, setActiveDice] = useState("d20");
  const [DMmessage, setDMmessage] = useState("Connecting...");
  const [scene, setScene] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [username, setUsername] = useState('');
  const [characterData, setCharacterData] = useState(null);
  const [pendingAction, setPendingAction] = useState<{
    description: string;
    action: string;
    ability: string;
    dc: number;
    dice: string;
  } | null>(null);

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

  const handleOptionClick = async (option: string) => {
    if (isLoading) return;
    setIsLoading(true);
    setConversation(prev => [...prev, { sender: username || 'User', text: option }]);

    try {
        const payload = { message: option, username: username, step: 'get_roll_info' };
        const response = await fetch('http://localhost:1068/userin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        const result = await response.json();

        if (result.requires_roll) {
            setPendingAction({
                description: result.description,
                action: option,
                ability: result.ability,
                dc: result.dc,
                dice: result.dice,
            });
            setConversation(prev => [...prev, { sender: 'DM', text: `You need to make a ${result.ability} check. Roll a ${result.dice}!` }]);
            setOptions([]); // Hide options while waiting for a roll
        } else {
            // Handle actions that don't require a roll (if any)
            setConversation(prev => [...prev, { sender: 'DM', text: result.message }]);
            setScene(result.scene || '');
            setOptions(result.options || []);
        }
    } catch (error) {
        console.error("Error during action selection:", error);
        setConversation(prev => [...prev, { sender: 'DM', text: "Something went wrong. Please try again." }]);
    } finally {
        setIsLoading(false);
    }
  };

  const handleRoll = async (rollResult: number) => {
    if (!pendingAction || isLoading) return;

    setIsLoading(true);
    setConversation(prev => [...prev, { sender: 'User', text: `(Rolled a ${rollResult} for ${pendingAction.ability})` }]);

    try {
        const payload = {
            message: pendingAction.action,
            username: username,
            roll: rollResult,
            step: 'get_outcome',
            description: pendingAction.description
        };
        const response = await fetch('http://localhost:1068/userin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        const result = await response.json();

        setConversation(prev => [...prev, { sender: 'DM', text: result.message }]);
        setScene(result.scene || '');
        setOptions(result.options || []);
        setPendingAction(null); // Reset pending action

    } catch (error) {
        console.error("Error during roll submission:", error);
        setConversation(prev => [...prev, { sender: 'DM', text: "The DM seems confused by your roll. Try again." }]);
    } finally {
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
                characterData: characterData
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
            setScene(result.scene || '');
            setOptions(result.options || []);
            setDMmessage(result.message);
    } catch (error) {
      console.error("Something went wrong with fetch dm message, line 81", error);
      setDMmessage("Error: could not fetch python response, something went wrong, line 82");
    }
    setIsLoading(false);
    setIsHistoryOpen(false);
  };

  const fetchDMmessage = async () => {
    try {
      const response = await fetch('http://localhost:1068/DMout');
      const data = await response.json();

      setDMmessage(data.dm_text);
      setScene("Scene: " + data.scene || '');
      setOptions(data.options || []);
      setConversation([{sender : 'DM', text : data.dm_text}]); // Start conversation with DM message
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
      setCharacterData(data.characterData);
    } catch (error) {
      console.error('Error fetching character data:', error);
    }
  };

  useEffect(() => {
    fetchDMmessage();
    // If we have a username (from localStorage or login), fetch character data
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setUsername(savedUsername);
      fetchCharacterData(savedUsername);
    }
  }, []);

  const latestMessage = conversation[conversation.length - 1];

  return (
    <div className="root-container">
        <div className="game-master-box">
          <header>
            <h1>Dungeon Master:</h1>      
          </header>
          <div className="exit-game-button">
            <button onClick={()=>router.back()}>
              Leave Experience
            </button>
          </div>
          <div className="scene-box" style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: '15px',
            margin: '10px auto',
            borderRadius: '8px',
            border: '1px solid #4a4a4a',
            color: '#fff',
            maxWidth: '800px',
            minHeight: '50px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            textAlign: 'center'
          }}>
            <p style={{
              margin: 0,
              fontSize: '1rem',
              lineHeight: '1.5',
              fontFamily: 'serif'
            }}>{scene || 'The scene is about to unfold...'}</p>
          </div>
        </div>
        <div className="main-session-box">
          <div className="dice-box">
            <Dice 
              onDiceSelect={handleDiceSelect} 
              activeDice={activeDice} 
              onSetActiveDice={handleActiveSelect}
            />
          </div>
          <main className="game-box" style={{ position: 'relative' }}>
            <img src={Background.src} alt="" />
            <div className={`message-display-toggle ${isHistoryOpen ? 'full-history' : 'latest-message'}`} onClick={() => setIsHistoryOpen(!isHistoryOpen)}>
            {isHistoryOpen ? (
              <div className="full-conversation-log">
                {conversation.map((item, index) => (
                  <p key={index} className={item.sender === 'User' ? 'user-text' : 'dm-text'}>
                    **{item.sender}:** {item.text}
                  </p>
                ))}
              </div>
            ) : (
              <p className={latestMessage.sender === 'User' ? 'user-text' : 'dm-text'}>
                **{latestMessage.sender}:** {latestMessage.text}
                <span className="click-prompt">(Click to see history)</span>
              </p>
            )}
          </div>
          <Options options={options} onOptionClick={handleOptionClick} />
            <div className="game">
              <GameManager 
              userin={userin}
              setUserin={setUserin}
              handleSend={() => handleSend()}
              isLoading={isLoading}          />
              <div className="player-actions">
                <Roll 
                  sides={pendingAction ? parseInt(pendingAction.dice.replace('1d', '')) : sides} 
                  onRollClick={handleRoll}
                  disabled={!pendingAction}
                />
              </div>
            </div>
          </main>
          <div className="party-box">
            <Party />
          </div>
        </div>
    </div>
  )
};