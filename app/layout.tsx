import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { ThemeProvider } from "@/components/ThemeProvider";
import type { Metadata } from "next";
import { Crete_Round, Work_Sans } from "next/font/google";
import "./globals.css";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const creteRound = Crete_Round({
  variable: "--font-crete-round",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://icemnotes.com"),
  title: {
    default: "Engineering & Management Notes",
    template: "%s | Engineering & Management Notes",
  },
  description: "A writer interested in all things tech, science, and photography related.",
  authors: [{ name: "Ivan Matiishyn", url: "https://icemnotes.com/about" }],
  creator: "Ivan Matiishyn",
  publisher: "Ivan Matiishyn",
  keywords: ["engineering", "management", "tech blog", "science", "photography"],
  openGraph: {
    title: "Engineering & Management Notes",
    description: "A writer interested in all things tech, science, and photography related.",
    url: "https://icemnotes.com",
    siteName: "Engineering & Management Notes",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Engineering & Management Notes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering & Management Notes",
    description: "A writer interested in all things tech, science, and photography related.",
    creator: "@icemnotes",
    images: ["/profile.jpg"],
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
    canonical: "https://icemnotes.com",
    types: {
      "application/rss+xml": "https://icemnotes.com/rss.xml",
    },
  },
  verification: {
    // Add your verification codes when you have them
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${workSans.variable} ${creteRound.variable} antialiased`}
      >
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
