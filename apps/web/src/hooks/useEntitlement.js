import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext.jsx';

/**
 * Status langganan yang sedang berlaku untuk pengguna saat ini.
 *
 * `state` dihitung di server dari timestamp, bukan dibaca dari kolom status:
 *   active   - dalam periode berbayar/trial
 *   grace    - lewat jatuh tempo, masih dalam masa tenggang 7 hari
 *   readonly - masa tenggang habis; hanya boleh membaca
 *   none     - belum pernah punya langganan
 */
export const useEntitlement = () => {
  const { subscription, canWrite, currentUser } = useAuth();
  const navigate = useNavigate();

  const state = subscription?.state ?? 'none';
  const enforced = subscription?.enforced ?? false;

  /**
   * Panggil sebelum aksi tulis di UI. Mengembalikan false dan mengarahkan ke
   * halaman langganan bila akses tulis sedang ditutup.
   *
   * Ini murni lapisan UX — server tetap membalas 402 apa pun yang terjadi,
   * jadi tombol yang belum memakai ini adalah celah pengalaman, bukan celah
   * keamanan.
   */
  const requireWrite = useCallback(() => {
    if (canWrite) return true;
    toast.error('Langganan Anda tidak aktif. Perpanjang untuk melanjutkan.');
    navigate('/billing');
    return false;
  }, [canWrite, navigate]);

  return {
    subscription,
    state,
    enforced,
    canWrite,
    isSuperAdmin: currentUser?.role === 'super_admin',
    daysRemaining: subscription?.daysRemaining ?? 0,
    daysUntilLockout: subscription?.daysUntilLockout ?? 0,
    planCode: subscription?.planCode ?? null,
    planName: subscription?.planName ?? null,
    limits: subscription?.limits ?? { maxTherapists: null, maxActivePatients: null },
    usage: subscription?.usage ?? { therapists: 0, activePatients: 0 },
    requireWrite,
  };
};

export default useEntitlement;
