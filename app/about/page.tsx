import AboutSection from "@/components/AboutSection";
import Typography from "@/components/Typography";
import VisitedPlaces from "@/components/VisitedPlaces";
import { generateProfilePageSchema } from "@/lib/structured-data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Ivan Matiishyn - a writer interested in tech, science, and photography.",
  alternates: {
    canonical: "https://icemnotes.com/about",
  },
  openGraph: {
    title: "About | Engineering & Management Notes",
    description: "Learn more about Ivan Matiishyn - a writer interested in tech, science, and photography.",
    url: "https://icemnotes.com/about",
    type: "profile",
  },
};

export default function AboutPage() {
  const profileSchema = generateProfilePageSchema();

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }}
      />

      <div>
        <AboutSection />

        {/* Additional content can be added here */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <Typography variant="h2" className="mb-6">
              My Journey
            </Typography>
            <p className="text-foreground/80 mb-4">
              Welcome to my personal corner of the internet! I created this blog to
              share my thoughts and experiences on topics that fascinate me most:
              technology, science, and photography.
            </p>
            <p className="text-foreground/80 mb-4">
              I spend my days exploring the intersection of engineering and
              creativity. When I'm not writing or working on tech projects, you
              can find me practicing yo-yo tricks or capturing the world through
              my camera lens.
            </p>
            <p className="text-foreground/80">
              This blog serves as both a learning journal and a platform to connect
              with others who share similar interests. Feel free to reach out if
              you'd like to discuss any of the topics I write about!
            </p>
          </div>
        </section>
        {/* Visited Places Section */}
        <VisitedPlaces />
      </div>
    </>
  );
}

