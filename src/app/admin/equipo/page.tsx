'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { compressToWebP } from '@/lib/webp-compress';
import { Plus, Trash2, Edit3, Save, X, ImagePlus, Loader2, ArrowUp, ArrowDown } from 'lucide-react';
import Image from 'next/image';

interface TeamMemberData {
  id: string;
  name: string;
  role: string;
  description: string;
  image_url: string | null;
}

export default function AdminEquipoPage() {
  const [members, setMembers] = useState<TeamMemberData[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const loadMembers = useCallback(async () => {
    const { data } = await supabase
      .from('site_content')
      .select('value_es')
      .eq('key', 'team_members')
      .single();

    if (data?.value_es) {
      try {
        setMembers(JSON.parse(data.value_es));
      } catch {
        setMembers([]);
      }
    }
  }, [supabase]);

  useEffect(() => {
    loadMembers();
  }, [loadMembers]);

  const persistMembers = async (updated: TeamMemberData[]) => {
    setSaving(true);
    const json = JSON.stringify(updated);

    // Upsert: try update first, insert if not exists
    const { data: existing } = await supabase
      .from('site_content')
      .select('id')
      .eq('key', 'team_members')
      .single();

    if (existing) {
      await supabase
        .from('site_content')
        .update({ value_es: json, updated_at: new Date().toISOString() })
        .eq('key', 'team_members');
    } else {
      await supabase
        .from('site_content')
        .insert({ key: 'team_members', value_es: json, type: 'text' });
    }

    setMembers(updated);
    setSaving(false);
  };

  const resetForm = () => {
    setName('');
    setRole('');
    setDescription('');
    setImageUrl(null);
    setImagePreview(null);
    setShowForm(false);
    setEditingIndex(null);
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    setUploading(true);

    try {
      const { blob } = await compressToWebP(file, 800, 0.85);

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: file.name.replace(/\.[^.]+$/, '.webp'),
          contentType: 'image/webp',
          folder: 'team',
        }),
      });

      if (!res.ok) throw new Error('Error al obtener URL de subida');
      const { presignedUrl, publicUrl } = await res.json();

      await fetch(presignedUrl, {
        method: 'PUT',
        body: blob,
        headers: { 'Content-Type': 'image/webp' },
      });

      setImageUrl(publicUrl);
    } catch (err) {
      console.error('Error uploading image:', err);
      setImagePreview(null);
      alert('Error al subir la imagen. Inténtalo de nuevo.');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setImageUrl(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const saveMember = async () => {
    if (!name.trim() || !role.trim()) return;

    const member: TeamMemberData = {
      id: editingIndex !== null ? members[editingIndex].id : crypto.randomUUID(),
      name: name.trim(),
      role: role.trim(),
      description: description.trim(),
      image_url: imageUrl || null,
    };

    let updated: TeamMemberData[];
    if (editingIndex !== null) {
      updated = [...members];
      updated[editingIndex] = member;
    } else {
      updated = [...members, member];
    }

    await persistMembers(updated);
    resetForm();
  };

  const deleteMember = async (index: number) => {
    if (!confirm('¿Eliminar este miembro del equipo?')) return;
    const updated = members.filter((_, i) => i !== index);
    await persistMembers(updated);
  };

  const moveMember = async (index: number, direction: -1 | 1) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= members.length) return;
    const updated = [...members];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    await persistMembers(updated);
  };

  const startEditing = (index: number) => {
    const member = members[index];
    setEditingIndex(index);
    setName(member.name);
    setRole(member.role);
    setDescription(member.description);
    setImageUrl(member.image_url);
    setImagePreview(member.image_url);
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-atlantis-blue">Equipo Técnico</h1>
          <p className="text-sm text-gray-500 mt-1">Se muestra en la página &quot;El Club&quot;</p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-atlantis-red hover:bg-atlantis-red-dark text-white px-4 py-2 rounded-2xl transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <Plus className="h-4 w-4" />
            Nuevo Miembro
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
          <h2 className="text-lg font-semibold text-atlantis-blue mb-4">
            {editingIndex !== null ? 'Editar Miembro' : 'Nuevo Miembro'}
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-atlantis-red focus:border-transparent outline-none"
                  placeholder="Nombre completo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cargo *</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-atlantis-red focus:border-transparent outline-none"
                  placeholder="Ej: Entrenadora Principal"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-atlantis-red focus:border-transparent outline-none resize-y"
                placeholder="Breve descripción (formación, experiencia...)"
              />
            </div>

            {/* Image upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Foto</label>
              {imagePreview ? (
                <div className="relative w-40 h-40 rounded-2xl overflow-hidden border border-gray-200">
                  <Image
                    src={imagePreview}
                    alt="Vista previa"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  {uploading && (
                    <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                      <Loader2 className="h-5 w-5 animate-spin text-atlantis-blue" />
                    </div>
                  )}
                  {!uploading && (
                    <button
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full shadow-lg transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-40 h-40 border-2 border-dashed border-gray-300 hover:border-atlantis-red rounded-2xl flex flex-col items-center justify-center transition-colors group"
                >
                  <ImagePlus className="h-8 w-8 text-gray-400 group-hover:text-atlantis-red mb-1 transition-colors" />
                  <span className="text-xs text-gray-500 group-hover:text-atlantis-red transition-colors">Añadir foto</span>
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={saveMember}
                disabled={uploading || !name.trim() || !role.trim()}
                className="bg-atlantis-red hover:bg-atlantis-red-dark text-white px-4 py-2 rounded-2xl transition-colors flex items-center gap-2 text-sm disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                {editingIndex !== null ? 'Actualizar' : 'Guardar'}
              </button>
              <button
                onClick={resetForm}
                className="border border-gray-300 text-gray-600 px-4 py-2 rounded-2xl hover:bg-gray-50 transition-colors text-sm"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Members list */}
      {saving && (
        <div className="text-center py-2 mb-4">
          <span className="text-sm text-atlantis-gray flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Guardando...
          </span>
        </div>
      )}

      <div className="space-y-4">
        {members.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 shadow-sm text-center">
            <p className="text-gray-400 mb-2">No hay miembros del equipo técnico.</p>
            <p className="text-gray-400 text-sm">Añade miembros para que aparezcan en la página del club.</p>
          </div>
        ) : (
          members.map((member, index) => (
            <div key={member.id} className="bg-white rounded-3xl overflow-hidden shadow-sm">
              <div className="p-5 flex items-center gap-5">
                {/* Photo */}
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-atlantis-blue/10 to-atlantis-red/5">
                  {member.image_url ? (
                    <Image
                      src={member.image_url}
                      alt={member.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-2xl font-black text-atlantis-blue/30">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-atlantis-blue">{member.name}</h3>
                  <p className="text-sm text-atlantis-red font-medium">{member.role}</p>
                  {member.description && (
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{member.description}</p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => moveMember(index, -1)}
                    disabled={index === 0}
                    className="text-gray-400 hover:text-atlantis-blue p-2 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-30"
                    title="Subir"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => moveMember(index, 1)}
                    disabled={index === members.length - 1}
                    className="text-gray-400 hover:text-atlantis-blue p-2 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-30"
                    title="Bajar"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => startEditing(index)}
                    className="text-gray-400 hover:text-atlantis-red p-2 rounded-xl hover:bg-gray-50 transition-colors"
                    title="Editar"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteMember(index)}
                    className="text-gray-400 hover:text-red-500 p-2 rounded-xl hover:bg-gray-50 transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
