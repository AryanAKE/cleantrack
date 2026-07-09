'use strict';

const express = require('express');
const router  = express.Router();
const fs      = require('fs');
const path    = require('path');

const BINS_PATH = path.join(__dirname, '../data/bins.json');

// ── Helpers ───────────────────────────────────────────────────────────────────
function readBins() {
  try { return JSON.parse(fs.readFileSync(BINS_PATH, 'utf8')); }
  catch { return []; }
}
function writeBins(bins) {
  fs.writeFileSync(BINS_PATH, JSON.stringify(bins, null, 2), 'utf8');
}

// ── Page Route ────────────────────────────────────────────────────────────────

// GET /collector — collector app page
router.get('/', (req, res) => {
  const bins    = readBins();
  const pending = bins.filter(b => b.status !== 'collected');
  const done    = bins.filter(b => b.status === 'collected').length;

  res.render('collector', {
    title:      'Collector App',
    bins:       pending,
    doneCount:  done,
    totalCount: bins.length,
    currentBin: pending[0] || null
  });
});

// ── API Endpoints ─────────────────────────────────────────────────────────────

// GET /collector/api/bins — list all bins
router.get('/api/bins', (req, res) => {
  res.json(readBins());
});

// POST /collector/api/verify — mark bin as collected
router.post('/api/verify', (req, res) => {
  const { binId } = req.body;
  if (!binId) return res.status(400).json({ error: 'binId is required' });

  const bins = readBins();
  const bin  = bins.find(b => b.id === binId);
  if (!bin)   return res.status(404).json({ error: 'Bin not found' });

  bin.status        = 'collected';
  bin.collectedAt   = new Date().toISOString();
  bin.gpsVerified   = true;
  bin.photoVerified = true;
  writeBins(bins);

  // Return the next pending bin as well
  const remaining = bins.filter(b => b.status !== 'collected');
  res.json({ success: true, verifiedBin: bin, nextBin: remaining[0] || null });
});

// POST /collector/api/reset — reset all bins to pending (demo utility)
router.post('/api/reset', (req, res) => {
  const bins = readBins();
  bins.forEach(b => {
    b.status = 'pending';
    delete b.collectedAt;
    delete b.gpsVerified;
    delete b.photoVerified;
  });
  writeBins(bins);
  res.json({ success: true, message: 'All bins reset to pending' });
});

module.exports = router;
