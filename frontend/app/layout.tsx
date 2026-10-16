import type { Metadata, Viewport } from "next";
import { Archivo, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { Cursor } from "@/components/fx/Cursor";
import { Analytics } from "@/components/analytics/Analytics";
import { JsonLd } from "@/components/seo/JsonLd";
import { cn } from "@/lib/utils";
import { SITE_URL, GSC_VERIFICATION } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/seo";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "FREVO — Where Freelancers Evolve",
    template: "%s · FREVO",
  },
  description:
    "Find creative freelancers and small teams that fit your project. Branding, video, 3D, photography, copywriting and more.",
  keywords: [
    "creative freelancer platform",
    "creative talent",
    "freelance marketplace",
    "branding design",
    "FREVO",
  ],
  alternates: { canonical: "/" },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "FREVO — Where Freelancers Evolve",
    description:
      "The right creative. For the right project. Curated freelancers & creative pods with milestone escrow.",
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "FREVO",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FREVO — Where Freelancers Evolve",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FREVO — Where Freelancers Evolve",
    description:
      "The right creative. For the right project. Curated freelancers & creative pods with milestone escrow.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  ...(GSC_VERIFICATION
    ? { verification: { google: GSC_VERIFICATION } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#1c1c1e" },
    { media: "(prefers-color-scheme: light)", color: "#fcfcfb" },
  ],
  colorScheme: "dark light",
};

// Runs before paint, resolves the saved theme (default: system) and sets
// data-theme on <html> so there's no flash of the wrong theme.
const themeScript = `(function(){try{var p=new URLSearchParams(location.search).get('theme');if(p==='light'||p==='dark'||p==='system'){localStorage.setItem('cm-theme',p);}var t=localStorage.getItem('cm-theme')||'system';var d=t==='dark'||(t!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.setAttribute('data-theme',d?'dark':'light');}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn(archivo.variable, inter.variable, spaceMono.variable)}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <Analytics />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <SmoothScroll>{children}</SmoothScroll>
        <ScrollToTop />
        <Cursor />
      </body>
    </html>
  );
}
