import type { Locale } from "@/lib/i18n/types";

export type CaseMetric = { value: string; label: string };
export type CaseMetrics = { heading: string; context: string; items: CaseMetric[]; provenance?: { source: string; window: string; limit: string } };

const metrics: Record<string, Record<Locale, CaseMetrics>> = {
  ineed: {
    en: { heading: "Adoption and release scope", context: "Registrations are approximate historical team estimates, not completed bookings or measured effects of the redesign.", provenance: { source: "Historical team estimates; no retained export", window: "After the two-app release; exact period not retained", limit: "Cannot establish completed jobs, retention, or redesign attribution" }, items: [
      { value: "~800", label: "customer registrations" },
      { value: "~100", label: "professional registrations" },
      { value: "2", label: "mobile apps in the release" },
    ] },
    ru: { heading: "Аудитория и масштаб релиза", context: "Регистрации — приблизительные исторические оценки команды, не число выполненных заказов и не измеренный эффект редизайна.", provenance: { source: "Исторические оценки команды; выгрузка не сохранилась", window: "После релиза двух приложений; точный период не сохранился", limit: "Нельзя установить число завершённых заказов, удержание или вклад редизайна" }, items: [
      { value: "~800", label: "регистраций клиентов" },
      { value: "~100", label: "регистраций специалистов" },
      { value: "2", label: "мобильных приложения в релизе" },
    ] },
    hy: { heading: "Գրանցումներ և թողարկման ծավալ", context: "Գրանցումները թիմի պատմական մոտավոր գնահատականներն են, ոչ ավարտված պատվերներ կամ վերաձևման չափված ազդեցություն։", provenance: { source: "Թիմի պատմական գնահատականներ. արտահանումը չի պահպանվել", window: "Երկու հավելվածի թողարկումից հետո. հստակ շրջանը չի պահպանվել", limit: "Չի հաստատում ավարտված պատվերներ, պահպանում կամ վերաձևման ազդեցություն" }, items: [
      { value: "~800", label: "հաճախորդի գրանցում" },
      { value: "~100", label: "մասնագետի գրանցում" },
      { value: "2", label: "բջջային հավելված թողարկման մեջ" },
    ] },
  },
  "duck-master": {
    en: { heading: "Early audience and round design", context: "Approximate historical Google Analytics figures from the first three months of our work. The product later closed; these numbers do not show retention or isolate the effect of the trading round.", provenance: { source: "Google Analytics, recalled approximate counts; original export unavailable", window: "First three months of the design work", limit: "Audience growth is not evidence of retention or causal effect of one feature" }, items: [
      { value: "~300", label: "starting audience" },
      { value: "~2,000", label: "audience after 3 months" },
      { value: "10s", label: "directional choice window" },
    ] },
    ru: { heading: "Ранняя аудитория и раунд", context: "Приблизительные исторические данные Google Analytics за первые три месяца нашей работы. Позже продукт закрылся; цифры не показывают удержание и не выделяют эффект торгового раунда.", provenance: { source: "Google Analytics, приблизительные исторические значения; исходной выгрузки нет", window: "Первые три месяца дизайн-работы", limit: "Рост аудитории не доказывает удержание или эффект отдельной функции" }, items: [
      { value: "~300", label: "начальная аудитория" },
      { value: "~2 000", label: "аудитория через 3 месяца" },
      { value: "10 с", label: "время выбора направления" },
    ] },
    hy: { heading: "Վաղ լսարան և փուլի մեխանիկա", context: "Մեր աշխատանքի առաջին երեք ամիսների Google Analytics-ի պատմական մոտավոր թվերն են։ Պրոդուկտը հետո փակվեց. տվյալները չեն ցույց տալիս պահպանումը կամ առևտրային փուլի առանձին ազդեցությունը։", provenance: { source: "Google Analytics-ի պատմական մոտավոր թվեր. արտահանումը հասանելի չէ", window: "Դիզայնի աշխատանքի առաջին երեք ամիսները", limit: "Լսարանի աճը չի ապացուցում պահպանում կամ առանձին գործառույթի ազդեցություն" }, items: [
      { value: "~300", label: "սկզբնական լսարան" },
      { value: "~2,000", label: "լսարան 3 ամիս անց" },
      { value: "10 վ", label: "ուղղության ընտրության ժամանակ" },
    ] },
  },
  balvoi: {
    en: { heading: "Shipped interface, in numbers", context: "These are capabilities visible in the supplied DeBiasIt screens, not adoption or trust-improvement metrics.", provenance: { source: "Supplied DeBiasIt interface screenshots", window: "Shipped interface; usage period not supplied", limit: "Product capabilities cannot establish adoption or editorial trust improvement" }, items: [
      { value: "8,000", label: "word input limit" },
      { value: "5", label: "transformation measures" },
      { value: "2", label: "analysis depths" },
    ] },
    ru: { heading: "Цифры внедрённого интерфейса", context: "Это возможности, видимые на предоставленных экранах DeBiasIt, а не метрики аудитории или роста доверия.", provenance: { source: "Предоставленные скриншоты интерфейса DeBiasIt", window: "Запущенный интерфейс; период использования не предоставлен", limit: "Возможности продукта не доказывают аудиторию или рост доверия" }, items: [
      { value: "8 000", label: "слов — лимит ввода" },
      { value: "5", label: "показателей преобразования" },
      { value: "2", label: "уровня анализа" },
    ] },
    hy: { heading: "Ներդրված միջերեսը թվերով", context: "Սրանք տրամադրված DeBiasIt էկրաններում երևացող հնարավորություններ են, ոչ լսարանի կամ վստահության աճի չափանիշներ։", provenance: { source: "Տրամադրված DeBiasIt միջերեսի պատկերներ", window: "Թողարկված միջերես. օգտագործման շրջանը չի տրամադրվել", limit: "Հնարավորությունները չեն ապացուցում օգտագործում կամ վստահության աճ" }, items: [
      { value: "8,000", label: "բառի մուտքագրման սահման" },
      { value: "5", label: "փոխակերպման ցուցանիշ" },
      { value: "2", label: "վերլուծության մակարդակ" },
    ] },
  },
  "xy-ecosystem": {
    en: { heading: "Approved design scope", context: "These figures describe the approved pre-production design and engagement, not launched usage, transactions or financial results.", provenance: { source: "Approved pre-production design boards and project history", window: "Design engagement; product launch not evidenced", limit: "No live usage, transaction, or payout outcome is claimed" }, items: [
      { value: "4", label: "connected protocol surfaces" },
      { value: "1", label: "XYGO lottery experience" },
      { value: "12+", label: "months of design work" },
    ] },
    ru: { heading: "Масштаб согласованного дизайна", context: "Цифры описывают согласованный дизайн на стадии препродакшена, а не запущенный продукт, операции или финансовый результат.", provenance: { source: "Согласованные препродакшен-макеты и история проекта", window: "Этап дизайна; запуск продукта не подтверждён", limit: "Реальное использование, операции и выплаты не заявляются" }, items: [
      { value: "4", label: "связанных протокола" },
      { value: "1", label: "лотерея XYGO" },
      { value: "12+", label: "месяцев дизайн-работы" },
    ] },
    hy: { heading: "Հաստատված դիզայնի ծավալ", context: "Թվերը նկարագրում են հաստատված նախաարտադրական դիզայնը, ոչ գործարկված օգտագործում, գործարքներ կամ ֆինանսական արդյունքներ։", provenance: { source: "Հաստատված նախաարտադրական էկրաններ և նախագծի պատմություն", window: "Դիզայնի փուլ. գործարկումը հաստատված չէ", limit: "Իրական օգտագործում, գործարքներ կամ վճարումներ չեն ներկայացվում" }, items: [
      { value: "4", label: "կապված պրոտոկոլ" },
      { value: "1", label: "XYGO վիճակախաղ" },
      { value: "12+", label: "ամիս դիզայնի աշխատանք" },
    ] },
  },
};

export function getCaseMetrics(slug: string, locale: Locale): CaseMetrics | null {
  return metrics[slug]?.[locale] ?? null;
}
