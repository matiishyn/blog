import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Engineering & Management Notes",
    short_name: "ICM Notes",
    description: "A writer interested in all things tech, science, and photography related.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff6ef",
    theme_color: "#f08e80",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      // Add more icon sizes when you create them
      // {
      //   src: "/icon-192.png",
      //   sizes: "192x192",
      //   type: "image/png",
      // },
      // {
      //   src: "/icon-512.png",
      //   sizes: "512x512",
      //   type: "image/png",
      // },
    ],
    categories: ["blog", "engineering", "technology", "science"],
    lang: "en-US",
  };
}

