import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { CheckCircle2, ClipboardCheck, Loader2, PencilLine } from 'lucide-react';
import { toast } from 'sonner';
import apiServerClient from '@/lib/apiServerClient.js';
import Header from '@/components/Header.jsx';
import Sidebar from '@/components/Sidebar.jsx';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/billing.js';

const REVIEW_LABELS = {
  pending: 'Menunggu tinjauan',
  approved: 'Disetujui',
  modified: 'Disesuaikan',
  not_required: 'Tidak perlu ditinjau',
};

/**
 * Antrean tinjauan program yang dipilih sendiri oleh pasien B2C.
 *
 * Programnya sudah berjalan — pasien tidak mengantre — jadi halaman ini
 * adalah pengawasan susulan, bukan gerbang persetujuan.
 */
const SelfAssignedReviewPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [notes, setNotes] = useState({});

  const load = async () => {
    setIsLoading(true);
    try {
      const data = await apiServerClient.fetch('/program-assignments/self-review');
      setAssignments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to load review queue:', error);
      toast.error('Gagal memuat antrean tinjauan');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const submitReview = async (id, reviewStatus) => {
    setSavingId(id);
    try {
      await apiServerClient.fetch(`/program-assignments/self-review/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ review_status: reviewStatus, review_notes: notes[id] || '' }),
      });
      toast.success(reviewStatus === 'approved' ? 'Program disetujui' : 'Catatan tinjauan disimpan');
      await load();
    } catch (error) {
      toast.error(error.message || 'Gagal menyimpan tinjauan');
    } finally {
      setSavingId(null);
    }
  };

  const pending = assignments.filter((a) => a.review_status === 'pending');
  const reviewed = assignments.filter((a) => a.review_status !== 'pending');

  const renderCard = (assignment) => {
    const program = assignment.exercise_programs || {};
    const patient = assignment.patients || {};
    const isPending = assignment.review_status === 'pending';

    return (
      <div key={assignment.id} className="rounded-2xl border border-border bg-card p-5 space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-semibold">{patient.name || 'Pasien'}</h3>
            <p className="text-sm text-muted-foreground">{program.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Dimulai {formatDate(assignment.start_date)}
            </p>
          </div>
          <Badge variant={isPending ? 'secondary' : 'outline'}>
            {REVIEW_LABELS[assignment.review_status] || assignment.review_status}
          </Badge>
        </div>

        {patient.main_complaint && (
          <p className="text-sm"><span className="text-muted-foreground">Keluhan:</span> {patient.main_complaint}</p>
        )}
        {program.indication && (
          <p className="text-sm"><span className="text-muted-foreground">Indikasi program:</span> {program.indication}</p>
        )}

        {program.precautions && (
          <div className="rounded-lg bg-amber-50 p-3 text-xs text-amber-900 dark:bg-amber-950/40 dark:text-amber-100">
            <strong className="font-medium">Perhatian:</strong> {program.precautions}
          </div>
        )}
        {program.progression_criteria && (
          <p className="text-xs text-muted-foreground">
            <strong className="font-medium text-foreground">Kriteria progresi:</strong> {program.progression_criteria}
          </p>
        )}

        {isPending ? (
          <div className="space-y-3 border-t border-border pt-4">
            <textarea
              className="w-full rounded-lg border border-border bg-background p-3 text-sm"
              rows={2}
              placeholder="Catatan untuk pasien (opsional)"
              value={notes[assignment.id] ?? ''}
              onChange={(e) => setNotes((prev) => ({ ...prev, [assignment.id]: e.target.value }))}
            />
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                onClick={() => submitReview(assignment.id, 'approved')}
                disabled={savingId === assignment.id}
              >
                {savingId === assignment.id
                  ? <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  : <CheckCircle2 className="w-4 h-4 mr-2" />}
                Setujui
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => submitReview(assignment.id, 'modified')}
                disabled={savingId === assignment.id}
              >
                <PencilLine className="w-4 h-4 mr-2" />
                Tandai disesuaikan
              </Button>
            </div>
          </div>
        ) : assignment.review_notes ? (
          <p className="border-t border-border pt-3 text-sm text-muted-foreground">
            {assignment.review_notes}
          </p>
        ) : null}
      </div>
    );
  };

  return (
    <>
      <Helmet><title>Tinjauan Program Mandiri - Physiome</title></Helmet>

      <div className="min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1 ml-0 md:ml-64 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto space-y-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Tinjauan program mandiri</h1>
                <p className="text-muted-foreground mt-1">
                  Program yang dipilih sendiri oleh pasien. Programnya sudah berjalan —
                  tinjau dan sesuaikan bila perlu.
                </p>
              </div>

              {isLoading ? (
                <div className="flex justify-center py-16">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
              ) : assignments.length === 0 ? (
                <div className="rounded-2xl border border-border bg-card py-16 text-center">
                  <ClipboardCheck className="w-8 h-8 mx-auto text-muted-foreground/50" />
                  <p className="mt-3 text-sm text-muted-foreground">
                    Belum ada program yang dipilih sendiri oleh pasien.
                  </p>
                </div>
              ) : (
                <>
                  {pending.length > 0 && (
                    <section className="space-y-4">
                      <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                        Menunggu tinjauan ({pending.length})
                      </h2>
                      {pending.map(renderCard)}
                    </section>
                  )}
                  {reviewed.length > 0 && (
                    <section className="space-y-4">
                      <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                        Sudah ditinjau
                      </h2>
                      {reviewed.map(renderCard)}
                    </section>
                  )}
                </>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default SelfAssignedReviewPage;
