import type { Metadata } from "next";
import { ArrowRight, User } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/fade-in";

export const metadata: Metadata = {
  title: "Monkeys – Unser Team",
  description:
    "Lernen Sie die Monkeys kennen: das Team hinter Klima-Monkey aus Heilbronn.",
  alternates: { canonical: "/monkeys" },
};

// TODO: echte Fotos ergänzen, sobald vorhanden (aktuell Monkey-Icon als Platzhalter)
const team = [
  {
    name: "André Weber",
    role: "CEO",
    bio: "Verantwortlich für die strategische Ausrichtung und Weiterentwicklung von Klima-Monkey.",
  },
  {
    name: "Martin Nowak",
    role: "CTO",
    bio: "Verantwortlich für Technik, Qualität und die Weiterentwicklung unserer Klimalösungen.",
  },
  {
    name: "Goran",
    role: "Monteur",
    bio: "Sorgt für saubere Montage und zuverlässigen Service bei Ihnen vor Ort.",
  },
  {
    name: "Daniel",
    role: "Monteur",
    bio: "Kümmert sich um Installation und Wartung Ihrer Klimaanlage.",
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
                  <div className="flex aspect-square items-center justify-center bg-gradient-to-br from-brand-primary/15 to-brand-secondary/15">
                    <User className="h-14 w-14 text-brand-link/40" strokeWidth={1.5} />
                  </div>
                  <div className="p-6">
                    <div className="font-display text-lg font-bold">{member.name}</div>
                    <div className="text-sm font-semibold text-brand-link">
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
