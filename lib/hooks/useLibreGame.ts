"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FEEDBACK_OK_MS, FEEDBACK_WRONG_LIBRE_MS } from "@/lib/types";

export function useLibreGame<T>(generate: () => T) {
  const [item, setItem] = useState<T | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [isInFeedback, setIsInFeedback] = useState(false);
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setItem(generate());
  }, [generate]);

  const onCorrect = useCallback(
    (after?: () => void) => {
      setCorrectCount((n) => n + 1);
      setIsInFeedback(true);
      feedbackTimer.current = setTimeout(() => {
        after?.();
        setItem(generate());
        setIsInFeedback(false);
      }, FEEDBACK_OK_MS);
    },
    [generate],
  );

  const onWrong = useCallback((after?: () => void) => {
    setIsInFeedback(true);
    feedbackTimer.current = setTimeout(() => {
      after?.();
      setIsInFeedback(false);
    }, FEEDBACK_WRONG_LIBRE_MS);
  }, []);

  useEffect(
    () => () => {
      if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    },
    [],
  );

  return { item, correctCount, isInFeedback, onCorrect, onWrong };
}
