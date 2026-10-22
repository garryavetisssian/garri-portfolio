import type { Locale } from "@/lib/i18n/types";
import styles from "./FlagshipCaseOpening.module.css";

type Copy = {
  kicker: string;
  title: string;
  intro: string;
  source: string;
  chapter: string;
  chapterTitle: string;
  chapterNote: string;
  cards: { label: string; title: string; detail: string; image: string; alt: string }[];
};

const copy: Record<"ineed" | "balvoi", Record<Locale, Copy>> = {
  ineed: {
    en: {
      kicker: "Ineed / released mobile experience",
      title: "One service request. Two sides of the same job.",
      intro: "I designed the original company platform and the later customer and professional apps. The release narrowed a broad marketplace to home-appliance work and gave licensed individuals a direct way to receive jobs.",
      source: "Original product screens supplied by the designer · open each screen full size",
      chapter: "01 / Product-model decision",
      chapterTitle: "The change was structural, not a reskin.",
      chapterNote: "Editorial comparison reconstructed from the original boards, released app screens, and project account—not an original wireframe or a measured funnel.",
      cards: [
        { label: "Before / company platform", title: "Businesses managed the supply", detail: "Companies set up branches, employees and a broad catalogue in a web dashboard.", image: "/cases/ineed/First%20Version/12.webp", alt: "Original Ineed company administration board" },
        { label: "After / customer app", title: "The request became specific", detail: "A customer chooses an appliance task, adds context, and sees a professional with price and distance before connecting.", image: "/cases/ineed/evidence/customer-06.png", alt: "Released customer app showing a professional card over a map" },
        { label: "After / professional app", title: "Independent work became possible", detail: "A professional controls availability, receives the brief, and moves the shared job from acceptance to completion.", image: "/cases/ineed/evidence/pro-04.png", alt: "Released professional app showing a job before acceptance" },
      ],
    },
    ru: {
      kicker: "Ineed / выпущенные приложения", title: "Одна заявка. Две стороны одной работы.",
      intro: "Я спроектировал первую платформу для компаний, а затем приложения клиента и мастера. Новая версия сузила широкий маркетплейс до бытовой техники и открыла получение заказов независимым лицензированным специалистам.",
      source: "Оригинальные экраны, предоставленные дизайнером · каждый можно открыть целиком",
      chapter: "01 / Решение по модели продукта", chapterTitle: "Это была смена структуры, а не просто обновление стиля.",
      chapterNote: "Редакционное сравнение по исходным презентациям, экранам релиза и рассказу о проекте; не оригинальный вайрфрейм и не измеренная воронка.",
      cards: [
        { label: "До / платформа компаний", title: "Предложением управлял бизнес", detail: "Компании добавляли филиалы, сотрудников и широкий каталог услуг в веб-дашборде.", image: "/cases/ineed/First%20Version/12.webp", alt: "Первая версия Ineed: управление компанией" },
        { label: "После / клиент", title: "Запрос стал конкретным", detail: "Клиент выбирает задачу, добавляет детали и видит цену и расстояние до связи с мастером.", image: "/cases/ineed/evidence/customer-06.png", alt: "Приложение клиента: карточка мастера на карте" },
        { label: "После / мастер", title: "Независимая работа стала возможной", detail: "Мастер управляет доступностью, получает детали и ведёт общий заказ до завершения.", image: "/cases/ineed/evidence/pro-04.png", alt: "Приложение мастера: заказ перед принятием" },
      ],
    },
    hy: {
      kicker: "Ineed / թողարկված բջջային փորձառություն", title: "Մեկ հարցում։ Նույն աշխատանքի երկու կողմը։",
      intro: "Ես նախագծել եմ առաջին՝ ընկերությունների հարթակը, ապա հաճախորդի և մասնագետի հավելվածները։ Նոր տարբերակը կենտրոնացավ կենցաղային տեխնիկայի վրա և անկախ լիցենզավորված մասնագետներին պատվեր ստանալու ուղիղ ճանապարհ տվեց։",
      source: "Դիզայների տրամադրած սկզբնական էկրաններ · բացել ամբողջ չափով",
      chapter: "01 / Պրոդուկտի մոդելի որոշում", chapterTitle: "Փոխվեց կառուցվածքը, ոչ միայն տեսքը։",
      chapterNote: "Խմբագրական համեմատություն՝ հիմնված սկզբնական ներկայացումների, թողարկված էկրանների և նախագծի պատմության վրա. ոչ սկզբնական վայերֆրեյմ կամ չափված վորոնկա։",
      cards: [
        { label: "Մինչև / ընկերությունների հարթակ", title: "Ծառայությունը կառավարում էր ընկերությունը", detail: "Ընկերությունները վեբ վահանակում ավելացնում էին մասնաճյուղեր, աշխատակիցներ և ծառայություններ։", image: "/cases/ineed/First%20Version/12.webp", alt: "Ineed-ի առաջին տարբերակի ընկերության վահանակ" },
        { label: "Հետո / հաճախորդ", title: "Հարցումը դարձավ կոնկրետ", detail: "Հաճախորդը նկարագրում է սարքի խնդիրը և մինչև կապը տեսնում է մասնագետի գինն ու հեռավորությունը։", image: "/cases/ineed/evidence/customer-06.png", alt: "Հաճախորդի հավելվածը՝ մասնագետի քարտով" },
        { label: "Հետո / մասնագետ", title: "Անկախ աշխատանքը դարձավ հնարավոր", detail: "Մասնագետը կառավարում է հասանելիությունը և նույն պատվերը տանում է ընդունումից ավարտ։", image: "/cases/ineed/evidence/pro-04.png", alt: "Մասնագետի հավելվածը՝ պատվերի ընդունմամբ" },
      ],
    },
  },
  balvoi: {
    en: {
      kicker: "BalVoi / live in supported regions", title: "AI output is a proposal. The editorial decision stays human.",
      intro: "I designed the publication interface and DeBiasIt as a connected product. The analysis tool does not stop at a generated article: it lets a writer see processing, compare versions, inspect category scores, and edit individual sentences.",
      source: "Original implemented DeBiasIt screens supplied by the designer · open each screen full size",
      chapter: "01 / Editorial control", chapterTitle: "A result that can be questioned, not just accepted.",
      chapterNote: "Editorial reconstruction of the shipped interaction sequence. Example-article scores shown in source captures are not product-impact metrics.",
      cards: [
        { label: "Input and process", title: "Set context, see progress", detail: "Style, reading level and language precede an explicit series of processing states.", image: "/cases/balvoi/evidence/debias-02.png", alt: "DeBiasIt analysis processing states" },
        { label: "Comparison", title: "Keep the source in view", detail: "The writer can compare source and recommended text before moving into detailed analysis.", image: "/cases/balvoi/evidence/debias-04.png", alt: "DeBiasIt source and recommended text comparison" },
        { label: "Sentence control", title: "Review or rewrite the sentence", detail: "Alternatives show category-level score impact; manual rewriting remains available.", image: "/cases/balvoi/evidence/debias-08.png", alt: "DeBiasIt sentence alternatives and manual rewrite interface" },
      ],
    },
    ru: {
      kicker: "BalVoi / работает в доступных регионах", title: "AI предлагает. Редактор принимает решение.",
      intro: "Я спроектировал редакционный сайт и DeBiasIt как связанный продукт. Инструмент не останавливается на генерации статьи: автор видит обработку, сравнивает версии, изучает категории и правит отдельные предложения.",
      source: "Оригинальные внедрённые экраны DeBiasIt · каждый можно открыть целиком",
      chapter: "01 / Контроль автора", chapterTitle: "Результат можно проверить, а не только принять.",
      chapterNote: "Редакционная реконструкция внедрённого сценария. Оценки для примерной статьи на исходных экранах не являются метриками влияния продукта.",
      cards: [
        { label: "Ввод и обработка", title: "Задать контекст и видеть прогресс", detail: "Стиль, уровень чтения и язык предшествуют видимым этапам обработки.", image: "/cases/balvoi/evidence/debias-02.png", alt: "Этапы анализа DeBiasIt" },
        { label: "Сравнение", title: "Оставить исходник рядом", detail: "Автор сравнивает оригинал и рекомендацию до перехода к подробному анализу.", image: "/cases/balvoi/evidence/debias-04.png", alt: "Сравнение оригинала и рекомендации DeBiasIt" },
        { label: "Работа с предложением", title: "Выбрать или переписать", detail: "Альтернативы показывают влияние на категории; ручная правка доступна всегда.", image: "/cases/balvoi/evidence/debias-08.png", alt: "Варианты предложения и ручная правка в DeBiasIt" },
      ],
    },
    hy: {
      kicker: "BalVoi / գործում է հասանելի տարածաշրջաններում", title: "AI-ն առաջարկում է։ Խմբագրական որոշումը մարդու մոտ է։",
      intro: "Ես նախագծել եմ լրատվական կայքն ու DeBiasIt-ը որպես կապակցված պրոդուկտ։ Գործիքը միայն նոր հոդված չի տալիս. հեղինակը տեսնում է ընթացքը, համեմատում տարբերակները, ուսումնասիրում գնահատականները և խմբագրում նախադասությունները։",
      source: "Դիզայների տրամադրած ներդրված DeBiasIt էկրաններ · բացել ամբողջ չափով",
      chapter: "01 / Հեղինակի վերահսկողություն", chapterTitle: "Արդյունք, որը կարելի է ստուգել, ոչ միայն ընդունել։",
      chapterNote: "Ներդրված հոսքի խմբագրական վերակառուցում։ Օրինակ հոդվածի գնահատականները պրոդուկտի ազդեցության չափանիշներ չեն։",
      cards: [
        { label: "Մուտք և մշակում", title: "Սահմանել համատեքստը և տեսնել ընթացքը", detail: "Ոճը, ընթերցման մակարդակն ու լեզուն նախորդում են տեսանելի մշակման փուլերին։", image: "/cases/balvoi/evidence/debias-02.png", alt: "DeBiasIt-ի մշակման փուլերը" },
        { label: "Համեմատություն", title: "Պահել բնօրինակը տեսանելի", detail: "Հեղինակը համեմատում է բնօրինակն ու առաջարկը՝ մանրամասները բացելուց առաջ։", image: "/cases/balvoi/evidence/debias-04.png", alt: "DeBiasIt-ի բնօրինակի և առաջարկի համեմատությունը" },
        { label: "Նախադասության կառավարում", title: "Ընտրել կամ վերաշարադրել", detail: "Այլընտրանքները ցույց են տալիս ազդեցությունն ըստ կատեգորիայի, իսկ ձեռքով խմբագրումը մնում է հասանելի։", image: "/cases/balvoi/evidence/debias-08.png", alt: "DeBiasIt-ի նախադասության տարբերակներն ու ձեռքով խմբագրումը" },
      ],
    },
  },
};

