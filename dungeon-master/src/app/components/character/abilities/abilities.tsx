'use client'
import React from 'react';

export const AbilityScore = ({ name, score }: { name: string; score: number }) => {
  return (
      <div className="flex flex-col items-center justify-center p-3 bg-gray-700/70 rounded-xl border border-gray-600 ability-score-display">
          <span className="text-xs uppercase font-bold mb-1 ability-label">{name}</span>
          <div className="relative mt-1 flex flex-col items-center">
              <span className="text-3xl font-extrabold text-white ability-score">{score}</span>
          </div>
      </div>
  );
};

type AbilityProgressBarProps = { name: string; score: number; compact?: boolean };

export default function AbilityProgressBar({ name, score, compact = false }: AbilityProgressBarProps) {
    const maxAbilityScore = 30;
    const currentScore = Math.min(Math.max(Number(score), 1), maxAbilityScore);
    const percentage = (currentScore / maxAbilityScore) * 100;

    const getColor = (percent: number) => {
        if (percent > 66) return 'bg-green-600'; // High scores
        if (percent > 33) return 'bg-yellow-500'; // Mid scores
        return 'bg-red-600'; // Low scores
    };

    return (
        <div className={`flex flex-col items-start ${compact ? 'p-1' : 'p-3'} bg-[#E2D7B7] rounded-xl border border-[#E2D7B7] ${compact ? 'mb-1' : 'mb-3'}`}>
            <span className={`${compact ? 'text-[10px] mb-0.5' : 'text-xs mb-2'} uppercase font-extrabold text-[#6B4A2E] ability-label`}>{name}</span>
            <div className={`w-full relative ${compact ? 'h-4' : 'h-6'} bg-gray-600 rounded-full overflow-hidden`}>
                <div 
                    className={`h-full ${getColor(percentage)} transition-all duration-500 ease-out`}
                    style={{ width: `${percentage}%` }}
                />
                <span className={`absolute inset-0 flex items-center justify-center ${compact ? 'text-[10px]' : 'text-sm'} font-extrabold text-white`}>
                    {currentScore}
                </span>
            </div>
        </div>
    );
}

export function AbilityBars({ characterData, compact = false }: { characterData: any; compact?: boolean }) {
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
            <AbilityProgressBar name={'INTELLECT'} score={stats.intellect} compact={compact} />
            <AbilityProgressBar name={'MIGHT'} score={stats.might} compact={compact} />
            <AbilityProgressBar name={'AGILITY'} score={stats.agility} compact={compact} />
            <AbilityProgressBar name={'PRESENCE'} score={stats.presence} compact={compact} />
            <AbilityProgressBar name={'WISDOM'} score={stats.wisdom} compact={compact} />
            <AbilityProgressBar name={'SPIRIT'} score={stats.spirit} compact={compact} />
        </div>
    )
}