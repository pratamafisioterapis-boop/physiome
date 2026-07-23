import React from 'react';
import { Search, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useHeartRate } from '@/contexts/HeartRateContext.jsx';

// Diagnostic tool for devices (e.g. smartwatches) that don't show up when
// searching specifically for the standard heart_rate BLE service — lets a
// user check what fitness-related GATT services their device actually exposes.
const BluetoothDebugScanner = () => {
  const { runDebugScan, isDebugScanning, debugScanResult, debugError } = useHeartRate();

  return (
    <div className="space-y-3 pt-4 border-t border-border">
      <div>
        <p className="text-sm font-medium">Perangkat saya tidak muncul?</p>
        <p className="text-sm text-muted-foreground">
          Coba pindai tanpa filter untuk melihat servis apa saja yang diekspos perangkat Anda.
          Catatan: banyak smartwatch (termasuk Samsung Galaxy Watch) tidak menyiarkan data detak
          jantung ke aplikasi pihak ketiga sama sekali — datanya terkunci di aplikasi Samsung Health.
        </p>
      </div>

      <Button variant="outline" size="sm" onClick={runDebugScan} disabled={isDebugScanning} className="gap-2">
        {isDebugScanning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
        Pindai Perangkat (Mode Debug)
      </Button>

      {debugError && (
        <p className="text-sm text-destructive">{debugError}</p>
      )}

      {debugScanResult && (
        <div className="rounded-lg border border-border bg-muted/50 p-3 text-sm space-y-2">
          <p className="font-medium">{debugScanResult.deviceName}</p>
          {debugScanResult.services.length === 0 ? (
            <p className="text-muted-foreground">
              Tidak ada servis kebugaran standar yang terdeteksi pada perangkat ini. Kemungkinan besar
              perangkat ini tidak membagikan data sensor ke aplikasi lain lewat Bluetooth.
            </p>
          ) : (
            <ul className="space-y-1">
              {debugScanResult.services.map((service) => (
                <li key={service.uuid} className="font-mono text-xs text-muted-foreground">
                  {service.uuid} ({service.characteristics.length} characteristic)
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default BluetoothDebugScanner;
