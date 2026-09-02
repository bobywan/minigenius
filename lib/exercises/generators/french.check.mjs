// node lib/exercises/generators/french.check.mjs
import assert from "node:assert/strict";
import { FRENCH_MODULES, FRENCH_SLOTS } from "../../types.ts";
import { frenchPool, generateFrenchQuiz, generateOneFrenchQuiz } from "./french/index.ts";

const MIN_POOL = 14;
const BINARY_HOMOPHONE_SLOTS = new Set(["a-a", "et-est", "on-ont", "son-sont", "ou-ou"]);

function extraCount(seed) {
  return new Set(seed.distractors.filter((d) => d !== seed.answer)).size;
}

function expectedChoices(frenchModule, slot, seed) {
  if (frenchModule !== "homophones") return 4;
  if (slot === "ces-ses") return 4;
  if (slot === "tout") return extraCount(seed) + 1;
  return 2;
}

for (const frenchModule of FRENCH_MODULES) {
  for (const slot of FRENCH_SLOTS[frenchModule]) {
    const pool = frenchPool(frenchModule, slot);
    assert.ok(
      pool.length >= MIN_POOL,
      `${frenchModule}/${slot} : pool trop petit (${pool.length})`,
    );

    const prompts = pool.map((seed) =>
      seed.passage ? `${seed.passage}|${seed.prompt}` : seed.prompt,
    );
    assert.equal(
      new Set(prompts).size,
      prompts.length,
      `${frenchModule}/${slot} : prompt dupliqué`,
    );

    for (const seed of pool) {
      const extras = extraCount(seed);
      const want = expectedChoices(frenchModule, slot, seed) - 1;
      assert.ok(
        extras >= want,
        `${frenchModule}/${slot} : ${extras} distracteurs pour « ${seed.prompt} », attendu ≥ ${want}`,
      );
      if (frenchModule === "homophones" && BINARY_HOMOPHONE_SLOTS.has(slot)) {
        assert.equal(extras, 1, `${frenchModule}/${slot} : paire binaire attendue`);
      }
    }

    for (let run = 0; run < 30; run++) {
      const series = generateFrenchQuiz(frenchModule, slot);
      assert.equal(series.length, 10, `${frenchModule}/${slot} : série de ${series.length}`);

      const seriesPrompts = series.map((q) => (q.passage ? `${q.passage}|${q.prompt}` : q.prompt));
      assert.equal(
        new Set(seriesPrompts).size,
        10,
        `${frenchModule}/${slot} run ${run + 1}: questions répétées`,
      );

      for (const q of series) {
        const n = q.choices.length;
        if (frenchModule === "homophones" && BINARY_HOMOPHONE_SLOTS.has(slot)) {
          assert.equal(n, 2, `${frenchModule}/${slot} : ${n} choix au lieu de 2`);
        } else if (frenchModule === "homophones" && slot === "ces-ses") {
          assert.equal(n, 4, `${frenchModule}/${slot} : ${n} choix au lieu de 4`);
        } else if (frenchModule === "homophones" && slot === "tout") {
          assert.ok(n === 2 || n === 4, `${frenchModule}/${slot} : ${n} choix (2 ou 4)`);
        } else {
          assert.equal(n, 4, `${frenchModule}/${slot} : ${n} choix au lieu de 4`);
        }
        assert.equal(new Set(q.choices).size, n, `${frenchModule}/${slot} : choix dupliqué`);
        assert.ok(q.answerIndex >= 0 && q.answerIndex < n);
        if (frenchModule === "lecture") {
          assert.ok(q.passage, `${frenchModule}/${slot} : passage manquant`);
        }
      }
    }

    const one = generateOneFrenchQuiz(frenchModule, slot);
    if (frenchModule === "homophones" && BINARY_HOMOPHONE_SLOTS.has(slot)) {
      assert.equal(one.choices.length, 2);
    } else if (frenchModule === "homophones" && slot === "tout") {
      assert.ok(one.choices.length === 2 || one.choices.length === 4);
    } else {
      assert.equal(one.choices.length, 4);
    }
  }
}

let total = 0;
for (const frenchModule of FRENCH_MODULES) {
  for (const slot of FRENCH_SLOTS[frenchModule]) {
    if (slot === "mixte" || slot === "tout") continue;
    total += frenchPool(frenchModule, slot).length;
  }
}

console.log(
  `OK — ${total} items (hors mixte/tout), ${FRENCH_MODULES.length} modules, séries vérifiées`,
);
