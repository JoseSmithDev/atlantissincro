'use client';

import { useState, FormEvent, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Waves, Lock, Loader2 } from 'lucide-react';

function AccesoForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await fetch('/api/auth/access', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, next }),
    });

    if (res.ok) {
      router.push(next);
      router.refresh();
    } else {
      setError('Contraseña incorrecta. Inténtalo de nuevo.');
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
      <div className="flex items-center gap-2 mb-6">
        <Lock className="h-4 w-4 text-white/50" />
        <p className="text-white/70 text-sm">Acceso restringido</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
            autoFocus
            className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-atlantis-red focus:border-transparent transition-all"
          />
        </div>

        {error && (
          <p className="text-red-400 text-sm text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading || !password}
          className="w-full bg-atlantis-red hover:bg-atlantis-red-dark disabled:opacity-50 text-white font-bold py-3 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-atlantis-red/25"
        >
          {loading ? (
            <><Loader2 className="h-4 w-4 animate-spin" /> Accediendo...</>
          ) : (
            'Entrar'
          )}
        </button>
      </form>
    </div>
  );
}

export default function AccesoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-atlantis-blue via-[#001a33] to-atlantis-red/10 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-10">
          <div className="bg-atlantis-red p-3 rounded-2xl mb-4 shadow-lg shadow-atlantis-red/30">
            <Waves className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">ATLANTIS</h1>
          <p className="text-xs font-semibold text-white/50 tracking-widest uppercase mt-1">
            Natación Artística
          </p>
        </div>

        <Suspense fallback={<div className="bg-white/5 border border-white/10 rounded-3xl p-8 h-48 animate-pulse" />}>
          <AccesoForm />
        </Suspense>
      </div>
    </div>
  );
}
