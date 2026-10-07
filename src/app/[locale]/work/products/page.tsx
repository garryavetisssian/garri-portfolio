import type { Metadata } from "next";
import WorkArchive from "@/components/brut/WorkArchive";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return { title: "B2B & Enterprise Products — Garri Avetisyan", alternates: { canonical: `/${locale}/work/products`, languages: { en: "/en/work/products", ru: "/ru/work/products", hy: "/hy/work/products" } } };
}
export default function ProductsPage(props: Props) { return <WorkArchive {...props} collection="products" />; }
