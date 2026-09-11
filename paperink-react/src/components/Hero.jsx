import './Hero.css';

const WA = 'https://wa.me/6287800088006?text=Halo%20Paperink%2C%20saya%20ingin%20mendiskusikan%20kebutuhan%20merchandise%20corporate.';

const WaIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.22-1.56A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.22-3.48-8.52ZM12 22c-1.85 0-3.66-.5-5.23-1.44l-.37-.22-3.69.92.97-3.6-.24-.38A9.93 9.93 0 0 1 2 12C2 6.48 6.48 2 12 2c2.66 0 5.16 1.04 7.04 2.93A9.93 9.93 0 0 1 22 12c0 5.52-4.48 10-10 10Z"/>
  </svg>
);

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__top">
        <div className="container">
          <div className="hero__tag">
            Supplier Merchandise Corporate
          </div>

          <h1 className="hero__headline">
            All Your Merch,<br />
            <em>All in One Place.</em>
          </h1>

          <p className="hero__sub">
            Penuhi kebutuhan corporate gifting dan promosi perusahaan Anda dalam satu pintu.
            Mulai dari konsep, produksi, hingga pengemasan premium.
          </p>

          <div className="hero__actions">
            <a href={WA} className="btn btn-accent btn-xl" target="_blank" rel="noopener noreferrer">
              <WaIcon />
              Diskusikan Kebutuhan Anda
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
        </div>
      </div>

      {/* Hero image strip */}
      <div className="hero__img-strip">
        <img
          src="/images/hero-banner.jpg"
          alt="Merchandise Paperink Official"
          onError={e => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.nextElementSibling.style.display = 'flex';
          }}
        />
        <div className="hero__img-fallback" style={{ display: 'none' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
          </svg>
          <span>hero-banner.jpg</span>
          <span style={{ fontSize: '0.7rem', color: 'var(--grey-400)', maxWidth: 280, textAlign: 'center', textTransform: 'none', letterSpacing: 0, fontWeight: 400 }}>
            Taruh foto lifestyle produk di public/images/hero-banner.jpg (rasio ~3:1 landscape)
          </span>
        </div>
      </div>
    </section>
  );
}

