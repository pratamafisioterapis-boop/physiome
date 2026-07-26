
import React, { Suspense } from 'react';
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext.jsx';
import { LanguageProvider } from '@/contexts/LanguageContext.jsx';
import ScrollToTop from '@/components/ScrollToTop.jsx';
import RecoveryRedirect from '@/components/RecoveryRedirect.jsx';
import ProtectedRoute from '@/components/ProtectedRoute.jsx';
import RoleProtectedRoute from '@/components/RoleProtectedRoute.jsx';
import SuperAdminDashboard from '@/pages/SuperAdminDashboard.jsx';
import SuperAdminPaymentSettings from '@/pages/SuperAdminPaymentSettings.jsx';
import SuperAdminClinics from '@/pages/SuperAdminClinics.jsx';
import SuperAdminUsers from '@/pages/SuperAdminUsers.jsx';
import LandingPage from '@/pages/LandingPage.jsx';
import LoginPage from '@/pages/LoginPage.jsx';
import SignupPage from '@/pages/SignupPage.jsx';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage.jsx';
import ResetPasswordPage from '@/pages/ResetPasswordPage.jsx';
import OnboardingPage from '@/pages/OnboardingPage.jsx';
import DashboardRouter from '@/pages/DashboardRouter.jsx';
import PatientListPage from '@/pages/PatientListPage.jsx';
import PatientDetailPage from '@/pages/PatientDetailPage.jsx';
import AppointmentListPage from '@/pages/AppointmentListPage.jsx';
import CalendarViewPage from '@/pages/CalendarViewPage.jsx';
import AppointmentDetailPage from '@/pages/AppointmentDetailPage.jsx';

// Exercise Ecosystem Pages
import ExerciseDashboard from '@/pages/ExerciseDashboard.jsx';
import ExerciseLibraryPage from '@/pages/ExerciseLibraryPage.jsx';
import MyVideosPage from '@/pages/MyVideosPage.jsx';
import ProgramBuilderPage from '@/pages/ProgramBuilderPage.jsx';
import ProgramTemplatesPage from '@/pages/ProgramTemplatesPage.jsx';
import AssignedProgramsPage from '@/pages/AssignedProgramsPage.jsx';
import PatientProgressPage from '@/pages/PatientProgressPage.jsx';
import ExerciseAnalyticsPage from '@/pages/ExerciseAnalyticsPage.jsx';
import PatientMonitoringPage from '@/pages/PatientMonitoringPage.jsx';
import TherapistMessagesPage from '@/pages/therapist/TherapistMessagesPage.jsx';
import TelehealthCallPage from '@/pages/TelehealthCallPage.jsx';

import ExerciseDetailPage from '@/pages/ExerciseDetailPage.jsx';
import PatientProgramTrackingPage from '@/pages/PatientProgramTrackingPage.jsx';
import PatientExerciseViewPage from '@/pages/PatientExerciseViewPage.jsx';
import AIExerciseProgramGeneratorPage from '@/pages/AIExerciseProgramGeneratorPage.jsx';

// Admin Pages
import ExerciseLibraryAdminPage from '@/pages/admin/ExerciseLibraryAdminPage.jsx';
import AddExercisePage from '@/pages/admin/AddExercisePage.jsx';
import EditExercisePage from '@/pages/admin/EditExercisePage.jsx';
import CategoriesManagementPage from '@/pages/admin/CategoriesManagementPage.jsx';
import ExerciseStatisticsPage from '@/pages/admin/ExerciseStatisticsPage.jsx';
import LanguageManagementPage from '@/pages/admin/LanguageManagementPage.jsx';
import TherapistListPage from '@/pages/TheraphistListPage.jsx';
import TherapistDetailPage from '@/pages/TherapistDetailPage.jsx';


