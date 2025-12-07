import { Post } from "./mdx";

export type Person = {
  "@type": "Person";
  name: string;
  url: string;
  image?: string;
  jobTitle?: string;
  description?: string;
  sameAs?: string[];
};

export type Organization = {
  "@type": "Organization";
  name: string;
  url: string;
  logo?: string;
  description?: string;
};

export type WebSite = {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  url: string;
  description: string;
  author: Person;
  inLanguage: string;
};

export type BlogPosting = {
  "@context": "https://schema.org";
  "@type": "BlogPosting";
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified: string;
  author: Person;
  publisher: Organization | Person;
  url: string;
  keywords?: string[];
  articleSection?: string;
  wordCount?: number;
  inLanguage: string;
};

export type BreadcrumbList = {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }>;
};

export type ProfilePage = {
  "@context": "https://schema.org";
  "@type": "ProfilePage";
  name: string;
  description: string;
  url: string;
  mainEntity: Person;
  inLanguage: string;
};

const SITE_URL = "https://icemnotes.com";
const AUTHOR_NAME = "Ivan Matiishyn";

export const authorPerson: Person = {
  "@type": "Person",
  name: AUTHOR_NAME,
  url: `${SITE_URL}/about`,
  jobTitle: "Engineering & Management Writer",
  description:
    "A writer interested in tech, science, and photography.",
  sameAs: [
    // Add your social media profiles here
    // "https://twitter.com/yourusername",
    // "https://github.com/yourusername",
    // "https://linkedin.com/in/yourusername",
  ],
};

export function generateWebSiteSchema(): WebSite {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Engineering & Management Notes",
    url: SITE_URL,
    description:
      "A writer interested in all things tech, science, and photography related.",
    author: authorPerson,
    inLanguage: "en-US",
  };
}

export function generateBlogPostingSchema(
  post: Post,
  slug: string
): BlogPosting {
  const postUrl = `${SITE_URL}/blog/${slug}`;
  
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metadata.title,
    description: post.metadata.description,
    image: post.metadata.heroImage
      ? `${SITE_URL}${post.metadata.heroImage}`
      : undefined,
    datePublished: post.metadata.publishDate,
    dateModified: post.metadata.publishDate,
    author: authorPerson,
    publisher: authorPerson,
    url: postUrl,
    keywords: post.metadata.tags,
    inLanguage: "en-US",
  };
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
): BreadcrumbList {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateProfilePageSchema(): ProfilePage {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: "About Ivan Matiishyn",
    description:
      "Learn more about Ivan Matiishyn - a writer interested in tech, science, and photography.",
    url: `${SITE_URL}/about`,
    mainEntity: {
      ...authorPerson,
      image: `${SITE_URL}/profile.jpg`,
    },
    inLanguage: "en-US",
  };
}

