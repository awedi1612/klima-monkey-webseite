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
    phone: "+49 7131 640 69 53",
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
    "Flein",
    "Bad Friedrichshall",
    "Bad Rappenau",
    "Lauffen am Neckar",
    "Ludwigsburg",
    "Chemnitz",
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
        label: "Wartung & Reinigung",
        href: "/leistungen/wartung-klimaanlagen",
        description: "Wartung, Reinigung und Wartungsvertrag",
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
  { label: "Referenzen", href: "/referenzen" },
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
    metaTitle: "Klimaanlagen kaufen und installieren lassen",
    metaDescription:
      "Split- und Multisplit-Klimaanlagen von Bosch, Daikin und Mitsubishi: kostenlose Vor-Ort-Beratung und Montage durch zertifizierte Kältetechniker im Raum Heilbronn.",
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
          "Eine Single-Split-Klimaanlage für einen Raum gibt es bei uns ab 2.200 € inklusive Montage, eine Duo-Split-Anlage für zwei Räume ab 4.500 €. Der genaue Preis hängt von Raumgröße, Gerät und Leitungsweg ab. Nach einer kostenlosen Vor-Ort-Beratung erhalten Sie ein verbindliches Angebot.",
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
    slug: "wartung-klimaanlagen",
    title: "Wartung & Reinigung von Klimaanlagen",
    shortTitle: "Wartung",
    icon: "Wrench",
    metaTitle: "Klimaanlagen Wartung und Reinigung",
    metaDescription:
      "Klimaanlage warten und reinigen lassen im Raum Heilbronn: Wartungsvertrag für 169 € pro Innengerät inkl. MwSt., Reinigung, Desinfektion und Prüfung des Kältekreises.",
    summary:
      "Regelmäßige Wartung und hygienische Reinigung Ihrer Klimaanlage – für saubere Luft, volle Leistung und eine lange Lebensdauer.",
    heroText:
      "Eine Klimaanlage arbeitet nur dann sparsam und hygienisch, wenn sie regelmäßig gewartet wird. Wir reinigen und prüfen Split- und Multisplit-Anlagen aller gängigen Hersteller – auch Geräte, die wir nicht selbst eingebaut haben.",
    features: [
      "Reinigung von Filtern, Wärmetauscher und Lüfterwalze",
      "Desinfektion des Innengeräts gegen Keime und Gerüche",
      "Prüfung von Kondensatablauf und Kondensatwanne",
      "Kontrolle von Kältekreis, Drücken und Temperaturen",
      "Sichtprüfung des Außengeräts und der Leitungen",
      "Wartungsvertrag: 169 € pro Innengerät und Wartung",
    ],
    specialConditions: {
      eyebrow: "Wartungsvertrag",
      title: "Wartungsvertrag für Privatkunden",
      intro:
        "Mit dem Wartungsvertrag kümmern wir uns um den Termin: einmal im Jahr, wenn Ihre Anlage es braucht, sonst in einem längeren Intervall. So bleibt sie sauber und sparsam, und Sie zahlen keine Wartung, die nicht nötig ist. Alle Preise inkl. MwSt.",
      items: [
        {
          icon: "BadgePercent",
          title: "169 € pro Innengerät",
          text: "Sie zahlen pro Innengerät und Wartung. Reinigung, Desinfektion und alle Prüfungen der Wartung sind enthalten.",
        },
        {
          icon: "Car",
          title: "Anfahrt ab 39 €",
          text: "39 € im Umkreis von 25 km um Heilbronn sowie in und um Chemnitz, 69 € für weiter entfernte Orte in unserem Einsatzgebiet. Die Anfahrt fällt einmal pro Wartung an, egal wie viele Innengeräte gewartet werden.",
        },
        {
          icon: "ShieldCheck",
          title: "Auch für fremd eingebaute Anlagen",
          text: "Wir warten Split- und Multisplit-Anlagen der gängigen Hersteller, auch wenn ein anderer Betrieb sie installiert hat.",
        },
      ],
    },
    faq: [
      {
        question: "Wie oft sollte eine Klimaanlage gewartet werden?",
        answer:
          "Bei häufiger Nutzung empfehlen wir eine Wartung einmal im Jahr, am besten vor Beginn der Kühlsaison im Frühjahr. Läuft die Anlage nur selten, reicht oft ein längeres Intervall. Im Wartungsvertrag legen wir das Intervall nach dem Zustand Ihrer Anlage fest.",
      },
      {
        question: "Meine Klimaanlage stinkt – woran liegt das?",
        answer:
          "Muffiger Geruch entsteht meist durch Keime und Schimmel am feuchten Wärmetauscher oder in der Lüfterwalze, manchmal auch durch einen verstopften Kondensatablauf. Eine gründliche Reinigung mit Desinfektion beseitigt die Ursache. Bitte nicht nur Duftspray verwenden, das überdeckt das Problem nur.",
      },
      {
        question: "Meine Klimaanlage kühlt nicht mehr richtig. Was kann ich tun?",
        answer:
          "Prüfen Sie zuerst, ob die Filter im Innengerät verstaubt sind, und reinigen Sie sie. Bringt das nichts, kann der Wärmetauscher verschmutzt sein oder Kältemittel fehlen. Das gehört in die Hände eines zertifizierten Kältetechnikers. Wir finden die Ursache und beheben sie.",
      },
      {
        question: "Kann ich die Klimaanlage selbst reinigen?",
        answer:
          "Die Filter im Innengerät können Sie selbst ausbauen, absaugen oder auswaschen, je nach Nutzung alle zwei bis vier Wochen. Wärmetauscher, Lüfterwalze und Kältekreis sollten Sie dagegen dem Fachbetrieb überlassen.",
      },
      {
        question: "Gibt es einen Wartungsvertrag für Privatkunden?",
        answer:
          "Ja. Der Wartungsvertrag kostet 169 € pro Innengerät und Wartung inkl. MwSt. Dazu kommt einmal pro Wartung die Anfahrt: 39 € im Umkreis von 25 km um Heilbronn sowie in und um Chemnitz, 69 € für weiter entfernte Orte in unserem Einsatzgebiet. Bei zwei Innengeräten in Heilbronn sind das zum Beispiel 377 € pro Wartung. Gewartet wird einmal im Jahr, wenn es nötig ist, sonst in einem längeren Intervall.",
      },
      {
        question: "Wartet ihr auch Klimaanlagen, die andere Firmen eingebaut haben?",
        answer:
          "Ja, wir warten Split- und Multisplit-Anlagen der gängigen Hersteller, unabhängig davon, wer sie installiert hat.",
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
    metaTitle: "Klimaanlagen mieten für Büro- und Schulcontainer",
    metaDescription:
      "Langzeitmiete von Klimaanlagen für Bürocontainer, Schulcontainer und temporäre Gebäude: inklusive Installation, Wartung und Rückbau. Sonderkonditionen für Kommunen.",
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
      eyebrow: "Öffentliche Auftraggeber",
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
    metaTitle: "Dezentrale Lüftungsanlage kaufen und installieren",
    metaDescription:
      "Dezentrale Lüftung mit Wärmerückgewinnung: frische Luft ohne Fensterlüften, weniger Feuchtigkeit und Schimmelrisiko. Beratung und Einbau im Raum Heilbronn.",
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
    metaTitle: "Finanzierung für Klimaanlage, Wärmepumpe und Photovoltaik",
    metaDescription:
      "Klimaanlage, Wärmepumpe oder Photovoltaik in Raten bezahlen: Wir vermitteln passende Finanzierungen und rechnen mögliche Förderungen direkt mit ein.",
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
    specialConditions: {
      eyebrow: "Ablauf",
      title: "So funktioniert Ihre Finanzierung",
      intro:
        "Wir begleiten Sie von der ersten Beratung bis zur Umsetzung – transparent und ohne Formular-Bürokratie.",
      items: [
        {
          icon: "FileText",
          title: "Kostenlose Beratung & Kostenvoranschlag",
          text: "Wir ermitteln gemeinsam den tatsächlichen Finanzierungsbedarf für Ihr Projekt – unverbindlich und ohne Kosten.",
        },
        {
          icon: "Handshake",
          title: "Individueller Finanzierungsvorschlag",
          text: "Als Vermittler stimmen wir Sie mit etablierten Finanzierungspartnern zusammen und passen Ratenhöhe und Laufzeit an Ihr Budget an.",
        },
        {
          icon: "BadgePercent",
          title: "Kombination mit Förderung",
          text: "Wo möglich, rechnen wir staatliche Zuschüsse wie BAFA oder KfW direkt in Ihre Finanzierung mit ein.",
        },
      ],
    },
    faq: [
      {
        question: "Welche Finanzierungsmodelle bietet Klima-Monkey an?",
        answer:
          "Wir vermitteln individuelle Ratenzahlungsmodelle passend zu Ihrem Projekt und Budget und beraten Sie transparent zu allen Konditionen.",
      },
      {
        question: "Ist Klima-Monkey selbst der Kreditgeber?",
        answer:
          "Nein. Wir vermitteln an etablierte Finanzierungspartner und begleiten Sie durch den gesamten Prozess – die eigentliche Finanzierung läuft über den jeweiligen Partner.",
      },
      {
        question: "Lässt sich eine Finanzierung mit Förderungen kombinieren?",
        answer:
          "Ja, wir stimmen die Finanzierung so ab, dass mögliche Förderungen wie BAFA- oder KfW-Zuschüsse mit eingerechnet werden.",
      },
      {
        question: "Welche Rate und Laufzeit sind möglich?",
        answer:
          "Das hängt von Ihrem Projekt und Ihrer persönlichen Situation ab. Nach einer kurzen Beratung erhalten Sie einen individuellen, unverbindlichen Finanzierungsvorschlag.",
      },
    ],
  },
  {
    slug: "foerderung",
    title: "Förderung",
    shortTitle: "Förderung",
    icon: "BadgePercent",
    metaTitle: "Förderung für Wärmepumpe, Klimaanlage und Photovoltaik",
    metaDescription:
      "Welche Förderung gibt es für Ihr Projekt? Wir prüfen BAFA- und KfW-Programme, unterstützen beim Antrag und kombinieren Förderung mit Finanzierung.",
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
    metaTitle: "Photovoltaik kaufen und installieren lassen",
    metaDescription:
      "Photovoltaik im Raum Heilbronn: Ertragsberechnung für Ihr Dach, Montage, Anmeldung beim Netzbetreiber und Kombination mit Klimaanlage oder Wärmepumpe.",
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
    metaTitle: "Stromspeicher für Photovoltaik kaufen und nachrüsten",
    metaDescription:
      "Batteriespeicher für Ihre PV-Anlage: Solarstrom abends und nachts nutzen, Speichergröße passend zum Verbrauch, Nachrüstung und optional Notstrom.",
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
