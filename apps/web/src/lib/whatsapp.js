// WhatsApp click-to-chat helpers (keyless — no WhatsApp Business API needed).
// Opens wa.me with a pre-filled reminder so the clinician sends it from their
// own number. This fits WhatsApp-first markets like Indonesia and needs no
// backend or credentials.

// Normalise an Indonesian-style phone number to the wa.me digits-only format.
// 08xxx -> 628xxx, +62 / 62 kept, leading zeros/spaces/dashes stripped.
export function normalizePhone(raw = '', defaultCountry = '62') {
  let p = String(raw).replace(/[\s\-().]/g, '');
  if (!p) return '';
  if (p.startsWith('+')) return p.slice(1);
  if (p.startsWith('0')) return defaultCountry + p.slice(1);
  if (p.startsWith(defaultCountry)) return p;
  return p; // already international without +
}

export function buildReminderUrl(phone, message) {
  const digits = normalizePhone(phone);
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

// Default exercise-reminder message (Bahasa Indonesia).
export function exerciseReminderMessage({ patientName, therapistName, clinicName } = {}) {
  const hi = patientName ? `Halo ${patientName.split(' ')[0]},` : 'Halo,';
  const from = therapistName ? `\n\n– ${therapistName}${clinicName ? `, ${clinicName}` : ''}` : '';
  return (
    `${hi} ini pengingat untuk melakukan latihan rehabilitasi Anda hari ini melalui aplikasi Physiome. ` +
    `Jangan lupa catat tingkat nyeri setelah sesi ya. Semangat pemulihannya! 💪${from}`
  );
}

// Opens the reminder in a new tab. Returns false if the number is unusable.
export function sendWhatsAppReminder(phone, message) {
  const url = buildReminderUrl(phone, message);
  if (!url) return false;
  window.open(url, '_blank', 'noopener,noreferrer');
  return true;
}
