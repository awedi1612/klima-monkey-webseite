import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Leaf, ShieldCheck, Target, Users } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/fade-in";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "Klima-Monkey ist Ihr regionaler Partner für Klimatechnik und Energie in Heilbronn – erfahren Sie mehr über unsere Mission und Werte.",
};

const values = [
  {
    icon: Target,
    title: "Klarheit statt Verkaufsdruck",
    description:
      "Wir beraten ehrlich – auch wenn das bedeutet, von einer Lösung abzuraten, die nicht zu Ihnen passt.",
  },
  {
    icon: ShieldCheck,
    title: "Qualität, die bleibt",
    description:
      "Premium-Markengeräte und fachgerechte Montage sorgen für Langlebigkeit statt Nachbesserung.",
  },
  {
    icon: Leaf,
    title: "Nachhaltig gedacht",
    description:
      "Klimatechnik, Wärmepumpen und Photovoltaik – wir denken Energieeffizienz konsequent mit.",
  },
  {
    icon: Users,
    title: "Regional verwurzelt",
    description: "Als Team aus Heilbronn kennen wir die Region und sind schnell bei Ihnen vor Ort.",
  },
];

export default function UeberUnsPage() {
  return (
    <>
      <section className="py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <FadeIn>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background-card px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-foreground-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
              Über uns
            </span>
            <h1 className="mt-6 text-balance font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Klimatechnik mit Kopf, Herz und Werkzeug
            </h1>
            <p className="mt-6 text-balance text-lg leading-relaxed text-foreground-muted">
              Klima-Monkey wurde mit einem klaren Ziel gegründet: Menschen und
              Unternehmen in der Region Heilbronn zu einem angenehmen Raumklima
              und nachhaltiger Energieversorgung zu verhelfen – unkompliziert,
              fachkundig und persönlich.
            </p>
            <p className="mt-4 text-balance leading-relaxed text-foreground-muted">
              Als Bosch-Partner setzen wir auf bewährte Technik und ein Team,
              das Klimaanlagen, Wärmepumpen, Photovoltaik und Stromspeicher aus
              einer Hand plant, installiert und wartet.
            </p>
            <div className="mt-8">
              <Button href="/kontakt" size="lg">
                Lernen Sie uns kennen
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="relative aspect-[4/5] w-full max-w-md justify-self-center overflow-hidden rounded-[2.5rem] border border-border">
              <Image
                src="/images/waermepumpe.jpg"
                alt="Wärmepumpen-Installation von Klima-Monkey"
                fill
                sizes="(min-width: 1024px) 28rem, 90vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-8 text-center text-white">
                <p className="font-display text-xl font-bold">Das Klima-Monkey Team</p>
                <p className="text-sm text-white/75">
                  Zertifizierte Techniker & persönliche Beratung aus Heilbronn.
                </p>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="bg-background-soft py-20 lg:py-28">
        <Container>
          <FadeIn>
            <SectionHeading
              eyebrow="Unsere Werte"
              title="Wofür wir stehen"
              align="center"
              className="mx-auto"
            />
          </FadeIn>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <FadeIn key={value.title} delay={index * 0.05}>
                <div className="h-full rounded-3xl border border-border bg-background-card p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                    <value.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-semibold">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                    {value.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 lg:py-28">
        <Container>
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance font-display text-3xl font-bold sm:text-4xl">
              Lernen Sie das Team persönlich kennen
            </h2>
            <p className="mt-4 text-foreground-muted">
              Hinter Klima-Monkey stehen echte Menschen mit echter Expertise.
            </p>
            <div className="mt-8 flex justify-center">
              <Button href="/monkeys" variant="secondary" size="lg">
                Zu den Monkeys
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
