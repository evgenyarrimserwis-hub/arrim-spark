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
const NIP = "5291833249";
const ADDRESS = "ul. H. Szczerkowskiego 419, 05-827 Grodzisk Mazowiecki";

const t = {
  pl: {
    nav: { services: "Usługi", pricing: "Cennik", area: "Obszar", reviews: "Opinie", faq: "FAQ", contact: "Kontakt" },
    emergencyBar: "AWARIA SPRZĘTU? Szybka reakcja serwisowa — Warszawa i okolice.",
    badge: "Warszawa · 7 dni w tygodniu",
    heroTitle: "Profesjonalny serwis sprzętu stomatologicznego w Warszawie i okolicach",
    heroHighlight: "Warszawie i okolicach",
    heroSub: "Diagnostyka, naprawy, przeglądy techniczne i kompleksowa obsługa gabinetów stomatologicznych.",
    trust: ["Szybki dojazd", "Doświadczenie techniczne", "Obsługa wielu marek", "7 dni w tygodniu", "Praca 7:00 – 21:00"],
    ctaReport: "Zgłoś awarię", ctaCall: "Zadzwoń teraz",
    onSiteTitle: "Serwis na miejscu", onSiteDesc: "Diagnostyka i naprawa w gabinecie klienta",
    aboutLabel: "O firmie", aboutTitle: "O nas",
    aboutLead: "ARRIMSERWIS specjalizuje się w kompleksowym serwisie sprzętu stomatologicznego dla gabinetów oraz małych klinik.",
    aboutPoints: ["Diagnostyka usterek", "Naprawy urządzeń", "Przeglądy techniczne", "Modernizacje sprzętu", "Dokumentacja techniczna", "Minimalizacja przestojów"],
    servicesLabel: "Usługi", servicesTitle: "Nasze usługi", servicesLead: "Pełna obsługa techniczna gabinetu — od diagnostyki po modernizacje.",
    services: [
      { title: "Unity stomatologiczne", items: ["Serwis i naprawa", "Hydraulika · elektronika · pneumatyka", "Części zamienne", "Modernizacje"] },
      { title: "Autoklawy", items: ["Naprawa i kalibracja", "Testy sterylizacji", "Konserwacja", "Przeglądy okresowe"] },
      { title: "Kompresory", items: ["Wymiana filtrów", "Osuszacze", "Kontrola szczelności", "Serwis okresowy"] },
      { title: "Systemy ssące", items: ["Serwis i czyszczenie", "Filtry · separatory", "Modernizacje"] },
      { title: "Tapicerka foteli", items: ["Renowacja i wymiana", "Personalizacja", "Materiały odporne na dezynfekcję"] },
      { title: "Przeglądy techniczne", items: ["Kontrole okresowe", "Raporty i dokumentacja", "Zalecenia techniczne"] },
      { title: "Diagnostyka i dojazd", items: ["Szybka ocena awarii", "Wycena na miejscu", "Naprawa na miejscu"] },
      { title: "Dokumentacja techniczna", items: ["Ewidencja urządzeń", "Historia napraw", "Wsparcie podczas audytów"] },
      { title: "Usługi dodatkowe", items: ["Montaż urządzeń", "Modernizacje gabinetów", "Szkolenia i doradztwo"] },
    ],
    supplyLabel: "Zaopatrzenie gabinetów", supplyTitle: "Materiały, akcesoria i części zamienne",
    supplyDesc: "Środki dezynfekcyjne, akcesoria stomatologiczne, części zamienne i wyposażenie gabinetów.",
    supplyCta: "Zapytaj o dostępność",
    brandsLabel: "Marki", brandsTitle: "Obsługiwane marki", brandsNote: "Serwisujemy również wiele innych marek sprzętu stomatologicznego.",
    pricingLabel: "Cennik", pricingTitle: "Orientacyjny cennik",
    pricingNote: "Ceny mają charakter orientacyjny. Ostateczna wycena zależy od urządzenia, zakresu prac i dostępności części.",
    pricingDisclaimer: "Przed rozpoczęciem prac klient zawsze otrzymuje wstępną wycenę. Nie wykonujemy dodatkowych napraw bez akceptacji kosztów.",
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
      { q: "Jakie marki obsługujecie?", a: "KaVo, Dentsply Sirona, Planmeca, Stern Weber, Castellini, Anthos, A-dec, W&H, Melag, NSK, Dürr Dental, Cattani i wiele innych." },
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
    hours: "7:00 – 21:00 · 7 dni w tygodniu",
    lblPhone: "Telefon", lblEmail: "E-mail", lblHours: "Godziny pracy", lblAddress: "Adres", lblNip: "NIP",
    footerTagline: "Serwis sprzętu stomatologicznego — Warszawa i okolice.",
    footerContact: "Kontakt", footerNav: "Nawigacja", footerInfo: "Informacje",
    footerPrivacy: "Polityka prywatności", footerCompany: "Dane firmy",
    footerRights: "Wszystkie prawa zastrzeżone.",
    btnCall: "Zadzwoń", btnReport: "Zgłoś awarię",
    mapTitle: "Mapa obszaru działania ARRIMSERWIS",
  },
  ru: {
    nav: { services: "Услуги", pricing: "Цены", area: "Зона", reviews: "Отзывы", faq: "FAQ", contact: "Контакт" },
    emergencyBar: "ПОЛОМКА ОБОРУДОВАНИЯ? Срочный выезд — Варшава и окрестности.",
    badge: "Варшава · 7 дней в неделю",
    heroTitle: "Профессиональный сервис стоматологического оборудования в Варшаве и окрестностях",
    heroHighlight: "в Варшаве и окрестностях",
    heroSub: "Диагностика, ремонт, техническое обслуживание и комплексное сопровождение стоматологических кабинетов.",
    trust: ["Быстрый выезд", "Технический опыт", "Много брендов", "7 дней в неделю", "Работаем 7:00 – 21:00"],
    ctaReport: "Сообщить о поломке", ctaCall: "Позвонить",
    onSiteTitle: "Сервис на месте", onSiteDesc: "Диагностика и ремонт в кабинете клиента",
    aboutLabel: "О компании", aboutTitle: "О нас",
    aboutLead: "ARRIMSERWIS — комплексный сервис стоматологического оборудования для кабинетов и небольших клиник.",
    aboutPoints: ["Диагностика неисправностей", "Ремонт оборудования", "Техническое обслуживание", "Модернизация оборудования", "Техническая документация", "Минимизация простоев"],
    servicesLabel: "Услуги", servicesTitle: "Наши услуги", servicesLead: "Полное техническое обслуживание — от диагностики до модернизации.",
    services: [
      { title: "Стоматологические установки", items: ["Сервис и ремонт", "Гидравлика · электроника · пневматика", "Запчасти", "Модернизация"] },
      { title: "Автоклавы", items: ["Ремонт и калибровка", "Тесты стерилизации", "Обслуживание", "Периодические проверки"] },
      { title: "Компрессоры", items: ["Замена фильтров", "Осушители", "Контроль герметичности", "Периодический сервис"] },
      { title: "Системы аспирации", items: ["Сервис и чистка", "Фильтры · сепараторы", "Модернизация"] },
      { title: "Обивка кресел", items: ["Реновация и замена", "Персонализация", "Материал устойчивый к дезинфекции"] },
      { title: "Технические осмотры", items: ["Периодический контроль", "Отчёты и документация", "Технические рекомендации"] },
      { title: "Диагностика и выезд", items: ["Быстрая оценка поломки", "Смета на месте", "Ремонт на месте"] },
      { title: "Техническая документация", items: ["Учёт оборудования", "История ремонтов", "Поддержка при аудитах"] },
      { title: "Дополнительные услуги", items: ["Монтаж оборудования", "Модернизация кабинетов", "Обучение и консультации"] },
    ],
    supplyLabel: "Снабжение кабинетов", supplyTitle: "Материалы, аксессуары и запчасти",
    supplyDesc: "Дезинфицирующие средства, стоматологические аксессуары, запчасти и оснащение кабинетов.",
    supplyCta: "Узнать наличие",
    brandsLabel: "Бренды", brandsTitle: "Обслуживаемые бренды", brandsNote: "Обслуживаем также многие другие марки стоматологического оборудования.",
    pricingLabel: "Цены", pricingTitle: "Ориентировочные цены",
    pricingNote: "Цены ориентировочные. Финальная стоимость зависит от оборудования, объёма работ и наличия запчастей.",
    pricingDisclaimer: "Перед началом работ клиент всегда получает предварительную смету. Дополнительные работы не выполняются без согласования.",
    pricing: {
      "Сервис и диагностика": [
        ["Диагностика оборудования", "от 150 zł"],
        ["Выезд специалиста", "от 100 zł"],
        ["Сервисный час работы", "от 180 zł"],
        ["Осмотр стоматологической установки", "от 350 zł"],
        ["Осмотр автоклава", "от 400 zł"],
        ["Осмотр компрессора", "от 300 zł"],
        ["Осмотр системы аспирации", "от 300 zł"],
      ],
      "Ремонт": [
        ["Ремонт стоматологической установки", "от 300 zł"],
        ["Ремонт автоклава", "от 400 zł"],
        ["Ремонт компрессора", "от 300 zł"],
        ["Ремонт системы аспирации", "от 300 zł"],
        ["Ремонт электрических систем", "от 250 zł"],
        ["Ремонт пневматических систем", "от 250 zł"],
        ["Ремонт гидравлических систем", "от 250 zł"],
      ],
      "Дополнительные услуги": [
        ["Реновация обивки кресла", "от 600 zł"],
        ["Калибровка автоклава", "от 200 zł"],
        ["Ведение технической документации", "от 200 zł / мес."],
        ["Монтаж стоматологического оборудования", "от 500 zł"],
        ["Модернизация кабинета", "индивидуальная смета"],
      ],
    } as Record<string, [string, string][]>,
    carePlanLabel: "Сервисная поддержка", carePlanTitle: "Постоянное сопровождение кабинетов",
    carePlanPrice: "от 299 zł", carePlanPer: "/ месяц",
    carePlanItems: ["Приоритетные заявки","Напоминания об осмотрах","Ведение документации","Льготные условия сервиса","Техническая поддержка"],
    carePlanCta: "Запросить индивидуальный расчёт",
    whyLabel: "Почему мы", whyTitle: "Почему мы",
    why: [
      { title: "Быстрый выезд", desc: "Минимизируем простои кабинета." },
      { title: "Технический опыт", desc: "Эффективная диагностика и ремонт." },
      { title: "Много брендов", desc: "Комплексное обслуживание оборудования." },
      { title: "Прозрачные цены", desc: "Понятные условия сотрудничества." },
      { title: "Документация", desc: "Полная история обслуживания." },
      { title: "Техническая поддержка", desc: "Помощь и после оказания услуги." },
    ],
    areaLabel: "Зона", areaTitle: "Зона обслуживания",
    areaNote: "Возможен выезд в окрестные населённые пункты по предварительному согласованию.",
    reviewsLabel: "Отзывы", reviewsTitle: "Отзывы клиентов",
    faqLabel: "FAQ", faqTitle: "Частые вопросы",
    faqs: [
      { q: "Как быстро выполняется сервис?", a: "Критические поломки стараемся обслужить в тот же день. Стандартное время реагирования в Варшаве и окрестностях — 2–24 часа." },
      { q: "Выезжаете ли вы в кабинет?", a: "Да. Работаем непосредственно в кабинете клиента — диагностика, ремонт и смета на месте." },
      { q: "Какие бренды обслуживаете?", a: "KaVo, Dentsply Sirona, Planmeca, Stern Weber, Castellini, Anthos, A-dec, W&H, Melag, NSK, Dürr Dental, Cattani и многие другие." },
      { q: "Проводите ли технические осмотры?", a: "Да. Проводим осмотры установок, автоклавов, компрессоров и систем аспирации с полной технической документацией." },
      { q: "Ремонтируете ли автоклавы?", a: "Да — ремонт, калибровка, тесты стерилизации и обслуживание автоклавов всех популярных марок." },
      { q: "Обслуживаете ли компрессоры?", a: "Да. Замена фильтров, осушители, контроль герметичности и периодический сервис стоматологических компрессоров." },
      { q: "Ведёте ли техническую документацию?", a: "Да. Ведём полный учёт оборудования и историю ремонтов — помогаем также при проверках и аудитах." },
      { q: "Как заказать визит?", a: "Достаточно позвонить по +48 570 974 753 или заполнить форму на сайте. Перезваниваем обычно в течение часа." },
      { q: "Как формируется смета?", a: "Клиент всегда получает предварительную смету до начала работ. Дополнительные работы не выполняются без согласования." },
      { q: "Работаете ли по выходным?", a: "Да. Работаем 7 дней в неделю с 7:00 до 21:00, в том числе по субботам и воскресеньям." },
    ],
    contactLabel: "Контакт", formTitle: "Сообщить о поломке или запросить предложение",
    formNote: "Отвечаем максимально быстро — обычно в течение часа.",
    fName: "Имя и фамилия", fClinic: "Название кабинета", fPhone: "Телефон", fEmail: "E-mail",
    fLocation: "Местоположение", fDevice: "Тип оборудования", fDevicePh: "напр. установка, автоклав, компрессор",
    fDescription: "Описание поломки",
    send: "Отправить заявку",
    formConsent: "Нажимая «Отправить», вы соглашаетесь на обратный контакт по заявке.",
    sent: "Спасибо за заявку. Мы свяжемся с вами как можно скорее.",
    hours: "7:00 – 21:00 · 7 дней в неделю",
    lblPhone: "Телефон", lblEmail: "E-mail", lblHours: "Часы работы", lblAddress: "Адрес", lblNip: "NIP",
    footerTagline: "Сервис стоматологического оборудования — Варшава и окрестности.",
    footerContact: "Контакт", footerNav: "Навигация", footerInfo: "Информация",
    footerPrivacy: "Политика конфиденциальности", footerCompany: "Реквизиты компании",
    footerRights: "Все права защищены.",
    btnCall: "Позвонить", btnReport: "Сообщить",
    mapTitle: "Карта зоны обслуживания ARRIMSERWIS",
  },
  en: {
    nav: { services: "Services", pricing: "Pricing", area: "Service area", reviews: "Reviews", faq: "FAQ", contact: "Contact" },
    emergencyBar: "EQUIPMENT FAILURE? Fast on-site service — Warsaw and surroundings.",
    badge: "Warsaw · 7 days a week",
    heroTitle: "Professional dental equipment service in Warsaw and surroundings",
    heroHighlight: "in Warsaw and surroundings",
    heroSub: "Diagnostics, repairs, technical inspections and full-service support for dental practices.",
    trust: ["Fast on-site response", "Technical expertise", "Multi-brand service", "7 days a week", "Open 7:00 – 21:00"],
    ctaReport: "Report a failure", ctaCall: "Call now",
    onSiteTitle: "On-site service", onSiteDesc: "Diagnostics and repairs at the client's practice",
    aboutLabel: "About", aboutTitle: "About us",
    aboutLead: "ARRIMSERWIS provides full-service maintenance of dental equipment for private practices and small clinics.",
    aboutPoints: ["Fault diagnostics", "Equipment repairs", "Technical inspections", "Equipment upgrades", "Technical documentation", "Minimised downtime"],
    servicesLabel: "Services", servicesTitle: "Our services", servicesLead: "Complete technical care — from diagnostics to upgrades.",
    services: [
      { title: "Dental units", items: ["Service and repair", "Hydraulics · electronics · pneumatics", "Spare parts", "Upgrades"] },
      { title: "Autoclaves", items: ["Repair and calibration", "Sterilisation tests", "Maintenance", "Periodic inspections"] },
      { title: "Compressors", items: ["Filter replacement", "Dryers", "Leak testing", "Periodic service"] },
      { title: "Suction systems", items: ["Service and cleaning", "Filters · separators", "Upgrades"] },
      { title: "Chair upholstery", items: ["Renovation and replacement", "Customisation", "Disinfectant-resistant materials"] },
      { title: "Technical inspections", items: ["Periodic checks", "Reports and documentation", "Technical recommendations"] },
      { title: "Diagnostics & call-out", items: ["Fast fault assessment", "On-site quote", "On-site repair"] },
      { title: "Technical documentation", items: ["Equipment records", "Repair history", "Audit support"] },
      { title: "Additional services", items: ["Equipment installation", "Practice upgrades", "Training and consulting"] },
    ],
    supplyLabel: "Practice supplies", supplyTitle: "Materials, accessories and spare parts",
    supplyDesc: "Disinfectants, dental accessories, spare parts and practice equipment.",
    supplyCta: "Ask about availability",
    brandsLabel: "Brands", brandsTitle: "Brands we service", brandsNote: "We also service many other dental equipment brands.",
    pricingLabel: "Pricing", pricingTitle: "Indicative pricing",
    pricingNote: "Prices are indicative. Final quote depends on device, scope of work and parts availability.",
    pricingDisclaimer: "Before any work begins, the client always receives an initial estimate. No additional work is performed without approval.",
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
      { q: "Which brands do you service?", a: "KaVo, Dentsply Sirona, Planmeca, Stern Weber, Castellini, Anthos, A-dec, W&H, Melag, NSK, Dürr Dental, Cattani and many others." },
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
    hours: "7:00 – 21:00 · 7 days a week",
    lblPhone: "Phone", lblEmail: "E-mail", lblHours: "Working hours", lblAddress: "Address", lblNip: "Tax ID (NIP)",
    footerTagline: "Dental equipment service — Warsaw and surroundings.",
    footerContact: "Contact", footerNav: "Navigation", footerInfo: "Information",
    footerPrivacy: "Privacy policy", footerCompany: "Company details",
    footerRights: "All rights reserved.",
    btnCall: "Call", btnReport: "Report",
    mapTitle: "ARRIMSERWIS service area map",
  },
} as const;

