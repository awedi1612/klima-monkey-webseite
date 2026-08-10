"use client";

import { useId, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";

const N8N_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_N8N_LEAD_WEBHOOK_URL ??
  "https://friends.dyndns.info:8443/webhook/klimaanlage-lead";

type Answers = {
  bereich?: string;
  flaeche?: string;
  zeitplan?: string;
};

type Question = {
  key: keyof Answers;
  label: string;
  columns?: 2 | 3;
  options: { icon: string; label: string; hint?: string; wide?: boolean }[];
};

const QUESTIONS: Question[] = [
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
    options: [
      { icon: "🔹", label: "ca. 20 m²", hint: "z. B. kleines Schlafzimmer" },
      { icon: "🔷", label: "ca. 30 m²", hint: "z. B. Wohnzimmer" },
      { icon: "🔵", label: "ca. 40 m²", hint: "z. B. großes Wohnzimmer" },
      { icon: "🏢", label: "Über 40 m²", hint: "Individuelles Angebot" },
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
];

const TOTAL_STEPS = QUESTIONS.length;

type Phase = "hero" | "quiz" | "contact" | "thanks" | "callback" | "callback-thanks";

type ContactData = {
  name: string;
  email: string;
  telefon: string;
  strasse: string;
  ort: string;
  nachricht: string;
};

const emptyContact: ContactData = {
  name: "",
  email: "",
  telefon: "",
  strasse: "",
  ort: "",
  nachricht: "",
};

export function LeadFunnel() {
  const [phase, setPhase] = useState<Phase>("hero");
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [contact, setContact] = useState<ContactData>(emptyContact);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const [callbackName, setCallbackName] = useState("");
  const [callbackPhone, setCallbackPhone] = useState("");
  const [callbackErrors, setCallbackErrors] = useState<{ name?: string; telefon?: string }>({});
  const [callbackSubmitting, setCallbackSubmitting] = useState(false);
  const [callbackSubmitError, setCallbackSubmitError] = useState(false);

  const progressPct =
    phase === "quiz" ? Math.round(((stepIndex + 1) / TOTAL_STEPS) * 100) : phase === "contact" ? 100 : 0;

  function selectOption(key: keyof Answers, value: string) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setTimeout(() => {
      if (stepIndex < TOTAL_STEPS - 1) {
        setStepIndex((i) => i + 1);
      } else {
        setPhase("contact");
      }
    }, 250);
  }

  function validate(): boolean {
    const newErrors: Partial<Record<keyof ContactData, string>> = {};
    if (!contact.name.trim()) newErrors.name = "Bitte geben Sie Ihren Namen ein.";
    if (!contact.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
      newErrors.email = "Bitte eine gültige E-Mail-Adresse eingeben.";
    }
    if (!contact.telefon.trim()) newErrors.telefon = "Bitte geben Sie Ihre Telefonnummer ein.";
    if (!contact.strasse.trim()) newErrors.strasse = "Bitte geben Sie Ihre Straße ein.";
    if (!contact.ort.trim()) newErrors.ort = "Bitte geben Sie Ihren Ort ein.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError(false);
    const payload = {
      bereich: answers.bereich || "–",
      flaeche: answers.flaeche || "–",
      zeitplan: answers.zeitplan || "–",
      ...contact,
      timestamp: new Date().toISOString(),
      quelle: "Quiz-Funnel Klimaanlagen (Website)",
    };

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(`Webhook antwortete mit ${response.status}`);
      setPhase("thanks");
    } catch (error) {
      console.error("Webhook-Fehler:", error);
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  }

  function validateCallback(): boolean {
    const newErrors: { name?: string; telefon?: string } = {};
    if (!callbackName.trim()) newErrors.name = "Bitte geben Sie Ihren Namen ein.";
    if (!callbackPhone.trim()) newErrors.telefon = "Bitte geben Sie Ihre Telefonnummer ein.";
    setCallbackErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleCallbackSubmit(event: FormEvent) {
    event.preventDefault();
    if (!validateCallback()) return;

    setCallbackSubmitting(true);
    setCallbackSubmitError(false);

    try {
      const response = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: callbackName,
          telefon: callbackPhone,
          interesse: "Rückruf gewünscht",
          nachricht: "Bitte um Rückruf.",
        }),
      });
      if (!response.ok) throw new Error(`Request fehlgeschlagen (${response.status})`);
      setPhase("callback-thanks");
    } catch (error) {
      console.error("Rückruf-Anfrage fehlgeschlagen:", error);
      setCallbackSubmitError(true);
    } finally {
      setCallbackSubmitting(false);
    }
  }

  const currentQuestion = QUESTIONS[stepIndex];

  return (
    <div className="mx-auto w-full max-w-xl">
      {(phase === "quiz" || phase === "contact") && (
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-xs font-medium text-foreground-muted">
            <span>
              {phase === "contact" ? "Fast geschafft!" : `Frage ${stepIndex + 1} von ${TOTAL_STEPS}`}
            </span>
            <span>{progressPct}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-border">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-brand-secondary to-brand-primary"
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {phase === "hero" && (
          <motion.div
            key="hero"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl border border-border bg-background-card p-8 text-center sm:p-10"
          >
            <span className="inline-flex items-center rounded-full border border-brand-primary/30 bg-brand-primary/10 px-4 py-1.5 text-xs font-bold text-brand-link">
              🐒 Kostenlos &amp; unverbindlich
            </span>
            <h2 className="mt-5 text-balance font-display text-2xl font-bold sm:text-3xl">
              Finden Sie Ihre{" "}
              <span className="text-brand-link">perfekte Klimaanlage</span>
            </h2>
            <p className="mt-3 text-balance text-sm leading-relaxed text-foreground-muted">
              In nur 3 Minuten zur persönlichen Empfehlung – professionell beraten von
              Klima-Monkey Heilbronn.
            </p>
            <ul className="mx-auto mt-6 flex w-fit flex-col gap-2 text-left text-sm">
              {[
                "Individuelle Beratung vor Ort",
                "Günstige Festpreise",
                "Zertifizierte Installation",
                "Bosch-Markenqualität",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-link" />
                  {item}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setPhase("quiz")}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-brand-primary px-8 py-3.5 text-sm font-bold text-brand-dark transition-all hover:-translate-y-0.5 hover:bg-brand-primary-hover cursor-pointer"
            >
              Jetzt kostenlos starten →
            </button>
            <div>
              <button
                type="button"
                onClick={() => setPhase("callback")}
                className="mt-4 text-xs font-semibold text-brand-link underline underline-offset-2 cursor-pointer"
              >
                oder direkt Rückruf vereinbaren
              </button>
            </div>
            <p className="mt-4 text-xs text-foreground-muted">
              🔒 Kein Spam · Kein Verkaufsdruck · Antwort in 2 Minuten
            </p>
          </motion.div>
        )}

        {phase === "callback" && (
          <motion.div
            key="callback"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="rounded-3xl border border-border bg-background-card p-8 sm:p-10"
          >
            <h2 className="text-balance font-display text-xl font-bold sm:text-2xl">
              Rückruf vereinbaren
            </h2>
            <p className="mt-2 text-sm text-foreground-muted">
              Name und Telefonnummer genügen – wir rufen Sie zeitnah zurück.
            </p>

            <form onSubmit={handleCallbackSubmit} noValidate className="mt-6 flex flex-col gap-4">
              <ContactField
                label="Ihr Name"
                required
                value={callbackName}
                error={callbackErrors.name}
                onChange={setCallbackName}
                placeholder="Max Mustermann"
              />
              <ContactField
                label="Telefon"
                type="tel"
                required
                value={callbackPhone}
                error={callbackErrors.telefon}
                onChange={setCallbackPhone}
                placeholder="+49 ..."
              />

              <button
                type="submit"
                disabled={callbackSubmitting}
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-brand-primary px-6 py-3.5 text-sm font-bold text-brand-dark transition-colors hover:bg-brand-primary-hover disabled:opacity-70 cursor-pointer"
              >
                {callbackSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Rückruf anfordern"
                )}
              </button>
              {callbackSubmitError && (
                <p role="status" aria-live="polite" className="text-center text-xs text-red-500">
                  Leider ist etwas schiefgelaufen. Bitte versuchen Sie es erneut oder rufen Sie uns
                  direkt an.
                </p>
              )}
            </form>

            <button
              type="button"
              onClick={() => setPhase("hero")}
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-foreground-muted hover:text-brand-link cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Zurück
            </button>
          </motion.div>
        )}

        {phase === "callback-thanks" && (
          <motion.div
            key="callback-thanks"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-border bg-background-card p-8 text-center sm:p-10"
          >
            <div className="text-5xl">✅</div>
            <h2 className="mt-4 font-display text-2xl font-bold">Vielen Dank!</h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
              Ihre Rückruf-Anfrage ist bei Klima-Monkey eingegangen. Wir melden uns zeitnah unter{" "}
              <strong className="text-foreground">{callbackPhone}</strong>.
            </p>
          </motion.div>
        )}

        {phase === "quiz" && currentQuestion && (
          <motion.div
            key={`step-${stepIndex}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="rounded-3xl border border-border bg-background-card p-8 sm:p-10"
          >
            <p className="text-xs font-bold uppercase tracking-wide text-brand-link">
              Frage {stepIndex + 1} von {TOTAL_STEPS}
            </p>
            <h2 className="mt-2 text-balance font-display text-xl font-bold sm:text-2xl">
              {currentQuestion.label}
            </h2>
            <div
              className={`mt-6 grid gap-3 ${
                currentQuestion.columns === 3 ? "sm:grid-cols-3" : "grid-cols-2"
              }`}
            >
              {currentQuestion.options.map((option) => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => selectOption(currentQuestion.key, option.label)}
                  className={`flex flex-col items-center gap-2 rounded-2xl border border-border bg-background-soft px-3 py-5 text-center transition-all hover:-translate-y-0.5 hover:border-brand-primary hover:bg-brand-primary/5 cursor-pointer ${
                    option.wide ? "col-span-2" : ""
                  }`}
                >
                  <span className="text-3xl leading-none">{option.icon}</span>
                  <span className="text-sm font-semibold">{option.label}</span>
                  {option.hint && (
                    <span className="text-xs text-foreground-muted">{option.hint}</span>
                  )}
                </button>
              ))}
            </div>
            {stepIndex > 0 && (
              <button
                type="button"
                onClick={() => setStepIndex((i) => i - 1)}
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-foreground-muted hover:text-brand-link cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Zurück
              </button>
            )}
          </motion.div>
        )}

        {phase === "contact" && (
          <motion.div
            key="contact"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="rounded-3xl border border-border bg-background-card p-8 sm:p-10"
          >
            <div className="mb-4 w-fit rounded-full border border-brand-primary/30 bg-brand-primary/10 px-4 py-1.5 text-xs font-bold text-brand-link">
              🎯 Wir haben die perfekte Lösung für Sie gefunden!
            </div>
            <h2 className="text-balance font-display text-xl font-bold sm:text-2xl">
              Wohin sollen wir Ihr persönliches Angebot senden?
            </h2>
            <p className="mt-2 text-sm text-foreground-muted">
              Kostenlos &amp; unverbindlich – Rückmeldung von Klima-Monkey innerhalb von zwei Minuten
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-4">
              <ContactField
                label="Ihr Name"
                required
                value={contact.name}
                error={errors.name}
                onChange={(v) => setContact((c) => ({ ...c, name: v }))}
                placeholder="Max Mustermann"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <ContactField
                  label="E-Mail"
                  type="email"
                  required
                  value={contact.email}
                  error={errors.email}
                  onChange={(v) => setContact((c) => ({ ...c, email: v }))}
                  placeholder="name@beispiel.de"
                />
                <ContactField
                  label="Telefon"
                  type="tel"
                  required
                  value={contact.telefon}
                  error={errors.telefon}
                  onChange={(v) => setContact((c) => ({ ...c, telefon: v }))}
                  placeholder="+49 ..."
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <ContactField
                  label="Straße & Hausnummer"
                  required
                  value={contact.strasse}
                  error={errors.strasse}
                  onChange={(v) => setContact((c) => ({ ...c, strasse: v }))}
                  placeholder="Musterstraße 12"
                />
                <ContactField
                  label="PLZ & Ort"
                  required
                  value={contact.ort}
                  error={errors.ort}
                  onChange={(v) => setContact((c) => ({ ...c, ort: v }))}
                  placeholder="74072 Heilbronn"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-foreground-muted">
                  Weitere Angaben <span className="font-normal normal-case">(optional)</span>
                </label>
                <textarea
                  rows={3}
                  value={contact.nachricht}
                  onChange={(e) => setContact((c) => ({ ...c, nachricht: e.target.value }))}
                  placeholder="z. B. Gebäudeart, besondere Wünsche, Fördermittel-Interesse ..."
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus-visible:border-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-brand-primary px-6 py-3.5 text-sm font-bold text-brand-dark transition-colors hover:bg-brand-primary-hover disabled:opacity-70 cursor-pointer"
              >
                {submitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Kostenloses Angebot von Klima-Monkey anfordern →"
                )}
              </button>
              {submitError && (
                <p role="status" aria-live="polite" className="text-center text-xs text-red-500">
                  Leider ist etwas schiefgelaufen. Bitte versuchen Sie es erneut oder rufen Sie uns
                  direkt an.
                </p>
              )}
              <p className="text-center text-xs text-foreground-muted">
                🔒 Ihre Daten werden vertraulich behandelt. Weitere Infos in unserer{" "}
                <a href="/datenschutz" className="text-brand-link underline">
                  Datenschutzerklärung
                </a>
                .
              </p>
            </form>
          </motion.div>
        )}

        {phase === "thanks" && (
          <motion.div
            key="thanks"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-border bg-background-card p-8 text-center sm:p-10"
          >
            <div className="text-5xl">✅</div>
            <h2 className="mt-4 font-display text-2xl font-bold">Vielen Dank!</h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
              Ihre Anfrage ist bei Klima-Monkey eingegangen. Wir melden uns innerhalb von{" "}
              <strong className="text-foreground">zwei Minuten</strong> mit Ihrem persönlichen
              Angebot.
            </p>
            <div className="mt-6 rounded-2xl border border-border bg-background-soft p-5 text-left text-sm">
              <div className="mb-3 text-xs font-bold uppercase tracking-wide text-foreground-muted">
                Ihre Angaben im Überblick
              </div>
              <SummaryRow label="Bereich" value={answers.bereich} />
              <SummaryRow label="Fläche" value={answers.flaeche} />
              <SummaryRow label="Zeitplan" value={answers.zeitplan} />
              <SummaryRow label="Name" value={contact.name} />
              <SummaryRow label="E-Mail" value={contact.email} />
              <SummaryRow label="Telefon" value={contact.telefon} />
              <SummaryRow label="Ort" value={contact.ort} last />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ContactField({
  label,
  value,
  onChange,
  error,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  const inputId = useId();
  const errorId = `${inputId}-error`;

  return (
    <div>
      <label
        htmlFor={inputId}
        className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-foreground-muted"
      >
        {label} {required && <span className="text-brand-link">*</span>}
      </label>
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={`w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
          error ? "border-red-500" : "border-border focus-visible:border-brand-primary"
        }`}
      />
      {error && (
        <p id={errorId} className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

function SummaryRow({ label, value, last }: { label: string; value?: string; last?: boolean }) {
  return (
    <div className={`flex justify-between gap-3 py-2 text-sm ${!last ? "border-b border-border" : ""}`}>
      <span className="text-foreground-muted">{label}</span>
      <span className="text-right font-semibold">{value || "–"}</span>
    </div>
  );
}
