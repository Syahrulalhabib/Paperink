# IMPLEMENTATION PLAN — Paperink Official Landing Page

## Client Brief Summary
- **Nama Toko:** Paperink Official
- **Website:** www.paperinkofficial.id
- **Tagline:** All Your Merch, All in One Place
- **Kontak WA:** 087800088006
- **Alamat:** Komplek Perkantoran Grand Pluit Mall Blok C No 11, Penjaringan, Jakarta Utara
- **Sosial Media:** IG: paperinkofficial\_ | Shopee: paperink\_official | Tokped: paperinksofficial
- **Referensi:** hanatagift.com
- **Tone:** Clean, premium, white/grey dominant, tidak kaku

---

## Struktur File

```
PaperInk/
├── index.html
├── style.css
├── script.js
├── IMPLEMENTATION.md
└── assets/
    └── images/
        ├── logo.png          ← Logo Paperink (transparent bg, min 400px wide)
        ├── hero-bg.jpg       ← Background hero full-width (1920×1080px min)
        ├── hero-mockup.png   ← Mockup produk di hero kanan (opsional)
        ├── product-1.jpg     ← Tumbler / Mug (600×600px square)
        ├── product-2.jpg     ← Tote Bag / Pouch
        ├── product-3.jpg     ← Notebook / Stationery
        ├── product-4.jpg     ← Lanyard / ID Card
        ├── product-5.jpg     ← Kaos / Apparel
        ├── product-6.jpg     ← Payung / Umbrella
        ├── portfolio-1.jpg   ← Foto portofolio project (800×600px)
        ├── portfolio-2.jpg
        ├── portfolio-3.jpg
        └── portfolio-4.jpg
```

> Tempelkan foto asli dengan nama file yang sama persis.

---

## Sections

1. **NAVBAR** — sticky, logo kiri, menu tengah, CTA button "Order Sekarang"
2. **HERO** — headline + sub + 2 CTA button, hero-bg.jpg + dark overlay
3. **VALUE PROPS** — 3 kolom icon: Satu Pintu / Custom Logo / Tepat Waktu
4. **PRODUK UNGGULAN** — grid 3×2, hover scale, label "Custom Available"
5. **CARA KERJA** — 4 step horizontal dengan connector line
6. **PORTOFOLIO** — 4-grid foto portofolio dengan hover overlay
7. **WHY US STATS** — dark bg section: 500+ Klien, 50+ Produk, On-time, Custom 1pcs
8. **FAQ** — accordion 5 pertanyaan
9. **CTA BANNER** — fullwidth, tombol WA
10. **FOOTER** — logo, kontak, sosmed, copyright

---

## Palette

| Token         | Value     | Penggunaan                    |
|---------------|-----------|-------------------------------|
| `--white`     | `#FFFFFF` | Background utama, card        |
| `--off-white` | `#F7F7F7` | Section alternating           |
| `--grey-100`  | `#EEEEEE` | Border, divider               |
| `--grey-400`  | `#9E9E9E` | Body text sekunder            |
| `--grey-800`  | `#2D2D2D` | Heading, navbar text          |
| `--dark`      | `#1A1A1A` | Footer, stats section bg      |
| `--accent`    | `#C8A96E` | Gold — CTA, hover, highlight  |

> Accent warm gold: kontras elegan dengan white/grey, cocok brand merchandise premium.

**Font:** `Plus Jakarta Sans` (heading) + `Inter` (body) — via Google Fonts CDN.

---

## Animasi

| Animasi                | Trigger         | Cara                            |
|------------------------|-----------------|---------------------------------|
| Hero headline fade-up  | Page load       | CSS `@keyframes`                |
| Section reveal         | Scroll viewport | `IntersectionObserver` + class  |
| Product card hover     | Hover           | CSS `transform: scale(1.03)`    |
| FAQ accordion          | Click           | JS toggle `max-height`          |
| Navbar shrink          | Scroll > 80px   | JS scroll event                 |
| WhatsApp float pulse   | Always          | CSS `@keyframes` pulse          |

---

## Tech Stack

- HTML5 + CSS3 + Vanilla JS
- Zero external JS library
- Google Fonts via CDN link
- Deploy: static hosting (Netlify / cPanel / Vercel)

---

## Catatan untuk Client / Developer

- Ganti file di `assets/images/` dengan foto asli (nama file sama)
- Link WA: `https://wa.me/6287800088006`
- Responsive: breakpoint 768px (tablet), 480px (mobile)
- SEO: meta title, description, og tags sudah include
