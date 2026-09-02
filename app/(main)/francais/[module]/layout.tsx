import type { Metadata } from "next";
import type { FrenchModule } from "@/lib/types";
import { FRENCH_MODULE_LABELS } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ module: string }>;
}): Promise<Metadata> {
  const { module: mod } = await params;
  const label = FRENCH_MODULE_LABELS[mod as FrenchModule];
  return { title: label ?? "Français" };
}

export default function FrenchModuleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
