'use client'

import { useState, useEffect, SetStateAction, useRef, Dispatch } from "react";

// Component for a single chat message
type ConversationMessageProps = {
    sender: 'User' | 'DM' | string;
    text: string;
};

const ConversationMessage = ({ sender, text }: ConversationMessageProps) => {
    return (
        <div className="message-log">
            <div>
                <strong className="font-semibold">{sender}: </strong>
                <span>{text}</span>
            </div>
        </div>
    );
};

type UserActionInputProps = {
    userin: string;
    setUserin: Dispatch<SetStateAction<string>>;
    handleSend: () => void;
    isLoading: boolean;
};

// Component to handle user input and submission (replaces the exported 'sendUserin' component)
const UserActionInput = ({ userin, setUserin, handleSend, isLoading }: UserActionInputProps) => {
    const handleKeyDown = (event: { key: string; preventDefault: () => void; }) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSend();
        }
    };

    return (
        <div>
            <input
                type="text"
                value={userin}
                onChange={(e) => setUserin(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isLoading ? "Waiting for DM response..." : "What action do you take?"}
                disabled={isLoading}
            />
            <button
                onClick={handleSend}
                disabled={isLoading || !userin.trim()}
                id="enter-button"
            >
                <span className="hidden sm:inline">Enter</span>
            </button>
        </div>
    );
};

export default function GameManager() {
    const [userin, setUserin] = useState('');
    const [conversation, setConversation] = useState([
        { sender: 'DM', text: "Welcome, adventurer! You find yourself at the entrance of a dark, damp cave. What is your first action?" }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    
    // Auto-scroll functionality
        const chatContainerRef = useRef<HTMLDivElement | null>(null);
    
        useEffect(() => {
            if (chatContainerRef.current) {
                const el = chatContainerRef.current;
                el.scrollTop = el.scrollHeight;
            }
        }, [conversation]);

    const handleSend = async () => {
        if (!userin.trim() || isLoading) return;

        const userMessage = userin.trim();
        setUserin('');
        setIsLoading(true);

        // 1. Add user message to conversation
        setConversation(prev => [...prev, { sender: 'User', text: userMessage }]);
        
        try {
            // Note: I am retaining the original API endpoint, but it likely requires a running Python backend.
            const response = await fetch('http://localhost:1068/userin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ command: userMessage }),
            });

            if (!response.ok) {
                 throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            
            // 2. Add DM response to conversation
            setConversation(prev => [...prev, { sender: 'DM', text: result.message || "The DM responds, 'Silence falls over the area...'" }]);

        } catch (error) {
            console.error("Failed to communicate with backend:", error);
            setConversation(prev => [
                ...prev, 
                { sender: 'DM', text: "System Error: Could not connect to Python backend (http://localhost:1068)." }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full">
             {/* Conversation Log */}
            <div 
                ref={chatContainerRef} 
            >
                {conversation.map((msg, index) => (
                    <ConversationMessage key={index} sender={msg.sender} text={msg.text} />
                ))}
                {isLoading && (
                     <div className="flex justify-start mb-3">
                        <div>
                            <strong className="font-semibold">DM: </strong>
                            <span>Typing...</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Input */}
            <div className="mt-4">
                <UserActionInput 
                    userin={userin} 
                    setUserin={setUserin} 
                    handleSend={handleSend} 
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
}