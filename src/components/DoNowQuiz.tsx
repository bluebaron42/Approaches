import { useState } from 'react';
import { CheckCircle, Clock } from 'lucide-react';
import { QuizQuestion } from '../constants';

interface DoNowQuizProps {
  questions: QuizQuestion[];
  isPresentation: boolean;
  themeColor?: string;
}

export default function DoNowQuiz({ questions, isPresentation, themeColor = 'indigo' }: DoNowQuizProps) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (qId: number, optionIdx: number) => {
    if (!showResults) {
      setAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
    }
  };

  const score = Object.keys(answers).reduce(
    (acc, qId) => acc + (answers[Number(qId)] === questions.find(q => q.id === Number(qId))?.correct ? 1 : 0),
    0
  );

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 h-full content-start transition-all ${isPresentation ? 'gap-12 lg:gap-20' : 'gap-8'}`}>
      {/* Left Column - Instructions */}
      <div className={isPresentation ? 'space-y-8' : 'space-y-6'}>
        <div className={`bg-gradient-to-br from-${themeColor}-900/40 to-purple-900/20 rounded-2xl border border-${themeColor}-500/20 ${isPresentation ? 'p-10' : 'p-8'} shadow-lg relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full"></div>
          <h3 className={`font-bold text-white mb-4 ${isPresentation ? 'text-4xl lg:text-5xl' : 'text-xl'}`}>
            Task: Activation & Retrieval
          </h3>
          <p className={`text-gray-300 mb-6 ${isPresentation ? 'text-2xl lg:text-3xl leading-relaxed' : 'text-sm'}`}>
            Test your recall from previous lessons. This activates prior knowledge and prepares your brain for new learning.
          </p>
          <div className={`flex items-center gap-2 text-${themeColor}-400 mb-6 ${isPresentation ? 'text-2xl' : 'text-sm'}`}>
            <Clock size={isPresentation ? 28 : 16} />
            <span>5 minutes</span>
          </div>
        </div>

        <div className={`flex flex-col ${isPresentation ? 'gap-6' : 'gap-3'}`}>
          {!showResults ? (
            <>
              <button
                onClick={() => setShowResults(true)}
                disabled={Object.keys(answers).length < questions.length}
                className={`bg-${themeColor}-600 hover:bg-${themeColor}-500 disabled:opacity-50 disabled:grayscale text-white font-bold rounded-xl w-full transition-all ${
                  isPresentation ? 'px-12 py-8 text-3xl lg:text-4xl' : 'px-8 py-4 text-base'
                }`}
              >
                Check Answers
              </button>
              <button
                onClick={() => setShowResults(true)}
                className={`bg-transparent hover:bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-500 rounded-xl font-semibold w-full transition-all ${
                  isPresentation ? 'px-12 py-6 text-2xl lg:text-3xl' : 'px-8 py-3 text-sm'
                }`}
              >
                Reveal All Answers
              </button>
            </>
          ) : (
            <div
              className={`bg-green-900/30 border border-green-500/30 rounded-xl w-full text-center animate-fadeIn shadow-[0_0_30px_rgba(34,197,94,0.1)] ${
                isPresentation ? 'p-12' : 'p-6'
              }`}
            >
              <span
                className={`font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300 block mb-2 ${
                  isPresentation ? 'text-8xl lg:text-9xl mb-6' : 'text-3xl'
                }`}
              >
                Score: {score} / {questions.length}
              </span>
              <span className={`text-green-200/70 font-mono uppercase tracking-widest ${isPresentation ? 'text-2xl' : 'text-xs'}`}>
                Knowledge Retrieved
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Right Column - Questions */}
      <div className={`${isPresentation ? 'space-y-5' : 'space-y-3'} overflow-y-auto pr-2 custom-scrollbar max-h-full`}>
        {questions.map((q) => (
          <div
            key={q.id}
            className={`bg-gray-900/50 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors ${
              isPresentation ? 'p-8 mb-6' : 'p-4'
            }`}
          >
            <h4 className={`font-semibold text-gray-200 ${isPresentation ? 'mb-4' : 'mb-3'} ${isPresentation ? 'text-2xl lg:text-3xl' : 'text-sm'}`}>
              <span className={`text-${themeColor}-500 mr-2`}>{q.id < 10 ? `0${q.id}` : q.id}.</span>
              {q.question}
            </h4>
            
            {isPresentation ? (
              <div className={isPresentation ? 'min-h-[60px]' : 'min-h-[40px]'}>
                {showResults && (
                  <div className={`text-green-400 font-bold ${isPresentation ? 'text-3xl lg:text-4xl' : 'text-3xl'} animate-fadeIn mt-2 flex items-center gap-3`}>
                    <CheckCircle size={isPresentation ? 40 : 32} className="text-green-500" /> {q.options[q.correct]}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2">
                {q.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(q.id, idx)}
                    className={`rounded-lg text-left transition-all px-4 py-2 text-xs border ${
                      showResults
                        ? idx === q.correct
                          ? 'bg-green-900/30 border-green-500 text-green-300'
                          : answers[q.id] === idx
                            ? 'bg-red-900/30 border-red-500 text-red-300'
                            : 'bg-gray-900/50 border-transparent text-gray-600 opacity-50'
                        : answers[q.id] === idx
                          ? `bg-${themeColor}-600 border-${themeColor}-500 text-white`
                          : 'bg-gray-800 border-transparent hover:bg-gray-750 text-gray-400 hover:text-white'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
