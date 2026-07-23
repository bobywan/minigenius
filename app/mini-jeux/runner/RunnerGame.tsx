"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { neonBtnCls } from "@/components/ui/NeonButton";

// ─── Constants ────────────────────────────────────────────────────────────────
const VW = 800;
const VH = 320;
const GROUND_Y = 280;
const PLAYER_W = 30;
const PLAYER_H = 40;
const PLAYER_X = 80;
const GRAVITY = 0.8;
const JUMP_FORCE = -15;
const INITIAL_SPEED = 4;
const ACCELERATION = 0.001;
const HIT_PADDING = 6;
const LS_KEY = "runner_hiscore";

type GameState = "IDLE" | "RUNNING" | "GAMEOVER";

interface Obstacle {
  x: number;
  w: number;
  h: number;
}

interface Star {
  x: number;
  y: number;
  r: number;
}

// ─── Game Class ───────────────────────────────────────────────────────────────
class RunnerEngine {
  private canvas: HTMLCanvasElement;
  // biome-ignore lint/correctness/noUnusedPrivateClassMembers: accessed via destructuring
  private ctx: CanvasRenderingContext2D;
  private dpr: number;
  private rafId = 0;

  // State
  private state: GameState = "IDLE";
  private score = 0;
  private hiScore = 0;
  private speed = INITIAL_SPEED;

  // Player
  private playerY = GROUND_Y - PLAYER_H;
  private velocityY = 0;
  private onGround = true;

  // Obstacles
  private obstacles: Obstacle[] = [];
  private nextObstacleIn = 400;

