// node lib/exercises/generators/history.check.mjs
import assert from "node:assert/strict";
import { HISTORY_MODULES, HISTORY_SLOTS } from "../../types.ts";
import { generateHistoryQuiz, generateOneHistoryQuiz, historyPool } from "./history/index.ts";

const MIN_POOL = 14;

function extraCount(seed) {
  return new Set(seed.distractors.filter((d) => d !== seed.answer)).size;
}

for (const historyModule of HISTORY_MODULES) {
  for (const slot of HISTORY_SLOTS[historyModule]) {
    const pool = historyPool(historyModule, slot);
    assert.ok(
      pool.length >= MIN_POOL,
      `${historyModule}/${slot} : pool trop petit (${pool.length})`,
    );

    const prompts = pool.map((seed) => seed.prompt);
    assert.equal(
      new Set(prompts).size,
      prompts.length,
      `${historyModule}/${slot} : prompt dupliqué`,
    );

    for (const seed of pool) {
      const extras = extraCount(seed);
      assert.ok(
        extras >= 3,
        `${historyModule}/${slot} : ${extras} distracteurs pour « ${seed.prompt} », attendu ≥ 3`,
      );
    }

    for (let run = 0; run < 30; run++) {
      const series = generateHistoryQuiz(historyModule, slot);
      assert.equal(series.length, 10, `${historyModule}/${slot} : série de ${series.length}`);

      const seriesPrompts = series.map((q) => q.prompt);
      assert.equal(
        new Set(seriesPrompts).size,
        10,
        `${historyModule}/${slot} run ${run + 1}: questions répétées`,
      );

      for (const q of series) {
        const n = q.choices.length;
        assert.equal(n, 4, `${historyModule}/${slot} : ${n} choix au lieu de 4`);
        assert.equal(new Set(q.choices).size, n, `${historyModule}/${slot} : choix dupliqué`);
        assert.ok(q.answerIndex >= 0 && q.answerIndex < n);
      }
    }

    const one = generateOneHistoryQuiz(historyModule, slot);
    assert.equal(one.choices.length, 4);
  }
}

let total = 0;
for (const historyModule of HISTORY_MODULES) {
  for (const slot of HISTORY_SLOTS[historyModule]) {
    total += historyPool(historyModule, slot).length;
  }
}

console.log(`OK — ${total} items, ${HISTORY_MODULES.length} modules, séries vérifiées`);
