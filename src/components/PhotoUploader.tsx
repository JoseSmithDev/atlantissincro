'use client';

import { useState, useCallback } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { compressToWebP } from '@/lib/webp-compress';
import Image from 'next/image';

type Props = {
  competitionId: string;
  onUploadComplete: () => void;
};

export default function PhotoUploader({ competitionId, onUploadComplete }: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const supabase = createClient();

  const handleFiles = useCallback((newFiles: FileList | null) => {
    if (!newFiles) return;
    const imageFiles = Array.from(newFiles).filter((f) =>
      f.type.startsWith('image/')
    );
    setFiles((prev) => [...prev, ...imageFiles]);
    const newPreviews = imageFiles.map((f) => URL.createObjectURL(f));
    setPreviews((prev) => [...prev, ...newPreviews]);
  }, []);

  const removeFile = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    setUploading(true);
    setProgress(0);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setStatus(`Comprimiendo ${i + 1}/${files.length}...`);

      // Client-side WebP compression
      const { blob, width, height } = await compressToWebP(file);
      const webpName = file.name.replace(/\.[^.]+$/, '.webp');

      setStatus(`Subiendo ${i + 1}/${files.length}...`);

      // Get presigned URL from our API
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: webpName,
          contentType: 'image/webp',
          competitionId,
        }),
      });

      if (!res.ok) {
        console.error('Failed to get upload URL');
        continue;
      }

      const { presignedUrl, r2Key, publicUrl } = await res.json();

      // Upload directly to R2
      const uploadRes = await fetch(presignedUrl, {
        method: 'PUT',
        body: blob,
        headers: { 'Content-Type': 'image/webp' },
      });

      if (!uploadRes.ok) {
        console.error('R2 upload failed');
        continue;
      }

      // Save photo record in Supabase
      await supabase.from('photos').insert({
        competition_id: competitionId,
        r2_key: r2Key,
        url: publicUrl,
        storage_path: r2Key,
        width,
        height,
      });

      setProgress(Math.round(((i + 1) / files.length) * 100));
    }

    // Clean up
    previews.forEach((p) => URL.revokeObjectURL(p));
    setFiles([]);
    setPreviews([]);
    setUploading(false);
    setProgress(0);
    setStatus('');
    onUploadComplete();
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
        className={`border-2 border-dashed rounded-3xl p-8 text-center transition-all duration-300 cursor-pointer ${
          dragOver
            ? 'border-atlantis-red bg-atlantis-red/5'
            : 'border-gray-300 hover:border-atlantis-red'
        }`}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
        <p className="text-atlantis-blue font-medium">
          Arrastra tus fotos aquí o haz clic para seleccionar
        </p>
        <p className="text-atlantis-gray text-sm mt-1">
          JPG, PNG, WebP — Se convertirán automáticamente a WebP optimizado
        </p>
        <input
          id="file-input"
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {previews.length > 0 && (
        <div>
          <div className="grid grid-cols-4 md:grid-cols-6 gap-3 mb-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative aspect-square rounded-2xl overflow-hidden">
                <Image
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="100px"
                />
                <button
                  onClick={() => removeFile(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full bg-atlantis-red hover:bg-atlantis-red-dark text-white font-medium py-3 rounded-3xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {uploading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                {status} {progress}%
              </>
            ) : (
              <>
                <Upload className="h-5 w-5" />
                Subir {files.length} foto{files.length !== 1 ? 's' : ''}
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
