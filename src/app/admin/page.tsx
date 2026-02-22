import { createClient } from '@/lib/supabase/server';
import { ImageIcon, Newspaper, FolderOpen } from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [
    { count: photosCount },
    { count: newsCount },
    { count: competitionsCount },
  ] = await Promise.all([
    supabase.from('photos').select('*', { count: 'exact', head: true }),
    supabase.from('news').select('*', { count: 'exact', head: true }),
    supabase.from('competitions').select('*', { count: 'exact', head: true }),
  ]);

  const stats = [
    {
      label: 'Competiciones',
      count: competitionsCount || 0,
      icon: FolderOpen,
      href: '/admin/fotos',
      color: 'bg-atlantis-blue/10 text-atlantis-blue',
    },
    {
      label: 'Fotos',
      count: photosCount || 0,
      icon: ImageIcon,
      href: '/admin/fotos',
      color: 'bg-atlantis-red/10 text-atlantis-red',
    },
    {
      label: 'Noticias',
      count: newsCount || 0,
      icon: Newspaper,
      href: '/admin/noticias',
      color: 'bg-purple-50 text-purple-600',
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-atlantis-blue mb-6">Panel Principal</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-2xl ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-atlantis-blue">{stat.count}</p>
                <p className="text-sm text-atlantis-gray">{stat.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-atlantis-blue mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/admin/fotos"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-2xl hover:border-atlantis-red hover:bg-atlantis-red/5 transition-all duration-300"
          >
            <ImageIcon className="h-5 w-5 text-atlantis-red" />
            <span className="text-sm font-medium">Subir Fotos</span>
          </Link>
          <Link
            href="/admin/noticias"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-2xl hover:border-atlantis-red hover:bg-atlantis-red/5 transition-all duration-300"
          >
            <Newspaper className="h-5 w-5 text-atlantis-red" />
            <span className="text-sm font-medium">Crear Noticia</span>
          </Link>
          <Link
            href="/admin/contenido"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-2xl hover:border-atlantis-red hover:bg-atlantis-red/5 transition-all duration-300"
          >
            <span className="text-sm font-medium">Editar Contenido</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
