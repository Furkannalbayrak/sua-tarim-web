import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-10 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          {/* Sol Taraf: Resimler */}
          <div className="w-full md:w-1/2 relative">
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=1000&auto=format&fit=crop" 
                alt="Kasap Reyonu" 
                className="rounded-2xl shadow-lg w-full h-64 object-cover mt-8"
              />
              <img 
                src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=1000&auto=format&fit=crop" 
                alt="Taze Et" 
                className="rounded-2xl shadow-lg w-full h-64 object-cover"
              />
            </div>
          </div>

          {/* Sağ Taraf: Yazı */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-6">
              30 Yıllık Tecrübe, <br />
              <span className="text-red-600">Değişmeyen Lezzet</span>
            </h2>
            <p className="text-stone-600 text-lg mb-6 leading-relaxed">
              Şua Tarım olarak, çiftliğimizden sofranıza uzanan bu yolculukta en doğal ve sağlıklı etleri sunuyoruz. Hayvanlarımız kendi çiftliğimizde, %100 doğal yemlerle beslenmekte ve İslami usullere uygun olarak kesilmektedir.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-stone-700">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-3" />
                Yerli ve Doğal Besi
              </li>
              <li className="flex items-center text-stone-700">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-3" />
                Günlük Taze Kesim
              </li>
              <li className="flex items-center text-stone-700">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-3" />
                Hijyenik Paketleme
              </li>
            </ul>
            <Link href="/about">
              <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                Hikayemizi Oku
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}