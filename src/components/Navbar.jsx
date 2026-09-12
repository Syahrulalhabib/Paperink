import { useEffect, useState, useRef } from 'react';
import useDarkMode from '../hooks/useDarkMode';
import './Navbar.css';

const links = [
  { href: '#produk',     label: 'Produk' },
  { href: '#portofolio', label: 'Portofolio' },
  { href: '#faq',        label: 'FAQ' },
  { href: '#kontak',     label: 'Kontak' },
];

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

function ThemeToggle({ dark, toggle }) {
  return (
    <button
      type="button"
      className="navbar__theme-btn"
      onClick={toggle}
      aria-label={dark ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'}
      title={dark ? 'Mode Terang' : 'Mode Gelap'}
    >
      {dark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

export default function Navbar({ onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, toggleDark] = useDarkMode();
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    // Lock body scroll on mobile while menu is open
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 768) setOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const go = (e, href) => {
    e.preventDefault();
    setOpen(false);
    document.body.style.overflow = '';

    const el = document.querySelector(href);
    if (!el) {
      if (onNavigate) {
        onNavigate(href);
      } else {
        window.location.href = href === '#hero' ? '/' : `/${href}`;
      }
      return;
    }

    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 80;
    requestAnimationFrame(() => {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - navH,
        behavior: 'smooth',
      });
    });

    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  return (
    <>
      <header ref={navRef} className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
        <div className="container navbar__inner">
          <a href="#hero" className="navbar__logo" onClick={e => go(e, '#hero')}>
            <img
              src="/images/logo.svg"
              alt="Paperink Official"
              className={`navbar__logo-img${dark ? ' navbar__logo-img--hidden' : ''}`}
            />
            <img
              src="/images/logo-dark.svg"
              alt="Paperink Official"
              className={`navbar__logo-img navbar__logo-img--dark${!dark ? ' navbar__logo-img--hidden' : ''}`}
            />
            <span className="navbar__logo-text" style={{ display: 'none' }}>Paperink<em>Official</em></span>
          </a>

          <nav className="navbar__nav" aria-label="Main navigation">
            {links.map(l => (
              <a key={l.href} href={l.href} className="navbar__link" onClick={e => go(e, l.href)}>
                {l.label}
              </a>
            ))}
          </nav>

          <ThemeToggle dark={dark} toggle={toggleDark} />

          <button
            type="button"
            className={`navbar__burger${open ? ' active' : ''}`}
            onClick={() => setOpen(p => !p)}
            aria-label={open ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            aria-expanded={open}
            aria-controls="navbarMobileMenu"
          >
            <span /><span /><span />
          </button>
        </div>

        <div id="navbarMobileMenu" className={`navbar__mobile${open ? ' open' : ''}`}>
          {links.map(l => (
            <a key={l.href} href={l.href} className="navbar__mobile-link" onClick={e => go(e, l.href)}>
              {l.label}
            </a>
          ))}
          <button
            type="button"
            className="navbar__mobile-theme"
            onClick={toggleDark}
            aria-label={dark ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
          >
            <div className="navbar__mobile-theme-left">
              {dark ? <SunIcon /> : <MoonIcon />}
              <span>{dark ? 'Mode Terang' : 'Mode Gelap'}</span>
            </div>
            <div className={`navbar__switch${dark ? ' navbar__switch--on' : ''}`} aria-hidden="true">
              <span className="navbar__switch-thumb" />
            </div>
          </button>
        </div>
      </header>

      {/* Backdrop overlay for mobile drawer — outside header to escape backdrop-filter containing block */}
      <div
        className={`navbar__backdrop${open ? ' open' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
    </>
  );
}


