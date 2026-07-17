import Link from "next/link";
import Image from "next/image";
import { Send, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={`site-shell ${styles.footer}`}>
      <div className={styles.top}>
        <section className={styles.brand}>
          <Logo footer />
          <p>Поставляем импланты для остеосинтеза животным клиникам и ветеринарным центрам по всей России.</p>
          <Image className={styles.cat} src="/assets/4.png" width={778} height={778} sizes="260px" alt="Рыжий кот рядом с ветеринарной пластиной" />
        </section>
        <nav aria-label="Разделы каталога">
          <h2>Каталог</h2>
          <Link href="/catalog/plates">Пластины</Link>
          <Link href="/catalog/screws">Винты</Link>
          <Link href="/catalog/tools">Инструменты</Link>
          <Link href="/catalog/sutures">Шовный материал</Link>
          <Link href="/catalog/sets">Наборы</Link>
        </nav>
        <nav aria-label="Информация о компании">
          <h2>Компания</h2>
          <Link href="/about">О компании</Link>
          <Link href="/delivery">Доставка</Link>
          <Link href="/contacts">Контакты</Link>
          <Link href="/blog">Новости</Link>
          <Link href="/blog">Статьи</Link>
          <Link href="/legal/terms">Документы</Link>
        </nav>
        <section className={styles.contacts}>
          <h2>Контакты</h2>
          <a href="tel:+79611898933">+7 (961) 189-89-33</a>
          <a href="mailto:Kosto-Vet@yandex.ru">Kosto-Vet@yandex.ru</a>
          <p>Россия, Воронежская обл.,<br />г. Воронеж, ул. Димитрова 56а</p>
          <a href="https://t.me/+PkpzRYvAZABkZTIy"><Send aria-hidden="true" />Telegram</a>
          <a href="https://wa.me/79611898933"><MessageCircle aria-hidden="true" />WhatsApp</a>
          <a href="https://vk.com"><span className={styles.vk} aria-hidden="true">VK</span>VK</a>
        </section>
      </div>
      <div className={styles.bottom}>
        <span>© 2026 Kosto-Vet</span>
        <Link href="/legal/privacy">Политика конфиденциальности</Link>
        <Link href="/legal/consent">Обработка персональных данных</Link>
      </div>
    </footer>
  );
}
