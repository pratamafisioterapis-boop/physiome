import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useSearchParams } from 'react-router-dom';
import { AlertCircle, CheckCircle2, Clock, Loader2 } from 'lucide-react';
import apiServerClient from '@/lib/apiServerClient.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Button } from '@/components/ui/button';
import { formatRupiah, TRANSACTION_STATUS_LABELS } from '@/lib/billing.js';

const POLL_INTERVAL_MS = 3000;
const POLL_TIMEOUT_MS = 2 * 60 * 1000;

/**
 * Ditampilkan setelah pengguna kembali dari Midtrans.
 *
 * Polling di sini bukan sekadar kosmetik: endpoint yang dipanggil ikut
 * menanyakan status ke Midtrans bila transaksi masih pending, sehingga
 * webhook yang hilang tidak membuat pembayaran menggantung.
 */
const PaymentStatusPage = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('order_id');
  const { refreshSubscription } = useAuth();

  const [transaction, setTransaction] = useState(null);
  const [error, setError] = useState(null);
  const [timedOut, setTimedOut] = useState(false);
  const startedAt = useRef(Date.now());
  const settledRef = useRef(false);

  const poll = useCallback(async () => {
    if (!orderId) return true;
    try {
      const data = await apiServerClient.fetch(`/subscription/transactions/${encodeURIComponent(orderId)}`);
      setTransaction(data);
      if (data.outcome === 'paid') {
        if (!settledRef.current) {
          settledRef.current = true;
          await refreshSubscription();
        }
        return true;
      }
      return data.outcome === 'failed' || data.outcome === 'refunded';
    } catch (e) {
      setError(e.message || 'Gagal memeriksa status pembayaran');
      return true;
    }
  }, [orderId, refreshSubscription]);

  useEffect(() => {
    if (!orderId) return undefined;

    let timer = null;
    let cancelled = false;

    const tick = async () => {
      const done = await poll();
      if (cancelled || done) return;
      if (Date.now() - startedAt.current > POLL_TIMEOUT_MS) {
        setTimedOut(true);
        return;
      }
      timer = setTimeout(tick, POLL_INTERVAL_MS);
    };

    tick();
    return () => { cancelled = true; if (timer) clearTimeout(timer); };
  }, [orderId, poll]);

  if (!orderId) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background px-4 text-center">
        <p className="text-muted-foreground">Nomor pesanan tidak ditemukan pada tautan ini.</p>
        <Button asChild variant="outline"><Link to="/billing">Buka halaman langganan</Link></Button>
      </div>
    );
  }

  const outcome = error ? 'error' : (transaction?.outcome ?? 'loading');

  const view = {
    loading: {
      icon: <Loader2 className="w-10 h-10 animate-spin text-muted-foreground" />,
      title: 'Memeriksa pembayaran…',
      body: 'Mohon tunggu sebentar.',
    },
    pending: {
      icon: <Clock className="w-10 h-10 text-amber-500" />,
      title: 'Menunggu pembayaran',
      body: timedOut
        ? 'Kami belum menerima pembayaran Anda. Kalau sudah membayar, status akan otomatis diperbarui — silakan cek kembali beberapa saat lagi.'
        : 'Selesaikan pembayaran QRIS Anda. Halaman ini akan memperbarui diri secara otomatis.',
    },
    paid: {
      icon: <CheckCircle2 className="w-10 h-10 text-emerald-500" />,
      title: 'Pembayaran diterima',
      body: 'Langganan Anda sudah aktif. Terima kasih.',
    },
    failed: {
      icon: <AlertCircle className="w-10 h-10 text-destructive" />,
      title: 'Pembayaran tidak selesai',
      body: 'Transaksi dibatalkan atau kedaluwarsa. Anda bisa mencoba lagi kapan saja.',
    },
    refunded: {
      icon: <AlertCircle className="w-10 h-10 text-amber-500" />,
      title: 'Pembayaran dikembalikan',
      body: 'Transaksi ini telah dikembalikan. Hubungi kami bila ada pertanyaan.',
    },
    unknown: {
      icon: <Clock className="w-10 h-10 text-muted-foreground" />,
      title: 'Status belum pasti',
      body: 'Kami masih menunggu konfirmasi dari penyedia pembayaran.',
    },
    error: {
      icon: <AlertCircle className="w-10 h-10 text-destructive" />,
      title: 'Gagal memeriksa status',
      body: error,
    },
  }[outcome] ?? {
    icon: <Clock className="w-10 h-10 text-muted-foreground" />,
    title: 'Status belum pasti',
    body: 'Kami masih menunggu konfirmasi dari penyedia pembayaran.',
  };

  return (
    <>
      <Helmet><title>Status Pembayaran - Physiome</title></Helmet>

      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center space-y-4">
          <div className="flex justify-center">{view.icon}</div>
          <h1 className="text-xl font-semibold">{view.title}</h1>
          <p className="text-sm text-muted-foreground">{view.body}</p>

          {transaction && (
            <dl className="mt-4 space-y-1.5 rounded-lg bg-muted/50 p-4 text-left text-xs">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Nomor pesanan</dt>
                <dd className="font-mono break-all text-right">{transaction.orderId}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Jumlah</dt>
                <dd>{formatRupiah(transaction.grossAmount)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Status</dt>
                <dd>{TRANSACTION_STATUS_LABELS[transaction.status] || transaction.status}</dd>
              </div>
            </dl>
          )}

          <div className="flex flex-col gap-2 pt-2">
            {outcome === 'pending' && transaction?.snapRedirectUrl && (
              <Button asChild>
                <a href={transaction.snapRedirectUrl}>Lanjutkan pembayaran</a>
              </Button>
            )}
            {outcome === 'failed' && (
              <Button asChild><Link to="/pricing">Coba lagi</Link></Button>
            )}
            <Button asChild variant={outcome === 'paid' ? 'default' : 'outline'}>
              <Link to="/billing">Buka halaman langganan</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentStatusPage;
