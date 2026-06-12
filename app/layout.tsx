import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "next-themes";

import { Footer } from "@/components/hana/footer";
import { Navbar } from "@/components/hana/navbar";

import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    default: "HANA — La bougie rechargeable, fabriquée en France",
    template: "%s · HANA",
  },
  description:
    "Certains moments méritent de ne jamais s'éteindre. HANA, bougies artisanales parfumées et rechargeables, fabriquées en France.",
  keywords: [
    "bougie rechargeable",
    "bougie artisanale",
    "bougie parfumée",
    "fabriqué en France",
    "recharge bougie",
    "cire végétale",
    "parfums de Grasse",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "HANA",
    title: "HANA — La bougie rechargeable, fabriquée en France",
    description:
      "Certains moments méritent de ne jamais s'éteindre. Bougies artisanales parfumées et rechargeables.",
  },
  twitter: {
    card: "summary_large_image",
    title: "HANA — La bougie rechargeable",
    description:
      "Certains moments méritent de ne jamais s'éteindre. Bougies artisanales rechargeables, fabriquées en France.",
  },
};

const inter = Inter({
  variable: "--font-inter",
  display: "swap",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        {/* Thème clair forcé : l'identité HANA repose sur la crème ;
            les sections sombres utilisent le token espresso ponctuellement. */}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
