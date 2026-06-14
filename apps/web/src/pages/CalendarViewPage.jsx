
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header.jsx';
import Sidebar from '@/components/Sidebar.jsx';
import Button from '@/components/Button.jsx';
import { ChevronLeft, ChevronRight, Plus, List } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext.jsx';
import apiServerClient from '@/lib/apiServerClient.js';
import { Helmet } from 'react-helmet';
import CreateAppointmentModal from '@/components/appointments/CreateAppointmentModal.jsx';
import AppointmentCard from '@/components/appointments/AppointmentCard.jsx';
import TimeSlot from '@/components/appointments/TimeSlot.jsx';

const CalendarViewPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('daily'); // daily, weekly
  
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState({ date: '', time: '' });

  const fetchAppointments = async () => {
    if (!currentUser?.clinic_id) return;
    setIsLoading(true);
    try {
      // Mengambil daftar janji temu dari API kustom
      // Filter klinik sudah ditangani di backend via JWT
      const records = await apiServerClient.fetch('/appointments');
      setAppointments(records);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [currentUser, currentDate]);

  const handlePrev = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'daily') newDate.setDate(newDate.getDate() - 1);
    else newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'daily') newDate.setDate(newDate.getDate() + 1);
    else newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const handleToday = () => setCurrentDate(new Date());

  const openCreateForSlot = (dateStr, timeStr) => {
    setSelectedSlot({ date: dateStr, time: timeStr });
    setIsCreateOpen(true);
  };

  const timeSlots = Array.from({ length: 21 }, (_, i) => {
    const hour = Math.floor(i / 2) + 8;
    const min = i % 2 === 0 ? '00' : '30';
    return `${hour.toString().padStart(2, '0')}:${min}`;
  });

  const renderDailyView = () => {
    const dateStr = currentDate.toISOString().split('T')[0];
    const dayAppointments = appointments.filter(a => a.date.startsWith(dateStr));

    return (
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border bg-muted/30 text-center font-medium">
          {currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
        <div className="flex flex-col">
          {timeSlots.map(time => {
            const slotAppointments = dayAppointments.filter(a => a.time === time);
            return (
              <TimeSlot key={time} time={time} onClick={() => openCreateForSlot(dateStr, time)}>
                {slotAppointments.map(apt => (
                  <AppointmentCard 
                    key={apt.id} 
                    appointment={apt} 
                    className="w-[90%] ml-2 z-10"
                    style={{ height: `${(apt.duration / 30) * 60 - 4}px` }}
                  />
                ))}
              </TimeSlot>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Calendar - Physiome</title>
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col md:flex-row">
        <Sidebar />
        
        <div className="flex-1 ml-0 md:ml-64 flex flex-col min-w-0">
          <Header />
          
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <h1 className="text-3xl font-bold text-foreground tracking-tight">Calendar</h1>
                  <div className="flex items-center bg-muted rounded-lg p-1">
                    <button onClick={() => setViewMode('daily')} className={`px-3 py-1 text-sm rounded-md transition-colors ${viewMode === 'daily' ? 'bg-background shadow-sm font-medium' : 'text-muted-foreground hover:text-foreground'}`}>Daily</button>
                    <button onClick={() => setViewMode('weekly')} className={`px-3 py-1 text-sm rounded-md transition-colors ${viewMode === 'weekly' ? 'bg-background shadow-sm font-medium' : 'text-muted-foreground hover:text-foreground'}`}>Weekly</button>
                  </div>
                </div>
                <div className="flex gap-3 shrink-0">
                  <Button variant="outline" onClick={() => navigate('/appointments')} className="gap-2">
                    <List className="w-4 h-4" />
                    List View
                  </Button>
                  <Button onClick={() => openCreateForSlot('', '')} className="gap-2">
                    <Plus className="w-4 h-4" />
                    New
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between bg-card p-4 rounded-xl border border-border shadow-sm">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={handlePrev}><ChevronLeft className="w-4 h-4" /></Button>
                  <Button variant="outline" size="sm" onClick={handleToday}>Today</Button>
                  <Button variant="outline" size="sm" onClick={handleNext}><ChevronRight className="w-4 h-4" /></Button>
                </div>
                <h2 className="text-lg font-semibold">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h2>
              </div>

              {isLoading ? (
                <div className="h-[600px] bg-muted/50 rounded-xl animate-pulse" />
              ) : (
                viewMode === 'daily' ? renderDailyView() : <div className="p-8 text-center text-muted-foreground bg-card rounded-xl border border-border">Weekly view coming soon. Please use Daily view.</div>
              )}
            </div>
          </main>
        </div>
      </div>

      <CreateAppointmentModal 
        isOpen={isCreateOpen} 
        onClose={() => setIsCreateOpen(false)} 
        onSuccess={fetchAppointments}
        initialDate={selectedSlot.date}
        initialTime={selectedSlot.time}
      />
    </>
  );
};

export default CalendarViewPage;
