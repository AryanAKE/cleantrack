/* =============================================
   citizen.js — Citizen Report Form Logic
   ============================================= */

'use strict';

let selectedIssue = '';

// ── Issue Type Selector ───────────────────────────────────────
window.selectIssue = function (btn) {
  document.querySelectorAll('.issue-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  selectedIssue = btn.dataset.issue;

  const hiddenInput = document.getElementById('selected-issue');
  if (hiddenInput) hiddenInput.value = selectedIssue;

  const errEl = document.getElementById('issue-error');
  if (errEl) errEl.style.display = 'none';
};

// ── GPS Location ──────────────────────────────────────────────
(function detectLocation() {
  const textEl    = document.getElementById('location-text');
  const valueEl   = document.getElementById('location-value');
  const spinnerEl = document.getElementById('loc-spinner');
  if (!textEl) return;

  if (!navigator.geolocation) {
    textEl.textContent = 'GPS not available — enter manually';
    if (spinnerEl) spinnerEl.style.display = 'none';
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude: lat, longitude: lng } = pos.coords;
      const locationStr = `GPS: ${lat.toFixed(5)}, ${lng.toFixed(5)}`;
      textEl.textContent = locationStr;
      if (valueEl)   valueEl.value = locationStr;
      if (spinnerEl) spinnerEl.style.display = 'none';
    },
    () => {
      textEl.textContent = 'Navi Mumbai, Maharashtra (approx.)';
      if (valueEl)   valueEl.value = 'Navi Mumbai, Maharashtra';
      if (spinnerEl) spinnerEl.style.display = 'none';
    },
    { timeout: 8000, enableHighAccuracy: false }
  );
})();

// ── Photo Upload Preview ──────────────────────────────────────
window.handlePhotoSelect = function (input) {
  const file = input.files[0];
  if (!file) return;

  const preview = document.getElementById('photo-preview');
  const icon    = document.getElementById('photo-icon');
  const label   = document.getElementById('photo-label');
  const drop    = document.getElementById('photo-drop');

  const reader = new FileReader();
  reader.onload = (e) => {
    if (preview) {
      preview.src = e.target.result;
      preview.style.display = 'block';
    }
    if (icon)  icon.className  = 'fa-solid fa-check';
    if (label) label.textContent = file.name;
    if (drop)  { drop.style.borderColor = 'var(--emerald-500)'; drop.style.background = 'rgba(16,185,129,.06)'; }
  };
  reader.readAsDataURL(file);
};

// ── Form Submit ───────────────────────────────────────────────
(function bindForm() {
  const form = document.getElementById('report-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate issue type
    if (!selectedIssue) {
      const errEl = document.getElementById('issue-error');
      if (errEl) errEl.style.display = 'block';
      return;
    }

    const btn = document.getElementById('submit-btn');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span> Submitting...';

    const description = (document.getElementById('description')?.value || '').trim();
    const location    = document.getElementById('location-value')?.value || 'Navi Mumbai';

    try {
      const res = await fetch('/citizen/api/report', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ issueType: selectedIssue, description, location })
      });

      if (!res.ok) throw new Error('Server error');

      // Show success screen
      document.getElementById('report-form-wrapper').classList.add('hidden');
      const successScreen = document.getElementById('success-screen');
      if (successScreen) successScreen.classList.remove('hidden');

    } catch (err) {
      console.error(err);
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Submit Report';
      showToast('Submission failed. Please try again.', 'error');
    }
  });
})();

// ── Reset Form ────────────────────────────────────────────────
window.resetForm = function () {
  const form = document.getElementById('report-form');
  if (form) form.reset();

  // Reset state
  selectedIssue = '';
  document.querySelectorAll('.issue-btn').forEach(b => b.classList.remove('selected'));
  const hiddenInput = document.getElementById('selected-issue');
  if (hiddenInput) hiddenInput.value = '';

  const preview = document.getElementById('photo-preview');
  if (preview) { preview.src = ''; preview.style.display = 'none'; }

  const btn = document.getElementById('submit-btn');
  if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Submit Report'; }

  // Show form, hide success
  document.getElementById('report-form-wrapper')?.classList.remove('hidden');
  document.getElementById('success-screen')?.classList.add('hidden');
};
