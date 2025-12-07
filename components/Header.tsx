'use client'

import Link from "next/link";
import { ShoppingCart, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import MobileNav from "./MobileNav";
import { useCartStore } from "@/lib/store";

export default function Header() {

  const itemLenght = useCartStore((state) => state.items.length);

  const routes = [
    { href: '/', label: "Anasayfa" },
    { href: '/products', label: "Ürünler" },
    { href: '/#about', label: "Hakkımızda" },
    { href: '/#contact', label: "İletişim" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-100 bg-white/80 backdrop-blur-md">
      <div className="flex h-16 items-center w-full justify-between mx-auto px-4 md:px-10 max-w-7xl">

        <div className="lg:hidden">
          <MobileNav />
        </div>

        {/* Logo / Dükkan Adı */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold tracking-tight text-stone-900">
            🥩 Şua Tarım
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="group relative text-base font-medium text-stone-600 transition-colors hover:text-red-700"
            >
              {route.label}
              {/* Animasyonlu Çizgi */}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-red-600 transition-all duration-300 ease-out group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Sağ Taraf: Telefon ve Sepet */}
        <div className="flex items-center gap-4">

          <a
            href="https://wa.me/905555555555"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-2 rounded-full bg-green-500 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-green-600 shadow-sm"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Bize Yazın</span>
          </a>


          {/* Sepet Butonu */}
          <Link href={'/cart'}>
            <Button variant="outline" className="relative">
              <ShoppingCart className="h-5 w-5 mr-1" />
              <span className="font-semibold">Sepet</span>
              {/* Sepet Sayacı (Mock Data) */}
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                {itemLenght}
              </span>
            </Button>
          </Link>

        </div>
      </div>
    </header>
  );
}