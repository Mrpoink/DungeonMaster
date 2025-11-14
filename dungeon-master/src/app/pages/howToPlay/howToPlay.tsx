'use client'
import Nav from "@/app/components/nav/nav";
import Image from 'next/image';
import loginBg from '@/app/components/assets/Login_Page.jpeg';
import { useLoadingNavigation, usePageLoaded } from "@/app/hooks/useLoadingNavigation";
import './howToPlay.css';

export default function HowToPlay() {
    usePageLoaded(); // Hide loading when page is ready
    const { navigateWithLoading } = useLoadingNavigation();

    return (
        <>
            <div style={{ backgroundColor: '#F6E3B8' }}>
                <Nav title="How to Play QuestWeaver" noShadow={true} />
            </div>
            <div className="how-to-play-container" style={{
                position: 'relative',
                minHeight: '100vh',
            }}>
                {/* Background Image */}
                <Image
                    src={loginBg}
                    alt="Background"
                    fill
                    priority
                    style={{
                        objectFit: 'cover',
                        zIndex: -2,
                    }}
                />
                
                {/* Overlay for better text readability */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0, 0, 0, 0.6)',
                    zIndex: -1,
                }} />

                <div className="how-to-play-content">
                    <h1>Welcome to QuestWeaver!</h1>
                    <p className="intro-text">
                        QuestWeaver is a dynamic D&D-inspired adventure game where your choices and dice rolls 
                        determine your fate. Follow these steps to begin your journey:
                    </p>

                    <div className="steps-container">
                        <div className="step">
                            <div className="step-number">1</div>
                            <div className="step-content">
                                <h2>Login or Create Account</h2>
                                <p>
                                    Press the <strong>Login</strong> button to log in or create a new account. 
                                    You must be logged in to save your progress and create characters.
                                </p>
                            </div>
                        </div>

                        <div className="step">
                            <div className="step-number">2</div>
                            <div className="step-content">
                                <h2>Create Your Character</h2>
                                <p>
                                    Build your hero! Your <strong>attribute scores</strong> (Might, Agility, Presence, 
                                    Wisdom, Spirit, Intellect) determine your <strong>abilities</strong> and skills. 
                                    Click the <strong>edit button</strong> to customize your character's name, background, 
                                    and appearance. Choose wisely - these attributes will affect your success in challenges!
                                </p>
                            </div>
                        </div>

                        <div className="step">
                            <div className="step-number">3</div>
                            <div className="step-content">
                                <h2>Choose a Campaign</h2>
                                <p>
                                    Click any <strong>campaign card</strong> to begin your adventure. Each campaign 
                                    offers a unique story with different challenges and outcomes. Your character 
                                    will be saved separately for each campaign you play.
                                </p>
                            </div>
                        </div>

                        <div className="step">
                            <div className="step-number">4</div>
                            <div className="step-content">
                                <h2>Make Choices and Roll</h2>
                                <p>
                                    During gameplay, you'll be presented with <strong>options</strong>. Select your 
                                    action, then <strong>roll the dice</strong> to determine success or failure. 
                                    Your attributes will be modified based on the outcome. Plan carefully and hope 
                                    for good rolls!
                                </p>
                            </div>
                        </div>

                        <div className="step">
                            <div className="step-number">5</div>
                            <div className="step-content">
                                <h2>Leave and Return Anytime</h2>
                                <p>
                                    Need to take a break? Click the <strong>Leave Experience</strong> button to 
                                    exit your current campaign. Don't worry - your progress is automatically saved! 
                                    You can always return with the same character and continue right where you left off.
                                </p>
                            </div>
                        </div>

                        <div className="step">
                            <div className="step-number">6</div>
                            <div className="step-content">
                                <h2>Create New Characters</h2>
                                <p>
                                    Click the <strong>character icon</strong> in the navbar to create a new character. 
                                    <strong>Note:</strong> Creating a new character will replace your current one for 
                                    that campaign. You won't be able to revert to previous characters, so use this 
                                    opportunity to try different builds and strategies. Can you win the campaign? 
                                    Good luck, adventurer!
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="tips-section">
                        <h2>Pro Tips</h2>
                        <ul>
                            <li>Look for <strong>?</strong> icons throughout the game for context-specific help</li>
                            <li>Higher attribute scores improve your chances of success on related checks</li>
                            <li>Watch your attribute values - if any drop to 0, it's game over!</li>
                            <li>Each campaign saves your progress independently</li>
                        </ul>
                    </div>

                    <button 
                        className="back-home-button" 
                        onClick={() => navigateWithLoading('/', 'Returning home...')}
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </>
    );
}
