'use client';

import { AppLayout } from '@/components/app-layout';
import { mockLogs, mockThreatIntelligence } from '@/lib/mock-data';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Search, Filter, AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { useState } from 'react';

export default function LogsPage() {
  const [search, setSearch] = useState('');
  const [logLevel, setLogLevel] = useState('all');

  const filteredLogs = mockLogs.filter((log) => {
    const matchesSearch = log.event.toLowerCase().includes(search.toLowerCase()) ||
                         log.details.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = logLevel === 'all' || log.level === logLevel;
    return matchesSearch && matchesLevel;
  });

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'Critical':
        return AlertCircle;
      case 'Warning':
        return AlertTriangle;
      case 'Info':
        return Info;
      default:
        return CheckCircle;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Critical':
        return 'bg-red-500/10 text-red-300 border-red-500/30';
      case 'Warning':
        return 'bg-yellow-500/10 text-yellow-300 border-yellow-500/30';
      case 'Info':
        return 'bg-blue-500/10 text-blue-300 border-blue-500/30';
      default:
        return 'bg-green-500/10 text-green-300 border-green-500/30';
    }
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
            <h1 className="text-3xl md:text-4xl font-bold mb-2">System Logs</h1>
            <p className="text-muted-foreground">Event logs and security activities</p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            className="card-glass p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              <div className="flex gap-2 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search logs..."
                    className="pl-10 bg-white/5 border-white/10"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <Button size="sm" variant="outline" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
                <Button size="sm" variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </div>

              <div className="flex gap-2">
                {['all', 'Critical', 'Warning', 'Info'].map((level) => (
                  <Button
                    key={level}
                    size="sm"
                    variant={logLevel === level ? 'default' : 'outline'}
                    onClick={() => setLogLevel(level)}
                  >
                    {level === 'all' ? 'All Events' : level}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Logs Table */}
          <motion.div
            className="card-glass p-6 rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-6 py-3 text-left text-sm font-semibold">Timestamp</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Event</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Level</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log, idx) => {
                    const IconComponent = getLevelIcon(log.level);
                    return (
                      <motion.tr
                        key={log.id}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <td className="px-6 py-4 text-sm text-muted-foreground">{log.timestamp}</td>
                        <td className="px-6 py-4 text-sm font-semibold">{log.event}</td>
                        <td className="px-6 py-4">
                          <span className={`text-xs px-2 py-1 rounded-full border flex items-center gap-1 w-fit ${getLevelColor(log.level)}`}>
                            <IconComponent className="w-3 h-3" />
                            {log.level}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground max-w-xs truncate">{log.details}</td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Threat Intelligence Feed */}
          <motion.div
            className="card-glass p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl font-semibold mb-6">Active Threat Intelligence</h2>
            <div className="space-y-3">
              {mockThreatIntelligence.map((threat, idx) => (
                <motion.div
                  key={idx}
                  className={`p-4 rounded-lg border ${threat.affected ? 'bg-red-500/10 border-red-500/30' : 'bg-white/5 border-white/10'}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold">{threat.threat}</p>
                        {threat.affected && (
                          <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-300">
                            Active Threat
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{threat.type} • Last seen: {threat.lastSeen}</p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                      threat.severity === 'Critical'
                        ? 'bg-red-500/20 text-red-300'
                        : 'bg-orange-500/20 text-orange-300'
                    }`}>
                      {threat.severity}
                    </span>
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
