import type { Locale } from "./types";

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface Dictionary {
  nav: {
    about: string;
    projects: string;
    experience: string;
    contact: string;
    work: string;
    cv: string;
    downloadCv: string;
    menu: string;
    close: string;
    language: string;
    chooseLanguage: string;
  };
  hero: {
    available: string;
    name: string;
    role: string;
    summary: string;
    viewProjects: string;
    getInTouch: string;
    location: string;
    locationCity: string;
    locationSub: string;
    focus: string;
    focusAreas: string[];
    years: string;
    projects: string;
    industries: string;
    skills: string;
    tools: string;
    languages: string;
    languageLevels: { native: string; fluent: string; professional: string };
  };
  projects: {
    eyebrow: string;
    heading: string;
    inProgress: string;
    comingSoon: string;
  };
  experience: {
    eyebrow: string;
    heading: string;
    fullTime: string;
    freelance: string;
    freelancePeriod: string;
    positions: string;
  };
  contact: {
    eyebrow: string;
    headingPart1: string;
    headingAccent: string;
    headingPart3: string;
    description: string;
    sendEmail: string;
    connect: string;
    emailLabel: string;
    linkedinLabel: string;
    locationFooter: string;
    // Contact form
    formName: string;
    formNamePlaceholder: string;
    formEmail: string;
    formEmailPlaceholder: string;
    formSubject: string;
    formSubjectPlaceholder: string;
    formMessage: string;
    formMessagePlaceholder: string;
    formSubmit: string;
    formSubmitOpening: string;
    formSubmitDone: string;
    formCopy: string;
    formCopied: string;
    formIntro: string;
    formNote: string;
    formError: string;
  };
  caseStudy: {
    backToWork: string;
    overview: string;
    role: string;
    duration: string;
    team: string;
    year: string;
    problem: string;
    solution: string;
    outcome: string;
    reflection: string;
    impact: string;
    nextProject: string;
    readingProgress: string;
    heroImage: string;
    category: string;
    shortVersion: string;
    receipts: string;
    visuals: string;
    versionsAssets: string;   // "{count} versions · {total} assets"
    assetsCount: string;       // "{count} assets"
  };
  modal: { close: string; comingSoon: string };
  caseTabs: { firstVersion: string; releaseVersion: string };
  cv: {
    downloadTitle: string;
    downloadIntro: string;
    chooseLang: string;
    downloadPdf: string;
    print: string;
    contact: string;
    location: string;
    email: string;
    linkedin: string;
    summaryTitle: string;
    skillsTitle: string;
    skillsWhatIDo: string;
    skillsWhatIUse: string;
    languagesTitle: string;
    workExperienceTitle: string;
    freelanceTitle: string;
    freelancePeriod: string;
    generatedOn: string;
  };
  languagePicker: { title: string; subtitle: string };
  // Footer
  footer: {
    aboutSiteLabel: string;
    aboutSiteBlurb: string;
    navigateCol: string;
    workCol: string;
    elsewhereCol: string;
    localeCol: string;
    madeWith: string;
  };
  // Method / process section
  method: {
    eyebrow: string;
    headingLine1: string;
    headingLine2: string;
    blurb: string;
    stepLabel: string;
    steps: [ProcessStep, ProcessStep, ProcessStep, ProcessStep];
  };
  // About page section labels
  about: {
    heroLine1: string;
    heroLine2: string;
    bioLabel: string;
    capabilitiesLabel: string;
    methodLabel: string;
    experienceLabel: string;
    freelanceLabel: string;
  };
  // 404 page
  notFound: {
    eyebrow: string;
    title: string;
    blurb: string;
    cta: string;
  };
  // Miscellaneous UI strings
  ui: {
    portfolioStrip: string;
    caseStudiesStrip: string;
    archiveLabel: string;
    filesSuffix: string;
    selectedWork: string;
    viewAllCases: string;
    caseArchiveBlurb: string;
    visualsLabel: string;
    aboutEyebrow: string;
    contactEyebrow: string;
  };
  // Marquee ticker items per page
  marquees: {
    home: string[];
    work: string[];
    contact: string[];
    about: string[];
  };
}

