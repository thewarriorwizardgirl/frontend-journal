import React from "react";
import { ArrowLeft, ArrowUpRight, CalendarDays, Clock3, MapPin } from "lucide-react";
import { getPostPath } from "../data/posts";
import BrandMark from "./BrandMark";
import PostContent from "./PostContent";
import JournalContactCard from "./JournalContactCard";
import type { PublishedPost } from "../types";

type PostPageProps = {
  post: PublishedPost;
  relatedPosts: PublishedPost[];
};

export default function PostPage({ post, relatedPosts: allPosts }: PostPageProps) {
  const relatedPosts = allPosts
    .filter((candidate) => candidate.category === post.category && candidate._id !== post._id)
    .slice(0, 3);
  const coverVideo = post.coverVideo?.url || "";
  const coverImage = post.coverImage?.url || "";

  return (
    <div className="page-shell" id="top">
      <header className="masthead">
        <div className="masthead-meta">
          <span>Field notes · Stories · Small adventures</span>
          <span>By Vidhi Aggarwal</span>
        </div>
        <div className="masthead-row">
          <a className="journal-title post-page-wordmark" href="/">
            Journal
          </a>
          <a
            className="brand-lockup"
            href="https://thewarriorwizardgirl.com/"
            target="_blank"
            rel="noreferrer"
          >
            <span>The Warrior Wizard Girl</span>
            <BrandMark />
          </a>
        </div>
      </header>
      <main className="content-grid post-page-grid">
        <article className="post-article">
          {(post.publishedAt || post.location || post.readingTimeMinutes) && (
            <div className="post-article-meta" aria-label="Post details">
              {post.publishedAt && (
                <span>
                  <CalendarDays size={15} aria-hidden="true" />
                  Published {formatDate(post.publishedAt)}
                  {post.updatedAt !== post.createdAt &&
                    post.updatedAt.slice(0, 10) !== post.publishedAt.slice(0, 10) && (
                    <> · Updated {formatDate(post.updatedAt)}</>
                  )}
                </span>
              )}
              {post.location && (
                <span>
                  <MapPin size={15} aria-hidden="true" />
                  {post.location}
                </span>
              )}
              {post.readingTimeMinutes && (
                <span>
                  <Clock3 size={15} aria-hidden="true" />
                  {post.readingTimeMinutes} min read
                </span>
              )}
            </div>
          )}
          {coverVideo ? (
            <video
              className="post-article-image"
              controls
              playsInline
              preload="metadata"
              poster={coverImage && coverImage !== coverVideo ? coverImage : undefined}
            >
              <source src={coverVideo} type="video/mp4" />
            </video>
          ) : coverImage ? (
            <img className="post-article-image" src={coverImage} alt="" />
          ) : null}
          <PostContent content={post.content} />
        </article>
        <aside className="post-sidebar">
          <a className="back-to-journal" href="/">
            <ArrowLeft size={15} aria-hidden="true" /> All journal entries
          </a>
          <section className="post-details">
            <span className="eyebrow">{post.category}</span>
            <h1>{post.title}</h1>
            {post.subtitle && <p className="post-subtitle">{post.subtitle}</p>}
            {post.tags.length > 0 && (
              <div className="post-tag-list">
                {post.tags.map((tag) => <span key={tag}>#{tag}</span>)}
              </div>
            )}
          </section>
          <JournalContactCard />
          {relatedPosts.length > 0 && (
            <section className="side-section">
              <h3>More {post.category.toLowerCase()} stories</h3>
              {relatedPosts.map((related) => (
                <a
                  className="sidebar-link"
                  href={getPostPath(related)}
                  key={related.title}
                >
                  <span>{related.title}</span>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              ))}
            </section>
          )}
        </aside>
      </main>
      <footer className="site-footer">
        <strong>The Warrior Wizard Girl</strong>
        <span>Stories from here and there</span>
        <a href="/">Back to all posts</a>
      </footer>
    </div>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}
