'use client'
import { useRouter } from "next/navigation";
import Nav from "@/app/components/nav/nav";
import {BottomNav} from "@/app/components/nav/nav";
import { useState, useEffect } from "react";

type Character = {
  name: string;
  race: string;
  cla: string;
  subclass: string;
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
  backstory: string;
  [key: string]: any;
};

export default function Home() {
  const router = useRouter();
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [characterData, setCharacterData] = useState<Character | null>(null);

  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      fetchCharacterData(savedUsername);
    }
  }, []);

  const fetchCharacterData = async (username: string) => {
    try {
      const response = await fetch('http://localhost:1068/character-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, seed: '1' }), // use any seed to get base character
      });
      
      if (!response.ok) throw new Error('Failed to fetch character data');
      
      const data = await response.json();
      setCharacterData(data.characterData);
    } catch (error) {
      console.error('Error fetching character data:', error);
    }
  };

  const handleJoinGame = async (campaignId: number) => {
    const savedUsername = localStorage.getItem('username');
    const savedCampaignId = localStorage.getItem('campaignId');
    const isContinuing = savedCampaignId ? parseInt(savedCampaignId, 10) === campaignId : false;

    try {
      const response = await fetch('http://localhost:1068/seed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          seed: campaignId, 
          username: savedUsername,
          continue_campaign: isContinuing 
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error setting seed:", response.status, errorText);
        return;
      }

      const data = await response.json();
      
      localStorage.setItem('campaignId', campaignId.toString());
      localStorage.setItem('turn_num', data.turn_num.toString());
      router.push('./game');
    } catch (error) {
      console.error("Error setting seed:", error);
    }
  };

  return (
    <div className="lobby">
      <header>
        <Nav title="QuestWeaver" onBookClick={() => setIsInfoOpen(v => !v)} />
      </header>
      <main style={{ position: 'relative' }}>
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

        {/* book icon popout for character info and credits */}
        {isInfoOpen && (
          <div
            className="info-popout"
            style={{
              position: 'fixed',
              top: 'clamp(70px, 10vh, 90px)',
              right: 'clamp(10px, 2vw, 20px)',
              width: 'clamp(240px, 22vw, 300px)',
              maxHeight: 'calc(100vh - 120px)',
              backgroundColor: 'rgba(246, 233, 201, 0.95)',
              padding: 'clamp(8px, 1.5vh, 12px)',
              borderRadius: '8px',
              border: '1px solid #6b4a2e',
              color: '#6b4a2e',
              boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
              zIndex: 1000,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <h2 style={{ fontSize: 'clamp(14px, 2vh, 18px)', fontWeight: 700, textAlign: 'center', marginBottom: 'clamp(4px, 1vh, 8px)', lineHeight: 1.2, flexShrink: 0 }}>
              Character Info
            </h2>
            
            {characterData ? (
              <div style={{ fontSize: 'clamp(9px, 1.2vh, 11px)', lineHeight: 1.2, marginBottom: 'clamp(4px, 0.8vh, 8px)', flex: '1 1 auto', minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ flexShrink: 0 }}>
                  <div style={{ marginBottom: 'clamp(2px, 0.4vh, 4px)' }}>
                    <strong>Name:</strong> {characterData.name}
                  </div>
                  <div style={{ marginBottom: 'clamp(2px, 0.4vh, 4px)' }}>
                    <strong>Race:</strong> {characterData.race}
                  </div>
                  <div style={{ marginBottom: 'clamp(2px, 0.4vh, 4px)' }}>
                    <strong>Class:</strong> {characterData.cla}{characterData.subclass ? ` (${characterData.subclass})` : ''}
                  </div>
                  <div style={{ marginBottom: 'clamp(2px, 0.4vh, 4px)', paddingTop: 'clamp(3px, 0.6vh, 6px)', borderTop: '1px solid #6b4a2e' }}>
                    <strong>Attributes:</strong>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2px, 0.3vh, 3px)', fontSize: 'clamp(8px, 1vh, 10px)', paddingLeft: 'clamp(3px, 0.6vh, 6px)' }}>
                    <div>Might: {characterData.str}</div>
                    <div>Agility: {characterData.dex}</div>
                    <div>Spirit: {characterData.con}</div>
                    <div>Intellect: {characterData.int}</div>
                    <div>Wisdom: {characterData.wis}</div>
                    <div>Presence: {characterData.cha}</div>
                  </div>
                </div>
                {characterData.backstory && (
                  <div style={{ marginTop: 'clamp(4px, 0.8vh, 8px)', paddingTop: 'clamp(3px, 0.6vh, 6px)', borderTop: '1px solid #6b4a2e', flex: '1 1 auto', minHeight: 0, overflow: 'hidden' }}>
                    <strong>Backstory:</strong>
                    <p style={{ fontSize: 'clamp(8px, 1vh, 10px)', marginTop: 'clamp(2px, 0.4vh, 4px)', marginBottom: 0, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' }}>
                      {characterData.backstory}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <p style={{ fontSize: 'clamp(9px, 1.2vh, 11px)', textAlign: 'center', color: '#999', flexShrink: 0 }}>
                No character created yet. Create one to see details here.
              </p>
            )}

            <div style={{ fontSize: 'clamp(8px, 1vh, 10px)', lineHeight: 1.2, marginTop: 'clamp(4px, 0.8vh, 8px)', paddingTop: 'clamp(3px, 0.6vh, 6px)', borderTop: '1px solid #6b4a2e', flexShrink: 0 }}>
              <strong style={{ fontSize: 'clamp(9px, 1.2vh, 11px)' }}>Created By:</strong>
              <p style={{ marginTop: 'clamp(2px, 0.4vh, 4px)', marginBottom: 0 }}>
                Adithaya Kulkarni, Brandon Dean, Elijah Webb, Tierra Williams
              </p>
            </div>
          </div>
        )}
      </main>
      <div className="bottom-nav-buttons">
        <BottomNav />
      </div>
    </div>
  );
}
