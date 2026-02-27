import { Trophy, Calendar, Medal } from 'lucide-react';
import type { Competition } from '@/lib/types';

function daysUntil(dateStr: string): number {
  const target = new Date(dateStr + 'T00:00:00');
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

type MedalResult = {
  name: string;
  category: string;
  modality: string;
  medal: 'gold' | 'silver' | 'bronze';
};

const SAMPLE_RESULTS: MedalResult[] = [
  { name: 'Lucía Martínez',              category: 'Infantil',  modality: 'Solo',   medal: 'gold'   },
  { name: 'Sara Gómez',                  category: 'Alevín',    modality: 'Solo',   medal: 'gold'   },
  { name: 'Martínez / Pérez',            category: 'Infantil',  modality: 'Dúo',    medal: 'gold'   },
  { name: 'Equipo Infantil Atlantis',    category: 'Infantil',  modality: 'Equipo', medal: 'gold'   },
  { name: 'Valeria Ruiz',               category: 'Junior',    modality: 'Solo',   medal: 'silver' },
  { name: 'Gómez / Torres',             category: 'Alevín',    modality: 'Dúo',    medal: 'silver' },
  { name: 'Equipo Junior Atlantis',      category: 'Junior',    modality: 'Equipo', medal: 'silver' },
  { name: 'Carmen López',               category: 'Absoluto',  modality: 'Solo',   medal: 'silver' },
  { name: 'Alba Fernández',             category: 'Alevín',    modality: 'Solo',   medal: 'bronze' },
  { name: 'Ruiz / Sánchez',            category: 'Junior',    modality: 'Dúo',    medal: 'bronze' },
  { name: 'Equipo Absoluto Atlantis',    category: 'Absoluto',  modality: 'Equipo', medal: 'bronze' },
  { name: 'Equipo Máster Atlantis',      category: 'Máster',    modality: 'Equipo', medal: 'bronze' },
];

function getSampleResults(id: string): MedalResult[] {
  const charSum = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const count = (charSum % 4) + 3; // entre 3 y 6 resultados
  const offset = charSum % SAMPLE_RESULTS.length;
  const results: MedalResult[] = [];
  for (let i = 0; i < count; i++) {
    results.push(SAMPLE_RESULTS[(offset + i) % SAMPLE_RESULTS.length]);
  }
  return results;
}

export default function CompetitionsList({ competitions }: { competitions: Competition[] }) {
  const today = new Date().toISOString().split('T')[0];

  const upcoming = competitions
    .filter((c) => c.date && c.date >= today)
    .sort((a, b) => (a.date! > b.date! ? 1 : -1));

  const past = competitions
    .filter((c) => c.date && c.date < today)
    .sort((a, b) => (a.date! > b.date! ? -1 : 1));

  const noDate = competitions.filter((c) => !c.date);

  return (
    <div className="space-y-12">
      {/* Upcoming */}
      <div>
        <h2 className="text-2xl font-black text-atlantis-black tracking-tight mb-6 flex items-center gap-3">
          <Trophy className="h-6 w-6 text-atlantis-red" />
          Próximas Competiciones
        </h2>
        {upcoming.length > 0 ? (
          <div className="space-y-4">
            {upcoming.map((comp) => {
              const days = daysUntil(comp.date!);
              return (
                <div
                  key={comp.id}
                  className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-sm text-atlantis-gray mb-2">
                        <Calendar className="h-4 w-4 text-atlantis-red" />
                        <time>
                          {new Date(comp.date! + 'T00:00:00').toLocaleDateString('es-ES', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </time>
                      </div>
                      <h3 className="text-lg font-bold text-atlantis-black group-hover:text-atlantis-red transition-colors">
                        {comp.name}
                      </h3>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-atlantis-red bg-red-50 px-4 py-2 rounded-full whitespace-nowrap border border-atlantis-red/10">
                      {days === 0 ? '¡Hoy!' : days === 1 ? 'Mañana' : `${days} días`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 border border-gray-100 text-center">
            <p className="text-atlantis-gray">No hay competiciones próximas programadas.</p>
          </div>
        )}
      </div>

      {/* No date */}
      {noDate.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-atlantis-gray mb-4">Fecha por confirmar</h2>
          <div className="space-y-3">
            {noDate.map((comp) => (
              <div key={comp.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-atlantis-black">{comp.name}</h3>
                <p className="text-sm text-atlantis-gray mt-1">Pendiente de confirmar fecha</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Past */}
      {past.length > 0 && (
        <div>
          <h2 className="text-2xl font-black text-atlantis-black tracking-tight mb-6 flex items-center gap-3">
            <Calendar className="h-6 w-6 text-atlantis-gray" />
            Competiciones Pasadas
          </h2>
          <div className="space-y-4">
            {past.map((comp) => {
              const results = getSampleResults(comp.id);
              const medalStyle = {
                gold:   { icon: 'text-yellow-500', bg: 'bg-yellow-50 border-yellow-100',  fill: '#FBBF24', label: 'Oro'    },
                silver: { icon: 'text-gray-400',   bg: 'bg-gray-50   border-gray-100',    fill: '#D1D5DB', label: 'Plata'  },
                bronze: { icon: 'text-amber-700',  bg: 'bg-amber-50  border-amber-100',   fill: '#D97706', label: 'Bronce' },
              };

              return (
                <div
                  key={comp.id}
                  className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-bold text-atlantis-black text-lg">{comp.name}</h3>
                      <time className="text-sm text-atlantis-gray">
                        {new Date(comp.date! + 'T00:00:00').toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </time>
                    </div>
                    <span className="text-xs font-semibold text-atlantis-gray bg-gray-100 px-3 py-1 rounded-full self-start sm:self-auto">
                      Finalizada
                    </span>
                  </div>

                  {/* Palmarés */}
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100/50">
                    <div className="flex items-center gap-2 mb-3">
                      <Medal className="h-4 w-4 text-atlantis-red" />
                      <h4 className="text-sm font-bold text-atlantis-black uppercase tracking-wider">Palmarés Destacado</h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {results.map((r, idx) => {
                        const s = medalStyle[r.medal];
                        return (
                          <div key={idx} className={`flex items-center gap-3 rounded-lg px-3 py-2 border ${s.bg}`}>
                            <Medal className={`w-5 h-5 flex-shrink-0 ${s.icon}`} fill={s.fill} strokeWidth={1.5} />
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-atlantis-black truncate">{r.name}</p>
                              <p className="text-xs text-atlantis-gray">{r.category} · {r.modality}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Completely empty */}
      {competitions.length === 0 && (
        <div className="bg-white rounded-3xl p-12 border border-gray-100 text-center">
          <Trophy className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-atlantis-gray text-lg">No hay competiciones registradas todavía.</p>
        </div>
      )}
    </div>
  );
}
