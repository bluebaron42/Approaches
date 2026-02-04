import { useState } from 'react';

interface SpotlightCard {
  id: string;
  title: string;
  content: string;
  icon: string;
  color: string;
  details?: string[];
}

interface SpotlightCardsProps {
  cards: SpotlightCard[];
  isPresentation: boolean;
  columns?: 2 | 3;
}

export default function SpotlightCards({ cards, isPresentation, columns = 2 }: SpotlightCardsProps) {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const gridClass = columns === 3 ? 'grid-cols-3' : 'grid-cols-2';

  return (
    <div className={`grid ${gridClass} ${isPresentation ? 'gap-6' : 'gap-4'} w-full ${isPresentation ? 'max-w-6xl' : 'max-w-4xl'}`}>
      {cards.map((card) => {
        const isActive = activeCard === card.id;
        const isDimmed = activeCard !== null && !isActive;

        return (
          <button
            key={card.id}
            onClick={() => setActiveCard(isActive ? null : card.id)}
            className={`
              text-left ${isPresentation ? 'p-8' : 'p-6'} rounded-2xl border transition-all duration-300 cursor-pointer
              ${isActive 
                ? `bg-${card.color}-900/40 border-${card.color}-500 scale-[1.02] shadow-lg shadow-${card.color}-500/20` 
                : `bg-gray-800/50 border-gray-700 hover:border-${card.color}-500/50`
              }
              ${isDimmed ? 'opacity-40 scale-[0.98]' : 'opacity-100'}
            `}
          >
            <div className={`flex items-center ${isPresentation ? 'gap-4 mb-4' : 'gap-3 mb-3'}`}>
              <span className={isPresentation ? 'text-5xl' : 'text-3xl'}>{card.icon}</span>
              <h3 className={`font-bold text-${card.color}-400 ${isPresentation ? 'text-2xl lg:text-3xl' : 'text-lg'}`}>
                {card.title}
              </h3>
            </div>
            
            <p className={`text-gray-300 ${isPresentation ? 'text-xl lg:text-2xl leading-relaxed' : 'text-sm'}`}>
              {card.content}
            </p>

            {isActive && card.details && (
              <div className={`${isPresentation ? 'mt-6 pt-6' : 'mt-4 pt-4'} border-t border-gray-700 animate-fadeIn`}>
                <ul className={isPresentation ? 'space-y-3' : 'space-y-2'}>
                  {card.details.map((detail, idx) => (
                    <li key={idx} className={`text-${card.color}-300 ${isPresentation ? 'text-xl' : 'text-sm'}`}>
                      • {detail}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
