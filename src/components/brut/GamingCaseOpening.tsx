import type { Locale } from "@/lib/i18n/types";
import styles from "./GamingCaseOpening.module.css";

type Copy = {
  status: string;
  title: string;
  intro: string;
  firstLabel: string;
  secondLabel: string;
  sourceNote: string;
  decisionLabel: string;
  decisionTitle: string;
  decisionNote: string;
  phases: { name: string; detail: string }[];
};

const content: Record<"duck-master" | "xy-ecosystem", Record<Locale, Copy>> = {
  "duck-master": {
    en: {
      status: "Released Telegram game · later closed", title: "A whole game around one recognisable character.",
      intro: "I designed Duck Master's connected progression, cards, market, social and onboarding experiences, and the visual system that carried the duck across them. The released game closed roughly a year later; one trading-round redesign is examined below as a slice of that wider work.",
      firstLabel: "Original project board / progression and cards", secondLabel: "Original released screen / timed market round",
      sourceNote: "Supplied product capture and original project board. Open either source full size.",
      decisionLabel: "01 / One interaction decision", decisionTitle: "Trading tension without a trading terminal.",
      decisionNote: "Editorial diagram of the released round based on the designer's account and supplied capture; not a measured conversion funnel or a claim of retention impact.",
      phases: [
        { name: "Read the line", detail: "A moving price line and fixed threshold give the player one visible question." },
        { name: "Choose a side", detail: "Within ten seconds, predict whether the line will finish above or below the threshold." },
        { name: "Lock the stake", detail: "The bet closes before the result; the countdown makes the commitment explicit." },
        { name: "Resolve the round", detail: "The final line position determines loss or a variable payout—not a real coin purchase." },
      ],
    },
    ru: {
      status: "Выпущенная Telegram-игра · позже закрыта", title: "Целая игра вокруг узнаваемого персонажа.",
      intro: "Я спроектировал связанную систему Duck Master: прогрессию, карты, рынок, социальные сценарии, онбординг и визуальный язык персонажа. Игра была выпущена и закрылась примерно через год; ниже торговый раунд разобран как часть этой более широкой работы.",
      firstLabel: "Исходная презентация / прогрессия и карты", secondLabel: "Экран выпущенного продукта / торговый раунд",
      sourceNote: "Предоставленный экран продукта и исходная презентация. Оба открываются целиком.",
      decisionLabel: "01 / Одно решение во взаимодействии", decisionTitle: "Напряжение торговли без торгового терминала.",
      decisionNote: "Редакционная схема выпущенного раунда по рассказу дизайнера и экрану; не измеренная воронка и не доказательство влияния на удержание.",
      phases: [
        { name: "Прочитать линию", detail: "Движущаяся линия и постоянный порог задают один видимый вопрос." },
        { name: "Выбрать сторону", detail: "За десять секунд предположить, где окажется линия — выше или ниже порога." },
        { name: "Зафиксировать ставку", detail: "Ставки закрываются до результата; таймер показывает момент решения." },
        { name: "Получить результат", detail: "Конечная позиция определяет потерю или переменную выплату, а не покупку реальной монеты." },
      ],
    },
    hy: {
      status: "Թողարկված Telegram խաղ · հետո փակվել է", title: "Մի ամբողջ խաղ՝ ճանաչելի կերպարի շուրջ։",
      intro: "Ես նախագծել եմ Duck Master-ի առաջընթացը, քարտերը, շուկան, սոցիալական հոսքերն ու օնբորդինգը, ինչպես նաև կերպարի միասնական վիզուալ համակարգը։ Խաղը թողարկվել է և մոտ մեկ տարի անց փակվել. ստորև առևտրային փուլի փոփոխությունն այդ մեծ աշխատանքի մի մասն է։",
      firstLabel: "Սկզբնական ներկայացում / առաջընթաց և քարտեր", secondLabel: "Թողարկված էկրան / շուկայական փուլ",
      sourceNote: "Տրամադրված պրոդուկտի էկրան և սկզբնական ներկայացում։ Երկուսն էլ բացվում են ամբողջ չափով։",
      decisionLabel: "01 / Փոխազդեցության մեկ որոշում", decisionTitle: "Շուկայի լարվածություն՝ առանց բարդ տերմինալի։",
      decisionNote: "Թողարկված փուլի խմբագրական սխեմա՝ դիզայների պատմության և էկրանի հիման վրա, ոչ չափված վորոնկա կամ պահպանման արդյունքի ապացույց։",
      phases: [
        { name: "Կարդալ գիծը", detail: "Շարժվող գիծն ու հաստատուն շեմը տալիս են մեկ տեսանելի հարց։" },
        { name: "Ընտրել կողմը", detail: "Տասը վայրկյանում կանխատեսել՝ գիծը շեմից վերև, թե ներքև կլինի։" },
        { name: "Փակել խաղադրույքը", detail: "Խաղադրույքն ավարտվում է արդյունքից առաջ, իսկ ժամանակաչափը հստակեցնում է պահը։" },
        { name: "Տեսնել արդյունքը", detail: "Վերջնական դիրքը որոշում է կորուստը կամ փոփոխական վճարումը, ոչ իրական մետաղադրամի գնումը։" },
      ],
    },
  },
  "xy-ecosystem": {
    en: {
      status: "Approved product direction · pre-production", title: "A shared language for different mechanics.",
      intro: "I designed the connected UX/UI system for XYGO, XY.Market, Earn, Cybele's Rite and XYU. The work links playful selection to dense asset and transaction views, while letting each product explain its own rules. The full ecosystem is not launched; these are approved design and pre-production screens.",
      firstLabel: "Approved design / XYGO lottery across devices", secondLabel: "Approved design / XY.Market asset discovery",
      sourceNote: "Original approved product boards, not live adoption or transaction evidence. Open either source full size.",
      decisionLabel: "01 / Cross-product rule", decisionTitle: "Consistency stops before it obscures risk.",
      decisionNote: "Editorial synthesis of approved screens and project account. These connected patterns are design decisions, not a claim that users completed transactions.",
      phases: [
        { name: "Choose", detail: "XYGO makes a coordinate and ticket selection visible before commitment." },
        { name: "Inspect", detail: "Marketplace pages expose an asset's position, price, status and activity in one place." },
        { name: "Understand", detail: "Each protocol keeps its own mechanics, fees, locks and risk information explicit." },
        { name: "Commit", detail: "Terms and verification appear before a proposed purchase, not after it." },
      ],
    },
    ru: {
      status: "Согласованный дизайн · препродакшен", title: "Общий язык для разных механик.",
      intro: "Я спроектировал общую UX/UI-систему для XYGO, XY.Market, Earn, Cybele's Rite и XYU. Она связывает игровой выбор с насыщенными страницами активов и операций, сохраняя особые правила каждого продукта. Полная экосистема ещё не запущена; это согласованные экраны дизайна и препродакшена.",
      firstLabel: "Согласованный дизайн / XYGO на разных экранах", secondLabel: "Согласованный дизайн / поиск активов XY.Market",
      sourceNote: "Исходные согласованные материалы, не свидетельство реальных операций или аудитории. Оба открываются целиком.",
      decisionLabel: "01 / Сквозное правило", decisionTitle: "Единообразие не должно скрывать риск.",
      decisionNote: "Редакционное обобщение согласованных экранов и рассказа о проекте. Общие паттерны — дизайн-решения, не заявление о выполненных операциях.",
      phases: [
        { name: "Выбрать", detail: "XYGO показывает координату и билет до подтверждения." },
        { name: "Изучить", detail: "Страница актива объединяет позицию, цену, статус и активность." },
        { name: "Понять", detail: "Каждый протокол отдельно объясняет механику, комиссии, блокировки и риски." },
        { name: "Подтвердить", detail: "Условия и проверка предшествуют предполагаемой покупке." },
      ],
    },
    hy: {
      status: "Հաստատված դիզայն · նախաարտադրական փուլ", title: "Ընդհանուր լեզու՝ տարբեր մեխանիկաների համար։",
      intro: "Ես նախագծել եմ XYGO-ի, XY.Market-ի, Earn-ի, Cybele's Rite-ի և XYU-ի կապակցված UX/UI համակարգը։ Այն խաղային ընտրությունը կապում է ակտիվների և գործարքների խիտ էկրաններին՝ պահպանելով յուրաքանչյուր պրոդուկտի կանոնները։ Ամբողջ էկոհամակարգը դեռ չի գործարկվել. դրանք հաստատված դիզայնի և նախաարտադրական էկրաններ են։",
      firstLabel: "Հաստատված դիզայն / XYGO տարբեր սարքերում", secondLabel: "Հաստատված դիզայն / XY.Market ակտիվների դիտում",
      sourceNote: "Հաստատված սկզբնական նախագծային նյութեր, ոչ գործարքների կամ լսարանի ապացույց։ Բացել ամբողջ չափով։",
      decisionLabel: "01 / Ընդհանուր կանոն", decisionTitle: "Համահունչությունը չպետք է թաքցնի ռիսկը։",
      decisionNote: "Հաստատված էկրանների և նախագծի պատմության խմբագրական ամփոփում։ Պատերնները դիզայնի որոշումներ են, ոչ կատարված գործարքների պնդում։",
      phases: [
        { name: "Ընտրել", detail: "XYGO-ն ցույց է տալիս կոորդինատն ու տոմսը մինչև հաստատումը։" },
        { name: "Ուսումնասիրել", detail: "Ակտիվի էջը միավորում է դիրքը, գինը, վիճակն ու ակտիվությունը։" },
        { name: "Հասկանալ", detail: "Յուրաքանչյուր պրոտոկոլ բացատրում է մեխանիկան, վճարները, արգելափակումներն ու ռիսկերը։" },
        { name: "Հաստատել", detail: "Պայմաններն ու ստուգումը նախորդում են նախատեսված գնմանը։" },
      ],
    },
  },
};

