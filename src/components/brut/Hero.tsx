"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { Locale } from "@/lib/i18n/types";
import styles from "./Hero.module.css";

const copy = {
  en: {
    eyebrow: "SENIOR PRODUCT DESIGNER / iGAMING + COMPLEX PRODUCTS",
    headline: "I design the systems behind the experience.",
    intro: "I’m Garri Avetisyan. I turn game mechanics, two-sided journeys and complex rules into interfaces people can act on—from product structure and interaction to visual systems and delivery.",
    primary: "Explore iGaming work",
    secondary: "See all 14 cases",
    featured: "01 / SHIPPED GAME",
    project: "Duck Master",
    projectDetail: "One connected Telegram game: progression, cards, social play and a timed market round.",
    status: "SHIPPED · LATER CLOSED",
    read: "Read the case",
    capture: "Actual trading-round capture",
    otherWork: "MORE PRODUCT DEPTH",
    ineed: "Ineed · two-sided service platform",
    balvoi: "BalVoi · live editorial AI product",
  },
  ru: {
    eyebrow: "SENIOR PRODUCT DESIGNER / iGAMING + СЛОЖНЫЕ ПРОДУКТЫ",
    headline: "Проектирую системы, на которых держится опыт.",
    intro: "Я Гарри Аветисян. Превращаю игровые механики, двусторонние сценарии и сложные правила в интерфейсы, с которыми легко действовать — от структуры продукта и взаимодействий до визуальной системы и передачи в разработку.",
    primary: "Смотреть iGaming",
    secondary: "Все 14 кейсов",
    featured: "01 / ЗАПУЩЕННАЯ ИГРА",
    project: "Duck Master",
    projectDetail: "Единая Telegram-игра: прогрессия, карты, социальные сценарии и торговый раунд.",
    status: "ВЫПУЩЕНА · ПОЗЖЕ ЗАКРЫТА",
    read: "Открыть кейс",
    capture: "Реальный экран торгового раунда",
    otherWork: "ДРУГИЕ СЛОЖНЫЕ ПРОДУКТЫ",
    ineed: "Ineed · двусторонняя платформа услуг",
    balvoi: "BalVoi · работающий AI-продукт для редакторов",
  },
  hy: {
    eyebrow: "SENIOR PRODUCT DESIGNER / iGAMING + ԲԱՐԴ ՊՐՈԴՈՒԿՏՆԵՐ",
    headline: "Նախագծում եմ փորձառության հիմքում ընկած համակարգերը։",
    intro: "Ես Գարրի Ավետիսյանն եմ։ Խաղային մեխանիկաները, երկկողմանի հոսքերն ու բարդ կանոնները վերածում եմ գործածելի միջերեսների՝ պրոդուկտի կառուցվածքից ու փոխազդեցությունից մինչև տեսողական համակարգ և փոխանցում մշակմանը։",
    primary: "Տեսնել iGaming նախագծերը",
    secondary: "Բոլոր 14 գործերը",
    featured: "01 / ԹՈՂԱՐԿՎԱԾ ԽԱՂ",
    project: "Duck Master",
    projectDetail: "Միասնական Telegram խաղ՝ առաջընթացով, քարտերով, սոցիալական խաղով և շուկայական փուլով։",
    status: "ԹՈՂԱՐԿՎԵԼ Է · ԱՅԺՄ ՓԱԿՎԱԾ Է",
    read: "Բացել գործը",
    capture: "Առևտրային փուլի իրական էկրան",
    otherWork: "ԱՅԼ ԲԱՐԴ ՊՐՈԴՈՒԿՏՆԵՐ",
    ineed: "Ineed · երկկողմանի ծառայությունների հարթակ",
    balvoi: "BalVoi · գործող AI խմբագրական պրոդուկտ",
  },
} as const;

export default function Hero({ locale }: { locale: Locale }) {
  const { t } = useLanguage();
  const c = copy[locale];

  return <section className="border-b border-line-strong pt-[calc(var(--nav-h)+2.5rem)] pb-10 md:pt-[calc(var(--nav-h)+4rem)] md:pb-14">
    <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)]">
      <div className="flex flex-wrap justify-between gap-3 mono text-ink-mute text-[11px] tracking-[.14em]">
        <span>— {c.eyebrow}</span>
        <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-acid pulse-dot" />{t.hero.available.toUpperCase()}</span>
      </div>

      <div className={`${styles.heroLayout} mt-9 grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(410px,.92fr)] lg:items-center`}>
        <div className={styles.statement}>
          <h1 className={`max-w-[13ch] text-ink font-[family-name:var(--font-display)] font-extrabold leading-[.96] tracking-[-.055em] text-[clamp(3.1rem,6.5vw,7rem)] ${locale === "ru" ? styles.russianHeadline : locale === "hy" ? styles.armenianHeadline : ""}`}>
            {c.headline}
          </h1>
          <p className={`${styles.statementIntro} mt-7 max-w-[58ch] text-ink-mute text-[clamp(1.02rem,1.35vw,1.25rem)] leading-[1.55]`}>{c.intro}</p>
          <div className={`${styles.statementActions} mt-7 flex flex-wrap items-center gap-4`}>
            <Link href={`/${locale}/work/entertainment`} className="inline-flex min-h-12 items-center gap-8 bg-acid px-5 py-3 text-paper hover:opacity-85 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-acid">{c.primary}<span aria-hidden>↗</span></Link>
            <Link href={`/${locale}/work`} className="inline-flex min-h-12 items-center border-b border-ink-mute text-ink hover:border-acid hover:text-acid transition-colors">{c.secondary} ↗</Link>
          </div>
        </div>

        <Link href={`/${locale}/work/duck-master`} className={`${styles.feature} group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-acid`} aria-label={`${c.project}. ${c.projectDetail} ${c.read}`}>
          <div className={styles.featureTop}><span>{c.featured}</span><span>{c.status}</span></div>
          <div className={styles.featureStage}>
            <div className={styles.featureCopy}>
              <span className={styles.featureMark} aria-hidden="true">DM<span>°</span></span>
              <span className={styles.featureTitle}>{c.project}</span>
              <span className={styles.featureDetail}>{c.projectDetail}</span>
            </div>
            <div className={styles.phone}>
              <Image src="/cases/duck-master/evidence/trading-session.jpg" alt={c.capture} width={591} height={1280} sizes="(max-width: 700px) 42vw, 260px" priority />
            </div>
          </div>
          <div className={styles.featureBottom}><span>{c.capture}</span><span>{c.read} ↗</span></div>
        </Link>
      </div>

      <div className={styles.evidencePath}>
        <span className="mono text-ink-mute">— {c.otherWork}</span>
        <Link href={`/${locale}/work/ineed`}>{c.ineed}<span aria-hidden="true">↗</span></Link>
        <Link href={`/${locale}/work/balvoi`}>{c.balvoi}<span aria-hidden="true">↗</span></Link>
      </div>
    </div>
  </section>;
}
