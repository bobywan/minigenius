// node lib/exercises/generators/english.check.mjs
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { generateQuizSeries, VOCABULARY } from "./english.ts";

const MODES = ["en-fr", "fr-en"];
const themes = Object.keys(VOCABULARY);

for (const theme of themes) {
  const pool = VOCABULARY[theme];

  assert.ok(pool.length >= 14, `${theme} : pool trop petit (${pool.length})`);

  for (const side of [0, 1]) {
    const values = pool.map((pair) => pair[side]);
    assert.equal(
      new Set(values).size,
      values.length,
      `${theme} : doublon côté ${side === 0 ? "anglais" : "français"}`,
    );
  }

  for (const mode of MODES) {
    const enToFr = mode === "en-fr";
    const translations = new Map(
      pool.map((pair) => (enToFr ? [pair[0], pair[1]] : [pair[1], pair[0]])),
    );

    for (let run = 0; run < 30; run++) {
      const series = generateQuizSeries(mode, theme);

      assert.equal(series.length, 10, `${mode}/${theme} : série de ${series.length} au lieu de 10`);

      const prompts = series.map((q) => q.prompt);
      const uniquePrompts = new Set(prompts);
      if (uniquePrompts.size !== 10) {
        const duplicates = prompts.filter((p, i) => prompts.indexOf(p) !== i);
        assert.fail(`${mode}/${theme} run ${run + 1}: mots répétés: ${duplicates.join(", ")}`);
      }

      for (const q of series) {
        assert.equal(q.choices.length, 4, `${mode}/${theme} : ${q.choices.length} choix`);
        assert.equal(
          new Set(q.choices).size,
          4,
          `${mode}/${theme} : choix dupliqué pour "${q.prompt}"`,
        );
        assert.ok(
          q.answerIndex >= 0 && q.answerIndex < 4,
          `${mode}/${theme} : answerIndex ${q.answerIndex} hors bornes`,
        );
        assert.equal(
          q.choices[q.answerIndex],
          translations.get(q.prompt),
          `${mode}/${theme} : mauvaise traduction pour "${q.prompt}"`,
        );
      }
    }
  }
}

const total = VOCABULARY.tout.length;
const audioDir = join(dirname(fileURLToPath(import.meta.url)), "../../../public/audio/en");
for (const [en] of VOCABULARY.tout) {
  const slug = en.trim().toLowerCase().replace(/\s+/g, "-");
  assert.ok(existsSync(join(audioDir, `${slug}.mp3`)), `MP3 manquant : ${slug}.mp3`);
}

console.log(
  `OK — ${total} mots (tout), ${themes.length} thèmes, ${themes.length * 2 * 30} séries vérifiées, ${total} MP3`,
);
