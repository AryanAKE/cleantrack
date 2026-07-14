import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    // 1. If user has previously chosen a theme, honour it
    const saved = localStorage.getItem('ct-theme');
    if (saved) return saved;
    // 2. On first visit, match the OS/browser preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ct-theme', theme);
  }, [theme]);

  // Sync live OS theme changes (only when no explicit user preference is stored)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    const handleChange = (e) => {
      // Only auto-switch if the user has never manually picked a theme
      if (!localStorage.getItem('ct-theme-manual')) {
        setTheme(e.matches ? 'light' : 'dark');
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggle = () => {
    // Mark that user has made a manual choice
    localStorage.setItem('ct-theme-manual', '1');
    setTheme(t => (t === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggle };
}
