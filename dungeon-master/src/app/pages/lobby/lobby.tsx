'use client'
import { useRouter } from "next/navigation";
import backgroundImage from "@/app/lobbyBackground.png";

export default function Home() {
const router = useRouter()

  return (
    <div className="lobby">
      <header>
        <h1>Welcome to the Dungeon</h1>

      </header>
      <main>
        <div>
          <div className="start-buttons-container">


            <div id="game-sessions-div">
              <div id="game-sessions-left-div">
                <button className="left-game-session-buttons" type='button' onClick={()=>router.push('./game')}>Join Game Session</button>
                <button className="left-game-session-buttons" type='button' onClick={()=>router.push('./game')}>Join Game Session</button>
                <button className="left-game-session-buttons" type='button' onClick={()=>router.push('./game')}>Join Game Session</button>
              </div>
              <div id="game-sessions-right-div">
                <button className="right-game-session-buttons" type='button' onClick={()=>router.push('/components/game')}>Join Game Session</button>
                <button className="right-game-session-buttons" type='button' onClick={()=>router.push('/components/game')}>Join Game Session</button>
                <button className="right-game-session-buttons" type='button' onClick={()=>router.push('/components/game')}>Join Game Session</button>
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
