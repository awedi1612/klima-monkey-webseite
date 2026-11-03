// Ratgeber-Unterseiten zu einer Leistung, erreichbar unter /leistungen/<parent>/<slug>.
// Titel und Meta-Descriptions nach docs/SEO-STRATEGIE.md.

export type RatgeberSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Preisbeispiel = {
  anlage: string;
  umfang: string;
  preis: string;
};

export type RatgeberArtikel = {
  slug: string;
  parent: string;
  title: string;
  linkLabel: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  sections: RatgeberSection[];
  /** Wird nur angezeigt, wenn Einträge vorhanden sind. */
  preisbeispiele?: Preisbeispiel[];
  faq: { question: string; answer: string }[];
};

export const ratgeber: RatgeberArtikel[] = [
  {
    slug: "klimaanlage-kosten",
    parent: "klimaanlagen",
    title: "Was kostet eine Klimaanlage? Kosten für Gerät, Montage und Betrieb",
    linkLabel: "Klimaanlage Kosten",
    metaTitle: "Klimaanlage Kosten: Gerät, Montage und Stromverbrauch",
    metaDescription:
      "Klimaanlage mit Montage ab 2.200 €: Preisbeispiele für Single-, Duo- und Multisplit, was den Preis bestimmt und welche laufenden Kosten anfallen.",
    intro:
      "Die Frage nach dem Preis kommt in fast jedem Beratungsgespräch zuerst. Eine Single-Split-Klimaanlage für einen Raum bekommen Sie bei uns ab 2.200 € inklusive Montage. Wie viel es am Ende genau wird, hängt von Ihren Räumen ab. Hier sehen Sie, wovon die Kosten abhängen und was typische Anlagen kosten.",
    sections: [
      {
        heading: "Woraus sich der Preis zusammensetzt",
        paragraphs: [
          "Eine Split-Klimaanlage besteht aus einem Außengerät und einem oder mehreren Innengeräten, die über Kältemittelleitungen verbunden sind. Der Gesamtpreis setzt sich aus Gerät, Material und Montage zusammen.",
        ],
        bullets: [
          "Anzahl der Räume: Ein Innengerät (Single-Split) ist günstiger als mehrere Räume an einem Außengerät (Multisplit).",
          "Leistung: Größere Räume, Dachgeschosse und große Fensterflächen brauchen mehr Kühlleistung.",
          "Leitungslänge: Je weiter Innen- und Außengerät auseinander liegen, desto mehr Leitung und Arbeitszeit.",
          "Wanddurchbrüche und Leitungsführung: Kabelkanal sichtbar an der Wand oder verdeckt verlegt.",
          "Aufstellort des Außengeräts: Wandkonsole, Bodenaufstellung oder Flachdach.",
          "Elektroanschluss und Kondensatablauf: ob vorhandene Anschlüsse genutzt werden können.",
          "Gerät und Ausstattung: Hersteller, Effizienzklasse, Lautstärke, WLAN-Steuerung, Design.",
        ],
      },
      {
        heading: "Single-Split oder Multisplit?",
        paragraphs: [
          "Für ein einzelnes Schlafzimmer oder Büro reicht meist ein Single-Split-Gerät. Wer drei oder vier Räume klimatisieren möchte, kann statt mehrerer Außengeräte ein Multisplit-System nehmen. Das spart Platz an der Fassade, das Außengerät ist aber größer und teurer.",
          "Welche Lösung günstiger ist, hängt vom Haus ab. Wir rechnen in der Beratung beide Varianten durch, wenn beide in Frage kommen.",
        ],
      },
      {
        heading: "Laufende Kosten: Strom und Wartung",
        paragraphs: [
          "Moderne Split-Geräte arbeiten mit Inverter-Technik und passen ihre Leistung dem Bedarf an. Der Stromverbrauch hängt davon ab, wie viele Stunden die Anlage läuft, wie groß der Raum ist und welche Temperatur Sie einstellen. Wer eine Photovoltaikanlage hat, kühlt im Sommer zu einem großen Teil mit eigenem Solarstrom, weil Kühlbedarf und Sonnenstunden zusammenfallen.",
          "Dazu kommt die jährliche Wartung. Sie hält die Anlage hygienisch und sparsam und verlängert ihre Lebensdauer.",
        ],
      },
      {
        heading: "Warum die Montage nicht ins Do-it-yourself gehört",
        paragraphs: [
          "Arbeiten am Kältekreis dürfen nur zertifizierte Fachbetriebe ausführen. Bei unsachgemäßer Montage drohen Kältemittelverluste, schwache Kühlleistung und der Verlust der Herstellergarantie. Ein vermeintlich günstiges Set aus dem Baumarkt wird so schnell teurer als die fachgerechte Lösung.",
        ],
      },
      {
        heading: "So kommen Sie zu einem verlässlichen Preis",
        paragraphs: [
          "Wir schauen uns die Räume vor Ort an, klären Aufstellort und Leitungsweg und schicken Ihnen danach ein Festpreisangebot. Die Beratung ist kostenlos und unverbindlich. Wenn Sie lieber in Raten zahlen, rechnen wir eine Finanzierung mit ein.",
        ],
      },
    ],
    preisbeispiele: [
      {
        anlage: "Single-Split – 1 Raum",
        umfang: "1 Außengerät, 1 Innengerät, Material, Montage, Inbetriebnahme",
        preis: "ab 2.200 €",
      },
      {
        anlage: "Duo-Split – 2 Räume",
        umfang: "1 Außengerät, 2 Innengeräte, Material, Montage, Inbetriebnahme",
        preis: "ab 4.500 €",
      },
      {
        anlage: "Multisplit – 3 Räume",
        umfang: "1 Außengerät, 3 Innengeräte, Material, Montage, Inbetriebnahme",
        preis: "ab 7.500 €",
      },
    ],
    faq: [
      {
        question: "Ist die Beratung vor Ort kostenlos?",
        answer:
          "Ja. Wir kommen vorbei, prüfen die Gegebenheiten und erstellen Ihnen danach ein unverbindliches Angebot.",
      },
      {
        question: "Kann ich eine Klimaanlage in Raten bezahlen?",
        answer:
          "Ja, wir vermitteln Finanzierungen über etablierte Partner. Die Rate richtet sich nach Projekt und Laufzeit.",
      },
      {
        question: "Gibt es eine Förderung für Klimaanlagen?",
        answer:
          "Reine Klimaanlagen zum Kühlen werden in der Regel nicht gefördert. Bei Wärmepumpen sieht das anders aus. Wir prüfen für Ihr Vorhaben, welche Programme aktuell gelten.",
      },
      {
        question: "Was kostet die Wartung einer Klimaanlage?",
        answer:
          "Mit unserem Wartungsvertrag zahlen Sie 169 € pro Innengerät und Wartung inkl. MwSt. Dazu kommt einmal pro Wartung die Anfahrt: 39 € im Umkreis von 25 km um Heilbronn, darüber hinaus 69 €.",
      },
    ],
  },
  {
    slug: "herstellervergleich",
    parent: "klimaanlagen",
    title: "Bosch, Daikin oder Mitsubishi? Klimaanlagen-Hersteller im Vergleich",
    linkLabel: "Herstellervergleich",
    metaTitle: "Bosch, Daikin oder Mitsubishi: Klimaanlagen im Vergleich",
    metaDescription:
      "Bosch, Daikin oder Mitsubishi Heavy Industries? Worauf es bei der Wahl des Klimaanlagen-Herstellers ankommt und wie wir in der Beratung das passende Gerät finden.",
    intro:
      "Wir installieren Klimaanlagen von Bosch, Daikin und Mitsubishi Heavy Industries. Alle drei bauen zuverlässige Geräte. Welcher Hersteller am besten passt, entscheidet sich weniger am Markennamen als an Ihren Räumen, Ihren Ansprüchen und Ihrem Budget.",
    sections: [
      {
        heading: "Die drei Hersteller im Überblick",
        paragraphs: [
          "Bosch ist ein deutscher Hersteller, der mit seiner Climate-Reihe Split-Klimaanlagen für Wohnung und Haus anbietet. Ein Vorteil ist der Service und die Ersatzteilversorgung im deutschsprachigen Raum. Wir sind Bosch-Partner.",
          "Daikin aus Japan hat sich auf Klima- und Wärmepumpentechnik spezialisiert und bietet eine große Auswahl an Innengeräten, vom einfachen Wandgerät bis zu Designmodellen und Truhengeräten.",
          "Mitsubishi Heavy Industries, kurz MHI, ist ebenfalls ein japanischer Hersteller mit langer Erfahrung in der Kältetechnik. Nicht zu verwechseln mit Mitsubishi Electric, einem eigenständigen Unternehmen.",
        ],
      },
      {
        heading: "Worauf es beim Vergleich wirklich ankommt",
        paragraphs: [
          "Datenblätter sehen sich auf den ersten Blick ähnlich. Für Ihre Entscheidung zählen vor allem diese Punkte:",
        ],
        bullets: [
          "Lautstärke von Innen- und Außengerät, besonders im Schlafzimmer und bei engen Grundstücken",
          "Effizienz beim Kühlen und, wenn Sie heizen möchten, auch beim Heizen",
          "Passende Innengeräte: Wandgerät, Truhe, Deckenkassette oder Kanalgerät",
          "Multisplit-Möglichkeiten: wie viele Räume an ein Außengerät passen",
          "App und WLAN-Steuerung, Einbindung ins Smart Home",
          "Design und Farbe der Innengeräte",
          "Garantiebedingungen und Ersatzteilversorgung",
        ],
      },
      {
        heading: "Unsere Empfehlung",
        paragraphs: [
          "Eine Marke, die immer die beste ist, gibt es nicht. Wir schlagen Ihnen nach der Vor-Ort-Beratung ein oder zwei Geräte vor und erklären, warum. Wenn Sie schon einen Favoriten haben, sagen Sie es uns – wir prüfen, ob er zu Ihren Räumen passt.",
          "Die Garantiebedingungen unterscheiden sich je nach Hersteller und Gerät. Wir nennen sie Ihnen im Angebot.",
        ],
      },
    ],
    faq: [
      {
        question: "Welche Klimaanlage ist die leiseste?",
        answer:
          "Alle drei Hersteller haben sehr leise Innengeräte im Programm. Entscheidend ist, dass das Gerät zur Raumgröße passt und nicht dauerhaft an der Leistungsgrenze läuft. Das berücksichtigen wir bei der Auswahl.",
      },
      {
        question: "Kann ich Geräte verschiedener Hersteller kombinieren?",
        answer:
          "Bei einer Multisplit-Anlage müssen Außen- und Innengeräte vom selben Hersteller stammen und zueinander passen. Getrennte Single-Split-Anlagen können dagegen von unterschiedlichen Herstellern sein.",
      },
      {
        question: "Lassen sich alle Geräte per App steuern?",
        answer:
          "Bei vielen aktuellen Modellen ist WLAN eingebaut oder als Modul nachrüstbar. Wir sagen Ihnen im Angebot, welche Steuerung beim jeweiligen Gerät möglich ist.",
      },
    ],
  },
  {
    slug: "klimaanlage-heizen",
    parent: "klimaanlagen",
    title: "Mit der Klimaanlage heizen: Kosten, Effizienz und Grenzen",
    linkLabel: "Heizen mit Klimaanlage",
    metaTitle: "Mit Klimaanlage heizen: Kosten und Effizienz",
    metaDescription:
      "Eine Split-Klimaanlage heizt als Luft-Luft-Wärmepumpe. Wann sich Heizen mit der Klimaanlage lohnt, was es kostet und wie sie eine Gasheizung ergänzt.",
    intro:
      "Viele wissen nicht, dass ihre Klimaanlage auch heizen kann. Technisch ist eine Split-Klimaanlage eine Luft-Luft-Wärmepumpe: Im Sommer bringt sie Wärme aus dem Raum nach draußen, im Winter holt sie Wärme aus der Außenluft ins Haus.",
    sections: [
      {
        heading: "So funktioniert Heizen mit der Klimaanlage",
        paragraphs: [
          "Im Heizbetrieb kehrt das Gerät den Kältekreis um. Das Außengerät entzieht der Außenluft Wärme, auch wenn es draußen kalt ist. Das Innengerät gibt diese Wärme in den Raum ab. Der Strom treibt dabei nur den Verdichter und die Lüfter an.",
          "Deshalb ist Heizen mit einer Klimaanlage deutlich effizienter als ein Heizlüfter oder eine Elektroheizung. Aus einer Kilowattstunde Strom entstehen je nach Gerät und Außentemperatur ungefähr drei bis fünf Kilowattstunden Wärme. Je kälter es draußen ist, desto geringer wird der Wert.",
        ],
      },
      {
        heading: "Als Ergänzung zur Gas- oder Ölheizung",
        paragraphs: [
          "Besonders sinnvoll ist die Klimaanlage in der Übergangszeit im Frühjahr und Herbst. Statt die Zentralheizung für ein paar kühle Morgenstunden hochzufahren, heizt das Klimagerät einzelne Räume schnell auf. So läuft die Gas- oder Ölheizung seltener.",
          "Mit eigener Photovoltaikanlage wird es noch günstiger, weil an sonnigen Übergangstagen ein Teil des Heizstroms vom eigenen Dach kommt.",
        ],
      },
      {
        heading: "Die Grenzen",
        paragraphs: ["Eine Klimaanlage ersetzt nicht in jedem Haus die Heizung. Bevor Sie planen, sollten Sie diese Punkte kennen:"],
        bullets: [
          "Es wird nur der Raum warm, in dem ein Innengerät hängt. Bad und Flur bleiben ohne eigenes Gerät kalt.",
          "Die Klimaanlage bereitet kein Warmwasser.",
          "Geheizt wird mit warmer Luft, nicht mit Strahlungswärme wie bei einer Fußbodenheizung.",
          "Bei starkem Frost sinkt die Effizienz.",
        ],
      },
      {
        heading: "Klimaanlage oder Wärmepumpe?",
        paragraphs: [
          "Wenn Sie das ganze Haus inklusive Warmwasser heizen möchten, ist eine Luft-Wasser-Wärmepumpe die passende Lösung. Sie speist die Wärme in Heizkörper oder Fußbodenheizung ein. Wenn Sie vor allem im Sommer kühlen und in der Übergangszeit zuheizen möchten, ist die Split-Klimaanlage die einfachere und günstigere Wahl.",
          "Luft-Luft-Wärmepumpen sind in der Heizungsförderung des Bundes in der Regel nicht förderfähig. Wir prüfen für Ihr Vorhaben, was aktuell gilt.",
        ],
      },
    ],
    faq: [
      {
        question: "Ist Heizen mit der Klimaanlage teurer als mit Gas?",
        answer:
          "Das hängt vom Strom- und Gaspreis, vom Gerät und von der Außentemperatur ab. In der Übergangszeit, wenn die Wärmepumpe effizient arbeitet, ist die Klimaanlage oft günstiger. Bei starkem Frost kann es sich umkehren.",
      },
      {
        question: "Kann jede Klimaanlage heizen?",
        answer:
          "Fast alle aktuellen Split-Klimaanlagen haben einen Heizmodus. Mobile Monoblock-Geräte können das meist nicht oder nur schlecht.",
      },
      {
        question: "Bis zu welcher Außentemperatur heizt eine Klimaanlage?",
        answer:
          "Viele Geräte heizen laut Hersteller auch bei zweistelligen Minusgraden, nur eben mit sinkender Leistung und Effizienz. Den Einsatzbereich nennen wir Ihnen für das jeweilige Gerät.",
      },
    ],
  },
];

export function ratgeberFuer(parent: string) {
  return ratgeber.filter((artikel) => artikel.parent === parent);
}
