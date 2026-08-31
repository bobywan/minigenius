import type { Metadata } from "next";
import { RunnerGame } from "./RunnerGame";

export const metadata: Metadata = {
  title: "Vol",
  description: "Maintiens pour voler, ramasse les pièces et évite les obstacles !",
};

export default function VolPage() {
  return <RunnerGame />;
}
