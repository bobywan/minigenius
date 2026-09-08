import type { Metadata } from "next";
import type { EnglishQuizModule } from "@/lib/types";
import { ENGLISH_QUIZ_MODULE_LABELS } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ module: string }>;
}): Promise<Metadata> {
  const { module: mod } = await params;
  const label = ENGLISH_QUIZ_MODULE_LABELS[mod as EnglishQuizModule];
  return { title: label ?? "Anglais" };
}

export default function EnglishQuizModuleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
