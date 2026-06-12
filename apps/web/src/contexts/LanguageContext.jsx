import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { useTranslation } from "react-i18next";
import i18n from "@/lib/i18n.js";
import apiServerClient from "@/lib/apiServerClient.js";
import { useAuth } from "./AuthContext.jsx";

export const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const { i18n: i18nInstance } = useTranslation();

  const [language, setLanguageState] = useState(
    i18nInstance.language ||
      localStorage.getItem("i18nextLng") ||
      "en"
  );

  // 🔥 SYNC from backend
  const syncLanguagePreference = useCallback(async (userId) => {
    try {
      const res = await apiServerClient.fetch(
        `/user-preferences/language/${userId}`
      );

      if (res?.preferred_language) {
        const lng = res.preferred_language;

        i18nInstance.changeLanguage(lng);
        localStorage.setItem("i18nextLng", lng);
        setLanguageState(lng);
      }
    } catch (err) {
      console.error("Failed to sync language preference:", err);
    }
  }, [i18nInstance]);

  // 🔥 listen i18n change (single source of truth)
  useEffect(() => {
    const handleChange = (lng) => {
      setLanguageState(lng);
      localStorage.setItem("i18nextLng", lng);
    };

    i18nInstance.on("languageChanged", handleChange);

    return () => {
      i18nInstance.off("languageChanged", handleChange);
    };
  }, [i18nInstance]);

  // 🔥 sync user preference only when user changes
  useEffect(() => {
    if (currentUser?.id) {
      syncLanguagePreference(currentUser.id);
    }
  }, [currentUser, syncLanguagePreference]);

  // 🔥 SET LANGUAGE (single flow, no duplication)
  const setLanguage = useCallback(
    async (lng) => {
      try {
        await i18nInstance.changeLanguage(lng);

        setLanguageState(lng);
        localStorage.setItem("i18nextLng", lng);

        if (!currentUser?.id) return;

        const payload = {
          preferred_language: lng,
          app_language: lng,
          exercise_language: lng,
          reminder_language: lng,
        };

        const res = await apiServerClient.fetch(
          `/user-preferences/language/${currentUser.id}`
        );

        if (res) {
          await apiServerClient.fetch(
            `/user-preferences/language/${currentUser.id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            }
          );
        } else {
          await apiServerClient.fetch(
            `/user-preferences/language`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                user_id: currentUser.id,
                ...payload,
              }),
            }
          );
        }
      } catch (err) {
        console.error("Failed to set language:", err);
      }
    },
    [i18nInstance, currentUser]
  );

  // 🔥 MEMO VALUE (avoid unnecessary rerender)
  const value = useMemo(
    () => ({
      language,
      setLanguage,
    }),
    [language, setLanguage]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// helper hook
export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};