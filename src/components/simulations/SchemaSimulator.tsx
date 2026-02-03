import React, { useState } from 'react';
import { Brain, RotateCcw, CheckCircle, XCircle, Eye, Lightbulb } from 'lucide-react';

interface SchemaSimulatorProps {
  themeColor: string;
  isPresentation: boolean;
}

type Phase = 'build' | 'test' | 'distortion' | 'results';

interface CategoryItem {
  name: string;
  emoji: string;
  isTypical: boolean;
}

const birdItems: CategoryItem[] = [
  { name: 'Robin', emoji: '🐦', isTypical: true },
  { name: 'Sparrow', emoji: '🐤', isTypical: true },
  { name: 'Eagle', emoji: '🦅', isTypical: true },
  { name: 'Penguin', emoji: '🐧', isTypical: false },
  { name: 'Ostrich', emoji: '🦆', isTypical: false },
  { name: 'Bat', emoji: '🦇', isTypical: false },
  { name: 'Butterfly', emoji: '🦋', isTypical: false },
  { name: 'Plane', emoji: '✈️', isTypical: false },
];

const memoryStory = {
  original: "The office worker arrived at work late. She put her bag on the desk and turned on her computer. She made herself a cup of tea and began checking her emails. Her colleague asked about the weekend meeting.",
  schemaExpectations: [
    "Arrived at 9am",
    "Put bag on desk",
    "Turned on computer",
    "Made coffee",
    "Checked emails",
    "Discussed work"
  ],
  actualDetails: [
    { text: "Arrived late (not 9am)", wasPresent: true },
    { text: "Put bag on desk", wasPresent: true },
    { text: "Turned on computer", wasPresent: true },
    { text: "Made tea (not coffee)", wasPresent: true },
    { text: "Checked emails", wasPresent: true },
    { text: "Asked about weekend meeting", wasPresent: true }
  ]
};

