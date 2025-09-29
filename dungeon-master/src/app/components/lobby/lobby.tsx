'use client'
import { useRouter } from "next/navigation";
import backgroundImage from "../assets/lobbyBackground.png";

export default function Home() {
const router = useRouter()

  return (
    <div className="lobby">
      <header>
        <h1>Welcome to the Dungeon</h1>

      </header>
      <main>
        <div>
          <em>What action will you take?</em>
          <div className="start-buttons-container">


            <div id="game-sessions-div">
              <div id="game-sessions-left-div">
                <button className="game-session-buttons" type='button' onClick={()=>router.push('/components/game')}>Join Game Session</button>
                <button className="game-session-buttons" type='button' onClick={()=>router.push('/components/game')}>Join Game Session</button>
                <button className="game-session-buttons" type='button' onClick={()=>router.push('/components/game')}>Join Game Session</button>
              </div>
              <div id="game-sessions-right-div">
                <button className="game-session-buttons" type='button' onClick={()=>router.push('/components/game')}>Join Game Session</button>
                <button className="game-session-buttons" type='button' onClick={()=>router.push('/components/game')}>Join Game Session</button>
                <button className="game-session-buttons" type='button' onClick={()=>router.push('/components/game')}>Join Game Session</button>
              </div>
            </div>

          </div>
        </div>

      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        
      </footer>
    </div>
  );
}
