import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/fade-in";
import { standorte } from "@/lib/standorte";

export const metadata: Metadata = {
  title: "Standorte – Klimaanlagen in Heilbronn und Umgebung",
  description:
    "Klima-Monkey installiert und wartet Klimaanlagen in Heilbronn, Neckarsulm, Flein, Ludwigsburg und Chemnitz. Finden Sie Ihren Standort.",
  alternates: { canonical: "/standorte" },
};

export default function StandortePage() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <FadeIn>
          <SectionHeading
            as="h1"
            eyebrow="Standorte"
            title="Klimaanlagen in Ihrer Region"
            description="Von unserem Betrieb in Heilbronn aus beraten, montieren und warten wir Klimaanlagen in der ganzen Region – und darüber hinaus."
          />
        </FadeIn>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {standorte.map((standort, index) => (
            <FadeIn key={standort.slug} delay={index * 0.05}>
              <Link
                href={`/standorte/${standort.slug}`}
                className="group flex h-full flex-col rounded-3xl border border-border bg-background-card p-7 transition-all hover:-translate-y-1 hover:border-brand-primary"
              >
                <MapPin className="h-5 w-5 text-brand-link" />
                <h2 className="mt-4 font-display text-xl font-semibold">
                  Klimaanlagen {standort.ort}
                </h2>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-foreground-muted">
                  {standort.intro}
                </p>
                <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-brand-link">
                  Ansehen <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
