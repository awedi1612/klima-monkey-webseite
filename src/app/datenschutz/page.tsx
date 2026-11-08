import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Datenschutz",
  robots: { index: false, follow: true },
  alternates: { canonical: "/datenschutz" },
};

export default function DatenschutzPage() {
  const { legal } = siteConfig;

  return (
    <section className="py-20 lg:py-28">
      <Container className="max-w-3xl">
        <h1 className="hyphens-auto break-words font-display text-3xl font-semibold tracking-tight sm:text-5xl">
          Datenschutzerklärung
        </h1>

        <div className="mt-10 flex flex-col gap-10 text-sm leading-relaxed text-foreground-muted">
          <div>
            <h2 className="mb-2 font-display text-lg font-semibold text-foreground">
              1. Verantwortlicher
            </h2>
            <p>
              {legal.fullName}
              <br />
              {legal.street}
              <br />
              {legal.zipCity}
              <br />
              E-Mail: {legal.email}
              <br />
              Telefon: {legal.phone}
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-display text-lg font-semibold text-foreground">
              2. Erhebung und Speicherung personenbezogener Daten
            </h2>
            <p>
              Beim Besuch dieser Website erhebt unser Webserver automatisiert
              Informationen (Server-Logfiles), die Ihr Browser übermittelt,
              u. a. Browsertyp, verwendetes Betriebssystem, Referrer-URL,
              Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage und
              IP-Adresse. Diese Daten sind nicht bestimmten Personen zuordenbar
              und werden ausschließlich zur Gewährleistung eines
              störungsfreien Betriebs sowie zur Verbesserung unseres Angebots
              ausgewertet.
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-display text-lg font-semibold text-foreground">
              3. Anfrage-Formular und Rückruf
            </h2>
            <p>
              Wenn Sie uns über das Anfrage-Formular („Ihre Anfrage“) oder den
              Rückrufwunsch kontaktieren, verarbeiten wir die Angaben, die Sie dort
              machen: Anrede, Name bzw. Firma, E-Mail-Adresse, Telefonnummer,
              Anschrift, Ihre Auswahl im Formular (z. B. Raumgröße, Hersteller und
              Anzahl der Geräte) sowie Ihre Nachricht.
            </p>
            <p className="mt-3">
              Zweck ist die Bearbeitung Ihrer Anfrage, die Erstellung eines Angebots
              und die Kontaktaufnahme mit Ihnen. Rechtsgrundlage ist Art. 6 Abs. 1
              lit. b DSGVO (Durchführung vorvertraglicher Maßnahmen auf Ihre
              Anfrage) sowie Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO, die
              Sie jederzeit mit Wirkung für die Zukunft widerrufen können.
            </p>
            <p className="mt-3">
              Ihre Angaben werden von unserem Webserver an ein von uns selbst
              betriebenes Automatisierungssystem (n8n) und von dort in unsere
              Warenwirtschaft (Kunden- und Angebotsverwaltung) übertragen. Die
              Eingangsbestätigung an Sie versenden wir über unser E-Mail-Postfach bei
              Microsoft 365. Eine Weitergabe an sonstige Dritte findet nicht statt.
            </p>
            <p className="mt-3">
              Wir speichern Ihre Angaben, bis Ihre Anfrage abgeschlossen ist. Kommt
              ein Auftrag zustande, bewahren wir die Daten nach den gesetzlichen
              Aufbewahrungsfristen auf (in der Regel 6 bis 10 Jahre, § 147 AO,
              § 257 HGB).
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-display text-lg font-semibold text-foreground">
              4. Cookies &amp; Cookie-Einstellungen
            </h2>
            <p>
              Rechtsgrundlage für das Speichern von Informationen in Ihrem
              Endgerät bzw. den Zugriff darauf ist § 25 Abs. 2 Nr. 2 TTDSG
              (technisch notwendige Cookies) bzw. § 25 Abs. 1 TTDSG i. V. m.
              Art. 6 Abs. 1 lit. a DSGVO (Cookies, die eine Einwilligung
              erfordern).
            </p>
            <p className="mt-3">
              Diese Website verwendet zum einen technisch notwendige Cookies,
              die für den Betrieb der Seite erforderlich sind (z. B.
              Theme-Einstellung hell/dunkel, Speicherung Ihrer
              Cookie-Auswahl). Diese werden ohne gesonderte Einwilligung
              gesetzt.
            </p>
            <p className="mt-3">
              Zum anderen binden wir optionale Inhalte von Google ein
              (Standortkarte und Google-Bewertungen, siehe Abschnitt 5), die
              erst nach Ihrer aktiven Zustimmung geladen werden und dabei
              eigene Cookies setzen können. Ihre Auswahl können Sie jederzeit
              über den Link „Cookie-Einstellungen&quot; im Footer der Website
              ändern; wir fragen Sie zudem automatisch erneut, sobald sich
              die verwendeten Cookie-Kategorien ändern oder Ihre Einwilligung
              älter als 12 Monate ist.
            </p>

            <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
              <table className="w-full min-w-[560px] border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-border bg-background-soft">
                    <th className="px-4 py-3 font-semibold text-foreground">Name</th>
                    <th className="px-4 py-3 font-semibold text-foreground">Anbieter</th>
                    <th className="px-4 py-3 font-semibold text-foreground">Zweck</th>
                    <th className="px-4 py-3 font-semibold text-foreground">Speicherdauer</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">km-cookie-consent</td>
                    <td className="px-4 py-3">Klima-Monkey (eigen)</td>
                    <td className="px-4 py-3">Speichert Ihre Cookie-Auswahl</td>
                    <td className="px-4 py-3">12 Monate (localStorage)</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3">theme</td>
                    <td className="px-4 py-3">Klima-Monkey (eigen)</td>
                    <td className="px-4 py-3">Speichert Ihre Hell-/Dunkel-Einstellung</td>
                    <td className="px-4 py-3">dauerhaft (localStorage)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">diverse (z. B. NID, 1P_JAR)</td>
                    <td className="px-4 py-3">Google Ireland Ltd.</td>
                    <td className="px-4 py-3">
                      Funktion &amp; Reichweitenmessung der eingebundenen
                      Karte/Bewertungen, nur nach Zustimmung aktiv
                    </td>
                    <td className="px-4 py-3">gemäß Google, bis zu 24 Monate</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="mb-2 font-display text-lg font-semibold text-foreground">
              5. Google Maps &amp; Google-Bewertungen
            </h2>
            <p>
              Auf unserer Kontaktseite binden wir eine Standortkarte und auf
              unserer Startseite Google-Bewertungen ein, die von Google
              Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland
              bereitgestellt werden. Diese Inhalte werden erst geladen, wenn
              Sie der Nutzung von Google-Diensten in unserem
              Cookie-Consent-Banner zustimmen. Mit dem Laden kann Google Ihre
              IP-Adresse verarbeiten und Cookies auf Ihrem Endgerät setzen.
              Eine Übermittlung von Daten in die USA ist dabei nicht
              auszuschließen. Weitere Informationen entnehmen Sie der
              Datenschutzerklärung von Google:{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-link underline"
              >
                policies.google.com/privacy
              </a>
              . Sie können Ihre Zustimmung jederzeit über die
              Cookie-Einstellungen im Footer widerrufen.
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-display text-lg font-semibold text-foreground">
              6. Mitarbeiterportal monkey-software.de
            </h2>
            <p>
              Unter monkey-software.de betreiben wir den Zugang zu unserer internen
              Betriebssoftware „Monkey-Soft“ (Warenwirtschaft für das Büro und
              Baustellen-App). Das Portal richtet sich ausschließlich an unsere
              Beschäftigten und an Subunternehmer, die für uns tätig sind; eine Nutzung
              durch Kunden oder sonstige Besucher ist nicht vorgesehen. Der Server steht in einem Rechenzentrum der Alfahosting GmbH
              in Deutschland. Alle Verbindungen sind per HTTPS verschlüsselt.
            </p>
            <p className="mt-3">
              Beim Aufruf speichert der Webserver automatisch Server-Logfiles
              (IP-Adresse, Datum und Uhrzeit, aufgerufene Adresse, übertragene
              Datenmenge, Browserkennung). Zweck ist der sichere und störungsfreie
              Betrieb, insbesondere das Erkennen und Abwehren von Angriffen.
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes
              Interesse liegt in der Sicherheit unserer Systeme. Die Logfiles werden
              nach 14 Tagen automatisch gelöscht.
            </p>
            <p className="mt-3">
              Die Startseite des Portals setzt keine Cookies. Erst nach der Anmeldung
              werden technisch notwendige Sitzungs-Cookies gespeichert, die Sie als
              angemeldet ausweisen (§ 25 Abs. 2 Nr. 2 TDDDG). Sie werden mit dem
              Abmelden ungültig, im Büro-Bereich spätestens nach 8 Stunden ohne
              Aktivität, in der Baustellen-App spätestens nach 30 Tagen.
            </p>
            <p className="mt-3">
              Über die Verarbeitung von Beschäftigtendaten in der Software selbst
              (z. B. Zeiterfassung, Arbeitsberichte) informieren wir unsere
              Mitarbeiterinnen und Mitarbeiter sowie Subunternehmer gesondert.
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-display text-lg font-semibold text-foreground">
              7. Ihre Rechte
            </h2>
            <p>
              Sie haben jederzeit das Recht auf unentgeltliche Auskunft über
              Ihre gespeicherten personenbezogenen Daten, deren Herkunft und
              Empfänger sowie den Zweck der Datenverarbeitung sowie ein Recht
              auf Berichtigung, Sperrung oder Löschung dieser Daten. Hierzu
              sowie zu weiteren Fragen zum Thema personenbezogene Daten können
              Sie sich jederzeit über die im Impressum aufgeführten
              Kontaktmöglichkeiten an uns wenden.
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-display text-lg font-semibold text-foreground">
              8. Beschwerderecht bei der Aufsichtsbehörde
            </h2>
            <p>
              Ihnen steht zudem ein Beschwerderecht bei der zuständigen
              Aufsichtsbehörde zu, z. B. dem Landesbeauftragten für den
              Datenschutz Baden-Württemberg.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
