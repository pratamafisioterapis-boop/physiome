import { useCallback, useEffect, useState } from 'react';
import apiServerClient from '@/lib/apiServerClient.js';

// Public VAPID key — safe to ship client-side (that's the point of the
// "public" half of a VAPID key pair). The private key lives only as a
// Supabase Edge Function secret.
const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY
  || 'BFVx-n_52FbpQGzm9L_QtCVCJr21N2HVsZ7hhekgaah2SKH3usyveXzEcnf_AZhzIAtZCPKv7ZgwR5vUEmTlaZ0';

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

export const isPushSupported = () =>
  typeof window !== 'undefined' && 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;

// Subscribes the current device to Web Push so the user gets a system
// notification when a new chat message arrives (clinician <-> patient),
// even when the app isn't the focused tab.
export const usePushNotifications = () => {
  const [permission, setPermission] = useState(isPushSupported() ? Notification.permission : 'unsupported');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const subscribe = useCallback(async () => {
    if (!isPushSupported()) return;
    setIsSubscribing(true);
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      if (result !== 'granted') return;

      const registration = await navigator.serviceWorker.ready;
      let subscription = await registration.pushManager.getSubscription();
      if (!subscription) {
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
        });
      }

      const { endpoint, keys } = subscription.toJSON();
      await apiServerClient.fetch('/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpoint, keys }),
      });
    } catch (error) {
      console.error('Push subscription failed:', error);
    } finally {
      setIsSubscribing(false);
    }
  }, []);

  // Re-confirm the subscription with the backend on mount if the user has
  // already granted permission in a previous visit — no extra prompt.
  useEffect(() => {
    if (isPushSupported() && Notification.permission === 'granted') {
      subscribe();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { permission, isSubscribing, subscribe, isSupported: isPushSupported() };
};

export default usePushNotifications;
