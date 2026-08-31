"use client";

import { ArrowLeftRight, Languages, Repeat } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useEffect, useState } from "react";
import { BackLink } from "@/components/ui/BackLink";
import { Card } from "@/components/ui/Card";
import { PageSubtitle } from "@/components/ui/PageSubtitle";
import { PageTitle } from "@/components/ui/PageTitle";
import { StarRating } from "@/components/ui/StarRating";
import { useProgressStore } from "@/lib/store/progressStore";
import type { EnglishModule, EnglishTheme, MixedModule, Stars } from "@/lib/types";
import {
  ENGLISH_DIRECTIONS,
  ENGLISH_MODULE_LABELS,
  ENGLISH_THEME_LABELS,
  ENGLISH_THEMES,
} from "@/lib/types";

const MODE_ICONS: Record<EnglishModule | MixedModule, typeof Languages> = {
  "en-fr": Languages,
  "fr-en": ArrowLeftRight,
  mixte: Repeat,
};

const MODE_DESC: Record<EnglishModule | MixedModule, string> = {
  "en-fr": "Un mot anglais, quatre traductions au choix",
  "fr-en": "Un mot français, quatre traductions au choix",
  mixte: "Alternance aléatoire des deux sens de traduction",
};

export default function ThemePage({ params }: { params: Promise<{ theme: string }> }) {
  const { theme } = use(params);

  if (!ENGLISH_THEMES.includes(theme as EnglishTheme)) notFound();
  const englishTheme = theme as EnglishTheme;

  const { getStars } = useProgressStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="flex flex-col items-center px-8 lg:px-16 py-8 lg:py-16 gap-8">
      <BackLink href="/anglais/traduction" />

      <header className="grid gap-4 w-full text-center">
        <PageTitle>{ENGLISH_THEME_LABELS[englishTheme]}</PageTitle>
        <PageSubtitle>Choisis ton mode</PageSubtitle>
      </header>

      <div className="grid gap-4 w-full lg:grid-cols-2">
        {ENGLISH_DIRECTIONS.map((mode) => {
          const Icon = MODE_ICONS[mode];
          const stars = (mounted ? getStars("anglais", englishTheme, mode) : 0) as Stars;
          return (
            <Link key={mode} href={`/anglais/traduction/${englishTheme}/${mode}`} className="group">
              <Card className="justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <Icon size={40} className="shrink-0" />
                  <div className="flex flex-col gap-1">
                    <p className="text-2xl font-display">{ENGLISH_MODULE_LABELS[mode]}</p>
                    <p className="text-base text-slate-700 font-body">{MODE_DESC[mode]}</p>
                  </div>
                </div>
                <StarRating stars={stars} size="sm" />
              </Card>
            </Link>
          );
        })}

        <Link href={`/anglais/traduction/${englishTheme}/libre`} className="group">
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
