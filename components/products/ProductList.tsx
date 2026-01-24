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
import { toast } from 'sonner';
import Image from 'next/image';

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
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

      // Bildirim Göster
      const quantityText = selectedProduct.unit === 'kg'
        ? `${quantity}g`
        : `${quantity} adet`;

      toast.success(`${selectedProduct.name} sepete eklendi`, {
        description: `${quantityText} ürün sepetinizde.`,
        duration: 3000,
      });

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
      setQuantity(prev => Math.max(500, prev - 100));
    } else {
      setQuantity(prev => Math.max(1, prev - 1));
    }
  };

  const setFixedQuantity = (amount: number) => {
    setQuantity(amount);
  };

  // YENİ EKLENEN FONKSİYON: Manuel giriş kontrolü
  const handleManualInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    // Negatif değer kontrolü
    if (val.includes('-')) return;

    // Boş ise 0 yapma, kullanıcının yazmasına izin ver
    if (val === '') {
      setQuantity(0);
      return;
    }

    const numVal = parseFloat(val);
    if (isNaN(numVal) || numVal < 0) return;

    if (selectedProduct?.unit === 'kg') {
      // Kullanıcı KG girer (örn: 50), biz grama çeviririz (50000)
      setQuantity(Math.round(numVal * 1000));
    } else {
      setQuantity(Math.floor(numVal));
    }
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
        <div className="flex justify-center md:justify-normal items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight text-center md:text-left">
              Tüm <span className="text-red-600">Ürünlerimiz</span>
            </h1>
            <p className="text-stone-600 mt-2">
              Sofralarınıza lezzet katacak en taze et çeşitleri.
            </p>
          </div>
        </div>

        {/* Ürün Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative h-[400px] w-full overflow-hidden rounded-2xl bg-stone-200 shadow-md hover:shadow-xl transition-all duration-500"
            >
              <div className="relative w-full h-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

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
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover"
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

                  {selectedProduct.unit === 'kg' ? (
                    <div className="grid grid-cols-3 gap-3">
                      {[500, 1000, 1500].map((val) => (
                        <Button
                          key={val}
                          variant={quantity === val ? "default" : "outline"}
                          onClick={() => setFixedQuantity(val)}
                          className={`h-10 ${quantity === val ? "bg-stone-900 hover:bg-stone-800" : "border-stone-300 text-stone-600"}`}
                        >
                          {val}g
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-3">
                      {[1, 5, 10].map((val) => (
                        <Button
                          key={val}
                          variant={quantity === val ? "default" : "outline"}
                          onClick={() => setFixedQuantity(val)}
                          className={`h-10 ${quantity === val ? "bg-stone-900 hover:bg-stone-800" : "border-stone-300 text-stone-600"}`}
                        >
                          {val} Adet
                        </Button>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between bg-stone-100 rounded-xl p-2 border border-stone-200">
                    <Button variant="ghost" size="icon" onClick={decrementQuantity} className="h-12 w-12 rounded-lg hover:bg-white hover:shadow-sm">
                      <Minus className="h-5 w-5 text-stone-600" />
                    </Button>

                    {/* GÜNCELLENEN KISIM: Input Alanı */}
                    <div className="flex flex-col items-center justify-center w-full px-2">
                      <div className="flex items-baseline justify-center gap-1">
                        <input
                          type="number"
                          min="0"
                          step={selectedProduct.unit === 'kg' ? "0.1" : "1"}
                          value={
                            quantity === 0 ? '' :
                              selectedProduct.unit === 'kg'
                                ? (quantity / 1000).toString() // Gramı KG'ye çevirip göster
                                : quantity.toString()
                          }
                          onChange={handleManualInput}
                          className="w-24 text-center text-2xl font-bold text-stone-900 bg-transparent border-b border-stone-300 focus:border-stone-900 focus:outline-none p-0 appearance-none"
                          placeholder="0"
                        />
                        <span className="text-stone-500 font-medium text-sm">
                          {selectedProduct.unit === 'kg' ? 'kg' : 'adet'}
                        </span>
                      </div>
                      {selectedProduct.unit === 'kg' && quantity > 0 && (
                        <span className="text-sm text-stone-500 mt-1">
                          ({quantity}g)
                        </span>
                      )}
                    </div>

                    <Button variant="ghost" size="icon" onClick={incrementQuantity} className="h-12 w-12 rounded-lg hover:bg-white hover:shadow-sm">
                      <Plus className="h-5 w-5 text-stone-600" />
                    </Button>
                  </div>
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