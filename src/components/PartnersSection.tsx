'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const partners = [
  {
    name: 'Diputació de València',
    subtitle: 'Joventut i Esports',
    logo: '/logos/diputacio-valencia.png',
  },
  {
    name: "Comunitat de l'Esport",
    subtitle: 'Comunitat Valenciana',
    logo: '/logos/comunitat-esport.png',
  },
  {
    name: 'Ajuntament de València',
    subtitle: '',
    logo: '/logos/ajuntament-valencia.png',
  },
  {
    name: 'Fundación Deportiva Municipal',
    subtitle: 'València',
    logo: '/logos/fundacion-deportiva.png',
  },
  {
    name: 'Fed. Natación',
    subtitle: 'Comunidad Valenciana',
    logo: '/logos/fed-natacion-cv.png',
  },
  {
    name: 'RFEN Aquatics',
    subtitle: '',
    logo: '/logos/rfen-aquatics.png',
  },
];

export default function PartnersSection() {
  return (
    <section className="bg-atlantis-blue py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-white text-center text-lg font-semibold mb-10 tracking-wide uppercase"
        >
          Instituciones Colaboradoras
        </motion.h3>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" as const }}
              className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm rounded-3xl p-5 h-28 hover:bg-white/20 transition-all duration-300 group"
            >
              {/* Replace placeholder with real logo: put PNGs in /public/logos/ */}
              <div className="relative w-full h-12 flex items-center justify-center">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={120}
                  height={48}
                  className="object-contain brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  onError={(e) => {
                    // Hide broken image, show text fallback
                    (e.target as HTMLImageElement).style.display = 'none';
                    const fallback = (e.target as HTMLImageElement).nextElementSibling;
                    if (fallback) (fallback as HTMLElement).style.display = 'flex';
                  }}
                />
                <div className="hidden flex-col items-center text-white/70 text-xs text-center">
                  <span className="font-medium">{partner.name}</span>
                  {partner.subtitle && (
                    <span className="text-white/50 text-[10px]">{partner.subtitle}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
