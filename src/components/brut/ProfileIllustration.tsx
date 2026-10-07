"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./ProfileIllustration.module.css";

/** Original pixel artwork: bounded, no spinning icons, paused off-screen. */
export default function ProfileIllustration({ animated = false, className = "" }: { animated?: boolean; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!animated || !ref.current) return;
    const observer = new IntersectionObserver(([entry]) => setPlaying(entry.isIntersecting), { threshold: .1 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [animated]);
  return <div ref={ref} className={`${styles.art} ${animated ? styles.animated : styles.mail} ${className}`} data-playing={playing} aria-hidden="true">
    <Image src={`/illustrations/profile/${animated ? "garri-animation1" : "garri-mail"}.png`} width={1024} height={1024} alt="" className={styles.first} sizes="(max-width: 700px) 180px, 300px" />
    {animated && <Image src="/illustrations/profile/garri-animation2.png" width={1024} height={1024} alt="" className={styles.second} sizes="(max-width: 700px) 180px, 300px" />}
  </div>;
}
