
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from '@/components/Header.jsx';
import Sidebar from '@/components/Sidebar.jsx';
import Button from '@/components/Button.jsx';
import StatusBadge from '@/components/appointments/StatusBadge.jsx';
import { ArrowLeft, Edit2, Trash2, Calendar, Clock, User, Activity, Video } from 'lucide-react';
import apiServerClient from '@/lib/apiServerClient.js';
import { Helmet } from 'react-helmet';
import EditAppointmentModal from '@/components/appointments/EditAppointmentModal.jsx';
import DeleteAppointmentConfirmation from '@/components/appointments/DeleteAppointmentConfirmation.jsx';
import { toast } from 'sonner';
import Select from '@/components/Select.jsx';


const AppointmentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [appointment, setAppointment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const fetchAppointment = async () => {
    setIsLoading(true);
    try {
      const record = await apiServerClient.fetch(`/appointments/${id}`);
      setAppointment(record);
    } catch (error) {
      console.error('Error fetching appointment:', error);
      navigate('/appointments');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchAppointment();
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    try {
      await apiServerClient.fetch(`/appointments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...appointment,
          status: newStatus 
        })
      });
      toast.success(`Status updated to ${newStatus}`);
      fetchAppointment();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="p-8">
            <div className="max-w-3xl mx-auto space-y-8 animate-pulse">
              <div className="h-10 bg-muted/50 rounded w-1/3" />
              <div className="h-64 bg-card rounded-2xl border border-border" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!appointment) return null;

  const patient = appointment.patient;
  const therapist = appointment.therapist;

  return (
    <>
      <Helmet>
        <title>Appointment Details | Physiome</title>
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col md:flex-row">
        <Sidebar />
        
        <div className="flex-1 ml-0 md:ml-64 flex flex-col min-w-0">
          <Header />
          
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto space-y-6">
              
              <div>
                <button 
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold text-foreground">Appointment Details</h1>
                      <StatusBadge status={appointment.status} className="text-sm px-3 py-1" />
                    </div>
                    <p className="text-muted-foreground">
                      Created on {new Date(appointment.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Select 
                      value={appointment.status}
                      onChange={(e) => handleStatusChange(e.target.value)}
                      className="w-40"
                      options={[
                        { label: 'Scheduled', value: 'Scheduled' },
                        { label: 'Confirmed', value: 'Confirmed' },
                        { label: 'Completed', value: 'Completed' },
                        { label: 'Cancelled', value: 'Cancelled' }
                      ]}
                      isSearchable={false}
                    />
                    <Button onClick={() => navigate(`/telehealth/appt-${appointment.id}`)} className="gap-2">
                      <Video className="w-4 h-4" /> Join Telehealth
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditOpen(true)} className="gap-2">
                      <Edit2 className="w-4 h-4" /> Edit
                    </Button>
                    <Button variant="outline" onClick={() => setIsDeleteOpen(true)} className="text-destructive border-border hover:bg-destructive/10">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-border bg-muted/30">
                    <h2 className="font-semibold text-foreground flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      Schedule Information
                    </h2>
                  </div>
                  <div className="p-5 space-y-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Date</p>
                      <p className="text-foreground mt-0.5">{formatDate(appointment.date)}</p>
                    </div>
                    <div className="flex gap-8">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Time</p>
                        <p className="text-foreground mt-0.5 flex items-center gap-1">
                          <Clock className="w-4 h-4 text-muted-foreground" /> {appointment.time}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Duration</p>
                        <p className="text-foreground mt-0.5">{appointment.duration} minutes</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Therapist</p>
                      <p className="text-foreground mt-0.5">{therapist?.user?.fullName || 'Unknown'}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-border bg-muted/30">
                    <h2 className="font-semibold text-foreground flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      Patient Information
                    </h2>
                  </div>
                  <div className="p-5 space-y-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Name</p>
                      <Link to={`/patients/${patient?.id}`} className="text-primary hover:underline font-medium mt-0.5 block">
                        {patient?.name || 'Unknown'}
                      </Link>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Contact</p>
                      <p className="text-foreground mt-0.5">{patient?.phone || 'N/A'}</p>
                      <p className="text-muted-foreground text-sm">{patient?.email || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-border bg-muted/30">
                    <h2 className="font-semibold text-foreground flex items-center gap-2">
                      <Activity className="w-5 h-5 text-primary" />
                      Notes
                    </h2>
                  </div>
                  <div className="p-5">
                    {appointment.notes ? (
                      <p className="text-foreground whitespace-pre-wrap">{appointment.notes}</p>
                    ) : (
                      <p className="text-muted-foreground italic">No notes provided for this appointment.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      <EditAppointmentModal 
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSuccess={fetchAppointment}
        appointment={appointment}
      />
      
      <DeleteAppointmentConfirmation 
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onSuccess={() => navigate('/appointments')}
        appointment={appointment}
      />
    </>
  );
};

export default AppointmentDetailPage;
