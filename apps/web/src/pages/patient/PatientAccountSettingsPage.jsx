
import React from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Settings, HeartPulse, Bell } from 'lucide-react';
import { toast } from 'sonner';
import HeartRateMonitor from '@/components/HeartRateMonitor.jsx';
import BluetoothDebugScanner from '@/components/BluetoothDebugScanner.jsx';
import { isWebBluetoothSupported } from '@/hooks/useHeartRateMonitor.js';

const PatientAccountSettingsPage = () => {
  const handleSaveNotifications = (e) => {
    e.preventDefault();
    toast.success('Preferensi notifikasi disimpan');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <Helmet><title>Account Settings | Physiome</title></Helmet>

      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <Settings className="w-8 h-8 text-primary" /> Account Settings
        </h1>
        <p className="text-muted-foreground mt-2">
          Kelola perangkat yang terhubung dan preferensi notifikasi akun Anda.
        </p>
      </div>

      <Card className="border-border shadow-soft-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-primary" /> Connected Devices
          </CardTitle>
          <CardDescription>
            Hubungkan smartwatch atau sensor detak jantung Bluetooth agar BPM Anda tampil otomatis saat sesi latihan.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <HeartRateMonitor theme="light" />
          {!isWebBluetoothSupported() && (
            <p className="text-sm text-muted-foreground">
              Bluetooth tidak didukung di browser ini (misalnya Safari di iOS). Gunakan Chrome/Edge di Android atau desktop untuk menghubungkan perangkat.
            </p>
          )}
          {isWebBluetoothSupported() && <BluetoothDebugScanner />}
        </CardContent>
      </Card>

      <Card className="border-border shadow-soft-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" /> Notifications
          </CardTitle>
          <CardDescription>Atur pengingat yang ingin Anda terima.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveNotifications} className="space-y-6 max-w-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-medium">Pengingat Latihan</p>
                <p className="text-sm text-muted-foreground">Dapatkan notifikasi harian untuk latihan yang ditugaskan.</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-medium">Pengingat Janji Temu</p>
                <p className="text-sm text-muted-foreground">Diingatkan 15 menit sebelum janji temu.</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-medium">Pesan Terapis</p>
                <p className="text-sm text-muted-foreground">Notifikasi saat menerima pesan baru.</p>
              </div>
              <Switch defaultChecked />
            </div>

            <Button type="submit" className="shadow-glow-primary">Simpan Preferensi</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientAccountSettingsPage;
