import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const postsDirectory = path.join(process.cwd(), "posts");

export type PostMetadata = {
  title: string;
  publishDate: string;
  description: string;
  tags: string[];
  heroImage?: string;
  readingTime: string;
};

export type Post = {
  slug: string;
  metadata: PostMetadata;
  content: string;
};

// Ensure posts directory exists
function ensurePostsDirectory() {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }
}

export function getPostSlugs(): string[] {
  ensurePostsDirectory();
  try {
    const files = fs.readdirSync(postsDirectory);
    return files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(/\.mdx$/, ""));
  } catch (error) {
    return [];
  }
}

export function getPostBySlug(slug: string): Post | null {
  ensurePostsDirectory();
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const readingTimeResult = readingTime(content);

    return {
      slug,
      metadata: {
        title: data.title || "Untitled",
        publishDate: data.publishDate || new Date().toISOString(),
        description: data.description || "",
        tags: data.tags || [],
        heroImage: data.heroImage,
        readingTime: readingTimeResult.text,
      },
      content,
    };
  } catch (error) {
    return null;
  }
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => {
      const dateA = new Date(a.metadata.publishDate).getTime();
      const dateB = new Date(b.metadata.publishDate).getTime();
      return dateB - dateA; // Sort by newest first
    });
  return posts;
}

export function getRecentPosts(limit: number = 3): Post[] {
  const allPosts = getAllPosts();
  return allPosts.slice(0, limit);
}
