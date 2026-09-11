// ============================================
// PAPERINK OFFICIAL — script.js
// Vanilla JS: scroll reveal, navbar, hamburger, FAQ
// ============================================

(function () {
  'use strict';

  // ── NAVBAR SHRINK ON SCROLL ──
  const navbar = document.getElementById('navbar');
  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // ── HAMBURGER MENU ──
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navMenu');

  hamburger.addEventListener('click', function (e) {
    e.stopPropagation();
    const isOpen = navMenu.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a link is clicked
  navMenu.querySelectorAll('.navbar__link').forEach(function (link) {
    link.addEventListener('click', function () {
      navMenu.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', false);
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function (e) {
    if (!navbar.contains(e.target) && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', false);
    }
  });

  // Close menu on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', false);
    }
  });

  // ── CLEAN URL & HASH REMOVAL ──
  if (window.location.hash) {
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
  }

  // ── SMOOTH SCROLL for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h') || '72', 10);
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    });
  });

  // ── SCROLL REVEAL via IntersectionObserver ──
  const revealEls = document.querySelectorAll('.scroll-reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // fire once
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback: show all immediately
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  // ── FAQ ACCORDION ──
  document.querySelectorAll('.faq__q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const item   = this.closest('.faq__item');
      const answer = item.querySelector('.faq__a');
      const isOpen = item.classList.contains('open');

      // Close all others
      document.querySelectorAll('.faq__item.open').forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.faq__a').style.maxHeight = null;
          openItem.querySelector('.faq__q').setAttribute('aria-expanded', false);
        }
      });

      // Toggle current
      if (isOpen) {
        item.classList.remove('open');
        answer.style.maxHeight = null;
        this.setAttribute('aria-expanded', false);
      } else {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        this.setAttribute('aria-expanded', true);
      }
    });
  });

  // ── ACTIVE NAV LINK on scroll ──
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.navbar__link');

  const sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(function (link) {
            const href = link.getAttribute('href');
            link.style.color = (href === '#' + id) ? 'var(--accent)' : '';
          });
        }
      });
    },
    { threshold: 0.4 }
  );
  sections.forEach(function (section) { sectionObserver.observe(section); });

  // ── PRODUCT CARD AUTO-SLIDER ──
  document.querySelectorAll('.product-card--slider').forEach(function (card, cardIdx) {
    const images = card.querySelectorAll('.product-card__img');
    const dots   = card.querySelectorAll('.product-card__dot');
    const badge  = card.querySelector('.product-card__slide-badge');
    if (images.length <= 1) return;

    let current = 0;
    function show(idx) {
      images[current].classList.remove('active');
      if (dots[current]) dots[current].classList.remove('active');
      current = idx;
      images[current].classList.add('active');
      if (dots[current]) dots[current].classList.add('active');
      if (badge) badge.textContent = images[current].getAttribute('data-label') || images[current].alt;
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function (e) {
        e.stopPropagation();
        show(i);
      });
    });

    setInterval(function () {
      show((current + 1) % images.length);
    }, 3200 + (cardIdx % 3) * 350);
  });

})();
