'use client';

import { AppLayout } from '@/components/app-layout';
import { mockAPISecurityData } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Lock, AlertCircle, TrendingUp, Zap, RefreshCw } from 'lucide-react';

const anomalyData = [
  { time: '00:00', requests: 234, anomalies: 12 },
  { time: '04:00', requests: 189, anomalies: 8 },
  { time: '08:00', requests: 567, anomalies: 34 },
  { time: '12:00', requests: 789, anomalies: 45 },
  { time: '16:00', requests: 654, anomalies: 28 },
  { time: '20:00', requests: 432, anomalies: 18 },
  { time: '23:59', requests: 345, anomalies: 15 },
];

export default function APISecurityPage() {
  return (
    <AppLayout>
      <main className="min-h-screen bg-background grid-bg">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">API Security Monitoring</h1>
            <p className="text-muted-foreground">Real-time API threat detection and behavioral analysis</p>
          </motion.div>

          {/* Alert Banner */}
          <motion.div
            className="glass rounded-lg border border-orange-500/30 p-4 flex items-start gap-3 bg-orange-500/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-orange-300">Elevated Anomalous Activity</p>
              <p className="text-sm text-orange-200/80 mt-1">
                {mockAPISecurityData.anomalousRequests} anomalous requests detected. Review pattern analysis below.
              </p>
            </div>
          </motion.div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Lock, label: 'Endpoints Monitored', value: mockAPISecurityData.endpointsMonitored, color: 'from-[#00f5a0]' },
              { icon: AlertCircle, label: 'Anomalous Requests', value: mockAPISecurityData.anomalousRequests, color: 'from-orange-400' },
              { icon: Zap, label: 'Rate Limit Exceeded', value: mockAPISecurityData.rateLimitExceeded, color: 'from-yellow-400' },
            ].map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={idx}
                  className="card-glass p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${metric.color} to-transparent opacity-20`}>
                      <Icon className={`w-6 h-6 text-${metric.color.split('-')[1]}-400`} />
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-1">{metric.label}</p>
                  <p className="text-3xl font-bold">{metric.value}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Additional Metrics Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              className="card-glass p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Authentication Failures</h3>
                <TrendingUp className="w-5 h-5 text-orange-400" />
              </div>
              <p className="text-3xl font-bold text-orange-400 mb-2">{mockAPISecurityData.authenticationFailures}</p>
              <p className="text-sm text-muted-foreground">Failed auth attempts in 24h</p>
              <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-orange-400 to-orange-600"
                  initial={{ width: 0 }}
                  whileInView={{ width: '65%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </motion.div>

            <motion.div
              className="card-glass p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Data Leakage Incidents</h3>
                <AlertCircle className="w-5 h-5 text-red-400" />
              </div>
              <p className="text-3xl font-bold text-red-400 mb-2">{mockAPISecurityData.dataLeakageDetected}</p>
              <p className="text-sm text-muted-foreground">Potential data exposure events</p>
              <Button className="w-full mt-4" size="sm" variant="outline">
                Review Details
              </Button>
            </motion.div>
          </div>

          {/* Request Anomaly Chart */}
          <motion.div
            className="card-glass p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">API Request Anomalies</h3>
              <Button size="sm" variant="outline" className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </Button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={anomalyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis stroke="rgba(255,255,255,0.5)" dataKey="time" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(10, 14, 39, 0.95)',
                    border: '1px solid rgba(0, 245, 160, 0.3)',
                    borderRadius: '0.5rem',
                  }}
                />
                <Legend />
                <Bar dataKey="requests" fill="#00f5a0" isAnimationActive={true} />
                <Bar dataKey="anomalies" fill="#ff3366" isAnimationActive={true} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Suspicious Patterns */}
          <motion.div
            className="card-glass p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6">Suspicious Patterns Detected</h3>
            <div className="space-y-3">
              {[
                { pattern: 'Distributed Rate Limiting Attempts', risk: 'High', count: 34, color: 'orange' },
                { pattern: 'Credential Stuffing Signatures', risk: 'Critical', count: 12, color: 'red' },
                { pattern: 'Parameter Injection Attempts', risk: 'Medium', count: 21, color: 'yellow' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className={`p-4 rounded-lg border bg-${item.color}-500/10 border-${item.color}-500/30`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{item.pattern}</p>
                      <p className={`text-xs text-${item.color}-200 mt-1`}>{item.count} instances detected</p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold bg-${item.color}-500/20 text-${item.color}-300`}>
                      {item.risk}
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
