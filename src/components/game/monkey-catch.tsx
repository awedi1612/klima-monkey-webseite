"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AirVent, RotateCcw, Send, Share2, Trophy, Volume2, VolumeX } from "lucide-react";
import { Leaderboard } from "@/components/game/leaderboard";
import { WhatsAppIcon } from "@/components/whatsapp-button";
import {
  isSoundEnabled,
  playCatchBad,
  playCatchBonus,
  playCatchGood,
  playGameOver,
  primeAudio,
  setSoundEnabled,
} from "@/lib/game-sound";

const GAME_SECONDS = 45;
const COMMON_GOOD_ITEMS = ["❄️", "🍌", "🌀", "🥥"];
const BAD_ITEMS = ["🔥", "☀️"];
const COMMON_POINTS = 10;
const BONUS_POINTS = 25;
const BAD_POINTS = -5;
const BONUS_CHANCE = 0.16;
const PLAYER_WIDTH_PCT = 14;
const CATCH_LINE_PCT = 88;
const NAME_STORAGE_KEY = "km-monkey-catch-name";

type FallingItem = {
  id: number;
  x: number;
  y: number;
  kind: "emoji" | "bonus";
  emoji?: string;
  points: number;
  good: boolean;
  speed: number;
};

type Phase = "idle" | "playing" | "over";

