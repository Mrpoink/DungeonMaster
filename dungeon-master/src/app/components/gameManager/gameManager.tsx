'use client'

import { useState, useEffect, SetStateAction, useRef, Dispatch } from "react";

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
    handleSend: (isRoll: boolean) => Promise<void>; 
    isLoading: boolean;
};

const UserActionInput = ({ userin, setUserin, handleSend, isLoading }: UserActionInputProps) => {
    const handleKeyDown = (event: { key: string; preventDefault: () => void; }) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSend(false);
        }
    };

    return (
        <div className="flex space-x-2">
            <input
                type="text"
                value={userin}
                onChange={(e) => setUserin(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isLoading ? "Waiting for DM response..." : "What action do you take?"}
                disabled={isLoading}
                className="flex-grow p-2 border border-gray-300 rounded"
            />
            <button
                onClick={() => handleSend(false)}
                disabled={isLoading || !userin.trim()}
                id="enter-button"
                className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
            >
                <span className="hidden sm:inline">Enter</span>
            </button>
        </div>
    );
};

type GameManagerProps = {
    userin: string;
    setUserin: Dispatch<SetStateAction<string>>;
    handleSend: (isRoll: boolean) => Promise<void>;
    isLoading: boolean;
};

export default function GameManager({ userin, setUserin, handleSend, isLoading }: GameManagerProps) {
    const [conversation, setConversation] = useState([
        { sender: 'DM', text: "Welcome, adventurer! You find yourself at the entrance of a dark, damp cave. What is your first action?" }
    ]);
    
    const chatContainerRef = useRef<HTMLDivElement | null>(null);
    
    useEffect(() => {
        if (chatContainerRef.current) {
            const el = chatContainerRef.current;
            el.scrollTop = el.scrollHeight;
        }
    }, [conversation]);

    
    return (
        <div className="flex flex-col h-full">
            {/* Conversation Log */}
            <div 
                ref={chatContainerRef} 
                className="overflow-y-auto flex-grow"
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
