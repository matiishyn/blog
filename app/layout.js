import ClientProviders from "@/components/ClientProviders";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import siteConfig from "@/config/site.config.json";
import "@/styles/bootstrap.scss";
import "@/styles/globals.scss";
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
  title: siteConfig.metaData.title,
  description: siteConfig.metaData.description,
  authors: [{ name: siteConfig.metaData.author }],
  keywords: siteConfig.metaData.keyword,
  openGraph: {
    title: siteConfig.metaData.title,
    description: siteConfig.metaData.description,
    images: [siteConfig.metaData.ogImage],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.metaData.title,
    description: siteConfig.metaData.description,
    images: [siteConfig.metaData.ogImage],
  },
  icons: {
    icon: siteConfig.favicon,
    shortcut: siteConfig.favicon,
  },
};

export default function RootLayout({ children }) {
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
      </head>
      <body className={`${creteRound.variable} ${workSans.variable}`}>
        <ClientProviders>
          <Header />
          {children}
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}

