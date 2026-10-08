import Image from 'next/image';
import type { Locale } from '@/lib/i18n/types';
import { VIVARO_FIGMA, vivaroCopy } from '@/data/vivaro';
import VivaroScreens from './VivaroScreens';
import BackToWork from './BackToWork';
import styles from './VivaroCase.module.css';

function Board({name,label,width,height,tall=false}:{name:string;label:string;width:number;height:number;tall?:boolean}) {
  return <figure className={styles.board}>
    <a className={tall?styles.tallBoard:styles.boardImage} href={`/cases/vivaro/${name}.webp`} target="_blank" rel="noopener noreferrer" aria-label={`${label} ↗`}>
      <Image src={`/cases/vivaro/${name}.webp`} alt={label} width={width} height={height} sizes="(max-width: 700px) 100vw, 50vw" />
    </a><figcaption><span>{label}</span><span aria-hidden="true">↗</span></figcaption>
  </figure>;
}
export default function VivaroCase({locale}:{locale:Locale}) {
  const c=vivaroCopy[locale];
  return <article className={styles.case}>
    <div className={styles.top}><BackToWork locale={locale} slug="vivaro">← {c.next}</BackToWork><span>{c.kind}</span></div>
    <header className={styles.hero}><div><p className={styles.eyebrow}>VIVARO.ME / PRODUCT DESIGN</p><h1>{c.title}</h1><p className={styles.lead}>{c.subtitle}</p><a className={styles.figma} href={VIVARO_FIGMA} target="_blank" rel="noopener noreferrer">{c.figma} ↗</a></div><div className={styles.heroImage}><Image src="/cases/vivaro/Cover.png" alt="Vivaro.me — Platform reconstruction and redesign" width={3840} height={2160} priority sizes="(max-width: 700px) 100vw, 55vw" /></div></header>
    <div className={styles.facts}><span>{c.role}</span><span>{c.scope}</span><span>2026 / Figma</span></div><p className={styles.intro}>{c.intro}</p>
    <section className={styles.section}><p className={styles.eyebrow}>01 / BRIEF</p><h2>{c.brief}</h2><p>{c.briefText}</p><div className={styles.decisions}>{c.decisions.map(([title,body],i)=><div key={title}><span className={styles.index}>0{i+1}</span><h3>{title}</h3><p>{body}</p></div>)}</div></section>
    <section className={styles.section}><p className={styles.eyebrow}>02 / UX → UI</p><h2>{c.structure}</h2><p>{c.structureText}</p><div className={styles.compare}><Board name="wire-feed" label={c.wire} width={1600} height={3000} tall/><Board name="feed" label={c.final} width={1600} height={5061} tall/></div></section>
    <section className={styles.section}><p className={styles.eyebrow}>03 / EXPERIENCE</p><h2>{c.screens}</h2><p>{c.screensText}</p><VivaroScreens locale={locale}/></section>
    <section className={styles.section}><p className={styles.eyebrow}>04 / CONTENT</p><h2>{c.cards}</h2><p>{c.cardsText}</p><div className={styles.wide}><Board name="cards" label={c.cards} width={1600} height={533}/></div></section>
    <section className={styles.section}><p className={styles.eyebrow}>05 / NAVIGATION</p><h2>{c.navigation}</h2><p>{c.navigationText}</p><div className={styles.grid}><Board name="dock" label={c.navLabels[0]} width={1456} height={1984} tall/><Board name="headers" label={c.navLabels[1]} width={1600} height={1989} tall/></div><div className={styles.wide}><Board name="search" label={c.navLabels[2]} width={1600} height={830}/></div></section>
    <section className={styles.section}><p className={styles.eyebrow}>06 / GAMIFICATION</p><h2>{c.rewards}</h2><p>{c.rewardsText}</p><div className={styles.wide}><Board name="rewards" label={c.rewardLabels[0]} width={1016} height={364}/><Board name="challenges" label={c.rewardLabels[1]} width={1600} height={833}/></div></section>
    <section className={styles.section}><p className={styles.eyebrow}>07 / DESIGN SYSTEM</p><h2>{c.system}</h2><p>{c.systemText}</p><div className={styles.wide}><Board name="palette" label={c.systemLabels[0]} width={1600} height={1449}/></div><div className={styles.grid}><Board name="typography" label={c.systemLabels[1]} width={1600} height={11680} tall/><Board name="buttons" label={c.systemLabels[2]} width={1600} height={6382} tall/></div></section>
    <section className={styles.section}><p className={styles.eyebrow}>08 / REFLECTION</p><h2>{c.reflection}</h2><p>{c.reflectionText}</p><div className={styles.limits}>{c.limits.map(([title,body])=><div key={title}><h3>{title}</h3><p>{body}</p></div>)}</div></section>
    <footer className={styles.closing}><a className={styles.figma} href={VIVARO_FIGMA} target="_blank" rel="noopener noreferrer">{c.figma} ↗</a><BackToWork locale={locale} slug="vivaro">{c.next} →</BackToWork></footer>
  </article>;
}