export default function FlagshipCaseOpening({ slug, locale }: { slug: "ineed" | "balvoi"; locale: Locale }) {
  const c = copy[slug][locale];
  return <section className={`${styles.section} ${styles[slug]}`} aria-labelledby={`${slug}-opening-title`}>
    <div className={styles.inner}>
      <div className={styles.intro}><span className={styles.eyebrow}>— {c.kicker}</span><h2 id={`${slug}-opening-title`}>{c.title}</h2><p>{c.intro}</p></div>
      <div className={styles.gallery} aria-label={c.source}>
        {c.cards.slice(1).map((card, index) => <figure className={`${styles.feature} ${index === 1 ? styles.featureSecondary : ""}`} key={card.image}>
          <a href={card.image} target="_blank" rel="noopener noreferrer" aria-label={`${card.alt} — open full size`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={card.image} alt={card.alt} loading={index === 0 ? "eager" : "lazy"} />
            <span className={styles.open} aria-hidden="true">↗</span>
          </a>
          <figcaption><span>{card.label}</span><strong>{card.title}</strong></figcaption>
        </figure>)}
      </div>
      <p className={styles.source}>{c.source}</p>
      <div className={styles.chapterHeading}><span className={styles.eyebrow}>— {c.chapter}</span><h3>{c.chapterTitle}</h3><p>{c.chapterNote}</p></div>
      <div className={styles.plate}>{c.cards.map((card, index) => <article className={styles.plateCard} key={card.label}>
        <span className={styles.plateIndex}>0{index + 1} / {card.label}</span>
        <h4>{card.title}</h4><p>{card.detail}</p>
        <a className={styles.thumbnail} href={card.image} target="_blank" rel="noopener noreferrer" aria-label={`${card.alt} — open full size`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={card.image} alt="" loading="lazy" />
          <span aria-hidden="true">↗</span>
        </a>
      </article>)}</div>
    </div>
  </section>;
}
