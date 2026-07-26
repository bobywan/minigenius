import Link from "next/link";
import { BackLink } from "@/components/ui/BackLink";
import { DifficultyBadge } from "@/components/ui/DifficultyBadge";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageSubtitle } from "@/components/ui/PageSubtitle";
import { PageTitle } from "@/components/ui/PageTitle";
import { DIFFICULTIES } from "@/lib/types";

const DIFFICULTY_DESC = {
  facile: "Nombres de 1 à 20 — toutes opérations",
  moyen: "Nombres de 1 à 100 — toutes opérations",
  expert: "Nombres de 1 à 100 — équations à trous",
} as const;

export default function MixtePage() {
  return (
    <main className="min-h-screen flex flex-col items-center gap-10 px-4 py-12">
      <header className="text-center flex flex-col items-center gap-4">
        <BackLink href="/maths" />
        <div className="flex items-center justify-center gap-3">
          <span className="text-5xl font-display">±</span>
          <PageTitle>Tout mélanger</PageTitle>
        </div>
        <PageSubtitle>Choisis ta difficulté</PageSubtitle>
      </header>

      <div className="flex flex-col gap-4 w-full max-w-md">
        {DIFFICULTIES.map((diff) => (
          <Link key={diff} href={`/maths/mixte/${diff}`} className="group">
            <GlassCard className="p-4 flex items-center justify-between cursor-pointer group-hover:scale-[1.02] group-hover:-translate-y-0.5">
              <div className="flex flex-col">
                <DifficultyBadge difficulty={diff} />
                <p className="text-sm text-white/80 mt-1 font-body">{DIFFICULTY_DESC[diff]}</p>
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </main>
  );
}
