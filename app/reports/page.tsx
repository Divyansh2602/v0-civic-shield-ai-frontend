'use client';

import { AppLayout } from '@/components/app-layout';
import { mockReports } from '@/lib/mock-data';
import { motion } from 'framer-motion';
import { FileText, Download, Eye, Calendar, Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ReportsPage() {
  return (
    <AppLayout>
      <main className="min-h-screen bg-background grid-bg">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8">
          
          {/* Header */}
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Reports & Analytics</h1>
              <p className="text-muted-foreground">Security reports and compliance documentation</p>
            </div>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Generate Report
            </Button>
          </motion.div>

          {/* Report Templates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl font-semibold mb-4">Report Templates</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'Executive Summary', description: 'High-level security overview' },
                { name: 'Vulnerability Report', description: 'Detailed vulnerability findings' },
                { name: 'Compliance Report', description: 'Standards compliance status' },
                { name: 'Threat Analysis', description: 'Threat landscape summary' },
                { name: 'Remediation Plan', description: 'Issue remediation roadmap' },
                { name: 'Penetration Test', description: 'Pentest findings report' },
              ].map((template, idx) => (
                <motion.div
                  key={idx}
                  className="card-glass p-4 hover:border-[#00f5a0]/50 transition-all cursor-pointer group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <FileText className="w-5 h-5 text-[#00f5a0] mb-2 group-hover:scale-110 transition-transform" />
                  <p className="font-semibold text-sm">{template.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
                  <Button size="sm" variant="ghost" className="w-full mt-3">
                    Use Template
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Generated Reports List */}
          <motion.div
            className="card-glass p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Generated Reports</h2>
              <Button size="sm" variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-6 py-3 text-left text-sm font-semibold">Report Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Generated</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Format</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockReports.map((report, idx) => (
                    <motion.tr
                      key={report.id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <td className="px-6 py-4 text-sm">{report.name}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {report.date}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-300">
                          {report.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">{report.format}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" className="gap-1">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="gap-1">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Report Scheduling */}
          <motion.div
            className="card-glass p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl font-semibold mb-4">Scheduled Reports</h2>
            <div className="space-y-3">
              {[
                { name: 'Monthly Executive Report', schedule: 'First Monday of each month', next: '2024-04-01' },
                { name: 'Weekly Threat Summary', schedule: 'Every Monday at 9:00 AM', next: '2024-03-18' },
                { name: 'Quarterly Compliance Review', schedule: 'Last day of each quarter', next: '2024-03-31' },
              ].map((schedule, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center justify-between p-4 rounded-lg bg-white/5"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div>
                    <p className="font-semibold">{schedule.name}</p>
                    <p className="text-sm text-muted-foreground">{schedule.schedule}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Next: {schedule.next}</p>
                    <Button size="sm" variant="ghost" className="mt-1">Edit</Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </main>
    </AppLayout>
  );
}
