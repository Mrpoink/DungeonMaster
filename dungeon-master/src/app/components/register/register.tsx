'use client'
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
    const router = useRouter()
    const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsLoading(true)
    setError('')
    try{
      const response = await fetch('http://localhost:1068/userData', {
        method : 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify(formData),
      });
      if (!response.ok){
        let errorData;
        try {
          errorData = await response.json();
        } catch (jsonError) {
          throw new Error(`Registration failed with status: ${response.status}`);
        }
        throw new Error(errorData.message || 'Username already exists.');
      }
      if (response.ok){
        router.push("./characterInfo")
      }
      setFormData({
        name: '',
        username: '',
        password: '',
      });
    } catch (err){
      const message = (err instanceof Error) ? err.message : "An unknown error occurred.";
      console.error("Failed to send userData: ", message);
      setError(message)
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="credentials-container">
      <form onSubmit={handleSubmit} className="credentials-form">
        <div>
          <label className="input-group" htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="input-group" htmlFor="username">Username:</label>
          <input
            type="username"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="input-group" htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button 
          className="submit-button" 
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}