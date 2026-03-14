'use client';

import { AppLayout } from '@/components/app-layout';
import { mockPhishingData } from '@/lib/mock-data';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Shield, AlertTriangle, CheckCircle, Mail, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const phishingBreakdown = [
  { name: 'Detected by ML', value: mockPhishingData.blockedByML, color: '#00f5a0' },
  { name: 'Blocked by Protocols', value: mockPhishingData.blockedByRules, color: '#3b82f6' },
  { name: 'Suspicious', value: mockPhishingData.suspicious, color: '#fbbf24' },
];

const emailCategories = [
  { category: 'Legitimate', emails: mockPhishingData.safeEmails, color: '#00f5a0' },
  { category: 'Phishing', emails: mockPhishingData.phishingAttempts, color: '#ff3366' },
  { category: 'Suspicious', emails: mockPhishingData.suspicious, color: '#fbbf24' },
];

export default function PhishingPage() {
  const blockedRate = ((mockPhishingData.blockedByML + mockPhishingData.blockedByRules) / mockPhishingData.phishingAttempts * 100).toFixed(1);

  return (
    <AppLayout>
      <main className="min-h-screen bg-background grid-bg">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Phishing & Email Security</h1>
            <p className="text-muted-foreground">Advanced email threat detection and phishing protection</p>
          </motion.div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-3 gap-4">
            <motion.div
              className="card-glass p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <span className="text-sm text-muted-foreground">Phishing Attempts</span>
              </div>
              <p className="text-3xl font-bold text-red-400">{mockPhishingData.phishingAttempts}</p>
            </motion.div>

            <motion.div
              className="card-glass p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm text-muted-foreground">Block Rate</span>
              </div>
              <p className="text-3xl font-bold text-green-400">{blockedRate}%</p>
            </motion.div>

            <motion.div
              className="card-glass p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-5 h-5 text-[#00f5a0]" />
                <span className="text-sm text-muted-foreground">Risk Score</span>
              </div>
              <p className="text-3xl font-bold">{mockPhishingData.riskScore.toFixed(1)}/10</p>
            </motion.div>
          </div>

          {/* Charts Section */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Detection Method Pie Chart */}
            <motion.div
              className="card-glass p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-6">Detection Methods</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={phishingBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {phishingBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(10, 14, 39, 0.95)',
                      border: '1px solid rgba(0, 245, 160, 0.3)',
                      borderRadius: '0.5rem',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Email Category Distribution */}
            <motion.div
              className="card-glass p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-6">Email Classification</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={emailCategories}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis stroke="rgba(255,255,255,0.5)" dataKey="category" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(10, 14, 39, 0.95)',
                      border: '1px solid rgba(0, 245, 160, 0.3)',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <Bar dataKey="emails" fill="#00f5a0" isAnimationActive={true} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Threat Intelligence */}
          <motion.div
            className="card-glass p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6">Top Phishing Indicators</h3>
            <div className="space-y-3">
              {[
                { indicator: 'Spoofed Sender Address', frequency: 156, severity: 'Critical' },
                { indicator: 'Malicious URL Detection', frequency: 98, severity: 'Critical' },
                { indicator: 'Suspicious Attachment Type', frequency: 67, severity: 'High' },
                { indicator: 'Credential Harvesting Form', frequency: 42, severity: 'High' },
                { indicator: 'Brand Impersonation', frequency: 34, severity: 'Medium' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <div className="flex-1">
                    <p className="font-semibold">{item.indicator}</p>
                    <p className="text-sm text-muted-foreground">{item.frequency} incidents</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    item.severity === 'Critical'
                      ? 'bg-red-500/20 text-red-300'
                      : item.severity === 'High'
                      ? 'bg-orange-500/20 text-orange-300'
                      : 'bg-yellow-500/20 text-yellow-300'
                  }`}>
                    {item.severity}
                  </span>
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
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-3">Security Recommendations</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Enable DMARC/SPF/DKIM for all outbound email domains</li>
                  <li>• Deploy multi-factor authentication for email access</li>
                  <li>• Conduct phishing awareness training for all users</li>
                  <li>• Implement sandbox environment for suspicious attachments</li>
                </ul>
              </div>
              <Button className="gap-2">
                <TrendingDown className="w-4 h-4" />
                Generate Report
              </Button>
            </div>
          </motion.div>

        </div>
      </main>
    </AppLayout>
  );
}
