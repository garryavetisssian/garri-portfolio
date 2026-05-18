import type { Locale } from "@/lib/i18n/types";

export interface BioContent {
  headline: string;
  bio: string[];
  collaboration: string;
}

export const BIO: Record<Locale, BioContent> = {
  en: {
    headline: "Design is a business function, not an aesthetic one.",
    bio: [
      "I'm Garri Avetisyan, a Product Designer based in Yerevan, Armenia. For the past 5+ years, I've been designing complex digital products across AI, Web3, SaaS, and marketplaces — the kind of products where getting the UX wrong means real business consequences.",
      "I believe the best design work happens at the intersection of user needs and business goals. A beautiful interface that doesn't drive outcomes isn't design — it's decoration. I focus on solving the right problems, structuring information clearly, and making complex systems feel simple.",
      "Before every pixel, I ask: what's the business goal? Who's the user? What does success look like? This thinking shapes everything from information architecture to micro-interactions.",
    ],
    collaboration:
      "I work best when embedded in cross-functional teams. I partner closely with PMs to define scope, with engineers to understand constraints, and with stakeholders to align on priorities. I communicate through artifacts — flows, prototypes, and documented decisions — not slide decks. I believe in strong opinions loosely held, and I'd rather be proven wrong early than right too late.",
  },
  ru: {
    headline: "Дизайн — это бизнес-функция, а не эстетика.",
    bio: [
      "Я Гарри Аветисян, продуктовый дизайнер из Еревана, Армения. Последние 5+ лет проектирую сложные цифровые продукты в сферах AI, Web3, SaaS и маркетплейсов — там, где неверный UX превращается в реальные бизнес-последствия.",
      "Я убеждён, что лучший дизайн рождается на стыке потребностей пользователей и целей бизнеса. Красивый интерфейс без влияния на метрики — это декорация, а не дизайн. Фокусируюсь на решении правильных задач, чёткой структуре информации и упрощении сложных систем.",
      "Перед каждым пикселем задаю себе вопросы: какая бизнес-цель? Кто пользователь? Как выглядит успех? Это мышление определяет всё — от архитектуры информации до микровзаимодействий.",
    ],
    collaboration:
      "Лучше всего работаю в кросс-функциональных командах. Тесно сотрудничаю с продактами — по скоупу, с инженерами — по ограничениям, со стейкхолдерами — по приоритетам. Коммуницирую через артефакты — флоу, прототипы, задокументированные решения, а не слайды. Верю в сильные мнения, которые легко отпустить: лучше ошибиться рано, чем оказаться правым слишком поздно.",
  },
  hy: {
    headline: "Դիզայնը բիզնես գործառույթ է, ոչ թե էսթետիկ։",
    bio: [
      "Ես Գարրի Ավետիսյանն եմ՝ պրոդուկտի դիզայներ Երևանից, Հայաստան։ Վերջին 5+ տարիների ընթացքում նախագծել եմ բարդ թվային արտադրանքներ AI, Web3, SaaS և շուկայահրապարակային ոլորտներում՝ այնտեղ, որտեղ UX-ի սխալը նշանակում է իրական բիզնես հետևանքներ։",
      "Հավատում եմ, որ լավագույն դիզայնը ծնվում է օգտատիրոջ կարիքների և բիզնեսի նպատակների հատման կետում։ Գեղեցիկ ինտերֆեյսը, որը չի ազդում արդյունքների վրա, դիզայն չէ, այլ դեկորացիա։ Կենտրոնանում եմ ճիշտ խնդիրներ լուծելու, տեղեկատվությունը հստակ կառուցելու և բարդ համակարգերը պարզ զգալի դարձնելու վրա։",
      "Մինչև ամեն պիքսել հարցնում եմ. ո՞րն է բիզնեսի նպատակը, ո՞վ է օգտատերը, ինչպիսի՞ն է հաջողության պատկերը։ Այս մտածողությունը ձևավորում է ամեն ինչ՝ տեղեկատվական ճարտարապետությունից մինչև միկրո-փոխազդեցություններ։",
    ],
    collaboration:
      "Լավագույնս աշխատում եմ միջգործառույթային թիմերում։ Սերտ համագործակցում եմ PM-ների հետ՝ շրջանակը սահմանելու համար, ինժեներների հետ՝ սահմանափակումները հասկանալու, շահագրգիռների հետ՝ առաջնահերթությունները համաձայնեցնելու համար։ Հաղորդակցվում եմ արտեֆակտերի միջոցով՝ հոսքեր, նախատիպեր և փաստագրված որոշումներ, ոչ թե սլայդներ։ Հավատում եմ ամուր, բայց թեթև պահվող կարծիքներին. ավելի լավ է շուտ սխալ լինել, քան ուշ ճիշտ։",
  },
};

