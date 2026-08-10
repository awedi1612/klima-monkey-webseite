"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

// Sichere Zonen (in vh/vw-Prozent). Bewusst unterhalb der typischen
// Hero-Ueberschrift/-Textzone (oberste ~35% der Seite) gehalten, damit der
// Button auf keiner Seite direkt Titel oder Fliesstext ueberdeckt.
const SPOTS = [
  { top: "45%", left: "5%" },
  { top: "38%", left: "90%" },
  { top: "60%", left: "4%" },
  { top: "65%", left: "90%" },
  { top: "72%", left: "50%" },
  { top: "78%", left: "10%" },
];

const JUMP_INTERVAL_MS = 14000;
// Kurze Verzoegerung vor dem ersten Erscheinen, damit der Button beim
// Laden nicht sofort ueber dem Hero-Inhalt aufploppt.
const INITIAL_DELAY_MS = 2500;

export function GameFloatButton() {
  const pathname = usePathname();
  const [spotIndex, setSpotIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    media.addEventListener("change", onChange);
    const timeout = setTimeout(() => setVisible(true), INITIAL_DELAY_MS);
    return () => {
      media.removeEventListener("change", onChange);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => {
      setSpotIndex((i) => (i + 1) % SPOTS.length);
    }, JUMP_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  if (pathname === "/spiel" || !visible) return null;

  const spot = SPOTS[spotIndex];

  // Respect prefers-reduced-motion: stay put, no jumping/bouncing/rotating.
  if (reducedMotion) {
    return (
      <div className="fixed z-30 hidden sm:block" style={{ top: SPOTS[0].top, left: SPOTS[0].left }}>
        <Link
          href="/spiel"
          aria-label="Monkey Catch spielen"
          className="group flex flex-col items-center gap-1 rounded-full bg-brand-primary p-3 text-2xl shadow-lg shadow-black/20 transition-transform hover:scale-110"
        >
          🐒
          <span className="pointer-events-none absolute top-full mt-1 whitespace-nowrap rounded-full bg-background-card px-2.5 py-1 text-[11px] font-semibold text-foreground opacity-0 shadow-md transition-opacity group-hover:opacity-100">
            Kleine Pause?
          </span>
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      className="fixed z-30 hidden sm:block"
      animate={{ top: spot.top, left: spot.left }}
      transition={{ duration: 3.5, ease: "easeInOut" }}
      style={{ top: spot.top, left: spot.left }}
    >
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, -6, 6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Link
          href="/spiel"
          aria-label="Monkey Catch spielen"
          className="group flex flex-col items-center gap-1 rounded-full bg-brand-primary p-3 text-2xl shadow-lg shadow-black/20 transition-transform hover:scale-110"
        >
          🐒
          <span className="pointer-events-none absolute top-full mt-1 whitespace-nowrap rounded-full bg-background-card px-2.5 py-1 text-[11px] font-semibold text-foreground opacity-0 shadow-md transition-opacity group-hover:opacity-100">
            Kleine Pause?
          </span>
        </Link>
      </motion.div>
    </motion.div>
  );
}
