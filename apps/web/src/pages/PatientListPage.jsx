
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header.jsx';
import Sidebar from '@/components/Sidebar.jsx';
import Table from '@/components/Table.jsx';
import Button from '@/components/Button.jsx';
import Input from '@/components/Input.jsx';
import Select from '@/components/Select.jsx';
import { Plus, Search, Eye, Edit2, Trash2, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext.jsx';
import apiServerClient from '@/lib/apiServerClient.js';
import { Helmet } from 'react-helmet';
import AddPatientModal from '@/components/patients/AddPatientModal.jsx';
import EditPatientModal from '@/components/patients/EditPatientModal.jsx';
import DeletePatientConfirmation from '@/components/patients/DeletePatientConfirmation.jsx';

const PatientListPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  // Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  
  // Modals
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [deletingPatient, setDeletingPatient] = useState(null);

  const fetchPatients = async () => {
    if (!currentUser?.clinic_id) return;
    setIsLoading(true);
    try {
      const data = await apiServerClient.fetch('/patients');
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [currentUser]);

  // Reset page to 1 when search or filter changes
  useEffect(() => {
    setPage(1);
  }, [search, statusFilter]);

  // Client-side filtering
  const filteredPatients = patients.filter(p => {
    const matchesSearch = search === '' || 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      (p.phone && p.phone.includes(search));
      
    const matchesStatus = statusFilter === '' || p.status?.toString() === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const paginatedPatients = filteredPatients.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const statusBadgeColors = {
    'Active': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    'Inactive': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
    'Discharged': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
  };

  return (
    <>
      <Helmet>
        <title>Patients - Physiome</title>
        <meta name="description" content="Manage your clinic's patients" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Sidebar />
        
        <div className="flex-1 ml-0 md:ml-64 flex flex-col min-w-0">
          <Header />
          
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto space-y-6">
              
              {/* Page Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground tracking-tight">Patients</h1>
                  <p className="text-muted-foreground mt-1">Manage your patient records and histories.</p>
                </div>
                <Button onClick={() => setIsAddOpen(true)} className="gap-2 shrink-0">
                  <Plus className="w-4 h-4" />
                  Add Patient
                </Button>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 bg-card p-4 rounded-xl border border-border shadow-sm">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search by name, email, or phone..." 
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
                      { label: 'Active', value: 'Active' },
                      { label: 'Inactive', value: 'Inactive' },
                      { label: 'Discharged', value: 'Discharged' }
                    ]}
                  />
                </div>
              </div>

              {/* Data Display */}
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-20 bg-muted/50 rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : (
                <Table 
                  headers={['Patient', 'Date of Birth', 'Contact', 'Status', 'Actions']}
                  page={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                  isEmpty={paginatedPatients.length === 0}
                  emptyMessage={
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                        <Users className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <p className="text-lg font-medium text-foreground">No patients found</p>
                      <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto text-center">
                        {search || statusFilter ? "Try adjusting your filters or search query." : "Get started by adding your first patient."}
                      </p>
                      {!(search || statusFilter) && (
                        <Button variant="outline" onClick={() => setIsAddOpen(true)} className="mt-6">
                          Add Patient
                        </Button>
                      )}
                    </div>
                  }
                >
                  {/* HANYA TR untuk tabel desktop */}
                  {paginatedPatients.map((patient) => (
                    <tr key={patient.id} className="hidden md:table-row border-b border-border/50">
                      <td className="py-3 px-4">
                        <div className="font-medium text-foreground">{patient.name}</div>
                        <div className="text-xs text-muted-foreground">{patient.gender}</div>
                      </td>
                      <td className="py-3 px-4">{formatDate(patient.birth_date)}</td>
                      <td className="py-3 px-4">
                        <div className="text-sm">{patient.phone}</div>
                        <div className="text-xs text-muted-foreground">{patient.email}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadgeColors[patient.status]}`}>
                          {patient.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => navigate(`/patients/${patient.id}`)} className="h-8 px-2">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => setEditingPatient(patient)} className="h-8 px-2">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => setDeletingPatient(patient)} className="h-8 px-2 text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </Table>
              )}

              {/* Mobile Cards - Render SEPENUHNYA di luar komponen Table */}
              {!isLoading && paginatedPatients.length > 0 && (
                <div className="md:hidden space-y-4">
                  {paginatedPatients.map((patient) => (
                    <div key={`mobile-${patient.id}`} className="flex flex-col p-4 bg-card border border-border rounded-xl shadow-sm">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium text-foreground">{patient.name}</h3>
                          <p className="text-xs text-muted-foreground">{patient.gender} • {formatDate(patient.birth_date)}</p>
                        </div>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusBadgeColors[patient.status]}`}>
                          {patient.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 pt-3 border-t border-border mt-2">
                        <Button variant="outline" size="sm" className="flex-1" onClick={() => navigate(`/patients/${patient.id}`)}>View</Button>
                        <Button variant="outline" size="sm" className="flex-1" onClick={() => setEditingPatient(patient)}>Edit</Button>
                        <Button variant="outline" size="sm" className="text-destructive" onClick={() => setDeletingPatient(patient)}><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Modals */}
      <AddPatientModal 
        isOpen={isAddOpen} 
        onClose={() => setIsAddOpen(false)} 
        onSuccess={fetchPatients} 
      />
      
      {editingPatient && (
        <EditPatientModal 
          isOpen={!!editingPatient} 
          onClose={() => setEditingPatient(null)} 
          onSuccess={fetchPatients}
          patient={editingPatient}
        />
      )}
      
      {deletingPatient && (
        <DeletePatientConfirmation 
          isOpen={!!deletingPatient} 
          onClose={() => setDeletingPatient(null)} 
          onSuccess={fetchPatients}
          patient={deletingPatient}
        />
      )}
    </>
  );
};

export default PatientListPage;
