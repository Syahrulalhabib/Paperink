import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Portfolio.css';

const tabs = ['Semua', 'Tumbler', 'Notebook & Pen', 'Sticky Notes', 'Flashdisk'];

const items = [
  { id: 1, img: '/images/portfolio/portfolio-toyota-notebook.jpg',    label: 'Custom Leather Agenda',                      tab: 'Notebook & Pen' },
  { id: 2, img: '/images/portfolio/tumbler-sakura-led.jpg',            label: 'Vacuum Flask Sakura Bamboo Lid',              tab: 'Tumbler' },
  { id: 3, img: '/images/sticky-notes/sticky-notes-4.png',             label: 'Custom Memo Sticky Notes Pad',              tab: 'Sticky Notes' },
  { id: 4, img: '/images/portfolio/portfolio-mercure-flashdisk.jpg',   label: 'Metal Keychain Flashdisk — Mercure Hotel',  tab: 'Flashdisk' },
  { id: 5, img: '/images/portfolio/tumbler-sport-metalic.jpg',         label: 'Tumbler Sport Carabiner Series',            tab: 'Tumbler' },
  { id: 6, img: '/images/portfolio/leather-personal-notebook.jpg',     label: 'Personal PU Leather Agenda + Pen',          tab: 'Notebook & Pen' },
  { id: 7, img: '/images/sticky-notes/sticky-notes-5.png',             label: 'Executive Sticky Notes Booklet',            tab: 'Sticky Notes' },
  { id: 8, img: '/images/flashdisk/otg/flashdisk-otg-2.png',           label: 'Flashdisk Dual OTG Swivel 64GB',            tab: 'Flashdisk' },
];

const ImgIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
  </svg>
);

function PortfolioItem({ item }) {
  return (
    <div className="portfolio-item">
      <img
        src={item.img}
        alt={item.label}
        className="portfolio-item__img"
        loading="lazy"
        onError={e => {
          e.currentTarget.style.display = 'none';
          e.currentTarget.nextElementSibling.classList.add('show');
        }}
      />
      <div className="portfolio-item__fallback">
        <ImgIcon />
        <span>{item.label}</span>
      </div>
      <div className="portfolio-item__label">{item.label}</div>
    </div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState('Semua');
  const headRef = useScrollReveal();
  const filtered = active === 'Semua' ? items : items.filter(i => i.tab === active);

  return (
    <section className="section portfolio" id="portofolio">
      <div className="container">
        <div className="sec-head reveal" ref={headRef}>
          <div className="sec-tag">Portofolio</div>
          <h2 className="sec-title">Karya yang Sudah Kami Buat</h2>
          <p className="sec-sub">Koleksi hasil produksi merchandise corporate untuk berbagai event dan kebutuhan promosi perusahaan.</p>
        </div>

        <div className="portfolio__tabs">
          {tabs.map(t => (
            <button
              key={t}
              className={`portfolio__tab${active === t ? ' active' : ''}`}
              onClick={() => setActive(t)}
            >
              {t}
            </button>
          ))}
        </div>

        <div className={`portfolio__grid${active === 'Semua' ? ' portfolio__grid--featured' : ''}`}>
          {filtered.map(item => (
            <PortfolioItem key={item.id} item={item} />
          ))}
          <a
            href="https://www.instagram.com/paperinkofficial_"
            target="_blank"
            rel="noopener noreferrer"
            className="portfolio-item portfolio-item--cta"
            aria-label="Lihat portofolio lengkap di Instagram @paperinkofficial_"
          >
            <div className="portfolio-item__cta-content">
              <div className="portfolio-item__cta-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </div>
              <span className="portfolio-item__cta-tag">Instagram</span>
              <span className="portfolio-item__cta-title">Lihat Koleksi Lengkap</span>
              <span className="portfolio-item__cta-link">@paperinkofficial_ &rarr;</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
