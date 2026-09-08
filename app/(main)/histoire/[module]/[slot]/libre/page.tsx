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
import { generateOneHistoryQuiz } from "@/lib/exercises/generators/history";
import { useLibreGame } from "@/lib/hooks/useLibreGame";
import type { HistoryModule, HistorySlot } from "@/lib/types";
import { HISTORY_MODULE_LABELS, isHistoryModule, isHistorySlot } from "@/lib/types";

export default function HistoryLibrePage({
  params,
}: {
  params: Promise<{ module: string; slot: string }>;
}) {
  const { module: rawModule, slot: rawSlot } = use(params);

  if (!isHistoryModule(rawModule)) notFound();
  if (!isHistorySlot(rawModule, rawSlot)) notFound();

  const historyModule = rawModule as HistoryModule;
  const historySlot = rawSlot as HistorySlot;

  const generate = useCallback(
    () => generateOneHistoryQuiz(historyModule, historySlot),
    [historyModule, historySlot],
  );
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

  const backHref = `/histoire/${historyModule}`;

  if (!question) {
    return <GamePendingShell backHref={backHref} />;
  }

  return (
    <main className="flex flex-col items-center px-8 lg:px-16 py-8 lg:py-16 gap-8">
      <BackLink href={backHref} />

      <header className="grid gap-4 w-full text-center">
        <PageTitle>{`${HISTORY_MODULE_LABELS[historyModule]} — Libre`}</PageTitle>
        <PageSubtitle>{correctCount} bonnes réponses</PageSubtitle>
      </header>

      <div className="flex flex-col items-center gap-8 w-full max-w-md bg-white p-8 rounded-xl">
        <WordPrompt prompt={question.prompt} variant="sentence" />

        <ChoiceGrid
          choices={question.choices}
          answerIndex={question.answerIndex}
          selectedIdx={selectedIdx}
          revealed={isInFeedback}
          highlightCorrect={selectedIdx === question.answerIndex}
          onSelect={handleSelect}
        />
      </div>
    </main>
  );
}
