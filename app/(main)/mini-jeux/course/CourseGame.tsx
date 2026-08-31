"use client";

import { useEffect, useRef } from "react";
import { BackLink } from "@/components/ui/BackLink";
import { PageTitle } from "@/components/ui/PageTitle";

const VW = 480;
const VH = 640;
const LANES = 3;
const LANE_PAD = 28;
const LANE_W = (VW - LANE_PAD * 2) / LANES;
const PLAYER_W = 42;
const PLAYER_H = 48;
const PLAYER_Y = 520;
const JUMP_FRAMES = 28;
const LANE_LERP = 0.2;
const INITIAL_SPEED = 4.2;
const ACCELERATION = 0.0016;
const MAX_SPEED = 11;
const DOUBLE_LANE_AFTER = 900;
const LS_KEY = "course_hiscore";

const COLOR = {
  skyTop: "#e0f2fe",
  skyBottom: "#7dd3fc",
  laneA: "#ecfdf5",
  laneB: "#d1fae5",
  ground: "#10b981",
  groundDark: "#059669",
  player: "#10b981",
  playerDark: "#059669",
  playerGameOver: "#ef4444",
  hurdle: "#f59e0b",
  hurdleDark: "#d97706",
  wall: "#0369a1",
  wallDark: "#075985",
  coin: "#f59e0b",
  coinInner: "#fde68a",
  text: "#075985",
  overlay: "rgba(255, 255, 255, 0.82)",
  title: "#10b981",
  gameOver: "#ef4444",
} as const;

type GameState = "IDLE" | "RUNNING" | "GAMEOVER";
type ObstacleKind = "hurdle" | "wall";
type Obstacle = { lane: number; y: number; h: number; kind: ObstacleKind };
type Coin = { lane: number; y: number; r: number; taken: boolean };

function laneCenter(lane: number): number {
  return LANE_PAD + lane * LANE_W + LANE_W / 2;
}

class CourseEngine {
  private canvas: HTMLCanvasElement;
  // biome-ignore lint/correctness/noUnusedPrivateClassMembers: accessed via destructuring
  private ctx: CanvasRenderingContext2D;
  private dpr: number;
  private rafId = 0;

  private state: GameState = "IDLE";
  private score = 0;
  private coins = 0;
  private hiScore = 0;
  private speed = INITIAL_SPEED;

  private lane = 1;
  private displayX = laneCenter(1);
  private jumpLeft = 0;

  private obstacles: Obstacle[] = [];
  private pickups: Coin[] = [];
  private nextSpawnIn = 220;

