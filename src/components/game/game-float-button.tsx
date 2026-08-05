"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

// Sichere Zonen (in vh/vw-Prozent), die Header, Footer und den WhatsApp-Button
// unten rechts nicht überdecken.
const SPOTS = [
  { top: "22%", left: "6%" },
  { top: "18%", left: "88%" },
  { top: "55%", left: "4%" },
  { top: "62%", left: "90%" },
  { top: "40%", left: "50%" },
  { top: "75%", left: "12%" },
];

const JUMP_INTERVAL_MS = 14000;

export function GameFloatButton() {
  const pathname = usePathname();
  const [spotIndex, setSpotIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const interval = setInterval(() => {
      setSpotIndex((i) => (i + 1) % SPOTS.length);
    }, JUMP_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  if (pathname === "/spiel" || !visible) return null;

  const spot = SPOTS[spotIndex];

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
