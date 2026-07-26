/** Helper bersama untuk halaman langganan. */

export const formatRupiah = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);

/** "per bulan" / "per 3 bulan" / "14 hari" — dari period_months + period_days. */
export const formatPeriod = (plan) => {
  const months = Number(plan?.period_months) || 0;
  const days = Number(plan?.period_days) || 0;
  if (months === 1) return 'per bulan';
  if (months === 12) return 'per tahun';
  if (months > 0) return `per ${months} bulan`;
  if (days > 0) return `${days} hari`;
  return '';
};

export const formatDate = (value) => {
  if (!value) return '-';
  return new Date(value).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

/** Label bahasa Indonesia untuk state langganan. */
export const STATE_LABELS = {
  active: 'Aktif',
  grace: 'Lewat jatuh tempo',
  readonly: 'Baca-saja',
  none: 'Belum berlangganan',
};

/** Label bahasa Indonesia untuk status transaksi Midtrans. */
export const TRANSACTION_STATUS_LABELS = {
  pending: 'Menunggu pembayaran',
  settlement: 'Lunas',
  capture: 'Lunas',
  deny: 'Ditolak',
  cancel: 'Dibatalkan',
  expire: 'Kedaluwarsa',
  failure: 'Gagal',
  refund: 'Dikembalikan',
};

/** Ambil daftar fitur sesuai bahasa, dengan fallback ke Indonesia. */
export const planFeatures = (plan, language = 'id') => {
  const features = plan?.features;
  if (!features) return [];
  if (Array.isArray(features)) return features;
  return features[language] || features.id || features.en || [];
};
