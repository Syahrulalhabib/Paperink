import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './FAQ.css';

const faqs = [
  {
    q: 'Apakah semua produk bisa dikustomisasi logo?',
    a: 'Bisa. Semua produk Paperink Official dapat dikustomisasi dengan identitas brand Anda menggunakan metode cetak seperti laser engraving, sablon, maupun UV printing.',
  },
  {
    q: 'Berapa minimum pemesanan (MOQ)?',
    a: 'MOQ disesuaikan dengan kategori produk dan spesifikasi kustomisasi yang Anda butuhkan. Hubungi tim kami untuk detail tiap item.',
  },
  {
    q: 'Berapa lama estimasi waktu pengerjaan?',
    a: 'Waktu produksi disesuaikan dengan jumlah pesanan dan tingkat kustomisasi, dengan komitmen selesai tepat waktu sesuai deadline event perusahaan Anda.',
  },
  {
    q: 'Apakah bisa melihat sampel produk secara langsung?',
    a: 'Bisa. Anda dapat berkonsultasi dan menjadwalkan kunjungan ke store kami di Jakarta Utara untuk melihat sampel fisik secara langsung.',
  },
  {
    q: 'Apakah melayani pengiriman ke luar kota?',
    a: 'Ya, kami melayani pengiriman kebutuhan corporate ke berbagai kota di seluruh Indonesia melalui mitra ekspedisi tepercaya.',
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <button className="faq-item__btn" onClick={() => setOpen(p => !p)} aria-expanded={open}>
        <span>{q}</span>
        <span className="faq-item__icon" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </span>
      </button>
      <div className="faq-item__body">
        <p>{a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const headRef = useScrollReveal();
  const listRef = useScrollReveal();
  return (
    <section className="section faq" id="faq">
      <div className="container">
        <div className="sec-head reveal" ref={headRef}>
          <div className="sec-tag">FAQ</div>
          <h2 className="sec-title">Pertanyaan yang Sering Ditanyakan</h2>
        </div>
        <div className="faq__list reveal" ref={listRef}>
          {faqs.map((f, i) => (
            <FAQItem key={i} q={f.q} a={f.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
