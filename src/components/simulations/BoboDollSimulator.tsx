import { useState } from 'react';
import { Play, RotateCcw, Eye, Users, Zap, Target } from 'lucide-react';

interface BoboDollSimulatorProps {
  themeColor: string;
  isPresentation: boolean;
}

type Phase = 'setup' | 'observation' | 'variables' | 'results';
type ModelType = 'aggressive' | 'non-aggressive' | 'none';

interface ARRMFactors {
  attention: number;
  retention: number;
  reproduction: number;
  motivation: number;
}

export default function BoboDollSimulator({ themeColor, isPresentation: _isPresentation }: BoboDollSimulatorProps) {
  const [phase, setPhase] = useState<Phase>('setup');
  const [modelType, setModelType] = useState<ModelType>('aggressive');
  const [arrm, setArrm] = useState<ARRMFactors>({
    attention: 75,
    retention: 75,
    reproduction: 75,
    motivation: 75
  });
  const [_showResults, setShowResults] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const calculateImitation = () => {
    const baseRate = modelType === 'aggressive' ? 80 : modelType === 'non-aggressive' ? 10 : 5;
    const arrmMultiplier = (arrm.attention + arrm.retention + arrm.reproduction + arrm.motivation) / 400;
    return Math.round(baseRate * arrmMultiplier);
  };

  const runExperiment = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      setShowResults(true);
      setPhase('results');
    }, 2000);
  };

  const resetExperiment = () => {
    setPhase('setup');
    setModelType('aggressive');
    setArrm({ attention: 75, retention: 75, reproduction: 75, motivation: 75 });
    setShowResults(false);
  };

  const imitationRate = calculateImitation();

  return (
    <div className="w-full max-w-4xl mx-auto">
      {phase === 'setup' && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className={`text-${themeColor}-400 font-bold text-xl mb-2`}>🎯 Bobo Doll Experiment Simulator</h3>
            <p className="text-gray-400">Recreate Bandura's famous study on observational learning</p>
          </div>

          {/* Model Selection */}
          <div className={`bg-${themeColor}-900/30 border border-${themeColor}-500/50 rounded-2xl p-6`}>
            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
              <Users size={20} /> Step 1: Choose the Model Type
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => setModelType('aggressive')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  modelType === 'aggressive' 
                    ? 'border-red-500 bg-red-900/30' 
                    : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                }`}
              >
                <div className="text-4xl mb-2">😠👊</div>
                <p className={`font-bold ${modelType === 'aggressive' ? 'text-red-400' : 'text-gray-300'}`}>
                  Aggressive Model
                </p>
                <p className="text-gray-500 text-xs mt-1">Hits, kicks, and verbally abuses Bobo doll</p>
              </button>
              
              <button
                onClick={() => setModelType('non-aggressive')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  modelType === 'non-aggressive' 
                    ? 'border-green-500 bg-green-900/30' 
                    : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                }`}
              >
                <div className="text-4xl mb-2">😊🧸</div>
                <p className={`font-bold ${modelType === 'non-aggressive' ? 'text-green-400' : 'text-gray-300'}`}>
                  Non-Aggressive Model
                </p>
                <p className="text-gray-500 text-xs mt-1">Plays calmly with other toys, ignores Bobo</p>
              </button>
              
              <button
                onClick={() => setModelType('none')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  modelType === 'none' 
                    ? 'border-blue-500 bg-blue-900/30' 
                    : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                }`}
              >
                <div className="text-4xl mb-2">❓🧸</div>
                <p className={`font-bold ${modelType === 'none' ? 'text-blue-400' : 'text-gray-300'}`}>
                  No Model (Control)
                </p>
                <p className="text-gray-500 text-xs mt-1">Child does not observe any adult behaviour</p>
              </button>
            </div>
          </div>

          <button
            onClick={() => setPhase('variables')}
            className={`w-full py-4 bg-${themeColor}-600 hover:bg-${themeColor}-500 rounded-xl text-white font-bold transition-all`}
          >
            Next: Adjust ARRM Variables →
          </button>
        </div>
      )}

      {phase === 'variables' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className={`text-${themeColor}-400 font-bold text-xl`}>⚙️ Mediational Processes (ARRM)</h3>
            <button onClick={() => setPhase('setup')} className="text-gray-400 hover:text-white text-sm">
              ← Back
            </button>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 space-y-6">
            {/* Attention */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-amber-400 font-bold flex items-center gap-2">
                  <Eye size={18} /> Attention
                </span>
                <span className="text-gray-300">{arrm.attention}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={arrm.attention}
                onChange={(e) => setArrm({ ...arrm, attention: Number(e.target.value) })}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-gray-500 text-xs mt-1">
                Is the child paying attention? (Affected by: distractions, model status, distinctiveness)
              </p>
            </div>

            {/* Retention */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-blue-400 font-bold flex items-center gap-2">
                  🧠 Retention
                </span>
                <span className="text-gray-300">{arrm.retention}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={arrm.retention}
                onChange={(e) => setArrm({ ...arrm, retention: Number(e.target.value) })}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-gray-500 text-xs mt-1">
                Can they remember? (Affected by: cognitive ability, rehearsal, time since observation)
              </p>
            </div>

            {/* Reproduction */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-green-400 font-bold flex items-center gap-2">
                  💪 Reproduction
                </span>
                <span className="text-gray-300">{arrm.reproduction}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={arrm.reproduction}
                onChange={(e) => setArrm({ ...arrm, reproduction: Number(e.target.value) })}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-gray-500 text-xs mt-1">
                Can they physically perform it? (Affected by: age, motor skills, physical capability)
              </p>
            </div>

            {/* Motivation */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-purple-400 font-bold flex items-center gap-2">
                  <Zap size={18} /> Motivation
                </span>
                <span className="text-gray-300">{arrm.motivation}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={arrm.motivation}
                onChange={(e) => setArrm({ ...arrm, motivation: Number(e.target.value) })}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-gray-500 text-xs mt-1">
                Do they want to do it? (Affected by: vicarious reinforcement, expected outcomes)
              </p>
            </div>
          </div>

          {/* Prediction Panel */}
          <div className={`bg-${themeColor}-900/30 border border-${themeColor}-500/50 rounded-xl p-4`}>
            <p className="text-gray-400 text-sm mb-2">Predicted Imitation Rate:</p>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-4 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${
                    imitationRate > 50 ? 'bg-red-500' : imitationRate > 25 ? 'bg-amber-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${imitationRate}%` }}
                />
              </div>
              <span className="text-white font-bold text-xl">{imitationRate}%</span>
            </div>
          </div>

          <button
            onClick={runExperiment}
            disabled={isAnimating}
            className={`w-full py-4 bg-${themeColor}-600 hover:bg-${themeColor}-500 disabled:bg-gray-700 rounded-xl text-white font-bold transition-all flex items-center justify-center gap-2`}
          >
            {isAnimating ? (
              <>Running Experiment...</>
            ) : (
              <><Play size={20} /> Run Experiment</>
            )}
          </button>
        </div>
      )}

      {phase === 'results' && (
        <div className="space-y-6">
          <div className="text-center">
            <Target className={`w-12 h-12 mx-auto mb-3 text-${themeColor}-400`} />
            <h3 className="text-white font-bold text-xl mb-2">Experiment Results</h3>
          </div>

          {/* Results Display */}
          <div className={`bg-${themeColor}-900/30 border border-${themeColor}-500/50 rounded-2xl p-6`}>
            <div className="text-center mb-6">
              <p className="text-gray-400 mb-2">Child Imitation Rate</p>
              <p className={`text-5xl font-black ${
                imitationRate > 50 ? 'text-red-400' : imitationRate > 25 ? 'text-amber-400' : 'text-green-400'
              }`}>
                {imitationRate}%
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-800/50 rounded-xl p-4">
                <p className="text-gray-400 text-sm mb-2">Your Setup:</p>
                <p className="text-white">
                  Model: <span className={modelType === 'aggressive' ? 'text-red-400' : modelType === 'non-aggressive' ? 'text-green-400' : 'text-blue-400'}>
                    {modelType === 'aggressive' ? 'Aggressive' : modelType === 'non-aggressive' ? 'Non-Aggressive' : 'None'}
                  </span>
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  ARRM Average: {Math.round((arrm.attention + arrm.retention + arrm.reproduction + arrm.motivation) / 4)}%
                </p>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-4">
                <p className="text-gray-400 text-sm mb-2">Bandura's Actual Results (1961):</p>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Aggressive model: <span className="text-red-400">~88% imitated</span></li>
                  <li>• Non-aggressive: <span className="text-green-400">~10% aggression</span></li>
                  <li>• Control: <span className="text-blue-400">~5% aggression</span></li>
                </ul>
              </div>
            </div>
          </div>

          {/* What This Shows */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
            <h4 className="text-amber-400 font-bold mb-3">📚 What This Demonstrates</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>✓ <strong>Observational learning occurs</strong> - children learn by watching without direct reinforcement</li>
              <li>✓ <strong>Mediational processes matter</strong> - ARRM factors affect whether learning becomes behaviour</li>
              <li>✓ <strong>Vicarious reinforcement</strong> - seeing model rewarded/punished affects motivation</li>
              <li>✓ <strong>Bridge to cognitive</strong> - mental processes mediate between stimulus and response</li>
            </ul>
          </div>

          {/* Evaluation */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-4">
              <p className="text-green-400 font-bold mb-2">✓ Strengths</p>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• High control (lab experiment)</li>
                <li>• Standardised procedures</li>
                <li>• Cause-effect established</li>
              </ul>
            </div>
            <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4">
              <p className="text-red-400 font-bold mb-2">✗ Limitations</p>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• Low ecological validity</li>
                <li>• Demand characteristics</li>
                <li>• Ethical concerns with children</li>
              </ul>
            </div>
          </div>

          <button
            onClick={resetExperiment}
            className="w-full py-3 bg-gray-700 hover:bg-gray-600 rounded-xl text-white font-bold transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw size={20} /> Try Different Variables
          </button>
        </div>
      )}
    </div>
  );
}
