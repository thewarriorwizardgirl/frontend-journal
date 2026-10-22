import React, {
  lazy,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ArrowRight, Search } from "lucide-react";
import BrandMark from "./components/BrandMark";
import ContactPage from "./components/ContactPage";
import NavRail from "./components/NavRail";
import PostCard from "./components/PostCard";
import PoemFeature from "./components/PoemFeature";
import JournalContactCard from "./components/JournalContactCard";
import { categories, getPostPath, posts } from "./data/posts";
import type { Category } from "./data/posts";
import type { Article } from "./types";

const PostPage = lazy(() => import("./components/PostPage"));
const articleModules = import.meta.glob<{ default: Article }>("./data/posts/*.json");

type ArticleState =
  | { slug: null | string; status: "idle" | "loading" | "error"; article: null }
  | { slug: string; status: "ready"; article: Article };

export default function App() {
  const path = window.location.pathname;
  const isContactPage = path === "/contact" || path === "/contact/";
  const activeSlug = path.startsWith("/posts/") ? path.split("/")[2] : null;
  const activePost = path.startsWith("/posts/")
    ? posts.find((post) => getPostSlug(post) === activeSlug)
    : null;
  const [activeCategory, setActiveCategory] = useState<Category>("All posts");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [articleState, setArticleState] = useState<ArticleState>({
    slug: null,
    status: "idle",
    article: null,
  });
  const searchRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLElement>(null);
  const showFeatured = activeCategory === "All posts" && !searchTerm.trim();
  const articleResult: ArticleState =
    activeSlug && articleState.slug === activeSlug
      ? articleState
      : { slug: activeSlug, status: "loading", article: null };

  useEffect(() => {
    document.documentElement.dataset.theme = isDarkTheme ? "dark" : "light";
    document.title = isContactPage
      ? "Contact — The Warrior Wizard Girl"
      : activePost
        ? `${activePost.title} — The Warrior Wizard Girl`
        : "Journal — The Warrior Wizard Girl";
  }, [isDarkTheme, isContactPage, activePost]);

  useEffect(() => {
    if (!activePost) return undefined;
    const slug = getPostSlug(activePost);
    let cancelled = false;

    setArticleState({ slug, status: "loading", article: null });
    const loadArticle = articleModules[`./data/posts/${slug}.json`];
    if (!loadArticle) {
      setArticleState({ slug, status: "error", article: null });
      console.error(`Unable to load journal post "${slug}": article file not found.`);
      return undefined;
    }

    loadArticle()
      .then(({ default: article }) => {
        if (cancelled) return;
        setArticleState({ slug, status: "ready", article });
      })
      .catch((error) => {
        if (cancelled) return;
        console.error(`Unable to load journal post "${slug}".`, error);
        setArticleState({ slug, status: "error", article: null });
      });

    return () => {
      cancelled = true;
    };
  }, [activePost?.title]);

  useEffect(() => {
    if (window.location.hash === "#search") {
      focusSearch();
    } else if (window.location.hash.startsWith("#categories-")) {
      const slug = window.location.hash.slice("#categories-".length);
      const category = categories.find(
        (item) => item.toLowerCase().replace(/\s/g, "-") === slug,
      );
      if (category) setActiveCategory(category);
      categoryRef.current?.scrollIntoView({ block: "center" });
    } else if (window.location.hash === "#categories") {
      setCategoryMenuOpen(true);
    }
  }, []);

  const visiblePosts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return posts.filter((post, index) => {
      const matchesCategory =
        activeCategory === "All posts" || post.category === activeCategory;
      const matchesSearch =
        !query ||
        `${post.title} ${post.category} ${post.excerpt}`.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  function focusSearch() {
    searchRef.current?.focus();
    searchRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function showCategories() {
    setCategoryMenuOpen((current) => !current);
  }

  function selectCategory(category: Category) {
    setActiveCategory(category);
    setCategoryMenuOpen(false);
    document.querySelector("#journal")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function focusSearchFromOtherPage() {
    if (isContactPage || activePost) {
      window.location.assign("/#search");
      return;
    }
    focusSearch();
  }

  function categoriesFromOtherPage() {
    if (isContactPage || activePost) {
      window.location.assign("/#categories");
      return;
    }
    showCategories();
  }

  if (isContactPage || path === "/contact/") {
    return (
      <>
        <ContactPage />
        <NavRail
          journalHref="/"
          onSearch={focusSearchFromOtherPage}
          categories={categories}
          categoryMenuOpen={categoryMenuOpen}
          onToggleCategories={categoriesFromOtherPage}
          onSelectCategory={(category) => window.location.assign(`/#categories-${category.toLowerCase().replace(/\s/g, "-")}`)}
          isDarkTheme={isDarkTheme}
          onToggleTheme={() => setIsDarkTheme((current) => !current)}
        />
      </>
    );
  }

  if (path.startsWith("/posts/")) {
    return (
      <>
        {!activePost ? (
          <main className="not-found">
            <h1>Story not found</h1>
            <a href="/">Back to the journal</a>
          </main>
        ) : articleResult.status === "error" ? (
          <main className="not-found">
            <h1>Article content unavailable</h1>
            <a href="/">Back to the journal</a>
          </main>
        ) : articleResult.status !== "ready" ? (
          <main className="post-loading" aria-live="polite">
            Loading journal entry…
          </main>
        ) : (
          <Suspense
            fallback={
              <main className="post-loading" aria-live="polite">
                Loading journal entry…
              </main>
            }
          >
            <PostPage post={activePost} article={articleResult.article} />
          </Suspense>
        )}
        <NavRail
          journalHref="/"
          onSearch={focusSearchFromOtherPage}
          categories={categories}
          categoryMenuOpen={categoryMenuOpen}
          onToggleCategories={categoriesFromOtherPage}
          onSelectCategory={(category) => window.location.assign(`/#categories-${category.toLowerCase().replace(/\s/g, "-")}`)}
          isDarkTheme={isDarkTheme}
          onToggleTheme={() => setIsDarkTheme((current) => !current)}
        />
      </>
    );
  }

  return (
    <>
      <div className="page-shell" id="top">
        <header className="masthead">
          <div className="masthead-meta">
            <span>Field notes · Stories · Small adventures</span>
            <span>By Vidhi Aggarwal</span>
          </div>
          <div className="masthead-row">
            <h1 className="journal-title">Journal</h1>
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

        <main className="content-grid" id="journal">
          <section className="post-column" aria-label="Journal posts">
            {showFeatured && (
              <PoemFeature />
            )}

            <div className="section-heading">
              <h2>{activeCategory === "All posts" ? "All posts" : activeCategory}</h2>
              <span className="post-count">
                {searchTerm || activeCategory !== "All posts"
                  ? `${visiblePosts.length} ${visiblePosts.length === 1 ? "story" : "stories"}`
                  : "35 dispatches"}
              </span>
            </div>

            <div className="post-grid">
              {visiblePosts.length > 0 ? (
                visiblePosts.map((post) => (
                  <PostCard
                    key={post.title}
                    post={post}
                  />
                ))
              ) : (
                <p className="empty-state">
                  No stories found. Try another title or category.
                </p>
              )}
            </div>
          </section>

          <aside className="sidebar" aria-label="About this journal">
            <JournalContactCard />
            <label className="search-box" id="search">
              <Search size={18} aria-hidden="true" />
              <input
                ref={searchRef}
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search journal entries"
                aria-label="Search journal entries"
              />
            </label>

            <section className="side-section" ref={categoryRef} id="categories">
              <h3>Browse by category</h3>
              <div className="category-list">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`category-chip ${activeCategory === category ? "active" : ""}`}
                    type="button"
                    onClick={() => selectCategory(category)}
                    aria-pressed={activeCategory === category}
                    id={`categories-${category.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </section>

            <section className="side-section">
              <h3>From the journal</h3>
              {posts.slice(1, 5).map((post, index) => (
                <a
                  className="sidebar-link"
                  href={getPostPath(post)}
                  key={post.title}
                >
                  <span>{post.title}</span>
                  <span>0{index + 1}</span>
                </a>
              ))}
            </section>

          </aside>
        </main>

        <footer className="site-footer">
          <strong>The Warrior Wizard Girl</strong>
          <span>35 dispatches · Stories from here and there</span>
          <a
            className="inline-flex items-center gap-1.5 text-ink no-underline hover:text-scarlet"
            href="https://thewarriorwizardgirl.com/"
            target="_blank"
            rel="noreferrer"
          >
            Visit my corner of the web <ArrowRight size={13} aria-hidden="true" />
          </a>
        </footer>
      </div>

      <NavRail
        onSearch={focusSearchFromOtherPage}
        categories={categories}
        categoryMenuOpen={categoryMenuOpen}
        onToggleCategories={showCategories}
        onSelectCategory={selectCategory}
        isDarkTheme={isDarkTheme}
        onToggleTheme={() => setIsDarkTheme((current) => !current)}
      />
    </>
  );
}

function getPostSlug(post: Pick<(typeof posts)[number], "title">) {
  return post.title
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "-");
}
