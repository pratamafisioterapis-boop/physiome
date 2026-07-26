import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Loader2, Receipt } from 'lucide-react';
import apiServerClient from '@/lib/apiServerClient.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header.jsx';
import Sidebar from '@/components/Sidebar.jsx';
import {
  formatDate,
  formatRupiah,
  STATE_LABELS,
  TRANSACTION_STATUS_LABELS,
} from '@/lib/billing.js';

const STATE_VARIANTS = {
  active: 'default',
  grace: 'secondary',
  readonly: 'destructive',
  none: 'outline',
};

/** Bar pemakaian vs batas paket. Batas null berarti tanpa batas. */
const UsageBar = ({ label, used, limit }) => {
  if (limit == null) {
    return (
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span>{used} <span className="text-muted-foreground">/ tanpa batas</span></span>
      </div>
    );
  }
  const pct = limit > 0 ? Math.min(100, Math.round((used / limit) * 100)) : 0;
  const atLimit = used >= limit;
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className={atLimit ? 'text-destructive font-medium' : ''}>{used} / {limit}</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full rounded-full ${atLimit ? 'bg-destructive' : 'bg-primary'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

const SubscriptionPageContent = () => {
  const { currentUser } = useAuth();
  const [subscription, setSubscription] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setIsLoading(true);
      try {
        const [sub, txns] = await Promise.all([
          apiServerClient.fetch('/subscription/me'),
          apiServerClient.fetch('/subscription/transactions').catch(() => []),
        ]);
        if (cancelled) return;
        setSubscription(sub);
        setTransactions(Array.isArray(txns) ? txns : []);
      } catch (error) {
        console.error('Failed to load subscription:', error);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const state = subscription?.state ?? 'none';
  const isStaff = ['admin', 'therapist'].includes(currentUser?.role);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Langganan</h1>
        <p className="text-muted-foreground mt-1">Status paket dan riwayat pembayaran Anda.</p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-lg font-semibold">
                {subscription?.planName || 'Belum ada paket'}
              </h2>
              <Badge variant={STATE_VARIANTS[state] || 'outline'}>
                {STATE_LABELS[state] || state}
              </Badge>
            </div>
            {subscription?.currentPeriodEnd && (
              <p className="mt-1 text-sm text-muted-foreground">
                {state === 'readonly'
                  ? `Berakhir pada ${formatDate(subscription.currentPeriodEnd)}`
                  : `Berlaku sampai ${formatDate(subscription.currentPeriodEnd)}`}
              </p>
            )}
            {state === 'grace' && subscription?.graceUntil && (
              <p className="mt-1 text-sm text-orange-600 dark:text-orange-400">
                Mode baca-saja mulai {formatDate(subscription.graceUntil)}
              </p>
            )}
          </div>

          <Button asChild>
            <Link to="/pricing">
              {state === 'active' ? 'Ubah atau perpanjang paket' : 'Aktifkan langganan'}
            </Link>
          </Button>
        </div>

        {isStaff && subscription?.limits && (
          <div className="space-y-3 border-t border-border pt-5">
            <h3 className="text-sm font-medium">Pemakaian</h3>
            <UsageBar
              label="Fisioterapis"
              used={subscription.usage?.therapists ?? 0}
              limit={subscription.limits.maxTherapists}
            />
            <UsageBar
              label="Pasien aktif"
              used={subscription.usage?.activePatients ?? 0}
              limit={subscription.limits.maxActivePatients}
            />
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-border bg-card">
        <div className="flex items-center gap-2 border-b border-border px-6 py-4">
          <Receipt className="w-4 h-4 text-muted-foreground" />
          <h2 className="font-medium">Riwayat pembayaran</h2>
        </div>

        {transactions.length === 0 ? (
          <p className="px-6 py-10 text-center text-sm text-muted-foreground">
            Belum ada transaksi.
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {transactions.map((txn) => (
              <li key={txn.order_id} className="flex flex-wrap items-center justify-between gap-3 px-6 py-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium">{txn.plan_code}</p>
                  <p className="font-mono text-xs text-muted-foreground break-all">{txn.order_id}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(txn.created_at)}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-sm font-medium">{formatRupiah(txn.gross_amount)}</span>
                  <Badge variant={txn.status === 'settlement' || txn.status === 'capture' ? 'default' : 'outline'}>
                    {TRANSACTION_STATUS_LABELS[txn.status] || txn.status}
                  </Badge>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

/**
 * Pasien memakai PatientLayout (Outlet), staf klinik memakai Sidebar/Header.
 * Aplikasi ini tidak punya layout bersama, jadi pemilihannya di sini.
 */
const SubscriptionPage = () => {
  const { currentUser } = useAuth();

  if (currentUser?.role === 'patient') {
    return (
      <>
        <Helmet><title>Langganan - Physiome</title></Helmet>
        <SubscriptionPageContent />
      </>
    );
  }

  return (
    <>
      <Helmet><title>Langganan - Physiome</title></Helmet>
      <div className="min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1 ml-0 md:ml-64 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
            <SubscriptionPageContent />
          </main>
        </div>
      </div>
    </>
  );
};

export default SubscriptionPage;
