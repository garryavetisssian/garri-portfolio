import Link from "next/link";
import type { Locale } from "@/lib/i18n/types";
import { meridianCopy, MERIDIAN_REPO } from "@/data/meridian";
import BackToWork from "./BackToWork";
import MeridianPreview from "./MeridianPreview";
import styles from "./MeridianCase.module.css";

const excerpts = [
  { path: "01_agents/03_token_architect.md", text: "Analyze:\n\n- brief.pdf\n- 04_assets/brand/branding_color.png\n- 02_research/research_ux_audit.md\n- 02_research/product_design_direction.md\n\nCreate:\n\n03_tokens/design_tokens.json" },
  { path: "06_ui_design/app.js", text: "r.messages.push({ from: 'employee', text, time: 'Just now' });\nif (r.status === 'waiting' || r.status === 'resolved')\n  r.status = 'with-hr';\nelse if (r.status === 'closed') {\n  r.status = 'with-hr';\n  r.messages.push({\n    from: 'system', text: 'Reopened by your reply'\n  });\n}\nrender();" },
  { path: "06_ui_design/app.js", text: "if (e.target.classList.contains('scrim')) {\n  resetDraft();\n  navigate('/requests');\n  return;\n}\n\nconst actionEl = e.target.closest('[data-action]');\nif (!actionEl) return;\nconst action = actionEl.getAttribute('data-action');" },
];

export default function MeridianCase({ locale }: { locale: Locale }) {
  const c = meridianCopy[locale];
  return <article className={styles.case}>
    <header className={styles.hero}>
      <div className={styles.top}><BackToWork locale={locale} slug="meridian-hr">← {c.back}</BackToWork><span>MERIDIAN HR / 2026</span></div>
      <p className={styles.eyebrow}>{c.eyebrow}</p>
      <div className={styles.heroGrid}>
        <div><h1>{c.title}</h1><p className={styles.lead}>{c.subtitle}</p><a className={styles.button} href={MERIDIAN_REPO} target="_blank" rel="noopener noreferrer"><svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 .7a11.3 11.3 0 0 0-3.57 22c.56.1.77-.24.77-.54v-2.1c-3.15.69-3.82-1.34-3.82-1.34-.51-1.31-1.25-1.66-1.25-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.74 2.66 1.24 3.3.94.1-.74.4-1.24.72-1.53-2.51-.29-5.15-1.26-5.15-5.6 0-1.24.44-2.25 1.16-3.04-.11-.29-.5-1.44.11-3 0 0 .95-.3 3.1 1.16a10.8 10.8 0 0 1 5.64 0c2.15-1.46 3.1-1.16 3.1-1.16.61 1.56.22 2.71.11 3 .72.79 1.16 1.8 1.16 3.04 0 4.35-2.64 5.31-5.16 5.59.4.35.76 1.04.76 2.1v3.12c0 .3.2.65.78.54A11.3 11.3 0 0 0 12 .7Z"/></svg>{c.github}<span aria-hidden="true">↗</span></a></div>
        <div className={styles.terminal}><div className={styles.windowBar}><span aria-hidden="true">● ● ●</span><span>meridian-hr / workspace</span></div><pre>{"01_agents/          role contracts\n02_research/        product reasoning\n03_tokens/          design_tokens.json\n05_design_system/   component architecture\n06_ui_design/       employee prototype\n07_review/          validation notes\n08_landing_page/    B2B prototype"}</pre><p>{c.scope}</p></div>
      </div>
      <div className={styles.stats}>{[6, 8, 2].map((n, i) => <div key={n}><strong>{n.toString().padStart(2, "0")}</strong><span>{c.numbers[i]}</span></div>)}</div>
      <p className={styles.intro}>{c.intro}</p>
    </header>

    <section className={styles.section}><p className={styles.eyebrow}>01 / WORKFLOW</p><h2>{c.pipeline}</h2><p>{c.pipelineText}</p><div className={styles.pipeline}>{c.layers.map((layer, i) => <div key={layer}><span className={styles.phase}>0{i + 1} / {layer}</span>{c.roles.slice(i * 2, i * 2 + 2).map((role, j) => <div className={styles.role} key={role}><span>{String(i * 2 + j + 1).padStart(2, "0")}</span>{role}</div>)}<code>{["02_research/*.md", "03_tokens/design_tokens.json", "06_ui_design + 07_review"][i]}</code></div>)}</div></section>

    <section className={styles.section}><p className={styles.eyebrow}>02 / PRODUCT MODEL</p><h2>{c.brief}</h2><p>{c.briefText}</p><div className={styles.decisions}>{c.decisions.map(([title, body], i) => <div key={title}><span className={styles.index}>0{i + 1}</span><h3>{title}</h3><p>{body}</p></div>)}</div></section>

    <section className={styles.section}><p className={styles.eyebrow}>03 / SYSTEM CONTRACT</p><h2>{c.tokens}</h2><p>{c.tokensText}</p><div className={styles.tokenFlow}>{["color.primitive.neutral.50", "color.semantic.background.canvas", "component.sidebar.background"].map((token, i) => <div key={token}><span>{c.tokenLabels[i]}</span><code>{token}</code><small>{["#F5F7FA", "{color.primitive.neutral.50}", "{color.semantic.background.canvas}"][i]}</small></div>)}</div><a className={styles.source} href={`${MERIDIAN_REPO}/blob/main/03_tokens/design_tokens.json`} target="_blank" rel="noopener noreferrer">03_tokens/design_tokens.json ↗</a></section>

    <section className={styles.section}><p className={styles.eyebrow}>04 / CODE EVIDENCE</p><h2>{c.code}</h2><p>{c.codeText}</p><div className={styles.codeList}>{excerpts.map((snippet, i) => <div className={styles.codeRow} key={i}><div><span className={styles.index}>0{i + 1}</span><h3>{c.codeTitles[i]}</h3><p>{c.codeNotes[i]}</p></div><div className={styles.codeWindow}><a href={`${MERIDIAN_REPO}/blob/main/${snippet.path}`} target="_blank" rel="noopener noreferrer">{snippet.path} ↗</a><pre tabIndex={0}><code>{snippet.text}</code></pre></div></div>)}</div></section>

    <section className={styles.section}><p className={styles.eyebrow}>05 / DELIVERABLES</p><h2>{c.outputs}</h2><p>{c.outputText}</p><div className={styles.outputs}>{[c.portal, c.landing].map((name, i) => <div key={name}><div className={styles.previewHeader}><h3>{name}</h3><a href={`/case-assets/meridian-hr/${i === 0 ? "06_ui_design" : "08_landing_page"}/index.html`} target="_blank" rel="noopener noreferrer">{c.open} ↗</a></div><MeridianPreview title={`${name} — English prototype`} src={`/case-assets/meridian-hr/${i === 0 ? "06_ui_design" : "08_landing_page"}/index.html`} /></div>)}</div><small className={styles.note}>{c.english}</small></section>

    <section className={styles.section}><p className={styles.eyebrow}>06 / REFLECTION</p><div className={styles.reviewGrid}><div><h2>{c.review}</h2><p>{c.reviewText}</p></div><aside><h3>{c.limits}</h3><ul>{c.limitItems.map(item => <li key={item}>{item}</li>)}</ul></aside></div></section>
    <footer className={styles.closing}><h2>{c.closing}</h2><p>{c.closingText}</p><Link href={`/${locale}/work/ai-engineering`}>{c.back} ↗</Link></footer>
  </article>;
}
