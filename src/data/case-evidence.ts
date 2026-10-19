import type { Locale } from "@/lib/i18n/types";

export interface CaseEvidence {
  status: string;
  problem: string;
  decision: string;
  tradeoff: string;
  result: string;
  resultContext: string;
  visual: { src: string; title: string; note: string };
  needed: string[];
}

const evidence: Record<string, Record<Locale, CaseEvidence>> = {
  "duck-master": {
    en: {
      status: "Released Telegram mini-game · historical Google Analytics figures",
      problem: "The founder's original trading session asked players to read a price chart and decide when to buy or sell a coin. That imported the mental model of trading into a fast mini-game.",
      decision: "I proposed a timed up-or-down round: players have ten seconds to choose whether the price line will finish above or below a horizontal threshold. The final distance from that line determines whether the stake is lost or returns a variable multiplier.",
      tradeoff: "The ten-second choice is easier to grasp than buy/sell timing, while the moving line keeps the tension of a market. It also makes the wager and possible loss more immediate, so the threshold, countdown, stake and outcome need to stay legible.",
      result: "The team reported a better response to the revised round. Google Analytics showed the audience rising from roughly 300 to 2,000 users during the first three months of our work.",
      resultContext: "The Google Analytics project is no longer accessible, so these are approximate historical figures, not a retained report. Audience growth is context, not a measured causal effect of this mechanic alone.",
      visual: { src: "/cases/duck-master/evidence/trading-session.jpg", title: "The timed trading round in the Telegram mini-app", note: "A real product capture shows the moving line, the short betting window, live cash-outs and the stake-selection layer. This is product UI, not a reconstruction of player feedback." },
      needed: ["Original crypto flow and revised gamified flow, or permission to recreate them with an explicit reconstruction label", "Dated player feedback or support excerpts about the change", "Source, definition, and dates for the ~300 → ~2,000 audience estimate", "Confirmed start and end dates of your contribution"],
    },
    ru: {
      status: "Выпущенная Telegram-мини-игра · исторические данные Google Analytics",
      problem: "Изначальная торговая сессия предлагала читать график цены и решать, когда покупать или продавать монету. Для быстрой мини-игры это требовало слишком сложной торговой модели мышления.",
      decision: "Я предложил короткий раунд «вверх или вниз»: за десять секунд игрок выбирает, окажется ли ценовая линия выше или ниже горизонтального порога. Расстояние от порога в конце раунда определяет потерю ставки или переменный множитель выигрыша.",
      tradeoff: "Выбор за десять секунд проще, чем поиск момента покупки и продажи, но движение линии сохраняет напряжение рынка. При этом ставка и риск потери становятся непосредственнее — порог, таймер, ставка и результат должны быть понятны с первого взгляда.",
      result: "Команда отмечала лучшую реакцию на обновлённый раунд. По данным Google Analytics за первые три месяца нашей работы аудитория выросла примерно с 300 до 2 000 пользователей.",
      resultContext: "Доступа к проекту Google Analytics больше нет, поэтому цифры приблизительные и отчёт не сохранился. Рост аудитории — контекст, а не доказанный эффект одной механики.",
      visual: { src: "/cases/duck-master/evidence/trading-session.jpg", title: "Торговый раунд в Telegram-мини-приложении", note: "Настоящий экран продукта показывает график, короткое окно для ставки, выплаты других игроков и выбор пакета. Это интерфейс продукта, а не реконструкция отзывов." },
      needed: ["Исходный криптосценарий и новая игровая версия либо разрешение показать обозначенную реконструкцию", "Датированные отзывы игроков об изменении", "Источник, определение и период оценки аудитории ~300 → ~2 000", "Подтверждённые даты участия в проекте"],
    },
    hy: {
      status: "Թողարկված Telegram մինի-խաղ · Google Analytics-ի պատմական տվյալներ",
      problem: "Սկզբնական առևտրային փուլում խաղացողը պետք է կարդար գնի գրաֆիկը և որոշեր՝ երբ գնել կամ վաճառել մետաղադրամը։ Արագ մինի-խաղի համար սա պահանջում էր բարդ առևտրային մտածողություն։",
      decision: "Ես առաջարկեցի «վերև կամ ներքև» կարճ փուլ․ խաղացողը տասը վայրկյանում ընտրում է՝ գնի գիծը վերջում հորիզոնական սահմանից վերև, թե ներքև կլինի։ Վերջնական հեռավորությունը որոշում է՝ խաղադրույքը կորում է, թե վերադարձվում է փոփոխական բազմապատկիչով։",
      tradeoff: "Տասը վայրկյանի ընտրությունը պարզ է գնման ու վաճառքի պահը գտնելուց, բայց շարժվող գիծը պահպանում է շուկայի լարվածությունը։ Միաժամանակ կորուստը դառնում է անմիջական, ուստի սահմանը, ժամանակաչափը, խաղադրույքն ու արդյունքը պետք է պարզ երևան։",
      result: "Թիմը ավելի լավ արձագանք էր նկատում նոր փուլին։ Google Analytics-ի տվյալներով՝ մեր աշխատանքի առաջին երեք ամիսներին լսարանը մոտ 300-ից հասել էր 2,000 օգտատիրոջ։",
      resultContext: "Google Analytics-ի տվյալ նախագծին հասանելիություն այլևս չկա, ուստի թվերը մոտավոր են, իսկ հաշվետվությունը պահպանված չէ։ Լսարանի աճը համատեքստ է, ոչ միայն այս մեխանիկայի չափված ազդեցությունը։",
      visual: { src: "/cases/duck-master/evidence/trading-session.jpg", title: "Առևտրային փուլը Telegram մինի-հավելվածում", note: "Իրական էկրանը ցույց է տալիս շարժվող գիծը, կարճ խաղադրույքի պատուհանը, այլ խաղացողների վճարումները և փաթեթի ընտրությունը։" },
      needed: ["Սկզբնական կրիպտո և վերամշակված խաղային հոսքերը կամ հստակ նշված վերակառուցման թույլտվություն", "Փոփոխության վերաբերյալ թվագրված օգտատերերի արձագանք", "~300 → ~2,000 լսարանի գնահատման աղբյուրը, սահմանումը և ժամանակահատվածը", "Նախագծում մասնակցության հաստատված ամսաթվերը"],
    },
  },
  ineed: {
    en: {
      status: "Launched two-sided service · approximate registrations",
      problem: "The first model required service companies to register, configure their teams and services, and manage work through a dashboard. After the investor presentation, that company-only model and broad service catalogue did not attract support.",
      decision: "We narrowed the offer to home-appliance work and opened the supply side to licensed individual professionals. I redesigned the experience as two mobile apps: a customer can describe an appliance issue and connect with a nearby professional; the professional can receive, accept and complete the job on the move.",
      tradeoff: "The narrower category makes matching and pricing more specific, while excluding the broad catalogue of the first version. Two focused apps also replace one shared dashboard with two coordinated state machines: request, acceptance, travel, arrival and completion must agree on both sides.",
      result: "The revised product launched with approximately 800 customer and 100 professional registrations. The client later paused further development.",
      resultContext: "Registration is an adoption signal, not a completed-booking or retention figure. The counts are historical team estimates and are not attributed to a single screen or visual refresh.",
      visual: { src: "/cases/ineed/First%20Version/12.webp", title: "First version · company dashboard", note: "The original deck shows company administration and service management. The new flow below shows what changed when the supply side moved to licensed individual professionals." },
      needed: ["One paired before/after journey for a customer, with the problem and reason for each change", "One paired before/after journey for a professional", "Definition, date range, and source for ~800 customer and ~100 professional registrations", "Any documented feedback, booking completion, or support evidence"],
    },
    ru: {
      status: "Запущенный двусторонний сервис · примерные регистрации",
      problem: "Первая бизнес-модель требовала, чтобы сервисные компании регистрировались, добавляли сотрудников и услуги и вели работу через дашборд. После презентации инвесторам модель только для компаний и слишком широкий каталог услуг не получили поддержки.",
      decision: "Мы сузили фокус до ремонта и установки бытовой техники и открыли платформу лицензированным независимым специалистам. Я переработал опыт в два мобильных приложения: клиент описывает проблему и связывается с местным мастером, а мастер принимает и выполняет заказ в пути.",
      tradeoff: "Узкая категория делает подбор и стоимость услуги конкретнее, но отказывается от широты первого каталога. Два приложения также требуют синхронизации состояний запроса, принятия, поездки, прибытия и завершения.",
      result: "Обновлённый продукт запустился; зарегистрировалось примерно 800 клиентов и 100 специалистов. Позже клиент приостановил дальнейшее развитие.",
      resultContext: "Регистрации показывают первоначальный интерес, но не число завершённых заказов или удержание. Это приблизительные исторические данные команды, не эффект одного экрана или визуального обновления.",
      visual: { src: "/cases/ineed/First%20Version/12.webp", title: "Первая версия · дашборд компании", note: "Исходная презентация показывает администрирование компании и услуг. Новый сценарий ниже демонстрирует переход к независимым специалистам." },
      needed: ["Один сценарий клиента до и после с причиной изменения", "Один сценарий специалиста до и после", "Определение, период и источник ~800 регистраций клиентов и ~100 специалистов", "Документированные отзывы, данные о заказах или обращениях в поддержку"],
    },
    hy: {
      status: "Գործարկված երկկողմ ծառայություն · մոտավոր գրանցումներ",
      problem: "Առաջին մոդելում ծառայություններ մատուցող ընկերությունները գրանցում էին իրենց թիմերն ու ծառայությունները և աշխատում վահանակով։ Ներդրողներին ներկայացնելուց հետո միայն ընկերությունների վրա հիմնված և չափազանց լայն ծառայությունների կատալոգը աջակցություն չստացավ։",
      decision: "Մենք կենտրոնացանք կենցաղային տեխնիկայի վրա և հարթակը բացեցինք լիցենզավորված անկախ մասնագետների համար։ Ես փորձառությունը վերակառուցեցի երկու բջջային հավելվածով․ հաճախորդը նկարագրում է խնդիրը և կապվում մոտակա մասնագետի հետ, մասնագետը ճանապարհին ընդունում ու կատարում է պատվերը։",
      tradeoff: "Նեղ կատեգորիան ընտրությունն ու գինը դարձնում է ավելի հստակ, բայց հրաժարվում է սկզբնական լայն տեսականուց։ Երկու հավելվածները նաև պահանջում են հարցման, ընդունման, ուղևորության, ժամանման ու ավարտի վիճակների համաժամացում։",
      result: "Թարմացված պրոդուկտը գործարկվեց՝ մոտ 800 հաճախորդի և 100 մասնագետի գրանցումով։ Հետագայում պատվիրատուն դադարեցրեց զարգացումը։",
      resultContext: "Գրանցումը հետաքրքրության ազդակ է, ոչ ավարտված պատվերների կամ պահպանման չափանիշ։ Թվերը թիմի պատմական մոտավոր գնահատականներն են և չեն վերագրվում մեկ էկրանին։",
      visual: { src: "/cases/ineed/First%20Version/12.webp", title: "Առաջին տարբերակ · ընկերության վահանակ", note: "Սկզբնական ներկայացումը ցույց է տալիս ընկերությունների կառավարումը։ Ստորև նոր հոսքը ցույց է տալիս անցումը անկախ մասնագետների մոդելին։" },
      needed: ["Հաճախորդի մեկ հոսք՝ առաջ և հետո տարբերակներով ու փոփոխության պատճառներով", "Մասնագետի մեկ հոսք՝ առաջ և հետո տարբերակներով", "~800 և ~100 գրանցումների սահմանումը, ժամանակահատվածը և աղբյուրը", "Փաստագրված արձագանք, ամրագրումների կամ աջակցության տվյալներ"],
    },
  },
  balvoi: {
    en: {
      status: "Live product in supported regions · shipped DeBiasIt flow",
      problem: "A single AI-generated 'less biased' article would hide the reasoning. Writers need to see what happened to their source text and decide how much detail to inspect or edit.",
      decision: "I structured DeBiasIt as a visible sequence: configure style, reading level and language; follow processing states; compare source and recommended text; move from summary to detailed bias metrics; then inspect and revise individual sentences before resubmitting.",
      tradeoff: "The summary keeps a dense analysis approachable, but deep controls and several generated versions add cognitive load. Progressive disclosure lets a writer start with a comparison and drill into category scores or sentence alternatives when needed.",
      result: "The interfaces shown in this case were designed and implemented. The product is live in supported regions; the supplied captures document the working analysis and rewrite flow.",
      resultContext: "The charts and percentages pictured are outputs for the example article, not a measured improvement in reader trust, publishing speed, or product adoption.",
      visual: { src: "/cases/balvoi/evidence/debias-08.png", title: "Sentence-level editing after analysis", note: "The expanded editor exposes the original, generated alternatives, category-level bias impact and a manual rewrite path before resubmission." },
      needed: ["A real analysis flow with readable source, score explanation, and result states", "Research or feedback records about score comprehension and trust", "Any analytics export with metric definition, baseline, period, and source", "Confirmation of which surfaces were live versus designed"],
    },
    ru: {
      status: "Работающий продукт в доступных регионах · внедрённый сценарий DeBiasIt",
      problem: "Одна выданная ИИ «менее предвзятая» статья скрыла бы ход работы. Автору нужно видеть, что произошло с исходным текстом, и самому выбирать глубину анализа и правок.",
      decision: "Я выстроил DeBiasIt как прозрачный сценарий: стиль, уровень чтения и язык; видимые стадии обработки; сравнение исходника с рекомендуемым текстом; переход от сводки к метрикам; анализ и правка отдельных предложений с повторной отправкой.",
      tradeoff: "Краткая сводка делает плотный анализ доступнее, но подробные настройки и несколько вариантов текста увеличивают нагрузку. Постепенное раскрытие позволяет начать со сравнения и углубиться в категории или альтернативы предложений по необходимости.",
      result: "Все показанные интерфейсы были спроектированы и реализованы. Продукт работает в доступных регионах; предоставленные экраны показывают сценарий анализа и переписывания.",
      resultContext: "Графики и проценты на экранах относятся к примеру статьи, а не к измеренному росту доверия, скорости публикации или аудитории продукта.",
      visual: { src: "/cases/balvoi/evidence/debias-08.png", title: "Правка на уровне предложения после анализа", note: "Раскрытая панель показывает оригинал, варианты, влияние на категории предвзятости и ручную правку перед повторной отправкой." },
      needed: ["Читаемый сценарий анализа с источником, объяснением оценки и итоговыми состояниями", "Исследования или отзывы о понимании оценок и доверии", "Аналитика с определением метрики, базой, периодом и источником", "Подтверждение, какие интерфейсы работали, а какие остались в дизайне"],
    },
    hy: {
      status: "Գործող պրոդուկտ հասանելի տարածաշրջաններում · ներդրված DeBiasIt հոսք",
      problem: "AI-ի ստեղծած մեկ «պակաս կողմնակալ» հոդվածը կթաքցներ աշխատանքի ընթացքը։ Հեղինակը պետք է տեսնի սկզբնական տեքստի փոփոխությունները և ընտրի՝ որքան խորությամբ ուսումնասիրել ու խմբագրել դրանք։",
      decision: "Ես DeBiasIt-ը կառուցեցի որպես տեսանելի հաջորդականություն․ ոճի, ընթերցման մակարդակի և լեզվի ընտրություն, մշակման փուլեր, սկզբնաղբյուրի ու առաջարկված տեքստի համեմատություն, մանրամասն չափանիշներ և առանձին նախադասությունների խմբագրում ու վերահանձնում։",
      tradeoff: "Ամփոփումը հասկանալի է դարձնում խիտ վերլուծությունը, բայց բազմաթիվ կարգավորումները ծանրաբեռնում են։ Աստիճանական բացահայտումը թույլ է տալիս սկսել համեմատությունից և միայն անհրաժեշտության դեպքում դիտել կատեգորիաներն ու այլընտրանքները։",
      result: "Ցուցադրված բոլոր միջերեսները նախագծվել և ներդրվել են։ Պրոդուկտը գործում է հասանելի տարածաշրջաններում, իսկ էկրանները փաստագրում են վերլուծության ու վերաշարադրման հոսքը։",
      resultContext: "Էկրանների գրաֆիկներն ու տոկոսները մեկ օրինակ հոդվածի արդյունքներն են, ոչ վստահության, հրապարակման արագության կամ լսարանի չափված աճ։",
      visual: { src: "/cases/balvoi/evidence/debias-08.png", title: "Վերլուծությունից հետո նախադասության խմբագրում", note: "Բացված պատուհանը ցույց է տալիս բնօրինակը, տարբերակները, կողմնակալության ազդեցությունն ու ձեռքով խմբագրումը։" },
      needed: ["Ընթեռնելի վերլուծության հոսք՝ աղբյուրով, գնահատականի բացատրությամբ և արդյունքի վիճակներով", "Գնահատականների ընկալման և վստահության վերաբերյալ հետազոտություն կամ արձագանք", "Վերլուծության արտահանում՝ չափանիշի սահմանմամբ, բազայով, ժամանակահատվածով և աղբյուրով", "Որ միջերեսներն են գործարկվել և որոնք մնացել դիզայնում՝ հաստատում"],
    },
  },
  "xy-ecosystem": {
    en: {
      status: "Approved product design · pre-production build",
      problem: "The ecosystem spans a lottery, marketplace and financial protocols. Without a shared language, each new surface would make users relearn navigation, transaction steps and risk information.",
      decision: "I designed a common product system across these surfaces: navigation, asset pages, transaction forms and explicit terms. The flows shown are part of the approved product direction and pre-production work, not a speculative side project.",
      tradeoff: "Shared patterns reduce relearning, but each protocol still needs room to explain its own mechanics, fees, locks and risk before a user commits. Consistency cannot flatten meaningful differences.",
      result: "The product is in pre-production; its core direction and some flows are approved. The full platform has not launched. A late-2026 launch is a target, not a completed milestone.",
      resultContext: "Some public landing pages exist outside my contribution. Screen figures describe product logic and design states—not live adoption, audited security, or realized financial performance.",
      visual: { src: "/cases/xy-ecosystem/2%20XY%20Protocols/5.webp", title: "Approved direction for terms and verification", note: "The board documents a product flow under development. It is presented as pre-production design, not as a live transaction interface." },
      needed: ["Confirmed list of live pages versus unlaunched protocol interfaces", "A readable Figma export of one end-to-end marketplace or Earn flow", "Design-system source showing shared components across two protocols", "Any user-testing evidence for comprehension of terms, fees, locks, and risks"],
    },
    ru: {
      status: "Согласованный дизайн продукта · препродакшен",
      problem: "Экосистема объединяет лотерею, маркетплейс и финансовые протоколы. Без общего языка пользователю пришлось бы заново изучать навигацию, операции и риски в каждом сервисе.",
      decision: "Я спроектировал общую продуктовую систему: навигацию, страницы активов, формы операций и явные условия. Показанные сценарии входят в согласованное направление продукта и препродакшен, а не в личный эксперимент.",
      tradeoff: "Общие паттерны снижают необходимость переучиваться, но каждый протокол должен отдельно объяснять механику, комиссии, блокировки и риски до совершения действия.",
      result: "Продукт находится в препродакшене; основное направление и часть сценариев согласованы. Полная платформа ещё не запущена. Конец 2026 года — целевой срок, а не состоявшийся релиз.",
      resultContext: "Некоторые публичные лендинги существуют вне моего участия. Цифры на экранах описывают логику и проектные состояния, а не реальные инвестиционные результаты, аудит безопасности или метрики запуска.",
      visual: { src: "/cases/xy-ecosystem/2%20XY%20Protocols/5.webp", title: "Согласованное направление условий и проверки", note: "Экран документирует продуктовый сценарий в разработке. Это препродакшен-дизайн, не работающий интерфейс транзакции." },
      needed: ["Подтверждённый список действующих страниц и ещё не запущенных протоколов", "Читаемый экспорт полного сценария маркетплейса или Earn", "Исходник дизайн-системы с общими компонентами двух протоколов", "Результаты проверки понятности условий, комиссий, блокировок и рисков, если она проводилась"],
    },
    hy: {
      status: "Հաստատված պրոդուկտի դիզայն · նախաարտադրական փուլ",
      problem: "Էկոհամակարգը միավորում է վիճակախաղը, շուկան և ֆինանսական պրոտոկոլները։ Առանց ընդհանուր լեզվի օգտատերը ամեն մակերեսում նորից պետք է սովորի նավիգացիան, գործարքներն ու ռիսկերը։",
      decision: "Ես նախագծեցի ընդհանուր պրոդուկտային համակարգ՝ նավիգացիա, ակտիվների էջեր, գործարքի ձևեր և հստակ պայմաններ։ Ցուցադրված հոսքերը հաստատված ուղղության ու նախաարտադրական աշխատանքի մաս են, ոչ անձնական փորձարկում։",
      tradeoff: "Ընդհանուր պատերնները նվազեցնում են վերասովորելը, սակայն յուրաքանչյուր պրոտոկոլ պետք է առանձին բացատրի մեխանիկան, վճարները, արգելափակումներն ու ռիսկերը։",
      result: "Պրոդուկտը նախաարտադրական փուլում է, հիմնական ուղղությունն ու որոշ հոսքեր հաստատված են։ Ամբողջական հարթակը դեռ չի գործարկվել։ 2026-ի վերջը նպատակային ժամկետ է, ոչ ավարտված թողարկում։",
      resultContext: "Որոշ հանրային լենդինգներ ստեղծվել են իմ մասնակցությունից դուրս։ Էկրանների թվերը նախագծային տրամաբանություն են, ոչ իրական ընդունում, անվտանգության աուդիտ կամ եկամտաբերություն։",
      visual: { src: "/cases/xy-ecosystem/2%20XY%20Protocols/5.webp", title: "Պայմանների ու ստուգման հաստատված ուղղություն", note: "Պատկերը փաստագրում է մշակման փուլում գտնվող պրոդուկտի հոսքը, ոչ գործող գործարքային միջերեսը։" },
      needed: ["Գործող էջերի և չգործարկված միջերեսների հաստատված ցանկ", "Marketplace կամ Earn ամբողջական հոսքի ընթեռնելի Figma արտահանում", "Երկու պրոտոկոլի ընդհանուր բաղադրիչները ցույց տվող դիզայն-համակարգի աղբյուր", "Պայմանների, վճարների, արգելափակումների և ռիսկերի հասկանալիության ստուգման նյութեր"],
    },
  },
};

export function getCaseEvidence(slug: string, locale: Locale): CaseEvidence | null {
  return evidence[slug]?.[locale] ?? null;
}
