'use server'
import React from 'react';
import SessionHistory from './sessionHistory';

export default async function App() {
  return (
    <div className="App">
      <SessionHistory />
    </div>
  );
}