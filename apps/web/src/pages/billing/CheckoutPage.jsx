import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Loader2, QrCode, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import apiServerClient from '@/lib/apiServerClient.js';
import { Button } from '@/components/ui/button';
import { formatPeriod, formatRupiah, planFeatures } from '@/lib/billing.js';

/**
 * Ringkasan paket lalu satu tombol ke halaman pembayaran Midtrans.
 *
 * Sengaja memakai redirect, bukan popup Snap.js: tidak ada client key di
 * frontend, tidak ada script pihak ketiga, tidak berurusan dengan popup
 * blocker, dan berperilaku sama di dalam PWA terpasang.
 */
const CheckoutPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const planCode = searchParams.get('plan');

  const [plan, setPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      if (!planCode) {
        setIsLoading(false);
        return;
      }
      try {
        const plans = await apiServerClient.fetch('/subscription/plans');
        const found = (Array.isArray(plans) ? plans : []).find((p) => p.code === planCode);
        if (!cancelled) setPlan(found || null);
      } catch (error) {
        console.error('Failed to load plan:', error);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [planCode]);

  const handlePay = async () => {
    setIsSubmitting(true);
    try {
      const { redirectUrl } = await apiServerClient.fetch('/subscription/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planCode }),
      });
      if (!redirectUrl) throw new Error('Halaman pembayaran tidak tersedia');
      window.location.href = redirectUrl;
    } catch (error) {
      toast.error(error.message || 'Gagal membuka halaman pembayaran');
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background px-4 text-center">
        <p className="text-muted-foreground">Paket tidak ditemukan atau belum tersedia untuk dipesan.</p>
        <Button variant="outline" onClick={() => navigate('/pricing')}>Lihat daftar paket</Button>
      </div>
    );
  }

  return (
    <>
      <Helmet><title>Pembayaran - Physiome</title></Helmet>

      <div className="min-h-screen bg-background">
        <div className="max-w-lg mx-auto px-4 py-12 space-y-6">
          <Link to="/pricing" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" /> Kembali ke daftar paket
          </Link>

          <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
            <div>
              <h1 className="text-xl font-semibold">{plan.name_id}</h1>
              {plan.description_id && (
                <p className="mt-1 text-sm text-muted-foreground">{plan.description_id}</p>
              )}
            </div>

            <ul className="space-y-2 text-sm text-muted-foreground">
              {planFeatures(plan).map((feature) => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>

            <div className="flex items-baseline justify-between border-t border-border pt-4">
              <span className="text-sm text-muted-foreground">Total {formatPeriod(plan)}</span>
              <span className="text-2xl font-bold">{formatRupiah(plan.price_idr)}</span>
            </div>

            <div className="flex items-start gap-2 rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
              <QrCode className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                Pembayaran memakai QRIS — bisa discan dari aplikasi bank atau e-wallet mana pun.
                Langganan aktif otomatis begitu pembayaran diterima.
              </span>
            </div>

            <Button className="w-full" onClick={handlePay} disabled={isSubmitting}>
              {isSubmitting ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Menyiapkan pembayaran…</>
              ) : (
                <>Bayar {formatRupiah(plan.price_idr)}</>
              )}
            </Button>

            <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="w-3.5 h-3.5" />
              Pembayaran diproses oleh Midtrans
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
