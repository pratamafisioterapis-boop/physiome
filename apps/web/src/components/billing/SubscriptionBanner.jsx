import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Clock, Lock } from 'lucide-react';
import { useEntitlement } from '@/hooks/useEntitlement.js';

const WARN_WITHIN_DAYS = 7;

/**
 * Strip status langganan. Dipasang di Header (untuk staf klinik) dan
 * PatientLayout (untuk pasien) karena aplikasi ini tidak punya layout
 * bersama — setiap halaman merender Sidebar/Header sendiri.
 *
 * Sengaja tidak menampilkan apa pun saat langganan sehat, supaya tidak
 * menambah kebisingan pada penggunaan sehari-hari.
 */
const SubscriptionBanner = () => {
  const { state, enforced, daysRemaining, daysUntilLockout, isSuperAdmin } = useEntitlement();

  if (isSuperAdmin) return null;

  // Sebelum penegakan dinyalakan, banner hanya boleh mengingatkan hal yang
  // memang akan terjadi. Menakut-nakuti soal penguncian yang belum aktif
  // hanya membuat pengguna bingung.
  if (!enforced && state !== 'grace' && state !== 'readonly') return null;

  let tone = null;
  let icon = null;
  let message = null;

  if (state === 'active' && daysRemaining <= WARN_WITHIN_DAYS) {
    tone = 'amber';
    icon = <Clock className="h-4 w-4 shrink-0" />;
    message = daysRemaining <= 1
      ? 'Langganan Anda berakhir besok.'
      : `Langganan Anda berakhir dalam ${daysRemaining} hari.`;
  } else if (state === 'grace') {
    tone = 'orange';
    icon = <AlertTriangle className="h-4 w-4 shrink-0" />;
    message = daysUntilLockout <= 1
      ? 'Pembayaran terlewat. Besok akun beralih ke mode baca-saja.'
      : `Pembayaran terlewat. ${daysUntilLockout} hari lagi sebelum akun beralih ke mode baca-saja.`;
  } else if (state === 'readonly' || state === 'none') {
    tone = 'red';
    icon = <Lock className="h-4 w-4 shrink-0" />;
    message = 'Akun dalam mode baca-saja. Data Anda aman, tetapi tidak bisa menambah atau mengubah sampai langganan diperpanjang.';
  }

  if (!message) return null;

  const tones = {
    amber: 'bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-950/40 dark:text-amber-100 dark:border-amber-900',
    orange: 'bg-orange-50 text-orange-900 border-orange-200 dark:bg-orange-950/40 dark:text-orange-100 dark:border-orange-900',
    red: 'bg-red-50 text-red-900 border-red-200 dark:bg-red-950/40 dark:text-red-100 dark:border-red-900',
  };

  return (
    <div
      role="status"
      className={`flex flex-wrap items-center gap-x-3 gap-y-2 border-b px-4 py-2.5 text-sm ${tones[tone]}`}
    >
      {icon}
      <span className="flex-1 min-w-0">{message}</span>
      <Link
        to="/billing"
        className="shrink-0 rounded-md border border-current/30 px-3 py-1 text-xs font-semibold hover:bg-current/10"
      >
        {state === 'readonly' || state === 'none' ? 'Aktifkan langganan' : 'Perpanjang sekarang'}
      </Link>
    </div>
  );
};

export default SubscriptionBanner;
