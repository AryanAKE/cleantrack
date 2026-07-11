/* =============================================
   theme.js — Dark / Light Mode Toggle
   Runs EARLY (in <head>) to prevent flash
   ============================================= */

(function () {
  'use strict';

  const STORAGE_KEY = 'cleantrack-theme';

  // Apply theme immediately to prevent FOUC
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  // Read saved preference, fallback to dark
  const saved = localStorage.getItem(STORAGE_KEY) || 'dark';
  applyTheme(saved);

  // Expose globally
  window.ThemeManager = {
    get: function () {
      return document.documentElement.getAttribute('data-theme') || 'dark';
    },
    set: function (theme) {
      applyTheme(theme);
      localStorage.setItem(STORAGE_KEY, theme);
      ThemeManager._syncButtons();
    },
    toggle: function () {
      const next = ThemeManager.get() === 'dark' ? 'light' : 'dark';
      ThemeManager.set(next);
    },
    _syncButtons: function () {
      const isDark = ThemeManager.get() === 'dark';
      document.querySelectorAll('.theme-toggle-btn').forEach(function (btn) {
        const icon = btn.querySelector('i');
        const label = btn.querySelector('.theme-label');
        if (icon) {
          icon.className = isDark
            ? 'fa-solid fa-sun'
            : 'fa-solid fa-moon';
        }
        if (label) {
          label.textContent = isDark ? 'Light Mode' : 'Dark Mode';
        }
        btn.title = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
      });
    }
  };

  // Sync buttons after DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    ThemeManager._syncButtons();
  });
})();
