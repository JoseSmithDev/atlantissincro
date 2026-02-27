'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Send, CheckCircle, Loader2, Mail, Phone, MapPin } from 'lucide-react';

const CATEGORIES = [
  'Escuela / Iniciación (6-12 años)',
  'Alevín e Infantil (10-15 años)',
  'Junior y Absoluto (+16 años)',
  'Máster (+20 años)',
  'No lo sé todavía',
];

export default function ContactForm() {
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('');
  const [category, setCategory] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const { error: insertError } = await supabase.from('reservations').insert({
      trial_day_id: null,
      parent_name: parentName.trim(),
      parent_email: parentEmail.trim(),
      parent_phone: parentPhone.trim(),
      child_name: childName.trim(),
      child_age: Number(childAge),
      notes: [category ? `Categoría: ${category}` : '', notes.trim()].filter(Boolean).join('\n') || null,
    });

    if (insertError) {
      setError('Ha ocurrido un error al enviar el mensaje. Puedes escribirnos directamente a atlantissincro@gmail.com.');
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
        <h2 className="text-2xl font-black text-atlantis-blue mb-3">¡Mensaje recibido!</h2>
        <p className="text-atlantis-gray mb-2">
          Gracias <span className="font-bold text-atlantis-blue">{parentName}</span>, nos pondremos en contacto contigo lo antes posible.
        </p>
        <p className="text-atlantis-gray text-sm">
          También puedes escribirnos directamente a{' '}
          <a href="mailto:atlantissincro@gmail.com" className="text-atlantis-red hover:underline">
            atlantissincro@gmail.com
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
      {/* Contact info sidebar */}
      <div className="lg:col-span-1 space-y-4">
        <h2 className="text-xl font-black text-atlantis-blue mb-6">Información de contacto</h2>

        <div className="flex items-start gap-3">
          <div className="bg-atlantis-red/10 p-2.5 rounded-xl flex-shrink-0">
            <MapPin className="h-5 w-5 text-atlantis-red" />
          </div>
          <div>
            <p className="font-semibold text-atlantis-blue text-sm">Sede principal</p>
            <p className="text-atlantis-gray text-sm">Polideportivo de Nazaret, Valencia</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="bg-atlantis-red/10 p-2.5 rounded-xl flex-shrink-0">
            <Mail className="h-5 w-5 text-atlantis-red" />
          </div>
          <div>
            <p className="font-semibold text-atlantis-blue text-sm">Email</p>
            <a href="mailto:atlantissincro@gmail.com" className="text-atlantis-gray text-sm hover:text-atlantis-red transition-colors">
              atlantissincro@gmail.com
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="bg-atlantis-red/10 p-2.5 rounded-xl flex-shrink-0">
            <Phone className="h-5 w-5 text-atlantis-red" />
          </div>
          <div>
            <p className="font-semibold text-atlantis-blue text-sm">Teléfono</p>
            <a href="tel:+34644388883" className="text-atlantis-gray text-sm hover:text-atlantis-red transition-colors">
              644 388 883
            </a>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="lg:col-span-2">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-atlantis-blue mb-1">
                Tu nombre <span className="text-atlantis-red">*</span>
              </label>
              <input
                type="text"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-atlantis-red focus:border-transparent outline-none transition-all"
                placeholder="Nombre y apellidos"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-atlantis-blue mb-1">
                Nombre de la deportista <span className="text-atlantis-red">*</span>
              </label>
              <input
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-atlantis-red focus:border-transparent outline-none transition-all"
                placeholder="Nombre"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-atlantis-blue mb-1">
                Email <span className="text-atlantis-red">*</span>
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
                Teléfono <span className="text-atlantis-red">*</span>
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
                Edad <span className="text-atlantis-red">*</span>
              </label>
              <input
                type="number"
                value={childAge}
                onChange={(e) => setChildAge(e.target.value)}
                min={4}
                max={60}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-atlantis-red focus:border-transparent outline-none transition-all"
                placeholder="8"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-atlantis-blue mb-1">
              Categoría de interés
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-atlantis-red focus:border-transparent outline-none transition-all bg-white text-atlantis-gray"
            >
              <option value="">Selecciona una categoría...</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-atlantis-blue mb-1">
              Mensaje (opcional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-atlantis-red focus:border-transparent outline-none transition-all resize-y"
              placeholder="¿Tienes alguna pregunta o comentario?"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-2xl border border-red-100">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-atlantis-red hover:bg-atlantis-red-dark text-white font-bold py-4 rounded-3xl transition-all duration-300 disabled:opacity-50 shadow-lg shadow-atlantis-red/25 hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                Enviar mensaje
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
