// Types
export interface Lesson {
  id: number;
  title: string;
  subtitle?: string;
  active: boolean;
  complete: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  feedback?: string;
}

export interface UnderstandingCheckQuestion {
  id: string | number;
  type: 'mcq' | 'scenario' | 'matching';
  question: string;
  scenario?: string;
  options: string[];
  correctIndex: number;
  feedback: string;
}

// Lesson Metadata
export const lessons: Lesson[] = [
  { id: 1, title: 'Origins of Psychology', subtitle: 'Wundt & Introspection', active: true, complete: false },
  { id: 2, title: 'Behaviourist Approach', subtitle: 'Conditioning & Learning', active: true, complete: false },
  { id: 3, title: 'Social Learning Theory', subtitle: 'Observation & Imitation', active: true, complete: false },
  { id: 4, title: 'Cognitive Approach', subtitle: 'Mental Processes', active: true, complete: false },
  { id: 5, title: 'Biological Approach', subtitle: 'Genes & Evolution', active: true, complete: false },
  { id: 6, title: 'Psychodynamic Approach', subtitle: 'Freud & Unconscious', active: true, complete: false },
  { id: 7, title: 'Humanistic Psychology', subtitle: 'Free Will & Growth', active: true, complete: false },
  { id: 8, title: 'Comparison of Approaches', subtitle: 'Key Debates', active: true, complete: false },
];

// Theme Colors for each lesson
export const lessonThemes: Record<number, { color: string; name: string }> = {
  1: { color: 'indigo', name: 'Origins' },
  2: { color: 'cyan', name: 'Behaviourism' },
  3: { color: 'amber', name: 'SLT' },
  4: { color: 'blue', name: 'Cognitive' },
  5: { color: 'green', name: 'Biological' },
  6: { color: 'purple', name: 'Psychodynamic' },
  7: { color: 'pink', name: 'Humanistic' },
  8: { color: 'teal', name: 'Comparison' },
};

// Do Now Questions - Testing PREVIOUS lesson knowledge
// Lesson 1: No prior lesson - tests general psychology knowledge
export const lesson1DoNow: QuizQuestion[] = [
  {
    id: 1,
    question: "Psychology is the scientific study of...",
    options: ["The brain only", "Mind and behaviour", "Mental illness only"],
    correct: 1,
    feedback: "Psychology studies both the mind (mental processes) and behaviour (observable actions)."
  },
  {
    id: 2,
    question: "What makes a study 'scientific'?",
    options: ["It uses numbers", "It can be tested and replicated", "It's done by scientists"],
    correct: 1,
    feedback: "Scientific methods must be testable, measurable, and replicable by other researchers."
  },
  {
    id: 3,
    question: "An 'objective' measurement is one that...",
    options: ["Is based on personal opinion", "Is unbiased and factual", "Is always correct"],
    correct: 1,
    feedback: "Objective measurements are not influenced by personal feelings or interpretations."
  },
  {
    id: 4,
    question: "Why do psychologists conduct experiments?",
    options: ["To prove they're right", "To establish cause and effect", "Because it's interesting"],
    correct: 1,
    feedback: "Experiments allow researchers to manipulate variables and establish causal relationships."
  },
  {
    id: 5,
    question: "A 'theory' in psychology is...",
    options: ["A complete guess", "A proven fact", "An explanation based on evidence"],
    correct: 2,
    feedback: "Theories explain behaviour and are supported by evidence but remain open to testing."
  }
];

// Lesson 2 Do Now: Tests Lesson 1 (Origins of Psychology)
export const lesson2DoNow: QuizQuestion[] = [
  {
    id: 1,
    question: "Who established the first psychological laboratory?",
    options: ["Sigmund Freud", "Wilhelm Wundt", "John Watson"],
    correct: 1,
    feedback: "Wundt established the first lab in Leipzig, Germany in 1879."
  },
  {
    id: 2,
    question: "What research method did Wundt use to study the mind?",
    options: ["Brain scans", "Introspection", "Observation"],
    correct: 1,
    feedback: "Introspection involved participants reporting their conscious experiences."
  },
  {
    id: 3,
    question: "Watson criticized introspection because the data was...",
    options: ["Too expensive", "Subjective and variable", "Too scientific"],
    correct: 1,
    feedback: "Watson argued introspective data varied between people, making it unscientific."
  },
  {
    id: 4,
    question: "What did Wundt call the breaking down of consciousness into basic elements?",
    options: ["Reductionism", "Structuralism", "Behaviourism"],
    correct: 1,
    feedback: "Structuralism aimed to identify the basic structures of conscious experience."
  },
  {
    id: 5,
    question: "When was Wundt's laboratory established?",
    options: ["1859", "1879", "1913"],
    correct: 1,
    feedback: "The Leipzig laboratory was founded in 1879, marking psychology's emergence as a science."
  }
];

