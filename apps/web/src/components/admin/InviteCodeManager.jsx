
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import apiServerClient from '@/lib/apiServerClient.js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Copy, Trash2, Ban, Plus, Search, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

export default function InviteCodeManager() {
  const { currentUser } = useAuth();
  const [codes, setCodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [formData, setFormData] = useState({
    role: 'therapist',
    expires_at: ''
  });
  const [generatedCode, setGeneratedCode] = useState('');

  const fetchCodes = async () => {
    setIsLoading(true);
    try {
      const records = await apiServerClient.fetch('/invite-codes');
      setCodes(records);
    } catch (error) {
      console.error('Error fetching invite codes:', error);
      toast.error('Failed to load invite codes');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser?.role === 'admin') {
      fetchCodes();
    }
  }, [currentUser]);

  const generateRandomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 10; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    try {
      const newCode = generateRandomCode();
      const data = {
        code: newCode,
        role: formData.role,
        is_active: true,
        expires_at: formData.expires_at ? new Date(formData.expires_at).toISOString() : null
      };

      await apiServerClient.fetch('/invite-codes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      setGeneratedCode(newCode);
      toast.success('Invite code generated successfully');
      fetchCodes();
    } catch (error) {
      console.error('Error generating code:', error);
      toast.error('Failed to generate invite code');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDeactivate = async (id) => {
    try {
      await apiServerClient.fetch(`/invite-codes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: false })
      });
      toast.success('Code deactivated');
      fetchCodes();
    } catch (error) {
      toast.error('Failed to deactivate code');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this invite code?')) return;
    try {
      await apiServerClient.fetch(`/invite-codes/${id}`, { method: 'DELETE' });
      toast.success('Code deleted');
      fetchCodes();
    } catch (error) {
      toast.error('Failed to delete code');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  const filteredCodes = codes.filter(c =>
    c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.users?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (currentUser?.role !== 'admin') {
    return (
      <div className="p-6 text-center text-muted-foreground bg-card rounded-xl border border-border">
        You do not have permission to view this section.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold">Invite Codes</h2>
          <p className="text-sm text-muted-foreground">Manage registration codes for new staff and patients.</p>
        </div>
        <Button onClick={() => {
          setGeneratedCode('');
          setFormData({ role: 'therapist', expires_at: '' });
          setIsModalOpen(true);
        }}>
          <Plus className="w-4 h-4 mr-2" />
          Generate New Code
        </Button>
      </div>

      <div className="flex items-center gap-4 bg-card p-4 rounded-xl border border-border">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search codes, roles, or emails..." 
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
              <TableHead>Code</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Used By</TableHead>
              <TableHead>Expires</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Loading codes...</TableCell>
              </TableRow>
            ) : filteredCodes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No invite codes found.</TableCell>
              </TableRow>
            ) : (
              filteredCodes.map((code) => {
                const isExpired = code.expires_at && new Date(code.expires_at) < new Date();
                const isUsed = !!code.used_by;
                
                let statusBadge = <Badge variant="default" className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20">Active</Badge>;
                if (isUsed) statusBadge = <Badge variant="secondary">Used</Badge>;
                else if (!code.is_active) statusBadge = <Badge variant="destructive" className="bg-red-500/10 text-red-600 hover:bg-red-500/20 border-red-500/20">Inactive</Badge>;
                else if (isExpired) statusBadge = <Badge variant="outline" className="text-muted-foreground">Expired</Badge>;

                return (
                  <TableRow key={code.id}>
                    <TableCell className="font-mono font-medium">{code.code}</TableCell>
                    <TableCell className="capitalize">{code.role}</TableCell>
                    <TableCell>{statusBadge}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {code.users?.email || '-'}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {code.expires_at ? format(new Date(code.expires_at), 'MMM d, yyyy') : 'Never'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => copyToClipboard(code.code)} title="Copy Code">
                          <Copy className="w-4 h-4" />
                        </Button>
                        {!isUsed && code.is_active && (
                          <Button variant="ghost" size="icon" onClick={() => handleDeactivate(code.id)} title="Deactivate">
                            <Ban className="w-4 h-4 text-orange-500" />
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(code.id)} title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Generate Invite Code</DialogTitle>
          </DialogHeader>
          
          {!generatedCode ? (
            <form onSubmit={handleGenerate} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Role</Label>
                <Select 
                  value={formData.role} 
                  onValueChange={(val) => setFormData({...formData, role: val})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="therapist">Therapist</SelectItem>
                    <SelectItem value="patient">Patient</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Expiration Date (Optional)</Label>
                <Input 
                  type="date" 
                  value={formData.expires_at} 
                  onChange={(e) => setFormData({...formData, expires_at: e.target.value})} 
                  min={new Date().toISOString().split('T')[0]}
                />
                <p className="text-xs text-muted-foreground">Leave blank for a code that never expires.</p>
              </div>

              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={isGenerating}>
                  {isGenerating ? 'Generating...' : 'Generate Code'}
                </Button>
              </DialogFooter>
            </form>
          ) : (
            <div className="py-6 space-y-6 text-center">
              <div className="w-12 h-12 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Code generated successfully</p>
                <div className="flex items-center justify-center gap-2 bg-muted p-4 rounded-lg border border-border">
                  <span className="text-2xl font-mono font-bold tracking-wider">{generatedCode}</span>
                  <Button variant="ghost" size="icon" onClick={() => copyToClipboard(generatedCode)}>
                    <Copy className="w-5 h-5" />
                  </Button>
                </div>
              </div>
              <Button className="w-full" onClick={() => setIsModalOpen(false)}>Done</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
