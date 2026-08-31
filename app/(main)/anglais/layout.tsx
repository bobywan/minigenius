import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anglais",
  description: "Vocabulaire, phrases, conjugaison",
};

export default function AnglaisLayout({ children }: { children: React.ReactNode }) {
  return children;
}
