import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '@/components/Sidebar.jsx';
import apiServerClient from '@/lib/apiServerClient.js';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Input from '@/components/Input.jsx';

export default function SuperAdminPaymentSettings() {
  const [settingsList, setSettingsList] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [settings, setSettings] = useState({
    bank_name: '',
    account_name: '',
    account_number: '',
    transfer_instructions: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  const fetchSettings = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const data = await apiServerClient.fetch('/super-admin/payment-settings');
      const list = Array.isArray(data) ? data : [];
      setSettingsList(list);

      if (list.length > 0) {
        const selected = list.find((item) => item.id === selectedId) || list[0];
        setSelectedId(selected.id);
        setSettings({
          bank_name: selected.bank_name || '',
          account_name: selected.account_name || '',
          account_number: selected.account_number || '',
          transfer_instructions: selected.transfer_instructions || ''
        });
      } else {
        setSelectedId(null);
        setSettings({
          bank_name: '',
          account_name: '',
          account_number: '',
          transfer_instructions: ''
        });
      }
    } catch (error) {
      console.error(error);
      setMessage('Unable to load payment settings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectSetting = (setting) => {
    setSelectedId(setting.id);
    setSettings({
      bank_name: setting.bank_name || '',
      account_name: setting.account_name || '',
      account_number: setting.account_number || '',
      transfer_instructions: setting.transfer_instructions || ''
    });
    setMessage(null);
  };

  const handleNewSetting = () => {
    setSelectedId(null);
    setSettings({
      bank_name: '',
      account_name: '',
      account_number: '',
      transfer_instructions: ''
    });
    setMessage(null);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const payload = {
        ...settings,
        id: selectedId || undefined
      };

      const saved = await apiServerClient.fetch('/super-admin/payment-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      setMessage('Payment settings saved successfully.');
      setSelectedId(saved.id);
      await fetchSettings();
    } catch (error) {
      console.error(error);
      setMessage('Failed to save payment settings.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <Helmet>
        <title>Payment Settings | Super Admin</title>
      </Helmet>

      <Sidebar />
      <div className="flex-1 ml-0 md:ml-64 flex flex-col min-w-0">
        <div className="p-6 md:p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Payment Settings</h1>
            <p className="mt-2 text-sm text-muted-foreground">Manage bank transfer accounts and instructions used by clinics.</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_1.6fr]">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between gap-3 mb-5">
                <div>
                  <h2 className="text-lg font-semibold">Payment accounts</h2>
                  <p className="text-sm text-muted-foreground">Pilih rekening untuk diedit atau buat yang baru.</p>
                </div>
                <Button variant="outline" size="sm" onClick={handleNewSetting} disabled={loading || saving}>
                  New
                </Button>
              </div>

              <div className="overflow-x-auto">
                <Table className="min-w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Bank</TableHead>
                      <TableHead>Account</TableHead>
                      <TableHead className="text-right">Updated</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {settingsList.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                          No payment settings available.
                        </TableCell>
                      </TableRow>
                    ) : (
                      settingsList.map((item) => (
                        <TableRow
                          key={item.id}
                          className={item.id === selectedId ? 'bg-primary/10' : ''}
                          onClick={() => handleSelectSetting(item)}
                          style={{ cursor: 'pointer' }}
                        >
                          <TableCell>{item.id}</TableCell>
                          <TableCell>{item.bank_name || '-'}</TableCell>
                          <TableCell>{item.account_name || item.account_number || '-'}</TableCell>
                          <TableCell className="text-right text-sm text-muted-foreground">
                            {item.updated_at ? new Date(item.updated_at).toLocaleDateString() : '-'}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              {message && (
                <div className="mb-5 rounded-2xl border border-border/80 bg-muted p-4 text-sm text-foreground">
                  {message}
                </div>
              )}

              <div className="space-y-5">
                <Input
                  label="Bank name"
                  name="bank_name"
                  value={settings.bank_name}
                  onChange={handleChange}
                  placeholder="Contoh: BCA"
                />
                <Input
                  label="Account name"
                  name="account_name"
                  value={settings.account_name}
                  onChange={handleChange}
                  placeholder="Nama pemilik rekening"
                />
                <Input
                  label="Account number"
                  name="account_number"
                  value={settings.account_number}
                  onChange={handleChange}
                  placeholder="Nomor rekening"
                />
                <div>
                  <label htmlFor="transfer_instructions" className="block text-sm font-medium text-foreground mb-2">Transfer instructions</label>
                  <textarea
                    id="transfer_instructions"
                    name="transfer_instructions"
                    value={settings.transfer_instructions}
                    onChange={handleChange}
                    rows={5}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/10"
                    placeholder="Tambahkan instruksi transfer, termasuk kode unik atau petunjuk pembayaran."
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button variant="primary" onClick={handleSave} disabled={saving || loading}>
                  {saving ? 'Saving...' : selectedId ? 'Update settings' : 'Create settings'}
                </Button>
                <Button variant="outline" onClick={fetchSettings} disabled={loading || saving}>
                  Refresh
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
