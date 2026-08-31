"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FEEDBACK_OK_MS, FEEDBACK_WRONG_SERIES_MS, SERIES_LENGTH } from "@/lib/types";

export type DotState = "idle" | "correct" | "wrong";
export type GamePhase = "playing" | "feedback" | "finished";

function idleDots(): DotState[] {
  return Array(SERIES_LENGTH).fill("idle") as DotState[];
}

export function useSeriesGame<T>(generate: () => T[]) {
  const [series, setSeries] = useState<T[] | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [dotStates, setDotStates] = useState<DotState[]>(idleDots);
  const [correctCount, setCorrectCount] = useState(0);
  const [phase, setPhase] = useState<GamePhase>("playing");
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const start = useCallback(() => {
    setSeries(generate());
    setCurrentIdx(0);
    setDotStates(idleDots());
    setCorrectCount(0);
    setPhase("playing");
  }, [generate]);

  useEffect(() => {
    start();
  }, [start]);

  const advance = useCallback(() => {
    if (!series) return;
    const nextIdx = currentIdx + 1;
    if (nextIdx >= series.length) {
      setPhase("finished");
    } else {
      setCurrentIdx(nextIdx);
      setPhase("playing");
    }
  }, [currentIdx, series]);

  const recordAnswer = useCallback(
    (isCorrect: boolean) => {
      if (phase !== "playing") return;
      setDotStates((prev) => {
        const next = [...prev] as DotState[];
        next[currentIdx] = isCorrect ? "correct" : "wrong";
        return next;
      });
      if (isCorrect) setCorrectCount((n) => n + 1);
      setPhase("feedback");
      feedbackTimer.current = setTimeout(
        advance,
        isCorrect ? FEEDBACK_OK_MS : FEEDBACK_WRONG_SERIES_MS,
      );
    },
    [phase, currentIdx, advance],
  );

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
    recordAnswer,
    replay: start,
  };
}
