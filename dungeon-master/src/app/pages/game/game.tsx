'use client'
import { useState } from "react";
import Background from "@/app/components/assets/mainBackground.png";
import Dice from "@/app/components/dice/dice";
import GameMaster from "@/app/components/gameMaster/gameMaster";
import { Roll } from "@/app/components/dice/dice";


export default function Game() {

  const [sides, setSides] = useState<number>(20);
  const [activeDice, setActiveDice] = useState<string | null>('d20');

  const handleDiceSelect = (selectedSides: number) => {
    setSides(selectedSides);
  }
  const handleActiveDice = (dice: string) => {
    setActiveDice(dice);
  }

  return (
    <div>
        <div className="game-master-box">
          <GameMaster />
        </div>
        <div className="dice-box">
          <Dice 
            onDiceSelect={handleDiceSelect} 
            activeDice={activeDice} 
            onSetActiveDice={handleActiveDice} 
          />
        </div>
        <main className="game">
          <img src={Background.src} alt="" />
          <div className="player-actions">
            <input type="text" placeholder="What do you do?" />
            <Roll sides={sides} />
          </div>
        </main>
    </div>
  )
}