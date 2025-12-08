"use client";

import Markdown from "@/components/ReactMarkdown";
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
} from "@tabler/icons-react";
import Image from "next/image";
import { useMemo } from "react";

export default function BannerBlock({ banner: { frontMatter } }) {
  // Calculate years of experience dynamically
  const yearsOfExperience = useMemo(() => {
    return new Date().getFullYear() - 2013;
  }, []);

  // Replace placeholder with actual years
  const description = useMemo(() => {
    return frontMatter.description.replace(/over \d+ years/g, `over ${yearsOfExperience} years`);
  }, [frontMatter.description, yearsOfExperience]);

  return (
    <section className="section overflow-hidden banner">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="row g-4 g-lg-5 text-center text-lg-start align-items-center justify-content-center justify-content-lg-start">
              <div className="col-md-4 col-sm-5 col-6">
                <Image
                  className="rounded img-fluid"
                  src={frontMatter.image}
                  alt={frontMatter.title}
                  width={`250`}
                  height={`250`}
                  placeholder="blur"
                  blurDataURL={frontMatter.image}
                />
              </div>
              <div className="col-lg-8 col-md-12">
                <p className="mb-2">{frontMatter.subtitle}</p>
                <h1 className="text-dark mb-3">{frontMatter.title}</h1>
                <div className="content">
                  <Markdown content={description} inline={true} />
                </div>

                <ul className={`social-share icon-box mt-4 pt-2`}>
                  <li className="d-inline-block me-2 mb-2">
                    <a
                      aria-label="github"
                      href="https://github.com/matiishyn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i>
                        <IconBrandGithub size={18} />
                      </i>
                    </a>
                  </li>
                  <li className="d-inline-block me-2 mb-2">
                    <a
                      aria-label="linkedin"
                      href="https://www.linkedin.com/in/matiishyn/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i>
                        <IconBrandLinkedin size={18} />
                      </i>
                    </a>
                  </li>
                  <li className="d-inline-block me-2 mb-2">
                    <a
                      aria-label="instagram"
                      href="https://www.instagram.com/ivan_mmdsd/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i>
                        <IconBrandInstagram size={18} />
                      </i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
