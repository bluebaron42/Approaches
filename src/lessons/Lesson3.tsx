import React, { useMemo, useState } from 'react';
import { Lightbulb, BookOpen, Target, Users, ChevronDown, ChevronUp, Play } from 'lucide-react';
import Slide from '../components/Slide';
import PhaseHeader from '../components/PhaseHeader';
import DoNowQuiz from '../components/DoNowQuiz';
import UnderstandingCheck from '../components/UnderstandingCheck';
import SpotlightCards from '../components/SpotlightCards';
import StepReveal from '../components/StepReveal';
import AccordionSections from '../components/AccordionSections';
import ClickToReveal from '../components/ClickToReveal';
import { BoboDollSimulator } from '../components/simulations';
import { lesson3DoNow, lessonThemes } from '../constants';

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

interface Lesson3Props {
  isPresentation: boolean;
  currentSlide: number;
}

export default function Lesson3({ isPresentation, currentSlide }: Lesson3Props) {
  const theme = lessonThemes[3];
  
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
            Social Learning Theory
          </h1>
          <p className={`text-gray-400 ${isPresentation ? 'text-3xl lg:text-4xl max-w-4xl' : 'text-2xl max-w-2xl'}`}>
            Bandura, Observation, and Vicarious Reinforcement
          </p>
          <div className={`mt-12 flex items-center gap-4 text-${theme.color}-400`}>
            <Users size={32} />
            <span className="text-xl">Lesson 3 of 8</span>
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
            questions={lesson3DoNow}
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
                Explain how Social Learning Theory differs from behaviourism
              </li>
              <li className="flex items-start gap-3 text-gray-200">
                <span className={`text-${theme.color}-400 font-bold`}>2.</span>
                Describe vicarious reinforcement and its role in learning
              </li>
              <li className="flex items-start gap-3 text-gray-200">
                <span className={`text-${theme.color}-400 font-bold`}>3.</span>
                Explain the four mediational processes (ARRM)
              </li>
              <li className="flex items-start gap-3 text-gray-200">
                <span className={`text-${theme.color}-400 font-bold`}>4.</span>
                Evaluate Social Learning Theory using research evidence
              </li>
            </ul>
          </div>
        </div>
      )
    },

    // Slide 3: SLT vs Behaviourism
    {
      type: 'teach',
      content: (
        <div className="flex flex-col items-center justify-center h-full">
          <PhaseHeader
            phaseName="Teach"
            title="SLT: A Bridge Between Approaches"
            icon={<Lightbulb size={28} />}
            time="6 mins"
            themeColor={theme.color}
            isPresentation={isPresentation}
          />
          <SpotlightCards
            isPresentation={isPresentation}
            cards={[
              {
                id: 'behaviourist',
                title: 'Behaviourist Roots',
                content: 'SLT agrees that behaviour is learned from the environment, not innate. Like behaviourism, it emphasizes the importance of conditioning.',
                icon: '🔗',
                color: 'cyan',
                details: [
                  'Still based on learning from environment',
                  'Recognises role of reinforcement',
                  'Built on conditioning principles'
                ]
              },
              {
                id: 'cognitive',
                title: 'Cognitive Bridge',
                content: 'Unlike behaviourism, SLT proposes that mental processes play a crucial role in learning. We think about what we observe.',
                icon: '🧠',
                color: 'amber',
                details: [
                  'Includes mediational (cognitive) processes',
                  'People actively process information',
                  'Learning isn\'t automatic or passive'
                ]
              },
              {
                id: 'observation',
                title: 'Observational Learning',
                content: 'Learning can occur simply by watching others - we don\'t need to be directly reinforced ourselves to learn new behaviours.',
                icon: '👁️',
                color: 'green',
                details: [
                  'Watch models perform behaviours',
                  'No direct experience needed',
                  'Can learn without doing'
                ]
              },
              {
                id: 'imitation',
                title: 'Imitation',
                content: 'The observed behaviour may later be imitated (copied) by the observer, especially if the model was reinforced.',
                icon: '🪞',
                color: 'purple',
                details: [
                  'Copying what we see',
                  'More likely if model was rewarded',
                  'Less likely if model was punished'
                ]
              }
            ]}
          />
        </div>
      )
    },

    // Slide 4: Vicarious Reinforcement
    {
      type: 'teach',
      content: (
        <div className="flex flex-col items-center justify-center h-full">
          <PhaseHeader
            phaseName="Teach"
            title="Vicarious Reinforcement"
            icon={<Lightbulb size={28} />}
            time="6 mins"
            themeColor={theme.color}
            isPresentation={isPresentation}
          />
          <div className="max-w-3xl w-full">
            <div className={`bg-${theme.color}-900/30 border border-${theme.color}-500/50 rounded-2xl p-8 mb-6`}>
              <h3 className={`text-${theme.color}-400 font-bold text-2xl mb-4`}>
                What is Vicarious Reinforcement?
              </h3>
              <p className={`text-gray-300 text-lg mb-4`}>
                Learning by observing the <strong className="text-white">consequences</strong> of someone else's behaviour. If we see a model being <span className="text-green-400">rewarded</span>, we're more likely to imitate. If we see them being <span className="text-red-400">punished</span>, we're less likely.
              </p>
              <p className="text-gray-400">
                "Vicarious" means experienced through someone else rather than directly.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-900/30 border border-green-500/50 rounded-xl p-6">
                <h4 className="text-green-400 font-bold mb-3">✓ Vicarious Reward</h4>
                <p className="text-gray-300 text-sm mb-3">
                  Child sees older sibling praised for helping with chores → child starts helping more
                </p>
                <p className="text-gray-400 text-sm">
                  <strong>Effect:</strong> More likely to imitate
                </p>
              </div>
              
              <div className="bg-red-900/30 border border-red-500/50 rounded-xl p-6">
                <h4 className="text-red-400 font-bold mb-3">✗ Vicarious Punishment</h4>
                <p className="text-gray-300 text-sm mb-3">
                  Child sees classmate told off for shouting out → child doesn't shout out
                </p>
                <p className="text-gray-400 text-sm">
                  <strong>Effect:</strong> Less likely to imitate
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 5: Mediational Processes (ARRM)
    {
      type: 'teach',
      content: (
        <div className="flex flex-col items-center justify-center h-full">
          <PhaseHeader
            phaseName="Teach"
            title="Mediational Processes: ARRM"
            icon={<Lightbulb size={28} />}
            time="8 mins"
            themeColor={theme.color}
            isPresentation={isPresentation}
          />
          <StepReveal
            steps={[
              {
                title: "Attention",
                content: "The observer must notice and pay attention to the model's behaviour. We're more likely to attend to models who are similar to us, attractive, high status, or who we admire.",
                icon: "👀"
              },
              {
                title: "Retention",
                content: "The observed behaviour must be remembered (stored in memory) so it can be recalled later. We form mental representations of the behaviour.",
                icon: "🧠"
              },
              {
                title: "Reproduction",
                content: "The observer must be physically and mentally capable of reproducing the behaviour. You can't imitate a behaviour if you lack the skills or ability.",
                icon: "🎭"
              },
              {
                title: "Motivation",
                content: "There must be a reason to perform the behaviour. This is where vicarious reinforcement comes in - if the model was rewarded, we're motivated to copy.",
                icon: "⚡"
              }
            ]}
            isPresentation={isPresentation}
            themeColor={theme.color}
            title="The 4 Mediational Processes (Remember: ARRM)"
          />
        </div>
      )
    },

    // Slide 6: Understanding Check
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
                question: 'Which mediational process involves storing the observed behaviour in memory?',
                options: ['Attention', 'Retention', 'Reproduction', 'Motivation'],
                correctIndex: 1,
                feedback: 'Retention is about memory - we must be able to remember what we observed so we can reproduce it later.'
              },
              {
                id: 'uc2',
                type: 'scenario',
                question: 'A child watches their favourite footballer score and get celebrated. The child then practices the same move. What influenced their motivation?',
                options: [
                  'Direct reinforcement',
                  'Vicarious reinforcement',
                  'Classical conditioning',
                  'Negative reinforcement'
                ],
                correctIndex: 1,
                feedback: 'The child saw the footballer being rewarded (celebrated), which vicariously reinforced the behaviour and motivated imitation.'
              },
              {
                id: 'uc3',
                type: 'mcq',
                question: 'How does SLT differ from traditional behaviourism?',
                options: [
                  'It rejects the idea that behaviour is learned',
                  'It includes cognitive/mental processes',
                  'It doesn\'t believe in reinforcement',
                  'It only studies animals'
                ],
                correctIndex: 1,
                feedback: 'SLT is a "bridge" between behaviourism and cognitive psychology because it includes mediational (cognitive) processes like attention and retention.'
              }
            ]}
            isPresentation={isPresentation}
            themeColor={theme.color}
          />
        </div>
      )
    },

    // Slide 7: Bobo Doll Study
    {
      type: 'evidence',
      content: (
        <div className="flex flex-col items-center justify-center h-full">
          <PhaseHeader
            phaseName="Research"
            title="Bandura's Bobo Doll Studies"
            icon={<Target size={28} />}
            time="8 mins"
            themeColor={theme.color}
            isPresentation={isPresentation}
          />
          <AccordionSections
            isPresentation={isPresentation}
            themeColor={theme.color}
            items={[
              {
                id: 'aim',
                title: 'Aim',
                icon: '🎯',
                content: (
                  <p className="text-gray-300">
                    To investigate whether children would imitate aggressive behaviour they observed in an adult model, and whether consequences to the model would affect imitation.
                  </p>
                )
              },
              {
                id: 'procedure',
                title: 'Procedure',
                icon: '⚙️',
                content: (
                  <ul className="space-y-2 text-gray-300">
                    <li>• Children (aged 3-6) watched an adult model interact with a Bobo doll</li>
                    <li>• Aggressive condition: Model punched, kicked, and verbally abused the doll</li>
                    <li>• Non-aggressive condition: Model played calmly with other toys</li>
                    <li>• Some children saw the model rewarded, punished, or no consequences</li>
                    <li>• Children then played in a room with the Bobo doll while observed</li>
                  </ul>
                )
              },
              {
                id: 'findings',
                title: 'Findings',
                icon: '📊',
                content: (
                  <ul className="space-y-2 text-gray-300">
                    <li>• Children who saw aggression imitated aggressive behaviours</li>
                    <li>• Children who saw non-aggressive model showed little aggression</li>
                    <li>• Children who saw model <span className="text-green-400">rewarded</span> showed MOST aggression</li>
                    <li>• Children who saw model <span className="text-red-400">punished</span> showed LESS aggression</li>
                    <li>• Boys showed more physical aggression than girls</li>
                  </ul>
                )
              },
              {
                id: 'conclusions',
                title: 'Conclusions',
                icon: '💡',
                content: (
                  <ul className="space-y-2 text-gray-300">
                    <li>• Children can learn aggression through observation alone</li>
                    <li>• Vicarious reinforcement affects likelihood of imitation</li>
                    <li>• Supports SLT - observational learning and mediational processes are real</li>
                  </ul>
                )
              }
            ]}
          />
        </div>
      )
    },

    // Slide 8: Evaluation Points
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
                title: 'Cognitive Element',
                content: 'SLT goes beyond behaviourism by including mental processes. This makes it more complete as an explanation of learning, accounting for the role of thinking.'
              },
              {
                id: 'str2',
                category: 'strength',
                title: 'Research Support',
                content: 'The Bobo doll studies provide strong experimental evidence for observational learning and vicarious reinforcement in controlled conditions.'
              },
              {
                id: 'lim1',
                category: 'limitation',
                title: 'Demand Characteristics',
                content: 'Children in Bobo doll studies may have known what was expected of them. The doll is designed to be hit - this may not reflect real-world aggression.'
              },
              {
                id: 'lim2',
                category: 'limitation',
                title: 'Underestimates Biology',
                content: 'SLT focuses on learning and ignores biological influences on behaviour. Some behaviours (e.g., aggression) may have a genetic or hormonal basis.'
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
            title="Bobo Doll Experiment"
            icon={<Play size={28} />}
            time="10 mins"
            themeColor={theme.color}
            isPresentation={isPresentation}
          />
          <BoboDollSimulator themeColor={theme.color} isPresentation={isPresentation} />
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
                <li>• SLT = bridge between behaviourism and cognitive psychology</li>
                <li>• Observational learning: we learn by watching others</li>
                <li>• Vicarious reinforcement: learning from others' consequences</li>
                <li>• ARRM: Attention, Retention, Reproduction, Motivation</li>
                <li>• Bobo doll: children imitate observed aggression</li>
                <li>• Cognitive processes mediate between stimulus and response</li>
              </ul>
            </div>

            <div className={`bg-amber-900/30 border border-amber-500/50 rounded-2xl ${isPresentation ? 'p-8' : 'p-6'}`}>
              <h3 className={`text-amber-400 font-bold mb-4 ${isPresentation ? 'text-2xl lg:text-3xl' : 'text-xl'}`}>🎯 Extended Task</h3>
              <div className={`text-gray-300 ${isPresentation ? 'space-y-6' : 'space-y-4'}`}>
                <p className={`font-medium ${isPresentation ? 'text-xl lg:text-2xl' : ''}`}>
                  Write an 8-mark answer:
                </p>
                <div className="bg-gray-800/50 rounded-xl p-4 border-l-4 border-amber-500">
                  <p className="text-white font-medium">
                    "Outline and evaluate Social Learning Theory." (8 marks)
                  </p>
                </div>
                <MarkingRubricReveal title="📋 Click to Reveal Marking Guidance" themeColor="amber" isPresentation={isPresentation}>
                  <ul className={`${isPresentation ? 'space-y-4 text-lg lg:text-xl' : 'space-y-2 text-sm'} text-gray-300`}>
                    <li><strong className="text-blue-400">AO1 (4 marks):</strong> Vicarious reinforcement, ARRM mediational processes, identification with models, role of observation</li>
                    <li><strong className="text-green-400">AO3 (4 marks):</strong> Bobo doll research support, acknowledges cognitive factors, but lacks biological explanation, lab studies lack ecological validity</li>
                    <li><strong className="text-gray-400">Tip:</strong> Explicitly reference Bandura's research as AO3 evidence</li>
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

export const lesson3SlideCount = 11;
