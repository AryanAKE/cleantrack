'use strict';

const express = require('express');
const router  = express.Router();
const fs      = require('fs');
const path    = require('path');

const REPORTS_PATH = path.join(__dirname, '../data/reports.json');
const BINS_PATH    = path.join(__dirname, '../data/bins.json');

// ── Helpers ───────────────────────────────────────────────────────────────────
function readJSON(filePath) {
  try { return JSON.parse(fs.readFileSync(filePath, 'utf8')); }
  catch { return []; }
}

function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

function computeStats(bins, reports) {
  const total        = bins.length;
  const collected    = bins.filter(b => b.status === 'collected').length;
  const pending      = reports.filter(r => r.status === 'pending').length;
  const routePct     = total > 0 ? Math.round((collected / total) * 100) : 0;
  return { routeCompletion: routePct, complaints: pending, trucksActive: 4, binsToday: collected };
}

// ── Page Routes ───────────────────────────────────────────────────────────────

// GET /admin — dashboard page
router.get('/', (req, res) => {
  const reports = readJSON(REPORTS_PATH);
  const bins    = readJSON(BINS_PATH);
  const stats   = computeStats(bins, reports);

  // Activity feed: last 6 collected bins (most recent first)
  const recentActivity = bins
    .filter(b => b.status === 'collected' && b.collectedAt)
    .sort((a, b) => new Date(b.collectedAt) - new Date(a.collectedAt))
    .slice(0, 6);

  res.render('admin', {
    title: 'Admin Dashboard',
    stats,
    reports: reports.slice(0, 15),
    recentActivity,
    pendingReportCount: stats.complaints
  });
});

// ── API Endpoints ─────────────────────────────────────────────────────────────

// GET /admin/api/stats
router.get('/api/stats', (req, res) => {
  const reports = readJSON(REPORTS_PATH);
  const bins    = readJSON(BINS_PATH);
  res.json({ ...computeStats(bins, reports), totalReports: reports.length });
});

// GET /admin/api/reports
router.get('/api/reports', (req, res) => {
  res.json(readJSON(REPORTS_PATH));
});

// PATCH /admin/api/reports/:id — update report status
router.patch('/api/reports/:id', (req, res) => {
  const reports = readJSON(REPORTS_PATH);
  const idx     = reports.findIndex(r => r.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Report not found' });

  reports[idx].status     = req.body.status || 'resolved';
  reports[idx].resolvedAt = new Date().toISOString();
  writeJSON(REPORTS_PATH, reports);
  res.json({ success: true, report: reports[idx] });
});

module.exports = router;
