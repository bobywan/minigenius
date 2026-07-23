import Link from "next/link";
import { DifficultyBadge } from "@/components/ui/DifficultyBadge";
import { GlassCard } from "@/components/ui/GlassCard";
import { neonBtnCls } from "@/components/ui/NeonButton";
import { DIFFICULTIES, DIFFICULTY_LABELS } from "@/lib/types";

const DIFFICULTY_DESC = {
  facile: "Nombres de 1 à 20 — toutes opérations",
  moyen: "Nombres de 1 à 100 — toutes opérations",
  expert: "Nombres de 1 à 100 — équations à trous",
} as const;

export default function MixtePage() {
  return (
    <main className="min-h-screen flex flex-col items-center gap-10 px-4 py-12">
      <header className="text-center flex flex-col items-center gap-2">
        <Link href="/maths" className={neonBtnCls("ghost", "sm")}>
          ← Retour
        </Link>
        <div className="flex items-center justify-center gap-3">
          <span className="text-5xl font-display">±</span>
          <h1 className="text-4xl font-display text-white">Tout mélanger</h1>
        </div>
        <p
          className="text-white font-display text-xl"
          style={{ textShadow: "var(--text-shadow-solid)" }}
        >
          Choisis ta difficulté
        </p>
      </header>

      <div className="flex flex-col gap-4 w-full max-w-md">
        {DIFFICULTIES.map((diff) => (
          <Link key={diff} href={`/maths/mixte/${diff}`} className="group">
            <GlassCard className="p-4 flex items-center justify-between cursor-pointer group-hover:scale-[1.02] group-hover:-translate-y-0.5">
              <div className="flex flex-col gap-1">
                <DifficultyBadge difficulty={diff} size="md" />
                <p className="text-sm text-white/80 mt-1 font-body">{DIFFICULTY_DESC[diff]}</p>
              </div>
              <span className="text-sm text-white/60 font-body">{DIFFICULTY_LABELS[diff]}</span>
            </GlassCard>
          </Link>
        ))}
      </div>
    </main>
  );
}
