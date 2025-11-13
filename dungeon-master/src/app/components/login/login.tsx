'use client'
import React, { useState } from 'react';
import { useLoadingNavigation } from '@/app/hooks/useLoadingNavigation';

export default function Login() {
  const { navigateWithLoading } = useLoadingNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Validation function - only allow alphanumeric characters
  const validateInput = (value: string) => {
    return /^[a-zA-Z0-9]*$/.test(value);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (validateInput(value) || value === '') {
      setUsername(value);
      setError('');
    } else {
      setError('Only letters and numbers are allowed. No special characters.');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (validateInput(value) || value === '') {
      setPassword(value);
      setError('');
    } else {
      setError('Only letters and numbers are allowed. No special characters.');
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    if (!username || !password) {
      setError('Please enter both username and password.');
      setIsLoading(false)
      return;
    }

    if (!validateInput(username) || !validateInput(password)) {
      setError('Only letters and numbers are allowed. No special characters.');
      setIsLoading(false);
      return;
    }

    const credentials= {username:username, password:password}
    const loginEndpoint = "http://127.0.0.1:1068/credentials"

    try{
      const response = await fetch(loginEndpoint, {
        method : 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify(credentials),
      });
      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (jsonError) {
          throw new Error(`Login failed with status: ${response.status}`);
        }
        throw new Error(errorData.message || 'Invalid username or password.');
      }
      const data = await response.json();
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('username', username);
      console.log('Login successful! Token stored.');

      // Fetch character data
      const characterResponse = await fetch('http://127.0.0.1:1068/character-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
      });

      if (characterResponse.ok) {
        const characterData = await characterResponse.json();
        localStorage.setItem('characterData', JSON.stringify(characterData));
      }

      if(response.ok){
        navigateWithLoading("./lobby", "Loading your adventures...");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="credentials-container">
      <form onSubmit={handleSubmit} className='credentials-form'>
        <h2 style={{ 
          textAlign: 'center', 
          color: '#6b4a2e', 
          fontSize: '1.75rem', 
          fontWeight: '700',
          marginBottom: '0.5rem',
          textShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          Login
        </h2>
        <div className="form-group">
          <label className='input-group' htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Letters and numbers only"
            required
          />
        </div>
        <div className="form-group">
          <label className='input-group' htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Letters and numbers only"
            required
          />
        </div>
        <button className="submit-button" type="submit" disabled={isLoading}>
            {isLoading ? 'Logging In...' : 'Login'}
        </button>
        {error && <p style={{ color: '#f6e9c9', backgroundColor: 'rgba(220, 38, 38, 0.8)', padding: '10px', borderRadius: '8px', textAlign: 'center', fontWeight: '500' }}>{error}</p>}
      </form>
    </div>
  );
}
