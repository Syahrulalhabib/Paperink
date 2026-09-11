import { useScrollReveal } from '../hooks/useScrollReveal';
import './CTABanner.css';

const WA = 'https://wa.me/6287800088006?text=Halo%20Paperink%2C%20saya%20ingin%20mendiskusikan%20kebutuhan%20merchandise%20corporate.';

export default function CTABanner() {
  const ref = useScrollReveal();
  return (
    <section className="cta-banner" id="cta">
      <div className="container cta-banner__inner reveal" ref={ref}>
        <div className="cta-banner__tag">Kolaborasi Project</div>
        <h2 className="cta-banner__title">
          Siap Mewujudkan<br />Merchandise Corporate Anda?
        </h2>
        <p className="cta-banner__sub">
          Diskusikan konsep, spesifikasi kustomisasi, dan estimasi produksi langsung bersama tim spesialis kami.
        </p>
        <div className="cta-banner__actions">
          <a href={WA} className="btn btn-accent btn-xl" target="_blank" rel="noopener noreferrer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.22-1.56A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.22-3.48-8.52ZM12 22c-1.85 0-3.66-.5-5.23-1.44l-.37-.22-3.69.92.97-3.6-.24-.38A9.93 9.93 0 0 1 2 12C2 6.48 6.48 2 12 2c2.66 0 5.16 1.04 7.04 2.93A9.93 9.93 0 0 1 22 12c0 5.52-4.48 10-10 10Z"/>
            </svg>
            Hubungi Tim Kami
          </a>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => {
              const el = document.getElementById('produk');
              if (el) {
                const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 80;
                window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - navH, behavior: 'smooth' });
              }
            }}
          >
            Lihat Koleksi
          </button>
        </div>
        <p className="cta-banner__info">Proses Transparan · Tepat Waktu · Kualitas Terjamin</p>
      </div>
    </section>
  );
}
