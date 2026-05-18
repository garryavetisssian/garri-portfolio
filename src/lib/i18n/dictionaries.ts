import type { Locale } from "./types";

export interface Dictionary {
  nav: {
    about: string;
    projects: string;
    experience: string;
    contact: string;
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
  };
  modal: {
    close: string;
    comingSoon: string;
  };
  caseTabs: {
    firstVersion: string;
    releaseVersion: string;
  };
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
  languagePicker: {
    title: string;
    subtitle: string;
  };
}

const en: Dictionary = {
  nav: {
    about: "About",
    projects: "Projects",
    experience: "Experience",
    contact: "Contact",
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
  },
  modal: {
    close: "Close",
    comingSoon: "Case study assets coming soon",
  },
  caseTabs: {
    firstVersion: "First Version",
    releaseVersion: "Release Version",
  },
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
};

const ru: Dictionary = {
  nav: {
    about: "Обо мне",
    projects: "Проекты",
    experience: "Опыт",
    contact: "Контакты",
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
    viewProjects: "Смотреть проекты",
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
  },
  modal: {
    close: "Закрыть",
    comingSoon: "Материалы кейса скоро появятся",
  },
  caseTabs: {
    firstVersion: "Первая версия",
    releaseVersion: "Релизная версия",
  },
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
  languagePicker: {
    title: "Язык резюме",
    subtitle: "Выберите язык для скачивания.",
  },
};

const hy: Dictionary = {
  nav: {
    about: "Իմ մասին",
    projects: "Նախագծեր",
    experience: "Փորձ",
    contact: "Կապ",
    downloadCv: "Ներբեռնել CV-ն",
    menu: "Ընտրացանկ",
    close: "Փակել",
    language: "Լեզու",
    chooseLanguage: "Ընտրել լեզուն",
  },
  hero: {
    available: "Բաց եմ աշխատանքի համար",
    name: "Գարրի Ավետիսյան",
    role: "Պրոդուկտի դիզայներ",
    summary:
      "Պրոդուկտի դիզայներ՝ 5+ տարվա փորձով։ Ստեղծում եմ բարդ թվային արտադրանքներ AI, Web3, SaaS և շուկայահրապարակի ոլորտներում։ Կենտրոնանում եմ ճիշտ խնդիրներ լուծելու, տեղեկատվությունը պարզ կառուցելու և բարդ համակարգերը պարզ զգալի դարձնելու վրա։",
    viewProjects: "Տեսնել նախագծերը",
    getInTouch: "Կապվել",
    location: "Գտնվելու վայր",
    locationCity: "Երևան, Հայաստան",
    locationSub: "Բաց եմ հեռահար աշխատանքի՝ ամբողջ աշխարհում",
    focus: "Հիմնական ոլորտներ",
    focusAreas: ["AI", "Web3", "SaaS", "Շուկայահրապարակ", "Մոբայլ"],
    years: "Տարի",
    projects: "Նախագիծ",
    industries: "Ոլորտ",
    skills: "Հմտություններ",
    tools: "Գործիքներ",
    languages: "Լեզուներ",
    languageLevels: { native: "Մայրենի", fluent: "Ազատ", professional: "Մասնագիտական" },
  },
  projects: {
    eyebrow: "Ընտրված աշխատանքներ",
    heading: "Գործեր",
    inProgress: "Ընթացքում",
    comingSoon: "Շուտով",
  },
  experience: {
    eyebrow: "Փորձ",
    heading: "Աշխատանքի պատմություն",
    fullTime: "Լրիվ դրույք",
    freelance: "Ֆրիլանս",
    freelancePeriod: "Մայիս 2025 – Դեկ 2025",
  },
  contact: {
    eyebrow: "Կապ",
    headingPart1: "Եկեք ստեղծենք ինչ-որ բան",
    headingAccent: "միասին",
    headingPart3: "։",
    description:
      "Բաց եմ պրոդուկտի դիզայների դիրքերի և ֆրիլանս համագործակցության համար։ Եթե ունեք լուծելու արժանի խնդիր՝ ուրախ կլինեմ լսել։",
    sendEmail: "Ուղարկել նամակ",
    connect: "Կապ",
    emailLabel: "Email",
    linkedinLabel: "LinkedIn",
    locationFooter: "Երևան, Հայաստան · Հեռահար՝ ամբողջ աշխարհում",
  },
  caseStudy: {
    backToWork: "Վերադառնալ աշխատանքներին",
    overview: "Ընդհանուր",
    role: "Դեր",
    duration: "Տևողություն",
    team: "Թիմ",
    year: "Տարի",
    problem: "Խնդիր",
    solution: "Լուծում",
    outcome: "Արդյունք",
    reflection: "Եզրակացություններ",
    impact: "Արդյունքներ",
    nextProject: "Հաջորդ նախագիծ",
    readingProgress: "Ընթերցման ընթացք",
    heroImage: "Կազմ",
    category: "Կատեգորիա",
  },
  modal: {
    close: "Փակել",
    comingSoon: "Գործի նյութերը շուտով կհայտնվեն",
  },
  caseTabs: {
    firstVersion: "Առաջին տարբերակ",
    releaseVersion: "Թողարկման տարբերակ",
  },
  cv: {
    downloadTitle: "Ներբեռնել CV-ն",
    downloadIntro: "Ընտրեք CV-ի լեզուն։",
    chooseLang: "Ընտրեք լեզու",
    downloadPdf: "Ներբեռնել PDF",
    print: "Տպել",
    contact: "Կապ",
    location: "Գտնվելու վայր",
    email: "Email",
    linkedin: "LinkedIn",
    summaryTitle: "Համառոտ",
    skillsTitle: "Հմտություններ",
    skillsWhatIDo: "Ինչ եմ անում",
    skillsWhatIUse: "Ինչով եմ աշխատում",
    languagesTitle: "Լեզուներ",
    workExperienceTitle: "Աշխատանքային փորձ",
    freelanceTitle: "Ֆրիլանս նախագծեր",
    freelancePeriod: "Մայիս 2025 – Դեկ 2025",
    generatedOn: "Ստեղծված է",
  },
  languagePicker: {
    title: "CV-ի լեզու",
    subtitle: "Ընտրեք ներբեռնման համար լեզուն։",
  },
};

export const DICTIONARIES: Record<Locale, Dictionary> = { en, ru, hy };
