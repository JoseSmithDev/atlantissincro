'use client';

import { Trophy, Medal, Sparkles, ArrowRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

type Highlight = {
  swimmer: string;
  category: string;
  modality: string;
  competition: string;
  medal: 'gold' | 'silver' | 'bronze';
};

const TOTALS = { gold: 18, silver: 14, bronze: 11 } as const;

const HIGHLIGHTS: Highlight[] = [
  {
    swimmer: 'Equipo Infantil Atlantis',
    category: 'Infantil',
    modality: 'Equipo',
    competition: 'Cto. de España Alevín-Infantil de Invierno',
    medal: 'gold',
  },
  {
    swimmer: 'Lucía Martínez',
    category: 'Infantil',
    modality: 'Solo',
    competition: '2ª Liga de Figuras y Rutinas Técnicas',
    medal: 'gold',
  },
  {
    swimmer: 'Martínez / Pérez',
    category: 'Infantil',
    modality: 'Dúo',
    competition: 'V Cto. Autonómico de Figuras y Combos',
    medal: 'gold',
  },
  {
    swimmer: 'Sara Gómez',
    category: 'Alevín',
    modality: 'Solo',
    competition: 'VI Open Promoción de Invierno',
    medal: 'gold',
  },
  {
    swimmer: 'Equipo Junior Atlantis',
    category: 'Junior',
    modality: 'Equipo',
    competition: 'Cto. de España Junior-Senior de Invierno',
    medal: 'silver',
  },
  {
    swimmer: 'Valeria Ruiz',
    category: 'Junior',
    modality: 'Solo',
    competition: '3ª Liga de Figuras y Rutinas Técnicas',
    medal: 'silver',
  },
];

const MEDAL_META = {
  gold: {
    label: 'Oro',
    fill: '#FBBF24',
    icon: 'text-yellow-500',
    chip: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    ring: 'ring-yellow-200',
  },
  silver: {
    label: 'Plata',
    fill: '#D1D5DB',
    icon: 'text-gray-400',
    chip: 'bg-gray-50 text-gray-600 border-gray-200',
    ring: 'ring-gray-200',
  },
  bronze: {
    label: 'Bronce',
    fill: '#D97706',
    icon: 'text-amber-700',
    chip: 'bg-amber-50 text-amber-700 border-amber-200',
    ring: 'ring-amber-200',
  },
} as const;

function MedalCounter({ target, color }: { target: number; color: keyof typeof MEDAL_META }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const meta = MEDAL_META[color];

  useEffect(() => {
    if (!isInView) return;
    const duration = 1600;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);

  return (
    <div className="flex flex-col items-center gap-3 group">
      <div className={`relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-white shadow-sm ring-4 ${meta.ring} flex items-center justify-center transition-transform duration-500 group-hover:scale-105 group-hover:rotate-6`}>
        <Medal className={`w-10 h-10 md:w-12 md:h-12 ${meta.icon}`} fill={meta.fill} strokeWidth={1.5} />
      </div>
      <div className="text-center">
        <div ref={ref} className="text-4xl md:text-5xl font-black text-atlantis-black tracking-tighter leading-none mb-1">
          <span>{value}</span>
        </div>
        <div className="text-xs font-bold tracking-[0.2em] uppercase text-atlantis-gray">
          {meta.label}
        </div>
      </div>
    </div>
  );
}

export default function PalmaresSection() {
  const total = TOTALS.gold + TOTALS.silver + TOTALS.bronze;

  return (
    <section className="relative py-24 bg-gradient-to-b from-white via-atlantis-surface to-white overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute top-20 -left-20 w-96 h-96 bg-atlantis-red/[0.04] rounded-full blur-3xl" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-atlantis-blue/[0.04] rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 text-atlantis-red text-sm font-semibold tracking-widest uppercase mb-4">
            <Trophy className="h-4 w-4" />
            Palmarés Temporada 2025-2026
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-atlantis-black tracking-tight mb-4">
            Atlantis en el podio
          </h2>
          <div className="w-16 h-1 bg-atlantis-red mx-auto rounded-full mb-6" />
          <p className="text-atlantis-gray text-lg max-w-2xl mx-auto leading-relaxed">
            Cada temporada el equipo del club Atlantis sube al podio en competiciones
            autonómicas, nacionales y de promoción. Estos son los logros de este año.
          </p>
        </motion.div>

        {/* Contadores de medallas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-12 mb-12"
        >
          <div className="grid grid-cols-3 gap-6 md:gap-12 mb-8">
            <MedalCounter target={TOTALS.gold} color="gold" />
            <MedalCounter target={TOTALS.silver} color="silver" />
            <MedalCounter target={TOTALS.bronze} color="bronze" />
          </div>
          <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-atlantis-gray font-medium">
              <span className="font-black text-atlantis-black">{total} medallas</span> conseguidas en lo que va de temporada
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-atlantis-red bg-red-50 border border-atlantis-red/10 px-3 py-1.5 rounded-full">
              <Sparkles className="h-3.5 w-3.5" />
              Datos actualizados
            </div>
          </div>
        </motion.div>

        {/* Destacados */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10"
        >
          <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-atlantis-gray text-center mb-8">
            Resultados destacados
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {HIGHLIGHTS.map((h, i) => {
              const meta = MEDAL_META[h.medal];
              return (
                <motion.article
                  key={`${h.swimmer}-${i}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 right-0 h-1 ${
                    h.medal === 'gold' ? 'bg-gradient-to-r from-yellow-400 to-yellow-500'
                    : h.medal === 'silver' ? 'bg-gradient-to-r from-gray-300 to-gray-400'
                    : 'bg-gradient-to-r from-amber-500 to-amber-700'
                  }`} />
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 ${meta.chip}`}>
                        <Medal className={`w-6 h-6 ${meta.icon}`} fill={meta.fill} strokeWidth={1.5} />
                      </div>
                      <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full border ${meta.chip}`}>
                        {meta.label}
                      </span>
                    </div>
                    <h4 className="font-bold text-atlantis-black text-base leading-tight mb-1">
                      {h.swimmer}
                    </h4>
                    <p className="text-xs font-semibold text-atlantis-gray mb-3">
                      {h.category} · {h.modality}
                    </p>
                    <div className="border-t border-gray-100 pt-3">
                      <p className="text-xs text-atlantis-gray leading-snug">
                        <Trophy className="inline h-3 w-3 text-atlantis-red mr-1 -mt-0.5" />
                        {h.competition}
                      </p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link
            href="/competiciones"
            className="group inline-flex items-center gap-2 bg-atlantis-blue hover:bg-[#002244] text-white px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-atlantis-blue/20"
          >
            Ver todas las competiciones
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
