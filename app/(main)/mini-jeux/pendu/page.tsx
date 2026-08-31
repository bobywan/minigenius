import type { Metadata } from "next";
import { PenduGame } from "./PenduGame";

export const metadata: Metadata = {
  title: "Le Pendu",
  description: "Devine le mot caché lettre par lettre avant la pendaison !",
};

export default function PenduPage() {
  return <PenduGame />;
}
