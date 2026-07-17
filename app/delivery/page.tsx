import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Box, CalendarDays, Clock3, FileText, Hospital, MapPin, Moon, Package, PackageCheck, Phone, Truck } from "lucide-react";
import { Footer } from "@/components/Footer";
import { ProductArt } from "@/components/ProductArt";
import styles from "../marketing.module.css";

export const metadata: Metadata = {
  title: "Доставка",
  description: "Доставка имплантов по Воронежу за 2–4 часа, по ЦЧР на следующий день и по России транспортными компаниями.",
};

const steps = [
  { icon: FileText, title: "Получаем заявку", text: "Вы оставляете резерв на сайте или звоните специалисту." },
  { icon: PackageCheck, title: "Проверяем склад", text: "Менеджер сразу подтверждает наличие товара." },
  { icon: Box, title: "Комплектуем заказ", text: "Имплант сразу передаётся на упаковку." },
  { icon: Truck, title: "Передаём в доставку", text: "Курьер уже выезжает по указанному адресу." },
  { icon: Hospital, title: "Получаете заказ", text: "Можно сразу использовать в работе." },
];

function DeliveryMap() {
  return (
    <div className={styles.map}>
      <svg className={styles.mapDiagram} viewBox="0 0 760 330" role="img" aria-label="Схема доставки из Воронежа в Курск, Липецк, Тамбов, Белгород и Орёл">
        <path className={styles.regionOutline} d="M25 92C92 36 183 54 244 33c66-23 122 5 167 45 50 45 126 13 190 38 58 22 95 75 113 132-78 42-166 27-232 55-75 31-150-9-219 4-84 16-174-9-220-72-28-39-30-92-18-143Z" />
        <g className={styles.routes}>
          <line x1="345" y1="177" x2="105" y2="94" />
          <line x1="345" y1="177" x2="305" y2="68" />
          <line x1="345" y1="177" x2="625" y2="90" />
          <line x1="345" y1="177" x2="82" y2="255" />
          <line x1="345" y1="177" x2="323" y2="284" />
        </g>
        <g className={styles.routeNodes}>
          <circle cx="105" cy="94" r="6" /><circle cx="305" cy="68" r="6" />
          <circle cx="625" cy="90" r="6" /><circle cx="82" cy="255" r="6" />
          <circle cx="323" cy="284" r="6" /><circle className={styles.voronezhNode} cx="345" cy="177" r="10" />
        </g>
        <g className={styles.mapLabels}>
          <text x="73" y="82">Курск</text><text x="285" y="48">Липецк</text>
          <text x="638" y="80">Тамбов</text><text x="42" y="281">Белгород</text>
          <text x="338" y="309">Орёл</text><text className={styles.voronezhLabel} x="362" y="183">Воронеж</text>
        </g>
      </svg>
    </div>
  );
}

export default function DeliveryPage() {
  return (
    <main id="main" className="page-main">
      <div className="site-shell">
        <nav className={styles.crumbs}><Link href="/">Главная</Link><span>/</span><b>Доставка</b></nav>
        <section className={styles.pageHero}>
          <div><h1>Когда операция<br />не может ждать —<br />доставка тоже.</h1><p>По Воронежу доставляем за 2–4 часа.<br />В другие города Центрально-Чернозёмного региона — уже на следующий день.<br />Работаем без выходных и праздников.</p><div className={styles.buttonRow}><Link className="primary-button" href="/catalog">Проверить наличие <ArrowRight /></Link></div></div>
          <div className={styles.heroArt}><ProductArt shape="tplate" /></div>
        </section>
        <section className={styles.section}><h2 className={styles.sectionTitle}>Как происходит доставка</h2><div className={styles.steps}>{steps.map(({ icon: Icon, title, text }, i) => <article className={styles.step} key={title}><span>{i + 1}</span><Icon /><h3>{title}</h3><p>{text}</p></article>)}</div></section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>География доставки</h2>
          <div className={styles.mapLayout}>
            <DeliveryMap />
            <div className={styles.mapList}><div><Clock3 /><p><b>Воронеж</b><span>2–4 часа</span></p></div><div><CalendarDays /><p><b>ЦЧР</b><span>Следующий день</span></p></div><div><Package /><p><b>Остальная Россия</b><span>Через транспортную компанию</span></p></div></div>
          </div>
        </section>
        <section className={styles.section}><h2 className={styles.sectionTitle}>Часто задаваемые вопросы</h2><div className={styles.cardGrid}><article className={styles.card}><Clock3 /><h3>Можно ли получить заказ сегодня?</h3><p>Да. Если товар есть на складе, доставим по Воронежу за 2–4 часа.</p></article><article className={styles.card}><Moon /><h3>Можно заказать ночью?</h3><p>Да. Заявка поступит менеджеру сразу после начала рабочего дня.</p></article><article className={styles.card}><MapPin /><h3>Можно вызвать курьера?</h3><p>Да. Курьер привезёт заказ по указанному адресу в удобное время.</p></article><article className={styles.card}><Truck /><h3>Отправляете транспортными компаниями?</h3><p>Да. Работаем с крупными перевозчиками по всей России.</p></article></div></section>
        <section className={styles.wideCta}><div><h2>Не знаете, успеем ли доставить?</h2><p>Проверьте наличие или уточните у специалиста.</p><div className={styles.buttonRow}><Link className="primary-button" href="/catalog">Проверить наличие <ArrowRight /></Link><a className="secondary-button" href="tel:+79611898933">Позвонить специалисту <Phone /></a></div></div><ProductArt shape="tplate" /></section>
      </div>
      <Footer />
    </main>
  );
}
