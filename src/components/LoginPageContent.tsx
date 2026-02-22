'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Waves, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

export default function LoginPageContent() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) {
        setError(error.message);
      } else {
        setMessage('Revisa tu correo electrónico para confirmar tu cuenta.');
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message === 'Invalid login credentials'
          ? 'Credenciales incorrectas. Verifica tu email y contraseña.'
          : error.message
        );
      } else {
        router.push('/area-padres');
        router.refresh();
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-20 overflow-hidden bg-gradient-to-br from-atlantis-blue via-[#001a33] to-atlantis-blue">
      {/* Subtle red radial glow */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(ellipse_at_50%_50%,_#D32F2F,_transparent_70%)]" />

      {/* Water pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="login-waves" x="0" y="0" width="200" height="40" patternUnits="userSpaceOnUse">
            <path d="M0 20C50 5 100 35 150 20C200 5 200 20 200 20" stroke="white" strokeWidth="1" fill="none" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#login-waves)" />
        </svg>
      </div>

      {/* Bubble animations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/[0.04] animate-[bubbleRise_linear_infinite]"
            style={{
              width: `${8 + (i * 7) % 16}px`,
              height: `${8 + (i * 7) % 16}px`,
              left: `${8 + (i * 16) % 84}%`,
              bottom: '-20px',
              animationDelay: `${(i * 2) % 10}s`,
              animationDuration: `${7 + (i * 1.3) % 6}s`,
            }}
          />
        ))}
      </div>

      {/* Login card */}
      <div className="relative z-10 bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-atlantis-red w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-atlantis-red/25">
              <Waves className="h-7 w-7 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-black text-atlantis-blue tracking-tight">
            {isSignUp ? 'Crear Cuenta' : 'Iniciar Sesión'}
          </h1>
          <p className="text-atlantis-gray mt-2 text-sm">
            {isSignUp ? 'Regístrate para acceder al área de padres' : 'Accede a tu cuenta de CNA Atlantis'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-sm font-semibold text-atlantis-blue mb-1">
                Nombre completo
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-atlantis-gray" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-atlantis-red focus:border-transparent outline-none transition-all duration-300"
                  placeholder="Tu nombre"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-atlantis-blue mb-1">
              Correo electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-atlantis-gray" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-atlantis-red focus:border-transparent outline-none transition-all duration-300"
                placeholder="tu@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-atlantis-blue mb-1">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-atlantis-gray" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-atlantis-red focus:border-transparent outline-none transition-all duration-300"
                placeholder="••••••••"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-atlantis-gray hover:text-atlantis-blue transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-2xl border border-red-100">
              {error}
            </div>
          )}

          {message && (
            <div className="bg-green-50 text-green-600 text-sm p-3 rounded-2xl border border-green-100">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-atlantis-red hover:bg-atlantis-red-dark text-white font-bold py-3.5 rounded-3xl transition-all duration-300 disabled:opacity-50 shadow-lg shadow-atlantis-red/25 hover:shadow-xl hover:shadow-atlantis-red/30 hover:-translate-y-0.5"
          >
            {loading
              ? 'Cargando...'
              : isSignUp
                ? 'Crear Cuenta'
                : 'Iniciar Sesión'
            }
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
              setMessage('');
            }}
            className="text-atlantis-red hover:text-atlantis-red-dark text-sm font-medium transition-colors duration-300"
          >
            {isSignUp
              ? '¿Ya tienes cuenta? Inicia sesión'
              : '¿No tienes cuenta? Regístrate'
            }
          </button>
        </div>
      </div>
    </div>
  );
}
