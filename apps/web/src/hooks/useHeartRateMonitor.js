import { useCallback, useEffect, useRef, useState } from 'react';

const HEART_RATE_SERVICE = 'heart_rate';
const HEART_RATE_MEASUREMENT_CHARACTERISTIC = 'heart_rate_measurement';

// Standard Bluetooth SIG GATT services relevant to fitness/health wearables.
// Web Bluetooth only allows reading services declared upfront here — it can't
// blindly enumerate a device's full GATT table (browser privacy restriction),
// so this is the widest "known fitness service" net we can cast for debugging
// devices (e.g. smartwatches) that don't advertise the plain heart_rate service.
const KNOWN_FITNESS_SERVICES = [
  'heart_rate',
  'battery_service',
  'device_information',
  'running_speed_and_cadence',
  'cycling_speed_and_cadence',
  'fitness_machine',
  'body_composition',
  'pulse_oximeter',
  'health_thermometer',
  'weight_scale',
];

// Parses the BLE Heart Rate Measurement characteristic per the Bluetooth SIG spec (0x2A37):
// flags byte determines whether the HR value is uint8 or uint16.
const parseHeartRateValue = (dataView) => {
  const flags = dataView.getUint8(0);
  const is16Bit = (flags & 0x1) !== 0;
  return is16Bit ? dataView.getUint16(1, true) : dataView.getUint8(1);
};

export const isWebBluetoothSupported = () =>
  typeof navigator !== 'undefined' && !!navigator.bluetooth;

export const useHeartRateMonitor = () => {
  const [heartRate, setHeartRate] = useState(null);
  const [deviceName, setDeviceName] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  const [debugScanResult, setDebugScanResult] = useState(null);
  const [isDebugScanning, setIsDebugScanning] = useState(false);
  const [debugError, setDebugError] = useState(null);

  const deviceRef = useRef(null);
  const characteristicRef = useRef(null);

  const handleDisconnected = useCallback(() => {
    setIsConnected(false);
    setHeartRate(null);
    characteristicRef.current = null;
  }, []);

  const handleHeartRateNotification = useCallback((event) => {
    setHeartRate(parseHeartRateValue(event.target.value));
  }, []);

  const disconnect = useCallback(() => {
    const characteristic = characteristicRef.current;
    if (characteristic) {
      characteristic.removeEventListener('characteristicvaluechanged', handleHeartRateNotification);
    }
    const device = deviceRef.current;
    if (device?.gatt?.connected) {
      device.gatt.disconnect();
    }
    handleDisconnected();
  }, [handleDisconnected, handleHeartRateNotification]);

  const connect = useCallback(async () => {
    if (!isWebBluetoothSupported()) {
      setError('Bluetooth tidak didukung di browser ini (iOS Safari belum mendukung Web Bluetooth).');
      return;
    }

    setError(null);
    setIsConnecting(true);

    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: [HEART_RATE_SERVICE] }],
      });

      deviceRef.current = device;
      device.addEventListener('gattserverdisconnected', handleDisconnected);

      const server = await device.gatt.connect();
      const service = await server.getPrimaryService(HEART_RATE_SERVICE);
      const characteristic = await service.getCharacteristic(HEART_RATE_MEASUREMENT_CHARACTERISTIC);
      characteristicRef.current = characteristic;

      characteristic.addEventListener('characteristicvaluechanged', handleHeartRateNotification);
      await characteristic.startNotifications();

      setDeviceName(device.name || 'Perangkat Bluetooth');
      setIsConnected(true);
    } catch (err) {
      if (err?.name !== 'NotFoundError') {
        setError(err?.message || 'Gagal menghubungkan ke perangkat.');
      }
      handleDisconnected();
    } finally {
      setIsConnecting(false);
    }
  }, [handleDisconnected, handleHeartRateNotification]);

  // Diagnostic scan for devices (e.g. smartwatches) that don't advertise the
  // plain heart_rate service. Connects without a service filter and reports
  // back which known fitness-related GATT services (if any) it exposes, so we
  // can tell whether the device is reachable at all via Web Bluetooth.
  const runDebugScan = useCallback(async () => {
    if (!isWebBluetoothSupported()) {
      setDebugError('Bluetooth tidak didukung di browser ini.');
      return;
    }

    setDebugError(null);
    setDebugScanResult(null);
    setIsDebugScanning(true);

    let device;
    try {
      device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: KNOWN_FITNESS_SERVICES,
      });

      // Some wearables (notably Samsung Galaxy Watch) accept the initial GATT
      // connection but drop it again a moment later before service discovery
      // completes — retry once before concluding the device refuses us.
      let server;
      let services;
      for (let attempt = 0; attempt < 2; attempt += 1) {
        server = await device.gatt.connect();
        try {
          services = await server.getPrimaryServices();
          break;
        } catch (err) {
          if (attempt === 1) throw err;
        }
      }

      const serviceDetails = await Promise.all(
        services.map(async (service) => {
          const characteristics = await service.getCharacteristics();
          return {
            uuid: service.uuid,
            characteristics: characteristics.map((c) => c.uuid),
          };
        })
      );

      setDebugScanResult({
        deviceName: device.name || 'Perangkat tanpa nama',
        services: serviceDetails,
      });

      server.disconnect();
    } catch (err) {
      if (err?.name === 'NotFoundError') {
        // user cancelled the device picker
      } else if (String(err?.message).includes('GATT Server is disconnected')) {
        setDebugError(
          `"${device?.name || 'Perangkat ini'}" memutus koneksi Bluetooth segera setelah dihubungkan, sebelum servisnya sempat terbaca. Ini indikasi kuat perangkat tersebut menolak koneksi dari aplikasi pihak ketiga (umum pada Samsung Galaxy Watch) — datanya memang tidak dibagikan lewat Bluetooth standar.`
        );
      } else {
        setDebugError(err?.message || 'Gagal memindai perangkat.');
      }
    } finally {
      setIsDebugScanning(false);
    }
  }, []);

  useEffect(() => {
    return () => {
      disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    heartRate,
    deviceName,
    isConnecting,
    isConnected,
    error,
    isSupported: isWebBluetoothSupported(),
    connect,
    disconnect,
    debugScanResult,
    isDebugScanning,
    debugError,
    runDebugScan,
  };
};

export default useHeartRateMonitor;
