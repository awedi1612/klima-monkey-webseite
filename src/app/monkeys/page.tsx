import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/fade-in";

export const metadata: Metadata = {
  title: "Monkeys – Unser Team",
  description:
    "Lernen Sie die Monkeys kennen: das Team hinter Klima-Monkey aus Heilbronn.",
};

// TODO: echte Teammitglieder mit Namen, Rolle und Foto eintragen
const team = [
  {
    name: "[Name einfügen]",
    role: "Klimaanlagen-Monkey",
    bio: "Zuständig für Planung und Installation von Klimaanlagen.",
  },
  {
    name: "[Name einfügen]",
    role: "Solar-Monkey",
    bio: "Experte für Photovoltaik und Stromspeicher.",
  },
  {
    name: "[Name einfügen]",
    role: "Beratungs-Monkey",
    bio: "Erste Anlaufstelle für Ihre Anfrage und individuelle Beratung.",
  },
  {
    name: "[Name einfügen]",
    role: "Service-Monkey",
    bio: "Kümmert sich um Wartung, Service und Reparaturen.",
  },
];

export default function MonkeysPage() {
  return (
    <>
      <section className="py-20 lg:py-28">
        <Container>
          <FadeIn>
            <SectionHeading
              eyebrow="Monkeys"
              title="Die Köpfe hinter Klima-Monkey"
              description="Ein eingespieltes Team aus zertifizierten Technikern und Beratern – mit Leidenschaft für gutes Klima und saubere Energie."
            />
          </FadeIn>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <FadeIn key={member.name + index} delay={index * 0.05}>
                <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-background-card">
                  <div className="flex aspect-square items-center justify-center bg-gradient-to-br from-brand-primary/15 to-brand-secondary/15 text-5xl">
                    🐒
                  </div>
                  <div className="p-6">
                    <div className="font-display text-lg font-bold">{member.name}</div>
                    <div className="text-sm font-semibold text-brand-primary">
                      {member.role}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-background-soft py-20 lg:py-28">
        <Container className="text-center">
          <FadeIn>
            <h2 className="mx-auto max-w-xl text-balance font-display text-3xl font-bold sm:text-4xl">
              Werden Sie Teil des Teams
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-foreground-muted">
              Wir wachsen stetig – schauen Sie in unserem Kontaktbereich vorbei,
              wenn Sie Interesse an einer Zusammenarbeit haben.
            </p>
            <div className="mt-8 flex justify-center">
              <Button href="/kontakt" size="lg">
                Kontakt aufnehmen
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
