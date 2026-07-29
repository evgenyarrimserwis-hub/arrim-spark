import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useRef, useEffect } from "react";
import { Toaster, toast } from "sonner";
import {
  Phone, Mail, Clock, MapPin, Wrench, Stethoscope, Gauge, Wind,
  Sofa, ClipboardCheck, FileText, Package, Truck, ShieldCheck,
  Sparkles, CheckCircle2, AlertTriangle, Menu, X, ChevronDown, Star, MessageCircle,
} from "lucide-react";
import "leaflet/dist/leaflet.css";
import type * as LeafletTypes from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIconUrl from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import heroImg from "@/assets/hero-dental.jpg";
import technicianImg from "@/assets/technician.jpg";
import equipmentImg from "@/assets/equipment.jpg";
import logoIcon from "@/assets/logo-icon.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ARIMSERWIS — Serwis sprzętu stomatologicznego Warszawa | 7 dni w tygodniu" },
      { name: "description", content: "Serwis i naprawa unitów stomatologicznych, autoklawów, kompresorów i systemów ssących w Warszawie i okolicach. Szybki dojazd, 7 dni w tygodniu 7:00–21:00." },
      { property: "og:title", content: "ARIMSERWIS — Serwis sprzętu stomatologicznego Warszawa" },
      { property: "og:description", content: "Diagnostyka, naprawy, przeglądy techniczne gabinetów stomatologicznych. Tel. +48 570 974 753." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Landing,
});

type Lang = "pl" | "de" | "en";

const PHONE = "+48 570 974 753";
const PHONE_HREF = "tel:+48570974753";
const WA_HREF = "https://wa.me/48570974753";
const EMAIL = "arimserwis@gmail.com";
const NIP = "5291833249";

// Web3Forms delivers this contact form straight to EMAIL (no backend needed).
// Get a free access key at https://web3forms.com (enter arimserwis@gmail.com,
// confirm the email they send you) and paste it below, then rebuild the site.
const WEB3FORMS_ACCESS_KEY = "931e2eb7-53ff-474a-83ce-af700f0ee842";
const ADDRESS = "ul. H. Szczerkowskiego 4, 05-827 Grodzisk Mazowiecki";
const ADDRESS_COORDS: [number, number] = [52.1135, 20.6441811];

// Service-zone outline: a narrow oval along the Żyrardów <-> Ursus axis (the corridor
// the office actually drives: Żyrardów - Grodzisk Mazowiecki [office] - Milanówek -
// Brwinów - Pruszków - Piastów - Ursus, ~17.5 km half-length / ~9 km half-width), merged
// with a rounded lobe reaching south to Mszczonów and smoothed (morphological closing) so
// the join reads as one continuous oval rather than two overlapping circles. The shape
// intentionally stops at Ursus (Włochy, Okęcie, Warszawa Zachód and central Warsaw are
// excluded) and stays well clear of Konstancin-Jeziorna.
const SERVICE_ZONE: [number, number][] = [
  [52.0041,20.3895],
  [52.0495,20.424],
  [52.0796,20.4318],
  [52.0921,20.4376],
  [52.1193,20.4613],
  [52.1399,20.4886],
  [52.1567,20.517],
  [52.1725,20.5496],
  [52.1873,20.5864],
  [52.202,20.6326],
  [52.2136,20.6811],
  [52.2212,20.7289],
  [52.2243,20.7674],
  [52.2238,20.8063],
  [52.2192,20.8408],
  [52.2106,20.8673],
  [52.1978,20.8863],
  [52.1823,20.8953],
  [52.1662,20.8953],
  [52.1479,20.8872],
  [52.1269,20.8693],
  [52.1055,20.8425],
  [52.0846,20.8077],
  [52.0652,20.7665],
  [52.0433,20.7069],
  [52.0279,20.6789],
  [52.0167,20.666],
  [52.0027,20.6555],
  [51.9628,20.644],
  [51.9449,20.6325],
  [51.9269,20.6109],
  [51.9132,20.582],
  [51.9041,20.5424],
  [51.9026,20.5216],
  [51.9035,20.4961],
  [51.9116,20.456],
  [51.9202,20.4346],
  [51.929,20.4193],
  [51.9507,20.3963],
  [51.9656,20.3883],
  [51.9783,20.3854],
  [52.0041,20.3895],
];