// Lesson 3 Do Now: Tests Lesson 2 (Behaviourist Approach)
export const lesson3DoNow: QuizQuestion[] = [
  {
    id: 1,
    question: "What type of learning did Pavlov demonstrate?",
    options: ["Operant conditioning", "Classical conditioning", "Observational learning"],
    correct: 1,
    feedback: "Pavlov showed classical conditioning through his famous dog experiments."
  },
  {
    id: 2,
    question: "In Skinner's experiments, what increased the likelihood of behaviour?",
    options: ["Punishment", "Reinforcement", "Extinction"],
    correct: 1,
    feedback: "Both positive and negative reinforcement increase the frequency of behaviour."
  },
  {
    id: 3,
    question: "What did behaviourists believe about the mind at birth?",
    options: ["Full of instincts", "A blank slate", "Determined by genes"],
    correct: 1,
    feedback: "Behaviourists believed we're born as 'tabula rasa' - all behaviour is learned."
  },
  {
    id: 4,
    question: "Negative reinforcement involves...",
    options: ["Adding something unpleasant", "Removing something unpleasant", "Punishment"],
    correct: 1,
    feedback: "Negative reinforcement removes an unpleasant stimulus to increase behaviour."
  },
  {
    id: 5,
    question: "Why did behaviourists use animals in their research?",
    options: ["Animals are cheaper", "Learning processes are the same across species", "Ethical reasons only"],
    correct: 1,
    feedback: "Behaviourists believed basic learning principles apply to all species."
  }
];

// Lesson 4 Do Now: Tests Lesson 3 (Social Learning Theory)
export const lesson4DoNow: QuizQuestion[] = [
  {
    id: 1,
    question: "Who developed Social Learning Theory?",
    options: ["Skinner", "Freud", "Bandura"],
    correct: 2,
    feedback: "Albert Bandura proposed SLT as a development of behaviourism."
  },
  {
    id: 2,
    question: "What is vicarious reinforcement?",
    options: ["Direct reward", "Learning by observing others being rewarded", "Self-reinforcement"],
    correct: 1,
    feedback: "Vicarious reinforcement means learning by watching others receive consequences."
  },
  {
    id: 3,
    question: "Which is NOT a mediational process in SLT?",
    options: ["Attention", "Reinforcement", "Retention"],
    correct: 1,
    feedback: "The four mediational processes are: Attention, Retention, Motor Reproduction, Motivation."
  },
  {
    id: 4,
    question: "In the Bobo doll study, children were most aggressive after seeing...",
    options: ["An adult punished", "An adult rewarded", "No consequences"],
    correct: 1,
    feedback: "Children showed most aggression when they saw the model praised for aggressive behaviour."
  },
  {
    id: 5,
    question: "A 'role model' in SLT is someone who...",
    options: ["Punishes behaviour", "Is identified with and imitated", "Teaches formally"],
    correct: 1,
    feedback: "Role models are people we identify with and whose behaviour we imitate."
  }
];

// Lesson 5 Do Now: Tests Lesson 4 (Cognitive Approach)
export const lesson5DoNow: QuizQuestion[] = [
  {
    id: 1,
    question: "The cognitive approach focuses on...",
    options: ["Observable behaviour only", "Internal mental processes", "Unconscious mind"],
    correct: 1,
    feedback: "The cognitive approach studies internal mental processes like memory and thinking."
  },
  {
    id: 2,
    question: "What are schemas?",
    options: ["Brain chemicals", "Mental frameworks for organising information", "Personality types"],
    correct: 1,
    feedback: "Schemas are mental packages of information developed through experience."
  },
  {
    id: 3,
    question: "The 'computer analogy' compares the mind to...",
    options: ["A blank slate", "An information processing system", "A filing cabinet"],
    correct: 1,
    feedback: "Cognitive psychologists compare the mind to a computer processing information."
  },
  {
    id: 4,
    question: "Cognitive neuroscience combines cognitive psychology with...",
    options: ["Behaviourism", "Biology/brain science", "Psychoanalysis"],
    correct: 1,
    feedback: "Cognitive neuroscience studies how brain structures influence mental processes."
  },
  {
    id: 5,
    question: "A limitation of the computer analogy is that it ignores...",
    options: ["Memory", "Emotion and motivation", "Thinking"],
    correct: 1,
    feedback: "Critics argue the computer analogy ignores human emotion and motivation."
  }
];

