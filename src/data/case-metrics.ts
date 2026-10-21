import type { Locale } from "@/lib/i18n/types";

export type CaseMetric = { value: string; label: string };
export type CaseMetrics = { heading: string; context: string; items: CaseMetric[] };

const metrics: Record<string, Record<Locale, CaseMetrics>> = {
  ineed: {
    en: { heading: "Adoption and release scope", context: "Registrations are approximate historical team estimates, not completed bookings or measured effects of the redesign.", items: [
      { value: "~800", label: "customer registrations" },
      { value: "~100", label: "professional registrations" },
      { value: "2", label: "mobile apps in the release" },
    ] },
    ru: { heading: "Аудитория и масштаб релиза", context: "Регистрации — приблизительные исторические оценки команды, не число выполненных заказов и не измеренный эффект редизайна.", items: [
      { value: "~800", label: "регистраций клиентов" },
      { value: "~100", label: "регистраций специалистов" },
      { value: "2", label: "мобильных приложения в релизе" },
    ] },
    hy: { heading: "Գրանցումներ և թողարկման ծավալ", context: "Գրանցումները թիմի պատմական մոտավոր գնահատականներն են, ոչ ավարտված պատվերներ կամ վերաձևման չափված ազդեցություն։", items: [
      { value: "~800", label: "հաճախորդի գրանցում" },
      { value: "~100", label: "մասնագետի գրանցում" },
      { value: "2", label: "բջջային հավելված թողարկման մեջ" },
    ] },
  },
  "duck-master": {
    en: { heading: "Early audience and round design", context: "Approximate historical Google Analytics figures from the first three months of our work. The product later closed; these numbers do not show retention or isolate the effect of the trading round.", items: [
      { value: "~300", label: "starting audience" },
      { value: "~2,000", label: "audience after 3 months" },
      { value: "10s", label: "directional choice window" },
    ] },
    ru: { heading: "Ранняя аудитория и раунд", context: "Приблизительные исторические данные Google Analytics за первые три месяца нашей работы. Позже продукт закрылся; цифры не показывают удержание и не выделяют эффект торгового раунда.", items: [
      { value: "~300", label: "начальная аудитория" },
      { value: "~2 000", label: "аудитория через 3 месяца" },
      { value: "10 с", label: "время выбора направления" },
    ] },
    hy: { heading: "Վաղ լսարան և փուլի մեխանիկա", context: "Մեր աշխատանքի առաջին երեք ամիսների Google Analytics-ի պատմական մոտավոր թվերն են։ Պրոդուկտը հետո փակվեց. տվյալները չեն ցույց տալիս պահպանումը կամ առևտրային փուլի առանձին ազդեցությունը։", items: [
      { value: "~300", label: "սկզբնական լսարան" },
      { value: "~2,000", label: "լսարան 3 ամիս անց" },
      { value: "10 վ", label: "ուղղության ընտրության ժամանակ" },
    ] },
  },
  balvoi: {
    en: { heading: "Shipped interface, in numbers", context: "These are capabilities visible in the supplied DeBiasIt screens, not adoption or trust-improvement metrics.", items: [
      { value: "8,000", label: "word input limit" },
      { value: "5", label: "transformation measures" },
      { value: "2", label: "analysis depths" },
    ] },
    ru: { heading: "Цифры внедрённого интерфейса", context: "Это возможности, видимые на предоставленных экранах DeBiasIt, а не метрики аудитории или роста доверия.", items: [
      { value: "8 000", label: "слов — лимит ввода" },
      { value: "5", label: "показателей преобразования" },
      { value: "2", label: "уровня анализа" },
    ] },
    hy: { heading: "Ներդրված միջերեսը թվերով", context: "Սրանք տրամադրված DeBiasIt էկրաններում երևացող հնարավորություններ են, ոչ լսարանի կամ վստահության աճի չափանիշներ։", items: [
      { value: "8,000", label: "բառի մուտքագրման սահման" },
      { value: "5", label: "փոխակերպման ցուցանիշ" },
      { value: "2", label: "վերլուծության մակարդակ" },
    ] },
  },
  "xy-ecosystem": {
    en: { heading: "Approved design scope", context: "These figures describe the approved pre-production design and engagement, not launched usage, transactions or financial results.", items: [
      { value: "4", label: "connected protocol surfaces" },
      { value: "1", label: "XYGO lottery experience" },
      { value: "12+", label: "months of design work" },
    ] },
    ru: { heading: "Масштаб согласованного дизайна", context: "Цифры описывают согласованный дизайн на стадии препродакшена, а не запущенный продукт, операции или финансовый результат.", items: [
      { value: "4", label: "связанных протокола" },
      { value: "1", label: "лотерея XYGO" },
      { value: "12+", label: "месяцев дизайн-работы" },
    ] },
    hy: { heading: "Հաստատված դիզայնի ծավալ", context: "Թվերը նկարագրում են հաստատված նախաարտադրական դիզայնը, ոչ գործարկված օգտագործում, գործարքներ կամ ֆինանսական արդյունքներ։", items: [
      { value: "4", label: "կապված պրոտոկոլ" },
      { value: "1", label: "XYGO վիճակախաղ" },
      { value: "12+", label: "ամիս դիզայնի աշխատանք" },
    ] },
  },
};

export function getCaseMetrics(slug: string, locale: Locale): CaseMetrics | null {
  return metrics[slug]?.[locale] ?? null;
}
