import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        {/* Profile Photo */}
        <div className="flex-shrink-0">
          <Image
            src="/profile-placeholder.svg"
            alt="Ivan Matiishyn"
            width={250}
            height={250}
            className="rounded-lg object-cover"
            priority
          />
        </div>

        {/* About Text */}
        <div className="flex-1">
          <p className="text-lg text-foreground/80 mb-4">Hello, I'm</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-heading mb-6">
            Ivan Matiishyn
          </h1>
          <p className="text-lg text-foreground leading-relaxed">
            A writer based in New York City. I'm interested in all things tech,
            science, and photography related, and likes to yo-yo in my free
            time.
          </p>
        </div>
      </div>
    </section>
  );
}
