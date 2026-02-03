import React, { useMemo, useState } from 'react';
import { Lightbulb, BookOpen, Target, Dna, ChevronDown, ChevronUp, Play } from 'lucide-react';
import Slide from '../components/Slide';
import PhaseHeader from '../components/PhaseHeader';
import DoNowQuiz from '../components/DoNowQuiz';
import UnderstandingCheck from '../components/UnderstandingCheck';
import SpotlightCards from '../components/SpotlightCards';
import StepReveal from '../components/StepReveal';
import CarouselNavigator from '../components/CarouselNavigator';
import EvidenceGrid from '../components/EvidenceGrid';
import ClickToReveal from '../components/ClickToReveal';
import { TwinStudySimulator } from '../components/simulations';
import { lesson5DoNow, lessonThemes } from '../constants';

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

interface Lesson5Props {
  isPresentation: boolean;
  currentSlide: number;
}

export default function Lesson5({ isPresentation, currentSlide }: Lesson5Props) {
  const theme = lessonThemes[5];
  
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
            The Biological Approach
          </h1>
          <p className={`text-gray-400 ${isPresentation ? 'text-3xl lg:text-4xl max-w-4xl' : 'text-2xl max-w-2xl'}`}>
            Genetics, Brain Structure, Neurochemistry, and Evolution
          </p>
          <div className={`mt-12 flex items-center gap-4 text-${theme.color}-400`}>
            <Dna size={32} />
            <span className="text-xl">Lesson 5 of 8</span>
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
            questions={lesson5DoNow}
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
                Explain the key assumptions of the biological approach
              </li>
              <li className="flex items-start gap-3 text-gray-200">
                <span className={`text-${theme.color}-400 font-bold`}>2.</span>
                Describe the genetic basis of behaviour (genotype/phenotype)
              </li>
              <li className="flex items-start gap-3 text-gray-200">
                <span className={`text-${theme.color}-400 font-bold`}>3.</span>
                Understand how evolution and natural selection shape behaviour
              </li>
              <li className="flex items-start gap-3 text-gray-200">
                <span className={`text-${theme.color}-400 font-bold`}>4.</span>
                Evaluate the biological approach
              </li>
            </ul>
          </div>
        </div>
      )
    },

    // Slide 3: Biological Assumptions
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
                id: 'physical',
                title: 'Physical Basis of Behaviour',
                content: 'Everything psychological is first biological. All behaviour has a physical cause in the body - brain, genes, hormones, or nervous system.',
                icon: '🧬',
                color: 'green',
                details: [
                  'Brain structure affects behaviour',
                  'Neurochemistry influences mood and thoughts',
                  'The mind is what the brain does'
                ]
              },
              {
                id: 'genetics',
                title: 'Genetic Inheritance',
                content: 'Behaviour can be inherited through genes, just like physical characteristics. This is studied through twin and family studies.',
                icon: '👨‍👩‍👧‍👦',
                color: 'blue',
                details: [
                  'Genes passed from parents to children',
                  'Some traits have higher heritability than others',
                  'MZ twins share 100% of genes'
                ]
              },
              {
                id: 'evolution',
                title: 'Evolution',
                content: 'Behaviours that help survival and reproduction are passed on through natural selection. Many human behaviours evolved for adaptive reasons.',
                icon: '🦎',
                color: 'amber',
                details: [
                  'Adaptive behaviours spread in the gene pool',
                  'Explains universal human behaviours',
                  'E.g., fear responses, attachment, mate selection'
                ]
              },
              {
                id: 'science',
                title: 'Scientific Methods',
                content: 'Uses brain scans, drug trials, and genetic analysis. Highly scientific approach with objective, measurable data.',
                icon: '🔬',
                color: 'cyan',
                details: [
                  'fMRI, PET, EEG for brain activity',
                  'Twin studies for heritability',
                  'Drug trials for neurochemistry'
                ]
              }
            ]}
          />
        </div>
      )
    },

    // Slide 4: Genetics
    {
      type: 'teach',
      content: (
        <div className="flex flex-col items-center justify-center h-full">
          <PhaseHeader
            phaseName="Teach"
            title="The Genetic Basis of Behaviour"
            icon={<Dna size={28} />}
            time="8 mins"
            themeColor={theme.color}
            isPresentation={isPresentation}
          />
          <StepReveal
            steps={[
              {
                title: "Genotype vs Phenotype",
                content: "Genotype = the genetic code you inherit (your DNA). Phenotype = the characteristics that actually develop, influenced by both genes AND environment.",
                icon: "🧬"
              },
              {
                title: "Twin Studies",
                content: "Compare identical twins (MZ, 100% shared genes) with non-identical twins (DZ, 50% shared). If MZ twins are more similar, genetics plays a role.",
                icon: "👯"
              },
              {
                title: "Concordance Rates",
                content: "The probability that both twins share a trait. Higher concordance in MZ twins suggests genetic influence. E.g., schizophrenia: ~48% MZ vs ~17% DZ.",
                icon: "📊"
              },
              {
                title: "Nature via Nurture",
                content: "Genes and environment interact. Your genes may make you more susceptible to certain conditions, but environmental factors trigger them.",
                icon: "🔄"
              }
            ]}
            isPresentation={isPresentation}
            themeColor={theme.color}
          />
        </div>
      )
    },

    // Slide 5: Evolution
    {
      type: 'teach',
      content: (
        <div className="flex flex-col items-center justify-center h-full">
          <PhaseHeader
            phaseName="Teach"
            title="Evolution & Natural Selection"
            icon={<Lightbulb size={28} />}
            time="6 mins"
            themeColor={theme.color}
            isPresentation={isPresentation}
          />
          <CarouselNavigator
            isPresentation={isPresentation}
            themeColor={theme.color}
            slides={[
              {
                title: "Darwin's Theory",
                content: "Behaviours (like physical traits) can be naturally selected. Behaviours that increase survival and reproduction spread through the gene pool.",
                icon: "🌳",
                example: "Fear of snakes helped ancestors survive, so it spread"
              },
              {
                title: "Survival Value",
                content: "Some behaviours helped our ancestors survive - avoiding predators, finding food, forming social bonds for protection.",
                icon: "🛡️",
                example: "Fight-or-flight response prepares body for danger",
                color: "amber"
              },
              {
                title: "Reproductive Value",
                content: "Behaviours that help us reproduce and care for offspring are selected. This explains attachment, mate preferences, and parental behaviour.",
                icon: "❤️",
                example: "Attachment keeps infants close to caregivers for protection",
                color: "pink"
              },
              {
                title: "Environment of Evolutionary Adaptation (EEA)",
                content: "The environment where humans evolved (African savannah). Some behaviours that were adaptive then may not be useful now.",
                icon: "🏜️",
                example: "Craving high-calorie foods was adaptive when food was scarce",
                color: "green"
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
                question: 'What is the difference between genotype and phenotype?',
                options: [
                  'Genotype is visible, phenotype is hidden',
                  'Genotype is DNA, phenotype is expressed characteristics',
                  'Genotype is from mother, phenotype from father',
                  'There is no difference'
                ],
                correctIndex: 1,
                feedback: 'Genotype is your genetic code (DNA), while phenotype is what actually develops - influenced by both genes and environment.'
              },
              {
                id: 'uc2',
                type: 'mcq',
                question: 'Why are twin studies useful in psychology?',
                options: [
                  'Twins are easier to study',
                  'Twins always behave the same',
                  'Comparing MZ and DZ twins shows genetic influence',
                  'Twins have identical environments'
                ],
                correctIndex: 2,
                feedback: 'MZ twins share 100% of genes, DZ share 50%. If MZ twins are more similar on a trait, it suggests genetic influence.'
              },
              {
                id: 'uc3',
                type: 'scenario',
                question: 'The fight-or-flight response is considered an evolved behaviour because:',
                options: [
                  'It is learned in childhood',
                  'It helped ancestors survive threats',
                  'It only occurs in some cultures',
                  'It develops through conditioning'
                ],
                correctIndex: 1,
                feedback: 'Fight-or-flight is universal and automatic - it evolved because it helped our ancestors survive dangerous situations.'
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
            topic="The Biological Approach"
            isPresentation={isPresentation}
            evidence={[
              {
                id: 'e1',
                type: 'support',
                study: 'Gottesman (1991) - Schizophrenia Twin Studies',
                finding: 'MZ twins have 48% concordance for schizophrenia vs 17% for DZ twins, suggesting strong genetic component.',
                evaluation: 'But not 100% - environment must also play a role. Diathesis-stress model.'
              },
              {
                id: 'e2',
                type: 'support',
                study: 'Brain Scanning Research',
                finding: 'fMRI studies link specific brain regions to functions. E.g., Broca\'s area damage impairs speech production.',
                evaluation: 'Provides objective biological evidence for localisation of function.'
              },
              {
                id: 'e3',
                type: 'support',
                study: 'Drug Treatments',
                finding: 'SSRIs increase serotonin and reduce depression symptoms, supporting the neurochemical explanation.',
                evaluation: 'But drugs don\'t work for everyone and have side effects - oversimplified explanation.'
              },
              {
                id: 'e4',
                type: 'counter',
                study: 'Adoption Studies',
                finding: 'Children raised apart from biological parents can still develop mental disorders - but environment matters too.',
                evaluation: 'Shows genes create predisposition but don\'t determine outcome.'
              },
              {
                id: 'e5',
                type: 'mixed',
                study: 'Evolutionary Explanations',
                finding: 'Many behaviours can be explained evolutionarily, but these explanations are hard to test scientifically.',
                evaluation: 'Post-hoc (after the fact) explanations - we can\'t go back and test evolution directly.'
              }
            ]}
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
                title: 'Scientific Methods',
                content: 'Uses objective, measurable techniques like brain scans and genetic analysis. Provides hard scientific evidence that can be replicated.'
              },
              {
                id: 'str2',
                category: 'strength',
                title: 'Real-World Applications',
                content: 'Led to drug treatments for mental disorders (e.g., antidepressants, antipsychotics). Understanding brain chemistry helps develop therapies.'
              },
              {
                id: 'lim1',
                category: 'limitation',
                title: 'Biological Determinism',
                content: 'Suggests behaviour is determined by biology with no free will. Ignores the role of choice and the influence of environment.'
              },
              {
                id: 'lim2',
                category: 'limitation',
                title: 'Reductionist',
                content: 'Reduces complex human behaviour to simple biological components (genes, chemicals). May oversimplify behaviour that has many causes.'
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
            title="Twin Study Lab"
            icon={<Play size={28} />}
            time="10 mins"
            themeColor={theme.color}
            isPresentation={isPresentation}
          />
          <TwinStudySimulator themeColor={theme.color} isPresentation={isPresentation} />
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
                <li>• All behaviour has a biological basis</li>
                <li>• Genotype = genes, phenotype = expressed characteristics</li>
                <li>• Twin studies show genetic influence through concordance</li>
                <li>• Evolution: adaptive behaviours are naturally selected</li>
                <li>• Strengths: Scientific, practical applications</li>
                <li>• Limitations: Deterministic, reductionist</li>
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
                    "Explain how twin studies are used to investigate the genetic basis of behaviour." (6 marks)
                  </p>
                </div>
                <MarkingRubricReveal title="📋 Click to Reveal Marking Guidance" themeColor="amber" isPresentation={isPresentation}>
                  <ul className={`${isPresentation ? 'space-y-4 text-lg lg:text-xl' : 'space-y-2 text-sm'} text-gray-300`}>
                    <li><strong className="text-blue-400">MZ vs DZ (2 marks):</strong> MZ share 100% genes, DZ share 50% - comparing them isolates genetic influence</li>
                    <li><strong className="text-blue-400">Concordance rates (2 marks):</strong> If MZ concordance is higher than DZ, suggests genetic component</li>
                    <li><strong className="text-green-400">Interpretation (2 marks):</strong> Higher MZ concordance supports nature, but environment also plays a role</li>
                    <li><strong className="text-gray-400">Tip:</strong> Use specific concordance rate examples (e.g., schizophrenia: MZ ~48%, DZ ~17%)</li>
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

export const lesson5SlideCount = 11;
