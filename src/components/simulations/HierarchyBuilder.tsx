import { useState } from 'react';
import { Heart, RotateCcw, Target, Lightbulb, CheckCircle, Star } from 'lucide-react';

interface HierarchyBuilderProps {
  themeColor: string;
  isPresentation: boolean;
}

type Phase = 'pyramid' | 'congruence' | 'conditions' | 'results';

interface NeedItem {
  text: string;
  level: number; // 0 = base (physiological), 4 = top (self-actualisation)
}

const needsItems: NeedItem[] = [
  { text: 'Food, water, shelter, sleep', level: 0 },
  { text: 'Feeling safe from danger', level: 1 },
  { text: 'Friendships and family bonds', level: 2 },
  { text: 'Achievement and respect from others', level: 3 },
  { text: 'Reaching your full potential', level: 4 },
  { text: 'Breathing and basic survival', level: 0 },
  { text: 'Job security and health', level: 1 },
  { text: 'Romantic relationships', level: 2 },
  { text: 'Self-confidence and recognition', level: 3 },
  { text: 'Pursuing creativity and meaning', level: 4 },
];

const levelNames = [
  { name: 'Physiological', color: 'red', emoji: '🍞' },
  { name: 'Safety', color: 'orange', emoji: '🏠' },
  { name: 'Love/Belonging', color: 'yellow', emoji: '❤️' },
  { name: 'Esteem', color: 'green', emoji: '⭐' },
  { name: 'Self-Actualisation', color: 'blue', emoji: '✨' },
];

interface ConditionScenario {
  id: number;
  situation: string;
  type: 'conditional' | 'unconditional';
  explanation: string;
}

const conditionScenarios: ConditionScenario[] = [
  {
    id: 1,
    situation: "A parent says 'I love you when you get good grades'",
    type: 'conditional',
    explanation: "Love is contingent on achievement - this creates conditions of worth"
  },
  {
    id: 2,
    situation: "A parent says 'I love you no matter what happens at school'",
    type: 'unconditional',
    explanation: "Love is given freely regardless of behaviour - this is UPR"
  },
  {
    id: 3,
    situation: "A therapist accepts their client's feelings without judgement",
    type: 'unconditional',
    explanation: "Rogers believed therapists must show UPR to facilitate growth"
  },
  {
    id: 4,
    situation: "A friend only hangs out with you when you're happy and fun",
    type: 'conditional',
    explanation: "Acceptance depends on meeting their expectations"
  },
  {
    id: 5,
    situation: "Your partner supports you even when you make mistakes",
    type: 'unconditional',
    explanation: "Accepting the whole person, flaws included"
  }
];

