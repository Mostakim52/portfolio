<p align="center">
  <img src="public/assets/logo.png" alt="MH." width="220" />
</p>

# Mostakim Rubaiyat — Portfolio

Welcome to the source for my personal portfolio site. This project showcases interactive UI, refined motion, and modern frontend engineering.

## Why this portfolio stands out

- Pixel‑perfect, motion‑led UI with subtle microinteractions.
- High performance: built with Next.js (server rendering + static assets), optimized images and CSS.
- Interactive 3D/visuals where it makes sense (Three.js / WebGL scenes in the Hero and Projects).
- Accessible and responsive: keyboard-friendly, semantic markup, mobile-first styles.
- Thoughtful contact section with a direct CV download and multiple contact channels.

## Highlights

- Custom cursor and scroll progress indicator for a premium feel.
- Animated components using GSAP for smooth, controllable transitions.
- Clean component architecture under `src/components` for easy reuse and testing.

## Tech Stack

- Next.js 13 (App Router)
- React
- Tailwind CSS
- GSAP, Three.js
- Lucide icons

## Quick Local Setup

1. Install dependencies

```bash
npm install
```

2. Run the dev server

```bash
npm run dev
```

3. Open `http://localhost:3000`

## File structure (top-level)

- `src/app/` — Next.js app routes and pages
- `src/components/` — Reusable UI components (Hero, Contact, Projects, etc.)
- `public/assets/` — Static assets (images, CV PDF, icons)

## CV Download

A "Download CV" CTA is available on the contact section. The current file is:

- `public/assets/Mostakim_Rubaiyat_CV.pdf` (placeholder)

To replace, drop your PDF into `public/assets/` using the same filename.

## Add the MH. Logo to the page footer

I added an `MH` logo SVG at `public/assets/MH-logo.svg`. To display this logo at the end of your webpage (for example, in the footer), add the following snippet to your footer component or `layout.js` where appropriate:

```html
<footer class="site-footer">
  <!-- other footer content -->
  <div class="footer-brand">
    <img src="/assets/MH-logo.svg" alt="MH." width="160" height="60" />
  </div>
</footer>
```

If you prefer to include it via React/JSX (e.g. in `src/app/layout.js`):

```jsx
import Image from 'next/image';

export default function Footer(){
  return (
    <footer className="site-footer">
      {/* other footer content */}
      <div className="footer-brand">
        <img src="/assets/MH-logo.svg" alt="MH." />
      </div>
    </footer>
  );
}
```

## Live preview & deployment

This repo is ready to deploy to Vercel (recommended) or any static host that supports Next.js. Connect the repository and set environment variables (if any) in your platform dashboard.

## Want tweaks?

If you'd like, I can:

- Polish the README further with screenshots and live links.
- Replace the placeholder CV with your real PDF and rename it.
- Add a LinkedIn / GitHub CTA next to the CV download.

---
