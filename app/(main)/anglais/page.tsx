import {
  ArrowLeftRight,
  BookOpen,
  Languages,
  MessageSquare,
  Repeat,
  Scale,
  SpellCheck,
} from "lucide-react";
import Link from "next/link";
import { BackLink } from "@/components/ui/BackLink";
import { Card } from "@/components/ui/Card";
import { PageSubtitle } from "@/components/ui/PageSubtitle";
import { PageTitle } from "@/components/ui/PageTitle";
import type { EnglishQuizModule } from "@/lib/types";
import { ENGLISH_QUIZ_MODULE_LABELS } from "@/lib/types";

const MODES: {
  id: "traduction" | EnglishQuizModule;
  label: string;
  icon: typeof Languages;
  description: string;
  href: string;
}[] = [
  {
    id: "traduction",
    label: "Traduction",
    icon: Languages,
    description: "Mots anglais et français",
    href: "/anglais/traduction",
  },
  {
    id: "conjugaison",
    label: ENGLISH_QUIZ_MODULE_LABELS.conjugaison,
    icon: Repeat,
    description: "Présent, prétérit, participe",
    href: "/anglais/conjugaison",
  },
  {
    id: "phrases",
    label: ENGLISH_QUIZ_MODULE_LABELS.phrases,
    icon: MessageSquare,
    description: "Compléter des phrases",
    href: "/anglais/phrases",
  },
  {
    id: "pluriels",
    label: ENGLISH_QUIZ_MODULE_LABELS.pluriels,
    icon: Scale,
    description: "Régulier et irrégulier",
    href: "/anglais/pluriels",
  },
  {
    id: "articles",
    label: ENGLISH_QUIZ_MODULE_LABELS.articles,
    icon: SpellCheck,
    description: "a, an, the",
    href: "/anglais/articles",
  },
  {
    id: "contraires",
    label: ENGLISH_QUIZ_MODULE_LABELS.contraires,
    icon: ArrowLeftRight,
    description: "The opposite of…",
    href: "/anglais/contraires",
  },
  {
    id: "lecture",
    label: ENGLISH_QUIZ_MODULE_LABELS.lecture,
    icon: BookOpen,
    description: "Petit texte et questions",
    href: "/anglais/lecture",
  },
];

export default function AnglaisPage() {
  return (
    <main className="flex flex-col items-center px-8 lg:px-16 py-8 lg:py-16 gap-8">
      <BackLink href="/" />

      <header className="grid gap-4 w-full text-center">
        <PageTitle size="5xl">Anglais</PageTitle>
        <PageSubtitle>Choisis ton mode</PageSubtitle>
      </header>

      <div className="grid gap-4 w-full lg:grid-cols-2">
        {MODES.map((mode) => {
          const Icon = mode.icon;
          return (
            <Link key={mode.id} href={mode.href} className="group">
              <Card>
                <Icon size={40} className="shrink-0" />
                <div className="flex flex-col gap-1 flex-1">
                  <p className="text-2xl font-display">{mode.label}</p>
                  <p className="text-lg text-slate-700 font-body">{mode.description}</p>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
