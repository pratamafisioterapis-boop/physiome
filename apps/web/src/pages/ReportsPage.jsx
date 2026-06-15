import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Pastikan Select diimpor
import { BarChart3, Download, Mail, FileText } from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/Header.jsx';
import Sidebar from '@/components/Sidebar.jsx';

export default function ReportsPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  const handleGenerate = (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setReportGenerated(true);
      toast.success('Report generated successfully');
    }, 1500);
  };

  return (
  <>
    <Helmet>
      <title>Reports | Physiome</title>
    </Helmet>

    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">

            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Clinical Reports
              </h1>
              <p className="text-muted-foreground">
                Generate and export patient progress and clinic reports.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                  <h2 className="text-lg font-semibold mb-4">
                    Report Configuration
                  </h2>

                  <form onSubmit={handleGenerate} className="space-y-4">
                    <div className="space-y-2">
                      <Label>Report Type</Label>
                      <Select defaultValue="progress">
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="progress">
                            Patient Progress Report
                          </SelectItem>
                          <SelectItem value="treatment">
                            Treatment Summary
                          </SelectItem>
                          <SelectItem value="outcomes">
                            Outcome Measures
                          </SelectItem>
                          <SelectItem value="discharge">
                            Discharge Summary
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Patient</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select patient" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Patients</SelectItem>
                          <SelectItem value="1">Maya Chen</SelectItem>
                          <SelectItem value="2">Raj Patel</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>From Date</Label>
                        <Input type="date" />
                      </div>

                      <div className="space-y-2">
                        <Label>To Date</Label>
                        <Input type="date" />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isGenerating}
                    >
                      {isGenerating ? 'Generating...' : 'Generate Report'}
                    </Button>
                  </form>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm min-h-[500px] flex flex-col">
                  <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
                    <h2 className="text-lg font-semibold">
                      Report Preview
                    </h2>

                    {reportGenerated && (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toast.info('PDF Export started')}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Export PDF
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toast.info('Email dialog opened')}
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          Email
                        </Button>
                      </div>
                    )}
                  </div>

                  {reportGenerated ? (
                    <div className="flex-1 space-y-6">
                      <div className="text-center space-y-2">
                        <h3 className="text-2xl font-bold">
                          Patient Progress Report
                        </h3>
                        <p className="text-muted-foreground">
                          Generated on {new Date().toLocaleDateString()}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Patient Name
                          </p>
                          <p className="font-medium">Maya Chen</p>
                        </div>

                        <div>
                          <p className="text-sm text-muted-foreground">
                            Date Range
                          </p>
                          <p className="font-medium">Last 30 Days</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold border-b border-border pb-2">
                          Summary
                        </h4>

                        <p className="text-sm leading-relaxed">
                          Patient has shown significant improvement in shoulder
                          mobility over the last 4 weeks. Pain levels have
                          decreased from 7/10 to 2/10 during active range of
                          motion exercises. Adherence to the home exercise
                          program is excellent (85%).
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
                      <BarChart3 className="w-16 h-16 mb-4 opacity-20" />
                      <p>
                        Configure and generate a report to see the preview here.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  </>
);
}