export default function SchemaSimulator({ themeColor, isPresentation }: SchemaSimulatorProps) {
  const [phase, setPhase] = useState<Phase>('build');
  const [userClassifications, setUserClassifications] = useState<Record<string, boolean>>({});
  const [showSchemaFeedback, setShowSchemaFeedback] = useState(false);
  const [memoryRecall, setMemoryRecall] = useState<Record<string, boolean>>({});
  const [showMemoryResults, setShowMemoryResults] = useState(false);
  const [hasReadStory, setHasReadStory] = useState(false);
  const [showStory, setShowStory] = useState(true);

  const classifyItem = (name: string, isBird: boolean) => {
    setUserClassifications(prev => ({ ...prev, [name]: isBird }));
  };

  const checkSchemaAnswers = () => {
    setShowSchemaFeedback(true);
  };

  const toggleMemoryItem = (text: string) => {
    setMemoryRecall(prev => ({ ...prev, [text]: !prev[text] }));
  };

  const checkMemory = () => {
    setShowMemoryResults(true);
  };

  const resetSimulation = () => {
    setPhase('build');
    setUserClassifications({});
    setShowSchemaFeedback(false);
    setMemoryRecall({});
    setShowMemoryResults(false);
    setHasReadStory(false);
    setShowStory(true);
  };

  const textSize = isPresentation ? 'text-lg' : 'text-base';

  return (
    <div className="w-full max-w-4xl mx-auto">
      {phase === 'build' && (
        <div className="space-y-6">
          <div className="text-center">
            <Brain className={`w-12 h-12 mx-auto mb-3 text-${themeColor}-400`} />
            <h3 className={`text-${themeColor}-400 font-bold text-xl mb-2`}>Schema Formation Task</h3>
            <p className="text-gray-400">Classify each item: Is it a BIRD or not?</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {birdItems.map((item) => (
              <div key={item.name} className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 text-center">
                <div className="text-4xl mb-2">{item.emoji}</div>
                <p className="text-white font-bold mb-3">{item.name}</p>
                
                {!showSchemaFeedback ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => classifyItem(item.name, true)}
                      className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                        userClassifications[item.name] === true
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                      }`}
                    >
                      Bird
                    </button>
                    <button
                      onClick={() => classifyItem(item.name, false)}
                      className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                        userClassifications[item.name] === false
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                      }`}
                    >
                      Not
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    {userClassifications[item.name] === item.isTypical ? (
                      <CheckCircle className="text-green-400" size={20} />
                    ) : (
                      <XCircle className="text-red-400" size={20} />
                    )}
                    <span className={`text-sm ${item.isTypical ? 'text-green-400' : 'text-amber-400'}`}>
                      {item.isTypical ? 'Typical bird' : item.name === 'Penguin' || item.name === 'Ostrich' ? 'Atypical bird!' : 'Not a bird'}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {!showSchemaFeedback ? (
            <button
              onClick={checkSchemaAnswers}
              disabled={Object.keys(userClassifications).length < birdItems.length}
              className={`w-full py-4 bg-${themeColor}-600 hover:bg-${themeColor}-500 disabled:bg-gray-700 disabled:text-gray-500 rounded-xl text-white font-bold transition-all`}
            >
              Check Classifications
            </button>
          ) : (
            <div className="space-y-4">
              <div className={`bg-amber-900/30 border border-amber-500/50 rounded-xl p-4`}>
                <Lightbulb className="text-amber-400 mb-2" size={24} />
                <p className="text-amber-400 font-bold mb-2">Schema Insight:</p>
                <p className="text-gray-300 text-sm">
                  Your "bird" schema likely includes features like: wings, feathers, flying, beaks. 
                  <strong> Penguins and ostriches ARE birds</strong> but don't fit the typical schema because they don't fly!
                  This shows how schemas can lead to <strong>classification errors</strong>.
                </p>
              </div>
              <button
                onClick={() => setPhase('distortion')}
                className={`w-full py-4 bg-${themeColor}-600 hover:bg-${themeColor}-500 rounded-xl text-white font-bold transition-all`}
              >
                Next: Memory Distortion Task →
              </button>
            </div>
          )}
        </div>
      )}

      {phase === 'distortion' && (
        <div className="space-y-6">
          <div className="text-center">
            <Eye className={`w-12 h-12 mx-auto mb-3 text-${themeColor}-400`} />
            <h3 className={`text-${themeColor}-400 font-bold text-xl mb-2`}>Memory Reconstruction Task</h3>
            <p className="text-gray-400">Read the story, then recall what happened</p>
          </div>

          {showStory && (
            <div className={`bg-${themeColor}-900/30 border border-${themeColor}-500/50 rounded-xl p-6`}>
              <p className="text-gray-300 leading-relaxed text-lg">
                "{memoryStory.original}"
              </p>
              <button
                onClick={() => { setShowStory(false); setHasReadStory(true); }}
                className={`mt-4 w-full py-3 bg-${themeColor}-600 hover:bg-${themeColor}-500 rounded-xl text-white font-bold transition-all`}
              >
                I've read it - Hide story and test my memory
              </button>
            </div>
          )}

          {!showStory && hasReadStory && (
            <div className="space-y-4">
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                <p className="text-gray-400 mb-4">Which of these were in the story? (Select all you remember)</p>
                <div className="space-y-2">
                  {[
                    "She arrived at 9am",
                    "She arrived late",
                    "She made coffee",
                    "She made tea",
                    "She checked her emails",
                    "She read the newspaper",
                    "Colleague asked about the weekend meeting",
                    "Colleague asked about the project deadline"
                  ].map((item) => (
                    <button
                      key={item}
                      onClick={() => toggleMemoryItem(item)}
                      disabled={showMemoryResults}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        memoryRecall[item]
                          ? 'bg-blue-900/50 border border-blue-500/50 text-blue-300'
                          : 'bg-gray-700/50 border border-gray-600 text-gray-300 hover:border-gray-500'
                      } ${showMemoryResults ? 'cursor-default' : ''}`}
                    >
                      {memoryRecall[item] ? '✓ ' : '○ '}{item}
                      {showMemoryResults && (
                        <span className={`ml-2 text-sm ${
                          (item === "She arrived late" || item === "She made tea" || 
                           item === "She checked her emails" || item === "Colleague asked about the weekend meeting")
                            ? 'text-green-400'
                            : memoryRecall[item] ? 'text-red-400' : 'text-gray-500'
                        }`}>
                          {(item === "She arrived late" || item === "She made tea" || 
                           item === "She checked her emails" || item === "Colleague asked about the weekend meeting")
                            ? '(Actually in story)'
                            : memoryRecall[item] ? '(NOT in story!)' : ''}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {!showMemoryResults ? (
                <button
                  onClick={checkMemory}
                  className={`w-full py-4 bg-${themeColor}-600 hover:bg-${themeColor}-500 rounded-xl text-white font-bold transition-all`}
                >
                  Check My Memory
                </button>
              ) : (
                <div className="space-y-4">
                  <div className={`bg-amber-900/30 border border-amber-500/50 rounded-xl p-4`}>
                    <Lightbulb className="text-amber-400 mb-2" size={24} />
                    <p className="text-amber-400 font-bold mb-2">Schema-Driven Memory Distortion:</p>
                    <p className="text-gray-300 text-sm">
                      Did you remember "coffee" instead of "tea"? Or "9am" instead of "late"? 
                      Your <strong>"office worker" schema</strong> contains expectations that can 
                      <strong> distort memory recall</strong>. We reconstruct memories using schemas, 
                      which can lead to errors!
                    </p>
                  </div>
                  <button
                    onClick={() => setPhase('results')}
                    className={`w-full py-4 bg-${themeColor}-600 hover:bg-${themeColor}-500 rounded-xl text-white font-bold transition-all`}
                  >
                    See Summary →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {phase === 'results' && (
        <div className="space-y-6">
          <div className="text-center">
            <CheckCircle className={`w-12 h-12 mx-auto mb-3 text-${themeColor}-400`} />
            <h3 className="text-white font-bold text-xl mb-2">Schema Effects Demonstrated</h3>
          </div>

          <div className={`bg-${themeColor}-900/30 border border-${themeColor}-500/50 rounded-2xl p-6`}>
            <h4 className="text-white font-bold mb-4">What You Experienced:</h4>
            <div className="space-y-4">
              <div className="bg-gray-800/50 rounded-xl p-4">
                <p className="text-blue-400 font-bold mb-2">1. Schema as Mental Shortcut</p>
                <p className="text-gray-300 text-sm">
                  Your "bird" schema helped you quickly categorise typical birds, but caused errors with atypical examples.
                </p>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4">
                <p className="text-green-400 font-bold mb-2">2. Schema-Driven Memory</p>
                <p className="text-gray-300 text-sm">
                  When recalling the story, you likely filled gaps with schema-consistent information (coffee instead of tea).
                </p>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4">
                <p className="text-amber-400 font-bold mb-2">3. Cognitive Efficiency vs. Accuracy</p>
                <p className="text-gray-300 text-sm">
                  Schemas help us process information quickly but can lead to stereotypes, biases, and memory distortions.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-4">
              <p className="text-green-400 font-bold mb-2">✓ Schema Benefits</p>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• Efficient information processing</li>
                <li>• Quick categorisation</li>
                <li>• Fill in missing information</li>
                <li>• Predict likely events</li>
              </ul>
            </div>
            <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4">
              <p className="text-red-400 font-bold mb-2">✗ Schema Limitations</p>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• Lead to stereotypes</li>
                <li>• Cause memory distortions</li>
                <li>• Miss atypical information</li>
                <li>• Resist contradictory evidence</li>
              </ul>
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
