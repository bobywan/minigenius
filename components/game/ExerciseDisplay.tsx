import type { Exercise } from "@/lib/types";

export function formatExercisePrompt(exercise: Exercise): string {
  const { left, op, right, result } = exercise;
  return `${left ?? "?"} ${op} ${right ?? "?"} = ${result ?? "?"}`;
}

interface ExerciseDisplayProps {
  exercise: Exercise;
  revealAnswer?: boolean;
}

function Slot({
  value,
  isHole,
  revealAnswer,
}: {
  value: number | null;
  isHole: boolean;
  revealAnswer?: boolean;
}) {
  if (isHole) {
    if (revealAnswer) {
      return (
        <span className="inline-flex items-center justify-center min-w-[90px] px-3 py-2 rounded-[var(--radius-tile)] bg-success-soft border-2 border-success text-success-ink font-display text-5xl">
          {value}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center justify-center min-w-[90px] px-3 py-2 rounded-[var(--radius-tile)] bg-accent-soft border-2 border-accent text-accent-ink font-display text-5xl">
        ?
      </span>
    );
  }
  return <span className="text-ink font-display text-5xl">{value}</span>;
}

export function ExerciseDisplay({ exercise, revealAnswer = false }: ExerciseDisplayProps) {
  const { left, op, right, result, answer } = exercise;

  return (
    <div
      className="flex items-center justify-center gap-4 flex-wrap"
      role="math"
      aria-label={`Calcul : ${formatExercisePrompt(exercise)}`}
    >
      <Slot value={left ?? answer} isHole={left === null} revealAnswer={revealAnswer} />
      <span className="text-accent font-display text-5xl">{op}</span>
      <Slot value={right ?? answer} isHole={right === null} revealAnswer={revealAnswer} />
      <span className="text-ink-3 font-display text-5xl">=</span>
      <Slot value={result ?? answer} isHole={result === null} revealAnswer={revealAnswer} />
    </div>
  );
}
