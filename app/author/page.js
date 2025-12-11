import Author from "@/components/Author";
import PageHeaderBlock from "@/components/PageHeader";
import { getAuthors } from "@/libs/getAuthors";
import { getPosts } from "@/libs/getPosts";

export const metadata = {
  title: "Authors",
};

export default function AuthorsPage() {
  const authors = getAuthors();
  const posts = getPosts();

  const allAuthor = posts.map((author) => author.frontMatter.author);
  const postCount = [];
  allAuthor.forEach((x) => {
    postCount[x] = (postCount[x] || 0) + 1;
  });

  return (
    <>
      <PageHeaderBlock title="Authors" />
      <section>
        <div className="container">
          <div className="row justify-content-center">
            {authors.map((author, i) => (
              <div key={i} className="col-lg-10 mb-4">
                <Author author={author} postCount={postCount} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
