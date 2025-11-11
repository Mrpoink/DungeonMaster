'use client'
import { useRouter } from "next/navigation";
import Nav from "@/app/components/nav/nav";
import {BottomNav} from "@/app/components/nav/nav";

export default function Home() {
  const router = useRouter();

  const handleJoinGame = async (campaignId: number) => {
    try {
      const response = await fetch('http://localhost:1068/seed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ seed: campaignId }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error setting seed:", response.status, errorText);
        // Optionally, display an error message to the user
        return;
      }

      // If you expect a JSON response on success, you can process it here:
      // const data = await response.json();
      // console.log("Seed set successfully:", data);

      localStorage.setItem('campaignId', campaignId.toString());
      router.push('./game');
    } catch (error) {
      console.error("Error setting seed:", error);
    }
  };

  return (
    <div className="lobby">
      <header>
        <Nav />
      </header>
      <main>
        <div>
          <div className="start-buttons-container">
            <div id="game-sessions-div">
              <div className="game-session" id="game-sessions-left-div">
                <button className="left-game-session-buttons" id="session2" type='button' onClick={() => handleJoinGame(1)}>Echoes of the Force</button>
                <button className="left-game-session-buttons" id="session3" type='button' onClick={() => handleJoinGame(2)}>The Last Ember of Balance</button>
              </div>
              <div className="game-session" id="game-sessions-mid-div">
                <button className="mid-game-session-button" id="session5" type='button' onClick={() => handleJoinGame(3)}>The Shattered Crown of Elarion</button>
              </div>
              <div className="game-session" id="game-sessions-right-div">
                <button className="right-game-session-buttons" id="session4" type='button' onClick={() => handleJoinGame(4)}>The Shattered Hourglass</button>
                <button className="right-game-session-buttons" id="session1" type='button' onClick={() => handleJoinGame(5)}>Echoes of the Ember King</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="bottom-nav-buttons">
        <BottomNav />
      </div>
    </div>
  );
}
