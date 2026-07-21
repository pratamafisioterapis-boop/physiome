
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { useLanguage } from '@/hooks/useLanguage.js';
import apiServerClient from '@/lib/apiServerClient.js';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Select from '@/components/Select.jsx';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner'; // Pastikan toast diimpor
import { Globe, Save, Loader2 } from 'lucide-react';

const PatientLanguageSettingsPage = () => {
  const { currentUser } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [prefs, setPrefs] = useState({
    preferred_language: language,
    app_language: language,
    exercise_language: language,
    reminder_language: language
  });

  useEffect(() => {
    const fetchPrefs = async () => {
      try {
        const pref = await apiServerClient.fetch(`/user-preferences/language/${currentUser.id}`);
        if (pref) {
          setPrefs({
            preferred_language: pref.preferred_language || 'en',
            app_language: pref.app_language || 'en',
            exercise_language: pref.exercise_language || 'en',
            reminder_language: pref.reminder_language || 'en'
          });
        }
      } catch (error) {
        console.error('Failed to fetch preferences', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (currentUser) fetchPrefs();
  }, [currentUser]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await apiServerClient.fetch(`/user-preferences/language/${currentUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prefs)
      });

      if (prefs.preferred_language !== language) {
        setLanguage(prefs.preferred_language);
      }
      
      toast.success('Language preferences saved successfully');
    } catch (error) {
      toast.error('Failed to save preferences');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <Helmet><title>Language Settings | Physiome</title></Helmet>
      
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <Globe className="w-8 h-8 text-primary" /> {t('nav.languageSettings')}
        </h1>
        <p className="text-muted-foreground mt-2">
          Customize your language experience across the app.
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : (
        <Card className="border-border shadow-soft-lg">
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Choose how you want to interact with Physiome.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">App Interface Language</label>
                <Select 
                  value={prefs.preferred_language} 
                  onValueChange={v => setPrefs({...prefs, preferred_language: v, app_language: v})}
                  options={[
                    { label: 'English', value: 'en' },
                    { label: 'Bahasa Indonesia', value: 'id' }
                  ]}
                  isSearchable={false}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Exercise Instructions Language</label>
                <Select 
                  value={prefs.exercise_language} 
                  onValueChange={v => setPrefs({...prefs, exercise_language: v})}
                  options={[
                    { label: 'English', value: 'en' },
                    { label: 'Bahasa Indonesia', value: 'id' }
                  ]}
                  isSearchable={false}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Notifications & Reminders</label>
                <Select 
                  value={prefs.reminder_language} 
                  onValueChange={v => setPrefs({...prefs, reminder_language: v})}
                  options={[
                    { label: 'English', value: 'en' },
                    { label: 'Bahasa Indonesia', value: 'id' }
                  ]}
                  isSearchable={false}
                />
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <Button onClick={handleSave} disabled={isSaving} className="w-full md:w-auto gap-2 shadow-glow-primary">
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {t('common.save')}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PatientLanguageSettingsPage;
