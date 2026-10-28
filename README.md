# FREVO — Landing Page

> **Where Freelancers Evolve** — The curated marketplace connecting businesses with verified creative freelancers and collaborative pods.

This repository contains the official landing page for the **FREVO** platform.

---

## 🌐 Live Deployments

- **Landing Page**: [https://frevo-theta.vercel.app](https://frevo-theta.vercel.app)
- **Web App (Client & Freelancer Portal)**: [https://frevocom.vercel.app](https://frevocom.vercel.app)

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library**: React 19, [Tailwind CSS](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/)
- **Animations**: [Motion](https://motion.dev/) (Framer Motion), GSAP, Lenis Smooth Scroll
- **Icons**: [Lucide React](https://lucide.dev/)
- **Hosting**: [Vercel](https://vercel.com/) (Root Directory: `frontend`)

---

## 🚀 Getting Started

All landing page code is located in the `frontend/` directory.

### 1. Install dependencies

```bash
cd frontend
npm install
```

### 2. Environment Variables

Create a `.env.local` file inside the `frontend/` directory (see `.env.example`):

```env
# URL of the deployed FREVO Web App (Vite platform)
NEXT_PUBLIC_APP_URL=http://localhost:5173

# Canonical site origin for SEO & OpenGraph
NEXT_PUBLIC_SITE_URL=https://frevo-theta.vercel.app
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
npm run typecheck
```

---

## 🔗 Platform Integration

The Call-to-Action (CTA) buttons on this landing page navigate to the FREVO Web Application:
- **Post a Project**: Redirects to the Business registration onboarding (`/register?role=business`).
- **Join FREVO as a Freelancer**: Redirects to the Freelancer registration onboarding (`/register?role=freelancer`).
- **Explore Talent**: Explores featured talent categories directly on the landing page (`/#talent`).
