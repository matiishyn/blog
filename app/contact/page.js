import PageHeaderBlock from "@/components/PageHeader";
import { getSinglePage } from "@/libs/getSinglePage";

export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  const contact = getSinglePage("content/contact.md");
  const { frontMatter } = contact;

  return (
    <>
      <PageHeaderBlock title={frontMatter.title} />
      <section>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="content text-center">
                <p>{frontMatter.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
