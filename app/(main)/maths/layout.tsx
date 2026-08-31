import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maths",
  description: "Addition, soustraction, multiplication, division",
};

export default function MathsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
