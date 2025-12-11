import PageHeaderBlock from "@/components/PageHeader";
import Markdown from "@/components/ReactMarkdown";
import { getSinglePage } from "@/libs/getSinglePage";

export const metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  const privacy = getSinglePage("content/privacy.md");
  const { frontMatter, content } = privacy;

  return (
    <>
      <PageHeaderBlock title={frontMatter.title} />
      <section>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="content">
                <Markdown content={content} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
