/* =============================================
   collector.js — Collector App Workflow
   ============================================= */

'use strict';

// Data injected server-side via window.BINS_DATA
let binsQueue   = (window.BINS_DATA || []).filter(b => b.status !== 'collected');
let currentBin  = binsQueue[0] || null;
let doneCount   = window.DONE_COUNT || 0;
let totalCount  = window.TOTAL_COUNT || 0;
let flowRunning = false;

// ── Clock ─────────────────────────────────────────────────────
(function startClock() {
  const el = document.getElementById('hdr-time');
  if (!el) return;
  const tick = () => {
    const now = new Date();
    el.textContent =
      now.getHours().toString().padStart(2, '0') + ':' +
      now.getMinutes().toString().padStart(2, '0');
  };
  tick();
  setInterval(tick, 1000);
})();

// ── State Helpers ─────────────────────────────────────────────
function showState(id) {
  ['state-idle','state-scanning','state-photo','state-success'].forEach(s => {
    const el = document.getElementById(s);
    if (el) el.classList.toggle('hidden', s !== id);
  });
}

function updateStatus(text) {
  const el = document.getElementById('status-text');
  if (el) el.textContent = text;
}

function resetFlow() {
  flowRunning = false;
  showState('state-idle');
  updateStatus('Step 1: Tap the area above to scan the bin QR code.');
  const scanArea = document.getElementById('scan-area');
  if (scanArea) { scanArea.classList.remove('active'); scanArea.style.cursor = 'pointer'; }
}

// ── Collection Flow ───────────────────────────────────────────
window.startCollectionFlow = function () {
  if (flowRunning || !currentBin) return;

  // If success state already showing, ignore tap on card
  const successEl = document.getElementById('state-success');
  if (successEl && !successEl.classList.contains('hidden')) return;

  flowRunning = true;
  const scanArea = document.getElementById('scan-area');
  if (scanArea) { scanArea.classList.add('active'); scanArea.style.cursor = 'default'; }

  // Step 1 — Scanning
  showState('state-scanning');
  updateStatus('Detecting QR Code... hold steady.');

  setTimeout(() => {
    // Step 2 — Photo
    showState('state-photo');
    updateStatus('Capturing verification photo...');

    setTimeout(() => {
      // Step 3 — Success (call API)
      verifyBin();
    }, 2000);
  }, 2500);
};

async function verifyBin() {
  if (!currentBin) return;

  try {
    const res  = await fetch('/collector/api/verify', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ binId: currentBin.id })
    });
    const data = await res.json();

    if (data.success) {
      doneCount++;
      const doneEl = document.getElementById('hdr-done');
      if (doneEl) doneEl.textContent = doneCount;

      showState('state-success');
      updateStatus('Upload complete. GPS & Photo verified. ✓');

      // Remove this bin from local queue
      binsQueue = binsQueue.filter(b => b.id !== currentBin.id);

      // Remove it from DOM queue list
      const queueRow = document.getElementById(`queue-${currentBin.id}`);
      if (queueRow) queueRow.remove();

      // Update next bin reference
      currentBin = data.nextBin || binsQueue[0] || null;
    } else {
      resetFlow();
      showToast('Verification failed. Please retry.', 'error');
    }
  } catch (err) {
    console.error(err);
    resetFlow();
    showToast('Network error. Please retry.', 'error');
  }
}

// ── Next Bin ──────────────────────────────────────────────────
window.loadNextBin = function (event) {
  if (event) event.stopPropagation();

  if (!currentBin) {
    // All done — reload page
    window.location.reload();
    return;
  }

  // Update task card UI
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('bin-id-badge', currentBin.id);
  set('bin-location', currentBin.location);
  set('bin-area',     currentBin.area);
  set('bin-distance', currentBin.distance);

  const badgeEl = document.getElementById('bin-id-badge');
  if (badgeEl) badgeEl.innerHTML = `<i class="fa-solid fa-qrcode" style="margin-right:4px"></i>${currentBin.id}`;

  // Renumber queue items
  document.querySelectorAll('#queue-list .queue-item').forEach((item, i) => {
    const numEl = item.querySelector('.queue-number');
    if (numEl) numEl.textContent = i + 2;
  });

  resetFlow();
  showToast(`Now collecting: ${currentBin.location}`, 'info');
};

// ── Reset All Bins (demo) ─────────────────────────────────────
window.resetAllBins = async function () {
  try {
    await fetch('/collector/api/reset', { method: 'POST' });
    window.location.reload();
  } catch {
    showToast('Reset failed', 'error');
  }
};
