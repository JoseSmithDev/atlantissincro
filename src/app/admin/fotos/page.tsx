'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import PhotoUploader from '@/components/PhotoUploader';
import { Plus, Trash2, Edit3, Save, X, FolderOpen, Calendar } from 'lucide-react';
import Image from 'next/image';
import type { Competition, Photo } from '@/lib/types';

export default function AdminFotosPage() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [selectedCompetition, setSelectedCompetition] = useState<string | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [showNewForm, setShowNewForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDate, setNewDate] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editDate, setEditDate] = useState('');
  const supabase = createClient();

  const loadCompetitions = useCallback(async () => {
    const { data } = await supabase
      .from('competitions')
      .select('*')
      .order('date', { ascending: false });
    setCompetitions(data || []);
  }, [supabase]);

  const loadPhotos = useCallback(async (competitionId: string) => {
    const { data } = await supabase
      .from('photos')
      .select('*')
      .eq('competition_id', competitionId)
      .order('created_at', { ascending: false });
    setPhotos(data || []);
  }, [supabase]);

  useEffect(() => {
    loadCompetitions();
  }, [loadCompetitions]);

  useEffect(() => {
    if (selectedCompetition) {
      loadPhotos(selectedCompetition);
    }
  }, [selectedCompetition, loadPhotos]);

  const createCompetition = async () => {
    if (!newName.trim()) return;
    await supabase.from('competitions').insert({
      name: newName.trim(),
      date: newDate || null,
    });
    setNewName('');
    setNewDate('');
    setShowNewForm(false);
    loadCompetitions();
  };

  const updateCompetition = async (id: string) => {
    await supabase
      .from('competitions')
      .update({ name: editName.trim(), date: editDate || null })
      .eq('id', id);
    setEditingId(null);
    loadCompetitions();
  };

  const deleteCompetition = async (id: string) => {
    if (!confirm('¿Estás seguro? Se eliminarán también todas las fotos de esta competición.')) return;
    // Delete photos from storage first
    const { data: competitionPhotos } = await supabase
      .from('photos')
      .select('storage_path')
      .eq('competition_id', id);
    if (competitionPhotos && competitionPhotos.length > 0) {
      await supabase.storage
        .from('photos')
        .remove(competitionPhotos.map((p) => p.storage_path));
    }
    await supabase.from('competitions').delete().eq('id', id);
    if (selectedCompetition === id) {
      setSelectedCompetition(null);
      setPhotos([]);
    }
    loadCompetitions();
  };

  const deletePhoto = async (photo: Photo) => {
    if (!confirm('¿Eliminar esta foto?')) return;
    await supabase.storage.from('photos').remove([photo.storage_path]);
    await supabase.from('photos').delete().eq('id', photo.id);
    if (selectedCompetition) loadPhotos(selectedCompetition);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-atlantis-blue">Fotos y Competiciones</h1>
        <button
          onClick={() => setShowNewForm(true)}
          className="bg-atlantis-red hover:bg-atlantis-red-dark text-white px-4 py-2 rounded-2xl transition-colors flex items-center gap-2 text-sm font-medium"
        >
          <Plus className="h-4 w-4" />
          Nueva Competición
        </button>
      </div>

      {/* New competition form */}
      {showNewForm && (
        <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
          <h2 className="text-lg font-semibold text-atlantis-blue mb-4">Nueva Competición</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-atlantis-red focus:border-transparent outline-none"
                placeholder="Ej: Campeonato de España 2024"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-atlantis-red focus:border-transparent outline-none"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={createCompetition}
              className="bg-atlantis-red hover:bg-atlantis-red-dark text-white px-4 py-2 rounded-2xl transition-colors flex items-center gap-2 text-sm"
            >
              <Save className="h-4 w-4" />
              Guardar
            </button>
            <button
              onClick={() => setShowNewForm(false)}
              className="border border-gray-300 text-gray-600 px-4 py-2 rounded-2xl hover:bg-gray-50 transition-colors text-sm"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Competition list */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
            <div className="bg-atlantis-blue text-white px-4 py-3 text-sm font-semibold">
              Competiciones
            </div>
            {competitions.length === 0 ? (
              <div className="p-6 text-center text-gray-400 text-sm">
                No hay competiciones. Crea una para empezar.
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {competitions.map((comp) => (
                  <div
                    key={comp.id}
                    className={`p-4 cursor-pointer transition-colors ${
                      selectedCompetition === comp.id
                        ? 'bg-atlantis-red/10 border-l-4 border-atlantis-red'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {editingId === comp.id ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                        <input
                          type="date"
                          value={editDate}
                          onChange={(e) => setEditDate(e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                        <div className="flex gap-1">
                          <button
                            onClick={() => updateCompetition(comp.id)}
                            className="text-atlantis-red hover:text-atlantis-red-dark"
                          >
                            <Save className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div onClick={() => setSelectedCompetition(comp.id)}>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <FolderOpen className="h-4 w-4 text-atlantis-red flex-shrink-0" />
                            <span className="text-sm font-medium text-atlantis-blue">
                              {comp.name}
                            </span>
                          </div>
                          <div className="flex gap-1 ml-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingId(comp.id);
                                setEditName(comp.name);
                                setEditDate(comp.date || '');
                              }}
                              className="text-gray-400 hover:text-atlantis-red"
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteCompetition(comp.id);
                              }}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                        {comp.date && (
                          <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                            <Calendar className="h-3 w-3" />
                            {new Date(comp.date).toLocaleDateString('es-ES')}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Photo management area */}
        <div className="lg:col-span-2">
          {selectedCompetition ? (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-atlantis-blue mb-4">Subir Fotos</h2>
                <PhotoUploader
                  competitionId={selectedCompetition}
                  onUploadComplete={() => loadPhotos(selectedCompetition)}
                />
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-atlantis-blue mb-4">
                  Fotos ({photos.length})
                </h2>
                {photos.length === 0 ? (
                  <p className="text-gray-400 text-sm text-center py-6">
                    No hay fotos en esta competición. Sube algunas arriba.
                  </p>
                ) : (
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                    {photos.map((photo) => (
                      <div key={photo.id} className="relative aspect-square rounded-2xl overflow-hidden group">
                        <Image
                          src={photo.url}
                          alt={photo.caption || 'Foto'}
                          fill
                          className="object-cover"
                          sizes="150px"
                        />
                        <button
                          onClick={() => deletePhoto(photo)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 shadow-sm text-center">
              <FolderOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Selecciona una competición para gestionar sus fotos</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
