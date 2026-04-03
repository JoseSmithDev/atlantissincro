import Link from 'next/link';
import { Clock, MapPin, MessageCircle, ArrowRight } from 'lucide-react';

const pools = [
  {
    id: 'benimamet',
    name: 'Benimamet',
    label: 'Escuelas',
    schedule: [
      { days: 'Lunes, Martes, Miércoles y Jueves', time: '18:00 – 19:30' },
    ],
  },
  {
    id: 'nou-moles',
    name: 'Nou Moles',
    label: 'Escuelas',
    schedule: [
      { days: 'Lunes, Martes, Miércoles y Jueves', time: '18:00 – 19:30' },
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

export default function ScheduleSection() {
  return (
    <section id="horarios" className="relative pt-28 pb-28 md:pt-32 md:pb-32 bg-atlantis-blue text-white overflow-hidden">
      {/* Wave top */}
      <div className="absolute top-0 left-0 right-0 h-16 md:h-20 overflow-hidden" style={{ transform: 'translateY(-1px)' }}>
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
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
              Consulta nuestros horarios por piscina. Los grupos definitivos se asignan por nivel técnico.
            </p>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 mb-8">
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
                      <pattern id={`stripes-${pool.id}`} x="0" y="0" width="20" height="20" patternTransform="rotate(45)">
                        <rect width="10" height="20" fill="white" />
                      </pattern>
                      <rect width="100%" height="100%" fill={`url(#stripes-${pool.id})`} />
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

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 md:h-20 overflow-hidden" style={{ transform: 'translateY(1px)' }}>
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0 40L48 35C96 30 192 20 288 25C384 30 480 50 576 55C672 60 768 50 864 40C960 30 1056 20 1152 25C1248 30 1344 50 1392 60L1440 65V80H0V40Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
