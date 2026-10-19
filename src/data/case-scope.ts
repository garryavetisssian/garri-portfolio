import type { Locale } from "@/lib/i18n/types";

export type CaseScope = {
  headline: string;
  summary: string;
  ownership: string[];
  workstreams: { title: string; description: string }[];
  focusTitle: string;
  visualIntro: string;
};

const scopes: Record<string, Record<Locale, CaseScope>> = {
  ineed: {
    en: {
      headline: "Ineed, designed across both sides of the marketplace.",
      summary: "I designed the original company-led service platform and the later home-appliance release: the customer app, the professional app, the visual language and the system of reusable interface patterns. The pivot changed the business model and product architecture—not just the styling.",
      ownership: ["Both product versions", "Customer and professional apps", "UX and visual design", "Design system and handoff"],
      workstreams: [
        { title: "The first platform", description: "A broad service marketplace where companies registered branches, employees and services and managed inquiries through a web dashboard. I designed the original customer and business experiences." },
        { title: "A focused marketplace", description: "After the investor response, we concentrated on home-appliance work and licensed individual professionals. I shaped the two mobile journeys around finding help, receiving work and tracking the same job from both sides." },
        { title: "A coherent UI system", description: "The category-specific icons, request fields, professional cards, maps, status panels and SOS entry point formed a consistent visual and interaction language across the customer and professional apps." },
      ],
      focusTitle: "A product pivot inside a larger design engagement",
      visualIntro: "The screens below document the release-version customer and professional journeys. The complete gallery also retains the first version I designed, so both phases can be inspected on their own terms.",
    },
    ru: {
      headline: "Ineed: дизайн обеих сторон маркетплейса.",
      summary: "Я спроектировал первую платформу для сервисных компаний и последующий релиз для бытовой техники: приложения клиента и мастера, визуальный язык и систему повторно используемых интерфейсных паттернов. Поворот изменил бизнес-модель и структуру продукта, а не только стиль.",
      ownership: ["Обе версии продукта", "Приложения клиента и мастера", "UX и визуальный дизайн", "Дизайн-система и передача в разработку"],
      workstreams: [
        { title: "Первая платформа", description: "Широкий маркетплейс услуг: компании добавляли филиалы, сотрудников и услуги и управляли заявками через веб-дашборд. Я спроектировал исходный клиентский и бизнес-опыт." },
        { title: "Сфокусированный маркетплейс", description: "После реакции инвесторов мы сосредоточились на бытовой технике и независимых лицензированных мастерах. Я выстроил два мобильных сценария вокруг поиска помощи, получения заказов и общего статуса работы." },
        { title: "Единая UI-система", description: "Специализированные иконки, поля заявки, карточки мастеров, карты, статусы и вход в SOS сложились в общий визуальный и интерактивный язык двух приложений." },
      ],
      focusTitle: "Поворот продукта внутри большой дизайн-работы",
      visualIntro: "Ниже показаны сценарии клиента и специалиста из новой версии. Полная галерея сохраняет и первую версию, которую я также спроектировал.",
    },
    hy: {
      headline: "Ineed-ի երկու կողմերի ամբողջական դիզայնը։",
      summary: "Ես նախագծել եմ ընկերությունների համար առաջին հարթակը և կենցաղային տեխնիկայի վրա կենտրոնացած հետագա թողարկումը՝ հաճախորդի և մասնագետի հավելվածները, տեսողական լեզուն և կրկնօգտագործվող միջերեսների համակարգը։ Փոխվեց բիզնես մոդելն ու պրոդուկտի կառուցվածքը, ոչ միայն ոճը։",
      ownership: ["Երկու տարբերակներն էլ", "Հաճախորդի և մասնագետի հավելվածներ", "UX և վիզուալ դիզայն", "Դիզայն համակարգ և փոխանցում"],
      workstreams: [
        { title: "Առաջին հարթակը", description: "Ծառայությունների լայն շուկա, որտեղ ընկերությունները կառավարում էին մասնաճյուղերը, աշխատակիցներին ու հարցումները վեբ վահանակով։ Ես նախագծել եմ սկզբնական երկու կողմերի փորձառությունը։" },
        { title: "Կենտրոնացած շուկա", description: "Ներդրողների արձագանքից հետո կենտրոնացանք կենցաղային տեխնիկայի և անկախ լիցենզավորված մասնագետների վրա։ Երկու բջջային հոսքերը կապում են հաճախորդի հարցումն ու մասնագետի աշխատանքը։" },
        { title: "Միասնական UI համակարգ", description: "Կատեգորիայի պատկերակները, հարցման դաշտերը, մասնագետի քարտերը, քարտեզները, վիճակներն ու SOS մուտքը միասնական լեզու են ստեղծում երկու հավելվածում։" },
      ],
      focusTitle: "Պրոդուկտի շրջադարձը՝ ավելի լայն աշխատանքի մի մաս",
      visualIntro: "Ստորև նոր տարբերակի հաճախորդի և մասնագետի հոսքերն են։ Ամբողջական պատկերասրահում պահպանված է նաև իմ նախագծած առաջին տարբերակը։",
    },
  },
  "duck-master": {
    en: {
      headline: "A Telegram game built as a connected world, not a single round.",
      summary: "I designed the Duck Master mini-app across its game UI, progression, cards, trading, social features and onboarding. I also built the visual-asset workflow and component language that kept the duck character recognisable across many game contexts. The trading change below is one example of my product-design work within that larger system.",
      ownership: ["End-to-end game UX/UI", "Game and economy surfaces", "Character and asset pipeline", "Onboarding and design system"],
      workstreams: [
        { title: "Game loops", description: "Career, card collection, market play, mini-games, social activity and progression needed to feel like parts of one mini-app rather than separate screens." },
        { title: "A repeatable character world", description: "I established a consistent duck silhouette and a production workflow for character art, cards and scenes so new mechanics could extend the same visual identity." },
        { title: "Mobile-first interaction", description: "Short sessions, touch controls, readable balances, rewards and a guided onboarding path shaped how players entered and moved between the game systems." },
      ],
      focusTitle: "One mechanic inside the larger game",
      visualIntro: "The full visual gallery below shows the breadth of the game, its character system and product screens. The market round is discussed as a specific design decision, not used as the case's hero image.",
    },
    ru: {
      headline: "Целый игровой мир в Telegram, а не один раунд.",
      summary: "Я спроектировал мини-приложение Duck Master: игровой UI, прогрессию, карты, торговлю, социальные функции и онбординг. Я также выстроил процесс создания визуальных ассетов и язык компонентов, сохранив узнаваемость персонажа в разных сценариях. Изменение торговой механики ниже — лишь один пример работы внутри этой системы.",
      ownership: ["Игровой UX/UI целиком", "Игровые и экономические сценарии", "Персонаж и производство ассетов", "Онбординг и дизайн-система"],
      workstreams: [
        { title: "Игровые петли", description: "Карьера, коллекция карт, рынок, мини-игры, социальные действия и прогрессия должны были восприниматься как части одной игры." },
        { title: "Целостный мир персонажа", description: "Я зафиксировал узнаваемые черты утки и процесс создания карт, сцен и иллюстраций для новых механик." },
        { title: "Мобильное взаимодействие", description: "Короткие сессии, крупные зоны касания, ясные балансы и награды, пошаговый онбординг определили вход в игровые системы." },
      ],
      focusTitle: "Одна механика внутри большой игры",
      visualIntro: "Полная галерея ниже показывает игровой мир, персонажа и интерфейсы. Торговый раунд разобран как отдельное решение, а не вынесен в главное изображение кейса.",
    },
    hy: {
      headline: "Մի ամբողջ Telegram խաղային աշխարհ, ոչ մեկ փուլ։",
      summary: "Ես նախագծել եմ Duck Master մինի-հավելվածի խաղային UI-ը, առաջընթացը, քարտերը, առևտուրը, սոցիալական գործառույթներն ու օնբորդինգը։ Ստեղծել եմ նաև կերպարի և այլ վիզուալ նյութերի արտադրության ու բաղադրիչների համակարգը։ Ստորև առևտրային փոփոխությունն այդ լայն աշխատանքի միայն մեկ օրինակն է։",
      ownership: ["Ամբողջական խաղային UX/UI", "Խաղային և տնտեսական հոսքեր", "Կերպար ու ասեթների արտադրություն", "Օնբորդինգ և դիզայն համակարգ"],
      workstreams: [
        { title: "Խաղային ցիկլեր", description: "Կարիերան, քարտերը, շուկան, մինի-խաղերը, սոցիալական գործողություններն ու առաջընթացը պետք է լինեին մեկ ամբողջություն։" },
        { title: "Միասնական կերպար", description: "Սահմանեցի բադիկի ճանաչելի տեսքը և քարտերի, տեսարանների ու նկարազարդումների արտադրական հոսքը։" },
        { title: "Բջջային փոխազդեցություն", description: "Կարճ փուլերը, հպման տարրերը, պարզ հաշվեկշիռներն ու պարգևները և օնբորդինգը ձևավորեցին խաղը։" },
      ],
      focusTitle: "Մեկ մեխանիկա՝ մեծ խաղի ներսում",
      visualIntro: "Ստորև ամբողջական պատկերասրահը ցույց է տալիս խաղի ու կերպարի համակարգը։ Առևտրային փուլը դիտարկվում է որպես առանձին որոշում, ոչ գլխավոր պատկեր։",
    },
  },
  balvoi: {
    en: {
      headline: "A reading and analysis product designed end to end.",
      summary: "I led the experience and visual design of BalVoi across the public site, article reading, DeBiasIt, trust and media-literacy surfaces, settings and responsive patterns. The interface system had to make dense AI output usable without turning every reader into an analyst. The DeBiasIt sequence below is a detailed slice of that broader product.",
      ownership: ["Product UX and UI", "Reader and analysis tools", "Responsive component system", "States and handoff"],
      workstreams: [
        { title: "A readable news product", description: "Navigation, article hierarchy, subscriptions and supporting tools were designed to leave the story itself readable and easy to scan." },
        { title: "Analysis with user control", description: "DeBiasIt exposes processing, source comparison, category metrics, alternate wording and manual sentence revision instead of presenting only a black-box answer." },
        { title: "A system across states", description: "The design covers multiple breakpoints, reusable components, analysis history, learning content and non-happy-path messages rather than only ideal article screens." },
      ],
      focusTitle: "A detailed look at DeBiasIt",
      visualIntro: "These shipped captures show the analysis workflow in context. The complete case gallery also covers the reader, learning content, responsive treatment and component system.",
    },
    ru: {
      headline: "Продукт для чтения и анализа, спроектированный целиком.",
      summary: "Я вёл UX и визуальный дизайн BalVoi: публичный сайт, чтение статей, DeBiasIt, функции доверия и медиаграмотности, настройки и адаптивные паттерны. Система должна была делать плотный результат AI понятным, не превращая каждого читателя в аналитика. Сценарий DeBiasIt ниже — только часть продукта.",
      ownership: ["Продуктовый UX и UI", "Ридер и инструменты анализа", "Адаптивная система компонентов", "Состояния и передача в разработку"],
      workstreams: [
        { title: "Читаемая новостная среда", description: "Навигация, иерархия статьи, подписка и дополнительные инструменты спроектированы так, чтобы сам текст оставался главным." },
        { title: "Анализ под контролем автора", description: "DeBiasIt показывает обработку, сравнение с исходником, метрики, варианты формулировок и ручную правку, а не только ответ «чёрного ящика»." },
        { title: "Система разных состояний", description: "Дизайн охватывает адаптивные размеры, компоненты, историю анализа, обучающий контент и нестандартные ситуации." },
      ],
      focusTitle: "DeBiasIt крупным планом",
      visualIntro: "Эти экраны показывают работающий сценарий анализа. Полная галерея охватывает также ридер, обучение, адаптивность и систему компонентов.",
    },
    hy: {
      headline: "Ընթերցման և վերլուծության ամբողջական պրոդուկտ։",
      summary: "Ես ղեկավարել եմ BalVoi-ի UX և վիզուալ դիզայնը՝ հանրային կայքից ու հոդվածի ընթերցումից մինչև DeBiasIt, վստահության ու մեդիագրագիտության գործիքներ, կարգավորումներ և ադապտիվ պատերններ։ Համակարգը պետք է հասկանալի դարձներ խիտ AI արդյունքը։ Ստորև DeBiasIt-ը միայն այդ լայն պրոդուկտի մի մասն է։",
      ownership: ["Պրոդուկտի UX և UI", "Ընթերցիչ և վերլուծություն", "Ադապտիվ բաղադրիչների համակարգ", "Վիճակներ և փոխանցում"],
      workstreams: [
        { title: "Ընթեռնելի լրատվական միջավայր", description: "Նավիգացիան, հոդվածի կառուցվածքը, բաժանորդագրությունն ու գործիքները պահում են հոդվածը կենտրոնում։" },
        { title: "Կառավարելի վերլուծություն", description: "DeBiasIt-ը ցույց է տալիս մշակումը, բնօրինակի համեմատումը, չափանիշները, այլընտրանքներն ու ձեռքով խմբագրումը։" },
        { title: "Տարբեր վիճակների համակարգ", description: "Դիզայնը ներառում է տարբեր էկրաններ, բաղադրիչներ, վերլուծության պատմություն, ուսուցում և ոչ սովորական վիճակներ։" },
      ],
      focusTitle: "DeBiasIt-ը՝ մանրամասն",
      visualIntro: "Այս էկրանները ցույց են տալիս գործող վերլուծության հոսքը։ Ամբողջական պատկերասրահում կան նաև ընթերցիչը, ուսուցումն ու բաղադրիչների համակարգը։",
    },
  },
  "xy-ecosystem": {
    en: {
      headline: "One design language for a multi-product Web3 ecosystem.",
      summary: "I led the product design and shared UI system connecting the XYGO lottery with XY.Market, Earn, Cybele's Rite and the XYU token experience. The work includes navigation, asset and position views, transactions, disclosures and responsive patterns. Core directions are approved and in pre-production; the full platform has not launched.",
      ownership: ["Ecosystem UX/UI", "Lottery and protocol surfaces", "Shared design system", "Terms and transaction patterns"],
      workstreams: [
        { title: "From lottery to ecosystem", description: "XYGO's coordinate grid and ticket logic established the product's visual vocabulary; later marketplace and protocol surfaces had to connect to it without feeling like separate apps." },
        { title: "Four connected surfaces", description: "Marketplace assets, Earn positions, Cybele's Rite activity and XYU explanations each need their own mechanics while sharing navigation and a coherent user mental model." },
        { title: "Consistency before commitment", description: "Repeated item structures, forms, mobile sheets and explicit terms make complex actions inspectable. Shared design patterns never substitute for explaining protocol-specific fees, locks and risks." },
      ],
      focusTitle: "One cross-product decision: shared trust patterns",
      visualIntro: "The gallery contains approved pre-production screens and system boards across XYGO and the later protocols. Their figures describe the design, not live financial outcomes.",
    },
    ru: {
      headline: "Один язык дизайна для экосистемы Web3-продуктов.",
      summary: "Я вёл продуктовый дизайн и общую UI-систему, связывающую лотерею XYGO с XY.Market, Earn, Cybele's Rite и токеном XYU. Работа охватывает навигацию, страницы активов, операции, раскрытие условий и адаптивные паттерны. Основные направления согласованы и находятся в препродакшене; полная платформа ещё не запущена.",
      ownership: ["UX/UI экосистемы", "Лотерея и протоколы", "Общая дизайн-система", "Условия и сценарии операций"],
      workstreams: [
        { title: "От лотереи к экосистеме", description: "Координатная сетка и билеты XYGO задали визуальный язык; новые маркетплейс и протоколы должны были продолжить его, не выглядя отдельными приложениями." },
        { title: "Четыре связанных поверхности", description: "Активы маркетплейса, позиции Earn, действия Cybele's Rite и объяснения XYU имеют разную механику, но общую навигацию и ментальную модель." },
        { title: "Ясность до действия", description: "Повторяемые структуры, формы, мобильные панели и явные условия помогают проверять сложные действия. Общие паттерны не заменяют объяснения комиссий, блокировок и рисков." },
      ],
      focusTitle: "Одно сквозное решение: общий язык доверия",
      visualIntro: "Галерея содержит согласованные экраны препродакшена XYGO и протоколов. Цифры на них описывают дизайн, а не реальные финансовые результаты.",
    },
    hy: {
      headline: "Մեկ դիզայն լեզու բազմապրոդուկտ Web3 էկոհամակարգի համար։",
      summary: "Ես ղեկավարել եմ XYGO վիճակախաղը XY.Market-ի, Earn-ի, Cybele's Rite-ի և XYU թոքենի փորձառության հետ կապող պրոդուկտային դիզայնն ու ընդհանուր UI համակարգը։ Աշխատանքը ներառում է նավիգացիան, ակտիվների էջերը, գործարքները, պայմանները և ադապտիվ պատերնները։ Հիմնական ուղղությունները հաստատված են, ամբողջական հարթակը դեռ չի գործարկվել։",
      ownership: ["Էկոհամակարգի UX/UI", "Վիճակախաղ և պրոտոկոլներ", "Ընդհանուր դիզայն համակարգ", "Պայմաններ և գործարքներ"],
      workstreams: [
        { title: "Վիճակախաղից դեպի էկոհամակարգ", description: "XYGO-ի կոորդինատային ցանցն ու տոմսերը հիմք դրեցին լեզվին, որը շարունակվեց շուկայում և պրոտոկոլներում։" },
        { title: "Չորս կապված մակերես", description: "Marketplace-ի ակտիվները, Earn-ի դիրքերը, Cybele's Rite-ի գործողությունները և XYU-ի բացատրությունները տարբեր մեխանիկա ունեն, բայց ընդհանուր նավիգացիա։" },
        { title: "Հստակություն մինչև գործողությունը", description: "Կրկնվող էջերը, ձևերը, բջջային վահանակներն ու բաց պայմանները դարձնում են բարդ գործողությունները հասկանալի՝ չթաքցնելով վճարները, արգելափակումներն ու ռիսկերը։" },
      ],
      focusTitle: "Մեկ միջպրոդուկտային որոշում՝ վստահության ընդհանուր լեզու",
      visualIntro: "Պատկերասրահում XYGO-ի և պրոտոկոլների հաստատված նախաարտադրական էկրաններն են։ Դրանց թվերը դիզայնի նկարագրություն են, ոչ իրական ֆինանսական արդյունքներ։",
    },
  },
};

export function getCaseScope(slug: string, locale: Locale): CaseScope | null {
  return scopes[slug]?.[locale] ?? null;
}
