import { useEffect, useState } from 'react';

const KEY = 'paperink-theme-v2';

function applyTheme(dark, save = false) {
  const root = document.documentElement;
  if (dark) root.classList.add('dark');
  else root.classList.remove('dark');
  if (save) {
    try {
      localStorage.setItem(KEY, dark ? 'dark' : 'light');
    } catch {
      // ignore
    }
  }
}

export default function useDarkMode() {
  const [dark, setDark] = useState(() => {
    try {
      localStorage.removeItem('paperink-theme'); // bersihkan cache auto-dark lama
      const stored = localStorage.getItem(KEY);
      if (stored !== null) return stored === 'dark';
    } catch {
      // ignore
    }
    // Default selalu Light Mode untuk setiap pengunjung
    return false;
  });

  // Mount: terapkan tanpa transisi (no flash)
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('no-transition');
    applyTheme(dark, false);
    requestAnimationFrame(() => root.classList.remove('no-transition'));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = () => {
    const next = !dark;
    if (document.startViewTransition) {
      const t = document.startViewTransition(() => applyTheme(next, true));
      t.ready.then(() => setDark(next)).catch(() => setDark(next));
    } else {
      applyTheme(next, true);
      setDark(next);
    }
  };

  return [dark, toggle];
}

