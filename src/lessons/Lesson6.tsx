import React, { useMemo, useState } from 'react';
import { Lightbulb, BookOpen, Target, Eye, Lock, ChevronDown, ChevronUp, Play } from 'lucide-react';
import Slide from '../components/Slide';
import PhaseHeader from '../components/PhaseHeader';
import DoNowQuiz from '../components/DoNowQuiz';
import UnderstandingCheck from '../components/UnderstandingCheck';
import SpotlightCards from '../components/SpotlightCards';
import CarouselNavigator from '../components/CarouselNavigator';
import AccordionSections from '../components/AccordionSections';
import ClickToReveal from '../components/ClickToReveal';
import { DefenceMechanismSimulator } from '../components/simulations';
import { lesson6DoNow, lessonThemes } from '../constants';

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

interface Lesson6Props {
  isPresentation: boolean;
  currentSlide: number;
}

export default function Lesson6({ isPresentation, currentSlide }: Lesson6Props) {
  const theme = lessonThemes[6];
  
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
            The Psychodynamic Approach
          </h1>
          <p className={`text-gray-400 ${isPresentation ? 'text-3xl lg:text-4xl max-w-4xl' : 'text-2xl max-w-2xl'}`}>
            Freud, the Unconscious, and Psychosexual Development
          </p>
          <div className={`mt-12 flex items-center gap-4 text-${theme.color}-400`}>
            <Eye size={32} />
            <span className="text-xl">Lesson 6 of 8</span>
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
            questions={lesson6DoNow}
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
                Explain the role of the unconscious mind
              </li>
              <li className="flex items-start gap-3 text-gray-200">
                <span className={`text-${theme.color}-400 font-bold`}>2.</span>
                Describe the structure of personality (Id, Ego, Superego)
              </li>
              <li className="flex items-start gap-3 text-gray-200">
                <span className={`text-${theme.color}-400 font-bold`}>3.</span>
                Outline the psychosexual stages and defence mechanisms
              </li>
              <li className="flex items-start gap-3 text-gray-200">
                <span className={`text-${theme.color}-400 font-bold`}>4.</span>
                Evaluate the psychodynamic approach
              </li>
            </ul>
          </div>
        </div>
      )
    },

    // Slide 3: The Unconscious Mind
    {
      type: 'teach',
      content: (
        <div className="flex flex-col items-center justify-center h-full">
          <PhaseHeader
            phaseName="Teach"
            title="The Unconscious Mind"
            icon={<Lightbulb size={28} />}
            time="6 mins"
            themeColor={theme.color}
            isPresentation={isPresentation}
          />
          <div className="max-w-3xl w-full">
            <div className={`bg-${theme.color}-900/30 border border-${theme.color}-500/50 rounded-2xl p-8 mb-6`}>
              <h3 className={`text-${theme.color}-400 font-bold text-2xl mb-4`}>
                The Iceberg Model 🧊
              </h3>
              <p className={`text-gray-300 text-lg mb-4`}>
                Freud believed the mind is like an iceberg - most of it is hidden below the surface.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-900/30 border border-blue-500/50 rounded-xl p-5">
                <h4 className="text-blue-400 font-bold mb-2">Conscious Mind (Above Water)</h4>
                <p className="text-gray-300">What we are currently aware of - thoughts, perceptions, feelings we can access right now.</p>
              </div>
              
              <div className="bg-purple-900/30 border border-purple-500/50 rounded-xl p-5">
                <h4 className="text-purple-400 font-bold mb-2">Preconscious Mind (Just Below)</h4>
                <p className="text-gray-300">Thoughts and memories not currently in awareness but can be brought to consciousness (like your phone number).</p>
              </div>
              
              <div className="bg-pink-900/30 border border-pink-500/50 rounded-xl p-5">
                <h4 className="text-pink-400 font-bold mb-2">Unconscious Mind (Deep Below)</h4>
                <p className="text-gray-300">Hidden memories, urges, and unresolved conflicts from childhood. Influences behaviour without our awareness.</p>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 4: Structure of Personality
    {
      type: 'teach',
      content: (
        <div className="flex flex-col items-center justify-center h-full">
          <PhaseHeader
            phaseName="Teach"
            title="Structure of Personality"
            icon={<Lightbulb size={28} />}
            time="8 mins"
            themeColor={theme.color}
            isPresentation={isPresentation}
          />
          <SpotlightCards
            isPresentation={isPresentation}
            columns={3}
            cards={[
              {
                id: 'id',
                title: 'The ID',
                content: 'Primitive, instinctual part. Operates on the pleasure principle - wants immediate gratification.',
                icon: '👹',
                color: 'red',
                details: [
                  'Present from birth',
                  '"I want it NOW!"',
                  'Entirely unconscious',
                  'Driven by libido (life instinct)'
                ]
              },
              {
                id: 'ego',
                title: 'The EGO',
                content: 'The rational part. Operates on the reality principle - delays gratification when necessary.',
                icon: '⚖️',
                color: 'blue',
                details: [
                  'Develops around age 2',
                  'Mediates between Id and Superego',
                  'Partly conscious',
                  'Uses defence mechanisms'
                ]
              },
              {
                id: 'superego',
                title: 'The SUPEREGO',
                content: 'Moral conscience. Represents internalised ideals and standards from parents and society.',
                icon: '😇',
                color: 'green',
                details: [
                  'Develops around age 5',
                  '"You should feel guilty!"',
                  'Strives for perfection',
                  'Punishes ego with guilt'
                ]
              }
            ]}
          />
        </div>
      )
    },

    // Slide 5: Psychosexual Stages
    {
      type: 'teach',
      content: (
        <div className="flex flex-col items-center justify-center h-full">
          <PhaseHeader
            phaseName="Teach"
            title="Psychosexual Stages"
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
                title: "Oral Stage (0-1 year)",
                content: "Focus on the mouth - sucking, biting, feeding. Fixation can lead to oral habits like smoking, nail-biting, or dependency.",
                icon: "👶",
                example: "Over-feeding may lead to oral-dependent personality",
                color: "pink"
              },
              {
                title: "Anal Stage (1-3 years)",
                content: "Focus on bowel control. Strict toilet training may create anal-retentive (obsessive, perfectionist) or anal-expulsive (messy, reckless) personality.",
                icon: "🚽",
                example: "Harsh toilet training → obsessive cleanliness",
                color: "amber"
              },
              {
                title: "Phallic Stage (3-6 years)",
                content: "Focus on genitals. Oedipus complex (boys) / Electra complex (girls) - unconscious attraction to opposite-sex parent.",
                icon: "👨‍👩‍👧",
                example: "Boy fears castration from father, identifies with him",
                color: "purple"
              },
              {
                title: "Latency Stage (6-puberty)",
                content: "Sexual feelings are dormant. Focus on school, friendships, hobbies. No fixations associated with this stage.",
                icon: "📚",
                example: "Child focuses on same-sex friendships",
                color: "blue"
              },
              {
                title: "Genital Stage (puberty onwards)",
                content: "Sexual desires reawaken with a focus on heterosexual relationships. Healthy development leads to mature adult sexuality.",
                icon: "💑",
                example: "Forming romantic relationships",
                color: "red"
              }
            ]}
          />
        </div>
      )
    },

    // Slide 6: Defence Mechanisms
    {
      type: 'teach',
      content: (
        <div className="flex flex-col items-center justify-center h-full">
          <PhaseHeader
            phaseName="Teach"
            title="Defence Mechanisms"
            icon={<Lock size={28} />}
            time="6 mins"
            themeColor={theme.color}
            isPresentation={isPresentation}
          />
          <AccordionSections
            isPresentation={isPresentation}
            themeColor={theme.color}
            allowMultiple={true}
            items={[
              {
                id: 'repression',
                title: 'Repression',
                icon: '🔒',
                color: 'purple',
                content: (
                  <div>
                    <p className="text-gray-300 mb-2">Pushing threatening thoughts into the unconscious, forgetting them completely.</p>
                    <p className="text-gray-400 text-sm"><strong>Example:</strong> A person cannot remember childhood abuse - the memory is repressed.</p>
                  </div>
                )
              },
              {
                id: 'denial',
                title: 'Denial',
                icon: '🙈',
                color: 'red',
                content: (
                  <div>
                    <p className="text-gray-300 mb-2">Refusing to accept reality or facts, acting as if something isn't happening.</p>
                    <p className="text-gray-400 text-sm"><strong>Example:</strong> A person with addiction denies they have a problem.</p>
                  </div>
                )
              },
              {
                id: 'displacement',
                title: 'Displacement',
                icon: '🎯',
                color: 'amber',
                content: (
                  <div>
                    <p className="text-gray-300 mb-2">Redirecting emotions from the true source to a safer target.</p>
                    <p className="text-gray-400 text-sm"><strong>Example:</strong> Angry at boss → come home and shout at family.</p>
                  </div>
                )
              },
              {
                id: 'projection',
                title: 'Projection',
                icon: '🪞',
                color: 'blue',
                content: (
                  <div>
                    <p className="text-gray-300 mb-2">Attributing your own unacceptable thoughts to someone else.</p>
                    <p className="text-gray-400 text-sm"><strong>Example:</strong> Feeling attracted to someone → accusing them of flirting with you.</p>
                  </div>
                )
              }
            ]}
          />
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
                question: 'Which part of personality operates on the pleasure principle?',
                options: ['The Ego', 'The Superego', 'The Id', 'The Preconscious'],
                correctIndex: 2,
                feedback: 'The Id is primitive and wants immediate gratification - it operates on the pleasure principle without concern for reality.'
              },
              {
                id: 'uc2',
                type: 'mcq',
                question: 'What happens during the phallic stage?',
                options: [
                  'Toilet training conflicts',
                  'The Oedipus/Electra complex',
                  'Sexual desires become dormant',
                  'Focus on oral activities'
                ],
                correctIndex: 1,
                feedback: 'During the phallic stage (3-6 years), children experience unconscious attraction to their opposite-sex parent (Oedipus/Electra complex).'
              },
              {
                id: 'uc3',
                type: 'scenario',
                question: 'A person gets angry at work but goes home and shouts at their dog. Which defence mechanism is this?',
                options: ['Repression', 'Denial', 'Displacement', 'Projection'],
                correctIndex: 2,
                feedback: 'Displacement involves redirecting emotions to a safer target. The anger is displaced from the boss to the dog.'
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
                title: 'Explanatory Power',
                content: 'First theory to explain the importance of childhood experiences and the unconscious. Highlighted that behaviour can have hidden causes.'
              },
              {
                id: 'str2',
                category: 'strength',
                title: 'Practical Applications',
                content: 'Led to development of psychoanalysis and other talking therapies. Many therapeutic concepts (defence mechanisms, repression) are still used today.'
              },
              {
                id: 'lim1',
                category: 'limitation',
                title: 'Unfalsifiable',
                content: 'The unconscious cannot be tested directly. If a prediction fails, defence mechanisms can explain it away. This makes it unscientific by Popper\'s criteria.'
              },
              {
                id: 'lim2',
                category: 'limitation',
                title: 'Based on Case Studies',
                content: 'Freud\'s theories came from a small number of patients (mostly middle-class Viennese women). Difficult to generalise to everyone.'
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
            title="Defence Mechanism Lab"
            icon={<Play size={28} />}
            time="10 mins"
            themeColor={theme.color}
            isPresentation={isPresentation}
          />
          <DefenceMechanismSimulator themeColor={theme.color} isPresentation={isPresentation} />
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
                <li>• Unconscious mind influences behaviour</li>
                <li>• Id (pleasure) vs Ego (reality) vs Superego (morality)</li>
                <li>• 5 psychosexual stages: oral, anal, phallic, latency, genital</li>
                <li>• Defence mechanisms protect the ego</li>
                <li>• Strengths: Explanatory power, therapy applications</li>
                <li>• Limitations: Unfalsifiable, based on case studies</li>
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
                    "Outline and evaluate the psychodynamic approach in psychology." (8 marks)
                  </p>
                </div>
                <MarkingRubricReveal title="📋 Click to Reveal Marking Guidance" themeColor="amber" isPresentation={isPresentation}>
                  <ul className={`${isPresentation ? 'space-y-4 text-lg lg:text-xl' : 'space-y-2 text-sm'} text-gray-300`}>
                    <li><strong className="text-blue-400">AO1 (4 marks):</strong> Unconscious mind, id/ego/superego structure, one defence mechanism, psychosexual stages</li>
                    <li><strong className="text-green-400">AO3 Strengths (2 marks):</strong> Explanatory power, influential therapy (psychoanalysis), recognises childhood importance</li>
                    <li><strong className="text-red-400">AO3 Limitations (2 marks):</strong> Unfalsifiable concepts, based on case studies, gender-biased (penis envy)</li>
                    <li><strong className="text-gray-400">Tip:</strong> Balance your evaluation with both strengths and limitations for full marks</li>
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

export const lesson6SlideCount = 11;
