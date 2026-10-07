import type { Metadata } from "next";
import WorkArchive from "@/components/brut/WorkArchive";
import { LOCALES } from "@/lib/i18n/types";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!LOCALES.some((item) => item.code === locale)) return {};
  return { title: "Work — Garri Avetisyan", description: "Product design, iGaming and AI Engineering case studies.", alternates: { canonical: `/${locale}/work/products`, languages: { en: "/en/work/products", ru: "/ru/work/products", hy: "/hy/work/products" } } };
}
// Keep the existing /work entry point and legacy hash links working.
export default function WorkPage(props: Props) { return <WorkArchive {...props} />; }
