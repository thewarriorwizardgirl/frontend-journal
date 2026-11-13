import React from "react";
import { ArrowUpRight, Eye, Clock3 } from "lucide-react";
import { getPostPath } from "../data/posts";
import type { PublishedPost } from "../types";

type PostCardProps = {
  post: PublishedPost;
};

export default function PostCard({ post }: PostCardProps) {
  const video = post.coverVideo?.url || "";
  const cover = post.coverImage?.url || "";
  const readingTime = post.readingTimeMinutes
    ? `${post.readingTimeMinutes} min read`
    : "Journal entry";

  return (
    <article className="post-card">
      <a className="post-card-main-link" href={getPostPath(post)}>
        <div className="post-card-image-wrap">
          {video ? (
            <video
              className="post-card-image"
              src={video}
              muted
              autoPlay
              loop
              playsInline
              preload="metadata"
              aria-label={`${post.title} video`}
            />
          ) : cover ? (
            <img
              className="post-card-image"
              src={cover}
              alt=""
              loading="lazy"
            />
          ) : (
            <div className="image-placeholder" aria-hidden="true">
              <span>{post.title}</span>
            </div>
          )}
        </div>
        <div className="post-card-body">
          <span className="post-card-category">{post.category}</span>
          <h3>{post.title}</h3>
          <div className="post-meta">
            <span className="inline-flex items-center gap-1.5">
              <Clock3 size={13} aria-hidden="true" />
              {readingTime}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Eye size={14} aria-hidden="true" />
              {post.views} views
            </span>
          </div>
        </div>
      </a>
      <a
        className="post-card-new-tab"
        href={getPostPath(post)}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${post.title} in a new tab`}
        title="Open in a new tab"
      >
        <ArrowUpRight size={16} aria-hidden="true" />
      </a>
    </article>
  );
}
