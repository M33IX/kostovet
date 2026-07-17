import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import styles from "./marketing.module.css";
export default function NotFound(){return <main id="main" className="page-main"><div className="site-shell"><section className={styles.notFound}><div><strong>404</strong><h1>Кажется, эта<br/>страница убежала.</h1><p>Но наши специалисты на месте и готовы помочь.<br/>Вы можете вернуться на главную страницу<br/>или перейти в каталог.</p><div className={styles.buttonRow}><Link className="primary-button" href="/">На главную <ArrowRight/></Link><Link className="secondary-button" href="/catalog">Перейти в каталог <ArrowRight/></Link></div></div><Image src="/assets/1.png" width={3536} height={2992} alt="Рыжий кот смотрит вверх"/></section></div><Footer/></main>}
