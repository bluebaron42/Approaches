import { useState } from 'react';
import { Shield, RotateCcw, Brain, Eye, CheckCircle, Lightbulb } from 'lucide-react';

interface DefenceMechanismSimulatorProps {
  themeColor: string;
  isPresentation: boolean;
}

type Phase = 'identify' | 'iceberg' | 'stages' | 'results';

interface Scenario {
  id: number;
  situation: string;
  response: string;
  mechanism: string;
  explanation: string;
}

const scenarios: Scenario[] = [
  {
    id: 1,
    situation: "A student fails an important exam",
    response: "They say 'The exam was unfair and the teacher doesn't like me anyway'",
    mechanism: "Displacement / Rationalisation",
    explanation: "Blaming external factors protects the ego from accepting failure"
  },
  {
    id: 2,
    situation: "A person is attracted to their friend's partner",
    response: "They become hostile towards the partner and avoid them",
    mechanism: "Reaction Formation",
    explanation: "Behaving opposite to the true feeling converts unacceptable urges into acceptable behaviour"
  },
  {
    id: 3,
    situation: "Someone witnesses a traumatic car accident",
    response: "Weeks later, they have no memory of seeing the accident",
    mechanism: "Repression",
    explanation: "Unconsciously blocking distressing memories from conscious awareness"
  },
  {
    id: 4,
    situation: "An adult is stressed about a job interview",
    response: "They start biting their nails and sucking their thumb",
    mechanism: "Regression",
    explanation: "Returning to behaviours from an earlier stage of development when feeling threatened"
  },
  {
    id: 5,
    situation: "Someone is angry at their boss",
    response: "They come home and shout at their children",
    mechanism: "Displacement",
    explanation: "Redirecting emotions from the true source to a safer target"
  }
];

const defenceMechanisms = [
  "Repression",
  "Denial",
  "Displacement", 
  "Projection",
  "Regression",
  "Reaction Formation",
  "Rationalisation",
  "Sublimation"
];

interface IcebergItem {
  text: string;
  level: 'conscious' | 'preconscious' | 'unconscious';
}

const icebergItems: IcebergItem[] = [
  { text: "Current thoughts and perceptions", level: 'conscious' },
  { text: "Childhood memories you can recall", level: 'preconscious' },
  { text: "Repressed traumatic experiences", level: 'unconscious' },
  { text: "Solving a maths problem", level: 'conscious' },
  { text: "Your phone number", level: 'preconscious' },
  { text: "Oedipus complex", level: 'unconscious' },
  { text: "Aggressive/sexual urges from id", level: 'unconscious' },
  { text: "Memories from yesterday", level: 'preconscious' },
];

const psychosexualStages = [
  { name: 'Oral', age: '0-1 years', focus: 'Mouth', fixation: 'Smoking, nail-biting, overeating', emoji: '👶' },
  { name: 'Anal', age: '1-3 years', focus: 'Anus', fixation: 'OCD, messy/stubborn', emoji: '🧒' },
  { name: 'Phallic', age: '3-6 years', focus: 'Genitals', fixation: 'Oedipus complex, vanity', emoji: '👦' },
  { name: 'Latency', age: '6-puberty', focus: 'Dormant', fixation: 'Social skills', emoji: '🧑' },
  { name: 'Genital', age: 'Puberty+', focus: 'Genitals', fixation: 'Mature sexuality', emoji: '👨' },
];

