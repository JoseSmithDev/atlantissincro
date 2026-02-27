"use client";

import { useState } from 'react';
import { Clock, Calendar, MapPin, Users } from 'lucide-react';

const categoriesData = [
  {
    id: 'iniciacion',
    name: 'Escuela / Iniciación',
    ageGroup: '6 a 12 años aprox.',
    schedule: [
      { day: 'Lunes', time: '17:30 - 19:00', groups: 'Nivel 1 y 2' },
      { day: 'Miércoles', time: '17:30 - 19:00', groups: 'Nivel 1 y 2' },
      { day: 'Viernes', time: '17:30 - 19:00', groups: 'Todos los niveles' },
    ]
  },
  {
    id: 'base',
    name: 'Alevín e Infantil',
    ageGroup: '10 a 15 años aprox.',
    schedule: [
      { day: 'Martes', time: '17:30 - 20:00', groups: 'Competición Base' },
      { day: 'Jueves', time: '17:30 - 20:00', groups: 'Competición Base' },
      { day: 'Viernes', time: '17:30 - 19:30', groups: 'Competición Base' },
      { day: 'Sábado', time: '10:00 - 13:00', groups: 'Rendimiento' },
    ]
  },
  {
    id: 'absoluto',
    name: 'Junior y Absoluto',
    ageGroup: '+16 años aprox.',
    schedule: [
      { day: 'Lunes', time: '19:00 - 21:00', groups: 'Alto Rendimiento' },
      { day: 'Miércoles', time: '19:00 - 21:00', groups: 'Alto Rendimiento' },
      { day: 'Viernes', time: '19:00 - 21:00', groups: 'Alto Rendimiento' },
      { day: 'Sábado', time: '10:00 - 13:30', groups: 'Alto Rendimiento' },
    ]
  },
  {
    id: 'master',
    name: 'Máster',
    ageGroup: '+20 años / Adultos',
    schedule: [
      { day: 'Martes', time: '20:00 - 21:30', groups: 'Nivel Único' },
      { day: 'Jueves', time: '20:00 - 21:30', groups: 'Nivel Único' },
      { day: 'Sábado', time: '12:00 - 14:00', groups: 'Nivel Único' },
    ]
  }
];

export default function ScheduleSection() {
  const [activeCategory, setActiveCategory] = useState(categoriesData[0].id);

  const currentCategory = categoriesData.find(c => c.id === activeCategory) || categoriesData[0];

  return (
    <section id="horarios" className="relative py-24 bg-atlantis-blue text-white overflow-hidden">
      {/* Wave top transition */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none">
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

              {/* Category Selector Tabs */}
              <div
                className="bg-black/20 p-2 sm:p-3 overflow-x-auto border-b border-white/10"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <div className="flex items-center gap-2 min-w-max px-2">
                  {categoriesData.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${activeCategory === cat.id
                          ? 'bg-atlantis-red text-white shadow-md shadow-atlantis-red/20'
                          : 'bg-transparent text-white/60 hover:text-white hover:bg-white/10'
                        }`}
                    >
                      <Users className={`h-4 w-4 ${activeCategory === cat.id ? 'opacity-100' : 'opacity-50'}`} />
                      <span>{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 md:p-8 min-h-[350px]" key={activeCategory}>
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

                {currentCategory.schedule.length === 0 && (
                  <div className="text-center py-16 text-white/50 flex flex-col items-center gap-4">
                    <Calendar className="h-12 w-12 opacity-20" />
                    <span>No hay horarios definidos para esta categoría aún.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave bottom transition */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none">
          <path d="M0 40L48 35C96 30 192 20 288 25C384 30 480 50 576 55C672 60 768 50 864 40C960 30 1056 20 1152 25C1248 30 1344 50 1392 60L1440 65V80H0V40Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
