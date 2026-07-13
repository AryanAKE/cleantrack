# CleanTrack — Smart Waste Management Platform

> Real-time waste collection verification system with QR scanning, GPS tracking, and citizen reporting.

## Features

- 🗺️ **Live Fleet GPS Map** — Track garbage trucks in real-time against planned routes
- 📱 **QR-Based Bin Verification** — Collectors scan bins to create tamper-proof proof of collection
- 📊 **Admin Operations Dashboard** — Monitor KPIs, completion rates, and open complaints
- 📣 **Citizen Reporting Portal** — Public portal to report overflowing or missed bins

## Tech Stack

- **Frontend:** React 19, React Router v7
- **Build Tool:** Vite 8
- **Styling:** Vanilla CSS with custom design system

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Portals

| Portal | Route | Description |
|--------|-------|-------------|
| Landing | `/` | Role selection page |
| Admin | `/admin` | Operations dashboard for managers |
| Collector | `/collector` | Field app for garbage truck operators |
| Citizen | `/citizen` | Public reporting portal |

---

© 2026 CleanTrack Team · v1.0.0
