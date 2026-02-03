import React, { useMemo, useState } from 'react';
import { Lightbulb, BookOpen, Target, Heart, Sun, ChevronDown, ChevronUp, Play } from 'lucide-react';
import Slide from '../components/Slide';
import PhaseHeader from '../components/PhaseHeader';
import DoNowQuiz from '../components/DoNowQuiz';
import UnderstandingCheck from '../components/UnderstandingCheck';
import SpotlightCards from '../components/SpotlightCards';
import StepReveal from '../components/StepReveal';
import TabbedContent from '../components/TabbedContent';
import ClickToReveal from '../components/ClickToReveal';
import { HierarchyBuilder } from '../components/simulations';
import { lesson7DoNow, lessonThemes } from '../constants';

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

interface Lesson7Props {
  isPresentation: boolean;
  currentSlide: number;
}

export default function Lesson7({ isPresentation, currentSlide }: Lesson7Props) {
  const theme = lessonThemes[7];
  
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
            The Humanistic Approach
          </h1>
          <p className={`text-gray-400 ${isPresentation ? 'text-3xl lg:text-4xl max-w-4xl' : 'text-2xl max-w-2xl'}`}>
            Free Will, Self-Actualisation, and Person-Centred Therapy
          </p>
          <div className={`mt-12 flex items-center gap-4 text-${theme.color}-400`}>
            <Sun size={32} />
            <span className="text-xl">Lesson 7 of 8</span>
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
            questions={lesson7DoNow}
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
                Explain the key assumptions of the humanistic approach
              </li>
              <li className="flex items-start gap-3 text-gray-200">
                <span className={`text-${theme.color}-400 font-bold`}>2.</span>
                Describe Maslow's hierarchy of needs and self-actualisation
              </li>
              <li className="flex items-start gap-3 text-gray-200">
                <span className={`text-${theme.color}-400 font-bold`}>3.</span>
                Explain Rogers' conditions for personal growth
              </li>
              <li className="flex items-start gap-3 text-gray-200">
                <span className={`text-${theme.color}-400 font-bold`}>4.</span>
                Evaluate the humanistic approach
              </li>
            </ul>
          </div>
        </div>
      )
    },

    // Slide 3: Key Assumptions
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
                id: 'freewill',
                title: 'Free Will',
                content: 'Humans are self-determining and have personal agency. We are not controlled by external forces or internal instincts.',
                icon: '🦋',
                color: 'pink',
                details: [
                  'Rejects determinism',
                  'We choose our own paths',
                  'Emphasis on personal responsibility'
                ]
              },
              {
                id: 'unique',
                title: 'Unique Individuals',
                content: 'Every person is unique - there are no general laws of behaviour. Psychology should study the whole person (holism).',
                icon: '❄️',
                color: 'cyan',
                details: [
                  'Rejects scientific generalisation',
                  'Focus on individual experience',
                  'Nomothetic vs idiographic'
                ]
              },
              {
                id: 'growth',
                title: 'Personal Growth',
                content: 'Humans have an innate drive to achieve their full potential - self-actualisation. This is our fundamental motivation.',
                icon: '🌱',
                color: 'green',
                details: [
                  'We are inherently good',
                  'Growth-oriented approach',
                  'Fulfilling potential is the goal'
                ]
              },
              {
                id: 'subjective',
                title: 'Subjective Experience',
                content: 'What matters is how individuals perceive and interpret the world. Focus on conscious experience rather than unconscious.',
                icon: '👁️',
                color: 'amber',
                details: [
                  'Phenomenological approach',
                  'Reality is personal',
                  'Experience > external observation'
                ]
              }
            ]}
          />
        </div>
      )
    },

    // Slide 4: Maslow's Hierarchy
    {
      type: 'teach',
      content: (
        <div className="flex flex-col items-center justify-center h-full">
          <PhaseHeader
            phaseName="Teach"
            title="Maslow's Hierarchy of Needs"
            icon={<Lightbulb size={28} />}
            time="8 mins"
            themeColor={theme.color}
            isPresentation={isPresentation}
          />
          <StepReveal
            steps={[
              {
                title: "1. Physiological Needs (Base)",
                content: "Basic survival needs: food, water, warmth, sleep. These must be met before anything else matters.",
                icon: "🍎"
              },
              {
                title: "2. Safety Needs",
                content: "Security, stability, freedom from fear. This includes physical safety, financial security, health.",
                icon: "🏠"
              },
              {
                title: "3. Love & Belonging",
                content: "Social needs: friendship, intimacy, family, sense of connection. Humans need to belong to groups.",
                icon: "❤️"
              },
              {
                title: "4. Esteem Needs",
                content: "Self-esteem, achievement, respect from others. Need to feel valued and competent.",
                icon: "⭐"
              },
              {
                title: "5. Self-Actualisation (Peak)",
                content: "Achieving full potential, personal growth, creativity. 'Becoming everything one is capable of becoming.'",
                icon: "🏔️"
              }
            ]}
            isPresentation={isPresentation}
            themeColor={theme.color}
            title="The Pyramid of Needs (Bottom → Top)"
          />
        </div>
      )
    },

    // Slide 5: Rogers' Concepts
    {
      type: 'teach',
      content: (
        <div className="flex flex-col items-center justify-center h-full">
          <PhaseHeader
            phaseName="Teach"
            title="Rogers: Self-Concept & Congruence"
            icon={<Heart size={28} />}
            time="8 mins"
            themeColor={theme.color}
            isPresentation={isPresentation}
          />
          <TabbedContent
            isPresentation={isPresentation}
            themeColor={theme.color}
            tabs={[
              {
                id: 'self',
                label: 'Self-Concept',
                icon: '🪞',
                content: (
                  <div className="space-y-4">
                    <p className={`text-gray-300 ${isPresentation ? 'text-xl' : 'text-base'}`}>
                      How we see ourselves - our view of our own personality, abilities, and value. Made up of:
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-pink-900/30 rounded-xl p-4 border border-pink-500/30">
                        <p className="text-pink-400 font-bold">Self-Image</p>
                        <p className="text-gray-400 text-sm">How we see ourselves right now</p>
                      </div>
                      <div className="bg-amber-900/30 rounded-xl p-4 border border-amber-500/30">
                        <p className="text-amber-400 font-bold">Self-Esteem</p>
                        <p className="text-gray-400 text-sm">How much we value ourselves</p>
                      </div>
                      <div className="bg-green-900/30 rounded-xl p-4 border border-green-500/30">
                        <p className="text-green-400 font-bold">Ideal Self</p>
                        <p className="text-gray-400 text-sm">Who we want to become</p>
                      </div>
                    </div>
                  </div>
                )
              },
              {
                id: 'congruence',
                label: 'Congruence',
                icon: '✓',
                content: (
                  <div className="space-y-4">
                    <p className={`text-gray-300 ${isPresentation ? 'text-xl' : 'text-base'}`}>
                      <strong className="text-green-400">Congruence</strong> = when self-image matches ideal self → psychological health
                    </p>
                    <p className={`text-gray-300 ${isPresentation ? 'text-xl' : 'text-base'}`}>
                      <strong className="text-red-400">Incongruence</strong> = gap between self-image and ideal self → anxiety, unhappiness
                    </p>
                    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-600">
                      <p className="text-gray-400">The bigger the gap between how we are and how we want to be, the more psychological distress we experience.</p>
                    </div>
                  </div>
                )
              },
              {
                id: 'conditions',
                label: 'Conditions for Growth',
                icon: '🌱',
                content: (
                  <div className="space-y-4">
                    <p className={`text-gray-300 mb-4 ${isPresentation ? 'text-xl' : 'text-base'}`}>
                      Rogers identified three conditions needed for personal growth and therapy:
                    </p>
                    <ul className="space-y-3 text-gray-300">
                      <li>• <strong className="text-purple-400">Unconditional Positive Regard:</strong> Accepting someone completely, without judgement</li>
                      <li>• <strong className="text-blue-400">Empathy:</strong> Understanding the client's feelings from their perspective</li>
                      <li>• <strong className="text-green-400">Genuineness:</strong> Being authentic and transparent in the relationship</li>
                    </ul>
                  </div>
                )
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
                question: 'What is at the top of Maslow\'s hierarchy of needs?',
                options: ['Safety needs', 'Love and belonging', 'Self-esteem', 'Self-actualisation'],
                correctIndex: 3,
                feedback: 'Self-actualisation is at the top - it represents achieving your full potential and can only be pursued once lower needs are met.'
              },
              {
                id: 'uc2',
                type: 'mcq',
                question: 'What does Rogers mean by "congruence"?',
                options: [
                  'Having lots of friends',
                  'When self-image matches ideal self',
                  'Being intelligent',
                  'Having high self-esteem'
                ],
                correctIndex: 1,
                feedback: 'Congruence is when there is little gap between how we see ourselves (self-image) and who we want to be (ideal self).'
              },
              {
                id: 'uc3',
                type: 'mcq',
                question: 'Which is a core condition for personal growth according to Rogers?',
                options: [
                  'Conditional positive regard',
                  'Punishment for mistakes',
                  'Unconditional positive regard',
                  'Competition with others'
                ],
                correctIndex: 2,
                feedback: 'Unconditional positive regard means accepting someone without conditions - essential for personal growth and effective therapy.'
              }
            ]}
            isPresentation={isPresentation}
            themeColor={theme.color}
          />
        </div>
      )
    },

    // Slide 7: Evaluation
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
                title: 'Not Deterministic',
                content: 'Unlike other approaches, humanism emphasises free will and personal agency. This is optimistic and empowering - we can change our lives.'
              },
              {
                id: 'str2',
                category: 'strength',
                title: 'Practical Applications',
                content: 'Rogers\' client-centred therapy is widely used and effective. The conditions for growth have influenced counselling, education, and parenting.'
              },
              {
                id: 'lim1',
                category: 'limitation',
                title: 'Unscientific',
                content: 'Concepts like self-actualisation are vague and hard to test scientifically. The approach lacks empirical evidence compared to cognitive or biological approaches.'
              },
              {
                id: 'lim2',
                category: 'limitation',
                title: 'Cultural Bias',
                content: 'The focus on individual growth and self reflects Western, individualist values. May not apply to collectivist cultures that prioritise group harmony.'
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
            title="Humanistic Psychology Lab"
            icon={<Play size={28} />}
            time="10 mins"
            themeColor={theme.color}
            isPresentation={isPresentation}
          />
          <HierarchyBuilder themeColor={theme.color} isPresentation={isPresentation} />
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
            <div className={`bg-${theme.color}-900/30 border border-${theme.color}-500/50 rounded-2xl ${isPresentation ? 'p-8' : 'p-6'}`}>
              <h3 className={`text-${theme.color}-400 font-bold mb-4 ${isPresentation ? 'text-2xl lg:text-3xl' : 'text-xl'}`}>📝 Key Takeaways</h3>
              <ul className={`${isPresentation ? 'space-y-4 text-xl lg:text-2xl' : 'space-y-3'} text-gray-300`}>
                <li>• Emphasises free will and personal agency</li>
                <li>• Maslow: hierarchy of needs → self-actualisation</li>
                <li>• Rogers: self-concept, congruence, conditions for growth</li>
                <li>• UPR = accepting someone without conditions</li>
                <li>• Strengths: Not deterministic, therapy applications</li>
                <li>• Limitations: Unscientific, Western cultural bias</li>
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
                    "Outline Maslow's hierarchy of needs and explain the concept of self-actualisation." (6 marks)
                  </p>
                </div>
                <MarkingRubricReveal title="📋 Click to Reveal Marking Guidance" themeColor="amber" isPresentation={isPresentation}>
                  <ul className={`${isPresentation ? 'space-y-4 text-lg lg:text-xl' : 'space-y-2 text-sm'} text-gray-300`}>
                    <li><strong className="text-blue-400">Five levels (3 marks):</strong> Physiological → Safety → Love/Belonging → Esteem → Self-actualisation</li>
                    <li><strong className="text-green-400">Self-actualisation (2 marks):</strong> Reaching full potential, becoming the best version of yourself</li>
                    <li><strong className="text-amber-400">Example (1 mark):</strong> Concrete example of someone self-actualising (artist, scientist, etc.)</li>
                    <li><strong className="text-gray-400">Tip:</strong> Mention that lower needs must be met before higher needs can be pursued</li>
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

export const lesson7SlideCount = 10;
