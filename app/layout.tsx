import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { Inter } from "next/font/google";
import Contact from "@/components/home/Contact";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Şua Tarım | Doğal ve Lezzetli Et Ürünleri",
  description: "Şua Tarım ile en taze ve doğal et ürünlerine ulaşın.",
  icons: {
    icon: '/logo.jpeg',
  },
  openGraph: {
    title: "Şua Tarım | Doğal Et Ürünleri",
    description: "Taze, güvenilir ve lezzetli et ürünleri kapınızda. Hemen sipariş verin!",
    url: 'https://suatarim.com', // Sitenizin gerçek alan adı (varsa)
    siteName: 'Şua Tarım',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'Şua Tarım Logo',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body
        className={`antialiased`}
      >
        <Header />

        <main>
          {children}
        </main>

        <Contact />

        <Toaster
          position="top-center"
          richColors
          toastOptions={{
            style: {
              background: 'white',
              border: '1px solid #e5e5e5',
              padding: '16px',
              fontSize: '16px', // Font boyutunu büyüttük
              gap: '12px',
            },
            classNames: {
              title: 'text-lg font-bold', // Başlığı büyüttük
              description: 'text-stone-500 text-sm font-medium', // Açıklamayı düzenledik
              icon: 'w-6 h-6', // İkonu büyüttük
            }
          }}
        />
      </body>
    </html>
  );
}
