'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';

type ThreatSeverity = 'low' | 'medium' | 'high' | 'critical';
type AttackType = 'DDoS' | 'Malware' | 'Phishing' | 'Ransomware';

interface ThreatEvent {
  id: string;
  country: string;
  city: string;
  lat: number;
  lng: number;
  severity: ThreatSeverity;
  attackType: AttackType;
  timestamp: string;
}

interface ArcEvent {
  id: string;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  severity: ThreatSeverity;
}

const SEVERITY_COLORS: Record<ThreatSeverity, string> = {
  low: '#22c55e',
  medium: '#eab308',
  high: '#f97316',
  critical: '#ef4444',
};

const THREAT_LEVEL_COLORS = {
  low: '#22c55e',
  medium: '#facc15',
  high: '#f97316',
  critical: '#ef4444',
  monitoring: '#3b82f6',
};

const BASE_LOCATIONS = [
  { country: 'United States', city: 'New York', lat: 40.7128, lng: -74.006 },
  { country: 'United Kingdom', city: 'London', lat: 51.5074, lng: -0.1278 },
  { country: 'Germany', city: 'Frankfurt', lat: 50.1109, lng: 8.6821 },
  { country: 'Russia', city: 'Moscow', lat: 55.7558, lng: 37.6173 },
  { country: 'Japan', city: 'Tokyo', lat: 35.6762, lng: 139.6503 },
  { country: 'India', city: 'Mumbai', lat: 19.076, lng: 72.8777 },
  { country: 'Brazil', city: 'São Paulo', lat: -23.5558, lng: -46.6396 },
  { country: 'Australia', city: 'Sydney', lat: -33.8688, lng: 151.2093 },
  { country: 'South Africa', city: 'Johannesburg', lat: -26.2041, lng: 28.0473 },
  { country: 'Singapore', city: 'Singapore', lat: 1.3521, lng: 103.8198 },
];

const ATTACK_TYPES: AttackType[] = ['DDoS', 'Malware', 'Phishing', 'Ransomware'];

const getRandomSeverity = (): ThreatSeverity => {
  const roll = Math.random();
  if (roll > 0.9) return 'critical';
  if (roll > 0.7) return 'high';
  if (roll > 0.4) return 'medium';
  return 'low';
};

const formatTimeUTC = () =>
  new Date().toISOString().split('T')[1]?.split('.')[0] + ' UTC';

const generateThreatEvent = (id: string): ThreatEvent => {
  const base = BASE_LOCATIONS[Math.floor(Math.random() * BASE_LOCATIONS.length)];
  const severity = getRandomSeverity();
  const attackType = ATTACK_TYPES[Math.floor(Math.random() * ATTACK_TYPES.length)];
  const jitterLat = (Math.random() - 0.5) * 2;
  const jitterLng = (Math.random() - 0.5) * 2;

  return {
    id,
    country: base.country,
    city: base.city,
    lat: base.lat + jitterLat,
    lng: base.lng + jitterLng,
    severity,
    attackType,
    timestamp: formatTimeUTC(),
  };
};

const generateArc = (id: string, from: ThreatEvent, to: ThreatEvent): ArcEvent => ({
  id,
  startLat: from.lat,
  startLng: from.lng,
  endLat: to.lat,
  endLng: to.lng,
  severity: from.severity,
});

const computeGlobalThreatIndex = (events: ThreatEvent[]): number => {
  if (!events.length) return 0;
  const weights: Record<ThreatSeverity, number> = {
    low: 0.25,
    medium: 0.5,
    high: 0.75,
    critical: 1,
  };
  const total = events.reduce((sum, e) => sum + weights[e.severity], 0);
  return Math.round((total / events.length) * 100);
};

