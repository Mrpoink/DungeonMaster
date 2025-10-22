'use client'
import { useRouter } from "next/navigation";
import Footer from "@/app/components/footer/footer";

export default function Home() {
const router = useRouter()

  return (
    <div className="lobby">
      <header>
        <h1>Welcome to the Dungeon</h1>
      </header>
      <div className="character-info-div">
        <button onClick={()=>router.push('./characterInfo')}>Update Character Info</button>
      </div>
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
                <button className="right-game-session-buttons" type='button' onClick={()=>router.push('./game')}>Join Game Session</button>
                <button className="right-game-session-buttons" type='button' onClick={()=>router.push('./game')}>Join Game Session</button>
                <button className="right-game-session-buttons" type='button' onClick={()=>router.push('./game')}>Join Game Session</button>
              </div>
            </div>

          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}
