"use client";

import { notFound } from "next/navigation";
import { use, useCallback, useState } from "react";
import { ChoiceGrid } from "@/components/game/ChoiceGrid";
import { GamePendingShell } from "@/components/game/GamePendingShell";
import { WordPrompt } from "@/components/game/WordPrompt";
import { BackLink } from "@/components/ui/BackLink";
import { PageSubtitle } from "@/components/ui/PageSubtitle";
import { PageTitle } from "@/components/ui/PageTitle";
import { playError, playSuccess } from "@/lib/audio/sounds";
import { generateOneQuiz } from "@/lib/exercises/generators/english";
import { useLibreGame } from "@/lib/hooks/useLibreGame";
import type { EnglishTheme } from "@/lib/types";
import { ENGLISH_THEME_LABELS, ENGLISH_THEMES } from "@/lib/types";

export default function LibrePage({ params }: { params: Promise<{ theme: string }> }) {
  const { theme } = use(params);

  if (!ENGLISH_THEMES.includes(theme as EnglishTheme)) notFound();
  const englishTheme = theme as EnglishTheme;

  const generate = useCallback(() => generateOneQuiz("mixte", englishTheme), [englishTheme]);
  const { item: question, correctCount, isInFeedback, onCorrect, onWrong } = useLibreGame(generate);

  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handleSelect = useCallback(
    (index: number) => {
      if (isInFeedback || !question) return;
      const isCorrect = index === question.answerIndex;
      setSelectedIdx(index);
      if (isCorrect) {
        playSuccess();
        onCorrect(() => setSelectedIdx(null));
      } else {
        playError();
        onWrong(() => setSelectedIdx(null));
      }
    },
    [isInFeedback, question, onCorrect, onWrong],
  );

  if (!question) {
    return <GamePendingShell backHref={`/anglais/traduction/${englishTheme}`} />;
  }

  return (
    <main className="flex flex-col items-center px-8 lg:px-16 py-8 lg:py-16 gap-8">
      <BackLink href={`/anglais/traduction/${englishTheme}`} />

      <header className="grid gap-4 w-full text-center">
        <PageTitle>{`${ENGLISH_THEME_LABELS[englishTheme]} — Libre`}</PageTitle>
        <PageSubtitle>{correctCount} bonnes réponses</PageSubtitle>
      </header>

      <div className="flex flex-col items-center gap-8 w-full max-w-md bg-white p-8 rounded-xl">
        <WordPrompt
          prompt={question.prompt}
          speakText={question.enToFr ? question.prompt : undefined}
        />

        <ChoiceGrid
          choices={question.choices}
          answerIndex={question.answerIndex}
          selectedIdx={selectedIdx}
          revealed={isInFeedback}
          highlightCorrect={selectedIdx === question.answerIndex}
          onSelect={handleSelect}
          enableSpeech={!question.enToFr}
        />
      </div>
    </main>
  );
}
