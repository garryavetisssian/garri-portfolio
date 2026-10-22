import type { Locale } from "@/lib/i18n/types";
import type { CaseAsset } from "@/lib/case-assets";

type Highlight = { file: string; label: Record<Locale, string> };

const highlights: Record<string, Highlight[]> = {
  "ineed:Release Version": [
    { file: "1.webp", label: { en: "Released mobile direction", ru: "Мобильное направление релиза", hy: "Թողարկված բջջային ուղղություն" } },
    { file: "10.webp", label: { en: "Customer journey model", ru: "Карта клиентского пути", hy: "Հաճախորդի ուղու մոդել" } },
    { file: "15.webp", label: { en: "Customer app screens", ru: "Экраны клиентского приложения", hy: "Հաճախորդի հավելվածի էկրաններ" } },
  ],
  "ineed:First Version": [
    { file: "1.webp", label: { en: "First-version mobile model", ru: "Мобильная модель первой версии", hy: "Առաջին տարբերակի բջջային մոդել" } },
    { file: "15.webp", label: { en: "Business registration", ru: "Регистрация компании", hy: "Ընկերության գրանցում" } },
    { file: "24.webp", label: { en: "Business messaging", ru: "Сообщения компании", hy: "Ընկերության հաղորդագրություններ" } },
  ],
  balvoi: [
    { file: "1.webp", label: { en: "Brand and system", ru: "Бренд и система", hy: "Բրենդ և համակարգ" } },
    { file: "5.webp", label: { en: "Analysis breakdown", ru: "Детали анализа", hy: "Վերլուծության մանրամասներ" } },
    { file: "9.webp", label: { en: "Responsive article layout", ru: "Адаптивная статья", hy: "Հարմարեցվող հոդվածի դասավորություն" } },
  ],
  "duck-master": [
    { file: "1.webp", label: { en: "Game premise and UI", ru: "Идея игры и интерфейс", hy: "Խաղի հիմք և միջերես" } },
    { file: "5.webp", label: { en: "World art direction", ru: "Арт-дирекшн миров", hy: "Աշխարհների արտ-ուղղություն" } },
    { file: "10.webp", label: { en: "Mini-game loops", ru: "Циклы мини-игр", hy: "Մինի խաղերի ցիկլեր" } },
  ],
  "xy-ecosystem:XYGO - WEB3 Lottery": [
    { file: "1.webp", label: { en: "XYGO identity", ru: "Айдентика XYGO", hy: "XYGO ինքնություն" } },
    { file: "4.webp", label: { en: "Grid and NFT model", ru: "Модель сетки и NFT", hy: "Ցանցի և NFT մոդել" } },
    { file: "8.webp", label: { en: "Token reward design", ru: "Дизайн токен-наград", hy: "Թոքենային պարգևների դիզայն" } },
  ],
  "xy-ecosystem:XY Protocols": [
    { file: "1.webp", label: { en: "Ecosystem map", ru: "Карта экосистемы", hy: "Էկոհամակարգի քարտեզ" } },
    { file: "8.webp", label: { en: "Staking interface", ru: "Интерфейс стейкинга", hy: "Սթեյքինգի միջերես" } },
  ],
};

export type ArchiveHighlight = { index: number; label: string };

export function getArchiveHighlights(slug: string, tab: string | undefined, assets: CaseAsset[], locale: Locale): ArchiveHighlight[] {
  const key = tab ? `${slug}:${tab}` : slug;
  return (highlights[key] ?? []).flatMap(item => {
    const index = assets.findIndex(asset => asset.src.endsWith(`/${item.file}`));
    return index < 0 ? [] : [{ index, label: item.label[locale] }];
  });
}