  private pointerX = 0;
  private pointerY = 0;

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
      if (e.code === "ArrowLeft") {
        e.preventDefault();
        this.move(-1);
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        this.move(1);
      } else if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        this.jump();
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      e.preventDefault();
      this.canvas.setPointerCapture(e.pointerId);
      const p = this.toWorld(e);
      this.pointerX = p.x;
      this.pointerY = p.y;
      if (this.state === "IDLE" || this.state === "GAMEOVER") this.restart();
    };
    const onPointerUp = (e: PointerEvent) => {
      e.preventDefault();
      if (this.state !== "RUNNING") return;
      const p = this.toWorld(e);
      const dx = p.x - this.pointerX;
      const dy = p.y - this.pointerY;
      if (Math.abs(dy) > Math.abs(dx) && dy < -28) {
        this.jump();
        return;
      }
      if (dx > 28) {
        this.move(1);
        return;
      }
      if (dx < -28) {
        this.move(-1);
        return;
      }
      if (p.x < VW / 3) this.move(-1);
      else if (p.x > (VW * 2) / 3) this.move(1);
      else this.jump();
    };
    window.addEventListener("keydown", onKeyDown);
    this.canvas.addEventListener("pointerdown", onPointerDown);
    this.canvas.addEventListener("pointerup", onPointerUp);
    const r = this as unknown as Record<string, unknown>;
    r._onKeyDown = onKeyDown;
    r._onPointerDown = onPointerDown;
    r._onPointerUp = onPointerUp;
  }

  private move(dir: number) {
    if (this.state !== "RUNNING") {
      if (this.state === "IDLE" || this.state === "GAMEOVER") this.restart();
      return;
    }
    this.lane = Math.max(0, Math.min(LANES - 1, this.lane + dir));
  }

  private jump() {
    if (this.state !== "RUNNING") {
      if (this.state === "IDLE" || this.state === "GAMEOVER") this.restart();
      return;
    }
    if (this.jumpLeft === 0) this.jumpLeft = JUMP_FRAMES;
  }

  private restart() {
    this.state = "RUNNING";
    this.score = 0;
    this.coins = 0;
    this.speed = INITIAL_SPEED;
    this.lane = 1;
    this.displayX = laneCenter(1);
    this.jumpLeft = 0;
    this.obstacles = [];
    this.pickups = [];
    this.nextSpawnIn = 220;
  }

  private toWorld(e: PointerEvent): { x: number; y: number } {
    const rect = this.canvas.getBoundingClientRect();
    const cssX = e.clientX - rect.left;
    const cssY = e.clientY - rect.top;
    const scale = Math.min(rect.width / VW, rect.height / VH);
    const ox = (rect.width - VW * scale) / 2;
    const oy = (rect.height - VH * scale) / 2;
    return { x: (cssX - ox) / scale, y: (cssY - oy) / scale };
  }

  private totalScore() {
    return Math.floor(this.score / 6) + this.coins * 5;
  }

  private update() {
    if (this.state !== "RUNNING") return;

    this.score++;
    this.speed = Math.min(MAX_SPEED, INITIAL_SPEED + this.score * ACCELERATION);
    if (this.jumpLeft > 0) this.jumpLeft--;
    this.displayX += (laneCenter(this.lane) - this.displayX) * LANE_LERP;

    this.nextSpawnIn -= this.speed;
    if (this.nextSpawnIn <= 0) {
      this.spawn();
      this.nextSpawnIn = Math.max(220, 400 - this.speed * 8) + Math.random() * 80;
    }

    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      const obs = this.obstacles[i];
      if (!obs) continue;
      obs.y += this.speed;
      if (obs.y > VH + 20) {
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
      coin.y += this.speed;
      if (coin.lane === this.lane && Math.abs(coin.y - PLAYER_Y) < 28) {
        coin.taken = true;
        this.coins++;
      }
    }
    this.pickups = this.pickups.filter((c) => !c.taken && c.y < VH + 20);
  }

  private spawn() {
    const roll = Math.random();
    if (roll < 0.35) {
      this.pickups.push({
        lane: Math.floor(Math.random() * LANES),
        y: -30,
        r: 10,
        taken: false,
      });
      return;
    }

    const canDouble = this.score > DOUBLE_LANE_AFTER && Math.random() < 0.12;
    const blocked = canDouble ? 2 : 1;
    const laneA = Math.floor(Math.random() * LANES);
    let laneB = Math.floor(Math.random() * LANES);
    while (laneB === laneA) laneB = Math.floor(Math.random() * LANES);
    const chosen = blocked === 2 ? [laneA, laneB] : [laneA];
    for (const lane of chosen) {
      const kind: ObstacleKind = Math.random() < 0.55 ? "hurdle" : "wall";
      this.obstacles.push({
        lane,
        y: -70,
        h: kind === "hurdle" ? 36 : 64,
        kind,
      });
    }
  }

  private hits(obs: Obstacle): boolean {
    if (obs.lane !== this.lane) return false;
    if (obs.kind === "hurdle" && this.jumpLeft > 0) return false;
    const py1 = PLAYER_Y;
    const py2 = PLAYER_Y + PLAYER_H * (this.jumpLeft > 0 ? 0.55 : 1);
    return py1 < obs.y + obs.h && py2 > obs.y;
  }

  private gameOver() {
    this.state = "GAMEOVER";
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

    for (let i = 0; i < LANES; i++) {
      ctx.fillStyle = i === 1 ? COLOR.laneB : COLOR.laneA;
      ctx.fillRect(LANE_PAD + i * LANE_W, 0, LANE_W, VH);
    }
    ctx.strokeStyle = COLOR.ground;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(LANE_PAD, 0);
    ctx.lineTo(LANE_PAD, VH);
    ctx.moveTo(VW - LANE_PAD, 0);
    ctx.lineTo(VW - LANE_PAD, VH);
    ctx.stroke();
    ctx.lineWidth = 2;
    ctx.strokeStyle = COLOR.groundDark;
    ctx.setLineDash([12, 16]);
    ctx.beginPath();
    ctx.moveTo(LANE_PAD + LANE_W, 0);
    ctx.lineTo(LANE_PAD + LANE_W, VH);
    ctx.moveTo(LANE_PAD + LANE_W * 2, 0);
    ctx.lineTo(LANE_PAD + LANE_W * 2, VH);
    ctx.stroke();
    ctx.setLineDash([]);

    for (const obs of this.obstacles) this.drawObstacle(obs);
    for (const coin of this.pickups) this.drawCoin(coin);
    this.drawPlayer();
    this.drawHUD();
    if (this.state === "IDLE") this.drawIdle();
    if (this.state === "GAMEOVER") this.drawGameOver();

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
    const cx = laneCenter(obs.lane);
    const w = LANE_W - 24;
    const x = cx - w / 2;
    const top = obs.kind === "wall" ? COLOR.wall : COLOR.hurdle;
    const bot = obs.kind === "wall" ? COLOR.wallDark : COLOR.hurdleDark;
    const grad = ctx.createLinearGradient(x, obs.y, x, obs.y + obs.h);
    grad.addColorStop(0, top);
    grad.addColorStop(1, bot);
    ctx.fillStyle = grad;
    this.roundRect(ctx, x, obs.y, w, obs.h, 8);
    ctx.fill();
  }

  private drawCoin(coin: Coin) {
    if (coin.taken) return;
    const { ctx } = this;
    const x = laneCenter(coin.lane);
    ctx.fillStyle = COLOR.coin;
    ctx.beginPath();
    ctx.arc(x, coin.y, coin.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = COLOR.coinInner;
    ctx.beginPath();
    ctx.arc(x - 1, coin.y - 1, coin.r * 0.45, 0, Math.PI * 2);
    ctx.fill();
  }

  private drawPlayer() {
    const { ctx } = this;
    const lift = this.jumpLeft > 0 ? 18 : 0;
    const y = PLAYER_Y - lift;
    const targetX = laneCenter(this.lane);
    const tilt = Math.max(-0.25, Math.min(0.25, Math.atan((targetX - this.displayX) / 60)));

    ctx.save();
    ctx.translate(this.displayX, y + PLAYER_H / 2);
    ctx.rotate(tilt);
    ctx.translate(-PLAYER_W / 2, -PLAYER_H / 2);

    ctx.fillStyle = this.state === "GAMEOVER" ? COLOR.playerGameOver : COLOR.player;
    this.roundRect(ctx, 0, 0, PLAYER_W, PLAYER_H, 10);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.beginPath();
    ctx.arc(PLAYER_W / 2 + 6, 16, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = COLOR.text;
    ctx.beginPath();
    ctx.arc(PLAYER_W / 2 + 7, 16, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = COLOR.playerDark;
    this.roundRect(ctx, 6, PLAYER_H - 8, 10, 8, 3);
    ctx.fill();
    this.roundRect(ctx, PLAYER_W - 16, PLAYER_H - 8, 10, 8, 3);
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
    if (this.hiScore > 0) ctx.fillText(`Meilleur : ${this.hiScore}`, VW - 16, 62);
    ctx.textAlign = "left";
  }

  private drawIdle() {
    const { ctx } = this;
    ctx.fillStyle = COLOR.overlay;
    ctx.fillRect(0, 0, VW, VH);
    ctx.textAlign = "center";
    ctx.font = "bold 32px system-ui, sans-serif";
    ctx.fillStyle = COLOR.title;
    ctx.fillText("Course", VW / 2, VH / 2 - 20);
    ctx.font = "16px system-ui, sans-serif";
    ctx.fillStyle = COLOR.text;
    ctx.fillText("Glisse pour changer de couloir", VW / 2, VH / 2 + 12);
    ctx.font = "13px system-ui, sans-serif";
    ctx.fillText("Swipe haut ou Espace pour sauter", VW / 2, VH / 2 + 36);
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
    if (r._onPointerDown) {
      this.canvas.removeEventListener("pointerdown", r._onPointerDown as EventListener);
    }
    if (r._onPointerUp) {
      this.canvas.removeEventListener("pointerup", r._onPointerUp as EventListener);
    }
  }
}

const SHELL =
  "w-screen max-w-none relative left-1/2 -translate-x-1/2 flex flex-col px-4 py-4 gap-3 min-h-dvh";

export function CourseGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const game = new CourseEngine(canvas);

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
        <PageTitle>Course</PageTitle>
      </div>
      <div className="w-full min-h-[55dvh] h-[calc(100dvh-7rem)] rounded-xl overflow-hidden bg-white landscape:min-h-[75dvh]">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ display: "block", touchAction: "none", cursor: "pointer" }}
        />
      </div>
    </main>
  );
}
