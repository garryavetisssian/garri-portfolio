import type { Locale } from "@/lib/i18n/types";

type Frame = { src: string; title: string; detail: string; shape: "phone" | "desktop"; focusY?: number };
export type CaseSequence = { title: string; intro: string; frames: Frame[] };

const balvoiFrameFocus: Record<string, number> = {
  "debias-01.png": 18,
  "debias-02.png": 22,
  "debias-03.png": 22,
  "debias-04.png": 34,
  "debias-05.png": 45,
  "debias-06.png": 34,
  "debias-07.png": 43,
  "debias-08.png": 50,
};

const frame = (root: string, name: string, title: string, detail: string, shape: Frame["shape"] = "phone"): Frame => ({
  src: `/cases/${root}/evidence/${name}`,
  title,
  detail,
  shape,
  focusY: root === "balvoi" ? balvoiFrameFocus[name] : undefined,
});

const sequences: Record<string, Partial<Record<Locale, CaseSequence[]>>> = {
  "duck-master": {
    en: [{ title: "The released trading round", intro: "A product capture, not a simulated testimonial or evidence that the mechanic caused retention.", frames: [
      frame("duck-master", "trading-session.jpg", "Ten seconds to choose a direction", "The betting window, live line and stake selection are visible together in the Telegram mini-app."),
    ] }],
    ru: [{ title: "Выпущенный торговый раунд", intro: "Экран продукта, а не вымышленный отзыв или доказательство влияния механики на удержание.", frames: [
      frame("duck-master", "trading-session.jpg", "Десять секунд на выбор направления", "Окно ставки, движущаяся линия и выбор суммы видны вместе в Telegram-мини-приложении."),
    ] }],
    hy: [{ title: "Թողարկված առևտրային փուլ", intro: "Պրոդուկտի էկրան է, ոչ հորինված արձագանք կամ պահպանման վրա մեխանիկայի ազդեցության ապացույց։", frames: [
      frame("duck-master", "trading-session.jpg", "Տասը վայրկյան՝ ուղղությունն ընտրելու համար", "Խաղադրույքի պատուհանը, գիծը և գումարի ընտրությունը տեսանելի են Telegram մինի-հավելվածում։"),
    ] }],
  },
  ineed: {
    en: [
      { title: "Customer journey", intro: "One request moves from a specific appliance problem to a matched professional and a visible job state.", frames: [
        frame("ineed", "customer-01.png", "Find a service", "The new entry point focuses on home-appliance work."),
        frame("ineed", "customer-02.png", "Set the location", "Category, service and brand narrow the request."),
        frame("ineed", "customer-03.png", "Describe the issue", "Optional notes preserve context without blocking the request."),
        frame("ineed", "customer-04.png", "Add photos", "Images help a professional assess the work before accepting."),
        frame("ineed", "customer-05.png", "Search nearby", "The app makes the matching state explicit."),
        frame("ineed", "customer-06.png", "Review a professional", "Distance, experience and price appear at the decision point."),
        frame("ineed", "customer-07.png", "Connect", "The request enters a timed response state."),
        frame("ineed", "customer-08.png", "Track arrival", "The job, professional and timing remain visible together."),
        frame("ineed", "customer-09.png", "Follow the work", "The customer sees the job move into progress."),
      ] },
      { title: "Professional journey", intro: "The second app replaces company administration with a mobile work queue for an independent professional.", frames: [
        frame("ineed", "pro-01.png", "Set availability", "A professional controls ordinary and SOS availability."),
        frame("ineed", "pro-02.png", "Receive a request", "A new job surfaces its place and appliance task."),
        frame("ineed", "pro-03.png", "Review orders", "New work and completed jobs share one queue."),
        frame("ineed", "pro-04.png", "Accept the job", "Location and service details appear before commitment."),
        frame("ineed", "pro-05.png", "Navigate", "The active job keeps route and customer contact close."),
        frame("ineed", "pro-06.png", "Inspect the brief", "Notes and photos travel with the professional."),
        frame("ineed", "pro-07.png", "Complete", "The professional closes the same job state the customer tracks."),
      ] },
    ],
    ru: [
      { title: "Путь клиента", intro: "Один запрос проходит путь от конкретной проблемы с техникой до подбора мастера и отслеживания заказа.", frames: [
        frame("ineed", "customer-01.png", "Найти услугу", "Фокус на бытовой технике."), frame("ineed", "customer-02.png", "Указать адрес", "Категория, услуга и бренд уточняют запрос."), frame("ineed", "customer-03.png", "Описать проблему", "Заметки добавляют контекст."), frame("ineed", "customer-04.png", "Добавить фото", "Снимки помогают оценить работу заранее."), frame("ineed", "customer-05.png", "Поиск рядом", "Состояние подбора видно клиенту."), frame("ineed", "customer-06.png", "Выбрать мастера", "Расстояние, опыт и цена в точке решения."), frame("ineed", "customer-07.png", "Связаться", "Запрос переходит в ожидание ответа."), frame("ineed", "customer-08.png", "Следить за приездом", "Заказ, мастер и время видны вместе."), frame("ineed", "customer-09.png", "Следить за работой", "Клиент видит переход к выполнению."),
      ] },
      { title: "Путь специалиста", intro: "Второе приложение заменяет администрирование компании мобильной очередью заказов независимого мастера.", frames: [
        frame("ineed", "pro-01.png", "Доступность", "Отдельное управление обычными и SOS-заказами."), frame("ineed", "pro-02.png", "Новый запрос", "Адрес и задача видны сразу."), frame("ineed", "pro-03.png", "Очередь", "Новые и завершённые заказы в одном месте."), frame("ineed", "pro-04.png", "Принять заказ", "Детали известны до согласия."), frame("ineed", "pro-05.png", "Маршрут", "Навигация и связь с клиентом рядом."), frame("ineed", "pro-06.png", "Детали", "Заметки и фото доступны в пути."), frame("ineed", "pro-07.png", "Завершить", "Мастер закрывает тот же статус, что видит клиент."),
      ] },
    ],
    hy: [
      { title: "Հաճախորդի հոսքը", intro: "Հարցումը սարքի խնդրից անցնում է մասնագետի ընտրության և աշխատանքի հետևման։", frames: [
        frame("ineed", "customer-01.png", "Ծառայության որոնում", "Կենտրոնացում կենցաղային տեխնիկայի վրա։"), frame("ineed", "customer-02.png", "Հասցե", "Կատեգորիան, ծառայությունն ու բրենդը հստակեցնում են հարցումը։"), frame("ineed", "customer-03.png", "Խնդրի նկարագրում", "Լրացուցիչ տեղեկություն՝ առանց պարտադիր դաշտերի։"), frame("ineed", "customer-04.png", "Լուսանկարներ", "Օգնում են նախապես գնահատել աշխատանքը։"), frame("ineed", "customer-05.png", "Մասնագետի որոնում", "Ընտրության վիճակը տեսանելի է։"), frame("ineed", "customer-06.png", "Մասնագետի ընտրություն", "Հեռավորություն, փորձ և գին։"), frame("ineed", "customer-07.png", "Կապ", "Հարցումը սպասում է պատասխանի։"), frame("ineed", "customer-08.png", "Ժամանում", "Աշխատանքն ու ժամանակը մեկ տեղում են։"), frame("ineed", "customer-09.png", "Աշխատանքի ընթացք", "Հաճախորդը տեսնում է ընթացիկ վիճակը։"),
      ] },
      { title: "Մասնագետի հոսքը", intro: "Երկրորդ հավելվածը ընկերության վահանակը փոխարինում է անկախ մասնագետի շարժական պատվերների հերթով։", frames: [
        frame("ineed", "pro-01.png", "Հասանելիություն", "Սովորական և SOS պատվերների կառավարում։"), frame("ineed", "pro-02.png", "Նոր պատվեր", "Վայրը և խնդիրը երևում են անմիջապես։"), frame("ineed", "pro-03.png", "Հերթ", "Նոր և ավարտված աշխատանքները միասին։"), frame("ineed", "pro-04.png", "Ընդունում", "Մանրամասները հայտնի են նախապես։"), frame("ineed", "pro-05.png", "Երթուղի", "Նավիգացիան և կապը հասանելի են։"), frame("ineed", "pro-06.png", "Մանրամասներ", "Նշումներն ու նկարները մասնագետի հետ են։"), frame("ineed", "pro-07.png", "Ավարտ", "Երկու հավելվածում նույն աշխատանքային վիճակը։"),
      ] },
    ],
  },
  balvoi: {
    en: [{ title: "DeBiasIt, from article to revision", intro: "The shipped interface reveals its process in layers: progress, comparison, metrics, and sentence-level control.", frames: [
      frame("balvoi", "debias-01.png", "Configure the analysis", "Style, reading level and language sit above the source text.", "desktop"),
      frame("balvoi", "debias-02.png", "Show progress", "Completed and active stages distinguish work from waiting.", "desktop"),
      frame("balvoi", "debias-03.png", "Complete the run", "The processing path remains visible after the analysis finishes.", "desktop"),
      frame("balvoi", "debias-04.png", "Compare versions", "Source and recommended alternative appear side by side.", "desktop"),
      frame("balvoi", "debias-05.png", "Inspect metrics", "The detailed view compares bias categories and transformation measures.", "desktop"),
      frame("balvoi", "debias-06.png", "Enter sentence mode", "The article becomes a series of editable passages.", "desktop"),
      frame("balvoi", "debias-07.png", "Review an alternative", "A proposed sentence exposes its category-level score impact.", "desktop"),
      frame("balvoi", "debias-08.png", "Choose or rewrite", "The writer can select an alternative or supply their own before resubmission.", "desktop"),
    ] }],
    ru: [{ title: "DeBiasIt: от статьи к правке", intro: "Работающий интерфейс раскрывает процесс по слоям: обработка, сравнение, метрики и редактирование предложений.", frames: [
      frame("balvoi", "debias-01.png", "Настроить анализ", "Стиль, уровень чтения и язык перед исходным текстом.", "desktop"), frame("balvoi", "debias-02.png", "Показать прогресс", "Готовые и текущие этапы различимы.", "desktop"), frame("balvoi", "debias-03.png", "Завершить обработку", "Путь остаётся видимым после результата.", "desktop"), frame("balvoi", "debias-04.png", "Сравнить версии", "Исходник и рекомендация рядом.", "desktop"), frame("balvoi", "debias-05.png", "Изучить метрики", "Категории предвзятости и меры трансформации.", "desktop"), frame("balvoi", "debias-06.png", "Режим предложений", "Текст разбит на редактируемые фрагменты.", "desktop"), frame("balvoi", "debias-07.png", "Оценить вариант", "Видно влияние на отдельные категории.", "desktop"), frame("balvoi", "debias-08.png", "Выбрать или переписать", "Автор может предложить свой текст и отправить повторно.", "desktop"),
    ] }],
    hy: [{ title: "DeBiasIt՝ հոդվածից մինչև խմբագրում", intro: "Գործող միջերեսը փուլերով ցույց է տալիս մշակումը, համեմատությունը, չափանիշներն ու նախադասությունների կառավարումը։", frames: [
      frame("balvoi", "debias-01.png", "Կարգավորել", "Ոճ, ընթերցման մակարդակ և լեզու։", "desktop"), frame("balvoi", "debias-02.png", "Հետևել ընթացքին", "Ավարտված և ակտիվ փուլերը տարբերվում են։", "desktop"), frame("balvoi", "debias-03.png", "Ավարտել", "Մշակման ուղին մնում է տեսանելի։", "desktop"), frame("balvoi", "debias-04.png", "Համեմատել", "Բնօրինակն ու առաջարկը կողք կողքի։", "desktop"), frame("balvoi", "debias-05.png", "Չափանիշներ", "Կողմնակալության կատեգորիաներն ու փոփոխությունները։", "desktop"), frame("balvoi", "debias-06.png", "Նախադասություններ", "Տեքստը դառնում է խմբագրելի հատվածներ։", "desktop"), frame("balvoi", "debias-07.png", "Այլընտրանք", "Տեսանելի է ազդեցությունը գնահատականի վրա։", "desktop"), frame("balvoi", "debias-08.png", "Ընտրել կամ գրել", "Հեղինակը կարող է առաջարկել սեփական տարբերակը։", "desktop"),
    ] }],
  },
};

export function getCaseSequences(slug: string, locale: Locale): CaseSequence[] {
  return sequences[slug]?.[locale] ?? [];
}
