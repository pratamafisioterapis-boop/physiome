
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import apiServerClient from '@/lib/apiServerClient.js';
import Header from '@/components/Header.jsx';
import Sidebar from '@/components/Sidebar.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Globe, Download, Upload, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const LanguageManagementPage = () => {
  const [status, setStatus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const records = await apiServerClient.fetch('/translation-status');
        setStatus(records || []);
      } catch (error) {
        toast.error('Failed to load translation status');
      } finally {
        setIsLoading(false);
      }
    };
    fetchStatus();
  }, []);

  return (
    <>
      <Helmet><title>Language Management | Admin</title></Helmet>
      <div className="min-h-screen bg-background flex flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                    <Globe className="w-8 h-8 text-primary" /> Language Management
                  </h1>
                  <p className="text-muted-foreground mt-2">
                    Monitor and manage platform translations and localization.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="gap-2"><Download className="w-4 h-4" /> Export</Button>
                  <Button className="gap-2"><Upload className="w-4 h-4" /> Import</Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-border shadow-sm">
                  <CardContent className="p-6">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Active Languages</p>
                    <h3 className="text-3xl font-bold">2</h3>
                  </CardContent>
                </Card>
                <Card className="border-border shadow-sm">
                  <CardContent className="p-6">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Total Translation Keys</p>
                    <h3 className="text-3xl font-bold">1,248</h3>
                  </CardContent>
                </Card>
                <Card className="border-border shadow-sm">
                  <CardContent className="p-6">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Missing Translations</p>
                    <h3 className="text-3xl font-bold text-orange-500">42</h3>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-border shadow-sm">
                <CardHeader>
                  <CardTitle>Translation Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {isLoading ? (
                    <p className="text-muted-foreground">Loading status...</p>
                  ) : status.length > 0 ? (
                    status.map(lang => (
                      <div key={lang.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold uppercase">{lang.language_code}</span>
                            {lang.completion_percentage < 100 && <AlertCircle className="w-4 h-4 text-orange-500" />}
                          </div>
                          <span className="text-sm font-medium">{lang.completion_percentage}%</span>
                        </div>
                        <Progress value={lang.completion_percentage} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          {lang.translated_fields} of {lang.total_fields} fields translated
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="space-y-6">
                      {/* Mock data if DB is empty for demo */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold uppercase">EN (English)</span>
                          <span className="text-sm font-medium">100%</span>
                        </div>
                        <Progress value={100} className="h-2" />
                        <p className="text-xs text-muted-foreground">1,248 of 1,248 fields translated</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold uppercase">ID (Bahasa Indonesia)</span>
                            <AlertCircle className="w-4 h-4 text-orange-500" />
                          </div>
                          <span className="text-sm font-medium">96%</span>
                        </div>
                        <Progress value={96} className="h-2" />
                        <p className="text-xs text-muted-foreground">1,206 of 1,248 fields translated</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default LanguageManagementPage;
