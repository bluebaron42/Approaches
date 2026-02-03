import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface Step {
  title: string;
  content: string;
  icon?: string;
}

interface StepRevealProps {
  steps: Step[];
  isPresentation: boolean;
  themeColor?: string;
  title?: string;
}

export default function StepReveal({ steps, isPresentation, themeColor = 'indigo', title }: StepRevealProps) {
  const [revealedCount, setRevealedCount] = useState(0);

  const revealNext = () => {
    if (revealedCount < steps.length) {
      setRevealedCount(revealedCount + 1);
    }
  };

  const revealAll = () => {
    setRevealedCount(steps.length);
  };

  const reset = () => {
    setRevealedCount(0);
  };

  return (
    <div className={`w-full ${isPresentation ? 'max-w-5xl' : 'max-w-3xl'}`}>
      {title && (
        <h3 className={`text-${themeColor}-400 font-bold mb-6 ${isPresentation ? 'text-3xl' : 'text-xl'}`}>
          {title}
        </h3>
      )}

      <div className={isPresentation ? 'space-y-4' : 'space-y-3'}>
        {steps.map((step, idx) => {
          const isRevealed = idx < revealedCount;
          
          return (
            <div
              key={idx}
              className={`
                ${isPresentation ? 'p-6' : 'p-5'} rounded-xl border transition-all duration-500
                ${isRevealed 
                  ? `bg-${themeColor}-900/30 border-${themeColor}-500/50 scale-100 opacity-100` 
                  : 'bg-gray-800/30 border-gray-700 scale-95 opacity-60'
                }
              `}
            >
              <div className={`flex items-start ${isPresentation ? 'gap-5' : 'gap-4'}`}>
                <div className={`
                  ${isPresentation ? 'w-12 h-12 text-2xl' : 'w-8 h-8'} rounded-full flex items-center justify-center flex-shrink-0
                  ${isRevealed ? `bg-${themeColor}-500 text-white` : 'bg-gray-700 text-gray-500'}
                  transition-all duration-300
                `}>
                  {step.icon || (idx + 1)}
                </div>
                
                <div className="flex-1">
                  <h4 className={`font-bold ${isPresentation ? 'mb-2' : 'mb-1'} ${isRevealed ? 'text-white' : 'text-gray-500'} ${isPresentation ? 'text-2xl lg:text-3xl' : 'text-lg'}`}>
                    {step.title}
                  </h4>
                  {isRevealed && (
                    <p className={`text-gray-300 animate-fadeIn ${isPresentation ? 'text-xl lg:text-2xl leading-relaxed' : 'text-sm'}`}>
                      {step.content}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className={`flex items-center justify-between ${isPresentation ? 'mt-8' : 'mt-6'}`}>
        <div className="flex items-center gap-2">
          <span className={`text-${themeColor}-400 font-mono ${isPresentation ? 'text-xl' : 'text-base'}`}>
            {revealedCount}/{steps.length}
          </span>
          {/* Progress dots */}
          <div className="flex gap-1">
            {steps.map((_, idx) => (
              <div
                key={idx}
                className={`${isPresentation ? 'w-3 h-3' : 'w-2 h-2'} rounded-full transition-all duration-300 ${
                  idx < revealedCount ? `bg-${themeColor}-500` : 'bg-gray-700'
                }`}
              />
            ))}
          </div>
        </div>

        <div className={`flex ${isPresentation ? 'gap-3' : 'gap-2'}`}>
          {revealedCount > 0 && (
            <button
              onClick={reset}
              className={`${isPresentation ? 'px-6 py-3 text-lg' : 'px-4 py-2 text-sm'} bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 font-medium transition-all`}
            >
              Reset
            </button>
          )}
          
          {revealedCount < steps.length && (
            <>
              <button
                onClick={revealAll}
                className={`${isPresentation ? 'px-6 py-3 text-lg' : 'px-4 py-2 text-sm'} bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 font-medium transition-all`}
              >
                Show All
              </button>
              <button
                onClick={revealNext}
                className={`${isPresentation ? 'px-6 py-3 text-lg' : 'px-4 py-2 text-sm'} bg-${themeColor}-600 hover:bg-${themeColor}-500 rounded-lg text-white font-medium transition-all flex items-center gap-2`}
              >
                Reveal Next <ChevronDown size={isPresentation ? 24 : 16} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
