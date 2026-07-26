import type { Metadata } from "next";
import { PenduGame } from "./PenduGame";

export const metadata: Metadata = {
  title: "MiniGenius — Le Pendu",
  description: "Devine le mot caché lettre par lettre avant la pendaison !",
};

export default function PenduPage() {
  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-12">
      <PenduGame />
    </main>
  );
}
