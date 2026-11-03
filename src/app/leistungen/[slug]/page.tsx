import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgePercent,
  Car,
  CheckCircle2,
  FileText,
  Handshake,
  ShieldCheck,
  TrendingDown,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceIcon } from "@/components/service-icon";
import { FadeIn } from "@/components/fade-in";
import { Faq } from "@/components/faq";
import { services, siteConfig } from "@/lib/site-config";
import { ratgeberFuer } from "@/lib/ratgeber";
import { standorte } from "@/lib/standorte";
import { referenzen } from "@/lib/referenzen";

const conditionIcons: Record<string, LucideIcon> = {
  TrendingDown,
  FileText,
  ShieldCheck,
  Handshake,
  BadgePercent,
  Car,
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/leistungen/${service.slug}` },
    openGraph: {
      title: `${service.metaTitle} | ${siteConfig.name}`,
      description: service.metaDescription,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const otherServices = services.filter((s) => s.slug !== slug);
  const artikel = ratgeberFuer(service.slug);
  const zeigeStandorte = service.slug === "klimaanlagen" || service.slug === "wartung-klimaanlagen";

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: `${service.title} | ${siteConfig.name}`,
    description: service.summary,
    provider: {
      "@type": "HVACBusiness",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: siteConfig.serviceArea,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <section className="py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <FadeIn>
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-link">
              <ServiceIcon name={service.icon} className="h-7 w-7" />
            </span>
            <h1 className="mt-6 text-balance font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              {service.title}
            </h1>
            <p className="mt-5 max-w-xl text-balance text-lg leading-relaxed text-foreground-muted">
              {service.heroText}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/kontakt" size="lg">
                Kostenlos anfragen
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/leistungen" variant="secondary" size="lg">
                Alle Leistungen
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="flex flex-col gap-6">
            {"image" in service && service.image && (
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-border">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(min-width: 1024px) 32rem, 90vw"
                  className="object-cover"
                />
              </div>
            )}
            <div className="rounded-3xl border border-border bg-background-card p-8">
              <h2 className="font-display text-lg font-semibold">Das ist inklusive</h2>
              <ul className="mt-5 flex flex-col gap-3.5">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm leading-relaxed">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-link" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </Container>
      </section>

      {"specialConditions" in service && service.specialConditions && (
        <section className="py-20 lg:py-28">
          <Container>
            <FadeIn>
              <SectionHeading
                eyebrow={service.specialConditions.eyebrow}
                title={service.specialConditions.title}
                description={service.specialConditions.intro}
                align="center"
                className="mx-auto"
              />
            </FadeIn>
            <div className="mt-12 grid gap-5 sm:grid-cols-3">
              {service.specialConditions.items.map((item, index) => {
                const Icon = conditionIcons[item.icon] ?? TrendingDown;
                return (
                  <FadeIn key={item.title} delay={index * 0.05}>
                    <div className="h-full rounded-3xl border border-border bg-background-card p-7">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-link">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="mt-4 font-semibold">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                        {item.text}
                      </p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {"faq" in service && service.faq && (
        <section className="bg-background-soft py-20 lg:py-28">
          <Container>
            <FadeIn>
              <SectionHeading
                eyebrow="Häufige Fragen"
                title={`Fragen zu ${service.shortTitle}`}
                align="center"
                className="mx-auto mb-12"
              />
            </FadeIn>
            <FadeIn delay={0.1}>
              <Faq items={[...service.faq]} />
            </FadeIn>
          </Container>
        </section>
      )}

      {artikel.length > 0 && (
        <section className="py-20 lg:py-28">
          <Container>
            <FadeIn>
              <SectionHeading
                eyebrow="Ratgeber"
                title={`Gut zu wissen: ${service.shortTitle}`}
              />
            </FadeIn>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {artikel.map((eintrag, index) => (
                <FadeIn key={eintrag.slug} delay={index * 0.05}>
                  <Link
                    href={`/leistungen/${service.slug}/${eintrag.slug}`}
                    className="group flex h-full flex-col rounded-3xl border border-border bg-background-card p-7 transition-all hover:-translate-y-1 hover:border-brand-primary"
                  >
                    <h3 className="font-semibold leading-snug">{eintrag.title}</h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-foreground-muted">
                      {eintrag.intro}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-brand-link">
                      Weiterlesen <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>
      )}

      {service.slug === "klimaanlagen" && (
        <section className="py-20 lg:py-28">
          <Container>
            <FadeIn className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                eyebrow="Referenzen"
                title="Aus unseren Projekten"
                description="Ein kleiner Ausschnitt aus unseren Projekten in der Region."
              />
              <Button href="/referenzen" variant="secondary">
                Alle Referenzen
                <ArrowRight className="h-4 w-4" />
              </Button>
            </FadeIn>
            <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {referenzen.slice(0, 4).map((referenz, index) => (
                <FadeIn key={referenz.bild} delay={index * 0.05}>
                  <figure className="overflow-hidden rounded-2xl border border-border bg-background-card">
                    <div className="relative aspect-[4/5] w-full">
                      <Image
                        src={referenz.bild}
                        alt={referenz.alt}
                        fill
                        sizes="(min-width: 1024px) 18rem, 45vw"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="px-4 py-3 text-sm">
                      <span className="font-medium">{referenz.titel}</span>
                      {referenz.ort && (
                        <span className="block text-xs text-foreground-muted">{referenz.ort}</span>
                      )}
                    </figcaption>
                  </figure>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>
      )}

      {zeigeStandorte && (
        <section className="bg-background-soft py-16 lg:py-20">
          <Container>
            <FadeIn>
              <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                {service.shortTitle} in Ihrer Region
              </h2>
              <div className="mt-6 flex flex-wrap gap-3">
                {standorte.map((standort) => (
                  <Link
                    key={standort.slug}
                    href={`/standorte/${standort.slug}`}
                    className="rounded-full border border-border bg-background-card px-4 py-2 text-sm font-medium transition-colors hover:border-brand-primary hover:text-brand-link"
                  >
                    Klimaanlagen {standort.ort}
                  </Link>
                ))}
              </div>
            </FadeIn>
          </Container>
        </section>
      )}

      <section className="py-20 lg:py-28">
        <Container>
          <FadeIn>
            <SectionHeading title="Weitere Leistungen" />
          </FadeIn>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {otherServices.map((other, index) => (
              <FadeIn key={other.slug} delay={index * 0.05}>
                <Link
                  href={`/leistungen/${other.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-background-card p-6 transition-all hover:-translate-y-1 hover:border-brand-primary"
                >
                  <ServiceIcon name={other.icon} className="h-5 w-5 text-brand-link" />
                  <span className="mt-3 font-semibold">{other.shortTitle}</span>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-link">
                    Ansehen <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
