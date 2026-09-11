import { useEffect, useState } from 'react';

const KEY = 'paperink-theme';

function applyTheme(dark) {
  const root = document.documentElement;
  if (dark) root.classList.add('dark');
  else root.classList.remove('dark');
  localStorage.setItem(KEY, dark ? 'dark' : 'light');
}

export default function useDarkMode() {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem(KEY);
    if (stored !== null) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Mount: terapkan tanpa transisi (no flash)
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('no-transition');
    applyTheme(dark);
    requestAnimationFrame(() => root.classList.remove('no-transition'));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // hanya mount

  const toggle = () => {
    const next = !dark;
    if (document.startViewTransition) {
      // applyTheme (DOM) sync di dalam callback — ini yang di-snapshot browser
      // setDark di luar, setelah transition mulai, agar React re-render tidak block snapshot
      const t = document.startViewTransition(() => applyTheme(next));
      t.ready.then(() => setDark(next)).catch(() => setDark(next));
    } else {
      applyTheme(next);
      setDark(next);
    }
  };

  return [dark, toggle];
}
