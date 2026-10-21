import type { Locale } from "@/lib/i18n/types";
import { getCaseEvidence } from "@/data/case-evidence";
import { getCaseMetrics } from "@/data/case-metrics";
import { getCaseScope } from "@/data/case-scope";
import { getCaseSequences } from "@/data/case-sequences";
import CaseDecisionMap from "./CaseDecisionMap";
import styles from "./CaseEvidencePanel.module.css";

const labels = {
  en: { overview: "The whole project", ownership: "What I designed", system: "The product system", focus: "One decision in context", problem: "Context", decision: "Design response", tradeoff: "Trade-off", result: "Product status and outcome", context: "How to read this", reflection: "What I would measure next", evidence: "Selected interface flows", open: "Open full-size screen", step: "Step", gallery: "More of the work" },
  ru: { overview: "Весь проект", ownership: "Что я спроектировал", system: "Система продукта", focus: "Одно решение в контексте", problem: "Контекст", decision: "Дизайн-решение", tradeoff: "Компромисс", result: "Статус и результат", context: "Как это понимать", reflection: "Что я измерял бы дальше", evidence: "Выбранные сценарии", open: "Открыть экран целиком", step: "Шаг", gallery: "Остальная работа" },
  hy: { overview: "Ամբողջ նախագիծը", ownership: "Իմ նախագծածը", system: "Պրոդուկտի համակարգը", focus: "Մեկ որոշում՝ համատեքստում", problem: "Համատեքստ", decision: "Դիզայնի լուծում", tradeoff: "Փոխզիջում", result: "Վիճակ և արդյունք", context: "Ինչպես հասկանալ", reflection: "Ինչը կչափեի հաջորդ անգամ", evidence: "Ընտրված հոսքեր", open: "Բացել ամբողջ էկրանը", step: "Քայլ", gallery: "Աշխատանքի մյուս մասը" },
};

const duckComparison = {
  en: { before: "Original trading model", beforeDetail: "Read the chart, then decide when to buy or sell a coin.", after: "Designed directional round", afterDetail: "Choose above or below a visible threshold within ten seconds; the final position determines the outcome." },
  ru: { before: "Исходная торговая модель", beforeDetail: "Прочитать график и выбрать момент покупки или продажи монеты.", after: "Раунд с выбором направления", afterDetail: "За десять секунд выбрать выше или ниже видимого порога; финальная позиция определяет результат." },
  hy: { before: "Սկզբնական առևտրային մոդել", beforeDetail: "Կարդալ գրաֆիկը և ընտրել մետաղադրամը գնելու կամ վաճառելու պահը։", after: "Ուղղության ընտրության փուլ", afterDetail: "Տասը վայրկյանում ընտրել տեսանելի սահմանից վերև կամ ներքև. վերջնական դիրքը որոշում է արդյունքը։" },
};

