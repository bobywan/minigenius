"use client";

import { Languages, MessageSquare, Repeat } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BackLink } from "@/components/ui/BackLink";
import { Card } from "@/components/ui/Card";
import { PageSubtitle } from "@/components/ui/PageSubtitle";
import { PageTitle } from "@/components/ui/PageTitle";
import { StarRating } from "@/components/ui/StarRating";
import { useProgressStore } from "@/lib/store/progressStore";
import type { Stars } from "@/lib/types";

const MODES = [
  {
    id: "traduction",
    label: "Traduction",
    icon: Languages,
    description: "Mots anglais et français",
    href: "/anglais/traduction",
    active: true,
  },
  {
    id: "phrases",
    label: "Phrases",
    icon: MessageSquare,
    description: "Compléter des phrases",
    href: null,
    active: false,
  },
  {
    id: "conjugaison",
    label: "Conjugaison",
    icon: Repeat,
    description: "Les verbes courants",
    href: null,
    active: false,
  },
];

const AVAILABLE = MODES.filter((m): m is (typeof MODES)[number] & { href: string } =>
  Boolean(m.active && m.href),
);
const COMING_SOON = MODES.filter((m) => !m.active);

export default function AnglaisPage() {
  const { getTotalStars } = useProgressStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="flex flex-col items-center px-8 lg:px-16 py-8 lg:py-16 gap-8">
      <BackLink href="/" />

      <header className="grid gap-4 w-full text-center">
        <PageTitle size="5xl">Anglais</PageTitle>
        <PageSubtitle>Choisis ton mode</PageSubtitle>
      </header>

      <div className="grid gap-4 w-full lg:grid-cols-2">
        {AVAILABLE.map((mode) => {
          const Icon = mode.icon;
          const totalEnFr = mounted ? getTotalStars("anglais", "en-fr") : 0;
          const totalFrEn = mounted ? getTotalStars("anglais", "fr-en") : 0;
          const totalMixte = mounted ? getTotalStars("anglais", "mixte") : 0;
          const total = Math.min(3, totalEnFr + totalFrEn + totalMixte) as Stars;
          return (
            <Link key={mode.id} href={mode.href} className="group">
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

      {COMING_SOON.length > 0 && (
        <section className="flex flex-col gap-4 w-full">
          <PageTitle>Bientôt disponible</PageTitle>
          <div className="grid gap-4 w-full lg:grid-cols-2">
            {COMING_SOON.map((mode) => {
              const Icon = mode.icon;
              return (
                <div key={mode.id} className="relative">
                  <Card disabled hover={false}>
                    <Icon size={40} className="shrink-0" />
                    <div className="flex flex-col gap-1">
                      <p className="text-2xl font-display">{mode.label}</p>
                      <p className="text-base font-body">{mode.description}</p>
                    </div>
                  </Card>
                  <span className="absolute top-3 right-3 text-xs font-display uppercase tracking-wide text-white bg-neutral-600 rounded-full px-3 py-1 shadow-[0_2px_0_#0f0826]">
                    Bientôt
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
