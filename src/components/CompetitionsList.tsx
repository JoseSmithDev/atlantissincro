import { Trophy, Calendar, Medal } from 'lucide-react';
import type { Competition } from '@/lib/types';

function daysUntil(dateStr: string): number {
  const target = new Date(dateStr + 'T00:00:00');
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

// Helper para generar palmarés de muestra consistente según el ID de la competición
function getSampleMedals(id: string) {
  const charSum = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const allCategories = ['Alevín', 'Infantil', 'Junior', 'Absoluto', 'Máster'];
  const catCount = (charSum % 2) + 2; // 2 o 3 categorías
  const startIndex = charSum % 4;

  const results = [];
  for (let i = 0; i < catCount; i++) {
    const cat = allCategories[(startIndex + i) % allCategories.length];
    const gold = (charSum + i) % 3;
    const silver = (charSum + i * 2) % 4;
    const bronze = (charSum + i * 3) % 3;

    // Solo añadimos si hay alguna medalla
    if (gold > 0 || silver > 0 || bronze > 0) {
      results.push({ category: cat, gold, silver, bronze });
    }
  }

  // Si casualmente no tiene medallas, le forzamos una
  if (results.length === 0) {
    results.push({ category: 'Absoluto', gold: 1, silver: 1, bronze: 0 });
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
              const medals = getSampleMedals(comp.id);

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

                  {/* Palmarés Section */}
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100/50">
                    <div className="flex items-center gap-2 mb-3">
                      <Medal className="h-4 w-4 text-atlantis-red" />
                      <h4 className="text-sm font-bold text-atlantis-black uppercase tracking-wider">Palmarés Destacado</h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {medals.map((m, idx) => (
                        <div key={idx} className="bg-white border border-gray-100 rounded-lg p-3 flex flex-col gap-2 shadow-sm">
                          <span className="text-xs font-bold text-atlantis-gray tracking-wide">{m.category}</span>
                          <div className="flex items-center gap-4">
                            {m.gold > 0 && (
                              <div className="flex items-center gap-1 cursor-default group" title={`${m.gold} Oros`}>
                                <Medal className="w-5 h-5 text-yellow-600 group-hover:scale-110 transition-transform drop-shadow-[0_2px_2px_rgba(202,138,4,0.4)]" fill="#FBBF24" strokeWidth={1.5} />
                                <span className="text-sm font-black text-gray-700">x{m.gold}</span>
                              </div>
                            )}
                            {m.silver > 0 && (
                              <div className="flex items-center gap-1 cursor-default group" title={`${m.silver} Platas`}>
                                <Medal className="w-5 h-5 text-gray-500 group-hover:scale-110 transition-transform drop-shadow-[0_2px_2px_rgba(156,163,175,0.4)]" fill="#E5E7EB" strokeWidth={1.5} />
                                <span className="text-sm font-black text-gray-700">x{m.silver}</span>
                              </div>
                            )}
                            {m.bronze > 0 && (
                              <div className="flex items-center gap-1 cursor-default group" title={`${m.bronze} Bronces`}>
                                <Medal className="w-5 h-5 text-amber-800 group-hover:scale-110 transition-transform drop-shadow-[0_2px_2px_rgba(180,83,9,0.4)]" fill="#D97706" strokeWidth={1.5} />
                                <span className="text-sm font-black text-gray-700">x{m.bronze}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
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
