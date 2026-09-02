import type { QuizQuestion } from "../../../types.ts";

export const SERIES_LENGTH = 10;

export type QuizSeed = {
  prompt: string;
  answer: string;
  distractors: readonly string[];
  passage?: string;
};

export function shuffle<T>(items: readonly T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = out[i] as T;
    out[i] = out[j] as T;
    out[j] = tmp;
  }
  return out;
}

export function toQuestion(seed: QuizSeed): QuizQuestion {
  const seen = new Set([seed.answer]);
  const extra: string[] = [];
  for (const distractor of seed.distractors) {
    if (seen.has(distractor)) continue;
    seen.add(distractor);
    extra.push(distractor);
  }

  if (extra.length < 1) {
    throw new Error(`Pas assez de distracteurs pour « ${seed.prompt} »`);
  }

  const choices = shuffle([seed.answer, ...extra]);
  const question: QuizQuestion = {
    prompt: seed.prompt,
    choices,
    answerIndex: choices.indexOf(seed.answer),
  };
  if (seed.passage) question.passage = seed.passage;
  return question;
}

function seedKey(seed: QuizSeed): string {
  return seed.passage ? `${seed.passage}|${seed.prompt}` : seed.prompt;
}

export function pickSeries(pool: readonly QuizSeed[]): QuizQuestion[] {
  const picked: QuizSeed[] = [];
  const seen = new Set<string>();
  let attempts = 0;
  const maxAttempts = 10;

  while (picked.length < SERIES_LENGTH && attempts < maxAttempts) {
    for (const seed of shuffle(pool)) {
      if (picked.length === SERIES_LENGTH) break;
      const key = seedKey(seed);
      if (seen.has(key)) continue;
      seen.add(key);
      picked.push(seed);
    }
    attempts++;
  }

  if (picked.length < SERIES_LENGTH) {
    throw new Error(
      `Impossible de générer ${SERIES_LENGTH} questions uniques. Seulement ${picked.length} trouvées.`,
    );
  }

  return picked.map(toQuestion);
}

export function pickOne(pool: readonly QuizSeed[]): QuizQuestion {
  const seed = shuffle(pool)[0];
  if (!seed) throw new Error("Pool vide");
  return toQuestion(seed);
}

export function mergePools(pools: readonly (readonly QuizSeed[])[]): QuizSeed[] {
  const seen = new Set<string>();
  const out: QuizSeed[] = [];
  for (const pool of pools) {
    for (const seed of pool) {
      if (seen.has(seedKey(seed))) continue;
      seen.add(seedKey(seed));
      out.push(seed);
    }
  }
  return out;
}
