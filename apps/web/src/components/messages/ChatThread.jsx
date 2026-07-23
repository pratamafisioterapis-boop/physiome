import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Send, Loader2, MessageSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import apiServerClient from '@/lib/apiServerClient.js';
import { toast } from 'sonner';

// Shared chat surface for both the patient portal (no patientId → server
// resolves the caller's own thread) and the clinician side (patientId set).
// Access is via the "api" Edge Function; there is no anon table access, so we
// poll every few seconds rather than using Supabase Realtime.
const ChatThread = ({ patientId = null, emptyHint }) => {
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const scrollRef = useRef(null);
  const query = patientId ? `?patient_id=${patientId}` : '';

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    });
  };

  const load = useCallback(async ({ silent } = {}) => {
    try {
      const data = await apiServerClient.fetch(`/messages${query}`);
      setMessages(Array.isArray(data) ? data : []);
    } catch (error) {
      if (!silent) console.error('Failed to load messages:', error);
    } finally {
      if (!silent) setIsLoading(false);
    }
  }, [query]);

  useEffect(() => {
    setIsLoading(true);
    load();
    const interval = setInterval(() => load({ silent: true }), 5000);
    return () => clearInterval(interval);
  }, [load]);

  useEffect(() => { scrollToBottom(); }, [messages.length]);

  const handleSend = async (e) => {
    e?.preventDefault();
    const text = draft.trim();
    if (!text || isSending) return;
    setIsSending(true);

    // Optimistic bubble so the UI feels instant.
    const optimistic = {
      id: `temp-${Date.now()}`,
      body: text,
      sender_role: patientId ? 'clinician' : 'patient',
      created_at: new Date().toISOString(),
      _optimistic: true,
    };
    setMessages(prev => [...prev, optimistic]);
    setDraft('');

    try {
      await apiServerClient.fetch('/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patientId ? { patient_id: patientId, body: text } : { body: text }),
      });
      await load({ silent: true });
    } catch (error) {
      toast.error('Message failed to send');
      setMessages(prev => prev.filter(m => m.id !== optimistic.id));
      setDraft(text);
    } finally {
      setIsSending(false);
    }
  };

  // "patient" bubbles sit on the patient's right; clinician bubbles on the
  // clinician's right. We anchor "mine" using the same rule the server uses.
  const mineRole = patientId ? 'clinician' : 'patient';

  return (
    <div className="flex flex-col h-full min-h-0">
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-background/50 min-h-0">
        {isLoading ? (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground gap-2 px-6">
            <MessageSquare className="w-10 h-10 opacity-40" />
            <p className="text-sm">{emptyHint || 'No messages yet. Say hello to start the conversation.'}</p>
          </div>
        ) : (
          messages.map((msg) => {
            const mine = msg.sender_role === mineRole;
            return (
              <div key={msg.id} className={`flex flex-col ${mine ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[80%] md:max-w-[65%] rounded-2xl p-3 px-4 ${
                  mine ? 'bg-primary text-primary-foreground rounded-br-sm' : 'bg-muted text-foreground rounded-bl-sm'
                } ${msg._optimistic ? 'opacity-60' : ''}`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{msg.body}</p>
                </div>
                <span className="text-[10px] text-muted-foreground mt-1 px-1">
                  {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            );
          })
        )}
      </div>

      <form onSubmit={handleSend} className="p-4 border-t border-border bg-card shrink-0">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Type a message..."
            className="flex-1 rounded-full bg-muted/50 border-transparent h-11"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
          <Button type="submit" size="icon" className="rounded-full h-11 w-11 shrink-0 shadow-glow-primary" disabled={isSending || !draft.trim()}>
            {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 ml-0.5" />}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatThread;
