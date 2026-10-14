import {
  BookOpen,
  CaseSensitive,
  CircleCheck,
  Ear,
  Languages,
  ListX,
  Repeat,
  Scale,
  Shapes,
  SpellCheck,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { BackLink } from "@/components/ui/BackLink";
import { Card } from "@/components/ui/Card";
import { PageSubtitle } from "@/components/ui/PageSubtitle";
import { PageTitle } from "@/components/ui/PageTitle";
import { FRENCH_MODULE_LABELS } from "@/lib/types";

const GROUPS: {
  title: string;
  cards: {
    key: string;
    href: string;
    label: string;
    description: string;
    icon: typeof BookOpen;
  }[];
}[] = [
  {
    title: "Lecture et compréhension",
    cards: [
      {
        key: "lecture",
        href: "/francais/lecture",
        label: FRENCH_MODULE_LABELS.lecture,
        description: "Petit texte et questions",
        icon: BookOpen,
      },
      {
        key: "vrai-faux",
        href: "/francais/lecture/vrai-faux",
        label: "Vrai ou faux",
        description: "Un petit texte, puis vrai ou faux",
        icon: CircleCheck,
      },
      {
        key: "intrus",
        href: "/francais/intrus",
        label: FRENCH_MODULE_LABELS.intrus,
        description: "Le mot qui n'appartient pas au groupe",
        icon: ListX,
      },
    ],
  },
  {
    title: "Orthographe et mots",
    cards: [
      {
        key: "articles",
        href: "/francais/articles",
        label: FRENCH_MODULE_LABELS.articles,
        description: "un, une, le ou la",
        icon: CaseSensitive,
      },
      {
        key: "accords",
        href: "/francais/accords",
        label: FRENCH_MODULE_LABELS.accords,
        description: "Singulier, pluriel et féminin",
        icon: Scale,
      },
      {
        key: "sons",
        href: "/francais/sons",
        label: FRENCH_MODULE_LABELS.sons,
        description: "oi, ou, an, ch, gn",
        icon: Ear,
      },
      {
        key: "homophones",
        href: "/francais/homophones",
        label: FRENCH_MODULE_LABELS.homophones,
        description: "a / à, et / est, on / ont…",
        icon: SpellCheck,
      },
      {
        key: "vocabulaire",
        href: "/francais/vocabulaire",
        label: FRENCH_MODULE_LABELS.vocabulaire,
        description: "Synonymes et contraires",
        icon: Languages,
      },
    ],
  },
  {
    title: "Grammaire",
    cards: [
      {
        key: "verbe",
        href: "/francais/verbe",
        label: FRENCH_MODULE_LABELS.verbe,
        description: "Repère l'action dans la phrase",
        icon: Zap,
      },
      {
        key: "pronoms",
        href: "/francais/pronoms",
        label: FRENCH_MODULE_LABELS.pronoms,
        description: "Il, elle, ils ou elles",
        icon: Users,
      },
      {
        key: "conjugaison",
        href: "/francais/conjugaison",
        label: FRENCH_MODULE_LABELS.conjugaison,
        description: "Présent, imparfait, futur",
        icon: Repeat,
      },
      {
        key: "nature",
        href: "/francais/nature",
        label: FRENCH_MODULE_LABELS.nature,
        description: "Nom, verbe, adjectif, déterminant",
        icon: Shapes,
      },
    ],
  },
];

export default function FrancaisPage() {
  return (
    <main className="flex flex-col items-center px-8 lg:px-16 py-8 lg:py-16 gap-8">
      <BackLink href="/" />

      <header className="grid gap-4 w-full text-center">
        <PageTitle size="5xl">Français</PageTitle>
        <PageSubtitle>Choisis ton exercice</PageSubtitle>
      </header>

      {GROUPS.map((group) => (
        <section key={group.title} className="grid gap-4 w-full">
          <PageSubtitle>{group.title}</PageSubtitle>
          <div className="grid gap-4 w-full lg:grid-cols-2">
            {group.cards.map((card) => {
              const Icon = card.icon;
              return (
                <Link key={card.key} href={card.href} className="group">
                  <Card>
                    <Icon size={40} className="shrink-0" />
                    <div className="flex flex-col gap-1 flex-1">
                      <p className="text-2xl font-display">{card.label}</p>
                      <p className="text-lg text-slate-700 font-body">{card.description}</p>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </main>
  );
}