export default function HierarchyBuilder({ themeColor, isPresentation: _isPresentation }: HierarchyBuilderProps) {
  const [phase, setPhase] = useState<Phase>('pyramid');
  const [userPlacements, setUserPlacements] = useState<Record<string, number>>({});
  const [showPyramidResults, setShowPyramidResults] = useState(false);
  const [selfConcept, setSelfConcept] = useState(50);
  const [idealSelf, setIdealSelf] = useState(80);
  const [conditionAnswers, setConditionAnswers] = useState<Record<number, string>>({});
  const [currentCondition, setCurrentCondition] = useState(0);
  const [showConditionFeedback, setShowConditionFeedback] = useState(false);

  const placeNeed = (needText: string, level: number) => {
    setUserPlacements(prev => ({ ...prev, [needText]: level }));
  };

  const checkPyramid = () => {
    setShowPyramidResults(true);
  };

  const getCongruence = () => {
    return 100 - Math.abs(selfConcept - idealSelf);
  };

  const selectCondition = (type: string) => {
    setConditionAnswers(prev => ({ ...prev, [currentCondition]: type }));
    setShowConditionFeedback(true);
  };

  const nextCondition = () => {
    if (currentCondition < conditionScenarios.length - 1) {
      setCurrentCondition(prev => prev + 1);
      setShowConditionFeedback(false);
    } else {
      setPhase('results');
    }
  };

  const resetSimulation = () => {
    setPhase('pyramid');
    setUserPlacements({});
    setShowPyramidResults(false);
    setSelfConcept(50);
    setIdealSelf(80);
    setConditionAnswers({});
    setCurrentCondition(0);
    setShowConditionFeedback(false);
  };

  const congruence = getCongruence();
  const scenario = conditionScenarios[currentCondition];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Phase Navigation */}
      <div className="flex gap-2 mb-6">
        {(['pyramid', 'congruence', 'conditions'] as Phase[]).map((p) => (
          <button
            key={p}
            onClick={() => setPhase(p)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              phase === p 
                ? `bg-${themeColor}-600 text-white` 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {p === 'pyramid' && '🔺 Hierarchy of Needs'}
            {p === 'congruence' && '🎯 Self-Concept'}
            {p === 'conditions' && '💝 UPR vs Conditions'}
          </button>
        ))}
      </div>

      {phase === 'pyramid' && (
        <div className="space-y-6">
          <div className="text-center">
            <Target className={`w-10 h-10 mx-auto mb-2 text-${themeColor}-400`} />
            <h3 className={`text-${themeColor}-400 font-bold text-xl`}>Build Maslow's Pyramid</h3>
            <p className="text-gray-400 text-sm">Assign each need to the correct level (1=base, 5=top)</p>
          </div>

          {/* Pyramid Visual */}
          <div className="flex flex-col items-center gap-1">
            {[...levelNames].reverse().map((level, reverseIndex) => {
              const widthPercent = 40 + (reverseIndex * 15);
              return (
                <div
                  key={level.name}
                  className={`bg-${level.color}-900/40 border border-${level.color}-500/50 rounded-lg py-2 px-4 text-center`}
                  style={{ width: `${widthPercent}%` }}
                >
                  <span className="text-sm">{level.emoji} {level.name}</span>
                </div>
              );
            })}
          </div>

          {/* Needs to place */}
          <div className="space-y-2">
            {needsItems.slice(0, 5).map((need) => (
              <div key={need.text} className="flex items-center gap-3 bg-gray-800/50 rounded-xl p-3">
                <p className="flex-1 text-gray-300 text-sm">{need.text}</p>
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4].map((level) => (
                    <button
                      key={level}
                      onClick={() => placeNeed(need.text, level)}
                      disabled={showPyramidResults}
                      className={`w-8 h-8 rounded-lg text-sm font-bold transition-all ${
                        userPlacements[need.text] === level
                          ? `bg-${levelNames[level].color}-600 text-white`
                          : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                      } ${showPyramidResults && need.level === level ? 'ring-2 ring-green-400' : ''}`}
                    >
                      {level + 1}
                    </button>
                  ))}
                </div>
                {showPyramidResults && (
                  <span className={`text-xs ${userPlacements[need.text] === need.level ? 'text-green-400' : 'text-red-400'}`}>
                    {userPlacements[need.text] === need.level ? '✓' : `→ ${need.level + 1}`}
                  </span>
                )}
              </div>
            ))}
          </div>

          {!showPyramidResults ? (
            <button
              onClick={checkPyramid}
              disabled={Object.keys(userPlacements).length < 5}
              className={`w-full py-3 bg-${themeColor}-600 hover:bg-${themeColor}-500 disabled:bg-gray-700 rounded-xl text-white font-bold transition-all`}
            >
              Check Placements
            </button>
          ) : (
            <div className="space-y-4">
              <div className={`bg-amber-900/30 border border-amber-500/50 rounded-xl p-4`}>
                <Lightbulb className="text-amber-400 mb-2" size={20} />
                <p className="text-amber-400 font-bold text-sm mb-1">Key Principle:</p>
                <p className="text-gray-300 text-sm">
                  Lower needs must be satisfied before higher needs become motivating. 
                  A starving person won't focus on self-esteem!
                </p>
              </div>
              <button
                onClick={() => setPhase('congruence')}
                className={`w-full py-3 bg-${themeColor}-600 hover:bg-${themeColor}-500 rounded-xl text-white font-bold transition-all`}
              >
                Continue to Self-Concept →
              </button>
            </div>
          )}
        </div>
      )}

      {phase === 'congruence' && (
        <div className="space-y-6">
          <div className="text-center">
            <Heart className={`w-10 h-10 mx-auto mb-2 text-${themeColor}-400`} />
            <h3 className={`text-${themeColor}-400 font-bold text-xl`}>Self-Concept vs Ideal Self</h3>
            <p className="text-gray-400 text-sm">Adjust the sliders to see congruence</p>
          </div>

          {/* Congruence Visualisation */}
          <div className={`bg-${themeColor}-900/30 border border-${themeColor}-500/50 rounded-2xl p-6`}>
            <div className="flex justify-center gap-8 mb-6">
              {/* Self-concept circle */}
              <div className="text-center">
                <div 
                  className="w-24 h-24 rounded-full bg-blue-500/50 border-4 border-blue-400 flex items-center justify-center mx-auto mb-2"
                  style={{ transform: `scale(${0.5 + selfConcept / 200})` }}
                >
                  <span className="text-white font-bold">{selfConcept}%</span>
                </div>
                <p className="text-blue-400 font-bold text-sm">Self-Concept</p>
                <p className="text-gray-500 text-xs">How you see yourself</p>
              </div>
              
              {/* Ideal self circle */}
              <div className="text-center">
                <div 
                  className="w-24 h-24 rounded-full bg-yellow-500/50 border-4 border-yellow-400 flex items-center justify-center mx-auto mb-2"
                  style={{ transform: `scale(${0.5 + idealSelf / 200})` }}
                >
                  <span className="text-white font-bold">{idealSelf}%</span>
                </div>
                <p className="text-yellow-400 font-bold text-sm">Ideal Self</p>
                <p className="text-gray-500 text-xs">Who you want to be</p>
              </div>
            </div>

            {/* Congruence indicator */}
            <div className="text-center">
              <p className="text-gray-400 mb-2">Congruence Level:</p>
              <div className="w-full h-6 bg-gray-700 rounded-full overflow-hidden mb-2">
                <div 
                  className={`h-full transition-all duration-300 ${
                    congruence >= 80 ? 'bg-green-500' : congruence >= 50 ? 'bg-amber-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${congruence}%` }}
                />
              </div>
              <p className={`text-2xl font-black ${
                congruence >= 80 ? 'text-green-400' : congruence >= 50 ? 'text-amber-400' : 'text-red-400'
              }`}>
                {congruence}% Congruent
              </p>
              <p className="text-gray-500 text-sm mt-1">
                {congruence >= 80 ? 'High congruence - psychologically healthy!' 
                  : congruence >= 50 ? 'Moderate congruence - some anxiety present'
                  : 'Low congruence - incongruence causes distress'}
              </p>
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-blue-400 font-bold">Self-Concept</span>
                <span className="text-gray-300">{selfConcept}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={selfConcept}
                onChange={(e) => setSelfConcept(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-yellow-400 font-bold">Ideal Self</span>
                <span className="text-gray-300">{idealSelf}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={idealSelf}
                onChange={(e) => setIdealSelf(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
            <p className="text-gray-300 text-sm">
              <strong className="text-pink-400">Rogers believed:</strong> When self-concept and ideal self 
              are similar (congruent), we experience good mental health. Large gaps create anxiety and 
              low self-esteem.
            </p>
          </div>

          <button
            onClick={() => setPhase('conditions')}
            className={`w-full py-3 bg-${themeColor}-600 hover:bg-${themeColor}-500 rounded-xl text-white font-bold transition-all`}
          >
            Continue to UPR →
          </button>
        </div>
      )}

      {phase === 'conditions' && (
        <div className="space-y-6">
          <div className="text-center">
            <Star className={`w-10 h-10 mx-auto mb-2 text-${themeColor}-400`} />
            <h3 className={`text-${themeColor}-400 font-bold text-xl`}>Conditional vs Unconditional Positive Regard</h3>
            <p className="text-gray-400 text-sm">Scenario {currentCondition + 1} of {conditionScenarios.length}</p>
          </div>

          {/* Scenario */}
          <div className={`bg-${themeColor}-900/30 border border-${themeColor}-500/50 rounded-xl p-5`}>
            <p className="text-white text-lg">"{scenario.situation}"</p>
          </div>

          {/* Options */}
          {!showConditionFeedback ? (
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => selectCondition('conditional')}
                className="py-4 bg-red-900/30 border border-red-500/50 rounded-xl text-red-300 font-bold hover:bg-red-900/50 transition-all"
              >
                Conditional Positive Regard
              </button>
              <button
                onClick={() => selectCondition('unconditional')}
                className="py-4 bg-green-900/30 border border-green-500/50 rounded-xl text-green-300 font-bold hover:bg-green-900/50 transition-all"
              >
                Unconditional Positive Regard
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className={`p-4 rounded-xl ${
                conditionAnswers[currentCondition] === scenario.type
                  ? 'bg-green-900/30 border border-green-500/50'
                  : 'bg-red-900/30 border border-red-500/50'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {conditionAnswers[currentCondition] === scenario.type ? (
                    <CheckCircle className="text-green-400" size={20} />
                  ) : (
                    <span className="text-red-400">✗</span>
                  )}
                  <span className="text-white font-bold">
                    {scenario.type === 'unconditional' ? 'Unconditional Positive Regard (UPR)' : 'Conditional Positive Regard'}
                  </span>
                </div>
                <p className="text-gray-300 text-sm">{scenario.explanation}</p>
              </div>
              
              <button
                onClick={nextCondition}
                className={`w-full py-3 bg-${themeColor}-600 hover:bg-${themeColor}-500 rounded-xl text-white font-bold transition-all`}
              >
                {currentCondition < conditionScenarios.length - 1 ? 'Next Scenario →' : 'See Summary →'}
              </button>
            </div>
          )}
        </div>
      )}

      {phase === 'results' && (
        <div className="space-y-6">
          <div className="text-center">
            <CheckCircle className={`w-12 h-12 mx-auto mb-3 text-${themeColor}-400`} />
            <h3 className="text-white font-bold text-xl mb-2">Humanistic Approach Summary</h3>
          </div>

          <div className={`bg-${themeColor}-900/30 border border-${themeColor}-500/50 rounded-2xl p-6`}>
            <h4 className="text-white font-bold mb-4">Key Concepts You Explored:</h4>
            <div className="space-y-3">
              <div className="bg-gray-800/50 rounded-xl p-4">
                <p className="text-amber-400 font-bold">🔺 Hierarchy of Needs (Maslow)</p>
                <p className="text-gray-300 text-sm">Five levels from basic survival to self-actualisation</p>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4">
                <p className="text-pink-400 font-bold">🎯 Self-Concept & Congruence (Rogers)</p>
                <p className="text-gray-300 text-sm">Gap between self-concept and ideal self affects wellbeing</p>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4">
                <p className="text-green-400 font-bold">💝 Unconditional Positive Regard</p>
                <p className="text-gray-300 text-sm">Accepting people without conditions enables personal growth</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-4">
              <p className="text-green-400 font-bold mb-2">✓ Strengths</p>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• Emphasises free will</li>
                <li>• Positive view of human nature</li>
                <li>• Influenced counselling (PCT)</li>
              </ul>
            </div>
            <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4">
              <p className="text-red-400 font-bold mb-2">✗ Limitations</p>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• Concepts hard to test scientifically</li>
                <li>• Western cultural bias</li>
                <li>• May be too optimistic</li>
              </ul>
            </div>
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