export interface SkillGroup {
  category: string;
  items: string[];
}

export const SKILLS_I18N: Record<Locale, SkillGroup[]> = {
  en: [
    {
      category: "What I do",
      items: [
        "UX Strategy",
        "Product Thinking",
        "User Research",
        "Information Architecture",
        "Interaction Design",
        "Wireframing & Prototyping",
        "UI Design",
        "Design Systems",
        "Vibe Coding",
      ],
    },
    {
      category: "What I use",
      items: ["Figma", "Adobe Creative Suite", "Midjourney", "ChatGPT", "Claude Code", "Whimsical", "Maze", "Notion", "Linear"],
    },
  ],
  ru: [
    {
      category: "Что я делаю",
      items: [
        "UX-стратегия",
        "Продуктовое мышление",
        "Исследование пользователей",
        "Информационная архитектура",
        "Дизайн взаимодействия",
        "Вайрфреймы и прототипы",
        "UI-дизайн",
        "Дизайн-системы",
        "Вайб-кодинг",
      ],
    },
    {
      category: "Чем пользуюсь",
      items: ["Figma", "Adobe Creative Suite", "Midjourney", "ChatGPT", "Claude Code", "Whimsical", "Maze", "Notion", "Linear"],
    },
  ],
  hy: [
    {
      category: "Ինչ եմ անում",
      items: [
        "UX ռազմավարություն",
        "Պրոդուկտային մտածողություն",
        "Օգտատերերի հետազոտում",
        "Տեղեկատվական ճարտարապետություն",
        "Փոխազդեցության դիզայն",
        "Վայրֆրեյմինգ և պրոտոտիպավորում",
        "UI դիզայն",
        "Դիզայն համակարգեր",
        "Վայբ կոդինգ",
      ],
    },
    {
      category: "Ինչով եմ աշխատում",
      items: ["Figma", "Adobe Creative Suite", "Midjourney", "ChatGPT", "Claude Code", "Whimsical", "Maze", "Notion", "Linear"],
    },
  ],
};

export interface LanguageRow {
  name: string;
  level: string;
}

export const LANGUAGES_I18N: Record<Locale, LanguageRow[]> = {
  en: [
    { name: "Armenian", level: "Native" },
    { name: "Russian", level: "Fluent" },
    { name: "English", level: "Professional" },
  ],
  ru: [
    { name: "Армянский", level: "Родной" },
    { name: "Русский", level: "Свободно" },
    { name: "Английский", level: "Профессиональный" },
  ],
  hy: [
    { name: "Հայերեն", level: "Մայրենի" },
    { name: "Ռուսերեն", level: "Ազատ" },
    { name: "Անգլերեն", level: "Մասնագիտական" },
  ],
};

export interface WorkExperienceI18n {
  company: string;
  location: string;
  role: string;
  period: string;
  bullets: string[];
}

