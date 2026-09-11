import './Footer.css';

const WA = 'https://wa.me/6287800088006';

const contactItems = [
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    content: <a href={WA} target="_blank" rel="noopener noreferrer">+62 878-0008-8006</a>,
  },
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    content: <span>Komplek Grand Pluit Mall Blok C No 11,<br />Penjaringan, Jakarta Utara</span>,
  },
];

const officialChannels = [
  {
    name: 'Instagram',
    handle: '@paperinkofficial_',
    href: 'https://www.instagram.com/paperinkofficial_',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor"/>
      </svg>
    ),
  },
  {
    name: 'Tokopedia',
    handle: 'Paperink Official',
    href: 'https://www.tokopedia.com/paperinksofficial',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><path d="M10 16a2 2 0 0 0 4 0"/>
      </svg>
    ),
  },
  {
    name: 'Shopee',
    handle: 'paperink_official',
    href: 'https://shopee.co.id/paperink_official',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 7V6a6 6 0 0 1 12 0v1"/><rect x="3" y="7" width="18" height="14" rx="3"/><path d="M14 11.5c-.5-.7-1.3-1-2-1-1.3 0-2 .8-2 1.8 0 1.8 4 1.4 4 3.2 0 1.2-1 2-2.3 2-1 0-1.8-.5-2.2-1.3"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="footer" id="kontak">
      <div className="container footer__main">

        {/* Brand */}
        <div className="footer__brand">
          <div className="footer__logo">
            <span className="footer__logo-text">PAPER.INK</span>
          </div>
          <p className="footer__desc">
            Supplier merchandise &amp; souvenir promosi corporate. Solusi satu pintu dari konsep hingga pengemasan premium.
          </p>
        </div>

        {/* Official Store & Media Sosial */}
        <div className="footer__col">
          <h4 className="footer__col-title">Official Store &amp; Media Sosial</h4>
          <p className="footer__store-desc">Portofolio terbaru &amp; sampel ready stock:</p>
          <div className="footer__stores">
            {officialChannels.map(m => (
              <a
                key={m.name}
                href={m.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__store-card"
              >
                <div className="footer__store-icon">
                  {m.icon}
                </div>
                <div className="footer__store-meta">
                  <span className="footer__store-name">{m.name}</span>
                  <span className="footer__store-handle">{m.handle}</span>
                </div>
                <svg className="footer__store-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"/>
                  <polyline points="7 7 17 7 17 17"/>
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="footer__col">
          <h4 className="footer__col-title">Hubungi Kami</h4>
          <div className="footer__contact-list">
            {contactItems.map((item, i) => (
              <div key={i} className="footer__contact-item">
                {item.icon}
                <span>{item.content}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hours */}
        <div className="footer__col">
          <h4 className="footer__col-title">Jam Operasional</h4>
          <div className="footer__hours">
            {[
              ['Senin – Jumat', '09.00 – 17.00 WIB'],
              ['Sabtu',          '09.00 – 15.00 WIB'],
              ['Minggu',         'Tutup'],
            ].map(([day, time]) => (
              <div key={day} className="footer__hours-row">
                <span>{day}</span>
                <span>{time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container footer__bottom">
        <p className="footer__copy">&copy; 2026 Paperink. All rights reserved.</p>
      </div>
    </footer>
  );
}
