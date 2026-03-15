<div align="center">

<!-- HERO BANNER -->
<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=00f5a0&height=200&section=header&text=CivicShield%20AI&fontSize=72&fontColor=0b0f19&fontAlignY=38&desc=Enterprise%20AI%20Cybersecurity%20Intelligence%20Platform&descAlignY=58&descSize=20&descColor=0b0f19" />

<br/>

<!-- BADGES -->
<img src="https://img.shields.io/badge/Version-2.0-00f5a0?style=for-the-badge&labelColor=0b0f19" />
<img src="https://img.shields.io/badge/Next.js-14+-ffffff?style=for-the-badge&logo=next.js&logoColor=white&labelColor=0b0f19" />
<img src="https://img.shields.io/badge/FastAPI-Python-00f5a0?style=for-the-badge&logo=fastapi&logoColor=white&labelColor=0b0f19" />
<img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white&labelColor=0b0f19" />
<img src="https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white&labelColor=0b0f19" />
<img src="https://img.shields.io/badge/Framer_Motion-Animated-ff0055?style=for-the-badge&logo=framer&logoColor=white&labelColor=0b0f19" />

<br/><br/>

> ### 🛡️ Real-time threat detection · AI-powered vulnerability scanning · Phishing protection · Live global attack mapping
>
> *Built for hackathon — designed for production.*

<br/>