// Patient Portal Pages
import PatientLayout from '@/components/patient/PatientLayout.jsx';
import PatientDashboardPage from '@/pages/patient/PatientDashboardPage.jsx';
import MyExerciseProgramsPage from '@/pages/patient/MyExerciseProgramsPage.jsx';
import ExerciseVideosPage from '@/pages/patient/ExerciseVideosPage.jsx';
import RecoveryProgressPage from '@/pages/patient/RecoveryProgressPage.jsx';
import PainTrackingPage from '@/pages/patient/PainTrackingPage.jsx';
import AppointmentsPage from '@/pages/patient/AppointmentsPage.jsx';
import MessagesPage from '@/pages/patient/MessagesPage.jsx';
import TelehealthPage from '@/pages/patient/TelehealthPage.jsx';
import PatientProfilePage from '@/pages/patient/PatientProfilePage.jsx';
import PatientLanguageSettingsPage from '@/pages/patient/PatientLanguageSettingsPage.jsx';
import PatientAccountSettingsPage from '@/pages/patient/PatientAccountSettingsPage.jsx';
import AchievementsPage from '@/pages/patient/AchievementsPage.jsx';
import AssessmentsPage from '@/pages/patient/AssessmentsPage.jsx';
import PatientLibraryPage from '@/pages/patient/PatientLibraryPage.jsx';
import SelfAssignedReviewPage from '@/pages/therapist/SelfAssignedReviewPage.jsx';

// SOAP Notes Assistant
import SOAPNotesPage from '@/pages/SOAPNotesPage.jsx';
import SOAPHistoryPage from '@/pages/therapist/SOAPHistoryPage.jsx';

// Billing & Packages (klinik menagih pasiennya)
import PackageManagementPage from '@/pages/therapist/PackageManagementPage.jsx';
import InvoiceListPage from '@/pages/therapist/InvoiceListPage.jsx';
import PaymentListPage from '@/pages/therapist/PaymentListPage.jsx';

// Langganan Physiome (Physiome menagih pelanggannya)
import PricingPage from '@/pages/billing/PricingPage.jsx';
import CheckoutPage from '@/pages/billing/CheckoutPage.jsx';
import PaymentStatusPage from '@/pages/billing/PaymentStatusPage.jsx';
import SubscriptionPage from '@/pages/billing/SubscriptionPage.jsx';

// New Core Pages
import ExerciseProgramsPage from '@/pages/ExerciseProgramsPage.jsx';
import ReportsPage from '@/pages/ReportsPage.jsx';
import SettingsPage from '@/pages/SettingsPage.jsx';
import TherapistLanguageSettingsPage from '@/pages/TherapistLanguageSettingsPage.jsx';

