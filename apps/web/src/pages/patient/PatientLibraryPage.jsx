import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ArrowRight, Loader2, ShieldCheck, Stethoscope } from 'lucide-react';
import { toast } from 'sonner';
import apiServerClient from '@/lib/apiServerClient.js';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

/**
 * Katalog program latihan untuk pasien yang mendaftar langsung.
 *
 * Gerbangnya berlapis dan urutannya disengaja: skrining red flag dulu, lalu
 * pernyataan persetujuan, baru katalog terbuka. Ada red flag berarti jalur
 * mandiri ditutup dan pasien diarahkan ke fisioterapis — bukan ditawari
 * program dengan peringatan.
 *
 * Setelah program dipilih, program langsung aktif (pasien tidak mengantre)
 * tetapi masuk antrean tinjauan terapis Kaffah.
 */
const PatientLibraryPage = () => {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
  const [screening, setScreening] = useState(null);
  const [cleared, setCleared] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startingId, setStartingId] = useState(null);

  const loadScreening = useCallback(async () => {
    const data = await apiServerClient.fetch('/screening/me');
    setQuestions(data.questions || []);
    setScreening(data.screening || null);
    setCleared(Boolean(data.cleared));
    return Boolean(data.cleared);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setIsLoading(true);
      try {
        const isCleared = await loadScreening();
        if (cancelled) return;
        if (isCleared) {
          const list = await apiServerClient.fetch('/exercise-programs/templates');
          if (!cancelled) setPrograms(Array.isArray(list) ? list : []);
        }
      } catch (error) {
        console.error('Failed to load library:', error);
        toast.error('Gagal memuat katalog latihan');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [loadScreening]);

  const handleSubmitScreening = async () => {
    if (!disclaimerAccepted) {
      toast.error('Anda perlu menyetujui pernyataan terlebih dahulu.');
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await apiServerClient.fetch('/screening', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers, disclaimerAccepted: true }),
      });
      setScreening(result.screening);
      setCleared(Boolean(result.cleared));
      if (result.cleared) {
        const list = await apiServerClient.fetch('/exercise-programs/templates');
        setPrograms(Array.isArray(list) ? list : []);
      }
    } catch (error) {
      toast.error(error.message || 'Gagal mengirim skrining');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStart = async (programId) => {
    setStartingId(programId);
    try {
      await apiServerClient.fetch('/program-assignments/self', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ program_id: programId }),
      });
      toast.success('Program dimulai. Fisioterapis Kaffah akan meninjaunya.');
      navigate('/patient/programs');
    } catch (error) {
      if (error.status === 402) {
        toast.error('Langganan Anda tidak aktif. Perpanjang untuk memulai program.');
        navigate('/billing');
        return;
      }
      toast.error(error.message || 'Gagal memulai program');
    } finally {
      setStartingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Ada red flag: jalur mandiri ditutup.
  if (screening && !screening.cleared) {
    return (
      <>
        <Helmet><title>Katalog Latihan - Physiome</title></Helmet>
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-900 dark:bg-amber-950/40">
            <div className="flex gap-3">
              <Stethoscope className="w-6 h-6 shrink-0 text-amber-600 dark:text-amber-400" />
              <div className="space-y-2">
                <h1 className="font-semibold text-amber-900 dark:text-amber-100">
                  Sebaiknya diperiksa fisioterapis dulu
                </h1>
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  Berdasarkan jawaban skrining Anda, kondisi ini perlu diperiksa langsung
                  sebelum memulai latihan mandiri. Ini bukan berarti kondisi Anda berbahaya —
                  hanya saja latihan mandiri bukan langkah pertama yang tepat.
                </p>
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  Silakan hubungi kami untuk konsultasi dengan fisioterapis Kaffah.
                </p>
              </div>
            </div>
          </div>

          <Button variant="outline" onClick={() => { setScreening(null); setAnswers({}); setDisclaimerAccepted(false); }}>
            Ulangi skrining
          </Button>
        </div>
      </>
    );
  }

  // Belum skrining.
  if (!cleared) {
    return (
      <>
        <Helmet><title>Skrining Keamanan - Physiome</title></Helmet>
        <div className="max-w-2xl mx-auto space-y-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Skrining keamanan</h1>
            <p className="text-muted-foreground mt-1">
              Beberapa pertanyaan singkat sebelum Anda memilih program latihan.
              Jawab sejujurnya — ini untuk keselamatan Anda.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card divide-y divide-border">
            {questions.map((q) => (
              <label key={q.id} className="flex items-start gap-3 p-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={answers[q.id] === true}
                  onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.checked }))}
                  className="mt-0.5 rounded border-border"
                />
                <span className="text-sm">{q.label}</span>
              </label>
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-muted/40 p-5 space-y-3">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Program latihan di Physiome bersifat edukatif dan bukan pengganti pemeriksaan
                fisioterapis. Hentikan latihan bila nyeri memberat, muncul kebas, atau Anda
                merasa tidak nyaman, lalu hubungi fisioterapis Anda.
              </p>
            </div>
            <label className="flex items-start gap-2.5 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={disclaimerAccepted}
                onChange={(e) => setDisclaimerAccepted(e.target.checked)}
                className="mt-0.5 rounded border-border"
              />
              <span>Saya memahami dan menyetujui pernyataan di atas.</span>
            </label>
          </div>

          <Button onClick={handleSubmitScreening} disabled={isSubmitting || !disclaimerAccepted}>
            {isSubmitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Mengirim…</> : 'Lanjutkan'}
          </Button>
        </div>
      </>
    );
  }

  // Lolos skrining: katalog terbuka.
  return (
    <>
      <Helmet><title>Katalog Latihan - Physiome</title></Helmet>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Katalog program latihan</h1>
          <p className="text-muted-foreground mt-1">
            Pilih program yang paling sesuai dengan keluhan Anda. Fisioterapis Kaffah
            akan meninjau pilihan Anda dan menyesuaikannya bila perlu.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-2.5 text-sm text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          Skrining keamanan selesai.
        </div>

        {programs.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted-foreground">
            Belum ada program di katalog umum.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {programs.map((program) => (
              <div key={program.id} className="flex flex-col rounded-2xl border border-border bg-card p-5">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-semibold">{program.name}</h2>
                  {program.difficulty && <Badge variant="outline">{program.difficulty}</Badge>}
                </div>

                {program.indication && (
                  <p className="mt-1.5 text-sm text-muted-foreground">{program.indication}</p>
                )}

                <dl className="mt-3 space-y-1 text-xs text-muted-foreground">
                  {program.phase && <div>Fase: {program.phase}</div>}
                  {program.frequency && <div>Frekuensi: {program.frequency}</div>}
                  <div>{program.exercisesCount} latihan</div>
                </dl>

                {program.precautions && (
                  <div className="mt-3 rounded-lg bg-amber-50 p-3 text-xs text-amber-900 dark:bg-amber-950/40 dark:text-amber-100">
                    <strong className="font-medium">Perhatian:</strong> {program.precautions}
                  </div>
                )}

                <Button
                  className="mt-4 w-full"
                  onClick={() => handleStart(program.id)}
                  disabled={startingId === program.id}
                >
                  {startingId === program.id ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Memulai…</>
                  ) : (
                    <>Mulai program ini <ArrowRight className="w-4 h-4 ml-2" /></>
                  )}
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PatientLibraryPage;
