
// These tables (exercise_translations, program_translations, notification_templates,
// voice_guidance_translations) do not exist in the Supabase backend yet — this is
// net-new i18n content functionality that hasn't been built server-side. Until then,
// these helpers safely fall back so callers behave as if no translation was found.

export const getExerciseTranslation = async (exerciseId, language) => {
  if (language === 'en') return null; // Default is English, handled by main record
  return null;
};

export const getProgramTranslation = async (programId, language) => {
  if (language === 'en') return null;
  return null;
};

export const getNotificationTemplate = async (notificationType, language) => {
  return '';
};

export const getVoiceGuidance = async (guidanceKey, language) => {
  return guidanceKey;
};
