import { useState, useEffect, useRef } from 'react';
import './Hero.css';

const HERO_SLIDES = [
  { id: 1, src: '/images/banner-hero.png', alt: 'Corporate Merchandise Showcase', badge: 'Paperink Official' },
  { id: 2, src: '/images/portfolio/tumbler-sakura-led.jpg', alt: 'Vacuum Flask Sakura Bamboo Lid', badge: 'Drinkware' },
  { id: 3, src: '/images/portfolio/portfolio-toyota-notebook.jpg', alt: 'Custom Leather Agenda Toyota', badge: 'Notebook & Pen' },
  { id: 4, src: '/images/portfolio/tumbler-sport-metalic.jpg', alt: 'Tumbler Sport Carabiner Series', badge: 'Drinkware' },
  { id: 5, src: '/images/portfolio/portfolio-mercure-flashdisk.jpg', alt: 'Metal Keychain Flashdisk Mercure Hotel', badge: 'Flashdisk' },
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
              {!imgErrors[slide.id] ? (
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="hero-slider__img"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  onError={() => setImgErrors((p) => ({ ...p, [slide.id]: true }))}
                />
              ) : (
                <div className="hero-slider__fallback">
                  <span>Paperink Merchandise</span>
                </div>
              )}
              <div className="hero-slider__overlay" />
              <span className="hero-slider__badge">{slide.badge}</span>
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
      {/* 2. Text Content (Underneath the slider) */}
      <div className="hero__content">
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

