import type { Locale } from "@/lib/i18n/types";
import styles from "./LegacyCaseNarrative.module.css";

type Chapter = { title: string; body: string; image: string; caption: string };
type Narrative = { status: string; thesis: string; scope: string; decision: string; limitation: string; chapters: Chapter[] };

const cases: Record<string, Record<Locale, Narrative>> = {
  aihive: {
    en: { status: "Designed product experience", thesis: "One workspace. Many creation modes.", scope: "The available designs show a creator platform spanning chat, writing, image, video, character, translation and code tools. My work here is the product structure and interface language across those distinct tasks—not a team automation dashboard.", decision: "Give each creation tool its own controls while preserving a consistent way to discover tools, enter a task and understand the output. The character and writing flows demonstrate that balance between shared navigation and task-specific depth.", limitation: "The available material documents designed screens, not measured adoption or a released team workflow. No conversion or productivity outcome is claimed.", chapters: [
      { title: "01 / Configure the work", body: "The character-generation UI makes inputs, output size and candidate results visible in one task-specific workspace.", image: "/cases/aihive/10.webp", caption: "Original project presentation · character creation workspace" },
      { title: "02 / Discover the toolset", body: "The home surface groups different creation modes before a user commits to a workflow.", image: "/cases/aihive/7.gif", caption: "Original project presentation · tool discovery" },
      { title: "03 / Read the output", body: "The code-generation example makes one output format visible; the broader result system still needs more evidence.", image: "/cases/aihive/13.webp", caption: "Original project presentation · output example" },
    ] },
    ru: { status: "Спроектированный продукт", thesis: "Одно пространство. Разные AI-инструменты.", scope: "На экранах показана платформа для создания контента: чат, тексты, изображения, видео, персонажи, перевод и код. Моя работа здесь — структура продукта и общий язык интерфейса, а не командный дашборд автоматизации.", decision: "У каждого инструмента — свои настройки, но путь к выбору инструмента, постановке задачи и чтению результата остаётся последовательным. Сценарии персонажей и текстов показывают баланс между общим каркасом и глубиной отдельной задачи.", limitation: "Доступные материалы подтверждают спроектированные экраны, но не измеренное использование или запущенный командный процесс. Конверсии и прирост продуктивности не заявлены.", chapters: [
      { title: "01 / Настройка задачи", body: "Интерфейс генерации персонажей показывает настройки, размер результата и варианты в одном рабочем пространстве.", image: "/cases/aihive/10.webp", caption: "Оригинальная презентация · создание персонажей" },
      { title: "02 / Выбор инструмента", body: "Главный экран группирует разные способы создания контента до входа в сценарий.", image: "/cases/aihive/7.gif", caption: "Оригинальная презентация · выбор инструмента" },
      { title: "03 / Результат", body: "Пример генерации кода показывает один формат результата; для общей системы нужно больше подтверждений.", image: "/cases/aihive/13.webp", caption: "Оригинальная презентация · результат" },
    ] },
    hy: { status: "Նախագծված պրոդուկտ", thesis: "Մեկ միջավայր՝ բազմաթիվ AI գործիքների համար։", scope: "Էկրանները ցույց են տալիս ստեղծարար հարթակ՝ չատ, տեքստ, պատկեր, տեսանյութ, կերպար, թարգմանություն և կոդ։ Այստեղ իմ աշխատանքը պրոդուկտի կառուցվածքն ու ընդհանուր UI լեզուն է, ոչ թիմային ավտոմատացման վահանակը։", decision: "Յուրաքանչյուր գործիք ունի իր կարգավորումները, իսկ գործիք գտնելու, առաջադրանք տալու և արդյունքը կարդալու ուղին մնում է հետևողական։", limitation: "Առկա նյութերը ցույց են տալիս նախագծված էկրաններ, ոչ չափված օգտագործում կամ թողարկված թիմային գործընթաց։ Աճի արդյունք չի պնդվում։", chapters: [
      { title: "01 / Առաջադրանքի կարգավորում", body: "Կերպարի ստեղծման էկրանը մեկ վայրում ցույց է տալիս կարգավորումները, չափերն ու արդյունքների տարբերակները։", image: "/cases/aihive/10.webp", caption: "Բնօրինակ ներկայացում · կերպարի ստեղծում" },
      { title: "02 / Գործիքի ընտրություն", body: "Գլխավոր էջը խմբավորում է ստեղծման տարբեր եղանակները։", image: "/cases/aihive/7.gif", caption: "Բնօրինակ ներկայացում · գործիքներ" },
      { title: "03 / Արդյունք", body: "Կոդի օրինակը ցույց է տալիս արդյունքի մեկ տեսակ. ընդհանուր համակարգի համար ավելի շատ ապացույց է պետք։", image: "/cases/aihive/13.webp", caption: "Բնօրինակ ներկայացում · արդյունք" },
    ] },
  },
  "dispatch-center": {
    en: { status: "Designed logistics platform", thesis: "One shipment, several operators and handoffs.", scope: "The source screens cover vehicle-transport work across broker, carrier and driver surfaces: loadboard, trip planning, load details, inspection, VIN capture, signatures and invoicing. This is broader than a single dispatcher dashboard.", decision: "Keep shipment information legible as responsibility passes between roles. A load can be evaluated by a carrier, planned into a trip, documented by a driver and completed with inspection and payment records.", limitation: "These screens do not establish live tracking, driver chat, route optimisation or a measured replacement of other tools. Those are not presented as delivered outcomes.", chapters: [
      { title: "01 / Find and assess loads", body: "Broker and carrier views expose the shipment details needed before a load is accepted.", image: "/cases/dispatch-center/3.webp", caption: "Original project presentation · loadboard" },
      { title: "02 / Plan the trip", body: "Route Scout gives a trip-planning view grounded in the transport workflow.", image: "/cases/dispatch-center/9.webp", caption: "Original project presentation · trip planning and inspection" },
      { title: "03 / Document the handoff", body: "The dispatch record connects pricing, assignment, paperwork and a digital signature.", image: "/cases/dispatch-center/6.webp", caption: "Original project presentation · dispatch record" },
    ] },
    ru: { status: "Спроектированная логистическая платформа", thesis: "Одна перевозка — несколько ролей и передач ответственности.", scope: "Экраны охватывают перевозку автомобилей для брокера, перевозчика и водителя: биржу заказов, планирование рейса, детали груза, осмотр, VIN, подписи и счета. Это шире одного диспетчерского дашборда.", decision: "Сохранять информацию о грузе понятной при переходе между ролями: оценка заказа, планирование, документирование состояния и завершение с подтверждениями.", limitation: "Экраны не подтверждают живое отслеживание, чат водителей, оптимизацию маршрутов или измеренное замещение других инструментов. Эти результаты не заявлены.", chapters: [
      { title: "01 / Оценка заказа", body: "Брокер и перевозчик видят данные, нужные до принятия груза.", image: "/cases/dispatch-center/3.webp", caption: "Оригинальная презентация · заказы" },
      { title: "02 / Планирование рейса", body: "Route Scout показывает маршрут в контексте перевозки.", image: "/cases/dispatch-center/9.webp", caption: "Оригинальная презентация · маршрут и осмотр" },
      { title: "03 / Документирование", body: "Запись заказа связывает цену, назначение, документы и цифровую подпись.", image: "/cases/dispatch-center/6.webp", caption: "Оригинальная презентация · запись заказа" },
    ] },
    hy: { status: "Նախագծված լոգիստիկ հարթակ", thesis: "Մեկ փոխադրում՝ մի քանի դեր և փոխանցում։", scope: "Էկրաններն ընդգրկում են ավտոմեքենաների փոխադրումը բրոքերի, փոխադրողի և վարորդի համար՝ բեռների ցանկ, ուղևորության պլան, զննում, VIN, ստորագրություն և հաշիվ։", decision: "Բեռի տվյալները հասկանալի են մնում, երբ պատասխանատվությունն անցնում է մի դերից մյուսին։", limitation: "Այս էկրանները չեն հաստատում կենդանի հետևում, վարորդների չատ կամ երթուղու օպտիմալացում։ Չափված արդյունք չի պնդվում։", chapters: [
      { title: "01 / Բեռի գնահատում", body: "Բրոքերն ու փոխադրողը տեսնում են անհրաժեշտ տվյալները։", image: "/cases/dispatch-center/3.webp", caption: "Բնօրինակ ներկայացում · բեռներ" },
      { title: "02 / Ուղևորության պլան", body: "Route Scout-ը ցույց է տալիս փոխադրման ուղին։", image: "/cases/dispatch-center/9.webp", caption: "Բնօրինակ ներկայացում · երթուղի և զննում" },
      { title: "03 / Փաստագրում", body: "Գրանցումը կապում է գինը, նշանակումը, փաստաթղթերն ու ստորագրությունը։", image: "/cases/dispatch-center/6.webp", caption: "Բնօրինակ ներկայացում · գրանցում" },
    ] },
  },
  nexwave: {
    en: { status: "Designed smart-home app", thesis: "Make a connected home feel spatial, not technical.", scope: "The designs organise a smart home through a floor-plan overview, rooms, individual device controls, security and a device-pairing flow. The portfolio presents the visible app screens rather than claiming a complete automation builder.", decision: "Use the layout of the home as the primary map, then move from room to device-specific control. Climate, audio, Wi-Fi and security each retain controls appropriate to their function within one visual language.", limitation: "The provided deck does not show a dedicated energy dashboard or complete scene-building flow, nor does it establish a usage outcome.", chapters: [
      { title: "01 / Understand the home", body: "The floor plan makes device location visible before asking the user to navigate a list.", image: "/cases/nexwave/15.webp", caption: "Original project presentation · home and rooms" },
      { title: "02 / Control a device", body: "Climate, connectivity and audio screens use different controls but a common display system.", image: "/cases/nexwave/14.webp", caption: "Original project presentation · device controls" },
      { title: "03 / Check security", body: "Camera, lock and status surfaces extend the same spatial model to a higher-stakes task.", image: "/cases/nexwave/13.webp", caption: "Original project presentation · security" },
    ] },
    ru: { status: "Спроектированное приложение умного дома", thesis: "Дом как пространство, а не список устройств.", scope: "Дизайн организует умный дом через план помещений, комнаты, управление устройствами, безопасность и подключение нового устройства. Здесь показаны видимые экраны, без заявления о полноценном конструкторе автоматизаций.", decision: "Использовать план дома как основную карту, затем переходить от комнаты к управлению конкретным устройством. Климат, звук, Wi-Fi и безопасность получают свои элементы управления в одной системе.", limitation: "Презентация не показывает отдельный экран энергопотребления или полный сценарий создания сцен; результатов использования нет.", chapters: [
      { title: "01 / Понять пространство", body: "План показывает расположение устройств до перехода к списку.", image: "/cases/nexwave/15.webp", caption: "Оригинальная презентация · дом и комнаты" },
      { title: "02 / Управлять устройством", body: "У климата, сети и звука разные контролы, но общий язык интерфейса.", image: "/cases/nexwave/14.webp", caption: "Оригинальная презентация · устройства" },
      { title: "03 / Проверить безопасность", body: "Камеры, замки и статусы продолжают пространственную модель.", image: "/cases/nexwave/13.webp", caption: "Оригинальная презентация · безопасность" },
    ] },
    hy: { status: "Նախագծված խելացի տան հավելված", thesis: "Տունը՝ որպես տարածք, ոչ սարքերի ցուցակ։", scope: "Դիզայնը ներառում է տան հատակագիծը, սենյակները, սարքերի կառավարումը, անվտանգությունն ու նոր սարքի միացումը։ Այստեղ ցուցադրված են տեսանելի էկրանները։", decision: "Տան հատակագիծը դառնում է հիմնական քարտեզը, ապա օգտատերը անցնում է սենյակից դեպի սարքի կառավարում։", limitation: "Ներկայացումը չի ցույց տալիս էներգիայի առանձին վահանակ կամ սցենարների ամբողջական կառուցում։ Օգտագործման արդյունք չի պնդվում։", chapters: [
      { title: "01 / Հասկանալ տունը", body: "Հատակագիծը ցույց է տալիս սարքերի տեղադրությունը։", image: "/cases/nexwave/15.webp", caption: "Բնօրինակ ներկայացում · տուն" },
      { title: "02 / Կառավարել սարքը", body: "Կլիման, ցանցը և ձայնը տարբեր կառավարում ունեն մեկ UI համակարգում։", image: "/cases/nexwave/14.webp", caption: "Բնօրինակ ներկայացում · սարքեր" },
      { title: "03 / Ստուգել անվտանգությունը", body: "Տեսախցիկն ու կողպեքը նույն տարածական տրամաբանության մաս են։", image: "/cases/nexwave/13.webp", caption: "Բնօրինակ ներկայացում · անվտանգություն" },
    ] },
  },
  "razer-ui": {
    en: { status: "Independent, unofficial concept", thesis: "A gaming brand’s shopping journey, without sacrificing clarity.", scope: "This two-week independent exercise designs a mobile commerce journey inspired by Razer: browsing, product detail, checkout, payment confirmation, order tracking and device/account management. It is not a commissioned Razer product.", decision: "Reserve the bright green accent for actions, selection and state. Product pages can stay expressive; checkout and tracking need quieter hierarchy so price, delivery and progress remain legible.", limitation: "The project is a visual and interaction concept. It has no client approval, launch or measured conversion outcome.", chapters: [
      { title: "01 / Present a product", body: "The opening product presentation carries gaming identity through imagery while keeping the headset and core specifications visible.", image: "/cases/razer-ui/1.webp", caption: "Original concept presentation · product introduction" },
      { title: "02 / Complete a purchase", body: "Payment, address, total and confirmation receive a restrained transactional hierarchy.", image: "/cases/razer-ui/3.webp", caption: "Original concept presentation · checkout" },
      { title: "03 / Follow through", body: "Order progress and owned devices make the concept more than a single promotional screen.", image: "/cases/razer-ui/4.webp", caption: "Original concept presentation · tracking and account" },
    ] },
    ru: { status: "Независимый неофициальный концепт", thesis: "Покупка игровых устройств без потери ясности.", scope: "Независимая двухнедельная работа — мобильный путь покупки, вдохновлённый Razer: каталог, карточка товара, оформление, подтверждение оплаты, отслеживание заказа и управление устройствами. Это не заказ Razer.", decision: "Яркий зелёный отведён действиям, выбору и статусам. Товарные экраны могут быть эмоциональными; оформление и отслеживание требуют спокойной иерархии цен, доставки и прогресса.", limitation: "Это концепт интерфейса. Нет подтверждения от бренда, запуска или измеренного изменения конверсии.", chapters: [
      { title: "01 / Представить товар", body: "Открывающий экран сочетает игровой характер с видимым продуктом и его основными характеристиками.", image: "/cases/razer-ui/1.webp", caption: "Оригинальная концепт-презентация · товар" },
      { title: "02 / Оформить покупку", body: "Оплата, адрес, сумма и подтверждение получили спокойную иерархию.", image: "/cases/razer-ui/3.webp", caption: "Оригинальная концепт-презентация · оплата" },
      { title: "03 / Проследить заказ", body: "Статус заказа и личные устройства расширяют сценарий за пределы промо-экрана.", image: "/cases/razer-ui/4.webp", caption: "Оригинальная концепт-презентация · заказ" },
    ] },
    hy: { status: "Անկախ ոչ պաշտոնական կոնցեպտ", thesis: "Խաղային ապրանքների գնում՝ առանց հստակությունը կորցնելու։", scope: "Երկշաբաթյա անկախ աշխատանք՝ Razer-ից ներշնչված բջջային առևտրի ուղի՝ ապրանքի որոնումից մինչև վճարում, առաքման հետևում և սարքերի կառավարում։ Սա Razer-ի պատվերը չէ։", decision: "Վառ կանաչը պահված է գործողությունների և վիճակների համար։ Ապրանքի էջը կարող է արտահայտիչ լինել, իսկ վճարումը՝ պարզ և ընթեռնելի։", limitation: "Սա կոնցեպտ է՝ առանց բրենդի հաստատման, թողարկման կամ չափված արդյունքի։", chapters: [
      { title: "01 / Ներկայացնել ապրանքը", body: "Առաջին էկրանը ցույց է տալիս ապրանքն ու հիմնական բնութագրերը խաղային վիզուալ լեզվով։", image: "/cases/razer-ui/1.webp", caption: "Բնօրինակ կոնցեպտ · ապրանք" },
      { title: "02 / Կատարել գնումը", body: "Վճարումը, հասցեն ու ընդհանուր գումարը ունեն հանգիստ հիերարխիա։", image: "/cases/razer-ui/3.webp", caption: "Բնօրինակ կոնցեպտ · վճարում" },
      { title: "03 / Հետևել պատվերին", body: "Պատվերի ընթացքն ու սարքերը ընդլայնում են սցենարը։", image: "/cases/razer-ui/4.webp", caption: "Բնօրինակ կոնցեպտ · պատվեր" },
    ] },
  },
};

