import type { Difficulty } from "@/lib/types";
import { DIFFICULTY_LABELS } from "@/lib/types";

interface DifficultyBadgeProps {
  difficulty: Difficulty;
}

export function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full bg-accent-soft px-3 py-1 font-display font-semibold text-lg text-accent-ink">
      {DIFFICULTY_LABELS[difficulty]}
    </span>
  );
}
