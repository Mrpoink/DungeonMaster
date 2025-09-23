'use client'
import React, { useState } from 'react';
import Register from '../register/register';

export default function Login() {
  const [showLogin, setShowLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Basic validation
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    // In a real application, you would send this data to a backend API for authentication
    console.log('Attempting login with:', { username, password });

    // Simulate a successful login (replace with actual API call)
    if (username === 'test@example.com' && password === 'password123') {
      setError(''); // Clear any previous errors
      alert('Login successful!');
      // Redirect or perform other actions after successful login
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="login-container">
      <button onClick={() => setShowLogin(true)}>Login</button>
      <button onClick={() => setShowLogin(false)}>Create an Account</button>
      {showLogin ?

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
        <button type="submit">Login</button>
      </form>
      : <Register />}
    </div>
  );
}
