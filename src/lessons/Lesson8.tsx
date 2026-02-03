import React, { useMemo, useState } from 'react';
import { Lightbulb, BookOpen, Target, GitCompare, ChevronDown, ChevronUp, Play } from 'lucide-react';
import Slide from '../components/Slide';
import PhaseHeader from '../components/PhaseHeader';
import DoNowQuiz from '../components/DoNowQuiz';
import UnderstandingCheck from '../components/UnderstandingCheck';
import TabbedContent from '../components/TabbedContent';
import { ApproachDebateSimulator } from '../components/simulations';
import { lesson8DoNow, lessonThemes } from '../constants';

// Click to reveal component for marking rubrics
function MarkingRubricReveal({ title, children, themeColor, isPresentation = false }: { title: string; children: React.ReactNode; themeColor: string; isPresentation?: boolean }) {
  const [isRevealed, setIsRevealed] = useState(false);
  
  return (
    <div className={isPresentation ? 'mt-6' : 'mt-4'}>
      <button
        onClick={() => setIsRevealed(!isRevealed)}
        className={`w-full flex items-center justify-between ${isPresentation ? 'px-6 py-4' : 'px-4 py-3'} bg-${themeColor}-900/30 border border-${themeColor}-500/50 rounded-xl hover:bg-${themeColor}-900/50 transition-all`}
      >
        <span className={`text-${themeColor}-400 font-medium ${isPresentation ? 'text-xl lg:text-2xl' : ''}`}>{title}</span>
        {isRevealed ? <ChevronUp className={`text-${themeColor}-400`} size={isPresentation ? 28 : 20} /> : <ChevronDown className={`text-${themeColor}-400`} size={isPresentation ? 28 : 20} />}
      </button>
      {isRevealed && (
        <div className={`mt-2 ${isPresentation ? 'p-6' : 'p-4'} bg-gray-800/50 border border-${themeColor}-500/30 rounded-xl animate-fadeIn`}>
          {children}
        </div>
      )}
    </div>
  );
}

interface Lesson8Props {
  isPresentation: boolean;
  currentSlide: number;
}

