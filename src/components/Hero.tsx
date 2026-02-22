'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-atlantis-blue via-[#001a33] to-atlantis-red/15">
      {/* Animated bubbles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/[0.04] animate-[bubbleRise_linear_infinite]"
            style={{
              width: `${6 + (i * 7) % 24}px`,
              height: `${6 + (i * 7) % 24}px`,
              left: `${3 + (i * 6.7) % 94}%`,
              bottom: '-20px',
              animationDelay: `${(i * 1.1) % 10}s`,
              animationDuration: `${5 + (i * 1.1) % 10}s`,
            }}
          />
        ))}
      </div>

      {/* Subtle radial glow */}
      <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(ellipse_at_50%_40%,_#D32F2F,_transparent_60%)]" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full border border-white/20 bg-white/5 text-white/80 text-sm font-semibold tracking-widest uppercase backdrop-blur-sm">
            <svg className="w-4 h-4 text-atlantis-red-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 12c2-3 4-5 6-5s4 2 6 5 4 5 6 5 4-2 6-5" />
            </svg>
            Temporada 2025 / 2026
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-6"
        >
          <span className="block text-7xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-400 leading-[0.9]">
            ATLANTIS
          </span>
          <span className="block text-2xl md:text-4xl font-bold tracking-[0.2em] text-white/60 leading-[1.2] mt-3 uppercase">
            Natación Artística
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: '6rem' }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="h-1 bg-atlantis-red/60 mx-auto rounded-full mb-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-xl md:text-2xl text-white/70 mb-4 max-w-3xl mx-auto font-light leading-relaxed"
        >
          Club de Natación Artística en Valencia, España
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-lg text-white/50 mb-12 max-w-2xl mx-auto"
        >
          Excelencia competitiva, valores sociales y disciplina.
          <br className="hidden md:block" />
          Desde iniciación hasta alto nivel.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/reservas"
            className="group inline-flex items-center gap-2 bg-atlantis-red hover:bg-atlantis-red-dark text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg shadow-atlantis-red/25 hover:shadow-xl hover:shadow-atlantis-red/30 transition-all duration-300 hover:-translate-y-0.5"
          >
            Prueba Gratis
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="#valores"
            className="inline-flex items-center gap-2 border-2 border-white/20 text-white/90 hover:border-white/40 hover:text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 backdrop-blur-sm"
          >
            Descubre más
          </Link>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-28 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronDown className="h-7 w-7 text-gray-600 animate-bounce" />
      </motion.div>

      {/* Wave SVG bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none">
          <path
            d="M0 80L48 78C96 76 192 72 288 74C384 76 480 84 576 86C672 88 768 84 864 80C960 76 1056 72 1152 74C1248 76 1344 84 1392 88L1440 90V120H0V80Z"
            fill="white"
            opacity="0.4"
          />
          <path
            d="M0 60L48 55C96 50 192 40 288 45C384 50 480 70 576 75C672 80 768 70 864 60C960 50 1056 40 1152 45C1248 50 1344 70 1392 80L1440 90V120H0V60Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
