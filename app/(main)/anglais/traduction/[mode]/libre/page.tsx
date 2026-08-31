"use client";

import { notFound } from "next/navigation";
import { use, useCallback, useEffect, useRef, useState } from "react";
import { ChoiceGrid } from "@/components/game/ChoiceGrid";
import { WordPrompt } from "@/components/game/WordPrompt";
import { BackLink } from "@/components/ui/BackLink";
import { playError, playSuccess } from "@/lib/audio/sounds";
import { generateOneQuiz } from "@/lib/exercises/generators/english";
import type { EnglishModule, QuizQuestion } from "@/lib/types";
import { ENGLISH_MODULE_LABELS, ENGLISH_MODULES } from "@/lib/types";

export default function LibrePage({ params }: { params: Promise<{ mode: string }> }) {
  const { mode } = use(params);

  if (!ENGLISH_MODULES.includes(mode as EnglishModule)) notFound();
  const englishMode = mode as EnglishModule;
  if (englishMode === "mixte") notFound();

  const enToFr = englishMode === "en-fr";

  const [question, setQuestion] = useState<QuizQuestion | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [isInFeedback, setIsInFeedback] = useState(false);
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setQuestion(generateOneQuiz(englishMode, "moyen"));
  }, [englishMode]);

  const handleSelect = useCallback(
    (index: number) => {
      if (isInFeedback || !question) return;
      const isCorrect = index === question.answerIndex;

      setSelectedIdx(index);

      if (isCorrect) {
        playSuccess();
        setCorrectCount((n) => n + 1);
        setIsInFeedback(true);
        feedbackTimer.current = setTimeout(() => {
          setQuestion(generateOneQuiz(englishMode, "moyen"));
          setSelectedIdx(null);
          setIsInFeedback(false);
        }, 900);
      } else {
        playError();
        setIsInFeedback(true);
        feedbackTimer.current = setTimeout(() => {
          setSelectedIdx(null);
          setIsInFeedback(false);
        }, 800);
      }
    },
    [isInFeedback, question, englishMode],
  );

  useEffect(
    () => () => {
      if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    },
    [],
  );

  if (!question) return null;

  const correctChoice = question.choices[question.answerIndex];

  return (
    <main className="flex flex-col items-center px-8 lg:px-16 py-8 lg:py-16 gap-8">
      <BackLink href={`/anglais/traduction/${englishMode}`} />

      <header className="grid gap-4 w-full text-center">
        <p className="text-body font-bold font-display text-white">
          {ENGLISH_MODULE_LABELS[englishMode]} — Libre
        </p>
        <div className="flex items-center justify-center gap-2 font-display text-lg text-emerald-600">
          <span className="text-2xl">✓</span>
          <span>{correctCount} bonnes réponses</span>
        </div>
      </header>

      <div className="flex flex-col items-center gap-8 w-full max-w-md bg-white p-8 rounded-xl">
        <WordPrompt
          prompt={question.prompt}
          sourceLabel={enToFr ? "Anglais" : "Français"}
          speakText={enToFr ? question.prompt : undefined}
          revealText={!enToFr && isInFeedback ? correctChoice : undefined}
        />

        <ChoiceGrid
          choices={question.choices}
          answerIndex={question.answerIndex}
          selectedIdx={selectedIdx}
          revealed={isInFeedback}
          onSelect={handleSelect}
          enableSpeech={!enToFr}
        />
      </div>
    </main>
  );
}
