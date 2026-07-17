"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./CookieBanner.module.css";

type Consent = "accepted" | "declined";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => setVisible(!localStorage.getItem("kosto-vet-cookie-consent")), []);

  const choose = (consent: Consent) => {
    localStorage.setItem("kosto-vet-cookie-consent", consent);
    if (consent === "accepted") window.dispatchEvent(new CustomEvent("kosto-vet:analytics-consent"));
    setVisible(false);
  };

  if (!visible) return null;
  return (
    <aside className={styles.banner} aria-label="Настройки cookie">
      <p>Мы используем cookie для работы сайта. Аналитика включится только после вашего согласия. <Link href="/legal/privacy">Подробнее</Link></p>
      <div>
        <button className={styles.decline} type="button" onClick={() => choose("declined")}>Отклонить</button>
        <button className={styles.accept} type="button" onClick={() => choose("accepted")}>Принять</button>
      </div>
    </aside>
  );
}
