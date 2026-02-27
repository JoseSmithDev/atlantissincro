'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type Phase = 'intro' | 'opening' | 'done';

const EASING = [0.76, 0, 0.24, 1] as const;

// ─── Silueta de nadadora ───────────────────────────────────────────────────
function SwimmerSVG({ isOpening }: { isOpening: boolean }) {
  return (
    <motion.svg
      viewBox="-180 -220 360 440"
      className="w-auto h-64 sm:h-72 md:h-80 max-w-none"
      style={{ filter: 'drop-shadow(0 0 28px rgba(255,255,255,0.14))' }}
      aria-hidden="true"
      /* FLUIDEZ TOTAL: Un sutil balanceo (bobbing) que da sensación de estar sostenida por el agua */
      animate={{
        y: isOpening ? [0, -4, 0] : [0, -8, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {/* ── Cadera (punto de pivot visual, a ras de agua) ── */}
      {/* Al agrandar este radio y dibujar las piernas saliendo directamente DEL CENTRO (0,0), el giro mecánico es perfecto */}
      <ellipse cx="0" cy="0" rx="14" ry="11" fill="white" opacity={0.97} />

      {/* ── Grupo Torso + Cabeza + Brazos (simétrico: sin rotación de inercia) ── */}
      <motion.g
        initial={{ rotate: 0 }}
        animate={{ rotate: 0 }}
        style={{ originX: 0, originY: 0 }}
      >
        {/* Torso (subacuático) - empalmado a la cadera 0,0 */}
        <path
          d="M-10,11 C-13,43 -10,67 -8,84 L8,84 C10,67 13,43 10,11 Z"
          fill="white"
          opacity={0.92}
        />

        {/* Hombros */}
        <ellipse cx="0" cy="84" rx="16" ry="10" fill="white" opacity={0.96} />

        {/* Brazo izquierdo (remada activa: cambia posición durante la apertura) */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.55, delay: 0.2, ease: 'easeOut' }}
          d="M-16,80 C-45,80 -65,55 -85,60"
          stroke="white"
          strokeWidth={9}
          strokeLinecap="round"
          fill="none"
          opacity={0.84}
        />
        {/* Detalle interno remada izquierdo */}
        <motion.path
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpening ? 0.3 : 0 }}
          transition={{ duration: 1.2, delay: 0.1 }}
          d="M-85,60 C-70,40 -50,60 -30,40"
          stroke="white"
          strokeWidth={2}
          fill="none"
        />

        {/* Brazo derecho (remada activa) */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.55, delay: 0.2, ease: 'easeOut' }}
          d="M16,80 C45,80 65,55 85,60"
          stroke="white"
          strokeWidth={9}
          strokeLinecap="round"
          fill="none"
          opacity={0.84}
        />
        {/* Detalle interno remada derecho */}
        <motion.path
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpening ? 0.3 : 0 }}
          transition={{ duration: 1.2, delay: 0.1 }}
          d="M85,60 C70,40 50,60 30,40"
          stroke="white"
          strokeWidth={2}
          fill="none"
        />

        {/* Cuello */}
        <rect x="-5" y="82" width="10" height="22" rx="5" fill="white" opacity={0.93} />

        {/* Cabeza / gorro de natación */}
        <ellipse cx="0" cy="121" rx="13" ry="16" fill="white" opacity={0.9} />

        {/* Gafas de natación */}
        <path
          d="M-11,120 C-5,127 5,127 11,120"
          stroke="rgba(0,51,102,0.45)"
          strokeWidth={1.5}
          fill="none"
        />
      </motion.g>

      {/*
       * ── Pierna A: se abre PRIMERA, llega a −90° (horizontal izquierda) ──
       *    Parte de 0° (vertical arriba) y barre hasta −90° sin delay.
       *    El easing [0.76,0,0.24,1] le da un arranque rápido y freno suave.
       */}
      <motion.g
        initial={{ rotate: 0 }}
        animate={{ rotate: isOpening ? -90 : 0 }}
        transition={{ duration: 0.78, ease: [0.76, 0, 0.24, 1] }}
        style={{ originX: 0.5, originY: 1 }}
      >
        <path
          d="M0,0 C-9,-55 -7,-115 -4,-152 C-2,-168 0,-175 4,-168 C7,-130 9,-55 0,0 Z"
          fill="white"
          opacity={0.9}
        />
        <ellipse cx="0" cy="-170" rx="5" ry="8" fill="white" opacity={0.88} />
      </motion.g>

      {/*
       * ── Pierna B: se abre SEGUNDA, llega a +90° (horizontal derecha) ──
       *    Arranca 0.4s después de que la pierna A ya está en posición,
       *    creando el efecto de "respuesta" simétrica que completa el espagat.
       */}
      <motion.g
        initial={{ rotate: 0 }}
        animate={{ rotate: isOpening ? 90 : 0 }}
        transition={{
          duration: 0.78,
          delay: isOpening ? 0.4 : 0,
          ease: [0.76, 0, 0.24, 1],
        }}
        style={{ originX: 0.5, originY: 1 }}
      >
        <path
          d="M0,0 C-9,-55 -7,-115 -4,-152 C-2,-168 0,-175 4,-168 C7,-130 9,-55 0,0 Z"
          fill="white"
          opacity={0.85}
        />
        <ellipse cx="0" cy="-170" rx="5" ry="8" fill="white" opacity={0.82} />
      </motion.g>
    </motion.svg>
  );
}

