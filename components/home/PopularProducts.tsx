"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { Plus, Scale, Minus, ShoppingBasket, ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { useCartStore } from '@/lib/store';

// Örnek Veriler (Aynı kalacak)
const POPULAR_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Dana Kıyma',
    description: 'Az yağlı, günlük taze çekim dana kıyma.',
    price: 450,
    image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?q=80&w=1000&auto=format&fit=crop',
    category: 'Dana Eti',
    unit: 'kg',
  },
  {
    id: '2',
    name: 'Dana Kuşbaşı',
    description: 'Yumuşak, sinirsiz dana buttan kuşbaşı.',
    price: 480,
    image: 'https://plus.unsplash.com/premium_photo-1668616817076-0e0ce58b6189?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Dana Eti',
    unit: 'kg',
  },
  {
    id: '3',
    name: 'Kuzu Pirzola',
    description: 'Balıkesir kuzusu, körpe pirzola.',
    price: 650,
    image: 'https://images.unsplash.com/photo-1666013942642-b7b54ecafd7d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Kuzu Eti',
    unit: 'kg',
  },
  {
    id: '4',
    name: 'Kasap Köfte',
    description: 'Özel baharat karışımımızla hazırlanan ev yapımı tadında köfte.',
    price: 420,
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=1000&auto=format&fit=crop',
    category: 'Köfte',
    unit: 'kg',
  }
];

export default function PopularProducts() {

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const addItem = useCartStore((state) => state.addItem);

  const handleOpenProduct = (product: Product) => {
    setSelectedProduct(product);

    if (product.unit === 'kg') {
      setQuantity(500);
    } else {
      setQuantity(1);
    }
  }

  // Sepete Ekleme Fonksiyonu
  const handleAddToCart = () => {
    if (selectedProduct && quantity > 0) {
      addItem(selectedProduct, quantity);
      setSelectedProduct(null); // Paneli kapat
    }
  };

  // Miktar Artırma
  const incrementQuantity = () => {
    if (!selectedProduct) return;
    if (selectedProduct.unit === 'kg') {
      setQuantity(prev => prev + 100); // 100g artır
    } else {
      setQuantity(prev => prev + 1);
    }
  };

  // Miktar Azaltma
  const decrementQuantity = () => {
    if (!selectedProduct) return;
    if (selectedProduct.unit === 'kg') {
      setQuantity(prev => Math.max(100, prev - 100)); // En az 100g
    } else {
      setQuantity(prev => Math.max(1, prev - 1));
    }
  };

  // Hızlı Seçim Butonları için
  const setFixedQuantity = (amount: number) => {
    setQuantity(amount);
  };

  // Anlık Fiyat Hesaplama
  const calculatePrice = () => {
    if (!selectedProduct) return "0.00";
    if (selectedProduct.unit === 'kg') {
      return (selectedProduct.price * (quantity / 1000)).toFixed(2);
    }
    return (selectedProduct.price * quantity).toFixed(2);
  };

  return (
    <section className="py-20 bg-stone-50">
      <div className="container mx-auto px-4 md:px-10 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-4 tracking-tight">
            Tezgâhın <span className="text-red-600">Yıldızları</span>
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto text-lg">
            Usta kasaplarımızın özenle hazırladığı, en taze ve en lezzetli et çeşitleri.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {POPULAR_PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="group relative h-[400px] w-full overflow-hidden rounded-2xl bg-stone-200 shadow-md hover:shadow-xl transition-all duration-500"
            >
              {/* Arka Plan Resmi */}
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Karartma Gradyanı (Yazıların okunması için) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Üst Etiket */}
              <div className="absolute top-4 left-4">
                <span className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  {product.category}
                </span>
              </div>

              {/* İçerik Alanı (Alt Kısım) */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-0 group-hover:-translate-y-2 transition-transform duration-300">
                <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                  {product.name}
                </h3>

                <p className="text-stone-300 text-sm mb-4 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 h-0 group-hover:h-auto">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex flex-col shrink-0">
                    <span className="text-stone-200 text-xs uppercase tracking-wider">Fiyat</span>
                    <span className="text-2xl font-bold text-white">
                      {product.price} ₺ <span className="text-sm text-stone-400 font-normal">/ {product.unit}</span>
                    </span>
                  </div>

                  <Button
                    className="w-auto px-6 bg-white text-stone-900 hover:bg-red-600 hover:text-white font-bold h-12 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                    onClick={() => handleOpenProduct(product)}
                  >
                    <Scale className="h-5 w-5 text-stone-600 group-hover/btn:text-white transition-colors" />
                    <span>Miktar Seç</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button variant="outline" size="lg" className="border-stone-400 text-stone-700 hover:bg-stone-900 hover:text-white hover:border-stone-900 px-10 py-6 text-lg rounded-full transition-all duration-300">
            <ShoppingBasket className="mr-2 h-5 w-5" />
            Tüm Ürünleri İncele
          </Button>
        </div>
      </div>

    </section>
  );
}