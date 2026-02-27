'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

export default function TeamPhotoSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  // Ligero efecto parallax: la foto sube más despacio que el scroll
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  return (
    <section
      ref={ref}
      className="relative h-[55vh] md:h-[65vh] overflow-hidden"
      aria-label="Foto del equipo Atlantis"
    >
      {/* ── Foto ── */}
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <Image
          src="/team-photo.png"
          alt="Equipo Atlantis Natación Artística Valencia"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority={false}
        />
      </motion.div>

      {/* ── Fade desde el azul oscuro del Hero ── */}
      <div className="absolute top-0 inset-x-0 h-32 md:h-48 bg-gradient-to-b from-[#001a33] to-transparent z-10" />

      {/* ── Overlay degradado ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.22) 55%, rgba(0,0,0,0.22) 70%, rgba(139,0,0,0.55) 100%)',
        }}
      />

      {/* ── Texto superpuesto ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-xs md:text-sm font-bold tracking-[0.4em] text-white/60 uppercase mb-3">
            Familia Atlantis
          </p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-none drop-shadow-lg">
            Un equipo,<br className="hidden sm:block" /> una pasión
          </h2>
          <div className="mt-4 h-px w-16 bg-atlantis-red/70 mx-auto" />
          <p className="mt-4 text-base md:text-lg text-white/75 max-w-xl font-light">
            Más de 100 deportistas en Valencia comprometidas con la excelencia
            y los valores del deporte.
          </p>
        </motion.div>
      </div>

      {/* ── Transición suave hacia la sección siguiente ── */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
