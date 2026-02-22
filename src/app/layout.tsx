import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://atlantissincro.com"),
  title: {
    default: "Club Natación Artística Atlantis — Valencia",
    template: "%s | CNA Atlantis",
  },
  description:
    "Club de natación artística en Valencia, España. Familia Atlantis: excelencia competitiva, valores sociales y disciplina. Programas de iniciación, rendimiento y competición.",
  keywords: [
    "natación artística",
    "natación sincronizada",
    "Valencia",
    "club deportivo",
    "CNA Atlantis",
    "Club Natación Artística Atlantis",
    "natación artística Valencia",
    "clases natación sincronizada",
    "deporte acuático",
    "competición natación",
  ],
  authors: [{ name: "Club Natación Artística Atlantis" }],
  creator: "Club Natación Artística Atlantis",
  openGraph: {
    title: "Club Natación Artística Atlantis — Valencia",
    description:
      "Familia Atlantis: formación, competición y pasión por la natación artística en Valencia.",
    url: "https://atlantissincro.com",
    siteName: "Club Natación Artística Atlantis",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Club Natación Artística Atlantis — Valencia",
    description:
      "Familia Atlantis: formación, competición y pasión por la natación artística en Valencia.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsOrganization",
  name: "Club Natación Artística Atlantis",
  description:
    "Club de natación artística en Valencia, España. Familia Atlantis: excelencia competitiva, valores sociales y disciplina.",
  sport: "Artistic Swimming",
  url: "https://atlantissincro.com",
  email: "atlantissincro@gmail.com",
  telephone: "+34644388883",
  sameAs: ["https://www.instagram.com/atlantis_sincro/"],
  location: [
    {
      "@type": "Place",
      name: "Polideportivo de Nazaret",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Valencia",
        addressRegion: "Comunitat Valenciana",
        addressCountry: "ES",
      },
    },
    {
      "@type": "Place",
      name: "Nou Moles",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Nou Moles",
        addressRegion: "Comunitat Valenciana",
        addressCountry: "ES",
      },
    },
    {
      "@type": "Place",
      name: "Benimamet",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Benimamet",
        addressRegion: "Comunitat Valenciana",
        addressCountry: "ES",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
