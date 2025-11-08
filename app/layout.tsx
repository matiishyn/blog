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
  description: "A writer based in New York City. I'm interested in all things tech, science, and photography related.",
  openGraph: {
    title: "Engineering & Management Notes",
    description: "A writer based in New York City. I'm interested in all things tech, science, and photography related.",
    url: "https://icemnotes.com",
    siteName: "Engineering & Management Notes",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering & Management Notes",
    description: "A writer based in New York City. I'm interested in all things tech, science, and photography related.",
  },
  robots: {
    index: true,
    follow: true,
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
