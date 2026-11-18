"use client";

import { useEffect, useRef } from "react";
import { BackLink } from "@/components/ui/BackLink";
import { PageTitle } from "@/components/ui/PageTitle";

const VW = 640;
const VH = 480;
const GROUND_Y = 420;
const CEILING_Y = 24;
const PLAYER_W = 28;
const PLAYER_H = 36;
const PLAYER_X = 90;
const GRAVITY = 0.55;
const THRUST = -0.95;
const MAX_FALL = 12;
const MAX_RISE = -10;
const INITIAL_SPEED = 5;
const ACCELERATION = 0.0014;
const MAX_SPEED = 12;
const HIT_PADDING = 4;
const LS_KEY = "vol_hiscore";

const COLOR = {
  skyTop: "#EEF0FF",
  skyBottom: "#ECEEF8",
  sun: "#F59E0B",
  sunGlow: "#FEF3C7",
  mountains: "#DDE1EE",
  hills: "#C3C9DD",
  ground: "#646B8F",
  groundDark: "#474D6E",
  player: "#4F46E5",
  playerDark: "#4338CA",
  playerGameOver: "#DC2626",
  obstacleTall: "#F59E0B",
  obstacleTallDark: "#B45309",
  obstacle: "#DC2626",
  obstacleDark: "#B91C1C",
  coin: "#F59E0B",
  coinInner: "#FEF3C7",
  text: "#161A36",
  overlay: "rgba(255, 255, 255, 0.82)",
  title: "#4F46E5",
  gameOver: "#B91C1C",
} as const;

type GameState = "IDLE" | "RUNNING" | "GAMEOVER";

type Obstacle = { x: number; y: number; w: number; h: number };
type Coin = { x: number; y: number; r: number; taken: boolean };

class VolEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private dpr: number;
  private rafId = 0;

  private state: GameState = "IDLE";
  private score = 0;
  private coins = 0;
  private hiScore = 0;
  private speed = INITIAL_SPEED;
  private thrusting = false;

  private playerY = GROUND_Y - PLAYER_H;
  private velocityY = 0;

  private obstacles: Obstacle[] = [];
  private pickups: Coin[] = [];
  private nextSpawnIn = 280;

  private bgOffset = 0;
  private mgOffset = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D context unavailable");
    this.ctx = ctx;
    this.dpr = window.devicePixelRatio || 1;
    this.hiScore = Number(localStorage.getItem(LS_KEY) ?? 0);
    this.resize();
    this.bindInput();
    this.loop();
  }

  resize() {
    const parent = this.canvas.parentElement;
    const cssW = parent?.clientWidth ?? VW;
    const cssH = parent?.clientHeight ?? VH;
    this.dpr = window.devicePixelRatio || 1;
    this.canvas.style.width = `${cssW}px`;
    this.canvas.style.height = `${cssH}px`;
    this.canvas.width = Math.round(cssW * this.dpr);
    this.canvas.height = Math.round(cssH * this.dpr);
  }

  private bindInput() {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        this.setThrust(true);
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        this.setThrust(false);
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      e.preventDefault();
      this.canvas.setPointerCapture(e.pointerId);
      this.setThrust(true);
    };
    const onPointerUp = (e: PointerEvent) => {
      e.preventDefault();
      this.setThrust(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    this.canvas.addEventListener("pointerdown", onPointerDown);
    this.canvas.addEventListener("pointerup", onPointerUp);
    this.canvas.addEventListener("pointercancel", onPointerUp);
    const r = this as unknown as Record<string, unknown>;
    r._onKeyDown = onKeyDown;
    r._onKeyUp = onKeyUp;
    r._onPointerDown = onPointerDown;
    r._onPointerUp = onPointerUp;
  }

  private setThrust(on: boolean) {
    if (on && (this.state === "IDLE" || this.state === "GAMEOVER")) {
      this.restart();
    }
    this.thrusting = on && this.state === "RUNNING";
  }

  private restart() {
    this.state = "RUNNING";
    this.score = 0;
    this.coins = 0;
    this.speed = INITIAL_SPEED;
    this.playerY = GROUND_Y - PLAYER_H;
    this.velocityY = 0;
    this.obstacles = [];
    this.pickups = [];
    this.nextSpawnIn = 280;
    this.bgOffset = 0;
    this.mgOffset = 0;
    this.thrusting = true;
  }

  private meters() {
    return Math.floor(this.score / 8);
  }

  private totalScore() {
    return this.meters() + this.coins * 5;
  }

  private update() {
    if (this.state !== "RUNNING") return;

    this.score++;
    this.speed = Math.min(MAX_SPEED, INITIAL_SPEED + this.score * ACCELERATION);
    this.bgOffset = (this.bgOffset + this.speed * 0.15) % VW;
    this.mgOffset = (this.mgOffset + this.speed * 0.4) % VW;

    this.velocityY += this.thrusting ? THRUST : GRAVITY;
    this.velocityY = Math.max(MAX_RISE, Math.min(MAX_FALL, this.velocityY));
    this.playerY += this.velocityY;

    const groundLevel = GROUND_Y - PLAYER_H;
    if (this.playerY >= groundLevel) {
      this.playerY = groundLevel;
      this.velocityY = 0;
    }
    if (this.playerY < CEILING_Y) {
      this.playerY = CEILING_Y;
      this.velocityY = 0;
    }

    this.nextSpawnIn -= this.speed;
    if (this.nextSpawnIn <= 0) {
      this.spawn();
      const gap = Math.max(240, 420 - this.speed * 8) + Math.random() * 80;
      this.nextSpawnIn = gap;
    }

    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      const obs = this.obstacles[i];
      if (!obs) continue;
      obs.x -= this.speed;
      if (obs.x + obs.w < 0) {
        this.obstacles.splice(i, 1);
        continue;
      }
      if (this.hits(obs)) {
        this.gameOver();
        return;
      }
    }

    for (const coin of this.pickups) {
      if (coin.taken) continue;
      coin.x -= this.speed;
      const cx = PLAYER_X + PLAYER_W / 2;
      const cy = this.playerY + PLAYER_H / 2;
      const dx = coin.x - cx;
      const dy = coin.y - cy;
      if (dx * dx + dy * dy < (coin.r + 14) ** 2) {
        coin.taken = true;
        this.coins++;
      }
    }
    this.pickups = this.pickups.filter((c) => !c.taken && c.x + c.r > 0);
  }

  private spawn() {
    const roll = Math.random();
    const startX = VW + 20;
    if (roll < 0.28) {
      const h = 40 + Math.random() * 50;
      this.obstacles.push({ x: startX, y: GROUND_Y - h, w: 28 + Math.random() * 18, h });
    } else if (roll < 0.5) {
      const h = 50 + Math.random() * 60;
      this.obstacles.push({ x: startX, y: CEILING_Y, w: 26 + Math.random() * 16, h });
    } else if (roll < 0.68) {
      const h = 32 + Math.random() * 28;
      const y = 120 + Math.random() * 160;
      this.obstacles.push({ x: startX, y, w: 70 + Math.random() * 30, h });
    } else {
      this.spawnCoins(startX);
    }
  }

  private spawnCoins(startX: number) {
    const kind = Math.floor(Math.random() * 3);
    const baseY = 120 + Math.random() * 180;
    for (let i = 0; i < 7; i++) {
      let y = baseY;
      if (kind === 1) y = baseY + Math.sin(i * 0.9) * 50;
      if (kind === 2) y = baseY - i * 12;
      this.pickups.push({ x: startX + i * 34, y, r: 9, taken: false });
    }
  }

  private hits(obs: Obstacle): boolean {
    const p = HIT_PADDING;
    const px1 = PLAYER_X + p;
    const px2 = PLAYER_X + PLAYER_W - p;
    const py1 = this.playerY + p;
    const py2 = this.playerY + PLAYER_H - p;
    return px1 < obs.x + obs.w && px2 > obs.x && py1 < obs.y + obs.h && py2 > obs.y;
  }

  private gameOver() {
    this.state = "GAMEOVER";
    this.thrusting = false;
    const total = this.totalScore();
    if (total > this.hiScore) {
      this.hiScore = total;
      localStorage.setItem(LS_KEY, String(this.hiScore));
    }
  }

  private draw() {
    const { ctx } = this;
    ctx.fillStyle = COLOR.skyTop;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    const scale = Math.min(this.canvas.width / VW, this.canvas.height / VH);
    const ox = (this.canvas.width - VW * scale) / 2;
    const oy = (this.canvas.height - VH * scale) / 2;
    ctx.save();
    ctx.translate(ox, oy);
    ctx.scale(scale, scale);

    const bg = ctx.createLinearGradient(0, 0, 0, VH);
    bg.addColorStop(0, COLOR.skyTop);
    bg.addColorStop(1, COLOR.skyBottom);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, VW, VH);

    this.drawSun();
    this.drawMountains();
    this.drawHills();

    ctx.fillStyle = COLOR.ground;
    ctx.fillRect(0, GROUND_Y, VW, VH - GROUND_Y);
    ctx.fillStyle = COLOR.groundDark;
    ctx.fillRect(0, GROUND_Y, VW, 6);

    for (const obs of this.obstacles) this.drawObstacle(obs);
    for (const coin of this.pickups) this.drawCoin(coin);
    this.drawPlayer();
    this.drawHUD();
    if (this.state === "IDLE") this.drawIdle();
    if (this.state === "GAMEOVER") this.drawGameOver();

    ctx.restore();
  }

  private drawSun() {
    const { ctx } = this;
    ctx.fillStyle = COLOR.sunGlow;
    ctx.beginPath();
    ctx.arc(560, 70, 42, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = COLOR.sun;
    ctx.beginPath();
    ctx.arc(560, 70, 28, 0, Math.PI * 2);
    ctx.fill();
  }

  private drawMountains() {
    const { ctx } = this;
    ctx.save();
    ctx.globalAlpha = 0.45;
    ctx.fillStyle = COLOR.mountains;
    const peaks = [0, 160, 320, 480, 640, 800];
    for (const baseX of peaks) {
      const x = baseX - (this.bgOffset % 160);
      ctx.beginPath();
      ctx.moveTo(x - 80, GROUND_Y);
      ctx.lineTo(x, GROUND_Y - 110);
      ctx.lineTo(x + 80, GROUND_Y);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }

  private drawHills() {
    const { ctx } = this;
    ctx.save();
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = COLOR.hills;
    const period = 280;
    const offset = this.mgOffset % period;
    ctx.beginPath();
    ctx.moveTo(0, GROUND_Y);
    for (let i = -1; i <= Math.ceil(VW / period) + 1; i++) {
      const cx = i * period - offset + period / 2;
      ctx.quadraticCurveTo(cx - period / 4, GROUND_Y - 55, cx, GROUND_Y);
      ctx.quadraticCurveTo(cx + period / 4, GROUND_Y + 10, cx + period / 2, GROUND_Y);
    }
    ctx.lineTo(VW, GROUND_Y);
    ctx.lineTo(0, GROUND_Y);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  private roundRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
  ) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
  }

  private drawObstacle(obs: Obstacle) {
    const { ctx } = this;
    const hanging = obs.y <= CEILING_Y + 2;
    const tall = obs.h > 90;
    ctx.save();
    const top = hanging || tall ? COLOR.obstacleTall : COLOR.obstacle;
    const bot = hanging || tall ? COLOR.obstacleTallDark : COLOR.obstacleDark;
    const grad = ctx.createLinearGradient(obs.x, obs.y, obs.x, obs.y + obs.h);
    grad.addColorStop(0, top);
    grad.addColorStop(1, bot);
    ctx.fillStyle = grad;
    this.roundRect(ctx, obs.x, obs.y, obs.w, obs.h, 6);
    ctx.fill();
    ctx.restore();
  }

  private drawCoin(coin: Coin) {
    if (coin.taken) return;
    const { ctx } = this;
    ctx.fillStyle = COLOR.coin;
    ctx.beginPath();
    ctx.arc(coin.x, coin.y, coin.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = COLOR.coinInner;
    ctx.beginPath();
    ctx.arc(coin.x - 1, coin.y - 1, coin.r * 0.45, 0, Math.PI * 2);
    ctx.fill();
  }

  private drawPlayer() {
    const { ctx } = this;
    const x = PLAYER_X;
    const y = this.playerY;
    ctx.save();
    if (this.thrusting && this.state === "RUNNING") {
      ctx.fillStyle = COLOR.sun;
      ctx.beginPath();
      ctx.moveTo(x + 6, y + PLAYER_H);
      ctx.lineTo(x + PLAYER_W / 2, y + PLAYER_H + 16 + Math.random() * 6);
      ctx.lineTo(x + PLAYER_W - 6, y + PLAYER_H);
      ctx.closePath();
      ctx.fill();
    }
    ctx.fillStyle = this.state === "GAMEOVER" ? COLOR.playerGameOver : COLOR.player;
    this.roundRect(ctx, x, y, PLAYER_W, PLAYER_H, 8);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.beginPath();
    ctx.arc(x + PLAYER_W - 9, y + 12, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = COLOR.text;
    ctx.beginPath();
    ctx.arc(x + PLAYER_W - 8, y + 12, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = COLOR.playerDark;
    this.roundRect(ctx, x + 4, y + PLAYER_H - 4, 8, 6, 2);
    ctx.fill();
    this.roundRect(ctx, x + PLAYER_W - 12, y + PLAYER_H - 4, 8, 6, 2);
    ctx.fill();
    ctx.restore();
  }

  private drawHUD() {
    if (this.state === "IDLE") return;
    const { ctx } = this;
    ctx.font = "bold 16px system-ui, sans-serif";
    ctx.fillStyle = COLOR.text;
    ctx.textAlign = "right";
    ctx.fillText(`${this.totalScore()} pts`, VW - 16, 28);
    ctx.font = "12px system-ui, sans-serif";
    ctx.fillStyle = COLOR.groundDark;
    ctx.fillText(`${this.coins} pièces`, VW - 16, 46);
    if (this.hiScore > 0) {
      ctx.fillText(`Meilleur : ${this.hiScore}`, VW - 16, 62);
    }
    ctx.textAlign = "left";
  }

  private drawIdle() {
    const { ctx } = this;
    ctx.fillStyle = COLOR.overlay;
    ctx.fillRect(0, 0, VW, VH);
    ctx.textAlign = "center";
    ctx.font = "bold 32px system-ui, sans-serif";
    ctx.fillStyle = COLOR.title;
    ctx.fillText("Vol", VW / 2, VH / 2 - 16);
    ctx.font = "16px system-ui, sans-serif";
    ctx.fillStyle = COLOR.text;
    ctx.fillText("Appuie pour voler", VW / 2, VH / 2 + 16);
    ctx.textAlign = "left";
  }

  private drawGameOver() {
    const { ctx } = this;
    ctx.fillStyle = COLOR.overlay;
    ctx.fillRect(0, 0, VW, VH);
    ctx.textAlign = "center";
    ctx.font = "bold 28px system-ui, sans-serif";
    ctx.fillStyle = COLOR.gameOver;
    ctx.fillText("Perdu !", VW / 2, VH / 2 - 28);
    ctx.font = "16px system-ui, sans-serif";
    ctx.fillStyle = COLOR.text;
    ctx.fillText(`Score : ${this.totalScore()} pts`, VW / 2, VH / 2 + 4);
    ctx.font = "13px system-ui, sans-serif";
    ctx.fillStyle = COLOR.groundDark;
    ctx.fillText(`Meilleur : ${this.hiScore}`, VW / 2, VH / 2 + 24);
    ctx.fillStyle = COLOR.text;
    ctx.fillText("Appuie pour rejouer", VW / 2, VH / 2 + 48);
    ctx.textAlign = "left";
  }

  private loop = () => {
    this.update();
    this.draw();
    this.rafId = requestAnimationFrame(this.loop);
  };

  destroy() {
    cancelAnimationFrame(this.rafId);
    const r = this as unknown as Record<string, unknown>;
    if (r._onKeyDown) window.removeEventListener("keydown", r._onKeyDown as EventListener);
    if (r._onKeyUp) window.removeEventListener("keyup", r._onKeyUp as EventListener);
    if (r._onPointerDown) {
      this.canvas.removeEventListener("pointerdown", r._onPointerDown as EventListener);
    }
    if (r._onPointerUp) {
      this.canvas.removeEventListener("pointerup", r._onPointerUp as EventListener);
      this.canvas.removeEventListener("pointercancel", r._onPointerUp as EventListener);
    }
  }
}

const SHELL =
  "w-screen max-w-none relative left-1/2 -translate-x-1/2 flex flex-col px-4 py-4 gap-3 min-h-dvh";

export function RunnerGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const game = new VolEngine(canvas);

    const onResize = () => game.resize();
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    window.visualViewport?.addEventListener("resize", onResize);

    return () => {
      game.destroy();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      window.visualViewport?.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <main className={SHELL}>
      <div className="flex items-center gap-4 w-full">
        <BackLink href="/mini-jeux" />
        <PageTitle>Vol</PageTitle>
      </div>
      <div className="w-full min-h-[55dvh] h-[calc(100dvh-7rem)] rounded-[var(--radius-card)] border border-line shadow-card overflow-hidden bg-surface landscape:min-h-[75dvh]">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ display: "block", touchAction: "none", cursor: "pointer" }}
        />
      </div>
    </main>
  );
}
