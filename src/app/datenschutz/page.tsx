import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Datenschutz",
  robots: { index: false, follow: true },
};

export default function DatenschutzPage() {
  const { legal } = siteConfig;

  return (
    <section className="py-20 lg:py-28">
      <Container className="max-w-3xl">
        <h1 className="font-display text-4xl font-bold tracking-tight">
          Datenschutzerklärung
        </h1>
        <p className="mt-4 text-sm text-foreground-muted">
          Diese Vorlage bietet einen soliden Ausgangspunkt, ersetzt aber keine
          rechtliche Prüfung. Bitte vor Veröffentlichung von einem
          Datenschutzbeauftragten / Anwalt gegenprüfen lassen.
        </p>

        <div className="mt-10 flex flex-col gap-10 text-sm leading-relaxed text-foreground-muted">
          <div>
            <h2 className="mb-2 font-display text-lg font-bold text-foreground">
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
            <h2 className="mb-2 font-display text-lg font-bold text-foreground">
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
            <h2 className="mb-2 font-display text-lg font-bold text-foreground">
              3. Kontaktformular
            </h2>
            <p>
              Wenn Sie uns über das Kontaktformular Anfragen zukommen lassen,
              werden Ihre Angaben aus dem Formular inklusive der von Ihnen
              dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und
              für den Fall von Anschlussfragen bei uns gespeichert. Diese
              Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-display text-lg font-bold text-foreground">
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
            <h2 className="mb-2 font-display text-lg font-bold text-foreground">
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
                className="text-brand-primary underline"
              >
                policies.google.com/privacy
              </a>
              . Sie können Ihre Zustimmung jederzeit über die
              Cookie-Einstellungen im Footer widerrufen.
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-display text-lg font-bold text-foreground">
              6. Ihre Rechte
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
            <h2 className="mb-2 font-display text-lg font-bold text-foreground">
              7. Beschwerderecht bei der Aufsichtsbehörde
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
