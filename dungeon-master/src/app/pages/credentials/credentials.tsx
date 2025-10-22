'use client'
import React, { useState } from 'react';
import Register from '@/app/components/register/register';
import Login from '@/app/components/login/login';

export default function Credentials() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="login-container">
      <button onClick={() => setShowLogin(true)}>Login</button>
      <button onClick={() => setShowLogin(false)}>Create an Account</button>
      {showLogin ? <Login /> : <Register />}
    </div>
  );
}