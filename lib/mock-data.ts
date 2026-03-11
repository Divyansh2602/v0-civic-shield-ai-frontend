export const mockDashboard = {
  riskScore: 34,
  riskLevel: 'Medium',
  threatsTodayCount: 12,
  vulnerabilitiesCount: 24,
  attacksBlockedCount: 156,
  systemsMonitored: 847,
  lastScanTime: '2 hours ago',
  
  // Real-time metrics
  metrics: [
    { label: 'Security Score', value: 78, unit: '/ 100' },
    { label: 'Threats Detected', value: 12, unit: 'today' },
    { label: 'Vulnerabilities', value: 24, unit: 'critical' },
    { label: 'Compliance Status', value: 94, unit: '% complete' },
  ],
  
  // Recent threats
  recentThreats: [
    { id: 1, type: 'SQL Injection', severity: 'Critical', source: '192.168.1.45', timestamp: '2 min ago' },
    { id: 2, type: 'XSS Attack', severity: 'High', source: '10.0.0.12', timestamp: '15 min ago' },
    { id: 3, type: 'Port Scan', severity: 'Medium', source: '203.45.67.89', timestamp: '1 hour ago' },
    { id: 4, type: 'Brute Force', severity: 'High', source: '172.16.0.5', timestamp: '2 hours ago' },
    { id: 5, type: 'Zero-Day Exploit', severity: 'Critical', source: '198.51.100.10', timestamp: '3 hours ago' },
  ],
  
  // System status
  systemsStatus: [
    { name: 'Firewall', status: 'Active', uptime: 99.9 },
    { name: 'IDS/IPS', status: 'Active', uptime: 99.8 },
    { name: 'DLP System', status: 'Active', uptime: 99.7 },
    { name: 'SIEM', status: 'Active', uptime: 99.95 },
  ],
}

export const mockVulnerabilities = [
  { id: 1, name: 'SQL Injection in Login Form', severity: 'Critical', cvss: 9.8, status: 'Open', affected: 3 },
  { id: 2, name: 'Weak SSL Configuration', severity: 'High', cvss: 8.5, status: 'In Progress', affected: 12 },
  { id: 3, name: 'Unpatched OpenSSL', severity: 'Critical', cvss: 9.1, status: 'Open', affected: 5 },
  { id: 4, name: 'Missing CSRF Protection', severity: 'High', cvss: 7.9, status: 'Open', affected: 8 },
  { id: 5, name: 'Insecure Direct Object Reference', severity: 'High', cvss: 8.2, status: 'Open', affected: 2 },
  { id: 6, name: 'Outdated jQuery Library', severity: 'Medium', cvss: 6.5, status: 'Open', affected: 15 },
  { id: 7, name: 'Hard-coded API Keys', severity: 'Critical', cvss: 9.6, status: 'Open', affected: 1 },
  { id: 8, name: 'Default Credentials', severity: 'Critical', cvss: 9.3, status: 'Closed', affected: 4 },
]

export const mockScanResults = {
  totalVulnerabilities: 847,
  critical: 12,
  high: 34,
  medium: 156,
  low: 645,
  scannedAssets: 234,
  exposedServices: 18,
  lastScan: '2024-03-11 14:32:00',
}

export const mockAttackSurface = {
  exposedServices: [
    { service: 'HTTP (Port 80)', risk: 'Medium', exposure: 'Public', affected: 12 },
    { service: 'HTTPS (Port 443)', risk: 'Low', exposure: 'Public', affected: 234 },
    { service: 'SSH (Port 22)', risk: 'High', exposure: 'Internal', affected: 5 },
    { service: 'SMTP (Port 25)', risk: 'Medium', exposure: 'Public', affected: 3 },
    { service: 'DNS (Port 53)', risk: 'Medium', exposure: 'Public', affected: 78 },
  ],
  exposedAssets: 234,
  riskfulAssignments: 45,
  unmonitoredSystems: 12,
}

