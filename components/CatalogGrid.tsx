import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Package } from "lucide-react";
import { categories } from "@/lib/catalog";
import { ProductArt, type ProductShape } from "./ProductArt";
import styles from "./CatalogGrid.module.css";

const categoryShapes: Record<(typeof categories)[number]["art"], ProductShape> = { plate: "tplate", screw: "screw", tool: "tool", suture: "suture", set: "set" };

export function CatalogGrid() {
  return (
    <section className={styles.catalog} aria-labelledby="catalog-title">
      <div className={styles.intro}>
        <Image className={styles.cat} src="/assets/1.png" width={3536} height={2992} sizes="(max-width: 720px) 72vw, 440px" alt="Рыжий кот — символ Kosto-Vet" />
        <div className={styles.heading}>
          <h1 id="catalog-title">Каталог продукции</h1>
          <p>Всё необходимое для остеосинтеза животных</p>
        </div>
      </div>

      <div className={styles.grid}>
        {categories.map((category) => (
          <Link className={`${styles.card} ${styles[category.art]}`} href={`/catalog/${category.slug}`} key={category.slug}>
            <div className={styles.copy}>
              <h2>{category.title}</h2>
              <p>{category.description}</p>
              <span>{category.count}</span>
            </div>
            <ProductArt shape={categoryShapes[category.art]} className={styles.art} />
            <span className={styles.arrow} aria-hidden="true"><ArrowRight /></span>
          </Link>
        ))}
      </div>

      <div className={styles.stockBar}>
        <Package aria-hidden="true" />
        <div><strong>Остаток в реальном времени</strong><span>Вы видите, что товар точно есть, до оформления заказа</span></div>
        <Link href="/about#stock">Как это работает?<ArrowRight aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
