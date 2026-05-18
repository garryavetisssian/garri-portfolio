import type { Locale } from "@/lib/i18n/types";

export interface ProjectFields {
  subtitle: string;
  role: string;
  duration: string;
  team: string;
}

type PerLocale = Record<Locale, ProjectFields>;

export const PROJECTS_I18N: Record<string, PerLocale> = {
  balvoi: {
    en: {
      subtitle: "AI-powered journalism platform that transforms how newsrooms create and distribute content",
      role: "Lead Product Designer",
      duration: "6 months",
      team: "PM, 3 Engineers, Data Scientist",
    },
    ru: {
      subtitle: "AI-платформа для журналистики, меняющая то, как редакции создают и распространяют контент",
      role: "Ведущий продуктовый дизайнер",
      duration: "6 месяцев",
      team: "PM, 3 инженера, дата-сайентист",
    },
    hy: {
      subtitle: "AI-ով աշխատող լրագրության հարթակ, որը փոխում է, թե ինչպես են խմբագրությունները ստեղծում և տարածում բովանդակություն",
      role: "Առաջատար պրոդուկտի դիզայներ",
      duration: "6 ամիս",
      team: "PM, 3 ինժեներ, տվյալագետ",
    },
  },
  xygo: {
    en: {
      subtitle: "Web3 lottery platform with NFT marketplace — making crypto accessible to mainstream users",
      role: "Product Designer",
      duration: "8 months",
      team: "PM, 4 Engineers, Blockchain Dev",
    },
    ru: {
      subtitle: "Web3-платформа лотереи с NFT-маркетплейсом — делает крипту доступной для массовой аудитории",
      role: "Продуктовый дизайнер",
      duration: "8 месяцев",
      team: "PM, 4 инженера, блокчейн-разработчик",
    },
    hy: {
      subtitle: "Web3 լատարեայի հարթակ NFT շուկայահրապարակով՝ դարձնելով կրիպտոն հասանելի սովորական օգտատերերի համար",
      role: "Պրոդուկտի դիզայներ",
      duration: "8 ամիս",
      team: "PM, 4 ինժեներ, բլոկչեյն մշակող",
    },
  },
  "duck-master": {
    en: {
      subtitle: "Viral Telegram mini-game designed for engagement loops and social sharing",
      role: "Product Designer",
      duration: "3 months",
      team: "PM, 2 Engineers",
    },
    ru: {
      subtitle: "Вирусная Telegram mini-app, спроектированная под циклы вовлечения и социальный шеринг",
      role: "Продуктовый дизайнер",
      duration: "3 месяца",
      team: "PM, 2 инженера",
    },
    hy: {
      subtitle: "Վիրալ Telegram մինի-խաղ, նախագծված ներգրավման ցիկլերի և սոցիալական տարածման համար",
      role: "Պրոդուկտի դիզայներ",
      duration: "3 ամիս",
      team: "PM, 2 ինժեներ",
    },
  },
  ineed: {
    en: {
      subtitle: "Two-sided mobile platform connecting clients with local professionals — separate apps for each side",
      role: "Product Designer",
      duration: "2 years",
      team: "PM, 3 Engineers, 1 Designer",
    },
    ru: {
      subtitle: "Двусторонняя мобильная платформа, связывающая клиентов с местными специалистами — отдельные приложения для каждой стороны",
      role: "Продуктовый дизайнер",
      duration: "2 года",
      team: "PM, 3 инженера, 1 дизайнер",
    },
    hy: {
      subtitle: "Երկկողմանի մոբայլ հարթակ, որը կապում է հաճախորդներին տեղական մասնագետների հետ՝ առանձին հավելվածներով յուրաքանչյուր կողմի համար",
      role: "Պրոդուկտի դիզայներ",
      duration: "2 տարի",
      team: "PM, 3 ինժեներ, 1 դիզայներ",
    },
  },
  aihive: {
    en: {
      subtitle: "AI-powered productivity platform that streamlines team workflows with intelligent automation",
      role: "Product Designer",
      duration: "4 months",
      team: "PM, 2 Engineers",
    },
    ru: {
      subtitle: "AI-платформа продуктивности, оптимизирующая командные воркфлоу с помощью умной автоматизации",
      role: "Продуктовый дизайнер",
      duration: "4 месяца",
      team: "PM, 2 инженера",
    },
    hy: {
      subtitle: "AI-ով աշխատող արտադրողականության հարթակ, որը պարզեցնում է թիմային հոսքերը խելացի ավտոմատացման միջոցով",
      role: "Պրոդուկտի դիզայներ",
      duration: "4 ամիս",
      team: "PM, 2 ինժեներ",
    },
  },
  "dispatch-center": {
    en: {
      subtitle: "Real-time logistics dashboard for managing fleet operations, dispatching, and delivery tracking",
      role: "Product Designer",
      duration: "3 months",
      team: "PM, 4 Engineers",
    },
    ru: {
      subtitle: "Логистический дашборд в реальном времени для управления автопарком, диспетчеризацией и доставкой",
      role: "Продуктовый дизайнер",
      duration: "3 месяца",
      team: "PM, 4 инженера",
    },
    hy: {
      subtitle: "Իրական ժամանակի լոգիստիկ դաշբորդ՝ տրանսպորտային պարկի, դիսպետչերացման և առաքման հետևման համար",
      role: "Պրոդուկտի դիզայներ",
      duration: "3 ամիս",
      team: "PM, 4 ինժեներ",
    },
  },
  nexwave: {
    en: {
      subtitle: "Smart home management app for controlling IoT devices, automation, and monitoring",
      role: "Product Designer",
      duration: "3 months",
      team: "PM, 3 Engineers",
    },
    ru: {
      subtitle: "Приложение для управления умным домом — контроль IoT-устройств, автоматизация и мониторинг",
      role: "Продуктовый дизайнер",
      duration: "3 месяца",
      team: "PM, 3 инженера",
    },
    hy: {
      subtitle: "Խելացի տան կառավարման հավելված՝ IoT սարքերի վերահսկման, ավտոմատացման և մոնիթորինգի համար",
      role: "Պրոդուկտի դիզայներ",
      duration: "3 ամիս",
      team: "PM, 3 ինժեներ",
    },
  },
  "razer-ui": {
    en: {
      subtitle: "UI concept and design exploration for a gaming hardware brand's digital product experience",
      role: "UI Designer",
      duration: "2 weeks",
      team: "Solo",
    },
    ru: {
      subtitle: "UI-концепт и дизайн-эксплорация цифрового продукта для бренда геймерского железа",
      role: "UI-дизайнер",
      duration: "2 недели",
      team: "Соло",
    },
    hy: {
      subtitle: "UI կոնցեպտ և դիզայն հետազոտություն գեյմինգային սարքավորումների բրենդի թվային արտադրանքի համար",
      role: "UI դիզայներ",
      duration: "2 շաբաթ",
      team: "Մենակ",
    },
  },
};

export function getProjectFields(slug: string, locale: Locale): ProjectFields | null {
  const entry = PROJECTS_I18N[slug];
  return entry ? entry[locale] : null;
}
