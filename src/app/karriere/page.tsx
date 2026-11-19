import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Euro, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/fade-in";
import { BewerbungFormular } from "@/components/bewerbung-formular";
import { lohnText, stellen } from "@/lib/stellen";

export const metadata: Metadata = {
  title: "Jobs in Heilbronn – Karriere bei Klima-Monkey",
  description:
    "Offene Stellen bei Klima-Monkey in Heilbronn: Klimatechnik, Montage und mehr. Jetzt in zwei Minuten online bewerben – Lebenslauf optional.",
  alternates: { canonical: "/karriere" },
};

export default function KarrierePage() {
  return (
    <>
      <section className="py-20 lg:py-28">
        <Container>
          <FadeIn sofort>
            <SectionHeading
              as="h1"
              eyebrow="Karriere"
              title="Werde ein Monkey"
              description="Wir bauen Klimaanlagen, Wärmepumpen und Photovoltaik in der Region Heilbronn und suchen Leute mit Bock auf Handwerk. Auch Quereinsteiger sind willkommen: Wir lernen dich ein. Bewerben geht hier in zwei Minuten, ein Lebenslauf ist kein Muss."
            />
          </FadeIn>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {stellen.map((stelle, index) => (
              <FadeIn key={stelle.slug} delay={(index % 2) * 0.05}>
                <Link
                  href={`/karriere/${stelle.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-border bg-background-card p-7 transition-all hover:-translate-y-1 hover:border-brand-primary"
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-brand-link">{stelle.art}</span>
                  <h2 className="mt-1.5 font-display text-xl font-semibold">{stelle.titel}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{stelle.kurz}</p>
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-foreground-muted">
                    {stelle.lohn && <span className="inline-flex items-center gap-1.5"><Euro className="h-3.5 w-3.5" />{lohnText(stelle)}</span>}
                    <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{stelle.ort}</span>
                    <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{stelle.beginn}</span>
                  </div>
                  <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-brand-link">
                    Stelle ansehen <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </FadeIn>
            ))}
            {stellen.length === 0 && (
              <div className="rounded-3xl border border-border bg-background-soft p-8 md:col-span-2">
                <h2 className="font-display text-xl font-semibold">Gerade keine Stelle ausgeschrieben</h2>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                  Melde dich trotzdem – gute Leute können wir immer brauchen.
                </p>
              </div>
            )}
          </div>
        </Container>
      </section>

      <section id="bewerben" className="scroll-mt-24 bg-background-soft/50 py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <FadeIn>
            <SectionHeading
              eyebrow="Bewerben"
              title="Keine perfekte Bewerbung nötig"
              description="Stelle wählen, Kontaktdaten eintragen, fertig. Wir melden uns in den nächsten Tagen bei dir, lernen uns kennen und schauen, ob es passt. Passt keine Stelle? Dann wähle „Initiativbewerbung“. Lieber anrufen? Auch gut."
            />
          </FadeIn>
          <FadeIn delay={0.1} className="min-w-0">
            <BewerbungFormular stellen={stellen.map((s) => s.titel)} />
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
