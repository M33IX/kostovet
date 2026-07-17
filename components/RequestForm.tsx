"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import styles from "./RequestForm.module.css";

export function RequestForm({ product }: { product?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const response = await fetch("/api/request", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error("Request failed");
      setState("sent");
      event.currentTarget.reset();
    } catch {
      setState("error");
    }
  }

  if (state === "sent") return <div className={styles.success} role="status"><strong>Заявка принята</strong><span>Менеджер свяжется с вами в рабочее время.</span></div>;

  return (
    <form className={styles.form} onSubmit={submit}>
      <input type="text" name="website" className={styles.honeypot} tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {product && <input type="hidden" name="product" value={product} />}
      <label>Имя<input name="name" required minLength={2} autoComplete="name" /></label>
      <label>Телефон<input name="phone" required type="tel" autoComplete="tel" placeholder="+7 900 000-00-00" /></label>
      <label>Email для документов<input name="email" type="email" autoComplete="email" /></label>
      <label>Компания / ИНН<input name="company" autoComplete="organization" /></label>
      <label className={styles.message}>Комментарий<textarea name="message" rows={4} defaultValue={product ? `Интересует: ${product}` : ""} /></label>
      <label className={styles.consent}>
        <input type="checkbox" name="consent" value="yes" required />
        <span>Согласен с <Link href="/legal/consent">условиями обработки персональных данных</Link> и <Link href="/legal/privacy">политикой конфиденциальности</Link>.</span>
      </label>
      <button className="primary-button" type="submit" disabled={state === "sending"}>{state === "sending" ? "Отправляем…" : "Отправить заявку"}</button>
      {state === "error" && <p className={styles.error} role="alert">Не удалось отправить заявку. Позвоните нам: +7 (961) 189-89-33.</p>}
    </form>
  );
}
