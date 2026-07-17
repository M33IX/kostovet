import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import styles from "../../marketing.module.css";

const pages={privacy:"Политика конфиденциальности",consent:"Согласие на обработку персональных данных",terms:"Пользовательское соглашение",requisites:"Реквизиты компании"} as const;
const sections=[
{title:"Общие положения",text:"Настоящее пользовательское соглашение регулирует отношения между интернет-магазином Kosto-Vet и пользователем при использовании сайта и оформлении заказов."},
{title:"Термины и определения",text:"Сайт — интернет-сайт Kosto-Vet и его поддомены. Товар — продукция, представленная в каталоге. Заказ — оформленный пользователем запрос на покупку товара."},
{title:"Предмет соглашения",text:"Соглашение определяет условия использования сайта, а также порядок приобретения товаров через интернет-магазин."},
{title:"Права и обязанности сторон",text:"Пользователь предоставляет достоверные данные и использует сайт в законных целях. Магазин предоставляет актуальную информацию, обрабатывает заказы и обеспечивает конфиденциальность данных."},
{title:"Оформление заказа",text:"Заказ оформляется через форму на сайте. После оформления менеджер связывается с пользователем для подтверждения и уточнения деталей."},
{title:"Оплата и цены",text:"Цены указаны в рублях Российской Федерации. Актуальная цена отображается на странице товара и подтверждается менеджером."},
{title:"Доставка и передача товара",text:"Сроки и способы доставки зависят от региона. Риск случайной гибели или повреждения товара переходит к покупателю после передачи заказа."},
{title:"Возврат и обмен товара",text:"Возврат и обмен осуществляются в соответствии с законодательством Российской Федерации и условиями поставки медицинских изделий."},
{title:"Ответственность сторон",text:"Стороны несут ответственность за неисполнение обязательств в пределах, установленных действующим законодательством."},
{title:"Интеллектуальная собственность",text:"Материалы сайта, изображения, тексты и элементы фирменного стиля охраняются законодательством об интеллектуальной собственности."},
{title:"Персональные данные",text:"Обработка персональных данных выполняется только для ответа на обращение, оформления заказа и выполнения договорных обязательств."},
{title:"Заключительные положения",text:"Актуальная редакция соглашения всегда размещена на данной странице и вступает в силу с момента публикации."},
];
export function generateStaticParams(){return Object.keys(pages).map(slug=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;return pages[slug as keyof typeof pages]?{title:pages[slug as keyof typeof pages]}:{};}
export default async function LegalPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const title=pages[slug as keyof typeof pages];if(!title)notFound();return <main id="main" className="page-main"><div className="site-shell"><nav className={styles.crumbs}><Link href="/">Главная</Link><span>/</span><span>Документы</span><span>/</span><b>{title}</b></nav><div className={styles.legalLayout}><aside className={styles.legalToc}><h2>Содержание</h2><ol>{sections.map((section,i)=><li key={section.title}><a href={`#legal-${i+1}`}>{section.title}</a></li>)}</ol><a className={styles.download} href="#"><Download/><span><b>Скачать PDF</b><br/><small>Версия от 01.05.2024</small></span></a></aside><article className={styles.legalProse}><h1>{title}</h1><p>Редакция от 01 мая 2024 г.</p><p>Настоящий документ регулирует отношения между интернет-магазином Kosto-Vet и пользователем при использовании сайта и оформлении заказов.</p>{sections.map((section,i)=><section id={`legal-${i+1}`} key={section.title}><h2>{i+1}. {section.title}</h2><p>{section.text}</p>{i===3&&<ul><li>Предоставлять достоверные данные при оформлении заказа.</li><li>Использовать сайт исключительно в законных целях.</li><li>Не нарушать работоспособность сайта.</li></ul>}</section>)}</article></div></div><Footer/></main>}
