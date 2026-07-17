"use client";

import { createContext, FormEvent, ReactNode, useContext, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Box, Building2, Check, Clock3, FileDown, FileText, Headphones, Heart, LogOut, MapPin, Minus, PackageCheck, Phone, Plus, RefreshCcw, Send, ShieldCheck, ShoppingBag, UserRound, X } from "lucide-react";
import type { Product } from "@/lib/catalog";
import { formatPrice } from "@/lib/catalog";
import { ProductArt } from "./ProductArt";
import styles from "./SiteDrawer.module.css";

type Mode = "login" | "register" | "account" | "order" | null;
type DrawerContextValue = {
  openAccount: () => void;
  openLogin: () => void;
  openRegister: () => void;
  openOrder: (product: Product) => void;
  close: () => void;
};

const DrawerContext = createContext<DrawerContextValue | null>(null);

export function useSiteDrawer() {
  const value = useContext(DrawerContext);
  if (!value) throw new Error("useSiteDrawer must be used inside SiteDrawerProvider");
  return value;
}

export function SiteDrawerProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const panelRef = useRef<HTMLElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  const close = () => setMode(null);
  const value = useMemo<DrawerContextValue>(() => ({
    openAccount: () => setMode(loggedIn ? "account" : "login"),
    openLogin: () => setMode("login"),
    openRegister: () => setMode("register"),
    openOrder: (item) => { setProduct(item); setQuantity(1); setMode("order"); },
    close,
  }), [loggedIn]);

  useEffect(() => {
    if (!mode) return;
    previousFocus.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => panelRef.current?.querySelector<HTMLElement>("button, input, a")?.focus(), 80);
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previousFocus.current?.focus();
    };
  }, [mode]);

  function authenticate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoggedIn(true);
    setMode("account");
  }

  function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMode("account");
    setLoggedIn(true);
  }

  return (
    <DrawerContext.Provider value={value}>
      {children}
      {mode && <div className={styles.portal} role="presentation">
        <button className={styles.scrim} type="button" aria-label="Закрыть панель" onClick={close} />
        <aside className={styles.drawer} ref={panelRef} role="dialog" aria-modal="true" aria-label={mode === "order" ? "Ваш заказ" : "Кабинет клиники"}>
          <div className={styles.drawerHead}><h2>{mode === "order" ? "Ваш заказ" : "Кабинет клиники"}</h2><button type="button" onClick={close} aria-label="Закрыть"><X /></button></div>
          {(mode === "login" || mode === "register") && <>
            <p className={styles.lead}>{mode === "login" ? "Войдите в кабинет, чтобы видеть заказы, избранное и персональные условия" : "Создайте кабинет, чтобы видеть заказы, сохранять избранное и ускорить оформление"}</p>
            <div className={styles.tabs} role="tablist"><button type="button" className={mode === "login" ? styles.active : ""} onClick={() => setMode("login")}>Вход</button><button type="button" className={mode === "register" ? styles.active : ""} onClick={() => setMode("register")}>Регистрация</button></div>
          </>}
          {mode === "login" && <form className={styles.authForm} onSubmit={authenticate}>
            <label><span className="sr-only">Телефон или email</span><input required placeholder="Телефон или email" autoComplete="username" /></label>
            <label><span className="sr-only">Пароль</span><input required type="password" placeholder="Пароль" autoComplete="current-password" /></label>
            <button className={styles.blackButton}>Войти</button>
            <div className={styles.or}><span />или<span /></div>
            <button className={styles.outlineButton} type="button"><Phone />Получить код по телефону</button>
            <button className={styles.linkButton} type="button">Забыли пароль?</button>
            <div className={styles.authBenefits}><Feature icon={ShieldCheck} title="Безопасность данных" text="Мы не передаём ваши данные третьим лицам и надёжно их защищаем"/><Feature icon={Clock3} title="Быстрый доступ" text="Повторяйте заказы в один клик и экономьте время"/><Feature icon={FileText} title="Документы под рукой" text="Счета, накладные и сертификаты всегда доступны в кабинете"/></div>
            <p className={styles.switchText}>Нет кабинета? <button type="button" onClick={() => setMode("register")}>Зарегистрироваться</button></p>
          </form>}
          {mode === "register" && <form className={styles.authForm} onSubmit={authenticate}>
            <p>Заполните основные данные клиники.<br/>Остальные реквизиты можно добавить позже в кабинете.</p>
            <Field label="Название клиники" placeholder="Например, ВетПлюс" />
            <Field label="Контактное лицо" placeholder="Иванов Иван Иванович" />
            <Field label="Телефон" placeholder="+7 (___) ___-__-__" type="tel" />
            <Field label="Email" placeholder="example@clinic.ru" type="email" />
            <label className={styles.field}><span>Город <b>*</b></span><select required defaultValue=""><option value="" disabled>Например, Воронеж</option><option>Воронеж</option><option>Москва</option><option>Другой город</option></select></label>
            <button className={styles.blackButton}>Создать кабинет</button>
            <small>Нажимая «Создать кабинет», вы соглашаетесь с <Link href="/legal/terms">пользовательским соглашением</Link> и <Link href="/legal/privacy">политикой конфиденциальности</Link>.</small>
            <p className={styles.switchText}>Уже есть кабинет? <button type="button" onClick={() => setMode("login")}>Войти</button></p>
          </form>}
          {mode === "account" && <AccountContent onLogout={() => { setLoggedIn(false); setMode("login"); }} />}
          {mode === "order" && product && <form className={styles.order} onSubmit={submitOrder}>
            <div className={styles.orderProduct}><div><ProductArt shape={product.shape}/></div><p><strong>{product.name}</strong><span>{product.specs.Длина || product.subtitle}</span><small>Артикул: {product.article}</small></p></div>
            <strong className={styles.orderPrice}>{formatPrice(product.price * quantity)}</strong>
            <hr/><label>Количество</label><div className={styles.counter}><button type="button" onClick={() => setQuantity((n) => Math.max(1,n-1))}><Minus/></button><span>{quantity}</span><button type="button" onClick={() => setQuantity((n) => n+1)}><Plus/></button></div>
            <hr/><fieldset><legend>Способ получения</legend><label><input type="radio" name="delivery" defaultChecked/>Доставка по Воронежу (2–4 часа) <ShoppingBag/></label><label><input type="radio" name="delivery"/>Самовывоз <MapPin/></label><label><input type="radio" name="delivery"/>Доставка по России (1–3 дня) <Box/></label></fieldset>
            <hr/><h3>Контактные данные</h3><input required placeholder="Ваше имя*"/><input required type="tel" placeholder="Телефон*"/><input placeholder="Клиника"/><hr/><h3>Комментарий к заказу</h3><textarea rows={4} placeholder="Например: нужна сегодня до 17:00"/>
            <button className={styles.blackButton}>Оформить заказ</button><small className={styles.secure}><ShieldCheck/>Мы не передаём ваши данные третьим лицам</small><p className={styles.orderHint}>Наш специалист свяжется с вами<br/>в течение нескольких минут.</p>
          </form>}
        </aside>
      </div>}
    </DrawerContext.Provider>
  );
}

