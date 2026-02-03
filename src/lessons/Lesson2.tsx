import React, { useMemo, useState } from 'react';
import { Lightbulb, BookOpen, Target, ChevronDown, ChevronUp, Play } from 'lucide-react';
import Slide from '../components/Slide';
import PhaseHeader from '../components/PhaseHeader';
import DoNowQuiz from '../components/DoNowQuiz';
import UnderstandingCheck from '../components/UnderstandingCheck';
import SpotlightCards from '../components/SpotlightCards';
import StepReveal from '../components/StepReveal';
import CarouselNavigator from '../components/CarouselNavigator';
import EvidenceGrid from '../components/EvidenceGrid';
import ClickToReveal from '../components/ClickToReveal';
import { ConditioningLab } from '../components/simulations';
import { lesson2DoNow, lessonThemes } from '../constants';

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

interface Lesson2Props {
  isPresentation: boolean;
  currentSlide: number;
}

export default function Lesson2({ isPresentation, currentSlide }: Lesson2Props) {
  const theme = lessonThemes[2];
  
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
            The Behaviourist Approach
          </h1>
          <p className={`text-gray-400 ${isPresentation ? 'text-3xl lg:text-4xl max-w-4xl' : 'text-2xl max-w-2xl'}`}>
            Classical Conditioning, Operant Conditioning, and Learning
          </p>
          <div className={`mt-12 flex items-center gap-4 text-${theme.color}-400`}>
            <BookOpen size={32} />
            <span className="text-xl">Lesson 2 of 8</span>
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
            questions={lesson2DoNow}
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
                Explain the key assumptions of the behaviourist approach
              </li>
              <li className="flex items-start gap-3 text-gray-200">
                <span className={`text-${theme.color}-400 font-bold`}>2.</span>
                Describe classical conditioning and Pavlov's research
              </li>
              <li className="flex items-start gap-3 text-gray-200">
                <span className={`text-${theme.color}-400 font-bold`}>3.</span>
                Explain operant conditioning and types of reinforcement
              </li>
              <li className="flex items-start gap-3 text-gray-200">
                <span className={`text-${theme.color}-400 font-bold`}>4.</span>
                Evaluate the behaviourist approach
              </li>
            </ul>
          </div>
        </div>
      )
    },

    // Slide 3: Behaviourist Assumptions
    {
      type: 'teach',
      content: (
        <div className="flex flex-col items-center justify-center h-full">
          <PhaseHeader
            phaseName="Teach"
            title="Behaviourist Assumptions"
            icon={<Lightbulb size={28} />}
            time="6 mins"
            themeColor={theme.color}
            isPresentation={isPresentation}
          />
          <SpotlightCards
            isPresentation={isPresentation}
            cards={[
              {
                id: 'observable',
                title: 'Focus on Observable Behaviour',
                content: 'Psychology should only study behaviour that can be seen and measured. Internal mental processes cannot be scientifically studied.',
                icon: '👁️',
                color: 'cyan',
                details: [
                  'Rejected introspection as unscientific',
                  'Behaviour = everything we think, say, and do',
                  'If it can\'t be observed, it can\'t be measured'
                ]
              },
              {
                id: 'environment',
                title: 'Environment Determines Behaviour',
                content: 'All behaviour is learned from the environment through conditioning. We are born as a "blank slate" (tabula rasa).',
                icon: '🌍',
                color: 'green',
                details: [
                  'Nurture over nature',
                  'No innate tendencies determine behaviour',
                  'Anyone can be trained to do anything'
                ]
              },
              {
                id: 'animals',
                title: 'Animal Studies',
                content: 'Laws of learning apply equally to humans and animals, so we can study animals and apply findings to humans.',
                icon: '🐕',
                color: 'amber',
                details: [
                  'Animals are easier to control experimentally',
                  'Simpler behaviour allows clearer conclusions',
                  'Ethical benefits of not testing on humans'
                ]
              },
              {
                id: 'scientific',
                title: 'Scientific Methods',
                content: 'Behaviourism emphasizes controlled laboratory experiments that can be objectively measured and replicated.',
                icon: '🔬',
                color: 'blue',
                details: [
                  'High control over variables',
                  'Can establish cause and effect',
                  'Results can be verified by other researchers'
                ]
              }
            ]}
          />
        </div>
      )
    },

    // Slide 4: Classical Conditioning
    {
      type: 'teach',
      content: (
        <div className="flex flex-col items-center justify-center h-full">
          <PhaseHeader
            phaseName="Teach"
            title="Classical Conditioning: Pavlov's Dogs"
            icon={<Lightbulb size={28} />}
            time="8 mins"
            themeColor={theme.color}
            isPresentation={isPresentation}
          />
          <StepReveal
            steps={[
              {
                title: "Before Conditioning",
                content: "Food (Unconditioned Stimulus/UCS) naturally produces salivation (Unconditioned Response/UCR). A bell is a neutral stimulus that produces no salivation.",
                icon: "1️⃣"
              },
              {
                title: "During Conditioning",
                content: "The bell is repeatedly paired with the food. The bell is presented just before the food many times.",
                icon: "2️⃣"
              },
              {
                title: "After Conditioning",
                content: "The bell alone (now a Conditioned Stimulus/CS) produces salivation (now a Conditioned Response/CR). The dog has learned to associate bell → food.",
                icon: "3️⃣"
              },
              {
                title: "Key Point",
                content: "A previously neutral stimulus becomes associated with an unconditioned stimulus, eventually triggering a conditioned response. This is learning through association.",
                icon: "💡"
              }
            ]}
            isPresentation={isPresentation}
            themeColor={theme.color}
            title="The Process of Classical Conditioning"
          />
        </div>
      )
    },

    // Slide 5: Operant Conditioning
    {
      type: 'teach',
      content: (
        <div className="flex flex-col items-center justify-center h-full">
          <PhaseHeader
            phaseName="Teach"
            title="Operant Conditioning: Skinner"
            icon={<Lightbulb size={28} />}
            time="8 mins"
            themeColor={theme.color}
            isPresentation={isPresentation}
          />
          <CarouselNavigator
            isPresentation={isPresentation}
            themeColor={theme.color}
            slides={[
              {
                title: "Operant Conditioning",
                content: "Learning through the consequences of behaviour. Behaviour that produces pleasant consequences is repeated; behaviour that produces unpleasant consequences is not.",
                icon: "⚡",
                example: "A child completes homework and receives praise → more likely to do homework again"
              },
              {
                title: "Positive Reinforcement",
                content: "A pleasant stimulus is given AFTER a behaviour, increasing the likelihood of that behaviour being repeated.",
                icon: "➕",
                example: "Giving a dog a treat after it sits on command → dog sits more often",
                color: "green"
              },
              {
                title: "Negative Reinforcement",
                content: "An unpleasant stimulus is REMOVED after a behaviour, increasing the likelihood of that behaviour being repeated.",
                icon: "➖",
                example: "Taking painkillers removes headache → more likely to take painkillers when in pain",
                color: "blue"
              },
              {
                title: "Punishment",
                content: "An unpleasant consequence follows a behaviour, decreasing the likelihood of that behaviour being repeated.",
                icon: "🚫",
                example: "Child is given detention for misbehaving → less likely to misbehave",
                color: "red"
              },
              {
                title: "The Skinner Box",
                content: "Skinner used specially designed cages where rats or pigeons could press levers for food rewards or to avoid electric shocks, demonstrating operant conditioning principles.",
                icon: "📦",
                example: "Rat presses lever → food pellet released → rat learns to press lever more"
              }
            ]}
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
                question: 'In classical conditioning, what is the bell called AFTER conditioning?',
                options: ['Unconditioned Stimulus', 'Neutral Stimulus', 'Conditioned Stimulus', 'Conditioned Response'],
                correctIndex: 2,
                feedback: 'After conditioning, the bell becomes the Conditioned Stimulus (CS) because it now triggers a learned response.'
              },
              {
                id: 'uc2',
                type: 'mcq',
                question: 'Which type of reinforcement involves REMOVING an unpleasant stimulus?',
                options: ['Positive reinforcement', 'Negative reinforcement', 'Positive punishment', 'Negative punishment'],
                correctIndex: 1,
                feedback: 'Negative reinforcement increases behaviour by removing something unpleasant (negative = removal, reinforcement = increases behaviour).'
              },
              {
                id: 'uc3',
                type: 'scenario',
                question: 'A student studies hard and receives an A grade, so they continue studying hard. What type of learning is this?',
                options: ['Classical conditioning', 'Positive reinforcement', 'Negative reinforcement', 'Punishment'],
                correctIndex: 1,
                feedback: 'The A grade is a pleasant stimulus GIVEN after the behaviour (studying), which increases the behaviour. This is positive reinforcement.'
              }
            ]}
            isPresentation={isPresentation}
            themeColor={theme.color}
          />
        </div>
      )
    },

    // Slide 7: Evidence Grid
    {
      type: 'evidence',
      content: (
        <div className="flex flex-col items-center justify-center h-full">
          <PhaseHeader
            phaseName="Evaluate"
            title="Research Evidence"
            icon={<Target size={28} />}
            time="6 mins"
            themeColor={theme.color}
            isPresentation={isPresentation}
          />
          <EvidenceGrid
            topic="The Behaviourist Approach"
            isPresentation={isPresentation}
            evidence={[
              {
                id: 'e1',
                type: 'support',
                study: 'Pavlov (1897)',
                finding: 'Dogs learned to salivate to a bell through repeated pairing with food, demonstrating classical conditioning.',
                evaluation: 'Highly controlled lab experiment with clear cause-effect. However, learning in real life may be more complex than in a lab.'
              },
              {
                id: 'e2',
                type: 'support',
                study: 'Skinner (1938)',
                finding: 'Rats and pigeons in Skinner boxes learned to press levers for food rewards, demonstrating operant conditioning.',
                evaluation: 'Scientific and replicable. But animal learning may not fully represent human learning.'
              },
              {
                id: 'e3',
                type: 'support',
                study: 'Watson & Rayner (1920) - Little Albert',
                finding: 'A baby was conditioned to fear a white rat by pairing it with a loud noise, showing classical conditioning in humans.',
                evaluation: 'Demonstrates conditioning in humans. However, ethically problematic and only one participant.'
              },
              {
                id: 'e4',
                type: 'counter',
                study: 'Biological Preparedness (Seligman)',
                finding: 'Some associations are learned more easily than others (e.g., fear of snakes vs fear of flowers), suggesting some behaviours may be innate.',
                evaluation: 'Challenges the "blank slate" assumption - we may be biologically prepared to learn certain things.'
              },
              {
                id: 'e5',
                type: 'counter',
                study: 'Cognitive Factors',
                finding: 'Tolman\'s research on rats showed they could form "cognitive maps" of mazes, suggesting mental processes affect learning.',
                evaluation: 'Suggests behaviourism is too simplistic - internal mental processes do influence behaviour.'
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
                title: 'Scientific Credibility',
                content: 'Behaviourism brought scientific methods to psychology - controlled experiments, objectivity, and measurable variables. This established psychology as a credible science.'
              },
              {
                id: 'str2',
                category: 'strength',
                title: 'Real-World Applications',
                content: 'Conditioning principles have many practical uses: token economies in prisons/hospitals, systematic desensitisation for phobias, and training/education techniques.'
              },
              {
                id: 'lim1',
                category: 'limitation',
                title: 'Environmental Determinism',
                content: 'Behaviourism suggests all behaviour is caused by past conditioning, leaving no room for free will. This is seen as oversimplified and ignores human agency.'
              },
              {
                id: 'lim2',
                category: 'limitation',
                title: 'Ignores Internal Processes',
                content: 'By focusing only on observable behaviour, behaviourism ignores thoughts, emotions, and biological factors that clearly influence behaviour.'
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
            title="Conditioning Lab"
            icon={<Play size={28} />}
            time="10 mins"
            themeColor={theme.color}
            isPresentation={isPresentation}
          />
          <ConditioningLab themeColor={theme.color} isPresentation={isPresentation} />
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
                <li>• Focus on observable, measurable behaviour only</li>
                <li>• Classical conditioning: learning through association (Pavlov)</li>
                <li>• Operant conditioning: learning through consequences (Skinner)</li>
                <li>• Reinforcement increases behaviour; punishment decreases it</li>
                <li>• Strengths: Scientific, practical applications</li>
                <li>• Limitations: Deterministic, ignores mental processes</li>
              </ul>
            </div>

            <div className={`bg-amber-900/30 border border-amber-500/50 rounded-2xl ${isPresentation ? 'p-8' : 'p-6'}`}>
              <h3 className={`text-amber-400 font-bold mb-4 ${isPresentation ? 'text-2xl lg:text-3xl' : 'text-xl'}`}>🎯 Extended Task</h3>
              <div className={`text-gray-300 ${isPresentation ? 'space-y-6' : 'space-y-4'}`}>
                <p className={`font-medium ${isPresentation ? 'text-xl lg:text-2xl' : ''}`}>
                  Write a 6-mark answer:
                </p>
                <div className={`bg-gray-800/50 rounded-xl ${isPresentation ? 'p-6' : 'p-4'} border-l-4 border-amber-500`}>
                  <p className={`text-white font-medium ${isPresentation ? 'text-xl lg:text-2xl' : ''}`}>
                    "Outline the differences between classical and operant conditioning." (6 marks)
                  </p>
                </div>
                <MarkingRubricReveal title="📋 Click to Reveal Marking Guidance" themeColor="amber" isPresentation={isPresentation}>
                  <ul className={`${isPresentation ? 'space-y-4 text-lg lg:text-xl' : 'space-y-2 text-sm'} text-gray-300`}>
                    <li><strong className="text-blue-400">Classical (3 marks):</strong> Learning through association, Pavlov, UCS/UCR/NS/CS/CR, involuntary responses</li>
                    <li><strong className="text-green-400">Operant (3 marks):</strong> Learning through consequences, Skinner, reinforcement/punishment, voluntary behaviour</li>
                    <li><strong className="text-gray-400">Tip:</strong> Use clear examples (salivating dogs vs. Skinner box) to illustrate differences</li>
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

export const lesson2SlideCount = 11;
