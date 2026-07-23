import React from 'react';
import { Heart, Bluetooth, BluetoothConnected, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { useHeartRate } from '@/contexts/HeartRateContext.jsx';
import { cn } from '@/lib/utils';

// Live BPM readout backed by the Web Bluetooth GATT Heart Rate Service (0x180D).
// Not supported on iOS Safari (no Web Bluetooth) — connect button is disabled there.
// readOnly hides the "connect" action (used during a workout, where pairing
// should already have happened in Account Settings) and renders nothing when
// no device is connected, instead of exposing the native pairing dialog.
const HeartRateMonitor = ({ theme = 'light', className, readOnly = false }) => {
  const {
    heartRate,
    deviceName,
    isConnecting,
    isConnected,
    error,
    isSupported,
    connect,
    disconnect,
  } = useHeartRate();

  const isDark = theme === 'dark';

  React.useEffect(() => {
    if (error && !readOnly) toast.error(error);
  }, [error, readOnly]);

  if (readOnly && !isConnected) return null;

  const pillClasses = cn(
    'flex items-center gap-2 rounded-full px-4 py-2 transition-colors',
    isDark ? 'bg-white/10 border border-white/20 text-white' : 'bg-card border border-border text-foreground',
    className
  );

  if (isConnected) {
    return (
      <div className={pillClasses}>
        <AnimatePresence mode="wait">
          <motion.span
            key={heartRate}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 0.4 }}
            className="flex items-center"
          >
            <Heart className="w-4 h-4 fill-red-500 text-red-500" />
          </motion.span>
        </AnimatePresence>
        <span className="font-bold tabular-nums">{heartRate ?? '--'}</span>
        <span className={cn('text-xs', isDark ? 'text-white/60' : 'text-muted-foreground')}>bpm</span>
        <button
          type="button"
          onClick={disconnect}
          title={`Putuskan koneksi (${deviceName})`}
          className={cn('ml-1 rounded-full p-1', isDark ? 'hover:bg-white/20' : 'hover:bg-muted')}
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={connect}
      disabled={isConnecting || !isSupported}
      title={!isSupported ? 'Bluetooth tidak didukung di browser ini' : 'Hubungkan smartwatch / sensor detak jantung'}
      className={cn(pillClasses, 'disabled:opacity-50 disabled:cursor-not-allowed')}
    >
      {isConnecting ? (
        <BluetoothConnected className="w-4 h-4 animate-pulse" />
      ) : (
        <Bluetooth className="w-4 h-4" />
      )}
      <span className="text-sm font-medium">
        {isConnecting ? 'Menghubungkan...' : 'Hubungkan Heart Rate'}
      </span>
    </button>
  );
};

export default HeartRateMonitor;
