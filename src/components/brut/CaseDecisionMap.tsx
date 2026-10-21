import type { Locale } from "@/lib/i18n/types";
import styles from "./CaseDecisionMap.module.css";

type MapCopy = {
  label: string;
  title: string;
  note: string;
  tracks: { eyebrow: string; title: string; steps: { title: string; detail: string }[] }[];
};

const maps: Record<string, Record<Locale, MapCopy>> = {
  ineed: {
    en: {
      label: "Product-model map · editorial synthesis",
      title: "The pivot changed who could supply the service—and how a job moved.",
      note: "This map explains the two versions using the supplied project screens and Garri’s account. It is not an original product wireframe or a measured funnel.",
      tracks: [
        { eyebrow: "01 / Original model", title: "Company-led marketplace", steps: [
          { title: "Company joins", detail: "A service business registers and configures its branch." },
          { title: "Team and catalogue", detail: "The company adds employees and a broad set of services." },
          { title: "Dashboard operations", detail: "Inquiries and work are administered through the web dashboard." },
        ] },
        { eyebrow: "02 / Released direction", title: "Home-appliance marketplace", steps: [
          { title: "Customer specifies a task", detail: "Appliance, brand, location, notes and photos shape the request." },
          { title: "Licensed individual responds", detail: "A professional controls availability, reviews the brief and accepts work in a separate app." },
          { title: "One shared job state", detail: "Both sides follow acceptance, travel, arrival and completion." },
        ] },
      ],
    },
    ru: {
      label: "Карта продуктовой модели · редакционное обобщение",
      title: "Поворот изменил поставщика услуги и путь заказа.",
      note: "Карта объясняет две версии по экранам проекта и рассказу Гарри. Это не исходный вайрфрейм и не измеренная воронка.",
      tracks: [
        { eyebrow: "01 / Первая модель", title: "Маркетплейс компаний", steps: [
          { title: "Регистрация компании", detail: "Сервисная организация добавляет филиал." },
          { title: "Команда и каталог", detail: "Компания добавляет сотрудников и широкий набор услуг." },
          { title: "Операции в дашборде", detail: "Заявки и работа управляются через веб-интерфейс." },
        ] },
        { eyebrow: "02 / Релизная модель", title: "Маркетплейс бытовой техники", steps: [
          { title: "Клиент описывает задачу", detail: "Техника, бренд, адрес, заметки и фото формируют запрос." },
          { title: "Независимый мастер отвечает", detail: "Лицензированный специалист управляет доступностью, изучает заказ и принимает работу во втором приложении." },
          { title: "Общий статус заказа", detail: "Обе стороны видят принятие, путь, прибытие и завершение." },
        ] },
      ],
    },
    hy: {
      label: "Պրոդուկտի մոդելի քարտեզ · խմբագրական ամփոփում",
      title: "Շրջադարձը փոխեց ծառայություն մատուցողին և պատվերի ընթացքը։",
      note: "Քարտեզը բացատրում է երկու տարբերակները նախագծի էկրանների և Գարրիի պատմության հիման վրա։ Սա սկզբնական վայերֆրեյմ կամ չափված վորոնկա չէ։",
      tracks: [
        { eyebrow: "01 / Առաջին մոդել", title: "Ընկերությունների շուկա", steps: [
          { title: "Ընկերության գրանցում", detail: "Ծառայություն մատուցողը ստեղծում է մասնաճյուղը։" },
          { title: "Թիմ և կատալոգ", detail: "Ավելացնում է աշխատակիցներին ու ծառայությունները։" },
          { title: "Վահանակի աշխատանք", detail: "Հարցումները կառավարվում են վեբ վահանակում։" },
        ] },
        { eyebrow: "02 / Թողարկված մոդել", title: "Կենցաղային տեխնիկայի շուկա", steps: [
          { title: "Հաճախորդը նկարագրում է խնդիրը", detail: "Սարքը, բրենդը, հասցեն, նշումներն ու նկարները ձևավորում են հարցումը։" },
          { title: "Անկախ մասնագետը պատասխանում է", detail: "Լիցենզավորված մասնագետը երկրորդ հավելվածում տեսնում ու ընդունում է աշխատանքը։" },
          { title: "Պատվերի միասնական վիճակ", detail: "Երկու կողմն էլ հետևում են ընդունմանը, ճանապարհին, ժամանմանը և ավարտին։" },
        ] },
      ],
    },
  },
  balvoi: {
    en: {
      label: "Interaction map · editorial synthesis",
      title: "AI proposes; the writer remains in control.",
      note: "An explanation of the shipped DeBiasIt screens, not a claim that the model removes bias or that scores measure reader trust.",
      tracks: [{ eyebrow: "DeBiasIt / working sequence", title: "From source to editorial decision", steps: [
        { title: "Set context", detail: "Choose style, reading level and language before submitting source text." },
        { title: "See the process", detail: "Processing stages distinguish completed analysis from work still in progress." },
        { title: "Compare versions", detail: "Read source and recommended text together, then move from summary to detailed measures." },
        { title: "Inspect a sentence", detail: "Review alternatives and their category-score impacts in context." },
        { title: "Choose or rewrite", detail: "Keep a proposed version or write a sentence manually before resubmitting." },
      ] }],
    },
    ru: {
      label: "Карта взаимодействия · редакционное обобщение",
      title: "AI предлагает, автор принимает решение.",
      note: "Объяснение работающих экранов DeBiasIt, а не заявление, что модель устраняет предвзятость или что оценки измеряют доверие читателей.",
      tracks: [{ eyebrow: "DeBiasIt / сценарий", title: "От исходника к редакционному решению", steps: [
        { title: "Задать контекст", detail: "Выбрать стиль, уровень чтения и язык перед отправкой текста." },
        { title: "Видеть обработку", detail: "Этапы отличают готовый анализ от текущей работы." },
        { title: "Сравнить версии", detail: "Читать исходник и рекомендацию рядом, переходить от сводки к деталям." },
        { title: "Изучить предложение", detail: "Оценить варианты и влияние на категории в контексте." },
        { title: "Выбрать или переписать", detail: "Принять предложенный вариант или написать свой перед повторной отправкой." },
      ] }],
    },
    hy: {
      label: "Փոխազդեցության քարտեզ · խմբագրական ամփոփում",
      title: "AI-ն առաջարկում է, հեղինակը որոշում է։",
      note: "Գործող DeBiasIt էկրանների բացատրություն է, ոչ պնդում, որ մոդելը վերացնում է կողմնակալությունը կամ գնահատականները չափում են ընթերցողի վստահությունը։",
      tracks: [{ eyebrow: "DeBiasIt / աշխատանքային ուղի", title: "Բնօրինակից մինչև խմբագրական որոշում", steps: [
        { title: "Սահմանել համատեքստը", detail: "Ընտրել ոճը, ընթերցման մակարդակն ու լեզուն։" },
        { title: "Տեսնել ընթացքը", detail: "Փուլերը տարբերում են ավարտված վերլուծությունն ընթացիկ աշխատանքից։" },
        { title: "Համեմատել տարբերակները", detail: "Բնօրինակն ու առաջարկը կարդալ կողք կողքի և բացել մանրամասները։" },
        { title: "Ուսումնասիրել նախադասությունը", detail: "Դիտել այլընտրանքներն ու գնահատականների ազդեցությունը։" },
        { title: "Ընտրել կամ վերաշարադրել", detail: "Ընդունել տարբերակը կամ գրել սեփականը և նորից ուղարկել։" },
      ] }],
    },
  },
  "xy-ecosystem": {
    en: {
      label: "Ecosystem map · editorial synthesis",
      title: "Several mechanics, one interaction language.",
      note: "The relationships summarise approved pre-production design. They do not imply that the full platform launched or that its proposed transactions occurred.",
      tracks: [
        { eyebrow: "Entry / game", title: "XYGO lottery", steps: [
          { title: "Coordinate grid", detail: "A ticket is assembled through an inspectable selection interface." },
          { title: "Participation", detail: "Purchase terms and verification are shown before commitment." },
        ] },
        { eyebrow: "Connected product surfaces", title: "XY ecosystem", steps: [
          { title: "XY.Market", detail: "Browse assets and inspect marketplace conditions." },
          { title: "Earn and Cybele’s Rite", detail: "Present positions, activity, locks and product-specific risks." },
          { title: "XYU token", detail: "Explain token utility and related actions in the same UI language." },
        ] },
      ],
    },
    ru: {
      label: "Карта экосистемы · редакционное обобщение",
      title: "Разные механики, единый язык взаимодействия.",
      note: "Связи обобщают утверждённый препродакшен-дизайн. Они не означают, что вся платформа запущена или предложенные операции состоялись.",
      tracks: [
        { eyebrow: "Вход / игра", title: "Лотерея XYGO", steps: [
          { title: "Сетка координат", detail: "Билет собирается через понятный интерфейс выбора." },
          { title: "Участие", detail: "Условия покупки и проверка показаны до подтверждения." },
        ] },
        { eyebrow: "Связанные продукты", title: "Экосистема XY", steps: [
          { title: "XY.Market", detail: "Просмотр активов и условий маркетплейса." },
          { title: "Earn и Cybele’s Rite", detail: "Позиции, активность, блокировки и специфические риски." },
          { title: "Токен XYU", detail: "Функции токена и действия в общем UI-языке." },
        ] },
      ],
    },
    hy: {
      label: "Էկոհամակարգի քարտեզ · խմբագրական ամփոփում",
      title: "Տարբեր մեխանիկաներ, մեկ փոխազդեցության լեզու։",
      note: "Կապերը ամփոփում են հաստատված նախաարտադրական դիզայնը։ Դրանք չեն նշանակում, որ ամբողջ հարթակը գործարկվել է կամ առաջարկված գործարքները կատարվել են։",
      tracks: [
        { eyebrow: "Մուտք / խաղ", title: "XYGO վիճակախաղ", steps: [
          { title: "Կոորդինատների ցանց", detail: "Տոմսը կազմվում է ստուգելի ընտրության միջերեսում։" },
          { title: "Մասնակցություն", detail: "Պայմաններն ու ստուգումը երևում են մինչև հաստատումը։" },
        ] },
        { eyebrow: "Կապված պրոդուկտներ", title: "XY էկոհամակարգ", steps: [
          { title: "XY.Market", detail: "Ակտիվների և շուկայի պայմանների դիտում։" },
          { title: "Earn և Cybele’s Rite", detail: "Դիրքեր, ակտիվություն, արգելափակումներ և հատուկ ռիսկեր։" },
          { title: "XYU թոքեն", detail: "Թոքենի դերը և գործողությունները նույն UI լեզվով։" },
        ] },
      ],
    },
  },
};

export default function CaseDecisionMap({ slug, locale }: { slug: string; locale: Locale }) {
  const map = maps[slug]?.[locale];
  if (!map) return null;

  return <section className={styles.section} aria-label={map.label}>
    <div className={styles.intro}><span className={styles.eyebrow}>— {map.label}</span><h3>{map.title}</h3><p>{map.note}</p></div>
    <div className={styles.tracks}>{map.tracks.map((track) => <div className={styles.track} key={track.title}>
      <div className={styles.trackHeader}><span className={styles.eyebrow}>{track.eyebrow}</span><h4>{track.title}</h4></div>
      <ol>{track.steps.map((step, index) => <li key={step.title}><span className={styles.index}>{String(index + 1).padStart(2, "0")}</span><div><strong>{step.title}</strong><p>{step.detail}</p></div></li>)}</ol>
    </div>)}</div>
  </section>;
}
