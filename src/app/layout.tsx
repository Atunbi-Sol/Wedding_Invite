import type { Metadata } from "next";
import {
  Great_Vibes,
  Playfair_Display,
  Cormorant_Garamond,
  Marcellus,
} from "next/font/google";
import "./globals.css";

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes-var",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair-var",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant-var",
  display: "swap",
});

const marcellus = Marcellus({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-marcellus-var",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000"
  ),
  title: "Moroluwayosi & Damilare — October 17, 2026",
  description:
    "You are cordially invited to the engagement ceremony of Moroluwayosi & Damilare, October 17th 2026 at FUTA, Akure.",
  openGraph: {
    title: "You have a letter from Moroluwayosi & Damilare 💌",
    description:
      "You are cordially invited to the Solemnization of Holy Matrimony of Moroluwayosi & Damilare — October 17, 2026.",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1024,
        height: 1024,
        alt: "Wedding invitation envelope for Moroluwayosi & Damilare — October 17, 2026",
      },
    ],
    siteName: "Moroluwayosi & Damilare Wedding",
  },
  twitter: {
    card: "summary_large_image",
    title: "You have a letter from Moroluwayosi & Damilare 💌",
    description:
      "You are cordially invited to the Solemnization of Holy Matrimony — October 17, 2026.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${greatVibes.variable} ${playfair.variable} ${cormorant.variable} ${marcellus.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
