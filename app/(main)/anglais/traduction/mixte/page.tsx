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
  facile: "Mots très courants — mélange des deux sens",
  moyen: "Mots courants — mélange des deux sens",
  expert: "Mots rares — mélange des deux sens",
};

export default function MixtePage() {
  const { getStars } = useProgressStore();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="flex flex-col items-center px-8 lg:px-16 py-8 lg:py-16 gap-8">
      <BackLink href="/anglais/traduction" />

      <header className="grid gap-4 w-full text-center">
        <PageTitle>Tout mélanger</PageTitle>
        <PageSubtitle>Choisis ta difficulté</PageSubtitle>
      </header>

      <div className="grid gap-4 w-full lg:grid-cols-2">
        {DIFFICULTIES.map((diff) => {
          const stars = (mounted ? getStars("anglais", "mixte", diff) : 0) as Stars;
          return (
            <Link key={diff} href={`/anglais/traduction/mixte/${diff}`} className="group">
              <Card className="justify-between">
                <div className="flex flex-col gap-1">
                  <DifficultyBadge difficulty={diff} />
                  <p className="text-base text-slate-700 mt-1 font-body">{DIFFICULTY_DESC[diff]}</p>
                </div>
                <StarRating stars={stars} size="sm" />
              </Card>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