const imagery = {
  "duck-master": [
    { src: "/cases/duck-master/1.webp", alt: "Original Duck Master project board showing the character, cards and progression", className: "game" },
    { src: "/cases/duck-master/evidence/trading-session.jpg", alt: "Released Duck Master market round in Telegram", className: "round" },
  ],
  "xy-ecosystem": [
    { src: "/cases/xy-ecosystem/1%20XYGO%20-%20WEB3%20Lottery/6.webp", alt: "Approved XYGO desktop and mobile UI board", className: "lottery" },
    { src: "/cases/xy-ecosystem/2%20XY%20Protocols/3.webp", alt: "Approved XY.Market collection interface board", className: "market" },
  ],
} as const;

export default function GamingCaseOpening({ slug, locale }: { slug: "duck-master" | "xy-ecosystem"; locale: Locale }) {
  const c = content[slug][locale];
  const images = imagery[slug];
  return <section className={`${styles.section} ${slug === "duck-master" ? styles.duck : styles.xy}`} aria-labelledby={`${slug}-product-opening`}>
    <div className={styles.inner}>
      <div className={styles.intro}>
        <span className={styles.status}>— {c.status}</span>
        <h2 id={`${slug}-product-opening`}>{c.title}</h2>
        <p>{c.intro}</p>
      </div>
      <div className={styles.visuals}>
        {images.map((item, i) => <figure className={`${styles.visual} ${styles[item.className]}`} key={item.src}>
          <a href={item.src} target="_blank" rel="noopener noreferrer" aria-label={`${item.alt} — open full size`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.src} alt={item.alt} loading={i === 0 ? "eager" : "lazy"} />
            <span className={styles.open} aria-hidden="true">↗</span>
          </a>
          <figcaption>{i === 0 ? c.firstLabel : c.secondLabel}</figcaption>
        </figure>)}
      </div>
      <p className={styles.source}>{c.sourceNote}</p>
      <div className={styles.decision}>
        <div className={styles.decisionIntro}><span className={styles.kicker}>— {c.decisionLabel}</span><h3>{c.decisionTitle}</h3><p>{c.decisionNote}</p></div>
        <ol className={styles.phases}>{c.phases.map((phase, i) => <li key={phase.name}><span>0{i + 1}</span><strong>{phase.name}</strong><p>{phase.detail}</p></li>)}</ol>
      </div>
    </div>
  </section>;
}
