import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import MDXContent from "@/components/MDXContent";

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

  return {
    title: post.metadata.title,
    description: post.metadata.description,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.description,
      type: "article",
      publishedTime: post.metadata.publishDate,
      tags: post.metadata.tags,
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

  return (
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
  );
}

