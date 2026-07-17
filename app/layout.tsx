import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { CookieBanner } from "@/components/CookieBanner";
import { SiteDrawerProvider } from "@/components/SiteDrawer";

export const metadata: Metadata = {
  metadataBase: new URL("https://kosto-vet.ru"),
  title: { default: "Kosto-Vet — импланты для ветеринарного остеосинтеза", template: "%s — Kosto-Vet" },
  description: "Пластины, винты, инструменты и шовный материал со склада в Воронеже. Доставка по городу за 2–4 часа.",
  openGraph: {
    title: "Kosto-Vet — нужный имплант уже на складе",
    description: "Профессиональные импланты для ветеринарной травматологии и ортопедии.",
    type: "website",
    locale: "ru_RU",
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#ffffff" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["Store", "LocalBusiness"],
    name: "Kosto-Vet",
    url: "https://kosto-vet.ru",
    telephone: "+7-961-189-89-33",
    email: "Kosto-Vet@yandex.ru",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Воронеж",
      streetAddress: "ул. Димитрова, 56а",
      addressCountry: "RU",
    },
  };

  return (
    <html lang="ru">
      <body>
        <a className="skip-link" href="#main">К основному содержанию</a>
        <SiteDrawerProvider>
          <Header />
          {children}
          <CookieBanner />
        </SiteDrawerProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </body>
    </html>
  );
}
