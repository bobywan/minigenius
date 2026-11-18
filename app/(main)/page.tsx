import { BookOpen, Calculator, Gamepad2, Globe, Landmark } from "lucide-react";
import type { Metadata } from "next";
import { Logo } from "@/components/ui/Logo";
import { NavCard } from "@/components/ui/NavCard";
import { PageSubtitle } from "@/components/ui/PageSubtitle";

export const metadata: Metadata = {
  title: { absolute: "MiniGenius — Choisis ta matière" },
  description: "L'app éducative pour les petits génies !",
};

const SUBJECTS = [
  {
    id: "maths",
    label: "Maths",
    icon: Calculator,
    description: "Addition, soustraction, multiplication, division",
    href: "/maths",
  },
  {
    id: "francais",
    label: "Français",
    icon: BookOpen,
    description: "Lecture, orthographe, grammaire",
    href: "/francais",
  },
  {
    id: "anglais",
    label: "Anglais",
    icon: Globe,
    description: "Vocabulaire, phrases, conjugaison",
    href: "/anglais",
  },
  {
    id: "histoire",
    label: "Histoire",
    icon: Landmark,
    description: "Préhistoire, rois, Révolution",
    href: "/histoire",
  },
  {
    id: "mini-jeux",
    label: "Mini-jeux",
    icon: Gamepad2,
    description: "Pendu, vol et course",
    href: "/mini-jeux",
  },
];

export default function Home() {
  return (
    <main className="flex flex-col items-center px-6 lg:px-16 py-12 lg:py-16 gap-12">
      <header className="text-center flex flex-col items-center gap-3">
        <Logo size="large" />

        <PageSubtitle>Choisis ta matière pour commencer !</PageSubtitle>
      </header>

      <section className="grid gap-4 w-full lg:grid-cols-2">
        {SUBJECTS.map(({ id, icon: Icon, label, description, href }) => (
          <NavCard
            key={id}
            href={href}
            className={`theme-${id}`}
            icon={<Icon size={28} />}
            title={label}
            description={description}
          />
        ))}
      </section>
    </main>
  );
}
