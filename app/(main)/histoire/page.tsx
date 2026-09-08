import { Castle, Crown, Factory, Flag, Flame, Landmark } from "lucide-react";
import Link from "next/link";
import { BackLink } from "@/components/ui/BackLink";
import { Card } from "@/components/ui/Card";
import { PageSubtitle } from "@/components/ui/PageSubtitle";
import { PageTitle } from "@/components/ui/PageTitle";
import type { HistoryModule } from "@/lib/types";
import { HISTORY_MODULE_LABELS } from "@/lib/types";

const MODULES: {
  id: HistoryModule;
  icon: typeof Flame;
  description: string;
}[] = [
  {
    id: "prehistoire",
    icon: Flame,
    description: "Chasseurs, grottes, agriculteurs",
  },
  {
    id: "gaule-rome",
    icon: Landmark,
    description: "Gaulois, Alésia, Romains",
  },
  {
    id: "moyen-age",
    icon: Castle,
    description: "Châteaux, seigneurs, rois",
  },
  {
    id: "rois",
    icon: Crown,
    description: "François Ier, Henri IV, Louis XIV",
  },
  {
    id: "revolution",
    icon: Flag,
    description: "1789, République, Napoléon",
  },
  {
    id: "france-recente",
    icon: Factory,
    description: "École, usines, Europe",
  },
];

export default function HistoirePage() {
  return (
    <main className="flex flex-col items-center px-8 lg:px-16 py-8 lg:py-16 gap-8">
      <BackLink href="/" />

      <header className="grid gap-4 w-full text-center">
        <PageTitle size="5xl">Histoire</PageTitle>
        <PageSubtitle>Choisis ton exercice</PageSubtitle>
      </header>

      <div className="grid gap-4 w-full lg:grid-cols-2">
        {MODULES.map((mod) => {
          const Icon = mod.icon;
          return (
            <Link key={mod.id} href={`/histoire/${mod.id}`} className="group">
              <Card>
                <Icon size={40} className="shrink-0" />
                <div className="flex flex-col gap-1 flex-1">
                  <p className="text-2xl font-display">{HISTORY_MODULE_LABELS[mod.id]}</p>
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
