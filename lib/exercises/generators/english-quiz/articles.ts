import type { QuizSeed } from "../french/quiz.ts";

const THE_SOME = ["the", "some"] as const;

export const ARTICLES_BANK: QuizSeed[] = [
  { prompt: "___ apple", answer: "an", distractors: ["a", ...THE_SOME] },
  { prompt: "___ egg", answer: "an", distractors: ["a", ...THE_SOME] },
  { prompt: "___ onion", answer: "an", distractors: ["a", ...THE_SOME] },
  { prompt: "___ elephant", answer: "an", distractors: ["a", ...THE_SOME] },
  { prompt: "___ ant", answer: "an", distractors: ["a", ...THE_SOME] },
  { prompt: "___ orange", answer: "an", distractors: ["a", ...THE_SOME] },
  { prompt: "___ ear", answer: "an", distractors: ["a", ...THE_SOME] },
  { prompt: "___ eye", answer: "an", distractors: ["a", ...THE_SOME] },
  { prompt: "___ airport", answer: "an", distractors: ["a", ...THE_SOME] },
  { prompt: "___ eraser", answer: "an", distractors: ["a", ...THE_SOME] },
  { prompt: "___ ice cream", answer: "an", distractors: ["a", ...THE_SOME] },
  { prompt: "___ umbrella", answer: "an", distractors: ["a", ...THE_SOME] },
  { prompt: "___ dog", answer: "a", distractors: ["an", ...THE_SOME] },
  { prompt: "___ cat", answer: "a", distractors: ["an", ...THE_SOME] },
  { prompt: "___ book", answer: "a", distractors: ["an", ...THE_SOME] },
  { prompt: "___ school", answer: "a", distractors: ["an", ...THE_SOME] },
  { prompt: "___ house", answer: "a", distractors: ["an", ...THE_SOME] },
  { prompt: "___ banana", answer: "a", distractors: ["an", ...THE_SOME] },
  { prompt: "___ teacher", answer: "a", distractors: ["an", ...THE_SOME] },
  { prompt: "___ window", answer: "a", distractors: ["an", ...THE_SOME] },
];
