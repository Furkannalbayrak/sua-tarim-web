import Cart from '@/components/cart/Cart'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sepetim | Sua Tarım",
  description: "Sepetinizdeki ürünleri inceleyin ve siparişinizi tamamlayın.",
};

export default function page() {
  return (
    <main>
        <Cart/>
    </main>
  )
}
