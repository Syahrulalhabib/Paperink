import { useEffect } from 'react';
import './NotFound.css';

const WA_URL = 'https://wa.me/6287800088006?text=Halo%20Paperink%2C%20saya%20membuka%20link%20yang%20tidak%20ditemukan%20dan%20ingin%20tanya%20merchandise.';

export default function NotFound({ onGoHome }) {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = '404 - Halaman Tidak Ditemukan | Paperink Official';
    return () => {
      document.title = originalTitle;
    };
  }, []);

  const navigateToSection = (e, hash) => {
    e.preventDefault();
    if (onGoHome) {
      onGoHome(hash);
    } else {
      window.location.href = `/${hash}`;
    }
  };

  return (
    <section className="notfound">
      <div className="container notfound__inner">
        <div className="notfound__card">
          <span className="sec-tag notfound__tag">Error 404</span>

          <div className="notfound__glitch-wrap">
            <span className="notfound__number">404</span>
          </div>

          <h1 className="notfound__title">Halaman Tidak Ditemukan</h1>

          <div className="notfound__actions">
            <button
              type="button"
              onClick={() => onGoHome ? onGoHome() : (window.location.href = '/')}
              className="btn btn-accent btn-xl notfound__btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              Kembali ke Beranda
            </button>

            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline notfound__btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              Tanya via WhatsApp
            </a>
          </div>

          <div className="notfound__quicklinks">
            <span className="notfound__quicklinks-label">Atau langsung tuju:</span>
            <div className="notfound__links-grid">
              <a href="#produk" onClick={(e) => navigateToSection(e, '#produk')} className="notfound__chip">
                Katalog Produk
              </a>
              <a href="#portofolio" onClick={(e) => navigateToSection(e, '#portofolio')} className="notfound__chip">
                Portofolio Klien
              </a>
              <a href="#faq" onClick={(e) => navigateToSection(e, '#faq')} className="notfound__chip">
                FAQ
              </a>
              <a href="#kontak" onClick={(e) => navigateToSection(e, '#kontak')} className="notfound__chip">
                Kontak & Lokasi
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
