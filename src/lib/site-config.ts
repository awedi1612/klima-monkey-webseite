export const siteConfig = {
  name: "Klima-Monkey",
  tagline: "Ihr Klima ist unsere Mission",
  description:
    "Klima-Monkey ist Ihr Fachbetrieb für Klimaanlagen in Heilbronn: Verkauf, Installation, Wartung und Reparatur sowie Langzeitmiete für Büro- und Schulcontainer.",
  url: "https://www.klima-monkey.de",
  legal: {
    fullName: "Klima-Monkey UG (haftungsbeschränkt)",
    street: "Rosenbergstraße 31",
    zipCity: "74072 Heilbronn",
    phone: "+49 7131 382 94 73",
    mobile: "+49 1525 601 69 90",
    email: "info@klima-monkey.de",
    owner: "André Weber & Martin Nowak",
    vatId: "DE458403757",
    commercialRegister: "Amtsgericht Stuttgart, HRB 801449",
    whatsapp: "4915256016990",
  },
  serviceArea: [
    "Heilbronn",
    "Neckarsulm",
    "Bad Friedrichshall",
    "Bad Rappenau",
    "Lauffen am Neckar",
    "Region Heilbronn-Franken",
  ],
  social: {
    facebook: "https://www.facebook.com/klimamonkey",
    instagram: "https://www.instagram.com/klimamonkey",
    tiktok: "https://www.tiktok.com/@klimamonkey",
    google: "https://www.google.com/maps/place/?q=place_id:ChIJVes0_kEvmEcRo6it2iMIerw",
    elf1880: "https://www.11880.com/branchenbuch/heilbronn-neckar/061356614B114008665/klima-monkey-ug.html",
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; description: string }[];
};

export const navItems: NavItem[] = [
  { label: "Start", href: "/" },
  { label: "Über uns", href: "/ueber-uns" },
  {
    label: "Leistungen",
    href: "/leistungen",
    children: [
      {
        label: "Klimaanlagen",
        href: "/leistungen/klimaanlagen",
        description: "Verkauf, Installation, Wartung & Reparatur",
      },
      {
        label: "Vermietung",
        href: "/leistungen/vermietung",
        description: "Langzeitmiete für Büro- & Schulcontainer",
      },
      {
        label: "Dezentrale Lüftung",
        href: "/leistungen/lueftung",
        description: "Verkauf & Installation mit Wärmerückgewinnung",
      },
      {
        label: "Finanzierung",
        href: "/leistungen/finanzierung",
        description: "Flexible Finanzierungslösungen für Ihr Projekt",
      },
      {
        label: "Förderung",
        href: "/leistungen/foerderung",
        description: "Wir sichern Ihnen staatliche Fördermittel",
      },
      {
        label: "Photovoltaik",
        href: "/leistungen/photovoltaik",
        description: "Solaranlagen für nachhaltige, eigene Energieerzeugung",
      },
      {
        label: "Stromspeicher",
        href: "/leistungen/stromspeicher",
        description: "Batteriespeicher für maximale Energieunabhängigkeit",
      },
    ],
  },
  { label: "Monkeys", href: "/monkeys" },
  { label: "Shop", href: "/shop" },
  { label: "Kontakt", href: "/kontakt" },
];

