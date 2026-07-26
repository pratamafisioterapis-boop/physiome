import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Building2, Loader2, Receipt, User } from 'lucide-react';
import { toast } from 'sonner';
import apiServerClient from '@/lib/apiServerClient.js';
import Header from '@/components/Header.jsx';
import Sidebar from '@/components/Sidebar.jsx';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDate, formatRupiah, TRANSACTION_STATUS_LABELS } from '@/lib/billing.js';

const STATUS_VARIANTS = {
  active: 'default',
  trialing: 'secondary',
  past_due: 'secondary',
  expired: 'destructive',
  cancelled: 'outline',
};

const STATUS_LABELS = {
  active: 'Aktif',
  trialing: 'Uji coba',
  past_due: 'Lewat tempo',
  expired: 'Kedaluwarsa',
  cancelled: 'Dibatalkan',
};

/**
 * Konsol langganan. Menampilkan klinik dan pasien B2C dalam satu daftar,
 * karena keduanya baris di tabel `subscriptions` yang sama.
 *
 * Override manual dipertahankan meski pembayaran sudah otomatis — selalu ada
 * kasus yang tidak bisa diungkapkan lewat gateway (kompensasi, refund,
 * perpanjangan itikad baik).
 */
const SuperAdminSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  const load = async () => {
    setIsLoading(true);
    try {
      const [subs, txns] = await Promise.all([
        apiServerClient.fetch('/super-admin/subscriptions'),
        apiServerClient.fetch('/super-admin/transactions').catch(() => []),
      ]);
      setSubscriptions(Array.isArray(subs) ? subs : []);
      setTransactions(Array.isArray(txns) ? txns : []);
    } catch (error) {
      console.error('Failed to load subscriptions:', error);
      toast.error('Gagal memuat data langganan');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const adjust = async (id, patch, successMessage) => {
    setBusyId(id);
    try {
      await apiServerClient.fetch(`/super-admin/subscriptions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patch),
      });
      toast.success(successMessage);
      await load();
    } catch (error) {
      toast.error(error.message || 'Gagal memperbarui langganan');
    } finally {
      setBusyId(null);
    }
  };

  const subjectName = (sub) =>
    sub.clinics?.name || sub.users?.fullName || sub.users?.email || 'Tanpa nama';

  return (
    <>
      <Helmet><title>Langganan - Super Admin</title></Helmet>

      <div className="min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1 ml-0 md:ml-64 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-5xl mx-auto space-y-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Langganan</h1>
                <p className="text-muted-foreground mt-1">
                  Klinik, praktek mandiri, dan pasien langsung dalam satu daftar.
                </p>
              </div>

              {isLoading ? (
                <div className="flex justify-center py-16">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <>
                  <section className="space-y-3">
                    {subscriptions.length === 0 ? (
                      <p className="rounded-2xl border border-border bg-card py-12 text-center text-sm text-muted-foreground">
                        Belum ada langganan.
                      </p>
                    ) : subscriptions.map((sub) => (
                      <div key={sub.id} className="rounded-2xl border border-border bg-card p-5 space-y-4">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              {sub.clinic_id
                                ? <Building2 className="w-4 h-4 text-muted-foreground shrink-0" />
                                : <User className="w-4 h-4 text-muted-foreground shrink-0" />}
                              <h2 className="font-semibold">{subjectName(sub)}</h2>
                              <Badge variant={STATUS_VARIANTS[sub.status] || 'outline'}>
                                {STATUS_LABELS[sub.status] || sub.status}
                              </Badge>
                              {sub.clinics?.is_house_clinic && <Badge variant="outline">Klinik rumah</Badge>}
                              {sub.source === 'manual' && <Badge variant="outline">Manual</Badge>}
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {sub.subscription_plans?.name_id || sub.plan_code}
                              {' · '}
                              Berlaku sampai {formatDate(sub.current_period_end)}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 border-t border-border pt-4">
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={busyId === sub.id}
                            onClick={() => adjust(sub.id, { extend_months: 1 }, 'Diperpanjang 1 bulan')}
                          >
                            {busyId === sub.id && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            +1 bulan
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={busyId === sub.id}
                            onClick={() => adjust(sub.id, { extend_months: 12 }, 'Diperpanjang 1 tahun')}
                          >
                            +1 tahun
                          </Button>
                          {sub.status !== 'cancelled' && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-destructive hover:text-destructive"
                              disabled={busyId === sub.id}
                              onClick={() => {
                                if (window.confirm(`Batalkan langganan ${subjectName(sub)}?`)) {
                                  adjust(sub.id, { status: 'cancelled' }, 'Langganan dibatalkan');
                                }
                              }}
                            >
                              Batalkan
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </section>

                  <section className="rounded-2xl border border-border bg-card">
                    <div className="flex items-center gap-2 border-b border-border px-6 py-4">
                      <Receipt className="w-4 h-4 text-muted-foreground" />
                      <h2 className="font-medium">Transaksi terakhir</h2>
                    </div>
                    {transactions.length === 0 ? (
                      <p className="px-6 py-10 text-center text-sm text-muted-foreground">
                        Belum ada transaksi.
                      </p>
                    ) : (
                      <ul className="divide-y divide-border">
                        {transactions.map((txn) => (
                          <li key={txn.order_id} className="flex flex-wrap items-center justify-between gap-3 px-6 py-3.5">
                            <div className="min-w-0">
                              <p className="text-sm font-medium">
                                {txn.clinics?.name || txn.users?.fullName || txn.users?.email || '—'}
                              </p>
                              <p className="font-mono text-xs text-muted-foreground break-all">{txn.order_id}</p>
                              <p className="text-xs text-muted-foreground">
                                {txn.plan_code} · {formatDate(txn.created_at)}
                              </p>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                              <span className="text-sm font-medium">{formatRupiah(txn.gross_amount)}</span>
                              <Badge variant={txn.status === 'settlement' ? 'default' : 'outline'}>
                                {TRANSACTION_STATUS_LABELS[txn.status] || txn.status}
                              </Badge>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                </>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default SuperAdminSubscriptions;
