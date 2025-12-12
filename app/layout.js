import ClientProviders from "@/components/ClientProviders";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import siteConfig from "@/config/site.config.json";
import "@/styles/bootstrap.scss";
import "@/styles/globals.scss";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Crete_Round, Work_Sans } from "next/font/google";

const creteRound = Crete_Round({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-crete-round",
});

const workSans = Work_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
});

export const metadata = {
  metadataBase: new URL(siteConfig.baseURL),
  title: siteConfig.metaData.title,
  description: siteConfig.metaData.description,
  authors: [{ name: siteConfig.metaData.author }],
  keywords: siteConfig.metaData.keyword,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.metaData.title,
    description: siteConfig.metaData.description,
    url: siteConfig.baseURL,
    siteName: siteConfig.metaData.title,
    images: [
      {
        url: siteConfig.metaData.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.metaData.title,
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.metaData.title,
    description: siteConfig.metaData.description,
    images: [siteConfig.metaData.ogImage],
    creator: "@matiishyn",
  },
  icons: {
    icon: siteConfig.favicon,
    shortcut: siteConfig.favicon,
    apple: siteConfig.favicon,
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
  verification: {
    // Add your verification codes when you have them
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

export default function RootLayout({ children }) {
  // JSON-LD structured data for the website
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.metaData.title,
    description: siteConfig.metaData.description,
    url: siteConfig.baseURL,
    author: {
      "@type": "Person",
      name: siteConfig.metaData.author,
      url: siteConfig.baseURL,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.baseURL}blog?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --font-crete-round: ${creteRound.style.fontFamily};
                --font-work-sans: ${workSans.style.fontFamily};
              }
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${creteRound.variable} ${workSans.variable}`}>
        <ClientProviders>
          <Header />
          {children}
          <Footer />
        </ClientProviders>
      </body>
      <GoogleAnalytics gaId="G-W3NC1PTYDV" />
    </html>
  );
}

