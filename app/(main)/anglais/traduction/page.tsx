"use client";

import { ArrowLeftRight, Languages, Repeat } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BackLink } from "@/components/ui/BackLink";
import { Card } from "@/components/ui/Card";
import { PageSubtitle } from "@/components/ui/PageSubtitle";
import { PageTitle } from "@/components/ui/PageTitle";
import { StarRating } from "@/components/ui/StarRating";
import { useProgressStore } from "@/lib/store/progressStore";
import type { EnglishModule, Stars } from "@/lib/types";

const MODES: {
  id: EnglishModule;
  label: string;
  icon: typeof Languages;
  description: string;
}[] = [
  {
    id: "en-fr",
    label: "Anglais → Français",
    icon: Languages,
    description: "Un mot anglais, quatre traductions au choix",
  },
  {
    id: "fr-en",
    label: "Français → Anglais",
    icon: ArrowLeftRight,
    description: "Un mot français, quatre traductions au choix",
  },
  {
    id: "mixte",
    label: "Tout mélanger",
    icon: Repeat,
    description: "Alternance aléatoire des deux sens de traduction",
  },
];

export default function TraductionPage() {
  const { getTotalStars } = useProgressStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="flex flex-col items-center px-8 lg:px-16 py-8 lg:py-16 gap-8">
      <BackLink href="/anglais" />

      <header className="grid gap-4 w-full text-center">
        <PageTitle size="5xl">Traduction</PageTitle>
        <PageSubtitle>Choisis ton mode</PageSubtitle>
      </header>

      <div className="grid gap-4 w-full lg:grid-cols-2">
        {MODES.map((mode) => {
          const Icon = mode.icon;
          const total = Math.min(3, mounted ? getTotalStars("anglais", mode.id) : 0) as Stars;
          const href =
            mode.id === "mixte" ? "/anglais/traduction/mixte" : `/anglais/traduction/${mode.id}`;
          return (
            <Link key={mode.id} href={href} className="group">
              <Card>
                <Icon size={40} className="shrink-0" />
                <div className="flex flex-col gap-1 flex-1">
                  <p className="text-2xl font-display">{mode.label}</p>
                  <p className="text-lg text-slate-700 font-body">{mode.description}</p>
                </div>
                <StarRating stars={total} size="sm" />
              </Card>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
