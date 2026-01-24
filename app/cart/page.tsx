import Cart from '@/components/cart/Cart'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Alışveriş Sepetim | Şua Tarım",
  description: "Sepetinizdeki doğal et ürünlerini kontrol edin ve güvenle sipariş verin.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function page() {
  return (
    <main>
        <Cart/>
    </main>
  )
}
