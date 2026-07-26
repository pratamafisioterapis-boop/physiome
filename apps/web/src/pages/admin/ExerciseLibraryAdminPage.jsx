import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header.jsx';
import Sidebar from '@/components/Sidebar.jsx';
import Button from '@/components/Button.jsx';
import Input from '@/components/Input.jsx';
import Table from '@/components/Table.jsx';
import StatCard from '@/components/admin/StatCard.jsx';
import BulkImportExercises from '@/components/admin/BulkImportExercises.jsx';
import BulkExportExercises from '@/components/admin/BulkExportExercises.jsx';
import { Search, Plus, Edit2, Trash2, Copy, Upload, Download, FileText } from 'lucide-react';
import apiServerClient from '@/lib/apiServerClient.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Helmet } from 'react-helmet';

const ExerciseLibraryAdminPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  useEffect(() => {
    const fetchExercises = async () => {
      if (!currentUser) return;
      try {
        const records = await apiServerClient.fetch('/exercises');
        setExercises(records);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExercises();
  }, [currentUser]);

  const filtered = exercises.filter(ex => ex.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <Helmet><title>Manage Exercises | Admin</title></Helmet>
      <div className="min-h-screen bg-background flex flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground tracking-tight">Exercise Library</h1>
                  <p className="text-muted-foreground mt-1">
                    {currentUser?.role === 'super_admin'
                      ? 'Manage the global exercise library shared across all clinics.'
                      : "Manage your clinic's exercise database."}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setIsImportOpen(true)}><Upload className="w-4 h-4 mr-2" /> Import</Button>
                  <Button variant="outline" onClick={() => setIsExportOpen(true)}><Download className="w-4 h-4 mr-2" /> Export</Button>
                  <Button onClick={() => navigate('/admin/exercises/new')}><Plus className="w-4 h-4 mr-2" /> Add Exercise</Button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <StatCard title="Total Exercises" value={exercises.length} icon={FileText} />
                <StatCard title="Published" value={exercises.length} />
                <StatCard title="Drafts" value="0" />
                <StatCard title="Archived" value="0" />
              </div>

              <div className="admin-card space-y-4">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search exercises..." value={search} onChange={e=>setSearch(e.target.value)} className="pl-9" />
                </div>

                {isLoading ? (
                  <div className="h-64 bg-muted/50 rounded-xl animate-pulse" />
                ) : (
                  <Table headers={['Name', 'Region', 'Category', 'Difficulty', 'Status', 'Actions']} isEmpty={filtered.length === 0}>
                    {filtered.map(ex => (
                      <tr key={ex.id}>
                        <td className="font-medium">{ex.name}</td>
                        <td className="text-muted-foreground">{ex.body_region}</td>
                        <td className="text-muted-foreground">{ex.category}</td>
                        <td><span className="px-2 py-1 bg-muted rounded-md text-xs">{ex.difficulty}</span></td>
                        <td><span className="px-2 py-1 bg-[hsl(var(--status-published)/0.1)] text-[hsl(var(--status-published))] rounded-full text-xs font-medium">Published</span></td>
                        <td>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/exercises/${ex.id}/edit`)}><Edit2 className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="sm" className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </Table>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
      <BulkImportExercises isOpen={isImportOpen} onClose={() => setIsImportOpen(false)} />
      <BulkExportExercises isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />
    </>
  );
};

export default ExerciseLibraryAdminPage;