const t = {
  pl: {
    nav: { services: "Usługi", pricing: "Cennik", area: "Obszar", reviews: "Opinie", faq: "FAQ", contact: "Kontakt" },
    emergencyBar: "AWARIA SPRZĘTU? Szybka reakcja serwisowa — Warszawa i okolice.",
    badge: "Warszawa i okolice · 7 dni w tygodniu",
    heroTitle: "Profesjonalny serwis sprzętu stomatologicznego w Warszawie i okolicach",
    heroHighlight: "Warszawie i okolicach",
    heroSub: "Diagnostyka, naprawy, przeglądy techniczne oraz zaopatrzenie materiałowo-gospodarcze — kompleksowa obsługa gabinetów stomatologicznych.",
    trust: ["Szybki dojazd", "Doświadczenie techniczne", "Obsługa wielu marek", "7 dni w tygodniu", "Praca 7:00 – 21:00", "Minimalizacja przestojów"],
    ctaReport: "Zgłoś awarię", ctaCall: "Zadzwoń teraz",
    onSiteTitle: "Serwis na miejscu", onSiteDesc: "Diagnostyka i naprawa w gabinecie klienta",
    aboutLabel: "O firmie", aboutTitle: "O nas",
    aboutLead: "ARIMSERWIS specjalizuje się w kompleksowym serwisie sprzętu stomatologicznego dla gabinetów oraz małych klinik.",
    aboutPoints: ["Diagnostyka usterek", "Naprawy urządzeń", "Przeglądy techniczne", "Modernizacje sprzętu", "Dokumentacja techniczna", "Minimalizacja przestojów"],
    servicesLabel: "Usługi", servicesTitle: "Nasze usługi", servicesLead: "Pełna obsługa techniczna gabinetu — od diagnostyki po modernizacje.",
    services: [
      { title: "Unity stomatologiczne", items: ["Serwis i naprawa", "Hydraulika · elektronika · pneumatyka", "Części zamienne", "Modernizacje"] },
      { title: "Autoklawy", items: ["Naprawa i kalibracja", "Testy sterylizacji", "Konserwacja", "Przeglądy okresowe"] },
      { title: "Kompresory i systemy ssące", items: ["Wymiana filtrów i osuszaczy", "Kontrola szczelności", "Serwis i czyszczenie systemów ssących", "Modernizacje i przeglądy okresowe"] },
      { title: "Diagnostyka, przeglądy i dokumentacja", items: ["Szybka ocena awarii i wycena na miejscu", "Okresowe przeglądy techniczne", "Raporty i zalecenia techniczne", "Ewidencja urządzeń i historia napraw"] },
      { title: "Drobne naprawy i renowacje", items: ["Drobne prace remontowe w gabinecie", "Naprawa zabudowy i mebli gabinetowych", "Renowacja tapicerki fotela", "Drobne prace elektryczne i hydrauliczne"] },
      { title: "Zaopatrzenie materiałowo-gospodarcze", items: ["Środki dezynfekcyjne i chemia gospodarcza", "Materiały jednorazowe", "Artykuły biurowe do gabinetu", "Akcesoria i drobne wyposażenie"] },
    ],
    supplyLabel: "Zaopatrzenie gabinetów", supplyTitle: "Materiały, akcesoria i części zamienne",
    supplyDesc: "Środki dezynfekcyjne, akcesoria stomatologiczne, części zamienne i wyposażenie gabinetów.",
    supplyCta: "Zapytaj o dostępność",
    pricingLabel: "Cennik", pricingTitle: "Orientacyjny cennik",
    pricingNote: "Ceny mają charakter orientacyjny. Ostateczna wycena zależy od urządzenia, zakresu prac i dostępności części.",
    pricingDisclaimer: "Przed rozpoczęciem prac klient zawsze otrzymuje wstępną wycenę. Nie wykonujemy dodatkowych napraw bez akceptacji kosztów.",
    pricingLegalNote: "Przedstawiony cennik ma charakter informacyjny i nie stanowi oferty handlowej w rozumieniu art. 66 §1 Kodeksu Cywilnego. Ceny mogą ulec zmianie i nie obejmują ewentualnych dodatkowych kosztów leczenia ustalanych indywidualnie podczas konsultacji.",
    pricing: {
      "Serwis i diagnostyka": [
        ["Diagnostyka urządzenia", "od 150 zł"],
        ["Dojazd serwisanta", "od 100 zł"],
        ["Roboczogodzina serwisowa", "od 180 zł"],
        ["Przegląd unitu stomatologicznego", "od 350 zł"],
        ["Przegląd autoklawu", "od 400 zł"],
        ["Przegląd kompresora", "od 300 zł"],
        ["Przegląd systemu ssącego", "od 300 zł"],
      ],
      "Naprawy": [
        ["Naprawa unitu stomatologicznego", "od 300 zł"],
        ["Naprawa autoklawu", "od 400 zł"],
        ["Naprawa kompresora", "od 300 zł"],
        ["Naprawa systemu ssącego", "od 300 zł"],
        ["Naprawa układów elektrycznych", "od 250 zł"],
        ["Naprawa układów pneumatycznych", "od 250 zł"],
        ["Naprawa układów hydraulicznych", "od 250 zł"],
      ],
      "Usługi dodatkowe": [
        ["Renowacja tapicerki fotela", "od 600 zł"],
        ["Kalibracja autoklawu", "od 200 zł"],
        ["Prowadzenie dokumentacji technicznej", "od 200 zł / mies."],
        ["Montaż urządzeń stomatologicznych", "od 500 zł"],
        ["Modernizacja gabinetu", "wycena indywidualna"],
      ],
    } as Record<string, [string, string][]>,
    carePlanLabel: "Opieka serwisowa", carePlanTitle: "Stała opieka dla gabinetów",
    carePlanPrice: "od 299 zł", carePlanPer: "/ miesiąc",
    carePlanItems: ["Priorytetowe zgłoszenia","Przypomnienia o przeglądach","Prowadzenie dokumentacji","Preferencyjne warunki serwisowe","Wsparcie techniczne"],
    carePlanCta: "Zapytaj o indywidualną wycenę",
    whyLabel: "Dlaczego my", whyTitle: "Dlaczego my",
    why: [
      { title: "Szybki dojazd", desc: "Minimalizujemy przestoje gabinetu." },
      { title: "Doświadczenie techniczne", desc: "Skuteczna diagnostyka i naprawy." },
      { title: "Obsługa wielu marek", desc: "Kompleksowy serwis urządzeń." },
      { title: "Transparentne ceny", desc: "Jasne warunki współpracy." },
      { title: "Dokumentacja", desc: "Pełna historia przeglądów." },
      { title: "Wsparcie techniczne", desc: "Pomoc także po wykonaniu usługi." },
    ],
    areaLabel: "Obszar", areaTitle: "Obszar działania",
    areaNote: "Możliwy dojazd również do okolicznych miejscowości po wcześniejszym uzgodnieniu.",
    reviewsLabel: "Opinie", reviewsTitle: "Opinie klientów",
    faqLabel: "FAQ", faqTitle: "Najczęściej zadawane pytania",
    faqs: [
      { q: "Jak szybko realizowany jest serwis?", a: "Awarie krytyczne staramy się obsłużyć tego samego dnia. Standardowy czas reakcji w Warszawie i okolicach to 2–24 godziny." },
      { q: "Czy wykonujecie dojazd do gabinetu?", a: "Tak. Pracujemy bezpośrednio w gabinecie klienta — diagnostyka, naprawa i wycena odbywają się na miejscu." },
      { q: "Jakie marki obsługujecie?", a: "KaVo, Dentsply Sirona, Planmeca, A-dec, W&H, NSK, Melag, Dürr Dental i inne popularne marki." },
      { q: "Czy wykonujecie przeglądy techniczne?", a: "Tak. Realizujemy przeglądy unitów, autoklawów, kompresorów i systemów ssących wraz z pełną dokumentacją techniczną." },
      { q: "Czy naprawiacie autoklawy?", a: "Tak — naprawy, kalibracja, testy sterylizacji i konserwacja autoklawów wszystkich popularnych marek." },
      { q: "Czy serwisujecie kompresory?", a: "Tak. Wymiana filtrów, osuszacze, kontrola szczelności oraz serwis okresowy kompresorów stomatologicznych." },
      { q: "Czy prowadzicie dokumentację techniczną?", a: "Tak. Prowadzimy pełną ewidencję urządzeń i historię napraw — pomagamy także podczas kontroli i audytów." },
      { q: "Jak zamówić wizytę?", a: "Wystarczy zadzwonić pod +48 570 974 753 lub wypełnić formularz na stronie. Oddzwaniamy zazwyczaj w ciągu godziny." },
      { q: "Jak wygląda wycena?", a: "Klient zawsze otrzymuje wstępną wycenę przed rozpoczęciem prac. Nie wykonujemy dodatkowych napraw bez akceptacji kosztów." },
      { q: "Czy pracujecie w weekendy?", a: "Tak. Działamy 7 dni w tygodniu w godzinach 7:00 – 21:00, również w soboty i niedziele." },
    ],
    contactLabel: "Kontakt", formTitle: "Zgłoś awarię lub zapytaj o ofertę",
    formNote: "Odpowiadamy najszybciej jak to możliwe — zazwyczaj w ciągu godziny.",
    fName: "Imię i nazwisko", fClinic: "Nazwa gabinetu", fPhone: "Telefon", fEmail: "E-mail",
    fLocation: "Lokalizacja", fDevice: "Typ urządzenia", fDevicePh: "np. unit, autoklaw, kompresor",
    fDescription: "Opis awarii",
    send: "Wyślij zgłoszenie",
    formConsent: "Klikając „Wyślij\" akceptujesz kontakt zwrotny w sprawie zgłoszenia.",
    sent: "Dziękujemy za zgłoszenie. Skontaktujemy się z Państwem najszybciej jak to możliwe.",
    sendError: "Wystąpił błąd przy wysyłaniu. Spróbuj ponownie lub zadzwoń pod " + PHONE + ".",
    hours: "7:00 – 21:00 · 7 dni w tygodniu",
    lblPhone: "Telefon", lblEmail: "E-mail", lblHours: "Godziny pracy", lblAddress: "Adres", lblNip: "NIP",
    footerTagline: "Serwis sprzętu stomatologicznego — Warszawa i okolice.",
    footerContact: "Kontakt", footerNav: "Nawigacja", footerInfo: "Informacje",
    footerPrivacy: "Polityka prywatności", footerCompany: "Dane firmy",
    footerRights: "Wszystkie prawa zastrzeżone.",
    btnCall: "Zadzwoń", btnReport: "Zgłoś awarię",
    mapTitle: "Mapa obszaru działania ARIMSERWIS",
  },
  de: {
    nav: { services: "Leistungen", pricing: "Preise", area: "Einsatzgebiet", reviews: "Bewertungen", faq: "FAQ", contact: "Kontakt" },
    emergencyBar: "GERÄTEAUSFALL? Schneller Vor-Ort-Service — Warschau und Umgebung.",
    badge: "Warschau und Umgebung · 7 Tage die Woche",
    heroTitle: "Professioneller Service für zahnärztliche Geräte in Warschau und Umgebung",
    heroHighlight: "in Warschau und Umgebung",
    heroSub: "Diagnose, Reparaturen, technische Inspektionen sowie Material- und Wirtschaftsversorgung — die umfassende Betreuung Ihrer Zahnarztpraxis.",
    trust: ["Schnelle Anfahrt", "Technische Erfahrung", "Viele Marken", "7 Tage die Woche", "Geöffnet 7:00 – 21:00", "Minimierte Ausfallzeiten"],
    ctaReport: "Störung melden", ctaCall: "Jetzt anrufen",
    onSiteTitle: "Service vor Ort", onSiteDesc: "Diagnose und Reparatur direkt in der Praxis",
    aboutLabel: "Über uns", aboutTitle: "Über uns",
    aboutLead: "ARIMSERWIS bietet den kompletten technischen Service für zahnärztliche Geräte in Praxen und kleinen Kliniken.",
    aboutPoints: ["Fehlerdiagnose", "Gerätereparaturen", "Technische Inspektionen", "Geräte-Modernisierung", "Technische Dokumentation", "Minimierte Ausfallzeiten"],
    servicesLabel: "Leistungen", servicesTitle: "Unsere Leistungen", servicesLead: "Vollständige technische Betreuung — von der Diagnose bis zur Modernisierung.",
    services: [
      { title: "Behandlungseinheiten", items: ["Service und Reparatur", "Hydraulik · Elektronik · Pneumatik", "Ersatzteile", "Modernisierung"] },
      { title: "Autoklaven", items: ["Reparatur und Kalibrierung", "Sterilisationstests", "Wartung", "Regelmäßige Prüfungen"] },
      { title: "Kompressoren und Absauganlagen", items: ["Filter- und Trocknerwechsel", "Dichtheitsprüfung", "Service und Reinigung der Absauganlagen", "Modernisierung und regelmäßige Prüfungen"] },
      { title: "Diagnose, Inspektionen und Dokumentation", items: ["Schnelle Fehlereinschätzung und Kostenvoranschlag vor Ort", "Regelmäßige technische Inspektionen", "Berichte und technische Empfehlungen", "Geräteverzeichnis und Reparaturhistorie"] },
      { title: "Kleinreparaturen und Renovierungen", items: ["Kleine Instandsetzungsarbeiten in der Praxis", "Reparatur von Einbauten und Praxismöbeln", "Renovierung der Stuhlpolsterung", "Kleinere Elektro- und Sanitärarbeiten"] },
      { title: "Material- und Wirtschaftsversorgung", items: ["Desinfektionsmittel und Reinigungschemie", "Einwegmaterialien", "Büromaterial für die Praxis", "Zubehör und Kleinausstattung"] },
    ],
    supplyLabel: "Praxisbedarf", supplyTitle: "Materialien, Zubehör und Ersatzteile",
    supplyDesc: "Desinfektionsmittel, zahnärztliches Zubehör, Ersatzteile und Praxisausstattung.",
    supplyCta: "Verfügbarkeit anfragen",
    pricingLabel: "Preise", pricingTitle: "Richtpreise",
    pricingNote: "Die Preise sind Richtwerte. Der endgültige Preis hängt vom Gerät, Arbeitsumfang und der Ersatzteilverfügbarkeit ab.",
    pricingDisclaimer: "Vor Arbeitsbeginn erhält der Kunde immer einen Kostenvoranschlag. Zusätzliche Arbeiten werden nur nach Zustimmung ausgeführt.",
    pricingLegalNote: "Die dargestellte Preisliste hat informativen Charakter und stellt kein Handelsangebot im Sinne von Art. 66 §1 des polnischen Zivilgesetzbuches dar. Die Preise können sich ändern und beinhalten keine eventuellen zusätzlichen Behandlungskosten, die individuell während der Beratung festgelegt werden.",
    pricing: {
      "Service und Diagnose": [
        ["Gerätediagnose", "ab 150 zł"],
        ["Anfahrt des Technikers", "ab 100 zł"],
        ["Servicestunde", "ab 180 zł"],
        ["Inspektion Behandlungseinheit", "ab 350 zł"],
        ["Inspektion Autoklav", "ab 400 zł"],
        ["Inspektion Kompressor", "ab 300 zł"],
        ["Inspektion Absauganlage", "ab 300 zł"],
      ],
      "Reparaturen": [
        ["Reparatur Behandlungseinheit", "ab 300 zł"],
        ["Reparatur Autoklav", "ab 400 zł"],
        ["Reparatur Kompressor", "ab 300 zł"],
        ["Reparatur Absauganlage", "ab 300 zł"],
        ["Reparatur elektrischer Systeme", "ab 250 zł"],
        ["Reparatur pneumatischer Systeme", "ab 250 zł"],
        ["Reparatur hydraulischer Systeme", "ab 250 zł"],
      ],
      "Zusätzliche Leistungen": [
        ["Renovierung Stuhlpolsterung", "ab 600 zł"],
        ["Kalibrierung Autoklav", "ab 200 zł"],
        ["Führung technischer Dokumentation", "ab 200 zł / Monat"],
        ["Installation zahnärztlicher Geräte", "ab 500 zł"],
        ["Praxis-Modernisierung", "individuelles Angebot"],
      ],
    } as Record<string, [string, string][]>,
    carePlanLabel: "Servicebetreuung", carePlanTitle: "Dauerhafte Betreuung für Praxen",
    carePlanPrice: "ab 299 zł", carePlanPer: "/ Monat",
    carePlanItems: ["Priorisierte Anfragen","Erinnerungen an Inspektionen","Dokumentationsführung","Bevorzugte Servicekonditionen","Technischer Support"],
    carePlanCta: "Individuelles Angebot anfragen",
    whyLabel: "Warum wir", whyTitle: "Warum wir",
    why: [
      { title: "Schnelle Anfahrt", desc: "Wir minimieren Praxisausfallzeiten." },
      { title: "Technische Erfahrung", desc: "Effektive Diagnose und Reparatur." },
      { title: "Viele Marken", desc: "Umfassender Gerätesupport." },
      { title: "Transparente Preise", desc: "Klare Vertragsbedingungen." },
      { title: "Dokumentation", desc: "Vollständige Wartungshistorie." },
      { title: "Technischer Support", desc: "Hilfe auch nach der Leistung." },
    ],
    areaLabel: "Gebiet", areaTitle: "Einsatzgebiet",
    areaNote: "Einsätze in weiteren umliegenden Orten sind nach vorheriger Absprache möglich.",
    reviewsLabel: "Bewertungen", reviewsTitle: "Kundenbewertungen",
    faqLabel: "FAQ", faqTitle: "Häufig gestellte Fragen",
    faqs: [
      { q: "Wie schnell erfolgt der Service?", a: "Kritische Ausfälle versuchen wir noch am selben Tag zu beheben. Die übliche Reaktionszeit in Warschau und Umgebung beträgt 2–24 Stunden." },
      { q: "Kommen Sie in die Praxis?", a: "Ja. Wir arbeiten direkt in der Praxis des Kunden — Diagnose, Reparatur und Kostenvoranschlag erfolgen vor Ort." },
      { q: "Welche Marken werden bedient?", a: "KaVo, Dentsply Sirona, Planmeca, A-dec, W&H, NSK, Melag, Dürr Dental und weitere gängige Marken." },
      { q: "Führen Sie technische Inspektionen durch?", a: "Ja. Wir führen Inspektionen von Behandlungseinheiten, Autoklaven, Kompressoren und Absauganlagen inklusive vollständiger technischer Dokumentation durch." },
      { q: "Reparieren Sie Autoklaven?", a: "Ja — Reparatur, Kalibrierung, Sterilisationstests und Wartung von Autoklaven aller gängigen Marken." },
      { q: "Warten Sie Kompressoren?", a: "Ja. Filterwechsel, Trockner, Dichtheitsprüfung und regelmäßiger Service von Dentalkompressoren." },
      { q: "Führen Sie technische Dokumentation?", a: "Ja. Wir führen ein vollständiges Geräteverzeichnis und die Reparaturhistorie — und unterstützen auch bei Kontrollen und Audits." },
      { q: "Wie vereinbare ich einen Termin?", a: "Rufen Sie einfach +48 570 974 753 an oder füllen Sie das Formular auf der Website aus. Wir rufen in der Regel innerhalb einer Stunde zurück." },
      { q: "Wie wird der Kostenvoranschlag erstellt?", a: "Der Kunde erhält vor Arbeitsbeginn immer einen ersten Kostenvoranschlag. Zusätzliche Arbeiten werden nur nach Zustimmung ausgeführt." },
      { q: "Arbeiten Sie auch am Wochenende?", a: "Ja. Wir sind 7 Tage die Woche von 7:00 bis 21:00 Uhr im Einsatz, auch samstags und sonntags." },
    ],
    contactLabel: "Kontakt", formTitle: "Störung melden oder Angebot anfragen",
    formNote: "Wir antworten so schnell wie möglich — in der Regel innerhalb einer Stunde.",
    fName: "Name", fClinic: "Name der Praxis", fPhone: "Telefon", fEmail: "E-Mail",
    fLocation: "Standort", fDevice: "Gerätetyp", fDevicePh: "z. B. Behandlungseinheit, Autoklav, Kompressor",
    fDescription: "Beschreibung der Störung",
    send: "Anfrage senden",
    formConsent: "Mit Klick auf „Senden\" stimmen Sie einer Rückmeldung zu Ihrer Anfrage zu.",
    sent: "Vielen Dank für Ihre Anfrage. Wir melden uns so schnell wie möglich bei Ihnen.",
    sendError: "Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder rufen Sie uns an: " + PHONE + ".",
    hours: "7:00 – 21:00 · 7 Tage die Woche",
    lblPhone: "Telefon", lblEmail: "E-Mail", lblHours: "Öffnungszeiten", lblAddress: "Adresse", lblNip: "USt-IdNr. (NIP)",
    footerTagline: "Service für zahnärztliche Geräte — Warschau und Umgebung.",
    footerContact: "Kontakt", footerNav: "Navigation", footerInfo: "Informationen",
    footerPrivacy: "Datenschutzerklärung", footerCompany: "Firmendaten",
    footerRights: "Alle Rechte vorbehalten.",
    btnCall: "Anrufen", btnReport: "Melden",
    mapTitle: "Einsatzgebietskarte ARIMSERWIS",
  },
  en: {
    nav: { services: "Services", pricing: "Pricing", area: "Service area", reviews: "Reviews", faq: "FAQ", contact: "Contact" },
    emergencyBar: "EQUIPMENT FAILURE? Fast on-site service — Warsaw and surroundings.",
    badge: "Warsaw and surroundings · 7 days a week",
    heroTitle: "Professional dental equipment service in Warsaw and surroundings",
    heroHighlight: "in Warsaw and surroundings",
    heroSub: "Diagnostics, repairs, technical inspections and material & facility supplies — full-service support for dental practices.",
    trust: ["Fast on-site response", "Technical expertise", "Multi-brand service", "7 days a week", "Open 7:00 – 21:00", "Minimised downtime"],
    ctaReport: "Report a failure", ctaCall: "Call now",
    onSiteTitle: "On-site service", onSiteDesc: "Diagnostics and repairs at the client's practice",
    aboutLabel: "About", aboutTitle: "About us",
    aboutLead: "ARIMSERWIS provides full-service maintenance of dental equipment for private practices and small clinics.",
    aboutPoints: ["Fault diagnostics", "Equipment repairs", "Technical inspections", "Equipment upgrades", "Technical documentation", "Minimised downtime"],
    servicesLabel: "Services", servicesTitle: "Our services", servicesLead: "Complete technical care — from diagnostics to upgrades.",
    services: [
      { title: "Dental units", items: ["Service and repair", "Hydraulics · electronics · pneumatics", "Spare parts", "Upgrades"] },
      { title: "Autoclaves", items: ["Repair and calibration", "Sterilisation tests", "Maintenance", "Periodic inspections"] },
      { title: "Compressors & suction systems", items: ["Filter and dryer replacement", "Leak testing", "Suction system service and cleaning", "Upgrades and periodic inspections"] },
      { title: "Diagnostics, inspections & documentation", items: ["Fast fault assessment and on-site quote", "Periodic technical inspections", "Reports and technical recommendations", "Equipment records and repair history"] },
      { title: "Minor repairs & renovations", items: ["Small maintenance work at the practice", "Repair of built-in fixtures and practice furniture", "Chair upholstery renovation", "Minor electrical and plumbing work"] },
      { title: "Material & facility supplies", items: ["Disinfectants and cleaning chemicals", "Disposables", "Office supplies for the practice", "Accessories and small equipment"] },
    ],
    supplyLabel: "Practice supplies", supplyTitle: "Materials, accessories and spare parts",
    supplyDesc: "Disinfectants, dental accessories, spare parts and practice equipment.",
    supplyCta: "Ask about availability",
    pricingLabel: "Pricing", pricingTitle: "Indicative pricing",
    pricingNote: "Prices are indicative. Final quote depends on device, scope of work and parts availability.",
    pricingDisclaimer: "Before any work begins, the client always receives an initial estimate. No additional work is performed without approval.",
    pricingLegalNote: "The price list shown is for informational purposes only and does not constitute a commercial offer within the meaning of Art. 66 §1 of the Polish Civil Code. Prices may change and do not include any additional treatment costs determined individually during consultation.",
    pricing: {
      "Service & diagnostics": [
        ["Equipment diagnostics", "from 150 PLN"],
        ["Technician call-out", "from 100 PLN"],
        ["Service man-hour", "from 180 PLN"],
        ["Dental unit inspection", "from 350 PLN"],
        ["Autoclave inspection", "from 400 PLN"],
        ["Compressor inspection", "from 300 PLN"],
        ["Suction system inspection", "from 300 PLN"],
      ],
      "Repairs": [
        ["Dental unit repair", "from 300 PLN"],
        ["Autoclave repair", "from 400 PLN"],
        ["Compressor repair", "from 300 PLN"],
        ["Suction system repair", "from 300 PLN"],
        ["Electrical system repair", "from 250 PLN"],
        ["Pneumatic system repair", "from 250 PLN"],
        ["Hydraulic system repair", "from 250 PLN"],
      ],
      "Additional services": [
        ["Chair upholstery renovation", "from 600 PLN"],
        ["Autoclave calibration", "from 200 PLN"],
        ["Technical documentation", "from 200 PLN / month"],
        ["Dental equipment installation", "from 500 PLN"],
        ["Practice upgrade", "individual quote"],
      ],
    } as Record<string, [string, string][]>,
    carePlanLabel: "Service care", carePlanTitle: "Ongoing care for practices",
    carePlanPrice: "from 299 PLN", carePlanPer: "/ month",
    carePlanItems: ["Priority requests","Inspection reminders","Documentation management","Preferential service rates","Technical support"],
    carePlanCta: "Request an individual quote",
    whyLabel: "Why us", whyTitle: "Why us",
    why: [
      { title: "Fast on-site response", desc: "We minimise practice downtime." },
      { title: "Technical expertise", desc: "Effective diagnostics and repairs." },
      { title: "Multi-brand service", desc: "Comprehensive equipment care." },
      { title: "Transparent pricing", desc: "Clear cooperation terms." },
      { title: "Documentation", desc: "Full inspection history." },
      { title: "Technical support", desc: "Help also after the service." },
    ],
    areaLabel: "Area", areaTitle: "Service area",
    areaNote: "On-site visits to other nearby locations are possible by prior arrangement.",
    reviewsLabel: "Reviews", reviewsTitle: "Client reviews",
    faqLabel: "FAQ", faqTitle: "Frequently asked questions",
    faqs: [
      { q: "How fast is the service?", a: "Critical failures we aim to handle the same day. Standard response time in Warsaw and surroundings is 2–24 hours." },
      { q: "Do you come to the practice?", a: "Yes. We work directly at the client's practice — diagnostics, repair and quoting all happen on-site." },
      { q: "Which brands do you service?", a: "KaVo, Dentsply Sirona, Planmeca, A-dec, W&H, NSK, Melag, Dürr Dental and other popular brands." },
      { q: "Do you perform technical inspections?", a: "Yes. We perform inspections of units, autoclaves, compressors and suction systems with full technical documentation." },
      { q: "Do you repair autoclaves?", a: "Yes — repairs, calibration, sterilisation tests and maintenance of autoclaves of all popular brands." },
      { q: "Do you service compressors?", a: "Yes. Filter replacement, dryers, leak testing and periodic service of dental compressors." },
      { q: "Do you handle technical documentation?", a: "Yes. We keep full equipment records and repair history — and assist during inspections and audits." },
      { q: "How do I book a visit?", a: "Just call +48 570 974 753 or fill in the form on the website. We usually call back within an hour." },
      { q: "How does quoting work?", a: "The client always receives an initial estimate before any work begins. No additional work is performed without approval." },
      { q: "Do you work on weekends?", a: "Yes. We operate 7 days a week from 7:00 to 21:00, including Saturdays and Sundays." },
    ],
    contactLabel: "Contact", formTitle: "Report a failure or request a quote",
    formNote: "We reply as fast as possible — usually within an hour.",
    fName: "Full name", fClinic: "Practice name", fPhone: "Phone", fEmail: "E-mail",
    fLocation: "Location", fDevice: "Device type", fDevicePh: "e.g. unit, autoclave, compressor",
    fDescription: "Failure description",
    send: "Send request",
    formConsent: "By clicking \"Send\" you agree to be contacted back about your request.",
    sent: "Thank you. We will contact you as soon as possible.",
    sendError: "Something went wrong while sending. Please try again or call us at " + PHONE + ".",
    hours: "7:00 – 21:00 · 7 days a week",
    lblPhone: "Phone", lblEmail: "E-mail", lblHours: "Working hours", lblAddress: "Address", lblNip: "Tax ID (NIP)",
    footerTagline: "Dental equipment service — Warsaw and surroundings.",
    footerContact: "Contact", footerNav: "Navigation", footerInfo: "Information",
    footerPrivacy: "Privacy policy", footerCompany: "Company details",
    footerRights: "All rights reserved.",
    btnCall: "Call", btnReport: "Report",
    mapTitle: "ARIMSERWIS service area map",
  },
} as const;

