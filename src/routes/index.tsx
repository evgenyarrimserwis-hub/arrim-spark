import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Toaster, toast } from "sonner";
import {
  Phone, Mail, Clock, MapPin, Wrench, Stethoscope, Gauge, Wind,
  Sofa, ClipboardCheck, FileText, Package, Truck, ShieldCheck,
  Sparkles, CheckCircle2, AlertTriangle, Menu, X, ChevronDown, Star, MessageCircle,
} from "lucide-react";

import heroImg from "@/assets/hero-dental.jpg";
import technicianImg from "@/assets/technician.jpg";
import equipmentImg from "@/assets/equipment.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ARRIMSERWIS — Serwis sprzętu stomatologicznego Warszawa | 7 dni w tygodniu" },
      { name: "description", content: "Serwis i naprawa unitów stomatologicznych, autoklawów, kompresorów i systemów ssących w Warszawie i okolicach. Szybki dojazd, 7 dni w tygodniu 7:00–21:00." },
      { property: "og:title", content: "ARRIMSERWIS — Serwis sprzętu stomatologicznego Warszawa" },
      { property: "og:description", content: "Diagnostyka, naprawy, przeglądy techniczne gabinetów stomatologicznych. Tel. +48 570 974 753." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Landing,
});

type Lang = "pl" | "ru" | "en";

const PHONE = "+48 570 974 753";
const PHONE_HREF = "tel:+48570974753";
const WA_HREF = "https://wa.me/48570974753";
const EMAIL = "Arrimserwis@gmail.com";

