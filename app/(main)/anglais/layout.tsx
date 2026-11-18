import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anglais",
  description: "Vocabulaire, phrases, conjugaison",
};

export default function AnglaisLayout({ children }: { children: React.ReactNode }) {
  return <div className="theme-anglais min-h-screen">{children}</div>;
}
