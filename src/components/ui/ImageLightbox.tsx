"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ImageLightbox.module.css";

type ImageDetails = { src: string; alt: string };
const imageExtension = /\.(?:avif|gif|jpe?g|png|svg|webp)(?:[?#]|$)/i;

export default function ImageLightbox() {
  const [image, setImage] = useState<ImageDetails | null>(null);
  const [zoom, setZoom] = useState(1);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element)?.closest?.("a[href]");
      if (!anchor || !imageExtension.test(anchor.getAttribute("href") ?? "")) return;
      const url = new URL((anchor as HTMLAnchorElement).href, window.location.href);
      if (url.origin !== window.location.origin) return;
      event.preventDefault();
      previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      const imageElement = anchor.querySelector("img");
      setImage({ src: url.href, alt: imageElement?.getAttribute("alt") || anchor.getAttribute("aria-label") || "Project image" });
      setZoom(1);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!image) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setImage(null);
      if (event.key === "+" || event.key === "=") { event.preventDefault(); setZoom((value) => Math.min(4, value + 0.5)); }
      if (event.key === "-") { event.preventDefault(); setZoom((value) => Math.max(1, value - 0.5)); }
      if (event.key === "Tab") {
        const controls = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-image-lightbox] button:not(:disabled)"));
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previousFocus.current?.focus();
    };
  }, [image]);

  if (!image) return null;
  return <div className={styles.backdrop} role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setImage(null); }}>
    <div data-image-lightbox className={styles.dialog} role="dialog" aria-modal="true" aria-label={image.alt}>
      <div className={styles.toolbar}>
        <span className={styles.label}>{image.alt}</span>
        <div className={styles.controls}>
          <button type="button" aria-label="Zoom out" disabled={zoom === 1} onClick={() => setZoom((value) => Math.max(1, value - 0.5))}>−</button>
          <span aria-live="polite">{Math.round(zoom * 100)}%</span>
          <button type="button" aria-label="Zoom in" disabled={zoom === 4} onClick={() => setZoom((value) => Math.min(4, value + 0.5))}>+</button>
          <button ref={closeRef} type="button" aria-label="Close image" className={styles.close} onClick={() => setImage(null)}>×</button>
        </div>
      </div>
      <div className={styles.viewport}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image.src} alt={image.alt} style={zoom > 1 ? { width: `${zoom * 100}%`, maxWidth: "none", maxHeight: "none" } : undefined} />
      </div>
    </div>
  </div>;
}
