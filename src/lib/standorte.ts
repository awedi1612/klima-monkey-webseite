// Regionale Landingpages unter /standorte/<slug>. Titel nach docs/SEO-STRATEGIE.md.
// Jede Seite braucht eigenen Text, sonst wertet Google sie als Duplikate.

export type Standort = {
  slug: string;
  ort: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  abschnitte: { heading: string; text: string }[];
  umgebung: string[];
  faq: { question: string; answer: string }[];
};

export const standorte: Standort[] = [
  {
    slug: "klimaanlage-heilbronn",
    ort: "Heilbronn",
    title: "Klimaanlagen Heilbronn – Beratung, Verkauf und Montage",
    metaTitle: "Klimaanlagen Heilbronn – Beratung, Verkauf und Montage",
    metaDescription:
      "Klimaanlage in Heilbronn kaufen und installieren lassen: kostenlose Beratung vor Ort, Montage durch zertifizierte Kältetechniker, Wartung und Reparatur aus Heilbronn.",
    intro:
      "Unser Betrieb sitzt in der Rosenbergstraße in Heilbronn. Von hier aus beraten wir, liefern und montieren Klimaanlagen in allen Stadtteilen, von der Altbauwohnung in der Innenstadt bis zum Einfamilienhaus in Böckingen oder Sontheim.",
    abschnitte: [
      {
        heading: "Warum in Heilbronn immer mehr Häuser eine Klimaanlage bekommen",
        text: "Das Neckartal um Heilbronn gehört zu den wärmeren Gegenden in Baden-Württemberg. In heißen Sommerwochen kühlen Dachgeschosse und Wohnungen mit großen Fensterflächen nachts kaum noch ab. Eine Split-Klimaanlage sorgt für erholsamen Schlaf und ein angenehmes Arbeiten im Homeoffice, und im Herbst und Frühjahr heizt sie als Wärmepumpe mit.",
      },
      {
        heading: "Kurze Wege für Beratung und Service",
        text: "Weil wir in Heilbronn sitzen, sind wir schnell bei Ihnen: für die kostenlose Besichtigung vor dem Angebot, am Montagetag und später bei Wartung oder Störung. Sie haben feste Ansprechpartner statt einer Hotline.",
      },
      {
        heading: "Wohnung, Haus oder Gewerbe",
        text: "In Mietwohnungen klären wir mit Ihnen, was der Vermieter zustimmen muss. In Eigentumswohnungen braucht das Außengerät in der Regel einen Beschluss der Eigentümergemeinschaft. Für Büros, Praxen und Ladenflächen planen wir Anlagen, die mehrere Räume gleichzeitig versorgen.",
      },
    ],
    umgebung: [
      "Heilbronn-Innenstadt",
      "Böckingen",
      "Sontheim",
      "Neckargartach",
      "Frankenbach",
      "Biberach",
      "Kirchhausen",
      "Klingenberg",
      "Horkheim",
      "Leingarten",
      "Neckarwestheim",
    ],
    faq: [
      {
        question: "Wie schnell könnt ihr in Heilbronn eine Klimaanlage installieren?",
        answer:
          "Das hängt von der Saison und der Verfügbarkeit des Geräts ab. Im Frühjahr ist die Planung am entspanntesten. Rufen Sie uns an, dann nennen wir Ihnen den nächsten freien Termin.",
      },
      {
        question: "Brauche ich in Heilbronn eine Genehmigung für das Außengerät?",
        answer:
          "Für ein Einfamilienhaus meist nicht. Bei denkmalgeschützten Gebäuden, in Eigentümergemeinschaften und in Mietwohnungen kann eine Zustimmung nötig sein. Wir sagen Ihnen bei der Besichtigung, worauf Sie achten müssen.",
      },
      {
        question: "Repariert ihr auch Klimaanlagen in Heilbronn, die ihr nicht selbst eingebaut habt?",
        answer:
          "Ja, wir warten und reparieren Split- und Multisplit-Anlagen der gängigen Hersteller, unabhängig vom Einbaubetrieb.",
      },
    ],
  },
  {
    slug: "klimaanlage-neckarsulm",
    ort: "Neckarsulm",
    title: "Klimaanlagen in Neckarsulm installieren lassen",
    metaTitle: "Klimaanlagen installieren lassen in Neckarsulm",
    metaDescription:
      "Klimaanlage in Neckarsulm, Amorbach, Obereisesheim und Dahenfeld: Beratung, Verkauf, Montage und Wartung durch Klima-Monkey aus dem nahen Heilbronn.",
    intro:
      "Neckarsulm liegt direkt nördlich von Heilbronn, für uns ist das eine kurze Anfahrt. Wir installieren Klimaanlagen in Wohnungen, Einfamilienhäusern und Gewerbeflächen in der Kernstadt und in den Stadtteilen.",
    abschnitte: [
      {
        heading: "Für Wohnhaus und Betrieb",
        text: "Neckarsulm ist Wohnort und Industriestandort zugleich. Neben Schlafzimmern und Dachgeschossen klimatisieren wir Büros, Besprechungsräume und Serverräume. Für mehrere Räume bietet sich oft ein Multisplit-System mit nur einem Außengerät an.",
      },
      {
        heading: "Klimaanlage im Neubau oder nachrüsten",
        text: "In Neubaugebieten lassen sich die Leitungen am einfachsten vor dem Innenausbau vorbereiten. Aber auch im Bestand rüsten wir nach: Die Leitungen führen wir durch einen Wanddurchbruch und auf Wunsch in einem dezenten Kabelkanal zum Außengerät.",
      },
    ],
    umgebung: ["Neckarsulm-Kernstadt", "Amorbach", "Obereisesheim", "Dahenfeld", "Bad Friedrichshall", "Erlenbach-Binswangen", "Oedheim"],
    faq: [
      {
        question: "Kommt ihr für die Beratung nach Neckarsulm?",
        answer:
          "Ja, die Vor-Ort-Beratung in Neckarsulm ist kostenlos und unverbindlich. Danach erhalten Sie ein schriftliches Angebot.",
      },
      {
        question: "Könnt ihr Büros und Gewerberäume in Neckarsulm klimatisieren?",
        answer:
          "Ja. Wir planen Anlagen für Büros, Praxen und Läden und stimmen die Montage so ab, dass der Betrieb möglichst wenig gestört wird.",
      },
    ],
  },
  {
    slug: "klimaanlage-flein",
    ort: "Flein",
    title: "Klimaanlagen in Flein und Umgebung",
    metaTitle: "Klimaanlagen in Flein und Umgebung",
    metaDescription:
      "Klimaanlage für Ihr Haus in Flein, Talheim oder Untergruppenbach: kostenlose Beratung, Montage und Wartung durch Klima-Monkey aus dem benachbarten Heilbronn.",
    intro:
      "Flein grenzt im Süden direkt an Heilbronn. Wir sind in wenigen Minuten vor Ort und installieren Klimaanlagen in Einfamilien-, Doppel- und Reihenhäusern in Flein und den Nachbargemeinden.",
    abschnitte: [
      {
        heading: "Kühle Schlafzimmer im Einfamilienhaus",
        text: "In vielen Häusern liegen die Schlafzimmer im Obergeschoss oder unter dem Dach. Dort staut sich die Hitze im Sommer am stärksten. Ein leises Wandgerät im Schlafzimmer reicht oft schon, wer mehrere Zimmer kühlen möchte, nimmt ein Multisplit-System.",
      },
      {
        heading: "Das Außengerät sinnvoll platzieren",
        text: "In Wohngebieten mit Nachbarn in kurzem Abstand kommt es auf den Aufstellort an. Wir achten darauf, dass das Außengerät gut erreichbar ist, nicht zum Nachbarn hin bläst und die Abstände für den Schallschutz eingehalten werden.",
      },
    ],
    umgebung: ["Flein", "Talheim", "Untergruppenbach", "Heilbronn-Sontheim", "Heilbronn-Horkheim", "Lauffen am Neckar"],
    faq: [
      {
        question: "Wie laut ist das Außengerät für die Nachbarn?",
        answer:
          "Moderne Außengeräte sind leise, aber nicht lautlos. Wir wählen Gerät und Aufstellort so, dass die Lärmschutzwerte eingehalten werden, und erklären Ihnen die Werte vorab.",
      },
      {
        question: "Kann die Klimaanlage in Flein auch heizen?",
        answer:
          "Ja, Split-Klimaanlagen arbeiten als Luft-Luft-Wärmepumpe und heizen in der Übergangszeit sparsam mit. Das entlastet Ihre bestehende Heizung.",
      },
    ],
  },
  {
    slug: "klimaanlage-ludwigsburg",
    ort: "Ludwigsburg",
    title: "Klimaanlagen in Ludwigsburg und Umgebung",
    metaTitle: "Klimaanlagen in Ludwigsburg und Umgebung",
    metaDescription:
      "Klimaanlage in Ludwigsburg und im Landkreis kaufen und montieren lassen: Beratung vor Ort, Split- und Multisplit-Anlagen, Wartung und Reparatur.",
    intro:
      "Auch im Raum Ludwigsburg übernehmen wir Beratung, Verkauf und Montage von Klimaanlagen. Wir kommen für die Besichtigung zu Ihnen und planen die Anlage passend zu Wohnung, Haus oder Büro.",
    abschnitte: [
      {
        heading: "Altbau, Neubau und Denkmalschutz",
        text: "Ludwigsburg hat viele ältere und teils denkmalgeschützte Gebäude. Hier braucht das Außengerät manchmal eine Genehmigung, und die Leitungsführung muss besonders sorgfältig geplant werden. Wir klären mit Ihnen vorab, was erlaubt ist, und suchen eine unauffällige Lösung.",
      },
      {
        heading: "Mehrere Räume, ein Außengerät",
        text: "Gerade in Mehrfamilienhäusern ist der Platz an der Fassade knapp. Mit einem Multisplit-System versorgen Sie mehrere Räume über ein einziges Außengerät.",
      },
    ],
    umgebung: ["Ludwigsburg", "Kornwestheim", "Asperg", "Möglingen", "Freiberg am Neckar", "Bietigheim-Bissingen", "Besigheim", "Großbottwar"],
    faq: [
      {
        question: "Installiert ihr auch in Ludwigsburg?",
        answer:
          "Ja. Wir beraten vor Ort und übernehmen Lieferung, Montage und Inbetriebnahme. Rufen Sie uns an oder schicken Sie eine Anfrage.",
      },
      {
        question: "Was gilt bei einem denkmalgeschützten Haus?",
        answer:
          "Bei Kulturdenkmalen ist für sichtbare Veränderungen an der Fassade meist eine denkmalschutzrechtliche Genehmigung nötig. Wir sagen Ihnen, welche Unterlagen gebraucht werden, und planen die Anlage entsprechend.",
      },
    ],
  },
  {
    // Beratung und Kontakt über Klima-Monkey, Montage und Wartung durch einen Partnerbetrieb aus Chemnitz
    slug: "klimaanlage-chemnitz",
    ort: "Chemnitz",
    title: "Klimaanlagen Chemnitz – Verkauf und Installation",
    metaTitle: "Klimaanlagen Chemnitz – Verkauf und Installation",
    metaDescription:
      "Klimaanlage in Chemnitz kaufen und installieren lassen: Split- und Multisplit-Anlagen für Wohnung, Haus und Büro, Beratung vor Ort, Wartung und Reparatur.",
    intro:
      "Klima-Monkey ist auch in Chemnitz und Umgebung für Sie da. Beratung, Angebot und Ansprechpartner bekommen Sie direkt von uns, die Montage übernimmt ein erfahrener Partnerbetrieb aus Chemnitz – sauber und professionell, wie Sie es von uns gewohnt sind.",
    abschnitte: [
      {
        heading: "Ein Ansprechpartner, ein Partner vor Ort",
        text: "Sie sprechen mit uns: Wir klären Ihren Bedarf, wählen das passende Gerät aus und schicken Ihnen das Angebot. Für die Montage arbeiten wir mit einem Fachbetrieb aus Chemnitz zusammen, der nach unseren Standards installiert. Der Monteur kommt aus der Stadt, das heißt kurze Wege am Montagetag und trotzdem einen festen Ansprechpartner.",
      },
      {
        heading: "Klimaanlage in der Eigentumswohnung",
        text: "In Chemnitz wohnen viele Menschen in Mehrfamilienhäusern. Für das Außengerät an der Fassade oder auf dem Balkon braucht es in einer Eigentümergemeinschaft in der Regel einen Beschluss, in einer Mietwohnung die Zustimmung des Vermieters. Wir unterstützen Sie mit den technischen Angaben, die dafür gebraucht werden.",
      },
      {
        heading: "Kühlen im Sommer, zuheizen im Herbst",
        text: "Split-Klimaanlagen kühlen im Sommer und heizen als Luft-Luft-Wärmepumpe in der Übergangszeit. So nutzen Sie die Anlage einen großen Teil des Jahres.",
      },
    ],
    umgebung: ["Chemnitz", "Schneeberg", "Annaberg-Buchholz", "Zwönitz", "Marienberg"],
    faq: [
      {
        question: "Wer installiert die Klimaanlage in Chemnitz?",
        answer:
          "Die Montage übernimmt unser Partnerbetrieb aus Chemnitz. Beratung, Angebot und Abstimmung laufen über uns, sodass Sie während des ganzen Projekts einen Ansprechpartner haben.",
      },
      {
        question: "Bietet ihr in Chemnitz auch Wartung an?",
        answer:
          "Ja. Wartung und Reinigung übernimmt ebenfalls unser Partnerbetrieb aus Chemnitz. Der Wartungsvertrag kostet 169 € pro Innengerät und Wartung, dazu kommt in und um Chemnitz eine Anfahrtspauschale von 39 € pro Wartung. Alle Preise inkl. MwSt.",
      },
      {
        question: "Wie läuft eine Anfrage aus Chemnitz ab?",
        answer:
          "Sie schicken uns eine Anfrage oder rufen an. Wir klären die wichtigsten Punkte am Telefon und stimmen dann mit Ihnen und unserem Partner den Termin vor Ort ab.",
      },
    ],
  },
];
