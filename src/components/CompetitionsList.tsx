'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Calendar, Medal, ChevronDown, MapPin, Sparkles } from 'lucide-react';
import type { Competition } from '@/lib/types';

function daysUntil(dateStr: string): number {
  const target = new Date(dateStr + 'T00:00:00');
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

type CompetitionScope = 'autonomica' | 'nacional' | 'promocion' | 'otra';

function getScope(name: string): CompetitionScope {
  const lower = name.toLowerCase();
  if (lower.includes('españa') || lower.includes('comunidades autónomas')) return 'nacional';
  if (lower.includes('autonómic') || lower.includes('comunitat valenciana') || lower.includes(' cv ')) return 'autonomica';
  if (lower.includes('promoción') || lower.includes('promocion')) return 'promocion';
  return 'otra';
}

const SCOPE_META: Record<CompetitionScope, { label: string; bg: string; text: string }> = {
  nacional:   { label: 'Nacional',   bg: 'bg-atlantis-red/10',  text: 'text-atlantis-red'   },
  autonomica: { label: 'Autonómica', bg: 'bg-atlantis-blue/10', text: 'text-atlantis-blue'  },
  promocion:  { label: 'Promoción',  bg: 'bg-amber-100',        text: 'text-amber-700'      },
  otra:       { label: 'Evento',     bg: 'bg-gray-100',         text: 'text-atlantis-gray'  },
};

type MedalResult = {
  name: string;
  category: string;
  modality: string;
  medal: 'gold' | 'silver' | 'bronze';
};

const SAMPLE_RESULTS: MedalResult[] = [
  { name: 'Lucía Martínez',              category: 'Infantil',  modality: 'Solo',   medal: 'gold'   },
  { name: 'Sara Gómez',                  category: 'Alevín',    modality: 'Solo',   medal: 'gold'   },
  { name: 'Martínez / Pérez',            category: 'Infantil',  modality: 'Dúo',    medal: 'gold'   },
  { name: 'Equipo Infantil Atlantis',    category: 'Infantil',  modality: 'Equipo', medal: 'gold'   },
  { name: 'Valeria Ruiz',                category: 'Junior',    modality: 'Solo',   medal: 'silver' },
  { name: 'Gómez / Torres',              category: 'Alevín',    modality: 'Dúo',    medal: 'silver' },
  { name: 'Equipo Junior Atlantis',      category: 'Junior',    modality: 'Equipo', medal: 'silver' },
  { name: 'Carmen López',                category: 'Absoluto',  modality: 'Solo',   medal: 'silver' },
  { name: 'Alba Fernández',              category: 'Alevín',    modality: 'Solo',   medal: 'bronze' },
  { name: 'Ruiz / Sánchez',              category: 'Junior',    modality: 'Dúo',    medal: 'bronze' },
  { name: 'Equipo Absoluto Atlantis',    category: 'Absoluto',  modality: 'Equipo', medal: 'bronze' },
  { name: 'Equipo Máster Atlantis',      category: 'Máster',    modality: 'Equipo', medal: 'bronze' },
];

function getSampleResults(id: string): MedalResult[] {
  const charSum = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const count = (charSum % 4) + 3;
  const offset = charSum % SAMPLE_RESULTS.length;
  const results: MedalResult[] = [];
  for (let i = 0; i < count; i++) {
    results.push(SAMPLE_RESULTS[(offset + i) % SAMPLE_RESULTS.length]);
  }
  return results;
}

const MEDAL_STYLE = {
  gold:   { icon: 'text-yellow-500', bg: 'bg-yellow-50 border-yellow-100',  fill: '#FBBF24' },
  silver: { icon: 'text-gray-400',   bg: 'bg-gray-50 border-gray-100',      fill: '#D1D5DB' },
  bronze: { icon: 'text-amber-700',  bg: 'bg-amber-50 border-amber-100',    fill: '#D97706' },
} as const;

function ScopeBadge({ scope }: { scope: CompetitionScope }) {
  const m = SCOPE_META[scope];
  return (
    <span className={`inline-flex items-center text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full ${m.bg} ${m.text}`}>
      {m.label}
    </span>
  );
}

function UpcomingCard({ comp }: { comp: Competition }) {
  const days = daysUntil(comp.date!);
  const scope = getScope(comp.name);
  const isImminent = days <= 14;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col h-full"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <ScopeBadge scope={scope} />
        <span
          className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${
            isImminent
              ? 'bg-atlantis-red text-white shadow-sm shadow-atlantis-red/20'
              : 'bg-red-50 text-atlantis-red border border-atlantis-red/10'
          }`}
        >
          {days === 0 ? '¡Hoy!' : days === 1 ? 'Mañana' : `${days} días`}
        </span>
      </div>
      <div className="flex items-center gap-1.5 text-xs text-atlantis-gray mb-2">
        <Calendar className="h-3.5 w-3.5 text-atlantis-red" />
        <time className="font-medium">
          {new Date(comp.date! + 'T00:00:00').toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </time>
      </div>
      <h3 className="text-base font-bold text-atlantis-black leading-snug group-hover:text-atlantis-red transition-colors">
        {comp.name}
      </h3>
    </motion.div>
  );
}

function PastCard({ comp }: { comp: Competition }) {
  const [open, setOpen] = useState(false);
  const results = getSampleResults(comp.id);
  const scope = getScope(comp.name);
  const goldCount = results.filter((r) => r.medal === 'gold').length;
  const silverCount = results.filter((r) => r.medal === 'silver').length;
  const bronzeCount = results.filter((r) => r.medal === 'bronze').length;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col"
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="text-left p-5 hover:bg-gray-50 transition-colors flex flex-col gap-3 flex-1"
      >
        <div className="flex items-center justify-between gap-3">
          <ScopeBadge scope={scope} />
          <span className="text-[10px] font-bold tracking-wider uppercase text-atlantis-gray bg-gray-100 px-2 py-0.5 rounded-full">
            Finalizada
          </span>
        </div>
        <div>
          <h3 className="text-base font-bold text-atlantis-black leading-snug mb-1.5">{comp.name}</h3>
          <time className="text-xs text-atlantis-gray font-medium">
            {new Date(comp.date! + 'T00:00:00').toLocaleDateString('es-ES', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </time>
        </div>
        <div className="flex items-center justify-between gap-2 mt-auto pt-2">
          <div className="flex items-center gap-2.5 text-xs">
            {goldCount > 0 && (
              <span className="inline-flex items-center gap-1 font-bold text-yellow-700">
                <Medal className="w-3.5 h-3.5" fill="#FBBF24" strokeWidth={1.5} />
                {goldCount}
              </span>
            )}
            {silverCount > 0 && (
              <span className="inline-flex items-center gap-1 font-bold text-gray-600">
                <Medal className="w-3.5 h-3.5" fill="#D1D5DB" strokeWidth={1.5} />
                {silverCount}
              </span>
            )}
            {bronzeCount > 0 && (
              <span className="inline-flex items-center gap-1 font-bold text-amber-700">
                <Medal className="w-3.5 h-3.5" fill="#D97706" strokeWidth={1.5} />
                {bronzeCount}
              </span>
            )}
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-atlantis-red">
            {open ? 'Ocultar' : 'Ver palmarés'}
            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
          </span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="palmares"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden border-t border-gray-100"
          >
            <div className="p-5 bg-gray-50/60">
              <div className="grid grid-cols-1 gap-2">
                {results.map((r, idx) => {
                  const s = MEDAL_STYLE[r.medal];
                  return (
                    <div key={idx} className={`flex items-center gap-3 rounded-lg px-3 py-2 border ${s.bg}`}>
                      <Medal className={`w-5 h-5 flex-shrink-0 ${s.icon}`} fill={s.fill} strokeWidth={1.5} />
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-atlantis-black truncate">{r.name}</p>
                        <p className="text-xs text-atlantis-gray">
                          {r.category} · {r.modality}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function CompetitionsList({ competitions }: { competitions: Competition[] }) {
  const today = new Date().toISOString().split('T')[0];

  const upcoming = competitions
    .filter((c) => c.date && c.date >= today)
    .sort((a, b) => (a.date! > b.date! ? 1 : -1));

  const past = competitions
    .filter((c) => c.date && c.date < today)
    .sort((a, b) => (a.date! > b.date! ? -1 : 1));

  const noDate = competitions.filter((c) => !c.date);

  const [tab, setTab] = useState<'upcoming' | 'past'>(upcoming.length > 0 ? 'upcoming' : 'past');

  if (competitions.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 border border-gray-100 text-center">
        <Trophy className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <p className="text-atlantis-gray text-lg">No hay competiciones registradas todavía.</p>
      </div>
    );
  }

  const nextUpcoming = upcoming[0];
  const nextDays = nextUpcoming?.date ? daysUntil(nextUpcoming.date) : null;

  return (
    <div className="space-y-8">
      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-gray-100 p-1.5 flex gap-1.5 shadow-sm">
        <button
          onClick={() => setTab('upcoming')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
            tab === 'upcoming'
              ? 'bg-atlantis-red text-white shadow-sm shadow-atlantis-red/20'
              : 'text-atlantis-gray hover:text-atlantis-black hover:bg-gray-50'
          }`}
        >
          <Trophy className="h-4 w-4" />
          Próximas
          <span
            className={`text-[11px] font-black px-1.5 py-0.5 rounded-md ${
              tab === 'upcoming' ? 'bg-white/20 text-white' : 'bg-gray-100 text-atlantis-gray'
            }`}
          >
            {upcoming.length}
          </span>
        </button>
        <button
          onClick={() => setTab('past')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
            tab === 'past'
              ? 'bg-atlantis-blue text-white shadow-sm shadow-atlantis-blue/20'
              : 'text-atlantis-gray hover:text-atlantis-black hover:bg-gray-50'
          }`}
        >
          <Medal className="h-4 w-4" />
          Pasadas
          <span
            className={`text-[11px] font-black px-1.5 py-0.5 rounded-md ${
              tab === 'past' ? 'bg-white/20 text-white' : 'bg-gray-100 text-atlantis-gray'
            }`}
          >
            {past.length}
          </span>
        </button>
      </div>

      {/* Highlight de la próxima competición */}
      {tab === 'upcoming' && nextUpcoming && nextDays !== null && nextDays >= 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden bg-gradient-to-br from-atlantis-blue via-[#001a33] to-atlantis-red/40 rounded-2xl p-6 text-white"
        >
          <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-atlantis-red/20 blur-3xl" />
          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.25em] uppercase text-white/60 mb-2">
                <Sparkles className="h-3 w-3" />
                Siguiente cita
              </div>
              <h3 className="text-lg md:text-xl font-black leading-tight mb-1.5 truncate">
                {nextUpcoming.name}
              </h3>
              <p className="text-sm text-white/70 flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {new Date(nextUpcoming.date! + 'T00:00:00').toLocaleDateString('es-ES', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
            <div className="flex-shrink-0 flex items-baseline gap-2">
              <span className="text-5xl md:text-6xl font-black tracking-tighter leading-none">
                {nextDays}
              </span>
              <span className="text-sm font-bold tracking-wider uppercase text-white/60">
                {nextDays === 1 ? 'día' : 'días'}
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Grid de cards */}
      <AnimatePresence mode="wait">
        {tab === 'upcoming' && (
          <motion.div
            key="upcoming"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {upcoming.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {upcoming.map((comp) => (
                  <UpcomingCard key={comp.id} comp={comp} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-8 border border-gray-100 text-center">
                <p className="text-atlantis-gray">No hay competiciones próximas programadas.</p>
              </div>
            )}
          </motion.div>
        )}

        {tab === 'past' && (
          <motion.div
            key="past"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {past.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {past.map((comp) => (
                  <PastCard key={comp.id} comp={comp} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-8 border border-gray-100 text-center">
                <p className="text-atlantis-gray">No hay competiciones pasadas registradas.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sin fecha */}
      {noDate.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-atlantis-gray uppercase tracking-wider mb-3 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Fecha por confirmar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {noDate.map((comp) => (
              <div key={comp.id} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-atlantis-black text-sm">{comp.name}</h3>
                <p className="text-xs text-atlantis-gray mt-1">Pendiente de confirmar fecha</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
