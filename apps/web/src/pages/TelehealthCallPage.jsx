import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft, PhoneOff } from 'lucide-react';
import Sidebar from '@/components/Sidebar.jsx';
import Header from '@/components/Header.jsx';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext.jsx';
import JitsiRoom from '@/components/telehealth/JitsiRoom.jsx';

// Clinician-side telehealth room. `room` matches the id the patient joins
// (e.g. "appt-<appointmentId>"), so both land in the same session.
const TelehealthCallPage = () => {
  const { room } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  return (
    <>
      <Helmet><title>Telehealth Call - Physiome</title></Helmet>
      <div className="min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1 ml-0 md:ml-64 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-hidden">
            <div className="max-w-6xl mx-auto h-[calc(100vh-9rem)] flex flex-col">
              <div className="flex items-center justify-between mb-4 shrink-0">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <Button variant="destructive" className="rounded-full gap-2" onClick={() => navigate(-1)}>
                  <PhoneOff className="w-4 h-4" /> End Call
                </Button>
              </div>
              <div className="flex-1 min-h-0">
                <JitsiRoom roomName={room} displayName={currentUser?.fullName} onLeave={() => navigate(-1)} />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default TelehealthCallPage;
