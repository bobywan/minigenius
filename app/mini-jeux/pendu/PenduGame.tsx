"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { neonBtnCls } from "@/components/ui/NeonButton";

const WORDS = [
  "CHEVAL",
  "MAISON",
  "SOLEIL",
  "JARDIN",
  "BATEAU",
  "ECOLE",
  "FLEUR",
  "LAPIN",
  "OISEAU",
  "TIGRE",
  "GIRAFE",
  "DRAGON",
  "NUAGE",
  "ETOILE",
  "FORÊT",
  "RIVIERE",
  "MONTAGNE",
  "CHATEAU",
  "LICORNE",
  "DAUPHIN",
  "SERPENT",
  "ARAIGNEE",
  "CANARD",
  "RENARD",
  "HIBOU",
  "TORTUE",
  "COCHON",
  "MOUTON",
  "ELEPHANT",
  "CROCODILE",
  "PAPILLON",
  "GRENOUILLE",
  "CHAMPIGNON",
  "BIBLIOTHEQUE",
  "ORDINATEUR",
  "TELEPHONE",
  "VOITURE",
  "AVION",
  "FUSEE",
  "ROBOT",
  "BALLON",
  "CRAYON",
  "GUITARE",
  "PIANO",
  "TAMBOUR",
  "PEINTURE",
  "TABLEAU",
  "CAHIER",
  "STYLO",
  "GOMME",
  "REGLE",
  "CISEAUX",
  "COLLE",
  "CARTABLE",
  "MANTEAU",
  "CHAPEAU",
  "CHAUSSURE",
  "PYJAMA",
  "PANTALON",
  "CHEMISE",
  "ROBE",
  "GÂTEAU",
  "CHOCOLAT",
  "FRAISE",
  "BANANE",
  "CERISE",
  "ORANGE",
  "POMME",
  "CITRON",
  "PASTÈQUE",
  "TOMATE",
  "CAROTTE",
  "BROCOLI",
  "CHAMPIGNON",
  "PIZZA",
  "CREPE",
  "BISCUIT",
];

function sanitize(word: string): string {
  return word
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/[^A-Z]/g, "");
}

function pickWord(): string {
  const idx = Math.floor(Math.random() * WORDS.length);
  return sanitize(WORDS[idx] as string);
}

type Status = "playing" | "win" | "lose";

type GameState = {
  word: string;
  guessed: Set<string>;
  errors: number;
  status: Status;
};

function initGame(): GameState {
  return { word: pickWord(), guessed: new Set(), errors: 0, status: "playing" };
}

