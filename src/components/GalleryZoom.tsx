import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  preview: string;
  icon: string;
  color: string;
  details: {
    description: string;
    keyPoints: string[];
    examples?: string[];
    tips?: string[];
    mistakes?: string[];
  };
}

interface GalleryZoomProps {
  items: GalleryItem[];
  isPresentation: boolean;
}

export default function GalleryZoom({ items, isPresentation }: GalleryZoomProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  if (selectedItem) {
    return (
      <div className={`w-full max-w-4xl bg-${selectedItem.color}-900/30 border border-${selectedItem.color}-500/50 rounded-2xl p-8 animate-fadeIn`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setSelectedItem(null)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 transition-all"
          >
            <ArrowLeft size={20} /> Back to gallery
          </button>
          
          <div className="flex items-center gap-3">
            <span className="text-4xl">{selectedItem.icon}</span>
            <h3 className={`text-${selectedItem.color}-400 font-black ${isPresentation ? 'text-3xl' : 'text-2xl'}`}>
              {selectedItem.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className={`text-gray-300 mb-6 ${isPresentation ? 'text-xl' : 'text-base'}`}>
          {selectedItem.details.description}
        </p>

        {/* Key Points */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className={`p-4 bg-${selectedItem.color}-900/20 rounded-xl border border-${selectedItem.color}-500/30`}>
            <h4 className={`text-${selectedItem.color}-400 font-bold mb-3 ${isPresentation ? 'text-xl' : 'text-lg'}`}>
              📌 Key Points
            </h4>
            <ul className="space-y-2">
              {selectedItem.details.keyPoints.map((point, idx) => (
                <li key={idx} className={`text-gray-300 ${isPresentation ? 'text-lg' : 'text-sm'}`}>
                  • {point}
                </li>
              ))}
            </ul>
          </div>

          {selectedItem.details.examples && (
            <div className="p-4 bg-green-900/20 rounded-xl border border-green-500/30">
              <h4 className={`text-green-400 font-bold mb-3 ${isPresentation ? 'text-xl' : 'text-lg'}`}>
                ✓ Examples
              </h4>
              <ul className="space-y-2">
                {selectedItem.details.examples.map((example, idx) => (
                  <li key={idx} className={`text-gray-300 ${isPresentation ? 'text-lg' : 'text-sm'}`}>
                    • {example}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {selectedItem.details.tips && (
            <div className="p-4 bg-amber-900/20 rounded-xl border border-amber-500/30">
              <h4 className={`text-amber-400 font-bold mb-3 ${isPresentation ? 'text-xl' : 'text-lg'}`}>
                💡 Tips
              </h4>
              <ul className="space-y-2">
                {selectedItem.details.tips.map((tip, idx) => (
                  <li key={idx} className={`text-gray-300 ${isPresentation ? 'text-lg' : 'text-sm'}`}>
                    • {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {selectedItem.details.mistakes && (
            <div className="p-4 bg-red-900/20 rounded-xl border border-red-500/30">
              <h4 className={`text-red-400 font-bold mb-3 ${isPresentation ? 'text-xl' : 'text-lg'}`}>
                ⚠️ Common Mistakes
              </h4>
              <ul className="space-y-2">
                {selectedItem.details.mistakes.map((mistake, idx) => (
                  <li key={idx} className={`text-gray-300 ${isPresentation ? 'text-lg' : 'text-sm'}`}>
                    • {mistake}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl">
      <p className={`text-gray-400 mb-4 text-center ${isPresentation ? 'text-lg' : 'text-sm'}`}>
        Click a card to explore in detail
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className={`
              p-6 rounded-xl border bg-gray-800/50 border-gray-700 
              hover:border-${item.color}-500/50 hover:bg-${item.color}-900/20
              transition-all duration-300 text-left card-hover
            `}
          >
            <div className="text-4xl mb-3">{item.icon}</div>
            <h4 className={`text-${item.color}-400 font-bold mb-2 ${isPresentation ? 'text-xl' : 'text-lg'}`}>
              {item.title}
            </h4>
            <p className={`text-gray-400 ${isPresentation ? 'text-base' : 'text-sm'}`}>
              {item.preview}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