const serviceIcons = [Stethoscope, ShieldCheck, Gauge, Wind, Sofa, ClipboardCheck, Truck, FileText, Sparkles];
const whyIcons = [Truck, Wrench, Package, FileText, ClipboardCheck, ShieldCheck];

const brands = ["KaVo","Dentsply Sirona","Sirona","Planmeca","Stern Weber","Castellini","Anthos","Diplomat","A-dec","Cefla","W&H","Melag","Mocom","Euronda","NSK","Bien-Air","Dürr Dental","Cattani","Metasys"];

const areas = ["Warszawa","Pruszków","Piastów","Ożarów Mazowiecki","Błonie","Brwinów","Milanówek","Grodzisk Mazowiecki","Żyrardów","Konstancin-Jeziorna","Warszawa Zachód","Ursus","Włochy","Okęcie","Raszyn"];

const reviews = [
  { name: "dr Anna Kowalska", clinic: { pl: "Gabinet stomatologiczny, Mokotów", ru: "Стоматологический кабинет, Мокотув", en: "Dental practice, Mokotów" },
    text: { pl: "Awaria unitu w środku dnia przyjęć — technik dojechał w ciągu dwóch godzin i naprawił hydraulikę na miejscu. Bardzo profesjonalna obsługa.",
            ru: "Поломка установки в разгар приёма — техник приехал в течение двух часов и починил гидравлику на месте. Очень профессионально.",
            en: "Unit failure in the middle of appointments — the technician arrived within two hours and fixed the hydraulics on-site. Very professional." } },
  { name: "lek. dent. Michał Nowak", clinic: { pl: "Praktyka dentystyczna, Pruszków", ru: "Стоматологическая практика, Прушкув", en: "Dental practice, Pruszków" },
    text: { pl: "Korzystamy z opieki serwisowej od pół roku. Przeglądy zawsze w terminie, pełna dokumentacja, transparentne ceny. Polecam.",
            ru: "Пользуемся сервисной поддержкой уже полгода. Осмотры всегда в срок, полная документация, прозрачные цены. Рекомендую.",
            en: "We've been on the service plan for half a year. Inspections always on time, full documentation, transparent prices. Recommended." } },
  { name: "dr Joanna Wiśniewska", clinic: { pl: "Klinika stomatologiczna, Ursus", ru: "Стоматологическая клиника, Урсус", en: "Dental clinic, Ursus" },
    text: { pl: "Serwis autoklawu i kalibracja — wszystko zrobione szybko, z protokołem. Wreszcie firma, na której można polegać.",
            ru: "Сервис автоклава и калибровка — всё сделано быстро, с протоколом. Наконец-то компания, на которую можно положиться.",
            en: "Autoclave service and calibration — everything done quickly, with a report. Finally a company you can rely on." } },
  { name: "lek. dent. Paweł Zieliński", clinic: { pl: "Gabinet, Grodzisk Mazowiecki", ru: "Кабинет, Гродзиск-Мазовецкий", en: "Practice, Grodzisk Mazowiecki" },
    text: { pl: "Modernizacja kompresora i systemu ssącego. Doradztwo na wysokim poziomie, czysta i terminowa robota.",
            ru: "Модернизация компрессора и системы аспирации. Высокий уровень консультаций, чистая и своевременная работа.",
            en: "Compressor and suction system upgrade. Top-level advice, clean and on-time work." } },
  { name: "dr Karolina Mazur", clinic: { pl: "Gabinet, Raszyn", ru: "Кабинет, Рашин", en: "Practice, Raszyn" },
    text: { pl: "Renowacja tapicerki fotela — efekt jak nowy. Materiał odporny na dezynfekcję, świetne wykonanie.",
            ru: "Реновация обивки кресла — как новое. Материал устойчив к дезинфекции, отличное исполнение.",
            en: "Chair upholstery renovation — looks brand new. Disinfectant-resistant material, great workmanship." } },
  { name: "lek. dent. Tomasz Lewandowski", clinic: { pl: "Praktyka, Żyrardów", ru: "Практика, Жирардув", en: "Practice, Żyrardów" },
    text: { pl: "Reagują w weekend, co dla nas kluczowe. Wycena zawsze przed pracami, żadnych niespodzianek na fakturze.",
            ru: "Реагируют в выходные, что для нас важно. Смета всегда до работ, никаких сюрпризов в счёте.",
            en: "They respond on weekends, which is key for us. Quote always before work, no invoice surprises." } },
];

