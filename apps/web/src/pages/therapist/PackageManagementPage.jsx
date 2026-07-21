
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext';
import apiServerClient from '@/lib/apiServerClient.js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit2, Trash2, Package } from 'lucide-react';
import CreatePackageModal from '@/components/billing/CreatePackageModal';
import { toast } from 'sonner';

export default function PackageManagementPage() {
  const { currentUser } = useAuth();
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);

  const fetchPackages = async () => {
    if (!currentUser?.clinic_id) return;
    setIsLoading(true);
    try {
      const records = await apiServerClient.fetch('/packages');
      setPackages(records);
    } catch (error) {
      console.error('Error fetching packages:', error);
      toast.error('Failed to load packages');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, [currentUser]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this package?')) return;
    try {
      await apiServerClient.fetch(`/packages/${id}`, { method: 'DELETE' });
      toast.success('Package deleted');
      fetchPackages();
    } catch (error) {
      toast.error('Failed to delete package');
    }
  };

  const openEditModal = (pkg) => {
    setEditingPackage(pkg);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditingPackage(null);
    setIsModalOpen(true);
  };

  const filteredPackages = packages.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <Helmet><title>Package Management | Physiome</title></Helmet>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Packages</h1>
          <p className="text-muted-foreground">Manage billing packages and session bundles.</p>
        </div>
        <Button onClick={openCreateModal}>
          <Plus className="w-4 h-4 mr-2" />
          Create Package
        </Button>
      </div>

      <div className="flex items-center gap-4 bg-card p-4 rounded-xl border border-border">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search packages..." 
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
              <TableHead>Sessions</TableHead>
              <TableHead>Validity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Loading packages...</TableCell>
              </TableRow>
            ) : filteredPackages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <Package className="w-12 h-12 mb-4 opacity-20" />
                    <p>No packages found.</p>
                    <Button variant="link" onClick={openCreateModal}>Create your first package</Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredPackages.map((pkg) => (
                <TableRow key={pkg.id}>
                  <TableCell className="font-medium">{pkg.name}</TableCell>
                  <TableCell>{pkg.sessions}</TableCell>
                  <TableCell>{pkg.validity_days} days</TableCell>
                  <TableCell className="tabular-nums">${pkg.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={pkg.active ? 'default' : 'secondary'} className={pkg.active ? 'bg-[hsl(var(--billing-success))]' : ''}>
                      {pkg.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEditModal(pkg)}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(pkg.id)}>
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

      <CreatePackageModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchPackages}
        editPackage={editingPackage}
      />
    </div>
  );
}
