
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext';
import apiServerClient from '@/lib/apiServerClient.js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, FileText, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function InvoiceListPage() {
  const { currentUser } = useAuth();
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchInvoices = async () => {
    if (!currentUser?.clinic_id) return;
    setIsLoading(true);
    try {
      const records = await apiServerClient.fetch('/billing/invoices');
      setInvoices(records);
    } catch (error) {
      console.error('Error fetching invoices:', error);
      toast.error('Failed to load invoices');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, [currentUser]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Paid': return 'bg-[hsl(var(--billing-success))] text-white';
      case 'Pending': return 'bg-[hsl(var(--billing-info))] text-white';
      case 'Partial': return 'bg-[hsl(var(--billing-warning))] text-black';
      case 'Overdue': return 'bg-[hsl(var(--billing-danger))] text-white';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const filteredInvoices = invoices.filter(inv =>
    inv.invoiceNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.patients?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <Helmet><title>Invoices | Physiome</title></Helmet>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
          <p className="text-muted-foreground">Manage patient billing and invoices.</p>
        </div>
        <Button onClick={() => toast.info('Create Invoice modal coming soon')}>
          <Plus className="w-4 h-4 mr-2" />
          Create Invoice
        </Button>
      </div>

      <div className="flex items-center gap-4 bg-card p-4 rounded-xl border border-border">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search by invoice number or patient..." 
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
              <TableHead>Invoice #</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Loading invoices...</TableCell>
              </TableRow>
            ) : filteredInvoices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <FileText className="w-12 h-12 mb-4 opacity-20" />
                    <p>No invoices found.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredInvoices.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="font-medium">{inv.invoiceNumber}</TableCell>
                  <TableCell>{inv.patients?.name || 'Unknown'}</TableCell>
                  <TableCell>{format(new Date(inv.invoiceDate), 'MMM d, yyyy')}</TableCell>
                  <TableCell className="tabular-nums">${Number(inv.totalAmount || 0).toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(inv.status)}>
                      {inv.status || 'Pending'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => toast.info('View details coming soon')}>
                      <Eye className="w-4 h-4 mr-2" /> View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
