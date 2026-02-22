'use client';

import { Users, Trophy, Heart, Sparkles } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const cards = [
  {
    icon: Heart,
    title: 'Familia Atlantis',
    text: 'Más que un club, somos una familia. Combinamos excelencia competitiva con valores sociales y disciplina.',
    gradient: 'from-red-500/10 to-red-600/5',
  },
  {
    icon: Trophy,
    title: 'Competición',
    text: 'Participamos en campeonatos autonómicos y nacionales con excelentes resultados en todos los niveles.',
    gradient: 'from-amber-500/10 to-orange-500/5',
  },
  {
    icon: Users,
    title: 'Formación Integral',
    text: 'Programas desde iniciación (6-11 años), rendimiento y competición. Crecimiento dentro y fuera del agua.',
    gradient: 'from-blue-500/10 to-cyan-500/5',
  },
];

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [isInView, target]);

  return <span ref={ref}>{value}{suffix}</span>;
}

const stats = [
  { value: 10, suffix: '+', label: 'Años de experiencia' },
  { value: 60, suffix: '+', label: 'Nadadoras activas' },
  { value: 3, suffix: '', label: 'Sedes en Valencia' },
  { value: 20, suffix: '+', label: 'Competiciones al año' },
];

export default function AboutSection() {
  return (
    <section id="valores" className="relative py-24 bg-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-atlantis-red/[0.02] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-atlantis-blue/[0.03] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 text-atlantis-red text-sm font-semibold tracking-widest uppercase mb-4">
            <Sparkles className="h-4 w-4" />
            Quiénes somos
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-atlantis-black tracking-tight mb-4">
            Nuestros Valores
          </h2>
          <div className="w-16 h-1 bg-atlantis-red mx-auto rounded-full mb-6" />
          <p className="text-atlantis-gray text-lg max-w-2xl mx-auto leading-relaxed">
            Somos un club dedicado a la natación artística en Valencia, formando nadadoras con pasión y excelencia.
          </p>
        </motion.div>

        {/* Water wave separator */}
        <div className="mb-16 opacity-10">
          <svg viewBox="0 0 1200 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 20C200 5 400 35 600 20C800 5 1000 35 1200 20" stroke="#D32F2F" strokeWidth="2" />
            <path d="M0 28C200 13 400 43 600 28C800 13 1000 43 1200 28" stroke="#D32F2F" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Value cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              className="group relative bg-white rounded-3xl p-8 text-center border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10">
                <div className="bg-atlantis-red w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-atlantis-red/20">
                  <card.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-atlantis-black mb-3">{card.title}</h3>
                <p className="text-atlantis-gray leading-relaxed">{card.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats counters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-atlantis-blue to-[#001a33] rounded-3xl p-10 md:p-14 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle wave pattern inside stats */}
          <div className="absolute inset-0 opacity-[0.04]">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <pattern id="stats-waves" x="0" y="0" width="200" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 20C50 5 100 35 150 20C200 5 200 20 200 20" stroke="white" strokeWidth="1" fill="none" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#stats-waves)" />
            </svg>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-black text-white mb-2">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
