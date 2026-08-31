"use client";

import { useCallback, useState } from "react";
import { ExerciseDisplay } from "@/components/game/ExerciseDisplay";
import { GamePendingShell } from "@/components/game/GamePendingShell";
import { AnswerInput } from "@/components/ui/AnswerInput";
import { BackLink } from "@/components/ui/BackLink";
import { NumPad } from "@/components/ui/NumPad";
import { PageSubtitle } from "@/components/ui/PageSubtitle";
import { PageTitle } from "@/components/ui/PageTitle";
import { playError, playSuccess } from "@/lib/audio/sounds";
import { generateMixed } from "@/lib/exercises/generators/math";
import { useLibreGame } from "@/lib/hooks/useLibreGame";

type InputState = "idle" | "correct" | "wrong";

export default function MixteLibrePage() {
  const generate = useCallback(() => generateMixed("moyen"), []);
  const { item: exercise, correctCount, isInFeedback, onCorrect, onWrong } = useLibreGame(generate);

  const [inputValue, setInputValue] = useState("");
  const [inputState, setInputState] = useState<InputState>("idle");

  const handleValidate = useCallback(() => {
    if (isInFeedback || !exercise) return;
    const isCorrect = Number.parseInt(inputValue, 10) === exercise.answer;
    if (isCorrect) {
      playSuccess();
      setInputState("correct");
      onCorrect(() => {
        setInputValue("");
        setInputState("idle");
      });
    } else {
      playError();
      setInputState("wrong");
      onWrong(() => {
        setInputValue("");
        setInputState("idle");
      });
    }
  }, [isInFeedback, exercise, inputValue, onCorrect, onWrong]);

  if (!exercise) {
    return <GamePendingShell backHref="/maths/mixte" />;
  }

  return (
    <main className="flex flex-col items-center px-8 lg:px-16 py-8 lg:py-16 gap-8">
      <BackLink href="/maths/mixte" />

      <header className="grid gap-4 w-full text-center">
        <PageTitle>Tout mélanger — Libre</PageTitle>
        <PageSubtitle>{correctCount} bonnes réponses</PageSubtitle>
      </header>

      <div className="flex flex-col items-center gap-8 w-full max-w-md bg-white p-8 rounded-xl">
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
