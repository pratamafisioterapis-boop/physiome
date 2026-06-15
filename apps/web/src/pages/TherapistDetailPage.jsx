import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header.jsx';
import Sidebar from '@/components/Sidebar.jsx';
import Button from '@/components/Button.jsx';
import { ArrowLeft, Edit2, Trash2, User, Award, Mail, Phone, Calendar, ShieldCheck } from 'lucide-react';
import apiServerClient from '@/lib/apiServerClient.js';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import EditTherapistModal from '@/components/therapists/EditTherapistModal.jsx';
import DeleteTherapistConfirmation from '@/components/therapists/DeleteTherapistConfirmation.jsx';

const TherapistDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [therapist, setTherapist] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const fetchTherapist = async () => {
    setIsLoading(true);
    try {
      const data = await apiServerClient.fetch(`/therapists/${id}`);
      setTherapist(data);
    } catch (error) {
      console.error('Error fetching therapist:', error);
      navigate('/therapists');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchTherapist();
  }, [id]);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const statusBadgeColors = {
    'Active': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 ring-1 ring-inset ring-green-600/20',
    'Inactive': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 ring-1 ring-inset ring-gray-500/20'
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1 ml-0 md:ml-64 flex flex-col">
          <Header />
          <div className="p-8">
            <div className="max-w-4xl mx-auto space-y-8 animate-pulse">
              <div className="h-10 bg-muted/50 rounded w-1/3" />
              <div className="h-64 bg-card rounded-2xl border border-border" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!therapist) return null;

  return (
    <>
      <Helmet>
        <title>{therapist.fullName} - {t('nav.therapists')} | Physiome</title>
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col md:flex-row">
        <Sidebar />
        
        <div className="flex-1 ml-0 md:ml-64 flex flex-col min-w-0">
          <Header />
          
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-5xl mx-auto space-y-6">
              
              {/* Navigation & Header */}
              <div>
                <button 
                  onClick={() => navigate('/therapists')}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t('common.backToPatients')?.replace('Patients', 'Therapists') || 'Back to Therapists'}
                </button>
                
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                      <User className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h1 className="text-3xl font-bold text-foreground tracking-tight">{therapist.fullName}</h1>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadgeColors[therapist.status]}`}>
                          {therapist.status}
                        </span>
                      </div>
                      <p className="text-muted-foreground flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        {therapist.specialization || 'General Therapist'} • {t('common.added') || 'Joined'} {formatDate(therapist.created_at)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" onClick={() => setIsEditOpen(true)} className="gap-2">
                      <Edit2 className="w-4 h-4" /> {t('common.editProfile') || 'Edit Profile'}
                    </Button>
                    <Button variant="outline" onClick={() => setIsDeleteOpen(true)} className="text-destructive border-border hover:bg-destructive/10">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
                
                {/* Info Cards */}
                <div className="lg:col-span-1 space-y-6">
                  <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-border bg-muted/30">
                      <h2 className="font-semibold text-foreground flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-primary" />
                        {t('common.personalInformation') || 'Account Details'}
                      </h2>
                    </div>
                    <div className="p-5 space-y-4">
                      <div className="flex items-start gap-3">
                        <Mail className="w-4 h-4 mt-1 text-muted-foreground" />
                        <div>
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('common.email')}</p>
                          <p className="text-foreground font-medium">{therapist.email}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="w-4 h-4 mt-1 text-muted-foreground" />
                        <div>
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('common.phone')}</p>
                          <p className="text-foreground font-medium">{therapist.phone || '-'}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Calendar className="w-4 h-4 mt-1 text-muted-foreground" />
                        <div>
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Role</p>
                          <p className="text-foreground font-medium capitalize">{therapist.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
                    <h2 className="text-lg font-bold text-foreground mb-4">Professional Credentials</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="p-4 bg-muted/30 rounded-xl border border-border">
                        <p className="text-sm text-muted-foreground mb-1">License Number (STR)</p>
                        <p className="text-xl font-semibold text-foreground">{therapist.licenseNumber || 'Not Registered'}</p>
                      </div>
                      <div className="p-4 bg-muted/30 rounded-xl border border-border">
                        <p className="text-sm text-muted-foreground mb-1">Specialization</p>
                        <p className="text-xl font-semibold text-foreground">{therapist.specialization || 'General'}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-card rounded-2xl border border-border shadow-sm p-8 text-center text-muted-foreground">
                     <p>Performance metrics and assigned patients module coming soon.</p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      <EditTherapistModal 
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSuccess={fetchTherapist}
        therapist={therapist}
      />
      
      <DeleteTherapistConfirmation 
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onSuccess={() => navigate('/therapists')}
        therapist={therapist}
      />
    </>
  );
};

export default TherapistDetailPage;