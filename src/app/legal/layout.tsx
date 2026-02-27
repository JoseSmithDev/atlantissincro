import type { ReactNode } from 'react';

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero header */}
      <div className="bg-gradient-to-br from-atlantis-blue via-[#001a33] to-[#0a1628] pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <p className="text-xs font-bold tracking-[0.4em] text-white/50 uppercase mb-4">
              Club Natación Artística Atlantis
            </p>
            <div className="w-12 h-px bg-atlantis-red/60 mx-auto" />
          </div>
        </div>
      </div>

      {/* Contenido legal */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {children}
      </div>
    </div>
  );
}
