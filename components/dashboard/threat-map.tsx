'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface ThreatLocation {
  id: string;
  country: string;
  x: number;
  y: number;
  severity: 'critical' | 'high' | 'medium';
  attackType: string;
}

const threatLocationsMap: { [key: string]: ThreatLocation } = {
  '1': { id: '1', country: 'USA', x: 20, y: 40, severity: 'medium', attackType: 'Proxy/VPN Activity' },
  '2': { id: '2', country: 'UK', x: 50, y: 35, severity: 'high', attackType: 'Scanning Activity' },
  '3': { id: '3', country: 'Germany', x: 55, y: 32, severity: 'critical', attackType: 'Data Exfiltration' },
  '4': { id: '4', country: 'Russia', x: 65, y: 30, severity: 'critical', attackType: 'C2 Communication' },
  '5': { id: '5', country: 'China', x: 75, y: 45, severity: 'high', attackType: 'Exploitation Attempts' },
  '6': { id: '6', country: 'India', x: 70, y: 50, severity: 'critical', attackType: 'Credential Attacks' },
  '7': { id: '7', country: 'Brazil', x: 35, y: 65, severity: 'medium', attackType: 'DDoS Traffic' },
  '8': { id: '8', country: 'Australia', x: 80, y: 75, severity: 'medium', attackType: 'Reconnaissance' },
};

const threatLocations: ThreatLocation[] = Object.values(threatLocationsMap);

const connections = [
  { from: '1', to: '2', severity: 'critical' as const },
  { from: '2', to: '3', severity: 'high' as const },
  { from: '3', to: '4', severity: 'critical' as const },
  { from: '4', to: '5', severity: 'high' as const },
  { from: '5', to: '6', severity: 'critical' as const },
  { from: '1', to: '7', severity: 'medium' as const },
  { from: '2', to: '8', severity: 'medium' as const },
];

export function ThreatMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return '#ff3366';
      case 'high':
        return '#fbbf24';
      default:
        return '#00f5a0';
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-96 rounded-lg border border-white/10 bg-black/20 overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute w-full border-b border-white/20"
            style={{ top: `${(i + 1) * 10}%` }}
          />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full border-r border-white/20"
            style={{ left: `${(i + 1) * 10}%` }}
          />
        ))}
      </div>

      {/* Threat Connections */}
      {dimensions.width > 0 && (
        <svg 
          className="absolute inset-0 w-full h-full" 
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          preserveAspectRatio="none"
        >
          {connections.map((conn, idx) => {
            const from = threatLocationsMap[conn.from];
            const to = threatLocationsMap[conn.to];
            if (!from || !to) return null;
            const x1 = (from.x / 100) * dimensions.width;
            const y1 = (from.y / 100) * dimensions.height;
            const x2 = (to.x / 100) * dimensions.width;
            const y2 = (to.y / 100) * dimensions.height;

            return (
              <line
                key={idx}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={getSeverityColor(conn.severity)}
                strokeWidth="2"
                opacity="0.6"
              />
            );
          })}
        </svg>
      )}

      {/* Threat Nodes */}
      {threatLocations.map((location, idx) => (
        <motion.div
          key={location.id}
          className="absolute group cursor-pointer"
          style={{
            left: `${location.x}%`,
            top: `${location.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          whileHover={{ scale: 1.2 }}
        >
          {/* Outer Glow */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              width: '24px',
              height: '24px',
              left: '-12px',
              top: '-12px',
              background: getSeverityColor(location.severity),
              opacity: 0.2,
            }}
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Node */}
          <div
            className="w-6 h-6 rounded-full border-2 flex items-center justify-center"
            style={{
              borderColor: getSeverityColor(location.severity),
              background: getSeverityColor(location.severity) + '20',
            }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: getSeverityColor(location.severity) }}
            />
          </div>

          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-black/90 border border-white/20 rounded-lg px-3 py-2 whitespace-nowrap text-xs z-10">
            <p className="font-semibold text-white">{location.country}</p>
            <p className="text-muted-foreground">{location.attackType}</p>
          </div>
        </motion.div>
      ))}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 flex gap-4 bg-black/60 px-4 py-2 rounded-lg border border-white/10 z-10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-xs text-muted-foreground">Critical</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="text-xs text-muted-foreground">High</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-xs text-muted-foreground">Monitor</span>
        </div>
      </div>

      {/* Live Intercepts Label */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-red-500/10 border border-red-500/30 px-3 py-2 rounded-lg z-10">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        <span className="text-xs font-semibold text-red-400">LIVE INTERCEPTS</span>
      </div>

      {/* Bottom Alert */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-red-500/20 to-transparent border-t border-red-500/30 px-4 py-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <p className="text-xs text-red-300">
          <span className="font-semibold">Proxy ...</span> [WARN] Suspicious internal scan activity detected from Germany subnet ...
        </p>
      </motion.div>
    </div>
  );
}
