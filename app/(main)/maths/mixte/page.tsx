import Link from "next/link";
import { BackLink } from "@/components/ui/BackLink";
import { Card } from "@/components/ui/Card";
import { DifficultyBadge } from "@/components/ui/DifficultyBadge";
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
    <main className="flex flex-col items-center px-8 lg:px-16 py-8 lg:py-16 gap-8">
      <BackLink href="/maths" />

      <header className="grid gap-4 w-full text-center">
        <div className="flex items-center justify-center gap-3">
          <span className="text-5xl font-display">±</span>
          <PageTitle>Tout mélanger</PageTitle>
        </div>
        <PageSubtitle>Choisis ta difficulté</PageSubtitle>
      </header>

      <div className="grid gap-4 w-full lg:grid-cols-2">
        {DIFFICULTIES.map((diff) => (
          <Link key={diff} href={`/maths/mixte/${diff}`} className="group">
            <Card className="justify-between">
              <div className="flex flex-col gap-1">
                <DifficultyBadge difficulty={diff} />
                <p className="text-base text-slate-700 font-body">{DIFFICULTY_DESC[diff]}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
