import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io', // Eğer gelecekte CMS kullanırsan diye
      },
      // {
      //   protocol: 'https',
      //   hostname: '**', // Geçici olarak tüm kaynaklara izin verelim (geliştirme aşaması için kolaylık)
      // },
      {
        protocol: 'https',
        hostname: 'gtfewjaifroyoprplblp.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
