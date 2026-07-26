import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { AlertTriangle, Eye, EyeOff, Loader2, Save } from 'lucide-react';
import { toast } from 'sonner';
import apiServerClient from '@/lib/apiServerClient.js';
import Header from '@/components/Header.jsx';
import Sidebar from '@/components/Sidebar.jsx';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatPeriod, formatRupiah } from '@/lib/billing.js';

const AUDIENCE_LABELS = {
  clinic: 'Klinik',
  solo: 'Praktek Mandiri',
  patient: 'Pasien',
  internal: 'Internal',
};

/**
 * Editor katalog paket.
 *
 * Paket berbayar dikirim dengan harga placeholder dan is_public = false.
 * Halaman inilah yang menyelesaikannya: isi harga asli, lalu publikasikan.
 * Server menolak publikasi paket berbayar yang harganya masih nol.
 */
const SuperAdminPlans = () => {
  const [plans, setPlans] = useState([]);
  const [drafts, setDrafts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [savingCode, setSavingCode] = useState(null);

  const load = async () => {
    setIsLoading(true);
    try {
      const data = await apiServerClient.fetch('/super-admin/plans');
      setPlans(Array.isArray(data) ? data : []);
      setDrafts({});
    } catch (error) {
      console.error('Failed to load plans:', error);
      toast.error('Gagal memuat daftar paket');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const draftFor = (plan) => ({ ...plan, ...(drafts[plan.code] || {}) });

  const setDraft = (code, patch) =>
    setDrafts((prev) => ({ ...prev, [code]: { ...(prev[code] || {}), ...patch } }));

  const save = async (plan, extraPatch = {}) => {
    const draft = { ...draftFor(plan), ...extraPatch };
    setSavingCode(plan.code);
    try {
      await apiServerClient.fetch(`/super-admin/plans/${plan.code}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          price_idr: Number(draft.price_idr) || 0,
          max_therapists: draft.max_therapists === '' || draft.max_therapists === null
            ? null
            : Number(draft.max_therapists),
          max_active_patients: draft.max_active_patients === '' || draft.max_active_patients === null
            ? null
            : Number(draft.max_active_patients),
          is_public: draft.is_public,
          is_active: draft.is_active,
        }),
      });
      toast.success(`Paket ${plan.name_id} disimpan`);
      await load();
    } catch (error) {
      toast.error(error.message || 'Gagal menyimpan paket');
    } finally {
      setSavingCode(null);
    }
  };

  const unpricedPublic = plans.filter((p) => p.audience !== 'internal' && p.price_idr <= 0 && !p.is_public);

  return (
    <>
      <Helmet><title>Paket Langganan - Physiome</title></Helmet>

      <div className="min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1 ml-0 md:ml-64 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-5xl mx-auto space-y-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Paket langganan</h1>
                <p className="text-muted-foreground mt-1">
                  Harga dan batas paket. Hanya paket yang dipublikasikan yang muncul di halaman harga.
                </p>
              </div>

              {unpricedPublic.length > 0 && (
                <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/40">
                  <AlertTriangle className="w-5 h-5 shrink-0 text-amber-600 dark:text-amber-400" />
                  <div className="text-sm text-amber-900 dark:text-amber-100">
                    <p className="font-medium">{unpricedPublic.length} paket belum punya harga.</p>
                    <p className="mt-0.5">
                      Paket dikirim dengan harga placeholder dan sengaja disembunyikan. Isi harga
                      yang benar lalu publikasikan sebelum mulai berjualan.
                    </p>
                  </div>
                </div>
              )}

              {isLoading ? (
                <div className="flex justify-center py-16">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <div className="space-y-4">
                  {plans.map((plan) => {
                    const draft = draftFor(plan);
                    const dirty = Boolean(drafts[plan.code]);
                    const isFree = plan.price_idr <= 0;

                    return (
                      <div key={plan.code} className="rounded-2xl border border-border bg-card p-5 space-y-4">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h2 className="font-semibold">{plan.name_id}</h2>
                              <Badge variant="outline">{AUDIENCE_LABELS[plan.audience] || plan.audience}</Badge>
                              {plan.is_public
                                ? <Badge><Eye className="w-3 h-3 mr-1" /> Publik</Badge>
                                : <Badge variant="secondary"><EyeOff className="w-3 h-3 mr-1" /> Tersembunyi</Badge>}
                            </div>
                            <p className="mt-0.5 font-mono text-xs text-muted-foreground">{plan.code}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{formatRupiah(plan.price_idr)}</p>
                            <p className="text-xs text-muted-foreground">{formatPeriod(plan)}</p>
                          </div>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-3">
                          <label className="space-y-1 text-sm">
                            <span className="text-muted-foreground">Harga (Rp)</span>
                            <input
                              type="number"
                              min="0"
                              step="1000"
                              value={draft.price_idr ?? 0}
                              onChange={(e) => setDraft(plan.code, { price_idr: e.target.value })}
                              className="w-full rounded-lg border border-border bg-background px-3 py-2"
                            />
                          </label>
                          <label className="space-y-1 text-sm">
                            <span className="text-muted-foreground">Maks. fisioterapis</span>
                            <input
                              type="number"
                              min="0"
                              placeholder="Tanpa batas"
                              value={draft.max_therapists ?? ''}
                              onChange={(e) => setDraft(plan.code, { max_therapists: e.target.value })}
                              className="w-full rounded-lg border border-border bg-background px-3 py-2"
                            />
                          </label>
                          <label className="space-y-1 text-sm">
                            <span className="text-muted-foreground">Maks. pasien aktif</span>
                            <input
                              type="number"
                              min="0"
                              placeholder="Tanpa batas"
                              value={draft.max_active_patients ?? ''}
                              onChange={(e) => setDraft(plan.code, { max_active_patients: e.target.value })}
                              className="w-full rounded-lg border border-border bg-background px-3 py-2"
                            />
                          </label>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 border-t border-border pt-4">
                          <Button
                            size="sm"
                            onClick={() => save(plan)}
                            disabled={!dirty || savingCode === plan.code}
                          >
                            {savingCode === plan.code
                              ? <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              : <Save className="w-4 h-4 mr-2" />}
                            Simpan
                          </Button>

                          {plan.audience !== 'internal' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => save(plan, { is_public: !plan.is_public })}
                              disabled={savingCode === plan.code || (!plan.is_public && isFree && !drafts[plan.code]?.price_idr)}
                            >
                              {plan.is_public ? 'Sembunyikan' : 'Publikasikan'}
                            </Button>
                          )}

                          {!plan.is_public && isFree && plan.audience !== 'internal' && (
                            <span className="text-xs text-muted-foreground">
                              Isi harga dulu sebelum bisa dipublikasikan.
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default SuperAdminPlans;
