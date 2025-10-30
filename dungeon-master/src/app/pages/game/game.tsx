'use client'
import { useState } from "react";
import Background from "@/app/components/assets/mainBackground.png";
import Dice from "@/app/components/dice/dice";
import Roll from "@/app/components/dice/roll";
import Party from "@/app/components/party/party";
import GameManager from "@/app/components/gameManager/gameManager";


export default function Game() {
  const [sides, setSides] = useState<number>(20);
  const [activeDice, setActiveDice] = useState("d20");

  const handleDiceSelect = (selectedSides: number) => {
    setSides(selectedSides);
  }
  const handleActiveSelect = (dice: string) => {
    setActiveDice(dice);
  }
  

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
              <GameManager />
              <div className="player-actions">
                <Roll sides={sides} />
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