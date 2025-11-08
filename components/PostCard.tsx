import Link from "next/link";
import Image from "next/image";
import { Post } from "@/lib/mdx";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const formattedDate = new Date(post.metadata.publishDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <article className="group">
      <Link href={`/blog/${post.slug}`} className="block">
        {/* Hero Image */}
        {post.metadata.heroImage && (
          <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800">
            <Image
              src={post.metadata.heroImage}
              alt={post.metadata.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}

        {/* Content */}
        <div className="space-y-3">
          {/* Date and Reading Time */}
          <div className="flex items-center gap-3 text-sm text-foreground/60">
            <time dateTime={post.metadata.publishDate}>{formattedDate}</time>
            <span>•</span>
            <span>{post.metadata.readingTime}</span>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-heading font-bold text-heading group-hover:opacity-70 transition-opacity">
            {post.metadata.title}
          </h2>

          {/* Description */}
          <p className="text-foreground/80 line-clamp-3">
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
        </div>
      </Link>
    </article>
  );
}
