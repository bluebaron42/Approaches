import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselSlide {
  title: string;
  content: string;
  icon?: string;
  example?: string;
  color?: string;
}

interface CarouselNavigatorProps {
  slides: CarouselSlide[];
  isPresentation: boolean;
  themeColor?: string;
}

export default function CarouselNavigator({ slides, isPresentation, themeColor = 'purple' }: CarouselNavigatorProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const current = slides[currentIndex];
  const slideColor = current.color || themeColor;

  return (
    <div className={`w-full ${isPresentation ? 'max-w-5xl' : 'max-w-3xl'}`}>
      {/* Main Card */}
      <div className={`relative bg-${slideColor}-900/30 border border-${slideColor}-500/50 rounded-2xl ${isPresentation ? 'p-10 min-h-[400px]' : 'p-8 min-h-[300px]'} animate-fadeIn`}>
        {/* Navigation Arrows */}
        <button
          onClick={goPrev}
          className={`absolute left-4 top-1/2 -translate-y-1/2 ${isPresentation ? 'p-3' : 'p-2'} bg-gray-800/80 hover:bg-gray-700 rounded-full transition-all`}
        >
          <ChevronLeft className="text-gray-300" size={isPresentation ? 32 : 24} />
        </button>
        
        <button
          onClick={goNext}
          className={`absolute right-4 top-1/2 -translate-y-1/2 ${isPresentation ? 'p-3' : 'p-2'} bg-gray-800/80 hover:bg-gray-700 rounded-full transition-all`}
        >
          <ChevronRight className="text-gray-300" size={isPresentation ? 32 : 24} />
        </button>

        {/* Content */}
        <div className={`text-center ${isPresentation ? 'px-16' : 'px-12'}`}>
          {current.icon && (
            <div className={`${isPresentation ? 'text-7xl mb-6' : 'text-5xl mb-4'}`}>{current.icon}</div>
          )}
          
          <h3 className={`text-${slideColor}-400 font-black mb-4 ${isPresentation ? 'text-4xl lg:text-5xl' : 'text-2xl'}`}>
            {current.title}
          </h3>
          
          <p className={`text-gray-300 ${isPresentation ? 'text-2xl lg:text-3xl leading-relaxed' : 'text-base'}`}>
            {current.content}
          </p>

          {current.example && (
            <div className={`${isPresentation ? 'mt-8 p-6' : 'mt-6 p-4'} bg-gray-800/50 rounded-xl border border-gray-700`}>
              <p className={`${isPresentation ? 'text-lg' : 'text-sm'} text-gray-400 mb-1`}>📌 Example:</p>
              <p className={`text-gray-300 ${isPresentation ? 'text-xl lg:text-2xl' : 'text-base'}`}>
                {current.example}
              </p>
            </div>
          )}
        </div>

        {/* Counter */}
        <div className={`absolute top-4 right-4 ${isPresentation ? 'px-4 py-2' : 'px-3 py-1'} bg-gray-800/80 rounded-full`}>
          <span className={`text-${slideColor}-400 font-mono ${isPresentation ? 'text-lg' : 'text-sm'}`}>
            {currentIndex + 1}/{slides.length}
          </span>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className={`flex items-center justify-center ${isPresentation ? 'gap-3 mt-6' : 'gap-2 mt-4'}`}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`
              transition-all duration-300 rounded-full ${isPresentation ? 'h-4' : 'h-3'}
              ${index === currentIndex 
                ? `${isPresentation ? 'w-10' : 'w-8'} bg-${slideColor}-500` 
                : `${isPresentation ? 'w-4' : 'w-3'} bg-gray-600 hover:bg-gray-500`
              }
            `}
          />
        ))}
      </div>
    </div>
  );
}
