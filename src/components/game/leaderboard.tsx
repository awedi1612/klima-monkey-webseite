"use client";

import { useEffect, useState } from "react";
import { Loader2, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

type Entry = { name: string; score: number };
type Status = "loading" | "ready" | "empty" | "error";

export function Leaderboard({
  refreshKey,
  compact = false,
}: {
  refreshKey?: number;
  compact?: boolean;
}) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");

    fetch("/api/leaderboard")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        const list: Entry[] = Array.isArray(data.entries) ? data.entries : [];
        setEntries(list);
        setStatus(list.length > 0 ? "ready" : "empty");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center gap-2 py-4 text-xs text-foreground-muted">
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
        Bestenliste wird geladen …
      </div>
    );
  }

  if (status === "error" || status === "empty") {
    return (
      <p className="py-4 text-center text-xs text-foreground-muted">
        {status === "error" ? "Bestenliste gerade nicht erreichbar." : "Noch keine Einträge – sei der Erste!"}
      </p>
    );
  }

  return (
    <div className={cn("text-left", compact ? "mt-3" : "mt-0")}>
      <p className="mb-2 flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-foreground-muted">
        <Trophy className="h-3.5 w-3.5 text-brand-link" />
        Bestenliste
      </p>
      <ol className="flex flex-col gap-1">
        {entries.map((entry, i) => (
          <li
            key={`${entry.name}-${i}`}
            className="flex items-center justify-between rounded-lg bg-background-soft px-3 py-1.5 text-sm"
          >
            <span className="flex items-center gap-2 truncate">
              <span className="w-4 shrink-0 text-xs font-bold text-foreground-muted">{i + 1}.</span>
              <span className="truncate">{entry.name}</span>
            </span>
            <span className="shrink-0 font-semibold text-brand-link">{entry.score}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
