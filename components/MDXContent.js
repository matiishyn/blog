import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeExpressiveCode from "rehype-expressive-code";
import remarkGfm from "remark-gfm";

export default async function MDXContent({ content }) {
  return (
    <div className="content">
      <MDXRemote
        source={content}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              [
                rehypeExpressiveCode,
                {
                  themes: ["andromeeda"],
                },
              ],
            ],
          },
        }}
      />
    </div>
  );
}
