import type { CaseStudy } from "@/lib/types";
import type { Locale } from "@/lib/i18n/types";

export const MERIDIAN_REPO = "https://github.com/garryavetisssian/meridian-hr-task";
export const meridianCopy = {
  en: {
    back: "Back to AI Engineering", eyebrow: "AI Engineering / Recruitment test task / 2026",
    title: "Engineering the workflow.", subtitle: "A structured AI-assisted workflow that turns an HR brief into research, design tokens and two coded prototypes.",
    github: "View in GitHub", scope: "Human-directed. Artifact-driven. Reviewable.",
    intro: "The challenge was not just to design an HR portal. It was to make the reasoning traceable: how a brief becomes a product model, how decisions become a system, and how that system becomes working code.",
    numbers: ["role-specific prompts", "request-state screens", "coded deliverables"],
    pipeline: "A workflow you can inspect", pipelineText: "Six specialist prompt briefs organize the work. Files pass context between stages; human decisions and review gates control the direction. These are role configurations—not an autonomous orchestration service.",
    roles: ["UX audit", "Conversion strategy", "Token architecture", "Process documentation", "Product direction", "UI implementation"],
    layers: ["Understand the brief", "Define the system", "Implement and review"],
    brief: "One brief. Two connected products.", briefText: "An employee request experience and a B2B landing page for HR outsourcing firms. The portal needed clear ownership, complete request states and a shared visual foundation; the landing page needed a credible buyer narrative.",
    decisions: [
      ["Ownership before interface", "Employees submit and reply. HR owns triage and status. The product model follows that boundary instead of exposing operator controls to employees."],
      ["Tokens before screens", "Primitive, semantic and component tokens separate raw values from intent. The same foundation supports the portal and the landing page."],
      ["States before happy paths", "Eight screen artifacts cover empty, list, detail, creation, closed, resolved, no-results and drag states—not just one polished screen."],
    ],
    tokens: "A system, not scattered values", tokensText: "The sidebar references the canvas semantic token rather than a separate dark theme. Contrast review also led to darker text variants for amber and emerald states.",
    tokenLabels: ["Primitive", "Semantic", "Component"],
    code: "Where structure becomes behavior", codeText: "Selected excerpts from the submitted implementation. Vanilla HTML, CSS and JavaScript keep the prototype readable and easy to inspect.",
    codeTitles: ["Context is an explicit input", "A reply moves the request forward", "Close the backdrop—not the form"],
    codeNotes: ["The token role reads the brief and upstream research, then writes a named artifact. The handoff is explicit rather than hidden in a chat session.", "A submitted reply updates the local request model. Waiting and resolved requests return to HR; a closed request records a reopening event.", "Delegated controls remain clickable inside the drawer. Only a direct click on the scrim closes it."],
    outputs: "From artifacts to working prototypes", outputText: "The requests prototype includes creation, filters, search and replies. The landing page includes a demo-request interaction. Both are front-end demonstrations with local state—not connected HR or CRM services.",
    portal: "Employee requests", landing: "B2B landing page", open: "Open prototype", english: "Interactive prototypes are in English.",
    review: "What the review taught me", reviewText: "Research depth and a coherent system are valuable, but they do not replace interaction testing or visual craft. The current implementation addresses several earlier interaction issues. The process writeup still contains an older Figma-oriented plan, so it should not be treated as a precise execution log.",
    limits: "Prototype boundaries", limitItems: ["Role-based prompt files, not a deployed multi-agent runtime", "Local request data; no backend, authentication or persistence", "No measured conversion uplift or production performance claims", "Next: reconcile process documentation and add repeatable browser tests"],
    closing: "Brief → system → prototype", closingText: "The engineering contribution is the connective tissue: explicit context, reusable contracts, state logic and reviewable output.",
  },
  ru: {
    back: "К AI Engineering", eyebrow: "AI Engineering / Тестовое задание / 2026",
    title: "Инженерия процесса.", subtitle: "Структурированный процесс с AI: от HR-брифа к исследованию, дизайн-токенам и двум работающим прототипам.",
    github: "Смотреть в GitHub", scope: "Под контролем человека. С проверяемыми артефактами.",
    intro: "Задача была не только в дизайне HR-портала. Важно было сделать ход решений понятным: как бриф превращается в модель продукта, решения — в систему, а система — в работающий код.",
    numbers: ["ролевых промптов", "экранов состояний", "кодовых прототипа"],
    pipeline: "Процесс, который можно проверить", pipelineText: "Шесть специализированных промптов структурируют работу. Контекст передаётся через файлы, а направление задают решения человека и этапы проверки. Это ролевые конфигурации, а не автономный сервис оркестрации.",
    roles: ["UX-аудит", "Конверсионная стратегия", "Архитектура токенов", "Документация процесса", "Продуктовое направление", "Реализация UI"],
    layers: ["Понять бриф", "Определить систему", "Реализовать и проверить"],
    brief: "Один бриф. Два связанных продукта.", briefText: "Работа с запросами сотрудников и B2B-лендинг для HR-аутсорсинга. Порталу нужны ясные роли, полный набор состояний и общая визуальная основа; лендингу — убедительная история для покупателя.",
    decisions: [
      ["Сначала ответственность", "Сотрудник создаёт запросы и отвечает. HR управляет обработкой и статусом. Интерфейс следует этой границе, не передавая сотруднику операторские функции."],
      ["Сначала токены", "Примитивные, семантические и компонентные токены отделяют значения от назначения. Одна основа поддерживает портал и лендинг."],
      ["Сначала состояния", "Восемь экранных артефактов охватывают пустой список, список, детали, создание, закрытие, решение, отсутствие результатов и перетаскивание."],
    ],
    tokens: "Система вместо разрозненных значений", tokensText: "Фон боковой панели ссылается на семантический токен холста, а не отдельную тёмную тему. Проверка контраста также привела к более тёмным вариантам янтарного и изумрудного текста.",
    tokenLabels: ["Примитив", "Семантика", "Компонент"],
    code: "Когда структура становится поведением", codeText: "Избранные фрагменты реализации. HTML, CSS и JavaScript без фреймворка делают прототип понятным для проверки.",
    codeTitles: ["Контекст — явный вход", "Ответ продвигает запрос", "Закрыть фон, а не форму"],
    codeNotes: ["Роль архитектора токенов читает бриф и исследования, затем создаёт именованный артефакт. Передача контекста не скрыта в чате.", "Отправленный ответ меняет локальную модель. Ожидающие и решённые запросы возвращаются HR; для закрытого запроса записывается событие повторного открытия.", "Кнопки внутри панели остаются доступными. Только прямой клик по затемнённому фону закрывает её."],
    outputs: "От артефактов к работающим прототипам", outputText: "Прототип запросов поддерживает создание, фильтры, поиск и ответы. Лендинг включает запрос демо. Оба — фронтенд-демонстрации с локальным состоянием, без подключения к HR или CRM.",
    portal: "Запросы сотрудников", landing: "B2B-лендинг", open: "Открыть прототип", english: "Интерактивные прототипы на английском языке.",
    review: "Что показала проверка", reviewText: "Глубокое исследование и согласованная система важны, но не заменяют проверку взаимодействий и визуальное мастерство. Текущий код исправляет несколько ранних ошибок взаимодействия. Описание процесса всё ещё содержит прежний Figma-план и не является точным журналом выполнения.",
    limits: "Границы прототипа", limitItems: ["Ролевые промпты, а не развёрнутый мультиагентный runtime", "Локальные данные: без бэкенда, авторизации и сохранения", "Без заявлений об измеренном росте конверсии или production-производительности", "Далее: согласовать документацию и добавить повторяемые браузерные тесты"],
    closing: "Бриф → система → прототип", closingText: "Инженерный вклад — в связях: явном контексте, повторно используемых контрактах, логике состояний и проверяемом результате.",
  },
  hy: {
    back: "Դեպի AI Engineering", eyebrow: "AI Engineering / Թեստային առաջադրանք / 2026",
    title: "AI՝ բրիֆից կոդ։", subtitle: "AI-ի աջակցությամբ կառուցվածքային գործընթաց՝ HR բրիֆից մինչև հետազոտություն, դիզայնի տոկեններ և երկու աշխատող նախատիպ։",
    github: "Դիտել GitHub-ում", scope: "Մարդու վերահսկողությամբ։ Ստուգելի արդյունքներով։",
    intro: "Խնդիրը միայն HR պորտալի դիզայնը չէր։ Կարևոր էր տեսանելի դարձնել որոշումների շղթան՝ ինչպես է բրիֆը դառնում պրոդուկտի մոդել, որոշումները՝ համակարգ, իսկ համակարգը՝ աշխատող կոդ։",
    numbers: ["դերային պրոմպտ", "վիճակների էկրան", "կոդային նախատիպ"],
    pipeline: "Գործընթաց, որը կարելի է ստուգել", pipelineText: "Վեց մասնագիտացված պրոմպտ կազմակերպում են աշխատանքը։ Համատեքստը փոխանցվում է ֆայլերով, իսկ ուղղությունը որոշվում է մարդու որոշումներով և ստուգման փուլերով։ Սրանք դերային կոնֆիգուրացիաներ են, ոչ ինքնավար օրկեստրացիայի ծառայություն։",
    roles: ["UX աուդիտ", "Կոնվերսիայի ռազմավարություն", "Տոկենների կառուցվածք", "Գործընթացի փաստագրում", "Պրոդուկտի ուղղություն", "UI իրականացում"],
    layers: ["Հասկանալ բրիֆը", "Սահմանել համակարգը", "Իրականացնել և ստուգել"],
    brief: "Մեկ բրիֆ։ Երկու կապված պրոդուկտ։", briefText: "Աշխատակիցների հարցումների միջավայր և B2B լենդինգ՝ HR աութսորսինգի ընկերությունների համար։ Պորտալին անհրաժեշտ էին հստակ դերեր, ամբողջական վիճակներ և ընդհանուր տեսողական հիմք, իսկ լենդինգին՝ համոզիչ պատմություն գնորդի համար։",
    decisions: [
      ["Նախ՝ պատասխանատվությունը", "Աշխատակիցը ստեղծում է հարցումներ և պատասխանում։ HR-ը կառավարում է մշակումը և կարգավիճակը։ Ինտերֆեյսը պահպանում է այս սահմանը։"],
      ["Նախ՝ տոկենները", "Պրիմիտիվ, իմաստային և բաղադրիչային տոկենները տարանջատում են արժեքները դրանց նպատակից։ Նույն հիմքն օգտագործվում է պորտալում և լենդինգում։"],
      ["Նախ՝ վիճակները", "Ութ էկրանային արտեֆակտ ընդգրկում են դատարկ ցուցակը, ցուցակը, մանրամասները, ստեղծումը, փակված և լուծված հարցումները, որոնման դատարկ արդյունքը և քաշելու վիճակը։"],
    ],
    tokens: "Համակարգ՝ առանձին արժեքների փոխարեն", tokensText: "Կողային վահանակի ֆոնը հղվում է ընդհանուր կտավի իմաստային տոկենին՝ առանձին մուգ թեմայի փոխարեն։ Կոնտրաստի ստուգումը նաև բերեց սաթագույն և զմրուխտագույն տեքստի ավելի մուգ տարբերակների։",
    tokenLabels: ["Պրիմիտիվ", "Իմաստային", "Բաղադրիչ"],
    code: "Երբ կառուցվածքը դառնում է վարքագիծ", codeText: "Իրականացման ընտրված հատվածներ։ Առանց ֆրեյմվորքի HTML, CSS և JavaScript-ը նախատիպը դարձնում են հասկանալի և ստուգելի։",
    codeTitles: ["Համատեքստը՝ հստակ մուտք", "Պատասխանը շարժում է հարցումը", "Փակել ֆոնը, ոչ ձևը"],
    codeNotes: ["Տոկենների ճարտարապետի դերը կարդում է բրիֆն ու հետազոտությունը, ապա ստեղծում անվանված արտեֆակտ։ Համատեքստի փոխանցումը չի թաքնվում չաթում։", "Ուղարկված պատասխանը փոխում է տեղական մոդելը։ Սպասող և լուծված հարցումները վերադառնում են HR-ին, իսկ փակված հարցման համար գրանցվում է վերաբացման իրադարձություն։", "Վահանակի ներսի կոճակները մնում են հասանելի։ Այն փակվում է միայն մգեցված ֆոնի վրա ուղիղ սեղմումից։"],
    outputs: "Արտեֆակտներից՝ աշխատող նախատիպեր", outputText: "Հարցումների նախատիպը ներառում է ստեղծում, ֆիլտրեր, որոնում և պատասխաններ։ Լենդինգն ունի դեմոյի հարցման փոխազդեցություն։ Երկուսն էլ տեղական վիճակով frontend ցուցադրություններ են՝ առանց HR կամ CRM միացման։",
    portal: "Աշխատակիցների հարցումներ", landing: "B2B լենդինգ", open: "Բացել նախատիպը", english: "Ինտերակտիվ նախատիպերն անգլերեն են։",
    review: "Ինչ սովորեցրեց ստուգումը", reviewText: "Խորը հետազոտությունն ու միասնական համակարգը կարևոր են, բայց չեն փոխարինում փոխազդեցությունների ստուգմանը և տեսողական որակին։ Ներկայիս կոդը ուղղում է մի քանի վաղ խնդիր։ Գործընթացի նկարագրությունը դեռ պարունակում է հին Figma պլան և կատարման ճշգրիտ մատյան չէ։",
    limits: "Նախատիպի սահմանները", limitItems: ["Դերային պրոմպտներ, ոչ տեղակայված բազմագործակալ համակարգ", "Տեղական տվյալներ՝ առանց backend-ի, նույնականացման և պահպանման", "Առանց չափված կոնվերսիայի աճի կամ production արդյունավետության պնդումների", "Հաջորդը՝ համադրել փաստագրումը և ավելացնել կրկնելի բրաուզերային թեստեր"],
    closing: "Բրիֆ → համակարգ → նախատիպ", closingText: "Ճարտարագիտական ներդրումը կապերի մեջ է՝ հստակ համատեքստ, վերօգտագործվող պայմանագրեր, վիճակների տրամաբանություն և ստուգելի արդյունք։",
  },
};

export function getMeridianProject(locale: Locale = "en"): CaseStudy {
  const c = meridianCopy[locale];
  return { slug: "meridian-hr", title: "Meridian HR", subtitle: c.subtitle, category: ["AI", "SaaS"], year: "2026", role: "AI-assisted workflow · Product design · Front-end prototyping", duration: "Recruitment test task", team: "Independent", thumbnail: "/cases/meridian-hr/Cover.svg", color: "#9A63FF", brief: { narrative: c.scope, tiles: [] }, overview: c.intro, sections: [], reflection: c.reviewText };
}
