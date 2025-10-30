'use client'
import { useState, useEffect, SetStateAction } from "react";
import Background from "@/app/components/assets/mainBackground.png";
import Dice from "@/app/components/dice/dice";
import GameMasterHeader from "@/app/components/gameManager/gameMasterHeader";
import { Roll } from "@/app/components/dice/dice";
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
              <GameManager />
            <div className="player-actions">
              <Roll sides={sides} />
            </div>
          </main>
          <div className="party-box">
            <Party />
          </div>
        </div>
    </div>
  )
}