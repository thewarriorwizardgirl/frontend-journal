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
import { fetchPublishedPost, fetchPublishedPosts } from "./data/api";
import { categories, getPostPath } from "./data/posts";
import type { Category } from "./data/posts";
import type { PublishedPost } from "./types";

const PostPage = lazy(() => import("./components/PostPage"));

type ArticleState =
  | { slug: null | string; status: "idle" | "loading"; post: null }
  | { slug: string; status: "error"; post: null; message: string; notFound: boolean }
  | { slug: string; status: "ready"; post: PublishedPost };

export default function App() {
  const path = window.location.pathname;
  const isContactPage = path === "/contact" || path === "/contact/";
  const activeSlug = path.startsWith("/posts/") ? path.split("/")[2] : null;
  const [posts, setPosts] = useState<PublishedPost[]>([]);
  const [postsStatus, setPostsStatus] = useState<"loading" | "ready" | "error">("loading");
  const [postsError, setPostsError] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("All posts");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [articleState, setArticleState] = useState<ArticleState>({
    slug: null,
    status: "idle",
    post: null,
  });
  const searchRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLElement>(null);
  const showFeatured = activeCategory === "All posts" && !searchTerm.trim();
  const articleResult: ArticleState =
    activeSlug && articleState.slug === activeSlug
      ? articleState
      : { slug: activeSlug, status: "loading", post: null };
  const activePost =
    articleResult.status === "ready" ? articleResult.post : null;

  useEffect(() => {
    const controller = new AbortController();
    fetchPublishedPosts(controller.signal)
      .then((loadedPosts) => {
        setPosts(loadedPosts);
        setPostsStatus("ready");
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setPostsError(error instanceof Error ? error.message : "Could not load journal posts.");
        setPostsStatus("error");
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = isDarkTheme ? "dark" : "light";
    document.title = isContactPage
      ? "Contact — The Warrior Wizard Girl"
      : activePost
        ? `${activePost.title} — The Warrior Wizard Girl`
        : "Journal — The Warrior Wizard Girl";
  }, [isDarkTheme, isContactPage, activePost?.title]);

  useEffect(() => {
    if (!activeSlug) {
      setArticleState({ slug: null, status: "idle", post: null });
      return undefined;
    }

    const controller = new AbortController();
    setArticleState({ slug: activeSlug, status: "loading", post: null });
    fetchPublishedPost(activeSlug, controller.signal)
      .then((post) => {
        setArticleState({ slug: activeSlug, status: "ready", post });
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        const notFound =
          typeof error === "object" &&
          error !== null &&
          "status" in error &&
          error.status === 404;
        setArticleState({
          slug: activeSlug,
          status: "error",
          post: null,
          notFound,
          message: error instanceof Error ? error.message : "Could not load this story.",
        });
      });

    return () => controller.abort();
  }, [activeSlug]);

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
    return posts.filter((post) => {
      const matchesCategory =
        activeCategory === "All posts" || post.category === activeCategory;
      const matchesSearch =
        !query ||
        `${post.title} ${post.category} ${post.excerpt} ${post.tags.join(" ")}`
          .toLowerCase()
          .includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [posts, activeCategory, searchTerm]);

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
        {articleResult.status === "error" && articleResult.notFound ? (
          <main className="not-found">
            <h1>Story not found</h1>
            <a href="/">Back to the journal</a>
          </main>
        ) : articleResult.status === "error" ? (
          <main className="not-found">
            <h1>Story unavailable</h1>
            <p>{articleResult.message}</p>
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
            <PostPage post={articleResult.post} relatedPosts={posts} />
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
                  : postsStatus === "loading"
                    ? "Loading stories"
                    : `${posts.length} dispatches`}
              </span>
            </div>

            <div className="post-grid">
              {postsStatus === "loading" ? (
                <p className="post-loading" aria-live="polite">Gathering stories from the journal…</p>
              ) : postsStatus === "error" ? (
                <div className="journal-api-error" role="alert">
                  <h3>Journal posts are unavailable</h3>
                  <p>{postsError}</p>
                  <button
                    type="button"
                    onClick={() => window.location.reload()}
                  >
                    Try again
                  </button>
                </div>
              ) : visiblePosts.length > 0 ? (
                visiblePosts.map((post) => (
                  <PostCard
                    key={post._id}
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
                  key={post._id}
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
          <span>{posts.length} dispatches · Stories from here and there</span>
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
