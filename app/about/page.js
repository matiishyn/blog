import Author from "@/components/Author";
import PageHeaderBlock from "@/components/PageHeader";
import Markdown from "@/components/ReactMarkdown";
import { getAuthors } from "@/libs/getAuthors";
import { getPosts } from "@/libs/getPosts";
import { getSinglePage } from "@/libs/getSinglePage";
import Image from "next/image";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  const authors = getAuthors();
  const posts = getPosts();
  const about = getSinglePage("content/about.md");
  const { frontMatter } = about;

  const allAuthor = posts.map((author) => author.frontMatter.author);
  const postCount = [];
  allAuthor.forEach((x) => {
    postCount[x] = (postCount[x] || 0) + 1;
  });

  // Calculate years of experience dynamically
  const yearsOfExperience = new Date().getFullYear() - 2013;

  // Replace placeholder with actual years
  const description = frontMatter.intro.description.replace(
    /over \d+ years/g,
    `over ${yearsOfExperience} years`
  );

  return (
    <>
      <PageHeaderBlock title={frontMatter.title} />

      <section>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <h2 className="text-dark mb-0">
                <Markdown content={frontMatter.intro.title} inline={true} />
              </h2>
            </div>
          </div>

          <div className="py-5 my-3">
            <div className="row g-4 justify-content-center text-center">
              {frontMatter.intro.images.map((item, i) => (
                <div
                  key={i}
                  className={`${item.grid_class} image-grid-${i + 1}`}
                >
                  <Image
                    className="img-fluid rounded"
                    src={item.image}
                    alt="about image"
                    width={item.width}
                    height={item.height}
                    placeholder="blur"
                    blurDataURL={item.image}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <div className="content">
                <Markdown content={description} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 mb-5 text-center">
              <h2 className="text-dark">Meet The Author</h2>
            </div>

            {authors.map((author, i) => (
              <div key={i} className="col-lg-10">
                <Author author={author} postCount={postCount} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
