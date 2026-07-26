import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Loader2, QrCode } from 'lucide-react';
import apiServerClient from '@/lib/apiServerClient.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Button } from '@/components/ui/button';
import { formatPeriod, formatRupiah, planFeatures } from '@/lib/billing.js';

const AUDIENCES = [
  { value: 'clinic', label: 'Klinik' },
  { value: 'solo', label: 'Praktek Mandiri' },
  { value: 'patient', label: 'Pasien' },
];

/**
 * Halaman harga publik. Paket dibaca dari database, bukan di-hardcode, supaya
 * harga bisa dikoreksi tanpa deploy — dan supaya paket yang belum ditetapkan
 * harganya (is_public = false) tidak pernah muncul di sini.
 */
const PricingPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [audience, setAudience] = useState('clinic');

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setIsLoading(true);
      try {
        const data = await apiServerClient.fetch('/subscription/plans');
        if (!cancelled) setPlans(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to load plans:', error);
        if (!cancelled) setPlans([]);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, []);

  const availableAudiences = useMemo(
    () => AUDIENCES.filter((a) => plans.some((p) => p.audience === a.value)),
    [plans],
  );

  // Kalau tab default tidak punya paket, pindah ke tab pertama yang ada.
  useEffect(() => {
    if (availableAudiences.length && !availableAudiences.some((a) => a.value === audience)) {
      setAudience(availableAudiences[0].value);
    }
  }, [availableAudiences, audience]);

  const visiblePlans = plans.filter((p) => p.audience === audience);

  const handleChoose = (planCode) => {
    if (isAuthenticated) navigate(`/billing/checkout?plan=${encodeURIComponent(planCode)}`);
    else navigate(`/register?plan=${encodeURIComponent(planCode)}`);
  };

  return (
    <>
      <Helmet>
        <title>Harga - Physiome</title>
        <meta name="description" content="Paket langganan Physiome untuk klinik, praktek mandiri, dan pasien." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 space-y-10">
          <div className="text-center space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Pilih paket Anda</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Pembayaran dengan QRIS. Aktif otomatis begitu pembayaran diterima.
            </p>
            <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <QrCode className="w-4 h-4" />
              Scan QRIS dari aplikasi bank atau e-wallet mana pun
            </p>
          </div>

          {availableAudiences.length > 1 && (
            <div className="flex justify-center">
              <div className="inline-flex rounded-xl border border-border bg-card p-1">
                {availableAudiences.map((a) => (
                  <button
                    key={a.value}
                    type="button"
                    onClick={() => setAudience(a.value)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      audience === a.value
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : visiblePlans.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <p className="text-muted-foreground">
                Paket langganan belum tersedia untuk dipesan secara daring.
              </p>
              <Link to="/register" className="text-primary hover:underline text-sm">
                Daftar untuk memulai uji coba
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {visiblePlans.map((plan) => (
                <div
                  key={plan.code}
                  className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm"
                >
                  <h2 className="text-lg font-semibold">{plan.name_id}</h2>
                  {plan.description_id && (
                    <p className="mt-1 text-sm text-muted-foreground">{plan.description_id}</p>
                  )}

                  <div className="mt-5 flex items-baseline gap-1.5">
                    <span className="text-3xl font-bold tracking-tight">{formatRupiah(plan.price_idr)}</span>
                    <span className="text-sm text-muted-foreground">{formatPeriod(plan)}</span>
                  </div>

                  <ul className="mt-6 space-y-2.5 flex-1">
                    {planFeatures(plan).map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button className="mt-6 w-full" onClick={() => handleChoose(plan.code)}>
                    Pilih paket ini
                  </Button>
                </div>
              ))}
            </div>
          )}

          <p className="text-center text-xs text-muted-foreground max-w-xl mx-auto">
            QRIS tidak menarik dana secara otomatis setiap bulan. Kami akan mengirim pengingat
            sebelum jatuh tempo beserta tautan pembayaran, dan langganan aktif kembali seketika
            setelah pembayaran diterima.
          </p>
        </div>
      </div>
    </>
  );
};

export default PricingPage;
