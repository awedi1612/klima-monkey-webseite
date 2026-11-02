"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Loader2, MessageSquareText, Snowflake, Wrench } from "lucide-react";

// Anfragen gehen an n8n; n8n legt sie in Monkey-Soft an (Kunde + Angebotsentwurf) und bestätigt per Mail
const ANFRAGE_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_N8N_ANFRAGE_WEBHOOK_URL ??
  "https://friends.dyndns.info:8443/webhook/website-anfrage";

type Art = "klima" | "wartung" | "sonstiges";

type Question = {
  key: string;
  label: string;
  columns?: 2 | 3;
  options: { icon?: string; label: string; hint?: string; wide?: boolean }[];
};

const ARTEN: { art: Art; titel: string; text: string; icon: typeof Snowflake }[] = [
  { art: "klima", titel: "Klimaanlage", text: "Neue Klimaanlage – Angebot in wenigen Klicks", icon: Snowflake },
  { art: "wartung", titel: "Wartung", text: "Wartung oder Reinigung Ihrer Klimaanlage", icon: Wrench },
  { art: "sonstiges", titel: "Sonstiges Anliegen", text: "Reparatur, Miete, Fragen – schreiben Sie uns", icon: MessageSquareText },
];

const FRAGEN: Record<Art, Question[]> = {
  klima: [
    {
      key: "bereich",
      label: "Für welchen Bereich suchen Sie eine Klimaanlage?",
      options: [
        { icon: "🛏️", label: "Schlafzimmer" },
        { icon: "🛋️", label: "Wohnzimmer" },
        { icon: "🧸", label: "Kinderzimmer" },
        { icon: "💼", label: "Büro / Gewerbe" },
        { icon: "🏠", label: "Mehrere Räume", wide: true },
      ],
    },
    {
      key: "flaeche",
      label: "Wie groß ist der Raum ungefähr?",
      columns: 3,
      options: [
        { icon: "🔹", label: "ca. 20 m²", hint: "z. B. Schlafzimmer" },
        { icon: "🔷", label: "ca. 30 m²", hint: "z. B. Wohnzimmer" },
        { icon: "🔵", label: "ca. 40 m²", hint: "z. B. großer Wohnraum" },
      ],
    },
    {
      key: "zeitplan",
      label: "Wann möchten Sie starten?",
      columns: 3,
      options: [
        { icon: "🚀", label: "So schnell wie möglich" },
        { icon: "📅", label: "In 1–3 Monaten" },
        { icon: "🤔", label: "Ich plane noch" },
      ],
    },
  ],
  wartung: [
    {
      key: "hersteller",
      label: "Von welchem Hersteller ist Ihre Klimaanlage?",
      options: [
        { label: "Bosch" },
        { label: "Mitsubishi" },
        { label: "Daikin" },
        { label: "TCL" },
        { label: "Andere / weiß nicht", wide: true },
      ],
    },
    {
      key: "geraete",
      label: "Wie viele Innengeräte sollen gewartet werden?",
      options: [
        { icon: "1️⃣", label: "1" },
        { icon: "2️⃣", label: "2" },
        { icon: "3️⃣", label: "3" },
        { icon: "➕", label: "4 oder mehr" },
      ],
    },
    {
      key: "letzte_wartung",
      label: "Wann war die letzte Wartung?",
      options: [
        { icon: "🟢", label: "Vor weniger als 1 Jahr" },
        { icon: "🟡", label: "Vor 1–2 Jahren" },
        { icon: "🟠", label: "Vor mehr als 2 Jahren" },
        { icon: "❔", label: "Noch nie / weiß nicht" },
      ],
    },
    {
      key: "von_uns",
      label: "Wurde die Anlage von Klima-Monkey eingebaut?",
      columns: 3,
      options: [
        { icon: "🐒", label: "Ja" },
        { icon: "🏗️", label: "Nein" },
        { icon: "❔", label: "Weiß nicht" },
      ],
    },
  ],
  sonstiges: [
    {
      key: "anliegen",
      label: "Worum geht es?",
      options: [
        { icon: "🛠️", label: "Reparatur / Störung" },
        { icon: "📦", label: "Klimagerät mieten" },
        { icon: "💶", label: "Finanzierung" },
        { icon: "💬", label: "Etwas anderes" },
      ],
    },
  ],
};

