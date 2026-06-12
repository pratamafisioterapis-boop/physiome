
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header.jsx';
import Sidebar from '@/components/Sidebar.jsx';
import Table from '@/components/Table.jsx';
import Button from '@/components/Button.jsx';
import Input from '@/components/Input.jsx';
import Select from '@/components/Select.jsx';
import StatusBadge from '@/components/appointments/StatusBadge.jsx';
import { Plus, Search, Eye, Edit2, Trash2, Calendar as CalendarIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext.jsx';
// import pb from '@/lib/pocketbaseClient';
import apiServerClient from '@/lib/apiServerClient.js';
import { Helmet } from 'react-helmet';
import CreateAppointmentModal from '@/components/appointments/CreateAppointmentModal.jsx';
import EditAppointmentModal from '@/components/appointments/EditAppointmentModal.jsx';
import DeleteAppointmentConfirmation from '@/components/appointments/DeleteAppointmentConfirmation.jsx';

const AppointmentListPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [deletingAppointment, setDeletingAppointment] = useState(null);

  const fetchAppointments = async () => {
    if (!currentUser?.clinic_id) return;
    setIsLoading(true);
    try {
      const records = await apiServerClient.fetch(`/appointments?clinic_id=${currentUser.clinic_id}`);
      setAppointments(records);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [currentUser]);

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter]);

  const filteredAppointments = appointments.filter(a => {
    const patientName = a.expand?.patient_id?.full_name?.toLowerCase() || '';
    const therapistName = a.expand?.therapist_id?.name?.toLowerCase() || '';
    const searchLower = search.toLowerCase();
    
    const matchesSearch = search === '' || patientName.includes(searchLower) || therapistName.includes(searchLower);
    const matchesStatus = statusFilter === '' || a.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const paginatedAppointments = filteredAppointments.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <>
      <Helmet>
        <title>Appointments - Physiome</title>
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col md:flex-row">
        <Sidebar />
        
        <div className="flex-1 ml-0 md:ml-64 flex flex-col min-w-0">
          <Header />
          
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground tracking-tight">Appointments</h1>
                  <p className="text-muted-foreground mt-1">Manage clinic schedule and bookings.</p>
                </div>
                <div className="flex gap-3 shrink-0">
                  <Button variant="outline" onClick={() => navigate('/appointments/calendar')} className="gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    Calendar View
                  </Button>
                  <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Create Appointment
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 bg-card p-4 rounded-xl border border-border shadow-sm">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search by patient or therapist..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <div className="w-full sm:w-48">
                  <Select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    options={[
                      { label: 'All Statuses', value: '' },
                      { label: 'Scheduled', value: 'Scheduled' },
                      { label: 'Confirmed', value: 'Confirmed' },
                      { label: 'Completed', value: 'Completed' },
                      { label: 'Cancelled', value: 'Cancelled' }
                    ]}
                  />
                </div>
              </div>

              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-20 bg-muted/50 rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : (
                <Table 
                 className='w-full'
                  headers={['Patient', 'Therapist', 'Date & Time', 'Duration', 'Status', 'Actions']}
                  page={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                  isEmpty={paginatedAppointments.length === 0}
                  emptyMessage={
                    <div className="flex flex-col items-center justify-center py-12 w-full">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                        <CalendarIcon className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <p className="text-lg font-medium text-foreground">No appointments found</p>
                      <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto text-center">
                        {search || statusFilter ? "Try adjusting your filters." : "Get started by creating an appointment."}
                      </p>
                      {!(search || statusFilter) && (
                        <Button variant="outline" onClick={() => setIsCreateOpen(true)} className="mt-6">
                          Create Appointment
                        </Button>
                      )}
                    </div>
                  }
                >
                  {paginatedAppointments.map((apt) => (
                    <React.Fragment key={apt.id}>
                      <tr className="hidden md:table-row">
                        <td className="font-medium text-foreground">{apt.expand?.patient_id?.full_name || 'Unknown'}</td>
                        <td className="text-muted-foreground">{apt.expand?.therapist_id?.name || 'Unknown'}</td>
                        <td>
                          <div className="text-sm">{formatDate(apt.date)}</div>
                          <div className="text-xs text-muted-foreground">{apt.time}</div>
                        </td>
                        <td className="text-muted-foreground">{apt.duration} min</td>
                        <td><StatusBadge status={apt.status} /></td>
                        <td>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" onClick={() => navigate(`/appointments/${apt.id}`)} className="h-8 px-2 text-muted-foreground hover:text-primary">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => setEditingAppointment(apt)} className="h-8 px-2 text-muted-foreground hover:text-primary">
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => setDeletingAppointment(apt)} className="h-8 px-2 text-muted-foreground hover:text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                      
                      <div className="md:hidden flex flex-col p-4 bg-card border border-border rounded-xl shadow-sm mb-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-medium text-foreground">{apt.expand?.patient_id?.full_name}</h3>
                            <p className="text-xs text-muted-foreground">{apt.expand?.therapist_id?.name}</p>
                          </div>
                          <StatusBadge status={apt.status} />
                        </div>
                        <div className="text-sm text-muted-foreground mb-4">
                          <p>{formatDate(apt.date)} at {apt.time} ({apt.duration}m)</p>
                        </div>
                        <div className="flex items-center gap-2 pt-3 border-t border-border mt-auto">
                          <Button variant="outline" size="sm" className="flex-1 text-xs" onClick={() => navigate(`/appointments/${apt.id}`)}>View</Button>
                          <Button variant="outline" size="sm" className="flex-1 text-xs" onClick={() => setEditingAppointment(apt)}>Edit</Button>
                          <Button variant="outline" size="sm" className="px-3 text-destructive border-border hover:bg-destructive/10" onClick={() => setDeletingAppointment(apt)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </Table>
              )}
            </div>
          </main>
        </div>
      </div>

      <CreateAppointmentModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} onSuccess={fetchAppointments} />
      {editingAppointment && <EditAppointmentModal isOpen={!!editingAppointment} onClose={() => setEditingAppointment(null)} onSuccess={fetchAppointments} appointment={editingAppointment} />}
      {deletingAppointment && <DeleteAppointmentConfirmation isOpen={!!deletingAppointment} onClose={() => setDeletingAppointment(null)} onSuccess={fetchAppointments} appointment={deletingAppointment} />}
    </>
  );
};

export default AppointmentListPage;
