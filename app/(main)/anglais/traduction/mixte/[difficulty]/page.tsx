"use client";

import { notFound } from "next/navigation";
import { use, useCallback, useEffect, useRef, useState } from "react";
import { ChoiceGrid } from "@/components/game/ChoiceGrid";
import { SeriesResultScreen } from "@/components/game/SeriesResultScreen";
import { WordPrompt } from "@/components/game/WordPrompt";
import { BackLink } from "@/components/ui/BackLink";
import { ProgressDots } from "@/components/ui/ProgressDots";
import { playError, playSuccess } from "@/lib/audio/sounds";
import { generateMixedQuizSeries } from "@/lib/exercises/generators/english";
import { useProgressStore } from "@/lib/store/progressStore";
import type { Difficulty, QuizQuestion } from "@/lib/types";
import { computeStars, DIFFICULTIES } from "@/lib/types";

type DotState = "idle" | "correct" | "wrong";
type Phase = "playing" | "feedback" | "finished";

export default function MixteQuizPage({ params }: { params: Promise<{ difficulty: string }> }) {
  const { difficulty: diff } = use(params);

  if (!DIFFICULTIES.includes(diff as Difficulty)) notFound();

  const difficulty = diff as Difficulty;

  const { saveResult } = useProgressStore();

  const [series, setSeries] = useState<QuizQuestion[] | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [dotStates, setDotStates] = useState<DotState[]>(Array(10).fill("idle") as DotState[]);
  const [correctCount, setCorrectCount] = useState(0);
  const [phase, setPhase] = useState<Phase>("playing");
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setSeries(generateMixedQuizSeries(difficulty));
  }, [difficulty]);

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
    saveResult("anglais", "mixte", difficulty, {
      correct: correctCount,
      stars,
      completedAt: new Date().toISOString(),
    });
  }, [phase, correctCount, difficulty, saveResult]);

  useEffect(
    () => () => {
      if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    },
    [],
  );

  function handleReplay() {
    setSeries(generateMixedQuizSeries(difficulty));
    setCurrentIdx(0);
    setSelectedIdx(null);
    setDotStates(Array(10).fill("idle") as DotState[]);
    setCorrectCount(0);
    setPhase("playing");
  }

  if (!series) return null;

  const nextDiff = DIFFICULTIES[DIFFICULTIES.indexOf(difficulty) + 1];
  const nextHref = nextDiff ? `/anglais/traduction/mixte/${nextDiff}` : "/anglais/traduction/mixte";

  if (phase === "finished") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <SeriesResultScreen correct={correctCount} onReplay={handleReplay} nextHref={nextHref} />
      </main>
    );
  }

  const correctChoice = currentQuestion?.choices[currentQuestion.answerIndex];

  return (
    <main className="flex flex-col items-center px-8 lg:px-16 py-8 lg:py-16 gap-8">
      <BackLink href="/anglais/traduction/mixte" />

      <header className="grid gap-4 w-full text-center">
        <p className="font-bold font-display text-white">
          {currentIdx + 1} / {series.length}
        </p>
        <ProgressDots total={10} states={dotStates} current={currentIdx} />
      </header>

      <div className="flex flex-col items-center gap-8 w-full max-w-md bg-white p-8 rounded-xl">
        {currentQuestion && (
          <>
            <WordPrompt
              prompt={currentQuestion.prompt}
              sourceLabel={currentQuestion.enToFr ? "Anglais" : "Français"}
              speakText={currentQuestion.enToFr ? currentQuestion.prompt : undefined}
              revealText={
                !currentQuestion.enToFr && phase === "feedback" ? correctChoice : undefined
              }
            />

            <ChoiceGrid
              choices={currentQuestion.choices}
              answerIndex={currentQuestion.answerIndex}
              selectedIdx={selectedIdx}
              revealed={phase === "feedback"}
              onSelect={handleSelect}
              enableSpeech={!currentQuestion.enToFr}
            />
          </>
        )}
      </div>
    </main>
  );
}
