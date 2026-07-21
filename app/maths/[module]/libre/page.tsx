"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useCallback, useEffect, useRef, useState } from "react";
import { ExerciseDisplay } from "@/components/game/ExerciseDisplay";
import { AnswerInput } from "@/components/ui/AnswerInput";
import { neonBtnCls } from "@/components/ui/NeonButton";
import { NumPad } from "@/components/ui/NumPad";
import { playError, playSuccess } from "@/lib/audio/sounds";
import { generateOne } from "@/lib/exercises/generators/math";
import type { Exercise, MathModule } from "@/lib/types";
import { MATH_MODULES, MODULE_ICONS, MODULE_LABELS } from "@/lib/types";

type InputState = "idle" | "correct" | "wrong";

export default function LibrePage({ params }: { params: Promise<{ module: string }> }) {
  const { module: mod } = use(params);

  if (!MATH_MODULES.includes(mod as MathModule)) notFound();
  const mathMod = mod as MathModule;

  // null initial pour éviter la désynchronisation SSR/client
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [inputState, setInputState] = useState<InputState>("idle");
  const [correctCount, setCorrectCount] = useState(0);
  const [isInFeedback, setIsInFeedback] = useState(false);
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setExercise(generateOne(mathMod, "moyen"));
  }, [mathMod]);

  const handleValidate = useCallback(() => {
    if (isInFeedback || !exercise) return;
    const userAnswer = Number.parseInt(inputValue, 10);
    const isCorrect = userAnswer === exercise.answer;

    if (isCorrect) {
      playSuccess();
      setInputState("correct");
      setCorrectCount((n) => n + 1);
      setIsInFeedback(true);
      feedbackTimer.current = setTimeout(() => {
        setExercise(generateOne(mathMod, "moyen"));
        setInputValue("");
        setInputState("idle");
        setIsInFeedback(false);
      }, 900);
    } else {
      // mauvaise réponse : on vide l'input, le même exercice reste affiché
      playError();
      setInputState("wrong");
      feedbackTimer.current = setTimeout(() => {
        setInputValue("");
        setInputState("idle");
      }, 800);
    }
  }, [isInFeedback, inputValue, exercise, mathMod]);

  useEffect(
    () => () => {
      if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    },
    [],
  );

  if (!exercise) return null;

  return (
    <main className="min-h-screen flex flex-col items-center gap-8 px-4 py-12">
      <header className="w-full max-w-md flex items-center justify-between">
        <Link href={`/maths/${mathMod}`} className={neonBtnCls("ghost", "sm")}>
          ← Quitter
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xl font-display">{MODULE_ICONS[mathMod]}</span>
          <p className="text-sm font-display text-white drop-shadow-lg">
            {MODULE_LABELS[mathMod]} — Libre
          </p>
        </div>
      </header>

      <div className="flex items-center gap-2 text-white font-display text-lg">
        <span className="text-green-400 text-2xl">✓</span>
        <span>
          {correctCount} bonne{correctCount !== 1 ? "s" : ""} réponse
          {correctCount !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="flex flex-col items-center gap-10 w-full max-w-md">
        <ExerciseDisplay exercise={exercise} revealAnswer={false} />

        <AnswerInput value={inputValue} state={inputState} />

        <NumPad
          value={inputValue}
          onChange={setInputValue}
          onValidate={handleValidate}
          disabled={isInFeedback}
        />
      </div>
    </main>
  );
}
