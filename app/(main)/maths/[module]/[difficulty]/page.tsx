"use client";

import { notFound } from "next/navigation";
import { use, useCallback, useEffect, useRef, useState } from "react";
import { ExerciseDisplay } from "@/components/game/ExerciseDisplay";
import { SeriesResultScreen } from "@/components/game/SeriesResultScreen";
import { AnswerInput } from "@/components/ui/AnswerInput";
import { BackLink } from "@/components/ui/BackLink";
import { NumPad } from "@/components/ui/NumPad";
import { ProgressDots } from "@/components/ui/ProgressDots";
import { playError, playSuccess } from "@/lib/audio/sounds";
import { generateSeries } from "@/lib/exercises/generators/math";
import { useProgressStore } from "@/lib/store/progressStore";
import type { Difficulty, Exercise, MathModule } from "@/lib/types";
import { computeStars, DIFFICULTIES, MATH_MODULES } from "@/lib/types";

type DotState = "idle" | "correct" | "wrong";
type InputState = "idle" | "correct" | "wrong";
type Phase = "playing" | "feedback" | "finished";

export default function GamePage({
  params,
}: {
  params: Promise<{ module: string; difficulty: string }>;
}) {
  const { module: mod, difficulty: diff } = use(params);

  if (!MATH_MODULES.includes(mod as MathModule)) notFound();
  if (!DIFFICULTIES.includes(diff as Difficulty)) notFound();

  const mathMod = mod as MathModule;
  const difficulty = diff as Difficulty;

  const { saveResult } = useProgressStore();

  // null initial pour éviter la désynchronisation SSR/client (Math.random côté serveur ≠ client)
  const [series, setSeries] = useState<Exercise[] | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [dotStates, setDotStates] = useState<DotState[]>(Array(10).fill("idle") as DotState[]);
  const [inputState, setInputState] = useState<InputState>("idle");
  const [correctCount, setCorrectCount] = useState(0);
  const [phase, setPhase] = useState<Phase>("playing");
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setSeries(generateSeries(mathMod, difficulty));
  }, [mathMod, difficulty]);

  const currentExercise = series?.[currentIdx];

  const advance = useCallback(() => {
    if (!series) return;
    const nextIdx = currentIdx + 1;
    if (nextIdx >= series.length) {
      setPhase("finished");
    } else {
      setCurrentIdx(nextIdx);
      setInputValue("");
      setInputState("idle");
      setPhase("playing");
    }
  }, [currentIdx, series]);

  const handleValidate = useCallback(() => {
    if (phase !== "playing" || !currentExercise) return;
    const userAnswer = Number.parseInt(inputValue, 10);
    const isCorrect = userAnswer === currentExercise.answer;

    setDotStates((prev) => {
      const next = [...prev] as DotState[];
      next[currentIdx] = isCorrect ? "correct" : "wrong";
      return next;
    });

    if (isCorrect) {
      playSuccess();
      setInputState("correct");
      setCorrectCount((n) => n + 1);
    } else {
      playError();
      setInputState("wrong");
    }

    setPhase("feedback");
    feedbackTimer.current = setTimeout(advance, isCorrect ? 900 : 1800);
  }, [phase, currentExercise, inputValue, currentIdx, advance]);

  // Sauvegarde en fin de série
  useEffect(() => {
    if (phase !== "finished") return;
    const stars = computeStars(correctCount);
    saveResult("maths", mathMod, difficulty, {
      correct: correctCount,
      stars,
      completedAt: new Date().toISOString(),
    });
  }, [phase, correctCount, mathMod, difficulty, saveResult]);

  // Cleanup timer on unmount
  useEffect(
    () => () => {
      if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    },
    [],
  );

  function handleReplay() {
    setSeries(generateSeries(mathMod, difficulty));
    setCurrentIdx(0);
    setInputValue("");
    setDotStates(Array(10).fill("idle") as DotState[]);
    setInputState("idle");
    setCorrectCount(0);
    setPhase("playing");
  }

  if (!series) return null;

  // Next difficulty href
  const nextDiffIdx = DIFFICULTIES.indexOf(difficulty) + 1;
  const nextDiff = DIFFICULTIES[nextDiffIdx];
  const nextHref = nextDiff ? `/maths/${mathMod}/${nextDiff}` : `/maths/${mathMod}`;

  if (phase === "finished") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <SeriesResultScreen correct={correctCount} onReplay={handleReplay} nextHref={nextHref} />
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center px-8 lg:px-16 py-8 lg:py-16 gap-8">
      <BackLink href={`/maths/${mathMod}`} />

      <header className="grid gap-4 w-full text-center">
        <p className="text-body font-bold font-display text-white">
          {currentIdx + 1} / {series.length}
        </p>

        <ProgressDots total={10} states={dotStates} current={currentIdx} />
      </header>

      <div className="flex flex-col items-center gap-8 w-full max-w-md bg-white p-8 rounded-xl">
        {currentExercise && (
          <ExerciseDisplay exercise={currentExercise} revealAnswer={inputState !== "idle"} />
        )}

        <AnswerInput value={inputValue} state={inputState} />

        <NumPad
          value={inputValue}
          onChange={setInputValue}
          onValidate={handleValidate}
          disabled={phase === "feedback"}
        />
      </div>
    </main>
  );
}
