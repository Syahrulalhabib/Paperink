import { useState, useEffect, useRef } from 'react';
import './Hero.css';

const HERO_SLIDES = [
  {
    id: 1,
    src: '/images/banner-hero.png',              // Web / Desktop banner
    mobileSrc: '/images/banner-hero-mobile.png', // Mobile banner
    alt: 'Paperink Official Corporate Merchandise Showcase',
    badge: 'Paperink Official',
    isBanner: true,
  },
  {
    id: 2,
    src: '/images/tumbler/classic/classic.png',
    alt: 'Classic Tumbler Custom Corporate',
    badge: 'Drinkware',
  },
  {
    id: 3,
    src: '/images/tumbler/tumbler-sport-jumbo.jpg',
    alt: 'Tumbler Sport Jumbo Corporate Gifting',
    badge: 'Drinkware',
  },
  {
    id: 4,
    src: '/images/tumbler/tumbler-mug/tumbler-mug-1.png',
    alt: 'Tumbler Mug Stainless Steel',
    badge: 'Drinkware',
  },
  {
    id: 5,
    src: '/images/notebook/standard/notebook-1.png',
    alt: 'Standard Corporate Notebook',
    badge: 'Notebook & Pen',
  },
  {
    id: 6,
    src: '/images/sticky-notes/sticky-notes-1.png',
    alt: 'Sticky Notes Custom Set',
    badge: 'Stationery',
  },
  {
    id: 7,
    src: '/images/notebook/notebook-planer-maple.jpg',
    alt: 'Notebook Planner Maple Series',
    badge: 'Notebook & Pen',
  },
  {
    id: 8,
    src: '/images/flashdisk/standard/flashdisk-2.png',
    alt: 'Standard Custom Metal Flashdisk',
    badge: 'Flashdisk',
  },
  {
    id: 9,
    src: '/images/flashdisk/otg/flashdisk-otg-1.png',
    alt: 'Flashdisk OTG Dual Port Corporate',
    badge: 'Flashdisk',
  },
];

export default function Hero() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [imgErrors, setImgErrors] = useState({});

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndX = useRef(0);
  const touchEndY = useRef(0);

  const prevSlide = () => {
    setCurrentIdx((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIdx((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchEndX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;
    setIsPaused(true);
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    const diffX = touchStartX.current - touchEndX.current;
    const diffY = touchStartY.current - touchEndY.current;
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) nextSlide();
      else prevSlide();
    }
  };

  return (
    <section className="hero" id="hero">
      {/* 1. Photo Slider */}
      <div
        className="hero__slider-wrap"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="hero-slider__track"
          style={{ transform: `translateX(-${currentIdx * 100}%)` }}
        >
          {HERO_SLIDES.map((slide, idx) => (
            <div className="hero-slider__slide" key={slide.id}>
              {/* Blurred backdrop only for non-banner square items */}
              {!slide.isBanner && (
                <div
                  className="hero-slider__bg"
                  style={{ backgroundImage: `url(${slide.src})` }}
                  aria-hidden="true"
                />
              )}

              {!imgErrors[slide.id] ? (
                <picture className="hero-slider__picture">
                  {slide.mobileSrc && (
                    <source media="(max-width: 768px)" srcSet={slide.mobileSrc} />
                  )}
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className={`hero-slider__img ${slide.isBanner ? 'hero-slider__img--banner' : 'hero-slider__img--square'}`}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    onError={() => setImgErrors((p) => ({ ...p, [slide.id]: true }))}
                  />
                </picture>
              ) : (
                <div className="hero-slider__fallback">
                  <span>Paperink Merchandise</span>
                </div>
              )}

              {!slide.isBanner && <div className="hero-slider__overlay" />}
              {slide.badge && <span className="hero-slider__badge">{slide.badge}</span>}
            </div>
          ))}
        </div>

        <button
          type="button"
          className="hero-slider__btn hero-slider__btn--prev"
          onClick={(e) => { e.stopPropagation(); prevSlide(); }}
          aria-label="Slide sebelumnya"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          type="button"
          className="hero-slider__btn hero-slider__btn--next"
          onClick={(e) => { e.stopPropagation(); nextSlide(); }}
          aria-label="Slide berikutnya"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        <div className="hero-slider__dots">
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              className={`hero-slider__dot ${idx === currentIdx ? 'active' : ''}`}
              onClick={(e) => { e.stopPropagation(); setCurrentIdx(idx); }}
              aria-label={`Lihat slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
      {/* 2. Text Content (Underneath the banner slider) */}
      <div className="hero__content" id="hero-content">
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
              className="btn btn-xl hero__cta-btn"
              onClick={() => {
                const el = document.getElementById('produk');
                if (el) {
                  const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 80;
                  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - navH, behavior: 'smooth' });
                }
              }}
            >
              <span>Lihat Koleksi</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

