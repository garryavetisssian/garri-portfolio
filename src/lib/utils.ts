import { clsx, type ClassValue } from "clsx";

/** Merge Tailwind classes without conflicts */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Estimate reading time for a block of text (words) */
export function readingTime(wordCount: number): string {
  const minutes = Math.ceil(wordCount / 200);
  return `${minutes} min read`;
}
