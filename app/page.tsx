import About from "@/components/home/About";
import Contact from "@/components/home/Contact";
import Hero from "@/components/home/Hero";
import PopularProducts from "@/components/home/PopularProducts";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* 1. Giriş Ekranı */}
      <Hero />

      {/* 2. Popüler Ürünler Vitrini */}
      <PopularProducts />

      {/* 3. Hakkımızda Özeti */}
      <About />

      {/* 4. İletişim Bilgileri */}
      <Contact />

    </div>
  );
}