const serviceIcons = [Stethoscope, ShieldCheck, Gauge, ClipboardCheck, Wrench, Package];
const whyIcons = [Truck, Wrench, Package, FileText, ClipboardCheck, ShieldCheck];


const areas = ["Ursus","Pruszków","Piastów","Ożarów Mazowiecki","Brwinów","Milanówek","Grodzisk Mazowiecki","Żyrardów","Jaktorów","Mszczonów"];

const reviews = [
  { name: "dr Anna Kowalska", clinic: { pl: "Gabinet stomatologiczny, Mokotów", de: "Zahnarztpraxis, Mokotów", en: "Dental practice, Mokotów" },
    text: { pl: "Awaria unitu w środku dnia przyjęć — technik dojechał w ciągu dwóch godzin i naprawił hydraulikę na miejscu. Bardzo profesjonalna obsługa.",
            de: "Ausfall der Behandlungseinheit mitten im Praxisbetrieb — der Techniker war innerhalb von zwei Stunden vor Ort und reparierte die Hydraulik direkt. Sehr professioneller Service.",
            en: "Unit failure in the middle of appointments — the technician arrived within two hours and fixed the hydraulics on-site. Very professional." } },
  { name: "lek. dent. Michał Nowak", clinic: { pl: "Praktyka dentystyczna, Pruszków", de: "Zahnarztpraxis, Pruszków", en: "Dental practice, Pruszków" },
    text: { pl: "Korzystamy z opieki serwisowej od pół roku. Przeglądy zawsze w terminie, pełna dokumentacja, transparentne ceny. Polecam.",
            de: "Wir nutzen den Servicevertrag seit einem halben Jahr. Inspektionen immer pünktlich, vollständige Dokumentation, transparente Preise. Sehr empfehlenswert.",
            en: "We've been on the service plan for half a year. Inspections always on time, full documentation, transparent prices. Recommended." } },
  { name: "dr Joanna Wiśniewska", clinic: { pl: "Klinika stomatologiczna, Ursus", de: "Zahnklinik, Ursus", en: "Dental clinic, Ursus" },
    text: { pl: "Serwis autoklawu i kalibracja — wszystko zrobione szybko, z protokołem. Wreszcie firma, na której można polegać.",
            de: "Autoklaven-Service und Kalibrierung — alles schnell erledigt, mit Protokoll. Endlich eine Firma, auf die man sich verlassen kann.",
            en: "Autoclave service and calibration — everything done quickly, with a report. Finally a company you can rely on." } },
  { name: "lek. dent. Paweł Zieliński", clinic: { pl: "Gabinet, Grodzisk Mazowiecki", de: "Praxis, Grodzisk Mazowiecki", en: "Practice, Grodzisk Mazowiecki" },
    text: { pl: "Modernizacja kompresora i systemu ssącego. Doradztwo na wysokim poziomie, czysta i terminowa robota.",
            de: "Modernisierung von Kompressor und Absauganlage. Beratung auf hohem Niveau, saubere und pünktliche Arbeit.",
            en: "Compressor and suction system upgrade. Top-level advice, clean and on-time work." } },
  { name: "dr Karolina Mazur", clinic: { pl: "Gabinet, Raszyn", de: "Praxis, Raszyn", en: "Practice, Raszyn" },
    text: { pl: "Renowacja tapicerki fotela — efekt jak nowy. Materiał odporny na dezynfekcję, świetne wykonanie.",
            de: "Renovierung der Stuhlpolsterung — wie neu. Desinfektionsbeständiges Material, hervorragende Ausführung.",
            en: "Chair upholstery renovation — looks brand new. Disinfectant-resistant material, great workmanship." } },
  { name: "lek. dent. Tomasz Lewandowski", clinic: { pl: "Praktyka, Żyrardów", de: "Praxis, Żyrardów", en: "Practice, Żyrardów" },
    text: { pl: "Reagują w weekend, co dla nas kluczowe. Wycena zawsze przed pracami, żadnych niespodzianek na fakturze.",
            de: "Sie reagieren auch am Wochenende, was für uns entscheidend ist. Kostenvoranschlag immer vor Arbeitsbeginn, keine Überraschungen auf der Rechnung.",
            en: "They respond on weekends, which is key for us. Quote always before work, no invoice surprises." } },
];

