import type { Difficulty } from "@/lib/types";
import { DIFFICULTY_LABELS } from "@/lib/types";

interface DifficultyBadgeProps {
  difficulty: Difficulty;
}

export function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  return (
    <span className={"inline-flex items-center font-display text-md text-white"}>
      {DIFFICULTY_LABELS[difficulty]}
    </span>
  );
}
