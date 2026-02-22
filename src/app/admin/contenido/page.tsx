'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Save, Check, FileText } from 'lucide-react';
import type { SiteContent } from '@/lib/types';

const sectionLabels: Record<string, string> = {
  hero_title: 'Título Principal (Hero)',
  hero_subtitle: 'Subtítulo Principal (Hero)',
  about_us: 'Sobre Nosotros',
  schedule_info: 'Información de Horarios',
};

export default function AdminContenidoPage() {
  const [sections, setSections] = useState<SiteContent[]>([]);
  const [editValues, setEditValues] = useState<Record<string, string>>({});
  const [savedKeys, setSavedKeys] = useState<Set<string>>(new Set());
  const supabase = createClient();

  const loadSections = useCallback(async () => {
    const { data } = await supabase
      .from('site_content')
      .select('*')
      .order('key');
    if (data) {
      setSections(data);
      const values: Record<string, string> = {};
      data.forEach((s) => { values[s.key] = s.value_es; });
      setEditValues(values);
    }
  }, [supabase]);

  useEffect(() => {
    loadSections();
  }, [loadSections]);

  const saveSection = async (sectionKey: string) => {
    const value = editValues[sectionKey];
    if (value === undefined) return;

    await supabase
      .from('site_content')
      .update({ value_es: value, updated_at: new Date().toISOString() })
      .eq('key', sectionKey);

    setSavedKeys((prev) => new Set(prev).add(sectionKey));
    setTimeout(() => {
      setSavedKeys((prev) => {
        const next = new Set(prev);
        next.delete(sectionKey);
        return next;
      });
    }, 2000);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-atlantis-blue mb-2">Contenido del Sitio</h1>
      <p className="text-gray-500 mb-6">
        Edita los textos que aparecen en la página principal sin tocar código.
      </p>

      <div className="space-y-6">
        {sections.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 shadow-sm text-center">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-400">
              No hay secciones de contenido. Ejecuta el SQL de inicialización en Supabase.
            </p>
          </div>
        ) : (
          sections.map((section) => (
            <div key={section.id} className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold text-atlantis-blue">
                  {sectionLabels[section.key] || section.key}
                </label>
                <span className="text-xs text-gray-400">
                  Última actualización:{' '}
                  {new Date(section.updated_at).toLocaleDateString('es-ES')}
                </span>
              </div>
              {section.key === 'about_us' ? (
                <textarea
                  value={editValues[section.key] || ''}
                  onChange={(e) =>
                    setEditValues((prev) => ({
                      ...prev,
                      [section.key]: e.target.value,
                    }))
                  }
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-atlantis-red focus:border-transparent outline-none resize-y mb-3"
                />
              ) : (
                <input
                  type="text"
                  value={editValues[section.key] || ''}
                  onChange={(e) =>
                    setEditValues((prev) => ({
                      ...prev,
                      [section.key]: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-atlantis-red focus:border-transparent outline-none mb-3"
                />
              )}
              <button
                onClick={() => saveSection(section.key)}
                className={`px-4 py-2 rounded-2xl text-sm font-medium transition-colors flex items-center gap-2 ${
                  savedKeys.has(section.key)
                    ? 'bg-green-500 text-white'
                    : 'bg-atlantis-red hover:bg-atlantis-red-dark text-white'
                }`}
              >
                {savedKeys.has(section.key) ? (
                  <>
                    <Check className="h-4 w-4" />
                    Guardado
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Guardar
                  </>
                )}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
