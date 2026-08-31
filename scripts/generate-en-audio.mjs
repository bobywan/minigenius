#!/usr/bin/env node
// node scripts/generate-en-audio.mjs
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, unlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { VOCABULARY } from "../lib/exercises/generators/english.ts";

const OUT_DIR = join(import.meta.dirname, "../public/audio/en");

function slug(word) {
  return word.trim().toLowerCase().replace(/\s+/g, "-");
}

function hasCmd(cmd) {
  return spawnSync("which", [cmd], { encoding: "utf8" }).status === 0;
}

function run(cmd, args) {
  const r = spawnSync(cmd, args, { encoding: "utf8" });
  if (r.status !== 0) {
    throw new Error(`${cmd} ${args.join(" ")} failed: ${r.stderr || r.stdout}`);
  }
}

function resolveFfmpeg() {
  if (hasCmd("ffmpeg")) return "ffmpeg";
  const r = spawnSync("npx", ["--yes", "ffmpeg-static"], { encoding: "utf8" });
  const bin = (r.stdout || "").trim().split("\n").at(-1);
  if (r.status === 0 && bin && existsSync(bin)) return bin;
  return null;
}

function pickSayVoice() {
  const r = spawnSync("say", ["-v", "?"], { encoding: "utf8" });
  const lines = (r.stdout || "").split("\n");
  const preferred = ["Samantha", "Karen", "Daniel", "Moira", "Alex"];
  for (const name of preferred) {
    if (lines.some((line) => line.startsWith(name))) return name;
  }
  const en = lines.find((line) => /\ben[_-](?:US|GB|AU)\b/i.test(line));
  return en ? en.split(/\s+/)[0] : "Samantha";
}

function toMp3(ffmpegBin, rawPath, mp3Path) {
  run(ffmpegBin, ["-y", "-i", rawPath, "-codec:a", "libmp3lame", "-q:a", "4", mp3Path]);
}

mkdirSync(OUT_DIR, { recursive: true });

const ffmpegBin = resolveFfmpeg();
const usePiper = Boolean(ffmpegBin) && hasCmd("piper");
const useSay = Boolean(ffmpegBin) && !usePiper && hasCmd("say");

if (!usePiper && !useSay) {
  console.error("Installe Piper+ffmpeg, ou sur macOS : say + ffmpeg (ou npx ffmpeg-static).");
  process.exit(1);
}

const voice = useSay ? pickSayVoice() : null;
if (usePiper) console.log("Génération : Piper");
else console.log(`Génération : say -v ${voice}`);

const words = VOCABULARY.tout.map((pair) => pair[0]);
let made = 0;
for (const word of words) {
  const mp3Path = join(OUT_DIR, `${slug(word)}.mp3`);
  if (existsSync(mp3Path)) {
    made += 1;
    continue;
  }
  const rawPath = join(tmpdir(), `minigenius-en-${slug(word)}.${usePiper ? "wav" : "aiff"}`);
  try {
    if (usePiper) {
      const spoken = spawnSync("piper", ["--output_file", rawPath], {
        input: `${word}\n`,
        encoding: "utf8",
      });
      if (spoken.status !== 0) {
        throw new Error(spoken.stderr || "piper failed");
      }
    } else {
      run("say", ["-v", voice, "-o", rawPath, word]);
    }
    toMp3(ffmpegBin, rawPath, mp3Path);
    made += 1;
  } finally {
    if (existsSync(rawPath)) unlinkSync(rawPath);
  }
}

console.log(`OK — ${made}/${words.length} MP3 dans public/audio/en`);
