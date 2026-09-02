import { BookOpen, Languages, Repeat, Scale, Shapes, SpellCheck } from "lucide-react";
import Link from "next/link";
import { BackLink } from "@/components/ui/BackLink";
import { Card } from "@/components/ui/Card";
import { PageSubtitle } from "@/components/ui/PageSubtitle";
import { PageTitle } from "@/components/ui/PageTitle";
import type { FrenchModule } from "@/lib/types";
import { FRENCH_MODULE_LABELS } from "@/lib/types";

const MODULES: {
  id: FrenchModule;
  icon: typeof SpellCheck;
  description: string;
}[] = [
  {
    id: "homophones",
    icon: SpellCheck,
    description: "a / à, et / est, on / ont…",
  },
  {
    id: "nature",
    icon: Shapes,
    description: "Nom, verbe, adjectif, déterminant",
  },
  {
    id: "accords",
    icon: Scale,
    description: "Pluriel et féminin",
  },
  {
    id: "vocabulaire",
    icon: Languages,
    description: "Synonymes et contraires",
  },
  {
    id: "conjugaison",
    icon: Repeat,
    description: "Présent, imparfait, futur",
  },
  {
    id: "lecture",
    icon: BookOpen,
    description: "Petit texte et questions",
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

      <div className="grid gap-4 w-full lg:grid-cols-2">
        {MODULES.map((mod) => {
          const Icon = mod.icon;
          return (
            <Link key={mod.id} href={`/francais/${mod.id}`} className="group">
              <Card>
                <Icon size={40} className="shrink-0" />
                <div className="flex flex-col gap-1 flex-1">
                  <p className="text-2xl font-display">{FRENCH_MODULE_LABELS[mod.id]}</p>
                  <p className="text-lg text-slate-700 font-body">{mod.description}</p>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
