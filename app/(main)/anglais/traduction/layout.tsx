import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Traduction",
  description: "Mots anglais et français",
};

export default function TraductionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
