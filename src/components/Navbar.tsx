'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Waves } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import type { Profile } from '@/lib/types';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        if (data) setProfile(data);
      }
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          setUser(session.user);
          const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          if (data) setProfile(data);
        } else {
          setUser(null);
          setProfile(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleLogout = () => {
    // POST to server-side route that clears cookies and redirects
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/api/auth/logout';
    document.body.appendChild(form);
    form.submit();
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm text-atlantis-black sticky top-0 z-50 border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-atlantis-red text-white p-2 rounded-lg group-hover:bg-atlantis-red-dark transition-colors duration-300">
              <Waves className="h-6 w-6" />
            </div>
            <div className="flex flex-col leading-tight group-hover:text-atlantis-red transition-colors duration-300">
              <span className="font-black text-lg tracking-tight">ATLANTIS</span>
              <span className="text-[10px] font-semibold text-atlantis-red tracking-widest uppercase">Natación Artística</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="font-medium hover:text-atlantis-red transition-colors duration-300 relative group">
              INICIO
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-atlantis-red transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/club" className="font-medium hover:text-atlantis-red transition-colors duration-300 relative group">
              El Club
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-atlantis-red transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/#noticias" className="font-medium hover:text-atlantis-red transition-colors duration-300 relative group">
              Noticias
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-atlantis-red transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/competiciones" className="font-medium hover:text-atlantis-red transition-colors duration-300 relative group">
              Competiciones
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-atlantis-red transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/reservas" className="font-medium hover:text-atlantis-red transition-colors duration-300 relative group">
              Día de Prueba
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-atlantis-red transition-all duration-300 group-hover:w-full"></span>
            </Link>
            {user && (
              <Link href="/area-padres" className="font-medium hover:text-atlantis-red transition-colors duration-300 relative group">
                Área de Padres
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-atlantis-red transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )}
            {profile?.role === 'admin' && (
              <Link href="/admin" className="font-medium text-atlantis-red hover:text-atlantis-red-dark transition-colors duration-300">
                Admin
              </Link>
            )}
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-gray-100 hover:bg-gray-200 text-atlantis-black px-6 py-2.5 rounded-full font-medium transition-all duration-300"
              >
                Cerrar Sesión
              </button>
            ) : (
              <Link
                href="/login"
                className="bg-atlantis-red hover:bg-atlantis-red-dark text-white px-6 py-2.5 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-atlantis-black hover:text-atlantis-red transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 space-y-3 shadow-inner">
            <Link href="/" onClick={() => setIsOpen(false)} className="block py-2 text-lg font-medium hover:text-atlantis-red transition-colors duration-300 px-2 rounded-lg hover:bg-gray-50">
              INICIO
            </Link>
            <Link href="/club" onClick={() => setIsOpen(false)} className="block py-2 text-lg font-medium hover:text-atlantis-red transition-colors duration-300 px-2 rounded-lg hover:bg-gray-50">
              El Club
            </Link>
            <Link href="/#noticias" onClick={() => setIsOpen(false)} className="block py-2 text-lg font-medium hover:text-atlantis-red transition-colors duration-300 px-2 rounded-lg hover:bg-gray-50">
              Noticias
            </Link>
            <Link href="/competiciones" onClick={() => setIsOpen(false)} className="block py-2 text-lg font-medium hover:text-atlantis-red transition-colors duration-300 px-2 rounded-lg hover:bg-gray-50">
              Competiciones
            </Link>
            <Link href="/reservas" onClick={() => setIsOpen(false)} className="block py-2 text-lg font-medium hover:text-atlantis-red transition-colors duration-300 px-2 rounded-lg hover:bg-gray-50">
              Día de Prueba
            </Link>
            {user && (
              <Link href="/area-padres" onClick={() => setIsOpen(false)} className="block py-2 text-lg font-medium hover:text-atlantis-red transition-colors duration-300 px-2 rounded-lg hover:bg-gray-50">
                Área de Padres
              </Link>
            )}
            {profile?.role === 'admin' && (
              <Link href="/admin" onClick={() => setIsOpen(false)} className="block py-2 text-lg font-medium text-atlantis-red hover:text-atlantis-red-dark transition-colors duration-300 px-2 rounded-lg hover:bg-gray-50">
                Admin
              </Link>
            )}
            <div className="pt-4 border-t border-gray-100 mt-2">
              {user ? (
                <button
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="w-full bg-gray-100 text-atlantis-black py-3 rounded-xl font-medium"
                >
                  Cerrar Sesión
                </button>
              ) : (
                <Link href="/login" onClick={() => setIsOpen(false)} className="block w-full bg-atlantis-red text-white text-center py-3 rounded-xl font-medium shadow-md">
                  Iniciar Sesión
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
