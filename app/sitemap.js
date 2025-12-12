import siteConfig from "@/config/site.config.json";
import { getAuthors } from "@/libs/getAuthors";
import { getPosts } from "@/libs/getPosts";

export default function sitemap() {
  const baseUrl = siteConfig.baseURL.replace(/\/$/, "");

  // Get all blog posts
  const posts = getPosts();
  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.frontMatter.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Get all authors
  const authors = getAuthors();
  const authorUrls = authors.map((author) => ({
    url: `${baseUrl}/author/${author.authorSlug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Get all unique categories from posts
  const categories = [
    ...new Set(posts.flatMap((post) => post.frontMatter.categories || [])),
  ];
  const categoryUrls = categories.map((category) => ({
    url: `${baseUrl}/categories/${category.replace(/ /g, "-").toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  // Get all unique tags from posts
  const tags = [
    ...new Set(posts.flatMap((post) => post.frontMatter.tags || [])),
  ];
  const tagUrls = tags.map((tag) => ({
    url: `${baseUrl}/tags/${tag.replace(/ /g, "-").toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  return [...staticPages, ...postUrls, ...authorUrls, ...categoryUrls, ...tagUrls];
}
