'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

type Sponsor = {
  src: string;
  alt: string;
  /**
   * Algunos logos vienen muy verticales (lion + texto). En esos casos
   * limitamos la altura sin pasarnos para que el grid quede armónico.
   */
  size?: 'normal' | 'tall';
};

const SPONSORS: Sponsor[] = [
  { src: '/logos/fncv.png',                     alt: 'Federació de Natació de la Comunitat Valenciana' },
  { src: '/logos/comunitat-esport.png',         alt: 'Comunitat de l\'Esport' },
  { src: '/logos/rfen.png',                     alt: 'Real Federación Española de Natación' },
  { src: '/logos/diputacio-valencia.png',       alt: 'Diputació de València' },
  { src: '/logos/ajuntament-fdm-valencia.jpg',  alt: 'Ajuntament de València · Fundación Deportiva Municipal' },
  { src: '/logos/musicate.png',                 alt: 'Musícate' },
  { src: '/logos/que-impresiones.png',          alt: 'Qué Impresiones',                                       size: 'tall' },
];

export default function SponsorsSection() {
  return (
    <section className="relative py-20 bg-white border-t border-gray-100 overflow-hidden">
      {/* Decoración sutil */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-atlantis-blue/[0.025] rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header pequeño */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 text-atlantis-red text-sm font-semibold tracking-widest uppercase mb-3">
            <Heart className="h-4 w-4" fill="currentColor" />
            Con el apoyo de
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-atlantis-black tracking-tight mb-2">
            Entidades colaboradoras y patrocinadores
          </h2>
          <div className="w-12 h-1 bg-atlantis-red mx-auto rounded-full" />
        </motion.div>

        {/* Grid de logos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 items-center justify-items-center gap-x-6 gap-y-10"
        >
          {SPONSORS.map((logo) => (
            <div
              key={logo.alt}
              className="group relative w-full flex items-center justify-center h-16 md:h-20"
              title={logo.alt}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={logo.alt}
                className={`max-w-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 ${
                  logo.size === 'tall' ? 'max-h-16 md:max-h-20' : 'max-h-12 md:max-h-14'
                }`}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
