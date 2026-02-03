import React, { useState } from 'react';
import { Dna, RotateCcw, Calculator, Users, BarChart3, Lightbulb } from 'lucide-react';

interface TwinStudySimulatorProps {
  themeColor: string;
  isPresentation: boolean;
}

type Phase = 'intro' | 'input' | 'calculate' | 'interpret';

interface TwinPair {
  id: number;
  type: 'MZ' | 'DZ';
  twin1HasTrait: boolean;
  twin2HasTrait: boolean;
}

const realWorldExamples = [
  { trait: 'Schizophrenia', mz: 48, dz: 17, interpretation: 'Strong genetic component, but environment also plays a role' },
  { trait: 'Depression', mz: 46, dz: 20, interpretation: 'Moderate genetic influence, significant environmental factors' },
  { trait: 'IQ', mz: 86, dz: 60, interpretation: 'High heritability, but shared environment also contributes' },
  { trait: 'Height', mz: 95, dz: 55, interpretation: 'Very high genetic influence' },
];

export default function TwinStudySimulator({ themeColor, isPresentation }: TwinStudySimulatorProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [mzPairs, setMzPairs] = useState<TwinPair[]>([
    { id: 1, type: 'MZ', twin1HasTrait: true, twin2HasTrait: true },
    { id: 2, type: 'MZ', twin1HasTrait: true, twin2HasTrait: true },
    { id: 3, type: 'MZ', twin1HasTrait: true, twin2HasTrait: false },
    { id: 4, type: 'MZ', twin1HasTrait: false, twin2HasTrait: false },
    { id: 5, type: 'MZ', twin1HasTrait: true, twin2HasTrait: true },
  ]);
  const [dzPairs, setDzPairs] = useState<TwinPair[]>([
    { id: 1, type: 'DZ', twin1HasTrait: true, twin2HasTrait: false },
    { id: 2, type: 'DZ', twin1HasTrait: true, twin2HasTrait: true },
    { id: 3, type: 'DZ', twin1HasTrait: false, twin2HasTrait: false },
    { id: 4, type: 'DZ', twin1HasTrait: true, twin2HasTrait: false },
    { id: 5, type: 'DZ', twin1HasTrait: true, twin2HasTrait: true },
  ]);
  const [showResults, setShowResults] = useState(false);

  const toggleTwin = (type: 'MZ' | 'DZ', pairId: number, twinNum: 1 | 2) => {
    const setter = type === 'MZ' ? setMzPairs : setDzPairs;
    const pairs = type === 'MZ' ? mzPairs : dzPairs;
    
    setter(pairs.map(pair => {
      if (pair.id === pairId) {
        if (twinNum === 1) {
          return { ...pair, twin1HasTrait: !pair.twin1HasTrait };
        } else {
          return { ...pair, twin2HasTrait: !pair.twin2HasTrait };
        }
      }
      return pair;
    }));
  };

  const calculateConcordance = (pairs: TwinPair[]) => {
    const concordant = pairs.filter(p => p.twin1HasTrait === p.twin2HasTrait).length;
    return Math.round((concordant / pairs.length) * 100);
  };

  const mzConcordance = calculateConcordance(mzPairs);
  const dzConcordance = calculateConcordance(dzPairs);

  const getInterpretation = () => {
    const diff = mzConcordance - dzConcordance;
    if (diff > 40) return { text: "Strong genetic influence suggested", color: "text-green-400" };
    if (diff > 20) return { text: "Moderate genetic influence suggested", color: "text-amber-400" };
    if (diff > 0) return { text: "Weak genetic influence suggested", color: "text-blue-400" };
    return { text: "Environment appears more influential than genetics", color: "text-purple-400" };
  };

  const resetSimulation = () => {
    setPhase('intro');
    setShowResults(false);
  };

  const textSize = isPresentation ? 'text-lg' : 'text-base';

  return (
    <div className="w-full max-w-4xl mx-auto">
      {phase === 'intro' && (
        <div className="space-y-6">
          <div className="text-center">
            <Dna className={`w-12 h-12 mx-auto mb-3 text-${themeColor}-400`} />
            <h3 className={`text-${themeColor}-400 font-bold text-xl mb-2`}>Twin Study Concordance Calculator</h3>
            <p className="text-gray-400">Understand how twin studies reveal genetic vs environmental influences</p>
          </div>

          <div className={`bg-${themeColor}-900/30 border border-${themeColor}-500/50 rounded-2xl p-6`}>
            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
              <Users size={20} /> How Twin Studies Work
            </h4>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-800/50 rounded-xl p-4">
                <p className="text-green-400 font-bold mb-2">MZ (Identical) Twins</p>
                <p className="text-gray-400 text-sm">Share 100% of genes</p>
                <p className="text-gray-400 text-sm">Same egg, split after fertilisation</p>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4">
                <p className="text-blue-400 font-bold mb-2">DZ (Fraternal) Twins</p>
                <p className="text-gray-400 text-sm">Share 50% of genes (like siblings)</p>
                <p className="text-gray-400 text-sm">Different eggs, same womb</p>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-4">
              <p className="text-amber-400 font-bold mb-2">The Logic:</p>
              <p className="text-gray-300 text-sm">
                If MZ concordance is <strong>much higher</strong> than DZ concordance, 
                genetics play a significant role. Both types share similar environments, 
                so the difference must be due to genes!
              </p>
            </div>
          </div>

          <button
            onClick={() => setPhase('input')}
            className={`w-full py-4 bg-${themeColor}-600 hover:bg-${themeColor}-500 rounded-xl text-white font-bold transition-all`}
          >
            Start Creating Twin Data →
          </button>
        </div>
      )}

      {phase === 'input' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className={`text-${themeColor}-400 font-bold text-xl`}>📊 Input Twin Data</h3>
            <button onClick={() => setPhase('intro')} className="text-gray-400 hover:text-white text-sm">
              ← Back
            </button>
          </div>

          <p className="text-gray-400">
            Click on each twin to toggle whether they have the trait. Green = has trait, Gray = doesn't.
          </p>

          {/* MZ Twins */}
          <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-4">
            <h4 className="text-green-400 font-bold mb-4">MZ (Identical) Twin Pairs - 100% shared genes</h4>
            <div className="space-y-3">
              {mzPairs.map((pair) => (
                <div key={pair.id} className="flex items-center gap-4 bg-gray-800/50 rounded-lg p-3">
                  <span className="text-gray-500 w-16">Pair {pair.id}:</span>
                  <button
                    onClick={() => toggleTwin('MZ', pair.id, 1)}
                    className={`px-4 py-2 rounded-lg font-bold transition-all ${
                      pair.twin1HasTrait 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-700 text-gray-400'
                    }`}
                  >
                    👤 Twin A
                  </button>
                  <button
                    onClick={() => toggleTwin('MZ', pair.id, 2)}
                    className={`px-4 py-2 rounded-lg font-bold transition-all ${
                      pair.twin2HasTrait 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-700 text-gray-400'
                    }`}
                  >
                    👤 Twin B
                  </button>
                  <span className={`ml-auto text-sm ${pair.twin1HasTrait === pair.twin2HasTrait ? 'text-green-400' : 'text-red-400'}`}>
                    {pair.twin1HasTrait === pair.twin2HasTrait ? '✓ Concordant' : '✗ Discordant'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* DZ Twins */}
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4">
            <h4 className="text-blue-400 font-bold mb-4">DZ (Fraternal) Twin Pairs - 50% shared genes</h4>
            <div className="space-y-3">
              {dzPairs.map((pair) => (
                <div key={pair.id} className="flex items-center gap-4 bg-gray-800/50 rounded-lg p-3">
                  <span className="text-gray-500 w-16">Pair {pair.id}:</span>
                  <button
                    onClick={() => toggleTwin('DZ', pair.id, 1)}
                    className={`px-4 py-2 rounded-lg font-bold transition-all ${
                      pair.twin1HasTrait 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-700 text-gray-400'
                    }`}
                  >
                    👤 Twin A
                  </button>
                  <button
                    onClick={() => toggleTwin('DZ', pair.id, 2)}
                    className={`px-4 py-2 rounded-lg font-bold transition-all ${
                      pair.twin2HasTrait 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-700 text-gray-400'
                    }`}
                  >
                    👤 Twin B
                  </button>
                  <span className={`ml-auto text-sm ${pair.twin1HasTrait === pair.twin2HasTrait ? 'text-green-400' : 'text-red-400'}`}>
                    {pair.twin1HasTrait === pair.twin2HasTrait ? '✓ Concordant' : '✗ Discordant'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => { setShowResults(true); setPhase('calculate'); }}
            className={`w-full py-4 bg-${themeColor}-600 hover:bg-${themeColor}-500 rounded-xl text-white font-bold transition-all flex items-center justify-center gap-2`}
          >
            <Calculator size={20} /> Calculate Concordance Rates
          </button>
        </div>
      )}

      {phase === 'calculate' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className={`text-${themeColor}-400 font-bold text-xl`}>📈 Concordance Results</h3>
            <button onClick={() => setPhase('input')} className="text-gray-400 hover:text-white text-sm">
              ← Edit Data
            </button>
          </div>

          {/* Results Display */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-6 text-center">
              <p className="text-green-400 font-bold mb-2">MZ Concordance</p>
              <p className="text-5xl font-black text-white">{mzConcordance}%</p>
              <p className="text-gray-500 text-sm mt-2">
                {mzPairs.filter(p => p.twin1HasTrait === p.twin2HasTrait).length}/5 pairs concordant
              </p>
            </div>
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6 text-center">
              <p className="text-blue-400 font-bold mb-2">DZ Concordance</p>
              <p className="text-5xl font-black text-white">{dzConcordance}%</p>
              <p className="text-gray-500 text-sm mt-2">
                {dzPairs.filter(p => p.twin1HasTrait === p.twin2HasTrait).length}/5 pairs concordant
              </p>
            </div>
          </div>

          {/* Comparison Bar */}
          <div className="bg-gray-800/50 rounded-xl p-4">
            <p className="text-gray-400 text-sm mb-3">Visual Comparison:</p>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="w-8 text-green-400">MZ:</span>
                <div className="flex-1 h-6 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${mzConcordance}%` }} />
                </div>
                <span className="w-12 text-right text-white">{mzConcordance}%</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 text-blue-400">DZ:</span>
                <div className="flex-1 h-6 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${dzConcordance}%` }} />
                </div>
                <span className="w-12 text-right text-white">{dzConcordance}%</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm mt-3">
              Difference: <span className="text-white font-bold">{mzConcordance - dzConcordance}%</span>
            </p>
          </div>

          {/* Interpretation */}
          <div className={`bg-${themeColor}-900/30 border border-${themeColor}-500/50 rounded-xl p-4`}>
            <Lightbulb className="text-amber-400 mb-2" size={24} />
            <p className="text-amber-400 font-bold mb-2">Interpretation:</p>
            <p className={`font-bold ${getInterpretation().color}`}>
              {getInterpretation().text}
            </p>
            <p className="text-gray-400 text-sm mt-2">
              {mzConcordance > dzConcordance 
                ? "MZ twins (100% genes) show higher concordance than DZ twins (50% genes), suggesting genetic influence."
                : "Similar or lower MZ concordance suggests environment may be more influential for this trait."}
            </p>
          </div>

          <button
            onClick={() => setPhase('interpret')}
            className={`w-full py-4 bg-${themeColor}-600 hover:bg-${themeColor}-500 rounded-xl text-white font-bold transition-all`}
          >
            See Real-World Examples →
          </button>
        </div>
      )}

      {phase === 'interpret' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className={`text-${themeColor}-400 font-bold text-xl`}>🌍 Real-World Twin Study Data</h3>
            <button onClick={() => setPhase('calculate')} className="text-gray-400 hover:text-white text-sm">
              ← Back
            </button>
          </div>

          <div className="bg-gray-800/50 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-900/50">
                <tr>
                  <th className="text-left p-4 text-gray-400">Trait</th>
                  <th className="p-4 text-green-400">MZ %</th>
                  <th className="p-4 text-blue-400">DZ %</th>
                  <th className="text-left p-4 text-gray-400">Interpretation</th>
                </tr>
              </thead>
              <tbody>
                {realWorldExamples.map((example, i) => (
                  <tr key={i} className="border-t border-gray-700">
                    <td className="p-4 text-white font-bold">{example.trait}</td>
                    <td className="p-4 text-center text-green-400 font-mono">{example.mz}%</td>
                    <td className="p-4 text-center text-blue-400 font-mono">{example.dz}%</td>
                    <td className="p-4 text-gray-400 text-sm">{example.interpretation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Key Points */}
          <div className={`bg-${themeColor}-900/30 border border-${themeColor}-500/50 rounded-xl p-4`}>
            <h4 className="text-white font-bold mb-3">📚 Key Evaluation Points</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-900/20 rounded-lg p-3 border border-green-500/30">
                <p className="text-green-400 font-bold text-sm">✓ Strengths</p>
                <ul className="text-gray-400 text-xs mt-1 space-y-1">
                  <li>• Natural experiment (no manipulation)</li>
                  <li>• Controls for environment (same womb, family)</li>
                  <li>• Isolates genetic influence</li>
                </ul>
              </div>
              <div className="bg-red-900/20 rounded-lg p-3 border border-red-500/30">
                <p className="text-red-400 font-bold text-sm">✗ Limitations</p>
                <ul className="text-gray-400 text-xs mt-1 space-y-1">
                  <li>• MZ twins may share more similar environments</li>
                  <li>• Small sample sizes often</li>
                  <li>• Cannot account for epigenetics</li>
                </ul>
              </div>
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
