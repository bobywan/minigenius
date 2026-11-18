import { BookOpen, Calculator, Gamepad2, Globe, Landmark } from "lucide-react";
import type { Subject } from "@/lib/types";

export type SubjectId = Subject | "mini-jeux";

export const SUBJECTS: {
  id: SubjectId;
  label: string;
  icon: typeof Calculator;
  description: string;
  href: string;
}[] = [
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

export function subjectFromPath(pathname: string) {
  const first = pathname.split("/")[1];
  return SUBJECTS.find((s) => s.id === first);
}
