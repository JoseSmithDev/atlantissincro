import { createClient } from '@/lib/supabase/server';
import CompetitionsCalendar from '@/components/CompetitionsCalendar';
import CompetitionsList from '@/components/CompetitionsList';
import type { Competition } from '@/lib/types';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Competiciones — Calendario de Natación Artística',
  description:
    'Calendario de competiciones de natación artística del Club Natación Artística Atlantis en Valencia. Consulta próximos eventos y resultados.',
  alternates: {
    canonical: '/competiciones',
  },
  openGraph: {
    title: 'Competiciones — CNA Atlantis',
    description:
      'Calendario de competiciones de natación artística del CNA Atlantis en Valencia.',
    url: '/competiciones',
  },
};

const FALLBACK_COMPETITIONS: Competition[] = [
  { id: 'auto-2026-01', name: '2ª Liga de Figuras y Rutinas Técnicas', date: '2026-01-25', slug: '2-liga-figuras-rutinas-tecnicas-2026', cover_url: null, created_at: '2026-01-25T00:00:00Z' },
  { id: 'prom-2026-02', name: 'VI Open Promoción de Invierno', date: '2026-02-07', slug: 'vi-open-promocion-invierno-2026', cover_url: null, created_at: '2026-02-07T00:00:00Z' },
  { id: 'nat-2026-03a', name: 'Campeonato de España Alevín-Infantil de Invierno', date: '2026-03-06', slug: 'cto-espana-alevin-infantil-invierno-2026', cover_url: null, created_at: '2026-03-06T00:00:00Z' },
  { id: 'auto-2026-03', name: 'V Cto. Autonómico de Figuras, Rutinas Técnicas y Combos', date: '2026-03-28', slug: 'v-cto-autonomico-figuras-combos-2026', cover_url: null, created_at: '2026-03-28T00:00:00Z' },
  { id: 'nat-2026-04', name: 'Campeonato de España Junior-Senior de Invierno', date: '2026-04-10', slug: 'cto-espana-junior-senior-invierno-2026', cover_url: null, created_at: '2026-04-10T00:00:00Z' },
  { id: 'auto-2026-04', name: '3ª Liga de Figuras y Rutinas Técnicas', date: '2026-04-19', slug: '3-liga-figuras-rutinas-tecnicas-2026', cover_url: null, created_at: '2026-04-19T00:00:00Z' },
  { id: 'nat-2026-05', name: 'Campeonato de España Infantil de Comunidades Autónomas', date: '2026-05-09', slug: 'cto-espana-infantil-ccaa-2026', cover_url: null, created_at: '2026-05-09T00:00:00Z' },
  { id: 'auto-2026-05', name: 'Open Senior-Máster de la Comunitat Valenciana', date: '2026-05-16', slug: 'open-senior-master-cv-2026', cover_url: null, created_at: '2026-05-16T00:00:00Z' },
  { id: 'prom-2026-06', name: 'VI Open Promoción de Verano', date: '2026-06-06', slug: 'vi-open-promocion-verano-2026', cover_url: null, created_at: '2026-06-06T00:00:00Z' },
  { id: 'auto-2026-06', name: 'V Cto. Autonómico de Figuras y Rutinas de Verano', date: '2026-06-12', slug: 'v-cto-autonomico-verano-2026', cover_url: null, created_at: '2026-06-12T00:00:00Z' },
  { id: 'nat-2026-06', name: 'Campeonato de España Infantil 1ª División y Absoluto de Verano', date: '2026-06-26', slug: 'cto-espana-infantil-1div-absoluto-verano-2026', cover_url: null, created_at: '2026-06-26T00:00:00Z' },
  { id: 'nat-2026-07a', name: 'Campeonato de España Alevín Promoción e Infantil 2ª División', date: '2026-07-03', slug: 'cto-espana-alevin-promocion-infantil-2div-2026', cover_url: null, created_at: '2026-07-03T00:00:00Z' },
  { id: 'nat-2026-07b', name: 'Campeonato de España Alevín 1ª División y Junior de Verano', date: '2026-07-09', slug: 'cto-espana-alevin-1div-junior-verano-2026', cover_url: null, created_at: '2026-07-09T00:00:00Z' },
];

export default async function CompeticionesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('competitions')
    .select('*')
    .order('date', { ascending: true });

  const competitions: Competition[] = data && data.length > 0 ? data : FALLBACK_COMPETITIONS;

  return (
    <>
      {/* Hero header */}
      <section className="relative bg-gradient-to-br from-atlantis-blue via-[#001a33] to-atlantis-red/10 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(ellipse_at_50%_50%,_#D32F2F,_transparent_70%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
            Competiciones
          </h1>
          <div className="w-16 h-1 bg-atlantis-red mx-auto rounded-full mb-6" />
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Calendario de competiciones y eventos del Club Natación Artística Atlantis.
          </p>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none">
            <path
              d="M0 40L48 35C96 30 192 20 288 25C384 30 480 50 576 55C672 60 768 50 864 40C960 30 1056 20 1152 25C1248 30 1344 50 1392 60L1440 65V80H0V40Z"
              fill="#F8FAFC"
            />
          </svg>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-atlantis-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Calendar sidebar */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <CompetitionsCalendar competitions={competitions} />
              </div>
            </div>

            {/* Competitions list */}
            <div className="lg:col-span-2">
              <CompetitionsList competitions={competitions} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
