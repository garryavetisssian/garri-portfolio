"use client";

import { useEffect, useRef } from "react";
import styles from "./GameCaseExperience.module.css";

const S = "/case-assets/spearthrone";
const R = "/case-assets/roos-ruckus";

function CaseFilm({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
          void video.play().catch(() => undefined);
        } else if (!entry.isIntersecting || entry.intersectionRatio < 0.15) {
          video.pause();
        }
      },
      { threshold: [0, 0.15, 0.45, 0.75] },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.film} aria-label={label}>
      <video ref={ref} src={src} poster={poster} muted loop playsInline controls preload="metadata" />
    </section>
  );
}

function Spearthrone() {
  return (
    <div className={`${styles.case} ${styles.spear}`}>
      <section className={styles.spearHero}>
        <div className={styles.spearHeroContent}>
          <div className={styles.kicker}>SPARTAN MYTH. SLOT SPECTACLE.</div>
          <img className={styles.spearLogo} src={`${S}/logo.png`} alt="Spearthrone" width={3200} height={1558} />
          <p>Carved in gold. Driven by impact.</p>
          <div className={styles.spearFacts} aria-label="Game features"><span>6 × 5 REELS</span><span>TUMBLING WINS</span><span>DIVINE MULTIPLIERS</span></div>
        </div>
      </section>

      <section className={styles.editorialGrid}>
        <div className={styles.chapter}><span>01 / ART DIRECTION</span><h2>A world forged for play.</h2></div>
        <p>Carved stone, burnished gold and torn crimson fabric connect the battlefield to the reels. One material language, from the smallest symbol to the largest win.</p>
        <figure className={styles.wideImage}><img src="/cases/Spearthrone/Slide%201.png" alt="Spartan battlefield, reels, multiplier and free-spins presentation" width={1920} height={1080} loading="lazy" /><figcaption>THE WORLD / THE REELS / THE REWARD</figcaption></figure>
        <div className={styles.materialKey}><span><i style={{ background: '#c89b50' }} />GOLD / VALUE</span><span><i style={{ background: '#822b25' }} />CRIMSON / IMPACT</span><span><i style={{ background: '#51463e' }} />STONE / STRUCTURE</span></div>
      </section>

      <section className={styles.mechanicStage}>
        <div className={styles.mechanicCopy}>
          <span>02 / CASCADE LANGUAGE</span>
          <h2>Symbols with a clear hierarchy.</h2>
          <p>Distinct silhouettes keep the board readable. Jewel tiers establish rhythm; mythic icons and multiplier seals turn the next drop into a moment.</p>
          <dl className={styles.mechanicSteps}><div><dt>01 / MATCH</dt><dd>Jewel shapes stay distinct at reel scale.</dd></div><div><dt>02 / MULTIPLY</dt><dd>Numbered seals separate value from decoration.</dd></div><div><dt>03 / ENTER THE FEATURE</dt><dd>The winged Scatter owns the bonus moment.</dd></div></dl>
        </div>
        <div className={styles.spearStack}>
          <img src="/cases/Spearthrone/Slide%203.png" alt="Jewel tiers, multiplier seals and winged Scatter symbol" width={1920} height={3412} loading="lazy" />
        </div>
      </section>

      <div className={styles.spearFilm}><header><span>IN MOTION</span><p>From the first drop to the final impact.</p></header><CaseFilm src="/cases/Spearthrone/Spearthrone.mp4" poster="/cases/Spearthrone/Video.webp" label="Spearthrone motion case film" /></div>

      <section className={styles.spearSystem}>
        <div><span>03 / GAME INTERFACE</span><h2>The battlefield, at every size.</h2><p>The reel frame remains the focal point. Bet, credit and win information sit around it, with the same gold-and-crimson language on desktop and mobile.</p></div>
        <div className={styles.spearFrames}><figure><img src="/cases/Spearthrone/Slide%204.png" alt="Spearthrone desktop game interface and controls" width={1920} height={1080} loading="lazy" /><figcaption>DESKTOP / A CLEAR REEL FOCAL POINT</figcaption></figure><figure><img src="/cases/Spearthrone/Slide%205.png" alt="Spearthrone mobile game and bet selection" width={1920} height={3412} loading="lazy" /><figcaption>MOBILE / THE SAME WORLD</figcaption></figure></div>
      </section>

      <section className={styles.characterBeat}>
        <div className={styles.characterIntro}><span>04 / CHARACTER DIRECTION</span><h2>Presence. Anticipation. Impact.</h2><p>A controlled silhouette becomes an active cue. The spear direction and changing stance make the escalation readable without another label on the reels.</p></div>
        <div className={styles.warriorStudies}><figure><img src={`${S}/warrior-standing.png`} alt="Warrior at rest" width={812} height={1218} loading="lazy" /><figcaption>01 / PRESENCE</figcaption></figure><figure><img src={`${S}/warrior-cast.png`} alt="Warrior preparing the cast" width={940} height={1346} loading="lazy" /><figcaption>02 / ANTICIPATION</figcaption></figure><figure><img src={`${S}/warrior-strike.png`} alt="Warrior striking" width={940} height={1346} loading="lazy" /><figcaption>03 / IMPACT</figcaption></figure></div>
      </section>

      <section className={styles.caseFinale}>
        <img src="/cases/Spearthrone/Slide%206.png" alt="Spearthrone final presentation" />
        <div><span>ONE SYSTEM</span><strong>MYTH → MOTION → REWARD</strong></div>
      </section>
    </div>
  );
}