function ServiceAreaMap({ title }: { title: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletTypes.Map | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!containerRef.current || mapRef.current) return;
      const L = await import("leaflet");

      if (cancelled || !containerRef.current) return;

      delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: markerIcon2x,
        iconUrl: markerIconUrl,
        shadowUrl: markerShadow,
      });

      const map = L.map(containerRef.current, { scrollWheelZoom: false }).setView(
        [52.10, 20.68],
        9
      );
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      const zonePolygon = L.polygon(SERVICE_ZONE, {
        color: "#0d9488",
        weight: 2,
        fillColor: "#14b8a6",
        fillOpacity: 0.22,
      }).addTo(map);

      L.marker(ADDRESS_COORDS)
        .addTo(map)
        .bindPopup(`ARIMSERWIS<br/>${ADDRESS}`);

      map.fitBounds(zonePolygon.getBounds(), { padding: [24, 24] });
    })();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return <div ref={containerRef} role="img" aria-label={title} className="w-full h-full" />;
}

function Landing() {
  const [lang, setLang] = useState<Lang>("pl");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const L = t[lang];

  const faqJsonLd = useMemo(() => ({
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: L.faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  }), [L]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: "Nowe zgłoszenie ze strony ARIMSERWIS",
      from_name: (formData.get("name") as string) || "Formularz ARIMSERWIS",
      ...Object.fromEntries(formData),
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (result.success) {
        toast.success(L.sent);
        form.reset();
      } else {
        toast.error(L.sendError);
      }
    } catch {
      toast.error(L.sendError);
    }
  }

  const titleParts = (() => {
    const idx = L.heroTitle.indexOf(L.heroHighlight);
    if (idx === -1) return { head: L.heroTitle, tail: "" };
    return { head: L.heroTitle.slice(0, idx), tail: L.heroTitle.slice(idx) };
  })();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster position="top-center" richColors />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Emergency bar */}
      <div className="bg-[color:var(--emergency)] text-white text-xs sm:text-sm">
        <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-center gap-2 text-center">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span className="font-medium">{L.emergencyBar}</span>
          <a href={PHONE_HREF} className="hidden sm:inline underline underline-offset-2 font-semibold ml-2">{PHONE}</a>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur bg-background/85 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 h-16 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <a href="#top" className="flex items-center gap-2 min-w-0">
            <img src={logoIcon} alt="ARIMSERWIS" className="h-9 w-9 shrink-0 object-contain" width={36} height={36} />
            <span className="font-display font-bold tracking-tight truncate text-[color:var(--navy-deep)]">ARIMSERWIS</span>
          </a>
          <div className="flex items-center gap-2">
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-foreground/80 mr-4">
              <a href="#services" className="hover:text-[color:var(--teal)]">{L.nav.services}</a>
              <a href="#pricing" className="hover:text-[color:var(--teal)]">{L.nav.pricing}</a>
              <a href="#area" className="hover:text-[color:var(--teal)]">{L.nav.area}</a>
              <a href="#reviews" className="hover:text-[color:var(--teal)]">{L.nav.reviews}</a>
              <a href="#faq" className="hover:text-[color:var(--teal)]">{L.nav.faq}</a>
              <a href="#contact" className="hover:text-[color:var(--teal)]">{L.nav.contact}</a>
            </nav>
            <div className="flex items-center gap-1 rounded-full border border-border p-1 text-xs">
              {(["pl","de","en"] as Lang[]).map(l => (
                <button key={l} onClick={() => setLang(l)} className={`px-2.5 py-1 rounded-full uppercase font-semibold transition ${lang === l ? "bg-[color:var(--navy)] text-white" : "text-foreground/60 hover:text-foreground"}`}>{l}</button>
              ))}
            </div>
            <a href={PHONE_HREF} className="hidden md:inline-flex items-center gap-2 rounded-full bg-[color:var(--navy)] text-white px-4 py-2 text-sm font-semibold hover:bg-[color:var(--navy-deep)] transition">
              <Phone className="h-4 w-4" /> {PHONE}
            </a>
            <a href="#contact" className="hidden md:inline-flex items-center gap-2 rounded-full bg-[color:var(--emergency)] text-white px-4 py-2 text-sm font-semibold hover:brightness-110 transition">
              <AlertTriangle className="h-4 w-4" /> {L.ctaReport}
            </a>
            <button onClick={() => setMenuOpen(v => !v)} className="lg:hidden p-2" aria-label="Menu">
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="lg:hidden border-t border-border bg-background">
            <nav className="px-4 py-3 flex flex-col gap-3 text-sm font-medium" onClick={() => setMenuOpen(false)}>
              <a href="#services">{L.nav.services}</a>
              <a href="#pricing">{L.nav.pricing}</a>
              <a href="#area">{L.nav.area}</a>
              <a href="#reviews">{L.nav.reviews}</a>
              <a href="#faq">{L.nav.faq}</a>
              <a href="#contact">{L.nav.contact}</a>
            </nav>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden gradient-hero text-white">
        <div className="absolute inset-0 opacity-25">
          <img src={heroImg} alt="ARIMSERWIS" className="h-full w-full object-cover" width={1920} height={1280} />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-10 md:py-16 lg:py-20 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[color:var(--teal)] animate-pulse" /> {L.badge}
            </div>
            <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight">
              {titleParts.head}<span className="text-gradient">{titleParts.tail}</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-white/80 max-w-2xl">{L.heroSub}</p>
            <div className="mt-6 rounded-2xl border border-white/15 bg-white/5 backdrop-blur px-4 py-4 sm:px-5 sm:py-5 max-w-2xl">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2.5 text-sm text-white/90">
                {L.trust.map(item => (
                  <li key={item} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[color:var(--teal)] shrink-0" />{item}</li>
                ))}
              </ul>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-[color:var(--emergency)] hover:brightness-110 px-6 py-3.5 text-sm font-bold shadow-[var(--shadow-glow)] transition">
                <AlertTriangle className="h-4 w-4" /> {L.ctaReport}
              </a>
              <a href={PHONE_HREF} className="inline-flex items-center gap-2 rounded-full bg-white text-[color:var(--navy-deep)] px-6 py-3.5 text-sm font-bold hover:bg-white/90 transition">
                <Phone className="h-4 w-4" /> {L.ctaCall} · {PHONE}
              </a>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="relative rounded-3xl overflow-hidden shadow-[var(--shadow-premium)] border border-white/10">
              <img src={technicianImg} alt="ARIMSERWIS" className="w-full h-[520px] object-cover" width={1280} height={1280} />
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-background/95 backdrop-blur p-4 text-foreground">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full gradient-teal grid place-items-center text-white"><Wrench className="h-5 w-5" /></div>
                  <div className="min-w-0">
                    <div className="font-semibold text-sm truncate">{L.onSiteTitle}</div>
                    <div className="text-xs text-muted-foreground">{L.onSiteDesc}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-10 md:py-14 bg-[color:var(--teal-soft)]/40">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-2xl">
            <SectionLabel>{L.servicesLabel}</SectionLabel>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[color:var(--navy-deep)]">{L.servicesTitle}</h2>
            <p className="mt-3 text-muted-foreground">{L.servicesLead}</p>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {L.services.map((s, idx) => {
              const Icon = serviceIcons[idx];
              return (
                <article key={s.title} className="group rounded-2xl bg-card border border-border p-6 hover:border-[color:var(--teal)] hover:shadow-[var(--shadow-premium)] transition">
                  <div className="h-11 w-11 rounded-xl gradient-teal grid place-items-center text-white shadow-[var(--shadow-glow)]"><Icon className="h-5 w-5" /></div>
                  <h3 className="mt-4 font-semibold text-lg text-[color:var(--navy-deep)]">{s.title}</h3>
                  <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                    {s.items.map(i => <li key={i} className="flex items-start gap-2"><span className="mt-1.5 h-1 w-1 rounded-full bg-[color:var(--teal)] shrink-0" />{i}</li>)}
                  </ul>
                </article>
              );
            })}
          </div>

          {/* Supplies */}
          <div className="mt-12 rounded-3xl bg-[color:var(--navy)] text-white p-8 md:p-10 grid md:grid-cols-[1.4fr_auto] gap-6 items-center">
            <div>
              <SectionLabel className="text-[color:var(--teal)]">{L.supplyLabel}</SectionLabel>
              <h3 className="mt-2 text-2xl md:text-3xl font-bold">{L.supplyTitle}</h3>
              <p className="mt-2 text-white/75">{L.supplyDesc}</p>
            </div>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-[color:var(--teal)] text-[color:var(--navy-deep)] px-6 py-3 font-semibold hover:brightness-105 transition w-fit">
              {L.supplyCta} <Package className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-10 md:py-14 bg-[color:var(--teal-soft)]/40">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-2xl">
            <SectionLabel>{L.pricingLabel}</SectionLabel>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[color:var(--navy-deep)]">{L.pricingTitle}</h2>
            <p className="mt-3 text-muted-foreground">{L.pricingNote}</p>
          </div>
          <div className="mt-10 grid lg:grid-cols-3 gap-5">
            {Object.entries(L.pricing).map(([cat, rows]) => (
              <div key={cat} className="rounded-2xl bg-card border border-border p-6">
                <h3 className="font-display font-bold text-lg text-[color:var(--navy-deep)]">{cat}</h3>
                <ul className="mt-4 divide-y divide-border">
                  {rows.map(([label, price]) => (
                    <li key={label} className="py-3 flex items-baseline justify-between gap-3 text-sm">
                      <span className="text-foreground/85">{label}</span>
                      <span className="font-semibold text-[color:var(--navy-deep)] whitespace-nowrap">{price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Care plan */}
          <div className="mt-8 rounded-3xl bg-[color:var(--navy)] text-white p-8 md:p-10 grid md:grid-cols-[1.4fr_auto] gap-6 items-center">
            <div>
              <SectionLabel className="text-[color:var(--teal)]">{L.carePlanLabel}</SectionLabel>
              <h3 className="mt-2 text-2xl md:text-3xl font-bold">{L.carePlanTitle}</h3>
              <p className="mt-2 text-white/75">{L.carePlanItems.join(" • ")}</p>
            </div>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-[color:var(--teal)] text-[color:var(--navy-deep)] px-6 py-3 font-semibold hover:brightness-105 transition w-fit">
              {L.carePlanCta}
            </a>
          </div>

          <p className="mt-6 text-xs text-muted-foreground italic">{L.pricingDisclaimer} {L.pricingLegalNote}</p>
        </div>
      </section>

      {/* Area */}
      <section id="area" className="py-10 md:py-14 bg-[color:var(--teal-soft)]/40">
        <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <SectionLabel>{L.areaLabel}</SectionLabel>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[color:var(--navy-deep)]">{L.areaTitle}</h2>
            <p className="mt-3 text-muted-foreground">{L.areaNote}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {areas.map(a => (
                <li key={a} className="inline-flex items-center gap-1.5 rounded-full bg-card border border-border px-3 py-1.5 text-sm">
                  <MapPin className="h-3.5 w-3.5 text-[color:var(--teal)]" />{a}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative isolate z-0 rounded-3xl overflow-hidden shadow-[var(--shadow-premium)] border border-border h-[420px]">
            <ServiceAreaMap title={L.mapTitle} />
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-2xl">
            <SectionLabel>{L.whyLabel}</SectionLabel>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[color:var(--navy-deep)]">{L.whyTitle}</h2>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {L.why.map((w, idx) => {
              const Icon = whyIcons[idx];
              return (
                <div key={w.title} className="rounded-2xl border border-border p-6 hover:border-[color:var(--teal)] transition">
                  <div className="h-11 w-11 rounded-xl bg-[color:var(--teal-soft)] grid place-items-center text-[color:var(--navy-deep)]"><Icon className="h-5 w-5" /></div>
                  <h3 className="mt-4 font-semibold text-[color:var(--navy-deep)]">{w.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{w.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <SectionLabel>{L.aboutLabel}</SectionLabel>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[color:var(--navy-deep)]">{L.aboutTitle}</h2>
            <p className="mt-4 text-lg text-muted-foreground">{L.aboutLead}</p>
            <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
              {L.aboutPoints.map(i => (
                <li key={i} className="flex items-start gap-2"><CheckCircle2 className="h-5 w-5 text-[color:var(--teal)] shrink-0 mt-0.5" /><span>{i}</span></li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-[var(--shadow-premium)]">
            <img src={equipmentImg} alt="ARIMSERWIS" loading="lazy" width={1280} height={960} className="w-full h-auto object-cover" />
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <SectionLabel>{L.reviewsLabel}</SectionLabel>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[color:var(--navy-deep)]">{L.reviewsTitle}</h2>
            </div>
            <div className="flex items-center gap-2 text-[color:var(--navy-deep)]">
              <div className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5 fill-[color:var(--teal)] text-[color:var(--teal)]" />)}</div>
              <span className="font-bold">5.0</span>
            </div>
          </div>
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.map(r => (
              <figure key={r.name} className="rounded-2xl bg-card border border-border p-6 flex flex-col">
                <div className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-[color:var(--teal)] text-[color:var(--teal)]" />)}</div>
                <blockquote className="mt-3 text-sm text-foreground/85 leading-relaxed flex-1">„{r.text[lang]}"</blockquote>
                <figcaption className="mt-4 pt-4 border-t border-border">
                  <div className="font-semibold text-[color:var(--navy-deep)] text-sm">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.clinic[lang]}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-10 md:py-14 bg-[color:var(--teal-soft)]/40">
        <div className="mx-auto max-w-3xl px-4">
          <div className="text-center">
            <SectionLabel>{L.faqLabel}</SectionLabel>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[color:var(--navy-deep)]">{L.faqTitle}</h2>
          </div>
          <div className="mt-10 space-y-3">
            {L.faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className="rounded-2xl border border-border bg-card overflow-hidden">
                  <button onClick={() => setOpenFaq(open ? null : i)} className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left">
                    <span className="font-semibold text-[color:var(--navy-deep)]">{f.q}</span>
                    <ChevronDown className={`h-5 w-5 shrink-0 text-[color:var(--teal)] transition-transform ${open ? "rotate-180" : ""}`} />
                  </button>
                  {open && <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{f.a}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact / Form */}
      <section id="contact" className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-[1fr_1.2fr] gap-10">
          <div>
            <SectionLabel>{L.contactLabel}</SectionLabel>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[color:var(--navy-deep)]">{L.formTitle}</h2>
            <p className="mt-3 text-muted-foreground">{L.formNote}</p>
            <div className="mt-8 space-y-4">
              <a href={PHONE_HREF} className="flex items-center gap-4 rounded-2xl border border-border p-4 hover:border-[color:var(--teal)] transition">
                <div className="h-11 w-11 rounded-xl gradient-teal grid place-items-center text-white"><Phone className="h-5 w-5" /></div>
                <div><div className="text-xs text-muted-foreground">{L.lblPhone}</div><div className="font-semibold text-[color:var(--navy-deep)]">{PHONE}</div></div>
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-4 rounded-2xl border border-border p-4 hover:border-[color:var(--teal)] transition">
                <div className="h-11 w-11 rounded-xl gradient-teal grid place-items-center text-white"><Mail className="h-5 w-5" /></div>
                <div className="min-w-0"><div className="text-xs text-muted-foreground">{L.lblEmail}</div><div className="font-semibold text-[color:var(--navy-deep)] truncate">{EMAIL}</div></div>
              </a>
              <div className="flex items-center gap-4 rounded-2xl border border-border p-4">
                <div className="h-11 w-11 rounded-xl gradient-teal grid place-items-center text-white"><MapPin className="h-5 w-5" /></div>
                <div className="min-w-0"><div className="text-xs text-muted-foreground">{L.lblAddress}</div><div className="font-semibold text-[color:var(--navy-deep)] text-sm">{ADDRESS}</div></div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl border border-border p-4">
                <div className="h-11 w-11 rounded-xl gradient-teal grid place-items-center text-white"><Clock className="h-5 w-5" /></div>
                <div><div className="text-xs text-muted-foreground">{L.lblHours}</div><div className="font-semibold text-[color:var(--navy-deep)]">{L.hours}</div></div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-3xl bg-card border border-border p-6 md:p-8 shadow-[var(--shadow-premium)]">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label={L.fName} name="name" required />
              <Field label={L.fClinic} name="clinic" />
              <Field label={L.fPhone} name="phone" type="tel" required />
              <Field label={L.fEmail} name="email" type="email" />
              <Field label={L.fLocation} name="location" />
              <Field label={L.fDevice} name="device" placeholder={L.fDevicePh} />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1.5 text-[color:var(--navy-deep)]">{L.fDescription}</label>
              <textarea name="description" rows={4} required className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-[color:var(--teal)] focus:ring-2 focus:ring-[color:var(--teal)]/20" />
            </div>
            <button type="submit" className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--navy)] hover:bg-[color:var(--navy-deep)] text-white px-6 py-3.5 font-semibold transition">
              {L.send} <ChevronDown className="h-4 w-4 -rotate-90" />
            </button>
            <p className="mt-3 text-xs text-muted-foreground text-center">{L.formConsent}</p>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[color:var(--navy-deep)] text-white/85">
        <div className="mx-auto max-w-7xl px-4 py-14 grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2">
              <img src={logoIcon} alt="ARIMSERWIS" className="h-9 w-9 object-contain" width={36} height={36} />
              <span className="font-display font-bold text-white">ARIMSERWIS</span>
            </div>
            <p className="mt-4 text-sm text-white/65">{L.footerTagline}</p>
          </div>
          <div>
            <div className="text-white font-semibold mb-3">{L.footerContact}</div>
            <ul className="space-y-2 text-sm">
              <li><a href={PHONE_HREF} className="hover:text-[color:var(--teal)]">{PHONE}</a></li>
              <li><a href={`mailto:${EMAIL}`} className="hover:text-[color:var(--teal)] break-all">{EMAIL}</a></li>
              <li>{L.hours}</li>
            </ul>
          </div>
          <div>
            <div className="text-white font-semibold mb-3">{L.footerNav}</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#services" className="hover:text-[color:var(--teal)]">{L.nav.services}</a></li>
              <li><a href="#pricing" className="hover:text-[color:var(--teal)]">{L.nav.pricing}</a></li>
              <li><a href="#area" className="hover:text-[color:var(--teal)]">{L.nav.area}</a></li>
              <li><a href="#faq" className="hover:text-[color:var(--teal)]">{L.nav.faq}</a></li>
              <li><a href="#contact" className="hover:text-[color:var(--teal)]">{L.nav.contact}</a></li>
            </ul>
          </div>
          <div>
            <div className="text-white font-semibold mb-3">{L.footerCompany}</div>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="text-white font-medium">ARIMSERWIS</li>
              <li>{ADDRESS}</li>
              <li>{L.lblNip}: {NIP}</li>
              <li className="pt-2"><a href="#" className="hover:text-[color:var(--teal)]">{L.footerPrivacy}</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-5 text-xs text-white/55 flex flex-wrap items-center justify-between gap-3">
            <span>© 2020 ARIMSERWIS. {L.footerRights}</span>
            <span>NIP {NIP}</span>
          </div>
        </div>
      </footer>

      {/* Mobile sticky CTAs */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 grid grid-cols-2 gap-0 border-t border-border bg-background/95 backdrop-blur pb-[env(safe-area-inset-bottom)]">
        <a href={PHONE_HREF} className="flex items-center justify-center gap-2 py-3.5 bg-[color:var(--navy)] text-white font-semibold text-sm">
          <Phone className="h-4 w-4" /> {L.btnCall}
        </a>
        <a href="#contact" className="flex items-center justify-center gap-2 py-3.5 bg-[color:var(--emergency)] text-white font-semibold text-sm">
          <AlertTriangle className="h-4 w-4" /> {L.btnReport}
        </a>
      </div>

      {/* WhatsApp floating */}
      <a href={WA_HREF} target="_blank" rel="noopener" aria-label="WhatsApp"
         className="fixed right-4 bottom-20 lg:bottom-6 z-40 h-12 w-12 rounded-full grid place-items-center bg-[#25D366] text-white shadow-[var(--shadow-premium)] hover:scale-105 transition">
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}

function SectionLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`inline-block text-xs font-bold tracking-[0.18em] uppercase text-[color:var(--teal)] ${className}`}>{children}</span>;
}

function Field({ label, name, type = "text", required = false, placeholder }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5 text-[color:var(--navy-deep)]">{label}{required && <span className="text-[color:var(--emergency)]"> *</span>}</label>
      <input
        name={name} type={type} required={required} placeholder={placeholder} maxLength={200}
        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-[color:var(--teal)] focus:ring-2 focus:ring-[color:var(--teal)]/20"
      />
    </div>
  );
}
