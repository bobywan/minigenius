import type { Metadata } from "next";
import { HomeSubjects } from "@/components/ui/HomeSubjects";
import { Logo } from "@/components/ui/Logo";
import { PageSubtitle } from "@/components/ui/PageSubtitle";

export const metadata: Metadata = {
  title: { absolute: "MiniGenius — Choisis ta matière" },
  description: "L'app éducative pour les petits génies !",
};

export default function Home() {
  return (
    <main className="flex flex-col items-center px-6 lg:px-16 py-12 lg:py-16 gap-12">
      <header className="text-center flex flex-col items-center gap-3">
        <Logo size="large" />

        <PageSubtitle>Choisis ta matière pour commencer !</PageSubtitle>
      </header>

      <HomeSubjects />
    </main>
  );
}
