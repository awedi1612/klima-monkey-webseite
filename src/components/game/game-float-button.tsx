"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

// Ruhiger, fester Einstieg zum Spiel unten links (gegenüber dem WhatsApp-Knopf), verdeckt keine Inhalte
export function GameFloatButton() {
  const pathname = usePathname();
  if (pathname === "/spiel") return null;

  return (
    <div className="fixed bottom-5 left-5 z-30 hidden sm:block">
      <Link
        href="/spiel"
        aria-label="Monkey Catch spielen"
        className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-background-card text-2xl shadow-[0_8px_24px_-8px_rgba(0,0,0,0.25)] ring-1 ring-border transition-transform hover:scale-105"
      >
        <span aria-hidden="true">🐒</span>
        <span className="pointer-events-none absolute bottom-full left-0 mb-2 whitespace-nowrap rounded-full bg-background-card px-2.5 py-1 text-[11px] font-semibold text-foreground opacity-0 shadow-sm ring-1 ring-border transition-opacity group-hover:opacity-100">
          Kleine Pause?
        </span>
      </Link>
    </div>
  );
}
