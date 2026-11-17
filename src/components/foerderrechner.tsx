"use client";

import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, CircleAlert, CircleX, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  pruefeFoerderung,
  REGELSTAND,
  type AlteHeizung,
  type Einkommen,
  type Eingaben,
  type Heizen,
  type Nutzung,
  type Rolle,
} from "@/lib/foerderung";

const START: Eingaben = {
  nutzung: "wohnen",
  heizen: "hauptheizung",
  bestandsgebaeude: true,
  auftragErteilt: false,
  rolle: "selbstnutzer",
  alteHeizung: "gas-neu",
  alteHeizungRaus: false,
  wohnungenGebaeude: 1,
  wohnungenBetroffen: 1,
  einkommen: "keineAngabe",
  kindImHaushalt: false,
  kosten: 8000,
};

const BONUS_HEIZUNGEN: AlteHeizung[] = ["oel", "gas-etage", "nachtspeicher", "gas-alt"];
const eur = (n: number) => n.toLocaleString("de-DE", { maximumFractionDigits: 0 }) + " €";

type Option<T> = { wert: T; label: string; hint?: string };

function Auswahl<T extends string | boolean>({
  frage,
  hilfe,
  optionen,
  wert,
  onChange,
  spalten = 2,
}: {
  frage: string;
  hilfe?: string;
  optionen: Option<T>[];
  wert: T;
  onChange: (w: T) => void;
  spalten?: 2 | 3;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="text-sm font-semibold">{frage}</legend>
      {hilfe && <p className="mt-1 text-xs text-foreground-muted">{hilfe}</p>}
      <div className={`mt-3 grid gap-2 ${spalten === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
        {optionen.map((o) => {
          const aktiv = o.wert === wert;
          return (
            <button
              key={String(o.wert)}
              type="button"
              aria-pressed={aktiv}
              onClick={() => onChange(o.wert)}
              className={`rounded-xl border px-4 py-3 text-left text-sm transition-colors cursor-pointer ${
                aktiv ? "border-brand-primary bg-brand-primary/10 font-semibold" : "border-border bg-background hover:border-brand-primary"
              }`}
            >
              {o.label}
              {o.hint && <span className="mt-0.5 block text-xs font-normal text-foreground-muted">{o.hint}</span>}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function Zahl({ label, wert, onChange, min = 1, max = 99 }: { label: string; wert: number; onChange: (n: number) => void; min?: number; max?: number }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-semibold">{label}</span>
      <input
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={wert}
        onChange={(ev) => onChange(Math.min(max, Math.max(min, Number(ev.target.value) || min)))}
        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 focus:border-brand-primary focus:outline-none"
      />
    </label>
  );
}

export function Foerderrechner() {
  const [e, setE] = useState<Eingaben>(START);
  const set = <K extends keyof Eingaben>(k: K, v: Eingaben[K]) => setE((alt) => ({ ...alt, [k]: v }));
  const r = useMemo(() => pruefeFoerderung(e), [e]);

  const wohnen = e.nutzung === "wohnen";
  const heizt = e.heizen === "hauptheizung" || e.heizen === "ergaenzung";
  const zeigeDetails = wohnen && heizt && e.bestandsgebaeude && !e.auftragErteilt;
  const selbst = e.rolle === "selbstnutzer";

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start">
      <div className="flex min-w-0 flex-col gap-7 rounded-3xl border border-border bg-background-card p-6 sm:p-8">
        <Auswahl<Nutzung>
          frage="Wofür ist die Klimaanlage?"
          wert={e.nutzung}
          onChange={(v) => set("nutzung", v)}
          optionen={[
            { wert: "wohnen", label: "Wohnhaus oder Wohnung" },
            { wert: "gewerbe", label: "Büro, Praxis, Gewerbe" },
          ]}
        />
        <Auswahl<Heizen>
          frage="Soll die Klimaanlage auch heizen?"
          hilfe="Gefördert wird die Klimaanlage als Heizung (Luft-Luft-Wärmepumpe), nicht als reines Kühlgerät."
          wert={e.heizen}
          onChange={(v) => set("heizen", v)}
          optionen={[
            { wert: "hauptheizung", label: "Ja, als Hauptheizung", hint: "für die beheizten Räume" },
            { wert: "ergaenzung", label: "Ja, neben der alten Heizung", hint: "übernimmt einen großen Teil" },
            { wert: "wenig", label: "Nur gelegentlich", hint: "z. B. in der Übergangszeit" },
            { wert: "nein", label: "Nein, nur kühlen" },
          ]}
        />
        <Auswahl<boolean>
          frage="Haben Sie den Auftrag schon erteilt oder wurde mit der Montage begonnen?"
          wert={e.auftragErteilt}
          onChange={(v) => set("auftragErteilt", v)}
          optionen={[
            { wert: false, label: "Nein, noch nicht" },
            { wert: true, label: "Ja" },
          ]}
        />

        {wohnen && heizt && (
          <Auswahl<boolean>
            frage="Ist das Gebäude älter als fünf Jahre?"
            hilfe="Maßgeblich ist das Datum des Bauantrags."
            wert={e.bestandsgebaeude}
            onChange={(v) => set("bestandsgebaeude", v)}
            optionen={[
              { wert: true, label: "Ja" },
              { wert: false, label: "Nein, Neubau" },
            ]}
          />
        )}

        {zeigeDetails && (
          <>
            <Auswahl<Rolle>
              frage="Sie sind …"
              wert={e.rolle}
              onChange={(v) => set("rolle", v)}
              spalten={3}
              optionen={[
                { wert: "selbstnutzer", label: "Eigentümer", hint: "und wohne selbst dort" },
                { wert: "vermieter", label: "Eigentümer", hint: "und vermiete" },
                { wert: "mieter", label: "Mieter" },
              ]}
            />
            <Auswahl<AlteHeizung>
              frage="Womit wird bisher geheizt?"
              wert={e.alteHeizung}
              onChange={(v) => set("alteHeizung", v)}
              optionen={[
                { wert: "oel", label: "Öl" },
                { wert: "gas-alt", label: "Gas, 20 Jahre oder älter" },
                { wert: "gas-neu", label: "Gas, jünger als 20 Jahre" },
                { wert: "gas-etage", label: "Gas-Etagenheizung" },
                { wert: "nachtspeicher", label: "Nachtspeicher" },
                { wert: "erneuerbar-neu", label: "Wärmepumpe, Pellets oder Solar", hint: "in Betrieb seit 2008 oder später" },
                { wert: "sonstige", label: "Etwas anderes" },
              ]}
            />
            {selbst && BONUS_HEIZUNGEN.includes(e.alteHeizung) && (
              <Auswahl<boolean>
                frage="Wird die alte Heizung ausgebaut?"
                hilfe="Für den Bonus darf die Wohnung danach nicht mehr mit Öl oder Gas beheizt werden."
                wert={e.alteHeizungRaus}
                onChange={(v) => set("alteHeizungRaus", v)}
                optionen={[
                  { wert: true, label: "Ja, sie wird ersetzt" },
                  { wert: false, label: "Nein, sie bleibt" },
                ]}
              />
            )}
            <div className="grid gap-4 sm:grid-cols-2">
              <Zahl
                label="Wohnungen im Haus"
                wert={e.wohnungenGebaeude}
                onChange={(n) => setE((alt) => ({ ...alt, wohnungenGebaeude: n, wohnungenBetroffen: Math.min(alt.wohnungenBetroffen, n) }))}
              />
              <Zahl
                label="Davon heizt die Klimaanlage"
                wert={e.wohnungenBetroffen}
                max={e.wohnungenGebaeude}
                onChange={(n) => set("wohnungenBetroffen", n)}
              />
            </div>
            {selbst && (
              <div className="flex flex-col gap-3">
                <Auswahl<Einkommen>
                  frage="Zu versteuerndes Haushaltseinkommen pro Jahr"
                  hilfe="Durchschnitt des zweiten und dritten Jahres vor dem Antrag, laut Steuerbescheid. Freiwillig – bringt bis zu 40 % mehr Zuschuss."
                  wert={e.einkommen}
                  onChange={(v) => set("einkommen", v)}
                  spalten={3}
                  optionen={[
                    { wert: "bis30", label: "bis 30.000 €" },
                    { wert: "bis40", label: "bis 40.000 €" },
                    { wert: "bis50", label: "bis 50.000 €" },
                    { wert: "ueber50", label: "mehr" },
                    { wert: "keineAngabe", label: "keine Angabe" },
                  ]}
                />
                <label className="flex items-center gap-2.5 text-sm">
                  <input
                    type="checkbox"
                    checked={e.kindImHaushalt}
                    onChange={(ev) => set("kindImHaushalt", ev.target.checked)}
                    className="h-4 w-4 accent-[var(--brand-primary)]"
                  />
                  Im Haushalt lebt mindestens ein Kind unter 18 Jahren
                </label>
              </div>
            )}
          </>
        )}

        {(zeigeDetails || (e.nutzung === "gewerbe" && !e.auftragErteilt)) && (
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-semibold">Geplante Kosten inkl. Montage (brutto)</span>
            <span className="text-xs text-foreground-muted">Richtwert: ein Raum ab ca. 2.200 €, mehrere Räume entsprechend mehr.</span>
            <div className="mt-1 flex items-center gap-4">
              <input
                type="range"
                min={1000}
                max={40000}
                step={500}
                value={e.kosten}
                onChange={(ev) => set("kosten", Number(ev.target.value))}
                className="w-full accent-[var(--brand-primary)]"
                aria-label="Kosten"
              />
              <span className="w-24 shrink-0 text-right font-semibold tabular-nums">{eur(e.kosten)}</span>
            </div>
          </label>
        )}
      </div>

      <Ergebnisanzeige r={r} />
    </div>
  );
}

function Ergebnisanzeige({ r }: { r: ReturnType<typeof pruefeFoerderung> }) {
  const kopf =
    r.status === "nicht"
      ? { Icon: CircleX, text: "Kein Zuschuss möglich", farbe: "text-foreground-muted" }
      : r.status === "pruefen"
        ? { Icon: CircleAlert, text: "Voraussichtlich förderfähig", farbe: "text-[#b7791f]" }
        : { Icon: CheckCircle2, text: "Förderfähig", farbe: "text-brand-link" };

  return (
    <aside className="flex min-w-0 flex-col gap-5 rounded-3xl border border-border bg-background-soft p-6 sm:p-8 lg:sticky lg:top-24" aria-live="polite">
      <div className={`flex items-center gap-2 text-sm font-semibold ${kopf.farbe}`}>
        <kopf.Icon className="h-5 w-5" />
        {kopf.text}
      </div>

      {r.status !== "nicht" && (
        <div>
          <p className="text-sm text-foreground-muted">Möglicher Zuschuss</p>
          <p className="font-display text-5xl font-semibold tracking-tight">{eur(r.zuschuss)}</p>
          <p className="mt-1 text-sm text-foreground-muted">
            {r.satz.toLocaleString("de-DE")} % von {eur(r.foerderfaehigeKosten)} förderfähigen Kosten
          </p>
          {r.programm && <p className="mt-2 text-xs text-foreground-muted">{r.programm}</p>}
        </div>
      )}

      {r.bausteine.length > 0 && (
        <ul className="flex flex-col gap-1.5 border-t border-border pt-4 text-sm">
          {r.bausteine.map((b) => (
            <li key={b.name} className="flex justify-between gap-4">
              <span>
                {b.name}
                {b.hinweis && <span className="block text-xs text-foreground-muted">{b.hinweis}</span>}
              </span>
              <span className="font-semibold tabular-nums">{b.prozent} %</span>
            </li>
          ))}
          {r.deckel && r.bausteine.reduce((s, b) => s + b.prozent, 0) > r.deckel && (
            <li className="text-xs text-foreground-muted">Gedeckelt auf höchstens {r.deckel} %.</li>
          )}
        </ul>
      )}

      {[...r.gruende, ...r.alternativen].length > 0 && (
        <ul className="flex flex-col gap-2 text-sm leading-relaxed">
          {[...r.gruende, ...r.alternativen].map((t) => (
            <li key={t} className="flex gap-2">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-link" />
              {t}
            </li>
          ))}
        </ul>
      )}

      {r.status !== "nicht" && (
        <details className="group border-t border-border pt-4 text-sm">
          <summary className="cursor-pointer font-semibold">Voraussetzungen und Ablauf</summary>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-foreground-muted">Das prüfen wir für Sie</p>
          <ul className="mt-1.5 flex list-disc flex-col gap-1 pl-5 text-foreground-muted">
            {r.voraussetzungen.map((t) => <li key={t}>{t}</li>)}
          </ul>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-foreground-muted">So läuft der Antrag</p>
          <ol className="mt-1.5 flex list-decimal flex-col gap-1 pl-5 text-foreground-muted">
            {r.unterlagen.map((t) => <li key={t}>{t}</li>)}
          </ol>
          {r.hinweise.length > 0 && (
            <>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-foreground-muted">Gut zu wissen</p>
              <ul className="mt-1.5 flex list-disc flex-col gap-1 pl-5 text-foreground-muted">
                {r.hinweise.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </>
          )}
        </details>
      )}

      <Button href="/kontakt" size="lg" className="w-full">
        {r.status === "nicht" ? "Beratung anfragen" : "Angebot mit Förderung anfragen"}
        <ArrowRight className="h-4 w-4" />
      </Button>
      <p className="text-xs leading-relaxed text-foreground-muted">
        Unverbindliche Ersteinschätzung nach den Förderbedingungen von KfW und BAFA, Stand {REGELSTAND}. Keine Rechts- oder
        Steuerberatung. Verbindlich ist allein die Zusage des Fördergebers.
      </p>
    </aside>
  );
}
