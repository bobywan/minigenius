import type { Metadata } from "next";
import type { EnglishTheme } from "@/lib/types";
import { ENGLISH_THEME_LABELS } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ theme: string }>;
}): Promise<Metadata> {
  const { theme } = await params;
  const label = ENGLISH_THEME_LABELS[theme as EnglishTheme];
  return { title: label ?? "Traduction" };
}

export default function ThemeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
