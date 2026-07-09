/* =============================================
   app.js — Shared utilities for CleanTrack
   ============================================= */

'use strict';

// ── Toast Notifications ───────────────────────────────────────
window.showToast = function (message, type = 'info', duration = 3500) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const icons = { success: 'fa-circle-check', error: 'fa-circle-xmark', info: 'fa-circle-info' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fa-solid ${icons[type] || icons.info}"></i><span>${message}</span>`;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'fadeIn .25s ease reverse forwards';
    setTimeout(() => toast.remove(), 250);
  }, duration);
};

// ── Date Display ──────────────────────────────────────────────
(function initDateDisplay() {
  const el = document.getElementById('date-display');
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
})();

// ── Sidebar Section Scroll ────────────────────────────────────
window.scrollToSection = function (sectionId) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};
