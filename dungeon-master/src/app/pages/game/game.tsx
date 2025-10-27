'use client'
import { useState } from "react";
import Background from "@/app/components/assets/mainBackground.png";
import Dice from "@/app/components/dice/dice";
import GameMaster from "@/app/components/gameMaster/gameMaster";
import { Roll } from "@/app/components/dice/dice";
import Party from "@/app/components/party/party";


export default function Game() {
  var turn_num = 0;
  const [dice, setDice] = useState("d20");
  const [rollResult, setRollResult] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [DMmessage, setDMmessage] = useState("Connecting...");
  const [conversation, setConversation] = useState([]);


  const handleActive = ()=>{
    setIsActive(!isActive);
  }
  const handleRoll = () => {
    let sides = 20;
    switch (dice) {
      case "d20":
        sides = 20;
        break;
      case "d12":
        sides = 12;
        break;
      case "d10":
        sides = 10;
        break;
      case "d8":
        sides = 8;
        break;
      case "d6":
        sides = 6;
        break;
      case "d4":
        sides = 4;
        break;
      default:
        sides = 20;
    }
    const roll = Math.floor(Math.random() * sides) + 1;
    setRollResult(roll);
    
  }

  const sendUserin = async () => {
    const userMessage = userin;
    setConversation(prev => [...prev, {sender: 'User', text:userMessage}]);
    send_userin('');
    try {
      const response = await fetch('http://localhost:1068/userin', {
        method : 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify({command : userMessage}),
      });
      send_userin('');

      const result = await response.json();

      setConversation(prev => [...prev, {sender : 'DM', text : result.message}]);
    } catch (error){
      console.error("Failed to send userin to python: ", error)
      setConversation(prev => [...prev, { sender: 'DM', text: "Server Error: Could not connect to Python backend." }]);
    }
    
  };
  const [userin, send_userin] = useState('');

  const handleUserin = (event) => {
    send_userin(event.target.value);
  };

  const fetchDMmessage = async () => {
    try{

      const response = await fetch('http://localhost:1068/DMout');
      const data = await response.json();

      setDMmessage(data.dm_text);
    } catch (error) {
      console.error("Something went wrong with fetch dm message, line 81", error);
      setDMmessage("Error: could not fetch python response, something went wrong, line 82");
    }
    turn_num += 1;
  };

  useEffect(() => {
    fetchDMmessage();
  }, []);

  return (
    <div>
        <header>
            <h1>Dungeon Master:</h1>
        </header>
        <div className="dice">
          <img id="d20" src={D20.src} alt="" onClick={() => setDice("d20")} className={isActive ? 'active-dice' : 'default-dice'}/>
          <img id="d12" src={D12.src} alt="" onClick={() => setDice("d12")} className={isActive ? 'active-dice' : 'default-dice'}/>
          <img id="d10" src={D10.src} alt="" onClick={() => setDice("d10")} className={isActive ? 'activeDice' : 'default-dice'}/>
          <img id="d8" src={D8.src} alt="" onClick={() => setDice("d8")} className={isActive ? 'active-dice' : 'default-dice'}/>
          <img id="d6" src={D6.src} alt="" onClick={() => setDice("d6")} className={isActive ? 'active-dice' : 'default-dice'}/>
          <img id="d4" src={D4.src} alt="" onClick={() => setDice("d4")} className={isActive ? 'active-dice' : 'default-dice'}/>

        </div>
        <main className="game">
          <img src={Background.src} alt="" />
          <div className = "message-log">
              {conversation.map((msg, index) => (
                <p key={index} className={`message ${msg.sender.toLowerCase()}`}>
                  <strong>{msg.sender}:</strong> {msg.text}
                </p>
              ))}
            </div>
          <div className="player-actions">
            <input type="text" value={userin} onChange={handleUserin} placeholder="What do you do?"
            onKeyDown={(event) => {
              if (event.key == 'Enter') {
                event.preventDefault();
                sendUserin();
              }
            }}/>
            <button onClick={() => {sendUserin()}}>
              Enter
            </button>
            <button onClick={handleRoll}>
              ROLL
            </button>
            {rollResult !== null && (
              <div className="roll-result">
                Result: {rollResult}
              </div>
            )}
          </div>
          <div>
            <blockquote>
              {DMmessage}
            </blockquote>
          </div>
        </main>
    </div>
  )
}