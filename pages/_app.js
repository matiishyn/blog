import { AppContext } from "@/components/UseContext";
import "@/styles/bootstrap.scss";
import "@/styles/globals.scss";
import { ThemeProvider } from "next-themes";
import { Crete_Round, Work_Sans } from "next/font/google";
import { useEffect, useState } from "react";

const creteRound = Crete_Round({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const workSans = Work_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

export default function QurnoApp({ Component, pageProps }) {
  const [searchOpen, setSearchOpen] = useState("");

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
    
    // Apply font styles directly to body
    document.documentElement.style.setProperty('--font-crete-round', creteRound.style.fontFamily);
    document.documentElement.style.setProperty('--font-work-sans', workSans.style.fontFamily);
  }, []);

  return (
    <AppContext.Provider
      value={{
        toggleSearch: [searchOpen, setSearchOpen],
      }}
    >
      <ThemeProvider defaultTheme="light" attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </AppContext.Provider>
  );
}
