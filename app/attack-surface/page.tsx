'use client';

import { AppLayout } from '@/components/app-layout';
import { NetworkGraph } from '@/components/dashboard/network-graph';
import { mockAttackSurface } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Network, AlertTriangle, Shield, Zap, RefreshCw, Globe } from 'lucide-react';

export default function AttackSurfacePage() {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'Medium':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      default:
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    }
  };

  const getExposureIcon = (exposure: string) => {
    return exposure === 'Public' ? '🌐' : '🔒';
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
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Attack Surface Management</h1>
            <p className="text-muted-foreground">Monitor and manage your external attack surface exposure</p>
          </motion.div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              className="card-glass p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-[#00f5a0]" />
                  <h3 className="font-semibold">Domains Discovered</h3>
                </div>
              </div>
              <p className="text-3xl font-bold mb-2">9</p>
              <p className="text-sm text-muted-foreground">Target and subdomains via recon</p>
            </motion.div>

            <motion.div
              className="card-glass p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <ApiIcon className="w-5 h-5 text-[#00f5a0]" />
                  <h3 className="font-semibold">APIs Exposed</h3>
                </div>
              </div>
              <p className="text-3xl font-bold mb-2">0</p>
              <p className="text-sm text-muted-foreground">Active endpoints detected</p>
            </motion.div>

            <motion.div
              className="card-glass p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <h3 className="font-semibold">High-Risk Assets</h3>
                </div>
              </div>
              <p className="text-3xl font-bold text-red-400 mb-2">1</p>
              <p className="text-sm text-muted-foreground">Require immediate attention</p>
            </motion.div>
          </div>

          {/* Network Visualization */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="text-xl font-semibold mb-2">Attack Surface Map</h3>
              <p className="text-sm text-muted-foreground">Network topology showing exposed endpoints and their relationships</p>
            </div>
            <NetworkGraph />
          </motion.div>

          {/* Exposed Services */}
          <motion.div
            className="card-glass p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Exposed Services</h2>
              <Button size="sm" variant="outline" className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Scan
              </Button>
            </div>

            <div className="space-y-3">
              {mockAttackSurface.exposedServices.map((service, idx) => (
                <motion.div
                  key={idx}
                  className={`p-4 rounded-lg border ${getRiskColor(service.risk)}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{getExposureIcon(service.exposure)}</span>
                      <div>
                        <p className="font-semibold">{service.service}</p>
                        <p className="text-xs opacity-75">{service.exposure}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">Risk: {service.risk}</p>
                      <p className="text-xs opacity-75">{service.affected} instances</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Asset Distribution */}
          <motion.div
            className="card-glass p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-6">Asset Risk Distribution</h2>
            <div className="space-y-6">
              {[
                { category: 'Critical Risk', count: 45, color: 'bg-red-500/20', textColor: 'text-red-400' },
                { category: 'High Risk', count: 128, color: 'bg-orange-500/20', textColor: 'text-orange-400' },
                { category: 'Medium Risk', count: 234, color: 'bg-yellow-500/20', textColor: 'text-yellow-400' },
                { category: 'Low Risk', count: 445, color: 'bg-blue-500/20', textColor: 'text-blue-400' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{item.category}</span>
                    <span className={`text-sm font-semibold ${item.textColor}`}>{item.count} assets</span>
                  </div>
                  <motion.div
                    className="h-3 bg-white/10 rounded-full overflow-hidden"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                  >
                    <motion.div
                      className={`h-full ${item.color} border ${item.textColor.replace('text-', 'border-')}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(item.count / 852) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3 + idx * 0.1 }}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recommendations */}
          <motion.div
            className="card-glass p-6 border-l-4 border-l-[#00f5a0]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-4">Recommendations</h2>
            <ul className="space-y-3">
              {[
                'Enable monitoring on 12 unmonitored systems to improve visibility',
                'Remediate 45 critical risk assets within 30 days',
                'Implement network segmentation for exposed internal services',
                'Deploy Web Application Firewall (WAF) for exposed services',
              ].map((rec, idx) => (
                <motion.li
                  key={idx}
                  className="flex gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Shield className="w-5 h-5 text-[#00f5a0] flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{rec}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

        </div>
      </main>
    </AppLayout>
  );
}
