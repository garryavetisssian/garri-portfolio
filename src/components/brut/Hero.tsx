"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { Locale } from "@/lib/i18n/types";

const copy = {
  en: {
    eyebrow: "SENIOR PRODUCT DESIGNER / iGAMING + COMPLEX PRODUCTS",
    headline: "I design the systems behind the experience.",
    intro: "I’m Garri Avetisyan. I turn game mechanics, two-sided journeys and complex product rules into interfaces people can understand and use. I own the work from product structure through visual system and delivery.",
    primary: "Explore iGaming work",
    secondary: "See all 14 cases",
    featured: "START HERE / SHIPPED GAME",
    project: "Duck Master",
    projectDetail: "A Telegram game spanning progression, cards and market play. It launched, then closed roughly a year later.",
    status: "NOW CLOSED",
    read: "Read the case",
    proof: "The portfolio distinguishes shipped work—including products that later closed—from approved pre-production and independent concepts. Outcomes are labelled by source and scope.",
  },
  ru: {
    eyebrow: "SENIOR PRODUCT DESIGNER / iGAMING + СЛОЖНЫЕ ПРОДУКТЫ",
    headline: "Проектирую системы, на которых держится опыт.",
    intro: "Я Гарри Аветисян. Превращаю игровые механики, двусторонние сценарии и сложные правила продукта в понятные интерфейсы. Отвечаю за путь от структуры продукта до визуальной системы и передачи в разработку.",
    primary: "Смотреть iGaming",
    secondary: "Все 14 кейсов",
    featured: "НАЧНИТЕ ЗДЕСЬ / ЗАПУЩЕННАЯ ИГРА",
    project: "Duck Master",
    projectDetail: "Telegram-игра с прогрессией, картами и торговым раундом. После запуска проект закрылся примерно через год.",
    status: "ЗАКРЫТА",
    read: "Открыть кейс",
    proof: "В портфолио различаются запущенные продукты — включая закрывшиеся позже, — утверждённый препродакшен и независимые концепты. Результаты подписаны с указанием источника и границ данных.",
  },
  hy: {
    eyebrow: "SENIOR PRODUCT DESIGNER / iGAMING + ԲԱՐԴ ՊՐՈԴՈՒԿՏՆԵՐ",
    headline: "Նախագծում եմ փորձառության հիմքում ընկած համակարգերը։",
    intro: "Ես Գարրի Ավետիսյանն եմ։ Խաղային մեխանիկաները, երկկողմանի հոսքերն ու բարդ կանոնները վերածում եմ հասկանալի միջերեսների։ Աշխատում եմ կառուցվածքից մինչև տեսողական համակարգ և փոխանցում մշակմանը։",
    primary: "Տեսնել iGaming նախագծերը",
    secondary: "Բոլոր 14 գործերը",
    featured: "ՍԿՍԵՔ ԱՅՍՏԵՂԻՑ / ԹՈՂԱՐԿՎԱԾ ԽԱՂ",
    project: "Duck Master",
    projectDetail: "Telegram խաղ՝ առաջընթացով, քարտերով և շուկայական փուլով։ Թողարկումից մոտ մեկ տարի անց այն փակվեց։",
    status: "ՓԱԿՎԱԾ Է",
    read: "Բացել գործը",
    proof: "Պորտֆոլիոն տարանջատում է թողարկված աշխատանքը՝ ներառյալ հետագայում փակված պրոդուկտները, հաստատված նախաարտադրությունն ու անկախ կոնցեպտները։ Արդյունքները նշված են աղբյուրով ու սահմաններով։",
  },
} as const;

export default function Hero({ locale }: { locale: Locale }) {
  const { t } = useLanguage();
  const c = copy[locale];

  return <section className="border-b border-line-strong pt-[calc(var(--nav-h)+3rem)] pb-14 md:pt-[calc(var(--nav-h)+5rem)] md:pb-20">
    <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)]">
      <div className="flex flex-wrap justify-between gap-3 mono text-ink-mute text-[11px] tracking-[.14em]">
        <span>— {c.eyebrow}</span>
        <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-acid pulse-dot" />{t.hero.available.toUpperCase()}</span>
      </div>

      <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1.45fr)_minmax(290px,.55fr)] lg:items-end">
        <div>
          <h1 className="max-w-[12ch] text-ink font-[family-name:var(--font-display)] font-extrabold leading-[.95] tracking-[-.06em] text-[clamp(3.4rem,8.2vw,8.8rem)]">
            {c.headline}
          </h1>
          <p className="mt-8 max-w-[62ch] text-ink-mute text-[clamp(1.05rem,1.55vw,1.4rem)] leading-[1.5]">{c.intro}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href={`/${locale}/work/entertainment`} className="inline-flex min-h-12 items-center gap-8 bg-acid px-5 py-3 text-paper hover:opacity-85 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-acid">{c.primary}<span aria-hidden>↗</span></Link>
            <Link href={`/${locale}/work`} className="inline-flex min-h-12 items-center border-b border-ink-mute text-ink hover:border-acid hover:text-acid transition-colors">{c.secondary} ↗</Link>
          </div>
        </div>

        <Link href={`/${locale}/work/duck-master`} className="group block border border-line-strong bg-paper-soft p-5 md:p-7 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-acid">
          <div className="flex justify-between gap-3 mono text-[10px] tracking-[.13em] text-ink-mute"><span>{c.featured}</span><span className="text-acid">{c.status}</span></div>
          <div className="mt-12 border-t border-line-strong pt-5">
            <span className="block text-[clamp(2rem,3.4vw,3.6rem)] font-[family-name:var(--font-display)] font-bold leading-none tracking-[-.05em] text-ink">{c.project}<span className="text-acid">.</span></span>
            <p className="mt-4 max-w-[36ch] text-ink-mute leading-[1.5]">{c.projectDetail}</p>
            <span className="mt-8 flex justify-between border-t border-line-strong pt-4 mono text-xs text-ink group-hover:text-acid transition-colors"><span>{c.read}</span><span aria-hidden>↗</span></span>
          </div>
        </Link>
      </div>

      <p className="mt-16 max-w-[90ch] border-t border-line-strong pt-4 mono text-[11px] leading-[1.7] text-ink-mute">{c.proof}</p>
    </div>
  </section>;
}
