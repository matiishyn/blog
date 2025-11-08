import AboutSection from "@/components/AboutSection";
import PostCard from "@/components/PostCard";
import VisitedPlaces from "@/components/VisitedPlaces";
import { getRecentPosts } from "@/lib/mdx";

export default function Home() {
  const recentPosts = getRecentPosts(3);

  return (
    <div>
      {/* About Section */}
      <AboutSection />

      {/* Recent Posts Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-heading font-bold text-heading mb-8">
          Recent posts
        </h2>

        {recentPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-foreground/60">No posts yet. Check back soon!</p>
        )}
      </section>

      {/* Visited Places Section */}
      <VisitedPlaces />
    </div>
  );
}
