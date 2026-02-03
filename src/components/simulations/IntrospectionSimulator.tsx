import React, { useState, useEffect, useCallback } from 'react';
import { Play, RotateCcw, Eye, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

interface IntrospectionSimulatorProps {
  themeColor: string;
  isPresentation: boolean;
}

const stimuli = [
  { id: 1, name: 'Red Circle', emoji: '🔴', color: 'red' },
  { id: 2, name: 'Blue Square', emoji: '🟦', color: 'blue' },
  { id: 3, name: 'Yellow Triangle', emoji: '🔶', color: 'yellow' },
];

const sampleResponses = {
  trained: [
    "I perceive a circular form with a saturated red hue. The color evokes a mild sensation of warmth. Duration: approximately 2 seconds of focused attention before peripheral awareness intrudes.",
    "A quadrilateral shape in blue. The color produces a calming sensation. I note systematic eye movement from corner to corner.",
    "Triangular form, yellow-orange. Creates a sense of alertness. I observe my attention naturally drawn to the apex."
  ],
  untrained: [
    "It's a red ball... reminds me of a tomato. Makes me hungry actually.",
    "Blue square thing. Looks like an app icon? Pretty boring honestly.",
    "Yellow triangle - warning sign vibes! Reminds me of road works."
  ]
};

type Phase = 'intro' | 'task' | 'compare' | 'results';

export default function IntrospectionSimulator({ themeColor, isPresentation }: IntrospectionSimulatorProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentStimulus, setCurrentStimulus] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [userResponses, setUserResponses] = useState<string[]>(['', '', '']);
  const [showComparison, setShowComparison] = useState(false);

  const startTask = () => {
    setPhase('task');
    setCurrentStimulus(0);
    setTimeLeft(15);
    setIsTimerRunning(true);
    setUserResponses(['', '', '']);
  };

  const handleResponseChange = (value: string) => {
    const newResponses = [...userResponses];
    newResponses[currentStimulus] = value;
    setUserResponses(newResponses);
  };

  const nextStimulus = useCallback(() => {
    if (currentStimulus < stimuli.length - 1) {
      setCurrentStimulus(prev => prev + 1);
      setTimeLeft(15);
    } else {
      setIsTimerRunning(false);
      setPhase('compare');
    }
  }, [currentStimulus]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      nextStimulus();
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft, nextStimulus]);

  const resetSimulation = () => {
    setPhase('intro');
    setCurrentStimulus(0);
    setTimeLeft(15);
    setIsTimerRunning(false);
    setUserResponses(['', '', '']);
    setShowComparison(false);
  };

  const textSize = isPresentation ? 'text-lg' : 'text-base';

  return (
    <div className="w-full max-w-4xl mx-auto">
      {phase === 'intro' && (
        <div className="text-center space-y-6">
          <div className={`bg-${themeColor}-900/30 border border-${themeColor}-500/50 rounded-2xl p-6`}>
            <Eye className={`w-12 h-12 mx-auto mb-4 text-${themeColor}-400`} />
            <h3 className={`text-${themeColor}-400 font-bold text-xl mb-3`}>Wundt's Introspection Task</h3>
            <p className={`text-gray-300 ${textSize} mb-4`}>
              Experience introspection as Wundt's trained observers did. You will be shown 3 stimuli 
              and must describe your <strong>conscious experience</strong> of each in detail.
            </p>
            <div className="bg-gray-800/50 rounded-xl p-4 text-left">
              <p className="text-amber-400 font-bold mb-2">📋 Instructions:</p>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• Focus ONLY on your immediate sensory experience</li>
                <li>• Describe colors, shapes, feelings, sensations</li>
                <li>• Avoid interpretations or associations (e.g., "reminds me of...")</li>
                <li>• You have 15 seconds per stimulus</li>
              </ul>
            </div>
          </div>
          <button
            onClick={startTask}
            className={`px-8 py-4 bg-${themeColor}-600 hover:bg-${themeColor}-500 rounded-xl text-white font-bold text-lg transition-all flex items-center gap-3 mx-auto`}
          >
            <Play size={24} /> Begin Introspection Task
          </button>
        </div>
      )}

      {phase === 'task' && (
        <div className="space-y-6">
          {/* Timer and Progress */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Stimulus {currentStimulus + 1} of {stimuli.length}</span>
            </div>
            <div className={`flex items-center gap-2 ${timeLeft <= 5 ? 'text-red-400' : 'text-gray-300'}`}>
              <Clock size={20} />
              <span className="font-mono text-xl font-bold">{timeLeft}s</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-${themeColor}-500 transition-all duration-1000`}
              style={{ width: `${((15 - timeLeft) / 15) * 100}%` }}
            />
          </div>

          {/* Stimulus Display */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 text-center">
            <div className="text-8xl mb-4">{stimuli[currentStimulus].emoji}</div>
            <p className="text-gray-500 text-sm">Describe your conscious experience of this stimulus</p>
          </div>

          {/* Response Input */}
          <textarea
            value={userResponses[currentStimulus]}
            onChange={(e) => handleResponseChange(e.target.value)}
            placeholder="Describe your sensory experience: colors, shapes, sensations, feelings..."
            className="w-full h-32 bg-gray-900 border border-gray-700 rounded-xl p-4 text-gray-200 placeholder-gray-500 focus:border-indigo-500 focus:outline-none resize-none"
          />

          {/* Next Button */}
          <button
            onClick={nextStimulus}
            className={`w-full py-3 bg-${themeColor}-600 hover:bg-${themeColor}-500 rounded-xl text-white font-bold transition-all`}
          >
            {currentStimulus < stimuli.length - 1 ? 'Next Stimulus →' : 'Complete Task'}
          </button>
        </div>
      )}

      {phase === 'compare' && (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <CheckCircle className={`w-12 h-12 mx-auto mb-3 text-${themeColor}-400`} />
            <h3 className="text-white font-bold text-xl">Task Complete!</h3>
            <p className="text-gray-400">Now compare your responses with "trained" and "untrained" observers</p>
          </div>

          <button
            onClick={() => setShowComparison(!showComparison)}
            className={`w-full py-3 bg-amber-600 hover:bg-amber-500 rounded-xl text-white font-bold transition-all`}
          >
            {showComparison ? 'Hide Comparison' : '👁️ Reveal: Compare Responses'}
          </button>

          {showComparison && (
            <div className="space-y-6">
              {stimuli.map((stimulus, index) => (
                <div key={stimulus.id} className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">{stimulus.emoji}</span>
                    <span className="text-white font-bold">{stimulus.name}</span>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-blue-900/20 rounded-lg p-3 border border-blue-500/30">
                      <p className="text-blue-400 font-bold text-sm mb-2">Your Response:</p>
                      <p className="text-gray-300 text-sm">{userResponses[index] || '(No response)'}</p>
                    </div>
                    <div className="bg-green-900/20 rounded-lg p-3 border border-green-500/30">
                      <p className="text-green-400 font-bold text-sm mb-2">Trained Observer:</p>
                      <p className="text-gray-300 text-sm">{sampleResponses.trained[index]}</p>
                    </div>
                    <div className="bg-red-900/20 rounded-lg p-3 border border-red-500/30">
                      <p className="text-red-400 font-bold text-sm mb-2">Untrained Observer:</p>
                      <p className="text-gray-300 text-sm">{sampleResponses.untrained[index]}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => setPhase('results')}
            className={`w-full py-3 bg-${themeColor}-600 hover:bg-${themeColor}-500 rounded-xl text-white font-bold transition-all`}
          >
            See What This Demonstrates →
          </button>
        </div>
      )}

      {phase === 'results' && (
        <div className="space-y-6">
          <div className={`bg-${themeColor}-900/30 border border-${themeColor}-500/50 rounded-2xl p-6`}>
            <AlertTriangle className="w-10 h-10 text-amber-400 mb-4" />
            <h3 className="text-white font-bold text-xl mb-4">Why Introspection Failed</h3>
            
            <div className="space-y-4 text-gray-300">
              <div className="bg-gray-800/50 rounded-xl p-4">
                <p className="text-red-400 font-bold mb-2">❌ Problem 1: Subjectivity</p>
                <p className="text-sm">Even with training, two observers describe the same stimulus differently. There's no way to verify whose experience is "correct."</p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-4">
                <p className="text-red-400 font-bold mb-2">❌ Problem 2: Training Changes Experience</p>
                <p className="text-sm">Trained observers give systematic responses, but this might reflect their training rather than their actual experience.</p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-4">
                <p className="text-red-400 font-bold mb-2">❌ Problem 3: Unconscious Processes</p>
                <p className="text-sm">We can only report conscious experiences. Much of mental processing happens below awareness and cannot be introspected.</p>
              </div>

              <div className="bg-green-900/30 rounded-xl p-4 border border-green-500/30">
                <p className="text-green-400 font-bold mb-2">✓ Historical Significance</p>
                <p className="text-sm">Despite these limitations, Wundt established that psychology could use systematic methods. This paved the way for more objective approaches like behaviourism.</p>
              </div>
            </div>
          </div>

          <button
            onClick={resetSimulation}
            className="w-full py-3 bg-gray-700 hover:bg-gray-600 rounded-xl text-white font-bold transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw size={20} /> Try Again
          </button>
        </div>
      )}
    </div>
  );
}
