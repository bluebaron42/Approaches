import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  id: string;
  title: string;
  icon?: string;
  content: React.ReactNode;
  color?: string;
}

interface AccordionSectionsProps {
  items: AccordionItem[];
  isPresentation: boolean;
  themeColor?: string;
  allowMultiple?: boolean;
}

export default function AccordionSections({ 
  items, 
  isPresentation, 
  themeColor = 'purple',
  allowMultiple = false 
}: AccordionSectionsProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenIds = new Set(openIds);
    
    if (openIds.has(id)) {
      newOpenIds.delete(id);
    } else {
      if (!allowMultiple) {
        newOpenIds.clear();
      }
      newOpenIds.add(id);
    }
    
    setOpenIds(newOpenIds);
  };

  return (
    <div className={`w-full ${isPresentation ? 'max-w-5xl space-y-4' : 'max-w-3xl space-y-3'}`}>
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        const itemColor = item.color || themeColor;

        return (
          <div
            key={item.id}
            className={`
              rounded-xl border transition-all duration-300
              ${isOpen 
                ? `bg-${itemColor}-900/30 border-${itemColor}-500/50` 
                : 'bg-gray-800/50 border-gray-700'
              }
            `}
          >
            <button
              onClick={() => toggleItem(item.id)}
              className={`w-full flex items-center justify-between ${isPresentation ? 'p-6' : 'p-4'} text-left ${isOpen ? 'accordion-open' : ''}`}
            >
              <div className={`flex items-center ${isPresentation ? 'gap-4' : 'gap-3'}`}>
                {item.icon && <span className={isPresentation ? 'text-4xl' : 'text-2xl'}>{item.icon}</span>}
                <span className={`font-bold ${isOpen ? `text-${itemColor}-400` : 'text-gray-300'} ${isPresentation ? 'text-2xl lg:text-3xl' : 'text-lg'}`}>
                  {item.title}
                </span>
              </div>
              
              <ChevronDown 
                className={`accordion-chevron text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                size={isPresentation ? 32 : 24} 
              />
            </button>

            {isOpen && (
              <div className={`${isPresentation ? 'px-6 pb-6' : 'px-4 pb-4'} animate-fadeIn`}>
                <div className={`${isPresentation ? 'pt-6' : 'pt-4'} border-t border-${itemColor}-500/30`}>
                  {item.content}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
