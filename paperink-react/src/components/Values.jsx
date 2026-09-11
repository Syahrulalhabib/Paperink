import { useScrollReveal } from '../hooks/useScrollReveal';
import './Values.css';

const items = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    title: 'Satu Pintu, Tanpa Ribet',
    desc: 'Dari konsep, produksi, hingga pengemasan premium — semua ditangani oleh satu tim.',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: 'Proses Transparan & Tepat Waktu',
    desc: 'Merchandise kustom berkualitas tinggi dengan proses yang jelas dan pengiriman sesuai deadline event.',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><polyline points="8 21 12 17 16 21"/>
      </svg>
    ),
    title: 'Konsistensi Identitas Brand',
    desc: 'Hemat waktu dan biaya dengan layanan merchandise lengkap yang menjaga konsistensi brand perusahaan Anda.',
  },
];

function ValueCard({ item, delay }) {
  const ref = useScrollReveal();
  return (
    <div className={`value-card reveal ${delay}`} ref={ref}>
      <div className="value-card__icon">{item.icon}</div>
      <h3 className="value-card__title">{item.title}</h3>
      <p className="value-card__desc">{item.desc}</p>
    </div>
  );
}

export default function Values() {
  const headRef = useScrollReveal();
  return (
    <section className="section values" id="values">
      <div className="container">
        <div className="sec-head reveal" ref={headRef}>
          <div className="sec-tag">Keunggulan Kami</div>
          <h2 className="sec-title">Solusi Merchandise Corporate<br />dalam Satu Pintu</h2>
          <p className="sec-sub">Penuhi kebutuhan corporate gifting dan promosi perusahaan Anda dengan mudah.</p>
        </div>
        <div className="values__grid">
          {items.map((item, i) => (
            <ValueCard key={item.title} item={item} delay={`d${i + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

