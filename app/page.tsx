import About from "@/components/home/About";
import Contact from "@/components/home/Contact";
import Hero from "@/components/home/Hero";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { getPopularProducts } from "@/services/productsService";
import PopularProducts from "@/components/home/PopularProducts";

export default async function Home() {

  const popularProducts = await getPopularProducts();

  return (
    <div className="flex flex-col min-h-screen">

      {/* 1. Giriş Ekranı */}
      <Hero />

      {/* 2. Popüler Ürünler Vitrini */}
      <PopularProducts products={popularProducts} />

      {/* 3. Hakkımızda Özeti */}
      <About />

      {/* 4. İletişim Bilgileri */}
      <Contact />

    </div>
  );
}