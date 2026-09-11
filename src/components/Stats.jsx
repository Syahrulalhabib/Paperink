import { useScrollReveal } from '../hooks/useScrollReveal';
import './Stats.css';

// ponytail: duplicate items for seamless infinite marquee (CSS animation translateX -50%)
const tickerData = [
  { num: 'Satu Pintu',    label: 'Konsep → Produksi → Pengemasan' },
  { num: 'Kustom',        label: 'Cetak Logo Perusahaan' },
  { num: 'Berkualitas',   label: 'Merchandise Premium' },
  { num: 'Transparan',    label: 'Proses & Update Berkala' },
  { num: 'Tepat Waktu',   label: 'Sesuai Deadline Event' },
  { num: 'Efisien',       label: 'Hemat Waktu & Biaya' },
];
const ticker = [...tickerData, ...tickerData]; // duplicate for seamless loop

export default function Stats() {
  const headRef = useScrollReveal();
  return (
    <section className="stats" id="why-us">
      <div className="container">
        <div className="stats__head reveal" ref={headRef}>
          <div className="stats__tag">Mengapa Kami</div>
          <h2 className="stats__title">Mitra Terpercaya<br />untuk Setiap Kebutuhan Corporate</h2>
          <p className="stats__sub">Solusi corporate gifting dan promosi perusahaan yang lengkap, transparan, dan tepat waktu.</p>
        </div>
      </div>

      <div className="stats__ticker-wrap">
        <div className="stats__ticker">
          {ticker.map((item, i) => (
            <div className="stats__ticker-item" key={i}>
              <span className="stats__ticker-dot" />
              <span className="stats__ticker-num">{item.num}</span>
              <span className="stats__ticker-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

