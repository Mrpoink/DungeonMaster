import React from "react";

interface LoadingOverlayProps {
  text: string;
  duration?: number;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ text, duration = 1500 }) => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'linear-gradient(135deg, #1a0e08 0%, #6b4a2e 50%, #f6e9c9 100%)',
    backgroundSize: '200% 200%',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    animation: 'gradientShift 3s ease infinite',
    willChange: 'background-position', // Optimize for animations
  }}>
    {/* Animated background particles */}
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      opacity: 0.3,
    }}>
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            background: '#f6e9c9',
            borderRadius: '50%',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 3 + 2}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>

    {/* Main content */}
    <div style={{
      position: 'relative',
      zIndex: 1,
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      padding: '0 20px',
    }}>
      <div style={{
        fontSize: '2.5rem',
        color: '#f6e9c9',
        marginBottom: '3rem',
        fontWeight: 700,
        textShadow: '0 0 20px rgba(107, 74, 46, 0.8), 0 4px 12px rgba(0, 0, 0, 0.6)',
        animation: 'pulse 2s ease-in-out infinite',
        letterSpacing: '2px',
      }}>
        {text}
      </div>

      {/* Progress bar container */}
      <div style={{
        width: '400px',
        maxWidth: '90vw',
        height: '32px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4), inset 0 2px 4px rgba(0, 0, 0, 0.3)',
        border: '2px solid rgba(246, 233, 201, 0.3)',
        position: 'relative',
      }}>
        {/* Animated progress bar */}
        <div style={{
          height: '100%',
          width: '100%',
          background: 'linear-gradient(90deg, #6b4a2e 0%, #d4a574 50%, #f6e9c9 100%)',
          backgroundSize: '200% 100%',
          animation: `loadingBar ${duration}ms linear forwards, shimmer 1.5s linear infinite`,
          boxShadow: '0 0 20px rgba(246, 233, 201, 0.6)',
          willChange: 'width, background-position', // Optimize animations
        }} />
        
        {/* Glowing effect overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
          animation: 'slide 1.5s linear infinite',
          willChange: 'transform', // Optimize transform animations
        }} />
      </div>

      {/* Loading text */}
      <div style={{
        marginTop: '1.5rem',
        color: '#f6e9c9',
        fontSize: '1rem',
        fontWeight: 500,
        opacity: 0.8,
        animation: 'fade 1.5s ease-in-out infinite',
      }}>
        Loading your adventure...
      </div>
    </div>

    <style>{`
      @keyframes loadingBar {
        from { width: 0%; }
        to { width: 100%; }
      }

      @keyframes shimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }

      @keyframes slide {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }

      @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.85; transform: scale(1.02); }
      }

      @keyframes float {
        0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
        50% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
      }

      @keyframes gradientShift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }

      @keyframes fade {
        0%, 100% { opacity: 0.8; }
        50% { opacity: 0.4; }
      }
    `}</style>
  </div>
);