  // Parallax
  private bgOffset = 0;
  private mgOffset = 0;
  private stars: Star[] = [];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D context unavailable");
    this.ctx = ctx;
    this.dpr = window.devicePixelRatio || 1;
    this.hiScore = Number(localStorage.getItem(LS_KEY) ?? 0);
    this.resize();
    this.stars = Array.from({ length: 40 }, () => ({
      x: Math.random() * VW,
      y: Math.random() * (GROUND_Y - 80),
      r: Math.random() * 1.5 + 0.5,
    }));
    this.bindInput();
    this.loop();
  }

  // ── Responsive / HiDPI ──────────────────────────────────────────────────────
  resize() {
    const cssW = this.canvas.parentElement?.clientWidth ?? VW;
    this.canvas.style.width = `${cssW}px`;
    const cssH = Math.round(cssW * (VH / VW));
    this.canvas.style.height = `${cssH}px`;
    this.canvas.width = Math.round(cssW * this.dpr);
    this.canvas.height = Math.round(cssH * this.dpr);
  }

  // ── Input ───────────────────────────────────────────────────────────────────
  private bindInput() {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        this.handleJump();
      }
    };
    const onTouch = (e: TouchEvent) => {
      e.preventDefault();
      this.handleJump();
    };
    window.addEventListener("keydown", onKey);
    this.canvas.addEventListener("touchstart", onTouch, { passive: false });
    (this as unknown as Record<string, unknown>)._onKey = onKey;
    (this as unknown as Record<string, unknown>)._onTouch = onTouch;
  }

  private handleJump() {
    if (this.state === "IDLE" || this.state === "GAMEOVER") {
      this.restart();
      return;
    }
    if (this.onGround) {
      this.velocityY = JUMP_FORCE;
      this.onGround = false;
    }
  }

  // ── State ───────────────────────────────────────────────────────────────────
  private restart() {
    this.state = "RUNNING";
    this.score = 0;
    this.speed = INITIAL_SPEED;
    this.playerY = GROUND_Y - PLAYER_H;
    this.velocityY = 0;
    this.onGround = true;
    this.obstacles = [];
    this.nextObstacleIn = 500;
    this.bgOffset = 0;
    this.mgOffset = 0;
  }

  // ── Physics / Update ────────────────────────────────────────────────────────
  private update() {
    if (this.state !== "RUNNING") return;

    this.score++;
    this.speed = INITIAL_SPEED + this.score * ACCELERATION;

    // Parallax offsets
    this.bgOffset = (this.bgOffset + this.speed * 0.15) % VW;
    this.mgOffset = (this.mgOffset + this.speed * 0.4) % VW;

    // Gravity
    this.velocityY += GRAVITY;
    this.playerY += this.velocityY;

    // Ground clamp
    const groundLevel = GROUND_Y - PLAYER_H;
    if (this.playerY >= groundLevel) {
      this.playerY = groundLevel;
      this.velocityY = 0;
      this.onGround = true;
    }

    // Spawn obstacles
    this.nextObstacleIn -= this.speed;
    if (this.nextObstacleIn <= 0) {
      const h = 30 + Math.random() * 25;
      const w = 20 + Math.random() * 10;
      this.obstacles.push({ x: VW + 10, w, h });
      this.nextObstacleIn = 350 + Math.random() * 400;
    }

    // Move obstacles + collision
    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      const obs = this.obstacles[i];
      if (!obs) continue;
      obs.x -= this.speed;
      if (obs.x + obs.w < 0) {
        this.obstacles.splice(i, 1);
        continue;
      }
      if (this.checkCollision(obs)) {
        this.gameOver();
        return;
      }
    }
  }

  // AABB with tolerance padding
  private checkCollision(obs: Obstacle): boolean {
    const p = HIT_PADDING;
    const px1 = PLAYER_X + p;
    const px2 = PLAYER_X + PLAYER_W - p;
    const py1 = this.playerY + p;
    const py2 = this.playerY + PLAYER_H - p;
    const ox1 = obs.x + p;
    const ox2 = obs.x + obs.w - p;
    const oy1 = GROUND_Y - obs.h + p;
    const oy2 = GROUND_Y;
    return px1 < ox2 && px2 > ox1 && py1 < oy2 && py2 > oy1;
  }

  private gameOver() {
    this.state = "GAMEOVER";
    const meters = Math.floor(this.score / 10);
    if (meters > this.hiScore) {
      this.hiScore = meters;
      localStorage.setItem(LS_KEY, String(this.hiScore));
    }
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  private draw() {
    const { ctx } = this;
    const scale = this.canvas.width / VW;
    ctx.save();
    ctx.scale(scale, scale);

    // 1. Background gradient
    const bg = ctx.createLinearGradient(0, 0, 0, VH);
    bg.addColorStop(0, "#070314");
    bg.addColorStop(0.6, "#0f0826");
    bg.addColorStop(1, "#1a0f3c");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, VW, VH);

    // 2. Stars (quasi-static)
    this.drawStars();

    // 3. Mountains (slow parallax)
    this.drawMountains();

    // 4. Hills (medium parallax)
    this.drawHills();

    // 5. Ground line + fill
    ctx.strokeStyle = "rgba(224, 64, 251, 0.4)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, GROUND_Y);
    ctx.lineTo(VW, GROUND_Y);
    ctx.stroke();

    const groundGrad = ctx.createLinearGradient(0, GROUND_Y, 0, VH);
    groundGrad.addColorStop(0, "rgba(224, 64, 251, 0.08)");
    groundGrad.addColorStop(1, "rgba(224, 64, 251, 0)");
    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, GROUND_Y, VW, VH - GROUND_Y);

    // 6. Obstacles
    for (const obs of this.obstacles) {
      this.drawObstacle(obs);
    }

    // 7. Player
    this.drawPlayer();

    // 8. HUD + Overlays
    this.drawHUD();
    if (this.state === "IDLE") this.drawIdle();
    if (this.state === "GAMEOVER") this.drawGameOver();

    ctx.restore();
  }

  // ── Parallax layers ─────────────────────────────────────────────────────────
  private drawStars() {
    const { ctx } = this;
    ctx.save();
    ctx.fillStyle = "rgba(255,255,255,0.65)";
    for (const s of this.stars) {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  private drawMountains() {
    const { ctx } = this;
    ctx.save();
    ctx.globalAlpha = 0.25;
    ctx.fillStyle = "#3d1a6e";
    // Tile two widths to cover wrap-around
    const peaks = [0, 160, 320, 480, 640, 800, 960];
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
    ctx.globalAlpha = 0.18;
    ctx.fillStyle = "#5c2d91";
    const period = 280;
    const offset = this.mgOffset % period;
    ctx.beginPath();
    ctx.moveTo(0, GROUND_Y);
    // Draw enough arcs to cover the full width + one extra for smooth tiling
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

  // ── Player ──────────────────────────────────────────────────────────────────
  private drawPlayer() {
    const { ctx } = this;
    const x = PLAYER_X;
    const y = this.playerY;
    const r = 6;

    ctx.save();
    ctx.shadowColor = "#e040fb";
    ctx.shadowBlur = this.onGround ? 10 : 18;

    ctx.fillStyle = this.state === "GAMEOVER" ? "#ff5370" : "#e040fb";
    this.roundRect(ctx, x, y, PLAYER_W, PLAYER_H, r);
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.beginPath();
    ctx.arc(x + PLAYER_W - 9, y + 10, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#0f0826";
    ctx.beginPath();
    ctx.arc(x + PLAYER_W - 8, y + 10, 2, 0, Math.PI * 2);
    ctx.fill();

    const legSwing = this.onGround ? Math.sin(this.score * 0.3) * 6 : 0;
    ctx.fillStyle = "#c000d0";
    this.roundRect(ctx, x + 4, y + PLAYER_H - 2, 8, 6, 2);
    ctx.fill();
    ctx.save();
    ctx.translate(x + 4 + 4, y + PLAYER_H - 2);
    ctx.rotate((legSwing * Math.PI) / 180);
    ctx.fillStyle = "#c000d0";
    this.roundRect(ctx, -4, 0, 8, 6, 2);
    ctx.fill();
    ctx.restore();

    this.roundRect(ctx, x + PLAYER_W - 12, y + PLAYER_H - 2, 8, 6, 2);
    ctx.fill();
    ctx.save();
    ctx.translate(x + PLAYER_W - 12 + 4, y + PLAYER_H - 2);
    ctx.rotate((-legSwing * Math.PI) / 180);
    ctx.fillStyle = "#c000d0";
    this.roundRect(ctx, -4, 0, 8, 6, 2);
    ctx.fill();
    ctx.restore();

    ctx.restore();
  }

  private drawObstacle(obs: Obstacle) {
    const { ctx } = this;
    const x = obs.x;
    const y = GROUND_Y - obs.h;

    ctx.save();
    ctx.shadowColor = obs.h > 45 ? "#ff5370" : "#7c4dff";
    ctx.shadowBlur = 8;

    const grad = ctx.createLinearGradient(x, y, x + obs.w, y + obs.h);
    grad.addColorStop(0, obs.h > 45 ? "#ff5370" : "#7c4dff");
    grad.addColorStop(1, obs.h > 45 ? "#b71c1c" : "#4527a0");
    ctx.fillStyle = grad;
    this.roundRect(ctx, x, y, obs.w, obs.h, 4);
    ctx.fill();

    ctx.fillStyle = "rgba(255,255,255,0.15)";
    this.roundRect(ctx, x + 2, y + 2, obs.w - 4, 6, 2);
    ctx.fill();

    ctx.restore();
  }

  private drawHUD() {
    if (this.state === "IDLE") return;
    const { ctx } = this;
    const meters = Math.floor(this.score / 10);
    ctx.font = "bold 14px system-ui, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.textAlign = "right";
    ctx.fillText(`${meters} m`, VW - 16, 24);
    if (this.hiScore > 0) {
      ctx.font = "11px system-ui, sans-serif";
      ctx.fillStyle = "rgba(224, 64, 251, 0.8)";
      ctx.fillText(`Best: ${this.hiScore} m`, VW - 16, 40);
    }
    ctx.textAlign = "left";
  }

  private drawIdle() {
    const { ctx } = this;
    ctx.save();
    ctx.fillStyle = "rgba(15, 8, 38, 0.7)";
    ctx.fillRect(0, 0, VW, VH);

    ctx.font = "bold 28px system-ui, sans-serif";
    ctx.fillStyle = "#e040fb";
    ctx.textAlign = "center";
    ctx.shadowColor = "#e040fb";
    ctx.shadowBlur = 12;
    ctx.fillText("ENDLESS RUNNER", VW / 2, VH / 2 - 20);

    ctx.shadowBlur = 0;
    ctx.font = "14px system-ui, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.75)";
    ctx.fillText("Espace / Flèche Haut / Toucher pour démarrer", VW / 2, VH / 2 + 12);

    ctx.textAlign = "left";
    ctx.restore();
  }

  private drawGameOver() {
    const { ctx } = this;
    const meters = Math.floor(this.score / 10);
    ctx.save();

    ctx.fillStyle = "rgba(15, 8, 38, 0.78)";
    ctx.fillRect(0, 0, VW, VH);

    ctx.font = "bold 26px system-ui, sans-serif";
    ctx.fillStyle = "#ff5370";
    ctx.textAlign = "center";
    ctx.shadowColor = "#ff5370";
    ctx.shadowBlur = 14;
    ctx.fillText("GAME OVER", VW / 2, VH / 2 - 28);

    ctx.shadowBlur = 0;
    ctx.font = "14px system-ui, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.fillText(`Score : ${meters} m`, VW / 2, VH / 2 + 2);

    ctx.font = "12px system-ui, sans-serif";
    ctx.fillStyle = "#e040fb";
    ctx.fillText(`Meilleur : ${this.hiScore} m`, VW / 2, VH / 2 + 20);

    ctx.font = "13px system-ui, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.fillText("Espace / Toucher pour rejouer", VW / 2, VH / 2 + 44);

    ctx.textAlign = "left";
    ctx.restore();
  }

  // ── Helpers ─────────────────────────────────────────────────────────────────
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

  // ── Loop ────────────────────────────────────────────────────────────────────
  private loop = () => {
    this.update();
    this.draw();
    this.rafId = requestAnimationFrame(this.loop);
  };

  destroy() {
    cancelAnimationFrame(this.rafId);
    const r = this as unknown as Record<string, unknown>;
    if (r._onKey) window.removeEventListener("keydown", r._onKey as EventListener);
    if (r._onTouch) this.canvas.removeEventListener("touchstart", r._onTouch as EventListener);
  }
}

// ─── React Component ──────────────────────────────────────────────────────────
export function RunnerGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const game = new RunnerEngine(canvas);

    const onResize = () => game.resize();
    window.addEventListener("resize", onResize);

    return () => {
      game.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="w-full max-w-3xl flex flex-col items-center gap-6">
      <header className="w-full flex flex-col items-center gap-4">
        <Link href="/mini-jeux" className={neonBtnCls("ghost", "sm")}>
          ← Mini-jeux
        </Link>
        <h1 className="text-4xl font-display text-white">
          <span className="text-[#e040fb]">Endless Runner</span>
        </h1>
      </header>

      <div className="w-full rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(224,64,251,0.3)]">
        <canvas
          ref={canvasRef}
          style={{ display: "block", touchAction: "none", cursor: "pointer" }}
        />
      </div>

      <p className="text-xs text-white/40 font-body text-center">
        Espace / Flèche Haut / Toucher pour sauter
      </p>
    </div>
  );
}