const t = {
  pl: {
    nav: { services: "Usługi", pricing: "Cennik", area: "Obszar", reviews: "Opinie", faq: "FAQ", contact: "Kontakt" },
    emergencyBar: "AWARIA SPRZĘTU? Szybka reakcja serwisowa — Warszawa i okolice.",
    heroTitle: "Profesjonalny serwis sprzętu stomatologicznego w Warszawie i okolicach",
    heroSub: "Diagnostyka, naprawy, przeglądy techniczne i kompleksowa obsługa gabinetów stomatologicznych.",
    trust: ["Szybki dojazd", "Doświadczenie techniczne", "Obsługa wielu marek", "7 dni w tygodniu", "Praca 7:00 – 21:00"],
    ctaReport: "Zgłoś awarię", ctaCall: "Zadzwoń teraz",
    aboutTitle: "O nas", aboutLead: "ARRIMSERWIS specjalizuje się w kompleksowym serwisie sprzętu stomatologicznego dla gabinetów oraz małych klinik.",
    servicesTitle: "Nasze usługi", servicesLead: "Pełna obsługa techniczna gabinetu — od diagnostyki po modernizacje.",
    brandsTitle: "Obsługiwane marki", brandsNote: "Serwisujemy również wiele innych marek sprzętu stomatologicznego.",
    pricingTitle: "Orientacyjny cennik", pricingNote: "Ceny mają charakter orientacyjny. Ostateczna wycena zależy od urządzenia, zakresu prac i dostępności części.",
    pricingDisclaimer: "Przed rozpoczęciem prac klient zawsze otrzymuje wstępną wycenę. Nie wykonujemy dodatkowych napraw bez akceptacji kosztów.",
    whyTitle: "Dlaczego my", areaTitle: "Obszar działania",
    areaNote: "Możliwy dojazd również do okolicznych miejscowości po wcześniejszym uzgodnieniu.",
    reviewsTitle: "Opinie klientów", faqTitle: "Najczęściej zadawane pytania",
    formTitle: "Zgłoś awarię lub zapytaj o ofertę",
    formNote: "Odpowiadamy najszybciej jak to możliwe — zazwyczaj w ciągu godziny.",
    send: "Wyślij zgłoszenie",
    sent: "Dziękujemy za zgłoszenie. Skontaktujemy się z Państwem najszybciej jak to możliwe.",
    hours: "7:00 – 21:00 · 7 dni w tygodniu",
  },
  ru: {
    nav: { services: "Услуги", pricing: "Цены", area: "Зона", reviews: "Отзывы", faq: "FAQ", contact: "Контакт" },
    emergencyBar: "ПОЛОМКА ОБОРУДОВАНИЯ? Срочный выезд — Варшава и окрестности.",
    heroTitle: "Профессиональный сервис стоматологического оборудования в Варшаве",
    heroSub: "Диагностика, ремонт, техническое обслуживание и комплексное сопровождение стоматологических кабинетов.",
    trust: ["Быстрый выезд", "Технический опыт", "Много брендов", "7 дней в неделю", "Работаем 7:00 – 21:00"],
    ctaReport: "Сообщить о поломке", ctaCall: "Позвонить",
    aboutTitle: "О нас", aboutLead: "ARRIMSERWIS — комплексный сервис стоматологического оборудования для кабинетов и небольших клиник.",
    servicesTitle: "Наши услуги", servicesLead: "Полное техническое обслуживание — от диагностики до модернизации.",
    brandsTitle: "Бренды", brandsNote: "Обслуживаем также многие другие марки оборудования.",
    pricingTitle: "Ориентировочные цены", pricingNote: "Цены ориентировочные. Финальная стоимость зависит от оборудования и запчастей.",
    pricingDisclaimer: "Перед началом работ клиент всегда получает предварительную смету.",
    whyTitle: "Почему мы", areaTitle: "Зона обслуживания",
    areaNote: "Возможен выезд в окрестные населённые пункты по предварительному согласованию.",
    reviewsTitle: "Отзывы клиентов", faqTitle: "Частые вопросы",
    formTitle: "Сообщить о поломке или запросить предложение",
    formNote: "Отвечаем максимально быстро — обычно в течение часа.",
    send: "Отправить заявку",
    sent: "Спасибо за заявку. Мы свяжемся с вами как можно скорее.",
    hours: "7:00 – 21:00 · 7 дней в неделю",
  },
  en: {
    nav: { services: "Services", pricing: "Pricing", area: "Service area", reviews: "Reviews", faq: "FAQ", contact: "Contact" },
    emergencyBar: "EQUIPMENT FAILURE? Fast on-site service — Warsaw and surroundings.",
    heroTitle: "Professional dental equipment service in Warsaw and surroundings",
    heroSub: "Diagnostics, repairs, technical inspections and full-service support for dental practices.",
    trust: ["Fast on-site response", "Technical expertise", "Multi-brand service", "7 days a week", "Open 7:00 – 21:00"],
    ctaReport: "Report a failure", ctaCall: "Call now",
    aboutTitle: "About us", aboutLead: "ARRIMSERWIS provides full-service maintenance of dental equipment for private practices and small clinics.",
    servicesTitle: "Our services", servicesLead: "Complete technical care — from diagnostics to upgrades.",
    brandsTitle: "Brands we service", brandsNote: "We also service many other dental equipment brands.",
    pricingTitle: "Indicative pricing", pricingNote: "Prices are indicative. Final quote depends on device, scope of work and parts availability.",
    pricingDisclaimer: "Before any work begins, the client always receives an initial estimate. No additional work is performed without approval.",
    whyTitle: "Why us", areaTitle: "Service area",
    areaNote: "On-site visits to other nearby locations are possible by prior arrangement.",
    reviewsTitle: "Client reviews", faqTitle: "Frequently asked questions",
    formTitle: "Report a failure or request a quote",
    formNote: "We reply as fast as possible — usually within an hour.",
    send: "Send request",
    sent: "Thank you. We will contact you as soon as possible.",
    hours: "7:00 – 21:00 · 7 days a week",
  },
} as const;

