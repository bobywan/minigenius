"use client";

import {
  ArrowLeftRight,
  BookOpen,
  CaseSensitive,
  CircleCheck,
  Ear,
  House,
  ListX,
  PawPrint,
  Pencil,
  Repeat,
  Scale,
  Shapes,
  SpellCheck,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useEffect, useState } from "react";
import { BackLink } from "@/components/ui/BackLink";
import { Card } from "@/components/ui/Card";
import { MixAllCard } from "@/components/ui/MixAllCard";
import { PageSubtitle } from "@/components/ui/PageSubtitle";
import { PageTitle } from "@/components/ui/PageTitle";
import { StarRating } from "@/components/ui/StarRating";
import { useProgressStore } from "@/lib/store/progressStore";
import type { FrenchModule, FrenchSlot, Stars } from "@/lib/types";
import {
  FRENCH_MODULE_LABELS,
  FRENCH_SLOT_LABELS,
  FRENCH_SLOTS,
  isFrenchModule,
} from "@/lib/types";

const SLOT_ICONS: Partial<Record<FrenchSlot, typeof SpellCheck>> = {
  "a-a": SpellCheck,
  "et-est": SpellCheck,
  "on-ont": SpellCheck,
  "son-sont": SpellCheck,
  "ou-ou": SpellCheck,
  "ces-ses": SpellCheck,
  pluriel: Scale,
  feminin: Scale,
  synonymes: ArrowLeftRight,
  contraires: ArrowLeftRight,
  present: Repeat,
  imparfait: Repeat,
  futur: Repeat,
  animaux: PawPrint,
  ecole: Pencil,
  maison: House,
  quotidien: BookOpen,
  "vrai-faux": CircleCheck,
  "un-une": CaseSensitive,
  "le-la": CaseSensitive,
  "s-x": Scale,
  oi: Ear,
  ou: Ear,
  an: Ear,
  ch: Ear,
  gn: Ear,
  "verbes-er": Repeat,
  "etre-avoir": Repeat,
  mixte: Repeat,
  tout: Repeat,
};

const SOLO_ICON: Partial<Record<FrenchModule, typeof SpellCheck>> = {
  nature: Shapes,
  intrus: ListX,
  verbe: Zap,
  pronoms: Users,
};

const SLOT_DESC: Partial<Record<FrenchSlot, string>> = {
  "a-a": "Complète avec a ou à",
  "et-est": "Complète avec et ou est",
  "on-ont": "Complète avec on ou ont",
  "son-sont": "Complète avec son ou sont",
  "ou-ou": "Complète avec ou ou où",
  "ces-ses": "ces, ses, c'est, s'est",
  "s-x": "On ajoute s ou x",
  pluriel: "Pluriels comme chevaux, gâteaux",
  feminin: "Le féminin des adjectifs",
  synonymes: "Le mot qui veut dire pareil",
  contraires: "Le mot contraire",
  "verbes-er": "chanter, jouer, manger…",
  "etre-avoir": "je suis, tu as…",
  present: "Je, tu, il… au présent",
  imparfait: "Je, tu, il… à l'imparfait",
  futur: "Je, tu, il… au futur",
  animaux: "Petits textes sur les animaux",
  ecole: "Petits textes sur l'école",
  maison: "Petits textes à la maison",
  quotidien: "Petits textes du quotidien",
  "vrai-faux": "Le texte dit-il vrai ?",
  "un-une": "un ou une devant le nom",
  "le-la": "le ou la devant le nom",
  oi: "Le son oi",
  ou: "Le son ou",
  an: "Le son an",
  ch: "Le son ch",
  gn: "Le son gn",
  mixte: "Tous les exercices mélangés",
  tout: "Tous les exercices mélangés",
};

const SOLO_MIXTE_DESC: Partial<Record<FrenchModule, string>> = {
  nature: "Noms, verbes, adjectifs, déterminants",
  intrus: "Le mot qui n'est pas de la famille",
  verbe: "Repère l'action dans la phrase",
  pronoms: "Il, elle, ils ou elles",
};

function slotLabel(module: FrenchModule, slot: FrenchSlot): string {
  if (slot === "mixte" && FRENCH_SLOTS[module].length === 1) return "Série de 10";
  return FRENCH_SLOT_LABELS[slot];
}

function slotDescription(module: FrenchModule, slot: FrenchSlot): string {
  if (slot === "mixte" && FRENCH_SLOTS[module].length === 1) {
    return SOLO_MIXTE_DESC[module] ?? "";
  }
  return SLOT_DESC[slot] ?? "";
}

function libreSlot(module: FrenchModule): FrenchSlot {
  const slots = FRENCH_SLOTS[module];
  if (slots.includes("tout")) return "tout";
  if (slots.includes("mixte")) return "mixte";
  const first = slots[0];
  if (!first) throw new Error(`Aucun slot pour ${module}`);
  return first;
}

export default function FrenchModulePage({ params }: { params: Promise<{ module: string }> }) {
  const { module: raw } = use(params);

  if (!isFrenchModule(raw)) notFound();
  const frenchModule = raw;

  const { getStars } = useProgressStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const slots = FRENCH_SLOTS[frenchModule];
  const mixed = slots.filter((slot) => slot === "tout" || slot === "mixte");
  const main = slots.filter((slot) => slot !== "tout" && slot !== "mixte");
  const mixCards = main.length > 0 ? mixed : [];
  const regularSlots = main.length > 0 ? main : slots;

  return (
    <main className="flex flex-col items-center px-8 lg:px-16 py-8 lg:py-16 gap-8">
      <BackLink href="/francais" />

      <header className="grid gap-4 w-full text-center">
        <PageTitle size="5xl">{FRENCH_MODULE_LABELS[frenchModule]}</PageTitle>
        <PageSubtitle>Choisis un exercice</PageSubtitle>
      </header>

      <div className="grid gap-4 w-full lg:grid-cols-2">
        {regularSlots.map((slot) => {
          const Icon =
            FRENCH_SLOTS[frenchModule].length === 1
              ? (SOLO_ICON[frenchModule] ?? Shapes)
              : (SLOT_ICONS[slot] ?? Shapes);
          const stars = (mounted ? getStars("francais", frenchModule, slot) : 0) as Stars;
          return (
            <Link key={slot} href={`/francais/${frenchModule}/${slot}`} className="group">
              <Card className="justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <Icon size={40} className="shrink-0" />
                  <div className="flex flex-col gap-1">
                    <p className="text-2xl font-display">{slotLabel(frenchModule, slot)}</p>
                    <p className="text-base text-slate-700 font-body">
                      {slotDescription(frenchModule, slot)}
                    </p>
                  </div>
                </div>
                <StarRating stars={stars} size="sm" />
              </Card>
            </Link>
          );
        })}

        {mixCards.map((slot) => (
          <MixAllCard
            key={slot}
            href={`/francais/${frenchModule}/${slot}`}
            description={slotDescription(frenchModule, slot)}
          />
        ))}

        <Link href={`/francais/${frenchModule}/${libreSlot(frenchModule)}/libre`} className="group">
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
