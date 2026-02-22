'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Competition } from '@/lib/types';

const DAY_NAMES = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getStartDayOfWeek(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return (day + 6) % 7; // Monday = 0
}

function formatDateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export default function CompetitionsCalendar({ competitions }: { competitions: Competition[] }) {
  const now = new Date();
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());

  const competitionDateSet = new Set(
    competitions.filter((c) => c.date).map((c) => c.date!)
  );

  const competitionsByDate = new Map<string, Competition[]>();
  competitions.forEach((c) => {
    if (c.date) {
      const existing = competitionsByDate.get(c.date) || [];
      existing.push(c);
      competitionsByDate.set(c.date, existing);
    }
  });

  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const startDay = getStartDayOfWeek(currentYear, currentMonth);
  const todayStr = formatDateKey(now.getFullYear(), now.getMonth(), now.getDate());

  const cells: (number | null)[] = [
    ...Array(startDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-atlantis-blue text-white px-6 py-4 flex items-center justify-between">
        <button
          onClick={goToPrevMonth}
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h3 className="font-bold text-lg tracking-tight">
          {MONTH_NAMES[currentMonth]} {currentYear}
        </h3>
        <button
          onClick={goToNextMonth}
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 px-4 pt-4 pb-2">
        {DAY_NAMES.map((d) => (
          <div key={d} className="text-center text-xs font-bold text-atlantis-gray uppercase tracking-wider">
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-1 px-4 pb-4">
        {cells.map((day, idx) => {
          if (day === null) {
            return <div key={`empty-${idx}`} className="aspect-square" />;
          }

          const dateStr = formatDateKey(currentYear, currentMonth, day);
          const isToday = dateStr === todayStr;
          const hasCompetition = competitionDateSet.has(dateStr);
          const comps = competitionsByDate.get(dateStr);

          return (
            <div
              key={dateStr}
              title={comps?.map((c) => c.name).join(', ')}
              className={`
                aspect-square flex items-center justify-center text-sm rounded-xl transition-all duration-200 cursor-default
                ${isToday && !hasCompetition ? 'ring-2 ring-atlantis-blue font-bold text-atlantis-black' : ''}
                ${hasCompetition
                  ? 'bg-atlantis-red text-white font-bold shadow-sm shadow-atlantis-red/30 hover:bg-atlantis-red-dark cursor-pointer'
                  : 'text-atlantis-black hover:bg-gray-50'
                }
              `}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="px-4 pb-4 flex items-center gap-4 text-xs text-atlantis-gray">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-atlantis-red" />
          <span>Competición</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded ring-2 ring-atlantis-blue" />
          <span>Hoy</span>
        </div>
      </div>
    </div>
  );
}
