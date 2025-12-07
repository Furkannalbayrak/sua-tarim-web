"use client";

import Link from "next/link";
import { Menu, Home, ShoppingBag, Info, Phone, Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { useState } from "react";

export default function MobileNav() {
  const [open, setOpen] = useState<boolean>(false);

  const routes = [
    { href: "/", label: "Anasayfa", icon: Home },
    { href: "/products", label: "Ürünler", icon: ShoppingBag },
    { href: "/#about", label: "Hakkımızda", icon: Info },
    { href: "/#contact", label: "İletişim", icon: Phone },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden hover:bg-stone-100 rounded-full">
          <Menu className="w-6 h-6 text-stone-800" />
          <span className="sr-only">Menüyü aç</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] flex flex-col bg-stone-50 border-r-stone-200">
        <SheetHeader className="text-left border-b border-stone-200 pb-6">
          <SheetTitle className="text-2xl font-extrabold tracking-tight text-stone-900 flex items-center gap-2">
            <span className="bg-red-600 text-white px-2 py-1 rounded-lg text-lg">Sua</span>
            Tarım
          </SheetTitle>
          <p className="text-sm text-stone-500 font-medium">Doğallığın ve Lezzetin Adresi</p>
        </SheetHeader>

        <nav className="flex flex-col gap-2 flex-1">
          {routes.map((route) => {
            const Icon = route.icon;
            return (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-4 px-4 py-3 text-lg font-medium text-stone-600 hover:text-red-600 hover:bg-white hover:shadow-sm rounded-xl transition-all duration-200 group"
              >
                <div className="p-2 bg-stone-100 rounded-lg group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                {route.label}
              </Link>
            );
          })}
        </nav>

        <SheetFooter className="mt-auto border-t border-stone-200 pt-6">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center justify-center gap-4">
              <Button variant="ghost" size="icon" className="hover:text-red-600 hover:bg-red-50 rounded-full">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-blue-600 hover:bg-blue-50 rounded-full">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-sky-500 hover:bg-sky-50 rounded-full">
                <Twitter className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-xs text-center text-stone-400">
              © 2025 Sua Tarım. Tüm hakları saklıdır.
            </p>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}