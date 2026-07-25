
import React, { useState, useEffect } from 'react';
import { Smartphone, Eye, MoreHorizontal, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import apiServerClient from '@/lib/apiServerClient.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import Sidebar from '@/components/Sidebar.jsx';
import Header from '@/components/Header.jsx';
import { toast } from 'sonner';

export default function AssignedProgramsPage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      if (!currentUser) return;
      try {
        const data = await apiServerClient.fetch('/program-assignments');
        setAssignments(Array.isArray(data) ? data : data.data || []);
      } catch (error) {
        console.error("Error fetching assignments:", error);
        toast.error("Failed to load assignments");
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, [currentUser]);

  const handleViewDetails = (assignment) => {
    if (!assignment.patient_id) {
      toast.error('Patient record not found for this assignment');
      return;
    }
    navigate(`/patients/${assignment.patient_id}/programs`);
  };

  const handlePreviewPatientApp = () => {
    if (assignments.length === 0) {
      toast.error('No active assignments to preview yet');
      return;
    }
    navigate(`/patient/programs/${assignments[0].id}`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 ml-0 md:ml-64 flex flex-col min-w-0">
        <Header title="Assigned Programs" />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h2 className="text-3xl font-bold text-foreground tracking-tight">Active Assignments</h2>
            <div className="flex flex-wrap gap-2">
              <Button className="rounded-full shrink-0" onClick={() => navigate('/exercise-programs')}>
                <UserPlus className="w-4 h-4 mr-2" /> Prescribe Exercise
              </Button>
              <Button variant="outline" className="rounded-full shrink-0" onClick={handlePreviewPatientApp}>
                <Smartphone className="w-4 h-4 mr-2" /> Patient App Preview
              </Button>
            </div>
          </div>

          <Card className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
            <div className="hidden md:block">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="font-semibold text-foreground">Patient</TableHead>
                  <TableHead className="font-semibold text-foreground">Program Name</TableHead>
                  <TableHead className="font-semibold text-foreground">Assigned Date</TableHead>
                  <TableHead className="font-semibold text-foreground">Status</TableHead>
                  <TableHead className="font-semibold text-foreground">Adherence</TableHead>
                  <TableHead className="text-right font-semibold text-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground animate-pulse">Loading assignments...</TableCell></TableRow>
                ) : assignments.length === 0 ? (
                  <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No assigned programs</TableCell></TableRow>
                ) : assignments.map(a => (
                  <TableRow key={a.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium text-foreground">{a.patient?.name || 'Unknown Patient'}</TableCell>
                    <TableCell>{a.program_name}</TableCell>
                    <TableCell className="text-muted-foreground">{new Date(a.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge className={a.status === 'Active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}>
                        {a.status || 'Active'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-muted rounded-full h-2 max-w-[100px]">
                          <div className="bg-primary h-2 rounded-full" style={{ width: `${a.adherence_rate || 0}%` }} />
                        </div>
                        <span className="text-xs font-medium">{a.adherence_rate || 0}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="h-8 text-primary hover:bg-primary/10" onClick={() => handleViewDetails(a)}>
                        <Eye className="w-4 h-4 mr-2" /> View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </div>
          </Card>

          {/* Mobile Cards View */}
          {!loading && assignments.length > 0 && (
            <div className="md:hidden space-y-4 mt-6">
              {assignments.map(a => (
                <div key={`mobile-${a.id}`} className="flex flex-col p-4 bg-card border border-border rounded-xl shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium text-foreground">{a.patient?.name || 'Unknown Patient'}</h3>
                      <p className="text-xs text-primary font-medium">{a.program_name}</p>
                    </div>
                    <Badge className={a.status === 'Active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}>
                      {a.status || 'Active'}
                    </Badge>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Adherence</span>
                      <span className="font-medium text-foreground">{a.adherence_rate || 0}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div className="bg-primary h-1.5 rounded-full" style={{ width: `${a.adherence_rate || 0}%` }} />
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full text-primary border-primary/20 hover:bg-primary/5" onClick={() => handleViewDetails(a)}>
                    <Eye className="w-4 h-4 mr-2" /> View Details
                  </Button>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
