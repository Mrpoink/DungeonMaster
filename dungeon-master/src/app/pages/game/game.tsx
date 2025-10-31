'use client'
import { useState } from "react";
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

  const [userin, setUserin] = useState('');
    const [conversation, setConversation] = useState<ConversationItem[]>([
        { sender: 'DM', text: "Welcome, adventurer! You find yourself at the entrance of a dark, damp cave. What is your first action?" }
    ]);
    const [isLoading, setIsLoading] = useState(false);

  const handleDiceSelect = (selectedSides: number) => {
    setSides(selectedSides);
  }
  const handleActiveSelect = (dice: string) => {
    setActiveDice(dice);
  }

  const handleSend = async (isRoll: boolean) => {
        if (!userin.trim() || isLoading) return;

        const userMessage = userin.trim();
        setUserin('');
        setIsLoading(true);

        const rollSuffix = isRoll ? ' (Attempted Roll)' : '';
        setConversation(prev => [...prev, { sender: 'User', text: userMessage + rollSuffix }]);
        
        try {
            const payload = {
                message: userMessage,
                roll: isRoll
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

        } catch (error) {
            console.error("Failed to communicate with backend:", error);
            setConversation(prev => [
                ...prev, 
                { sender: 'DM', text: "System Error: Could not connect to Python backend (http://localhost:1068)." }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

  return (
    <div>
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
            <div className="game">
              <GameManager 
                userin={userin}
                setUserin={setUserin}
                handleSend={handleSend}
                isLoading={isLoading}              
              />
              <div className="player-actions">
                <Roll 
                  sides={sides} 
                  command={userin}
                  onRollClick={handleSend}
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
}