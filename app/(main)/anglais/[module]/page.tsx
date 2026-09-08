"use client";

import {
  BookOpen,
  House,
  MessageSquare,
  PawPrint,
  Pencil,
  Repeat,
  Scale,
  Shapes,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useEffect, useState } from "react";
import { BackLink } from "@/components/ui/BackLink";
import { Card } from "@/components/ui/Card";
import { PageSubtitle } from "@/components/ui/PageSubtitle";
import { PageTitle } from "@/components/ui/PageTitle";
import { StarRating } from "@/components/ui/StarRating";
import { useProgressStore } from "@/lib/store/progressStore";
import type { EnglishQuizModule, EnglishQuizSlot, Stars } from "@/lib/types";
import {
  ENGLISH_QUIZ_MODULE_LABELS,
  ENGLISH_QUIZ_SLOT_LABELS,
  ENGLISH_QUIZ_SLOTS,
  isEnglishQuizModule,
} from "@/lib/types";

const SLOT_ICONS: Partial<Record<EnglishQuizSlot, typeof Repeat>> = {
  present: Repeat,
  preterit: Repeat,
  participe: Repeat,
  "to-be": MessageSquare,
  prepositions: MessageSquare,
  temps: MessageSquare,
  regulier: Scale,
  irregulier: Scale,
  animaux: PawPrint,
  ecole: Pencil,
  maison: House,
  quotidien: BookOpen,
  mixte: Repeat,
  tout: Repeat,
};

const SLOT_DESC: Partial<Record<EnglishQuizSlot, string>> = {
  present: "I, you, he… au présent",
  preterit: "I, you, he… au prétérit",
  participe: "I, you, he… au participe",
  "to-be": "am, is, are, have, has",
  prepositions: "in, on, under, next to",
  temps: "Présent ou prétérit dans la phrase",
  regulier: "cats, boxes, babies…",
  irregulier: "children, men, feet…",
  animaux: "Petits textes sur les animaux",
  ecole: "Petits textes sur l'école",
  maison: "Petits textes à la maison",
  quotidien: "Petits textes du quotidien",
  mixte: "Tous les exercices mélangés",
  tout: "Tous les exercices mélangés",
};

function slotLabel(module: EnglishQuizModule, slot: EnglishQuizSlot): string {
  if ((module === "articles" || module === "contraires") && slot === "mixte") {
    return "Série de 10";
  }
  return ENGLISH_QUIZ_SLOT_LABELS[slot];
}

function slotDescription(module: EnglishQuizModule, slot: EnglishQuizSlot): string {
  if (module === "articles" && slot === "mixte") return "a, an, the, some";
  if (module === "contraires" && slot === "mixte") return "The opposite of…";
  return SLOT_DESC[slot] ?? "";
}

function libreSlot(module: EnglishQuizModule): EnglishQuizSlot {
  const slots = ENGLISH_QUIZ_SLOTS[module];
  if (slots.includes("tout")) return "tout";
  if (slots.includes("mixte")) return "mixte";
  const first = slots[0];
  if (!first) throw new Error(`Aucun slot pour ${module}`);
  return first;
}

export default function EnglishQuizModulePage({ params }: { params: Promise<{ module: string }> }) {
  const { module: raw } = use(params);

  if (!isEnglishQuizModule(raw)) notFound();
  const quizModule = raw;

  const { getStars } = useProgressStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const slots = ENGLISH_QUIZ_SLOTS[quizModule];
  const mixed = slots.filter((slot) => slot === "tout" || slot === "mixte");
  const main = slots.filter((slot) => slot !== "tout" && slot !== "mixte");
  const ordered = main.length > 0 ? [...main, ...mixed] : slots;

  return (
    <main className="flex flex-col items-center px-8 lg:px-16 py-8 lg:py-16 gap-8">
      <BackLink href="/anglais" />

      <header className="grid gap-4 w-full text-center">
        <PageTitle size="5xl">{ENGLISH_QUIZ_MODULE_LABELS[quizModule]}</PageTitle>
        <PageSubtitle>Choisis un exercice</PageSubtitle>
      </header>

      <div className="grid gap-4 w-full lg:grid-cols-2">
        {ordered.map((slot) => {
          const Icon = SLOT_ICONS[slot] ?? Shapes;
          const stars = (mounted ? getStars("anglais", quizModule, slot) : 0) as Stars;
          return (
            <Link key={slot} href={`/anglais/${quizModule}/${slot}`} className="group">
              <Card className="justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <Icon size={40} className="shrink-0" />
                  <div className="flex flex-col gap-1">
                    <p className="text-2xl font-display">{slotLabel(quizModule, slot)}</p>
                    <p className="text-base text-slate-700 font-body">
                      {slotDescription(quizModule, slot)}
                    </p>
                  </div>
                </div>
                <StarRating stars={stars} size="sm" />
              </Card>
            </Link>
          );
        })}

        <Link href={`/anglais/${quizModule}/${libreSlot(quizModule)}/libre`} className="group">
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
