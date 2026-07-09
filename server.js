'use strict';

require('dotenv').config();
const express = require('express');
const path    = require('path');
const fs      = require('fs');
const logger  = require('./middleware/logger');

// ── Routers ──────────────────────────────────────────────────────────────────
const indexRouter     = require('./routes/index');
const adminRouter     = require('./routes/admin');
const collectorRouter = require('./routes/collector');
const citizenRouter   = require('./routes/citizen');

// ── Bootstrap ─────────────────────────────────────────────────────────────────
const app  = express();
const PORT = process.env.PORT || 3000;
const ENV  = process.env.NODE_ENV || 'development';

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

// ── View Engine ───────────────────────────────────────────────────────────────
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ── Global Middleware ─────────────────────────────────────────────────────────
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/',          indexRouter);
app.use('/admin',     adminRouter);
app.use('/collector', collectorRouter);
app.use('/citizen',   citizenRouter);

// ── 404 Handler ───────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>404 – CleanTrack NextGen</title>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&display=swap" rel="stylesheet">
      <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: #0a0f1e; color: #f1f5f9; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; flex-direction: column; text-align: center; gap: 16px; }
        h1 { font-size: 72px; font-weight: 900; color: #10b981; margin: 0; letter-spacing: -2px; }
        p  { color: #64748b; font-size: 16px; }
        a  { color: #10b981; text-decoration: none; border-bottom: 1px solid; }
      </style>
    </head>
    <body>
      <h1>404</h1>
      <p>This page doesn't exist.</p>
      <a href="/">← Back to CleanTrack</a>
    </body>
    </html>
  `);
});

// ── Error Handler ─────────────────────────────────────────────────────────────
app.use((err, req, res, _next) => {
  console.error('\x1b[31m[ERROR]\x1b[0m', err.stack);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('\n\x1b[32m✔\x1b[0m \x1b[1mCleanTrack NextGen\x1b[0m is running');
  console.log(`  \x1b[36m➜\x1b[0m  Local:   \x1b[4mhttp://localhost:${PORT}\x1b[0m`);
  console.log(`  \x1b[36m➜\x1b[0m  Mode:    ${ENV}\n`);
});