export const WORK_EXPERIENCE_I18N: Record<Locale, WorkExperienceI18n[]> = {
  en: [
    {
      company: "ANUNA LLC",
      location: "Yerevan",
      role: "Product Designer",
      period: "Dec 2025 - Present",
      bullets: [
        "Conceptualize and execute end-to-end design strategies that harmonize user requirements with core business objectives.",
        "Translate complex ideas into high-fidelity interactive prototypes and visual assets to validate product architecture prior to engineering.",
        "Facilitate cross-functional synergy by partnering with engineering and product leads to streamline the handoff and implementation process.",
        "Leverage qualitative and quantitative insights—including user interviews and competitive analysis—to steer the product roadmap.",
        "Drive product evolution through a rigorous cycle of testing and data-driven refinements to maximize engagement and resolve friction points.",
      ],
    },
    {
      company: "Duck Master",
      location: "Russia",
      role: "Creative Director",
      period: "Sep 2024 - May 2025",
      bullets: [
        "Develop intuitive, user-focused design solutions for products, ensuring functionality, usability, and aesthetic appeal align with both business goals and user needs.",
        "Create wireframes, prototypes, and mockups to communicate design concepts and test product functionality before development.",
        "Work closely with product managers, developers, and other stakeholders to ensure seamless communication and alignment throughout the product development process.",
        "Gather and analyze user feedback, perform usability testing, and conduct market research to inform and improve design decisions.",
        "Continuously iterate on product designs based on user feedback, analytics, and performance data to enhance the product experience.",
      ],
    },
    {
      company: "Ineed Inc",
      location: "Armenia",
      role: "Product Designer",
      period: "May 2022 - May 2024",
      bullets: [
        "Played a key role in shaping the user experience and interface design for both the mobile app and landing page.",
        "Created intuitive, user-friendly interfaces to enhance the user journey and ensure seamless interaction with app features.",
        "Designed the landing page to effectively communicate Ineed's value proposition and attract users.",
        "Conducted user research and usability testing to refine designs and ensure they meet user needs.",
        "Collaborated with developers to ensure successful implementation of design elements.",
      ],
    },
    {
      company: "TIRSoft LLC",
      location: "Armenia",
      role: "UX/UI Designer",
      period: "Oct 2020 – May 2024",
      bullets: [
        "Gathering and evaluating user requirements in collaboration with product managers and engineers.",
        "Illustrate design ideas using storyboards, process flows and sitemaps.",
        "Develop UI mockups and prototypes.",
        "Identify and troubleshoot UX problems.",
        "Prepare and present rough drafts to internal teams and stakeholders.",
      ],
    },
  ],
  ru: [
    {
      company: "ANUNA LLC",
      location: "Ереван",
      role: "Продуктовый дизайнер",
      period: "Дек 2025 - настоящее время",
      bullets: [
        "Разрабатываю и реализую end-to-end дизайн-стратегии, гармонизируя потребности пользователей с ключевыми бизнес-целями.",
        "Превращаю сложные идеи в высокодетализированные интерактивные прототипы и визуальные активы для валидации продуктовой архитектуры до разработки.",
        "Настраиваю кросс-функциональное взаимодействие с инженерными и продуктовыми лидами, упрощая передачу и имплементацию.",
        "Использую качественные и количественные инсайты — пользовательские интервью и конкурентный анализ — чтобы направлять продуктовый роадмап.",
        "Развиваю продукт через системный цикл тестирования и data-driven улучшений, увеличивая вовлечённость и устраняя точки трения.",
      ],
    },
    {
      company: "Duck Master",
      location: "Россия",
      role: "Креативный директор",
      period: "Сен 2024 - Май 2025",
      bullets: [
        "Разрабатываю интуитивные пользовательские дизайн-решения, балансируя функциональность, удобство и визуальное качество с целями бизнеса и запросами пользователей.",
        "Создаю вайрфреймы, прототипы и макеты для коммуникации концепций и проверки продуктовых гипотез до разработки.",
        "Тесно работаю с продактами, разработчиками и стейкхолдерами для бесшовной коммуникации на всех этапах создания продукта.",
        "Собираю и анализирую фидбек пользователей, провожу юзабилити-тесты и маркет-ресерч для информированных дизайн-решений.",
        "Итеративно улучшаю дизайн на основе фидбека, аналитики и данных о производительности.",
      ],
    },
    {
      company: "Ineed Inc",
      location: "Армения",
      role: "Продуктовый дизайнер",
      period: "Май 2022 - Май 2024",
      bullets: [
        "Ключевая роль в формировании пользовательского опыта и UI мобильного приложения и лендинга.",
        "Создавал интуитивные интерфейсы для улучшения пользовательского пути и бесшовного взаимодействия с функциями.",
        "Спроектировал лендинг для эффективной коммуникации ценностного предложения Ineed и привлечения пользователей.",
        "Проводил пользовательские исследования и юзабилити-тестирования для уточнения дизайна.",
        "Сотрудничал с разработчиками для корректной реализации дизайн-элементов.",
      ],
    },
    {
      company: "TIRSoft LLC",
      location: "Армения",
      role: "UX/UI дизайнер",
      period: "Окт 2020 – Май 2024",
      bullets: [
        "Сбор и анализ пользовательских требований вместе с продактами и инженерами.",
        "Иллюстрация дизайн-идей через сторибоарды, потоки процессов и карты сайтов.",
        "Разработка UI-макетов и прототипов.",
        "Поиск и устранение UX-проблем.",
        "Подготовка и презентация набросков внутренним командам и стейкхолдерам.",
      ],
    },
  ],
  hy: [
    {
      company: "ANUNA LLC",
      location: "Երևան",
      role: "Պրոդուկտի դիզայներ",
      period: "Դեկ 2025 – առ այսօր",
      bullets: [
        "Մշակում և իրականացնում եմ end-to-end դիզայն ռազմավարություններ՝ ներդաշնակելով օգտատերերի պահանջները բիզնեսի հիմնական նպատակների հետ։",
        "Բարդ գաղափարները վերածում եմ բարձր մանրամասնությամբ ինտերակտիվ նախատիպերի՝ ստուգելու պրոդուկտի ճարտարապետությունը դեռ զարգացման փուլից առաջ։",
        "Ապահովում եմ միջգործառույթային համագործակցություն ինժեներական և պրոդուկտային առաջնորդների հետ՝ պարզեցնելով փոխանցման և իրականացման գործընթացը։",
        "Օգտագործում եմ որակական և քանակական տվյալներ՝ օգտատերերի հարցազրույցներ և մրցակցային վերլուծություն՝ պրոդուկտի ուղու ձևավորման համար։",
        "Զարգացնում եմ պրոդուկտը թեստերի և տվյալների հիմքով կատարելագործումների շարունակական ցիկլով՝ մեծացնելով ներգրավվածությունը և լուծելով խնդիրները։",
      ],
    },
    {
      company: "Duck Master",
      location: "Ռուսաստան",
      role: "Կրեատիվ տնօրեն",
      period: "Սեպ 2024 – Մայիս 2025",
      bullets: [
        "Մշակում եմ ինտուիտիվ, օգտատիրոջը կենտրոնացված դիզայն լուծումներ՝ ապահովելով, որ ֆունկցիոնալությունն ու գեղագիտությունը համաձայն են բիզնեսի ու օգտատերերի կարիքների հետ։",
        "Ստեղծում եմ վայրֆրեյմեր, նախատիպեր և մոկափներ՝ գաղափարների փոխանցման և պրոդուկտի վավերացման համար մինչև մշակումը։",
        "Սերտ համագործակցում եմ պրոդուկտային մենեջերների, մշակողների և շահագրգիռների հետ։",
        "Հավաքում և վերլուծում եմ օգտատերերի արձագանքը, անցկացնում ուզաբիլիթի թեստեր և շուկայի ուսումնասիրություններ։",
        "Շարունակաբար բարելավում եմ դիզայնը՝ հիմնվելով տվյալների և վերլուծությունների վրա։",
      ],
    },
    {
      company: "Ineed Inc",
      location: "Հայաստան",
      role: "Պրոդուկտի դիզայներ",
      period: "Մայիս 2022 – Մայիս 2024",
      bullets: [
        "Առանցքային դեր եմ խաղացել մոբայլ հավելվածի և լենդինգի UX/UI ձևավորման մեջ։",
        "Ստեղծել եմ ինտուիտիվ ինտերֆեյսներ՝ օգտատիրոջ ճանապարհը բարելավելու համար։",
        "Դիզայն եմ անել լենդինգը՝ Ineed-ի արժեքային առաջարկը արդյունավետ հաղորդելու համար։",
        "Իրականացրել եմ օգտատերերի հետազոտություններ և ուզաբիլիթի թեստեր։",
        "Համագործակցել եմ մշակողների հետ՝ դիզայն էլեմենտների ճիշտ իրականացման համար։",
      ],
    },
    {
      company: "TIRSoft LLC",
      location: "Հայաստան",
      role: "UX/UI դիզայներ",
      period: "Հոկ 2020 – Մայիս 2024",
      bullets: [
        "Հավաքել և գնահատել եմ օգտատերերի պահանջները պրոդակթ մենեջերների և ինժեներների հետ։",
        "Պատկերել եմ դիզայն գաղափարները սթորիբորդների, պրոցեսների հոսքերի և սայթ-մափերի միջոցով։",
        "Մշակել եմ UI մոկափներ և նախատիպեր։",
        "Բացահայտել և լուծել եմ UX խնդիրներ։",
        "Ներկայացրել եմ սև նախագծեր ներքին թիմերին և շահագրգիռներին։",
      ],
    },
  ],
};

