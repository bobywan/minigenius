"use client";

import { Castle, Crown, Factory, Flag, Flame, Landmark } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useEffect, useState } from "react";
import { BackLink } from "@/components/ui/BackLink";
import { Card } from "@/components/ui/Card";
import { PageSubtitle } from "@/components/ui/PageSubtitle";
import { PageTitle } from "@/components/ui/PageTitle";
import { StarRating } from "@/components/ui/StarRating";
import { useProgressStore } from "@/lib/store/progressStore";
import type { HistoryModule, Stars } from "@/lib/types";
import {
  HISTORY_MODULE_LABELS,
  HISTORY_SLOT_LABELS,
  HISTORY_SLOTS,
  isHistoryModule,
} from "@/lib/types";

const MODULE_ICONS: Record<HistoryModule, typeof Flame> = {
  prehistoire: Flame,
  "gaule-rome": Landmark,
  "moyen-age": Castle,
  rois: Crown,
  revolution: Flag,
  "france-recente": Factory,
};

const MODULE_DESC: Record<HistoryModule, string> = {
  prehistoire: "Chasseurs, grottes, agriculteurs",
  "gaule-rome": "Gaulois, Alésia, Romains",
  "moyen-age": "Châteaux, seigneurs, rois",
  rois: "François Ier, Henri IV, Louis XIV",
  revolution: "1789, République, Napoléon",
  "france-recente": "École, usines, Europe",
};

export default function HistoryModulePage({ params }: { params: Promise<{ module: string }> }) {
  const { module: raw } = use(params);

  if (!isHistoryModule(raw)) notFound();
  const historyModule = raw;

  const { getStars } = useProgressStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const slots = HISTORY_SLOTS[historyModule];
  const Icon = MODULE_ICONS[historyModule];

  return (
    <main className="flex flex-col items-center px-8 lg:px-16 py-8 lg:py-16 gap-8">
      <BackLink href="/histoire" />

      <header className="grid gap-4 w-full text-center">
        <PageTitle size="5xl">{HISTORY_MODULE_LABELS[historyModule]}</PageTitle>
        <PageSubtitle>Choisis un exercice</PageSubtitle>
      </header>

      <div className="grid gap-4 w-full lg:grid-cols-2">
        {slots.map((slot) => {
          const stars = (mounted ? getStars("histoire", historyModule, slot) : 0) as Stars;
          return (
            <Link key={slot} href={`/histoire/${historyModule}/${slot}`} className="group">
              <Card className="justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <Icon size={40} className="shrink-0" />
                  <div className="flex flex-col gap-1">
                    <p className="text-2xl font-display">{HISTORY_SLOT_LABELS[slot]}</p>
                    <p className="text-base text-slate-700 font-body">
                      {MODULE_DESC[historyModule]}
                    </p>
                  </div>
                </div>
                <StarRating stars={stars} size="sm" />
              </Card>
            </Link>
          );
        })}

        <Link href={`/histoire/${historyModule}/mixte/libre`} className="group">
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
