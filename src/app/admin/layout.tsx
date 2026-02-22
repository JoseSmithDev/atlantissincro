import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { LayoutDashboard, ImageIcon, Newspaper, FileText, CalendarCheck, UsersRound } from 'lucide-react';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-atlantis-surface flex">
      {/* Sidebar */}
      <aside className="w-64 bg-atlantis-blue text-white min-h-screen hidden md:block">
        <div className="p-6">
          <h2 className="text-lg font-bold">Panel de Admin</h2>
          <p className="text-gray-400 text-sm mt-1">Gestión del sitio</p>
        </div>
        <nav className="px-4 space-y-1">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-atlantis-blue-light transition-all duration-300 text-sm"
          >
            <LayoutDashboard className="h-5 w-5 text-atlantis-red" />
            Panel Principal
          </Link>
          <Link
            href="/admin/fotos"
            className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-atlantis-blue-light transition-all duration-300 text-sm"
          >
            <ImageIcon className="h-5 w-5 text-atlantis-red" />
            Fotos y Competiciones
          </Link>
          <Link
            href="/admin/noticias"
            className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-atlantis-blue-light transition-all duration-300 text-sm"
          >
            <Newspaper className="h-5 w-5 text-atlantis-red" />
            Noticias
          </Link>
          <Link
            href="/admin/reservas"
            className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-atlantis-blue-light transition-all duration-300 text-sm"
          >
            <CalendarCheck className="h-5 w-5 text-atlantis-red" />
            Reservas
          </Link>
          <Link
            href="/admin/equipo"
            className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-atlantis-blue-light transition-all duration-300 text-sm"
          >
            <UsersRound className="h-5 w-5 text-atlantis-red" />
            Equipo Técnico
          </Link>
          <Link
            href="/admin/contenido"
            className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-atlantis-blue-light transition-all duration-300 text-sm"
          >
            <FileText className="h-5 w-5 text-atlantis-red" />
            Contenido del Sitio
          </Link>
        </nav>
      </aside>

      {/* Mobile nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-atlantis-blue text-white z-40 border-t border-white/10">
        <div className="flex justify-around py-2">
          <Link href="/admin" className="flex flex-col items-center gap-1 px-3 py-2 text-xs">
            <LayoutDashboard className="h-5 w-5 text-atlantis-red" />
            Panel
          </Link>
          <Link href="/admin/fotos" className="flex flex-col items-center gap-1 px-3 py-2 text-xs">
            <ImageIcon className="h-5 w-5 text-atlantis-red" />
            Fotos
          </Link>
          <Link href="/admin/noticias" className="flex flex-col items-center gap-1 px-3 py-2 text-xs">
            <Newspaper className="h-5 w-5 text-atlantis-red" />
            Noticias
          </Link>
          <Link href="/admin/reservas" className="flex flex-col items-center gap-1 px-3 py-2 text-xs">
            <CalendarCheck className="h-5 w-5 text-atlantis-red" />
            Reservas
          </Link>
          <Link href="/admin/equipo" className="flex flex-col items-center gap-1 px-3 py-2 text-xs">
            <UsersRound className="h-5 w-5 text-atlantis-red" />
            Equipo
          </Link>
          <Link href="/admin/contenido" className="flex flex-col items-center gap-1 px-3 py-2 text-xs">
            <FileText className="h-5 w-5 text-atlantis-red" />
            Contenido
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 md:p-8 pb-20 md:pb-8">
        {children}
      </div>
    </div>
  );
}
