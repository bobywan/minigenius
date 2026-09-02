"use client";

import { useState } from "react";
import { SeriesResultScreen } from "@/components/game/SeriesResultScreen";
import { Button } from "@/components/ui/Button";

const PRESETS = [3, 6, 8, 10] as const;

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

      <div className="w-full max-w-md mx-auto">
        <SeriesResultScreen
          key={mountKey}
          correct={correct}
          onReplay={remount}
          nextHref={showNext ? "/design" : undefined}
        />
      </div>
    </div>
  );
}
