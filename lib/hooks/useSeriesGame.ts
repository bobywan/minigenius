"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FEEDBACK_OK_MS, SERIES_LENGTH } from "@/lib/types";

export type DotState = "idle" | "correct" | "wrong";
export type GamePhase = "playing" | "feedback" | "finished";

export type SeriesAnswer = {
  given: string;
  isCorrect: boolean;
};

function idleDots(): DotState[] {
  return Array(SERIES_LENGTH).fill("idle") as DotState[];
}

export function useSeriesGame<T>(generate: () => T[]) {
  const [series, setSeries] = useState<T[] | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [dotStates, setDotStates] = useState<DotState[]>(idleDots);
  const [correctCount, setCorrectCount] = useState(0);
  const [phase, setPhase] = useState<GamePhase>("playing");
  const [answers, setAnswers] = useState<SeriesAnswer[]>([]);
  const [needsContinue, setNeedsContinue] = useState(false);
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const start = useCallback(() => {
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    setSeries(generate());
    setCurrentIdx(0);
    setDotStates(idleDots());
    setCorrectCount(0);
    setAnswers([]);
    setNeedsContinue(false);
    setPhase("playing");
  }, [generate]);

  useEffect(() => {
    start();
  }, [start]);

  const advance = useCallback(() => {
    if (!series) return;
    setNeedsContinue(false);
    const nextIdx = currentIdx + 1;
    if (nextIdx >= series.length) {
      setPhase("finished");
    } else {
      setCurrentIdx(nextIdx);
      setPhase("playing");
    }
  }, [currentIdx, series]);

  const recordAnswer = useCallback(
    (isCorrect: boolean, given: string) => {
      if (phase !== "playing") return;
      setDotStates((prev) => {
        const next = [...prev] as DotState[];
        next[currentIdx] = isCorrect ? "correct" : "wrong";
        return next;
      });
      setAnswers((prev) => [...prev, { given, isCorrect }]);
      if (isCorrect) setCorrectCount((n) => n + 1);
      setPhase("feedback");
      if (isCorrect) {
        feedbackTimer.current = setTimeout(advance, FEEDBACK_OK_MS);
      } else {
        setNeedsContinue(true);
      }
    },
    [phase, currentIdx, advance],
  );

  const continueAfterFeedback = useCallback(() => {
    if (!needsContinue) return;
    advance();
  }, [needsContinue, advance]);

  useEffect(
    () => () => {
      if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    },
    [],
  );

  return {
    series,
    current: series?.[currentIdx] ?? null,
    currentIdx,
    dotStates,
    correctCount,
    phase,
    answers,
    needsContinue,
    recordAnswer,
    continueAfterFeedback,
    replay: start,
  };
}
