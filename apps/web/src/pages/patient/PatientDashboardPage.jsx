
import React from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext.jsx';
import PatientDashboardWidgets from '@/components/patient/PatientDashboardWidgets.jsx';

const PatientDashboardPage = () => {
  const { currentUser } = useAuth();

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-24">
      <Helmet><title>Dashboard | Physiome</title></Helmet>
      
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Welcome back, {currentUser?.fullName?.split(' ')[0] || 'Patient'}</h1>
        <p className="text-muted-foreground text-lg">Your personalized recovery plan is ready.</p>
      </header>

      <PatientDashboardWidgets />
    </div>
  );
};

export default PatientDashboardPage;
