"use client";

import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { CheckCircle2, FileText, Loader2, X } from "lucide-react";

// Bewerbungen gehen über /api/bewerbung an n8n und von dort per Mail an info@klima-monkey.de
const MAX_MB = 4;

const feldKlasse = (fehler?: string) =>
  `w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${
    fehler ? "border-red-700 dark:border-red-400" : "border-[var(--border-input)] focus-visible:border-brand-primary"
  }`;
const fehlerText = "mt-1 text-xs text-red-700 dark:text-red-400";

type Werte = { stelle: string; name: string; email: string; telefon: string; ort: string; eintritt: string; nachricht: string };
type Fehler = Partial<Record<keyof Werte | "lebenslauf" | "einwilligung", string>>;

export function BewerbungFormular({ stellen, vorauswahl }: { stellen: string[]; vorauswahl?: string }) {
  const optionen = [...stellen, "Initiativbewerbung"];
  const [werte, setWerte] = useState<Werte>({
    stelle: vorauswahl && optionen.includes(vorauswahl) ? vorauswahl : optionen[0],
    name: "", email: "", telefon: "", ort: "", eintritt: "", nachricht: "",
  });
  const [datei, setDatei] = useState<File | null>(null);
  const [einwilligung, setEinwilligung] = useState(false);
  const [fehler, setFehler] = useState<Fehler>({});
  const [sendet, setSendet] = useState(false);
  const [sendeFehler, setSendeFehler] = useState("");
  const [fertig, setFertig] = useState(false);
  const honigtopf = useRef<HTMLInputElement>(null);
  const dateiFeld = useRef<HTMLInputElement>(null);
  const formular = useRef<HTMLFormElement>(null);
  const danke = useRef<HTMLHeadingElement>(null);

  const setze = (feld: keyof Werte) => (wert: string) => setWerte((w) => ({ ...w, [feld]: wert }));

  function dateiGewaehlt(f: File | null) {
    setFehler((e) => ({ ...e, lebenslauf: undefined }));
    if (!f) return setDatei(null);
    if (f.type !== "application/pdf" && !f.name.toLowerCase().endsWith(".pdf")) {
      setFehler((e) => ({ ...e, lebenslauf: "Bitte eine PDF-Datei wählen." }));
    } else if (f.size > MAX_MB * 1024 * 1024) {
      setFehler((e) => ({ ...e, lebenslauf: `Die Datei ist größer als ${MAX_MB} MB.` }));
    } else {
      return setDatei(f);
    }
    setDatei(null);
    if (dateiFeld.current) dateiFeld.current.value = "";
  }

  function pruefe() {
    const f: Fehler = {};
    if (!werte.name.trim()) f.name = "Bitte gib deinen Namen ein.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(werte.email.trim())) f.email = "Bitte eine gültige E-Mail-Adresse eingeben.";
    if (!werte.telefon.trim()) f.telefon = "Bitte gib deine Telefonnummer ein.";
    if (!einwilligung) f.einwilligung = "Bitte stimme der Datenschutzerklärung zu.";
    if (fehler.lebenslauf) f.lebenslauf = fehler.lebenslauf;
    setFehler(f);
    if (Object.keys(f).length) {
      requestAnimationFrame(() => formular.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return false;
    }
    return true;
  }

  async function absenden(event: FormEvent) {
    event.preventDefault();
    if (sendet || !pruefe()) return;
    setSendet(true);
    setSendeFehler("");
    const daten = new FormData();
    for (const [feld, wert] of Object.entries(werte)) daten.append(feld, wert.trim());
    if (datei) daten.append("lebenslauf", datei);
    daten.append("website", honigtopf.current?.value ?? "");
    daten.append("datenschutz", "eingewilligt");
    try {
      const antwort = await fetch("/api/bewerbung", { method: "POST", body: daten, signal: AbortSignal.timeout(30000) });
      if (!antwort.ok) {
        const json = await antwort.json().catch(() => ({}));
        throw new Error(json.error || `Status ${antwort.status}`);
      }
      setFertig(true);
      requestAnimationFrame(() => danke.current?.focus());
    } catch (error) {
      console.error("Bewerbung fehlgeschlagen:", error);
      setSendeFehler(
        error instanceof Error && error.message && !error.message.startsWith("Status")
          ? error.message
          : "Leider ist etwas schiefgelaufen. Bitte versuch es noch mal oder ruf uns an."
      );
    } finally {
      setSendet(false);
    }
  }

  const karte = "rounded-[28px] border border-border bg-background-card p-7 sm:p-10";

  if (fertig) {
    return (
      <div className={`${karte} text-center`}>
        <CheckCircle2 className="mx-auto h-12 w-12 text-brand-link" aria-hidden="true" />
        <h3 ref={danke} tabIndex={-1} className="mt-4 font-display text-3xl font-semibold tracking-tight outline-none">
          Danke für deine Bewerbung!
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
          Deine Bewerbung als <strong className="text-foreground">{werte.stelle}</strong> ist bei uns angekommen.
          Wir melden uns in den nächsten Tagen bei dir.
        </p>
      </div>
    );
  }

  return (
    <form ref={formular} onSubmit={absenden} noValidate className={`${karte} flex flex-col gap-4`}>
      <input ref={honigtopf} type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <Beschriftet label="Stelle" required>
        {(id) => (
          <select id={id} value={werte.stelle} onChange={(e) => setze("stelle")(e.target.value)} className={feldKlasse()}>
            {optionen.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        )}
      </Beschriftet>

      <Eingabe label="Vor- und Nachname" required value={werte.name} onChange={setze("name")} fehler={fehler.name} autoComplete="name" />
      <div className="grid gap-4 sm:grid-cols-2">
        <Eingabe label="E-Mail" type="email" required value={werte.email} onChange={setze("email")} fehler={fehler.email} autoComplete="email" />
        <Eingabe label="Telefon" type="tel" required value={werte.telefon} onChange={setze("telefon")} fehler={fehler.telefon} autoComplete="tel" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Eingabe label="Wohnort" value={werte.ort} onChange={setze("ort")} autoComplete="address-level2" placeholder="z. B. Heilbronn" />
        <Eingabe label="Frühester Start" value={werte.eintritt} onChange={setze("eintritt")} placeholder="z. B. sofort, 01.03." />
      </div>

      <Beschriftet label="Ein paar Sätze zu dir" optional>
        {(id) => (
          <textarea
            id={id}
            rows={4}
            value={werte.nachricht}
            onChange={(e) => setze("nachricht")(e.target.value)}
            placeholder="Was hast du bisher gemacht, was reizt dich an der Stelle?"
            className={feldKlasse()}
          />
        )}
      </Beschriftet>

      <Beschriftet label={`Lebenslauf (PDF, max. ${MAX_MB} MB)`} optional fehler={fehler.lebenslauf}>
        {(id) =>
          datei ? (
            <div className="flex items-center gap-3 rounded-xl border border-[var(--border-input)] bg-background px-4 py-3 text-sm">
              <FileText className="h-4 w-4 shrink-0 text-brand-link" aria-hidden="true" />
              <span className="min-w-0 flex-1 truncate">{datei.name}</span>
              <button
                type="button"
                onClick={() => { setDatei(null); if (dateiFeld.current) dateiFeld.current.value = ""; }}
                className="cursor-pointer text-foreground-muted hover:text-brand-link"
                aria-label="Datei entfernen"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <input
              id={id}
              ref={dateiFeld}
              type="file"
              accept="application/pdf,.pdf"
              onChange={(e) => dateiGewaehlt(e.target.files?.[0] ?? null)}
              aria-invalid={!!fehler.lebenslauf}
              className="block w-full cursor-pointer rounded-xl border border-dashed border-[var(--border-input)] bg-background px-4 py-3 text-sm text-foreground-muted file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-brand-primary/15 file:px-4 file:py-1.5 file:text-sm file:font-semibold file:text-brand-link"
            />
          )
        }
      </Beschriftet>
      <p className="-mt-2 text-xs text-foreground-muted">Kein Lebenslauf zur Hand? Kein Problem – Name und Telefonnummer reichen, wir rufen dich an.</p>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-snug text-foreground-muted">
          <input
            type="checkbox"
            checked={einwilligung}
            onChange={(e) => { setEinwilligung(e.target.checked); if (e.target.checked) setFehler((f) => ({ ...f, einwilligung: undefined })); }}
            aria-invalid={!!fehler.einwilligung}
            className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded accent-[var(--brand-primary)]"
          />
          <span>
            Ich habe die{" "}
            <a href="/datenschutz#bewerbung" target="_blank" className="text-brand-link underline underline-offset-2">
              Datenschutzerklärung<span className="sr-only"> (öffnet in neuem Tab)</span>
            </a>{" "}
            gelesen und bin einverstanden, dass Klima-Monkey meine Angaben für das Bewerbungsverfahren speichert und
            verarbeitet. <span className="text-brand-link">*</span>
          </span>
        </label>
        {fehler.einwilligung && <p className={fehlerText}>{fehler.einwilligung}</p>}
      </div>

      <button
        type="submit"
        disabled={sendet}
        aria-busy={sendet}
        className="mt-1 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-brand-primary px-7 py-3.5 text-sm font-semibold text-brand-dark transition-all hover:bg-brand-primary-hover active:scale-[0.98] disabled:opacity-70"
      >
        {sendet ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            <span className="sr-only">Wird gesendet …</span>
          </>
        ) : (
          "Bewerbung absenden"
        )}
      </button>
      <p role="alert" className="text-center text-xs text-red-700 empty:hidden dark:text-red-400">{sendeFehler}</p>
    </form>
  );
}

function Beschriftet({
  label, required, optional, fehler, children,
}: { label: string; required?: boolean; optional?: boolean; fehler?: string; children: (id: string) => ReactNode }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-foreground-muted">
        {label} {required && <span className="text-brand-link">*</span>}
        {optional && <span className="font-normal">(optional)</span>}
      </label>
      {children(id)}
      {fehler && <p className={fehlerText}>{fehler}</p>}
    </div>
  );
}

function Eingabe({
  label, value, onChange, fehler, type = "text", required, autoComplete, placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void; fehler?: string; type?: string;
  required?: boolean; autoComplete?: string; placeholder?: string;
}) {
  return (
    <Beschriftet label={label} required={required} fehler={fehler}>
      {(id) => (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          autoComplete={autoComplete}
          placeholder={placeholder}
          aria-invalid={!!fehler}
          className={feldKlasse(fehler)}
        />
      )}
    </Beschriftet>
  );
}
