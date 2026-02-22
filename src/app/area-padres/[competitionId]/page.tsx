import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { ArrowLeft, Camera, Download } from 'lucide-react';
import Link from 'next/link';
import PhotoGallery from '@/components/PhotoGallery';
import WaveTransition from '@/components/WaveTransition';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ competitionId: string }>;
}): Promise<Metadata> {
  const { competitionId } = await params;
  const supabase = await createClient();
  const { data: competition } = await supabase
    .from('competitions')
    .select('name')
    .eq('id', competitionId)
    .single();

  return {
    title: competition
      ? `${competition.name} — Fotos`
      : 'Competición — Fotos',
    robots: { index: false, follow: false },
  };
}

export default async function CompetitionPage({
  params,
}: {
  params: Promise<{ competitionId: string }>;
}) {
  const { competitionId } = await params;
  const supabase = await createClient();

  const { data: competition } = await supabase
    .from('competitions')
    .select('*')
    .eq('id', competitionId)
    .single();

  if (!competition) {
    notFound();
  }

  const { data: photos } = await supabase
    .from('photos')
    .select('*')
    .eq('competition_id', competitionId)
    .order('created_at', { ascending: false });

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-atlantis-blue via-[#001a33] to-atlantis-red/10 text-white py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(ellipse_at_50%_50%,_#D32F2F,_transparent_70%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/area-padres"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 mb-6 text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a competiciones
          </Link>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
                {competition.name}
              </h1>
              {competition.date && (
                <p className="text-gray-400 mt-2 text-lg">
                  {new Date(competition.date + 'T00:00:00').toLocaleDateString('es-ES', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              )}
            </div>
            {photos && photos.length > 0 && (
              <button className="bg-atlantis-red hover:bg-atlantis-red-dark text-white px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 font-semibold shadow-lg shadow-atlantis-red/25 hover:shadow-xl hover:-translate-y-0.5">
                <Download className="h-4 w-4" />
                Descargar Todo
              </button>
            )}
          </div>
        </div>

        <WaveTransition position="bottom" fillColor="#F8FAFC" />
      </section>

      {/* Gallery */}
      <section className="py-12 bg-atlantis-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {photos && photos.length > 0 ? (
            <PhotoGallery photos={photos} />
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100">
              <Camera className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-atlantis-gray">No hay fotos aún</h2>
              <p className="text-gray-400 mt-2">Las fotos de esta competición se subirán pronto.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
