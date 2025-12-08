"use client";

import { AppContext } from "@/components/UseContext";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

export default function ClientProviders({ children }) {
  const [searchOpen, setSearchOpen] = useState("");

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <AppContext.Provider
      value={{
        toggleSearch: [searchOpen, setSearchOpen],
      }}
    >
      <ThemeProvider defaultTheme="light" attribute="class">
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  );
}

