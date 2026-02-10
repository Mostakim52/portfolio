# Mostakim Rubaiyat — Portfolio

<p align="center">
  <img src="/assets/MH-logo.svg" alt="MH." width="220" />
</p>

A showcase portfolio built with modern frontend tooling — interactive 3D, crisp motion, and thoughtful UX.

Live site highlights the following:

- A performance-first, dark-themed design system with careful accessibility choices.
- Hero with interactive WebGL/Three.js scene and animated entrance.
- Project gallery featuring live previews and animated transitions.
- Contact section with direct CV download, phone/email CTAs and social links.
- Fine-grained motion using GSAP for reveals, microinteractions, and button transitions.

---

## Screenshots

Hero / Landing

![Hero screenshot](/assets/screenshot-hero.svg)

Projects gallery

![Projects screenshot](/assets/screenshot-projects.svg)

Contact & CV

![Contact screenshot](/assets/screenshot-contact.svg)

---

## Why this stands out

- Motion-first UI: every animation is intentional and tuned for clarity.
- Modern stack: Next.js, React, Tailwind — built for both static and server rendering.
- Interactive experiences: Three.js scenes, but only where they add value.
- Reusable components: a tidy `src/components` folder with self-contained units.

---

## Tech & Tools

- Next.js 13 (App Router)
- React
- Tailwind CSS
- GSAP for animation
- Three.js for 3D scenes
- Lucide icons

---

## Run locally

```bash
git clone <your-repo-url>
cd portfolio
npm install
npm run dev
# open http://localhost:3000
```

Build for production:

```bash
npm run build
npm start
```

---

## Repo structure (important folders)

- `src/app/` — routes, layouts and top-level pages
- `src/components/` — Hero, Navbar, Projects, Contact, Footer, etc.
- `public/assets/` — CV, logos, screenshots and static media

---

## CV & Footer

- CV placeholder: `public/assets/Mostakim_Rubaiyat_CV.pdf` — replace with your final PDF.
- Brand mark (MH.): `public/assets/MH-logo.svg` — used in the footer and README.

To place the MH. mark in your footer, add the snippet to `src/app/layout.js` or your footer component:

```jsx
// example: src/components/Footer.js
export default function Footer(){
  return (
    <footer className="py-12 text-center">
      <img src="/assets/MH-logo.svg" alt="MH." width={160} />
      <p className="mt-4 text-sm text-gray-400">Designed & built with ❤️ by Mostakim Rubaiyat</p>
    </footer>
  );
}
```

---

## Deploy

Recommended: Vercel — connect the repo and deploy with the default settings. If you add server-side email or storage, set required environment variables in the Vercel dashboard.

---

## Want me to improve this README?

I can:
- Add polished screenshots (I can capture higher-fidelity images of the running site).
- Add quick demo GIFs for motion highlights.
- Add detailed component docs for maintainers.

---

<h1 align="center">MH.</h1>

<p align="center">
  <img src="/assets/MH-logo.svg" alt="MH." width="220" />
</p>
