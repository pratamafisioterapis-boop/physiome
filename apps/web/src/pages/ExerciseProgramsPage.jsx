import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext';
import apiServerClient from '@/lib/apiServerClient.js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge, badgeVariants } from '@/components/ui/badge';
import { Plus, Search, Edit2, Trash2, Dumbbell, UserPlus } from 'lucide-react';
import ExerciseProgramModal from '@/components/exercises/ExerciseProgramModal.jsx';
import AssignProgramModal from '@/components/exercises/AssignProgramModal.jsx';
import { toast } from 'sonner';
import Header from '@/components/Header.jsx';
import Sidebar from '@/components/Sidebar.jsx';
import { useNavigate } from 'react-router-dom';

export default function ExerciseProgramsPage() {
  const { currentUser } = useAuth();
  const [programs, setPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const [isProgramModalOpen, setIsProgramModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [assigningProgramId, setAssigningProgramId] = useState(null);

  const fetchPrograms = async () => {
    if (!currentUser?.clinic_id) return;
    setIsLoading(true);
    try {
      const data = await apiServerClient.fetch('/exercise-programs');
      const programData = Array.isArray(data) ? data : (data.data || []);
      setPrograms(programData);
    } catch (error) {
      console.error('Error fetching programs:', error);
      toast.error('Failed to load programs');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, [currentUser]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this program?')) return;
    try {
      await apiServerClient.fetch(`/exercise-programs/${id}`, { method: 'DELETE' });
      toast.success('Program deleted');
      fetchPrograms();
    } catch (error) {
      toast.error('Failed to delete program');
    }
  };

  const openEditModal = (prog) => {
    setEditingProgram(prog);
    setIsProgramModalOpen(true);
  };

  const openCreateModal = () => {
    setEditingProgram(null);
    setIsProgramModalOpen(true);
  };

  const openAssignModal = (id) => {
    setAssigningProgramId(id);
    setIsAssignModalOpen(true);
  };

  const filteredPrograms = programs.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.clinical_goal?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Exercise Programs | Physiome</title>
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col md:flex-row">
        <Sidebar />

        <div className="flex-1 ml-0 md:ml-64 flex flex-col min-w-0">
          <Header />

          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto space-y-6">

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">
                    Exercise Programs
                  </h1>
                  <p className="text-muted-foreground">
                    Manage and assign rehabilitation programs.
                  </p>
                </div>

                <Button onClick={() => navigate('/program-builder')} className="flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Program
                </Button>
              </div>

              <div className="flex items-center gap-4 bg-card p-4 rounded-xl border border-border">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search programs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="hidden md:block">
                  <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Region</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className="text-center py-8 text-muted-foreground"
                        >
                          Loading programs...
                        </TableCell>
                      </TableRow>
                    ) : filteredPrograms.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-12">
                          <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <Dumbbell className="w-12 h-12 mb-4 opacity-20" />
                            <p>No programs found.</p>
                            <Button variant="link" onClick={() => navigate('/program-builder')}>
                              Create your first program
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredPrograms.map((prog) => (
                        <TableRow key={prog.id}>
                          <TableCell className="font-medium">
                            {prog.name}
                            <div className="text-xs text-muted-foreground font-normal">
                              {prog.clinical_goal}
                            </div>
                          </TableCell>

                          <TableCell>
                            {prog.body_region || '-'}
                          </TableCell>

                          <TableCell>
                            {prog.expected_duration || '-'}
                          </TableCell>

                          <TableCell>
                            <Badge
                              variant={
                                prog.status === 'Active'
                                  ? 'default'
                                  : 'secondary'
                              }
                            >
                              {prog.status || 'Draft'}
                            </Badge>
                          </TableCell>

                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openAssignModal(prog.id)}
                              >
                                <UserPlus className="w-4 h-4 mr-2" />
                                Assign
                              </Button>

                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => navigate(`/program-builder?program=${prog.id}`)}
                              >
                                <Edit2 className="w-4 h-4" />
                              </Button>

                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive"
                                onClick={() => handleDelete(prog.id)}
                              >
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

                {/* Mobile Cards View */}
                {!isLoading && filteredPrograms.length > 0 && (
                  <div className="md:hidden space-y-4 p-4">
                    {filteredPrograms.map((prog) => (
                      <div key={`mobile-${prog.id}`} className="flex flex-col p-4 bg-card border border-border rounded-xl shadow-sm">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-medium text-foreground">{prog.name}</h3>
                            <p className="text-xs text-muted-foreground">{prog.clinical_goal}</p>
                          </div>
                          <Badge
                            className={
                              prog.status === 'Active'
                                ? 'bg-success/10 text-success'
                                : 'bg-muted text-muted-foreground'
                            }
                          >
                            {prog.status || 'Draft'}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mb-4">
                          <p>Region: {prog.body_region || '-'}</p>
                          <p>Duration: {prog.expected_duration || '-'}</p>
                        </div>
                        <div className="flex items-center gap-2 pt-3 border-t border-border">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 text-xs"
                            onClick={() => openAssignModal(prog.id)}
                          >
                            <UserPlus className="w-4 h-4 mr-1" /> Assign
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 text-xs" onClick={() => navigate(`/program-builder?program=${prog.id}`)}>Edit</Button>
                          <Button variant="outline" size="sm" className="px-3 text-destructive border-border hover:bg-destructive/10" onClick={() => handleDelete(prog.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </main>
        </div>
      </div>

      <ExerciseProgramModal
        isOpen={isProgramModalOpen}
        onClose={() => setIsProgramModalOpen(false)}
        onSuccess={fetchPrograms}
        editProgram={editingProgram}
      />

      {assigningProgramId && (
        <AssignProgramModal
          isOpen={isAssignModalOpen}
          onClose={() => setIsAssignModalOpen(false)}
          programId={assigningProgramId}
        />
      )}
    </>
  );
}