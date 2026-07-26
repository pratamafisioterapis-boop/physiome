import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '@/components/Sidebar.jsx';
import Header from '@/components/Header.jsx';
import apiServerClient from '@/lib/apiServerClient.js';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

const formatDate = (value) => value ? new Date(value).toLocaleDateString() : '-';
const badgeClass = (status) => {
  if (status === 'active') return 'bg-emerald-100 text-emerald-700';
  if (status === 'cancelled') return 'bg-rose-100 text-rose-700';
  return 'bg-slate-100 text-slate-700';
};

export default function SuperAdminDashboard() {
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const totalClinics = useMemo(() => clinics.length, [clinics]);
  const activeSubscriptions = useMemo(
    () => clinics.filter((clinic) => clinic.subscription?.status === 'active').length,
    [clinics]
  );
  const unsubscribedCount = useMemo(
    () => clinics.filter((clinic) => !clinic.subscription || clinic.subscription.status !== 'active').length,
    [clinics]
  );

  const fetchClinics = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await apiServerClient.fetch('/super-admin/clinics');
      setClinics(data);
    } catch (err) {
      console.error(err);
      setError('Unable to load clinics. Please refresh or contact support.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClinics();
  }, []);

  const handleSubscription = async (clinicId, action) => {
    setLoading(true);
    setError(null);
    try {
      if (action === 'subscribe') {
        // Perpanjangan manual satu bulan. Untuk kontrol penuh (paket lain,
        // durasi lain, pasien B2C) gunakan /super-admin/subscriptions.
        await apiServerClient.fetch(`/super-admin/clinics/${clinicId}/subscribe`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ plan_code: 'clinic-monthly', months: 1 })
        });
      } else {
        await apiServerClient.fetch(`/super-admin/clinics/${clinicId}/cancel`, {
          method: 'POST'
        });
      }
      await fetchClinics();
    } catch (err) {
      console.error(err);
      setError('Action failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Helmet>
        <title>Super Admin | Physiome</title>
      </Helmet>

      <Sidebar />
      <div className="flex-1 ml-0 md:ml-64 flex flex-col min-w-0">
        <Header />
        <div className="p-6 md:p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Super Admin Console</h1>
            <p className="mt-2 text-sm text-muted-foreground">Manage clinics, subscription status, and clinic admin assignments.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 mb-8">
            <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
              <p className="text-sm text-muted-foreground">Total Clinics</p>
              <p className="mt-3 text-3xl font-semibold">{totalClinics}</p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
              <p className="text-sm text-muted-foreground">Active Subscriptions</p>
              <p className="mt-3 text-3xl font-semibold">{activeSubscriptions}</p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
              <p className="text-sm text-muted-foreground">Unsubscribed Clinics</p>
              <p className="mt-3 text-3xl font-semibold">{unsubscribedCount}</p>
            </div>
          </div>

          {error && (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 mb-6">
              {error}
            </div>
          )}

          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm overflow-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold">Clinic Subscription Management</h2>
                <p className="text-sm text-muted-foreground">Review each clinic and update its subscription status.</p>
              </div>
              <Button variant="secondary" onClick={fetchClinics} disabled={loading}>
                Refresh clinics
              </Button>
            </div>

            {loading ? (
              <div className="text-sm text-muted-foreground py-12 text-center">Loading clinics...</div>
            ) : (
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Clinic</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Admins</TableHead>
                    <TableHead>Subscription</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Berlaku sampai</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clinics.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No clinics found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    clinics.map((clinic) => (
                      <TableRow key={clinic.id}>
                        <TableCell className="font-medium">{clinic.name}</TableCell>
                        <TableCell>{clinic.city || clinic.address || '-'}</TableCell>
                        <TableCell>
                          {clinic.admins?.length ? (
                            <div className="space-y-1">
                              {clinic.admins.slice(0, 2).map((admin) => (
                                <div key={admin.id} className="text-sm text-foreground">{admin.fullName || admin.email}</div>
                              ))}
                              {clinic.admins.length > 2 && (
                                <div className="text-sm text-muted-foreground">+{clinic.admins.length - 2} more</div>
                              )}
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">No admin users</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {clinic.subscription ? (
                            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeClass(clinic.subscription.status)}`}>
                              {clinic.subscription.status}
                            </span>
                          ) : (
                            <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">unsubscribed</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {clinic.subscription?.subscription_plans?.name_id || clinic.subscription?.plan_code || '-'}
                        </TableCell>
                        <TableCell>{formatDate(clinic.subscription?.current_period_end)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex flex-wrap justify-end gap-2">
                            <Button
                              size="sm"
                              variant="default"
                              onClick={() => handleSubscription(clinic.id, 'subscribe')}
                              disabled={loading}
                            >
                              +1 bulan
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleSubscription(clinic.id, 'cancel')}
                              disabled={loading || !clinic.subscription || clinic.subscription.status !== 'active'}
                            >
                              Cancel
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
