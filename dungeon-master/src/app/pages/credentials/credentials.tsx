'use client'
import React, { useState } from 'react';
import Register from '@/app/components/register/register';
import Login from '@/app/components/login/login';

export default function Credentials() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div>
      <button 
        onClick={() => setShowLogin(true)}
        className={showLogin ? 'form-heading' : ''}
      >
        Login
      </button>
      <button 
        onClick={() => setShowLogin(false)}
        className={showLogin ? '' : 'form-heading'}
      >
        Create an Account
      </button>
      {showLogin ? <Login /> : <Register />}
    </div>
  );
}