export const services = [
  {
    slug: "klimaanlagen",
    title: "Klimaanlagen",
    shortTitle: "Klimaanlagen",
    icon: "Snowflake",
    featured: true,
    image: "/images/klimaanlage-hero.jpg",
    summary:
      "Verkauf, Installation, Wartung und Reparatur von Split- und Multisplit-Klimaanlagen – unser Kerngeschäft, professionell aus einer Hand.",
    heroText:
      "Klimaanlagen sind unsere Kernkompetenz: Wir verkaufen, installieren, warten und reparieren Klimaanlagen für Zuhause und Gewerbe in der Region Heilbronn – zuverlässig und schnell.",
    features: [
      "Verkauf & kostenlose Vor-Ort-Beratung",
      "Fachgerechte Installation durch zertifizierte Kältetechniker",
      "Premium-Markengeräte, u. a. Bosch Climate, Mitsubishi Heavy Industries & Daikin",
      "Regelmäßige Wartung für dauerhaft effizienten Betrieb",
      "Schnelle Reparatur bei Störungen",
    ],
    faq: [
      {
        question: "Was kostet eine Klimaanlage von Klima-Monkey?",
        answer:
          "Die Kosten hängen von Raumgröße, Gerätetyp und Anzahl der Innengeräte ab. Nach einer kostenlosen Vor-Ort-Beratung erhalten Sie ein transparentes, individuelles Angebot.",
      },
      {
        question: "Bietet Klima-Monkey auch Wartung und Reparatur an?",
        answer:
          "Ja, Wartung und Reparatur gehören zu unserem Kerngeschäft. Wir halten Ihre Anlage dauerhaft effizient und reagieren schnell bei Störungen.",
      },
      {
        question: "Wie laut ist eine moderne Klimaanlage?",
        answer:
          "Moderne Innengeräte arbeiten im Schlafzimmer-Modus oft unter 20 dB(A) – kaum hörbar. Wir beraten Sie zur passenden Geräteklasse für Ihren Einsatzzweck.",
      },
      {
        question: "Kann eine Klimaanlage auch heizen?",
        answer:
          "Ja, moderne Split-Klimaanlagen arbeiten als Luft-Luft-Wärmepumpe und können im Winter zusätzlich effizient heizen.",
      },
    ],
  },
  {
    slug: "vermietung",
    title: "Vermietung",
    shortTitle: "Vermietung",
    icon: "CalendarClock",
    featured: true,
    image: "/images/waermepumpe.jpg",
    summary:
      "Langzeitmiete von Klimaanlagen für Bürocontainer, Schulcontainer und temporäre Gebäude – schnell einsatzbereit, ohne Investition.",
    heroText:
      "Für Bürocontainer, Schulcontainer, Baustellen-Container und andere temporäre Gebäude vermieten wir Klimaanlagen zur Langzeitmiete – inklusive Installation, Wartung und Rückbau.",
    features: [
      "Langzeitmiete statt hoher Anschaffungskosten",
      "Ideal für Bürocontainer, Schulcontainer & Interimslösungen",
      "Inklusive Installation und laufender Wartung",
      "Flexible Vertragslaufzeiten, planbare monatliche Kosten",
      "Rückbau & Abholung am Vertragsende inklusive",
    ],
    specialConditions: {
      title: "Sonderkonditionen für Kommunen & Schulen",
      intro:
        "Für Gemeinden, Schulträger und Behörden bieten wir spezielle Konditionen, damit Klimatisierung im öffentlichen Bereich unkompliziert bleibt.",
      items: [
        {
          icon: "TrendingDown",
          title: "Staffelpreise nach Laufzeit",
          text: "Ob kurzfristiger Engpass oder mehrjährige Lösung – je länger die Mietdauer, desto günstiger der Monatspreis. Ihr individuelles Angebot erhalten Sie nach kurzer Bedarfsklärung.",
        },
        {
          icon: "FileText",
          title: "Rahmenvertrag möglich",
          text: "Für wiederkehrenden Bedarf, etwa in der jährlichen Hitzeperiode, schließen wir gerne einen Rahmenvertrag ab – Sie rufen flexibel ab, ohne jedes Mal neu zu verhandeln.",
        },
        {
          icon: "ShieldCheck",
          title: "Keine Kaution für öffentliche Auftraggeber",
          text: "Als bonitätssicherer Vertragspartner verzichten wir bei Kommunen, Schulen und Behörden auf eine Mietkaution.",
        },
      ],
    },
    faq: [
      {
        question: "Für welche Objekte eignet sich die Vermietung?",
        answer:
          "Klassische Anwendungsfälle sind Bürocontainer, Schulcontainer, Baustelleneinrichtungen und andere temporäre oder modulare Gebäude, die schnell und ohne große Investition klimatisiert werden müssen.",
      },
      {
        question: "Wie lange läuft ein Mietvertrag mindestens?",
        answer:
          "Wir bieten flexible Laufzeiten für die Langzeitmiete an, die wir individuell auf Ihr Projekt abstimmen – sprechen Sie uns auf Ihren konkreten Bedarf an.",
      },
      {
        question: "Ist die Wartung während der Mietzeit inklusive?",
        answer:
          "Ja, Wartung und Service sind während der gesamten Mietdauer inklusive, damit die Anlage jederzeit zuverlässig läuft.",
      },
      {
        question: "Was passiert am Ende der Mietzeit?",
        answer:
          "Wir übernehmen Demontage, Rückbau und Abholung der Anlage – für Sie entsteht kein zusätzlicher Aufwand.",
      },
      {
        question: "Bietet ihr Kommunen und Schulen Rahmenverträge an?",
        answer:
          "Ja. Für wiederkehrenden Bedarf, etwa in den Sommermonaten, schließen wir gerne einen Rahmen- bzw. Abrufvertrag ab, aus dem Sie flexibel Klimaanlagen abrufen können, ohne jedes Mal neu zu verhandeln.",
      },
      {
        question: "Ist bei Kommunen und Behörden eine Mietkaution erforderlich?",
        answer:
          "Nein. Öffentliche Auftraggeber sind bei uns von der sonst üblichen Mietkaution befreit.",
      },
    ],
  },
  {
    slug: "lueftung",
    title: "Dezentrale Lüftung",
    shortTitle: "Lüftung",
    icon: "Wind",
    image: "/images/lueftung-teaser.png",
    summary:
      "Verkauf und Installation dezentraler Lüftungssysteme für automatischen Luftaustausch mit Wärmerückgewinnung – ganz ohne Lüften per Hand.",
    heroText:
      "Dezentrale Lüftungssysteme sorgen für kontinuierlich frische Luft und ein gesundes Raumklima – mit Wärmerückgewinnung, die Heizenergie spart. Wir beraten, verkaufen und installieren passend zu Ihrem Zuhause.",
    features: [
      "Automatischer Luftaustausch ohne Fensterlüften",
      "Wärmerückgewinnung spart Heizenergie",
      "Reduziert Feuchtigkeit & Schimmelrisiko",
      "Einfache Nachrüstung auch im Bestandsbau",
      "Fachgerechte Installation durch unser Team",
    ],
    faq: [
      {
        question: "Was ist eine dezentrale Lüftungsanlage?",
        answer:
          "Im Gegensatz zu zentralen Systemen mit Rohrnetz arbeitet jedes Gerät einer dezentralen Lüftung eigenständig direkt in der Außenwand eines Raumes – ideal für die Nachrüstung, da kein aufwendiges Rohrsystem nötig ist.",
      },
      {
        question: "Lohnt sich dezentrale Lüftung auch im Altbau?",
        answer:
          "Ja, gerade im Bestandsbau ist die Nachrüstung unkompliziert, da kein zentrales Rohrnetz verlegt werden muss. Wir prüfen vor Ort, welche Lösung zu Ihrem Gebäude passt.",
      },
    ],
  },
  {
    slug: "finanzierung",
    title: "Finanzierung",
    shortTitle: "Finanzierung",
    icon: "HandCoins",
    summary:
      "Flexible Finanzierungslösungen, damit Ihr Projekt nicht am Budget scheitert.",
    heroText:
      "Klimaanlage, Wärmepumpe oder Photovoltaik – wir finden mit Ihnen die passende Finanzierung für Ihr Vorhaben.",
    features: [
      "Individuelle Ratenpläne",
      "Transparente Konditionen ohne versteckte Kosten",
      "Kombinierbar mit staatlichen Förderungen",
      "Persönliche Beratung statt Formular-Bürokratie",
    ],
    faq: [
      {
        question: "Welche Finanzierungsmodelle bietet Klima-Monkey an?",
        answer:
          "Wir vermitteln individuelle Ratenzahlungsmodelle passend zu Ihrem Projekt und Budget und beraten Sie transparent zu allen Konditionen.",
      },
      {
        question: "Lässt sich eine Finanzierung mit Förderungen kombinieren?",
        answer:
          "Ja, wir stimmen die Finanzierung so ab, dass mögliche Förderungen wie BAFA- oder KfW-Zuschüsse mit eingerechnet werden.",
      },
    ],
  },
  {
    slug: "foerderung",
    title: "Förderung",
    shortTitle: "Förderung",
    icon: "BadgePercent",
    summary:
      "Wir kennen die aktuellen Förderprogramme und sichern Ihnen die maximal mögliche Unterstützung.",
    heroText:
      "Fördermittel-Dschungel? Nicht mit uns. Wir prüfen für Sie, welche staatlichen Förderungen für Ihr Projekt infrage kommen.",
    features: [
      "Prüfung aller relevanten Förderprogramme (u. a. BAFA, KfW)",
      "Unterstützung bei Anträgen & Nachweisen",
      "Kombination mehrerer Förderungen möglich",
      "Maximale Ersparnis durch korrekte Beantragung",
    ],
    faq: [
      {
        question: "Welche Förderungen gibt es für Wärmepumpen und Klimaanlagen?",
        answer:
          "Je nach Gerät und Einsatzzweck kommen u. a. BAFA-Förderungen für effiziente Heiztechnik infrage. Wir prüfen für Sie individuell, welche Programme aktuell gelten.",
      },
      {
        question: "Übernimmt Klima-Monkey die Antragstellung?",
        answer:
          "Ja, wir unterstützen Sie bei der Zusammenstellung der Unterlagen und der Antragstellung, damit Sie die maximale Förderung erhalten.",
      },
    ],
  },
  {
    slug: "photovoltaik",
    title: "Photovoltaik",
    shortTitle: "Photovoltaik",
    icon: "Sun",
    image: "/images/photovoltaik-hero.jpg",
    summary:
      "Solaranlagen, die Ihre Energiekosten senken und Sie unabhängiger vom Strommarkt machen.",
    heroText:
      "Eigenen, sauberen Strom erzeugen: Wir planen und installieren Photovoltaikanlagen, die zu Ihrem Dach, Verbrauch und Budget passen.",
    features: [
      "Individuelle Ertragsberechnung für Ihr Dach",
      "Hochwertige Module & Wechselrichter",
      "Kombination mit Wärmepumpe & Klimaanlage möglich",
      "Anmeldung & Bürokratie übernehmen wir",
      "Langfristige Ertrags- und Leistungsgarantien",
    ],
    faq: [
      {
        question: "Lohnt sich Photovoltaik in Heilbronn?",
        answer:
          "Ja – die Region Heilbronn bietet gute Sonneneinstrahlungswerte. Wie schnell sich eine Anlage amortisiert, hängt von Dachausrichtung, Verbrauch und Förderung ab, die wir individuell berechnen.",
      },
      {
        question: "Wie lange dauert die Installation einer PV-Anlage?",
        answer:
          "Je nach Anlagengröße dauert die reine Montage in der Regel ein bis drei Tage. Planung, Anmeldung und Netzanschluss werden von uns koordiniert.",
      },
      {
        question: "Übernimmt Klima-Monkey die Anmeldung der Anlage?",
        answer:
          "Ja, wir kümmern uns um Anmeldung beim Netzbetreiber und im Marktstammdatenregister, damit Sie sich um nichts kümmern müssen.",
      },
    ],
  },
  {
    slug: "stromspeicher",
    title: "Stromspeicher",
    shortTitle: "Stromspeicher",
    icon: "BatteryCharging",
    summary:
      "Batteriespeicher, mit denen Sie selbst erzeugten Solarstrom auch abends und nachts nutzen.",
    heroText:
      "Mehr Unabhängigkeit vom Netz: Mit dem passenden Stromspeicher nutzen Sie Ihren Solarstrom rund um die Uhr statt ihn einzuspeisen.",
    features: [
      "Speichergrößen passend zu Haushalt & Verbrauch",
      "Nahtlose Integration in bestehende PV-Anlagen",
      "Notstromfähige Systeme optional verfügbar",
      "Monitoring per App",
      "Förderfähig – wir prüfen Ihre Optionen",
    ],
    faq: [
      {
        question: "Welche Speichergröße brauche ich?",
        answer:
          "Das hängt von Ihrem Jahresverbrauch und der Größe Ihrer PV-Anlage ab. In der Beratung ermitteln wir die für Sie wirtschaftlichste Speichergröße.",
      },
      {
        question: "Kann ich einen Stromspeicher nachrüsten?",
        answer:
          "Ja, ein Stromspeicher lässt sich in der Regel problemlos in eine bestehende Photovoltaikanlage nachrüsten.",
      },
      {
        question: "Ist ein Stromspeicher auch für den Notstromfall geeignet?",
        answer:
          "Optional bieten wir notstromfähige Speichersysteme an, die bei einem Netzausfall wichtige Verbraucher weiterversorgen können.",
      },
    ],
  },
] as const;
