'use client';

import { AppLayout } from '@/components/app-layout';
import { RiskGauge } from '@/components/dashboard/risk-gauge';
import { ThreatFeed } from '@/components/dashboard/threat-feed';
import { MetricCard } from '@/components/dashboard/metric-card';
import { ChartSection } from '@/components/dashboard/chart-section';
import { ThreatMap } from '@/components/dashboard/threat-map';
import { mockDashboard } from '@/lib/mock-data';
import { AlertCircle, RefreshCw, Download, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  return (
    <AppLayout>
      <main className="min-h-screen bg-background grid-bg relative">
        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8">
          
          {/* Header */}
          <motion.div 
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Security Dashboard</h1>
              <p className="text-muted-foreground">Real-time threat monitoring and security analytics</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </Button>
              <Button size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </motion.div>

          {/* Alert Banner */}
          {mockDashboard.recentThreats.length > 0 && (
            <motion.div
              className="glass rounded-lg border border-red-500/30 p-4 flex items-start gap-3 bg-red-500/5"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-red-300">Active Threats Detected</p>
                <p className="text-sm text-red-200/80 mt-1">
                  {mockDashboard.recentThreats.length} threats detected in the last 24 hours. Immediate action required.
                </p>
              </div>
            </motion.div>
          )}

          {/* Top Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              label="Risk Score"
              value={mockDashboard.riskScore}
              unit="/ 100"
              variant="danger"
              trend="up"
              trendValue={5}
            />
            <MetricCard
              label="Threats Today"
              value={mockDashboard.threatsTodayCount}
              unit="detected"
              variant="danger"
              trend="up"
              trendValue={12}
            />
            <MetricCard
              label="Vulnerabilities"
              value={mockDashboard.vulnerabilitiesCount}
              unit="critical"
              variant="warning"
              trend="stable"
              trendValue={0}
            />
            <MetricCard
              label="Attacks Blocked"
              value={mockDashboard.attacksBlockedCount}
              unit="24h"
              variant="success"
              trend="up"
              trendValue={8}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            
            {/* Left Column - Risk Gauge & Systems */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {/* Risk Gauge */}
              <div className="card-glass p-8 text-center">
                <h3 className="text-lg font-semibold mb-6">Overall Risk Level</h3>
                <RiskGauge value={mockDashboard.riskScore} size={200} />
                <p className="text-sm text-muted-foreground mt-6">
                  Last scan: {mockDashboard.lastScanTime}
                </p>
              </div>

              {/* System Status */}
              <div className="card-glass p-6">
                <h3 className="text-lg font-semibold mb-4">System Status</h3>
                <div className="space-y-3">
                  {mockDashboard.systemsStatus.map((system, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-lg bg-white/5"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <div>
                        <p className="font-medium text-sm">{system.name}</p>
                        <p className="text-xs text-muted-foreground">{system.uptime}% uptime</p>
                      </div>
                      <div className="px-2 py-1 rounded-full bg-green-500/20">
                        <span className="text-xs text-green-400">{system.status}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Center Column - Threat Feed */}
            <motion.div
              className="card-glass p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-6">Real-Time Threat Feed</h3>
              <ThreatFeed />
            </motion.div>

            {/* Right Column - Infrastructure Stats */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="card-glass p-6">
                <h3 className="text-lg font-semibold mb-6">Infrastructure Overview</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Systems Monitored</span>
                    <span className="text-2xl font-bold">{mockDashboard.systemsMonitored}</span>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#00f5a0] to-[#00d87d]"
                      initial={{ width: 0 }}
                      whileInView={{ width: '85%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">85% healthy systems</div>
                </div>
              </div>

              <div className="card-glass p-6">
                <h3 className="text-lg font-semibold mb-6">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Critical Issues</span>
                    <span className="text-red-400 font-semibold">{mockDashboard.vulnerabilitiesCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Compliance Score</span>
                    <span className="text-[#00f5a0] font-semibold">94%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Response Time</span>
                    <span className="text-yellow-400 font-semibold">&lt; 5 min</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Global Cyber Threat Map */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">Global Cyber Threat Map</h3>
                <p className="text-sm text-muted-foreground mt-1">Real-time visualization of active threat intelligence intercepts (Demonstrative UI)</p>
              </div>
              <div className="px-3 py-1 rounded-full bg-primary/20 border border-primary/40">
                <span className="text-xs font-semibold text-primary">SIMULATION MODE</span>
              </div>
            </div>
            <ThreatMap />
          </motion.div>

          {/* Charts Section */}
          <ChartSection />

        </div>
      </main>
    </AppLayout>
  );
}
