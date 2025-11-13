'use client'
import { useState, useEffect } from "react";
import Nav from "./components/nav/nav";
import HelpIcon from "./components/helpIcon/helpIcon";
import { useLoadingNavigation, usePageLoaded } from "./hooks/useLoadingNavigation";

export default function Home() {
  usePageLoaded(); // Hide loading when page is ready - must be at top level
  const { navigateWithLoading } = useLoadingNavigation();
  const [hasUsername, setHasUsername] = useState(false);

  useEffect(() => {
    // Check if username exists in localStorage
    const savedUsername = localStorage.getItem('username');
    setHasUsername(!!savedUsername);
  }, []);

  return (
    <div className="main">
      <header>
        <Nav hideCharacterIcon={true} />
      </header>
      <main>
        <div>
          <div id="landing-text">
            <em>What action will you take?</em>
          </div>
          <div className="start-buttons-container">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button className="start-buttons" type='button' onClick={()=>navigateWithLoading('./pages/credentials', 'Preparing your journey...')}>Login</button>
              <HelpIcon 
                content={
                  <div>
                    <strong>Step 1: Login Required</strong><br/>
                    You must create an account or log in to save your progress and create characters. 
                    Click this button to get started on your adventure!
                  </div>
                }
                position="bottom"
              />
            </div>
            {hasUsername && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button className="start-buttons" type='button' onClick={()=>navigateWithLoading('./pages/lobby', 'Loading your adventures...')}>Quick Start</button>
                <HelpIcon 
                  content={
                    <div>
                      <strong>Quick Start</strong><br/>
                      You must create an account or log in to save your progress and create characters. 
                      Click the login button to get started on your adventure!
                      If you have an account already, press login to log into your account and jump right back into your adventure with the quick start button! This button takes you directly to campaign 
                      selection so you can continue where you left off.
                    </div>
                  }
                  position="bottom"
                />
              </div>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}
