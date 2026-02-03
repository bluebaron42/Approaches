import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, RotateCcw, ChevronRight, Award, Target, Brain } from 'lucide-react';

interface UnderstandingCheckQuestion {
  id: string | number;
  type: 'mcq' | 'scenario' | 'matching';
  question: string;
  options: string[];
  correctIndex: number;
  feedback: string;
  scenario?: string;
}

interface UnderstandingCheckProps {
  questions: UnderstandingCheckQuestion[];
  themeColor: string;
}

// Shuffle function that returns shuffled array with mapping to original indices
function shuffleWithMapping<T>(array: T[]): { shuffled: T[]; originalIndices: number[] } {
  const indices = array.map((_, i) => i);
  const shuffledIndices = [...indices];
  
  for (let i = shuffledIndices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledIndices[i], shuffledIndices[j]] = [shuffledIndices[j], shuffledIndices[i]];
  }
  
  return {
    shuffled: shuffledIndices.map(i => array[i]),
    originalIndices: shuffledIndices
  };
}

const UnderstandingCheck: React.FC<UnderstandingCheckProps> = ({ questions, themeColor }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [shuffledQuestions, setShuffledQuestions] = useState<{
    question: UnderstandingCheckQuestion;
    shuffledOptions: string[];
    originalIndices: number[];
  }[]>([]);

  // Shuffle questions and options on mount
  useEffect(() => {
    const shuffled = questions.map(q => {
      const { shuffled: shuffledOpts, originalIndices } = shuffleWithMapping(q.options);
      return {
        question: q,
        shuffledOptions: shuffledOpts,
        originalIndices: originalIndices
      };
    });
    setShuffledQuestions(shuffled);
  }, [questions]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null || shuffledQuestions.length === 0) return;
    
    const currentQ = shuffledQuestions[currentQuestion];
    // Find where the correct answer ended up after shuffling
    const shuffledCorrectIndex = currentQ.originalIndices.indexOf(currentQ.question.correctIndex);
    const isCorrect = selectedAnswer === shuffledCorrectIndex;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    setAnswers(prev => [...prev, isCorrect]);
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    // Re-shuffle on restart
    const shuffled = questions.map(q => {
      const { shuffled: shuffledOpts, originalIndices } = shuffleWithMapping(q.options);
      return {
        question: q,
        shuffledOptions: shuffledOpts,
        originalIndices: originalIndices
      };
    });
    setShuffledQuestions(shuffled);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setCompleted(false);
    setAnswers([]);
  };

  if (shuffledQuestions.length === 0) {
    return <div className="p-8 text-center text-gray-400">Loading questions...</div>;
  }

  if (completed) {
    const percentage = Math.round((score / questions.length) * 100);
    const getGrade = () => {
      if (percentage >= 90) return { grade: 'Excellent!', icon: Award, color: 'text-yellow-400' };
      if (percentage >= 70) return { grade: 'Good Work!', icon: Target, color: 'text-green-400' };
      return { grade: 'Keep Practicing!', icon: Brain, color: 'text-blue-400' };
    };
    const { grade, icon: GradeIcon, color } = getGrade();

    return (
      <div className="bg-gray-800/50 rounded-2xl p-8 text-center">
        <GradeIcon className={`w-16 h-16 mx-auto mb-4 ${color}`} />
        <h3 className={`text-2xl font-bold ${color} mb-2`}>{grade}</h3>
        <p className="text-4xl font-bold text-white mb-2">
          {score} / {questions.length}
        </p>
        <p className="text-gray-400 mb-6">{percentage}% Correct</p>
        
        {/* Answer Summary */}
        <div className="flex justify-center gap-2 mb-6">
          {answers.map((correct, idx) => (
            <div
              key={idx}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                correct ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
              }`}
            >
              {correct ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
            </div>
          ))}
        </div>

        <button
          onClick={handleRestart}
          className={`px-6 py-3 bg-${themeColor}-500 hover:bg-${themeColor}-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2 mx-auto`}
        >
          <RotateCcw className="w-5 h-5" />
          Try Again
        </button>
      </div>
    );
  }

  const currentQ = shuffledQuestions[currentQuestion];
  const shuffledCorrectIndex = currentQ.originalIndices.indexOf(currentQ.question.correctIndex);
  const isCorrect = selectedAnswer === shuffledCorrectIndex;

  return (
    <div className="bg-gray-800/50 rounded-2xl p-6">
      {/* Progress Bar */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full bg-${themeColor}-500 transition-all duration-300`}
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
        <span className="text-gray-400 text-sm">
          {currentQuestion + 1} / {questions.length}
        </span>
      </div>

      {/* Scenario (if present) */}
      {currentQ.question.scenario && (
        <div className={`bg-${themeColor}-500/10 border border-${themeColor}-500/30 rounded-lg p-4 mb-4`}>
          <p className="text-gray-300 italic">{currentQ.question.scenario}</p>
        </div>
      )}

      {/* Question */}
      <h3 className="text-xl font-semibold text-white mb-6">{currentQ.question.question}</h3>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {currentQ.shuffledOptions.map((option, idx) => {
          const isSelected = selectedAnswer === idx;
          const isThisCorrect = idx === shuffledCorrectIndex;
          
          let optionClass = `p-4 rounded-lg border-2 transition-all cursor-pointer `;
          
          if (showFeedback) {
            if (isThisCorrect) {
              optionClass += 'bg-green-500/20 border-green-500 text-green-300';
            } else if (isSelected && !isThisCorrect) {
              optionClass += 'bg-red-500/20 border-red-500 text-red-300';
            } else {
              optionClass += 'bg-gray-700/30 border-gray-600 text-gray-400';
            }
          } else {
            if (isSelected) {
              optionClass += `bg-${themeColor}-500/20 border-${themeColor}-500 text-white`;
            } else {
              optionClass += 'bg-gray-700/30 border-gray-600 text-gray-300 hover:border-gray-500';
            }
          }

          return (
            <div
              key={idx}
              onClick={() => handleAnswerSelect(idx)}
              className={optionClass}
            >
              <div className="flex items-center gap-3">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  isSelected ? `bg-${themeColor}-500 text-white` : 'bg-gray-600 text-gray-300'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{option}</span>
                {showFeedback && isThisCorrect && (
                  <CheckCircle className="w-5 h-5 ml-auto text-green-400" />
                )}
                {showFeedback && isSelected && !isThisCorrect && (
                  <XCircle className="w-5 h-5 ml-auto text-red-400" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div className={`p-4 rounded-lg mb-6 ${
          isCorrect ? 'bg-green-500/10 border border-green-500/30' : 'bg-amber-500/10 border border-amber-500/30'
        }`}>
          <p className={`font-medium mb-1 ${isCorrect ? 'text-green-400' : 'text-amber-400'}`}>
            {isCorrect ? '✓ Correct!' : '✗ Not quite right'}
          </p>
          <p className="text-gray-300">{currentQ.question.feedback}</p>
        </div>
      )}

      {/* Action Button */}
      {!showFeedback ? (
        <button
          onClick={handleSubmit}
          disabled={selectedAnswer === null}
          className={`w-full py-3 rounded-lg font-medium transition-all ${
            selectedAnswer !== null
              ? `bg-${themeColor}-500 hover:bg-${themeColor}-600 text-white`
              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
          }`}
        >
          Check Answer
        </button>
      ) : (
        <button
          onClick={handleNext}
          className={`w-full py-3 bg-${themeColor}-500 hover:bg-${themeColor}-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2`}
        >
          {currentQuestion < questions.length - 1 ? (
            <>
              Next Question
              <ChevronRight className="w-5 h-5" />
            </>
          ) : (
            'See Results'
          )}
        </button>
      )}
    </div>
  );
};

export default UnderstandingCheck;
