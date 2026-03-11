'use client';

import { AppLayout } from '@/components/app-layout';
import { mockVulnerabilities, mockScanResults } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Zap, Filter, Download, Play, Pause } from 'lucide-react';

export default function ScannerPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [filter, setFilter] = useState('all');

  const filteredVulnerabilities = mockVulnerabilities.filter((v) => {
    if (filter === 'all') return true;
    if (filter === 'open') return v.status === 'Open';
    if (filter === 'critical') return v.severity === 'Critical';
    return true;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'High':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'Medium':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      default:
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Open'
      ? 'bg-red-500/20 text-red-300'
      : status === 'In Progress'
      ? 'bg-yellow-500/20 text-yellow-300'
      : 'bg-green-500/20 text-green-300';
  };

  return (
    <AppLayout>
      <main className="min-h-screen bg-background grid-bg">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Vulnerability Scanner</h1>
            <p className="text-muted-foreground">Comprehensive vulnerability assessment and management</p>
          </motion.div>

          {/* Scan Controls */}
          <motion.div
            className="card-glass p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
              <div className="flex-1">
                <label className="text-sm font-medium block mb-2">Target/Asset</label>
                <Input
                  placeholder="Enter URL or IP address..."
                  className="bg-white/5 border-white/10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => setIsScanning(!isScanning)}
                  className={`${
                    isScanning
                      ? 'bg-red-500/80 hover:bg-red-600/80'
                      : 'bg-gradient-to-r from-[#00f5a0] to-[#00d87d] hover:from-[#00e090] hover:to-[#00cc70]'
                  } text-background gap-2`}
                >
                  {isScanning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isScanning ? 'Stop' : 'Start'} Scan
                </Button>
                <Button variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </div>
            </div>

            {isScanning && (
              <motion.div
                className="mt-6 space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm">Scanning in progress...</span>
                  <span className="text-sm font-semibold text-[#00f5a0]">{scanProgress}%</span>
                </div>
                <motion.div
                  className="h-2 bg-white/10 rounded-full overflow-hidden"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#00f5a0] to-[#00d87d]"
                    initial={{ width: 0 }}
                    animate={{ width: `${scanProgress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>
              </motion.div>
            )}
          </motion.div>

          {/* Scan Results Summary */}
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { label: 'Total', value: mockScanResults.totalVulnerabilities, color: 'text-white' },
              { label: 'Critical', value: mockScanResults.critical, color: 'text-red-400' },
              { label: 'High', value: mockScanResults.high, color: 'text-orange-400' },
              { label: 'Medium', value: mockScanResults.medium, color: 'text-yellow-400' },
              { label: 'Low', value: mockScanResults.low, color: 'text-green-400' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                className="card-glass p-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <p className="text-muted-foreground text-sm mb-2">{stat.label}</p>
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Filters and List */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button
                variant={filter === 'critical' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('critical')}
              >
                Critical Only
              </Button>
              <Button
                variant={filter === 'open' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('open')}
              >
                Open Issues
              </Button>
            </div>

            {/* Vulnerabilities Table */}
            <motion.div
              className="card-glass rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-6 py-3 text-left text-sm font-semibold">Vulnerability</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Severity</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">CVSS</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Affected</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVulnerabilities.map((vuln, idx) => (
                      <motion.tr
                        key={vuln.id}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <td className="px-6 py-4 text-sm">{vuln.name}</td>
                        <td className="px-6 py-4">
                          <span className={`text-xs px-2 py-1 rounded-full border ${getSeverityColor(vuln.severity)}`}>
                            {vuln.severity}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold">{vuln.cvss}</td>
                        <td className="px-6 py-4">
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(vuln.status)}`}>
                            {vuln.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">{vuln.affected}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

        </div>
      </main>
    </AppLayout>
  );
}
