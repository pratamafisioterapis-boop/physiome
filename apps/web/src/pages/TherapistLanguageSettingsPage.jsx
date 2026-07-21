
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { useLanguage } from '@/hooks/useLanguage.js';
import apiServerClient from '@/lib/apiServerClient.js';
import Header from '@/components/Header.jsx';
import Sidebar from '@/components/Sidebar.jsx';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Select from '@/components/Select.jsx';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner'; // Pastikan toast diimpor
import { Globe, Save, Loader2 } from 'lucide-react';

const TherapistLanguageSettingsPage = () => {
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

      // Update global context if preferred language changed
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
    <>
      <Helmet><title>Language Settings | Physiome</title></Helmet>
      <div className="min-h-screen bg-background flex flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1 ml-0 md:ml-64 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-3xl mx-auto space-y-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                  <Globe className="w-8 h-8 text-primary" /> Language Settings
                </h1>
                <p className="text-muted-foreground mt-2">
                  Configure your preferred languages for the interface, exercises, and patient communications.
                </p>
              </div>

              {isLoading ? (
                <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
              ) : (
                <Card className="border-border shadow-sm">
                  <CardHeader>
                    <CardTitle>Localization Preferences</CardTitle>
                    <CardDescription>These settings apply to your therapist dashboard.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Preferred Language (Global)</label>
                        <Select 
                          value={prefs.preferred_language} 
                          onValueChange={v => setPrefs({...prefs, preferred_language: v})}
                          options={[
                            { label: 'English', value: 'en' },
                            { label: 'Bahasa Indonesia', value: 'id' }
                          ]}
                          isSearchable={false}
                        />
                        <p className="text-xs text-muted-foreground">Main language for the application interface.</p>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Clinic Default Language</label>
                        <Select 
                          value={prefs.app_language} 
                          onValueChange={v => setPrefs({...prefs, app_language: v})}
                          options={[
                            { label: 'English', value: 'en' },
                            { label: 'Bahasa Indonesia', value: 'id' }
                          ]}
                          isSearchable={false}
                        />
                        <p className="text-xs text-muted-foreground">Default language for new patients.</p>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Exercise Content Language</label>
                        <Select 
                          value={prefs.exercise_language} 
                          onValueChange={v => setPrefs({...prefs, exercise_language: v})}
                          options={[
                            { label: 'English', value: 'en' },
                            { label: 'Bahasa Indonesia', value: 'id' }
                          ]}
                          isSearchable={false}
                        />
                        <p className="text-xs text-muted-foreground">Language used when assigning exercises.</p>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Notification Language</label>
                        <Select 
                          value={prefs.reminder_language} 
                          onValueChange={v => setPrefs({...prefs, reminder_language: v})}
                          options={[
                            { label: 'English', value: 'en' },
                            { label: 'Bahasa Indonesia', value: 'id' }
                          ]}
                          isSearchable={false}
                        />
                        <p className="text-xs text-muted-foreground">Language for automated reminders.</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border flex justify-end">
                      <Button onClick={handleSave} disabled={isSaving} className="gap-2">
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save Preferences
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default TherapistLanguageSettingsPage;
