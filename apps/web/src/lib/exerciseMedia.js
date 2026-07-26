// One place that decides what visual an exercise shows.
//
// An exercise can carry a video, a video poster, and/or a set of step-by-step
// demonstration photos. Video is the richest, but most of the 173 library
// entries have none — the demonstration photos are what keeps their cards from
// being an empty grey box, so the fallback order matters and should not be
// re-invented in each component.

/** Demonstration photos of an exercise, always an array, bad entries dropped. */
export function demoPhotosOf(exercise) {
  const photos = exercise?.demo_photos;
  if (!Array.isArray(photos)) return [];
  return photos.filter((photo) => photo && typeof photo.url === 'string' && photo.url.trim());
}

export function hasDemoPhotos(exercise) {
  return demoPhotosOf(exercise).length > 0;
}

/**
 * The still image for a card or list row: the video poster when there is one,
 * otherwise the first demonstration photo. Null means "show the placeholder".
 */
export function exerciseCoverImage(exercise) {
  if (exercise?.thumbnail_url) return exercise.thumbnail_url;
  if (exercise?.gif_url) return exercise.gif_url;
  return demoPhotosOf(exercise)[0]?.url ?? null;
}

/** Caption for a step, in the reader's language, with a numbered fallback. */
export function photoCaption(photo, index, language = 'id') {
  const preferred = language === 'en' ? photo?.caption_en : photo?.caption;
  const fallback = language === 'en' ? photo?.caption : photo?.caption_en;
  const text = (preferred || fallback || '').trim();
  if (text) return text;
  return language === 'en' ? `Step ${index + 1}` : `Langkah ${index + 1}`;
}
