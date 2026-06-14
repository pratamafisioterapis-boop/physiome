
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header.jsx';
import Sidebar from '@/components/Sidebar.jsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Button from '@/components/Button.jsx';
import Input from '@/components/Input.jsx';
import Select from '@/components/Select.jsx';
import { Plus, Search, Eye, Edit2, Trash2, Users, UserRound, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext.jsx';
import apiServerClient from '@/lib/apiServerClient.js';
import { Helmet } from 'react-helmet';
import AddTherapistModal from '@/components/therapists/AddTherapistModal.jsx';
import EditTherapistModal from '@/components/therapists/EditTherapistModal.jsx';
import DeleteTherapistConfirmation from '@/components/therapists/DeleteTherapistConfirmation.jsx';
import { useTranslation } from 'react-i18next';

const TherapistListPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  
  const [therapists, setTherapists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  // Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  
  // Modals
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingTherapist, setEditingTherapist] = useState(null);
  const [deletingTherapist, setDeletingTherapist] = useState(null);

  const fetchTherapists = async () => {
    if (!currentUser?.clinic_id) return;
    setIsLoading(true);
    try {
      const data = await apiServerClient.fetch('/therapists');
      setTherapists(data);
    } catch (error) {
      console.error('Error fetching therapists:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTherapists();
  }, [currentUser]);

  // Reset page to 1 when search or filter changes
  useEffect(() => {
    setPage(1);
  }, [search, statusFilter]);

  // Client-side filtering
  const filteredTherapists = therapists.filter(p => {
    const name = p.fullName || p.name || '';
    const matchesSearch = search === '' || 
      name.toLowerCase().includes(search.toLowerCase()) ||
      p.email?.toLowerCase().includes(search.toLowerCase()) ||
      (p.phone && p.phone.includes(search));
      
    const matchesStatus = statusFilter === '' || p.status?.toString() === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredTherapists.length / itemsPerPage);
  const paginatedTherapists = filteredTherapists.slice((page - 1) * itemsPerPage, page * itemsPerPage);

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
        <title>{t('nav.therapists')} - Physiome</title>
        <meta name="description" content="Manage your clinic's therapists" />
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
                  <h1 className="text-3xl font-bold text-foreground tracking-tight">{t('nav.therapists')}</h1>
                  <p className="text-muted-foreground mt-1">Manage your clinic's professional team.</p>
                </div>
                <Button onClick={() => setIsAddOpen(true)} className="gap-2 shrink-0">
                  <Plus className="w-4 h-4" />
                  Add Therapist
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
                <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                  <div className="hidden md:block">
                    <Table>
                      <TableHeader className="bg-muted/50">
                        <TableRow>
                          <TableHead className="font-semibold text-foreground">Therapist</TableHead>
                          <TableHead className="font-semibold text-foreground">Specialization</TableHead>
                          <TableHead className="font-semibold text-foreground">Contact</TableHead>
                          <TableHead className="font-semibold text-foreground">Status</TableHead>
                          <TableHead className="text-right font-semibold text-foreground">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedTherapists.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-12">
                              <div className="flex flex-col items-center justify-center">
                                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                                  <UserRound className="w-8 h-8 text-muted-foreground" />
                                </div>
                                <p className="text-lg font-medium text-foreground">No therapists found</p>
                                <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto text-center">
                                  {search || statusFilter ? "Try adjusting your filters or search query." : "Get started by adding your first therapist."}
                                </p>
                                {!(search || statusFilter) && (
                                  <Button variant="outline" onClick={() => setIsAddOpen(true)} className="mt-6">
                                    Add Therapist
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ) : (
                          paginatedTherapists.map((therapist) => (
                            <TableRow key={therapist.id} className="hover:bg-muted/30">
                              <TableCell>
                                <div className="font-medium text-foreground">{therapist.fullName}</div>
                                <div className="text-xs text-muted-foreground">{therapist.specialization || 'General Therapist'}</div>
                              </TableCell>
                              <TableCell>{therapist.licenseNumber || '-'}</TableCell>
                              <TableCell>
                                <div className="text-sm">{therapist.phone || '-'}</div>
                                <div className="text-xs text-muted-foreground">{therapist.email}</div>
                              </TableCell>
                              <TableCell>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadgeColors[therapist.status] || ''}`}>
                                  {therapist.status}
                                </span>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <Button variant="ghost" size="sm" onClick={() => navigate(`/therapists/${therapist.id}`)} className="h-8 px-2">
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" onClick={() => setEditingTherapist(therapist)} className="h-8 px-2">
                                    <Edit2 className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" onClick={() => setDeletingTherapist(therapist)} className="h-8 px-2 text-destructive">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Pagination Footer */}
                  {totalPages > 1 && (
                    <div className="px-4 py-3 flex items-center justify-between border-t border-border bg-muted/20">
                      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Showing page <span className="font-medium text-foreground">{page}</span> of <span className="font-medium text-foreground">{totalPages}</span>
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={page === totalPages}
                          >
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Mobile Cards - Render SEPENUHNYA di luar komponen Table */}
              {!isLoading && paginatedTherapists.length > 0 && (
                <div className="md:hidden space-y-4">
                  {paginatedTherapists.map((therapist) => (
                    <div key={`mobile-${therapist.id}`} className="flex flex-col p-4 bg-card border border-border rounded-xl shadow-sm">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium text-foreground">{therapist.fullName}</h3>
                          <p className="text-xs text-muted-foreground">{therapist.specialization || '-'}</p>
                        </div>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusBadgeColors[therapist.status] || ''}`}>
                          {therapist.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 pt-3 border-t border-border mt-2">
                        <Button variant="outline" size="sm" className="flex-1" onClick={() => navigate(`/therapists/${therapist.id}`)}>View</Button>
                        <Button variant="outline" size="sm" className="flex-1" onClick={() => setEditingTherapist(therapist)}>Edit</Button>
                        <Button variant="outline" size="sm" className="text-destructive" onClick={() => setDeletingTherapist(therapist)}><Trash2 className="w-4 h-4" /></Button>
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
      <AddTherapistModal 
        isOpen={isAddOpen} 
        onClose={() => setIsAddOpen(false)} 
        onSuccess={fetchTherapists} 
      />
      
      {editingTherapist && (
        <EditTherapistModal 
          isOpen={!!editingTherapist} 
          onClose={() => setEditingTherapist(null)} 
          onSuccess={fetchTherapists}
          therapist={editingTherapist}
        />
      )}
      
      {deletingTherapist && (
        <DeleteTherapistConfirmation 
          isOpen={!!deletingTherapist} 
          onClose={() => setDeletingTherapist(null)} 
          onSuccess={fetchTherapists}
          therapist={deletingTherapist}
        />
      )}
    </>
  );
};

export default TherapistListPage;