export default function Lesson8({ isPresentation, currentSlide }: Lesson8Props) {
  const theme = lessonThemes[8];

  const slides = useMemo(() => [
    // Slide 0: Title
    {
      type: 'title',
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="mb-8">
            <span className={`text-${theme.color}-400 text-xl font-bold uppercase tracking-widest`}>
              Approaches in Psychology
            </span>
          </div>
          <h1 className={`font-black text-white mb-6 ${isPresentation ? 'text-7xl lg:text-8xl' : 'text-6xl'}`}>
            Comparison of Approaches
          </h1>
          <p className={`text-gray-400 ${isPresentation ? 'text-3xl lg:text-4xl max-w-4xl' : 'text-2xl max-w-2xl'}`}>
            Key Debates, Contrasts, and Connections
          </p>
          <div className={`mt-12 flex items-center gap-4 text-${theme.color}-400`}>
            <GitCompare size={32} />
            <span className="text-xl">Lesson 8 of 8</span>
          </div>
        </div>
      )
    },
    
    // Slide 1: Do Now
    {
      type: 'doNow',
      content: (
        <div className="flex flex-col items-center justify-center h-full">
          <PhaseHeader
            phaseName="Starter"
            title="Do Now Quiz"
            icon={<Target size={28} />}
            time="5 mins"
            themeColor={theme.color}
            isPresentation={isPresentation}
          />
          <DoNowQuiz
            questions={lesson8DoNow}
            themeColor={theme.color}
            isPresentation={isPresentation}
          />
        </div>
      )
    },

    // Slide 2: Learning Objectives
    {
      type: 'objectives',
      content: (
        <div className="flex flex-col items-center justify-center h-full">
          <PhaseHeader
            phaseName="Overview"
            title="Learning Objectives"
            icon={<Target size={28} />}
            time="1 min"
            themeColor={theme.color}
            isPresentation={isPresentation}
          />
          <div className={`bg-${theme.color}-900/30 border border-${theme.color}-500/50 rounded-2xl p-8 max-w-3xl`}>
            <ul className={`${isPresentation ? 'space-y-6 text-2xl lg:text-3xl' : 'space-y-4 text-lg'}`}>
              <li className="flex items-start gap-3 text-gray-200">
                <span className={`text-${theme.color}-400 font-bold`}>1.</span>
                Compare approaches on key debates (determinism, nature-nurture, reductionism)
              </li>
              <li className="flex items-start gap-3 text-gray-200">
                <span className={`text-${theme.color}-400 font-bold`}>2.</span>
                Understand each approach's view on scientific methods
              </li>
              <li className="flex items-start gap-3 text-gray-200">
                <span className={`text-${theme.color}-400 font-bold`}>3.</span>
                Identify connections and contrasts between approaches
              </li>
              <li className="flex items-start gap-3 text-gray-200">
                <span className={`text-${theme.color}-400 font-bold`}>4.</span>
                Apply comparison skills to exam questions
              </li>
            </ul>
          </div>
        </div>
      )
    },

    // Slide 3: Free Will vs Determinism
    {
      type: 'teach',
      content: (
        <div className="flex flex-col items-center justify-center h-full">
          <PhaseHeader
            phaseName="Teach"
            title="Free Will vs Determinism"
            icon={<Lightbulb size={28} />}
            time="8 mins"
            themeColor={theme.color}
            isPresentation={isPresentation}
          />
          <div className="max-w-4xl w-full">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-900/30 border border-green-500/50 rounded-xl p-5">
                <h4 className="text-green-400 font-bold mb-3">✓ FREE WILL</h4>
                <p className="text-gray-300 text-sm mb-3">We have choice and control over our behaviour</p>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-pink-900/50 rounded text-pink-400 text-xs">Humanistic</span>
                </div>
              </div>
              
              <div className="bg-red-900/30 border border-red-500/50 rounded-xl p-5">
                <h4 className="text-red-400 font-bold mb-3">✗ DETERMINISM</h4>
                <p className="text-gray-300 text-sm mb-3">Behaviour is caused by factors beyond our control</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-cyan-900/50 rounded text-cyan-400 text-xs">Behaviourist</span>
                  <span className="px-2 py-1 bg-green-900/50 rounded text-green-400 text-xs">Biological</span>
                  <span className="px-2 py-1 bg-purple-900/50 rounded text-purple-400 text-xs">Psychodynamic</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
              <h4 className="text-gray-300 font-bold mb-3">⚖️ Types of Determinism</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><strong className="text-cyan-400">Environmental:</strong> Behaviour determined by conditioning and past experiences (Behaviourist)</li>
                <li><strong className="text-green-400">Biological:</strong> Behaviour determined by genes, brain chemistry, evolution (Biological)</li>
                <li><strong className="text-purple-400">Psychic:</strong> Behaviour determined by unconscious conflicts from childhood (Psychodynamic)</li>
                <li><strong className="text-blue-400">Soft:</strong> Cognitive approach - some choice exists within constraints</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },

    // Slide 4: Nature vs Nurture
    {
      type: 'teach',
      content: (
        <div className="flex flex-col items-center justify-center h-full">
          <PhaseHeader
            phaseName="Teach"
            title="Nature vs Nurture"
            icon={<Lightbulb size={28} />}
            time="8 mins"
            themeColor={theme.color}
            isPresentation={isPresentation}
          />
          <div className="max-w-4xl w-full">
            <div className="flex items-center justify-between mb-6">
              <div className="text-center">
                <div className="text-4xl mb-2">🧬</div>
                <p className="text-green-400 font-bold">NATURE</p>
                <p className="text-gray-500 text-sm">Genetics, biology</p>
              </div>
              <div className="flex-1 mx-8 h-4 bg-gradient-to-r from-green-500 via-gray-500 to-cyan-500 rounded-full"></div>
              <div className="text-center">
                <div className="text-4xl mb-2">🌍</div>
                <p className="text-cyan-400 font-bold">NURTURE</p>
                <p className="text-gray-500 text-sm">Environment, learning</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center bg-gray-800/50 rounded-xl p-4">
                <span className="w-32 text-green-400 font-bold">Biological</span>
                <div className="flex-1 h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: '85%' }}></div>
                </div>
                <span className="w-20 text-right text-gray-400 text-sm">Nature +++</span>
              </div>
              
              <div className="flex items-center bg-gray-800/50 rounded-xl p-4">
                <span className="w-32 text-cyan-400 font-bold">Behaviourist</span>
                <div className="flex-1 h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500" style={{ width: '15%', marginLeft: '85%' }}></div>
                </div>
                <span className="w-20 text-right text-gray-400 text-sm">Nurture +++</span>
              </div>
              
              <div className="flex items-center bg-gray-800/50 rounded-xl p-4">
                <span className="w-32 text-amber-400 font-bold">SLT</span>
                <div className="flex-1 h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500" style={{ width: '20%', marginLeft: '80%' }}></div>
                </div>
                <span className="w-20 text-right text-gray-400 text-sm">Nurture ++</span>
              </div>
              
              <div className="flex items-center bg-gray-800/50 rounded-xl p-4">
                <span className="w-32 text-blue-400 font-bold">Cognitive</span>
                <div className="flex-1 h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-cyan-500" style={{ width: '100%' }}></div>
                </div>
                <span className="w-20 text-right text-gray-400 text-sm">Both</span>
              </div>
              
              <div className="flex items-center bg-gray-800/50 rounded-xl p-4">
                <span className="w-32 text-purple-400 font-bold">Psychodynamic</span>
                <div className="flex-1 h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-purple-500" style={{ width: '50%' }}></div>
                </div>
                <span className="w-20 text-right text-gray-400 text-sm">Innate drives + childhood</span>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 5: Reductionism vs Holism
    {
      type: 'teach',
      content: (
        <div className="flex flex-col items-center justify-center h-full">
          <PhaseHeader
            phaseName="Teach"
            title="Reductionism vs Holism"
            icon={<Lightbulb size={28} />}
            time="6 mins"
            themeColor={theme.color}
            isPresentation={isPresentation}
          />
          <TabbedContent
            isPresentation={isPresentation}
            themeColor={theme.color}
            tabs={[
              {
                id: 'reductionism',
                label: 'Reductionism',
                icon: '🔬',
                content: (
                  <div className="space-y-4">
                    <p className={`text-gray-300 ${isPresentation ? 'text-xl' : 'text-base'}`}>
                      Breaking complex behaviour down into simpler components for study.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-green-900/30 rounded-xl p-4 border border-green-500/30">
                        <p className="text-green-400 font-bold mb-2">Biological</p>
                        <p className="text-gray-400 text-sm">Reduces behaviour to genes, neurotransmitters, brain regions</p>
                      </div>
                      <div className="bg-cyan-900/30 rounded-xl p-4 border border-cyan-500/30">
                        <p className="text-cyan-400 font-bold mb-2">Behaviourist</p>
                        <p className="text-gray-400 text-sm">Reduces behaviour to stimulus-response associations</p>
                      </div>
                      <div className="bg-blue-900/30 rounded-xl p-4 border border-blue-500/30">
                        <p className="text-blue-400 font-bold mb-2">Cognitive</p>
                        <p className="text-gray-400 text-sm">Reduces to information processing components (machine reductionism)</p>
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm">Advantage: Scientific, testable | Limitation: May oversimplify</p>
                  </div>
                )
              },
              {
                id: 'holism',
                label: 'Holism',
                icon: '🌍',
                content: (
                  <div className="space-y-4">
                    <p className={`text-gray-300 ${isPresentation ? 'text-xl' : 'text-base'}`}>
                      Understanding the whole person - behaviour cannot be fully understood by studying parts.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-pink-900/30 rounded-xl p-4 border border-pink-500/30">
                        <p className="text-pink-400 font-bold mb-2">Humanistic</p>
                        <p className="text-gray-400 text-sm">Studies the whole unique person, not individual components</p>
                      </div>
                      <div className="bg-purple-900/30 rounded-xl p-4 border border-purple-500/30">
                        <p className="text-purple-400 font-bold mb-2">Psychodynamic</p>
                        <p className="text-gray-400 text-sm">Considers the whole personality (id, ego, superego interactions)</p>
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm">Advantage: More complete picture | Limitation: Harder to test scientifically</p>
                  </div>
                )
              }
            ]}
          />
        </div>
      )
    },

    // Slide 6: Scientific Status
    {
      type: 'teach',
      content: (
        <div className="flex flex-col items-center justify-center h-full">
          <PhaseHeader
            phaseName="Teach"
            title="Scientific Status"
            icon={<Lightbulb size={28} />}
            time="6 mins"
            themeColor={theme.color}
            isPresentation={isPresentation}
          />
          <div className="max-w-4xl w-full">
            <p className={`text-gray-400 text-center mb-6 ${isPresentation ? 'text-lg' : 'text-base'}`}>
              How scientific is each approach? Consider: objectivity, controlled experiments, falsifiability
            </p>
            
            <div className="space-y-4">
              {[
                { name: 'Biological', color: 'green', score: 5, desc: 'Brain scans, controlled experiments, objective measures' },
                { name: 'Behaviourist', color: 'cyan', score: 5, desc: 'Lab experiments, observable behaviour, cause-effect' },
                { name: 'Cognitive', color: 'blue', score: 4, desc: 'Lab experiments, but infers internal processes' },
                { name: 'SLT', color: 'amber', score: 4, desc: 'Experiments (Bobo doll), but includes mental processes' },
                { name: 'Psychodynamic', color: 'purple', score: 2, desc: 'Case studies, unfalsifiable concepts' },
                { name: 'Humanistic', color: 'pink', score: 1, desc: 'Rejects scientific method, subjective focus' }
              ].map((approach) => (
                <div key={approach.name} className="flex items-center bg-gray-800/50 rounded-xl p-4">
                  <span className={`w-28 text-${approach.color}-400 font-bold text-sm`}>{approach.name}</span>
                  <div className="flex-1 flex items-center gap-2 mx-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div
                        key={star}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          star <= approach.score ? `bg-${approach.color}-600` : 'bg-gray-700'
                        }`}
                      >
                        {star <= approach.score ? '⭐' : ''}
                      </div>
                    ))}
                  </div>
                  <span className="text-gray-500 text-xs w-48 text-right">{approach.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },

    // Slide 7: Understanding Check
    {
      type: 'afl',
      content: (
        <div className="flex flex-col items-center justify-center h-full">
          <PhaseHeader
            phaseName="Check"
            title="Understanding Check"
            icon={<Target size={28} />}
            time="5 mins"
            themeColor={theme.color}
            isPresentation={isPresentation}
          />
          <UnderstandingCheck
            questions={[
              {
                id: 'uc1',
                type: 'mcq',
                question: 'Which approach is MOST associated with free will?',
                options: ['Behaviourist', 'Biological', 'Humanistic', 'Psychodynamic'],
                correctIndex: 2,
                feedback: 'The humanistic approach is the only one that fully embraces free will. All others are deterministic to varying degrees.'
              },
              {
                id: 'uc2',
                type: 'mcq',
                question: 'Which approach takes the MOST "nurture" position?',
                options: ['Biological', 'Behaviourist', 'Psychodynamic', 'Cognitive'],
                correctIndex: 1,
                feedback: 'Behaviourism believes all behaviour is learned from the environment - we are born as a "blank slate" (tabula rasa).'
              },
              {
                id: 'uc3',
                type: 'mcq',
                question: 'Which approaches are considered MOST scientific?',
                options: [
                  'Humanistic and Psychodynamic',
                  'Biological and Behaviourist',
                  'SLT and Humanistic',
                  'Cognitive and Psychodynamic'
                ],
                correctIndex: 1,
                feedback: 'Biological and behaviourist approaches use controlled experiments, objective measures, and produce falsifiable predictions.'
              }
            ]}
            isPresentation={isPresentation}
            themeColor={theme.color}
          />
        </div>
      )
    },

    // Slide 8: Comparison Table
    {
      type: 'summary',
      content: (
        <div className="flex flex-col items-center justify-center h-full">
          <PhaseHeader
            phaseName="Summary"
            title="Quick Comparison Table"
            icon={<Target size={28} />}
            time="5 mins"
            themeColor={theme.color}
            isPresentation={isPresentation}
          />
          <div className="max-w-4xl w-full overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left p-3 text-gray-400">Approach</th>
                  <th className="p-3 text-gray-400">Determinism</th>
                  <th className="p-3 text-gray-400">Nature/Nurture</th>
                  <th className="p-3 text-gray-400">Scientific?</th>
                  <th className="p-3 text-gray-400">Reductionist?</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="p-3 text-cyan-400 font-bold">Behaviourist</td>
                  <td className="p-3 text-center text-red-400">Hard</td>
                  <td className="p-3 text-center">Nurture</td>
                  <td className="p-3 text-center text-green-400">✓✓✓</td>
                  <td className="p-3 text-center text-green-400">✓</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-3 text-amber-400 font-bold">SLT</td>
                  <td className="p-3 text-center text-amber-400">Soft</td>
                  <td className="p-3 text-center">Nurture (+)</td>
                  <td className="p-3 text-center text-green-400">✓✓</td>
                  <td className="p-3 text-center text-amber-400">Less</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-3 text-blue-400 font-bold">Cognitive</td>
                  <td className="p-3 text-center text-amber-400">Soft</td>
                  <td className="p-3 text-center">Both</td>
                  <td className="p-3 text-center text-green-400">✓✓</td>
                  <td className="p-3 text-center text-green-400">✓</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-3 text-green-400 font-bold">Biological</td>
                  <td className="p-3 text-center text-red-400">Hard</td>
                  <td className="p-3 text-center">Nature</td>
                  <td className="p-3 text-center text-green-400">✓✓✓</td>
                  <td className="p-3 text-center text-green-400">✓</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-3 text-purple-400 font-bold">Psychodynamic</td>
                  <td className="p-3 text-center text-red-400">Hard</td>
                  <td className="p-3 text-center">Both</td>
                  <td className="p-3 text-center text-red-400">✗</td>
                  <td className="p-3 text-center text-amber-400">Holistic</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-3 text-pink-400 font-bold">Humanistic</td>
                  <td className="p-3 text-center text-green-400">Free Will</td>
                  <td className="p-3 text-center">Neither</td>
                  <td className="p-3 text-center text-red-400">✗</td>
                  <td className="p-3 text-center text-amber-400">Holistic</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    },

    // Slide 9: Interactive Simulation
    {
      type: 'interactive',
      content: (
        <div className="flex flex-col items-center justify-center h-full">
          <PhaseHeader
            phaseName="Apply"
            title="Approach Debate Lab"
            icon={<Play size={28} />}
            time="10 mins"
            themeColor={theme.color}
            isPresentation={isPresentation}
          />
          <ApproachDebateSimulator themeColor={theme.color} isPresentation={isPresentation} />
        </div>
      )
    },

    // Slide 10: Extended Task
    {
      type: 'summary',
      content: (
        <div className="flex flex-col items-center justify-center h-full">
          <PhaseHeader
            phaseName="Apply"
            title="Extended Tasks"
            icon={<BookOpen size={28} />}
            time="5 mins"
            themeColor={theme.color}
            isPresentation={isPresentation}
          />
          <div className={`grid md:grid-cols-2 ${isPresentation ? 'gap-8 max-w-6xl' : 'gap-6 max-w-4xl'}`}>
            <div className={`bg-${theme.color}-900/30 border border-${theme.color}-500/50 rounded-2xl ${isPresentation ? 'p-8' : 'p-6'}`}>
              <h3 className={`text-${theme.color}-400 font-bold mb-4 ${isPresentation ? 'text-2xl lg:text-3xl' : 'text-xl'}`}>📝 Key Takeaways</h3>
              <ul className={`${isPresentation ? 'space-y-4 text-xl lg:text-2xl' : 'space-y-3 text-sm'} text-gray-300`}>
                <li>• Free will: Humanistic only</li>
                <li>• Hard determinism: Behaviourist, Biological, Psychodynamic</li>
                <li>• Nature: Biological | Nurture: Behaviourist, SLT</li>
                <li>• Most scientific: Biological, Behaviourist</li>
                <li>• Least scientific: Humanistic, Psychodynamic</li>
                <li>• Reductionist: Biological, Behaviourist, Cognitive</li>
                <li>• Holistic: Humanistic, Psychodynamic</li>
              </ul>
            </div>

            <div className={`bg-amber-900/30 border border-amber-500/50 rounded-2xl ${isPresentation ? 'p-8' : 'p-6'}`}>
              <h3 className={`text-amber-400 font-bold mb-4 ${isPresentation ? 'text-2xl lg:text-3xl' : 'text-xl'}`}>🎯 Practice Questions</h3>
              <div className={`text-gray-300 ${isPresentation ? 'space-y-6' : 'space-y-4'}`}>
                <div className={`bg-gray-800/50 rounded-xl ${isPresentation ? 'p-5' : 'p-3'} border-l-4 border-amber-500`}>
                  <p className={`text-white ${isPresentation ? 'text-xl lg:text-2xl' : 'text-sm'}`}>"Compare the cognitive and behaviourist approaches in terms of their views on determinism." (4 marks)</p>
                </div>
                <div className={`bg-gray-800/50 rounded-xl ${isPresentation ? 'p-5' : 'p-3'} border-l-4 border-amber-500`}>
                  <p className={`text-white ${isPresentation ? 'text-xl lg:text-2xl' : 'text-sm'}`}>"Outline the nature-nurture debate with reference to two approaches." (6 marks)</p>
                </div>
                <div className={`bg-gray-800/50 rounded-xl ${isPresentation ? 'p-5' : 'p-3'} border-l-4 border-amber-500`}>
                  <p className={`text-white ${isPresentation ? 'text-xl lg:text-2xl' : 'text-sm'}`}>"Evaluate the humanistic approach with reference to scientific methods." (4 marks)</p>
                </div>
              </div>
              <MarkingRubricReveal title="📋 Click to Reveal Marking Guidance" themeColor="amber" isPresentation={isPresentation}>
                <ul className={`${isPresentation ? 'space-y-4 text-lg lg:text-xl' : 'space-y-2 text-sm'} text-gray-300`}>
                  <li><strong className="text-cyan-400">4-mark:</strong> 2 clear points with brief elaboration OR 1 detailed point with example</li>
                  <li><strong className="text-amber-400">6-mark:</strong> AO1 knowledge (3-4 marks) + AO3 evaluation or comparison (2-3 marks)</li>
                  <li><strong className="text-gray-400">Tip:</strong> Always name the approaches explicitly and use key terminology</li>
                </ul>
              </MarkingRubricReveal>
            </div>
          </div>
        </div>
      )
    },

    // Slide 10: 16-Mark Essay Question
    {
      type: 'essay',
      content: (
        <div className="flex flex-col items-center justify-center h-full">
          <PhaseHeader
            phaseName="Apply"
            title="16-Mark Essay Question"
            icon={<BookOpen size={28} />}
            time="20 mins"
            themeColor={theme.color}
            isPresentation={isPresentation}
          />
          <div className="max-w-4xl w-full space-y-6">
            <div className={`bg-${theme.color}-900/30 border-2 border-${theme.color}-500 rounded-2xl p-6`}>
              <div className="flex items-center gap-2 mb-4">
                <span className={`px-3 py-1 bg-${theme.color}-600 rounded-full text-white text-sm font-bold`}>16 MARKS</span>
                <span className="text-gray-400 text-sm">Extended response question</span>
              </div>
              <p className={`text-white font-medium ${isPresentation ? 'text-2xl' : 'text-xl'}`}>
                "Discuss the view that the biological approach provides the best explanation for human behaviour. Refer to at least two other approaches in your answer."
              </p>
            </div>

            <MarkingRubricReveal title="📋 Click to Reveal: Mark Scheme & Structure" themeColor={theme.color} isPresentation={isPresentation}>
              <div className={`${isPresentation ? 'space-y-6' : 'space-y-4'}`}>
                <div className={`grid md:grid-cols-2 ${isPresentation ? 'gap-6' : 'gap-4'}`}>
                  <div className={`bg-blue-900/20 rounded-xl ${isPresentation ? 'p-6' : 'p-4'} border border-blue-500/30`}>
                    <h4 className={`text-blue-400 font-bold ${isPresentation ? 'mb-4 text-xl lg:text-2xl' : 'mb-2'}`}>AO1: Knowledge (6 marks)</h4>
                    <ul className={`text-gray-300 ${isPresentation ? 'text-lg lg:text-xl space-y-3' : 'text-sm space-y-1'}`}>
                      <li>• Biological approach features (genes, neurotransmitters, evolution)</li>
                      <li>• Features of comparison approaches</li>
                      <li>• Clear, accurate terminology</li>
                    </ul>
                  </div>
                  <div className={`bg-green-900/20 rounded-xl ${isPresentation ? 'p-6' : 'p-4'} border border-green-500/30`}>
                    <h4 className={`text-green-400 font-bold ${isPresentation ? 'mb-4 text-xl lg:text-2xl' : 'mb-2'}`}>AO3: Evaluation (10 marks)</h4>
                    <ul className={`text-gray-300 ${isPresentation ? 'text-lg lg:text-xl space-y-3' : 'text-sm space-y-1'}`}>
                      <li>• Strengths of biological (scientific, practical applications)</li>
                      <li>• Limitations (reductionist, deterministic)</li>
                      <li>• Compare with other approaches</li>
                      <li>• Balanced conclusion</li>
                    </ul>
                  </div>
                </div>

                <div className={`bg-gray-900/50 rounded-xl ${isPresentation ? 'p-6' : 'p-4'} border border-gray-700`}>
                  <h4 className={`text-amber-400 font-bold ${isPresentation ? 'mb-4 text-xl lg:text-2xl' : 'mb-3'}`}>📝 Suggested Structure</h4>
                  <div className={`grid md:grid-cols-2 ${isPresentation ? 'gap-6 text-lg lg:text-xl' : 'gap-4 text-sm'}`}>
                    <div className={isPresentation ? 'space-y-3' : ''}>
                      <p className="text-gray-400 mb-2"><strong className="text-white">Para 1:</strong> Introduce biological approach</p>
                      <p className="text-gray-400 mb-2"><strong className="text-white">Para 2:</strong> Strength + evidence (e.g., drug treatments)</p>
                      <p className="text-gray-400 mb-2"><strong className="text-white">Para 3:</strong> Limitation + counter from another approach</p>
                    </div>
                    <div className={isPresentation ? 'space-y-3' : ''}>
                      <p className="text-gray-400 mb-2"><strong className="text-white">Para 4:</strong> Compare with cognitive/behaviourist</p>
                      <p className="text-gray-400 mb-2"><strong className="text-white">Para 5:</strong> Discuss interactionist perspective</p>
                      <p className="text-gray-400 mb-2"><strong className="text-white">Conclusion:</strong> Balanced judgement</p>
                    </div>
                  </div>
                </div>

                <div className={`bg-purple-900/20 rounded-xl ${isPresentation ? 'p-6' : 'p-4'} border border-purple-500/30`}>
                  <h4 className={`text-purple-400 font-bold ${isPresentation ? 'mb-4 text-xl lg:text-2xl' : 'mb-2'}`}>🎯 Top Band Tips (13-16 marks)</h4>
                  <ul className={`text-gray-300 ${isPresentation ? 'text-lg lg:text-xl space-y-3' : 'text-sm space-y-1'}`}>
                    <li>• Use specific research evidence (e.g., twin studies, drug therapies)</li>
                    <li>• Make explicit comparisons using phrases like "In contrast to..." or "Unlike the biological approach..."</li>
                    <li>• Show sophisticated understanding of debates (reductionism, determinism, nature-nurture)</li>
                    <li>• Reach a clear, justified conclusion that addresses the question directly</li>
                  </ul>
                </div>
              </div>
            </MarkingRubricReveal>
          </div>
        </div>
      )
    }
  ], [isPresentation, theme.color]);

  return (
    <Slide isPresentation={isPresentation}>
      {slides[currentSlide]?.content}
    </Slide>
  );
}

export const lesson8SlideCount = 12;
