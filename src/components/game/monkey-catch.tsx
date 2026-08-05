"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RotateCcw, Trophy } from "lucide-react";

const GAME_SECONDS = 45;
const GOOD_ITEMS = ["❄️", "🍌", "🌀", "🥥"];
const BAD_ITEMS = ["🔥", "☀️"];
const PLAYER_WIDTH_PCT = 14;
const CATCH_LINE_PCT = 88;

type FallingItem = {
  id: number;
  x: number;
  y: number;
  emoji: string;
  good: boolean;
  speed: number;
};

type Phase = "idle" | "playing" | "over";

function loadHighscore() {
  if (typeof window === "undefined") return 0;
  return Number(window.localStorage.getItem("km-monkey-catch-highscore") || 0);
}

export function MonkeyCatch() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_SECONDS);
  const [highscore, setHighscore] = useState(0);
  const [playerX, setPlayerX] = useState(50);
  const [items, setItems] = useState<FallingItem[]>([]);

  const areaRef = useRef<HTMLDivElement>(null);
  const playerXRef = useRef(50);
  const itemsRef = useRef<FallingItem[]>([]);
  const scoreRef = useRef(0);
  const nextIdRef = useRef(0);
  const lastSpawnRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const startedAtRef = useRef(0);

  useEffect(() => {
    setHighscore(loadHighscore());
  }, []);

  const movePlayer = useCallback((clientX: number) => {
    const area = areaRef.current;
    if (!area) return;
    const rect = area.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.min(100 - PLAYER_WIDTH_PCT / 2, Math.max(PLAYER_WIDTH_PCT / 2, pct));
    playerXRef.current = clamped;
    setPlayerX(clamped);
  }, []);

  const stopLoop = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  }, []);

  const endGame = useCallback(() => {
    stopLoop();
    setPhase("over");
    const finalScore = scoreRef.current;
    const currentHigh = loadHighscore();
    if (finalScore > currentHigh) {
      window.localStorage.setItem("km-monkey-catch-highscore", String(finalScore));
      setHighscore(finalScore);
    }
  }, [stopLoop]);

  const startGame = useCallback(() => {
    setScore(0);
    scoreRef.current = 0;
    setTimeLeft(GAME_SECONDS);
    setItems([]);
    itemsRef.current = [];
    nextIdRef.current = 0;
    lastSpawnRef.current = 0;
    playerXRef.current = 50;
    setPlayerX(50);
    startedAtRef.current = performance.now();
    setPhase("playing");
  }, []);

  useEffect(() => {
    if (phase !== "playing") return;

    let lastFrame = performance.now();

    function tick(now: number) {
      const dt = Math.min(50, now - lastFrame);
      lastFrame = now;
      const elapsedMs = now - startedAtRef.current;
      const elapsedS = elapsedMs / 1000;

      const remaining = Math.max(0, GAME_SECONDS - elapsedS);
      setTimeLeft(Math.ceil(remaining));
      if (remaining <= 0) {
        endGame();
        return;
      }

      const difficulty = 1 + elapsedS / 30;
      const spawnInterval = Math.max(420, 900 - elapsedS * 10);
      if (now - lastSpawnRef.current > spawnInterval) {
        lastSpawnRef.current = now;
        const good = Math.random() > 0.32;
        const pool = good ? GOOD_ITEMS : BAD_ITEMS;
        itemsRef.current = [
          ...itemsRef.current,
          {
            id: nextIdRef.current++,
            x: 6 + Math.random() * 88,
            y: -5,
            emoji: pool[Math.floor(Math.random() * pool.length)],
            good,
            speed: (0.018 + Math.random() * 0.012) * difficulty,
          },
        ];
      }

      const survivors: FallingItem[] = [];
      let delta = 0;
      for (const item of itemsRef.current) {
        const nextY = item.y + item.speed * dt;
        const reachedLine = nextY >= CATCH_LINE_PCT;
        if (reachedLine) {
          const dx = Math.abs(item.x - playerXRef.current);
          const caught = dx < PLAYER_WIDTH_PCT / 2 + 4;
          if (caught) {
            delta += item.good ? 10 : -5;
          }
          continue;
        }
        survivors.push({ ...item, y: nextY });
      }
      itemsRef.current = survivors;
      setItems(survivors);
      if (delta !== 0) {
        scoreRef.current = Math.max(0, scoreRef.current + delta);
        setScore(scoreRef.current);
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return stopLoop;
  }, [phase, endGame, stopLoop]);

  useEffect(() => {
    if (phase !== "playing") return;
    function onMove(e: PointerEvent) {
      movePlayer(e.clientX);
    }
    function onKey(e: KeyboardEvent) {
      const step = 6;
      if (e.key === "ArrowLeft") {
        playerXRef.current = Math.max(PLAYER_WIDTH_PCT / 2, playerXRef.current - step);
        setPlayerX(playerXRef.current);
      } else if (e.key === "ArrowRight") {
        playerXRef.current = Math.min(100 - PLAYER_WIDTH_PCT / 2, playerXRef.current + step);
        setPlayerX(playerXRef.current);
      }
    }
    window.addEventListener("pointermove", onMove);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("keydown", onKey);
    };
  }, [phase, movePlayer]);

  return (
    <div className="mx-auto max-w-2xl">
      <div
        ref={areaRef}
        onPointerMove={(e) => phase === "playing" && movePlayer(e.clientX)}
        onTouchMove={(e) => phase === "playing" && movePlayer(e.touches[0].clientX)}
        className="relative aspect-[3/4] w-full touch-none overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-background-soft to-background-card sm:aspect-[4/3]"
      >
        {/* HUD */}
        {phase === "playing" && (
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 py-3 text-sm font-bold">
            <span className="rounded-full bg-background-card/90 px-3 py-1 shadow-sm">
              🏆 {score}
            </span>
            <span className="rounded-full bg-background-card/90 px-3 py-1 shadow-sm">
              ⏱️ {timeLeft}s
            </span>
          </div>
        )}

        {/* Falling items */}
        {phase === "playing" &&
          items.map((item) => (
            <div
              key={item.id}
              className="pointer-events-none absolute text-3xl leading-none"
              style={{ left: `${item.x}%`, top: `${item.y}%`, transform: "translate(-50%, -50%)" }}
            >
              {item.emoji}
            </div>
          ))}

        {/* Player */}
        {phase === "playing" && (
          <div
            className="pointer-events-none absolute text-5xl leading-none drop-shadow-lg"
            style={{
              left: `${playerX}%`,
              top: `${CATCH_LINE_PCT}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            🐒
          </div>
        )}

        {/* Idle screen */}
        {phase === "idle" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
            <span className="text-6xl">🐒</span>
            <h3 className="font-display text-xl font-bold">Monkey Catch</h3>
            <p className="max-w-xs text-sm text-foreground-muted">
              Fang Schneeflocken, Bananen &amp; Kokosnüsse – weich Hitzewellen und Sonnen aus. Bewege
              den Monkey mit Maus, Finger oder Pfeiltasten.
            </p>
            {highscore > 0 && (
              <p className="flex items-center gap-1.5 text-xs font-semibold text-brand-primary">
                <Trophy className="h-3.5 w-3.5" />
                Highscore: {highscore}
              </p>
            )}
            <button
              type="button"
              onClick={startGame}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-brand-primary px-8 py-3 text-sm font-bold text-brand-dark transition-colors hover:bg-brand-primary-hover cursor-pointer"
            >
              Spiel starten
            </button>
          </div>
        )}

        {/* Game over screen */}
        {phase === "over" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background-card/95 p-8 text-center backdrop-blur">
            <span className="text-5xl">{score >= highscore && score > 0 ? "🏆" : "🐒"}</span>
            <h3 className="font-display text-xl font-bold">
              {score >= highscore && score > 0 ? "Neuer Highscore!" : "Zeit abgelaufen!"}
            </h3>
            <p className="text-3xl font-display font-bold text-brand-primary">{score} Punkte</p>
            <p className="text-xs text-foreground-muted">Highscore: {highscore}</p>
            <button
              type="button"
              onClick={startGame}
              className="mt-2 inline-flex items-center gap-2 rounded-full bg-brand-primary px-8 py-3 text-sm font-bold text-brand-dark transition-colors hover:bg-brand-primary-hover cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              Nochmal spielen
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
