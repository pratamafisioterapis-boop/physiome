
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header.jsx';
import Sidebar from '@/components/Sidebar.jsx';
import Button from '@/components/Button.jsx';
import { ArrowLeft, Edit2, Trash2, Calendar, FileText, Activity, User } from 'lucide-react';
import pb from '@/lib/pocketbaseClient';
import apiServerClient from '@/lib/apiServerClient.js';
import { Helmet } from 'react-helmet';
import EditPatientModal from '@/components/patients/EditPatientModal.jsx';
import DeletePatientConfirmation from '@/components/patients/DeletePatientConfirmation.jsx';

const PatientDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [patient, setPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const fetchPatient = async () => {
    setIsLoading(true);
    try {
      const record = await apiServerClient.fetch(`/patients/${id}`);
      setPatient(record);
    } catch (error) {
      console.error('Error fetching patient:', error);
      navigate('/patients');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchPatient();
  }, [id]);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateAge = (dob) => {
    if (!dob) return '';
    const diff_ms = Date.now() - new Date(dob).getTime();
    const age_dt = new Date(diff_ms);
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  };

  const statusBadgeColors = {
    'Active': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 ring-1 ring-inset ring-green-600/20',
    'Inactive': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 ring-1 ring-inset ring-gray-500/20',
    'Discharged': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 ring-1 ring-inset ring-blue-600/20'
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="p-8">
            <div className="max-w-4xl mx-auto space-y-8 animate-pulse">
              <div className="h-10 bg-muted/50 rounded w-1/3" />
              <div className="h-64 bg-card rounded-2xl border border-border" />
              <div className="h-48 bg-card rounded-2xl border border-border" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!patient) return null;

  return (
    <>
      <Helmet>
        <title>{patient.full_name} - Patient Details | Physiome</title>
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col md:flex-row">
        <Sidebar />
        
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-5xl mx-auto space-y-6">
              
              {/* Top Navigation */}
              <div>
                <button 
                  onClick={() => navigate('/patients')}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Patients
                </button>
                
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold text-foreground">{patient.full_name}</h1>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadgeColors[patient.status]}`}>
                        {patient.status}
                      </span>
                    </div>
                    <p className="text-muted-foreground">
                      {patient.gender} • {calculateAge(patient.date_of_birth)} years old • Added {formatDate(patient.created)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" onClick={() => setIsEditOpen(true)} className="gap-2">
                      <Edit2 className="w-4 h-4" /> Edit Profile
                    </Button>
                    <Button variant="outline" onClick={() => setIsDeleteOpen(true)} className="text-destructive border-border hover:bg-destructive/10">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
                
                {/* Left Column: Personal Info */}
                <div className="lg:col-span-1 space-y-6">
                  <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-border bg-muted/30">
                      <h2 className="font-semibold text-foreground flex items-center gap-2">
                        <User className="w-5 h-5 text-primary" />
                        Personal Information
                      </h2>
                    </div>
                    <div className="p-5 space-y-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Email Address</p>
                        <p className="text-foreground mt-0.5">{patient.email}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
                        <p className="text-foreground mt-0.5">{patient.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
                        <p className="text-foreground mt-0.5">{formatDate(patient.date_of_birth)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Occupation</p>
                        <p className="text-foreground mt-0.5">{patient.occupation || 'Not specified'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Home Address</p>
                        <p className="text-foreground mt-0.5">{patient.address || 'Not provided'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Medical Info & Related */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-border bg-muted/30">
                      <h2 className="font-semibold text-foreground flex items-center gap-2">
                        <Activity className="w-5 h-5 text-primary" />
                        Medical Information
                      </h2>
                    </div>
                    <div className="p-5 space-y-6">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1.5">Main Complaint</p>
                        <div className="bg-muted/50 p-4 rounded-xl border border-border">
                          <p className="text-foreground whitespace-pre-wrap">{patient.main_complaint}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1.5">Diagnosis / Notes</p>
                        {patient.diagnosis ? (
                          <div className="bg-muted/50 p-4 rounded-xl border border-border">
                            <p className="text-foreground whitespace-pre-wrap">{patient.diagnosis}</p>
                          </div>
                        ) : (
                          <p className="text-muted-foreground italic text-sm">No diagnosis recorded yet.</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Placeholder: Related Appointments */}
                  <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-border flex items-center justify-between bg-muted/30">
                      <h2 className="font-semibold text-foreground flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        Recent Appointments
                      </h2>
                      <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">View All</Button>
                    </div>
                    <div className="p-8 text-center text-muted-foreground">
                      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                        <Calendar className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <p>Appointments module coming soon.</p>
                    </div>
                  </div>

                  {/* Placeholder: SOAP Notes */}
                  <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-border flex items-center justify-between bg-muted/30">
                      <h2 className="font-semibold text-foreground flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary" />
                        SOAP Notes
                      </h2>
                      <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">Add Note</Button>
                    </div>
                    <div className="p-8 text-center text-muted-foreground">
                      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                        <FileText className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <p>SOAP notes module coming soon.</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      <EditPatientModal 
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSuccess={fetchPatient}
        patient={patient}
      />
      
      <DeletePatientConfirmation 
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onSuccess={() => navigate('/patients')}
        patient={patient}
      />
    </>
  );
};

export default PatientDetailPage;
