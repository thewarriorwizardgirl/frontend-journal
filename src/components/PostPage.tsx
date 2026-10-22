import React from "react";
import { ArrowLeft, ArrowUpRight, CalendarDays, Clock3, MapPin } from "lucide-react";
import { getPostPath, posts } from "../data/posts";
import BrandMark from "./BrandMark";
import PostContent from "./PostContent";
import JournalContactCard from "./JournalContactCard";
import type { Article, Post } from "../types";

type PostPageProps = {
  post: Post;
  article: Article;
};

export default function PostPage({ post, article }: PostPageProps) {
  const relatedPosts = posts
    .filter((candidate) => candidate.category === post.category && candidate !== post)
    .slice(0, 3);
  const coverVideo = article.coverVideo || "";
  const coverImage = article.coverImage || post.image;

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
          {(article.publishedAt || article.location || article.readingTimeMinutes) && (
            <div className="post-article-meta" aria-label="Post details">
              {article.publishedAt && (
                <span>
                  <CalendarDays size={15} aria-hidden="true" />
                  Published {formatDate(article.publishedAt)}
                  {article.updatedAt && article.updatedAt !== article.publishedAt && (
                    <> · Updated {formatDate(article.updatedAt)}</>
                  )}
                </span>
              )}
              {article.location && (
                <span>
                  <MapPin size={15} aria-hidden="true" />
                  {article.location}
                </span>
              )}
              {article.readingTimeMinutes && (
                <span>
                  <Clock3 size={15} aria-hidden="true" />
                  {article.readingTimeMinutes} min read
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
          <PostContent content={article.content} />
        </article>
        <aside className="post-sidebar">
          <a className="back-to-journal" href="/">
            <ArrowLeft size={15} aria-hidden="true" /> All journal entries
          </a>
          <section className="post-details">
            <span className="eyebrow">{article.category}</span>
            <h1>{article.title || post.title}</h1>
            {article.subtitle && <p className="post-subtitle">{article.subtitle}</p>}
            {article.tags?.length > 0 && (
              <div className="post-tag-list">
                {article.tags.map((tag) => <span key={tag}>#{tag}</span>)}
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
        <span>35 dispatches · Stories from here and there</span>
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
  }).format(new Date(`${date}T00:00:00Z`));
}