const services = [
  { icon: Stethoscope, title: "Unity stomatologiczne", items: ["Serwis i naprawa", "Hydraulika · elektronika · pneumatyka", "Części zamienne", "Modernizacje"] },
  { icon: ShieldCheck, title: "Autoklawy", items: ["Naprawa i kalibracja", "Testy sterylizacji", "Konserwacja", "Przeglądy okresowe"] },
  { icon: Gauge, title: "Kompresory", items: ["Wymiana filtrów", "Osuszacze", "Kontrola szczelności", "Serwis okresowy"] },
  { icon: Wind, title: "Systemy ssące", items: ["Serwis i czyszczenie", "Filtry · separatory", "Modernizacje"] },
  { icon: Sofa, title: "Tapicerka foteli", items: ["Renowacja i wymiana", "Personalizacja", "Materiały odporne na dezynfekcję"] },
  { icon: ClipboardCheck, title: "Przeglądy techniczne", items: ["Kontrole okresowe", "Raporty i dokumentacja", "Zalecenia techniczne"] },
  { icon: Truck, title: "Diagnostyka i dojazd", items: ["Szybka ocena awarii", "Wycena na miejscu", "Naprawa na miejscu"] },
  { icon: FileText, title: "Dokumentacja techniczna", items: ["Ewidencja urządzeń", "Historia napraw", "Wsparcie podczas audytów"] },
  { icon: Sparkles, title: "Usługi dodatkowe", items: ["Montaż urządzeń", "Modernizacje gabinetów", "Szkolenia i doradztwo"] },
];

const brands = ["KaVo","Dentsply Sirona","Sirona","Planmeca","Stern Weber","Castellini","Anthos","Diplomat","A-dec","Cefla","W&H","Melag","Mocom","Euronda","NSK","Bien-Air","Dürr Dental","Cattani","Metasys"];

const pricing = {
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
};

const why = [
  { icon: Truck, title: "Szybki dojazd", desc: "Minimalizujemy przestoje gabinetu." },
  { icon: Wrench, title: "Doświadczenie techniczne", desc: "Skuteczna diagnostyka i naprawy." },
  { icon: Package, title: "Obsługa wielu marek", desc: "Kompleksowy serwis urządzeń." },
  { icon: FileText, title: "Transparentne ceny", desc: "Jasne warunki współpracy." },
  { icon: ClipboardCheck, title: "Dokumentacja", desc: "Pełna historia przeglądów." },
  { icon: ShieldCheck, title: "Wsparcie techniczne", desc: "Pomoc także po wykonaniu usługi." },
];

const areas = ["Warszawa","Pruszków","Piastów","Ożarów Mazowiecki","Błonie","Brwinów","Milanówek","Grodzisk Mazowiecki","Żyrardów","Konstancin-Jeziorna","Warszawa Zachód","Ursus","Włochy","Okęcie","Raszyn"];

const reviews = [
  { name: "dr Anna Kowalska", clinic: "Gabinet stomatologiczny, Mokotów", text: "Awaria unitu w środku dnia przyjęć — technik dojechał w ciągu dwóch godzin i naprawił hydraulikę na miejscu. Bardzo profesjonalna obsługa." },
  { name: "lek. dent. Michał Nowak", clinic: "Praktyka dentystyczna, Pruszków", text: "Korzystamy z opieki serwisowej od pół roku. Przeglądy zawsze w terminie, pełna dokumentacja, transparentne ceny. Polecam." },
  { name: "dr Joanna Wiśniewska", clinic: "Klinika stomatologiczna, Ursus", text: "Serwis autoklawu i kalibracja — wszystko zrobione szybko, z protokołem. Wreszcie firma, na której można polegać." },
  { name: "lek. dent. Paweł Zieliński", clinic: "Gabinet, Grodzisk Mazowiecki", text: "Modernizacja kompresora i systemu ssącego. Doradztwo na wysokim poziomie, czysta i terminowa robota." },
  { name: "dr Karolina Mazur", clinic: "Gabinet, Raszyn", text: "Renowacja tapicerki fotela — efekt jak nowy. Materiał odporny na dezynfekcję, świetne wykonanie." },
  { name: "lek. dent. Tomasz Lewandowski", clinic: "Praktyka, Żyrardów", text: "Reagują w weekend, co dla nas kluczowe. Wycena zawsze przed pracami, żadnych niespodzianek na fakturze." },
];

