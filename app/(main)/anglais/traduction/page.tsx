import {
  Apple,
  Bus,
  ChefHat,
  House,
  Leaf,
  Palette,
  PawPrint,
  Pencil,
  PersonStanding,
  Repeat,
  Shirt,
  Smile,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { BackLink } from "@/components/ui/BackLink";
import { Card } from "@/components/ui/Card";
import { PageSubtitle } from "@/components/ui/PageSubtitle";
import { PageTitle } from "@/components/ui/PageTitle";
import type { EnglishTheme } from "@/lib/types";
import { ENGLISH_THEME_LABELS, ENGLISH_THEMES } from "@/lib/types";

const THEME_ICONS: Record<EnglishTheme, typeof PawPrint> = {
  animaux: PawPrint,
  corps: PersonStanding,
  couleurs: Palette,
  famille: Users,
  nourriture: Apple,
  cuisine: ChefHat,
  maison: House,
  nature: Leaf,
  ecole: Pencil,
  vetements: Shirt,
  transports: Bus,
  sports: Trophy,
  emotions: Smile,
  actions: Zap,
  tout: Repeat,
};

const THEME_DESC: Record<EnglishTheme, string> = {
  animaux: "Chien, chat, oiseaux et insectes",
  corps: "Tête, mains, jambes…",
  couleurs: "Rouge, bleu, vert et les autres",
  famille: "Papa, maman, cousins…",
  nourriture: "Pain, fruits, boissons",
  cuisine: "Four, repas, cuisiner…",
  maison: "Pièces et objets du quotidien",
  nature: "Soleil, mer, forêt",
  ecole: "Crayon, cahier, récré…",
  vetements: "T-shirt, chaussures, manteau…",
  transports: "Vélo, bus, train, avion…",
  sports: "Ballon, équipe, match…",
  emotions: "Content, triste, en colère…",
  actions: "Manger, courir, jouer…",
  tout: "Tous les thèmes mélangés",
};

export default function TraductionPage() {
  const themes = ENGLISH_THEMES.filter((id) => id !== "tout");

  return (
    <main className="flex flex-col items-center px-8 lg:px-16 py-8 lg:py-16 gap-8">
      <BackLink href="/anglais" />

      <header className="grid gap-4 w-full text-center">
        <PageTitle size="5xl">Traduction</PageTitle>
        <PageSubtitle>Choisis un thème</PageSubtitle>
      </header>

      <div className="grid gap-4 w-full lg:grid-cols-2">
        {themes.map((id) => {
          const Icon = THEME_ICONS[id];
          return (
            <Link key={id} href={`/anglais/traduction/${id}`} className="group">
              <Card>
                <Icon size={40} className="shrink-0" />
                <div className="flex flex-col gap-1 flex-1">
                  <p className="text-2xl font-display">{ENGLISH_THEME_LABELS[id]}</p>
                  <p className="text-lg text-slate-700 font-body">{THEME_DESC[id]}</p>
                </div>
              </Card>
            </Link>
          );
        })}

        <Link href="/anglais/traduction/tout" className="group lg:col-span-2">
          <Card className="justify-center">
            <Repeat size={40} className="shrink-0" />
            <div className="flex flex-col gap-1">
              <p className="text-2xl font-display">{ENGLISH_THEME_LABELS.tout}</p>
              <p className="text-lg text-slate-700 font-body">{THEME_DESC.tout}</p>
            </div>
          </Card>
        </Link>
      </div>
    </main>
  );
}
