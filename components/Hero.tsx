"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "./Hero.module.css";

const slides = [
  {
    title: "Импланты для остеосинтеза — со склада в Воронеже за 2 часа",
    description: "По Воронежу — доставка за 2–4 часа. В другие города ЦЧР — на следующий день при заявке до 14:00. Работаем в выходные и праздники.",
    image: "/assets/2.png",
    width: 1600,
    height: 1440,
  },
  {
    title: "Когда счет идет на часы — нужный имплант уже должен быть на складе",
    description: "Проверьте наличие прямо сейчас и получите доставку в кратчайшие сроки.",
    image: "/assets/3.png",
    width: 1946,
    height: 1946,
  },
] as const;

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const art = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const slide = slides[active];

  useLayoutEffect(() => {
    const rootElement = root.current;
    if (!rootElement) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visible = true;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: .1 });
    observer.observe(rootElement);

    const context = gsap.context(() => {
      if (!reduced) {
        gsap.fromTo(content.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .72, ease: "power3.out" });
        gsap.fromTo(art.current, { opacity: 0, x: 22 }, { opacity: 1, x: 0, duration: .9, ease: "power3.out" });
      }
    }, root);

    const timer = reduced ? undefined : window.setInterval(() => {
      if (visible) setActive((value) => (value + 1) % slides.length);
    }, 7600);

    return () => {
      observer.disconnect();
      if (timer) window.clearInterval(timer);
      context.revert();
    };
  }, [active]);

  return (
    <section className={styles.hero} ref={root} aria-labelledby="hero-title">
      <div className={styles.content} ref={content}>
        <h1 id="hero-title" className={active === 0 ? styles.uppercase : undefined}>{slide.title}</h1>
        <p>{slide.description}</p>
        <Link className={styles.cta} href="/catalog">
          <span>Проверить наличие</span><ArrowRight aria-hidden="true" />
        </Link>
        <div className={styles.dots} role="group" aria-label="Варианты первого экрана">
          {slides.map((item, index) => (
            <button key={item.title} onClick={() => setActive(index)} aria-label={`Показать слайд ${index + 1}`} aria-current={active === index} />
          ))}
        </div>
      </div>
      <div className={styles.art} ref={art} aria-hidden="true">
        <div className={styles.catCrop}>
          <Image className={styles.heroAsset} src={slide.image} width={slide.width} height={slide.height} sizes="(max-width: 800px) 100vw, 52vw" priority alt="" />
        </div>
      </div>
    </section>
  );
}
