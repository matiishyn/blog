import { sortByDate } from "@/utils/sortByDate";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

const blogDirFiles = fs.readdirSync(path.join("content/blog"));
// Support both .md and .mdx files
const blogs = blogDirFiles.filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

export function getPosts() {
  const returnDirFiles = blogs.map((filename) => {
    const slug = filename.replace(/\.(md|mdx)$/, "");
    const dirFileContents = fs.readFileSync(
      path.join("content/blog", filename),
      "utf8"
    );

    const { data: frontMatter, content } = matter(dirFileContents);

    return {
      slug,
      frontMatter,
      content,
    };
  });
  return returnDirFiles.sort(sortByDate);
}
