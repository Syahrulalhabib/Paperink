import { useEffect, useState } from 'react';
import Navbar    from './components/Navbar';
import Hero      from './components/Hero';
import Values    from './components/Values';
import Products  from './components/Products';
import Portfolio from './components/Portfolio';
import Stats     from './components/Stats';
import FAQ       from './components/FAQ';
import CTABanner from './components/CTABanner';
import Footer    from './components/Footer';
import NotFound  from './components/NotFound';

const WA = 'https://wa.me/6287800088006?text=Halo%20Paperink%2C%20saya%20ingin%20tanya%20mengenai%20merchandise%20custom.';

function is404(pathname) {
  const clean = pathname.replace(/\/+$/, '') || '/';
  return clean !== '/' && clean !== '/index.html';
}

export default function App() {
  const [path, setPath] = useState(() => (typeof window !== 'undefined' ? window.location.pathname : '/'));

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const onBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, []);

  useEffect(() => {
    const onPopState = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    // Bersihkan hash dari URL (misal #produk) agar URL tetap bersih http://localhost:5173/
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) {
        setTimeout(() => {
          const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 80;
          window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - navH, behavior: 'smooth' });
        }, 150);
      }
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    // Intersep semua klik anchor dengan href="#..." agar tidak mengubah URL di browser
    const onAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const targetSelector = anchor.getAttribute('href');
      if (!targetSelector || targetSelector === '#') return;
      const el = document.querySelector(targetSelector);
      if (!el) {
        e.preventDefault();
        handleGoHome(targetSelector);
        return;
      }

      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 80;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - navH, behavior: 'smooth' });

      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    };

    document.addEventListener('click', onAnchorClick);
    return () => document.removeEventListener('click', onAnchorClick);
  }, [path]);

  const handleGoHome = (targetHash) => {
    window.history.pushState(null, '', targetHash ? `/${targetHash}` : '/');
    setPath('/');
    if (targetHash) {
      setTimeout(() => {
        const el = document.querySelector(targetHash);
        if (el) {
          const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 80;
          window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - navH, behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isNotFoundPage = is404(path);

  return (
    <>
      {/* Floating WhatsApp */}
      <a href={WA} className="wa-float" target="_blank" rel="noopener noreferrer" aria-label="Chat WhatsApp">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.22-1.56A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.22-3.48-8.52ZM12 22c-1.85 0-3.66-.5-5.23-1.44l-.37-.22-3.69.92.97-3.6-.24-.38A9.93 9.93 0 0 1 2 12C2 6.48 6.48 2 12 2c2.66 0 5.16 1.04 7.04 2.93A9.93 9.93 0 0 1 22 12c0 5.52-4.48 10-10 10Zm5.47-7.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.8-1.48-1.78-1.66-2.08-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.91-2.19-.24-.57-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.06 2.9 1.21 3.1.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.22 1.35.19 1.86.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"/>
        </svg>
      </a>

      <Navbar onNavigate={handleGoHome} />

      <main>
        {isNotFoundPage ? (
          <NotFound onGoHome={handleGoHome} />
        ) : (
          <>
            <Hero />
            <Values />
            <Products />
            <Portfolio />
            <Stats />
            <FAQ />
            <CTABanner />
          </>
        )}
      </main>

      <Footer />
    </>
  );
}

