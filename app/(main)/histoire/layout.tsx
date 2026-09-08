import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Histoire",
  description: "Préhistoire, rois, Révolution",
};

export default function HistoireLayout({ children }: { children: React.ReactNode }) {
  return children;
}
