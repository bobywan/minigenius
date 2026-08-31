"use client";

import { notFound } from "next/navigation";
import { use, useCallback, useEffect, useState } from "react";
import { ChoiceGrid } from "@/components/game/ChoiceGrid";
import { GamePendingShell } from "@/components/game/GamePendingShell";
import { SeriesResultScreen } from "@/components/game/SeriesResultScreen";
import { WordPrompt } from "@/components/game/WordPrompt";
import { BackLink } from "@/components/ui/BackLink";
import { ProgressDots } from "@/components/ui/ProgressDots";
import { playError, playSuccess } from "@/lib/audio/sounds";
import { generateMixedQuizSeries, generateQuizSeries } from "@/lib/exercises/generators/english";
import { useSeriesGame } from "@/lib/hooks/useSeriesGame";
import { useProgressStore } from "@/lib/store/progressStore";
import type { EnglishModule, EnglishTheme, MixedModule } from "@/lib/types";
import { computeStars, ENGLISH_DIRECTIONS, ENGLISH_THEMES, SERIES_LENGTH } from "@/lib/types";

export default function EnglishQuizPage({
  params,
}: {
  params: Promise<{ theme: string; mode: string }>;
}) {
  const { theme, mode } = use(params);

  if (!ENGLISH_THEMES.includes(theme as EnglishTheme)) notFound();
  if (!ENGLISH_DIRECTIONS.includes(mode as EnglishModule | MixedModule)) notFound();

  const englishTheme = theme as EnglishTheme;
  const gameMode = mode as EnglishModule | MixedModule;

  const { saveResult } = useProgressStore();
  const generate = useCallback(() => {
    if (gameMode === "mixte") return generateMixedQuizSeries(englishTheme);
    return generateQuizSeries(gameMode, englishTheme);
  }, [gameMode, englishTheme]);
  const { series, current, currentIdx, dotStates, correctCount, phase, recordAnswer, replay } =
    useSeriesGame(generate);

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
      recordAnswer(isCorrect);
    },
    [phase, current, recordAnswer],
  );

  useEffect(() => {
    if (phase !== "finished") return;
    saveResult("anglais", englishTheme, gameMode, {
      correct: correctCount,
      stars: computeStars(correctCount),
      completedAt: new Date().toISOString(),
    });
  }, [phase, correctCount, englishTheme, gameMode, saveResult]);

  if (!series) {
    return <GamePendingShell backHref={`/anglais/traduction/${englishTheme}`} />;
  }

  const nextMode = ENGLISH_DIRECTIONS[ENGLISH_DIRECTIONS.indexOf(gameMode) + 1];
  const nextHref = nextMode
    ? `/anglais/traduction/${englishTheme}/${nextMode}`
    : `/anglais/traduction/${englishTheme}`;

  if (phase === "finished") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <SeriesResultScreen correct={correctCount} onReplay={replay} nextHref={nextHref} />
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center px-8 lg:px-16 py-8 lg:py-16 gap-8">
      <BackLink href={`/anglais/traduction/${englishTheme}`} />

      <header className="grid gap-4 w-full text-center">
        <p className="font-bold font-display text-white">
          {currentIdx + 1} / {series.length}
        </p>
        <ProgressDots total={SERIES_LENGTH} states={dotStates} current={currentIdx} />
      </header>

      <div className="flex flex-col items-center gap-8 w-full max-w-md bg-white p-8 rounded-xl">
        {current && (
          <>
            <WordPrompt
              prompt={current.prompt}
              speakText={current.enToFr ? current.prompt : undefined}
            />

            <ChoiceGrid
              choices={current.choices}
              answerIndex={current.answerIndex}
              selectedIdx={selectedIdx}
              revealed={phase === "feedback"}
              onSelect={handleSelect}
              enableSpeech={!current.enToFr}
            />
          </>
        )}
      </div>
    </main>
  );
}
