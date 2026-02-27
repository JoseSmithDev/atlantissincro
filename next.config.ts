import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Placeholder de mockup — reemplazar con el dominio real del CDN (R2)
      { protocol: "https", hostname: "picsum.photos" },
      // Cloudflare R2 pública (añadir el dominio real cuando esté configurado)
      // { protocol: "https", hostname: "tu-dominio-r2.com" },
    ],
  },
};

export default nextConfig;
