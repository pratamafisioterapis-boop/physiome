
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext';
import apiServerClient from '@/lib/apiServerClient.js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, CreditCard } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function PaymentListPage() {
  const { currentUser } = useAuth();
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPayments = async () => {
    if (!currentUser?.clinic_id) return;
    setIsLoading(true);
    try {
      const records = await apiServerClient.fetch('/billing/payments');
      setPayments(records);
    } catch (error) {
      console.error('Error fetching payments:', error);
      toast.error('Failed to load payments');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [currentUser]);

  const filteredPayments = payments.filter(pay =>
    pay.patients?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pay.referenceNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <Helmet><title>Payments | Physiome</title></Helmet>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
          <p className="text-muted-foreground">Track received payments and transactions.</p>
        </div>
        <Button onClick={() => toast.info('Record Payment modal coming soon')}>
          <Plus className="w-4 h-4 mr-2" />
          Record Payment
        </Button>
      </div>

      <div className="flex items-center gap-4 bg-card p-4 rounded-xl border border-border">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search by patient or reference..." 
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
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Invoice #</TableHead>
              <TableHead>Reference</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Loading payments...</TableCell>
              </TableRow>
            ) : filteredPayments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <CreditCard className="w-12 h-12 mb-4 opacity-20" />
                    <p>No payments found.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredPayments.map((pay) => (
                <TableRow key={pay.id}>
                  <TableCell>{format(new Date(pay.paymentDate), 'MMM d, yyyy')}</TableCell>
                  <TableCell className="font-medium">{pay.patients?.name || 'Unknown'}</TableCell>
                  <TableCell className="tabular-nums font-semibold text-[hsl(var(--billing-success))]">
                    ${Number(pay.paymentAmount || 0).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{pay.paymentMethod}</Badge>
                  </TableCell>
                  <TableCell>{pay.invoices?.invoiceNumber || '-'}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{pay.referenceNumber || '-'}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
