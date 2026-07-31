"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BackLink } from "@/components/ui/BackLink";
import { DifficultyBadge } from "@/components/ui/DifficultyBadge";
import { GlassCard } from "@/components/ui/GlassCard";
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
    <main className="min-h-screen flex flex-col items-center gap-10 px-4 py-12">
      <header className="text-center flex flex-col items-center gap-4">
        <BackLink href="/anglais/traduction" />
        <PageTitle>Tout mélanger</PageTitle>
        <PageSubtitle>Choisis ta difficulté</PageSubtitle>
      </header>

      <div className="flex flex-col gap-4 w-full max-w-md">
        {DIFFICULTIES.map((diff) => {
          const stars = (mounted ? getStars("anglais", "mixte", diff) : 0) as Stars;
          return (
            <Link key={diff} href={`/anglais/traduction/mixte/${diff}`} className="group">
              <GlassCard className="p-4 flex items-center justify-between cursor-pointer group-hover:scale-[1.02] group-hover:-translate-y-0.5">
                <div className="flex flex-col gap-1">
                  <DifficultyBadge difficulty={diff} />
                  <p className="text-sm text-white/80 mt-1 font-body">{DIFFICULTY_DESC[diff]}</p>
                </div>
                <StarRating stars={stars} size="sm" />
              </GlassCard>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
