"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useEffect, useState } from "react";
import { BackLink } from "@/components/ui/BackLink";
import { DifficultyBadge } from "@/components/ui/DifficultyBadge";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageSubtitle } from "@/components/ui/PageSubtitle";
import { PageTitle } from "@/components/ui/PageTitle";
import { StarRating } from "@/components/ui/StarRating";
import { useProgressStore } from "@/lib/store/progressStore";
import type { Difficulty, EnglishModule, Stars } from "@/lib/types";
import { DIFFICULTIES, ENGLISH_MODULE_LABELS, ENGLISH_MODULES } from "@/lib/types";

const DIFFICULTY_DESC: Record<Difficulty, string> = {
  facile: "Mots très courants — animaux, couleurs, famille",
  moyen: "Mots courants — vêtements, métiers, verbes",
  expert: "Mots rares — vocabulaire avancé",
};

export default function EnglishModePage({ params }: { params: Promise<{ mode: string }> }) {
  const { mode } = use(params);

  if (!ENGLISH_MODULES.includes(mode as EnglishModule)) notFound();
  const englishMode = mode as EnglishModule;

  const { getStars } = useProgressStore();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center gap-10 px-4 py-12">
      <header className="text-center flex flex-col items-center gap-4">
        <BackLink href="/anglais/traduction" />
        <PageTitle>{ENGLISH_MODULE_LABELS[englishMode]}</PageTitle>
        <PageSubtitle>Choisis ta difficulté</PageSubtitle>
      </header>

      <div className="flex flex-col gap-4 w-full max-w-md">
        {DIFFICULTIES.map((diff) => {
          const stars = (mounted ? getStars("anglais", englishMode, diff) : 0) as Stars;
          return (
            <Link key={diff} href={`/anglais/traduction/${englishMode}/${diff}`} className="group">
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

        <Link href={`/anglais/traduction/${englishMode}/libre`} className="group">
          <GlassCard className="p-4 flex items-center justify-between cursor-pointer group-hover:scale-[1.02] group-hover:-translate-y-0.5">
            <div className="flex flex-col gap-1">
              <p className="text-base font-display text-white">Jeu libre</p>
              <p className="text-sm text-white/80 mt-1 font-body">
                Sans limite — réponds jusqu'à trouver la bonne réponse
              </p>
            </div>
          </GlassCard>
        </Link>
      </div>
    </main>
  );
}
