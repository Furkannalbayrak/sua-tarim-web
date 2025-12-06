import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-[600px] lg:min-h-[670px] flex items-center bg-stone-900 text-white overflow-hidden">

            {/* Arka Plan Resmi (Şimdilik renk kullanıyoruz, sonra foto koyarız) */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-60" />

            <div className="max-w-7xl w-full mx-auto px-4 md:px-10 relative z-20 text-center md:text-left">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
                    Sofranız İçin <br />
                    <span className="text-red-500">En Taze Etler</span>
                </h1>
                <p className="text-lg md:text-xl text-stone-200 mb-8 max-w-lg">
                    Günlük kesim, hijyenik ve %100 yerli besi ürünlerimizle kasap dükkanımız artık bir tık uzağınızda.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 h-14 rounded-full">
                        Siparişe Başla
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>

                    <Button
                        variant="outline"
                        size="lg"
                        className="text-white border-white bg-transparent hover:bg-white hover:text-stone-900 text-lg px-8 h-14 rounded-full"
                    >
                        <Phone className="mr-2 h-5 w-5" />
                        Bizi Arayın
                    </Button>
                </div>
            </div>
        </section>
    );
}