import { Clock, Calendar, MapPin } from 'lucide-react';

const scheduleData = [
  { day: 'Lunes', time: '17:00 - 20:00', groups: 'Iniciación / Competición', highlight: false },
  { day: 'Martes', time: '17:00 - 20:00', groups: 'Iniciación / Competición', highlight: false },
  { day: 'Miércoles', time: '17:00 - 20:00', groups: 'Iniciación / Competición', highlight: false },
  { day: 'Jueves', time: '17:00 - 20:00', groups: 'Iniciación / Competición', highlight: false },
  { day: 'Viernes', time: '17:00 - 19:00', groups: 'Todos los niveles', highlight: true },
  { day: 'Sábado', time: '10:00 - 13:00', groups: 'Competición / Rendimiento', highlight: true },
];

export default function ScheduleSection() {
  return (
    <section id="horarios" className="relative py-24 bg-atlantis-blue text-white overflow-hidden">
      {/* Wave top transition */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none">
          <path
            d="M0 0H1440V40C1344 60 1248 20 1152 30C1056 40 960 60 864 50C768 40 672 20 576 30C480 40 384 60 288 50C192 40 96 20 48 30L0 40V0Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Subtle water pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="waves" x="0" y="0" width="200" height="40" patternUnits="userSpaceOnUse">
            <path d="M0 20C50 5 100 35 150 20C200 5 200 20 200 20" stroke="white" strokeWidth="1" fill="none" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#waves)" />
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
              Consulta nuestros horarios según tu grupo y nivel. Entrenamos de lunes a sábado en nuestras instalaciones.
            </p>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="h-5 w-5 text-white/70" />
                <span className="font-semibold">Sede principal</span>
              </div>
              <p className="text-white/50 text-sm">Polideportivo de Nazaret, Valencia</p>
            </div>
          </div>

          {/* Right column - Schedule table */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10">
              <div className="bg-atlantis-red px-8 py-5 flex items-center gap-3">
                <Calendar className="h-6 w-6 text-white/90" />
                <span className="font-bold text-xl tracking-tight">Temporada 2025-2026</span>
              </div>
              <div className="divide-y divide-white/5">
                {scheduleData.map((item) => (
                  <div key={item.day} className="px-6 md:px-8 py-5 flex items-center justify-between hover:bg-white/5 transition-colors group">
                    <div className="flex items-center gap-4">
                      <span className="font-bold w-20 md:w-24 text-lg text-white">
                        {item.day}
                      </span>
                      <div className="flex items-center gap-2 text-white/70">
                        <Clock className="h-4 w-4 text-white/50 flex-shrink-0" />
                        <span className="font-medium text-sm md:text-base">{item.time}</span>
                      </div>
                    </div>
                    <span className="text-xs md:text-sm text-white/80 font-bold uppercase tracking-wider hidden sm:block bg-white/10 px-3 py-1 rounded-full border border-white/10 group-hover:bg-white/15 transition-colors">
                      {item.groups}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave bottom transition */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none">
          <path
            d="M0 40L48 35C96 30 192 20 288 25C384 30 480 50 576 55C672 60 768 50 864 40C960 30 1056 20 1152 25C1248 30 1344 50 1392 60L1440 65V80H0V40Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
