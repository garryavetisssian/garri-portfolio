"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./MeridianCase.module.css";

/** Preserve the desktop brief's composition at every portfolio breakpoint. */
export default function MeridianPreview({ src, title }: { src: string; title: string }) {
  const container = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const element = container.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / 1100));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={container} className={styles.preview}><iframe loading="lazy" title={title} src={src} sandbox="allow-scripts allow-forms" style={{ transform: `scale(${scale})` }} /></div>;
}
