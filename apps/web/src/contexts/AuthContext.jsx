
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import apiServerClient from '@/lib/apiServerClient.js';
import { syncLanguagePreference } from './LanguageContext.jsx'; // Corrected import path
import { toast } from 'sonner';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('auth_token');
      
      if (token) {
        try {
          // Panggil endpoint /me di backend MySQL untuk verifikasi token & ambil data user
          const user = await apiServerClient.fetch('/auth/me');
          if (user && user.id) {
            setCurrentUser(user);
            syncLanguagePreference(user.id);
          }
        } catch (error) {
          console.error('Session expired or invalid token:', error);
          localStorage.removeItem('auth_token');
          setCurrentUser(null);
          if (error.message.includes('401') || error.message.includes('403')) {
            toast.error('Sesi Anda telah berakhir. Silakan login kembali.');
          }
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
      const response = await apiServerClient.fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      // apiServerClient.fetch sekarang akan melempar error jika response.ok false
      // dan mengembalikan JSON jika response.ok true
      if (response.token && response.user) {
        localStorage.setItem('auth_token', response.token); // Simpan token
        setCurrentUser(response.user); // Set user
        await syncLanguagePreference(response.user.id); // Sinkronkan preferensi bahasa
        return response.user; // Kembalikan data user
      }
      throw new Error('Invalid response from server');
    } catch (error) {
      localStorage.removeItem('auth_token');
      setCurrentUser(null);
      throw error;
    }
  };
  
  const signup = async (clinicName, fullName, email, password, inviteCode) => {
    try {
      // Panggil endpoint register di backend MySQL
      const response = await apiServerClient.fetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          password, 
          fullName, 
          inviteCode: inviteCode || undefined 
        })
      });

      // Setelah register berhasil, langsung login untuk mendapatkan token
      const userData = await login(email, password);
      
      return { user: userData, clinicName };
    } catch (error) {
      localStorage.removeItem('auth_token');
      setCurrentUser(null);
      throw error;
    }
  };
  
  const logout = useCallback(() => {
    localStorage.removeItem('auth_token');
    setCurrentUser(null);
  }, []);
  
  const updateUserClinicId = async (clinicId) => {
    try {
      // Refactor ke endpoint API kustom jika perlu update clinic_id
      const updated = await apiServerClient.fetch(`/users/${currentUser.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ clinic_id: clinicId })
      });
      setCurrentUser(updated);
      return updated;
    } catch (error) {
      console.error('Failed to update user clinic ID:', error);
      throw error;
    }
  };
  
  const refreshUser = async () => {
    if (currentUser && localStorage.getItem('auth_token')) {
      try {
        const updated = await apiServerClient.fetch('/auth/me');
        setCurrentUser(updated);
      } catch (error) {
        console.error('Failed to refresh user data:', error);
      }
    }
  };
  
  const isAuthenticated = useMemo(() => !!currentUser && !!localStorage.getItem('auth_token'), [currentUser]);
  
  const value = {
    currentUser,
    isAuthenticated,
    initialLoading,
    login,
    signup,
    logout,
    updateUserClinicId,
    refreshUser
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
