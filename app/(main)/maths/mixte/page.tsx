"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BackLink } from "@/components/ui/BackLink";
import { Card } from "@/components/ui/Card";
import { DifficultyBadge } from "@/components/ui/DifficultyBadge";
import { PageSubtitle } from "@/components/ui/PageSubtitle";
import { PageTitle } from "@/components/ui/PageTitle";
import { StarRating } from "@/components/ui/StarRating";
import { useProgressStore } from "@/lib/store/progressStore";
import type { Difficulty, Stars } from "@/lib/types";
import { DIFFICULTIES } from "@/lib/types";

const DIFFICULTY_DESC: Record<Difficulty, string> = {
  facile: "Nombres de 1 à 20 — toutes opérations",
  moyen: "Nombres de 1 à 100 — toutes opérations",
  expert: "Nombres de 1 à 100 — équations à trous",
};

export default function MixtePage() {
  const { getStars } = useProgressStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="flex flex-col items-center px-8 lg:px-16 py-8 lg:py-16 gap-8">
      <BackLink href="/maths" />

      <header className="grid gap-4 w-full text-center">
        <PageTitle>Tout mélanger</PageTitle>
        <PageSubtitle>Choisis ta difficulté</PageSubtitle>
      </header>

      <div className="grid gap-4 w-full lg:grid-cols-2">
        {DIFFICULTIES.map((diff) => {
          const stars = (mounted ? getStars("maths", "mixte", diff) : 0) as Stars;
          return (
            <Link key={diff} href={`/maths/mixte/${diff}`} className="group">
              <Card className="justify-between">
                <div className="flex flex-col gap-1">
                  <DifficultyBadge difficulty={diff} />
                  <p className="text-base text-slate-700 font-body">{DIFFICULTY_DESC[diff]}</p>
                </div>
                <StarRating stars={stars} size="sm" />
              </Card>
            </Link>
          );
        })}

        <Link href="/maths/mixte/libre" className="group">
          <Card className="justify-center">
            <div className="flex flex-col gap-1 text-center">
              <p className="text-2xl font-display">Jeu libre</p>
              <p className="text-base text-slate-700 font-body">
                Sans limite — réponds jusqu'à trouver la bonne réponse
              </p>
            </div>
          </Card>
        </Link>
      </div>
    </main>
  );
}