type Popup = { id: number; x: number; text: string; bad: boolean };

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
  const [playerName, setPlayerName] = useState("");
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [submitError, setSubmitError] = useState("");
  const [leaderboardKey, setLeaderboardKey] = useState(0);
  const [popups, setPopups] = useState<Popup[]>([]);
  const [soundOn, setSoundOn] = useState(true);
  const [shareStatus, setShareStatus] = useState<"idle" | "copied">("idle");

  const areaRef = useRef<HTMLDivElement>(null);
  const playerXRef = useRef(50);
  const itemsRef = useRef<FallingItem[]>([]);
  const scoreRef = useRef(0);
  const nextIdRef = useRef(0);
  const lastSpawnRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const startedAtRef = useRef(0);
  const popupIdRef = useRef(0);

  useEffect(() => {
    setHighscore(loadHighscore());
    setPlayerName(window.localStorage.getItem(NAME_STORAGE_KEY) || "");
    setSoundOn(isSoundEnabled());
  }, []);

  const toggleSound = useCallback(() => {
    setSoundOn((prev) => {
      const next = !prev;
      setSoundEnabled(next);
      return next;
    });
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
    setSubmitStatus("idle");
    setShareStatus("idle");
    playGameOver();
    const finalScore = scoreRef.current;
    const currentHigh = loadHighscore();
    if (finalScore > currentHigh) {
      window.localStorage.setItem("km-monkey-catch-highscore", String(finalScore));
      setHighscore(finalScore);
    }
  }, [stopLoop]);

  const startGame = useCallback(() => {
    primeAudio();
    setScore(0);
    scoreRef.current = 0;
    setTimeLeft(GAME_SECONDS);
    setItems([]);
    itemsRef.current = [];
    setPopups([]);
    nextIdRef.current = 0;
    lastSpawnRef.current = 0;
    playerXRef.current = 50;
    setPlayerX(50);
    startedAtRef.current = performance.now();
    setPhase("playing");
  }, []);

  async function shareScore() {
    const text = `Ich habe gerade ${score} Punkte bei Monkey Catch von Klima-Monkey erreicht! 🐒 Schaffst du mehr?`;
    const url = typeof window !== "undefined" ? `${window.location.origin}/spiel` : "https://klima-monkey.de/spiel";

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ text, url });
      } catch {
        // user cancelled share sheet, nothing to do
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(`${text} ${url}`);
      setShareStatus("copied");
      setTimeout(() => setShareStatus("idle"), 2000);
    } catch {
      // clipboard unavailable, silently ignore
    }
  }

  async function submitScore(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = playerName.trim().slice(0, 24);
    if (!trimmedName) return;
    window.localStorage.setItem(NAME_STORAGE_KEY, trimmedName);
    setSubmitStatus("loading");
    try {
      const response = await fetch("/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmedName, score: scoreRef.current }),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        setSubmitError(body?.error || "Eintragen hat nicht geklappt, versuch's nochmal.");
        setSubmitStatus("error");
        return;
      }
      setSubmitStatus("done");
      setLeaderboardKey((k) => k + 1);
    } catch {
      setSubmitError("Eintragen hat nicht geklappt, versuch's nochmal.");
      setSubmitStatus("error");
    }
  }

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
        let newItem: FallingItem;
        if (good) {
          const isBonus = Math.random() < BONUS_CHANCE;
          newItem = isBonus
            ? {
                id: nextIdRef.current++,
                x: 6 + Math.random() * 88,
                y: -5,
                kind: "bonus",
                points: BONUS_POINTS,
                good: true,
                speed: (0.018 + Math.random() * 0.012) * difficulty,
              }
            : {
                id: nextIdRef.current++,
                x: 6 + Math.random() * 88,
                y: -5,
                kind: "emoji",
                emoji: COMMON_GOOD_ITEMS[Math.floor(Math.random() * COMMON_GOOD_ITEMS.length)],
                points: COMMON_POINTS,
                good: true,
                speed: (0.018 + Math.random() * 0.012) * difficulty,
              };
        } else {
          newItem = {
            id: nextIdRef.current++,
            x: 6 + Math.random() * 88,
            y: -5,
            kind: "emoji",
            emoji: BAD_ITEMS[Math.floor(Math.random() * BAD_ITEMS.length)],
            points: BAD_POINTS,
            good: false,
            speed: (0.018 + Math.random() * 0.012) * difficulty,
          };
        }
        itemsRef.current = [...itemsRef.current, newItem];
      }

      const survivors: FallingItem[] = [];
      const caughtItems: FallingItem[] = [];
      let delta = 0;
      for (const item of itemsRef.current) {
        const nextY = item.y + item.speed * dt;
        const reachedLine = nextY >= CATCH_LINE_PCT;
        if (reachedLine) {
          const dx = Math.abs(item.x - playerXRef.current);
          const caught = dx < PLAYER_WIDTH_PCT / 2 + 4;
          if (caught) {
            delta += item.points;
            caughtItems.push(item);
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
      if (caughtItems.length > 0) {
        const newPopups: Popup[] = caughtItems.map((item) => ({
          id: popupIdRef.current++,
          x: item.x,
          text: item.points > 0 ? `+${item.points}` : `${item.points}`,
          bad: item.points < 0,
        }));
        setPopups((prev) => [...prev, ...newPopups]);
        newPopups.forEach((p) => {
          setTimeout(() => setPopups((prev) => prev.filter((pp) => pp.id !== p.id)), 700);
        });
        for (const item of caughtItems) {
          if (item.kind === "bonus") playCatchBonus();
          else if (item.points > 0) playCatchGood();
          else playCatchBad();
        }
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
        role="application"
        aria-label="Monkey Catch Minispiel. Steuerung mit den Pfeiltasten links/rechts, Maus oder Finger."
        tabIndex={0}
        className="relative aspect-[3/4] w-full touch-none overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-background-soft to-background-card outline-none focus-visible:ring-2 focus-visible:ring-brand-primary sm:aspect-[4/3]"
      >
        <button
          type="button"
          onClick={toggleSound}
          aria-label={soundOn ? "Ton ausschalten" : "Ton einschalten"}
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-background-card/90 text-foreground-muted shadow-sm transition-colors hover:text-brand-link cursor-pointer"
        >
          {soundOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        </button>

        {/* Points popups */}
        <AnimatePresence>
          {popups.map((popup) => (
            <motion.span
              key={popup.id}
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 0, y: -36 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className={`pointer-events-none absolute z-10 text-lg font-bold ${
                popup.bad ? "text-red-500" : "text-brand-link"
              }`}
              style={{ left: `${popup.x}%`, top: `${CATCH_LINE_PCT}%`, transform: "translate(-50%, -50%)" }}
            >
              {popup.text}
            </motion.span>
          ))}
        </AnimatePresence>

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
              className="pointer-events-none absolute leading-none"
              style={{ left: `${item.x}%`, top: `${item.y}%`, transform: "translate(-50%, -50%)" }}
            >
              {item.kind === "bonus" ? (
                <span className="flex h-9 w-9 animate-pulse items-center justify-center rounded-full bg-brand-primary text-brand-dark shadow-md">
                  <AirVent className="h-5 w-5" />
                </span>
              ) : (
                <span className="text-3xl">{item.emoji}</span>
              )}
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
              Fang Schneeflocken, Bananen &amp; Kokosnüsse – weich Hitzewellen und Sonnen aus. Die
              seltene Klimaanlage <AirVent className="inline h-3.5 w-3.5 align-[-2px]" /> bringt
              Bonuspunkte. Bewege den Monkey mit Maus, Finger oder Pfeiltasten.
            </p>
            {highscore > 0 && (
              <p className="flex items-center gap-1.5 text-xs font-semibold text-brand-link">
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
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 overflow-y-auto bg-background-card/95 p-6 text-center backdrop-blur sm:p-8">
            <span className="text-5xl">{score >= highscore && score > 0 ? "🏆" : "🐒"}</span>
            <h3 className="font-display text-xl font-bold">
              {score >= highscore && score > 0 ? "Neuer Highscore!" : "Zeit abgelaufen!"}
            </h3>
            <p className="text-3xl font-display font-bold text-brand-link">{score} Punkte</p>
            <p className="text-xs text-foreground-muted">Highscore: {highscore}</p>

            {submitStatus === "done" ? (
              <p className="flex items-center gap-1.5 text-xs font-semibold text-brand-link">
                <Trophy className="h-3.5 w-3.5" />
                In der Bestenliste eingetragen!
              </p>
            ) : (
              <form onSubmit={submitScore} className="mt-1 flex w-full max-w-xs items-center gap-2">
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Dein Name"
                  maxLength={24}
                  required
                  className="w-full rounded-full border border-border bg-background px-4 py-2 text-sm outline-none focus:border-brand-primary"
                />
                <button
                  type="submit"
                  disabled={submitStatus === "loading"}
                  aria-label="Für Bestenliste eintragen"
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-primary text-brand-dark transition-colors hover:bg-brand-primary-hover disabled:opacity-60 cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            )}
            {submitStatus === "error" && <p className="text-xs text-red-500">{submitError}</p>}

            <div className="mt-1 flex items-center gap-2">
              <button
                type="button"
                onClick={startGame}
                className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-8 py-3 text-sm font-bold text-brand-dark transition-colors hover:bg-brand-primary-hover cursor-pointer"
              >
                <RotateCcw className="h-4 w-4" />
                Nochmal spielen
              </button>
              <button
                type="button"
                onClick={shareScore}
                aria-label="Ergebnis teilen"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-foreground-muted transition-colors hover:border-brand-primary hover:text-brand-link cursor-pointer"
              >
                <Share2 className="h-4 w-4" />
              </button>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `Ich habe gerade ${score} Punkte bei Monkey Catch von Klima-Monkey erreicht! 🐒 Schaffst du mehr? ${
                    typeof window !== "undefined" ? window.location.origin : "https://klima-monkey.de"
                  }/spiel`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ergebnis über WhatsApp teilen"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-foreground-muted transition-colors hover:border-brand-primary hover:text-brand-link"
              >
                <WhatsAppIcon className="h-4 w-4" />
              </a>
            </div>
            {shareStatus === "copied" && (
              <p className="text-xs text-brand-link">Ergebnis in die Zwischenablage kopiert!</p>
            )}

            <div className="mt-2 w-full max-w-xs border-t border-border pt-4">
              <Leaderboard refreshKey={leaderboardKey} compact />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
