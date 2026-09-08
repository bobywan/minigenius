import type { QuizSeed } from "../french/quiz.ts";

export const PHRASES_TO_BE: QuizSeed[] = [
  { prompt: "I ___ a girl.", answer: "am", distractors: ["is", "are", "have"] },
  { prompt: "She ___ happy.", answer: "is", distractors: ["am", "are", "have"] },
  { prompt: "He ___ my brother.", answer: "is", distractors: ["am", "are", "has"] },
  { prompt: "We ___ friends.", answer: "are", distractors: ["is", "am", "have"] },
  { prompt: "They ___ at school.", answer: "are", distractors: ["is", "am", "has"] },
  { prompt: "You ___ kind.", answer: "are", distractors: ["is", "am", "has"] },
  { prompt: "The cat ___ black.", answer: "is", distractors: ["am", "are", "have"] },
  { prompt: "Tom and Léa ___ hungry.", answer: "are", distractors: ["is", "am", "has"] },
  { prompt: "I ___ a red book.", answer: "have", distractors: ["has", "am", "is"] },
  { prompt: "She ___ a blue bag.", answer: "has", distractors: ["have", "is", "are"] },
  { prompt: "We ___ a big house.", answer: "have", distractors: ["has", "are", "is"] },
  { prompt: "He ___ two sisters.", answer: "has", distractors: ["have", "is", "am"] },
  { prompt: "They ___ a dog.", answer: "have", distractors: ["has", "are", "is"] },
  { prompt: "The children ___ tired.", answer: "are", distractors: ["is", "am", "has"] },
  { prompt: "My mum ___ a car.", answer: "has", distractors: ["have", "is", "are"] },
  { prompt: "It ___ cold today.", answer: "is", distractors: ["am", "are", "have"] },
];

export const PHRASES_PREPOSITIONS: QuizSeed[] = [
  {
    prompt: "The cat is ___ the table.",
    answer: "on",
    distractors: ["in", "under", "next to"],
  },
  {
    prompt: "The book is ___ the bag.",
    answer: "in",
    distractors: ["on", "under", "next to"],
  },
  {
    prompt: "The dog is ___ the chair.",
    answer: "under",
    distractors: ["on", "in", "next to"],
  },
  {
    prompt: "Léa sits ___ Tom.",
    answer: "next to",
    distractors: ["on", "in", "under"],
  },
  {
    prompt: "The ball is ___ the box.",
    answer: "in",
    distractors: ["on", "under", "next to"],
  },
  {
    prompt: "The picture is ___ the wall.",
    answer: "on",
    distractors: ["in", "under", "next to"],
  },
  {
    prompt: "The shoes are ___ the bed.",
    answer: "under",
    distractors: ["on", "in", "next to"],
  },
  {
    prompt: "The school is ___ the park.",
    answer: "next to",
    distractors: ["on", "in", "under"],
  },
  {
    prompt: "The bird is ___ the tree.",
    answer: "in",
    distractors: ["on", "under", "next to"],
  },
  {
    prompt: "The plate is ___ the table.",
    answer: "on",
    distractors: ["in", "under", "next to"],
  },
  {
    prompt: "The mouse is ___ the cupboard.",
    answer: "in",
    distractors: ["on", "under", "next to"],
  },
  {
    prompt: "The lamp is ___ the desk.",
    answer: "on",
    distractors: ["in", "under", "next to"],
  },
  {
    prompt: "The cat sleeps ___ the sofa.",
    answer: "on",
    distractors: ["in", "under", "next to"],
  },
  {
    prompt: "Tom stands ___ the door.",
    answer: "next to",
    distractors: ["on", "in", "under"],
  },
  {
    prompt: "The fish is ___ the water.",
    answer: "in",
    distractors: ["on", "under", "next to"],
  },
];

export const PHRASES_TEMPS: QuizSeed[] = [
  {
    prompt: "Every day I ___ to school.",
    answer: "go",
    distractors: ["went", "gone", "going"],
  },
  {
    prompt: "Yesterday I ___ to school.",
    answer: "went",
    distractors: ["go", "gone", "going"],
  },
  {
    prompt: "She ___ an apple every morning.",
    answer: "eats",
    distractors: ["eat", "ate", "eaten"],
  },
  {
    prompt: "Yesterday she ___ an apple.",
    answer: "ate",
    distractors: ["eat", "eats", "eaten"],
  },
  {
    prompt: "They ___ football on Sundays.",
    answer: "play",
    distractors: ["played", "playing", "plays"],
  },
  {
    prompt: "Yesterday they ___ football.",
    answer: "played",
    distractors: ["play", "playing", "plays"],
  },
  {
    prompt: "He ___ a book now.",
    answer: "reads",
    distractors: ["read", "reading", "wrote"],
  },
  {
    prompt: "Yesterday he ___ a book.",
    answer: "read",
    distractors: ["reads", "reading", "write"],
  },
  {
    prompt: "We ___ milk every day.",
    answer: "drink",
    distractors: ["drank", "drunk", "drinking"],
  },
  {
    prompt: "Yesterday we ___ milk.",
    answer: "drank",
    distractors: ["drink", "drunk", "drinking"],
  },
  {
    prompt: "The bird ___ in the sky.",
    answer: "flies",
    distractors: ["fly", "flew", "flown"],
  },
  {
    prompt: "Yesterday the bird ___ away.",
    answer: "flew",
    distractors: ["fly", "flies", "flown"],
  },
  {
    prompt: "I ___ my hands every day.",
    answer: "wash",
    distractors: ["washed", "washing", "washes"],
  },
  {
    prompt: "Yesterday I ___ my hands.",
    answer: "washed",
    distractors: ["wash", "washing", "washes"],
  },
  {
    prompt: "Tom ___ a cake last week.",
    answer: "made",
    distractors: ["make", "makes", "making"],
  },
  {
    prompt: "Mum ___ bread every morning.",
    answer: "makes",
    distractors: ["make", "made", "making"],
  },
];
