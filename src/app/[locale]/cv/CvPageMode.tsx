"use client";

import { useEffect } from "react";

export default function CvPageMode() {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prev = {
      htmlBg: html.style.background,
      bodyBg: body.style.background,
      colorScheme: html.style.colorScheme,
    };
    html.style.background = "#f4f5f8";
    body.style.background = "#f4f5f8";
    html.style.colorScheme = "light";
    html.classList.add("cv-mode");
    body.classList.add("cv-mode");

    return () => {
      html.style.background = prev.htmlBg;
      body.style.background = prev.bodyBg;
      html.style.colorScheme = prev.colorScheme;
      html.classList.remove("cv-mode");
      body.classList.remove("cv-mode");
    };
  }, []);
  return null;
}
