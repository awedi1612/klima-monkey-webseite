import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/fade-in";
import { referenzen } from "@/lib/referenzen";

export const metadata: Metadata = {
  title: "Referenzen – Klimaanlagen aus unseren Projekten",
  description:
    "Echte Montagefotos von Klima-Monkey: ein kleiner Ausschnitt aus unseren Projekten in Heilbronn, Neckarsulm, Eppingen, Flein und Umgebung.",
  alternates: { canonical: "/referenzen" },
};

export default function ReferenzenPage() {
  return (
    <>
      <section className="py-20 lg:py-28">
        <Container>
          <FadeIn>
            <SectionHeading
              as="h1"
              eyebrow="Referenzen"
              title="Ein paar Klimaanlagen aus unseren Projekten"
              description="Ein kleiner Ausschnitt aus unserer Arbeit in der Region. Keine Katalogbilder, sondern echte Anlagen: sauber montiert, Leitungen ordentlich geführt, Außengeräte dort, wo sie nicht stören."
            />
          </FadeIn>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {referenzen.map((referenz, index) => (
              <FadeIn key={referenz.bild} delay={(index % 3) * 0.05}>
                <figure className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-background-card">
                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src={referenz.bild}
                      alt={referenz.alt}
                      fill
                      sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 90vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="p-6">
                    <span className="text-xs font-semibold uppercase tracking-wide text-brand-link">
                      {referenz.art}
                      {referenz.ort && <span className="text-foreground-muted"> · {referenz.ort}</span>}
                    </span>
                    <h2 className="mt-1.5 font-semibold">{referenz.titel}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                      {referenz.text}
                    </p>
                  </figcaption>
                </figure>
              </FadeIn>
            ))}
            {/* Kasten füllt die letzte Reihe im 3er-Raster: 2 freie Felder → 2 Spalten, sonst 1 */}
            <FadeIn
              delay={0.1}
              className={referenzen.length % 3 === 1 ? "sm:col-span-1 lg:col-span-2" : "sm:col-span-1"}
            >
              <div className="flex h-full flex-col justify-center rounded-3xl bg-background-soft p-8 sm:p-10">
                <h2 className="text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                  So eine Anlage für Ihr Zuhause?
                </h2>
                <p className="mt-4 max-w-md leading-relaxed text-foreground-muted">
                  Wir kommen kostenlos vorbei, schauen uns die Räume an und schlagen Ihnen
                  Gerät und Aufstellort vor.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="/kontakt" size="lg">
                    Kostenlos anfragen
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button href="/leistungen/klimaanlagen/klimaanlage-kosten" variant="secondary" size="lg">
                    Was kostet das?
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

    </>
  );
}
