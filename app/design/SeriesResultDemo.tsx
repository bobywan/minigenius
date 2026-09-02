"use client";

import { useState } from "react";
import { type RecapItem, SeriesResultScreen } from "@/components/game/SeriesResultScreen";
import { Button } from "@/components/ui/Button";

const PRESETS = [3, 6, 8, 10] as const;

const SAMPLE_BANK = [
  { prompt: "4 + ? = 9", expected: "5", wrong: "4" },
  { prompt: "cat", expected: "chat", wrong: "chien" },
  { prompt: "12 − ? = 7", expected: "5", wrong: "6" },
  { prompt: "dog", expected: "chien", wrong: "chat" },
  { prompt: "3 × 4 = ?", expected: "12", wrong: "7" },
  { prompt: "red", expected: "rouge", wrong: "bleu" },
  { prompt: "? + 8 = 15", expected: "7", wrong: "6" },
  { prompt: "house", expected: "maison", wrong: "arbre" },
  { prompt: "18 ÷ 3 = ?", expected: "6", wrong: "5" },
  { prompt: "blue", expected: "bleu", wrong: "vert" },
] as const;

function recapFor(score: number): RecapItem[] {
  return SAMPLE_BANK.map((item, i) => {
    const ok = i < score;
    return {
      prompt: item.prompt,
      expected: item.expected,
      given: ok ? item.expected : item.wrong,
      ok,
    };
  });
}

export function SeriesResultDemo() {
  const [correct, setCorrect] = useState(10);
  const [showNext, setShowNext] = useState(true);
  const [mountKey, setMountKey] = useState(0);

  function applyScore(score: number) {
    setCorrect(score);
    setMountKey((key) => key + 1);
  }

  function remount() {
    setMountKey((key) => key + 1);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 bg-white rounded-[var(--radius-card)] p-4 border-2 border-slate-200 text-sky-800">
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((score) => (
            <Button
              key={score}
              variant={correct === score ? "primary" : "ghost"}
              size="sm"
              onClick={() => applyScore(score)}
            >
              {score}/10
            </Button>
          ))}
        </div>

        <label className="flex flex-col gap-2 font-body text-sm">
          Score : {correct}/10
          <input
            type="range"
            min={0}
            max={10}
            step={1}
            value={correct}
            onChange={(event) => applyScore(Number(event.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </label>
        <label className="flex items-center gap-2 font-body text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={showNext}
            onChange={(event) => setShowNext(event.target.checked)}
            className="size-4 accent-emerald-500"
          />
          Afficher Continuer (nextHref)
        </label>
        <Button variant="secondary" size="sm" onClick={remount}>
          Relancer
        </Button>
      </div>

      <SeriesResultScreen
        key={mountKey}
        correct={correct}
        onReplay={remount}
        nextHref={showNext ? "/design" : undefined}
        items={recapFor(correct)}
      />
    </div>
  );
}
