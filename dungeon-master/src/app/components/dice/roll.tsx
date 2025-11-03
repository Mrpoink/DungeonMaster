'use client'
import {useState} from "react";

type RollProps = {
    sides: number;
    command: string; 
    onRollClick: (isRoll: boolean) => Promise<void>; 
}

type ConversationItem = { sender: string, text: string };

export default function Roll({ sides, command, onRollClick, setConversation}: {sides : number, command: any, onRollClick: any, setConversation: React.Dispatch<React.SetStateAction<ConversationItem[]>>}){
    const [rollResult, setRollResult] = useState<number | null>(null);

    const handleRoll = async () => {
        const roll = Math.floor(Math.random() * sides) + 1;
        setRollResult(roll);
        var roll_result = false

        if (roll > Math.floor(sides / 2)){
        roll_result = true
        }
        try {
        const response = await fetch('http://localhost:1068/roll', {
            method : 'POST',
            headers: {
            'Content-Type' : 'application/json',
            },
            body : JSON.stringify({command : roll_result}),
        });
        setConversation(prev => [...prev, {sender: 'User', text: `Rolling a D${sides}...` }]);
        const result = await response.json();
        setConversation(prev => [...prev, {sender : 'DM', text : result.message}]);

        } catch (error){
        console.error("Failed to send roll to python: ", error)
        setConversation(prev => [...prev, { sender: 'DM', text: "Server Error: Could not execute roll command." }]);
        }
    }

    return(
        <div>
            <button 
                id="roll-dice-button" 
                onClick={handleRoll}
                // disabled={!command.trim()} // Disable if no text command is present
            >
                ROLL
            </button>
            {rollResult !== null && (
                <div className="roll-result">
                    Result: {rollResult}
                </div>
            )}
        </div>
    )
}