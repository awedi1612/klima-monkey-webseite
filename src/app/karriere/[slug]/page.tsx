import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Briefcase, CheckCircle2, Clock, Euro, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/fade-in";
import { BewerbungFormular } from "@/components/bewerbung-formular";
import { siteConfig } from "@/lib/site-config";
import { lohnText, stelleFuer, stellen } from "@/lib/stellen";

export function generateStaticParams() {
  return stellen.map((s) => ({ slug: s.slug }));
}


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const stelle = stelleFuer(slug);
  if (!stelle) return {};
  const kurzTitel = stelle.titel.replace(/\s*\(m\/w\/d\)/, "");
  return {
    title: `Job: ${kurzTitel} in ${stelle.ort}`,
    description: `${kurzTitel} (m/w/d) bei Klima-Monkey in ${stelle.ort}${stelle.lohn ? `, ${lohnText(stelle)}` : ""}. Auch Quereinsteiger willkommen – in zwei Minuten bewerben.`,
    alternates: { canonical: `/karriere/${stelle.slug}` },
  };
}

const htmlListe = (eintraege: string[]) => `<ul>${eintraege.map((e) => `<li>${e}</li>`).join("")}</ul>`;

export default async function StellePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const stelle = stelleFuer(slug);
  if (!stelle) notFound();

  const [plz, ...stadt] = siteConfig.legal.zipCity.split(" ");
  // Google for Jobs: https://developers.google.com/search/docs/appearance/structured-data/job-posting
  const schema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: stelle.titel,
    description:
      stelle.einleitung.map((p) => `<p>${p}</p>`).join("") +
      `<h3>Deine Aufgaben</h3>${htmlListe(stelle.aufgaben)}` +
      `<h3>Das bringst du mit</h3>${htmlListe(stelle.profil)}` +
      (stelle.passtFuer ? htmlListe(stelle.passtFuer) : "") +
      `<h3>Das bekommst du bei uns</h3>${htmlListe(stelle.wirBieten)}`,
    datePosted: stelle.veroeffentlicht,
    employmentType: stelle.employmentType,
    directApply: true,
    hiringOrganization: { "@type": "Organization", name: siteConfig.name, sameAs: siteConfig.url, logo: `${siteConfig.url}/icon.png` },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.legal.street,
        postalCode: plz,
        addressLocality: stadt.join(" "),
        addressRegion: "Baden-Württemberg",
        addressCountry: "DE",
      },
    },
    ...(stelle.lohn && {
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "EUR",
        value: { "@type": "QuantitativeValue", minValue: stelle.lohn.min, maxValue: stelle.lohn.max, unitText: "HOUR" },
      },
    }),
    ...(stelle.wochenstunden && { workHours: `${stelle.wochenstunden} Stunden pro Woche` }),
  };

  const abschnitte = [
    { titel: "Deine Aufgaben", punkte: stelle.aufgaben },
    { titel: "Das bringst du mit", punkte: stelle.profil, zusatz: stelle.passtFuer },
    { titel: "Das bekommst du bei uns", punkte: stelle.wirBieten },
  ];

  const telefon = siteConfig.legal.mobile;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="min-w-0">
            <FadeIn sofort>
              <Link href="/karriere" className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground-muted hover:text-brand-link">
                <ArrowLeft className="h-4 w-4" /> Alle Stellen
              </Link>
              <p className="mt-6 text-sm font-semibold text-brand-link">Werde ein Klima-Monkey!</p>
              <h1 className="mt-2 text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl">{stelle.titel}</h1>
              <p className="mt-3 font-medium">Auch Quereinsteiger willkommen!</p>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground-muted">
                {stelle.lohn && <span className="inline-flex items-center gap-1.5"><Euro className="h-4 w-4 text-brand-link" />{lohnText(stelle)}</span>}
                <span className="inline-flex items-center gap-1.5"><Briefcase className="h-4 w-4 text-brand-link" />{stelle.art}</span>
                <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-brand-link" />{stelle.ort}</span>
                <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4 text-brand-link" />{stelle.beginn}</span>
              </div>
              <div className="mt-6 flex max-w-2xl flex-col gap-4 text-lg leading-relaxed text-foreground-muted">
                {stelle.einleitung.map((p) => <p key={p}>{p}</p>)}
              </div>
              <div className="mt-8 lg:hidden">
                <Button href="#bewerben" size="lg">Jetzt bewerben</Button>
              </div>
            </FadeIn>

            <div className="mt-12 flex flex-col gap-10">
              {abschnitte.map((a) => (
                <FadeIn key={a.titel}>
                  <h2 className="font-display text-2xl font-semibold tracking-tight">{a.titel}</h2>
                  <ul className="mt-5 flex flex-col gap-3">
                    {a.punkte.map((p) => (
                      <li key={p} className="flex items-start gap-3 leading-relaxed">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-brand-link" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  {a.zusatz && (
                    <div className="mt-6 flex flex-col gap-2 rounded-2xl bg-background-soft p-6 leading-relaxed">
                      {a.zusatz.map((z) => <p key={z}>{z}</p>)}
                    </div>
                  )}
                </FadeIn>
              ))}

              {stelle.warum && (
                <FadeIn>
                  <h2 className="font-display text-2xl font-semibold tracking-tight">Warum Klima-Monkey?</h2>
                  <div className="mt-5 flex flex-col gap-3 leading-relaxed text-foreground-muted">
                    {stelle.warum.map((w) => <p key={w}>{w}</p>)}
                  </div>
                </FadeIn>
              )}

              {stelle.schluss && (
                <FadeIn>
                  <p className="rounded-3xl bg-brand-dark p-8 font-display text-xl font-semibold leading-snug text-white sm:text-2xl">
                    <span className="text-brand-primary">Klima-Monkey –</span> {stelle.schluss}
                  </p>
                </FadeIn>
              )}
            </div>
          </div>

          <div id="bewerben" className="min-w-0 scroll-mt-24 lg:sticky lg:top-24 lg:self-start">
            <FadeIn delay={0.1}>
              <h2 className="font-display text-2xl font-semibold tracking-tight">Klingt gut? Dann lass von dir hören!</h2>
              <p className="mb-5 mt-2 text-sm leading-relaxed text-foreground-muted">
                Keine perfekte Bewerbung nötig. Formular ausfüllen oder einfach anrufen:{" "}
                <a href={`tel:${telefon.replace(/\s+/g, "")}`} className="inline-flex items-center gap-1 font-semibold text-brand-link">
                  <Phone className="h-3.5 w-3.5" />{telefon}
                </a>
              </p>
              <BewerbungFormular stellen={stellen.map((s) => s.titel)} vorauswahl={stelle.titel} />
            </FadeIn>
          </div>
        </Container>
      </section>
    </>
  );
}
