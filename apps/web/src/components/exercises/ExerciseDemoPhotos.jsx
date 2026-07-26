import React, { useState } from 'react';
import { Camera, X } from 'lucide-react';
import { demoPhotosOf, photoCaption } from '@/lib/exerciseMedia.js';

/**
 * Read-only gallery of an exercise's demonstration photos, numbered so each
 * photo lines up with the matching step in the written instructions.
 *
 * Renders nothing when there are no photos, so callers can drop it in without
 * guarding first.
 */
const ExerciseDemoPhotos = ({ exercise, language = 'id', title = 'Foto peragaan', columns = 3 }) => {
  const photos = demoPhotosOf(exercise);
  const [lightbox, setLightbox] = useState(null);

  if (photos.length === 0) return null;

  const gridCols = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3', 4: 'sm:grid-cols-4' }[columns] || 'sm:grid-cols-3';

  return (
    <div className="space-y-3">
      <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
        <Camera className="w-4 h-4" />
        {title}
        <span className="font-medium normal-case tracking-normal text-muted-foreground/70">
          ({photos.length} langkah)
        </span>
      </h4>

      <ol className={`grid grid-cols-2 ${gridCols} gap-3`}>
        {photos.map((photo, index) => (
          <li key={`${photo.url}-${index}`} className="space-y-2">
            <button
              type="button"
              onClick={() => setLightbox(index)}
              className="relative block w-full aspect-[4/3] rounded-xl overflow-hidden border border-border bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <img
                src={photo.url}
                alt={photoCaption(photo, index, language)}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <span className="absolute top-2 left-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shadow">
                {index + 1}
              </span>
            </button>
            <p className="text-xs text-muted-foreground leading-snug">
              {photoCaption(photo, index, language)}
            </p>
          </li>
        ))}
      </ol>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
          <figure className="max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={photos[lightbox].url}
              alt={photoCaption(photos[lightbox], lightbox, language)}
              className="w-full max-h-[75vh] object-contain rounded-xl bg-black"
            />
            <figcaption className="mt-3 text-sm text-white/90 text-center">
              <span className="font-semibold">Langkah {lightbox + 1}. </span>
              {photoCaption(photos[lightbox], lightbox, language)}
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
};

export default ExerciseDemoPhotos;
