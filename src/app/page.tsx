import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Handshake,
  Sparkles,
  Wrench,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceIcon } from "@/components/service-icon";
import { FadeIn } from "@/components/fade-in";
import { Faq } from "@/components/faq";
import { GoogleReviews } from "@/components/google-reviews";
import { GoogleConsentGate } from "@/components/google-consent-gate";
import { Newsletter } from "@/components/newsletter";
import { services, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `${siteConfig.name} – ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

const benefits = [
  {
    title: "Individuelle Angebote",
    description: "Jedes Projekt beginnt mit einer ehrlichen Bedarfsanalyse statt Standardlösung.",
  },
  {
    title: "Fachkundige Beratung",
    description: "Zertifizierte Kältetechniker beraten Sie zu Technik, Kosten und Förderung.",
  },
  {
    title: "Wartung & Reparatur",
    description: "Regelmäßiger Service hält Ihre Anlage effizient und langlebig.",
  },
  {
    title: "Finanzierung & Förderung",
    description: "Wir prüfen Förderprogramme und finden passende Finanzierungsmodelle.",
  },
  {
    title: "Schlüsselfertige Umsetzung",
    description: "Von der ersten Beratung bis zur Inbetriebnahme – alles aus einer Hand.",
  },
  {
    title: "Regionale Nähe",
    description: "Als lokaler Partner in Heilbronn sind wir schnell vor Ort.",
  },
];

const process = [
  {
    icon: Handshake,
    title: "Kostenlose Beratung",
    description: "Wir hören zu, analysieren Ihren Bedarf und beraten unverbindlich.",
  },
  {
    icon: ClipboardCheck,
    title: "Planung & Angebot",
    description: "Sie erhalten ein transparentes Angebot inkl. möglicher Förderungen.",
  },
  {
    icon: Wrench,
    title: "Professionelle Installation",
    description: "Zertifizierte Techniker setzen Ihr Projekt fachgerecht um.",
  },
  {
    icon: Sparkles,
    title: "Service & Wartung",
    description: "Wir begleiten Sie auch nach der Installation langfristig.",
  },
];

const faqItems = [
  {
    question: "Bietet Klima-Monkey auch Wartung und Reparatur an?",
    answer:
      "Ja, Verkauf, Installation, Wartung und Reparatur bilden gemeinsam unser Kerngeschäft. Wir betreuen Ihre Klimaanlage über die gesamte Lebensdauer.",
  },
  {
    question: "Kann ich bei Klima-Monkey eine Klimaanlage auch mieten statt kaufen?",
    answer:
      "Ja. Für Bürocontainer, Schulcontainer und andere temporäre Gebäude bieten wir Klimaanlagen zur Langzeitmiete an – inklusive Installation, Wartung und Rückbau am Ende der Mietzeit.",
  },
  {
    question: "In welchen Regionen ist Klima-Monkey tätig?",
    answer:
      "Klima-Monkey ist in Heilbronn und der gesamten Region Heilbronn-Franken tätig, u. a. in Neckarsulm, Bad Friedrichshall, Bad Rappenau und Lauffen am Neckar.",
  },
  {
    question: "Welche Marken installiert Klima-Monkey?",
    answer:
      "Wir arbeiten mit etablierten Premium-Marken wie Bosch Climate, Mitsubishi Heavy Industries und Daikin zusammen und wählen je nach Projekt die passenden Komponenten aus.",
  },
  {
    question: "Wie lange dauert die Installation einer Klimaanlage?",
    answer:
      "Die reine Montage einer Split-Klimaanlage ist häufig an einem Tag abgeschlossen. Die genaue Dauer hängt vom Projektumfang ab und wird im Rahmen der Beratung besprochen.",
  },
  {
    question: "Gibt es Förderungen für Klimaanlagen?",
    answer:
      "Je nach Projektart kommen unter anderem BAFA- und KfW-Förderungen infrage. Wir prüfen für jedes Projekt individuell, welche Förderungen aktuell möglich sind, und unterstützen bei der Antragstellung.",
  },
];

const featuredServices = services.filter((service) => "featured" in service && service.featured);
const secondaryServices = services.filter((service) => !("featured" in service && service.featured));

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 right-[-10%] h-[36rem] w-[36rem] rounded-full bg-brand-primary/20 blur-[120px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-10rem] left-[-10%] h-[28rem] w-[28rem] rounded-full bg-brand-secondary/20 blur-[120px]"
        />
        <Container className="relative grid gap-12 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
          <FadeIn>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background-card px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-foreground-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
              Klimaanlagen · Heilbronn
            </span>
            <h1 className="mt-6 text-balance font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Ihr Klima ist{" "}
              <span className="text-brand-link">unsere Mission</span>
            </h1>
            <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-foreground-muted">
              Verkauf, Installation, Wartung und Reparatur von Klimaanlagen –
              plus Langzeitmiete für Büro- und Schulcontainer. Ihr zuverlässiger
              Partner für angenehmes Klima in Heilbronn.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/kontakt" size="lg">
                Kostenlos anfragen
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/leistungen/klimaanlagen" variant="secondary" size="lg">
                Klimaanlagen entdecken
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-foreground-muted">
              {["Kostenlose Erstberatung", "Zertifizierte Techniker", "Auch zur Langzeitmiete"].map(
                (item) => (
                  <span key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand-link" />
                    {item}
                  </span>
                )
              )}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-background-card px-4 py-3 w-fit">
              <span className="rounded-lg bg-white px-3 py-1.5">
                <Image
                  src="/images/bosch-partner-logo.png"
                  alt="Bosch Partner"
                  width={140}
                  height={30}
                  className="h-5 w-auto object-contain"
                />
              </span>
              <span className="h-5 w-px bg-border" aria-hidden="true" />
              <span className="rounded-lg bg-white px-3 py-1.5">
                <Image
                  src="/images/mitsubishi-heavy-industries-logo.png"
                  alt="Mitsubishi Heavy Industries"
                  width={140}
                  height={37}
                  className="h-5 w-auto object-contain"
                />
              </span>
              <span className="h-5 w-px bg-border" aria-hidden="true" />
              <span className="rounded-lg bg-white px-3 py-1.5">
                <Image
                  src="/images/daikin-logo.png"
                  alt="Daikin"
                  width={140}
                  height={30}
                  className="h-5 w-auto object-contain"
                />
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <div className="absolute inset-0 overflow-hidden rounded-[2.5rem] shadow-lg">
                <Image
                  src="/images/klimaanlage-hero.jpg"
                  alt="Moderne Klimaanlage, installiert von Klima-Monkey"
                  fill
                  priority
                  sizes="(min-width: 1024px) 28rem, 90vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-brand-dark/0 to-transparent" />
              </div>
              <div className="absolute inset-x-6 bottom-6 rounded-2xl bg-background-card p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-primary text-brand-dark">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-foreground">Klimaanlagen von Klima-Monkey</p>
                    <p className="text-xs text-foreground-muted">
                      Verkauf · Installation · Wartung · Reparatur
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Services */}
      <section className="py-20 lg:py-28" id="leistungen-uebersicht">
        <Container>
          <FadeIn>
            <SectionHeading
              eyebrow="Unser Kerngeschäft"
              title="Klimaanlagen – Verkauf, Installation, Wartung, Reparatur"
              description="Ob Kauf oder Langzeitmiete für Bürocontainer und Schulcontainer: Wir begleiten Ihr Projekt von der Beratung bis zum laufenden Betrieb."
            />
          </FadeIn>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {featuredServices.map((service, index) => (
              <FadeIn key={service.slug} delay={index * 0.05}>
                <Link
                  href={`/leistungen/${service.slug}`}
                  className="group relative flex h-full min-h-[19rem] flex-col overflow-hidden rounded-3xl border border-border bg-background-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary hover:shadow-xl"
                >
                  {"image" in service && service.image && (
                    <div className="absolute inset-0">
                      <Image
                        src={service.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover opacity-15 transition-opacity duration-300 group-hover:opacity-25"
                      />
                    </div>
                  )}
                  <div className="relative flex h-full flex-col">
                    <div className="flex items-center gap-3">
                      <ServiceIcon name={service.icon} className="h-7 w-7 shrink-0 text-brand-link" />
                      <h3 className="font-display text-2xl font-bold">{service.title}</h3>
                    </div>
                    <p className="mt-3 flex-1 max-w-md text-sm leading-relaxed text-foreground-muted">
                      {service.summary}
                    </p>
                    <span className="mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-brand-link">
                      Mehr erfahren
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.15} className="mt-14">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground-muted">
              Weitere Leistungen
            </h3>
          </FadeIn>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {secondaryServices.map((service, index) => (
              <FadeIn key={service.slug} delay={index * 0.05}>
                <Link
                  href={`/leistungen/${service.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary"
                >
                  {"image" in service && service.image && (
                    <div className="absolute inset-0">
                      <Image
                        src={service.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 25vw, 50vw"
                        className="object-cover opacity-10 transition-opacity duration-300 group-hover:opacity-20"
                      />
                    </div>
                  )}
                  <div className="relative flex h-full flex-col">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-link">
                      <ServiceIcon name={service.icon} className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-semibold">{service.title}</h3>
                    <p className="mt-1.5 flex-1 text-xs leading-relaxed text-foreground-muted">
                      {service.summary}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-link">
                      Ansehen
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="bg-background-soft py-20 lg:py-28">
        <Container>
          <FadeIn>
            <SectionHeading
              eyebrow="Warum Klima-Monkey"
              title="Darauf können Sie sich verlassen"
              align="center"
              className="mx-auto"
            />
          </FadeIn>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <FadeIn key={benefit.title} delay={index * 0.05}>
                <div className="h-full rounded-3xl border border-border bg-background-card p-7">
                  <CheckCircle2 className="h-6 w-6 text-brand-link" />
                  <h3 className="mt-4 font-semibold">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                    {benefit.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="py-20 lg:py-28">
        <Container>
          <FadeIn>
            <SectionHeading
              eyebrow="Ablauf"
              title="So einfach geht's"
              description="Vier Schritte von der ersten Idee bis zum fertig installierten System."
            />
          </FadeIn>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, index) => (
              <FadeIn key={step.title} delay={index * 0.05} className="relative">
                <div aria-hidden="true" className="text-5xl font-display font-bold text-foreground-muted/25">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <span className="mt-3 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-link">
                  <step.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                  {step.description}
                </p>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Google Reviews */}
      <section className="bg-background-soft py-20 lg:py-28">
        <Container>
          <FadeIn>
            <SectionHeading
              eyebrow="Kundenstimmen"
              title="Das sagen unsere Kunden"
              align="center"
              className="mx-auto mb-12"
            />
          </FadeIn>
          <GoogleConsentGate label="Die Google-Bewertungen">
            <GoogleReviews />
          </GoogleConsentGate>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28">
        <Container>
          <FadeIn>
            <SectionHeading
              eyebrow="Häufige Fragen"
              title="Gut zu wissen"
              align="center"
              className="mx-auto mb-12"
            />
          </FadeIn>
          <FadeIn delay={0.1}>
            <Faq items={faqItems} />
          </FadeIn>
        </Container>
      </section>

      {/* Game teaser */}
      <section className="pb-10 lg:pb-28">
        <Container>
          <FadeIn>
            <Link
              href="/spiel"
              className="group flex flex-col items-center justify-between gap-5 rounded-3xl border border-border bg-background-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-primary sm:flex-row sm:p-8"
            >
              <div className="flex items-center gap-4">
                <span className="text-4xl">🐒</span>
                <div>
                  <p className="font-display text-lg font-bold">Kleine Pause? Spiel Monkey Catch</p>
                  <p className="text-sm text-foreground-muted">
                    Fang Schneeflocken &amp; Kokosnüsse, weich der Hitze aus – 45 Sekunden Spaß.
                  </p>
                </div>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-brand-primary px-5 py-2.5 text-sm font-semibold text-brand-dark">
                Jetzt spielen
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </FadeIn>
        </Container>
      </section>

      {/* Newsletter */}
      <section className="pt-10 pb-20 lg:pt-0 lg:pb-28">
        <Container>
          <FadeIn>
            <Newsletter />
          </FadeIn>
        </Container>
      </section>

      {/* CTA */}
      <section className="pt-10 pb-20 lg:py-28">
        <Container>
          <FadeIn>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-dark px-8 py-16 text-center sm:px-16">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-primary/30 blur-[100px]"
              />
              <div className="relative">
                <h2 className="text-balance font-display text-3xl font-bold text-white sm:text-4xl">
                  Bereit für Ihr optimales Wohlfühlklima?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-balance text-white/70">
                  Kontaktieren Sie uns für eine unverbindliche Beratung und Ihr
                  individuelles Angebot.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <Button href="/kontakt" size="lg">
                    Kostenlos anfragen
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
