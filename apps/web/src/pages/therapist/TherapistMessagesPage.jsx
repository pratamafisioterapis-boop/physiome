import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '@/components/Sidebar.jsx';
import Header from '@/components/Header.jsx';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageSquare, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils.js';
import apiServerClient from '@/lib/apiServerClient.js';
import ChatThread from '@/components/messages/ChatThread.jsx';

const initials = (name = '') => name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() || '?';

const TherapistMessagesPage = () => {
  const [threads, setThreads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const loadThreads = useCallback(async ({ silent } = {}) => {
    try {
      const data = await apiServerClient.fetch('/messages/threads');
      const list = Array.isArray(data) ? data : [];
      setThreads(list);
      setSelected(prev => prev ?? list[0]?.patient_id ?? null);
    } catch (error) {
      if (!silent) console.error('Failed to load threads:', error);
    } finally {
      if (!silent) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadThreads();
    const interval = setInterval(() => loadThreads({ silent: true }), 8000);
    return () => clearInterval(interval);
  }, [loadThreads]);

  const activeThread = threads.find(t => t.patient_id === selected);

  return (
    <>
      <Helmet><title>Messages - Physiome</title></Helmet>
      <div className="min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1 ml-0 md:ml-64 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-hidden">
            <div className="max-w-7xl mx-auto h-[calc(100vh-9rem)] flex flex-col">
              <div className="mb-4 shrink-0">
                <h1 className="text-3xl font-bold text-foreground tracking-tight">Messages</h1>
                <p className="text-muted-foreground mt-1">Stay connected with your patients between visits.</p>
              </div>

              <Card className="flex-1 grid grid-cols-1 md:grid-cols-[320px_1fr] overflow-hidden border-border min-h-0">
                {/* Thread list */}
                <div className="border-r border-border flex flex-col min-h-0 bg-muted/20">
                  {isLoading ? (
                    <div className="flex-1 flex items-center justify-center text-muted-foreground">
                      <Loader2 className="w-5 h-5 animate-spin" />
                    </div>
                  ) : threads.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center text-muted-foreground gap-2 p-6">
                      <MessageSquare className="w-9 h-9 opacity-40" />
                      <p className="text-sm">No conversations yet. Patients will appear here once they message you.</p>
                    </div>
                  ) : (
                    <div className="flex-1 overflow-y-auto">
                      {threads.map((t) => (
                        <button
                          key={t.patient_id}
                          onClick={() => setSelected(t.patient_id)}
                          className={cn(
                            'w-full text-left px-4 py-3 flex items-center gap-3 border-b border-border/60 transition-colors',
                            selected === t.patient_id ? 'bg-primary/10' : 'hover:bg-muted/50'
                          )}
                        >
                          <Avatar className="shrink-0">
                            <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">{initials(t.name)}</AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <p className="font-semibold text-sm truncate text-foreground">{t.name}</p>
                              {t.unread > 0 && (
                                <span className="shrink-0 bg-primary text-primary-foreground text-[10px] font-bold rounded-full min-w-[18px] h-[18px] px-1.5 flex items-center justify-center">
                                  {t.unread}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground truncate">{t.last_message}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Active conversation */}
                <div className="flex flex-col min-h-0">
                  {activeThread ? (
                    <>
                      <div className="p-4 border-b border-border flex items-center gap-3 bg-muted/30 shrink-0">
                        <Avatar>
                          <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">{initials(activeThread.name)}</AvatarFallback>
                        </Avatar>
                        <h3 className="font-semibold text-foreground">{activeThread.name}</h3>
                      </div>
                      <ChatThread patientId={activeThread.patient_id} />
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm p-6">
                      Select a conversation to start chatting.
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default TherapistMessagesPage;
