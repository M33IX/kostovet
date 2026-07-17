"use client";

import { Menu, Search, UserRound, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Logo } from "./Logo";
import { products } from "@/lib/catalog";
import { useSiteDrawer } from "./SiteDrawer";
import styles from "./Header.module.css";

const links = [["Каталог", "/catalog"],["Доставка", "/delivery"],["О компании", "/about"],["Контакты", "/contacts"],["Блог", "/blog"]] as const;

export function Header() {
  const pathname = usePathname();
  const { openAccount } = useSiteDrawer();
  const [panel, setPanel] = useState<"search" | "menu" | null>(null);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => products.filter((product) => `${product.name} ${product.article}`.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 5), [query]);

  useEffect(() => setPanel(null), [pathname]);
  useEffect(() => { if (panel === "search") window.setTimeout(() => inputRef.current?.focus(), 120); }, [panel]);
  useEffect(() => { const onKey = (event: KeyboardEvent) => event.key === "Escape" && setPanel(null); window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); }, []);
  const toggle = (next: typeof panel) => setPanel((current) => current === next ? null : next);

  return <header className={styles.header}>
    <div className={`site-shell ${styles.bar}`}>
      <Logo />
      <nav className={styles.nav} aria-label="Основная навигация">{links.map(([label,href])=><Link className={pathname.startsWith(href) ? styles.active : undefined} href={href} key={href}>{label}</Link>)}</nav>
      <div className={styles.actions}>
        <button type="button" onClick={()=>toggle("search")} aria-label="Открыть поиск" aria-expanded={panel==="search"}>{panel==="search"?<X/>:<Search/>}</button>
        <button type="button" onClick={openAccount} aria-label="Личный кабинет"><UserRound/></button>
        <button type="button" onClick={()=>toggle("menu")} aria-label="Открыть меню" aria-expanded={panel==="menu"}>{panel==="menu"?<X/>:<Menu/>}</button>
      </div>
    </div>
    {panel && <button className={styles.scrim} aria-label="Закрыть панель" onClick={()=>setPanel(null)}/>} 
    {panel==="search"&&<section className={`${styles.panel} ${styles.searchPanel}`} aria-label="Поиск по каталогу"><div className="site-shell"><label htmlFor="site-search">Поиск по названию, артикулу или размеру</label><div className={styles.searchField}><Search/><input id="site-search" ref={inputRef} value={query} onChange={(event)=>setQuery(event.target.value)} placeholder="Например, пластина Т-образная 58 мм"/></div>{query&&<div className={styles.results}>{results.length?results.map((result)=><Link href={`/catalog/${result.slug}`} key={result.slug}><span>{result.name}</span><small>{result.article} · {result.stock?`В наличии: ${result.stock} шт.`:"Нет в наличии"}</small></Link>):<p>Ничего не нашли. Попробуйте изменить параметры поиска.</p>}</div>}</div></section>}
    {panel==="menu"&&<nav className={`${styles.panel} ${styles.menuPanel}`} aria-label="Расширенное меню">{links.map(([label,href])=><Link href={href} key={href}>{label}<span>↗</span></Link>)}<Link href="/legal/terms">Документы<span>↗</span></Link><Link href="tel:+79611898933">+7 (961) 189-89-33</Link></nav>}
  </header>;
}
