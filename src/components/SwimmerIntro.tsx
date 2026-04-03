'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type Phase = 'intro' | 'opening' | 'done';

const EASING = [0.76, 0, 0.24, 1] as const;

export default function SwimmerIntro() {
  const [phase, setPhase] = useState<Phase | null>(null);

  useEffect(() => {
    const forceReset = new URLSearchParams(window.location.search).has('reset');
    if (!forceReset && sessionStorage.getItem('atlantis-intro')) {
      setPhase('done');
      return;
    }

    setPhase('intro');
    const t1 = setTimeout(() => setPhase('opening'), 1800);
    const t2 = setTimeout(() => {
      sessionStorage.setItem('atlantis-intro', '1');
      setPhase('done');
    }, 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = phase === 'intro' ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [phase]);

  if (phase === null || phase === 'done') return null;

  const isOpening = phase === 'opening';

  return (
    <div
      className="fixed inset-0 z-[100]"
      style={{ pointerEvents: isOpening ? 'none' : 'auto' }}
      aria-hidden="true"
    >
      {/* Panel superior – azul */}
      <motion.div
        className="absolute inset-0"
        style={{
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 58%, 50% 100%, 0% 58%)',
          background: 'linear-gradient(155deg, #001233 0%, #003366 50%, #002244 100%)',
          willChange: 'transform',
        }}
        initial={{ y: '0%' }}
        animate={{ y: isOpening ? '-100%' : '0%' }}
        transition={{ duration: 1.3, ease: EASING }}
      >
        {[16, 32, 48].map((pct) => (
          <div
            key={pct}
            className="absolute inset-x-0"
            style={{
              top: `${pct}%`,
              height: '1px',
              background:
                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 25%, rgba(255,255,255,0.07) 75%, transparent 100%)',
            }}
          />
        ))}
      </motion.div>

      {/* Panel inferior – rojo */}
      <motion.div
        className="absolute inset-0"
        style={{
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 42%, 50% 0%, 0% 42%)',
          background: 'linear-gradient(25deg, #e0e0e0 0%, #f5f5f5 50%, #ffffff 100%)',
          willChange: 'transform',
        }}
        initial={{ y: '0%' }}
        animate={{ y: isOpening ? '100%' : '0%' }}
        transition={{ duration: 1.3, ease: EASING }}
      >
        {[52, 68, 84].map((pct) => (
          <div
            key={pct}
            className="absolute inset-x-0"
            style={{
              top: `${pct}%`,
              height: '1px',
              background:
                'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.05) 25%, rgba(0,0,0,0.05) 75%, transparent 100%)',
            }}
          />
        ))}
      </motion.div>

      {/* Logo centrado */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{
            opacity: isOpening ? 0 : 1,
            scale: isOpening ? 1.05 : 1,
          }}
          transition={{
            opacity: {
              duration: isOpening ? 0.4 : 0.55,
              delay: isOpening ? 0.9 : 0.25,
            },
            scale: { duration: 0.6 },
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/atlantis-logo.png"
            alt="Atlantis Sincro"
            className="w-44 sm:w-52 md:w-60 h-auto drop-shadow-2xl"
            style={{ filter: 'drop-shadow(0 4px 32px rgba(0,0,0,0.5)) brightness(1.05)' }}
          />
        </motion.div>
      </div>

      {/* Línea de agua central */}
      <motion.div
        className="absolute inset-x-0 pointer-events-none"
        style={{
          top: '50%',
          height: '1px',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.22) 20%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0.22) 80%, transparent 100%)',
          translateY: '-50%',
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{
          scaleX: isOpening ? 0 : 1,
          opacity: isOpening ? 0 : 1,
        }}
        transition={{ duration: 0.6, delay: isOpening ? 0 : 0.3 }}
      />
    </div>
  );
}
