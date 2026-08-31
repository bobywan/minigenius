import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tout mélanger",
  description: "Toutes les opérations mélangées",
};

export default function MixteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
