# Axevro Website

Official corporate website for **[Axevro](https://github.com/Axevro)** — a product studio specializing in web, mobile, cloud, and digital engineering.

> **Building Digital Excellence**

---

## About

This repository powers the Axevro marketing site: a fast, responsive React application that presents the company brand, services, delivery process, and a contact experience for new project inquiries.

The site is built for clarity, performance, and straightforward deployment as a static frontend.

---

## Highlights

- Professional brand lockup with Axevro mark and wordmark
- Multi-section homepage (services, DevOps, process, portfolio, testimonials)
- Dedicated service detail pages
- Contact form with name, phone, email, and subject validation
- Motion-driven UI with Framer Motion
- Toast feedback for primary user actions
- Mobile-first responsive layout

---

## Tech Stack

| Area | Technology |
| --- | --- |
| UI | React 19 |
| Build | Vite 8 |
| Routing | React Router DOM |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion |
| Notifications | Sonner |
| Icons | Google Material Symbols |
| Linting | Oxlint |

**Capabilities featured across the product**

Docker · GitHub Actions · AWS · Authentication · SEO

---

## Application Routes

| Route | Description |
| --- | --- |
| `/` | Homepage |
| `/services/web-development` | Web Development |
| `/services/mobile-app-development` | Mobile App Development |
| `/services/ui-ux-design` | UI/UX Design |
| `/services/backend-development` | Backend Development |
| `/services/cloud-devops` | Cloud & DevOps |
| `/services/maintenance-support` | Maintenance & Support |
| `/services/authentication` | Authentication |
| `/services/seo` | SEO |
| `/services/docker` | Docker |
| `/process/discovery-requirement-analysis` | Process Step 01 |
| `/process/planning-ui-ux-design` | Process Step 02 |
| `/process/development` | Process Step 03 |
| `/process/cicd-cloud-deployment` | Process Step 04 |
| `/process/maintenance` | Process Step 05 |
| `/contact` | Contact form |
| `/pricing` | Introductory pricing |
| `/privacy-policy` | Privacy Policy |
| `/terms-and-conditions` | Terms & Conditions |
| `/cookies-policy` | Cookies Policy |

---

## Getting Started

### Requirements

- Node.js 18 or later (LTS recommended)
- npm 9 or later

### Setup

```bash
git clone https://github.com/Axevro/Axevro-website.git
cd Axevro-website
npm install
```

### Local development

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173).

### Production build

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint
```

---

## Project Structure

```text
Axevro-website/
├── public/
│   ├── brand/               # Logo mark, square OG image, favicon
│   ├── images/              # Portfolio & studio photography
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── layout/          # Header, Footer, SEO, WhatsApp, ErrorBoundary
│   │   ├── sections/        # Homepage sections (Hero, Services, Projects, …)
│   │   └── ui/              # Reusable UI (Logo, PageHero, SafeImage, motion)
│   ├── data/                # Services, process, pricing, contact, SEO copy
│   ├── lib/                 # Motion helpers, smooth scroll
│   ├── pages/               # Route pages (Home, Pricing, Contact, details, legal)
│   ├── App.jsx              # Router + page transitions
│   ├── main.jsx             # Entry point
│   └── index.css            # Tailwind + brand tokens
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

**Where things live**

| Folder | Purpose |
| --- | --- |
| `src/pages/` | One file per route |
| `src/components/sections/` | Homepage building blocks (including Projects) |
| `src/components/layout/` | Shell chrome shared across routes |
| `src/components/ui/` | Small reusable primitives |
| `src/data/` | Content and config (no UI) |
| `public/images/` | Project / portfolio visuals |

---

## Brand System

| Token | Hex | Usage |
| --- | --- | --- |
| Black | `#0A0B0D` | Dark sections, primary text contrast |
| Gold | `#C9A227` | Accent CTAs and highlights |
| Green | `#1F9D55` | Interactive accents and success states |
| Green Bright | `#4ADE80` | Emphasis on dark backgrounds |

**Logo**

- Mark: `public/brand/axevro-mark.png` (transparent gold + green AX)
- Square: `public/brand/axevro-mark-square.png` (favicon / OG)
- Wordmark: rendered in UI beside the mark in a single horizontal lockup

---

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start Vite development server |
| `npm run build` | Create optimized production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint checks |

---

## Deployment

The build output is a static site in `dist/` and can be hosted on:

- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

```bash
npm run build
# Deploy the contents of dist/
```

For SPA hosting, configure the host to fallback unknown paths to `index.html` so client routes (`/contact`, `/services/*`, legal pages) resolve correctly.

---

## Contributing

1. Create a feature branch from `main`
2. Implement focused changes
3. Run `npm run lint` and `npm run build`
4. Open a pull request with a clear summary and test notes

---

## License

Proprietary software. All rights reserved by Axevro.

© 2026 Axevro
