'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Locale } from '@/lib/i18n/types';
import { kenoCopy } from '@/data/keno';
import BackToWork from './BackToWork';
import s from './KenoCase.module.css';

function Artwork({src,alt,width=1672,height=941,priority=false}:{src:string;alt:string;width?:number;height?:number;priority?:boolean}) {
  const sizes = width === 518 ? '(max-width: 700px) 50vw, 22vw' : width === 920 ? '40vw' : width === 1254 || width === 1834 || width === 664 ? '(max-width: 700px) 100vw, 50vw' : '(max-width: 1440px) 100vw, 1440px';
  return <Image src={src} alt={alt} width={width} height={height} priority={priority} sizes={sizes} className={s.image}/>;
}

export default function KenoCase({locale}:{locale:Locale}) {
  const c=kenoCopy[locale];
  const [result,setResult]=useState(false);
  const [fullResult,setFullResult]=useState(false);
  return <article className={s.case}>
    <div className={s.top}><BackToWork locale={locale} slug="keno">← {c.back}</BackToWork><span>KENO / {c.role}</span></div>
    <header className={s.hero}><h1 className={s.srOnly}>KENO — {c.subtitle}</h1><Artwork src="/cases/keno/Cover.png" alt="KENO — gold lettering, lottery balls and a neon waterfront" priority/></header>
    <nav className={s.nav} aria-label="KENO"><span>KENO</span>{c.nav.map((label,i)=><a key={label} href={`#${['experience','motion','grid','details'][i]}`}>{label}</a>)}</nav>
    <div className={s.intro}><p className={s.eyebrow}>{c.role}</p><h2>{c.subtitle}</h2><p>{c.intro}</p><div className={s.facts}>{['80','20','04'].map((n,i)=><div key={n}><strong>{n}</strong><span>{c.count[i]}</span></div>)}</div></div>
    <section id="experience" className={s.section}><div className={s.heading}><span className={s.eyebrow}>01 / KENO</span><h2>{c.overview}</h2><p>{c.overviewText}</p></div><figure className={s.wide}><Artwork src="/cases/keno/Slide%201.png" alt={c.overview}/></figure>
      <div className={s.controls}>{[c.ready,c.result].map((label,i)=><button key={label} type="button" aria-pressed={fullResult===!!i} onClick={()=>setFullResult(!!i)}>{label}</button>)}</div>
      <a className={s.screen} href={`/case-assets/keno/screen-${fullResult?'result':'locked'}.png`} target="_blank" rel="noopener noreferrer" aria-label={`${c.open}: ${fullResult?c.result:c.ready}`}><Artwork src={`/case-assets/keno/screen-${fullResult?'result':'locked'}.png`} alt={fullResult?c.result:c.ready} width={3840} height={1828}/></a>
    </section>
    <section id="motion" className={s.section}><div className={s.heading}><span className={s.eyebrow}>02 / FILM</span><h2>{c.film}</h2><p>{c.filmText}</p></div><video className={s.video} src="/cases/keno/KENO.mov" poster="/cases/keno/Slide%201.png" controls playsInline preload="metadata" aria-label={`KENO — ${c.film}`}/></section>
    <section id="grid" className={`${s.section} ${s.split}`}><div className={s.sticky}><span className={s.eyebrow}>03 / 10 × 8</span><h2>{c.grid}</h2><p>{c.gridText}</p><div className={s.controls}>{[c.ready,c.result].map((label,i)=><button key={label} type="button" aria-pressed={result===!!i} onClick={()=>setResult(!!i)}>{label}</button>)}</div><div className={s.tile}><Artwork src="/case-assets/keno/tile-states.png" alt={c.tiles} width={664} height={184}/></div></div><div className={s.black}><Artwork src={`/case-assets/keno/grid-${result?'result':'ready'}.png`} alt={result?c.result:c.ready} width={1224} height={1172}/></div></section>
    <section className={s.section}><div className={s.heading}><span className={s.eyebrow}>04 / 00 → 20</span><h2>{c.draw}</h2><p>{c.drawText}</p></div><div className={s.draws}>{['empty','complete'].map((state,i)=><figure key={state}><figcaption>{i?'20 / 20':'00 / 20'}</figcaption><Artwork src={`/case-assets/keno/draw-${state}.png`} alt={i?c.result:c.ready} width={1224} height={i?214:218}/></figure>)}</div></section>
    <section id="details" className={`${s.section} ${s.split}`}><div><span className={s.eyebrow}>05 / UI</span><h2>{c.detail}</h2><p>{c.detailText}</p><div className={s.balls}><Artwork src="/cases/keno/Slide%202.png" alt="KENO — gold numbered ball artwork" width={1254} height={1254}/></div></div><figure className={s.statistics}><Artwork src="/case-assets/keno/statistics.png" alt={c.stats} width={1834} height={1748}/><figcaption>{c.statsNote}</figcaption></figure></section>
    <section className={s.section}><div className={s.heading}><span className={s.eyebrow}>06 / BETSLIP</span><h2>{c.bets}</h2><p>{c.betsText}</p></div><div className={s.betPanels}>{['bets-empty','bets-placed','quick-bet'].map((name,i)=><figure key={name}><div><Artwork src={`/case-assets/keno/${name}.png`} alt={c.betLabels[i]} width={i===2?518:920} height={1662}/></div><figcaption><span>0{i+1}</span>{c.betLabels[i]}</figcaption></figure>)}</div></section>
    <section className={s.section}><div className={s.heading}><span className={s.eyebrow}>07 / RESULT</span><h2>{c.finish}</h2><p>{c.finishText}</p></div><figure className={s.wide}><Artwork src="/cases/keno/Slide%203.png" alt={c.finish}/></figure></section>
    <footer className={s.footer}><span>KENO / {c.role}</span><BackToWork locale={locale} slug="keno">{c.back} ↗</BackToWork></footer>
  </article>;
}