export function hasLegacyNarrative(slug: string) { return slug in cases; }

export default function LegacyCaseNarrative({ slug, locale }: { slug: string; locale: Locale }) {
  const c = cases[slug]?.[locale];
  if (!c) return null;
  const labels = { en: ["What the work covers", "Design decision", "Evidence boundary"], ru: ["Объём работы", "Дизайн-решение", "Граница доказательств"], hy: ["Աշխատանքի ծավալը", "Դիզայնի որոշումը", "Ապացույցների սահմանը"] }[locale];
  const lead = c.chapters[0];
  const sourceAction = { en: "Open original board", ru: "Открыть исходный экран", hy: "Բացել բնօրինակ էկրանը" }[locale];
  return <div className={`${styles.case} ${styles[slug] ?? ""}`}>
    <section className={styles.intro}>
      <div className={styles.inner}>
        <div className={styles.opening}>
          <div className={styles.openingCopy}>
            <span className={styles.eyebrow}>— {c.status}</span>
            <h2>{c.thesis}</h2>
            <p className={styles.leadDecision}><span>{lead.title}</span>{lead.body}</p>
          </div>
          <figure className={styles.leadVisual}>
            <a href={lead.image} target="_blank" rel="noopener noreferrer" aria-label={`${sourceAction}: ${lead.caption}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={lead.image} alt={`${lead.title}: ${lead.body}`} loading="eager" />
              <span className={styles.openIcon} aria-hidden="true">↗</span>
            </a>
            <figcaption>{lead.caption} · {sourceAction} ↗</figcaption>
          </figure>
        </div>
        <div className={styles.ledger}>{[c.scope, c.decision, c.limitation].map((text, i) => <div key={i}><span>{String(i + 1).padStart(2, "0")} / {labels[i]}</span><p>{text}</p></div>)}</div>
      </div>
    </section>
    {c.chapters.slice(1).map((chapter, i) => <section className={styles.chapter} key={chapter.title}>
      <div className={styles.inner}>
        <div className={styles.chapterCopy}><span className={styles.eyebrow}>— {chapter.title}</span><p>{chapter.body}</p></div>
        <figure>
          <a href={chapter.image} target="_blank" rel="noopener noreferrer">
            {/* Original presentation assets are linked directly at full resolution. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={chapter.image} alt={`${chapter.title}: ${chapter.body}`} loading={i === 0 ? "eager" : "lazy"} />
          </a>
          <figcaption>{chapter.caption} ↗</figcaption>
        </figure>
      </div>
    </section>)}
  </div>;
}