const faqs = [
  { q: "Jak szybko realizowany jest serwis?", a: "Awarie krytyczne staramy się obsłużyć tego samego dnia. Standardowy czas reakcji w Warszawie i okolicach to 2–24 godziny." },
  { q: "Czy wykonujecie dojazd do gabinetu?", a: "Tak. Pracujemy bezpośrednio w gabinecie klienta — diagnostyka, naprawa i wycena odbywają się na miejscu." },
  { q: "Jakie marki obsługujecie?", a: "KaVo, Dentsply Sirona, Planmeca, Stern Weber, Castellini, Anthos, A-dec, W&H, Melag, NSK, Dürr Dental, Cattani i wiele innych." },
  { q: "Czy wykonujecie przeglądy techniczne?", a: "Tak. Realizujemy przeglądy unitów, autoklawów, kompresorów i systemów ssących wraz z pełną dokumentacją techniczną." },
  { q: "Czy naprawiacie autoklawy?", a: "Tak — naprawy, kalibracja, testy sterylizacji i konserwacja autoklawów wszystkich popularnych marek." },
  { q: "Czy serwisujecie kompresory?", a: "Tak. Wymiana filtrów, osuszacze, kontrola szczelności oraz serwis okresowy kompresorów stomatologicznych." },
  { q: "Czy prowadzicie dokumentację techniczną?", a: "Tak. Prowadzimy pełną ewidencję urządzeń i historię napraw — pomagamy także podczas kontroli i audytów." },
  { q: "Jak zamówić wizytę?", a: "Wystarczy zadzwonić pod +48 570 974 753 lub wypełnić formularz na stronie. Oddzwaniamy zazwyczaj w ciągu godziny." },
  { q: "Jak wygląda wycena?", a: "Klient zawsze otrzymuje wstępną wycenę przed rozpoczęciem prac. Nie wykonujemy dodatkowych napraw bez akceptacji kosztów." },
  { q: "Czy pracujecie w weekendy?", a: "Tak. Działamy 7 dni w tygodniu w godzinach 7:00 – 21:00, również w soboty i niedziele." },
];

