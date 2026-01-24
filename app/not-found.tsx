import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 space-y-6">
      <div className="space-y-2">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <h2 className="text-2xl font-bold text-stone-900">Sayfa Bulunamadı</h2>
      </div>
      
      <p className="text-stone-500 max-w-md">
        Aradığınız sayfa mevcut değil veya taşınmış olabilir. 
        Lezzetli ürünlerimize göz atmak için ana sayfaya dönebilirsiniz.
      </p>

      <Link href="/">
        <Button className="bg-stone-900 hover:bg-stone-800 text-white gap-2">
          <Home className="w-4 h-4" />
          Ana Sayfaya Dön
        </Button>
      </Link>
    </div>
  )
}