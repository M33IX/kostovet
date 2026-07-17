import { Clock3, Package, Truck } from "lucide-react";
import styles from "./Benefits.module.css";

const benefits = [
  { icon: Clock3, title: "2–4 часа", text: "доставка по Воронежу" },
  { icon: Truck, title: "Следующий день", text: "доставка в другие города ЦЧР" },
  { icon: Package, title: "Остаток в реальном времени", text: "вы видите, что товар точно есть, до оформления заказа" },
];

export function Benefits({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`${styles.wrap} ${compact ? styles.compact : ""}`} aria-label="Преимущества доставки">
      {benefits.map(({ icon: Icon, title, text }) => (
        <article className={styles.item} key={title}>
          <Icon aria-hidden="true" />
          <div><strong>{title}</strong><span>{text}</span></div>
        </article>
      ))}
    </section>
  );
}
