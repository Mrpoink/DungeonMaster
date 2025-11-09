'use client'
import { useState, useEffect, SetStateAction } from "react";
import Background from "@/app/components/assets/mainBackground.jpg";
import Dice from "@/app/components/dice/dice";
import Roll from "@/app/components/dice/roll";
import Party from "@/app/components/party/party";
import GameManager from "@/app/components/gameManager/gameManager";

type ConversationItem = {
    sender: 'User' | 'DM' | string;
    text: string;
};

export default function Game() {
  const [sides, setSides] = useState<number>(20);
  const [activeDice, setActiveDice] = useState("d20");
  const [DMmessage, setDMmessage] = useState("Connecting...");
  const [scene, setScene] = useState('');

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

  const handleSend = async () => {
        if (!userin.trim() || isLoading) return;

        const userMessage = userin.trim();
        setUserin('');
        setIsLoading(true);

        setConversation(prev => [...prev, { sender: 'User', text: userMessage }]);
        
        try {
            const payload = {
                message: userMessage
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
      setDMmessage(result.message);
    } catch (error) {
      console.error("Something went wrong with fetch dm message, line 81", error);
      setDMmessage("Error: could not fetch python response, something went wrong, line 82");
    }
    setIsLoading(false);
    setIsHistoryOpen(false);
  };

  const fetchDMmessage = async () => {
    try{

      const response = await fetch('http://localhost:1068/DMout');
      const data = await response.json();

      setDMmessage(data.dm_text);
      setConversation(prev => [...prev, {sender : 'DM', text : data.dm_text}]);
    } catch (error) {
      console.error("Something went wrong with fetch dm message, line 81", error);
      setDMmessage("Error: could not fetch python response, something went wrong, line 82");
    }
  };

  useEffect(() => {
    fetchDMmessage();
  }, []);

  const latestMessage = conversation[conversation.length - 1];

  return (
    <div className="root-container">
        <div className="game-master-box">
          <header>
            <h1>Dungeon Master:</h1>      
          </header>
        </div>
        <div className="main-session-box">
          <div className="dice-box">
            <Dice 
              onDiceSelect={handleDiceSelect} 
              activeDice={activeDice} 
              onSetActiveDice={handleActiveSelect}
            />
          </div>
          <main className="game-box">
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
            <div className="game">
              <GameManager 
              userin={userin}
              setUserin={setUserin}
              handleSend={handleSend}
              isLoading={isLoading}          />
              <div className="player-actions">
                <Roll 
                  sides={sides} 
                  command={userin}
                  onRollClick={handleSend}
                  setConversation={setConversation}
                />
              </div>
              <button className="submit-action" onClick={() => {handleSend()}}>
                Enter
              </button>
            </div>
          </main>
          <div className="party-box">
            <Party />
          </div>
        </div>
    </div>
  )
};