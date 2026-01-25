import { Button } from "@/components/ui/button";
import { Clock, Leaf, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section id="about" className="py-20 px-2 bg-white">
      <div className="container mx-auto px-4 md:px-10 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center gap-12">

          {/* Sol Taraf: Resimler */}
          <div className="w-full md:w-1/2 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative w-full h-64 mt-8 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=1000&auto=format&fit=crop"
                  alt="Kasap Reyonu"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1690983322025-aab4f95a0269?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Taze Et"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
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
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-50 text-red-600 shrink-0">
                  <Leaf size={20} />
                </div>
                <span className="text-stone-700 font-medium text-lg">Yerli ve Doğal Besi</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-50 text-red-600 shrink-0">
                  <Clock size={20} />
                </div>
                <span className="text-stone-700 font-medium text-lg">Günlük Taze Kesim</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-50 text-red-600 shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <span className="text-stone-700 font-medium text-lg">Hijyenik Paketleme</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}