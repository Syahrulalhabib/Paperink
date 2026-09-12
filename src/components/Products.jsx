import { useEffect, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Products.css';

const products = [
  {
    id: 1,
    name: 'Tumbler',
    cat: 'Drinkware',
    variants: 'Vacuum Flask · Classic · Tumbler Mug · Tyisoo · Sport Jumbo',
    slides: [
      { src: '/images/tumbler/vacuum-flask/vacuum-flask.png', label: 'Vacuum Flask' },
      { src: '/images/tumbler/classic/classic.png',           label: 'Tumbler Classic' },
      { src: '/images/tumbler/tumbler-mug/tumbler-mug-1.png', label: 'Tumbler Mug' },
      { src: '/images/tumbler/tumbler-tyisoo-600.jpg',         label: 'Tumbler Tyisoo 600' },
      { src: '/images/tumbler/tumbler-sport-jumbo.jpg',        label: 'Tumbler Sport Jumbo 800' },
    ],
  },
  {
    id: 2,
    name: 'Notebook & Pen',
    cat: 'Alat Tulis & Kantor',
    variants: 'Notebook · Notebook & Pen Set · Planer Wood',
    slides: [
      { src: '/images/notebook/standard/notebook-1.png',     label: 'Notebook Standar #1' },
      { src: '/images/notebook/standard/notebook-2.png',     label: 'Notebook Standar #2' },
      { src: '/images/notebook/with-pen/notebook-pen-1.png', label: 'Notebook & Pen Set' },
      { src: '/images/notebook/notebook-planer-maple.jpg',    label: 'Notebook Planer Maple Wood' },
      { src: '/images/notebook/basic-notebook-pu.jpg',        label: 'Basic Notebook PU Leather' },
    ],
  },
  {
    id: 3,
    name: 'Sticky Notes',
    cat: 'Alat Tulis & Kantor',
    variants: 'Custom Sticky Notes',
    slides: [
      { src: '/images/sticky-notes/sticky-notes-1.png', label: 'Sticky Notes Pad #1' },
      { src: '/images/sticky-notes/sticky-notes-2.png', label: 'Sticky Notes Pad #2' },
      { src: '/images/sticky-notes/sticky-notes-3.png', label: 'Sticky Notes Pastel #3' },
    ],
  },
  {
    id: 4,
    name: 'Flashdisk',
    cat: 'Elektronik & Gadget',
    variants: 'Standard USB · Dual OTG',
    slides: [
      { src: '/images/flashdisk/standard/flashdisk-1.png', label: 'Flashdisk Standard #1' },
      { src: '/images/flashdisk/standard/flashdisk-2.png', label: 'Flashdisk Standard #2' },
      { src: '/images/flashdisk/otg/flashdisk-otg-1.png',   label: 'Flashdisk Dual OTG' },
    ],
  },
];

function ProductCard({ p, delay, intervalOffset = 0 }) {
  const ref = useScrollReveal();
  const [activeIdx, setActiveIdx] = useState(0);
  const [imgErrors, setImgErrors] = useState({});

  const hasMultiple = p.slides.length > 1;

  useEffect(() => {
    if (!hasMultiple) return;
    const timer = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % p.slides.length);
    }, 3200 + intervalOffset);
    return () => clearInterval(timer);
  }, [hasMultiple, p.slides.length, intervalOffset]);

  const currentSlide = p.slides[activeIdx];
  const isCurrentError = imgErrors[activeIdx];

  const handleImgError = (idx) => {
    setImgErrors(prev => ({ ...prev, [idx]: true }));
  };

  return (
    <article className={`product-card reveal ${delay}`} ref={ref}>
      <div className="product-card__img-wrap">
        {p.slides.map((slide, idx) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={`${p.name} - ${slide.label}`}
            className={`product-card__img ${idx === activeIdx && !imgErrors[idx] ? 'active' : ''}`}
            loading="lazy"
            onError={() => handleImgError(idx)}
          />
        ))}

        {isCurrentError && (
          <div className="product-card__fallback show">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
            </svg>
            <span className="product-card__fallback-title">{currentSlide.label}</span>
          </div>
        )}

        <span className="product-card__slide-badge">
          {currentSlide.label}
        </span>

        {hasMultiple && (
          <div className="product-card__dots">
            {p.slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`product-card__dot ${idx === activeIdx ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIdx(idx);
                }}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="product-card__info">
        <p className="product-card__cat">{p.cat}</p>
        <h3 className="product-card__name">{p.name}</h3>
        <p className="product-card__variants">{p.variants}</p>
      </div>
    </article>
  );
}

const WA_CATALOG = 'https://wa.me/6287800088006?text=Halo%20Paperink%2C%20saya%20ingin%20meminta%20katalog%20lengkap%20dan%20penawaran%20harga%20merchandise%20corporate.';

const ChatIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </svg>
);

export default function Products() {
  const headRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  return (
    <section className="section products" id="produk">
      <div className="container">
        <div className="sec-head reveal" ref={headRef}>
          <div className="sec-tag">Koleksi Produk</div>
          <h2 className="sec-title">Merchandise untuk Setiap<br />Kebutuhan Corporate</h2>
          <p className="sec-sub">Dari kebutuhan kantor harian hingga souvenir event — semua bisa dikustomisasi dengan identitas brand perusahaan Anda.</p>
        </div>
        <div className="products__grid">
          {products.map((p, i) => (
            <ProductCard
              key={p.id}
              p={p}
              delay={`d${i + 1}`}
              intervalOffset={(i % 3) * 350}
            />
          ))}
        </div>
        <div className="products__cta reveal" ref={ctaRef}>
          <a
            href={WA_CATALOG}
            className="btn btn-dark btn-xl products__cta-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ChatIcon />
            Minta Katalog Lengkap &amp; Penawaran
          </a>
        </div>
      </div>
    </section>
  );
}