[🚀 **Live Demo**](#) &nbsp;·&nbsp; [📖 **Quick Start**](#-quick-start) &nbsp;·&nbsp; [🧩 **Features**](#-feature-modules) &nbsp;·&nbsp; [🛠️ **Tech Stack**](#️-tech-stack) &nbsp;·&nbsp; [📸 **Screenshots**](#-screenshots)

</div>

---

## 🧠 What is CivicShield AI?

**CivicShield AI** is a full-stack, AI-powered cybersecurity intelligence platform that gives security teams and developers a unified command center to monitor, detect, and respond to cyber threats in real time.

It combines a **Next.js 14 frontend** (with stunning glassmorphism UI, live animations, and interactive data visualization) with a **Python FastAPI backend** to deliver enterprise-grade security tooling — from vulnerability scanning and phishing detection to API security monitoring and compliance reporting.

Whether you're a developer securing your first app or a security team monitoring a global infrastructure, CivicShield AI surfaces what matters: **who's attacking, what's vulnerable, and what to fix first.**

---

## 📸 Screenshots

<br/>

🛡️ Security Dashboard — Real-Time Threat Monitoring

The command center. A live Risk Score gauge tracks your current exposure out of 100, updated with every scan. The Active Threat Banner surfaces critical incidents requiring immediate action. Four live stat cards — Risk Score, Threats Today, Vulnerabilities, and Attacks Blocked — give an at-a-glance operational picture. The Overall Risk Level dial, Real-Time Threat Feed, and Infrastructure Overview panels round out the full situational view.

![Global Cyber Threat Map](screenshots/dashboard.png)

<br/>

🎣 Phishing & Email Security — ML-Powered Email Threat Detection

The detection engine. A live Block Rate metric reflects the percentage of phishing attempts neutralized in real time, alongside an overall Risk Score flagged for review. The Detection Methods pie chart breaks down how threats were caught — by ML model, blocked protocols, and suspicious flags. The Email Classification bar chart visualizes the ratio of legitimate vs. phishing vs. suspicious mail across total processed volume, making the signal-to-noise ratio immediately obvious.

![Phishing & Email Security](screenshots/phishing.png)

<br/>

### 📊 Reports & Analytics — *Audit-Ready Security Documentation*

> Six professional report templates ready to generate with one click: **Executive Summary**, **Vulnerability Report**, **Compliance Report**, **Threat Analysis**, **Remediation Plan**, and **Penetration Test**. Generated reports are listed with date, status, and format — downloadable as PDF instantly. Built for sharing with stakeholders, auditors, and compliance teams.

![Reports & Analytics](screenshots/reports.png)

---

## 🧩 Feature Modules

<details>
<summary><b>🌐 Dashboard — Cyber Risk Command Center</b></summary>
<br/>

The main dashboard is your real-time security nerve center:

- **Cyber Risk Score** — Animated circular gauge (0–100) with color-coded risk bands. Weighted algorithm based on vulnerability severity across your entire surface.
- **AI Threat Insights Panel** — Framer Motion-powered rotating intelligence feed with live glow effects and neon highlights. Shows emerging threat patterns detected by the AI engine.
- **Global Cyber Attack Map** — Custom React SVG vector map with animated CSS laser-path arcs showing live server attack routes across countries.
- **Security Metrics Cards** — 3D hover-lift cards displaying SQL Injection, XSS, API vulnerabilities, and security misconfiguration counts.
- **7-Day Security Trends** — Recharts line chart showing historical incident volume over the last week.
- **Vulnerability Distribution** — Bar chart breaking down Critical / High / Medium findings.
- **Vulnerability Details Table** — Expandable rows with payload evidence, severity level, and remediation priority.

</details>

<details>
<summary><b>🔍 Vulnerability Scanner — Deep Automated Scanning</b></summary>
<br/>

- **Three scan modes**: Full Scan, Quick Scan, API-only Scan
- **Target URL validation** with real-time feedback
- **Live scan progress tracking** powered by SWR polling (2-second intervals)
- **Premium Skeleton UI** — Physical pulsing shimmer loaders replace generic spinners during data fetch
- **Detailed results** with severity levels (Critical / High / Medium / Low), affected endpoint, CVE references, and remediation guidance
- **Filter & sort** findings by severity, type, or endpoint

</details>

<details>
<summary><b>📡 Attack Surface Analysis — Network Graph Intelligence</b></summary>
<br/>

- **Asset Summary** — Total count of domains, subdomains, APIs, and servers in your surface
- **Interactive Network Graph** — Powered by `react-force-graph-2d` with D3 physics simulation. Nodes represent discovered assets; edges show connectivity. Drag, zoom, and click to inspect any node.
- **Discovered Assets Table** — Every detected asset listed with risk score, type, and last-seen timestamp
- **High-Risk Asset Highlighting** — Critical assets automatically flagged for immediate attention

</details>

<details>
<summary><b>🎣 Phishing & Email Security — AI Email Threat Detection</b></summary>
<br/>

- **Real-time phishing attempt counter** with total blocked and flagged counts
- **Block Rate & Risk Score** KPIs — instantly shows how well your defenses are holding
- **Detection Methods Pie Chart** — ML detection vs protocol blocking vs suspicious flagging breakdown
- **Email Classification Bar Chart** — Volume split between Legitimate, Phishing, and Suspicious categories
- **Top Phishing Indicators** — Lists the most common signals triggering detection (suspicious sender domains, malicious links, spoofed headers, etc.)
- **Action Tracking** — Each threat tagged as Blocked, Quarantined, or Flagged

</details>

<details>
<summary><b>🔐 API Security Monitor — Endpoint Protection Layer</b></summary>
<br/>

- **Total API count** with active protection status
- **JWT authentication verification** — flags endpoints missing token validation
- **Per-endpoint request volume** tracking with anomaly detection
- **Threat detection** for each API route (injection attempts, rate abuse, auth bypass)
- **Real-time API security metrics** updated continuously

</details>

<details>
<summary><b>📄 Reports & Analytics — Compliance Documentation</b></summary>
<br/>

Six ready-to-use report templates:

| Template | Description |
|---|---|
| Executive Summary | High-level security posture for leadership |
| Vulnerability Report | Full technical findings with CVSS scores |
| Compliance Report | SOC2 / ISO 27001 / GDPR standards status |
| Threat Analysis | Threat landscape and actor profiling |
| Remediation Plan | Prioritized fix roadmap with effort estimates |
| Penetration Test | Structured pentest findings documentation |

All reports are generated as **PDF** and available for download instantly. Report history is maintained with generation date, status, and format.

</details>

<details>
<summary><b>📋 Activity Logs — Full Audit Trail</b></summary>
<br/>

- **Searchable event log** across all security events
- **Multi-dimensional filtering**: threat type, severity, IP address, timestamp range
- Complete audit trail for compliance and incident response

</details>

<details>
<summary><b>⚙️ Settings — Full Platform Configuration</b></summary>
<br/>

- Profile and organization configuration
- **API key management** with show/hide toggle
- Notification preferences (email, Slack, in-app)
- Integrations: Slack, Email, GitHub
- Security settings: 2FA enforcement, API key requirements

</details>

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js 14 + React 18 | App router, SSR, API proxying |
| **Language** | TypeScript 5.x | Type safety across entire codebase |
| **Styling** | Tailwind CSS 3.x | Utility-first with custom cyber theme |
| **Animations** | Framer Motion | 3D lifts, shimmer states, mount transitions |
| **Charts** | Recharts | Line, bar, pie chart visualizations |
| **Network Graph** | React Force Graph 2D | D3 physics attack surface mapping |
| **Data Fetching** | SWR | Caching, polling, deduplication |
| **Notifications** | React Hot Toast | Dark-aesthetic toast system |
| **Icons** | Lucide React | Consistent icon language |
| **Backend** | Python FastAPI | Vulnerability scanning engine |

---

## 🎨 Design System

CivicShield AI uses a purpose-built **dark cybersecurity aesthetic** — not a generic dark theme, but a deliberate design language:
```
Background:       #0b0f19   ← Deep Navy (base)
Card:             #121826   ← Elevated Navy (surfaces)
Primary Accent:   #00f5a0   ← Neon Green (actions, live indicators)
Warning:          #ffb020   ← Amber (medium severity)
Critical:         #ff4d4f   ← Red (high/critical alerts)
```

**Visual Effects:**
- **Glassmorphism** — Semi-transparent cards with `backdrop-filter: blur`
- **Glow Pulses** — Neon green pulsing on live data points
- **Cyber Grid Background** — Subtle grid pattern creating depth
- **Shimmer Loading** — CSS `@keyframes shimmer` for skeleton states
- **3D Hover Lifts** — `perspective` + `translateZ` on metric cards
- **Smooth Counters** — Animated number transitions on all KPIs

---

## ⚡ Quick Start

### Prerequisites

- Node.js 18+
- Python 3.8+ (for FastAPI backend)

### 1. Clone the repo
```bash
git clone https://github.com/Divyansh2602/v0-civic-shield-ai-frontend
cd civicshield-ai
```

### 2. Install dependencies
```bash
npm install
# or yarn install / pnpm install
```

### 3. Set up environment variables
```bash
cp .env.example .env.local
```
```env
# .env.local
BACKEND_URL=http://localhost:8000

# Optional: Supabase for auth
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Start the dev server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

### 5. Production build
```bash
npm run build
npm run start
```

---

## 🗂️ Project Structure
```
civicshield-ai/
│
├── app/
│   ├── api/                     # Next.js API routes (proxy to FastAPI)
│   │   ├── scan/route.ts
│   │   ├── phishing/route.ts
│   │   └── report/route.ts
│   ├── dashboard/               # 🌐 Main threat dashboard
│   ├── scanner/                 # 🔍 Vulnerability scanner
│   ├── surface/                 # 📡 Attack surface + network graph
│   ├── phishing/                # 🎣 Phishing & email security
│   ├── api-security/            # 🔐 API endpoint monitoring
│   ├── reports/                 # 📄 Report generation
│   ├── logs/                    # 📋 Activity log viewer
│   ├── settings/                # ⚙️  Configuration
│   ├── globals.css              # Theme + @keyframes shimmer, hover-lift
│   └── layout.tsx               # Root layout with Toaster
│
├── components/
│   ├── AIThreatInsights.tsx     # Framer Motion rotating AI feed panel
│   ├── WorldMap.tsx             # Interactive SVG threat globe
│   ├── MetricCard.tsx           # 3D hover-lift stat cards
│   ├── RiskGaugeCard.tsx        # Animated circular risk gauge
│   ├── SidebarNav.tsx           # Responsive drawer navigation
│   ├── SkeletonLoader.tsx       # Pulsing shimmer loaders
│   └── VulnerabilityTable.tsx   # Expandable findings table
│
└── public/                      # Static assets
```

---

## 🔌 Backend API Reference

> The frontend proxies all requests through Next.js API routes to a Python FastAPI backend on `BACKEND_URL`.

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/scan` | Submit target URL for vulnerability scan |
| `GET` | `/scan/{scan_id}` | Poll scan status and retrieve results |
| `GET` | `/report/{scan_id}` | Generate and download PDF report |
| `POST` | `/phishing/check` | Analyze URL or email for phishing signals |

---

## 🛣️ Roadmap

- [x] Real-time threat globe with live attack feed
- [x] ML-powered phishing detection
- [x] D3 network graph for attack surface
- [x] PDF report generation with 6 templates
- [x] API security endpoint monitoring
- [ ] WebSocket live scan updates (no polling)
- [ ] Multi-tenant user authentication
- [ ] Custom dashboard widget builder
- [ ] Slack + Email alerting system
- [ ] Scheduled automated scanning
- [ ] CVE correlation and exploit database integration
- [ ] Mobile app (React Native)

---

## 🐛 Troubleshooting

<details>
<summary><b>Backend connection error</b></summary>

- Ensure FastAPI backend is running: `uvicorn main:app --reload`
- Verify `BACKEND_URL` in `.env.local` matches the backend port
- Check CORS is configured in FastAPI: `allow_origins=["http://localhost:3000"]`

</details>

<details>
<summary><b>Scans not starting</b></summary>

- Target URL must start with `http://` or `https://`
- Check browser console (F12) for error messages
- Verify `/api/scan` Next.js route is reachable

</details>

<details>
<summary><b>Styling issues / broken layout</b></summary>
```bash
rm -rf .next node_modules
npm install
npm run dev
```

</details>

---

## 👤 Author

**Divyansh** — built with ❤️ for hackathon 2026

[![GitHub](https://img.shields.io/badge/GitHub-Divyansh2602-181717?style=for-the-badge&logo=github)](https://github.com/Divyansh2602)

---

## 📄 License

© 2026 CivicShield AI · All rights reserved.

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=00f5a0&height=100&section=footer&fontColor=0b0f19" />