function Landing() {
  const [lang, setLang] = useState<Lang>("pl");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const L = t[lang];

  const faqJsonLd = useMemo(() => ({
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: L.faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  }), [L]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    toast.success(L.sent);
    (e.target as HTMLFormElement).reset();
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
            <div className="flex items-center gap-1 rounded-full border border-border p-1 text-xs">
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
            </nav>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden gradient-hero text-white">
        <div className="absolute inset-0 opacity-25">
          <img src={heroImg} alt="ARRIMSERWIS" className="h-full w-full object-cover" width={1920} height={1280} />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-24 lg:py-32 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[color:var(--teal)] animate-pulse" /> {L.badge}
            </div>
            <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight">
              {titleParts.head}<span className="text-gradient">{titleParts.tail}</span>
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
              <img src={technicianImg} alt="ARRIMSERWIS" className="w-full h-[520px] object-cover" width={1280} height={1280} />
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

      {/* About */}
      <section className="py-16 md:py-24">
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
            <img src={equipmentImg} alt="ARRIMSERWIS" loading="lazy" width={1280} height={960} className="w-full h-auto object-cover" />
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 md:py-24 bg-[color:var(--teal-soft)]/40">
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

      {/* Brands */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center max-w-2xl mx-auto">
            <SectionLabel>{L.brandsLabel}</SectionLabel>
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
          <div className="mt-8 rounded-3xl overflow-hidden grid md:grid-cols-[1.2fr_1fr]">
            <div className="bg-[color:var(--navy-deep)] text-white p-8 md:p-10">
              <SectionLabel className="text-[color:var(--teal)]">{L.carePlanLabel}</SectionLabel>
              <h3 className="mt-2 text-2xl md:text-3xl font-bold">{L.carePlanTitle}</h3>
              <div className="mt-4 text-4xl font-extrabold font-display">{L.carePlanPrice} <span className="text-base font-medium text-white/70">{L.carePlanPer}</span></div>
              <ul className="mt-5 space-y-2 text-sm text-white/85">
                {L.carePlanItems.map(i => (
                  <li key={i} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[color:var(--teal)]" />{i}</li>
                ))}
              </ul>
              <a href="#contact" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[color:var(--teal)] text-[color:var(--navy-deep)] px-6 py-3 font-semibold hover:brightness-105">
                {L.carePlanCta}
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

      {/* Area */}
      <section id="area" className="py-16 md:py-24 bg-[color:var(--teal-soft)]/40">
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
          <div className="rounded-3xl overflow-hidden shadow-[var(--shadow-premium)] border border-border h-[420px]">
            <iframe
              title={L.mapTitle}
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
      <section id="faq" className="py-16 md:py-24 bg-[color:var(--teal-soft)]/40">
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
      <section id="contact" className="py-16 md:py-24">
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
              <div className="flex items-center gap-4 rounded-2xl border border-border p-4">
                <div className="h-11 w-11 rounded-xl gradient-teal grid place-items-center text-white"><FileText className="h-5 w-5" /></div>
                <div><div className="text-xs text-muted-foreground">{L.lblNip}</div><div className="font-semibold text-[color:var(--navy-deep)]">{NIP}</div></div>
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
              <div className="h-9 w-9 rounded-lg gradient-teal grid place-items-center text-white font-bold">A</div>
              <span className="font-display font-bold text-white">ARRIMSERWIS</span>
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
              <li className="text-white font-medium">ARRIMSERWIS</li>
              <li>{ADDRESS}</li>
              <li>{L.lblNip}: {NIP}</li>
              <li className="pt-2"><a href="#" className="hover:text-[color:var(--teal)]">{L.footerPrivacy}</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-5 text-xs text-white/55 flex flex-wrap items-center justify-between gap-3">
            <span>© {new Date().getFullYear()} ARRIMSERWIS. {L.footerRights}</span>
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
