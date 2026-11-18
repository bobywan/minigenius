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
import { generateEnglishQuiz } from "@/lib/exercises/generators/english-quiz";
import { useSeriesGame } from "@/lib/hooks/useSeriesGame";
import { useProgressStore } from "@/lib/store/progressStore";
import type { EnglishQuizModule, EnglishQuizSlot } from "@/lib/types";
import {
  computeStars,
  ENGLISH_QUIZ_SLOT_LABELS,
  ENGLISH_QUIZ_SLOTS,
  isEnglishQuizModule,
  isEnglishQuizSlot,
  SERIES_LENGTH,
} from "@/lib/types";

export default function EnglishQuizPage({
  params,
}: {
  params: Promise<{ module: string; slot: string }>;
}) {
  const { module: rawModule, slot: rawSlot } = use(params);

  if (!isEnglishQuizModule(rawModule)) notFound();
  if (!isEnglishQuizSlot(rawModule, rawSlot)) notFound();

  const quizModule = rawModule as EnglishQuizModule;
  const quizSlot = rawSlot as EnglishQuizSlot;

  const { saveResult } = useProgressStore();
  const generate = useCallback(
    () => generateEnglishQuiz(quizModule, quizSlot),
    [quizModule, quizSlot],
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
    saveResult("anglais", quizModule, quizSlot, {
      correct: correctCount,
      stars: computeStars(correctCount),
      completedAt: new Date().toISOString(),
    });
  }, [phase, correctCount, quizModule, quizSlot, saveResult]);

  const backHref = `/anglais/${quizModule}`;

  if (!series) {
    return <GamePendingShell backHref={backHref} />;
  }

  const slots = ENGLISH_QUIZ_SLOTS[quizModule];
  const nextSlot = slots[slots.indexOf(quizSlot) + 1];
  const nextHref = nextSlot ? `/anglais/${quizModule}/${nextSlot}` : backHref;
  const enableSpeech = quizModule === "conjugaison" || quizModule === "pluriels";

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
        title={ENGLISH_QUIZ_SLOT_LABELS[quizSlot]}
        exitHref={backHref}
        states={dotStates}
        current={currentIdx}
        total={SERIES_LENGTH}
      />

      <div className="flex flex-col items-center gap-8 w-full max-w-md bg-surface text-ink border border-line shadow-card p-8 rounded-[var(--radius-card)]">
        {current && (
          <>
            {quizModule === "lecture" && current.passage ? (
              <ReadingPrompt passage={current.passage} question={current.prompt} />
            ) : (
              <WordPrompt prompt={current.prompt} variant="sentence" />
            )}

            <ChoiceGrid
              choices={current.choices}
              answerIndex={current.answerIndex}
              selectedIdx={selectedIdx}
              revealed={phase === "feedback"}
              onSelect={handleSelect}
              enableSpeech={enableSpeech}
            />
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
