import ProductList from "@/components/products/ProductList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tüm Ürünler | Sua Tarım",
  description: "En taze ve lezzetli et ürünlerimizi inceleyin. Dana eti, kuzu eti, köfte ve şarküteri çeşitleri.",
};

export default function page() {
  return (
    <main>
        <ProductList/>
    </main>
  )
}