export default function DefenceMechanismSimulator({ themeColor, isPresentation: _isPresentation }: DefenceMechanismSimulatorProps) {
  const [phase, setPhase] = useState<Phase>('identify');
  const [currentScenario, setCurrentScenario] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [icebergAnswers, setIcebergAnswers] = useState<Record<string, string>>({});
  const [showIcebergResults, setShowIcebergResults] = useState(false);
  const [stagesRevealed, setStagesRevealed] = useState<number[]>([]);

  const selectMechanism = (mechanism: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentScenario] = mechanism;
    setUserAnswers(newAnswers);
    setShowFeedback(true);
  };

  const nextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(prev => prev + 1);
      setShowFeedback(false);
    } else {
      setPhase('iceberg');
    }
  };

  const selectIcebergLevel = (item: string, level: string) => {
    setIcebergAnswers(prev => ({ ...prev, [item]: level }));
  };

  const checkIceberg = () => {
    setShowIcebergResults(true);
  };

  const toggleStageReveal = (index: number) => {
    setStagesRevealed(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const resetSimulation = () => {
    setPhase('identify');
    setCurrentScenario(0);
    setUserAnswers([]);
    setShowFeedback(false);
    setIcebergAnswers({});
    setShowIcebergResults(false);
    setStagesRevealed([]);
  };

  const scenario = scenarios[currentScenario];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Phase Navigation */}
      <div className="flex gap-2 mb-6">
        {(['identify', 'iceberg', 'stages'] as Phase[]).map((p) => (
          <button
            key={p}
            onClick={() => setPhase(p)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              phase === p 
                ? `bg-${themeColor}-600 text-white` 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {p === 'identify' && '🛡️ Defence Mechanisms'}
            {p === 'iceberg' && '🧊 Iceberg Model'}
            {p === 'stages' && '📈 Psychosexual Stages'}
          </button>
        ))}
      </div>

      {phase === 'identify' && (
        <div className="space-y-6">
          <div className="text-center">
            <Shield className={`w-10 h-10 mx-auto mb-2 text-${themeColor}-400`} />
            <h3 className={`text-${themeColor}-400 font-bold text-xl`}>Identify the Defence Mechanism</h3>
            <p className="text-gray-400 text-sm">Scenario {currentScenario + 1} of {scenarios.length}</p>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-${themeColor}-500 transition-all`}
              style={{ width: `${((currentScenario + (showFeedback ? 1 : 0)) / scenarios.length) * 100}%` }}
            />
          </div>

          {/* Scenario */}
          <div className={`bg-${themeColor}-900/30 border border-${themeColor}-500/50 rounded-xl p-5`}>
            <p className="text-gray-400 text-sm mb-2">Situation:</p>
            <p className="text-white font-medium mb-4">{scenario.situation}</p>
            <p className="text-gray-400 text-sm mb-2">Response:</p>
            <p className="text-amber-300 font-medium">"{scenario.response}"</p>
          </div>

          {/* Options */}
          {!showFeedback ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {defenceMechanisms.map((mechanism) => (
                <button
                  key={mechanism}
                  onClick={() => selectMechanism(mechanism)}
                  className="py-3 px-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 rounded-xl text-gray-300 text-sm font-medium transition-all"
                >
                  {mechanism}
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className={`p-4 rounded-xl ${
                userAnswers[currentScenario]?.includes(scenario.mechanism.split(' / ')[0]) || 
                scenario.mechanism.includes(userAnswers[currentScenario])
                  ? 'bg-green-900/30 border border-green-500/50'
                  : 'bg-red-900/30 border border-red-500/50'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {userAnswers[currentScenario]?.includes(scenario.mechanism.split(' / ')[0]) || 
                   scenario.mechanism.includes(userAnswers[currentScenario]) ? (
                    <CheckCircle className="text-green-400" size={20} />
                  ) : (
                    <span className="text-red-400">✗</span>
                  )}
                  <span className="text-white font-bold">
                    Correct answer: {scenario.mechanism}
                  </span>
                </div>
                <p className="text-gray-300 text-sm">{scenario.explanation}</p>
              </div>
              
              <button
                onClick={nextScenario}
                className={`w-full py-3 bg-${themeColor}-600 hover:bg-${themeColor}-500 rounded-xl text-white font-bold transition-all`}
              >
                {currentScenario < scenarios.length - 1 ? 'Next Scenario →' : 'Continue to Iceberg Model →'}
              </button>
            </div>
          )}
        </div>
      )}

      {phase === 'iceberg' && (
        <div className="space-y-6">
          <div className="text-center">
            <Brain className={`w-10 h-10 mx-auto mb-2 text-${themeColor}-400`} />
            <h3 className={`text-${themeColor}-400 font-bold text-xl`}>The Iceberg Model of Mind</h3>
            <p className="text-gray-400 text-sm">Drag each item to the correct level</p>
          </div>

          {/* Visual Iceberg */}
          <div className="relative bg-gradient-to-b from-cyan-900/20 via-blue-900/30 to-purple-900/40 rounded-2xl p-6 min-h-64">
            <div className="absolute left-4 top-4 text-xs text-gray-500">
              <p>🌊 Water line</p>
            </div>
            
            <div className="space-y-4">
              {/* Conscious */}
              <div className="bg-cyan-900/30 border border-cyan-500/30 rounded-xl p-3">
                <p className="text-cyan-400 font-bold text-sm mb-2">👁️ Conscious (above water)</p>
                <p className="text-gray-500 text-xs">What we are currently aware of</p>
              </div>
              
              {/* Preconscious */}
              <div className="bg-blue-900/30 border border-blue-500/30 rounded-xl p-3">
                <p className="text-blue-400 font-bold text-sm mb-2">💭 Preconscious (just below)</p>
                <p className="text-gray-500 text-xs">Can be brought to awareness with effort</p>
              </div>
              
              {/* Unconscious */}
              <div className="bg-purple-900/30 border border-purple-500/30 rounded-xl p-3">
                <p className="text-purple-400 font-bold text-sm mb-2">🔒 Unconscious (deep)</p>
                <p className="text-gray-500 text-xs">Hidden from awareness, drives behaviour</p>
              </div>
            </div>
          </div>

          {/* Items to classify */}
          <div className="space-y-2">
            {icebergItems.map((item) => (
              <div key={item.text} className="flex items-center gap-3 bg-gray-800/50 rounded-xl p-3">
                <p className="flex-1 text-gray-300 text-sm">{item.text}</p>
                <div className="flex gap-2">
                  {['conscious', 'preconscious', 'unconscious'].map((level) => (
                    <button
                      key={level}
                      onClick={() => selectIcebergLevel(item.text, level)}
                      disabled={showIcebergResults}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        icebergAnswers[item.text] === level
                          ? level === 'conscious' ? 'bg-cyan-600 text-white'
                            : level === 'preconscious' ? 'bg-blue-600 text-white'
                            : 'bg-purple-600 text-white'
                          : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                      } ${showIcebergResults && item.level === level ? 'ring-2 ring-green-400' : ''}`}
                    >
                      {level.charAt(0).toUpperCase()}
                    </button>
                  ))}
                </div>
                {showIcebergResults && (
                  <span className={`text-xs ${icebergAnswers[item.text] === item.level ? 'text-green-400' : 'text-red-400'}`}>
                    {icebergAnswers[item.text] === item.level ? '✓' : `→ ${item.level}`}
                  </span>
                )}
              </div>
            ))}
          </div>

          {!showIcebergResults ? (
            <button
              onClick={checkIceberg}
              disabled={Object.keys(icebergAnswers).length < icebergItems.length}
              className={`w-full py-3 bg-${themeColor}-600 hover:bg-${themeColor}-500 disabled:bg-gray-700 rounded-xl text-white font-bold transition-all`}
            >
              Check Answers
            </button>
          ) : (
            <button
              onClick={() => setPhase('stages')}
              className={`w-full py-3 bg-${themeColor}-600 hover:bg-${themeColor}-500 rounded-xl text-white font-bold transition-all`}
            >
              Continue to Psychosexual Stages →
            </button>
          )}
        </div>
      )}

      {phase === 'stages' && (
        <div className="space-y-6">
          <div className="text-center">
            <Eye className={`w-10 h-10 mx-auto mb-2 text-${themeColor}-400`} />
            <h3 className={`text-${themeColor}-400 font-bold text-xl`}>Psychosexual Stages</h3>
            <p className="text-gray-400 text-sm">Click each stage to reveal details</p>
          </div>

          <div className="space-y-3">
            {psychosexualStages.map((stage, index) => (
              <div key={stage.name}>
                <button
                  onClick={() => toggleStageReveal(index)}
                  className={`w-full text-left p-4 rounded-xl transition-all ${
                    stagesRevealed.includes(index)
                      ? `bg-${themeColor}-900/30 border border-${themeColor}-500/50`
                      : 'bg-gray-800/50 border border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{stage.emoji}</span>
                    <div>
                      <p className={`font-bold ${stagesRevealed.includes(index) ? `text-${themeColor}-400` : 'text-white'}`}>
                        {stage.name} Stage
                      </p>
                      <p className="text-gray-500 text-sm">{stage.age}</p>
                    </div>
                    <span className="ml-auto text-gray-500">
                      {stagesRevealed.includes(index) ? '▼' : '▶'}
                    </span>
                  </div>
                </button>
                
                {stagesRevealed.includes(index) && (
                  <div className="ml-16 mt-2 p-4 bg-gray-800/30 rounded-xl border-l-4 border-purple-500">
                    <p className="text-gray-400 text-sm">
                      <strong className="text-purple-400">Focus:</strong> {stage.focus}
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      <strong className="text-amber-400">Fixation traits:</strong> {stage.fixation}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className={`bg-amber-900/30 border border-amber-500/50 rounded-xl p-4`}>
            <Lightbulb className="text-amber-400 mb-2" size={20} />
            <p className="text-amber-400 font-bold text-sm mb-1">Key Concept: Fixation</p>
            <p className="text-gray-300 text-sm">
              If needs aren't met (or are over-met) at any stage, the person becomes "fixated" 
              and carries related behaviours into adulthood.
            </p>
          </div>

          <button
            onClick={resetSimulation}
            className="w-full py-3 bg-gray-700 hover:bg-gray-600 rounded-xl text-white font-bold transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw size={20} /> Start Over
          </button>
        </div>
      )}
    </div>
  );
}
