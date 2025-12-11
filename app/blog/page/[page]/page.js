import PageHeaderBlock from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import Post from "@/components/Post";
import PostHorizontal from "@/components/PostHorizontal";
import postConfig from "@/config/site.config.json";
import { getAuthors } from "@/libs/getAuthors";
import { getPosts } from "@/libs/getPosts";
import fs from "fs";
import path from "path";

export async function generateStaticParams() {
  const blogDirFiles = fs.readdirSync(path.join("content/blog"));
  const numberOfPages = Math.ceil(
    blogDirFiles.length / postConfig.postPerPage
  );

  const pages = [];
  for (let i = 1; i <= numberOfPages; i++) {
    pages.push({ page: i.toString() });
  }

  return pages;
}

export const metadata = {
  title: "All Posts",
};

export default async function BlogPageNumber({ params }) {
  const { page: pageParam } = await params;
  const authors = getAuthors();
  const returnDirFiles = getPosts();

  const blogDirFiles = fs.readdirSync(path.join("content/blog"));
  const blogs = blogDirFiles.filter((f) => f.includes(".md"));

  const page = parseInt(pageParam) || 1;
  const numberOfPages = Math.ceil(blogs.length / postConfig.postPerPage);
  const pageIndex = page - 1;
  const posts = returnDirFiles.slice(
    pageIndex * postConfig.postPerPage,
    (pageIndex + 1) * postConfig.postPerPage
  );

  return (
    <>
      <PageHeaderBlock title="All posts" blogPage={true} />

      <div className="container">
        <div className="row gy-5 gx-4 g-xl-5">
          {posts.map((post, i) =>
            postConfig.postColumns == 1 ? (
              <div key={i} className="col-lg-12">
                <PostHorizontal post={post} authors={authors} />
              </div>
            ) : (
              <div
                key={i}
                className={
                  postConfig.postColumns == 3 ? "col-lg-4 col-md-6" : "col-lg-6"
                }
              >
                <Post
                  post={post}
                  authors={authors}
                  postColumns={postConfig.postColumns}
                />
              </div>
            )
          )}

          <Pagination currentPage={page} numberOfPages={numberOfPages} />
        </div>
      </div>
    </>
  );
}
