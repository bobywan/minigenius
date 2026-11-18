import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Français",
  description: "Lecture, orthographe, grammaire",
};

export default function FrancaisLayout({ children }: { children: React.ReactNode }) {
  return <div className="theme-francais min-h-screen">{children}</div>;
}
