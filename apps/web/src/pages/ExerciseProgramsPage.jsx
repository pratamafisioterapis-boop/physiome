import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext';
import apiServerClient from '@/lib/apiServerClient.js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit2, Trash2, Dumbbell, UserPlus } from 'lucide-react';
import ExerciseProgramModal from '@/components/exercises/ExerciseProgramModal.jsx';
import AssignProgramModal from '@/components/exercises/AssignProgramModal.jsx';
import { toast } from 'sonner';
import Header from '@/components/Header.jsx';
import Sidebar from '@/components/Sidebar.jsx';

export default function ExerciseProgramsPage() {
  const { currentUser } = useAuth();
  const [programs, setPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
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

                <Button onClick={openCreateModal}>
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
                            <Button variant="link" onClick={openCreateModal}>
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
                                onClick={() => openEditModal(prog)}
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