const en: Dictionary = {
  nav: {
    about: "About",
    projects: "Work",
    experience: "Experience",
    contact: "Contact",
    work: "Work",
    cv: "CV",
    downloadCv: "Download CV",
    menu: "Menu",
    close: "Close",
    language: "Language",
    chooseLanguage: "Choose language",
  },
  hero: {
    available: "Available for work",
    name: "Garri Avetisyan",
    role: "Product Designer",
    summary:
      "Product Designer with 5+ years building complex digital products across AI, Web3, SaaS, and marketplaces. I focus on solving the right problems, structuring information clearly, and making complex systems feel simple.",
    viewProjects: "View Projects",
    getInTouch: "Get in touch",
    location: "Location",
    locationCity: "Yerevan, Armenia",
    locationSub: "Open to remote worldwide",
    focus: "Focus areas",
    focusAreas: ["AI", "Web3", "SaaS", "Marketplace", "Mobile"],
    years: "Years",
    projects: "Projects",
    industries: "Industries",
    skills: "Skills",
    tools: "Tools",
    languages: "Languages",
    languageLevels: { native: "Native", fluent: "Fluent", professional: "Professional" },
  },
  projects: {
    eyebrow: "Selected Work",
    heading: "Case Studies",
    inProgress: "In Progress",
    comingSoon: "Coming soon",
  },
  experience: {
    eyebrow: "Experience",
    heading: "Work History",
    fullTime: "Full-time",
    freelance: "Freelance",
    freelancePeriod: "May 2025 – Dec 2025",
    positions: "positions",
  },
  contact: {
    eyebrow: "Contact",
    headingPart1: "Let's build something",
    headingAccent: "together",
    headingPart3: ".",
    description:
      "Open to product design roles and freelance collaborations. If you have a challenge worth solving, I'd love to hear about it.",
    sendEmail: "Send email",
    connect: "Connect",
    emailLabel: "Email",
    linkedinLabel: "LinkedIn",
    locationFooter: "Yerevan, Armenia · Remote worldwide",
    formName: "Name",
    formNamePlaceholder: "Your name",
    formEmail: "Email",
    formEmailPlaceholder: "you@company.com",
    formSubject: "Subject",
    formSubjectPlaceholder: "What's it about?",
    formMessage: "Message",
    formMessagePlaceholder: "Tell me about the project, role, or just say hi.",
    formSubmit: "Send message",
    formSubmitOpening: "Opening your mail app…",
    formSubmitDone: "Sent — your message is in your draft folder.",
    formCopy: "Copy to clipboard",
    formCopied: "Copied",
    formIntro:
      "Fill the form and I'll get the message in my inbox. Prefer something else? Email or LinkedIn work too.",
    formNote:
      "Submitting opens your email client with everything prefilled. The message is also copied to your clipboard as a backup.",
    formError: "Please fill in name, email, and a message.",
  },
  caseStudy: {
    backToWork: "Back to work",
    overview: "Overview",
    role: "Role",
    duration: "Duration",
    team: "Team",
    year: "Year",
    problem: "Problem",
    solution: "Solution",
    outcome: "Outcome",
    reflection: "Reflection",
    impact: "Impact",
    nextProject: "Next project",
    readingProgress: "Reading progress",
    heroImage: "Hero",
    category: "Category",
    shortVersion: "THE SHORT VERSION",
    receipts: "THE RECEIPTS",
    visuals: "Visuals",
    versionsAssets: "{count} versions · {total} assets",
    assetsCount: "{count} assets",
  },
  modal: { close: "Close", comingSoon: "Case study assets coming soon" },
  caseTabs: { firstVersion: "First Version", releaseVersion: "Release Version" },
  cv: {
    downloadTitle: "Download CV",
    downloadIntro: "Pick the language you'd like the CV in.",
    chooseLang: "Choose a language",
    downloadPdf: "Download PDF",
    print: "Print",
    contact: "Contact",
    location: "Location",
    email: "Email",
    linkedin: "LinkedIn",
    summaryTitle: "Summary",
    skillsTitle: "Skills",
    skillsWhatIDo: "What I do",
    skillsWhatIUse: "What I use",
    languagesTitle: "Languages",
    workExperienceTitle: "Work Experience",
    freelanceTitle: "Freelance Projects",
    freelancePeriod: "May 2025 – Dec 2025",
    generatedOn: "Generated",
  },
  languagePicker: {
    title: "Choose CV language",
    subtitle: "Pick the language you'd like to download.",
  },
  footer: {
    aboutSiteLabel: "About this site",
    aboutSiteBlurb:
      "Brutalist editorial-tech portfolio. Three locales, full case studies, zero tracking.",
    navigateCol: "Navigate",
    workCol: "Work",
    elsewhereCol: "Elsewhere",
    localeCol: "Locale",
    madeWith: "Made with care · No tracking",
  },
  method: {
    eyebrow: "Method / 4-step",
    headingLine1: "HOW IT GETS",
    headingLine2: "MADE",
    blurb:
      "Evidence before pixels. Strategy before screens. The same loop, every project — research, frame, design, validate.",
    stepLabel: "Step",
    steps: [
      { step: "01", title: "Understand", description: "Research the problem space, talk to users, analyze data, and map the business context. No assumptions — evidence." },
      { step: "02", title: "Frame", description: "Define the real problem (not the first one), set constraints, identify success metrics, and align stakeholders on direction." },
      { step: "03", title: "Design", description: "Explore broadly, then converge. Wireframes, prototypes, visual design — always tied back to the strategy. Kill your darlings early." },
      { step: "04", title: "Validate", description: "Test with real users, measure against goals, iterate based on evidence. Ship, learn, improve. Design doesn't end at handoff." },
    ],
  },
  about: {
    heroLine1: "DESIGN IS",
    heroLine2: "A BUSINESS",
    bioLabel: "Bio",
    capabilitiesLabel: "Capabilities",
    methodLabel: "Method",
    experienceLabel: "Experience",
    freelanceLabel: "Freelance",
  },
  notFound: {
    eyebrow: "Error / 404",
    title: "NOT FOUND",
    blurb: "The page you're looking for doesn't exist or has been moved.",
    cta: "Back to index",
  },
  ui: {
    portfolioStrip: "Portfolio / 2020—2026",
    caseStudiesStrip: "Case studies / 2020—2026",
    archiveLabel: "Archive",
    filesSuffix: "files",
    selectedWork: "Selected Work",
    viewAllCases: "— View all {count} case studies ↗",
    caseArchiveBlurb:
      "Every case is a full story — problem, research, decisions, what worked, and what I'd redo. No mood-board screenshots, no shipped-feature drive-bys. Pick a file and read the receipts.",
    visualsLabel: "Visuals",
    aboutEyebrow: "About",
    contactEyebrow: "Contact / always open",
  },
  marquees: {
    home: [
      "PRODUCT DESIGNER",
      "EST. 2020 · YEREVAN",
      "AI · WEB3 · SAAS · MARKETPLACE",
      "AVAILABLE FOR WORK",
      "STRATEGY → RESEARCH → DESIGN → SHIP",
      "5+ YRS · CASE STUDIES IN 3 LANGUAGES",
    ],
    work: [
      "ALL CASE STUDIES",
      "PRODUCT DESIGN · UX STRATEGY · DESIGN SYSTEMS",
      "READ — DON'T JUST SCROLL",
      "EVIDENCE OVER DECORATION",
    ],
    contact: [
      "AVAILABLE FOR HIRE",
      "FULL-TIME · CONTRACT · FRACTIONAL",
      "EN · RU · HY",
      "OPEN TO REMOTE WORLDWIDE",
      "REPLY WITHIN 24H",
    ],
    about: [
      "FOCUS · AI · WEB3 · SAAS · MARKETPLACE",
      "5+ YEARS · 6 CASE STUDIES",
      "BASED IN YEREVAN · OPEN TO REMOTE",
      "DESIGN IS A BUSINESS FUNCTION",
    ],
  },
};

