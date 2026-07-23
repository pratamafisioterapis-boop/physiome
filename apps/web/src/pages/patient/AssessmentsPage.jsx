import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { ClipboardList, ChevronLeft, ChevronRight, CheckCircle2, Loader2, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import apiServerClient from '@/lib/apiServerClient.js';
import { INSTRUMENTS, getInstrument } from '@/lib/promInstruments.js';

const AssessmentsPage = () => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = useState(null); // instrument being taken
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const loadHistory = async () => {
    try {
      const data = await apiServerClient.fetch('/prom-responses');
      setHistory(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error('Failed to load assessments:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { loadHistory(); }, []);

  const start = (instrument) => {
    setActive(instrument);
    setStep(0);
    setAnswers(new Array(instrument.questions.length).fill(null));
  };

  const choose = (value) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[step] = value;
      return next;
    });
  };

  const submit = async () => {
    setSubmitting(true);
    const result = active.score(answers);
    try {
      await apiServerClient.fetch('/prom-responses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instrument: active.id,
          score: result.score,
          max_score: result.max,
          interpretation: result.interpretation,
          answers,
        }),
      });
      toast.success(`${active.short} submitted — ${result.interpretation}`);
      setActive(null);
      setIsLoading(true);
      await loadHistory();
    } catch (e) {
      toast.error('Could not submit your assessment');
    } finally {
      setSubmitting(false);
    }
  };

  // ---- Taking an instrument ----
  if (active) {
    const q = active.questions[step];
    const isLast = step === active.questions.length - 1;
    const answered = answers[step] != null;
    const progress = Math.round(((step + (answered ? 1 : 0)) / active.questions.length) * 100);

    return (
      <div className="space-y-6 animate-in fade-in duration-300 pb-24 max-w-2xl mx-auto">
        <Helmet><title>{active.short} | Physiome</title></Helmet>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">{active.name}</h1>
            <p className="text-sm text-muted-foreground">Question {step + 1} of {active.questions.length}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setActive(null)}>Cancel</Button>
        </div>

        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>

        <Card className="border-0 shadow-soft">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">{q.text}</h2>
            <div className="space-y-2">
              {q.options.map((opt) => {
                const selected = answers[step] === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => choose(opt.value)}
                    className={`w-full text-left px-4 py-3 rounded-xl border transition-colors flex items-center gap-3 ${
                      selected ? 'border-primary bg-primary/10 text-foreground' : 'border-border hover:bg-muted/50 text-foreground/80'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center ${selected ? 'border-primary' : 'border-muted-foreground/40'}`}>
                      {selected && <span className="w-2.5 h-2.5 rounded-full bg-primary" />}
                    </span>
                    <span className="text-sm">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="gap-1">
            <ChevronLeft className="w-4 h-4" /> Back
          </Button>
          {isLast ? (
            <Button onClick={submit} disabled={!answered || submitting} className="gap-2">
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />} Submit
            </Button>
          ) : (
            <Button onClick={() => setStep((s) => s + 1)} disabled={!answered} className="gap-1">
              Next <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  // ---- List + history ----
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-24">
      <Helmet><title>Assessments | Physiome</title></Helmet>
      <header>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Assessments</h1>
        <p className="text-muted-foreground mt-1">Short questionnaires that help your therapist track your recovery.</p>
      </header>

      <section>
        <h2 className="text-lg font-bold mb-4">Available</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {INSTRUMENTS.map((inst) => (
            <Card key={inst.id} className="border-0 shadow-soft">
              <CardContent className="p-5 flex flex-col gap-3 h-full">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <ClipboardList className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold">{inst.name}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" /> ~{inst.estMinutes} min · {inst.region}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground flex-1">{inst.description}</p>
                <Button onClick={() => start(inst)} className="w-full">Start</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold mb-4">Your history</h2>
        {isLoading ? (
          <div className="h-24 flex items-center justify-center text-muted-foreground"><Loader2 className="w-5 h-5 animate-spin" /></div>
        ) : history.length === 0 ? (
          <Card className="border-dashed"><CardContent className="p-8 text-center text-muted-foreground text-sm">No assessments completed yet.</CardContent></Card>
        ) : (
          <div className="space-y-3">
            {history.map((r) => {
              const inst = getInstrument(r.instrument);
              return (
                <Card key={r.id} className="border-0 shadow-soft">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm">{inst?.name || r.instrument}</p>
                      <p className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold tabular-nums">{r.score}{r.max_score === 100 ? '%' : `/${r.max_score}`}</p>
                      <p className="text-xs text-muted-foreground">{r.interpretation}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default AssessmentsPage;
