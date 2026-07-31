"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useCallback, useEffect, useRef, useState } from "react";
import { ChoiceGrid } from "@/components/game/ChoiceGrid";
import { SeriesResultScreen } from "@/components/game/SeriesResultScreen";
import { WordPrompt } from "@/components/game/WordPrompt";
import { neonBtnCls } from "@/components/ui/NeonButton";
import { ProgressDots } from "@/components/ui/ProgressDots";
import { playError, playSuccess } from "@/lib/audio/sounds";
import { generateQuizSeries } from "@/lib/exercises/generators/english";
import { useProgressStore } from "@/lib/store/progressStore";
import type { Difficulty, EnglishModule, QuizQuestion } from "@/lib/types";
import { computeStars, DIFFICULTIES, ENGLISH_MODULES } from "@/lib/types";

type DotState = "idle" | "correct" | "wrong";
type Phase = "playing" | "feedback" | "finished";

export default function EnglishQuizPage({
  params,
}: {
  params: Promise<{ mode: string; difficulty: string }>;
}) {
  const { mode, difficulty: diff } = use(params);

  if (!ENGLISH_MODULES.includes(mode as EnglishModule)) notFound();
  if (!DIFFICULTIES.includes(diff as Difficulty)) notFound();

  const englishMode = mode as EnglishModule;
  const difficulty = diff as Difficulty;
  const enToFr = englishMode === "en-fr";

  const { saveResult } = useProgressStore();

  const [series, setSeries] = useState<QuizQuestion[] | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [dotStates, setDotStates] = useState<DotState[]>(Array(10).fill("idle") as DotState[]);
  const [correctCount, setCorrectCount] = useState(0);
  const [phase, setPhase] = useState<Phase>("playing");
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setSeries(generateQuizSeries(englishMode, difficulty));
  }, [englishMode, difficulty]);

  const currentQuestion = series?.[currentIdx];

  const advance = useCallback(() => {
    if (!series) return;
    const nextIdx = currentIdx + 1;
    if (nextIdx >= series.length) {
      setPhase("finished");
    } else {
      setCurrentIdx(nextIdx);
      setSelectedIdx(null);
      setPhase("playing");
    }
  }, [currentIdx, series]);

  const handleSelect = useCallback(
    (index: number) => {
      if (phase !== "playing" || !currentQuestion) return;
      const isCorrect = index === currentQuestion.answerIndex;

      setSelectedIdx(index);
      setDotStates((prev) => {
        const next = [...prev] as DotState[];
        next[currentIdx] = isCorrect ? "correct" : "wrong";
        return next;
      });

      if (isCorrect) {
        playSuccess();
        setCorrectCount((n) => n + 1);
      } else {
        playError();
      }

      setPhase("feedback");
      feedbackTimer.current = setTimeout(advance, isCorrect ? 900 : 1800);
    },
    [phase, currentQuestion, currentIdx, advance],
  );

  useEffect(() => {
    if (phase !== "finished") return;
    const stars = computeStars(correctCount);
    saveResult("anglais", englishMode, difficulty, {
      correct: correctCount,
      stars,
      completedAt: new Date().toISOString(),
    });
  }, [phase, correctCount, englishMode, difficulty, saveResult]);

  useEffect(
    () => () => {
      if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    },
    [],
  );

  function handleReplay() {
    setSeries(generateQuizSeries(englishMode, difficulty));
    setCurrentIdx(0);
    setSelectedIdx(null);
    setDotStates(Array(10).fill("idle") as DotState[]);
    setCorrectCount(0);
    setPhase("playing");
  }

  if (!series) return null;

  const nextDiff = DIFFICULTIES[DIFFICULTIES.indexOf(difficulty) + 1];
  const nextHref = nextDiff
    ? `/anglais/traduction/${englishMode}/${nextDiff}`
    : `/anglais/traduction/${englishMode}`;

  if (phase === "finished") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <SeriesResultScreen correct={correctCount} onReplay={handleReplay} nextHref={nextHref} />
      </main>
    );
  }

  const correctChoice = currentQuestion?.choices[currentQuestion.answerIndex];

  return (
    <main className="min-h-screen flex flex-col items-center gap-8 px-4 py-12">
      <header className="w-full max-w-md flex items-center justify-between gap-4">
        <Link href={`/anglais/traduction/${englishMode}`} className={neonBtnCls("ghost", "sm")}>
          ← Quitter
        </Link>
        <p className="text-ms font-display text-white drop-shadow-lg">
          {currentIdx + 1} / {series.length}
        </p>
      </header>

      <ProgressDots total={10} states={dotStates} current={currentIdx} />

      <div className="flex flex-col items-center gap-8 w-full max-w-md">
        {currentQuestion && (
          <>
            <WordPrompt
              prompt={currentQuestion.prompt}
              sourceLabel={enToFr ? "Anglais" : "Français"}
              speakText={enToFr ? currentQuestion.prompt : undefined}
              revealText={!enToFr && phase === "feedback" ? correctChoice : undefined}
            />

            <ChoiceGrid
              choices={currentQuestion.choices}
              answerIndex={currentQuestion.answerIndex}
              selectedIdx={selectedIdx}
              revealed={phase === "feedback"}
              onSelect={handleSelect}
              enableSpeech={!enToFr}
            />
          </>
        )}
      </div>
    </main>
  );
}
