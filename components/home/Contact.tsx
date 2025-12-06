import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-stone-900 text-white">
      <div className="container mx-auto px-4 md:px-10 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* İletişim Bilgileri */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Bize Ulaşın
            </h2>
            <p className="text-stone-400 mb-10 text-lg">
              Siparişleriniz, önerileriniz veya sadece bir merhaba demek için bize her zaman ulaşabilirsiniz.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-red-600 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-1">Adresimiz</h3>
                  <p className="text-stone-300">Örnek Mahallesi, Kasaplar Caddesi No: 123<br />Merkez / Şehir</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-red-600 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-1">Telefon & WhatsApp</h3>
                  <p className="text-stone-300">+90 555 555 55 55</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-red-600 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-1">Çalışma Saatleri</h3>
                  <p className="text-stone-300">Haftanın Her Günü: 08:00 - 20:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Harita veya Görsel */}
          <div className="h-[400px] bg-stone-800 rounded-2xl overflow-hidden relative">
             {/* Buraya Google Maps iframe'i gelebilir. Şimdilik görsel koyuyoruz. */}
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551028150-64b9f398f678?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-50" />
             <div className="absolute inset-0 flex items-center justify-center">
                <Button size="lg" className="bg-white text-stone-900 hover:bg-stone-200">
                    Haritada Göster
                </Button>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}