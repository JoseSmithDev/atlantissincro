import { Trophy, Calendar, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import type { Competition } from '@/lib/types';
import Link from 'next/link';

export default async function CompetitionsSection() {
  const supabase = await createClient();
  const today = new Date().toISOString().split('T')[0];
  const { data } = await supabase
    .from('competitions')
    .select('*')
    .gte('date', today)
    .order('date', { ascending: true })
    .limit(3);

  const competitions: Competition[] = data || [];

  function daysUntil(dateStr: string): number {
    const target = new Date(dateStr + 'T00:00:00');
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  }

  return (
    <section className="relative py-24 bg-white overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-atlantis-red text-sm font-semibold tracking-widest uppercase mb-4">
              <Trophy className="h-4 w-4" />
              Calendario
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-atlantis-black tracking-tight mb-4">
              Próximas Competiciones
            </h2>
            <div className="w-16 h-1 bg-atlantis-red rounded-full" />
          </div>
          <p className="text-atlantis-gray text-lg mt-4 md:mt-0 max-w-md">
            Consulta nuestro calendario de eventos y competiciones de natación artística.
          </p>
        </div>

        {competitions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {competitions.map((comp) => {
              const days = comp.date ? daysUntil(comp.date) : null;
              return (
                <article
                  key={comp.id}
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
                >
                  <div className="h-1.5 bg-gradient-to-r from-atlantis-red to-atlantis-red-light" />
                  <div className="p-8">
                    <div className="flex items-center gap-2 text-atlantis-gray text-sm mb-4">
                      <div className="bg-atlantis-red/10 w-8 h-8 rounded-lg flex items-center justify-center">
                        <Calendar className="h-4 w-4 text-atlantis-red" />
                      </div>
                      {comp.date ? (
                        <time className="font-medium">
                          {new Date(comp.date + 'T00:00:00').toLocaleDateString('es-ES', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </time>
                      ) : (
                        <span>Fecha por confirmar</span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-atlantis-black mb-4 group-hover:text-atlantis-red transition-colors">
                      {comp.name}
                    </h3>
                    {days !== null && days >= 0 && (
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-atlantis-red bg-red-50 px-3 py-1 rounded-full">
                        <Trophy className="h-3.5 w-3.5" />
                        {days === 0 ? '¡Hoy!' : days === 1 ? 'Mañana' : `Faltan ${days} días`}
                      </span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 shadow-sm text-center mb-12 border border-gray-100">
            <div className="bg-gray-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-8 w-8 text-gray-300" />
            </div>
            <p className="text-atlantis-gray text-lg font-medium">No hay competiciones próximas programadas.</p>
            <p className="text-atlantis-gray text-sm mt-1">Consulta el calendario para ver competiciones pasadas.</p>
          </div>
        )}

        <div className="text-center">
          <Link
            href="/competiciones"
            className="group inline-flex items-center gap-2 bg-atlantis-blue hover:bg-[#002244] text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:-translate-y-0.5 shadow-lg"
          >
            Ver calendario completo
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
