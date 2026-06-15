
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Activity, Calendar, Dumbbell, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import apiServerClient from '@/lib/apiServerClient.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import PatientDashboardWidgets from '@/components/patient/PatientDashboardWidgets.jsx';

export default function PatientDashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  // State dan fetch data dipindahkan ke PatientDashboardWidgets.jsx
  // Ini adalah halaman utama yang akan merender widget

  return (
    <>
      <Helmet><title>My Dashboard | Physiome</title></Helmet>
      {/* PatientLayout sudah menyediakan Sidebar dan Header */}
      <div className="space-y-8 animate-in fade-in duration-500 pb-24">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Welcome back, {currentUser?.fullName?.split(' ')[0] || 'Patient'}</h1>
          <p className="text-muted-foreground text-lg">Your personalized recovery plan is ready.</p>
        </header>

        <PatientDashboardWidgets />
      </div>
    </>
  );
}