// SVG du pendu — 6 étapes révélées progressivement
function HangmanSVG({ errors }: { errors: number }) {
  const show = (step: number) => ({
    opacity: errors >= step ? 1 : 0,
    transition: "opacity 0.4s ease",
  });

  return (
    <svg
      viewBox="0 0 200 220"
      className="w-48 h-48 sm:w-56 sm:h-56"
      aria-label={`Pendu : ${errors} erreur${errors > 1 ? "s" : ""} sur 6`}
      role="img"
    >
      {/* Socle + montant vertical */}
      <g style={show(1)}>
        <line
          x1="20"
          y1="210"
          x2="180"
          y2="210"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <line
          x1="60"
          y1="210"
          x2="60"
          y2="20"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </g>
      {/* Potence horizontale */}
      <g style={show(2)}>
        <line
          x1="60"
          y1="20"
          x2="140"
          y2="20"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </g>
      {/* Corde */}
      <g style={show(3)}>
        <line
          x1="140"
          y1="20"
          x2="140"
          y2="50"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>
      {/* Tête */}
      <g style={show(4)}>
        <circle cx="140" cy="68" r="18" stroke="white" strokeWidth="4" fill="none" />
      </g>
      {/* Tronc */}
      <g style={show(5)}>
        <line
          x1="140"
          y1="86"
          x2="140"
          y2="145"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>
      {/* Membres (bras + jambes) */}
      <g style={show(6)}>
        <line
          x1="140"
          y1="100"
          x2="115"
          y2="125"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <line
          x1="140"
          y1="100"
          x2="165"
          y2="125"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <line
          x1="140"
          y1="145"
          x2="115"
          y2="175"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <line
          x1="140"
          y1="145"
          x2="165"
          y2="175"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function PenduGame() {
  const [game, setGame] = useState<GameState>(initGame);

  const guess = useCallback(
    (letter: string) => {
      if (game.status !== "playing" || game.guessed.has(letter)) return;
      setGame((prev) => {
        const guessed = new Set(prev.guessed).add(letter);
        const isCorrect = prev.word.includes(letter);
        const errors = isCorrect ? prev.errors : prev.errors + 1;
        const allFound = prev.word.split("").every((l) => guessed.has(l));
        const status: Status = allFound ? "win" : errors >= 6 ? "lose" : "playing";
        return { ...prev, guessed, errors, status };
      });
    },
    [game.status, game.guessed],
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const letter = e.key.toUpperCase();
      if (/^[A-Z]$/.test(letter)) guess(letter);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [guess]);

  const maskedWord = game.word.split("").map((l) => (game.guessed.has(l) ? l : "_"));

  const restart = () => setGame(initGame());

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg">
      <header className="flex flex-col items-center gap-4 w-full">
        <Link href="/mini-jeux" className={neonBtnCls("ghost", "sm")}>
          ← Retour
        </Link>
        <h1 className="text-5xl font-display text-white">
          Le <span className="text-[#e040fb]">Pendu</span>
        </h1>
      </header>

      {/* Pendu SVG */}
      <GlassCard className="p-4 flex items-center justify-center w-full">
        <HangmanSVG errors={game.errors} />
      </GlassCard>

      {/* Mot masqué */}
      <p className="sr-only" aria-live="polite">{`Mot : ${maskedWord.join(" ")}`}</p>
      <div className="flex flex-wrap justify-center gap-2">
        {maskedWord.map((l, i) => (
          <span
            key={i}
            className="w-8 h-10 flex items-end justify-center border-b-4 border-white text-2xl font-display text-white"
          >
            {l !== "_" ? l : ""}
          </span>
        ))}
      </div>

      {/* Compteur d'erreurs */}
      <p className="font-display text-white text-lg" aria-live="polite">
        Erreurs :{" "}
        <span className={game.errors >= 4 ? "text-red-400" : "text-white"}>{game.errors} / 6</span>
      </p>

      {/* État victoire / défaite */}
      {game.status !== "playing" && (
        <GlassCard
          variant={game.status === "win" ? "success" : "error"}
          className="p-4 flex flex-col items-center gap-3 w-full"
        >
          <p className="text-2xl font-display text-white drop-shadow-lg">
            {game.status === "win"
              ? "Bravo ! Tu as gagné !"
              : `Perdu ! Le mot était : ${game.word}`}
          </p>
          <button type="button" onClick={restart} className={neonBtnCls("brand", "md")}>
            Rejouer
          </button>
        </GlassCard>
      )}

      {/* Clavier virtuel */}
      <fieldset className="flex flex-wrap justify-center gap-1.5 w-full border-0 p-0 m-0">
        <legend className="sr-only">Clavier virtuel</legend>
        {ALPHABET.map((letter) => {
          const played = game.guessed.has(letter);
          const correct = played && game.word.includes(letter);
          const wrong = played && !game.word.includes(letter);
          const inactive = played || game.status !== "playing";
          return (
            <motion.button
              key={letter}
              type="button"
              onClick={() => guess(letter)}
              disabled={inactive}
              aria-pressed={played}
              aria-label={`Lettre ${letter}`}
              whileTap={inactive ? undefined : { y: 4, boxShadow: "0 1px 0 #0f0826" }}
              style={{ textShadow: "var(--text-shadow-solid)" }}
              className={[
                "w-[46px] min-h-[52px] rounded-[var(--radius-btn)]",
                "font-body font-bold text-lg text-white select-none",
                "border-2 transition-colors duration-100",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                "disabled:cursor-not-allowed",
                correct
                  ? "bg-success-500 border-success-400 shadow-[var(--shadow-success)] opacity-70"
                  : wrong
                    ? "bg-error-500 border-error-400 shadow-[var(--shadow-error)] opacity-50"
                    : "bg-neutral-900/80 hover:bg-neutral-900/95 border-white/30 shadow-[var(--shadow-btn)] cursor-pointer",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {letter}
            </motion.button>
          );
        })}
      </fieldset>
    </div>
  );
}
