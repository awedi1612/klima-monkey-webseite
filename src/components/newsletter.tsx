"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Mail, CheckCircle2 } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export function Newsletter() {
  const [status, setStatus] = useState<Status>("idle");
  const [email, setEmail] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] bg-background-soft px-8 py-14 sm:px-14">
      <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary/12 text-brand-link">
          <Mail className="h-5 w-5" />
        </span>
        <h2 className="text-balance font-display text-2xl font-semibold sm:text-3xl">
          Newsletter: Spartipps & Förderupdates
        </h2>
        <p className="max-w-md text-balance text-sm text-foreground-muted">
          Erhalten Sie gelegentlich Infos zu neuen Förderprogrammen, Energiespartipps
          und Neuigkeiten von Klima-Monkey. Kein Spam, jederzeit abbestellbar.
        </p>

        {status === "success" ? (
          <div
            role="status"
            aria-live="polite"
            className="mt-2 flex items-center gap-2 rounded-full bg-background-card px-5 py-3 text-sm"
          >
            <CheckCircle2 className="h-4 w-4 text-brand-link" />
            Danke! Bitte bestätigen Sie ggf. Ihre E-Mail-Adresse.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-2 flex w-full max-w-md flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              E-Mail-Adresse
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ihre.email@beispiel.de"
              className="w-full flex-1 rounded-full border border-[var(--border-input)] bg-background px-5 py-3 text-sm placeholder:text-foreground-muted/70 outline-none focus-visible:border-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-primary-hover disabled:opacity-70 cursor-pointer"
            >
              {status === "loading" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Anmelden"
              )}
            </button>
          </form>
        )}
        {status === "error" && (
          <p role="status" aria-live="polite" className="text-xs text-red-700 dark:text-red-400">
            Leider ist etwas schiefgelaufen. Bitte versuchen Sie es erneut.
          </p>
        )}
      </div>
    </div>
  );
}
