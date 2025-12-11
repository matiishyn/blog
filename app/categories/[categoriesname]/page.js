import PageHeaderTaxo from "@/components/PageHeaderTaxonomy";
import Post from "@/components/Post";
import siteConfig from "@/config/site.config.json";
import { getAuthors } from "@/libs/getAuthors";
import { getPosts } from "@/libs/getPosts";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

export async function generateStaticParams() {
  const file = fs.readdirSync(path.join("content/blog"));
  const allCategories = file.map((file) => {
    const dirFileContents = fs.readFileSync(
      path.join("content/blog", file),
      "utf-8"
    );
    const { data: frontmatter } = matter(dirFileContents);
    return frontmatter.categories;
  });

  const flatCategories = allCategories.flat();
  const uniqueCategories = [...new Set(flatCategories)];

  return uniqueCategories.map((c) => ({
    categoriesname: c.replace(/ /g, "-").toLowerCase(),
  }));
}

export async function generateMetadata({ params }) {
  const { categoriesname } = await params;
  const category = categoriesname;
  return {
    title: `Showing posts from - ${
      category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, " ")
    }`,
  };
}

export default async function CategoryPage({ params }) {
  const { categoriesname } = await params;
  const category = categoriesname;
  const authors = getAuthors();
  const allPosts = getPosts();

  const file = fs.readdirSync(path.join("content/blog"));
  const postsByCategory = file
    .map((file) => {
      const dirFileContents = fs.readFileSync(
        path.join("content/blog", file),
        "utf-8"
      );
      const { data: frontmatter } = matter(dirFileContents);

      // Check if any category matches (case-insensitive)
      const hasCategory = frontmatter.categories?.some(
        (cat) => cat.toLowerCase().replace(/ /g, "-") === category.toLowerCase()
      );

      return hasCategory
        ? allPosts.find((p) => p.slug === file.replace(/\.(md|mdx)$/, ""))
        : null;
    })
    .filter((p) => p !== null);

  const postColumns = siteConfig.postColumns;

  return (
    <div className="container">
      <PageHeaderTaxo title={category} />

      <div className="row gy-5 gx-4 g-xl-5">
        {postsByCategory.map((post, i) => (
          <div
            key={i}
            className={postColumns == 3 ? "col-lg-4 col-md-6" : "col-lg-6"}
          >
            <Post post={post} authors={authors} postColumns={postColumns} />
          </div>
        ))}
      </div>
    </div>
  );
}
