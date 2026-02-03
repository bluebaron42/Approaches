import React, { useState } from 'react';
import { GitCompare, RotateCcw, CheckCircle, Lightbulb, ThumbsUp, ThumbsDown } from 'lucide-react';

interface ApproachDebateSimulatorProps {
  themeColor: string;
  isPresentation: boolean;
}

type Phase = 'intro' | 'explain' | 'match' | 'debate' | 'results';

interface ApproachExplanation {
  approach: string;
  color: string;
  explanation: string;
}

const behaviourScenarios = [
  {
    behaviour: "Depression",
    explanations: [
      { approach: "Biological", color: "green", explanation: "Caused by low serotonin levels and genetic predisposition" },
      { approach: "Behaviourist", color: "cyan", explanation: "Learned helplessness from repeated failure experiences" },
      { approach: "Cognitive", color: "blue", explanation: "Negative schemas and faulty thinking patterns (Beck's cognitive triad)" },
      { approach: "Psychodynamic", color: "purple", explanation: "Unresolved childhood trauma and repressed emotions" },
      { approach: "Humanistic", color: "pink", explanation: "Incongruence between self-concept and ideal self" },
    ]
  },
  {
    behaviour: "Aggression",
    explanations: [
      { approach: "Biological", color: "green", explanation: "High testosterone levels and limbic system activation" },
      { approach: "Behaviourist", color: "cyan", explanation: "Aggression reinforced in the past (operant conditioning)" },
      { approach: "SLT", color: "amber", explanation: "Observed and imitated from aggressive role models (Bobo doll)" },
      { approach: "Psychodynamic", color: "purple", explanation: "Thanatos (death instinct) or displacement of repressed anger" },
      { approach: "Cognitive", color: "blue", explanation: "Hostile attribution bias - interpreting neutral cues as threats" },
    ]
  },
  {
    behaviour: "Phobias",
    explanations: [
      { approach: "Biological", color: "green", explanation: "Evolved fear response or genetic predisposition to anxiety" },
      { approach: "Behaviourist", color: "cyan", explanation: "Classical conditioning - fear paired with neutral stimulus (Little Albert)" },
      { approach: "Cognitive", color: "blue", explanation: "Irrational beliefs and catastrophic thinking about the stimulus" },
      { approach: "Psychodynamic", color: "purple", explanation: "Displaced anxiety from unconscious conflicts" },
      { approach: "SLT", color: "amber", explanation: "Observed fearful reactions from parents or others" },
    ]
  }
];

interface DebateQuestion {
  question: string;
  debate: string;
  positions: { approach: string; position: string; color: string }[];
}

const debateQuestions: DebateQuestion[] = [
  {
    question: "Do we have free will?",
    debate: "Free Will vs Determinism",
    positions: [
      { approach: "Humanistic", position: "Yes - we have free will and personal agency", color: "pink" },
      { approach: "Biological", position: "No - behaviour determined by genes/biology", color: "green" },
      { approach: "Behaviourist", position: "No - behaviour determined by environment", color: "cyan" },
      { approach: "Cognitive", position: "Soft determinism - some choice within constraints", color: "blue" },
    ]
  },
  {
    question: "Is behaviour innate or learned?",
    debate: "Nature vs Nurture",
    positions: [
      { approach: "Biological", position: "Mostly nature - genes and evolution", color: "green" },
      { approach: "Behaviourist", position: "Entirely nurture - blank slate at birth", color: "cyan" },
      { approach: "SLT", position: "Mostly nurture - observational learning", color: "amber" },
      { approach: "Cognitive", position: "Both - innate capacity shaped by experience", color: "blue" },
    ]
  },
  {
    question: "Should psychology be scientific?",
    debate: "Scientific vs Idiographic",
    positions: [
      { approach: "Biological", position: "Yes - objective measurement essential", color: "green" },
      { approach: "Behaviourist", position: "Yes - only observable behaviour counts", color: "cyan" },
      { approach: "Humanistic", position: "No - rejects scientific method, values subjectivity", color: "pink" },
      { approach: "Psychodynamic", position: "Uses case studies - less scientific", color: "purple" },
    ]
  }
];

