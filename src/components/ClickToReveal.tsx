import { useState } from 'react';
import { Eye } from 'lucide-react';

interface RevealCard {
  id: string;
  category: 'strength' | 'limitation' | 'point' | 'custom';
  title: string;
  content: string;
  customColor?: string;
}

interface ClickToRevealProps {
  cards: RevealCard[];
  isPresentation: boolean;
  columns?: 1 | 2;
}

const categoryColors = {
  strength: { bg: 'bg-green-900/30', border: 'border-green-500/50', text: 'text-green-400', label: '✓ Strength' },
  limitation: { bg: 'bg-red-900/30', border: 'border-red-500/50', text: 'text-red-400', label: '✗ Limitation' },
  point: { bg: 'bg-blue-900/30', border: 'border-blue-500/50', text: 'text-blue-400', label: '📌 Point' },
  custom: { bg: 'bg-gray-800/50', border: 'border-gray-700', text: 'text-gray-400', label: '' },
};

export default function ClickToReveal({ cards, isPresentation, columns = 2 }: ClickToRevealProps) {
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());

  const toggleReveal = (id: string) => {
    const newRevealed = new Set(revealedIds);
    if (revealedIds.has(id)) {
      newRevealed.delete(id);
    } else {
      newRevealed.add(id);
    }
    setRevealedIds(newRevealed);
  };

  const revealAll = () => {
    setRevealedIds(new Set(cards.map(c => c.id)));
  };

  const hideAll = () => {
    setRevealedIds(new Set());
  };

  const gridClass = columns === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2';

  return (
    <div className={`w-full ${isPresentation ? 'max-w-6xl' : 'max-w-4xl'}`}>
      {/* Controls */}
      <div className={`flex items-center justify-between ${isPresentation ? 'mb-6' : 'mb-4'}`}>
        <span className={`text-gray-500 ${isPresentation ? 'text-lg' : 'text-sm'}`}>
          {revealedIds.size}/{cards.length} revealed
        </span>
        <div className={`flex ${isPresentation ? 'gap-3' : 'gap-2'}`}>
          <button
            onClick={hideAll}
            className={`${isPresentation ? 'px-5 py-2 text-lg' : 'px-3 py-1 text-sm'} bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 transition-all`}
          >
            Hide All
          </button>
          <button
            onClick={revealAll}
            className={`${isPresentation ? 'px-5 py-2 text-lg' : 'px-3 py-1 text-sm'} bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white transition-all`}
          >
            Reveal All
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className={`grid ${gridClass} ${isPresentation ? 'gap-6' : 'gap-4'}`}>
        {cards.map((card) => {
          const isRevealed = revealedIds.has(card.id);
          const colors = categoryColors[card.category];

          return (
            <button
              key={card.id}
              onClick={() => toggleReveal(card.id)}
              className={`
                text-left ${isPresentation ? 'p-6' : 'p-5'} rounded-xl border transition-all duration-300
                ${isRevealed 
                  ? `${colors.bg} ${colors.border}` 
                  : 'bg-gray-800/30 border-gray-700 border-dashed hover:border-gray-500'
                }
              `}
            >
              {isRevealed ? (
                <div className="animate-fadeIn">
                  {colors.label && (
                    <span className={`${colors.text} ${isPresentation ? 'text-base' : 'text-sm'} font-bold uppercase tracking-wider`}>
                      {colors.label}
                    </span>
                  )}
                  <h4 className={`${colors.text} font-bold mt-1 ${isPresentation ? 'text-2xl lg:text-3xl' : 'text-lg'}`}>
                    {card.title}
                  </h4>
                  <p className={`text-gray-300 mt-2 ${isPresentation ? 'text-xl lg:text-2xl leading-relaxed' : 'text-sm'}`}>
                    {card.content}
                  </p>
                </div>
              ) : (
                <div className={`flex items-center justify-center ${isPresentation ? 'h-32' : 'h-24'} text-gray-500`}>
                  <div className="text-center">
                    <Eye className="mx-auto mb-2" size={isPresentation ? 36 : 24} />
                    <span className={`${isPresentation ? 'text-xl' : 'text-sm'}`}>
                      Click to reveal...
                    </span>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
