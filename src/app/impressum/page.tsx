import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false, follow: true },
};

export default function ImpressumPage() {
  const { legal } = siteConfig;

  return (
    <section className="py-20 lg:py-28">
      <Container className="max-w-3xl">
        <h1 className="font-display text-4xl font-bold tracking-tight">Impressum</h1>

        <div className="mt-10 flex flex-col gap-8 text-sm leading-relaxed text-foreground-muted">
          <div>
            <h2 className="mb-2 font-display text-lg font-bold text-foreground">
              Angaben gemäß § 5 TMG
            </h2>
            <p>
              {legal.fullName}
              <br />
              {legal.street}
              <br />
              {legal.zipCity}
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-display text-lg font-bold text-foreground">Registereintrag</h2>
            <p>{legal.commercialRegister}</p>
          </div>

          <div>
            <h2 className="mb-2 font-display text-lg font-bold text-foreground">Vertreten durch</h2>
            <p>{legal.owner}</p>
          </div>

          <div>
            <h2 className="mb-2 font-display text-lg font-bold text-foreground">Kontakt</h2>
            <p>
              Telefon: {legal.phone}
              <br />
              Mobil: {legal.mobile}
              <br />
              E-Mail: {legal.email}
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-display text-lg font-bold text-foreground">
              Umsatzsteuer-ID
            </h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
              <br />
              {legal.vatId}
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-display text-lg font-bold text-foreground">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </h2>
            <p>
              {legal.owner}
              <br />
              {legal.street}
              <br />
              {legal.zipCity}
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-display text-lg font-bold text-foreground">Streitschlichtung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur
              Online-Streitbeilegung (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary underline"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              . Wir sind nicht verpflichtet und nicht bereit, an
              Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
              teilzunehmen.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
