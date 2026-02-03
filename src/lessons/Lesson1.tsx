import React, { useMemo, useState } from 'react';
import { Lightbulb, BookOpen, Target, ChevronDown, ChevronUp, Play } from 'lucide-react';
import Slide from '../components/Slide';
import PhaseHeader from '../components/PhaseHeader';
import DoNowQuiz from '../components/DoNowQuiz';
import UnderstandingCheck from '../components/UnderstandingCheck';
import SpotlightCards from '../components/SpotlightCards';
import StepReveal from '../components/StepReveal';
import EvidenceGrid from '../components/EvidenceGrid';
import ClickToReveal from '../components/ClickToReveal';
import { IntrospectionSimulator } from '../components/simulations';
import { lesson1DoNow, lessonThemes } from '../constants';

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

interface Lesson1Props {
  isPresentation: boolean;
  currentSlide: number;
}

export default function Lesson1({ isPresentation, currentSlide }: Lesson1Props) {
  const theme = lessonThemes[1];
  
  // Slide data
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
            Origins of Psychology
          </h1>
          <p className={`text-gray-400 ${isPresentation ? 'text-3xl lg:text-4xl max-w-4xl' : 'text-2xl max-w-2xl'}`}>
            Wundt, Introspection, and the Emergence of Psychology as a Science
          </p>
          <div className={`mt-12 flex items-center gap-4 text-${theme.color}-400`}>
            <BookOpen size={32} />
            <span className="text-xl">Lesson 1 of 8</span>
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
            questions={lesson1DoNow}
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
                Explain Wundt's role in establishing psychology as a scientific discipline
              </li>
              <li className="flex items-start gap-3 text-gray-200">
                <span className={`text-${theme.color}-400 font-bold`}>2.</span>
                Describe the process and purpose of introspection
              </li>
              <li className="flex items-start gap-3 text-gray-200">
                <span className={`text-${theme.color}-400 font-bold`}>3.</span>
                Evaluate the scientific status of early psychology
              </li>
              <li className="flex items-start gap-3 text-gray-200">
                <span className={`text-${theme.color}-400 font-bold`}>4.</span>
                Understand why psychology emerged as a separate discipline from philosophy
              </li>
            </ul>
          </div>
        </div>
      )
    },

    // Slide 3: Wundt Introduction
    {
      type: 'teach',
      content: (
        <div className="flex flex-col items-center justify-center h-full">
          <PhaseHeader
            phaseName="Teach"
            title="Wilhelm Wundt: The Father of Psychology"
            icon={<Lightbulb size={28} />}
            time="8 mins"
            themeColor={theme.color}
            isPresentation={isPresentation}
          />
          <StepReveal
            steps={[
              {
                title: "1879: The Birth of Psychology",
                content: "Wilhelm Wundt opened the first psychology laboratory at the University of Leipzig, Germany. This marks the official starting point of psychology as a separate scientific discipline.",
                icon: "🎓"
              },
              {
                title: "Separating from Philosophy",
                content: "Before Wundt, questions about the mind were part of philosophy. Wundt believed that mental processes could be studied systematically and scientifically, just like physics or chemistry.",
                icon: "🔬"
              },
              {
                title: "Structuralism",
                content: "Wundt aimed to break down consciousness into its basic elements - sensations, images, and feelings - and understand how these combine to create experiences.",
                icon: "🧩"
              },
              {
                title: "Controlled Observation",
                content: "Wundt emphasized that psychology should use systematic, controlled methods. He recorded participants' reactions and experiences under standardized conditions.",
                icon: "📊"
              }
            ]}
            isPresentation={isPresentation}
            themeColor={theme.color}
          />
        </div>
      )
    },

    // Slide 4: Introspection
    {
      type: 'teach',
      content: (
        <div className="flex flex-col items-center justify-center h-full">
          <PhaseHeader
            phaseName="Teach"
            title="Introspection: Looking Within"
            icon={<Lightbulb size={28} />}
            time="8 mins"
            themeColor={theme.color}
            isPresentation={isPresentation}
          />
          <SpotlightCards
            isPresentation={isPresentation}
            cards={[
              {
                id: 'what',
                title: 'What is Introspection?',
                content: 'A systematic method where trained participants examine and report their own conscious experiences, thoughts, and feelings.',
                icon: '🔍',
                color: 'indigo',
                details: [
                  'Participants were trained for months before studies',
                  'Required reporting immediate sensations without interpretation',
                  'Focus on the "what" of experience, not the "why"'
                ]
              },
              {
                id: 'process',
                title: 'The Process',
                content: 'Participants were presented with stimuli (sounds, visual objects) and asked to describe their sensory experiences in detail.',
                icon: '⚙️',
                color: 'cyan',
                details: [
                  'Strict laboratory conditions to ensure consistency',
                  'Same stimulus presented multiple times',
                  'Detailed verbal reports were recorded and analyzed'
                ]
              },
              {
                id: 'goal',
                title: 'The Goal',
                content: 'To identify the building blocks of consciousness and understand how the mind constructs experience from basic elements.',
                icon: '🎯',
                color: 'amber',
                details: [
                  'Break consciousness into smallest parts',
                  'Discover universal laws of the mind',
                  'Create a "periodic table" of mental elements'
                ]
              },
              {
                id: 'limitations',
                title: 'Limitations',
                content: 'Introspection produced variable results and could not access unconscious processes or be independently verified.',
                icon: '⚠️',
                color: 'red',
                details: [
                  'Different labs got different results',
                  'Subjective - only the participant knows their experience',
                  'Cannot study mental processes that happen automatically'
                ]
              }
            ]}
          />
        </div>
      )
    },

    // Slide 5: Understanding Check
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
                question: 'In what year did Wundt establish the first psychology laboratory?',
                options: ['1859', '1869', '1879', '1889'],
                correctIndex: 2,
                feedback: 'Wundt opened his laboratory in Leipzig, Germany in 1879, marking the birth of psychology as a science.'
              },
              {
                id: 'uc2',
                type: 'mcq',
                question: 'What was the main goal of introspection?',
                options: [
                  'To study unconscious thoughts',
                  'To break down consciousness into basic elements',
                  'To predict future behavior',
                  'To compare humans and animals'
                ],
                correctIndex: 1,
                feedback: 'Introspection aimed to identify the basic building blocks of consciousness - sensations, images, and feelings.'
              },
              {
                id: 'uc3',
                type: 'mcq',
                question: 'Which is a limitation of introspection as a research method?',
                options: [
                  'It was too expensive to conduct',
                  'Results varied between different laboratories',
                  'It required too much technology',
                  'Participants could not be trained properly'
                ],
                correctIndex: 1,
                feedback: 'Introspection produced inconsistent results - different laboratories studying the same phenomena reported different findings.'
              }
            ]}
            isPresentation={isPresentation}
            themeColor={theme.color}
          />
        </div>
      )
    },

    // Slide 6: Evidence Grid
    {
      type: 'evidence',
      content: (
        <div className="flex flex-col items-center justify-center h-full">
          <PhaseHeader
            phaseName="Evaluate"
            title="Evaluating Wundt's Contribution"
            icon={<Target size={28} />}
            time="6 mins"
            themeColor={theme.color}
            isPresentation={isPresentation}
          />
          <EvidenceGrid
            topic="Wundt's approach to psychology"
            isPresentation={isPresentation}
            evidence={[
              {
                id: 'e1',
                type: 'support',
                study: 'Scientific Methods',
                finding: 'Wundt introduced systematic, controlled observation to the study of the mind, establishing psychology as distinct from philosophy.',
                evaluation: 'This was revolutionary - it transformed vague philosophical speculation into testable hypotheses and replicable methods.'
              },
              {
                id: 'e2',
                type: 'support',
                study: 'Training & Standardization',
                finding: 'Participants were rigorously trained, and conditions were carefully controlled to ensure consistency.',
                evaluation: 'These practices showed scientific rigor and influenced how psychological research is conducted today.'
              },
              {
                id: 'e3',
                type: 'counter',
                study: 'Replication Problems',
                finding: 'Different laboratories using introspection produced different results when studying the same phenomena.',
                evaluation: 'This lack of reliability undermined claims that psychology could be a true science using introspection.'
              },
              {
                id: 'e4',
                type: 'counter',
                study: 'Watson\'s Critique (1913)',
                finding: 'John B. Watson argued that introspection was unscientific because internal experiences cannot be objectively observed or verified.',
                evaluation: 'This criticism led to the behaviourist revolution, shifting focus to observable behaviour only.'
              },
              {
                id: 'e5',
                type: 'mixed',
                study: 'Legacy',
                finding: 'While introspection was abandoned, Wundt\'s emphasis on systematic methods and controlled conditions remains fundamental to psychology.',
                evaluation: 'The method failed but the scientific approach succeeded - showing that good science sometimes involves discarding flawed techniques.'
              }
            ]}
          />
        </div>
      )
    },

    // Slide 7: Evaluation Points
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
                title: 'Scientific Foundation',
                content: 'Wundt established psychology as a discipline separate from philosophy by using controlled, systematic methods. This laid the groundwork for modern psychological research.'
              },
              {
                id: 'str2',
                category: 'strength',
                title: 'Influenced Future Methods',
                content: 'While introspection itself was abandoned, Wundt\'s emphasis on standardized conditions, trained participants, and careful recording influenced how experiments are conducted today.'
              },
              {
                id: 'lim1',
                category: 'limitation',
                title: 'Lack of Objectivity',
                content: 'Introspection relies on subjective reports that cannot be independently verified. There is no way to know if participants are accurately reporting their experiences.'
              },
              {
                id: 'lim2',
                category: 'limitation',
                title: 'Cannot Access Unconscious',
                content: 'Introspection can only examine conscious experiences. Many mental processes (memory retrieval, perception) happen automatically without conscious awareness.'
              }
            ]}
          />
        </div>
      )
    },

    // Slide 8: Interactive Simulation
    {
      type: 'interactive',
      content: (
        <div className="flex flex-col items-center justify-center h-full">
          <PhaseHeader
            phaseName="Apply"
            title="Introspection Lab"
            icon={<Play size={28} />}
            time="10 mins"
            themeColor={theme.color}
            isPresentation={isPresentation}
          />
          <IntrospectionSimulator themeColor={theme.color} isPresentation={isPresentation} />
        </div>
      )
    },

    // Slide 9: Summary & Extended Task
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
            {/* Summary */}
            <div className={`bg-${theme.color}-900/30 border border-${theme.color}-500/50 rounded-2xl ${isPresentation ? 'p-8' : 'p-6'}`}>
              <h3 className={`text-${theme.color}-400 font-bold mb-4 ${isPresentation ? 'text-2xl lg:text-3xl' : 'text-xl'}`}>📝 Key Takeaways</h3>
              <ul className={`${isPresentation ? 'space-y-4 text-xl lg:text-2xl' : 'space-y-3'} text-gray-300`}>
                <li className="flex items-start gap-2">
                  <span className={`text-${theme.color}-400`}>•</span>
                  Wundt opened the first psychology lab in 1879
                </li>
                <li className="flex items-start gap-2">
                  <span className={`text-${theme.color}-400`}>•</span>
                  Introspection = systematic self-examination of conscious experience
                </li>
                <li className="flex items-start gap-2">
                  <span className={`text-${theme.color}-400`}>•</span>
                  Structuralism aimed to break down consciousness into basic elements
                </li>
                <li className="flex items-start gap-2">
                  <span className={`text-${theme.color}-400`}>•</span>
                  Limitations: subjective, unreliable, can't access unconscious
                </li>
                <li className="flex items-start gap-2">
                  <span className={`text-${theme.color}-400`}>•</span>
                  Legacy: established scientific approach despite method failure
                </li>
              </ul>
            </div>

            {/* Extended Task */}
            <div className={`bg-amber-900/30 border border-amber-500/50 rounded-2xl ${isPresentation ? 'p-8' : 'p-6'}`}>
              <h3 className={`text-amber-400 font-bold mb-4 ${isPresentation ? 'text-2xl lg:text-3xl' : 'text-xl'}`}>🎯 Extended Task</h3>
              <div className={`text-gray-300 ${isPresentation ? 'space-y-6' : 'space-y-4'}`}>
                <p className={`font-medium ${isPresentation ? 'text-xl lg:text-2xl' : ''}`}>
                  Write a 6-mark answer to the following question:
                </p>
                <div className={`bg-gray-800/50 rounded-xl ${isPresentation ? 'p-6' : 'p-4'} border-l-4 border-amber-500`}>
                  <p className={`text-white font-medium ${isPresentation ? 'text-xl lg:text-2xl' : ''}`}>
                    "Outline and briefly evaluate Wundt's contribution to the emergence of psychology as a science." (6 marks)
                  </p>
                </div>
                <MarkingRubricReveal title="📋 Click to Reveal Marking Guidance" themeColor="amber" isPresentation={isPresentation}>
                  <ul className={`${isPresentation ? 'space-y-4 text-lg lg:text-xl' : 'space-y-2 text-sm'} text-gray-300`}>
                    <li><strong className="text-blue-400">AO1 (3-4 marks):</strong> First psychology lab (1879), introspection method, structuralism, trained observers</li>
                    <li><strong className="text-green-400">AO3 (2-3 marks):</strong> Scientific approach established, but methods subjective/unreliable</li>
                    <li><strong className="text-gray-400">Tip:</strong> Include specific examples and evaluate both contributions and limitations</li>
                  </ul>
                </MarkingRubricReveal>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ], [isPresentation, theme.color]);

  // Render current slide
  return (
    <Slide isPresentation={isPresentation}>
      {slides[currentSlide]?.content}
    </Slide>
  );
}

export const lesson1SlideCount = 10;
