import { useState, useEffect, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Projector,
  Menu,
  X
} from 'lucide-react';
import { lessons, lessonThemes } from './constants';
import Lesson1, { lesson1SlideCount } from './lessons/Lesson1';
import Lesson2, { lesson2SlideCount } from './lessons/Lesson2';
import Lesson3, { lesson3SlideCount } from './lessons/Lesson3';
import Lesson4, { lesson4SlideCount } from './lessons/Lesson4';
import Lesson5, { lesson5SlideCount } from './lessons/Lesson5';
import Lesson6, { lesson6SlideCount } from './lessons/Lesson6';
import Lesson7, { lesson7SlideCount } from './lessons/Lesson7';
import Lesson8, { lesson8SlideCount } from './lessons/Lesson8';

// Slide counts for each lesson
const slideCounts: Record<number, number> = {
  1: lesson1SlideCount,
  2: lesson2SlideCount,
  3: lesson3SlideCount,
  4: lesson4SlideCount,
  5: lesson5SlideCount,
  6: lesson6SlideCount,
  7: lesson7SlideCount,
  8: lesson8SlideCount,
};

export default function App() {
  const [currentLesson, setCurrentLesson] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPresentation, setIsPresentation] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const theme = lessonThemes[currentLesson];
  const totalSlides = slideCounts[currentLesson] || 9;

  // Keyboard navigation
  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides - 1) setCurrentSlide((prev) => prev + 1);
  }, [currentSlide, totalSlides]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) setCurrentSlide((prev) => prev - 1);
  }, [currentSlide]);

  useEffect(() => {
    setCurrentSlide(0);
  }, [currentLesson]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPresentation) {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPresentation, nextSlide, prevSlide]);

  const togglePresentation = () => {
    if (!isPresentation) {
      if (document.documentElement.requestFullscreen)
        document.documentElement.requestFullscreen().catch(() => null);
      setIsSidebarOpen(false);
      setIsPresentation(true);
    } else {
      if (document.exitFullscreen && document.fullscreenElement)
        document.exitFullscreen().catch(() => null);
      setIsPresentation(false);
    }
  };

  // Render current lesson
  const renderLesson = () => {
    const props = { isPresentation, currentSlide };
    
    switch (currentLesson) {
      case 1: return <Lesson1 {...props} />;
      case 2: return <Lesson2 {...props} />;
      case 3: return <Lesson3 {...props} />;
      case 4: return <Lesson4 {...props} />;
      case 5: return <Lesson5 {...props} />;
      case 6: return <Lesson6 {...props} />;
      case 7: return <Lesson7 {...props} />;
      case 8: return <Lesson8 {...props} />;
      default: return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 font-sans overflow-hidden selection:bg-indigo-500 selection:text-white">
      {/* Sidebar */}
      <div
        className={`${isSidebarOpen ? 'w-80' : 'w-0'} bg-gray-950 border-r border-gray-800 transition-all duration-300 flex flex-col z-20 shadow-2xl relative overflow-hidden`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <span className={`font-black text-xl text-${theme.color}-500 tracking-tighter`}>APPROACHES</span>
          <button onClick={() => setIsSidebarOpen(false)} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Lesson List */}
        <div className="flex-grow overflow-y-auto py-4">
          {lessons.map((lesson) => {
            const isActive = currentLesson === lesson.id;
            return (
              <button
                key={lesson.id}
                onClick={() => setCurrentLesson(lesson.id)}
                className={`w-full text-left px-6 py-4 border-l-4 transition-all ${
                  isActive
                    ? `border-${theme.color}-500 bg-${theme.color}-900/10 text-white shadow-[inset_10px_0_20px_-10px_rgba(99,102,241,0.2)]`
                    : 'border-transparent text-gray-500 hover:bg-gray-900 hover:text-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm tracking-tight">{lesson.title}</span>
                  {isActive && (
                    <div className={`w-2 h-2 rounded-full bg-${theme.color}-500 shadow-[0_0_10px_rgba(99,102,241,1)]`}></div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col h-full relative bg-[#0a0a0a]">
        {/* Top Bar Controls */}
        <div className="absolute top-4 left-4 z-50 flex gap-2">
          {!isSidebarOpen && (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="bg-gray-800 p-2 rounded text-white hover:bg-gray-700 shadow-lg border border-gray-700"
            >
              <Menu size={20} />
            </button>
          )}
        </div>

        <div className="absolute top-4 right-4 z-50 flex gap-2">
          <button
            onClick={togglePresentation}
            className={`p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 border border-gray-700/50 backdrop-blur-sm transition-all ${
              isPresentation
                ? `bg-${theme.color}-600 text-white border-${theme.color}-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]`
                : 'bg-gray-800/80'
            }`}
            title="Presentation Mode"
          >
            <Projector size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-gray-900 w-full">
          <div
            className={`h-full bg-gradient-to-r from-${theme.color}-800 to-${theme.color}-500 transition-all duration-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]`}
            style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
          />
        </div>

        {/* Main Slide Content */}
        <main
          className="flex-grow relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#050505] to-black"
          style={{ zoom: isPresentation ? '1.25' : '1' }}
        >
          {renderLesson()}
        </main>

        {/* Bottom Navigation */}
        <div className="h-20 border-t border-gray-800 bg-black/50 backdrop-blur-sm flex items-center justify-between px-8 z-10">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all ${
              currentSlide === 0
                ? 'text-gray-700 cursor-not-allowed'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <ChevronLeft size={16} /> PREV
          </button>

          <span className="text-gray-600 font-mono text-xs tracking-widest">
            {currentSlide + 1} / {totalSlides}
          </span>

          <button
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all ${
              currentSlide === totalSlides - 1
                ? 'text-gray-700 cursor-not-allowed'
                : `bg-${theme.color}-600 text-white hover:bg-${theme.color}-500 shadow-lg hover:shadow-${theme.color}-500/20`
            }`}
          >
            NEXT <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