export const mockPhishingData = {
  emailsAnalyzed: 15234,
  phishingAttempts: 342,
  blockedByML: 287,
  blockedByRules: 55,
  suspicious: 23,
  safeEmails: 14869,
  riskScore: 8.5,
}

export const mockAPISecurityData = {
  endpointsMonitored: 847,
  anomalousRequests: 234,
  rateLimitExceeded: 12,
  authenticationFailures: 45,
  dataLeakageDetected: 3,
  suspiciousPatterns: 67,
}

export const mockReports = [
  { id: 1, name: 'Monthly Security Report - March 2024', date: '2024-03-01', status: 'Completed', format: 'PDF' },
  { id: 2, name: 'Vulnerability Assessment Q1 2024', date: '2024-02-28', status: 'Completed', format: 'PDF' },
  { id: 3, name: 'Compliance Audit Report', date: '2024-02-15', status: 'Completed', format: 'PDF' },
  { id: 4, name: 'Penetration Testing Summary', date: '2024-02-01', status: 'Completed', format: 'PDF' },
]

export const mockLogs = [
  { id: 1, timestamp: '2024-03-11 14:32:45', event: 'Vulnerability Scan Completed', level: 'Info', details: 'Scan found 847 vulnerabilities' },
  { id: 2, timestamp: '2024-03-11 13:45:12', event: 'Threat Detected: SQL Injection', level: 'Critical', details: 'Source: 192.168.1.45' },
  { id: 3, timestamp: '2024-03-11 12:15:33', event: 'User Login', level: 'Info', details: 'User: admin@civicshield.ai' },
  { id: 4, timestamp: '2024-03-11 11:22:00', event: 'API Rate Limit Exceeded', level: 'Warning', details: 'IP: 10.0.0.5' },
  { id: 5, timestamp: '2024-03-11 10:18:45', event: 'Configuration Updated', level: 'Info', details: 'Firewall rules updated' },
]

export const mockThreatIntelligence = [
  { threat: 'Emotet', type: 'Malware', severity: 'Critical', lastSeen: '5 min ago', affected: true },
  { threat: 'Trickbot', type: 'Banking Trojan', severity: 'Critical', lastSeen: '2 hours ago', affected: false },
  { threat: 'Maze', type: 'Ransomware', severity: 'Critical', lastSeen: '1 day ago', affected: false },
  { threat: 'Wizard Spider', type: 'Threat Group', severity: 'High', lastSeen: '3 days ago', affected: true },
  { threat: 'Lazarus Group', type: 'Nation State', severity: 'Critical', lastSeen: '1 week ago', affected: false },
]

export const mockWorldMapData = [
  { country: 'United States', threats: 234, lat: 37.0902, lng: -95.7129 },
  { country: 'China', threats: 156, lat: 35.8617, lng: 104.1954 },
  { country: 'Russia', threats: 98, lat: 61.524, lng: 105.3188 },
  { country: 'India', threats: 87, lat: 20.5937, lng: 78.9629 },
  { country: 'Brazil', threats: 65, lat: -14.2350, lng: -51.9253 },
  { country: 'Germany', threats: 45, lat: 51.1657, lng: 10.4515 },
  { country: 'United Kingdom', threats: 38, lat: 55.3781, lng: -3.4360 },
  { country: 'Japan', threats: 34, lat: 36.2048, lng: 138.2529 },
]

export const mockChartData = [
  { month: 'Jan', threats: 234, vulnerabilities: 45, blocked: 567 },
  { month: 'Feb', threats: 289, vulnerabilities: 52, blocked: 612 },
  { month: 'Mar', threats: 201, vulnerabilities: 38, blocked: 498 },
  { month: 'Apr', threats: 278, vulnerabilities: 61, blocked: 723 },
  { month: 'May', threats: 234, vulnerabilities: 48, blocked: 645 },
  { month: 'Jun', threats: 345, vulnerabilities: 72, blocked: 834 },
]