// Lesson 6 Do Now: Tests Lesson 5 (Biological Approach)
export const lesson6DoNow: QuizQuestion[] = [
  {
    id: 1,
    question: "The biological approach assumes that all behaviour has a...",
    options: ["Social cause", "Physical/biological basis", "Learned origin"],
    correct: 1,
    feedback: "The biological approach suggests all behaviour has biological causes."
  },
  {
    id: 2,
    question: "What is a genotype?",
    options: ["Physical characteristics", "Genetic makeup", "Learned behaviour"],
    correct: 1,
    feedback: "Genotype refers to a person's actual genetic composition."
  },
  {
    id: 3,
    question: "Twin studies are used to investigate...",
    options: ["Environmental influences", "Genetic influences on behaviour", "Learning processes"],
    correct: 1,
    feedback: "Twin studies compare concordance rates to assess genetic influences."
  },
  {
    id: 4,
    question: "Darwin's theory suggests that adaptive behaviours are...",
    options: ["Learned", "Naturally selected", "Culturally transmitted"],
    correct: 1,
    feedback: "Natural selection favours behaviours that enhance survival and reproduction."
  },
  {
    id: 5,
    question: "Which method would biological psychologists most likely use?",
    options: ["Interviews", "Brain scans (fMRI)", "Observations"],
    correct: 1,
    feedback: "Biological psychologists use objective methods like fMRI and PET scans."
  }
];

// Lesson 7 Do Now: Tests Lesson 6 (Psychodynamic Approach)
export const lesson7DoNow: QuizQuestion[] = [
  {
    id: 1,
    question: "According to Freud, which part of the personality operates on the pleasure principle?",
    options: ["Ego", "Superego", "Id"],
    correct: 2,
    feedback: "The Id seeks immediate gratification and operates on the pleasure principle."
  },
  {
    id: 2,
    question: "Defence mechanisms are employed by the...",
    options: ["Id", "Ego", "Superego"],
    correct: 1,
    feedback: "The Ego uses defence mechanisms to manage anxiety from id/superego conflict."
  },
  {
    id: 3,
    question: "The Oedipus complex occurs during which stage?",
    options: ["Oral", "Anal", "Phallic"],
    correct: 2,
    feedback: "The Oedipus complex develops during the phallic stage (3-6 years)."
  },
  {
    id: 4,
    question: "Repression involves...",
    options: ["Expressing emotions", "Pushing memories into the unconscious", "Transferring feelings"],
    correct: 1,
    feedback: "Repression forces threatening memories out of conscious awareness."
  },
  {
    id: 5,
    question: "A criticism of Freud's theory is that it is...",
    options: ["Too scientific", "Unfalsifiable/untestable", "Too focused on biology"],
    correct: 1,
    feedback: "Popper argued Freud's concepts cannot be scientifically tested or disproved."
  }
];

// Lesson 8 Do Now: Tests Lesson 7 (Humanistic Psychology)
export const lesson8DoNow: QuizQuestion[] = [
  {
    id: 1,
    question: "Humanistic psychology emphasises...",
    options: ["Determinism", "Free will", "Unconscious drives"],
    correct: 1,
    feedback: "Humanistic psychologists believe humans are self-determining with free will."
  },
  {
    id: 2,
    question: "Self-actualisation means...",
    options: ["Being selfish", "Achieving your full potential", "Being self-conscious"],
    correct: 1,
    feedback: "Self-actualisation is the drive to achieve one's full potential."
  },
  {
    id: 3,
    question: "What happens when self-concept and ideal self don't match?",
    options: ["Congruence", "Incongruence", "Self-actualisation"],
    correct: 1,
    feedback: "A gap between self-concept and ideal self creates incongruence."
  },
  {
    id: 4,
    question: "Rogers' therapy is called...",
    options: ["Psychoanalysis", "Client-centred therapy", "CBT"],
    correct: 1,
    feedback: "Rogers developed client-centred (or person-centred) therapy."
  },
  {
    id: 5,
    question: "Unconditional positive regard means...",
    options: ["Love with conditions", "Accepting someone without conditions", "Self-love"],
    correct: 1,
    feedback: "Unconditional positive regard is acceptance without judgement or conditions."
  }
];

// All Do Now questions mapped by lesson
export const allDoNowQuestions: Record<number, QuizQuestion[]> = {
  1: lesson1DoNow,
  2: lesson2DoNow,
  3: lesson3DoNow,
  4: lesson4DoNow,
  5: lesson5DoNow,
  6: lesson6DoNow,
  7: lesson7DoNow,
  8: lesson8DoNow,
};
