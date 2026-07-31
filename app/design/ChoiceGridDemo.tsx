"use client";

import { useState } from "react";
import { ChoiceGrid } from "@/components/game/ChoiceGrid";

const CHOICES = ["Chat", "Chien", "Cheval", "Fourmi"];
const ANSWER_INDEX = 1;

export function ChoiceGridDemo() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-3">
      <ChoiceGrid
        choices={CHOICES}
        answerIndex={ANSWER_INDEX}
        selectedIdx={selectedIdx}
        revealed={selectedIdx !== null}
        onSelect={setSelectedIdx}
      />
      {selectedIdx !== null && (
        <button
          type="button"
          onClick={() => setSelectedIdx(null)}
          className="text-sm font-body text-white/70 underline cursor-pointer"
        >
          Réinitialiser
        </button>
      )}
    </div>
  );
}
