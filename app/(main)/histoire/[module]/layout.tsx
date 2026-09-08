import type { Metadata } from "next";
import type { HistoryModule } from "@/lib/types";
import { HISTORY_MODULE_LABELS } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ module: string }>;
}): Promise<Metadata> {
  const { module: mod } = await params;
  const label = HISTORY_MODULE_LABELS[mod as HistoryModule];
  return { title: label ?? "Histoire" };
}

export default function HistoryModuleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
