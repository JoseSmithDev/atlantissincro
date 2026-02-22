'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { compressToWebP } from '@/lib/webp-compress';
import { Plus, Trash2, Edit3, Save, X, Eye, EyeOff, ImagePlus, Loader2 } from 'lucide-react';
import Image from 'next/image';
import type { NewsItem } from '@/lib/types';

export default function AdminNoticiasPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const loadNews = useCallback(async () => {
    const { data } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false });
    setNews(data || []);
  }, [supabase]);

  const seedDefaultNews = async () => {
    const defaults = [
      {
        title: 'Inscripciones abiertas temporada 2025',
        content: 'Ya puedes apuntar a tus hijas en nuestro programa de natación artística. Plazas limitadas para el grupo de iniciación.',
        published: true,
      },
      {
        title: 'Resultados Campeonato Autonómico',
        content: 'Nuestras nadadoras han conseguido excelentes resultados en el último campeonato autonómico de la Comunitat Valenciana.',
        published: true,
      },
      {
        title: 'Exhibición de fin de temporada',
        content: 'Os invitamos a la exhibición de fin de temporada donde nuestras nadadoras mostrarán todo lo aprendido.',
        published: true,
      },
    ];
    await supabase.from('news').insert(defaults);
    loadNews();
  };

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  const resetForm = () => {
    setTitle('');
    setContent('');
    setImageUrl(null);
    setImagePreview(null);
    setShowForm(false);
    setEditingId(null);
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview immediately
    setImagePreview(URL.createObjectURL(file));
    setUploading(true);

    try {
      // Compress to WebP
      const { blob } = await compressToWebP(file, 1200, 0.85);

      // Get presigned URL
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: file.name.replace(/\.[^.]+$/, '.webp'),
          contentType: 'image/webp',
          folder: 'news',
        }),
      });

      if (!res.ok) throw new Error('Error al obtener URL de subida');

      const { presignedUrl, publicUrl } = await res.json();

      // Upload to R2
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
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const saveNews = async () => {
    if (!title.trim() || !content.trim()) return;

    const payload = {
      title: title.trim(),
      content: content.trim(),
      image_url: imageUrl || null,
    };

    if (editingId) {
      await supabase.from('news').update(payload).eq('id', editingId);
    } else {
      await supabase.from('news').insert(payload);
    }

    resetForm();
    loadNews();
  };

  const deleteNews = async (id: string) => {
    if (!confirm('¿Eliminar esta noticia?')) return;
    await supabase.from('news').delete().eq('id', id);
    loadNews();
  };

  const togglePublished = async (item: NewsItem) => {
    await supabase
      .from('news')
      .update({ published: !item.published })
      .eq('id', item.id);
    loadNews();
  };

  const startEditing = (item: NewsItem) => {
    setEditingId(item.id);
    setTitle(item.title);
    setContent(item.content);
    setImageUrl(item.image_url);
    setImagePreview(item.image_url);
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-atlantis-blue">Gestión de Noticias</h1>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-atlantis-red hover:bg-atlantis-red-dark text-white px-4 py-2 rounded-2xl transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <Plus className="h-4 w-4" />
            Nueva Noticia
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
          <h2 className="text-lg font-semibold text-atlantis-blue mb-4">
            {editingId ? 'Editar Noticia' : 'Nueva Noticia'}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-atlantis-red focus:border-transparent outline-none"
                placeholder="Título de la noticia"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contenido</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-atlantis-red focus:border-transparent outline-none resize-y"
                placeholder="Escribe el contenido de la noticia..."
              />
            </div>

            {/* Image upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Imagen (opcional)
              </label>
              {imagePreview ? (
                <div className="relative rounded-2xl overflow-hidden border border-gray-200">
                  <div className="relative w-full h-48">
                    <Image
                      src={imagePreview}
                      alt="Vista previa"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  {uploading && (
                    <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                      <div className="flex items-center gap-2 text-atlantis-blue">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span className="text-sm font-medium">Subiendo imagen...</span>
                      </div>
                    </div>
                  )}
                  {!uploading && (
                    <button
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full shadow-lg transition-colors"
                      title="Eliminar imagen"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-gray-300 hover:border-atlantis-red rounded-2xl p-8 text-center transition-colors group"
                >
                  <ImagePlus className="h-8 w-8 text-gray-400 group-hover:text-atlantis-red mx-auto mb-2 transition-colors" />
                  <span className="text-sm text-gray-500 group-hover:text-atlantis-red transition-colors">
                    Haz clic para seleccionar una imagen
                  </span>
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
                onClick={saveNews}
                disabled={uploading}
                className="bg-atlantis-red hover:bg-atlantis-red-dark text-white px-4 py-2 rounded-2xl transition-colors flex items-center gap-2 text-sm disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                {editingId ? 'Actualizar' : 'Publicar'}
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

      {/* News list */}
      <div className="space-y-4">
        {news.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 shadow-sm text-center">
            <p className="text-gray-400 mb-4">No hay noticias en la base de datos. La página principal muestra noticias de ejemplo.</p>
            <button
              onClick={seedDefaultNews}
              className="bg-atlantis-blue hover:bg-atlantis-blue-light text-white px-5 py-2 rounded-2xl transition-colors text-sm font-medium"
            >
              Importar noticias de ejemplo
            </button>
          </div>
        ) : (
          news.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-sm">
              {item.image_url && (
                <div className="relative w-full h-40">
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-atlantis-blue">{item.title}</h3>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          item.published
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {item.published ? 'Publicada' : 'Borrador'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">
                      {new Date(item.created_at).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                    <p className="text-gray-600 text-sm">{item.content}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => togglePublished(item)}
                      className="text-gray-400 hover:text-atlantis-red"
                      title={item.published ? 'Ocultar' : 'Publicar'}
                    >
                      {item.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={() => startEditing(item)}
                      className="text-gray-400 hover:text-atlantis-red"
                      title="Editar"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteNews(item.id)}
                      className="text-gray-400 hover:text-red-500"
                      title="Eliminar"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
