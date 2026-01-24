import ProductList from "@/components/products/ProductList";
import { Metadata } from "next";
import { getProducts } from "@/services/productsService";

export const metadata: Metadata = {
  title: "Tüm Ürünler | Kırmızı Et Çeşitleri ve Fiyatları - Şua Tarım",
  description: "Dana kıyma, kuşbaşı, antrikot, kuzu pirzola ve daha fazlası. Güncel et fiyatlarımızı inceleyin ve Şua Tarım kalitesiyle siparişinizi oluşturun.",
};
export default async function page() {

  const products = await getProducts();

  return (
    <main>
        <ProductList products={products} />
    </main>
  )
}