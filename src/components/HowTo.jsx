import { useScrollReveal } from '../hooks/useScrollReveal';
import './HowTo.css';

const steps = [
  {
    num: '01',
    title: 'Brief & Diskusi Kebutuhan',
    desc: 'Ceritakan kebutuhan merchandise, target jumlah, preferensi material, serta timeline event Anda.',
  },
  {
    num: '02',
    title: 'Desain & Approval',
    desc: 'Tim desain kami buat mockup. Revisi sampai puas sebelum masuk tahap produksi.',
  },
  {
    num: '03',
    title: 'Produksi & QC',
    desc: 'Produksi berjalan dengan quality control ketat. Anda mendapat update progress secara berkala.',
  },
  {
    num: '04',
    title: 'Pengiriman',
    desc: 'Merchandise dikemas rapi dan dikirim tepat waktu ke alamat Anda di seluruh Indonesia.',
  },
];

function StepItem({ s, delay }) {
  const ref = useScrollReveal();
  return (
    <div className={`howto-step reveal ${delay}`} ref={ref}>
      <div className="howto-step__num">{s.num}</div>
      <h4 className="howto-step__title">{s.title}</h4>
      <p className="howto-step__desc">{s.desc}</p>
    </div>
  );
}

export default function HowTo() {
  const headRef = useScrollReveal();
  return (
    <section className="section howto" id="cara-kerja">
      <div className="container">
        <div className="sec-head reveal" ref={headRef}>
          <div className="sec-tag">Cara Kerja</div>
          <h2 className="sec-title">4 Langkah Mudah, Hasil Profesional</h2>
          <p className="sec-sub">Dari brief hingga merchandise di tangan Anda — prosesnya sederhana dan transparan.</p>
        </div>
        <div className="howto__grid">
          {steps.map((s, i) => (
            <StepItem key={s.num} s={s} delay={`d${i + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
