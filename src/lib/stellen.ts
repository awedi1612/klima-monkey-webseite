// Offene Stellen für /karriere. Eine Stelle entfernen = Eintrag löschen; Seite, Formular und Sitemap passen sich an.
// Die Karriereseite duzt (anders als der Rest der Webseite).

// Vercel nimmt höchstens 4,5 MB je Anfrage an, deshalb 4 MB für den Lebenslauf
export const MAX_DATEI_BYTES = 4 * 1024 * 1024;

export type Stelle = {
  slug: string;
  titel: string;
  /** Kurzfassung für Kacheln, z. B. "Vollzeit · Teilzeit" */
  art: string;
  /** schema.org employmentType: FULL_TIME, PART_TIME, TEMPORARY, CONTRACTOR … */
  employmentType: string[];
  ort: string;
  beginn: string;
  /** Stundenlohn in Euro (für Anzeige und Google Jobs) */
  lohn?: { min: number; max: number };
  wochenstunden?: number;
  kurz: string;
  einleitung: string[];
  aufgaben: string[];
  profil: string[];
  /** "Für wen?" – Zeilen unter dem Profil */
  passtFuer?: string[];
  wirBieten: string[];
  warum?: string[];
  schluss?: string;
  /** Datum der Veröffentlichung (YYYY-MM-DD) für Google Jobs */
  veroeffentlicht: string;
};

