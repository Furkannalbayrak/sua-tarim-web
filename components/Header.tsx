'use client'

import Link from "next/link";
import { ShoppingCart, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import MobileNav from "./MobileNav";
import { useCartStore } from "@/lib/store";
import Image from "next/image";

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
      <div className="relative flex h-16 items-center w-full justify-between mx-auto px-4 md:px-10 max-w-7xl">

        <div className="lg:hidden">
          <MobileNav />
        </div>

        {/* Logo / Dükkan Adı */}
        <Link
          href="/"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:static lg:transform-none lg:translate-x-0 lg:translate-y-0 flex items-center gap-2"
        >
          <div className="relative w-12 h-12">
            <Image
              src="/logo.jpeg"
              alt="Şua Tarım Logo"
              fill
              className="object-contain"
            />
          </div>
          {/* İsterseniz yanında yazı da kalsın, istemezseniz silin */}
          <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent hidden sm:block">
            Şua Tarım
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="group relative text-lg font-medium text-stone-600 transition-colors hover:text-red-700"
            >
              {route.label}
              {/* Animasyonlu Çizgi */}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-red-600 transition-all duration-300 ease-out group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Sağ Taraf: Telefon ve Sepet */}
        <div className="flex items-center gap-4">

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