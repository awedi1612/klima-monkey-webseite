import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/fade-in";
import { Faq } from "@/components/faq";
import { services, siteConfig } from "@/lib/site-config";
import { ratgeber, ratgeberFuer } from "@/lib/ratgeber";

export const dynamicParams = false;

export function generateStaticParams() {
  return ratgeber.map((artikel) => ({ slug: artikel.parent, thema: artikel.slug }));
}

function finde(slug: string, thema: string) {
  const artikel = ratgeber.find((a) => a.parent === slug && a.slug === thema);
  const service = services.find((s) => s.slug === slug);
  if (!artikel || !service) return null;
  return { artikel, service };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; thema: string }>;
}): Promise<Metadata> {
  const { slug, thema } = await params;
  const treffer = finde(slug, thema);
  if (!treffer) return {};
  const { artikel } = treffer;

  return {
    title: artikel.metaTitle,
    description: artikel.metaDescription,
    alternates: { canonical: `/leistungen/${slug}/${artikel.slug}` },
    openGraph: {
      type: "article",
      title: `${artikel.metaTitle} | ${siteConfig.name}`,
      description: artikel.metaDescription,
    },
  };
}

export default async function RatgeberPage({
  params,
}: {
  params: Promise<{ slug: string; thema: string }>;
}) {
  const { slug, thema } = await params;
  const treffer = finde(slug, thema);
  if (!treffer) notFound();
  const { artikel, service } = treffer;

  const url = `${siteConfig.url}/leistungen/${service.slug}/${artikel.slug}`;
  const weitere = ratgeberFuer(service.slug).filter((a) => a.slug !== artikel.slug);
  const preisbeispiele = artikel.preisbeispiele ?? [];

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: artikel.title,
      description: artikel.metaDescription,
      url,
      inLanguage: "de-DE",
      author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
      publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Start", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: "Leistungen", item: `${siteConfig.url}/leistungen` },
        {
          "@type": "ListItem",
          position: 3,
          name: service.shortTitle,
          item: `${siteConfig.url}/leistungen/${service.slug}`,
        },
        { "@type": "ListItem", position: 4, name: artikel.linkLabel, item: url },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <article>
        <section className="pt-16 pb-12 lg:pt-24">
          <Container className="max-w-3xl">
            <FadeIn>
              <nav aria-label="Brotkrümel" className="flex flex-wrap items-center gap-1 text-sm text-foreground-muted">
                <Link href="/leistungen" className="hover:text-brand-link">
                  Leistungen
                </Link>
                <ChevronRight className="h-3.5 w-3.5" />
                <Link href={`/leistungen/${service.slug}`} className="hover:text-brand-link">
                  {service.shortTitle}
                </Link>
              </nav>
              <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
                {artikel.title}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-foreground-muted sm:text-xl">
                {artikel.intro}
              </p>
            </FadeIn>
          </Container>
        </section>

        <section className="pb-16 lg:pb-24">
          <Container className="flex max-w-3xl flex-col gap-12">
            {artikel.sections.map((abschnitt) => (
              <FadeIn key={abschnitt.heading}>
                <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                  {abschnitt.heading}
                </h2>
                {abschnitt.paragraphs.map((absatz) => (
                  <p key={absatz.slice(0, 40)} className="mt-4 leading-relaxed text-foreground-muted">
                    {absatz}
                  </p>
                ))}
                {abschnitt.bullets && (
                  <ul className="mt-5 flex flex-col gap-3">
                    {abschnitt.bullets.map((punkt) => (
                      <li key={punkt} className="flex items-start gap-3 leading-relaxed">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-brand-link" />
                        {punkt}
                      </li>
                    ))}
                  </ul>
                )}
              </FadeIn>
            ))}

            {preisbeispiele.length > 0 && (
              <FadeIn>
                <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                  Preisbeispiele
                </h2>
                <div className="mt-5 overflow-x-auto rounded-2xl border border-border">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-background-soft">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Anlage</th>
                        <th className="px-4 py-3 font-semibold">Umfang</th>
                        <th className="px-4 py-3 font-semibold">Preis</th>
                      </tr>
                    </thead>
                    <tbody>
                      {preisbeispiele.map((zeile) => (
                        <tr key={zeile.anlage} className="border-t border-border">
                          <td className="px-4 py-3">{zeile.anlage}</td>
                          <td className="px-4 py-3 text-foreground-muted">{zeile.umfang}</td>
                          <td className="px-4 py-3 font-semibold whitespace-nowrap">{zeile.preis}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-xs text-foreground-muted">
                  Richtwerte inkl. MwSt. Den verbindlichen Preis nennen wir nach der Besichtigung.
                </p>
              </FadeIn>
            )}

            <FadeIn>
              <div className="rounded-3xl border border-border bg-background-card p-8">
                <h2 className="font-display text-xl font-semibold">Persönliche Beratung</h2>
                <p className="mt-3 leading-relaxed text-foreground-muted">
                  Wir kommen kostenlos zu Ihnen, sehen uns die Räume an und schicken Ihnen ein
                  verbindliches Angebot.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href="/kontakt" size="lg">
                    Kostenlos anfragen
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button href={`/leistungen/${service.slug}`} variant="secondary" size="lg">
                    Zu {service.shortTitle}
                  </Button>
                </div>
              </div>
            </FadeIn>
          </Container>
        </section>
      </article>

      <section className="bg-background-soft py-20 lg:py-28">
        <Container>
          <FadeIn>
            <SectionHeading
              eyebrow="Häufige Fragen"
              title={`Fragen zu: ${artikel.linkLabel}`}
              align="center"
              className="mx-auto mb-12"
            />
          </FadeIn>
          <FadeIn delay={0.1}>
            <Faq items={artikel.faq} />
          </FadeIn>
        </Container>
      </section>

      {weitere.length > 0 && (
        <section className="py-20 lg:py-24">
          <Container>
            <FadeIn>
              <SectionHeading title="Weitere Ratgeber" />
            </FadeIn>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {weitere.map((eintrag) => (
                <Link
                  key={eintrag.slug}
                  href={`/leistungen/${service.slug}/${eintrag.slug}`}
                  className="group flex flex-col rounded-3xl border border-border bg-background-card p-7 transition-all hover:-translate-y-1 hover:border-brand-primary"
                >
                  <span className="font-semibold leading-snug">{eintrag.title}</span>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-link">
                    Weiterlesen <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
