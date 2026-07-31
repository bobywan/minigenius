"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useCallback, useEffect, useRef, useState } from "react";
import { ChoiceGrid } from "@/components/game/ChoiceGrid";
import { WordPrompt } from "@/components/game/WordPrompt";
import { neonBtnCls } from "@/components/ui/NeonButton";
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
    <main className="min-h-screen flex flex-col items-center gap-8 px-4 py-12">
      <header className="w-full max-w-md flex items-center justify-between gap-4">
        <Link href={`/anglais/traduction/${englishMode}`} className={neonBtnCls("ghost", "sm")}>
          ← Quitter
        </Link>
        <p className="text-sm font-display text-white drop-shadow-lg">
          {ENGLISH_MODULE_LABELS[englishMode]} — Libre
        </p>
      </header>

      <div className="flex flex-col items-center gap-2">
        <p className="text-4xl font-display text-yellow-400">{correctCount}</p>
        <p className="text-sm text-white/80 font-body">bonnes réponses</p>
      </div>

      <div className="flex flex-col items-center gap-8 w-full max-w-md">
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