type Phase = "start" | "fragen" | "kontakt" | "danke" | "rueckruf" | "rueckruf-danke";

type Kontakt = {
  anrede: "" | "Frau" | "Herr" | "Firma";
  name: string;
  email: string;
  telefon: string;
  strasse: string;
  ort: string;
  nachricht: string;
};

const leererKontakt: Kontakt = { anrede: "", name: "", email: "", telefon: "", strasse: "", ort: "", nachricht: "" };

const karte = "rounded-[28px] border border-border bg-background-card p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_40px_-12px_rgba(0,0,0,0.12)] sm:p-10";
const primaerKnopf =
  "inline-flex items-center justify-center gap-2 rounded-full bg-brand-primary px-7 py-3.5 text-sm font-semibold text-brand-dark transition-all hover:bg-brand-primary-hover active:scale-[0.98] disabled:opacity-70 cursor-pointer";

export function AnfrageFunnel() {
  const [phase, setPhase] = useState<Phase>("start");
  const [art, setArt] = useState<Art>("klima");
  const [schritt, setSchritt] = useState(0);
  const [antworten, setAntworten] = useState<Record<string, string>>({});
  const [kontakt, setKontakt] = useState<Kontakt>(leererKontakt);
  const [fehler, setFehler] = useState<Partial<Record<keyof Kontakt, string>>>({});
  const [sendet, setSendet] = useState(false);
  const [sendeFehler, setSendeFehler] = useState(false);
  const honigtopf = useRef<HTMLInputElement>(null);

  const [rueckrufName, setRueckrufName] = useState("");
  const [rueckrufTelefon, setRueckrufTelefon] = useState("");
  const [rueckrufFehler, setRueckrufFehler] = useState<{ name?: string; telefon?: string }>({});
  const [rueckrufSendet, setRueckrufSendet] = useState(false);
  const [rueckrufSendeFehler, setRueckrufSendeFehler] = useState(false);

  const fragen = FRAGEN[art];
  const frage = fragen[schritt];
  const schritteGesamt = fragen.length + 1;
  const fortschritt =
    phase === "fragen" ? Math.round(((schritt + 1) / schritteGesamt) * 100) : phase === "kontakt" ? 100 : 0;
  const adresseNoetig = art !== "sonstiges";

  function starte(neueArt: Art) {
    setArt(neueArt);
    setSchritt(0);
    setAntworten({});
    setPhase("fragen");
  }

  function waehle(key: string, wert: string) {
    setAntworten((a) => ({ ...a, [key]: wert }));
    setTimeout(() => {
      if (schritt < fragen.length - 1) setSchritt((s) => s + 1);
      else setPhase("kontakt");
    }, 220);
  }

  function zurueck() {
    if (phase === "kontakt") setPhase("fragen");
    else if (schritt > 0) setSchritt((s) => s - 1);
    else setPhase("start");
  }

  function pruefe(): boolean {
    const f: Partial<Record<keyof Kontakt, string>> = {};
    if (!kontakt.anrede) f.anrede = "Bitte wählen Sie eine Anrede.";
    if (!kontakt.name.trim()) f.name = "Bitte geben Sie Ihren Namen ein.";
    if (!kontakt.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(kontakt.email)) {
      f.email = "Bitte eine gültige E-Mail-Adresse eingeben.";
    }
    if (!kontakt.telefon.trim()) f.telefon = "Bitte geben Sie Ihre Telefonnummer ein.";
    if (adresseNoetig && !kontakt.strasse.trim()) f.strasse = "Bitte geben Sie Ihre Straße ein.";
    if (adresseNoetig && !kontakt.ort.trim()) f.ort = "Bitte geben Sie PLZ und Ort ein.";
    if (art === "sonstiges" && !kontakt.nachricht.trim()) f.nachricht = "Bitte beschreiben Sie kurz Ihr Anliegen.";
    setFehler(f);
    return Object.keys(f).length === 0;
  }

  async function absenden(event: FormEvent) {
    event.preventDefault();
    if (!pruefe()) return;
    setSendet(true);
    setSendeFehler(false);
    try {
      const antwort = await fetch(ANFRAGE_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          art,
          ...antworten,
          ...kontakt,
          website: honigtopf.current?.value ?? "",
          quelle: "Anfrage-Funnel (Website)",
        }),
      });
      if (!antwort.ok) throw new Error(`Webhook antwortete mit ${antwort.status}`);
      setPhase("danke");
    } catch (error) {
      console.error("Anfrage fehlgeschlagen:", error);
      setSendeFehler(true);
    } finally {
      setSendet(false);
    }
  }

  async function rueckrufAbsenden(event: FormEvent) {
    event.preventDefault();
    const f: { name?: string; telefon?: string } = {};
    if (!rueckrufName.trim()) f.name = "Bitte geben Sie Ihren Namen ein.";
    if (!rueckrufTelefon.trim()) f.telefon = "Bitte geben Sie Ihre Telefonnummer ein.";
    setRueckrufFehler(f);
    if (Object.keys(f).length) return;
    setRueckrufSendet(true);
    setRueckrufSendeFehler(false);
    try {
      const antwort = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: rueckrufName, telefon: rueckrufTelefon, interesse: "Rückruf gewünscht", nachricht: "Bitte um Rückruf." }),
      });
      if (!antwort.ok) throw new Error(`Request fehlgeschlagen (${antwort.status})`);
      setPhase("rueckruf-danke");
    } catch (error) {
      console.error("Rückruf-Anfrage fehlgeschlagen:", error);
      setRueckrufSendeFehler(true);
    } finally {
      setRueckrufSendet(false);
    }
  }

  const bewegung = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
    transition: { duration: 0.28, ease: [0.25, 0.1, 0.25, 1] as const },
  };

  return (
    <div className="mx-auto w-full max-w-xl" id="anfrage">
      {(phase === "fragen" || phase === "kontakt") && (
        <div className="mb-5">
          <div className="mb-2 flex items-center justify-between text-xs font-medium text-foreground-muted">
            <span>{phase === "kontakt" ? "Letzter Schritt" : `Schritt ${schritt + 1} von ${schritteGesamt}`}</span>
            <span>{fortschritt}%</span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-border">
            <motion.div className="h-full rounded-full bg-brand-primary" animate={{ width: `${fortschritt}%` }} transition={{ duration: 0.4 }} />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {phase === "start" && (
          <motion.div key="start" {...bewegung} className={karte}>
            <p className="text-sm font-semibold text-brand-link">Kostenlos &amp; unverbindlich</p>
            <h2 className="mt-2 text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl">Worum geht es?</h2>
            <p className="mt-3 text-pretty text-[15px] leading-relaxed text-foreground-muted">
              Wählen Sie aus, worum es geht – wir führen Sie in wenigen Schritten zum Ziel.
            </p>
            <div className="mt-7 flex flex-col gap-3">
              {ARTEN.map(({ art: a, titel, text, icon: Icon }) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => starte(a)}
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-background px-5 py-4 text-left transition-all hover:border-brand-primary hover:shadow-sm active:scale-[0.99] cursor-pointer"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-primary/12 text-brand-link">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-base font-semibold">{titel}</span>
                    <span className="block text-sm text-foreground-muted">{text}</span>
                  </span>
                  <span className="text-foreground-muted transition-transform group-hover:translate-x-0.5" aria-hidden>
                    →
                  </span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setPhase("rueckruf")}
              className="mt-6 text-sm font-medium text-brand-link underline-offset-4 hover:underline cursor-pointer"
            >
              Lieber direkt einen Rückruf vereinbaren
            </button>
          </motion.div>
        )}

        {phase === "fragen" && frage && (
          <motion.div key={`${art}-${schritt}`} {...bewegung} className={karte}>
            <p className="text-sm font-semibold text-brand-link">{ARTEN.find((x) => x.art === art)?.titel}</p>
            <h2 className="mt-2 text-balance font-display text-2xl font-semibold tracking-tight sm:text-3xl">{frage.label}</h2>
            <div className={`mt-7 grid gap-3 ${frage.columns === 3 ? "sm:grid-cols-3" : "grid-cols-2"}`}>
              {frage.options.map((o) => {
                const gewaehlt = antworten[frage.key] === o.label;
                return (
                  <button
                    key={o.label}
                    type="button"
                    onClick={() => waehle(frage.key, o.label)}
                    aria-pressed={gewaehlt}
                    className={`flex flex-col items-center gap-2 rounded-2xl border px-3 py-5 text-center transition-all active:scale-[0.98] cursor-pointer ${
                      gewaehlt ? "border-brand-primary bg-brand-primary/10" : "border-border bg-background hover:border-brand-primary"
                    } ${o.wide ? "col-span-2" : ""}`}
                  >
                    {o.icon && <span className="text-3xl leading-none">{o.icon}</span>}
                    <span className="text-sm font-semibold">{o.label}</span>
                    {o.hint && <span className="text-xs text-foreground-muted">{o.hint}</span>}
                  </button>
                );
              })}
            </div>
            <ZurueckKnopf onClick={zurueck} />
          </motion.div>
        )}

        {phase === "kontakt" && (
          <motion.div key="kontakt" {...bewegung} className={karte}>
            <h2 className="text-balance font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              {art === "sonstiges" ? "Wie erreichen wir Sie?" : "Wohin dürfen wir Ihr Angebot senden?"}
            </h2>
            <p className="mt-2 text-sm text-foreground-muted">
              {art === "sonstiges"
                ? "Wir melden uns so schnell wie möglich bei Ihnen."
                : "Wir prüfen Ihre Angaben und senden Ihnen Ihr persönliches Angebot – in der Regel innerhalb eines Werktags."}
            </p>

            <form onSubmit={absenden} noValidate className="mt-6 flex flex-col gap-4">
              {/* Honigtopf für Bots: für Menschen unsichtbar */}
              <input ref={honigtopf} type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

              <fieldset>
                <legend className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-foreground-muted">
                  Anrede <span className="text-brand-link">*</span>
                </legend>
                <div className="inline-flex rounded-full border border-border bg-background p-1" role="radiogroup">
                  {(["Frau", "Herr", "Firma"] as const).map((a) => (
                    <button
                      key={a}
                      type="button"
                      role="radio"
                      aria-checked={kontakt.anrede === a}
                      onClick={() => setKontakt((k) => ({ ...k, anrede: a }))}
                      className={`rounded-full px-5 py-2 text-sm font-medium transition-colors cursor-pointer ${
                        kontakt.anrede === a ? "bg-brand-primary text-brand-dark" : "text-foreground-muted hover:text-foreground"
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
                {fehler.anrede && <p className="mt-1 text-xs text-red-500">{fehler.anrede}</p>}
              </fieldset>

              <Feld
                label={kontakt.anrede === "Firma" ? "Firma und Ansprechpartner" : "Vor- und Nachname"}
                required
                value={kontakt.name}
                error={fehler.name}
                onChange={(v) => setKontakt((k) => ({ ...k, name: v }))}
                placeholder={kontakt.anrede === "Firma" ? "Muster GmbH, Max Mustermann" : "Max Mustermann"}
                autoComplete="name"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Feld label="E-Mail" type="email" required value={kontakt.email} error={fehler.email}
                  onChange={(v) => setKontakt((k) => ({ ...k, email: v }))} placeholder="name@beispiel.de" autoComplete="email" />
                <Feld label="Telefon" type="tel" required value={kontakt.telefon} error={fehler.telefon}
                  onChange={(v) => setKontakt((k) => ({ ...k, telefon: v }))} placeholder="+49 …" autoComplete="tel" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Feld label="Straße & Hausnummer" required={adresseNoetig} value={kontakt.strasse} error={fehler.strasse}
                  onChange={(v) => setKontakt((k) => ({ ...k, strasse: v }))} placeholder="Musterstraße 12" autoComplete="street-address" />
                <Feld label="PLZ & Ort" required={adresseNoetig} value={kontakt.ort} error={fehler.ort}
                  onChange={(v) => setKontakt((k) => ({ ...k, ort: v }))} placeholder="74072 Heilbronn" autoComplete="postal-code" />
              </div>
              <div>
                <label htmlFor="anfrage-nachricht" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-foreground-muted">
                  {art === "sonstiges" ? <>Ihr Anliegen <span className="text-brand-link">*</span></> : <>Weitere Angaben <span className="font-normal normal-case">(optional)</span></>}
                </label>
                <textarea
                  id="anfrage-nachricht"
                  rows={art === "sonstiges" ? 5 : 3}
                  value={kontakt.nachricht}
                  onChange={(e) => setKontakt((k) => ({ ...k, nachricht: e.target.value }))}
                  placeholder={art === "sonstiges" ? "Beschreiben Sie kurz, wobei wir helfen können …" : "z. B. Gebäudeart, besondere Wünsche …"}
                  aria-invalid={!!fehler.nachricht}
                  className={`w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${
                    fehler.nachricht ? "border-red-500" : "border-border focus-visible:border-brand-primary"
                  }`}
                />
                {fehler.nachricht && <p className="mt-1 text-xs text-red-500">{fehler.nachricht}</p>}
              </div>
              <button type="submit" disabled={sendet} className={`mt-1 ${primaerKnopf}`}>
                {sendet ? <Loader2 className="h-4 w-4 animate-spin" /> : "Anfrage absenden"}
              </button>
              {sendeFehler && (
                <p role="status" aria-live="polite" className="text-center text-xs text-red-500">
                  Leider ist etwas schiefgelaufen. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an.
                </p>
              )}
              <p className="text-center text-xs text-foreground-muted">
                Ihre Daten verwenden wir nur zur Bearbeitung Ihrer Anfrage. Mehr in unserer{" "}
                <a href="/datenschutz" className="text-brand-link underline underline-offset-2">Datenschutzerklärung</a>.
              </p>
            </form>
            <ZurueckKnopf onClick={zurueck} />
          </motion.div>
        )}

        {phase === "danke" && (
          <motion.div key="danke" {...bewegung} className={`${karte} text-center`}>
            <CheckCircle2 className="mx-auto h-12 w-12 text-brand-link" />
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight">Vielen Dank!</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              Ihre Anfrage ist bei uns eingegangen. Eine Bestätigung ist unterwegs an{" "}
              <strong className="text-foreground">{kontakt.email}</strong>.
              {art === "sonstiges" ? " Wir melden uns so schnell wie möglich." : " Ihr persönliches Angebot folgt in der Regel innerhalb eines Werktags."}
            </p>
          </motion.div>
        )}

        {phase === "rueckruf" && (
          <motion.div key="rueckruf" {...bewegung} className={karte}>
            <h2 className="text-balance font-display text-2xl font-semibold tracking-tight sm:text-3xl">Rückruf vereinbaren</h2>
            <p className="mt-2 text-sm text-foreground-muted">Name und Telefonnummer genügen – wir rufen Sie zeitnah zurück.</p>
            <form onSubmit={rueckrufAbsenden} noValidate className="mt-6 flex flex-col gap-4">
              <Feld label="Ihr Name" required value={rueckrufName} error={rueckrufFehler.name} onChange={setRueckrufName} placeholder="Max Mustermann" autoComplete="name" />
              <Feld label="Telefon" type="tel" required value={rueckrufTelefon} error={rueckrufFehler.telefon} onChange={setRueckrufTelefon} placeholder="+49 …" autoComplete="tel" />
              <button type="submit" disabled={rueckrufSendet} className={`mt-1 ${primaerKnopf}`}>
                {rueckrufSendet ? <Loader2 className="h-4 w-4 animate-spin" /> : "Rückruf anfordern"}
              </button>
              {rueckrufSendeFehler && (
                <p role="status" aria-live="polite" className="text-center text-xs text-red-500">
                  Leider ist etwas schiefgelaufen. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an.
                </p>
              )}
            </form>
            <ZurueckKnopf onClick={() => setPhase("start")} />
          </motion.div>
        )}

        {phase === "rueckruf-danke" && (
          <motion.div key="rueckruf-danke" {...bewegung} className={`${karte} text-center`}>
            <CheckCircle2 className="mx-auto h-12 w-12 text-brand-link" />
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight">Vielen Dank!</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              Wir rufen Sie zeitnah unter <strong className="text-foreground">{rueckrufTelefon}</strong> zurück.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ZurueckKnopf({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground-muted hover:text-brand-link cursor-pointer"
    >
      <ArrowLeft className="h-4 w-4" />
      Zurück
    </button>
  );
}

function Feld({
  label,
  value,
  onChange,
  error,
  type = "text",
  required,
  placeholder,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-foreground-muted">
        {label} {required && <span className="text-brand-link">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-fehler` : undefined}
        className={`w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${
          error ? "border-red-500" : "border-border focus-visible:border-brand-primary"
        }`}
      />
      {error && (
        <p id={`${id}-fehler`} className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
