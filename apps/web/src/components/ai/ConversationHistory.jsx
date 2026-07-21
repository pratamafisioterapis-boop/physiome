
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { History, ChevronLeft, ChevronRight, Brain, Trash2, Calendar } from 'lucide-react';
import apiServerClient from '@/lib/apiServerClient.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { toast } from 'sonner';

const ConversationHistory = ({ onSelectHistory }) => {
  const { currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(true);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHistory = async () => {
    if (!currentUser?.clinic_id) return;
    try {
      const records = await apiServerClient.fetch('/ai-generation-history');
      setHistory(records);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [currentUser]);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    try {
      await apiServerClient.fetch(`/ai-generation-history/${id}`, { method: 'DELETE' });
      setHistory(prev => prev.filter(h => h.id !== id));
      toast.success('History item removed');
    } catch (err) {
      toast.error('Failed to remove item');
    }
  };

  const handleClearAll = async () => {
    if(!window.confirm('Are you sure you want to clear all history?')) return;
    try {
      await apiServerClient.fetch('/ai-generation-history', { method: 'DELETE' });
      setHistory([]);
      toast.success('All history cleared');
    } catch (err) {
      toast.error('Failed to clear history');
    }
  };

  return (
    <div className={`relative flex h-full border-r bg-muted/20 transition-all duration-300 ${isOpen ? 'w-80' : 'w-16'}`}>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: '100%' }}
            exit={{ opacity: 0, width: 0 }}
            className="flex flex-col h-full overflow-hidden w-full"
          >
            <div className="p-4 border-b flex items-center justify-between shrink-0">
              <h2 className="font-semibold flex items-center gap-2 text-foreground">
                <History className="w-4 h-4" /> Generation History
              </h2>
            </div>
            
            <ScrollArea className="flex-1">
              <div className="p-3 space-y-3">
                {isLoading ? (
                  [...Array(3)].map((_, i) => <div key={i} className="h-24 bg-muted animate-pulse rounded-xl" />)
                ) : history.length === 0 ? (
                  <div className="text-center text-muted-foreground p-6 text-sm">
                    No generation history found.
                  </div>
                ) : (
                  history.map(item => (
                    <div 
                      key={item.id}
                      onClick={() => onSelectHistory && onSelectHistory(item)}
                      className="bg-card border rounded-xl p-4 cursor-pointer hover:border-primary/40 hover:shadow-sm transition-all group relative"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Brain className="w-3 h-3" /> {item.confidence_score}%
                        </span>
                        <button 
                          onClick={(e) => handleDelete(item.id, e)}
                          className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <h4 className="font-semibold text-foreground line-clamp-1 text-sm">{item.diagnosis}</h4>
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {new Date(item.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>

            {history.length > 0 && (
              <div className="p-4 border-t shrink-0">
                <Button variant="ghost" className="w-full text-muted-foreground hover:text-destructive text-sm" onClick={handleClearAll}>
                  Clear all history
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-1/2 -right-3 -translate-y-1/2 z-10">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-6 h-12 bg-background border shadow-md flex items-center justify-center rounded-full hover:bg-muted transition-colors"
        >
          {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>

      {!isOpen && (
        <div className="w-full h-full flex flex-col items-center py-6">
          <History className="w-5 h-5 text-muted-foreground mb-4" />
        </div>
      )}

    </div>
  );
};

export default ConversationHistory;
