'use client';

import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: LucideIcon;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: number;
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

export function MetricCard({
  label,
  value,
  unit,
  icon: Icon,
  trend,
  trendValue,
  variant = 'default',
}: MetricCardProps) {
  const getVariantColors = (v: string) => {
    switch (v) {
      case 'success':
        return 'bg-green-500/10 text-green-400';
      case 'warning':
        return 'bg-yellow-500/10 text-yellow-400';
      case 'danger':
        return 'bg-red-500/10 text-red-400';
      default:
        return 'bg-[#00f5a0]/10 text-[#00f5a0]';
    }
  };

  return (
    <motion.div
      className="card-glass p-6 group hover:border-[#00f5a0]/50 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${getVariantColors(variant)} opacity-80 group-hover:opacity-100 transition-opacity`}>
          {Icon && <Icon className="w-5 h-5" />}
        </div>
        {trend && (
          <div className={`text-xs font-semibold flex items-center gap-1 ${
            trend === 'up' ? 'text-red-400' : trend === 'down' ? 'text-green-400' : 'text-yellow-400'
          }`}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
            {trendValue}%
          </div>
        )}
      </div>
      <p className="text-sm text-muted-foreground mb-2">{label}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold">{value}</span>
        {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
      </div>
    </motion.div>
  );
}
