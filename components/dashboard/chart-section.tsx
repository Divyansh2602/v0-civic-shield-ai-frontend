'use client';

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockChartData } from '@/lib/mock-data';
import { motion } from 'framer-motion';

export function ChartSection() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Line Chart */}
      <motion.div
        className="card-glass p-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3 className="text-lg font-semibold mb-6">Threat Trends (6 months)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis stroke="rgba(255,255,255,0.5)" />
            <YAxis stroke="rgba(255,255,255,0.5)" />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(10, 14, 39, 0.95)',
                border: '1px solid rgba(0, 245, 160, 0.3)',
                borderRadius: '0.5rem',
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="threats" 
              stroke="#ff3366" 
              strokeWidth={2}
              dot={false}
              isAnimationActive={true}
            />
            <Line 
              type="monotone" 
              dataKey="vulnerabilities" 
              stroke="#fbbf24"
              strokeWidth={2}
              dot={false}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Bar Chart */}
      <motion.div
        className="card-glass p-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-lg font-semibold mb-6">Threats Blocked</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mockChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis stroke="rgba(255,255,255,0.5)" />
            <YAxis stroke="rgba(255,255,255,0.5)" />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(10, 14, 39, 0.95)',
                border: '1px solid rgba(0, 245, 160, 0.3)',
                borderRadius: '0.5rem',
              }}
            />
            <Bar 
              dataKey="blocked" 
              fill="#00f5a0"
              isAnimationActive={true}
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
