
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.jsx';
import AdminDashboard from '@/pages/AdminDashboard.jsx';
import DashboardPage from '@/pages/DashboardPage.jsx'; // Therapist Dashboard
import PatientDashboard from '@/pages/PatientDashboard.jsx';

export default function DashboardRouter() {
  const { currentUser } = useAuth();
  const role = currentUser?.role || 'therapist';

  switch (role) {
    case 'super_admin':
      return <Navigate to="/super-admin" replace />;
    case 'admin':
      return <AdminDashboard />;
    case 'patient':
      return <PatientDashboard />;
    case 'therapist':
    default:
      return <DashboardPage />;
  }
}