export const stellen: Stelle[] = [
  {
    slug: "kaeltetechniker-monteur",
    titel: "Kältetechniker / Monteur für Klima- und Kältetechnik (m/w/d)",
    art: "Vollzeit · Teilzeit · Arbeitnehmerüberlassung",
    employmentType: ["FULL_TIME", "PART_TIME", "TEMPORARY"],
    ort: "Heilbronn",
    beginn: "ab sofort",
    lohn: { min: 21, max: 26 },
    wochenstunden: 40,
    kurz: "Klimaanlagen montieren, Leitungen verlegen, Projekte im Team umsetzen. Auch Quereinsteiger willkommen – wir machen dich fit für die Kältetechnik.",
    einleitung: [
      "Du hast zwei rechte Hände, bist technisch interessiert und hast keine Lust auf langweilige Arbeit? Dann sollten wir uns kennenlernen!",
      "Wir von Klima-Monkey suchen Verstärkung für unser Team. Egal, ob du bereits Kältetechniker bist oder bisher in einem ganz anderen Handwerksberuf gearbeitet hast: Wenn du motiviert bist, zuverlässig arbeitest und Lust auf etwas Neues hast, bist du bei uns richtig!",
      "Keine Erfahrung mit Klimaanlagen? Kein Problem! Wir machen dich fit für die Kältetechnik.",
    ],
    aufgaben: [
      "Klimaanlagen montieren und installieren",
      "Innen- und Außengeräte montieren",
      "Kältemittelleitungen verlegen",
      "Bei Inbetriebnahmen und Wartungen mit anpacken",
      "Gemeinsam mit dem Team coole Projekte umsetzen",
      "Kunden mit sauberer Arbeit glücklich machen",
    ],
    profil: [
      "Handwerkliches Geschick und technisches Verständnis",
      "Motivation und Lust, etwas Neues zu lernen",
      "Zuverlässigkeit und Teamgeist",
      "Freundliches Auftreten",
      "Führerschein Klasse B",
    ],
    passtFuer: [
      "Du bist gelernter Kältetechniker? Super!",
      "Du bist Elektriker, Anlagenmechaniker, Heizungsbauer oder kommst aus einem anderen Handwerksberuf? Noch besser!",
      "Du bist Quereinsteiger ohne entsprechende Ausbildung, hast aber handwerklich etwas drauf? Dann melde dich trotzdem! Wir lernen dich ein und zeigen dir, wie man richtig gute Klimatechnik macht.",
    ],
    wirBieten: [
      "21 bis 26 € pro Stunde – fair und leistungsgerecht",
      "40-Stunden-Woche in Vollzeit, Teilzeit möglich",
      "Betriebliche Altersvorsorge",
      "Essenszuschuss und kostenlose Getränke",
      "Eine vernünftige Einarbeitung – wir werfen dich nicht ins kalte Wasser",
      "Ein unkompliziertes Team ohne unnötiges Firmen-Bla-Bla",
      "Moderne Werkzeuge und vernünftige Arbeitsausstattung",
      "Abwechslungsreiche Projekte statt jeden Tag dasselbe",
      "Weiterbildung und Entwicklungsmöglichkeiten",
      "Ein langfristiger Arbeitsplatz in einer Branche mit Zukunft",
    ],
    warum: [
      "Wir sind jung, dynamisch und haben Bock auf gutes Handwerk.",
      "Bei uns zählt nicht, ob du schon alles kannst. Entscheidend ist, dass du mitdenkst, anpackst und dich weiterentwickeln möchtest.",
      "Wir bauen unser Team weiter aus und suchen Menschen, die gemeinsam mit uns wachsen wollen.",
    ],
    schluss: "Wir suchen keine Superhelden. Wir suchen gute Leute mit Bock auf Handwerk!",
    veroeffentlicht: "2026-11-17",
  },
  {
    slug: "elektriker-elektrohelfer",
    titel: "Elektriker / Elektrohelfer / Monteur (m/w/d)",
    art: "Vollzeit · Teilzeit · Arbeitnehmerüberlassung",
    employmentType: ["FULL_TIME", "PART_TIME", "TEMPORARY"],
    ort: "Heilbronn",
    beginn: "ab sofort",
    lohn: { min: 16.44, max: 20.39 },
    wochenstunden: 40,
    kurz: "Klimaanlagen, Wärmepumpen und PV elektrisch anschließen, Leitungen verlegen, das Montageteam unterstützen. Auch Quereinsteiger willkommen.",
    einleitung: [
      "Du hast Strom im Blut oder einfach Spaß an Technik und handwerklicher Arbeit? Dann komm zu uns ins Team!",
      "Wir von Klima-Monkey suchen Verstärkung für unsere Projekte rund um moderne Klimatechnik, Wärmepumpen und Photovoltaik. Ob gelernter Elektriker, Elektrohelfer oder motivierter Quereinsteiger – bei uns zählt nicht nur dein Abschluss, sondern vor allem deine Einstellung!",
      "Du hast handwerkliches Geschick, bist zuverlässig und möchtest etwas Neues lernen? Wir zeigen dir, wie es geht!",
    ],
    aufgaben: [
      "Elektroinstallationen im Bereich Klima- und Kältetechnik",
      "Elektrischer Anschluss von Klima- und Wärmepumpenanlagen",
      "Verlegen von Kabeln und Leitungen",
      "Montage und Anschluss elektrischer Komponenten",
      "Unterstützung bei Photovoltaikprojekten",
      "Allgemeine Elektro- und Montagearbeiten",
      "Zusammenarbeit mit unseren Monteuren auf der Baustelle",
      "Je nach Qualifikation und Erfahrung übernimmst du eigenständig Aufgaben oder unterstützt unser Montageteam.",
    ],
    profil: [
      "Handwerkliches Geschick und technisches Interesse",
      "Zuverlässigkeit und Motivation",
      "Spaß an praktischer Arbeit",
      "Teamfähigkeit und freundliches Auftreten",
      "Führerschein Klasse B (zwingend erforderlich)",
      "Bereitschaft, Neues zu lernen",
    ],
    passtFuer: [
      "Du bist ausgebildeter Elektriker oder Elektroniker? Perfekt!",
      "Du hast Erfahrung als Elektrohelfer, Monteur oder in einem anderen Handwerksberuf? Ebenfalls willkommen!",
      "Du bist Quereinsteiger und möchtest dich beruflich verändern? Dann gib uns eine Chance – wir geben dir auch eine!",
    ],
    wirBieten: [
      "16,44 bis 20,39 € pro Stunde – fair und leistungsgerecht",
      "40-Stunden-Woche in Vollzeit, Teilzeit möglich",
      "Betriebliche Altersvorsorge",
      "Essenszuschuss und kostenlose Getränke",
      "Eine vernünftige Einarbeitung",
      "Einen langfristigen Arbeitsplatz in einer Zukunftsbranche",
      "Ein unkompliziertes Team ohne unnötiges Firmen-Bla-Bla",
      "Moderne Werkzeuge und vernünftige Arbeitsausstattung",
      "Abwechslungsreiche Projekte",
      "Weiterbildungsmöglichkeiten und Entwicklungsperspektiven",
      "Die Möglichkeit, dich fachlich weiterzuentwickeln und Verantwortung zu übernehmen",
    ],
    warum: [
      "Wir sind ein junges, wachsendes Unternehmen mit Spaß an moderner Technik und gutem Handwerk.",
      "Wir mögen Menschen, die mitdenken, anpacken und gemeinsam etwas bewegen wollen.",
      "Bei uns bist du keine Nummer und musst auch kein perfekter Lebenslauf sein. Wir suchen gute Leute, keine perfekten Bewerbungsunterlagen!",
    ],
    schluss: "Wir suchen keine Superhelden. Wir suchen gute Leute mit Bock auf Handwerk!",
    veroeffentlicht: "2026-11-17",
  },
];

export const stelleFuer = (slug: string) => stellen.find((s) => s.slug === slug);

const euro = (n: number) =>
  n.toLocaleString("de-DE", { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 });
export const lohnText = (s: Stelle) => (s.lohn ? `${euro(s.lohn.min)}–${euro(s.lohn.max)} €/Std.` : "");
