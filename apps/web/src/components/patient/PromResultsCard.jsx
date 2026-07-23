import React, { useState, useEffect } from 'react';
import { ClipboardList, TrendingDown, TrendingUp, Minus, Loader2 } from 'lucide-react';
import apiServerClient from '@/lib/apiServerClient.js';
import { getInstrument } from '@/lib/promInstruments.js';

// Clinician view: latest PROM score per instrument for a patient, with the
// direction of change vs the previous response (lower = better here).
const PromResultsCard = ({ patientId }) => {
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!patientId) return;
    (async () => {
      try {
        const data = await apiServerClient.fetch(`/prom-responses?patient_id=${patientId}`);
        setResponses(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error('Failed to load PROMs:', e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [patientId]);

  // Group by instrument, newest first (API already orders desc).
  const byInstrument = new Map();
  for (const r of responses) {
    if (!byInstrument.has(r.instrument)) byInstrument.set(r.instrument, []);
    byInstrument.get(r.instrument).push(r);
  }

  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <ClipboardList className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Outcome Measures</h3>
      </div>

      {isLoading ? (
        <div className="h-16 flex items-center justify-center text-muted-foreground"><Loader2 className="w-5 h-5 animate-spin" /></div>
      ) : byInstrument.size === 0 ? (
        <p className="text-sm text-muted-foreground">No assessments submitted yet. Ask the patient to complete one from their app.</p>
      ) : (
        <div className="space-y-3">
          {[...byInstrument.entries()].map(([id, list]) => {
            const inst = getInstrument(id);
            const latest = list[0];
            const prev = list[1];
            const delta = prev ? latest.score - prev.score : null;
            const improved = delta != null && delta < 0; // lower is better
            const Icon = delta == null || delta === 0 ? Minus : improved ? TrendingDown : TrendingUp;
            const tone = delta == null || delta === 0 ? 'text-muted-foreground' : improved ? 'text-emerald-600' : 'text-red-600';
            return (
              <div key={id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                <div>
                  <p className="font-medium text-sm">{inst?.name || id}</p>
                  <p className="text-xs text-muted-foreground">{latest.interpretation} · {new Date(latest.created_at).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold tabular-nums">{latest.score}{Number(latest.max_score) === 100 ? '%' : `/${latest.max_score}`}</span>
                  <span className={`inline-flex items-center gap-1 text-xs font-medium ${tone}`}>
                    <Icon className="w-4 h-4" />
                    {delta != null && delta !== 0 ? `${delta > 0 ? '+' : ''}${delta}` : '—'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PromResultsCard;
