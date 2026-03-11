'use client';

import { motion } from 'framer-motion';

interface StatusPulseProps {
  status: 'active' | 'warning' | 'inactive';
  label?: string;
}

const statusColors = {
  active: { bg: '#00f5a0', glow: 'shadow-lg shadow-[#00f5a0]/50' },
  warning: { bg: '#fbbf24', glow: 'shadow-lg shadow-[#fbbf24]/50' },
  inactive: { bg: '#8b92a9', glow: 'shadow-lg shadow-[#8b92a9]/30' },
};

export function StatusPulse({ status, label }: StatusPulseProps) {
  const colors = statusColors[status];

  return (
    <div className="flex items-center gap-2">
      <motion.div
        className={`w-3 h-3 rounded-full ${colors.glow}`}
        style={{ backgroundColor: colors.bg }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      {label && <span className="text-sm text-muted-foreground">{label}</span>}
    </div>
  );
}