const ru: Dictionary = {
  nav: {
    about: "Обо мне",
    projects: "Работы",
    experience: "Опыт",
    contact: "Контакты",
    work: "Работы",
    cv: "CV",
    downloadCv: "Скачать резюме",
    menu: "Меню",
    close: "Закрыть",
    language: "Язык",
    chooseLanguage: "Выбрать язык",
  },
  hero: {
    available: "Открыт для работы",
    name: "Гарри Аветисян",
    role: "Продуктовый дизайнер",
    summary:
      "Продуктовый дизайнер с опытом 5+ лет. Создаю сложные цифровые продукты в сферах AI, Web3, SaaS и маркетплейсов. Фокусируюсь на решении правильных задач, структурировании информации и превращении сложных систем в простые и понятные.",
    viewProjects: "Смотреть работы",
    getInTouch: "Связаться",
    location: "Локация",
    locationCity: "Ереван, Армения",
    locationSub: "Открыт к удалёнке по всему миру",
    focus: "Ключевые направления",
    focusAreas: ["AI", "Web3", "SaaS", "Маркетплейсы", "Мобайл"],
    years: "Лет опыта",
    projects: "Проектов",
    industries: "Индустрий",
    skills: "Навыки",
    tools: "Инструменты",
    languages: "Языки",
    languageLevels: { native: "Родной", fluent: "Свободно", professional: "Профессиональный" },
  },
  projects: {
    eyebrow: "Избранные работы",
    heading: "Кейсы",
    inProgress: "В работе",
    comingSoon: "Скоро",
  },
  experience: {
    eyebrow: "Опыт",
    heading: "История работы",
    fullTime: "Фултайм",
    freelance: "Фриланс",
    freelancePeriod: "Май 2025 – Дек 2025",
    positions: "позиций",
  },
  contact: {
    eyebrow: "Контакты",
    headingPart1: "Давайте создадим что-то",
    headingAccent: "вместе",
    headingPart3: ".",
    description:
      "Открыт к работе в должности продуктового дизайнера и фриланс-сотрудничеству. Если у вас есть задача, которую стоит решить — с радостью обсужу.",
    sendEmail: "Написать письмо",
    connect: "Связь",
    emailLabel: "Email",
    linkedinLabel: "LinkedIn",
    locationFooter: "Ереван, Армения · Удалённо по всему миру",
    formName: "Имя",
    formNamePlaceholder: "Ваше имя",
    formEmail: "Email",
    formEmailPlaceholder: "you@company.com",
    formSubject: "Тема",
    formSubjectPlaceholder: "О чём пишем?",
    formMessage: "Сообщение",
    formMessagePlaceholder: "Расскажите о проекте, роли или просто поздоровайтесь.",
    formSubmit: "Отправить",
    formSubmitOpening: "Открываю почтовый клиент…",
    formSubmitDone: "Готово — сообщение в черновиках.",
    formCopy: "Скопировать",
    formCopied: "Скопировано",
    formIntro:
      "Заполните форму — и сообщение придёт ко мне на почту. Удобнее иначе? Email или LinkedIn тоже работают.",
    formNote:
      "При отправке откроется ваш почтовый клиент с заполненным письмом. На всякий случай оно копируется в буфер обмена.",
    formError: "Пожалуйста, заполните имя, email и сообщение.",
  },
  caseStudy: {
    backToWork: "К работам",
    overview: "Обзор",
    role: "Роль",
    duration: "Срок",
    team: "Команда",
    year: "Год",
    problem: "Задача",
    solution: "Решение",
    outcome: "Результат",
    reflection: "Выводы",
    impact: "Результаты",
    nextProject: "Следующий проект",
    readingProgress: "Прогресс чтения",
    heroImage: "Обложка",
    category: "Категория",
    shortVersion: "КОРОТКО О ГЛАВНОМ",
    receipts: "ЦИФРЫ",
    visuals: "Визуал",
    versionsAssets: "{count} версии · {total} файлов",
    assetsCount: "{count} файлов",
  },
  modal: { close: "Закрыть", comingSoon: "Материалы кейса скоро появятся" },
  caseTabs: { firstVersion: "Первая версия", releaseVersion: "Релизная версия" },
  cv: {
    downloadTitle: "Скачать резюме",
    downloadIntro: "Выберите язык резюме.",
    chooseLang: "Выберите язык",
    downloadPdf: "Скачать PDF",
    print: "Печать",
    contact: "Контакты",
    location: "Локация",
    email: "Email",
    linkedin: "LinkedIn",
    summaryTitle: "О себе",
    skillsTitle: "Навыки",
    skillsWhatIDo: "Что я делаю",
    skillsWhatIUse: "Чем пользуюсь",
    languagesTitle: "Языки",
    workExperienceTitle: "Опыт работы",
    freelanceTitle: "Фриланс-проекты",
    freelancePeriod: "Май 2025 – Дек 2025",
    generatedOn: "Создано",
  },
  languagePicker: { title: "Язык резюме", subtitle: "Выберите язык для скачивания." },
  footer: {
    aboutSiteLabel: "Об этом сайте",
    aboutSiteBlurb:
      "Брутальное editorial-tech-портфолио. Три языка, полные кейсы, никаких трекеров.",
    navigateCol: "Навигация",
    workCol: "Работы",
    elsewhereCol: "Где ещё",
    localeCol: "Язык",
    madeWith: "Сделано с заботой · Без трекеров",
  },
  method: {
    eyebrow: "Метод / 4 шага",
    headingLine1: "КАК ЭТО",
    headingLine2: "ДЕЛАЕТСЯ",
    blurb:
      "Сначала данные, потом пиксели. Сначала стратегия, потом экраны. Один и тот же цикл в каждом проекте — ресерч, рамка, дизайн, валидация.",
    stepLabel: "Шаг",
    steps: [
      { step: "01", title: "Понять", description: "Изучить проблему, поговорить с пользователями, проанализировать данные и контекст бизнеса. Без догадок — только факты." },
      { step: "02", title: "Сформулировать", description: "Найти настоящую задачу (а не первую попавшуюся), задать ограничения, метрики успеха и согласовать направление со стейкхолдерами." },
      { step: "03", title: "Спроектировать", description: "Развернуть широкие варианты, потом сходиться. Вайрфреймы, прототипы, визуал — всё привязано к стратегии. Убивать слабые идеи рано." },
      { step: "04", title: "Проверить", description: "Тестировать с реальными пользователями, мерить против целей, итерировать на основе данных. Дизайн не заканчивается на хендоффе." },
    ],
  },
  about: {
    heroLine1: "ДИЗАЙН —",
    heroLine2: "ЭТО БИЗНЕС",
    bioLabel: "Био",
    capabilitiesLabel: "Возможности",
    methodLabel: "Метод",
    experienceLabel: "Опыт",
    freelanceLabel: "Фриланс",
  },
  notFound: {
    eyebrow: "Ошибка / 404",
    title: "НЕ НАЙДЕНО",
    blurb: "Страница, которую вы ищете, не существует или была перемещена.",
    cta: "На главную",
  },
  ui: {
    portfolioStrip: "Портфолио / 2020—2026",
    caseStudiesStrip: "Кейсы / 2020—2026",
    archiveLabel: "Архив",
    filesSuffix: "файлов",
    selectedWork: "Избранные работы",
    viewAllCases: "— Все {count} кейсов ↗",
    caseArchiveBlurb:
      "Каждый кейс — это полная история: задача, ресерч, решения, что сработало и что я бы переделал. Без скриншотов из мудборда и понтов о фичах. Откройте и читайте по существу.",
    visualsLabel: "Визуал",
    aboutEyebrow: "Обо мне",
    contactEyebrow: "Контакт / всегда открыт",
  },
  marquees: {
    home: [
      "ПРОДУКТОВЫЙ ДИЗАЙНЕР",
      "С 2020 · ЕРЕВАН",
      "AI · WEB3 · SAAS · МАРКЕТПЛЕЙС",
      "ОТКРЫТ ДЛЯ РАБОТЫ",
      "СТРАТЕГИЯ → РЕСЕРЧ → ДИЗАЙН → ЗАПУСК",
      "5+ ЛЕТ · КЕЙСЫ НА 3 ЯЗЫКАХ",
    ],
    work: [
      "ВСЕ КЕЙСЫ",
      "ПРОДУКТОВЫЙ ДИЗАЙН · UX-СТРАТЕГИЯ · ДИЗАЙН-СИСТЕМЫ",
      "ЧИТАТЬ — А НЕ ПРОСТО СКРОЛЛИТЬ",
      "ДОКАЗАТЕЛЬСТВА, А НЕ ДЕКОРАЦИЯ",
    ],
    contact: [
      "ОТКРЫТ ДЛЯ ПРЕДЛОЖЕНИЙ",
      "ФУЛТАЙМ · КОНТРАКТ · FRACTIONAL",
      "EN · RU · HY",
      "УДАЛЁНКА ПО ВСЕМУ МИРУ",
      "ОТВЕЧАЮ В ТЕЧЕНИЕ 24Ч",
    ],
    about: [
      "ФОКУС · AI · WEB3 · SAAS · МАРКЕТПЛЕЙС",
      "5+ ЛЕТ · 6 КЕЙСОВ",
      "ЕРЕВАН · ОТКРЫТ К УДАЛЁНКЕ",
      "ДИЗАЙН — ЭТО БИЗНЕС-ФУНКЦИЯ",
    ],
  },
};

