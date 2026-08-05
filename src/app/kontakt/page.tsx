import type { Metadata } from "next";
import { Mail, MapPin, Phone, Smartphone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/fade-in";
import { LeadFunnel } from "@/components/lead-funnel";
import { ContactFormToggle } from "@/components/contact-form-toggle";
import { LocationMap } from "@/components/location-map";
import { GoogleConsentGate } from "@/components/google-consent-gate";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kostenlose Beratung zu Klimaanlagen-Kauf, -Installation, -Wartung, -Reparatur und Langzeitmiete von Klima-Monkey in Heilbronn – in 3 Minuten zum persönlichen Angebot.",
};

export default function KontaktPage() {
  return (
    <>
      <section className="pb-16 pt-20 lg:pt-28">
        <Container>
          <FadeIn>
            <SectionHeading
              eyebrow="Kontakt"
              title="Lassen Sie uns sprechen"
              description="Beantworten Sie 4 kurze Fragen und Sie erhalten innerhalb von zwei Minuten ein persönliches Angebot."
              align="center"
              className="mx-auto"
            />
          </FadeIn>
        </Container>
      </section>

      <section className="pb-20 lg:pb-28">
        <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <FadeIn className="flex flex-col gap-6">
            <div className="rounded-3xl border border-border bg-background-card p-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div className="text-sm">
                    <div className="text-foreground-muted">
                      {siteConfig.legal.street}, {siteConfig.legal.zipCity}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
                    <Phone className="h-4 w-4" />
                  </span>
                  <a href={`tel:${siteConfig.legal.phone.replace(/\s+/g, "")}`} className="text-sm text-foreground-muted hover:text-brand-primary">
                    {siteConfig.legal.phone}
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
                    <Smartphone className="h-4 w-4" />
                  </span>
                  <a href={`tel:${siteConfig.legal.mobile.replace(/\s+/g, "")}`} className="text-sm text-foreground-muted hover:text-brand-primary">
                    {siteConfig.legal.mobile}
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
                    <Mail className="h-4 w-4" />
                  </span>
                  <a href={`mailto:${siteConfig.legal.email}`} className="text-sm text-foreground-muted hover:text-brand-primary">
                    {siteConfig.legal.email}
                  </a>
                </div>
              </div>
              <div className="mt-5 border-t border-border pt-4 text-xs text-foreground-muted">
                <span className="font-semibold text-foreground">Servicegebiet: </span>
                {siteConfig.serviceArea.join(", ")}
              </div>
            </div>

            <GoogleConsentGate label="Die Standortkarte" className="aspect-[4/3] sm:aspect-auto sm:h-96">
              <LocationMap />
            </GoogleConsentGate>
          </FadeIn>

          <FadeIn delay={0.1}>
            <LeadFunnel />
          </FadeIn>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <ContactFormToggle />
        </Container>
      </section>
    </>
  );
}
