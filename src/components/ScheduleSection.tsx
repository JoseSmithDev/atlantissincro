import Link from 'next/link';
import { Clock, Calendar, MapPin, Users, MessageCircle, ArrowRight } from 'lucide-react';

const iniciacionData = {
  id: 'iniciacion',
  name: 'Escuela / Iniciación',
  ageGroup: '6 a 12 años aprox.',
  schedule: [
    { day: 'Lunes', time: '17:30 - 19:00', groups: 'Nivel 1 y 2' },
    { day: 'Miércoles', time: '17:30 - 19:00', groups: 'Nivel 1 y 2' },
    { day: 'Viernes', time: '17:30 - 19:00', groups: 'Todos los niveles' },
  ]
};

const otherCategories = [
  { id: 'base', name: 'Alevín e Infantil', ageGroup: '10 a 15 años aprox.' },
  { id: 'absoluto', name: 'Junior y Absoluto', ageGroup: '+16 años aprox.' },
  { id: 'master', name: 'Máster', ageGroup: '+20 años / Adultos' },
];

export default function ScheduleSection() {
  const currentCategory = iniciacionData;

  return (
    <section id="horarios" className="relative pt-28 pb-28 md:pt-32 md:pb-32 bg-atlantis-blue text-white overflow-hidden">
      {/* Wave top — altura fija para evitar gaps sub-pixel entre secciones */}
      <div className="absolute top-0 left-0 right-0 h-16 md:h-20 overflow-hidden" style={{ transform: 'translateY(-1px)' }}>
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
          {/* Rellena blanco (=bg de Competitions) para que se funda sin costura */}
          <path d="M0 0H1440V40C1344 60 1248 20 1152 30C1056 40 960 60 864 50C768 40 672 20 576 30C480 40 384 60 288 50C192 40 96 20 48 30L0 40V0Z" fill="white" />
        </svg>
      </div>

      {/* Subtle water pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="waves2" x="0" y="0" width="200" height="40" patternUnits="userSpaceOnUse">
            <path d="M0 20C50 5 100 35 150 20C200 5 200 20 200 20" stroke="white" strokeWidth="1" fill="none" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#waves2)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Left column - Info */}
          <div className="lg:col-span-2">
            <div className="inline-flex items-center gap-2 text-white/70 text-sm font-semibold tracking-widest uppercase mb-4">
              <Clock className="h-4 w-4" />
              Planificación
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              Horarios de Entrenamiento
            </h2>
            <div className="w-16 h-1 bg-white/30 rounded-full mb-6" />
            <p className="text-white/60 text-lg mb-8 leading-relaxed">
              Consulta nuestros horarios aproximados según tu categoría y nivel. Las edades son orientativas y los grupos definitivos se asignarán por nivel técnico.
            </p>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 mb-8">
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="h-5 w-5 text-white/70" />
                <span className="font-semibold">Sede principal</span>
              </div>
              <p className="text-white/50 text-sm">Polideportivo de Nazaret, Valencia</p>
            </div>
          </div>

          {/* Right column - Schedule table */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 shadow-2xl transition-all duration-500 lg:sticky lg:top-24">
              <div className="bg-atlantis-red px-6 sm:px-8 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <pattern id="diagonal-stripes" x="0" y="0" width="20" height="20" patternTransform="rotate(45)">
                      <rect width="10" height="20" fill="white" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#diagonal-stripes)" />
                  </svg>
                </div>

                <div className="flex items-center gap-3 relative z-10">
                  <Calendar className="h-6 w-6 text-white" />
                  <span className="font-bold text-xl tracking-tight text-white">Temporada 2025-2026</span>
                </div>
              </div>

              {/* Category label */}
              <div className="bg-black/20 px-6 sm:px-8 py-3 border-b border-white/10 flex items-center gap-2">
                <Users className="h-4 w-4 text-white/50" />
                <span className="text-sm font-bold text-white">{currentCategory.name}</span>
              </div>

              <div className="p-6 md:p-8">
                <div className="inline-flex items-center gap-2 mb-8 bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-sm text-white/80">
                  <div className="h-2 w-2 rounded-full bg-atlantis-red animate-pulse"></div>
                  Edad orientativa: <strong className="text-white">{currentCategory.ageGroup}</strong>
                </div>

                <div className="divide-y divide-white/10">
                  {currentCategory.schedule.map((item, index) => (
                    <div key={index} className="py-5 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-white/[0.04] transition-colors group -mx-4 px-4 rounded-2xl">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 mb-3 sm:mb-0">
                        <span className="font-black w-28 text-xl text-white tracking-wide">
                          {item.day}
                        </span>
                        <div className="flex items-center gap-2 text-white/80 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                          <Clock className="h-4 w-4 text-white/50 flex-shrink-0" />
                          <span className="font-bold text-base tracking-wider">{item.time}</span>
                        </div>
                      </div>
                      <span className="text-xs md:text-sm text-white font-bold uppercase tracking-wider bg-atlantis-red/80 px-4 py-2 rounded-full border border-white/10 sm:text-right self-start sm:self-auto shadow-sm">
                        {item.groups}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Other categories — contact CTA */}
                <div className="mt-8 pt-8 border-t border-white/10">
                  <p className="text-white/50 text-sm mb-4 flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 flex-shrink-0" />
                    ¿Buscas otra categoría? Contáctanos para más información:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {otherCategories.map(cat => (
                      <Link
                        key={cat.id}
                        href="/contacto"
                        className="inline-flex items-center gap-2 bg-white/5 hover:bg-atlantis-red/80 border border-white/10 hover:border-atlantis-red px-4 py-2 rounded-xl text-sm font-bold text-white/70 hover:text-white transition-all duration-300 group"
                      >
                        <Users className="h-3.5 w-3.5 opacity-50 group-hover:opacity-100" />
                        {cat.name}
                        <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 -ml-1 transition-all duration-300" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave bottom — altura fija + translateY para eliminar gap con NewsSection */}
      <div className="absolute bottom-0 left-0 right-0 h-16 md:h-20 overflow-hidden" style={{ transform: 'translateY(1px)' }}>
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0 40L48 35C96 30 192 20 288 25C384 30 480 50 576 55C672 60 768 50 864 40C960 30 1056 20 1152 25C1248 30 1344 50 1392 60L1440 65V80H0V40Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
