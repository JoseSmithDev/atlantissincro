import { createClient } from '@/lib/supabase/server';
import { Camera, Calendar } from 'lucide-react';
import Link from 'next/link';
import type { Competition } from '@/lib/types';
import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Área de Padres — Galería de Fotos',
  description:
    'Galería privada de fotos de competiciones y eventos del Club Natación Artística Atlantis.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AreaPadresPage() {
  const supabase = await createClient();

  const { data: competitions } = await supabase
    .from('competitions')
    .select('*, photos(count)')
    .order('date', { ascending: false });

  const items: (Competition & { photos: { count: number }[] })[] = competitions || [];

  return (
    <>
      <PageHero
        title="Área de Padres"
        subtitle="Galería de fotos de competiciones y eventos de natación artística."
      />

      <section className="py-16 bg-atlantis-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100">
              <Camera className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-atlantis-gray">Aún no hay competiciones</h2>
              <p className="text-gray-400 mt-2">Las fotos aparecerán aquí cuando se suban.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((competition) => (
                <Link
                  key={competition.id}
                  href={`/area-padres/${competition.id}`}
                  className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1 border border-gray-100"
                >
                  <div className="h-1.5 bg-gradient-to-r from-atlantis-red to-atlantis-red-light" />
                  <div className="bg-atlantis-blue p-6">
                    <Camera className="h-10 w-10 text-white/80 mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <h2 className="text-xl font-bold text-white">{competition.name}</h2>
                  </div>
                  <div className="p-5 flex items-center justify-between text-sm text-atlantis-gray">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-atlantis-red" />
                      <span>
                        {competition.date
                          ? new Date(competition.date + 'T00:00:00').toLocaleDateString('es-ES', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })
                          : 'Sin fecha'}
                      </span>
                    </div>
                    <span className="text-atlantis-red font-bold bg-red-50 px-3 py-1 rounded-full text-xs">
                      {competition.photos[0]?.count || 0} fotos
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
