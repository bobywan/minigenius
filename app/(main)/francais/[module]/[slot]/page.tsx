"use client";

import { notFound } from "next/navigation";
import { use, useCallback, useEffect, useState } from "react";
import { ChoiceGrid } from "@/components/game/ChoiceGrid";
import { GameHeader } from "@/components/game/GameHeader";
import { GamePendingShell } from "@/components/game/GamePendingShell";
import { ReadingPrompt } from "@/components/game/ReadingPrompt";
import { SeriesResultScreen } from "@/components/game/SeriesResultScreen";
import { WordPrompt } from "@/components/game/WordPrompt";
import { Button } from "@/components/ui/Button";
import { playError, playSuccess } from "@/lib/audio/sounds";
import { generateFrenchQuiz } from "@/lib/exercises/generators/french";
import { useSeriesGame } from "@/lib/hooks/useSeriesGame";
import { useProgressStore } from "@/lib/store/progressStore";
import type { FrenchModule, FrenchSlot } from "@/lib/types";
import {
  computeStars,
  FRENCH_SLOT_LABELS,
  FRENCH_SLOTS,
  isFrenchModule,
  isFrenchSlot,
  SERIES_LENGTH,
} from "@/lib/types";

export default function FrenchQuizPage({
  params,
}: {
  params: Promise<{ module: string; slot: string }>;
}) {
  const { module: rawModule, slot: rawSlot } = use(params);

  if (!isFrenchModule(rawModule)) notFound();
  if (!isFrenchSlot(rawModule, rawSlot)) notFound();

  const frenchModule = rawModule as FrenchModule;
  const frenchSlot = rawSlot as FrenchSlot;

  const { saveResult } = useProgressStore();
  const generate = useCallback(
    () => generateFrenchQuiz(frenchModule, frenchSlot),
    [frenchModule, frenchSlot],
  );
  const {
    series,
    current,
    currentIdx,
    dotStates,
    correctCount,
    phase,
    answers,
    needsContinue,
    recordAnswer,
    continueAfterFeedback,
    replay,
  } = useSeriesGame(generate);

  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  useEffect(() => {
    if (phase === "playing") setSelectedIdx(null);
  }, [phase]);

  const handleSelect = useCallback(
    (index: number) => {
      if (phase !== "playing" || !current) return;
      const isCorrect = index === current.answerIndex;
      setSelectedIdx(index);
      if (isCorrect) playSuccess();
      else playError();
      recordAnswer(isCorrect, current.choices[index] ?? "");
    },
    [phase, current, recordAnswer],
  );

  useEffect(() => {
    if (phase !== "finished") return;
    saveResult("francais", frenchModule, frenchSlot, {
      correct: correctCount,
      stars: computeStars(correctCount),
      completedAt: new Date().toISOString(),
    });
  }, [phase, correctCount, frenchModule, frenchSlot, saveResult]);

  const backHref = `/francais/${frenchModule}`;

  if (!series) {
    return <GamePendingShell backHref={backHref} />;
  }

  const slots = FRENCH_SLOTS[frenchModule];
  const nextSlot = slots[slots.indexOf(frenchSlot) + 1];
  const nextHref = nextSlot ? `/francais/${frenchModule}/${nextSlot}` : backHref;

  if (phase === "finished") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <SeriesResultScreen
          correct={correctCount}
          onReplay={replay}
          nextHref={nextHref}
          items={series.map((q, i) => ({
            prompt: q.prompt,
            given: answers[i]?.given ?? "",
            expected: q.choices[q.answerIndex] ?? "",
            ok: answers[i]?.isCorrect ?? false,
          }))}
        />
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center px-8 lg:px-16 py-8 lg:py-16 gap-8">
      <GameHeader
        title={FRENCH_SLOT_LABELS[frenchSlot]}
        exitHref={backHref}
        states={dotStates}
        current={currentIdx}
        total={SERIES_LENGTH}
      />

      <div className="flex flex-col items-center gap-8 w-full max-w-md bg-surface text-ink border border-line shadow-card p-8 rounded-[var(--radius-card)]">
        {current && (
          <>
            {current.passage ? (
              <ReadingPrompt passage={current.passage} question={current.prompt} />
            ) : (
              <WordPrompt
                prompt={current.prompt}
                variant="sentence"
                highlightWord={current.highlightWord}
              />
            )}

            <ChoiceGrid
              choices={current.choices}
              answerIndex={current.answerIndex}
              selectedIdx={selectedIdx}
              revealed={phase === "feedback"}
              onSelect={handleSelect}
            />
            {needsContinue && current.explain ? (
              <p className="w-full rounded-[var(--radius-btn)] bg-star-soft px-4 py-3 text-center font-body text-lg text-ink">
                {current.explain}
              </p>
            ) : null}
            {needsContinue && (
              <Button variant="secondary" className="w-full" onClick={continueAfterFeedback}>
                Continuer
              </Button>
            )}
          </>
        )}
      </div>
    </main>
  );
}
