/* =============================================
   admin.js — Admin Dashboard Logic
   ============================================= */

'use strict';

// ── Resolve Report ────────────────────────────────────────────
window.resolveReport = async function (reportId, btn) {
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span>';

  try {
    const res = await fetch(`/admin/api/reports/${reportId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'resolved' })
    });

    if (!res.ok) throw new Error('Server error');

    const data = await res.json();

    // Update badge
    const statusBadge = document.getElementById(`status-${reportId}`);
    if (statusBadge) {
      statusBadge.className = 'badge badge-success';
      statusBadge.textContent = '✓ Resolved';
    }

    // Remove action button
    btn.replaceWith(Object.assign(document.createElement('span'), {
      textContent: 'Closed',
      style: 'font-size:11px;color:var(--text-tertiary)'
    }));

    showToast('Report marked as resolved', 'success');

    // Refresh complaint count in header
    refreshComplaintsBadge();

  } catch (err) {
    console.error(err);
    btn.disabled = false;
    btn.textContent = 'Resolve';
    showToast('Failed to resolve report. Try again.', 'error');
  }
};

// ── Refresh Complaints Badge in sidebar ───────────────────────
async function refreshComplaintsBadge() {
  try {
    const res  = await fetch('/admin/api/stats');
    const data = await res.json();
    const badge = document.querySelector('.sidebar-nav-item .badge-danger');
    if (badge) badge.textContent = data.complaints > 0 ? data.complaints : '';
  } catch {}
}

// ── Refresh Stats ─────────────────────────────────────────────
window.refreshStats = async function () {
  const btn = event.currentTarget;
  btn.classList.add('rotating');
  btn.querySelector('i')?.classList.add('fa-spin');

  try {
    const res  = await fetch('/admin/api/stats');
    const data = await res.json();

    const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    const setWidth = (id, pct) => { const el = document.getElementById(id); if (el) el.style.width = pct + '%'; };

    setEl('stat-route',      data.routeCompletion + '%');
    setEl('stat-complaints', data.complaints);
    setEl('stat-trucks',     data.trucksActive);
    setEl('stat-bins',       data.binsToday);
    setWidth('prog-route',       data.routeCompletion);
    setWidth('prog-complaints',  Math.min(data.complaints * 10, 100));

    showToast('Stats refreshed', 'success');
  } catch {
    showToast('Could not refresh stats', 'error');
  } finally {
    setTimeout(() => btn.querySelector('i')?.classList.remove('fa-spin'), 600);
  }
};

// ── Auto-refresh every 60 seconds ────────────────────────────
setInterval(refreshComplaintsBadge, 60_000);
