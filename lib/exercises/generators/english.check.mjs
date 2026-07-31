// Vérification du générateur de quiz anglais : node lib/exercises/generators/english.check.mjs
import assert from "node:assert/strict";
import { generateQuizSeries, VOCABULARY } from "./english.ts";

const DIFFICULTIES = ["facile", "moyen", "expert"];
const MODES = ["en-fr", "fr-en"];

for (const difficulty of DIFFICULTIES) {
  const pool = VOCABULARY[difficulty];

  assert.ok(pool.length >= 14, `${difficulty} : pool trop petit (${pool.length})`);

  // Un mot dupliqué d'un côté rendrait une question ambiguë ou un distracteur égal à la réponse.
  for (const side of [0, 1]) {
    const values = pool.map((pair) => pair[side]);
    assert.equal(
      new Set(values).size,
      values.length,
      `${difficulty} : doublon côté ${side === 0 ? "anglais" : "français"}`,
    );
  }

  for (const mode of MODES) {
    const enToFr = mode === "en-fr";
    const translations = new Map(
      pool.map((pair) => (enToFr ? [pair[0], pair[1]] : [pair[1], pair[0]])),
    );

    // 30 tirages pour couvrir l'aléatoire
    for (let run = 0; run < 30; run++) {
      const series = generateQuizSeries(mode, difficulty);

      assert.equal(
        series.length,
        10,
        `${mode}/${difficulty} : série de ${series.length} au lieu de 10`,
      );

      // Vérification explicite des doublons avec liste des mots dupliqués
      const prompts = series.map((q) => q.prompt);
      const uniquePrompts = new Set(prompts);
      if (uniquePrompts.size !== 10) {
        const duplicates = prompts.filter((p, i) => prompts.indexOf(p) !== i);
        assert.fail(
          `${mode}/${difficulty} run ${run + 1}: mots répétés détectés: ${duplicates.join(", ")}`,
        );
      }

      for (const q of series) {
        assert.equal(q.choices.length, 4, `${mode}/${difficulty} : ${q.choices.length} choix`);
        assert.equal(
          new Set(q.choices).size,
          4,
          `${mode}/${difficulty} : choix dupliqué pour "${q.prompt}"`,
        );
        assert.ok(
          q.answerIndex >= 0 && q.answerIndex < 4,
          `${mode}/${difficulty} : answerIndex ${q.answerIndex} hors bornes`,
        );
        assert.equal(
          q.choices[q.answerIndex],
          translations.get(q.prompt),
          `${mode}/${difficulty} : mauvaise traduction pour "${q.prompt}"`,
        );
      }
    }
  }
}

const total = DIFFICULTIES.reduce((sum, d) => sum + VOCABULARY[d].length, 0);
console.log(`OK — ${total} mots, 180 séries vérifiées`);