export default function ApproachDebateSimulator({ themeColor, isPresentation }: ApproachDebateSimulatorProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentBehaviour, setCurrentBehaviour] = useState(0);
  const [userMatches, setUserMatches] = useState<Record<string, string>>({});
  const [showMatchResults, setShowMatchResults] = useState(false);
  const [currentDebate, setCurrentDebate] = useState(0);
  const [userVotes, setUserVotes] = useState<Record<string, 'agree' | 'disagree'>>({});

  const scenario = behaviourScenarios[currentBehaviour];
  const debate = debateQuestions[currentDebate];

  const matchExplanation = (approach: string, explanation: string) => {
    setUserMatches(prev => ({ ...prev, [explanation]: approach }));
  };

  const checkMatches = () => {
    setShowMatchResults(true);
  };

  const nextBehaviour = () => {
    if (currentBehaviour < behaviourScenarios.length - 1) {
      setCurrentBehaviour(prev => prev + 1);
      setUserMatches({});
      setShowMatchResults(false);
    } else {
      setPhase('debate');
    }
  };

  const vote = (approach: string, vote: 'agree' | 'disagree') => {
    setUserVotes(prev => ({ ...prev, [approach]: vote }));
  };

  const nextDebate = () => {
    if (currentDebate < debateQuestions.length - 1) {
      setCurrentDebate(prev => prev + 1);
      setUserVotes({});
    } else {
      setPhase('results');
    }
  };

  const resetSimulation = () => {
    setPhase('intro');
    setCurrentBehaviour(0);
    setUserMatches({});
    setShowMatchResults(false);
    setCurrentDebate(0);
    setUserVotes({});
  };

  const approaches = ['Biological', 'Behaviourist', 'Cognitive', 'Psychodynamic', 'Humanistic', 'SLT'];
  const approachColors: Record<string, string> = {
    'Biological': 'green',
    'Behaviourist': 'cyan',
    'Cognitive': 'blue',
    'Psychodynamic': 'purple',
    'Humanistic': 'pink',
    'SLT': 'amber'
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {phase === 'intro' && (
        <div className="space-y-6">
          <div className="text-center">
            <GitCompare className={`w-12 h-12 mx-auto mb-3 text-${themeColor}-400`} />
            <h3 className={`text-${themeColor}-400 font-bold text-xl mb-2`}>Approach Comparison Simulator</h3>
            <p className="text-gray-400">Compare how different approaches explain the same behaviour</p>
          </div>

          <div className={`bg-${themeColor}-900/30 border border-${themeColor}-500/50 rounded-2xl p-6`}>
            <h4 className="text-white font-bold mb-4">In this activity you will:</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">1</span>
                Match explanations to approaches for different behaviours
              </li>
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">2</span>
                Explore key debates and each approach's position
              </li>
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">3</span>
                Build skills for comparison essay questions
              </li>
            </ul>
          </div>

          <button
            onClick={() => setPhase('match')}
            className={`w-full py-4 bg-${themeColor}-600 hover:bg-${themeColor}-500 rounded-xl text-white font-bold transition-all`}
          >
            Start Matching Activity →
          </button>
        </div>
      )}

      {phase === 'match' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className={`text-${themeColor}-400 font-bold text-xl`}>Match the Explanations</h3>
            <span className="text-gray-400 text-sm">Behaviour {currentBehaviour + 1}/{behaviourScenarios.length}</span>
          </div>

          {/* Behaviour Display */}
          <div className={`bg-${themeColor}-900/30 border border-${themeColor}-500/50 rounded-xl p-5 text-center`}>
            <p className="text-gray-400 text-sm mb-2">The behaviour being explained:</p>
            <p className="text-white text-2xl font-bold">{scenario.behaviour}</p>
          </div>

          {/* Explanations */}
          <div className="space-y-3">
            {scenario.explanations.map((exp) => (
              <div key={exp.explanation} className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                <p className="text-gray-300 mb-3">"{exp.explanation}"</p>
                
                {!showMatchResults ? (
                  <div className="flex flex-wrap gap-2">
                    {approaches.filter(a => scenario.explanations.some(e => e.approach === a)).map((approach) => (
                      <button
                        key={approach}
                        onClick={() => matchExplanation(approach, exp.explanation)}
                        className={`px-3 py-1 rounded-lg text-sm font-bold transition-all ${
                          userMatches[exp.explanation] === approach
                            ? `bg-${approachColors[approach]}-600 text-white`
                            : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                        }`}
                      >
                        {approach}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    {userMatches[exp.explanation] === exp.approach ? (
                      <CheckCircle className="text-green-400" size={20} />
                    ) : (
                      <span className="text-red-400">✗</span>
                    )}
                    <span className={`font-bold text-${exp.color}-400`}>{exp.approach}</span>
                    {userMatches[exp.explanation] !== exp.approach && (
                      <span className="text-gray-500 text-sm">(You said: {userMatches[exp.explanation] || 'none'})</span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {!showMatchResults ? (
            <button
              onClick={checkMatches}
              disabled={Object.keys(userMatches).length < scenario.explanations.length}
              className={`w-full py-3 bg-${themeColor}-600 hover:bg-${themeColor}-500 disabled:bg-gray-700 rounded-xl text-white font-bold transition-all`}
            >
              Check Answers
            </button>
          ) : (
            <button
              onClick={nextBehaviour}
              className={`w-full py-3 bg-${themeColor}-600 hover:bg-${themeColor}-500 rounded-xl text-white font-bold transition-all`}
            >
              {currentBehaviour < behaviourScenarios.length - 1 ? 'Next Behaviour →' : 'Continue to Debates →'}
            </button>
          )}
        </div>
      )}

      {phase === 'debate' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className={`text-${themeColor}-400 font-bold text-xl`}>Key Debates</h3>
            <span className="text-gray-400 text-sm">Debate {currentDebate + 1}/{debateQuestions.length}</span>
          </div>

          {/* Debate Question */}
          <div className={`bg-${themeColor}-900/30 border border-${themeColor}-500/50 rounded-xl p-5 text-center`}>
            <p className="text-amber-400 text-sm mb-2">{debate.debate}</p>
            <p className="text-white text-xl font-bold">{debate.question}</p>
          </div>

          {/* Positions */}
          <div className="space-y-3">
            {debate.positions.map((pos) => (
              <div 
                key={pos.approach} 
                className={`bg-${pos.color}-900/20 border border-${pos.color}-500/30 rounded-xl p-4`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-${pos.color}-400 font-bold`}>{pos.approach}</p>
                    <p className="text-gray-300 text-sm mt-1">{pos.position}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => vote(pos.approach, 'agree')}
                      className={`p-2 rounded-lg transition-all ${
                        userVotes[pos.approach] === 'agree'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                      }`}
                    >
                      <ThumbsUp size={18} />
                    </button>
                    <button
                      onClick={() => vote(pos.approach, 'disagree')}
                      className={`p-2 rounded-lg transition-all ${
                        userVotes[pos.approach] === 'disagree'
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                      }`}
                    >
                      <ThumbsDown size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
            <Lightbulb className="text-amber-400 mb-2" size={20} />
            <p className="text-gray-300 text-sm">
              <strong className="text-amber-400">Exam tip:</strong> In comparison questions, you can use 
              these debates as evaluation points. E.g., "The biological approach takes a hard determinist 
              position, whereas the humanistic approach emphasises free will..."
            </p>
          </div>

          <button
            onClick={nextDebate}
            className={`w-full py-3 bg-${themeColor}-600 hover:bg-${themeColor}-500 rounded-xl text-white font-bold transition-all`}
          >
            {currentDebate < debateQuestions.length - 1 ? 'Next Debate →' : 'See Summary →'}
          </button>
        </div>
      )}

      {phase === 'results' && (
        <div className="space-y-6">
          <div className="text-center">
            <CheckCircle className={`w-12 h-12 mx-auto mb-3 text-${themeColor}-400`} />
            <h3 className="text-white font-bold text-xl mb-2">Comparison Skills Summary</h3>
          </div>

          <div className={`bg-${themeColor}-900/30 border border-${themeColor}-500/50 rounded-2xl p-6`}>
            <h4 className="text-white font-bold mb-4">📝 Essay Writing Tips</h4>
            <div className="space-y-3">
              <div className="bg-gray-800/50 rounded-xl p-4">
                <p className="text-blue-400 font-bold text-sm mb-1">Compare, don't just describe</p>
                <p className="text-gray-400 text-sm">
                  "Unlike the biological approach which is deterministic, the humanistic approach..."
                </p>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4">
                <p className="text-green-400 font-bold text-sm mb-1">Use debates as evaluation</p>
                <p className="text-gray-400 text-sm">
                  "A strength of the cognitive approach is that it takes a less reductionist view than..."
                </p>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4">
                <p className="text-amber-400 font-bold text-sm mb-1">Show links between approaches</p>
                <p className="text-gray-400 text-sm">
                  "SLT acts as a bridge between behaviourism and cognitive psychology because..."
                </p>
              </div>
            </div>
          </div>

          {/* Quick reference grid */}
          <div className="bg-gray-800/50 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-900/50">
                <tr>
                  <th className="p-3 text-left text-gray-400">Approach</th>
                  <th className="p-3 text-gray-400">Determinism</th>
                  <th className="p-3 text-gray-400">Nature/Nurture</th>
                  <th className="p-3 text-gray-400">Scientific</th>
                </tr>
              </thead>
              <tbody className="text-center">
                <tr className="border-t border-gray-700">
                  <td className="p-3 text-left text-green-400 font-bold">Biological</td>
                  <td className="p-3 text-red-400">Hard</td>
                  <td className="p-3">Nature</td>
                  <td className="p-3 text-green-400">✓✓✓</td>
                </tr>
                <tr className="border-t border-gray-700">
                  <td className="p-3 text-left text-cyan-400 font-bold">Behaviourist</td>
                  <td className="p-3 text-red-400">Hard</td>
                  <td className="p-3">Nurture</td>
                  <td className="p-3 text-green-400">✓✓✓</td>
                </tr>
                <tr className="border-t border-gray-700">
                  <td className="p-3 text-left text-blue-400 font-bold">Cognitive</td>
                  <td className="p-3 text-amber-400">Soft</td>
                  <td className="p-3">Both</td>
                  <td className="p-3 text-green-400">✓✓</td>
                </tr>
                <tr className="border-t border-gray-700">
                  <td className="p-3 text-left text-purple-400 font-bold">Psychodynamic</td>
                  <td className="p-3 text-red-400">Hard</td>
                  <td className="p-3">Both</td>
                  <td className="p-3 text-red-400">✗</td>
                </tr>
                <tr className="border-t border-gray-700">
                  <td className="p-3 text-left text-pink-400 font-bold">Humanistic</td>
                  <td className="p-3 text-green-400">Free Will</td>
                  <td className="p-3">Neither</td>
                  <td className="p-3 text-red-400">✗</td>
                </tr>
              </tbody>
            </table>
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
