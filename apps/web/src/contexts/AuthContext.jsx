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
  
  const signup = async (clinicName, fullName, email, password, inviteCode, packagePlan, paymentMethod) => {
    try {
      // Use the backend registration endpoint to handle invite code validation and user creation
      const { token, user } = await apiServerClient.fetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          clinicName,
          email, 
          password, 
          fullName, 
          inviteCode: inviteCode || undefined,
          packagePlan: packagePlan || 'demo-14',
          paymentMethod: paymentMethod || 'transfer'
        })
      });

      // Simpan token ke localStorage (sama seperti logika login)
      localStorage.setItem('auth_token', token);
      setCurrentUser(user);

      return { user, clinicName };
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
      setCurrentUser(updated);
      return updated;
    } catch (error) {
      console.error('Failed to update user clinic ID:', error);
      throw error;
    }
  };
  
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
  
  const value = {
    currentUser,
    isAuthenticated,
    initialLoading,
    login,
    signup,
    logout,
    forgotPassword,
    resetPassword,
    updateUserClinicId,
    refreshUser
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
