# 🌾 Şua Tarım - E-Ticaret Platformu

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-Bear-brown?style=for-the-badge)

**Şua Tarım**, müşterilerine en taze ve doğal et ürünlerini (dana, kuzu kıyma, kuşbaşı vb.) ulaştırmayı hedefleyen modern bir e-ticaret web uygulamasıdır. Kullanıcı dostu arayüzü, hızlı yapısı ve güvenilir altyapısı ile online sipariş süreçlerini kolaylaştırmak için tasarlanmıştır.

---

## ✨ Öne Çıkan Özellikler

- **Modern ve Hızlı Kullanıcı Deneyimi:** Next.js 16 (App Router) ve React 19 mimarisi ile ultra hızlı sayfa geçişleri ve yüksek performans.
- **Dinamik Ürün Yönetimi:** Supabase entegrasyonu sayesinde ürünler (popüler ürünler, tüm liste) gerçek zamanlı olarak veritabanından çekilir.
- **Gelişmiş Sepet Sistemi (Zustand):** 
  - Ürünleri hem **Kilogram (kg)** hem de **Adet** bazında sepete ekleyebilme.
  - Kilogram bazlı ürünlerde gramaj üzerinden dinamik fiyat hesaplaması (örn: `fiyat * (miktar / 1000)`).
  - Sepet verilerinin tarayıcıda (LocalStorage) kalıcı olarak saklanması.
- **Kusursuz Mobil Uyumluluk:** Mobil cihazlar için özel tasarlanmış navigasyon menüsü (`MobileNav`) ve tam duyarlı (responsive) grid yapısı.
- **SEO Dostu:** Dinamik `sitemap.ts` ve sayfa bazlı metadata optimizasyonları ile arama motorlarında üst sıralara çıkmaya hazır.
- **Şık ve Etkileşimli Arayüz:** Tailwind CSS v4, Radix UI (shadcn/ui), Lucide ikonları ve Sonner (bildirimler) ile modern tasarım dili.

---

## 🛠️ Kullanılan Teknolojiler

### Frontend Altyapısı
- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Kütüphane:** [React 19](https://react.dev/)
- **Dil:** [TypeScript](https://www.typescriptlang.org/)
- **Durum Yönetimi (State):** [Zustand](https://docs.pmnd.rs/zustand/)

### Tasarım & UI
- **Stilleme:** [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Bileşenleri:** Radix UI (shadcn/ui temel alınarak)
- **İkonlar:** [Lucide React](https://lucide.dev/)
- **Bildirimler:** [Sonner](https://sonner.emilkowal.ski/)
- **Animasyonlar:** `tw-animate-css`

### Backend & Veritabanı
- **BaaS:** [Supabase](https://supabase.com/) (`@supabase/supabase-js`)

---

## 📂 Proje Klasör Yapısı

```bash
sua-tarim-web/
├── app/                  # Next.js App Router sayfaları (page, layout, not-found)
│   ├── cart/             # Sepet sayfası
│   └── products/         # Ürünler listesi sayfası
├── components/           # Yeniden kullanılabilir React bileşenleri
│   ├── cart/             # Sepet bileşenleri
│   ├── home/             # Ana sayfa bölümleri (Hero, About, PopularProducts)
│   ├── layout/           # Sayfa düzeni bileşenleri
│   └── ui/               # Temel UI bileşenleri (Butonlar vb.)
├── lib/                  # Yardımcı fonksiyonlar ve Store
│   ├── store.ts          # Zustand sepet yönetimi
│   ├── supabase.ts       # Supabase istemci bağlantısı
│   └── utils.ts          # Genel yardımcı fonksiyonlar (Tailwind merge vb.)
├── services/             # Dış API ve Veritabanı servisleri
│   └── productsService.ts# Supabase ürün sorguları
├── types/                # TypeScript tip tanımlamaları
│   └── index.ts          # Product arayüzü (id, name, unit: 'kg' | 'adet' vs.)
└── public/               # Statik dosyalar (Görseller, ikonlar vb.)
```

---

## 🚀 Kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

### 1. Gereksinimler
- Node.js (v20+ önerilir)
- npm, yarn, pnpm veya bun

### 2. Projeyi Klonlayın
```bash
git clone https://github.com/KULLANICI_ADINIZ/sua-tarim-web.git
cd sua-tarim-web
```

### 3. Bağımlılıkları Yükleyin
```bash
npm install
# veya
yarn install
```

### 4. Çevre Değişkenlerini (Environment Variables) Ayarlayın
Proje kök dizininde bir `.env.local` dosyası oluşturun ve Supabase bilgilerinizi ekleyin:

```env
NEXT_PUBLIC_SUPABASE_URL=senin_supabase_url_adresin
NEXT_PUBLIC_SUPABASE_ANON_KEY=senin_supabase_anon_key_degerin
```

### 5. Geliştirme Sunucusunu Başlatın
```bash
npm run dev
# veya
yarn dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresine giderek uygulamayı görüntüleyebilirsiniz.

---

## 🛒 Sepet Mantığı (Zustand) Hakkında

Projede sepet yönetimi için **Zustand** kullanılmıştır. E-ticaret platformu kasap/tarım ürünleri sattığı için ürünler `kg` veya `adet` bazında satılabilmektedir. 

`lib/store.ts` içerisinde yer alan sepet hesaplama mantığı, kullanıcının sepete eklediği gramaja göre fiyatı otomatik hesaplar:
```typescript
if(item.unit === 'kg'){
    return total + (item.price * (item.quantity / 1000));
}
```

---

## 📄 Lisans
Bu proje özel bir işletme (Şua Tarım) için geliştirilmiş olup, tüm hakları saklıdır.
