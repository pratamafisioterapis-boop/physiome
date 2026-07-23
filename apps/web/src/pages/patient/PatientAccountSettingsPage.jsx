
import React from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Settings, Bell } from 'lucide-react';
import { toast } from 'sonner';

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
          Kelola preferensi notifikasi akun Anda.
        </p>
      </div>

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
