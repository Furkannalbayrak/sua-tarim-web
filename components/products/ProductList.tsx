"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { Plus, Scale, Minus, ShoppingCart, Filter, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCartStore } from '@/lib/store';

// Genişletilmiş Örnek Veriler
const ALL_PRODUCTS: Product[] = [
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
    image: 'https://plus.unsplash.com/premium_photo-1668616817076-0e0ce58b6189?q=80&w=687&auto=format&fit=crop',
    category: 'Dana Eti',
    unit: 'kg',
  },
  {
    id: '3',
    name: 'Kuzu Pirzola',
    description: 'Balıkesir kuzusu, körpe pirzola.',
    price: 650,
    image: 'https://images.unsplash.com/photo-1666013942642-b7b54ecafd7d?q=80&w=1170&auto=format&fit=crop',
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
  },
  {
    id: '5',
    name: 'Dana Antrikot',
    description: 'Mermerimsi yağ dokusuyla yumuşacık dana antrikot.',
    price: 750,
    image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5e?q=80&w=1000&auto=format&fit=crop',
    category: 'Dana Eti',
    unit: 'kg',
  },
  {
    id: '6',
    name: 'Kuzu Kol',
    description: 'Fırın yemekleri için ideal, lezzetli kuzu kol.',
    price: 550,
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=1000&auto=format&fit=crop',
    category: 'Kuzu Eti',
    unit: 'kg',
  },
  {
    id: '7',
    name: 'Kasap Sucuk',
    description: 'Geleneksel yöntemlerle hazırlanmış fermente kasap sucuk.',
    price: 600,
    image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1000&auto=format&fit=crop',
    category: 'Şarküteri',
    unit: 'kg',
  },
  {
    id: '8',
    name: 'Dana Bonfile',
    description: 'Dananın en değerli ve yumuşak bölgesi.',
    price: 950,
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=1000&auto=format&fit=crop',
    category: 'Dana Eti',
    unit: 'kg',
  }
];

export default function ProductList() {
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

  const handleAddToCart = () => {
    if (selectedProduct && quantity > 0) {
      addItem(selectedProduct, quantity);
      setSelectedProduct(null);
    }
  };

  const incrementQuantity = () => {
    if (!selectedProduct) return;
    if (selectedProduct.unit === 'kg') {
      setQuantity(prev => prev + 100);
    } else {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (!selectedProduct) return;
    if (selectedProduct.unit === 'kg') {
      setQuantity(prev => Math.max(100, prev - 100));
    } else {
      setQuantity(prev => Math.max(1, prev - 1));
    }
  };

  const setFixedQuantity = (amount: number) => {
    setQuantity(amount);
  };

  const calculatePrice = () => {
    if (!selectedProduct) return "0.00";
    if (selectedProduct.unit === 'kg') {
      return (selectedProduct.price * (quantity / 1000)).toFixed(2);
    }
    return (selectedProduct.price * quantity).toFixed(2);
  };

  return (
    <section className="py-12 bg-stone-50 min-h-screen">
      <div className="container mx-auto px-6 md:px-10 max-w-7xl">

        {/* Başlık ve Filtre Alanı */}
        <div className="flex flex-col sm:flex-row justify-between md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight">
              Tüm <span className="text-red-600">Ürünlerimiz</span>
            </h1>
            <p className="text-stone-600 mt-2">
              Sofralarınıza lezzet katacak en taze et çeşitleri.
            </p>
          </div>

          <Button variant="outline" className="gap-2 border-stone-300">
            <Filter className="w-4 h-4" />
            Filtrele
          </Button>
        </div>

        {/* Ürün Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ALL_PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="group relative h-[400px] w-full overflow-hidden rounded-2xl bg-stone-200 shadow-md hover:shadow-xl transition-all duration-500"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

              <div className="absolute top-4 left-4">
                <span className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  {product.category}
                </span>
              </div>

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
                    <span>Seç</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ürün Detay Sheet (Aynı Yapı) */}
      <Sheet open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto bg-white p-0 border-l-stone-200">
          {selectedProduct && (
            <div className="flex flex-col h-full">
              <div className="relative h-64 w-full shrink-0">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* ÖZEL KAPATMA BUTONU */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 bg-black/50 text-white rounded-full h-10 w-10 z-10 backdrop-blur-sm border border-white/20"
                  onClick={() => setSelectedProduct(null)}
                >
                  <X className="h-6 w-6" />
                </Button>

                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded mb-2 inline-block">
                    {selectedProduct.category}
                  </span>
                  <SheetTitle className="text-3xl font-bold text-white">{selectedProduct.name}</SheetTitle>
                </div>
              </div>

              <div className="flex-1 p-6 space-y-8">
                <SheetDescription className="text-stone-600 text-base">
                  {selectedProduct.description}
                </SheetDescription>

                <div className="space-y-4">
                  <h4 className="font-semibold text-stone-900 flex items-center gap-2">
                    <Scale className="h-4 w-4" />
                    Miktar Belirle
                  </h4>

                  {selectedProduct.unit === 'kg' && (
                    <div className="grid grid-cols-3 gap-3">
                      {[250, 500, 1000].map((val) => (
                        <Button
                          key={val}
                          variant={quantity === val ? "default" : "outline"}
                          onClick={() => setFixedQuantity(val)}
                          className={`h-10 ${quantity === val ? "bg-stone-900 hover:bg-stone-800" : "border-stone-300 text-stone-600"}`}
                        >
                          {val >= 1000 ? '1 Kg' : `${val}g`}
                        </Button>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between bg-stone-100 rounded-xl p-2 border border-stone-200">
                    <Button variant="ghost" size="icon" onClick={decrementQuantity} className="h-12 w-12 rounded-lg hover:bg-white hover:shadow-sm">
                      <Minus className="h-5 w-5 text-stone-600" />
                    </Button>
                    <div className="text-center">
                      <span className="text-2xl font-bold text-stone-900 block">
                        {selectedProduct.unit === 'kg' ? `${quantity}g` : quantity}
                      </span>
                      {selectedProduct.unit === 'kg' && (
                        <span className="text-xs text-stone-500 font-medium">{(quantity / 1000).toFixed(2)} kg</span>
                      )}
                    </div>
                    <Button variant="ghost" size="icon" onClick={incrementQuantity} className="h-12 w-12 rounded-lg hover:bg-white hover:shadow-sm">
                      <Plus className="h-5 w-5 text-stone-600" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-900">Kasap Notu (İsteğe Bağlı)</label>
                  <textarea
                    className="w-full min-h-[80px] p-3 rounded-lg border border-stone-200 bg-stone-50 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 resize-none"
                    placeholder="Örn: Yağsız olsun, kuşbaşı doğransın..."
                  />
                </div>
              </div>

              <div className="p-6 bg-stone-50 border-t border-stone-200 mt-auto">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm text-stone-500">
                    Birim Fiyat: <span className="font-medium text-stone-900">{selectedProduct.price} ₺</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-stone-500 block">Toplam Tutar</span>
                    <span className="text-2xl font-bold text-red-600">{calculatePrice()} ₺</span>
                  </div>
                </div>
                <Button
                  className="w-full bg-red-600 hover:bg-red-700 text-white h-14 text-lg rounded-xl shadow-lg shadow-red-200 transition-all active:scale-95"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Sepete Ekle
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </section>
  );
}