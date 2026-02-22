import { Waves, MapPin, Mail, Phone, Instagram, Heart } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative bg-atlantis-blue text-white">
      {/* Wave top decoration - transitions from white (CTASection) to blue */}
      <div className="absolute -top-px left-0 right-0 leading-none">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none">
          <path d="M0 80L48 65C96 50 192 20 288 15C384 10 480 30 576 45C672 60 768 65 864 60C960 55 1056 35 1152 25C1248 15 1344 15 1392 15L1440 15V0H0V80Z" fill="white" />
          <path d="M0 80L48 65C96 50 192 20 288 15C384 10 480 30 576 45C672 60 768 65 864 60C960 55 1056 35 1152 25C1248 15 1344 15 1392 15L1440 15V80H0Z" fill="#003366" />
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 font-bold text-xl mb-4">
              <div className="bg-atlantis-red p-1.5 rounded-lg">
                <Waves className="h-5 w-5 text-white" />
              </div>
              <div className="leading-tight">
                <span className="font-black text-lg tracking-tight block">ATLANTIS</span>
                <span className="text-[9px] font-semibold text-atlantis-red-light tracking-widest uppercase block">Natación Artística</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Familia Atlantis — Combinando excelencia competitiva con valores sociales y disciplina desde Valencia.
            </p>
            <a
              href="https://www.instagram.com/atlantis_sincro/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-gray-300 hover:text-atlantis-red-light transition-colors duration-300 group"
            >
              <div className="bg-white/10 p-2 rounded-lg group-hover:bg-atlantis-red/30 transition-colors duration-300">
                <Instagram className="h-4 w-4" />
              </div>
              <span className="text-sm">@atlantis_sincro</span>
            </a>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Navegación</h3>
            <ul className="space-y-2.5 text-gray-300 text-sm">
              <li>
                <Link href="/" className="hover:text-atlantis-red-light transition-colors duration-300 inline-flex items-center gap-1.5">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/club" className="hover:text-atlantis-red-light transition-colors duration-300 inline-flex items-center gap-1.5">
                  El Club
                </Link>
              </li>
              <li>
                <Link href="/competiciones" className="hover:text-atlantis-red-light transition-colors duration-300 inline-flex items-center gap-1.5">
                  Competiciones
                </Link>
              </li>
              <li>
                <Link href="/reservas" className="hover:text-atlantis-red-light transition-colors duration-300 inline-flex items-center gap-1.5">
                  Prueba Gratis
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Recursos</h3>
            <ul className="space-y-2.5 text-gray-300 text-sm">
              <li>
                <Link href="/#noticias" className="hover:text-atlantis-red-light transition-colors duration-300">
                  Noticias
                </Link>
              </li>
              <li>
                <Link href="/#horarios" className="hover:text-atlantis-red-light transition-colors duration-300">
                  Horarios
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-atlantis-red-light transition-colors duration-300">
                  Área de Padres
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contacto</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-center gap-2.5">
                <div className="bg-white/10 p-1.5 rounded-lg flex-shrink-0">
                  <MapPin className="h-3.5 w-3.5 text-atlantis-red" />
                </div>
                <span>Polideportivo de Nazaret, Valencia</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="bg-white/10 p-1.5 rounded-lg flex-shrink-0">
                  <Mail className="h-3.5 w-3.5 text-atlantis-red" />
                </div>
                <a href="mailto:atlantissincro@gmail.com" className="hover:text-atlantis-red-light transition-colors duration-300">atlantissincro@gmail.com</a>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="bg-white/10 p-1.5 rounded-lg flex-shrink-0">
                  <Phone className="h-3.5 w-3.5 text-atlantis-red" />
                </div>
                <a href="tel:+34644388883" className="hover:text-atlantis-red-light transition-colors duration-300">644 388 883</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Club Natación Artística Atlantis. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            Hecho con <Heart className="h-3.5 w-3.5 text-atlantis-red fill-atlantis-red" /> en Valencia
          </p>
        </div>
      </div>
    </footer>
  );
}
