import React, { createContext, useContext } from 'react';
import { useHeartRateMonitor } from '@/hooks/useHeartRateMonitor.js';

const HeartRateContext = createContext(null);

export const useHeartRate = () => {
  const context = useContext(HeartRateContext);
  if (!context) throw new Error('useHeartRate must be used within HeartRateProvider');
  return context;
};

// Kept at app level (not per-page) so the Bluetooth GATT connection survives
// navigation between the Account Settings page (where pairing happens) and
// the workout screen (where the live BPM is just displayed).
export const HeartRateProvider = ({ children }) => {
  const value = useHeartRateMonitor();
  return <HeartRateContext.Provider value={value}>{children}</HeartRateContext.Provider>;
};

export default HeartRateContext;
