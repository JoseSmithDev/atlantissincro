import { Newspaper, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';
import type { NewsItem } from '@/lib/types';

export default async function NewsSection() {
  const supabase = await createClient();
  const { data: news } = await supabase
    .from('news')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(3);

  const newsItems: NewsItem[] = news || [];

  const fallbackNews: NewsItem[] = [
    {
      id: '1',
      title: 'Inscripciones abiertas temporada 2025',
      content: 'Ya puedes apuntar a tus hijas en nuestro programa de natación artística. Plazas limitadas para el grupo de iniciación.',
      image_url: '/images/news/equipo.png',
      published: true,
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Resultados Campeonato Autonómico',
      content: 'Nuestras nadadoras han conseguido excelentes resultados en el último campeonato autonómico de la Comunitat Valenciana.',
      image_url: '/images/news/duo.png',
      published: true,
      created_at: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Exhibición de fin de temporada',
      content: 'Os invitamos a la exhibición de fin de temporada donde nuestras nadadoras mostrarán todo lo aprendido.',
      image_url: '/images/news/entrenamiento.png',
      published: true,
      created_at: new Date().toISOString(),
    },
  ];

  const displayNews = newsItems.length > 0 ? newsItems : fallbackNews;

  return (
    <section id="noticias" className="relative py-24 bg-white overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-atlantis-red/[0.02] rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-0 w-72 h-72 bg-atlantis-blue/[0.02] rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-atlantis-red text-sm font-semibold tracking-widest uppercase mb-4">
              <Newspaper className="h-4 w-4" />
              Novedades
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-atlantis-black tracking-tight mb-4">
              Últimas Noticias
            </h2>
            <div className="w-16 h-1 bg-atlantis-red rounded-full" />
          </div>
          <p className="text-atlantis-gray text-lg mt-4 md:mt-0 max-w-md">
            Mantente al día con las novedades del club.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayNews.map((item, i) => (
            <article
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500 border border-gray-100 group shadow-sm hover:-translate-y-1"
            >
              {item.image_url ? (
                <div className="relative w-full h-52 overflow-hidden">
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-atlantis-red text-white text-xs font-bold px-3 py-1 rounded-full">
                      {new Date(item.created_at).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="h-1.5 bg-gradient-to-r from-atlantis-red to-atlantis-red-light" />
                  <div className="bg-gradient-to-br from-gray-50 to-white p-6 flex items-center gap-3">
                    <div className="bg-atlantis-red/10 w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Newspaper className="h-5 w-5 text-atlantis-red" />
                    </div>
                    <time className="text-sm text-atlantis-gray font-medium">
                      {new Date(item.created_at).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </time>
                  </div>
                </>
              )}
              <div className="p-6">
                <h3 className="text-lg font-bold text-atlantis-black mb-3 group-hover:text-atlantis-red transition-colors duration-300 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-atlantis-gray text-sm leading-relaxed line-clamp-3">
                  {item.content}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