function Field({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) { return <label className={styles.field}><span>{label} <b>*</b></span><input required type={type} placeholder={placeholder}/></label>; }
function Feature({ icon: Icon, title, text }: { icon: typeof ShieldCheck; title: string; text: string }) { return <div className={styles.feature}><Icon/><p><strong>{title}</strong><span>{text}</span></p></div>; }

function AccountContent({ onLogout }: { onLogout: () => void }) {
  const actions = [{icon:RefreshCcw,label:"Повторить заказ"},{icon:PackageCheck,label:"Проверить резерв"},{icon:FileDown,label:"Скачать документы"},{icon:Headphones,label:"Связаться с менеджером"}];
  const rows = [{icon:ShoppingBag,label:"Мои заказы",count:"6"},{icon:Heart,label:"Избранное",count:"12"},{icon:FileText,label:"Реквизиты клиники"},{icon:MapPin,label:"Адреса доставки",count:"3"},{icon:FileText,label:"Документы"},{icon:UserRound,label:"Контактный менеджер"}];
  return <div className={styles.account}><div className={styles.clinic}><div><Building2/></div><p><strong>ВетПлюс <span><Check/>Подтверждён</span></strong><span>Клиника, г. Воронеж</span><span>ИНН 3661234567</span></p></div><section><h3>Быстрые действия</h3><div className={styles.quick}>{actions.map(({icon:Icon,label})=><button key={label}><Icon/><span>{label}</span></button>)}</div></section><section className={styles.accountRows}>{rows.map(({icon:Icon,label,count})=><button key={label}><Icon/><span>{label}</span>{count&&<small>{count}</small>}<ArrowRight/></button>)}<button onClick={onLogout}><LogOut/><span>Выйти из кабинета</span></button></section><section className={styles.manager}><div className={styles.avatar}>МС</div><p><small>Ваш персональный менеджер</small><strong>Мария Смирнова</strong><span>+7 (961) 189–89–33</span><a href="https://t.me/+PkpzRYvAZABkZTIy"><Send/>Написать в Telegram</a></p></section></div>;
}

export function OrderButton({ product, className = "" }: { product: Product; className?: string }) {
  const { openOrder } = useSiteDrawer();
  return <button type="button" className={className} onClick={() => openOrder(product)}>Заказать <ArrowRight/></button>;
}
