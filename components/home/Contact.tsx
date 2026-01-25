import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-2 bg-stone-900 text-white">
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
                  <p className="text-stone-300">Kavacık, Dağlı Sk. No:4, 34810<br />Beykoz / İstanbul</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-red-600 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-1">Telefon & WhatsApp</h3>
                  <p className="text-stone-300">+90 551 097 34 00</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-red-600 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-1">Çalışma Saatleri</h3>
                  <p className="text-stone-300">Pazar Günü Hariç Haftanın Her Günü: 08:00 - 18:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* --- HARİTA BÖLÜMÜ (Burayı değiştirdik) --- */}
          <div className="h-[400px] bg-stone-800 rounded-2xl overflow-hidden shadow-xl border border-stone-700">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3007.057787856521!2d29.079188099999993!3d41.089583999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cacbf6f039ef79%3A0x40625726a771060d!2zxZ51YSBUYXLEsW0gw4dpZnRsacSfaQ!5e0!3m2!1str!2str!4v1769335922996!5m2!1str!2str"
              title="Şua Tarım Çiftliği Konum Haritası"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
}
