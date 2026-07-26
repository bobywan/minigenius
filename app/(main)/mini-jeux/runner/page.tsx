import type { Metadata } from "next";
import { RunnerGame } from "./RunnerGame";

export const metadata: Metadata = {
  title: "MiniGenius — Endless Runner",
  description: "Saute par-dessus les obstacles et bats ton record !",
};

export default function RunnerPage() {
  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-12">
      <RunnerGame />
    </main>
  );
}