export interface FreelanceProjectI18n {
  name: string;
  tag: string;
  tagColor: string;
  period: string;
  description: string;
  details: string[];
}

export const FREELANCE_PROJECTS_I18N: Record<Locale, FreelanceProjectI18n[]> = {
  en: [
    {
      name: "BalVoi",
      tag: "AI",
      tagColor: "#00D4AA",
      period: "2025",
      description:
        "Designing an AI-powered news platform focused on debiasing articles using a variety of large language models and a custom-trained AI.",
      details: [
        "End-to-end product design from research to high-fidelity UI",
        "Designed AI-assisted editorial workflows for journalists",
        "Built a design system with 40+ components for the platform",
        "Focused on trust calibration — designing for when AI gets it wrong",
      ],
    },
    {
      name: "XYGO",
      tag: "Web3",
      tagColor: "#A78BFA",
      period: "2025",
      description: "Creating the interface and NFT structure for a Web3 lottery and marketplace.",
      details: [
        "Designed dual-track UX for crypto-native and mainstream users",
        "Built progressive Web3 onboarding that hides blockchain complexity",
        "Designed NFT marketplace browse and trading experience",
        "Achieved 68% non-crypto-native user ratio through UX simplification",
      ],
    },
  ],
  ru: [
    {
      name: "BalVoi",
      tag: "AI",
      tagColor: "#00D4AA",
      period: "2025",
      description:
        "Проектирование AI-платформы новостей, устраняющей предвзятость статей с помощью LLM-моделей и кастомно обученного AI.",
      details: [
        "End-to-end продуктовый дизайн — от ресерча до финального UI",
        "Спроектированы AI-ассистированные редакционные флоу для журналистов",
        "Собрана дизайн-система на 40+ компонентов",
        "Фокус на калибровке доверия — дизайн для ситуаций, когда AI ошибается",
      ],
    },
    {
      name: "XYGO",
      tag: "Web3",
      tagColor: "#A78BFA",
      period: "2025",
      description: "Создание интерфейса и NFT-структуры для Web3-лотереи и маркетплейса.",
      details: [
        "Двутрековый UX: для крипто-продвинутых и для массового пользователя",
        "Прогрессивный Web3-онбординг, скрывающий сложность блокчейна",
        "Дизайн браузинга и торговли в NFT-маркетплейсе",
        "Доля некрипто-пользователей достигла 68% благодаря упрощению UX",
      ],
    },
  ],
  hy: [
    {
      name: "BalVoi",
      tag: "AI",
      tagColor: "#00D4AA",
      period: "2025",
      description:
        "AI-հիմնված լուրերի հարթակի դիզայն՝ հոդվածների կողմնակալության մաքրման համար, օգտագործելով բազմաթիվ LLM-ներ և մասնագիտացված վարժեցված AI։",
      details: [
        "End-to-end պրոդուկտի դիզայն՝ հետազոտությունից մինչև բարձր որակի UI",
        "AI-աջակցվող խմբագրական հոսքեր լրագրողների համար",
        "40+ բաղադրիչով դիզայն-համակարգ",
        "Վստահության կալիբրացիա՝ դիզայն այն դեպքերի համար, երբ AI-ն սխալվում է",
      ],
    },
    {
      name: "XYGO",
      tag: "Web3",
      tagColor: "#A78BFA",
      period: "2025",
      description: "Web3-լատարեայի և շուկայահրապարակի ինտերֆեյսի և NFT կառուցվածքի ստեղծում։",
      details: [
        "Երկակի UX՝ crypto-native և սովորական օգտատերերի համար",
        "Պրոգրեսիվ Web3 օնբորդինգ՝ թաքցնելով բլոկչեյնի բարդությունը",
        "NFT շուկայահրապարակի զննման և առևտրի դիզայն",
        "Ոչ-crypto օգտատերերի 68% հարաբերակցություն՝ UX-ի պարզեցման շնորհիվ",
      ],
    },
  ],
};