export default function CaseEvidencePanel({ slug, locale }: { slug: string; locale: Locale }) {
  const scope = getCaseScope(slug, locale);
  const evidence = getCaseEvidence(slug, locale);
  if (!scope || !evidence) return null;
  const metrics = getCaseMetrics(slug, locale);
  const t = labels[locale];
  const sequences = getCaseSequences(slug, locale);
  const focus = [
    { label: t.problem, content: evidence.problem },
    { label: t.decision, content: evidence.decision },
    { label: t.tradeoff, content: evidence.tradeoff },
  ];

  return <section className={styles.section} aria-labelledby={`${slug}-scope-heading`}>
    <div className={styles.inner}>
      <div className={styles.top}><span className={styles.eyebrow}>— {t.overview}</span><span className={styles.status}>{evidence.status}</span></div>
      <h2 id={`${slug}-scope-heading`} className={styles.heading}>{scope.headline}</h2>
      <p className={styles.summary}>{scope.summary}</p>

      <div className={styles.ownership}>
        <span className={styles.eyebrow}>— {t.ownership}</span>
        <ul>{scope.ownership.map(item => <li key={item}>{item}</li>)}</ul>
      </div>

      {metrics && <section className={styles.metrics} aria-labelledby={`${slug}-metrics-heading`}>
        <div className={styles.metricsHeader}>
          <h3 id={`${slug}-metrics-heading`}>{metrics.heading}</h3>
          <p>{metrics.context}</p>
        </div>
        <dl className={styles.metricGrid}>{metrics.items.map(item => <div className={styles.metric} key={item.label}>
          <dt>{item.label}</dt><dd>{item.value}</dd>
        </div>)}</dl>
      </section>}

      <section className={styles.system} aria-labelledby={`${slug}-system-heading`}>
        <span className={styles.eyebrow}>— {t.system}</span>
        <h3 id={`${slug}-system-heading`}>{t.system}</h3>
        <div className={styles.systemGrid}>{scope.workstreams.map((stream, index) => <div className={styles.systemItem} key={stream.title}>
          <span className={styles.stepIndex}>0{index + 1}</span><h4>{stream.title}</h4><p>{stream.description}</p>
        </div>)}</div>
      </section>

      <CaseDecisionMap slug={slug} locale={locale} />

      <section className={styles.focus} aria-labelledby={`${slug}-focus-heading`}>
        <span className={styles.eyebrow}>— {t.focus}</span>
        <h3 id={`${slug}-focus-heading`}>{scope.focusTitle}</h3>
        <div className={styles.steps}>{focus.map((item, index) => <div className={styles.step} key={item.label}>
          <span className={styles.stepIndex}>0{index + 1} / {item.label}</span><p>{item.content}</p>
        </div>)}</div>
        {slug === "duck-master" && <div className={styles.decisionColumns}>
          <div><span>01 / {duckComparison[locale].before}</span><p>{duckComparison[locale].beforeDetail}</p></div>
          <div><span>02 / {duckComparison[locale].after}</span><p>{duckComparison[locale].afterDetail}</p></div>
        </div>}
      </section>

      <div className={styles.result}><div><span className={styles.eyebrow}>— {t.result}</span><p className={styles.resultText}>{evidence.result}</p></div><div className={styles.context}><span className={styles.eyebrow}>— {t.context}</span><p>{evidence.resultContext}</p></div></div>
      {evidence.reflection && <div className={styles.reflection}><span className={styles.eyebrow}>— {t.reflection}</span><p>{evidence.reflection}</p></div>}

      {sequences.length > 0 && <div className={styles.evidenceIntro}><span className={styles.eyebrow}>— {t.evidence}</span><p>{scope.visualIntro}</p></div>}
      {sequences.map((sequence, sequenceIndex) => <section className={styles.sequence} key={sequence.title} aria-labelledby={`${slug}-sequence-${sequenceIndex}`}>
        <div className={styles.sequenceHeader}><div><span className={styles.eyebrow}>— {t.evidence} / 0{sequenceIndex + 1}</span><h3 id={`${slug}-sequence-${sequenceIndex}`}>{sequence.title}</h3></div><p>{sequence.intro}</p></div>
        <div className={styles.frameRail} role="group" aria-label={sequence.title}>{sequence.frames.map((frame, index) => <figure className={`${styles.frame} ${frame.shape === "desktop" ? styles.frameDesktop : styles.framePhone}`} key={frame.src}>
          <a href={frame.src} target="_blank" rel="noopener noreferrer" aria-label={`${t.open}: ${frame.title}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={frame.src} alt={`${frame.title}: ${frame.detail}`} loading="lazy" style={frame.focusY === undefined ? undefined : { objectPosition: `center ${frame.focusY}%` }} />
            <span className={styles.frameOpen}>↗</span>
          </a>
          <figcaption><span>{t.step} {String(index + 1).padStart(2, "0")} / {String(sequence.frames.length).padStart(2, "0")}</span><strong>{frame.title}</strong><p>{frame.detail}</p></figcaption>
        </figure>)}</div>
      </section>)}
      <p className={styles.galleryLead}><span className={styles.eyebrow}>— {t.gallery}</span>{sequences.length === 0 && <span>{scope.visualIntro}</span>}</p>
    </div>
  </section>;
}
