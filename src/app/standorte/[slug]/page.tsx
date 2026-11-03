import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, MapPin, Phone } from "lucide-react";
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

export const dynamicParams = false;

const passendeLeistungen = ["klimaanlagen", "wartung-klimaanlagen", "lueftung", "photovoltaik"];

export function generateStaticParams() {
  return standorte.map((standort) => ({ slug: standort.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const standort = standorte.find((s) => s.slug === slug);
  if (!standort) return {};

  return {
    title: standort.metaTitle,
    description: standort.metaDescription,
    alternates: { canonical: `/standorte/${standort.slug}` },
    openGraph: {
      title: `${standort.metaTitle} | ${siteConfig.name}`,
      description: standort.metaDescription,
    },
  };
}

export default async function StandortPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const standort = standorte.find((s) => s.slug === slug);
  if (!standort) notFound();

  const leistungen = services.filter((s) => passendeLeistungen.includes(s.slug));
  const artikel = ratgeberFuer("klimaanlagen");
  const andere = standorte.filter((s) => s.slug !== slug);
  const projekte = referenzen.filter((r) => r.standort === slug);
  const url = `${siteConfig.url}/standorte/${standort.slug}`;
  const telefon = siteConfig.legal.phone.replace(/\s+/g, "");

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Klimaanlagen Verkauf, Installation und Wartung",
      name: standort.title,
      description: standort.metaDescription,
      url,
      provider: {
        "@type": "HVACBusiness",
        name: siteConfig.name,
        url: siteConfig.url,
        telephone: siteConfig.legal.phone,
      },
      areaServed: { "@type": "City", name: standort.ort },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Start", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: "Standorte", item: `${siteConfig.url}/standorte` },
        { "@type": "ListItem", position: 3, name: standort.ort, item: url },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="py-16 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <FadeIn>
            <nav aria-label="Brotkrümel" className="flex items-center gap-1 text-sm text-foreground-muted">
              <Link href="/standorte" className="hover:text-brand-link">
                Standorte
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span>{standort.ort}</span>
            </nav>
            <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
              {standort.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground-muted">
              {standort.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/kontakt" size="lg">
                Kostenlos anfragen
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href={`tel:${telefon}`} variant="secondary" size="lg">
                <Phone className="h-4 w-4" />
                {siteConfig.legal.phone}
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-border">
              <Image
                src="/images/klimaanlage-hero.jpg"
                alt={`Klimaanlage – Montage in ${standort.ort}`}
                fill
                sizes="(min-width: 1024px) 32rem, 90vw"
                className="object-cover"
              />
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="pb-20 lg:pb-28">
        <Container className="grid gap-10 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="flex flex-col gap-10">
            {standort.abschnitte.map((abschnitt) => (
              <FadeIn key={abschnitt.heading}>
                <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                  {abschnitt.heading}
                </h2>
                <p className="mt-4 max-w-2xl leading-relaxed text-foreground-muted">{abschnitt.text}</p>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.1}>
            <aside className="rounded-3xl border border-border bg-background-card p-7">
              <h2 className="flex items-center gap-2 font-semibold">
                <MapPin className="h-4 w-4 text-brand-link" />
                Hier sind wir im Einsatz
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {standort.umgebung.map((ort) => (
                  <li
                    key={ort}
                    className="rounded-full bg-background-soft px-3 py-1.5 text-sm text-foreground-muted"
                  >
                    {ort}
                  </li>
                ))}
              </ul>
            </aside>
          </FadeIn>
        </Container>
      </section>

      {projekte.length > 0 && (
        <section className="pb-20 lg:pb-28">
          <Container>
            <FadeIn className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                eyebrow="Referenzen"
                title={`Projekte aus ${standort.ort} und Umgebung`}
                description="Ein kleiner Ausschnitt aus unseren Projekten in der Region."
              />
              <Button href="/referenzen" variant="secondary">
                Alle Referenzen
                <ArrowRight className="h-4 w-4" />
              </Button>
            </FadeIn>
            <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {projekte.map((referenz, index) => (
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

      <section className="bg-background-soft py-20 lg:py-28">
        <Container>
          <FadeIn>
            <SectionHeading
              eyebrow={`Leistungen in ${standort.ort}`}
              title="Was wir für Sie übernehmen"
            />
          </FadeIn>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {leistungen.map((leistung, index) => (
              <FadeIn key={leistung.slug} delay={index * 0.05}>
                <Link
                  href={`/leistungen/${leistung.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-background-card p-6 transition-all hover:-translate-y-1 hover:border-brand-primary"
                >
                  <ServiceIcon name={leistung.icon} className="h-5 w-5 text-brand-link" />
                  <span className="mt-3 font-semibold">{leistung.shortTitle}</span>
                  <span className="mt-2 text-sm leading-relaxed text-foreground-muted">
                    {leistung.summary}
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>
          {artikel.length > 0 && (
            <FadeIn className="mt-10">
              <div className="text-sm font-semibold">Ratgeber</div>
              <div className="mt-3 flex flex-wrap gap-3">
                {artikel.map((eintrag) => (
                  <Link
                    key={eintrag.slug}
                    href={`/leistungen/${eintrag.parent}/${eintrag.slug}`}
                    className="rounded-full border border-border bg-background-card px-4 py-2 text-sm font-medium transition-colors hover:border-brand-primary hover:text-brand-link"
                  >
                    {eintrag.linkLabel}
                  </Link>
                ))}
              </div>
            </FadeIn>
          )}
        </Container>
      </section>

      <section className="py-20 lg:py-28">
        <Container>
          <FadeIn>
            <SectionHeading
              eyebrow="Häufige Fragen"
              title={`Klimaanlage in ${standort.ort}`}
              align="center"
              className="mx-auto mb-12"
            />
          </FadeIn>
          <FadeIn delay={0.1}>
            <Faq items={standort.faq} />
          </FadeIn>
        </Container>
      </section>

      <section className="border-t border-border py-14">
        <Container>
          <div className="text-sm font-semibold">Weitere Standorte</div>
          <div className="mt-3 flex flex-wrap gap-3">
            {andere.map((s) => (
              <Link
                key={s.slug}
                href={`/standorte/${s.slug}`}
                className="rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-brand-primary hover:text-brand-link"
              >
                Klimaanlagen {s.ort}
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
