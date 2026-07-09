'use strict';

const express  = require('express');
const router   = express.Router();
const fs       = require('fs');
const path     = require('path');
const { v4: uuidv4 } = require('uuid');

const REPORTS_PATH = path.join(__dirname, '../data/reports.json');

// ── Helpers ───────────────────────────────────────────────────────────────────
function readReports() {
  try { return JSON.parse(fs.readFileSync(REPORTS_PATH, 'utf8')); }
  catch { return []; }
}
function writeReports(reports) {
  fs.writeFileSync(REPORTS_PATH, JSON.stringify(reports, null, 2), 'utf8');
}

// ── Page Route ────────────────────────────────────────────────────────────────

// GET /citizen
router.get('/', (req, res) => {
  res.render('citizen', { title: 'Report an Issue' });
});

// ── API Endpoints ─────────────────────────────────────────────────────────────

// POST /citizen/api/report — submit a new citizen report
router.post('/api/report', (req, res) => {
  const { issueType, description, location } = req.body;

  if (!issueType || !issueType.trim()) {
    return res.status(400).json({ error: 'issueType is required' });
  }

  const reports   = readReports();
  const newReport = {
    id:          uuidv4(),
    issueType:   issueType.trim(),
    description: (description || '').trim(),
    location:    (location || 'GPS Location Detected').trim(),
    status:      'pending',
    submittedAt: new Date().toISOString(),
    resolvedAt:  null
  };

  reports.unshift(newReport);
  writeReports(reports);

  res.status(201).json({ success: true, report: newReport });
});

module.exports = router;
