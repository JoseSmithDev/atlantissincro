'use client';

import { motion } from 'framer-motion';
import { MapPin, Users, Award, Waves, Mail, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { TeamMemberData } from '@/app/club/page';

const locations = [
  {
    name: 'Polideportivo de Nazaret',
    address: 'Sede principal',
    description: 'Nuestra base principal donde se realizan los entrenamientos de todos los grupos.',
  },
  {
    name: 'Nou Moles',
    address: 'Valencia',
    description: 'Centro de entrenamiento para grupos de iniciación y rendimiento.',
  },
  {
    name: 'Benimamet',
    address: 'Valencia',
    description: 'Instalaciones para sesiones complementarias y entrenamientos especiales.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' as const },
  }),
};

export default function ClubPageContent({ teamMembers }: { teamMembers: TeamMemberData[] }) {
  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-atlantis-blue via-[#001a33] to-atlantis-red/10 text-white pt-28 pb-32 md:pt-36 md:pb-40 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(ellipse_at_50%_50%,_#D32F2F,_transparent_70%)]" />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/[0.04] animate-[bubbleRise_linear_infinite]"
              style={{
                width: `${10 + (i * 9) % 18}px`,
                height: `${10 + (i * 9) % 18}px`,
                left: `${10 + (i * 15) % 80}%`,
                bottom: '-20px',
                animationDelay: `${(i * 2.1) % 10}s`,
                animationDuration: `${7 + (i * 1.5) % 7}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-4"
          >
            El Club
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: '4rem' }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-atlantis-red mx-auto rounded-full mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Más de una década formando nadadoras con excelencia, valores y pasión por la natación artística.
          </motion.p>
        </div>

        {/* Wave → white */}
        <div className="absolute bottom-0 left-0 right-0 h-16 md:h-20 overflow-hidden" style={{ transform: 'translateY(1px)' }}>
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0 40L48 35C96 30 192 20 288 25C384 30 480 50 576 55C672 60 768 50 864 40C960 30 1056 20 1152 25C1248 30 1344 50 1392 60L1440 65V80H0V40Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── Historia ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              variants={fadeUp}
            >
              <h2 className="text-3xl md:text-4xl font-black text-atlantis-blue tracking-tight mb-4">
                Nuestra Historia
              </h2>
              <div className="w-12 h-1 bg-atlantis-red rounded-full mb-6" />
              <p className="text-atlantis-gray mb-4 leading-relaxed">
                El Club Natación Artística Atlantis nació con la misión de llevar la natación artística a todos los rincones de Valencia. Desde nuestros inicios en el Polideportivo de Nazaret, hemos crecido hasta convertirnos en uno de los clubes de referencia de la Comunitat Valenciana.
              </p>
              <p className="text-atlantis-gray mb-4 leading-relaxed">
                Nuestra filosofía se basa en la &quot;Familia Atlantis&quot;: combinamos la excelencia competitiva con los valores sociales y la disciplina. Creemos que la natación artística no solo forma deportistas, sino personas íntegras.
              </p>
              <p className="text-atlantis-gray leading-relaxed">
                Hoy contamos con programas de iniciación para niñas a partir de 6 años, grupos de rendimiento y equipos de competición que participan en campeonatos autonómicos y nacionales.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              variants={fadeUp}
              className="bg-atlantis-surface rounded-3xl p-8 border border-gray-100"
            >
              <div className="space-y-6">
                {[
                  { icon: Waves, title: 'Iniciación (6-11 años)', desc: 'Primer contacto con la natación artística. Trabajo de flexibilidad, ritmo y figuras básicas.' },
                  { icon: Users, title: 'Rendimiento', desc: 'Perfeccionamiento técnico, coreografías más complejas y preparación para competición.' },
                  { icon: Award, title: 'Competición', desc: 'Equipo de alto rendimiento. Participación en campeonatos autonómicos y nacionales.' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="bg-atlantis-red w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center">
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-atlantis-blue mb-1">{item.title}</h3>
                      <p className="text-atlantis-gray text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Sedes ── bg-atlantis-blue igual que Horarios en home */}
      <section className="relative pt-28 pb-28 md:pt-32 md:pb-32 bg-atlantis-blue text-white overflow-hidden">
        {/* Wave top — desde white */}
        <div className="absolute top-0 left-0 right-0 h-16 md:h-20 overflow-hidden" style={{ transform: 'translateY(-1px)' }}>
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0 0H1440V40C1344 60 1248 20 1152 30C1056 40 960 60 864 50C768 40 672 20 576 30C480 40 384 60 288 50C192 40 96 20 48 30L0 40V0Z" fill="white" />
          </svg>
        </div>

        {/* Subtle water pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="club-waves-bg" x="0" y="0" width="200" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20C50 5 100 35 150 20C200 5 200 20 200 20" stroke="white" strokeWidth="1" fill="none" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#club-waves-bg)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 text-white/70 text-sm font-semibold tracking-widest uppercase mb-4">
              <MapPin className="h-4 w-4" />
              Valencia
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              Nuestras Sedes
            </h2>
            <div className="w-16 h-1 bg-white/30 rounded-full mx-auto mb-6" />
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Entrenamos en tres instalaciones en el área metropolitana de Valencia.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {locations.map((location, i) => (
              <motion.div
                key={location.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="bg-atlantis-red/80 w-12 h-12 rounded-2xl flex items-center justify-center mb-5">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{location.name}</h3>
                <p className="text-atlantis-red-light text-sm font-semibold mb-3">{location.address}</p>
                <p className="text-white/60 text-sm leading-relaxed">{location.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Wave bottom → white */}
        <div className="absolute bottom-0 left-0 right-0 h-16 md:h-20 overflow-hidden" style={{ transform: 'translateY(1px)' }}>
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0 40L48 35C96 30 192 20 288 25C384 30 480 50 576 55C672 60 768 50 864 40C960 30 1056 20 1152 25C1248 30 1344 50 1392 60L1440 65V80H0V40Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── Equipo Técnico ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-black text-atlantis-blue tracking-tight mb-4">
              Equipo Técnico
            </h2>
            <div className="w-16 h-1 bg-atlantis-red mx-auto rounded-full mb-6" />
            <p className="text-atlantis-gray max-w-2xl mx-auto">
              Nuestras entrenadoras están tituladas y cuentan con amplia experiencia en competiciones nacionales e internacionales.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.length > 0 ? (
              teamMembers.map((member, i) => (
                <motion.div
                  key={member.id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 text-center"
                >
                  <div className="relative w-28 h-28 rounded-3xl mx-auto mb-5 overflow-hidden bg-gradient-to-br from-atlantis-blue/10 to-atlantis-red/5">
                    {member.image_url ? (
                      <Image
                        src={member.image_url}
                        alt={member.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-3xl font-black text-atlantis-blue/30">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-atlantis-blue">{member.name}</h3>
                  <p className="text-atlantis-red text-sm font-semibold mt-1">{member.role}</p>
                  {member.description && (
                    <p className="text-atlantis-gray text-sm mt-2 leading-relaxed">{member.description}</p>
                  )}
                </motion.div>
              ))
            ) : (
              ['Entrenadora Principal', 'Entrenadora Adjunta', 'Preparadora Física'].map((role, i) => (
                <motion.div
                  key={role}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 text-center"
                >
                  <div className="bg-gradient-to-br from-atlantis-blue/10 to-atlantis-red/5 w-28 h-28 rounded-3xl mx-auto mb-5 flex items-center justify-center">
                    <Users className="h-12 w-12 text-atlantis-blue/60" />
                  </div>
                  <h3 className="text-lg font-bold text-atlantis-blue">{role}</h3>
                  <p className="text-atlantis-gray text-sm mt-1">CNA Atlantis</p>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative pt-28 pb-32 md:pt-32 md:pb-36 bg-gradient-to-br from-atlantis-red to-[#a01010] text-white overflow-hidden">
        {/* Wave top → desde white */}
        <div className="absolute top-0 left-0 right-0 h-16 md:h-20 overflow-hidden" style={{ transform: 'translateY(-1px)' }}>
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0 0H1440V40C1344 60 1248 20 1152 30C1056 40 960 60 864 50C768 40 672 20 576 30C480 40 384 60 288 50C192 40 96 20 48 30L0 40V0Z" fill="white" />
          </svg>
        </div>

        <div className="absolute inset-0 opacity-[0.06]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="cta-waves" x="0" y="0" width="200" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20C50 5 100 35 150 20C200 5 200 20 200 20" stroke="white" strokeWidth="1" fill="none" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#cta-waves)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-black tracking-tight mb-6"
          >
            ¿Quieres formar parte?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-xl text-white/80 mb-10 max-w-2xl mx-auto"
          >
            Únete a la Familia Atlantis. Contáctanos y te informaremos de todo lo que necesitas saber.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/contacto"
              className="group inline-flex items-center gap-2 bg-white text-atlantis-red px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              <Mail className="h-5 w-5" />
              Contáctanos
            </Link>
            <Link
              href="/competiciones"
              className="group inline-flex items-center gap-2 border-2 border-white/30 text-white hover:border-white/60 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300"
            >
              Ver Competiciones
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Wave bottom → white (para el footer) */}
        <div className="absolute bottom-0 left-0 right-0 h-16 md:h-20 overflow-hidden" style={{ transform: 'translateY(1px)' }}>
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0 40L48 35C96 30 192 20 288 25C384 30 480 50 576 55C672 60 768 50 864 40C960 30 1056 20 1152 25C1248 30 1344 50 1392 60L1440 65V80H0V40Z" fill="white" />
          </svg>
        </div>
      </section>

    </div>
  );
}