// ─── Ondas de agua (anillos en expansión) ────────────────────────────────
function WaterRipples() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {[0, 0.8, 1.6].map((delay) => (
        <motion.div
          key={delay}
          className="absolute rounded-full border border-white/[0.07]"
          initial={{ width: 40, height: 40, opacity: 0.6 }}
          animate={{ width: 420, height: 420, opacity: 0 }}
          transition={{
            duration: 2.4,
            delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────
export default function SwimmerIntro() {
  const [phase, setPhase] = useState<Phase | null>(null);

  useEffect(() => {
    const forceReset = new URLSearchParams(window.location.search).has('reset');
    if (!forceReset && sessionStorage.getItem('atlantis-intro')) {
      setPhase('done');
      return;
    }

    setPhase('intro');
    const t1 = setTimeout(() => setPhase('opening'), 1600);
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
      {/* ── Panel superior – azul ── */}
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

      {/* ── Panel inferior – rojo ── */}
      <motion.div
        className="absolute inset-0"
        style={{
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 42%, 50% 0%, 0% 42%)',
          background: 'linear-gradient(25deg, #7B0000 0%, #C62828 50%, #D32F2F 100%)',
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
                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 25%, rgba(255,255,255,0.07) 75%, transparent 100%)',
            }}
          />
        ))}
      </motion.div>

      {/* ── Ondas de agua ── */}
      <WaterRipples />

      {/* ── Centro: nadadora + logo ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{
            opacity: isOpening ? 0 : 1,
            scale: isOpening ? 1.04 : 1,
            y: isOpening ? -8 : 0,
          }}
          transition={{
            opacity: {
              duration: isOpening ? 0.38 : 0.55,
              // espera a que pierna B complete su apertura (delay 0.4s + dur 0.78s)
              delay: isOpening ? 1.1 : 0.18,
            },
            scale: { duration: 0.55 },
            y: { duration: 0.35 },
          }}
          className="flex flex-col items-center"
        >
          <SwimmerSVG isOpening={isOpening} />

          <div className="text-center mt-1">
            <div
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-white leading-none"
              style={{ textShadow: '0 0 60px rgba(255,255,255,0.1)' }}
            >
              ATLANTIS
            </div>
            <div className="mt-2 text-[10px] md:text-xs font-bold tracking-[0.45em] text-white/50 uppercase">
              Natación Artística · Valencia
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Línea de agua central ── */}
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
