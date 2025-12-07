import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/mdx";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read my latest articles on tech, science, and photography.",
  alternates: {
    canonical: "https://icemnotes.com/blog",
  },
  openGraph: {
    title: "Blog | Engineering & Management Notes",
    description: "Read my latest articles on tech, science, and photography.",
    url: "https://icemnotes.com/blog",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl md:text-5xl font-heading font-bold text-heading mb-8">
        Blog
      </h1>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-foreground/60">
          No posts available yet. Check back soon!
        </p>
      )}
    </div>
  );
}

