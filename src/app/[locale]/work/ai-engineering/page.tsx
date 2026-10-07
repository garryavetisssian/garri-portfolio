import type { Metadata } from "next";
import WorkArchive from "@/components/brut/WorkArchive";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return { title: "AI Engineering — Garri Avetisyan", alternates: { canonical: `/${locale}/work/ai-engineering`, languages: { en: "/en/work/ai-engineering", ru: "/ru/work/ai-engineering", hy: "/hy/work/ai-engineering" } } };
}
export default function AIEngineeringPage(props: Props) { return <WorkArchive {...props} collection="ai-engineering" />; }