function Landing() {
  const [lang, setLang] = useState<Lang>("pl");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const L = t[lang];

  const faqJsonLd = useMemo(() => ({
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  }), []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    toast.success(L.sent);
    (e.target as HTMLFormElement).reset();
  }

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
            <div className="h-9 w-9 shrink-0 rounded-lg gradient-teal grid place-items-center text-white font-bold">A</div>
            <span className="font-display font-bold tracking-tight truncate text-[color:var(--navy-deep)]">ARRIMSERWIS</span>
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
            <div className="hidden sm:flex items-center gap-1 rounded-full border border-border p-1 text-xs">
              {(["pl","ru","en"] as Lang[]).map(l => (
                <button key={l} onClick={() => setLang(l)} className={`px-2.5 py-1 rounded-full uppercase font-semibold transition ${lang === l ? "bg-[color:var(--navy)] text-white" : "text-foreground/60 hover:text-foreground"}`}>{l}</button>
              ))}
            </div>
            <a href={PHONE_HREF} className="hidden md:inline-flex items-center gap-2 rounded-full bg-[color:var(--navy)] text-white px-4 py-2 text-sm font-semibold hover:bg-[color:var(--navy-deep)] transition">
              <Phone className="h-4 w-4" /> {PHONE}
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
              <div className="flex items-center gap-1 rounded-full border border-border p-1 text-xs w-fit">
                {(["pl","ru","en"] as Lang[]).map(l => (
                  <button key={l} onClick={() => setLang(l)} className={`px-2.5 py-1 rounded-full uppercase font-semibold ${lang === l ? "bg-[color:var(--navy)] text-white" : "text-foreground/60"}`}>{l}</button>
                ))}
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden gradient-hero text-white">
        <div className="absolute inset-0 opacity-25">
          <img src={heroImg} alt="Nowoczesny gabinet stomatologiczny" className="h-full w-full object-cover" width={1920} height={1280} />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-24 lg:py-32 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[color:var(--teal)] animate-pulse" /> Warszawa · 7 dni w tygodniu
            </div>
            <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight">
              {L.heroTitle.split(" ").slice(0, -3).join(" ")}{" "}
              <span className="text-gradient">{L.heroTitle.split(" ").slice(-3).join(" ")}</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-white/80 max-w-2xl">{L.heroSub}</p>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/85">
              {L.trust.map(item => (
                <li key={item} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[color:var(--teal)]" />{item}</li>
              ))}
            </ul>
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
              <img src={technicianImg} alt="Technik serwisowy ARRIMSERWIS" className="w-full h-[520px] object-cover" width={1280} height={1280} />
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-background/95 backdrop-blur p-4 text-foreground">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full gradient-teal grid place-items-center text-white"><Wrench className="h-5 w-5" /></div>
                  <div className="min-w-0">
                    <div className="font-semibold text-sm truncate">Serwis na miejscu</div>
                    <div className="text-xs text-muted-foreground">Diagnostyka i naprawa w gabinecie klienta</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <SectionLabel>About</SectionLabel>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[color:var(--navy-deep)]">{L.aboutTitle}</h2>
            <p className="mt-4 text-lg text-muted-foreground">{L.aboutLead}</p>
            <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
              {["Diagnostyka usterek", "Naprawy urządzeń", "Przeglądy techniczne", "Modernizacje sprzętu", "Dokumentacja techniczna", "Minimalizacja przestojów"].map(i => (
                <li key={i} className="flex items-start gap-2"><CheckCircle2 className="h-5 w-5 text-[color:var(--teal)] shrink-0 mt-0.5" /><span>{i}</span></li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-[var(--shadow-premium)]">
            <img src={equipmentImg} alt="Autoklaw i kompresor stomatologiczny" loading="lazy" width={1280} height={960} className="w-full h-auto object-cover" />
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 md:py-24 bg-[color:var(--teal-soft)]/40">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-2xl">
            <SectionLabel>Services</SectionLabel>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[color:var(--navy-deep)]">{L.servicesTitle}</h2>
            <p className="mt-3 text-muted-foreground">{L.servicesLead}</p>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map(({ icon: Icon, title, items }) => (
              <article key={title} className="group rounded-2xl bg-card border border-border p-6 hover:border-[color:var(--teal)] hover:shadow-[var(--shadow-premium)] transition">
                <div className="h-11 w-11 rounded-xl gradient-teal grid place-items-center text-white shadow-[var(--shadow-glow)]"><Icon className="h-5 w-5" /></div>
                <h3 className="mt-4 font-semibold text-lg text-[color:var(--navy-deep)]">{title}</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  {items.map(i => <li key={i} className="flex items-start gap-2"><span className="mt-1.5 h-1 w-1 rounded-full bg-[color:var(--teal)] shrink-0" />{i}</li>)}
                </ul>
              </article>
            ))}
          </div>

          {/* Supplies */}
          <div className="mt-12 rounded-3xl bg-[color:var(--navy)] text-white p-8 md:p-10 grid md:grid-cols-[1.4fr_auto] gap-6 items-center">
            <div>
              <SectionLabel className="text-[color:var(--teal)]">Zaopatrzenie gabinetów</SectionLabel>
              <h3 className="mt-2 text-2xl md:text-3xl font-bold">Materiały, akcesoria i części zamienne</h3>
              <p className="mt-2 text-white/75">Środki dezynfekcyjne, akcesoria stomatologiczne, części zamienne i wyposażenie gabinetów.</p>
            </div>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-[color:var(--teal)] text-[color:var(--navy-deep)] px-6 py-3 font-semibold hover:brightness-105 transition w-fit">
              Zapytaj o dostępność <Package className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center max-w-2xl mx-auto">
            <SectionLabel>Brands</SectionLabel>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[color:var(--navy-deep)]">{L.brandsTitle}</h2>
          </div>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {brands.map(b => (
              <div key={b} className="rounded-xl border border-border bg-card px-4 py-5 text-center font-display font-semibold text-[color:var(--navy)]/85 hover:border-[color:var(--teal)] hover:text-[color:var(--navy-deep)] transition">{b}</div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">{L.brandsNote}</p>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 md:py-24 bg-[color:var(--teal-soft)]/40">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-2xl">
            <SectionLabel>Pricing</SectionLabel>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[color:var(--navy-deep)]">{L.pricingTitle}</h2>
            <p className="mt-3 text-muted-foreground">{L.pricingNote}</p>
          </div>
          <div className="mt-10 grid lg:grid-cols-3 gap-5">
            {Object.entries(pricing).map(([cat, rows]) => (
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
          <div className="mt-8 rounded-3xl overflow-hidden grid md:grid-cols-[1.2fr_1fr]">
            <div className="bg-[color:var(--navy-deep)] text-white p-8 md:p-10">
              <SectionLabel className="text-[color:var(--teal)]">Opieka serwisowa</SectionLabel>
              <h3 className="mt-2 text-2xl md:text-3xl font-bold">Stała opieka dla gabinetów</h3>
              <div className="mt-4 text-4xl font-extrabold font-display">od 299 zł <span className="text-base font-medium text-white/70">/ miesiąc</span></div>
              <ul className="mt-5 space-y-2 text-sm text-white/85">
                {["Priorytetowe zgłoszenia","Przypomnienia o przeglądach","Prowadzenie dokumentacji","Preferencyjne warunki serwisowe","Wsparcie techniczne"].map(i => (
                  <li key={i} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[color:var(--teal)]" />{i}</li>
                ))}
              </ul>
              <a href="#contact" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[color:var(--teal)] text-[color:var(--navy-deep)] px-6 py-3 font-semibold hover:brightness-105">
                Zapytaj o indywidualną wycenę
              </a>
            </div>
            <div className="bg-card p-8 md:p-10 flex items-center">
              <p className="text-sm text-muted-foreground italic">{L.pricingDisclaimer}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-2xl">
            <SectionLabel>Why us</SectionLabel>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[color:var(--navy-deep)]">{L.whyTitle}</h2>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {why.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-border p-6 hover:border-[color:var(--teal)] transition">
                <div className="h-11 w-11 rounded-xl bg-[color:var(--teal-soft)] grid place-items-center text-[color:var(--navy-deep)]"><Icon className="h-5 w-5" /></div>
                <h3 className="mt-4 font-semibold text-[color:var(--navy-deep)]">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Area */}
      <section id="area" className="py-16 md:py-24 bg-[color:var(--teal-soft)]/40">
        <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <SectionLabel>Area</SectionLabel>
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
          <div className="rounded-3xl overflow-hidden shadow-[var(--shadow-premium)] border border-border h-[420px]">
            <iframe
              title="Mapa obszaru działania ARRIMSERWIS"
              src="https://www.openstreetmap.org/export/embed.html?bbox=20.55%2C52.05%2C21.30%2C52.40&layer=mapnik&marker=52.2297%2C21.0122"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <SectionLabel>Reviews</SectionLabel>
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
                <blockquote className="mt-3 text-sm text-foreground/85 leading-relaxed flex-1">„{r.text}"</blockquote>
                <figcaption className="mt-4 pt-4 border-t border-border">
                  <div className="font-semibold text-[color:var(--navy-deep)] text-sm">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.clinic}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 md:py-24 bg-[color:var(--teal-soft)]/40">
        <div className="mx-auto max-w-3xl px-4">
          <div className="text-center">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[color:var(--navy-deep)]">{L.faqTitle}</h2>
          </div>
          <div className="mt-10 space-y-3">
            {faqs.map((f, i) => {
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
      <section id="contact" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-[1fr_1.2fr] gap-10">
          <div>
            <SectionLabel>Contact</SectionLabel>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[color:var(--navy-deep)]">{L.formTitle}</h2>
            <p className="mt-3 text-muted-foreground">{L.formNote}</p>
            <div className="mt-8 space-y-4">
              <a href={PHONE_HREF} className="flex items-center gap-4 rounded-2xl border border-border p-4 hover:border-[color:var(--teal)] transition">
                <div className="h-11 w-11 rounded-xl gradient-teal grid place-items-center text-white"><Phone className="h-5 w-5" /></div>
                <div><div className="text-xs text-muted-foreground">Telefon</div><div className="font-semibold text-[color:var(--navy-deep)]">{PHONE}</div></div>
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-4 rounded-2xl border border-border p-4 hover:border-[color:var(--teal)] transition">
                <div className="h-11 w-11 rounded-xl gradient-teal grid place-items-center text-white"><Mail className="h-5 w-5" /></div>
                <div className="min-w-0"><div className="text-xs text-muted-foreground">E-mail</div><div className="font-semibold text-[color:var(--navy-deep)] truncate">{EMAIL}</div></div>
              </a>
              <div className="flex items-center gap-4 rounded-2xl border border-border p-4">
                <div className="h-11 w-11 rounded-xl gradient-teal grid place-items-center text-white"><Clock className="h-5 w-5" /></div>
                <div><div className="text-xs text-muted-foreground">Godziny pracy</div><div className="font-semibold text-[color:var(--navy-deep)]">{L.hours}</div></div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-3xl bg-card border border-border p-6 md:p-8 shadow-[var(--shadow-premium)]">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Imię i nazwisko" name="name" required />
              <Field label="Nazwa gabinetu" name="clinic" />
              <Field label="Telefon" name="phone" type="tel" required />
              <Field label="E-mail" name="email" type="email" />
              <Field label="Lokalizacja" name="location" />
              <Field label="Typ urządzenia" name="device" placeholder="np. unit, autoklaw, kompresor" />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1.5 text-[color:var(--navy-deep)]">Opis awarii</label>
              <textarea name="description" rows={4} required className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-[color:var(--teal)] focus:ring-2 focus:ring-[color:var(--teal)]/20" />
            </div>
            <button type="submit" className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--navy)] hover:bg-[color:var(--navy-deep)] text-white px-6 py-3.5 font-semibold transition">
              {L.send} <ChevronDown className="h-4 w-4 -rotate-90" />
            </button>
            <p className="mt-3 text-xs text-muted-foreground text-center">Klikając „Wyślij" akceptujesz kontakt zwrotny w sprawie zgłoszenia.</p>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[color:var(--navy-deep)] text-white/85">
        <div className="mx-auto max-w-7xl px-4 py-14 grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-lg gradient-teal grid place-items-center text-white font-bold">A</div>
              <span className="font-display font-bold text-white">ARRIMSERWIS</span>
            </div>
            <p className="mt-4 text-sm text-white/65">Serwis sprzętu stomatologicznego — Warszawa i okolice.</p>
          </div>
          <div>
            <div className="text-white font-semibold mb-3">Kontakt</div>
            <ul className="space-y-2 text-sm">
              <li><a href={PHONE_HREF} className="hover:text-[color:var(--teal)]">{PHONE}</a></li>
              <li><a href={`mailto:${EMAIL}`} className="hover:text-[color:var(--teal)] break-all">{EMAIL}</a></li>
              <li>{L.hours}</li>
            </ul>
          </div>
          <div>
            <div className="text-white font-semibold mb-3">Nawigacja</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#services" className="hover:text-[color:var(--teal)]">Usługi</a></li>
              <li><a href="#pricing" className="hover:text-[color:var(--teal)]">Cennik</a></li>
              <li><a href="#area" className="hover:text-[color:var(--teal)]">Obszar działania</a></li>
              <li><a href="#faq" className="hover:text-[color:var(--teal)]">FAQ</a></li>
              <li><a href="#contact" className="hover:text-[color:var(--teal)]">Kontakt</a></li>
            </ul>
          </div>
          <div>
            <div className="text-white font-semibold mb-3">Informacje</div>
            <ul className="space-y-2 text-sm">
              <li>Polityka prywatności</li>
              <li>NIP / dane firmy</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-5 text-xs text-white/55 flex flex-wrap items-center justify-between gap-3">
            <span>© {new Date().getFullYear()} ARRIMSERWIS. Wszystkie prawa zastrzeżone.</span>
            <span>Made for dental professionals.</span>
          </div>
        </div>
      </footer>

      {/* Mobile sticky CTAs */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 grid grid-cols-2 gap-0 border-t border-border bg-background/95 backdrop-blur pb-[env(safe-area-inset-bottom)]">
        <a href={PHONE_HREF} className="flex items-center justify-center gap-2 py-3.5 bg-[color:var(--navy)] text-white font-semibold text-sm">
          <Phone className="h-4 w-4" /> Zadzwoń
        </a>
        <a href="#contact" className="flex items-center justify-center gap-2 py-3.5 bg-[color:var(--emergency)] text-white font-semibold text-sm">
          <AlertTriangle className="h-4 w-4" /> Zgłoś awarię
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
