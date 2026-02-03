import React, { useMemo, useState } from 'react';
import { Lightbulb, BookOpen, Target, Cpu, Brain, ChevronDown, ChevronUp, Play } from 'lucide-react';
import Slide from '../components/Slide';
import PhaseHeader from '../components/PhaseHeader';
import DoNowQuiz from '../components/DoNowQuiz';
import UnderstandingCheck from '../components/UnderstandingCheck';
import SpotlightCards from '../components/SpotlightCards';
import StepReveal from '../components/StepReveal';
import TabbedContent from '../components/TabbedContent';
import ClickToReveal from '../components/ClickToReveal';
import { SchemaSimulator } from '../components/simulations';
import { lesson4DoNow, lessonThemes } from '../constants';

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

interface Lesson4Props {
  isPresentation: boolean;
  currentSlide: number;
}

export default function Lesson4({ isPresentation, currentSlide }: Lesson4Props) {
  const theme = lessonThemes[4];
  
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
            The Cognitive Approach
          </h1>
          <p className={`text-gray-400 ${isPresentation ? 'text-3xl lg:text-4xl max-w-4xl' : 'text-2xl max-w-2xl'}`}>
            Internal Mental Processes, Schemas, and the Computer Analogy
          </p>
          <div className={`mt-12 flex items-center gap-4 text-${theme.color}-400`}>
            <Cpu size={32} />
            <span className="text-xl">Lesson 4 of 8</span>
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
            questions={lesson4DoNow}
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
                Explain the key assumptions of the cognitive approach
              </li>
              <li className="flex items-start gap-3 text-gray-200">
                <span className={`text-${theme.color}-400 font-bold`}>2.</span>
                Describe schemas and their role in information processing
              </li>
              <li className="flex items-start gap-3 text-gray-200">
                <span className={`text-${theme.color}-400 font-bold`}>3.</span>
                Explain the computer analogy and theoretical models
              </li>
              <li className="flex items-start gap-3 text-gray-200">
                <span className={`text-${theme.color}-400 font-bold`}>4.</span>
                Understand the emergence of cognitive neuroscience
              </li>
            </ul>
          </div>
        </div>
      )
    },

    // Slide 3: Cognitive Assumptions
    {
      type: 'teach',
      content: (
        <div className="flex flex-col items-center justify-center h-full">
          <PhaseHeader
            phaseName="Teach"
            title="Key Assumptions"
            icon={<Lightbulb size={28} />}
            time="6 mins"
            themeColor={theme.color}
            isPresentation={isPresentation}
          />
          <SpotlightCards
            isPresentation={isPresentation}
            cards={[
              {
                id: 'internal',
                title: 'Internal Mental Processes',
                content: 'The mind actively processes information between stimulus and response. Thinking, memory, perception, and attention can all be studied scientifically.',
                icon: '🧠',
                color: 'blue',
                details: [
                  'Rejects behaviourist "black box" view',
                  'Mental processes influence behaviour',
                  'We can make inferences about how the mind works'
                ]
              },
              {
                id: 'computer',
                title: 'Computer Analogy',
                content: 'The mind is like a computer: it receives input (senses), processes information (thinking), and produces output (behaviour).',
                icon: '💻',
                color: 'cyan',
                details: [
                  'Input → Processing → Output',
                  'Coding, storage, and retrieval of information',
                  'But humans have emotions and free will - unlike computers'
                ]
              },
              {
                id: 'schemas',
                title: 'Schemas',
                content: 'Mental frameworks that help us organize and interpret information. They are built from experience and affect how we process new information.',
                icon: '📁',
                color: 'purple',
                details: [
                  'Mental shortcuts for understanding the world',
                  'Can lead to quick processing but also errors',
                  'Develop and change with experience'
                ]
              },
              {
                id: 'scientific',
                title: 'Scientific Methods',
                content: 'Uses controlled lab experiments and theoretical models to study mental processes that cannot be directly observed.',
                icon: '🔬',
                color: 'green',
                details: [
                  'Inference from behaviour to mental processes',
                  'Theoretical models tested experimentally',
                  'Objective, replicable research'
                ]
              }
            ]}
          />
        </div>
      )
    },

    // Slide 4: Schemas in Detail
    {
      type: 'teach',
      content: (
        <div className="flex flex-col items-center justify-center h-full">
          <PhaseHeader
            phaseName="Teach"
            title="Schemas: Mental Frameworks"
            icon={<Lightbulb size={28} />}
            time="8 mins"
            themeColor={theme.color}
            isPresentation={isPresentation}
          />
          <StepReveal
            steps={[
              {
                title: "What are Schemas?",
                content: "Packages of ideas and information developed through experience. They act as mental shortcuts that help us process information quickly.",
                icon: "📦"
              },
              {
                title: "How Schemas Develop",
                content: "Schemas develop from direct experience and social interactions. A baby develops a 'feeding' schema, which becomes more complex over time.",
                icon: "🌱"
              },
              {
                title: "Schemas Speed Up Processing",
                content: "By activating relevant schemas, we can fill in gaps in our knowledge and make quick judgments. You know what to expect in a restaurant because of your 'restaurant schema'.",
                icon: "⚡"
              },
              {
                title: "Schemas Can Cause Errors",
                content: "Schemas can lead us to overlook information that doesn't fit our expectations, or to 'remember' things that didn't actually happen but fit our schema.",
                icon: "⚠️"
              }
            ]}
            isPresentation={isPresentation}
            themeColor={theme.color}
          />
        </div>
      )
    },

    // Slide 5: Computer Models
    {
      type: 'teach',
      content: (
        <div className="flex flex-col items-center justify-center h-full">
          <PhaseHeader
            phaseName="Teach"
            title="Theoretical & Computer Models"
            icon={<Cpu size={28} />}
            time="6 mins"
            themeColor={theme.color}
            isPresentation={isPresentation}
          />
          <TabbedContent
            isPresentation={isPresentation}
            themeColor={theme.color}
            tabs={[
              {
                id: 'information',
                label: 'Information Processing',
                icon: '📊',
                content: (
                  <div className="space-y-4">
                    <p className={`text-gray-300 ${isPresentation ? 'text-xl' : 'text-base'}`}>
                      The mind processes information in stages, similar to how a computer works:
                    </p>
                    <div className="flex items-center justify-center gap-4 text-center">
                      <div className="bg-blue-900/30 rounded-xl p-4 border border-blue-500/30">
                        <p className="text-blue-400 font-bold">INPUT</p>
                        <p className="text-gray-400 text-sm">Senses receive information</p>
                      </div>
                      <span className="text-gray-500 text-2xl">→</span>
                      <div className="bg-purple-900/30 rounded-xl p-4 border border-purple-500/30">
                        <p className="text-purple-400 font-bold">PROCESSING</p>
                        <p className="text-gray-400 text-sm">Mind encodes & transforms</p>
                      </div>
                      <span className="text-gray-500 text-2xl">→</span>
                      <div className="bg-green-900/30 rounded-xl p-4 border border-green-500/30">
                        <p className="text-green-400 font-bold">OUTPUT</p>
                        <p className="text-gray-400 text-sm">Behaviour or response</p>
                      </div>
                    </div>
                  </div>
                )
              },
              {
                id: 'msm',
                label: 'Multi-Store Model',
                icon: '🗄️',
                content: (
                  <div className="space-y-4">
                    <p className={`text-gray-300 ${isPresentation ? 'text-xl' : 'text-base'}`}>
                      Atkinson & Shiffrin's model shows how information flows through memory stores:
                    </p>
                    <ul className="space-y-2 text-gray-300">
                      <li>• <strong className="text-cyan-400">Sensory Memory:</strong> Brief store for incoming sensory information</li>
                      <li>• <strong className="text-blue-400">Short-Term Memory:</strong> Limited capacity, holds info temporarily</li>
                      <li>• <strong className="text-purple-400">Long-Term Memory:</strong> Unlimited capacity, permanent storage</li>
                    </ul>
                    <p className="text-gray-400 text-sm">This is a theoretical model - we can't directly observe these processes.</p>
                  </div>
                )
              },
              {
                id: 'limitations',
                label: 'Limitations',
                icon: '⚠️',
                content: (
                  <div className="space-y-4">
                    <p className={`text-gray-300 ${isPresentation ? 'text-xl' : 'text-base'}`}>
                      The computer analogy has important limitations:
                    </p>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Humans have <strong className="text-amber-400">emotions</strong> that affect processing</li>
                      <li>• We have <strong className="text-amber-400">free will</strong> and make choices</li>
                      <li>• Human memory is <strong className="text-amber-400">reconstructive</strong>, not exact retrieval</li>
                      <li>• We are influenced by <strong className="text-amber-400">motivation</strong> and context</li>
                    </ul>
                  </div>
                )
              }
            ]}
          />
        </div>
      )
    },

    // Slide 6: Cognitive Neuroscience
    {
      type: 'teach',
      content: (
        <div className="flex flex-col items-center justify-center h-full">
          <PhaseHeader
            phaseName="Teach"
            title="Cognitive Neuroscience"
            icon={<Brain size={28} />}
            time="6 mins"
            themeColor={theme.color}
            isPresentation={isPresentation}
          />
          <div className="max-w-3xl w-full">
            <div className={`bg-${theme.color}-900/30 border border-${theme.color}-500/50 rounded-2xl p-8 mb-6`}>
              <h3 className={`text-${theme.color}-400 font-bold text-2xl mb-4`}>
                What is Cognitive Neuroscience?
              </h3>
              <p className={`text-gray-300 text-lg mb-4`}>
                The study of how <strong className="text-white">brain structures</strong> influence <strong className="text-white">mental processes</strong>. It combines cognitive psychology with brain science using modern scanning technology.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-cyan-900/30 border border-cyan-500/50 rounded-xl p-6">
                <h4 className="text-cyan-400 font-bold mb-3">🧲 Brain Scanning</h4>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• <strong>fMRI:</strong> Shows brain activity during tasks</li>
                  <li>• <strong>PET:</strong> Tracks brain metabolism</li>
                  <li>• <strong>EEG:</strong> Measures electrical activity</li>
                </ul>
              </div>
              
              <div className="bg-green-900/30 border border-green-500/50 rounded-xl p-6">
                <h4 className="text-green-400 font-bold mb-3">✓ Significance</h4>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• Links mental processes to brain regions</li>
                  <li>• Provides biological evidence for cognitive theories</li>
                  <li>• Helps develop treatments for mental disorders</li>
                </ul>
              </div>
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
                question: 'What are schemas?',
                options: [
                  'Brain scanning techniques',
                  'Mental frameworks for organizing information',
                  'Types of computer memory',
                  'Observable behaviours'
                ],
                correctIndex: 1,
                feedback: 'Schemas are mental frameworks built from experience that help us organize and interpret information quickly.'
              },
              {
                id: 'uc2',
                type: 'mcq',
                question: 'Which is a limitation of the computer analogy?',
                options: [
                  'Computers cannot process information',
                  'Humans do not receive input',
                  'Humans have emotions that affect processing',
                  'The mind does not produce output'
                ],
                correctIndex: 2,
                feedback: 'Unlike computers, humans have emotions, motivation, and free will that affect how we process information.'
              },
              {
                id: 'uc3',
                type: 'mcq',
                question: 'What does cognitive neuroscience combine?',
                options: [
                  'Behaviourism and psychoanalysis',
                  'Brain science and cognitive psychology',
                  'Philosophy and sociology',
                  'Animal and human research'
                ],
                correctIndex: 1,
                feedback: 'Cognitive neuroscience studies how brain structures influence mental processes, combining neuroscience with cognitive psychology.'
              }
            ]}
            isPresentation={isPresentation}
            themeColor={theme.color}
          />
        </div>
      )
    },

    // Slide 8: Evaluation
    {
      type: 'evaluation',
      content: (
        <div className="flex flex-col items-center justify-center h-full">
          <PhaseHeader
            phaseName="Evaluate"
            title="Key Evaluation Points"
            icon={<Target size={28} />}
            time="5 mins"
            themeColor={theme.color}
            isPresentation={isPresentation}
          />
          <ClickToReveal
            isPresentation={isPresentation}
            cards={[
              {
                id: 'str1',
                category: 'strength',
                title: 'Scientific & Objective',
                content: 'Uses controlled experiments and produces models that can be tested. Lab experiments allow clear cause-effect conclusions with high reliability.'
              },
              {
                id: 'str2',
                category: 'strength',
                title: 'Real-World Applications',
                content: 'Has led to successful treatments like CBT for depression and anxiety, and improved understanding of conditions like dementia and ADHD.'
              },
              {
                id: 'lim1',
                category: 'limitation',
                title: 'Machine Reductionism',
                content: 'Comparing the mind to a computer ignores emotions, motivation, and the influence of social context on our thinking.'
              },
              {
                id: 'lim2',
                category: 'limitation',
                title: 'Lacks Ecological Validity',
                content: 'Lab experiments may not reflect how cognition works in everyday life. Artificial tasks may not represent real-world mental processing.'
              }
            ]}
          />
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
            title="Schema Lab"
            icon={<Play size={28} />}
            time="10 mins"
            themeColor={theme.color}
            isPresentation={isPresentation}
          />
          <SchemaSimulator themeColor={theme.color} isPresentation={isPresentation} />
        </div>
      )
    },

    // Slide 10: Summary & Extended Task
    {
      type: 'summary',
      content: (
        <div className="flex flex-col items-center justify-center h-full">
          <PhaseHeader
            phaseName="Apply"
            title="Summary & Extended Task"
            icon={<BookOpen size={28} />}
            time="5 mins"
            themeColor={theme.color}
            isPresentation={isPresentation}
          />
          <div className={`grid md:grid-cols-2 ${isPresentation ? 'gap-8 max-w-6xl' : 'gap-6 max-w-4xl'}`}>
            <div className={`bg-${theme.color}-900/30 border border-${theme.color}-500/50 rounded-2xl ${isPresentation ? 'p-8' : 'p-6'}`}>
              <h3 className={`text-${theme.color}-400 font-bold mb-4 ${isPresentation ? 'text-2xl lg:text-3xl' : 'text-xl'}`}>📝 Key Takeaways</h3>
              <ul className={`${isPresentation ? 'space-y-4 text-xl lg:text-2xl' : 'space-y-3'} text-gray-300`}>
                <li>• Studies internal mental processes scientifically</li>
                <li>• Uses the computer analogy: input → processing → output</li>
                <li>• Schemas = mental frameworks that shape perception</li>
                <li>• Theoretical models represent internal processes</li>
                <li>• Cognitive neuroscience links brain and mind</li>
                <li>• Limitations: machine reductionism, low ecological validity</li>
              </ul>
            </div>

            <div className={`bg-amber-900/30 border border-amber-500/50 rounded-2xl ${isPresentation ? 'p-8' : 'p-6'}`}>
              <h3 className={`text-amber-400 font-bold mb-4 ${isPresentation ? 'text-2xl lg:text-3xl' : 'text-xl'}`}>🎯 Extended Task</h3>
              <div className={`text-gray-300 ${isPresentation ? 'space-y-6' : 'space-y-4'}`}>
                <p className={`font-medium ${isPresentation ? 'text-xl lg:text-2xl' : ''}`}>
                  Write a 6-mark answer:
                </p>
                <div className="bg-gray-800/50 rounded-xl p-4 border-l-4 border-amber-500">
                  <p className="text-white font-medium">
                    "Outline two assumptions of the cognitive approach and explain how schemas influence behaviour." (6 marks)
                  </p>
                </div>
                <MarkingRubricReveal title="📋 Click to Reveal Marking Guidance" themeColor="amber" isPresentation={isPresentation}>
                  <ul className={`${isPresentation ? 'space-y-4 text-lg lg:text-xl' : 'space-y-2 text-sm'} text-gray-300`}>
                    <li><strong className="text-blue-400">Assumption 1 (2 marks):</strong> Internal mental processes can be studied scientifically (computer analogy)</li>
                    <li><strong className="text-blue-400">Assumption 2 (2 marks):</strong> Mind operates like an information processor (input, processing, output)</li>
                    <li><strong className="text-green-400">Schemas (2 marks):</strong> Mental frameworks that organise knowledge, can lead to distortions/stereotypes</li>
                    <li><strong className="text-gray-400">Tip:</strong> Use specific examples (e.g., how a schema about "teachers" affects our interpretation)</li>
                  </ul>
                </MarkingRubricReveal>
              </div>
            </div>
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

export const lesson4SlideCount = 11;
