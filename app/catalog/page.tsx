import type { Metadata } from "next";
import { CatalogGrid } from "@/components/CatalogGrid";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Каталог имплантов",
  description: "Пластины, винты, инструменты и шовный материал для ветеринарного остеосинтеза со склада в Воронеже.",
};

export default function CatalogPage() {
  return <main id="main" className="page-main"><div className="site-shell"><CatalogGrid /></div><Footer /></main>;
}
