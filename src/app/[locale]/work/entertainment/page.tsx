import type { Metadata } from "next";
import WorkArchive from "@/components/brut/WorkArchive";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return { title: "iGaming & Entertainment — Garri Avetisyan", alternates: { canonical: `/${locale}/work/entertainment`, languages: { en: "/en/work/entertainment", ru: "/ru/work/entertainment", hy: "/hy/work/entertainment" } } };
}
export default function EntertainmentPage(props: Props) { return <WorkArchive {...props} collection="entertainment" />; }
