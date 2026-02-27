import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, Scale, Shield, Euro, Users, ChevronRight, ExternalLink, Building2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Portal de Transparencia — Club Natación Artística Atlantis',
  description:
    'Portal de transparencia del Club Natación Artística Atlantis conforme a la Ley 2/2015 de Transparencia de la Comunitat Valenciana y la Ley 19/2013 estatal.',
  alternates: { canonical: '/transparencia' },
};

/* ────────────────────────────────────────────
   Junta Directiva
──────────────────────────────────────────── */
const board = [
  { role: 'Presidenta',  name: 'Raquel Legua Moya'   },
  { role: 'Secretaria',  name: 'Teresa Barber Cubas'  },
  { role: 'Tesorera',    name: 'Irene Sánchez Legua'  },
  { role: 'Vocal',       name: 'Paula González Barber'},
];

/* ────────────────────────────────────────────
   Documentos
──────────────────────────────────────────── */
const documents = [
  {
    section: 'Documentación Fundacional',
    icon: FileText,
    color: 'bg-atlantis-blue/10 text-atlantis-blue',
    items: [
      {
        label: 'Inscripción de la Entidad',
        href: 'https://atlantissincro.com/wp-content/uploads/2023/11/certif1.pdf',
        note: 'PDF',
      },
      {
        label: 'Estatutos C.N.A. Atlantis',
        href: 'https://atlantissincro.com/wp-content/uploads/2023/11/estatutos._c.n.a._atlantis_firm.pdf',
        note: 'PDF',
      },
    ],
  },
  {
    section: 'Protocolos y Normativa Interna',
    icon: Shield,
    color: 'bg-atlantis-red/10 text-atlantis-red',
    items: [
      {
        label: 'Protocolo de prevención y actuación frente al acoso sexual y por razón de sexo',
        href: 'https://atlantissincro.com/wp-content/uploads/2025/02/protocolo-de-prevencion-y-actuacion-frente-al-acoso-sexual.pdf',
        note: 'PDF · 2025',
      },
    ],
  },
  {
    section: 'Marco Legal de Referencia',
    icon: Scale,
    color: 'bg-green-100 text-green-700',
    items: [
      { label: 'Ley 2/2015, de 2 de abril, de Transparencia — Comunitat Valenciana', note: 'Normativa autonómica' },
      { label: 'Ley 19/2013, de 9 de diciembre, de Transparencia — Estado',           note: 'Normativa estatal'   },
    ],
  },
];

/* ────────────────────────────────────────────
   Subvenciones
──────────────────────────────────────────── */
const subsidies = [
  {
    year: 2025,
    entries: [
      {
        entity: 'Ayuntamiento de Valencia',
        concept: 'Subvenciones a entidades deportivas. Temporada 2024-2025',
        href: 'https://atlantissincro.com/wp-content/uploads/2025/12/edicto-12-12-2025.pdf',
      },
    ],
  },
  {
    year: 2024,
    entries: [
      {
        entity: 'Ayuntamiento de Valencia',
        concept: 'Subvenciones a entidades deportivas. Temporada 2023-2024',
        href: 'https://atlantissincro.com/wp-content/uploads/2025/01/2024-12-05-concesion-subvencion.pdf',
      },
      {
        entity: 'Diputació Provincial de Valencia',
        concept: 'Subvención club de élite 2024',
        href: 'https://atlantissincro.com/wp-content/uploads/2025/01/2024-12-05-concesion.pdf',
      },
    ],
  },
  {
    year: 2023,
    entries: [
      {
        entity: 'Ayuntamiento de Valencia',
        concept: 'Subvenciones a entidades deportivas. Temporada 2022-2023',
        href: 'https://atlantissincro.com/wp-content/uploads/2023/12/edicto-publicado-20-12-2023.pdf',
      },
      {
        entity: 'Diputació Provincial de Valencia',
        concept: 'Subvención club de élite 2023 (BOP n.º 237, 12/12/2023)',
        href: 'https://atlantissincro.com/wp-content/uploads/2024/01/bop-no-237-fecha-12-12-2023.pdf',
      },
    ],
  },
  {
    year: 2022,
    entries: [
      {
        entity: 'Diputació Provincial de Valencia',
        concept: 'Subvención club de élite 2022 (BOP n.º 216, 10/11/2022)',
        amount: '15.547,59 €',
        href: 'https://atlantissincro.com/wp-content/uploads/2023/05/b.o.p.-no-216-10-11-2022.pdf',
      },
    ],
  },
  {
    year: 2021,
    entries: [
      {
        entity: 'Ayuntamiento de Valencia',
        concept: 'Convocatoria extraordinaria de ayudas — Servicio de Deportes',
      },
      {
        entity: 'Ayuntamiento de Valencia',
        concept: 'Plan Resistir — Ayudas Paréntesis',
      },
    ],
  },
];

