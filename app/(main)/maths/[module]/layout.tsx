import type { Metadata } from "next";
import type { MathModule } from "@/lib/types";
import { MODULE_LABELS } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ module: string }>;
}): Promise<Metadata> {
  const { module } = await params;
  const label = MODULE_LABELS[module as MathModule];
  return { title: label ?? "Maths" };
}

export default function ModuleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
