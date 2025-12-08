import ProductList from "@/components/products/ProductList";
import { Metadata } from "next";
import { getProducts } from "@/services/productsService";

export const metadata: Metadata = {
  title: "Tüm Ürünler | Sua Tarım",
  description: "En taze ve lezzetli et ürünlerimizi inceleyin. Dana eti, kuzu eti, köfte ve şarküteri çeşitleri.",
};

export default async function page() {

  const products = await getProducts();

  return (
    <main>
        <ProductList products={products} />
    </main>
  )
}