/* ────────────────────────────────────────────
   Página
──────────────────────────────────────────── */
export default function TransparenciaPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <div className="bg-gradient-to-br from-atlantis-blue via-[#001a33] to-atlantis-red/10 pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(ellipse_at_50%_50%,_#D32F2F,_transparent_70%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <p className="text-xs font-bold tracking-[0.4em] text-white/50 uppercase mb-4">
            Club Natación Artística Atlantis
          </p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
            Portal de Transparencia
          </h1>
          <div className="w-16 h-1 bg-atlantis-red mx-auto rounded-full mb-6" />
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Información pública conforme a la{' '}
            <span className="text-white/80 font-semibold">Ley 2/2015 de Transparencia de la Comunitat Valenciana</span>{' '}
            y la Ley 19/2013 de ámbito estatal.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 md:h-20 overflow-hidden" style={{ transform: 'translateY(1px)' }}>
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0 40L48 35C96 30 192 20 288 25C384 30 480 50 576 55C672 60 768 50 864 40C960 30 1056 20 1152 25C1248 30 1344 50 1392 60L1440 65V80H0V40Z" fill="white" />
          </svg>
        </div>
      </div>

      {/* ── Contenido ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

        {/* ── Datos identificativos ── */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-atlantis-red w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
              <Building2 className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-2xl font-black text-atlantis-blue tracking-tight">Datos Identificativos</h2>
          </div>
          <div className="border border-gray-100 rounded-2xl overflow-hidden">
            <dl className="divide-y divide-gray-50">
              {[
                { dt: 'Denominación',  dd: 'Club Natación Artística Atlantis' },
                { dt: 'CIF',           dd: 'G98259443' },
                { dt: 'Domicilio',     dd: 'Polideportivo de Nazaret, Valencia, Comunitat Valenciana' },
                { dt: 'Correo',        dd: 'atlantissincro@gmail.com' },
                { dt: 'Teléfono',      dd: '+34 644 388 883' },
                { dt: 'Sitio web',     dd: 'atlantissincro.com' },
                { dt: 'Constitución',  dd: 'Mayo de 2010 — Burjassot (Valencia)' },
                { dt: 'Actividad',     dd: 'CNAE 9319 — Otras actividades deportivas' },
              ].map(({ dt, dd }) => (
                <div key={dt} className="px-6 py-3.5 flex flex-col sm:flex-row sm:gap-8">
                  <dt className="text-xs font-bold text-atlantis-gray uppercase tracking-wider sm:w-40 flex-shrink-0 mb-0.5 sm:mb-0 sm:pt-0.5">{dt}</dt>
                  <dd className="text-sm text-atlantis-black font-medium">{dd}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Junta Directiva ── */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-atlantis-red w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
              <Users className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-2xl font-black text-atlantis-blue tracking-tight">Órgano de Gobierno</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {board.map((m) => (
              <div key={m.name} className="flex items-center gap-4 bg-atlantis-surface rounded-2xl px-5 py-4 border border-gray-100">
                <div className="bg-atlantis-blue w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-black text-sm">{m.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-bold text-atlantis-black text-sm">{m.name}</p>
                  <p className="text-xs text-atlantis-red font-semibold">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Documentos ── */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-atlantis-red w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-2xl font-black text-atlantis-blue tracking-tight">Documentación</h2>
          </div>
          <div className="space-y-6">
            {documents.map((block) => {
              const Icon = block.icon;
              return (
                <div key={block.section} className="border border-gray-100 rounded-2xl overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 flex items-center gap-3 border-b border-gray-100">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${block.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="font-bold text-atlantis-blue text-sm tracking-wide uppercase">{block.section}</h3>
                  </div>
                  <ul className="divide-y divide-gray-50">
                    {block.items.map((item, i) => (
                      <li key={i} className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start gap-3">
                          <ChevronRight className="h-4 w-4 text-atlantis-red mt-0.5 flex-shrink-0" />
                          <span className="text-atlantis-black text-sm font-medium">{item.label}</span>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          {item.note && (
                            <span className="text-xs text-atlantis-gray bg-gray-100 px-2 py-0.5 rounded-full">{item.note}</span>
                          )}
                          {item.href && (
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-semibold text-atlantis-red hover:underline"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                              Ver
                            </a>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Subvenciones ── */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-atlantis-red w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
              <Euro className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-2xl font-black text-atlantis-blue tracking-tight">Subvenciones y Convenios</h2>
          </div>
          <div className="space-y-4">
            {subsidies.map((s) => (
              <div key={s.year} className="border border-gray-100 rounded-2xl overflow-hidden">
                <div className="bg-atlantis-blue px-6 py-3">
                  <span className="text-white font-black text-lg tracking-tight">{s.year}</span>
                </div>
                <ul className="divide-y divide-gray-50">
                  {s.entries.map((e, i) => (
                    <li key={i} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-3">
                        <ChevronRight className="h-4 w-4 text-atlantis-red mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-atlantis-black">{e.entity}</p>
                          <p className="text-sm text-atlantis-gray">{e.concept}</p>
                        </div>
                      </div>
                      <div className="ml-7 sm:ml-0 flex items-center gap-3 flex-shrink-0">
                        {e.amount && (
                          <span className="text-sm font-black text-atlantis-red">{e.amount}</span>
                        )}
                        {e.href && (
                          <a
                            href={e.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-atlantis-red hover:underline"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                            PDF
                          </a>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-atlantis-gray">
            Consulta el historial completo de subvenciones en el{' '}
            <a
              href="https://www.infosubvenciones.es/bdnstrans/GE/es/beneficiario?nif=G98259443"
              target="_blank"
              rel="noopener noreferrer"
              className="text-atlantis-red hover:underline font-medium"
            >
              Sistema Nacional de Publicidad de Subvenciones (BDNS) — NIF G98259443
            </a>
            .
          </p>
        </section>

        {/* ── Protección de datos ── */}
        <section className="bg-atlantis-surface rounded-3xl p-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-atlantis-red w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-xl font-black text-atlantis-blue tracking-tight">Protección de Datos</h2>
          </div>
          <p className="text-atlantis-gray text-sm leading-relaxed mb-4">
            El Club trata los datos personales de conformidad con el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD). Los interesados pueden ejercer sus derechos de acceso, rectificación, portabilidad y supresión a través de los canales habilitados al efecto.
          </p>
          <Link href="/legal/privacidad" className="inline-flex items-center gap-1.5 text-sm font-semibold text-atlantis-red hover:underline">
            <ExternalLink className="h-3.5 w-3.5" />
            Consultar la Política de Privacidad completa
          </Link>
        </section>

        {/* ── Pie ── */}
        <section className="border-t border-gray-100 pt-10 flex flex-wrap gap-4 text-sm text-atlantis-gray">
          <span>¿Necesitas más información?</span>
          <a href="mailto:atlantissincro@gmail.com" className="text-atlantis-red hover:underline font-medium">
            atlantissincro@gmail.com
          </a>
          <span className="text-gray-300">·</span>
          <Link href="/legal/aviso-legal" className="hover:text-atlantis-black transition-colors">Aviso Legal</Link>
          <span className="text-gray-300">·</span>
          <Link href="/legal/privacidad" className="hover:text-atlantis-black transition-colors">Privacidad</Link>
          <span className="text-gray-300">·</span>
          <Link href="/legal/cookies" className="hover:text-atlantis-black transition-colors">Cookies</Link>
        </section>

      </div>
    </div>
  );
}
