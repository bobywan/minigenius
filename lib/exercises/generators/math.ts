import type { Difficulty, Exercise, MathModule } from "@/lib/types";

const SERIES_LENGTH = 10;

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateAddition(difficulty: Difficulty): Exercise {
  if (difficulty === "expert") {
    const a = randInt(1, 100);
    const b = randInt(1, 100);
    const r = a + b;
    const hole = randInt(0, 2) as 0 | 1 | 2;
    return {
      left: hole === 0 ? null : a,
      op: "+",
      right: hole === 1 ? null : b,
      result: hole === 2 ? null : r,
      answer: hole === 0 ? a : hole === 1 ? b : r,
    };
  }
  const max = difficulty === "facile" ? 20 : 100;
  const a = randInt(1, max);
  const b = randInt(1, max);
  return { left: a, op: "+", right: b, result: null, answer: a + b };
}

function generateSoustraction(difficulty: Difficulty): Exercise {
  if (difficulty === "expert") {
    const b = randInt(1, 99);
    const a = randInt(b, 100); // a >= b pour éviter les négatifs
    const r = a - b;
    const hole = randInt(0, 2) as 0 | 1 | 2;
    return {
      left: hole === 0 ? null : a,
      op: "-",
      right: hole === 1 ? null : b,
      result: hole === 2 ? null : r,
      answer: hole === 0 ? a : hole === 1 ? b : r,
    };
  }
  const max = difficulty === "facile" ? 20 : 100;
  const b = randInt(1, max);
  const a = randInt(b, max);
  return { left: a, op: "-", right: b, result: null, answer: a - b };
}

function generateMultiplication(difficulty: Difficulty): Exercise {
  if (difficulty === "expert") {
    const a = randInt(2, 12);
    const b = randInt(2, 12);
    const r = a * b;
    const hole = randInt(0, 2) as 0 | 1 | 2;
    return {
      left: hole === 0 ? null : a,
      op: "×",
      right: hole === 1 ? null : b,
      result: hole === 2 ? null : r,
      answer: hole === 0 ? a : hole === 1 ? b : r,
    };
  }
  const max = difficulty === "facile" ? 5 : 12;
  const a = randInt(1, max);
  const b = randInt(1, max);
  return { left: a, op: "×", right: b, result: null, answer: a * b };
}

function generateDivision(difficulty: Difficulty): Exercise {
  // Division entière uniquement
  if (difficulty === "expert") {
    const b = randInt(2, 9);
    const q = randInt(1, 10);
    const a = b * q;
    const hole = randInt(0, 2) as 0 | 1 | 2;
    return {
      left: hole === 0 ? null : a,
      op: "÷",
      right: hole === 1 ? null : b,
      result: hole === 2 ? null : q,
      answer: hole === 0 ? a : hole === 1 ? b : q,
    };
  }
  const maxQ = difficulty === "facile" ? 5 : 10;
  const b = randInt(2, difficulty === "facile" ? 5 : 9);
  const q = randInt(1, maxQ);
  const a = b * q;
  return { left: a, op: "÷", right: b, result: null, answer: q };
}

const generators: Record<MathModule, (d: Difficulty) => Exercise> = {
  addition: generateAddition,
  soustraction: generateSoustraction,
  multiplication: generateMultiplication,
  division: generateDivision,
};

function exerciseKey(e: Exercise): string {
  return `${e.left ?? "?"}${e.op}${e.right ?? "?"}=${e.result ?? "?"}`;
}

export function generateOne(op: MathModule, difficulty: Difficulty): Exercise {
  return generators[op](difficulty);
}

function generateMixed(difficulty: Difficulty): Exercise {
  const ops: MathModule[] = ["addition", "soustraction", "multiplication", "division"];
  const op = ops[Math.floor(Math.random() * ops.length)] as MathModule;
  return generators[op](difficulty);
}

export function generateMixedSeries(difficulty: Difficulty): Exercise[] {
  const series: Exercise[] = [];
  const seen = new Set<string>();
  let attempts = 0;

  while (series.length < SERIES_LENGTH && attempts < 200) {
    attempts++;
    const ex = generateMixed(difficulty);
    const key = exerciseKey(ex);
    if (!seen.has(key)) {
      seen.add(key);
      series.push(ex);
    }
  }

  while (series.length < SERIES_LENGTH) {
    series.push(generateMixed(difficulty));
  }

  return series;
}

export function generateSeries(op: MathModule, difficulty: Difficulty): Exercise[] {
  const gen = generators[op];
  const series: Exercise[] = [];
  const seen = new Set<string>();
  let attempts = 0;

  while (series.length < SERIES_LENGTH && attempts < 200) {
    attempts++;
    const ex = gen(difficulty);
    const key = exerciseKey(ex);
    if (!seen.has(key)) {
      seen.add(key);
      series.push(ex);
    }
  }

  // ponytail: si 200 tentatives insuffisantes (très improbable), on accepte les doublons
  while (series.length < SERIES_LENGTH) {
    series.push(gen(difficulty));
  }

  return series;
}
