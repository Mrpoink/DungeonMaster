'use server'
import React from 'react';
import CharacterInfo from './characterInfo';

export default async function App() {
  return (
    <div className="App">
      <CharacterInfo />
    </div>
  );
}