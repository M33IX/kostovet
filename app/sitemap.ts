import type { MetadataRoute } from "next";
import { categories, products } from "@/lib/catalog";
import { articles } from "@/lib/articles";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://kosto-vet.ru";
  const routes = ["", "/catalog", "/about", "/delivery", "/contacts", "/blog", "/documents", "/legal/privacy", "/legal/consent", "/legal/terms", "/legal/requisites"];
  return [...routes.map((route) => ({ url: `${base}${route}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: route === "" ? 1 : .7 })), ...categories.map(({ slug }) => ({ url: `${base}/catalog/${slug}`, lastModified: new Date(), changeFrequency: "daily" as const, priority: .8 })), ...products.map(({ slug }) => ({ url: `${base}/catalog/${slug}`, lastModified: new Date(), changeFrequency: "daily" as const, priority: .8 })), ...articles.map(({slug})=>({url:`${base}/blog/${slug}`,lastModified:new Date(),changeFrequency:"monthly" as const,priority:.6}))];
}
