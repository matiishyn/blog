import MDXContent from "@/components/MDXContent";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { generateBlogPostingSchema, generateBreadcrumbSchema } from "@/lib/structured-data";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const postUrl = `https://icemnotes.com/blog/${slug}`;
  const ogImage = post.metadata.heroImage
    ? `https://icemnotes.com${post.metadata.heroImage}`
    : "https://icemnotes.com/profile.jpg";

  return {
    title: post.metadata.title,
    description: post.metadata.description,
    authors: [{ name: "Ivan Matiishyn", url: "https://icemnotes.com/about" }],
    keywords: post.metadata.tags,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.description,
      type: "article",
      publishedTime: post.metadata.publishDate,
      authors: ["Ivan Matiishyn"],
      tags: post.metadata.tags,
      url: postUrl,
      siteName: "Engineering & Management Notes",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.metadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metadata.title,
      description: post.metadata.description,
      creator: "@icemnotes",
      images: [ogImage],
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.metadata.publishDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  // Generate structured data
  const blogPostingSchema = generateBlogPostingSchema(post, slug);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://icemnotes.com" },
    { name: "Blog", url: "https://icemnotes.com/blog" },
    { name: post.metadata.title, url: `https://icemnotes.com/blog/${slug}` },
  ]);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Image */}
        {post.metadata.heroImage && (
          <div className="relative w-full h-64 md:h-96 mb-8 overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800">
            <Image
              src={post.metadata.heroImage}
              alt={post.metadata.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-heading mb-4">
            {post.metadata.title}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-foreground/60 mb-6">
            <time dateTime={post.metadata.publishDate}>{formattedDate}</time>
            <span>•</span>
            <span>{post.metadata.readingTime}</span>
          </div>

          {/* Description */}
          <p className="text-xl text-foreground/80 mb-6">
            {post.metadata.description}
          </p>

          {/* Tags */}
          {post.metadata.tags && post.metadata.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.metadata.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm rounded-full bg-gray-200 dark:bg-gray-800 text-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Content */}
        <MDXContent content={post.content} />
      </article>
    </>
  );
}

