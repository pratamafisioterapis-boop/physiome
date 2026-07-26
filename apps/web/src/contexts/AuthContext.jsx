import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import apiServerClient from '@/lib/apiServerClient.js';
// import { syncLanguagePreference } from '@/contexts/LanguageContext.jsx';
import { toast } from 'sonner';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

  // /auth/update-profile tidak mengembalikan blok subscription, jadi
  // setCurrentUser(response) polos akan menghapusnya dari state. Merge ini
  // mempertahankan field yang tidak dikirim endpoint bersangkutan.
  const mergeCurrentUser = useCallback((patch) => {
    setCurrentUser((prev) => (prev ? { ...prev, ...patch } : patch));
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        try {
          const user = await apiServerClient.fetch('/auth/me');
          setCurrentUser(user);
        } catch (error) {
          console.error('Session expired or invalid token:', error);
          localStorage.removeItem('auth_token');
          setCurrentUser(null);
          toast.error('Your session has expired. Please log in again.');
        }
      } else {
        setCurrentUser(null);
      }
      setInitialLoading(false);
    };

    initAuth();
  }, []);
  
  const login = async (email, password) => {
    try {
      const { token, user } = await apiServerClient.fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      // Save token for future API calls
      localStorage.setItem('auth_token', token);
      setCurrentUser(user);
      return user;
    } catch (error) {
      setCurrentUser(null);
      throw error;
    }
  };
  
  const signup = async ({ accountType, clinicName, fullName, email, password, phone, inviteCode, packagePlan, alsoPractises }) => {
    try {
      // Use the backend registration endpoint to handle invite code validation and user creation
      const { token, user, checkoutPlanCode } = await apiServerClient.fetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accountType,
          clinicName,
          email,
          password,
          fullName,
          phone: phone || undefined,
          inviteCode: inviteCode || undefined,
          packagePlan: packagePlan || 'demo-14',
          alsoPractises: alsoPractises !== false
        })
      });

      // Simpan token ke localStorage (sama seperti logika login)
      localStorage.setItem('auth_token', token);
      setCurrentUser(user);

      return { user, clinicName, checkoutPlanCode };
    } catch (error) {
      setCurrentUser(null);
      throw error;
    }
  };
  
  const forgotPassword = async (email) => {
    return apiServerClient.fetch('/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, redirectTo: `${window.location.origin}/reset-password` })
    });
  };

  const resetPassword = async (accessToken, password) => {
    return apiServerClient.fetch('/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accessToken, password })
    });
  };

  const logout = useCallback(() => {
    localStorage.removeItem('auth_token');
    setCurrentUser(null);
  }, []);
  
  const updateUserClinicId = async (clinicId) => {
    try {
      const updated = await apiServerClient.fetch('/auth/update-profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clinic_id: clinicId })
      });
      mergeCurrentUser(updated);
      return updated;
    } catch (error) {
      console.error('Failed to update user clinic ID:', error);
      throw error;
    }
  };

  const updateProfile = async (fields) => {
    const updated = await apiServerClient.fetch('/auth/update-profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields)
    });
    mergeCurrentUser(updated);
    return updated;
  };

  // Dipanggil halaman status pembayaran setelah settlement, supaya banner dan
  // gerbang tulis langsung terbuka tanpa perlu login ulang.
  const refreshSubscription = useCallback(async () => {
    if (!localStorage.getItem('auth_token')) return null;
    try {
      const subscription = await apiServerClient.fetch('/subscription/me');
      mergeCurrentUser({ subscription });
      return subscription;
    } catch (error) {
      console.error('Failed to refresh subscription:', error);
      return null;
    }
  }, [mergeCurrentUser]);

  // Server membalas 402 untuk setiap tulis yang ditolak. Menangkapnya di satu
  // tempat berarti tombol yang belum memakai WriteGuard tetap memberi pesan
  // yang benar, dan status langganan di state ikut disegarkan supaya banner
  // langsung menyesuaikan.
  useEffect(() => {
    const handler = (event) => {
      const detail = event.detail || {};
      toast.error(detail.message || 'Langganan Anda tidak aktif. Perpanjang untuk melanjutkan.');
      if (detail.code === 'subscription_required') refreshSubscription();
    };
    window.addEventListener('physiome:subscription-required', handler);
    return () => window.removeEventListener('physiome:subscription-required', handler);
  }, [refreshSubscription]);

  const refreshUser = async () => {
    const token = localStorage.getItem('auth_token');
    if (currentUser && token) {
      try {
        const updated = await apiServerClient.fetch('/auth/me');
        setCurrentUser(updated);
      } catch (error) {
        console.error('Failed to refresh user data:', error);
      }
    }
  };
  
  // Menggunakan useMemo untuk nilai yang dihitung agar referensi stabil
  const isAuthenticated = React.useMemo(
    () => !!currentUser && !!localStorage.getItem('auth_token'),
    [currentUser]
  );

  const subscription = currentUser?.subscription ?? null;

  // Fail-open di klien: server yang otoritatif dan membalas 402 kalau tulis
  // ditolak. Kalau state langganan belum sempat termuat, UI tidak boleh
  // menonaktifkan tombol dan membuat aplikasi tampak rusak.
  const canWrite = React.useMemo(() => {
    if (currentUser?.role === 'super_admin') return true;
    if (!subscription || subscription.enforced === false) return true;
    return subscription.canWrite !== false;
  }, [currentUser, subscription]);

  const value = {
    currentUser,
    isAuthenticated,
    initialLoading,
    subscription,
    canWrite,
    login,
    signup,
    logout,
    forgotPassword,
    resetPassword,
    updateUserClinicId,
    updateProfile,
    refreshUser,
    refreshSubscription
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
