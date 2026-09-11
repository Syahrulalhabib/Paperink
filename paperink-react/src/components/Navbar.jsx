import { useEffect, useState, useRef } from 'react';
import './Navbar.css';

const links = [
  { href: '#produk',     label: 'Produk' },
  { href: '#portofolio', label: 'Portofolio' },
  { href: '#faq',        label: 'FAQ' },
  { href: '#kontak',     label: 'Hubungi Kami' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('click', onClickOutside);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('click', onClickOutside);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const go = (e, href) => {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    if (!el) return;
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 80;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - navH, behavior: 'smooth' });
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  return (
    <header ref={navRef} className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <a href="#hero" className="navbar__logo" onClick={e => go(e, '#hero')}>
          <img
            src="/images/logo.svg"
            alt="Paperink Official"
            className="navbar__logo-img"
            onError={e => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling.style.display = 'inline';
            }}
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

        <button
          className={`navbar__burger${open ? ' active' : ''}`}
          onClick={() => setOpen(p => !p)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span /><span /><span />
        </button>
      </div>

      <div className={`navbar__mobile${open ? ' open' : ''}`}>
        {links.map(l => (
          <a key={l.href} href={l.href} className="navbar__mobile-link" onClick={e => go(e, l.href)}>
            {l.label}
          </a>
        ))}
      </div>
    </header>
  );
}
