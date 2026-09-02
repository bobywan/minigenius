"use client";

import { notFound } from "next/navigation";
import { use, useCallback, useEffect, useState } from "react";
import { ExerciseDisplay, formatExercisePrompt } from "@/components/game/ExerciseDisplay";
import { GamePendingShell } from "@/components/game/GamePendingShell";
import { SeriesResultScreen } from "@/components/game/SeriesResultScreen";
import { AnswerInput } from "@/components/ui/AnswerInput";
import { BackLink } from "@/components/ui/BackLink";
import { Button } from "@/components/ui/Button";
import { NumPad } from "@/components/ui/NumPad";
import { ProgressDots } from "@/components/ui/ProgressDots";
import { playError, playSuccess } from "@/lib/audio/sounds";
import { generateMixedSeries } from "@/lib/exercises/generators/math";
import { useSeriesGame } from "@/lib/hooks/useSeriesGame";
import { useProgressStore } from "@/lib/store/progressStore";
import type { Difficulty } from "@/lib/types";
import { computeStars, DIFFICULTIES, SERIES_LENGTH } from "@/lib/types";

type InputState = "idle" | "correct" | "wrong";

export default function MixteGamePage({ params }: { params: Promise<{ difficulty: string }> }) {
  const { difficulty: diff } = use(params);

  if (!DIFFICULTIES.includes(diff as Difficulty)) notFound();
  const difficulty = diff as Difficulty;

  const { saveResult } = useProgressStore();
  const generate = useCallback(() => generateMixedSeries(difficulty), [difficulty]);
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

  const [inputValue, setInputValue] = useState("");
  const [inputState, setInputState] = useState<InputState>("idle");

  useEffect(() => {
    if (phase === "playing") {
      setInputValue("");
      setInputState("idle");
    }
  }, [phase]);

  const handleValidate = useCallback(() => {
    if (phase !== "playing" || !current) return;
    const isCorrect = Number.parseInt(inputValue, 10) === current.answer;
    if (isCorrect) {
      playSuccess();
      setInputState("correct");
    } else {
      playError();
      setInputState("wrong");
    }
    recordAnswer(isCorrect, inputValue);
  }, [phase, current, inputValue, recordAnswer]);

  useEffect(() => {
    if (phase !== "finished") return;
    saveResult("maths", "mixte", difficulty, {
      correct: correctCount,
      stars: computeStars(correctCount),
      completedAt: new Date().toISOString(),
    });
  }, [phase, correctCount, difficulty, saveResult]);

  if (!series) {
    return <GamePendingShell backHref="/maths/mixte" />;
  }

  const nextDiff = DIFFICULTIES[DIFFICULTIES.indexOf(difficulty) + 1];
  const nextHref = nextDiff ? `/maths/mixte/${nextDiff}` : "/maths/mixte";

  if (phase === "finished") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <SeriesResultScreen
          correct={correctCount}
          onReplay={replay}
          nextHref={nextHref}
          items={series.map((ex, i) => ({
            prompt: formatExercisePrompt(ex),
            given: answers[i]?.given ?? "",
            expected: String(ex.answer),
            ok: answers[i]?.isCorrect ?? false,
          }))}
        />
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center px-8 lg:px-16 py-8 lg:py-16 gap-8">
      <BackLink href="/maths/mixte" />

      <header className="grid gap-4 w-full text-center">
        <p className="font-bold font-display text-white">
          {currentIdx + 1} / {series.length}
        </p>
        <ProgressDots total={SERIES_LENGTH} states={dotStates} current={currentIdx} />
      </header>

      <div className="flex flex-col items-center gap-8 w-full max-w-md bg-white p-8 rounded-xl">
        {current && <ExerciseDisplay exercise={current} revealAnswer={inputState !== "idle"} />}

        <AnswerInput value={inputValue} state={inputState} />

        {needsContinue ? (
          <Button variant="secondary" className="w-full" onClick={continueAfterFeedback}>
            Continuer
          </Button>
        ) : (
          <NumPad
            value={inputValue}
            onChange={setInputValue}
            onValidate={handleValidate}
            disabled={phase === "feedback"}
          />
        )}
      </div>
    </main>
  );
}
