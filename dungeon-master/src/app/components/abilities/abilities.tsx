'use client'
import React from 'react';

export const AbilityScore = ({ name, score }: { name: string; score: number }) => {
  return (
      <div className="flex flex-col items-center justify-center p-3 bg-gray-700/70 rounded-xl border border-gray-600 shadow-md ability-score-display">
          <span className="text-xs uppercase font-bold text-yellow-400 mb-1 ability-label">{name.substring(0, 3)}</span>
          <div className="relative mt-1 flex flex-col items-center">
              <span className="text-3xl font-extrabold text-white ability-score">{score}</span>
          </div>
      </div>
  );
};

export default function AbilityProgressBar( {name, score}:{name: string, score: number} ) {
    const maxAbilityScore = 30;
    const currentScore = Math.min(Math.max(Number(score), 1), maxAbilityScore);
    const percentage = (currentScore / maxAbilityScore) * 100;

    const getColor = (percent: number) => {
        if (percent > 66) return 'bg-yellow-500'; // High scores
        if (percent > 33) return 'bg-yellow-600/70'; // Mid scores
        return 'bg-gray-500'; // Low scores
    };

    return (
        <div className="flex flex-col items-start p-3 bg-gray-700/70 rounded-xl border border-gray-600 shadow-md">
            <span className="text-xs uppercase font-bold text-yellow-400 mb-2 ability-label">{name}</span>
            <div className="w-full relative h-6 bg-gray-600 rounded-full overflow-hidden">
                <div 
                    className={`h-full ${getColor(percentage)} transition-all duration-500 ease-out`}
                    style={{ width: `${percentage}%` }}
                />
                <span className="absolute inset-0 flex items-center justify-center text-sm font-extrabold text-white">
                    {currentScore}
                </span>
            </div>
        </div>
    );
}

export function AbilityBars({ characterData }: { characterData: any }) {
    // Default values in case characterData is null or missing attributes
    const stats = {
        intellect: characterData?.int ?? 10,
        might: characterData?.str ?? 10,
        agility: characterData?.dex ?? 10,
        presence: characterData?.cha ?? 10,
        wisdom: characterData?.wis ?? 10,
        spirit: characterData?.con ?? 10,
    };

    return(
        <div>
            <AbilityProgressBar 
              name={'INTELLECT'} 
              score={stats.intellect}
            />
            <AbilityProgressBar 
              name={'MIGHT'} 
              score={stats.might}
            />
            <AbilityProgressBar 
              name={'AGILITY'} 
              score={stats.agility}
            />
            <AbilityProgressBar 
              name={'PRESENCE'} 
              score={stats.presence}
            />
            <AbilityProgressBar 
              name={'WISDOM'} 
              score={stats.wisdom}
            />
            <AbilityProgressBar 
              name={'SPIRIT'} 
              score={stats.spirit}
            />
        </div>
    )
}