import { Toaster } from 'sonner';

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center">Loading...</div>}>
        <Router>
          <ScrollToTop />
          <RecoveryRedirect />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/onboarding" element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />

            {/* Langganan Physiome. Terbuka untuk semua peran yang login: pasien
                B2C mengelola langganannya sendiri di sini juga. */}
            <Route path="/billing" element={<ProtectedRoute><SubscriptionPage /></ProtectedRoute>} />
            <Route path="/billing/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
            <Route path="/billing/status" element={<ProtectedRoute><PaymentStatusPage /></ProtectedRoute>} />
            
            <Route path="/dashboard" element={<ProtectedRoute><DashboardRouter /></ProtectedRoute>} />
            
            <Route path="/patients" element={<RoleProtectedRoute allowedRoles={['admin', 'therapist']}><PatientListPage /></RoleProtectedRoute>} />
            <Route path="/patients/:id" element={<RoleProtectedRoute allowedRoles={['admin', 'therapist']}><PatientDetailPage /></RoleProtectedRoute>} />
            <Route path="/patients/:patientId/programs" element={<RoleProtectedRoute allowedRoles={['admin', 'therapist']}><PatientProgramTrackingPage /></RoleProtectedRoute>} />

            <Route path="/therapists" element={<RoleProtectedRoute allowedRoles={['admin']}><TherapistListPage /></RoleProtectedRoute>} />
            <Route path="/therapists/:id" element={<RoleProtectedRoute allowedRoles={['admin']}><TherapistDetailPage /></RoleProtectedRoute>} />
            
            <Route path="/appointments" element={<RoleProtectedRoute allowedRoles={['admin', 'therapist']}><AppointmentListPage /></RoleProtectedRoute>} />
            <Route path="/appointments/calendar" element={<RoleProtectedRoute allowedRoles={['admin', 'therapist']}><CalendarViewPage /></RoleProtectedRoute>} />
            <Route path="/appointments/:id" element={<RoleProtectedRoute allowedRoles={['admin', 'therapist']}><AppointmentDetailPage /></RoleProtectedRoute>} />
            
            {/* Exercise Ecosystem Routes */}
            <Route path="/exercise-dashboard" element={<RoleProtectedRoute allowedRoles={['admin', 'therapist']}><ExerciseDashboard /></RoleProtectedRoute>} />
            <Route path="/exercise-library" element={<RoleProtectedRoute allowedRoles={['super_admin', 'admin', 'therapist']}><ExerciseLibraryPage /></RoleProtectedRoute>} />
            <Route path="/my-videos" element={<RoleProtectedRoute allowedRoles={['admin', 'therapist']}><MyVideosPage /></RoleProtectedRoute>} />
            <Route path="/exercise-programs" element={<RoleProtectedRoute allowedRoles={['admin', 'therapist']}><ExerciseProgramsPage /></RoleProtectedRoute>} />
            <Route path="/program-builder" element={<RoleProtectedRoute allowedRoles={['super_admin', 'admin', 'therapist']}><ProgramBuilderPage /></RoleProtectedRoute>} />
            <Route path="/program-templates" element={<RoleProtectedRoute allowedRoles={['super_admin', 'admin', 'therapist']}><ProgramTemplatesPage /></RoleProtectedRoute>} />
            <Route path="/assigned-programs" element={<RoleProtectedRoute allowedRoles={['admin', 'therapist']}><AssignedProgramsPage /></RoleProtectedRoute>} />
            <Route path="/patient-progress" element={<RoleProtectedRoute allowedRoles={['admin', 'therapist']}><PatientProgressPage /></RoleProtectedRoute>} />
            <Route path="/patient-monitoring" element={<RoleProtectedRoute allowedRoles={['admin', 'therapist']}><PatientMonitoringPage /></RoleProtectedRoute>} />
            <Route path="/messages" element={<RoleProtectedRoute allowedRoles={['admin', 'therapist']}><TherapistMessagesPage /></RoleProtectedRoute>} />
            <Route path="/telehealth/:room" element={<RoleProtectedRoute allowedRoles={['admin', 'therapist']}><TelehealthCallPage /></RoleProtectedRoute>} />
            <Route path="/exercise-analytics" element={<RoleProtectedRoute allowedRoles={['admin', 'therapist']}><ExerciseAnalyticsPage /></RoleProtectedRoute>} />

            <Route path="/exercises/:id" element={<RoleProtectedRoute allowedRoles={['super_admin', 'admin', 'therapist']}><ExerciseDetailPage /></RoleProtectedRoute>} />
            <Route path="/ai/program-generator" element={<RoleProtectedRoute allowedRoles={['admin', 'therapist']}><AIExerciseProgramGeneratorPage /></RoleProtectedRoute>} />

            <Route path="/soap-notes" element={<RoleProtectedRoute allowedRoles={['therapist']}><SOAPNotesPage /></RoleProtectedRoute>} />
            <Route path="/reports" element={<RoleProtectedRoute allowedRoles={['admin', 'therapist']}><ReportsPage /></RoleProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
            <Route path="/settings/language" element={<RoleProtectedRoute allowedRoles={['admin', 'therapist']}><TherapistLanguageSettingsPage /></RoleProtectedRoute>} />

            <Route path="/therapist/soap-notes/history" element={<RoleProtectedRoute allowedRoles={['therapist']}><SOAPHistoryPage /></RoleProtectedRoute>} />
            <Route path="/therapist/self-assigned-review" element={<RoleProtectedRoute allowedRoles={['admin', 'therapist']}><SelfAssignedReviewPage /></RoleProtectedRoute>} />
            
            <Route path="/therapist/packages" element={<RoleProtectedRoute allowedRoles={['admin', 'therapist']}><PackageManagementPage /></RoleProtectedRoute>} />
            <Route path="/therapist/invoices" element={<RoleProtectedRoute allowedRoles={['admin', 'therapist']}><InvoiceListPage /></RoleProtectedRoute>} />
            <Route path="/therapist/payments" element={<RoleProtectedRoute allowedRoles={['admin', 'therapist']}><PaymentListPage /></RoleProtectedRoute>} />

            <Route path="/admin/exercises" element={<RoleProtectedRoute allowedRoles={['admin', 'super_admin']}><ExerciseLibraryAdminPage /></RoleProtectedRoute>} />
            <Route path="/admin/exercises/new" element={<RoleProtectedRoute allowedRoles={['admin', 'super_admin']}><AddExercisePage /></RoleProtectedRoute>} />
            <Route path="/admin/exercises/:id/edit" element={<RoleProtectedRoute allowedRoles={['admin', 'super_admin']}><EditExercisePage /></RoleProtectedRoute>} />
            <Route path="/admin/categories" element={<RoleProtectedRoute allowedRoles={['admin']}><CategoriesManagementPage /></RoleProtectedRoute>} />
            <Route path="/admin/statistics" element={<RoleProtectedRoute allowedRoles={['admin']}><ExerciseStatisticsPage /></RoleProtectedRoute>} />
            <Route path="/admin/languages" element={<RoleProtectedRoute allowedRoles={['admin']}><LanguageManagementPage /></RoleProtectedRoute>} />

            <Route path="/patient/programs/:assignmentId" element={<RoleProtectedRoute allowedRoles={['patient', 'admin', 'therapist']}><PatientExerciseViewPage /></RoleProtectedRoute>} />
            
            {/* Patient Portal Routes */}
            <Route path="/patient" element={<RoleProtectedRoute allowedRoles={['patient']}><PatientLayout /></RoleProtectedRoute>}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<PatientDashboardPage />} />
              <Route path="programs" element={<MyExerciseProgramsPage />} />
              <Route path="library" element={<PatientLibraryPage />} />
              <Route path="programs/:assignmentId" element={<PatientExerciseViewPage />} />
              <Route path="videos" element={<ExerciseVideosPage />} />
              <Route path="recovery" element={<RecoveryProgressPage />} />
              <Route path="pain-tracking" element={<PainTrackingPage />} />
              <Route path="appointments" element={<AppointmentsPage />} />
              <Route path="messages" element={<MessagesPage />} />
              <Route path="telehealth" element={<TelehealthPage />} />
              <Route path="profile" element={<PatientProfilePage />} />
              <Route path="settings/language" element={<PatientLanguageSettingsPage />} />
              <Route path="settings/account" element={<PatientAccountSettingsPage />} />
              {/* Fallbacks for missing pages to prevent 404s during dev */}
              <Route path="assessments" element={<AssessmentsPage />} />
              <Route path="achievements" element={<AchievementsPage />} />
              <Route path="education" element={<div className="p-8 text-center">Education Center Coming Soon</div>} />
            </Route>
            
            <Route path="/super-admin" element={<RoleProtectedRoute allowedRoles={['super_admin']}><SuperAdminDashboard /></RoleProtectedRoute>} />
            <Route path="/super-admin/payment-settings" element={<RoleProtectedRoute allowedRoles={['super_admin']}><SuperAdminPaymentSettings /></RoleProtectedRoute>} />
            <Route path="/super-admin/clinics" element={<RoleProtectedRoute allowedRoles={['super_admin']}><SuperAdminClinics /></RoleProtectedRoute>} />
            <Route path="/super-admin/users" element={<RoleProtectedRoute allowedRoles={['super_admin']}><SuperAdminUsers /></RoleProtectedRoute>} />
            <Route path="*" element={<div className="min-h-screen flex flex-col items-center justify-center bg-background"><h1 className="text-4xl font-bold mb-2">404</h1><a href="/" className="text-primary hover:underline">Back to home</a></div>} />
          </Routes>
          <Toaster position="top-right" theme="system" closeButton richColors />
        </Router>
        </Suspense>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
