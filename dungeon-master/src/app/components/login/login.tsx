'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Router } from 'next/router';

export default function Login() {
  const router = useRouter()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    if (!username || !password) {
      setError('Please enter both username and password.');
      setIsLoading(false)
      return;
    }

    const credentials= {username:username, password:password}
    const loginEndpoint = "http://localhost:1068/credentials"

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
      console.log('Login successful! Token stored.');
      if(response.ok){
        router.push("./lobby")
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging In...' : 'Login'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}
