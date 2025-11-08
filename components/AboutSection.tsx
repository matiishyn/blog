import Image from "next/image";
import Link from "next/link";
import Wave from "./Wave";

export default function AboutSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-25">
      <div className="flex flex-col md:flex-row gap-30 items-center md:items-start">
        {/* Profile Photo */}
        <div className="flex-shrink-0">
          <Image
            src="/me square.webp"
            alt="Ivan Matiishyn"
            width={250}
            height={250}
            className="rounded-lg object-cover"
            priority
          />
        </div>

        {/* About Text */}
        <div className="flex-1 relative">
          {/* Wave SVG Background */}
          <div className="absolute top-0 left-0 opacity-10 -z-10 transform -translate-x-1/4 translate-y-1/4">
            <Wave />
          </div>

          <p className="text-lg text-foreground mb-4">Hello, I'm</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-heading mb-6">
            Ivan Matiishyn
          </h1>
          <p className="text-lg text-foreground leading-relaxed">
            A Software Engineer and Engineering Manager based in Poland, originally from Ukraine.
            I'm interested in all things tech, AI, engineering, and management related.
            Read more about me <Link href="/about" className="text-accent">here</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}
