'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, AlertTriangle, Shield } from 'lucide-react';
import { mockDashboard } from '@/lib/mock-data';
import { useState, useEffect } from 'react';

export function ThreatFeed() {
  const [displayedThreats, setDisplayedThreats] = useState(mockDashboard.recentThreats.slice(0, 5));

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedThreats((prev) => {
        const newThreats = [...prev];
        newThreats.shift();
        const nextIndex = (mockDashboard.recentThreats.findIndex(t => t.id === prev[prev.length - 1].id) + 1) % mockDashboard.recentThreats.length;
        newThreats.push(mockDashboard.recentThreats[nextIndex]);
        return newThreats;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'text-red-400';
      case 'High':
        return 'text-orange-400';
      default:
        return 'text-yellow-400';
    }
  };

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-500/10';
      case 'High':
        return 'bg-orange-500/10';
      default:
        return 'bg-yellow-500/10';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return AlertCircle;
      case 'High':
        return AlertTriangle;
      default:
        return Shield;
    }
  };

  return (
    <div className="space-y-3 h-[460px] overflow-hidden">
      <AnimatePresence mode="popLayout">
        {displayedThreats.map((threat, idx) => {
          const Icon = getSeverityIcon(threat.severity);
          return (
            <motion.div
              key={threat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`card-glass p-4 border-l-4 ${
                threat.severity === 'Critical'
                  ? 'border-l-red-400'
                  : threat.severity === 'High'
                  ? 'border-l-orange-400'
                  : 'border-l-yellow-400'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-1 p-2 rounded-lg ${getSeverityBg(threat.severity)}`}>
                  <Icon className={`w-4 h-4 ${getSeverityColor(threat.severity)}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-sm">{threat.type}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${getSeverityBg(threat.severity)} ${getSeverityColor(threat.severity)}`}>
                      {threat.severity}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Source: {threat.source} • {threat.timestamp}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
