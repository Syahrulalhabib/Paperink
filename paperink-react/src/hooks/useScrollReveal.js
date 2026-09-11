import { useEffect, useRef } from 'react';

// Attaches IntersectionObserver to a ref, adds 'visible' class on entry.
// Returns the ref to attach to the element.
export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          obs.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px', ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}
