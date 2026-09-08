// node lib/exercises/generators/english-quiz.check.mjs
import assert from "node:assert/strict";
import { ENGLISH_QUIZ_MODULES, ENGLISH_QUIZ_SLOTS } from "../../types.ts";
import {
  englishQuizPool,
  generateEnglishQuiz,
  generateOneEnglishQuiz,
} from "./english-quiz/index.ts";

const MIN_POOL = 14;

function extraCount(seed) {
  return new Set(seed.distractors.filter((d) => d !== seed.answer)).size;
}

for (const quizModule of ENGLISH_QUIZ_MODULES) {
  for (const slot of ENGLISH_QUIZ_SLOTS[quizModule]) {
    const pool = englishQuizPool(quizModule, slot);
    assert.ok(pool.length >= MIN_POOL, `${quizModule}/${slot} : pool trop petit (${pool.length})`);

    const prompts = pool.map((seed) =>
      seed.passage ? `${seed.passage}|${seed.prompt}` : seed.prompt,
    );
    assert.equal(new Set(prompts).size, prompts.length, `${quizModule}/${slot} : prompt dupliqué`);

    for (const seed of pool) {
      const extras = extraCount(seed);
      assert.ok(
        extras >= 3,
        `${quizModule}/${slot} : ${extras} distracteurs pour « ${seed.prompt} », attendu ≥ 3`,
      );
    }

    for (let run = 0; run < 30; run++) {
      const series = generateEnglishQuiz(quizModule, slot);
      assert.equal(series.length, 10, `${quizModule}/${slot} : série de ${series.length}`);

      const seriesPrompts = series.map((q) => (q.passage ? `${q.passage}|${q.prompt}` : q.prompt));
      assert.equal(
        new Set(seriesPrompts).size,
        10,
        `${quizModule}/${slot} run ${run + 1}: questions répétées`,
      );

      for (const q of series) {
        const n = q.choices.length;
        assert.equal(n, 4, `${quizModule}/${slot} : ${n} choix au lieu de 4`);
        assert.equal(new Set(q.choices).size, n, `${quizModule}/${slot} : choix dupliqué`);
        assert.ok(q.answerIndex >= 0 && q.answerIndex < n);
        if (quizModule === "lecture") {
          assert.ok(q.passage, `${quizModule}/${slot} : passage manquant`);
        }
      }
    }

    const one = generateOneEnglishQuiz(quizModule, slot);
    assert.equal(one.choices.length, 4);
  }
}

let total = 0;
for (const quizModule of ENGLISH_QUIZ_MODULES) {
  for (const slot of ENGLISH_QUIZ_SLOTS[quizModule]) {
    if (slot === "mixte" || slot === "tout") continue;
    total += englishQuizPool(quizModule, slot).length;
  }
}

console.log(
  `OK — ${total} items (hors mixte/tout), ${ENGLISH_QUIZ_MODULES.length} modules, séries vérifiées`,
);
