'use client';

import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface AlertBadgeProps {
  count: number;
  type?: 'critical' | 'warning' | 'info';
}

const typeStyles = {
  critical: 'bg-red-500/20 text-red-300',
  warning: 'bg-yellow-500/20 text-yellow-300',
  info: 'bg-blue-500/20 text-blue-300',
};

export function AlertBadge({ count, type = 'critical' }: AlertBadgeProps) {
  return (
    <motion.div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${typeStyles[type]}`}
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <AlertCircle className="w-3 h-3" />
      <span>{count}</span>
    </motion.div>
  );
}