// Armenian — rewritten in a warmer, more conversational tone.
// Avoids overly formal academic phrasing; reads like a friend
// talking about their work rather than a textbook.
const hy: Dictionary = {
  nav: {
    about: "Իմ մասին",
    projects: "Աշխատանքներ",
    experience: "Փորձ",
    contact: "Կապ",
    work: "Աշխատանքներ",
    cv: "CV",
    downloadCv: "Ներբեռնել CV-ն",
    menu: "Մենյու",
    close: "Փակել",
    language: "Լեզու",
    chooseLanguage: "Ընտրել լեզուն",
  },
  hero: {
    available: "Բաց եմ նոր նախագծերի համար",
    name: "Գարրի Ավետիսյան",
    role: "Պրոդուկտի դիզայներ",
    summary:
      "Պրոդուկտի դիզայներ եմ՝ ավելի քան 5 տարվա փորձով։ Աշխատում եմ բարդ թվային պրոդուկտների վրա՝ AI, Web3, SaaS ու մարքեթփլեյս ոլորտներում։ Գործս է՝ ճիշտ խնդիրները լուծել, տեղեկատվությունը հստակ դասավորել ու բարդը պարզ դարձնել։",
    viewProjects: "Տեսնել աշխատանքները",
    getInTouch: "Գրել",
    location: "Որտեղ եմ",
    locationCity: "Երևան, Հայաստան",
    locationSub: "Բաց եմ ռեմոութի՝ ամբողջ աշխարհով",
    focus: "Հիմնական ուղղություններ",
    focusAreas: ["AI", "Web3", "SaaS", "Մարքեթփլեյս", "Մոբայլ"],
    years: "Տարի",
    projects: "Պրոյեկտ",
    industries: "Ոլորտ",
    skills: "Հմտություններ",
    tools: "Գործիքներ",
    languages: "Լեզուներ",
    languageLevels: { native: "Մայրենի", fluent: "Ազատ", professional: "Մասնագիտական" },
  },
  projects: {
    eyebrow: "Ընտրած աշխատանքներ",
    heading: "Կեյսեր",
    inProgress: "Ընթացքում է",
    comingSoon: "Շուտով",
  },
  experience: {
    eyebrow: "Փորձ",
    heading: "Աշխատանքային ճանապարհ",
    fullTime: "Լրիվ դրույք",
    freelance: "Ֆրիլանս",
    freelancePeriod: "Մայիս 2025 – Դեկ 2025",
    positions: "դիրք",
  },
  contact: {
    eyebrow: "Կապ",
    headingPart1: "Արի",
    headingAccent: "միասին",
    headingPart3: " սարքենք",
    description:
      "Բաց եմ պրոդուկտի դիզայների դիրքերի ու ֆրիլանս համագործակցության համար։ Եթե կա լուծելու արժանի մի խնդիր՝ ուրախ կլինեմ լսել։",
    sendEmail: "Գրել նամակ",
    connect: "Կապ հաստատել",
    emailLabel: "Email",
    linkedinLabel: "LinkedIn",
    locationFooter: "Երևան, Հայաստան · Ռեմոութ՝ ամբողջ աշխարհով",
    formName: "Անուն",
    formNamePlaceholder: "Քո անունը",
    formEmail: "Email",
    formEmailPlaceholder: "you@company.com",
    formSubject: "Թեմա",
    formSubjectPlaceholder: "Ինչի՞ մասին է",
    formMessage: "Նամակ",
    formMessagePlaceholder: "Պատմիր նախագծի, դիրքի մասին կամ պարզապես բարևիր։",
    formSubmit: "Ուղարկել",
    formSubmitOpening: "Բացում եմ մեյլդ…",
    formSubmitDone: "Պատրաստ է — նամակը քո դրաֆտներում է։",
    formCopy: "Կրկնօրինակել",
    formCopied: "Պատճենված է",
    formIntro:
      "Լրացրու ֆորման՝ ու հաղորդագրությունն ինձ կհասնի։ Եթե այլ կերպ ես ուզում՝ email-ն ու LinkedIn-ն էլ են աշխատում։",
    formNote:
      "Ուղարկելիս կբացվի քո mail-ը՝ արդեն լրացված տեքստով։ Ապահով լինելու համար տեքստը նաև պատճենվում է clipboard-ում։",
    formError: "Խնդրում եմ լրացրու անունը, email-ն ու հաղորդագրությունը։",
  },
  caseStudy: {
    backToWork: "Հետ՝ աշխատանքներին",
    overview: "Ընդհանուր",
    role: "Դեր",
    duration: "Տևողություն",
    team: "Թիմ",
    year: "Տարի",
    problem: "Խնդիր",
    solution: "Լուծում",
    outcome: "Արդյունք",
    reflection: "Մտքեր հետադարձ նայելով",
    impact: "Արդյունքներ",
    nextProject: "Հաջորդ նախագիծ",
    readingProgress: "Ընթերցման ընթացք",
    heroImage: "Կազմ",
    category: "Կատեգորիա",
    shortVersion: "ԿԱՐՃ ՆԿԱՐԱԳԻՐ",
    receipts: "ԱՐԴՅՈՒՆՔՆԵՐ",
    visuals: "Վիզուալ",
    versionsAssets: "{count} տարբերակ · {total} ֆայլ",
    assetsCount: "{count} ֆայլ",
  },
  modal: { close: "Փակել", comingSoon: "Կեյսի նյութերը շուտով կհայտնվեն" },
  caseTabs: { firstVersion: "Առաջին տարբերակ", releaseVersion: "Թողարկման տարբերակ" },
  cv: {
    downloadTitle: "Ներբեռնել CV-ն",
    downloadIntro: "Ընտրիր լեզուն, որով ուզում ես CV-ն։",
    chooseLang: "Ընտրիր լեզու",
    downloadPdf: "Ներբեռնել PDF",
    print: "Տպել",
    contact: "Կապ",
    location: "Որտեղ եմ",
    email: "Email",
    linkedin: "LinkedIn",
    summaryTitle: "Կարճ իմ մասին",
    skillsTitle: "Հմտություններ",
    skillsWhatIDo: "Ինչ եմ անում",
    skillsWhatIUse: "Ինչով եմ աշխատում",
    languagesTitle: "Լեզուներ",
    workExperienceTitle: "Աշխատանքային փորձ",
    freelanceTitle: "Ֆրիլանս նախագծեր",
    freelancePeriod: "Մայիս 2025 – Դեկ 2025",
    generatedOn: "Կազմված է",
  },
  languagePicker: { title: "CV-ի լեզու", subtitle: "Ընտրիր ներբեռնման լեզուն։" },
  footer: {
    aboutSiteLabel: "Այս կայքի մասին",
    aboutSiteBlurb:
      "Բրուտալիստ editorial-tech պորտֆոլիո։ Երեք լեզու, ամբողջական կեյսեր, զրո թրեքերներ։",
    navigateCol: "Նավիգացիա",
    workCol: "Աշխատանքներ",
    elsewhereCol: "Այլուր",
    localeCol: "Լեզու",
    madeWith: "Սարքած խնամքով · Առանց թրեքերների",
  },
  method: {
    eyebrow: "Մեթոդ / 4 քայլ",
    headingLine1: "ՈՒ ՍԱ",
    headingLine2: "ԵՆՔ ՍԱՐՔՈՒՄ",
    blurb:
      "Տվյալները՝ նկարից առաջ։ Ստրատեգիան՝ էկրաններից առաջ։ Միևնույն ցիկլը՝ ամեն նախագծում՝ ուսումնասիրել, շրջանակել, դիզայնել, ստուգել։",
    stepLabel: "Քայլ",
    steps: [
      { step: "01", title: "Հասկանալ", description: "Ուսումնասիրել խնդիրը, խոսել օգտատերերի հետ, վերլուծել տվյալներն ու բիզնեսի համատեքստը։ Առանց ենթադրությունների՝ միայն փաստեր։" },
      { step: "02", title: "Շրջանակել", description: "Գտնել իսկական խնդիրը (ոչ թե առաջին պատահածը), սահմանել սահմանափակումները, հաջողության մետրիկները ու ուղղությունը համաձայնեցնել թիմի հետ։" },
      { step: "03", title: "Դիզայնել", description: "Սկզբում շատ տարբերակներ՝ հետո սահող ֆոկուս։ Վայրֆրեյմեր, պրոտոտիպեր, վիզուալ — ամեն ինչ կապված ստրատեգիայի հետ։ Թույլ գաղափարները շուտ գցել։" },
      { step: "04", title: "Ստուգել", description: "Թեստել իրական մարդկանց հետ, համեմատել նպատակների հետ, փոխել տվյալների հիման վրա։ Դիզայնը handoff-ով չի ավարտվում։" },
    ],
  },
  about: {
    heroLine1: "ԴԻԶԱՅՆԸ",
    heroLine2: "ԲԻԶՆԵՍ Է",
    bioLabel: "Իմ մասին",
    capabilitiesLabel: "Ինչ կարող եմ",
    methodLabel: "Մեթոդ",
    experienceLabel: "Փորձ",
    freelanceLabel: "Ֆրիլանս",
  },
  notFound: {
    eyebrow: "Սխալ / 404",
    title: "ՉԻ ԳՏՆՎԵԼ",
    blurb: "Այս էջը գոյություն չունի կամ տեղափոխվել է։",
    cta: "Վերադառնալ սկիզբ",
  },
  ui: {
    portfolioStrip: "Պորտֆոլիո / 2020—2026",
    caseStudiesStrip: "Կեյսեր / 2020—2026",
    archiveLabel: "Արխիվ",
    filesSuffix: "ֆայլ",
    selectedWork: "Ընտրած աշխատանքներ",
    viewAllCases: "— Տեսնել բոլոր {count} կեյսերը ↗",
    caseArchiveBlurb:
      "Ամեն կեյս ամբողջ պատմություն է՝ խնդիր, ուսումնասիրություն, որոշումներ, ինչն աշխատեց ու ինչը կփոխեի։ Առանց մուդբորդից սքրիններ ու բարձրաձայն ֆիչաների։ Բացիր ու կարդա ըստ էության։",
    visualsLabel: "Վիզուալ",
    aboutEyebrow: "Իմ մասին",
    contactEyebrow: "Կապ / միշտ բաց",
  },
  marquees: {
    home: [
      "ՊՐՈԴՈՒԿՏԻ ԴԻԶԱՅՆԵՐ",
      "2020-ից · ԵՐԵՎԱՆ",
      "AI · WEB3 · SAAS · ՄԱՐՔԵԹՓԼԵՅՍ",
      "ԲԱՑ ԵՄ ԱՇԽԱՏԱՆՔԻ ՀԱՄԱՐ",
      "ՍՏՐԱՏԵԳԻԱ → ՈՒՍՈՒՄՆԱՍԻՐՈՒԹՅՈՒՆ → ԴԻԶԱՅՆ → ՇԻՓ",
      "5+ ՏԱՐԻ · ԿԵՅՍԵՐ 3 ԼԵԶՎՈՎ",
    ],
    work: [
      "ԲՈԼՈՐ ԿԵՅՍԵՐԸ",
      "ՊՐՈԴՈՒԿՏԻ ԴԻԶԱՅՆ · UX ՍՏՐԱՏԵԳԻԱ · ԴԻԶԱՅՆ ՀԱՄԱԿԱՐԳԵՐ",
      "ԿԱՐԴԱ — ՄԻ ԲԱՎԱՐԱՐՎԻՐ ՍՔՐՈԼՈՎ",
      "ՓԱՍՏԵՐԸ՝ ԴԵԿՈՐԱՑԻԱՅԻ ԴԵՄ",
    ],
    contact: [
      "ԲԱՑ ԵՄ ԱՇԽԱՏԱՆՔԻ",
      "ՖՈՒԼԹԱՅՄ · ԿՈՆՏՐԱԿՏ · FRACTIONAL",
      "EN · RU · HY",
      "ՌԵՄՈՈՒԹ ԱՄԲՈՂՋ ԱՇԽԱՐՀՈՎ",
      "ՊԱՏԱՍԽԱՆ 24 ԺԱՄՈՒՄ",
    ],
    about: [
      "ՖՈԿՈՒՍ · AI · WEB3 · SAAS · ՄԱՐՔԵԹՓԼԵՅՍ",
      "5+ ՏԱՐԻ · 6 ԿԵՅՍ",
      "ԵՐԵՎԱՆ · ԲԱՑ ԵՄ ՌԵՄՈՈՒԹԻ",
      "ԴԻԶԱՅՆԸ ԲԻԶՆԵՍ ԳՈՐԾԱՌՈՒՅԹ Է",
    ],
  },
};

export const DICTIONARIES: Record<Locale, Dictionary> = { en, ru, hy };
