import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

type PostContentProps = {
  content: string;
};

export default function PostContent({ content }: PostContentProps) {
  return (
    <div className="post-markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={{
          img({ src = "", alt = "" }) {
            if (/\.mp4(?:$|[?#])/i.test(src)) {
              return (
                <figure>
                  <video controls playsInline preload="metadata">
                    <source src={src} type="video/mp4" />
                  </video>
                  {alt && <figcaption>{alt}</figcaption>}
                </figure>
              );
            }
            return (
              <figure>
                <img src={src} alt={alt} loading="lazy" />
                {alt && <figcaption>{alt}</figcaption>}
              </figure>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
