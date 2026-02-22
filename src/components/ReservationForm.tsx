'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { CalendarCheck, Clock, Users, CheckCircle, Loader2 } from 'lucide-react';
import type { TrialDay } from '@/lib/types';

export default function ReservationForm() {
  const [trialDays, setTrialDays] = useState<(TrialDay & { booked: number })[]>([]);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const supabase = createClient();

  useEffect(() => {
    const loadTrialDays = async () => {
      const today = new Date().toISOString().split('T')[0];

      // Fetch active trial days
      const { data: days } = await supabase
        .from('trial_days')
        .select('*')
        .eq('active', true)
        .gte('date', today)
        .order('date', { ascending: true });

      if (!days || days.length === 0) {
        setTrialDays([]);
        setLoading(false);
        return;
      }

      // Fetch reservation counts per day
      const { data: reservations } = await supabase
        .from('reservations')
        .select('trial_day_id')
        .in('trial_day_id', days.map((d) => d.id))
        .neq('status', 'cancelada');

      const counts = new Map<string, number>();
      reservations?.forEach((r) => {
        if (r.trial_day_id) {
          counts.set(r.trial_day_id, (counts.get(r.trial_day_id) || 0) + 1);
        }
      });

      const enriched = days.map((d) => ({
        ...d,
        booked: counts.get(d.id) || 0,
      })).filter((d) => d.booked < d.max_slots);

      setTrialDays(enriched);
      setLoading(false);
    };

    loadTrialDays();
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!selectedDay) {
      setError('Por favor selecciona un día de prueba.');
      return;
    }

    setSubmitting(true);

    const { error: insertError } = await supabase.from('reservations').insert({
      trial_day_id: selectedDay,
      parent_name: parentName.trim(),
      parent_email: parentEmail.trim(),
      parent_phone: parentPhone.trim(),
      child_name: childName.trim(),
      child_age: Number(childAge),
      notes: notes.trim() || null,
    });

    if (insertError) {
      setError('Ha ocurrido un error. Por favor inténtalo de nuevo.');
      setSubmitting(false);
      return;
    }

    setSuccess(true);
    setSubmitting(false);
  };

  if (success) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100 max-w-xl mx-auto">
        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-black text-atlantis-blue mb-3">¡Reserva recibida!</h2>
        <p className="text-atlantis-gray mb-2">
          Hemos recibido tu solicitud de prueba para <span className="font-bold text-atlantis-blue">{childName}</span>.
        </p>
        <p className="text-atlantis-gray text-sm">
          Nos pondremos en contacto contigo para confirmar la reserva. ¡Gracias!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Available days */}
      <div className="mb-8">
        <h2 className="text-xl font-black text-atlantis-blue mb-4">
          1. Elige un día de prueba
        </h2>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 text-atlantis-red animate-spin" />
          </div>
        ) : trialDays.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center shadow-sm border border-gray-100">
            <CalendarCheck className="h-10 w-10 text-gray-300 mx-auto mb-3" />
            <p className="text-atlantis-gray font-medium">No hay días de prueba disponibles ahora mismo.</p>
            <p className="text-atlantis-gray text-sm mt-1">
              Contáctanos en <a href="mailto:atlantissincro@gmail.com" className="text-atlantis-red hover:underline">atlantissincro@gmail.com</a> para más información.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {trialDays.map((day) => {
              const isSelected = selectedDay === day.id;
              const spotsLeft = day.max_slots - day.booked;
              return (
                <button
                  key={day.id}
                  type="button"
                  onClick={() => setSelectedDay(day.id)}
                  className={`text-left rounded-2xl p-5 transition-all duration-300 border-2 ${
                    isSelected
                      ? 'border-atlantis-red bg-red-50 shadow-md'
                      : 'border-gray-100 bg-white hover:border-atlantis-red/30 hover:shadow-sm'
                  }`}
                >
                  <p className="font-bold text-atlantis-blue text-lg">
                    {new Date(day.date + 'T00:00:00').toLocaleDateString('es-ES', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                    })}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-atlantis-gray">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-atlantis-red" />
                      {day.time_slot}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5 text-atlantis-red" />
                      {spotsLeft} {spotsLeft === 1 ? 'plaza' : 'plazas'}
                    </span>
                  </div>
                  {day.notes && (
                    <p className="text-xs text-gray-400 mt-1.5">{day.notes}</p>
                  )}
                  {isSelected && (
                    <div className="flex items-center gap-1.5 mt-2 text-atlantis-red text-sm font-semibold">
                      <CheckCircle className="h-4 w-4" />
                      Seleccionado
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Form */}
      {trialDays.length > 0 && (
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-black text-atlantis-blue mb-4">
            2. Datos de contacto
          </h2>
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-atlantis-blue mb-1">
                  Nombre del padre/madre
                </label>
                <input
                  type="text"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-atlantis-red focus:border-transparent outline-none transition-all"
                  placeholder="Tu nombre"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-atlantis-blue mb-1">
                  Nombre de la niña
                </label>
                <input
                  type="text"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-atlantis-red focus:border-transparent outline-none transition-all"
                  placeholder="Nombre de la niña"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-atlantis-blue mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={parentEmail}
                  onChange={(e) => setParentEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-atlantis-red focus:border-transparent outline-none transition-all"
                  placeholder="tu@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-atlantis-blue mb-1">
                  Teléfono
                </label>
                <input
                  type="tel"
                  value={parentPhone}
                  onChange={(e) => setParentPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-atlantis-red focus:border-transparent outline-none transition-all"
                  placeholder="644 388 883"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-atlantis-blue mb-1">
                  Edad de la niña
                </label>
                <input
                  type="number"
                  value={childAge}
                  onChange={(e) => setChildAge(e.target.value)}
                  min={4}
                  max={18}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-atlantis-red focus:border-transparent outline-none transition-all"
                  placeholder="8"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-atlantis-blue mb-1">
                Comentarios (opcional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-atlantis-red focus:border-transparent outline-none transition-all resize-y"
                placeholder="¿Tiene experiencia previa? ¿Alguna consideración especial?"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-2xl border border-red-100">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting || !selectedDay}
              className="w-full bg-atlantis-red hover:bg-atlantis-red-dark text-white font-bold py-4 rounded-3xl transition-all duration-300 disabled:opacity-50 shadow-lg shadow-atlantis-red/25 hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <CalendarCheck className="h-5 w-5" />
                  Reservar Prueba Gratuita
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