export function ThreatMap() {
  const [threatEvents, setThreatEvents] = useState<ThreatEvent[]>([]);
  const [arcEvents, setArcEvents] = useState<ArcEvent[]>([]);
  const [activeThreat, setActiveThreat] = useState<ThreatEvent | null>(null);

  // Initialize threats on mount
  useEffect(() => {
    const initial = Array.from({ length: 18 }).map((_, idx) =>
      generateThreatEvent(String(idx + 1))
    );
    setThreatEvents(initial);

    // Generate initial arcs
    const initialArcs: ArcEvent[] = [];
    for (let i = 0; i < 8; i++) {
      const from = initial[Math.floor(Math.random() * initial.length)];
      let to = initial[Math.floor(Math.random() * initial.length)];
      if (to.id === from.id) {
        to = initial[(initial.indexOf(from) + 1) % initial.length];
      }
      initialArcs.push(generateArc(`arc-${i}`, from, to));
    }
    setArcEvents(initialArcs);
  }, []);

  // FIX 4 (main bug): The interval effect no longer reads `threatEvents` from
  // the closure (which was stale). Instead, both the new threat event AND the
  // new arc are derived inside `setThreatEvents`'s functional updater, where
  // `prev` is always the latest state. The dep array is empty so the interval
  // is created once and never torn down/recreated unnecessarily.
  useEffect(() => {
    const interval = setInterval(() => {
      setThreatEvents((prev) => {
        const next = [...prev];
        if (next.length > 28) next.shift();
        next.push(generateThreatEvent(String(Date.now())));

        // Derive arc endpoints from `next` — always fresh, never stale.
        if (next.length > 4) {
          const from = next[Math.floor(Math.random() * next.length)];
          let to = next[Math.floor(Math.random() * next.length)];
          if (to.id === from.id) {
            to = next[(next.indexOf(from) + 1) % next.length];
          }
          setArcEvents((prevArcs) => {
            const updatedArcs = [...prevArcs];
            if (updatedArcs.length > 24) updatedArcs.shift();
            updatedArcs.push(generateArc(`arc-${Date.now()}`, from, to));
            return updatedArcs;
          });
        }

        return next;
      });
    }, 2200);

    return () => clearInterval(interval);
  }, []); // Empty deps — stable interval, no stale closure.

  const globalThreatIndex = useMemo(
    () => computeGlobalThreatIndex(threatEvents),
    [threatEvents]
  );

  const recentFeed = useMemo(
    () => [...threatEvents].slice(-4).reverse(),
    [threatEvents]
  );

  const severityCounts = useMemo(() => {
    const base = { low: 0, medium: 0, high: 0, critical: 0 } as Record<
      ThreatSeverity,
      number
    >;
    return threatEvents.reduce((acc, e) => {
      acc[e.severity] += 1;
      return acc;
    }, base);
  }, [threatEvents]);

  const totalSeverityEvents =
    severityCounts.low +
    severityCounts.medium +
    severityCounts.high +
    severityCounts.critical || 1;

  const severityPercentages = {
    low: Math.round((severityCounts.low / totalSeverityEvents) * 100),
    medium: Math.round((severityCounts.medium / totalSeverityEvents) * 100),
    high: Math.round((severityCounts.high / totalSeverityEvents) * 100),
    critical: Math.round((severityCounts.critical / totalSeverityEvents) * 100),
  };

  const monitoringCountries = [
    'United States',
    'United Kingdom',
    'Germany',
    'India',
    'Japan',
    'Australia',
  ];

  return (
    <div className="relative w-full h-[520px] rounded-2xl border border-sky-500/30 bg-slate-900/40 backdrop-blur-xl shadow-[0_0_60px_rgba(15,23,42,0.9)] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.28)_0,transparent_55%),radial-gradient(circle_at_bottom,rgba(15,23,42,0.95)_0,transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0)_0,rgba(15,23,42,0.85)_70%,rgba(15,23,42,1)_100%)]" />

      <div className="relative z-10 flex flex-col h-full">
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 pt-4 pb-2 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
                Global Threat Index
              </p>
              <div className="flex items-end gap-2 mt-1">
                <span className="text-3xl font-semibold text-slate-50">
                  {globalThreatIndex}
                </span>
                <span className="text-[11px] text-slate-400 mb-1">/ 100</span>
              </div>
            </div>
            <div className="h-10 w-px bg-gradient-to-b from-transparent via-slate-700/80 to-transparent" />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                </span>
                <span className="text-[11px] font-semibold tracking-wide text-emerald-300">
                  LIVE
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Simulated real-time cyber activity stream
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-300">
            <div className="hidden md:flex items-center gap-3">
              <span className="text-slate-400 uppercase tracking-[0.2em]">
                Risk Spectrum
              </span>
              <span className="h-1.5 w-16 rounded-full bg-gradient-to-r from-emerald-400 via-yellow-400 to-red-500" />
            </div>
            <div className="hidden md:flex items-center gap-3">
              {(
                [
                  { key: 'low', label: 'Low' },
                  { key: 'medium', label: 'Medium' },
                  { key: 'high', label: 'High' },
                  { key: 'critical', label: 'Severe' },
                  { key: 'monitoring', label: 'Monitoring' },
                ] as { key: keyof typeof THREAT_LEVEL_COLORS; label: string }[]
              ).map(({ key, label }) => (
                <div key={key} className="flex items-center gap-1.5">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: THREAT_LEVEL_COLORS[key] }}
                  />
                  <span className="text-[11px] text-slate-400">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="flex-1 flex flex-col lg:flex-row">
          {/* Globe panel */}
          <div className="relative flex-1 min-h-[260px] lg:min-h-0">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 520 520" preserveAspectRatio="xMidYMid slice">
              {/* Background gradient */}
              <defs>
                <radialGradient id="globeGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(56, 189, 248, 0.15)" />
                  <stop offset="100%" stopColor="rgba(15, 23, 42, 0.4)" />
                </radialGradient>
              </defs>
              
              {/* Globe background circle */}
              <circle cx="260" cy="260" r="240" fill="url(#globeGradient)" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="2" />
              
              {/* Grid lines */}
              {Array.from({ length: 5 }).map((_, i) => {
                const r = 50 + i * 50;
                return <circle key={`grid-${i}`} cx="260" cy="260" r={r} fill="none" stroke="rgba(56, 189, 248, 0.1)" strokeWidth="1" />;
              })}
              
              {/* Lat/Lng lines */}
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i / 8) * Math.PI * 2;
                const x1 = 260 + Math.cos(angle) * 240;
                const y1 = 260 + Math.sin(angle) * 240;
                return <line key={`line-${i}`} x1="260" y1="260" x2={x1} y2={y1} stroke="rgba(56, 189, 248, 0.1)" strokeWidth="1" />;
              })}
              
              {/* Arc connections */}
              {arcEvents.map((arc, idx) => {
                const x1 = 260 + (arc.startLng / 180) * 200;
                const y1 = 260 + (arc.startLat / 90) * 200;
                const x2 = 260 + (arc.endLng / 180) * 200;
                const y2 = 260 + (arc.endLat / 90) * 200;
                const color = SEVERITY_COLORS[arc.severity];
                
                return (
                  <motion.path
                    key={`arc-${idx}`}
                    d={`M ${x1} ${y1} Q ${(x1 + x2) / 2} ${((y1 + y2) / 2) - 40} ${x2} ${y2}`}
                    stroke={color}
                    strokeWidth="1.5"
                    fill="none"
                    opacity="0.6"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: 'easeInOut' }}
                  />
                );
              })}
              
              {/* Threat points */}
              {threatEvents.map((threat, idx) => {
                const x = 260 + (threat.lng / 180) * 200;
                const y = 260 + (threat.lat / 90) * 200;
                const color = SEVERITY_COLORS[threat.severity];
                
                return (
                  <motion.g
                    key={`threat-${idx}`}
                    onMouseEnter={() => setActiveThreat(threat)}
                    onMouseLeave={() => setActiveThreat(null)}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <circle cx={x} cy={y} r="4" fill={color} opacity="0.3" />
                    <circle cx={x} cy={y} r="2.5" fill={color} />
                    <motion.circle
                      cx={x}
                      cy={y}
                      r="2.5"
                      fill="none"
                      stroke={color}
                      strokeWidth="1"
                      initial={{ r: 2.5 }}
                      animate={{ r: 8 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      opacity="0.6"
                    />
                  </motion.g>
                );
              })}
            </svg>

            {/* Active threat paths badge */}
            <div className="pointer-events-none absolute left-6 bottom-6 bg-slate-950/80 border border-slate-700/60 rounded-xl px-3 py-2 text-[11px] text-slate-300 flex flex-col gap-1 backdrop-blur-md">
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
                <span className="uppercase tracking-[0.18em] text-sky-300">
                  Active threat paths
                </span>
              </div>
              <p className="text-[10px] text-slate-400">
                Curved arcs represent cross-border attack routes detected in the last
                few seconds.
              </p>
            </div>

            {/* Country threat posture legend */}
            <div className="pointer-events-none absolute left-4 top-6 w-[160px] bg-slate-950/90 border border-slate-700/70 rounded-lg px-2.5 py-3 text-[10px] text-slate-300 space-y-1.5 backdrop-blur-md">
              <p className="uppercase tracking-[0.25em] text-slate-400 text-[10px]">
                Country threat posture
              </p>
              <div className="flex flex-col gap-1.5 text-[10px]">
                {(
                  [
                    { key: 'low', label: 'Low', status: 'Stable' },
                    { key: 'medium', label: 'Medium', status: 'Elevated' },
                    { key: 'high', label: 'High', status: 'Active' },
                    { key: 'critical', label: 'Severe', status: 'Critical' },
                    { key: 'monitoring', label: 'Monitoring', status: 'Watchlist' },
                  ] as {
                    key: keyof typeof THREAT_LEVEL_COLORS;
                    label: string;
                    status: string;
                  }[]
                ).map(({ key, label, status }) => (
                  <div key={key} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: THREAT_LEVEL_COLORS[key] }}
                      />
                      <span className="text-slate-300">{label}</span>
                    </div>
                    <span className="text-slate-500 text-[9px]">{status}</span>
                  </div>
                ))}
              </div>
              <p className="text-[9px] text-slate-500 pt-1 border-t border-slate-800/80 mt-2">
                Regions under blue-spectrum monitoring:{' '}
                <span className="text-slate-300">
                  {monitoringCountries.join(', ')}
                </span>
              </p>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-white/10 bg-slate-950/80 backdrop-blur-md flex flex-col">
            {/* Feed header */}
            <div className="px-4 pt-3 pb-2 border-b border-white/10 flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
                  Recent threat feed
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Auto-refreshing stream of last intercepts
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] text-emerald-300 font-medium">Live</span>
                </div>
                <p className="text-[10px] text-slate-500">
                  {threatEvents.length.toString().padStart(2, '0')} active signals
                </p>
              </div>
            </div>

            {/* Feed items */}
            <div className="flex-1 px-3 py-2 space-y-2 overflow-hidden">
              {recentFeed.map((event) => (
                <motion.div
                  key={event.id}
                  className={`rounded-lg px-3 py-2.5 border text-[11px] cursor-default ${activeThreat?.id === event.id
                    ? 'border-sky-400/70 bg-sky-500/10'
                    : 'border-slate-700/70 bg-slate-900/60'
                    }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className="h-1.5 w-6 rounded-full flex-shrink-0"
                        style={{
                          background: `linear-gradient(to right, ${SEVERITY_COLORS[event.severity]
                            }, ${SEVERITY_COLORS[event.severity]}66)`,
                        }}
                      />
                      <div className="min-w-0">
                        <p className="truncate text-slate-100">
                          {event.attackType} attack
                        </p>
                        <p className="truncate text-[10px] text-slate-400">
                          {event.city}, {event.country}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
                      <span
                        className="px-1.5 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wide"
                        style={{
                          backgroundColor: `${SEVERITY_COLORS[event.severity]}22`,
                          color: SEVERITY_COLORS[event.severity],
                        }}
                      >
                        {event.severity}
                      </span>
                      <span className="text-[9px] text-slate-500">
                        {event.timestamp}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Severity trend bar */}
            <div className="px-4 pb-3 pt-2 border-t border-white/10">
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
                  Severity trend
                </p>
                <p className="text-[10px] text-slate-400">
                  Last {Math.min(threatEvents.length, 48)} events
                </p>
              </div>
              <div className="h-2.5 rounded-full bg-slate-900/80 border border-slate-700/60 overflow-hidden flex">
                <div
                  className="h-full transition-all duration-700"
                  style={{
                    width: `${severityPercentages.low}%`,
                    backgroundColor: `${THREAT_LEVEL_COLORS.low}55`,
                  }}
                />
                <div
                  className="h-full transition-all duration-700"
                  style={{
                    width: `${severityPercentages.medium}%`,
                    backgroundColor: `${THREAT_LEVEL_COLORS.medium}66`,
                  }}
                />
                <div
                  className="h-full transition-all duration-700"
                  style={{
                    width: `${severityPercentages.high}%`,
                    backgroundColor: `${THREAT_LEVEL_COLORS.high}88`,
                  }}
                />
                <div
                  className="h-full transition-all duration-700"
                  style={{
                    width: `${severityPercentages.critical}%`,
                    backgroundColor: `${THREAT_LEVEL_COLORS.critical}aa`,
                  }}
                />
              </div>
              <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: THREAT_LEVEL_COLORS.low }}
                    />
                    <span>Low {severityPercentages.low}%</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: THREAT_LEVEL_COLORS.medium }}
                    />
                    <span>Med {severityPercentages.medium}%</span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: THREAT_LEVEL_COLORS.high }}
                    />
                    <span>High {severityPercentages.high}%</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: THREAT_LEVEL_COLORS.critical }}
                    />
                    <span>Crit {severityPercentages.critical}%</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
