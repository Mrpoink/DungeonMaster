'use client'

import { useState, useEffect, SetStateAction } from "react";

export default function GameMaster() {
    var turn_num = 0;
    const [DMmessage, setDMmessage] = useState("Connecting...");
    const [conversation, setConversation] = useState<ConversationMessage[]>([]);
    type ConversationMessage = { 
        sender: 'User' | 'DM' | string; text: string 
    };

    const sendUserin = async () => {
        const userMessage = userin;
        setConversation(prev => [...prev, {sender: 'User', text:userMessage}]);
        send_userin('');
        try {
          const response = await fetch('http://localhost:1068/userin', {
            method : 'POST',
            headers: {
              'Content-Type' : 'application/json',
            },
            body : JSON.stringify({command : userMessage}),
          });
          send_userin('');
    
          const result = await response.json();
    
          setConversation(prev => [...prev, {sender : 'DM', text : result.message}]);
        } catch (error){
          console.error("Failed to send userin to python: ", error)
          setConversation(prev => [...prev, { sender: 'DM', text: "Server Error: Could not connect to Python backend." }]);
        }
        
      };
      const [userin, send_userin] = useState('');
    
      const handleUserin = (event: { target: { value: SetStateAction<string> } }) => {
        send_userin(event.target.value);
      };
    
      const fetchDMmessage = async () => {
        try{
    
          const response = await fetch('http://localhost:1068/DMout');
          const data = await response.json();
    
          setDMmessage(data.dm_text);
        } catch (error) {
          console.error("Something went wrong with fetch dm message, line 81", error);
          setDMmessage("Error: could not fetch python response, something went wrong, line 82");
        }
        turn_num += 1;
      };
    
      useEffect(() => {
        fetchDMmessage();
      }, []);

  return (
    <div>
        <div className = "message-log">
              {conversation.map((msg, index) => (
                <p key={index} className={`message ${msg.sender.toLowerCase()}`}>
                  <strong>{msg.sender}:</strong> {msg.text}
                </p>
              ))}
            </div>
    </div>
  );
}