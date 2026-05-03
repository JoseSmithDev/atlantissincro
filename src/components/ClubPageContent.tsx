'use client';

import { motion } from 'framer-motion';
import { Users, Award, Waves, Mail, ArrowRight, Clock, MapPin, MessageCircle, Heart, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { TeamMemberData } from '@/app/club/page';

const programs = [
  {
    id: 'iniciacion',
    icon: Waves,
    title: 'Iniciación',
    subtitle: '6 a 11 años',
    description: 'Primer contacto con la natación artística. Flexibilidad, ritmo y figuras básicas.',
    href: '#horarios',
    cta: 'Ver horarios',
  },
  {
    id: 'competicion',
    icon: Award,
    title: 'Competición',
    subtitle: 'Alevín, infantil y junior',
    description: 'Equipo de alto rendimiento. Participación en campeonatos autonómicos y nacionales.',
    href: '/contacto',
    cta: 'Contactar al club',
  },
  {
    id: 'master',
    icon: Users,
    title: 'Máster',
    subtitle: 'Mayores de 25 años',
    description: 'Grupo para adultas que quieren disfrutar de la natación artística.',
    href: '/contacto',
    cta: 'Contactar al club',
  },
];

const pools = [
  {
    id: 'benimamet',
    name: 'Benimamet',
    label: 'Escuelas',
    schedule: [
      { days: 'Lunes y Miércoles', time: '18:00 – 19:30' },
      { days: 'Martes y Jueves', time: '18:00 – 19:30' },
    ],
  },
  {
    id: 'nou-moles',
    name: 'Nou Moles',
    label: 'Escuelas',
    schedule: [
      { days: 'Lunes y Miércoles', time: '18:00 – 19:30' },
      { days: 'Martes y Jueves', time: '18:00 – 19:30' },
    ],
  },
  {
    id: 'nazaret',
    name: 'Nazaret',
    label: 'Escuelas',
    schedule: [
      { days: 'Sábado', time: '10:00 – 11:30' },
    ],
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
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-white/70 text-sm font-semibold tracking-widest uppercase mb-6"
          >
            <Heart className="h-4 w-4" />
            Familia Atlantis
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
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
            className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
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
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-1/2 -right-32 w-80 h-80 bg-atlantis-red/[0.03] rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/2 -left-32 w-80 h-80 bg-atlantis-blue/[0.04] rounded-full blur-3xl -translate-y-1/2" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
          >
            <div className="inline-flex items-center gap-2 text-atlantis-red text-sm font-semibold tracking-widest uppercase mb-4">
              <Sparkles className="h-4 w-4" />
              Trayectoria
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-atlantis-blue tracking-tight mb-4">
              Nuestra Historia
            </h2>
            <div className="w-16 h-1 bg-atlantis-red rounded-full mb-8 mx-auto" />
            <div className="space-y-5 text-atlantis-gray text-lg leading-relaxed">
              <p>
                El Club Natación Artística Atlantis nació con la misión de llevar la natación artística a todos los rincones de Valencia. Desde nuestros inicios en el Polideportivo de Nazaret, hemos crecido hasta convertirnos en uno de los clubes de referencia de la Comunitat Valenciana.
              </p>
              <p>
                Nuestra filosofía se basa en la &quot;Familia Atlantis&quot;: combinamos la excelencia competitiva con los valores sociales y la disciplina. Creemos que la natación artística no solo forma deportistas, sino personas íntegras.
              </p>
              <p>
                Hoy contamos con programas de iniciación, competición y máster, abiertos a todas las edades.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Subtle wave separator → atlantis-surface */}
        <div className="absolute bottom-0 left-0 right-0 h-12 overflow-hidden pointer-events-none" style={{ transform: 'translateY(1px)' }}>
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0 30L48 25C96 20 192 10 288 15C384 20 480 40 576 45C672 50 768 40 864 30C960 20 1056 10 1152 15C1248 20 1344 40 1392 50L1440 55V60H0V30Z" fill="#F8FAFC" />
          </svg>
        </div>
      </section>

      {/* ── Programas (botones de navegación) ── */}
      <section id="programas" className="py-24 bg-atlantis-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 text-atlantis-red text-sm font-semibold tracking-widest uppercase mb-4">
              <Waves className="h-4 w-4" />
              Programas
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-atlantis-blue tracking-tight mb-4">
              Elige tu nivel
            </h2>
            <div className="w-16 h-1 bg-atlantis-red mx-auto rounded-full mb-6" />
            <p className="text-atlantis-gray text-lg max-w-2xl mx-auto leading-relaxed">
              Tres caminos para unirte a la Familia Atlantis, según tu edad y experiencia.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {programs.map((program, i) => (
              <motion.div
                key={program.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <Link
                  href={program.href}
                  className="group relative block h-full bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center overflow-hidden"
                >
                  {/* Subtle accent on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-atlantis-red/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative">
                    <div className="bg-atlantis-red w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-atlantis-red/20">
                      <program.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-atlantis-blue mb-1">{program.title}</h3>
                    <p className="text-atlantis-red text-sm font-semibold mb-3">{program.subtitle}</p>
                    <p className="text-atlantis-gray text-sm leading-relaxed mb-6">{program.description}</p>
                    <span className="inline-flex items-center gap-2 text-atlantis-blue font-semibold text-sm group-hover:text-atlantis-red transition-colors">
                      {program.cta}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Horarios de Entrenamiento ── */}
      <section id="horarios" className="relative pt-28 pb-28 md:pt-32 md:pb-32 bg-atlantis-blue text-white overflow-hidden scroll-mt-20">
        {/* Wave top desde atlantis-surface */}
        <div className="absolute top-0 left-0 right-0 h-16 md:h-20 overflow-hidden" style={{ transform: 'translateY(-1px)' }}>
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0 0H1440V40C1344 60 1248 20 1152 30C1056 40 960 60 864 50C768 40 672 20 576 30C480 40 384 60 288 50C192 40 96 20 48 30L0 40V0Z" fill="#F8FAFC" />
          </svg>
        </div>

        {/* Subtle water pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="club-schedule-waves" x="0" y="0" width="200" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20C50 5 100 35 150 20C200 5 200 20 200 20" stroke="white" strokeWidth="1" fill="none" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#club-schedule-waves)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

            {/* Left column - Info */}
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 text-white/70 text-sm font-semibold tracking-widest uppercase mb-4">
                <Clock className="h-4 w-4" />
                Iniciación
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                Horarios de Entrenamiento
              </h2>
              <div className="w-16 h-1 bg-white/30 rounded-full mb-6" />
              <p className="text-white/60 text-lg mb-8 leading-relaxed">
                Consulta nuestros horarios por piscina. Cada grupo escoge un turno: Lunes y Miércoles o Martes y Jueves.
              </p>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="h-5 w-5 text-white/70" />
                  <span className="font-semibold">Tres instalaciones</span>
                </div>
                <p className="text-white/50 text-sm">Benimamet · Nou Moles · Nazaret</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
                <p className="text-white/50 text-sm flex items-start gap-2">
                  <MessageCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  ¿Tienes dudas sobre la piscina más cercana? Contáctanos y te orientamos.
                </p>
                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-2 mt-4 bg-atlantis-red/80 hover:bg-atlantis-red border border-white/10 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-300 group"
                >
                  Contactar
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right column - Pool cards */}
            <div className="lg:col-span-3 flex flex-col gap-5">
              {pools.map((pool) => (
                <div
                  key={pool.id}
                  className="bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 shadow-xl"
                >
                  {/* Card header */}
                  <div className="bg-atlantis-red/90 px-6 py-4 flex items-center justify-between relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <pattern id={`club-stripes-${pool.id}`} x="0" y="0" width="20" height="20" patternTransform="rotate(45)">
                          <rect width="10" height="20" fill="white" />
                        </pattern>
                        <rect width="100%" height="100%" fill={`url(#club-stripes-${pool.id})`} />
                      </svg>
                    </div>
                    <div className="relative z-10 flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-white/90" />
                      <span className="font-black text-xl tracking-tight text-white">{pool.name}</span>
                    </div>
                    <span className="relative z-10 text-xs font-bold uppercase tracking-widest text-white/70 bg-black/20 px-3 py-1 rounded-full border border-white/10">
                      {pool.label}
                    </span>
                  </div>

                  {/* Schedule rows */}
                  <div className="px-6 py-5 divide-y divide-white/10">
                    {pool.schedule.map((item, i) => (
                      <div key={i} className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <span className="font-black text-lg text-white tracking-wide">
                          {item.days}
                        </span>
                        <div className="flex items-center gap-2 text-white/80 bg-white/5 px-4 py-2 rounded-lg border border-white/5 w-fit">
                          <Clock className="h-4 w-4 text-white/50 flex-shrink-0" />
                          <span className="font-bold text-base tracking-wider">{item.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
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
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 text-atlantis-red text-sm font-semibold tracking-widest uppercase mb-4">
              <Users className="h-4 w-4" />
              Entrenadoras
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-atlantis-blue tracking-tight mb-4">
              Equipo Técnico
            </h2>
            <div className="w-16 h-1 bg-atlantis-red mx-auto rounded-full mb-6" />
            <p className="text-atlantis-gray text-lg max-w-2xl mx-auto leading-relaxed">
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

      {/* ── CTA: tarjeta contenida sobre blanco ── */}
      <section className="pb-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-gradient-to-br from-atlantis-blue to-[#001a33] rounded-3xl p-10 md:p-16 shadow-2xl overflow-hidden"
          >
            {/* Subtle wave pattern */}
            <div className="absolute inset-0 opacity-[0.04]">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <pattern id="club-cta-waves" x="0" y="0" width="200" height="40" patternUnits="userSpaceOnUse">
                  <path d="M0 20C50 5 100 35 150 20C200 5 200 20 200 20" stroke="white" strokeWidth="1" fill="none" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#club-cta-waves)" />
              </svg>
            </div>

            {/* Subtle red glow accent */}
            <div className="absolute -top-1/3 -right-1/4 w-[28rem] h-[28rem] bg-atlantis-red/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 text-center text-white">
              <div className="inline-flex items-center gap-2 text-white/60 text-sm font-semibold tracking-widest uppercase mb-4">
                <Sparkles className="h-4 w-4" />
                Únete
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4">
                ¿Quieres formar parte?
              </h2>
              <div className="w-16 h-1 bg-atlantis-red mx-auto rounded-full mb-6" />
              <p className="text-base md:text-lg text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
                Únete a la Familia Atlantis. Contáctanos y te informaremos de todo lo que necesitas saber.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contacto"
                  className="group inline-flex items-center gap-2 bg-atlantis-red hover:bg-atlantis-red-dark text-white px-8 py-4 rounded-full text-base font-bold shadow-lg shadow-atlantis-red/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Mail className="h-5 w-5" />
                  Contáctanos
                </Link>
                <Link
                  href="/competiciones"
                  className="group inline-flex items-center gap-2 border-2 border-white/20 text-white/90 hover:border-white/40 hover:text-white px-8 py-4 rounded-full text-base font-medium transition-all duration-300 backdrop-blur-sm"
                >
                  Ver Competiciones
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
