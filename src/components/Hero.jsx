import './Hero.css';

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
            <button
              type="button"
              className="btn btn-accent btn-xl"
              onClick={() => {
                const el = document.getElementById('produk');
                if (el) {
                  const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 80;
                  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - navH, behavior: 'smooth' });
                }
              }}
            >
              Lihat Koleksi
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Hero image strip */}
      <div className="hero__img-strip">
        <img
          src="/images/banner-hero.png"
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
          <span>Paperink Merchandise</span>
        </div>
      </div>
    </section>
  );
}

