import { Benefits } from "@/components/Benefits";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";

export default function HomePage() {
  return (
    <main id="main" className="page-main">
      <div className="site-shell">
        <Hero />
        <Benefits />
      </div>
      <Footer />
    </main>
  );
}
