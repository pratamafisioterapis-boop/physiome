
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header.jsx';
import Sidebar from '@/components/Sidebar.jsx';
import ProgressBar from '@/components/exercises/ProgressBar.jsx';
import apiServerClient from '@/lib/apiServerClient.js'; // Mengganti PocketBase dengan apiServerClient
import { Helmet } from 'react-helmet';
import { ArrowLeft, Target, Calendar as CalendarIcon, CheckCircle2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';

const PatientProgramTrackingPage = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [patient, setPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [exerciseLogs, setExerciseLogs] = useState([]);

  useEffect(() => {
    const fetchTracking = async () => {
      if (!patientId) return;
      try {
        // Fetch patient details
        const patientData = await apiServerClient.fetch(`/patients/${patientId}`);
        setPatient(patientData);

        // Fetch program assignments and exercise logs for this patient
        const [assignmentsData, logsData] = await Promise.all([
          apiServerClient.fetch(`/program-assignments?patient_id=${patientId}`),
          apiServerClient.fetch(`/exercise-logs?patient_id=${patientId}`)
        ]);
        
        // Ambil detail nama program untuk setiap assignment
        const assignmentsWithProgramNames = await Promise.all(assignmentsData.map(async (asg) => {
          const programDetails = await apiServerClient.fetch(`/exercise-programs/${asg.program_id}`);
          
          // Hitung adherence dan streak dari logs
          const programLogs = logsData.filter(log => log.program_id === asg.program_id);
          const totalSessions = programLogs.length;
          const completedSessions = programLogs.filter(log => log.completion_percentage === 100).length;
          const adherence = totalSessions > 0 ? Math.round((completedSessions / totalSessions) * 100) : 0;

          // Hitung streak (sederhana: jumlah hari berturut-turut dengan log)
          const sortedLogs = programLogs.sort((a, b) => new Date(b.session_date) - new Date(a.session_date));
          let currentStreak = 0;
          if (sortedLogs.length > 0) {
            let lastDate = new Date(sortedLogs[0].session_date);
            currentStreak = 1;
            for (let i = 1; i < sortedLogs.length; i++) {
              const currentDate = new Date(sortedLogs[i].session_date);
              const diffTime = Math.abs(lastDate.getTime() - currentDate.getTime());
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              if (diffDays === 1) currentStreak++;
              else break;
              lastDate = currentDate;
            }
          }

          return {
            ...asg,
            program_name: programDetails?.name || 'Unnamed Program',
            clinical_goal: programDetails?.clinical_goal || 'No goal specified',
            adherence_rate: adherence,
            session_streak: currentStreak,
            sessions_done: totalSessions
          };
        }));

        setAssignments(assignmentsWithProgramNames);
        setExerciseLogs(logsData); // Simpan semua log untuk penggunaan di masa depan
      } catch (error) {
        console.error('Error fetching tracking data:', error);
        toast.error('Failed to load patient program tracking data.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchTracking();
  }, [patientId]);

  // Data untuk chart (contoh: adherence harian)
  const getDailyAdherenceData = (programAssignmentId) => {
    const dailyLogs = exerciseLogs.filter(log => log.program_id === programAssignmentId)
      .reduce((acc, log) => {
        const date = new Date(log.session_date).toLocaleDateString('en-US', { weekday: 'short' });
        acc[date] = (acc[date] || 0) + log.completion_percentage; // Sum completion for the day
        return acc;
      }, {});
    
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return daysOfWeek.map(day => ({
      day,
      completed: dailyLogs[day] ? Math.min(100, dailyLogs[day]) : 0 // Max 100%
    }));
  };
  
  if (isLoading) return <div className="min-h-screen bg-background flex" />;

  return (
    <>
      <Helmet><title>Program Tracking | Physiome</title></Helmet>
      <div className="min-h-screen bg-background flex flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1 ml-0 md:ml-64 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-5xl mx-auto space-y-6">
              
              <div>
                <button onClick={() => navigate(`/patients/${patientId}`)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
                  <ArrowLeft className="w-4 h-4" /> Back to Patient
                </button>
                <h1 className="text-3xl font-bold text-foreground">Program Tracking</h1>
                <p className="text-muted-foreground mt-1">{patient?.name}'s assigned programs</p>
              </div>

              {assignments.length === 0 ? (
                <div className="bg-card p-12 text-center rounded-xl border border-border shadow-sm">
                  <p className="text-muted-foreground mb-4">No programs assigned yet.</p>
                  <button onClick={() => navigate('/exercise-programs')} className="text-primary font-medium hover:underline">Go to Programs Library</button>
                </div>
              ) : (
                <div className="space-y-6">
                  {assignments.map(asg => (
                    <div key={asg.id} className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                      <div className="p-6 border-b border-border bg-muted/20">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h2 className="text-xl font-bold text-foreground">{asg.program_name || 'Unknown Program'}</h2>
                            <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                              <Target className="w-4 h-4" /> {asg.clinical_goal}
                            </p>
                          </div>
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                            {asg.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1"><CalendarIcon className="w-4 h-4"/> Start: {new Date(asg.start_date).toLocaleDateString()}</span>
                          <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> End: {new Date(asg.end_date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-1 space-y-6">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-2">Overall Completion</p>
                            <ProgressBar progress={asg.adherence_rate || 0} showLabel className="h-3" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-muted/50 p-4 rounded-xl border border-border text-center">
                              <p className="text-2xl font-bold text-foreground">{asg.sessions_done || 0}</p>
                              <p className="text-xs text-muted-foreground mt-1">Sessions Done</p>
                            </div>
                            <div className="bg-muted/50 p-4 rounded-xl border border-border text-center">
                              <p className="text-2xl font-bold text-primary">{asg.session_streak || 0} 🔥</p>
                              <p className="text-xs text-muted-foreground mt-1">Day Streak</p>
                            </div>
                          </div>
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-sm font-medium text-muted-foreground mb-4">This Week's Adherence</p>
                          <div className="h-32">
                            <ResponsiveContainer width="100%" height="100%" debounce={1}>
                              <BarChart data={getDailyAdherenceData(asg.id)}>
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: 'var(--muted-foreground)', fontSize: 12}} />
                                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px', border: '1px solid var(--border)'}} />
                                <Bar dataKey="completed" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default PatientProgramTrackingPage;