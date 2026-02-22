'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  Plus, Trash2, Save, X, CalendarPlus, Clock, Users,
  CheckCircle, XCircle, AlertCircle,
} from 'lucide-react';
import type { TrialDay, Reservation } from '@/lib/types';

const STATUS_CONFIG = {
  pendiente: { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-700', icon: AlertCircle },
  confirmada: { label: 'Confirmada', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  cancelada: { label: 'Cancelada', color: 'bg-red-100 text-red-700', icon: XCircle },
};

export default function AdminReservasPage() {
  const [trialDays, setTrialDays] = useState<TrialDay[]>([]);
  const [reservations, setReservations] = useState<(Reservation & { trial_day: TrialDay | null })[]>([]);
  const [showDayForm, setShowDayForm] = useState(false);
  const [dayDate, setDayDate] = useState('');
  const [dayTimeSlot, setDayTimeSlot] = useState('17:00 - 18:30');
  const [dayMaxSlots, setDayMaxSlots] = useState(2);
  const [dayNotes, setDayNotes] = useState('');
  const [activeTab, setActiveTab] = useState<'dias' | 'reservas'>('reservas');
  const supabase = createClient();

  const loadData = useCallback(async () => {
    const [{ data: days }, { data: bookings }] = await Promise.all([
      supabase
        .from('trial_days')
        .select('*')
        .order('date', { ascending: true }),
      supabase
        .from('reservations')
        .select('*, trial_day:trial_days(*)')
        .order('created_at', { ascending: false }),
    ]);
    setTrialDays(days || []);
    setReservations(bookings || []);
  }, [supabase]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const resetDayForm = () => {
    setDayDate('');
    setDayTimeSlot('17:00 - 18:30');
    setDayMaxSlots(2);
    setDayNotes('');
    setShowDayForm(false);
  };

  const saveTrialDay = async () => {
    if (!dayDate) return;
    await supabase.from('trial_days').insert({
      date: dayDate,
      time_slot: dayTimeSlot,
      max_slots: dayMaxSlots,
      notes: dayNotes.trim() || null,
    });
    resetDayForm();
    loadData();
  };

  const deleteTrialDay = async (id: string) => {
    if (!confirm('¿Eliminar este día de prueba? Las reservas asociadas no se borrarán.')) return;
    await supabase.from('trial_days').delete().eq('id', id);
    loadData();
  };

  const toggleDayActive = async (day: TrialDay) => {
    await supabase.from('trial_days').update({ active: !day.active }).eq('id', day.id);
    loadData();
  };

  const updateReservationStatus = async (id: string, status: 'pendiente' | 'confirmada' | 'cancelada') => {
    await supabase.from('reservations').update({ status }).eq('id', id);
    loadData();
  };

  const deleteReservation = async (id: string) => {
    if (!confirm('¿Eliminar esta reserva?')) return;
    await supabase.from('reservations').delete().eq('id', id);
    loadData();
  };

  // Count reservations per trial day
  const reservationCounts = new Map<string, number>();
  reservations.forEach((r) => {
    if (r.trial_day_id && r.status !== 'cancelada') {
      reservationCounts.set(r.trial_day_id, (reservationCounts.get(r.trial_day_id) || 0) + 1);
    }
  });

  const today = new Date().toISOString().split('T')[0];
  const upcomingDays = trialDays.filter((d) => d.date >= today);
  const pastDays = trialDays.filter((d) => d.date < today);
  const pendingCount = reservations.filter((r) => r.status === 'pendiente').length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-atlantis-blue">Gestión de Reservas</h1>
          <p className="text-atlantis-gray text-sm mt-1">
            Días de prueba y solicitudes de reserva
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('reservas')}
          className={`px-4 py-2 rounded-2xl text-sm font-medium transition-colors ${
            activeTab === 'reservas'
              ? 'bg-atlantis-red text-white'
              : 'bg-white text-atlantis-gray hover:bg-gray-50 border border-gray-200'
          }`}
        >
          <span className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Reservas
            {pendingCount > 0 && (
              <span className="bg-white text-atlantis-red text-xs font-bold px-2 py-0.5 rounded-full">
                {pendingCount}
              </span>
            )}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('dias')}
          className={`px-4 py-2 rounded-2xl text-sm font-medium transition-colors ${
            activeTab === 'dias'
              ? 'bg-atlantis-red text-white'
              : 'bg-white text-atlantis-gray hover:bg-gray-50 border border-gray-200'
          }`}
        >
          <span className="flex items-center gap-2">
            <CalendarPlus className="h-4 w-4" />
            Días Disponibles
          </span>
        </button>
      </div>

      {/* ========== RESERVAS TAB ========== */}
      {activeTab === 'reservas' && (
        <div className="space-y-4">
          {reservations.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 shadow-sm text-center">
              <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-400">No hay reservas todavía.</p>
              <p className="text-gray-400 text-sm mt-1">Cuando los padres reserven una prueba, aparecerán aquí.</p>
            </div>
          ) : (
            reservations.map((res) => {
              const cfg = STATUS_CONFIG[res.status];
              const StatusIcon = cfg.icon;
              return (
                <div key={res.id} className="bg-white rounded-3xl p-6 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-atlantis-blue">{res.child_name}</h3>
                        <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium ${cfg.color}`}>
                          <StatusIcon className="h-3 w-3" />
                          {cfg.label}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 text-sm text-atlantis-gray">
                        <p><span className="font-medium text-atlantis-black">Edad:</span> {res.child_age} años</p>
                        <p><span className="font-medium text-atlantis-black">Padre/Madre:</span> {res.parent_name}</p>
                        <p><span className="font-medium text-atlantis-black">Email:</span> {res.parent_email}</p>
                        <p><span className="font-medium text-atlantis-black">Teléfono:</span> {res.parent_phone}</p>
                        {res.trial_day && (
                          <p>
                            <span className="font-medium text-atlantis-black">Día:</span>{' '}
                            {new Date(res.trial_day.date + 'T00:00:00').toLocaleDateString('es-ES', {
                              weekday: 'long',
                              day: 'numeric',
                              month: 'long',
                            })}{' '}
                            — {res.trial_day.time_slot}
                          </p>
                        )}
                        {res.notes && (
                          <p className="sm:col-span-2">
                            <span className="font-medium text-atlantis-black">Notas:</span> {res.notes}
                          </p>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        Solicitado el{' '}
                        {new Date(res.created_at).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-1.5">
                      {res.status !== 'confirmada' && (
                        <button
                          onClick={() => updateReservationStatus(res.id, 'confirmada')}
                          className="text-green-500 hover:text-green-700 p-1.5 rounded-lg hover:bg-green-50 transition-colors"
                          title="Confirmar"
                        >
                          <CheckCircle className="h-5 w-5" />
                        </button>
                      )}
                      {res.status !== 'cancelada' && (
                        <button
                          onClick={() => updateReservationStatus(res.id, 'cancelada')}
                          className="text-red-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                          title="Cancelar"
                        >
                          <XCircle className="h-5 w-5" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteReservation(res.id)}
                        className="text-gray-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* ========== DIAS TAB ========== */}
      {activeTab === 'dias' && (
        <div>
          {/* Add day button */}
          {!showDayForm && (
            <button
              onClick={() => setShowDayForm(true)}
              className="bg-atlantis-red hover:bg-atlantis-red-dark text-white px-4 py-2 rounded-2xl transition-colors flex items-center gap-2 text-sm font-medium mb-6"
            >
              <Plus className="h-4 w-4" />
              Añadir Día de Prueba
            </button>
          )}

          {/* Day form */}
          {showDayForm && (
            <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
              <h2 className="text-lg font-semibold text-atlantis-blue mb-4">Nuevo Día de Prueba</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                  <input
                    type="date"
                    value={dayDate}
                    onChange={(e) => setDayDate(e.target.value)}
                    min={today}
                    className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-atlantis-red focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Horario</label>
                  <input
                    type="text"
                    value={dayTimeSlot}
                    onChange={(e) => setDayTimeSlot(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-atlantis-red focus:border-transparent outline-none"
                    placeholder="17:00 - 18:30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Plazas máximas</label>
                  <input
                    type="number"
                    value={dayMaxSlots}
                    onChange={(e) => setDayMaxSlots(Number(e.target.value))}
                    min={1}
                    max={10}
                    className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-atlantis-red focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notas (opcional)</label>
                  <input
                    type="text"
                    value={dayNotes}
                    onChange={(e) => setDayNotes(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-atlantis-red focus:border-transparent outline-none"
                    placeholder="Ej: Traer bañador y gorro"
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={saveTrialDay}
                  className="bg-atlantis-red hover:bg-atlantis-red-dark text-white px-4 py-2 rounded-2xl transition-colors flex items-center gap-2 text-sm"
                >
                  <Save className="h-4 w-4" />
                  Guardar
                </button>
                <button
                  onClick={resetDayForm}
                  className="border border-gray-300 text-gray-600 px-4 py-2 rounded-2xl hover:bg-gray-50 transition-colors text-sm"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {/* Upcoming days */}
          <div className="space-y-3">
            {upcomingDays.length === 0 && pastDays.length === 0 && (
              <div className="bg-white rounded-3xl p-12 shadow-sm text-center">
                <CalendarPlus className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-400">No hay días de prueba configurados.</p>
                <p className="text-gray-400 text-sm mt-1">Añade días para que los padres puedan reservar.</p>
              </div>
            )}

            {upcomingDays.length > 0 && (
              <>
                <h3 className="text-sm font-bold text-atlantis-gray uppercase tracking-wider mb-2">Próximos</h3>
                {upcomingDays.map((day) => {
                  const booked = reservationCounts.get(day.id) || 0;
                  const isFull = booked >= day.max_slots;
                  return (
                    <div key={day.id} className={`bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between ${!day.active ? 'opacity-50' : ''}`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isFull ? 'bg-red-50' : 'bg-atlantis-blue/10'}`}>
                          <CalendarPlus className={`h-6 w-6 ${isFull ? 'text-atlantis-red' : 'text-atlantis-blue'}`} />
                        </div>
                        <div>
                          <p className="font-bold text-atlantis-blue">
                            {new Date(day.date + 'T00:00:00').toLocaleDateString('es-ES', {
                              weekday: 'long',
                              day: 'numeric',
                              month: 'long',
                            })}
                          </p>
                          <div className="flex items-center gap-3 text-sm text-atlantis-gray">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {day.time_slot}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3.5 w-3.5" />
                              {booked}/{day.max_slots} plazas
                            </span>
                          </div>
                          {day.notes && <p className="text-xs text-gray-400 mt-0.5">{day.notes}</p>}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleDayActive(day)}
                          className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                            day.active
                              ? 'bg-green-100 text-green-700 hover:bg-green-200'
                              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                          }`}
                        >
                          {day.active ? 'Activo' : 'Inactivo'}
                        </button>
                        <button
                          onClick={() => deleteTrialDay(day.id)}
                          className="text-gray-400 hover:text-red-500 p-1.5 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </>
            )}

            {pastDays.length > 0 && (
              <>
                <h3 className="text-sm font-bold text-atlantis-gray uppercase tracking-wider mt-6 mb-2">Pasados</h3>
                {pastDays.map((day) => {
                  const booked = reservationCounts.get(day.id) || 0;
                  return (
                    <div key={day.id} className="bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between opacity-50">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gray-100">
                          <CalendarPlus className="h-6 w-6 text-gray-400" />
                        </div>
                        <div>
                          <p className="font-bold text-atlantis-gray">
                            {new Date(day.date + 'T00:00:00').toLocaleDateString('es-ES', {
                              weekday: 'long',
                              day: 'numeric',
                              month: 'long',
                            })}
                          </p>
                          <div className="flex items-center gap-3 text-sm text-gray-400">
                            <span>{day.time_slot}</span>
                            <span>{booked}/{day.max_slots} plazas</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteTrialDay(day.id)}
                        className="text-gray-400 hover:text-red-500 p-1.5 transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
