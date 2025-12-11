import Post from "@/components/Post";
import Markdown from "@/components/ReactMarkdown";
import siteConfig from "@/config/site.config.json";
import { getAuthors } from "@/libs/getAuthors";
import { getPosts } from "@/libs/getPosts";
import fs from "fs";
import matter from "gray-matter";
import Image from "next/image";
import path from "path";

export async function generateStaticParams() {
  const authorDirFiles = fs.readdirSync(path.join("content/author"));
  const authors = authorDirFiles.filter((f) => f.includes(".md"));

  return authors.map((filename) => ({
    author_slug: filename.replace(".md", ""),
  }));
}

export async function generateMetadata({ params }) {
  const { author_slug } = await params;
  const filePath = path.join("content/author", `${author_slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data: frontMatter } = matter(fileContents);

  return {
    title: frontMatter.title,
  };
}

export default async function AuthorPage({ params }) {
  const { author_slug } = await params;
  const filePath = path.join("content/author", `${author_slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data: frontMatter, content } = matter(fileContents);
  const { title, image } = frontMatter;

  const authors = getAuthors();
  const posts = getPosts();

  const allAuthor = posts.map((author) => author.frontMatter.author);
  const postCount = [];
  allAuthor.forEach((x) => {
    postCount[x] = (postCount[x] || 0) + 1;
  });

  const postColumns = siteConfig.postColumns;

  return (
    <>
      <section className="page-header section-sm">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="row g-4 g-lg-5 text-center text-lg-start justify-content-center justify-content-lg-start">
                <div className="col-lg-3 col-md-4 col-sm-5 col-6">
                  <Image
                    className="rounded img-fluid"
                    src={image}
                    alt={title}
                    width={250}
                    height={250}
                    placeholder="blur"
                    blurDataURL={image}
                  />
                </div>
                <div className="col-lg-9 col-md-12">
                  <p className="mb-2">
                    <span className="fw-bold text-black">
                      {postCount[title] < 9
                        ? `0${postCount[title]}`
                        : postCount[title]}
                    </span>{" "}
                    Published posts
                  </p>
                  <h1 className="h3 text-dark mb-3">{title}</h1>
                  <div className="content">
                    <Markdown content={content} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="row gy-5 gx-4 g-xl-5">
          {posts.map(
            (post, i) =>
              post.frontMatter.author === title && (
                <div
                  key={i}
                  className={
                    postColumns == 3 ? "col-lg-4 col-md-6" : "col-lg-6"
                  }
                >
                  <Post
                    post={post}
                    authors={authors}
                    postColumns={postColumns}
                  />
                </div>
              )
          )}
        </div>
      </div>
    </>
  );
}
