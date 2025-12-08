import { supabase } from "@/lib/supabase";
import { Product } from "@/types";

// 1. Sadece 4 tane ürün getir (Popüler/Vitrin için)
export async function getPopularProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_popular', true)
    .limit(8);

  if (error) {
    console.error("Popüler ürünler çekilemedi:", error);
    return [];
  }

  return data as Product[];
}

// 2. Veritabanındaki HER ŞEYİ getir (Ürünler sayfası için)
export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*'); 
  
  if (error) {
    console.error("Ürünler çekilemedi:", error);
    return [];
  }
  
  return data as Product[];
}