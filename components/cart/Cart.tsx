"use client";

import { useCartStore } from '@/lib/store';
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, CheckCircle, Truck, CreditCard } from "lucide-react";
import Link from 'next/link';
import { Product } from '@/types';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Image from 'next/image';

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart, getCartTotal } = useCartStore();
  const [customerName, setCustomerName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [orderNote, setOrderNote] = useState<string>('');
  // Hata durumlarını tutmak için state ekledik
  const [errors, setErrors] = useState<{ name?: string; address?: string }>({});
  const [isSuccess, setIsSuccess] = useState(false);

  // Ürün Fiyatı Hesaplama
  const calculateItemPrice = (item: Product & { quantity: number }) => {
    if (item.unit === 'kg') {
      return (item.price * (item.quantity / 1000)).toFixed(2);
    }
    return (item.price * item.quantity).toFixed(2);
  };

  // Miktar Artırma
  const incrementQuantity = (item: Product & { quantity: number }) => {
    if (item.unit === 'kg') {
      updateQuantity(item.id, item.quantity + 100);
    } else {
      updateQuantity(item.id, item.quantity + 1);
    }
  };

  // Miktar Azaltma
  const decrementQuantity = (item: Product & { quantity: number }) => {
    if (item.unit === 'kg') {
      const newQuantity = Math.max(100, item.quantity - 100);
      updateQuantity(item.id, newQuantity);
    } else {
      const newQuantity = Math.max(1, item.quantity - 1);
      updateQuantity(item.id, newQuantity);
    }
  };

  // Sayfa yüklendiğinde kayıtlı bilgileri getir
  useEffect(() => {
    const savedName = localStorage.getItem('customerName');
    const savedAddress = localStorage.getItem('customerAddress');

    if (savedName) setCustomerName(savedName);
    if (savedAddress) setAddress(savedAddress);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isSuccess]);

  const handleCheckout = () => {
    // Hata kontrolü
    if (getCartTotal() < 1000) {
      alert("Sipariş verebilmek için sepet tutarı en az 1000 TL olmalıdır.");
      return;
    }

    const newErrors: { name?: string; address?: string } = {};
    let hasError = false;

    if (!customerName.trim()) {
      newErrors.name = 'Lütfen siparişinizi tamamlamak için adınızı ve soyadınızı giriniz.';
      hasError = true;
    }

    if (!address.trim()) {
      newErrors.address = 'Lütfen siparişinizi tamamlamak için teslimat adresinizi giriniz.';
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) {
      return;
    }

    localStorage.setItem('customerName', customerName);
    localStorage.setItem('customerAddress', address);

    // TODO: Buraya işletmenin gerçek WhatsApp numarasını giriniz (başında 90 olacak şekilde)
    const phoneNumber = '905510973400';

    let message = `*Yeni Sipariş!* 🛍️\n\n`;
    message += `👤 *Müşteri:* ${customerName}\n`;
    message += `📍 *Adres:* ${address}\n`;
    if (orderNote.trim()) {
      message += `📝 *Not:* ${orderNote}\n`;
    }
    message += `\n*Sipariş Detayları:*\n`;

    items.forEach(item => {
      const quantityStr = item.unit === 'kg'
        ? `${item.quantity}g`
        : `${item.quantity} adet`;
      const price = calculateItemPrice(item);
      message += `▫️ ${item.name} - ${quantityStr} - ${price} ₺\n`;
    });

    message += `\n💰 *Toplam Tutar:* ${getCartTotal().toFixed(2)} ₺`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    clearCart();
    setIsSuccess(true);

    setCustomerName('');
    setAddress('');
    setOrderNote('');
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 animate-in fade-in slide-in-from-bottom-4">
        <div className="bg-green-100 p-6 rounded-full mb-6">
          <CheckCircle className="w-20 h-20 text-green-600" />
        </div>

        <h2 className="text-3xl font-bold text-stone-900 mb-4">İşlem Tamamlanmak Üzere!</h2>

        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl max-w-md mb-8">
          <p className="text-stone-800 font-medium text-lg">
            Sipariş detaylarınızı WhatsApp uygulamasına aktardık.
          </p>
          <p className="text-stone-600 mt-2 text-sm">
            Lütfen açılan WhatsApp penceresinde <span className="font-bold text-black">"Gönder"</span> tuşuna basarak siparişinizi onaylamayı unutmayınız. Eğer WhatsAppdaki <span className="font-bold text-black">"Gönder"</span> tuşuna basmazsanız siparişiniz onaylanamaz.
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setIsSuccess(false)} // Tekrar alışverişe dön
            className="text-stone-500 hover:text-stone-800 font-medium"
          >
            Ana Sayfaya Dön
          </button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="bg-stone-100 p-6 rounded-full mb-6">
          <ShoppingBag className="w-16 h-16 text-stone-400" />
        </div>
        <h2 className="text-2xl font-bold text-stone-900 mb-2">Sepetiniz Boş</h2>
        <p className="text-stone-500 mb-8 max-w-md">
          Henüz sepetinize ürün eklemediniz. Lezzetli et çeşitlerimizi incelemek için ürünler sayfasına göz atın.
        </p>
        <Link href="/products">
          <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg rounded-xl">
            Alışverişe Başla
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 sm:py-12 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-stone-900 mb-8 flex items-center gap-3">
        Sepetim <span className="text-stone-600 text-lg font-normal">({items.length} Ürün)</span>
      </h1>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Ürün Listesi */}
        <div className="flex-1 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 bg-white p-4 rounded-2xl shadow-sm border border-stone-100">
              {/* Ürün Resmi */}
              <div className="relative w-full sm:w-32 h-32 shrink-0 rounded-xl overflow-hidden bg-stone-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 128px"
                />
              </div>

              {/* Ürün Bilgileri */}
              <div className="flex-1 w-full text-center sm:text-left">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                  <h3 className="text-lg font-bold text-stone-900">{item.name}</h3>
                  <span className="text-sm font-medium text-stone-500 bg-stone-100 px-2 py-1 rounded">
                    {item.unit === 'kg' ? `${item.price} ₺ / kg` : `${item.price} ₺ / adet`}
                  </span>
                </div>
                <p className="text-stone-500 text-sm mb-4 line-clamp-1">{item.description}</p>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  {/* Miktar Kontrolü */}
                  <div className="flex items-center bg-stone-50 rounded-lg border border-stone-200">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => decrementQuantity(item)}
                      className="h-9 w-9 hover:bg-white hover:text-red-600"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-20 text-center font-semibold text-stone-900 text-sm">
                      {item.unit === 'kg' ? `${item.quantity}g` : item.quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => incrementQuantity(item)}
                      className="h-9 w-9 hover:bg-white hover:text-green-600"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Fiyat ve Silme */}
                  <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                    <span className="text-xl font-bold text-stone-900">
                      {calculateItemPrice(item)} ₺
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        removeItem(item.id);
                        toast.error("Ürün Sepetten Silindi", {
                          description: `${item.name} sepetinizden kaldırıldı.`,
                          duration: 3000,
                        });
                      }}
                      className="text-stone-400 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className='flex justify-center mt-6'>
            <Button
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-100 hover:text-red-700 hover:border-red-300 px-8 gap-2 transition-colors"
              onClick={() => {
                if (confirm('Sepetinizdeki tüm ürünleri silmek istediğinize emin misiniz?')) {
                  clearCart();
                  toast.error("Sepet Temizlendi", {
                    description: "Sepetinizdeki tüm ürünler başarıyla silindi.",
                    duration: 3000,
                  });
                }
              }}
            >
              <Trash2 className="w-4 h-4" />
              Sepeti Temizle
            </Button>
          </div>
        </div>

        {/* Sipariş Özeti */}
        <div className="w-full lg:w-96 shrink-0">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 sticky top-24">
            <h2 className="text-xl font-bold text-stone-900 mb-6">Sipariş Özeti</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-stone-600">
                <span>Ara Toplam</span>
                <span>{getCartTotal().toFixed(2)} ₺</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Teslimat Ücreti</span>
                <span className="text-green-600 font-medium">Ücretsiz</span>
              </div>
              <div className="border-t border-stone-100 pt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-stone-900">Toplam</span>
                <span className="text-2xl font-bold text-red-600">{getCartTotal().toFixed(2)} ₺</span>
              </div>
            </div>

            {/* Müşteri Bilgileri */}
            <div className="space-y-4 mb-6 pt-4 border-t border-stone-100">
              <div>
                <label htmlFor="customerName" className="block text-sm font-medium text-stone-700 mb-1">
                  Adınız Soyadınız <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="customerName"
                  value={customerName}
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                    if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                  }}
                  className={`w-full px-4 py-2 rounded-lg border ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-stone-200 focus:ring-red-500'} focus:outline-none focus:ring-2 focus:border-transparent text-sm transition-colors`}
                  placeholder="Adınız Soyadınız"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1 font-medium animate-in fade-in slide-in-from-top-1">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-stone-700 mb-1">
                  Teslimat Adresi <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="address"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (errors.address) setErrors(prev => ({ ...prev, address: undefined }));
                  }}
                  className={`w-full px-4 py-2 rounded-lg border ${errors.address ? 'border-red-500 focus:ring-red-500' : 'border-stone-200 focus:ring-red-500'} focus:outline-none focus:ring-2 focus:border-transparent resize-none h-24 text-sm transition-colors`}
                  placeholder="Mahalle, Sokak, Bina No, Daire No, İlçe/İl"
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1 font-medium animate-in fade-in slide-in-from-top-1">
                    {errors.address}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="orderNote" className="block text-sm font-medium text-stone-700 mb-1">
                  Sipariş Notu (Opsiyonel)
                </label>
                <textarea
                  id="orderNote"
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none h-20 text-sm"
                  placeholder="Varsa özel istekleriniz..."
                />
              </div>
            </div>

            {/* Bilgilendirme Kutusu */}
            <div className="bg-blue-50/50 p-4 rounded-xl mb-6 border border-blue-100">
              <div className="flex gap-3 mb-4 pb-4 border-b border-blue-100">
                <Truck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="space-y-2 text-sm text-stone-700">
                  <p><span className="font-bold text-stone-900">Avrupa Yakası:</span> Perşembe günü adresinize teslim edilir.</p>
                  <p><span className="font-bold text-stone-900">Anadolu Yakası:</span> Cuma ve Cumartesi günü adresinize teslim edilir.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start text-sm text-stone-700">
                <CreditCard className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <p>
                  Sipariş kapınıza geldiğinde ödemenizi <span className="font-bold text-stone-900">banka kartı, kredi kartı</span> ya da <span className="font-bold text-stone-900">nakit</span> olarak ödeyebilirsiniz.
                </p>
              </div>
            </div>

            <Button
              onClick={handleCheckout}
              className="w-full bg-stone-900 hover:bg-stone-800 text-white h-14 text-lg rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Siparişi Tamamla</span>
              <ArrowRight className="h-5 w-5" />
            </Button>

            <p className="text-base text-stone-600 text-center mt-4">
              Siparişiniz WhatsApp üzerinden iletilecektir.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}