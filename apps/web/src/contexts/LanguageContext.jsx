
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '@/lib/i18n.js';
import apiServerClient from '@/lib/apiServerClient.js'; // Import apiServerClient
import { useAuth } from './AuthContext.jsx'; // Import useAuth to get currentUser

export const LanguageContext = createContext(null);

export const syncLanguagePreference = async (userId) => {
  try {
    // Fetch language preferences from the new backend API
    const response = await apiServerClient.fetch(`/user-preferences/language/${userId}`);
    
    if (response && response.preferred_language) {
      const lng = response.preferred_language;
      i18n.changeLanguage(lng);
      localStorage.setItem('i18nextLng', lng);
    }
  } catch (error) {
    console.error('Failed to sync language preference:', error);
  }
};

export const LanguageProvider = ({ children }) => {
  const { currentUser } = useAuth(); // Get currentUser from AuthContext
  const { t, i18n: i18nInstance } = useTranslation();
  const [language, setLanguageState] = useState(i18nInstance.language || localStorage.getItem('i18nextLng') || 'en');

  useEffect(() => {
    const handleLangChange = (lng) => setLanguageState(lng);
    i18nInstance.on('languageChanged', handleLangChange);
    // If currentUser changes, re-sync language preference
    if (currentUser) {
      syncLanguagePreference(currentUser.id);
    }
    return () => i18nInstance.off('languageChanged', handleLangChange);
  }, [i18nInstance, currentUser]); // Add currentUser to dependencies

  const setLanguage = async (lng) => {
    i18nInstance.changeLanguage(lng);
    setLanguageState(lng);
    localStorage.setItem('i18nextLng', lng);
    
    if (currentUser) {
      try {
        // Check if preference already exists
        const existingPreference = await apiServerClient.fetch(`/user-preferences/language/${currentUser.id}`);
        
        const languageData = {
          preferred_language: lng,
          app_language: lng,
          exercise_language: lng,
          reminder_language: lng
        }

        if (existingPreference) {
          // Update existing preference
          await apiServerClient.fetch(`/user-preferences/language/${currentUser.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(languageData)
          });
        } else {
          // Create new preference
          await apiServerClient.fetch('/user-preferences/language', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: currentUser.id, ...languageData })
          });
        }
      } catch (error) {
        console.error('Failed to save language preference:', error);
      }
    }
  };

  const getLanguage = () => language;
  const getCurrentLanguage = () => language;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, getLanguage, getCurrentLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
