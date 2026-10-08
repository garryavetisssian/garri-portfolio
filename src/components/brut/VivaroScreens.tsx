"use client";
import { useId, useRef, useState } from 'react';
import Image from 'next/image';
import type { Locale } from '@/lib/i18n/types';
import { vivaroCopy } from '@/data/vivaro';
import styles from './VivaroCase.module.css';

const screens=[['feed',3142,9389],['casino',3667,10736],['live',2698,9555],['sports',3247,6067]] as const;
export default function VivaroScreens({locale}:{locale:Locale}) {
  const c=vivaroCopy[locale];
  const [active,setActive]=useState(0);
  const id=useId();
  const refs=useRef<(HTMLButtonElement|null)[]>([]);
  const [name,desktopHeight,mobileHeight]=screens[active];
  return <div className={styles.screenViewer}>
    <div className={styles.tabs} role="tablist" aria-label={c.screens}>
      {c.screenLabels.map((label,i)=><button key={label} type="button" role="tab" id={`${id}-tab-${i}`} aria-selected={active===i} aria-controls={`${id}-panel`} tabIndex={active===i?0:-1} ref={el=>{refs.current[i]=el;}} onClick={()=>setActive(i)} onKeyDown={event=>{
        const next=event.key==='ArrowRight'?(i+1)%4:event.key==='ArrowLeft'?(i+3)%4:event.key==='Home'?0:event.key==='End'?3:undefined;
        if(next!==undefined){event.preventDefault();setActive(next);refs.current[next]?.focus();}
      }}>{label}</button>)}
    </div>
    <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`} tabIndex={0}>
      <p className={styles.viewerNote}>{c.screenNotes[active]}</p>
      <div className={styles.screenPair} key={name}>
        {([['desktop',1600,desktopHeight,c.desktop],['mobile',600,mobileHeight,c.mobile]] as const).map(([device,width,height,label])=><figure key={device}>
          <figcaption>{label}<a href={`/cases/vivaro/${name}-${device}.webp`} target="_blank" rel="noopener noreferrer" aria-label={`${c.open} — ${c.screenLabels[active]} / ${label}`}>↗</a></figcaption>
          <div className={`${styles.screenScroll} ${device==='mobile'?styles.mobileScreen:''}`} tabIndex={0} role="region" aria-label={`${c.screenLabels[active]} — ${label}`}>
            <Image src={`/cases/vivaro/${name}-${device}.webp`} alt={`${c.screenLabels[active]} — ${label}`} width={width} height={height} sizes={device==='desktop'?'(max-width: 700px) 100vw, 70vw':'(max-width: 700px) 70vw, 25vw'} />
          </div>
        </figure>)}
      </div>
    </div>
    <p className={styles.caption}>{c.scroll}</p>
  </div>;
}