function RoosRuckus() {
  return (
    <div className={`${styles.case} ${styles.roo}`}>
      <section className={styles.rooHero}>
        <img className={styles.rooBackdrop} src={`${R}/outback.png`} alt="Australian outback illustration" />
        <div className={styles.rooCharacterSprite} role="img" aria-label="Roo character animation poses" />
        <div className={styles.rooHeroCopy}>
          <span>CHARACTERS DRIVE THE MECHANIC</span>
          <img src={`${R}/logo.png`} alt="Roo's Ruckus" />
          <div className={styles.rooHeroStats} aria-label="Game features">
            <span><b>5 × 5</b> REEL GRID</span>
            <span><b>2 WILDS</b> ONE WILD DUO</span>
            <span><b>∞ ENERGY</b> NUDGE · RESPIN · REPEAT</span>
          </div>
          <p>Nudging Wilds, respins and multiplying reels become character comedy.</p>
        </div>
      </section>

      <section className={styles.rooSymbols}>
        <div><span>01 / SYMBOL FAMILY</span><h2>Soft, juicy and instantly scannable.</h2><p>Glossy letterforms sit beside fruit and character symbols without losing hierarchy at game speed.</p></div>
        <div className={styles.symbolRow}>
          <img src={`${R}/a.png`} alt="A symbol" /><img src={`${R}/k.png`} alt="K symbol" /><img src={`${R}/q.png`} alt="Q symbol" />
        </div>
      </section>

      <section className={styles.nudgeStory}>
        <div className={styles.nudgeTitle}><span>02 / NUDGE LOGIC</span><h2>Two characters.<br />One escalating loop.</h2></div>
        <div className={styles.nudgeCards}>
          <figure><img src={`${R}/rules-wilds.png`} alt="Roo and Mango Wild rules" /><figcaption>Roo expands to a full reel. Mango moves through the board and keeps the respin alive.</figcaption></figure>
          <figure><img src={`${R}/rules-combo.png`} alt="Combo Nudge rules" /><figcaption>When the two systems meet, each nudge increases the multiplier and the visual energy.</figcaption></figure>
        </div>
      </section>

      <CaseFilm src="/cases/Roo's%20Ruckus/Roo's%20Ruckus.mp4" poster={`${R}/game-screen.png`} label="Roo's Ruckus motion case film" />

      <section className={styles.motionLab}>
        <header><span>03 / MOTION LAB</span><h2>Roo is the feedback system.</h2><p>Attitude communicates state before copy does. Idle confidence, anticipation, delight and multiplier changes each have a distinct silhouette.</p></header>
        <div className={styles.motionTicker} aria-hidden><img src={`${R}/roo-character-frames.png`} alt="" /><img src={`${R}/roo-character-frames.png`} alt="" /></div>
        <div className={styles.nudgeFrames}><figure><img src={`${R}/roo-nudge-a.png`} alt="Roo Wild nudge animation frames" /><figcaption>ENTER → NUDGE → LOCK</figcaption></figure><figure><img src={`${R}/roo-nudge-b.png`} alt="Roo Wild landing animation frames" /><figcaption>LAND → SETTLE → READY</figcaption></figure></div>
      </section>

      <section className={styles.bonusStage}>
        <img src={`${R}/bonus.png`} alt="Roo's Ruckus bonus identity" />
        <div><span>04 / BONUS ESCALATION</span><h2>The reward gets its own stage.</h2><p>Treasure, light and character scale take over the composition while the core game remains recognizable underneath.</p></div>
        <img src={`${R}/treasure.png`} alt="Roo's Ruckus treasure artwork" />
      </section>

      <section className={styles.supportSystem}>
        <div><span>05 / DESIGN SYSTEM</span><h2>One world. Every screen.</h2><p>Rules, paytable and settings reduce the spectacle, not the personality. Warm overlays, shared typography and familiar art keep navigation clear.</p></div>
        <div className={styles.supportRail}><img src={`${R}/rules-overview.png`} alt="Rules overview" /><img src={`${R}/paytable.png`} alt="Paytable" /><img src={`${R}/settings.png`} alt="Settings" /></div>
      </section>

      <section className={styles.rooFinale}>
        <img src={`${R}/promo.png`} alt="Roo's Ruckus promotional illustration" />
        <div><span>BUILT FOR THE RUCKUS</span><strong>CHARACTER → COLLISION → CHAOS</strong></div>
      </section>
    </div>
  );
}

export default function GameCaseExperience({ slug }: { slug: string }) {
  if (slug === "spearthrone") return <Spearthrone />;
  if (slug === "roos-ruckus") return <RoosRuckus />;
  return null;
}
