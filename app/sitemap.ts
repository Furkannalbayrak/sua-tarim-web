import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Alan adını buraya yaz. Henüz belli değilse böyle kalsın, yayına alınca değiştirirsin.
  const baseUrl = 'https://suatarim.com'; 

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1, // En önemli sayfa (Ana Sayfa)
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily', // Fiyatlar değişebileceği için sık taranmalı
      priority: 0.8, // İkinci en önemli sayfa
    },
  ];
}