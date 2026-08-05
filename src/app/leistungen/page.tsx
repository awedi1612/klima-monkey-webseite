import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceIcon } from "@/components/service-icon";
import { FadeIn } from "@/components/fade-in";
import { services } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Leistungen",
  description:
    "Klimaanlagen, Photovoltaik, Stromspeicher, Finanzierung und Förderung – alle Leistungen von Klima-Monkey in Heilbronn auf einen Blick.",
};

export default function LeistungenPage() {
  return (
    <>
      <section className="py-20 lg:py-28">
        <Container>
          <FadeIn>
            <SectionHeading
              eyebrow="Leistungen"
              title="Klimatechnik & Energie – ganzheitlich gedacht"
              description="Ob Klimaanlage, Wärmepumpe, Photovoltaik oder Stromspeicher: Wir planen, installieren, finanzieren und warten – abgestimmt auf Ihr Zuhause oder Ihr Gewerbe."
            />
          </FadeIn>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {services.map((service, index) => (
              <FadeIn key={service.slug} delay={index * 0.05}>
                <Link
                  href={`/leistungen/${service.slug}`}
                  className="group flex h-full flex-col gap-5 rounded-3xl border border-border bg-background-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary hover:shadow-xl sm:flex-row sm:items-start"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary">
                    <ServiceIcon name={service.icon} className="h-7 w-7" />
                  </span>
                  <div>
                    <h2 className="font-display text-xl font-bold">{service.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                      {service.summary}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary">
                      Details ansehen
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-background-soft py-20 lg:py-28">
        <Container>
          <FadeIn className="text-center">
            <h2 className="mx-auto max-w-xl text-balance font-display text-3xl font-bold sm:text-4xl">
              Nicht sicher, was zu Ihnen passt?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-foreground-muted">
              In einer kostenlosen Erstberatung finden wir gemeinsam die passende Lösung
              für Ihr Zuhause oder Ihr Unternehmen.
            </p>
            <div className="mt-8 flex justify-center">
              <Button href="/kontakt" size="lg">
                Kostenlos anfragen
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
