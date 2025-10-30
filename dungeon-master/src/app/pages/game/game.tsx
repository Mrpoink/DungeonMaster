'use client'
import { useState, useEffect, SetStateAction } from "react";
import Background from "@/app/components/assets/mainBackground.png";
import Dice from "@/app/components/dice/dice";
import GameMasterHeader from "@/app/components/gameMasterHeader/gameMasterHeader";
import { Roll } from "@/app/components/dice/dice";
import Party from "@/app/components/party/party";
import GameMaster from "@/app/components/gameMasterHeader/gameMaster";


export default function Game() {
  var turn_num = 0;
  // type ConversationMessage = { sender: 'User' | 'DM' | string; text: string };
  const [sides, setSides] = useState<number>(20);
  const [activeDice, setActiveDice] = useState("d20");
  // const [DMmessage, setDMmessage] = useState("Connecting...");
  // const [conversation, setConversation] = useState<ConversationMessage[]>([]);

  const handleDiceSelect = (selectedSides: number) => {
    setSides(selectedSides);
  }
  const handleActiveSelect = (dice: string) => {
    setActiveDice(dice);
  }
  

  // const sendUserin = async () => {
  //   const userMessage = userin;
  //   setConversation(prev => [...prev, {sender: 'User', text:userMessage}]);
  //   send_userin('');
  //   try {
  //     const response = await fetch('http://localhost:1068/userin', {
  //       method : 'POST',
  //       headers: {
  //         'Content-Type' : 'application/json',
  //       },
  //       body : JSON.stringify({command : userMessage}),
  //     });
  //     send_userin('');

  //     const result = await response.json();

  //     setConversation(prev => [...prev, {sender : 'DM', text : result.message}]);
  //   } catch (error){
  //     console.error("Failed to send userin to python: ", error)
  //     setConversation(prev => [...prev, { sender: 'DM', text: "Server Error: Could not connect to Python backend." }]);
  //   }
    
  // };
  // const [userin, send_userin] = useState('');

  // const handleUserin = (event: { target: { value: SetStateAction<string> } }) => {
  //   send_userin(event.target.value);
  // };

  // const fetchDMmessage = async () => {
  //   try{

  //     const response = await fetch('http://localhost:1068/DMout');
  //     const data = await response.json();

  //     setDMmessage(data.dm_text);
  //   } catch (error) {
  //     console.error("Something went wrong with fetch dm message, line 81", error);
  //     setDMmessage("Error: could not fetch python response, something went wrong, line 82");
  //   }
  //   turn_num += 1;
  // };

  // useEffect(() => {
  //   fetchDMmessage();
  // }, []);

  return (
    <div>
        <div className="game-master-box">
          <GameMasterHeader />
        </div>
        <div className="main-session-box">
          <div className="dice-box">
            <Dice 
              onDiceSelect={handleDiceSelect} 
              activeDice={activeDice} 
              onSetActiveDice={handleActiveSelect}
            />
          </div>
          <main className="game">
            <img src={Background.src} alt="" />
            {/* <div className = "message-log">
              {conversation.map((msg, index) => (
                <p key={index} className={`message ${msg.sender.toLowerCase()}`}>
                  <strong>{msg.sender}:</strong> {msg.text}
                </p>
              ))}
            </div> */}
            <div className="player-actions">
              <input type="text" value={userin} 
                onChange={handleUserin} placeholder="What do you do?"
                onKeyDown={(event) => {
                  if (event.key == 'Enter') {
                    event.preventDefault();
                    sendUserin();
                  }
                }}
              />
              <button className="submit-action" onClick={() => {sendUserin()}}>
                Enter
              </button>
              <Roll sides={sides} />
            </div>
            <div className="party-box">
              <Party />
            </div>
            <div>
              <blockquote>
                {DMmessage}
              </blockquote>
            </div>
          </main>
        </div>
    </div>
  )
}