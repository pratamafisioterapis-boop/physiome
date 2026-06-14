
import React, { useState, useEffect } from 'react';
import { Smartphone, Eye, MoreHorizontal } from 'lucide-react';
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

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Header title="Assigned Programs" />
        <main className="flex-1 p-8">
          
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-foreground">Active Assignments</h2>
            <Button variant="outline" className="rounded-full">
              <Smartphone className="w-4 h-4 mr-2" /> Patient App Preview
            </Button>
          </div>

          <Card className="border-0 shadow-soft overflow-hidden">
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
                    <TableCell className="font-medium text-foreground">{a.patients?.name || 'Unknown Patient'}</TableCell>
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
                      <Button variant="ghost" size="sm" className="h-8 text-primary hover:bg-primary/10">
                        <Eye className="w-4 h-4 mr-2" /> View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

        </main>
      </div>
    </div>
  );
}
