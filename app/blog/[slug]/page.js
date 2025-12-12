import MDXContent from "@/components/MDXContent";
import Markdown from "@/components/ReactMarkdown";
import siteConfig from "@/config/site.config.json";
import { getAuthors } from "@/libs/getAuthors";
import { formatDate } from "@/utils/formatDate";
import { readingTime } from "@/utils/readingTime";
import { truncateString } from "@/utils/truncateString";
import {
    IconArrowUpRight,
    IconBrandFacebook,
    IconBrandLinkedin,
    IconBrandPinterest,
    IconBrandReddit,
    IconBrandTwitter,
    IconCalendarEvent,
    IconClock,
} from "@tabler/icons-react";
import fs from "fs";
import matter from "gray-matter";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import path from "path";

// Force static generation only - no SSR fallback
export const dynamicParams = false;

// Generate static params for all blog posts
export async function generateStaticParams() {
  const blogDirFiles = fs.readdirSync(path.join("content/blog"));
  const blogs = blogDirFiles.filter(
    (f) => f.endsWith(".md") || f.endsWith(".mdx")
  );

  return blogs.map((filename) => ({
    slug: filename.replace(/\.(md|mdx)$/, ""),
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;

  // Try .mdx first, then .md
  let filePath = path.join("content/blog", slug + ".mdx");
  if (!fs.existsSync(filePath)) {
    filePath = path.join("content/blog", slug + ".md");
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data: frontMatter } = matter(fileContents);

  const canonicalUrl = `${siteConfig.baseURL.replace(/\/$/, "")}/blog/${slug}`;
  const fullImageUrl = frontMatter.image.startsWith("http")
    ? frontMatter.image
    : `${siteConfig.baseURL.replace(/\/$/, "")}${frontMatter.image}`;

  return {
    title: frontMatter.title,
    description: frontMatter.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: frontMatter.title,
      description: frontMatter.description,
      url: canonicalUrl,
      siteName: siteConfig.metaData.title,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: frontMatter.title,
        },
      ],
      type: "article",
      publishedTime: frontMatter.date,
      authors: [frontMatter.author],
      tags: frontMatter.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: frontMatter.title,
      description: frontMatter.description,
      images: [fullImageUrl],
      creator: "@matiishyn",
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const authors = getAuthors();

  // Try .mdx first, then .md
  let filePath = path.join("content/blog", slug + ".mdx");
  if (!fs.existsSync(filePath)) {
    filePath = path.join("content/blog", slug + ".md");
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data: frontMatter, content } = matter(fileContents);
  const { title, author, date, image, description, tags } = frontMatter;

  const readingTimeText = readingTime(content);
  const pageUrl = `${siteConfig.baseURL.replace(/\/$|$/, "/")}blog/${slug}`;
  
  // Get author details
  const authorDetails = authors.find(
    (a) => a.authorSlug === author.replace(/ /g, "-").toLowerCase()
  );
  
  const fullImageUrl = image.startsWith("http")
    ? image
    : `${siteConfig.baseURL.replace(/\/$/, "")}${image}`;

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    image: fullImageUrl,
    datePublished: date,
    dateModified: date,
    author: {
      "@type": "Person",
      name: author,
      url: `${siteConfig.baseURL.replace(/\/$/, "")}/author/${author.replace(/ /g, "-").toLowerCase()}`,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.metaData.author,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.baseURL.replace(/\/$/, "")}${siteConfig.logo}`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    keywords: tags?.join(", "),
    articleBody: content,
    wordCount: content.split(/\s+/).length,
    timeRequired: `PT${readingTimeText}M`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="section-sm pb-0">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="mb-5">
                <h3 className="h1 mb-4 post-title">{title}</h3>

                <ul className="card-meta list-inline mb-2">
                  <li className="list-inline-item mt-2">
                    <Link
                      href={`/author/${author
                        .replace(/ /g, "-")
                        .toLowerCase()}`}
                      className="card-meta-author"
                    >
                      {authors.map((authorPage, i) =>
                        author.replace(/ /g, "-").toLowerCase() ===
                        authorPage.authorSlug ? (
                          <span key={i}>
                            <Image
                              src={authorPage.authorFrontMatter.image}
                              alt={author}
                              width="26"
                              height="26"
                            />
                          </span>
                        ) : (
                          ""
                        )
                      )}
                      <i className="d-inline-block ms-2 ps-1 fst-normal">
                        by <span>{author}</span>
                      </i>
                    </Link>
                  </li>
                  <li className="list-inline-item mt-2">—</li>
                  <li className="list-inline-item mt-2">
                    <i className="me-2">
                      <IconClock size={18} />
                    </i>
                    <span>{readingTimeText} min read</span>
                  </li>
                  <li className="list-inline-item mt-2">—</li>
                  <li className="list-inline-item mt-2">
                    <i className="me-2">
                      <IconCalendarEvent size={18} />
                    </i>
                    <span>{formatDate(date)}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="mb-5 text-center post-deatils-image">
                <Image
                  className="rounded img-fluid"
                  src={image}
                  alt={title}
                  width={1120}
                  height={595}
                  placeholder="blur"
                  blurDataURL={image}
                />
              </div>
            </div>
            <div className="col-lg-2 post-share-block order-1 order-lg-0 mt-5 mt-lg-0">
              <div className="position-sticky" style={{ top: "150px" }}>
                <span className="d-inline-block mb-3 small">SHARE</span>
                <ul className="social-share icon-box">
                  <li className="d-inline-block d-lg-block me-2 mb-2">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${title}&url=${pageUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i>
                        <IconBrandTwitter size={18} />
                      </i>
                    </a>
                  </li>
                  <li className="d-inline-block d-lg-block me-2 mb-2">
                    <a
                      href={`https://www.facebook.com/sharer.php?u=${pageUrl}&quote=${title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i>
                        <IconBrandFacebook size={18} />
                      </i>
                    </a>
                  </li>
                  <li className="d-inline-block d-lg-block me-2 mb-2">
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i>
                        <IconBrandLinkedin size={18} />
                      </i>
                    </a>
                  </li>
                  <li className="d-inline-block d-lg-block me-2 mb-2">
                    <a
                      href={`https://www.reddit.com/submit?url=${pageUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i>
                        <IconBrandReddit size={18} />
                      </i>
                    </a>
                  </li>
                  <li className="d-inline-block d-lg-block me-2 mb-2">
                    <a
                      href={`https://www.pinterest.com/pin/create/button/?&text=${title}&url=${pageUrl}&description=${title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i>
                        <IconBrandPinterest size={18} />
                      </i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-8 post-content-block order-0 order-lg-2">
              <MDXContent content={content} />
              <ul className="post-meta-tag list-unstyled list-inline mt-5">
                <li className="list-inline-item">Tags: </li>
                {tags.map((t, i) => (
                  <li key={i} className="list-inline-item">
                    <Link
                      href={`/tags/${t.replace(/ /g, "-").toLowerCase()}`}
                      className="bg-white text-dark"
                    >
                      {t}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="single-post-author">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="d-block d-md-flex">
                  <Link
                    href={`/author/${author.replace(/ /g, "-").toLowerCase()}`}
                  >
                    {authors.map((authorPage, i) =>
                      author.replace(/ /g, "-").toLowerCase() ===
                      authorPage.authorSlug ? (
                        <span key={i}>
                          <Image
                            src={authorPage.authorFrontMatter.image}
                            alt={author}
                            width={155}
                            height={155}
                            className="rounded mr-4 img-fluid"
                            placeholder="blur"
                            blurDataURL={authorPage.authorFrontMatter.image}
                          />
                        </span>
                      ) : (
                        ""
                      )
                    )}
                  </Link>
                  <div className="ms-0 ms-md-4 ps-0 ps-md-3 mt-4 mt-md-0">
                    <h3 className="h4 mb-3">
                      <Link
                        href={`/author/${author
                          .replace(/ /g, "-")
                          .toLowerCase()}`}
                        className="text-dark"
                      >
                        {author}
                      </Link>
                    </h3>
                    {authors.map((authorPage, i) =>
                      author.replace(/ /g, "-").toLowerCase() ===
                      authorPage.authorSlug ? (
                        <div key={i}>
                          <Markdown
                            content={truncateString(
                              authorPage.authorContent,
                              150
                            )}
                          />
                        </div>
                      ) : (
                        ""
                      )
                    )}
                    <div className="content">
                      <Link
                        href={`/author/${author
                          .replace(/ /g, "-")
                          .toLowerCase()}`}
                        className="text-dark"
                      >
                        See all posts by this author{" "}
                        <i>
                          <IconArrowUpRight size={20} />
                        </i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Script
        src="/js/lightense/lightense.min.js"
        strategy="afterInteractive"
      />
    </>
  );
}
