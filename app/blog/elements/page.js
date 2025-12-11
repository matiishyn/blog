import PageHeaderBlock from "@/components/PageHeader";
import Markdown from "@/components/ReactMarkdown";
import { getSinglePage } from "@/libs/getSinglePage";
import Script from "next/script";

export const metadata = {
  title: "Elements",
};

export default function ElementsPage() {
  const elements = getSinglePage("content/elements.md");
  const { frontMatter, content } = elements;

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

      <Script
        src="/js/lightense/lightense.min.js"
        strategy="afterInteractive"
      />
    </>
  );
}
