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
  const allTags = file.map((file) => {
    const dirFileContents = fs.readFileSync(
      path.join("content/blog", file),
      "utf-8"
    );
    const { data: frontmatter } = matter(dirFileContents);
    return frontmatter.tags;
  });

  const flatTags = allTags.flat();
  const uniqueTags = [...new Set(flatTags)];

  return uniqueTags.map((t) => ({
    tagname: t.replace(/ /g, "-").toLowerCase(),
  }));
}

export async function generateMetadata({ params }) {
  const { tagname } = await params;
  const tag = tagname;
  return {
    title: `Showing posts from - ${
      tag.charAt(0).toUpperCase() + tag.slice(1).replace(/-/g, " ")
    }`,
  };
}

export default async function TagPage({ params }) {
  const { tagname } = await params;
  const tag = tagname;
  const authors = getAuthors();
  const allPosts = getPosts();

  const file = fs.readdirSync(path.join("content/blog"));
  const postsByTag = file
    .map((file) => {
      const dirFileContents = fs.readFileSync(
        path.join("content/blog", file),
        "utf-8"
      );
      const { data: frontmatter } = matter(dirFileContents);

      return frontmatter.tags.includes(
        tag.charAt(0).toUpperCase() + tag.slice(1).replace(/-/g, " ")
      )
        ? allPosts.find((p) => p.slug === file.replace(/\.(md|mdx)$/, ""))
        : null;
    })
    .filter((p) => p !== null);

  const postColumns = siteConfig.postColumns;

  return (
    <div className="container">
      <PageHeaderTaxo title={tag} />

      <div className="row gy-5 gx-4 g-xl-5">
        {postsByTag.map((post, i) => (
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
