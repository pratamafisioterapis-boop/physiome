import { useCallback, useEffect, useRef, useState } from 'react';

const HEART_RATE_SERVICE = 'heart_rate';
const HEART_RATE_MEASUREMENT_CHARACTERISTIC = 'heart_rate_measurement';

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
  };
};

export default useHeartRateMonitor;
