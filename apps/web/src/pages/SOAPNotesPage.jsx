import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext';
import pb from '@/lib/pocketbaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Pastikan Input diimpor
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit2, Trash2, FileText } from 'lucide-react';
import SOAPNoteModal from '@/components/soap/SOAPNoteModal.jsx';
import { format } from 'date-fns';
import { toast } from 'sonner';
import Header from '@/components/Header.jsx';
import Sidebar from '@/components/Sidebar.jsx';

export default function SOAPNotesPage() {
  const { currentUser } = useAuth();
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const fetchNotes = async () => {
    if (!currentUser?.clinic_id) return;
    setIsLoading(true);
    try {
      const records = await pb.collection('SOAPNotes').getList(1, 50, {
        filter: `clinic_id = "${currentUser.clinic_id}" && therapist_id = "${currentUser.id}"`,
        sort: '-created',
        expand: 'patient_id',
        $autoCancel: false
      });
      setNotes(records.items);
    } catch (error) {
      console.error('Error fetching notes:', error);
      toast.error('Failed to load SOAP notes');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [currentUser]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    try {
      await pb.collection('SOAPNotes').delete(id, { $autoCancel: false });
      toast.success('Note deleted');
      fetchNotes();
    } catch (error) {
      toast.error('Failed to delete note');
    }
  };

  const openEditModal = (note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditingNote(null);
    setIsModalOpen(true);
  };

  const filteredNotes = notes.filter(n => 
    n.expand?.patient_id?.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>SOAP Notes | Physiome</title>
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col md:flex-row">
        <Sidebar />

        <div className="flex-1 flex flex-col min-w-0">
          <Header />

          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto space-y-6">

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">SOAP Notes</h1>
                  <p className="text-muted-foreground">
                    Manage patient clinical documentation.
                  </p>
                </div>

                <Button onClick={openCreateModal}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Note
                </Button>
              </div>

              <div className="flex items-center gap-4 bg-card p-4 rounded-xl border border-border">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by patient name..."
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
                      <TableHead>Date</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell
                          colSpan={4}
                          className="text-center py-8 text-muted-foreground"
                        >
                          Loading notes...
                        </TableCell>
                      </TableRow>
                    ) : filteredNotes.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-12">
                          <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <FileText className="w-12 h-12 mb-4 opacity-20" />
                            <p>No SOAP notes found.</p>
                            <Button variant="link" onClick={openCreateModal}>
                              Create your first note
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredNotes.map((note) => (
                        <TableRow key={note.id}>
                          <TableCell>
                            {format(new Date(note.created), 'MMM d, yyyy')}
                          </TableCell>

                          <TableCell className="font-medium">
                            {note.expand?.patient_id?.full_name || 'Unknown Patient'}
                          </TableCell>

                          <TableCell>
                            <Badge
                              variant={
                                note.status === 'finalized'
                                  ? 'default'
                                  : 'secondary'
                              }
                            >
                              {note.status || 'draft'}
                            </Badge>
                          </TableCell>

                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openEditModal(note)}
                              >
                                <Edit2 className="w-4 h-4" />
                              </Button>

                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive"
                                onClick={() => handleDelete(note.id)}
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

      <SOAPNoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchNotes}
        editNote={editingNote}
      />
    </>
  );
}