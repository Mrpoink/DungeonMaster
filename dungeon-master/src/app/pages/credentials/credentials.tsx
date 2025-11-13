'use client'
import React, { useState } from 'react';
import Register from '@/app/components/register/register';
import Login from '@/app/components/login/login';
import { BottomNav } from '@/app/components/nav/nav';
import Image from 'next/image';
import loginBg from '@/app/components/assets/Login_Page.jpeg';
import { usePageLoaded } from '@/app/hooks/useLoadingNavigation';

export default function Credentials() {
  usePageLoaded(); // Hide loading when page is ready
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {/* Background Image */}
      <Image
        src={loginBg}
        alt="Login Background"
        fill
        priority
        style={{
          objectFit: 'cover',
          zIndex: -2,
        }}
      />
      
      {/* Overlay for better text readability */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.4)',
        zIndex: -1,
      }} />

      {/* Content Container - Centered */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '500px',
        padding: '20px',
      }}>
        {/* Form */}
        {showLogin ? <Login /> : <Register />}
        
        {/* Buttons directly under the form */}
        <div style={{
          width: '100%',
          maxWidth: '450px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '16px',
          gap: '12px',
        }}>
          <BottomNav/>
          
          {/* Toggle button */}
          <button 
            onClick={() => {setShowLogin(!showLogin)}}
            style={{
              backgroundColor: '#F6E3B8',
              backdropFilter: 'blur(8px)',
              color: '#6b4a2e',
              padding: '12px 24px',
              borderRadius: '50px',
              border: 'none',
              fontSize: '0.95rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F6E3B8';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#F6E3B8';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {showLogin ? 'Create Account' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
}