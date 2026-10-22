import React from "react";
import {
  ArrowUpRight,
  BookOpen,
  Mail,
  Moon,
  Search,
  Sun,
  Tags,
} from "lucide-react";
import type { Category } from "../data/posts";

type NavRailProps = {
  journalHref?: string;
  onSearch: () => void;
  categories: readonly Category[];
  categoryMenuOpen: boolean;
  onToggleCategories: () => void;
  onSelectCategory: (category: Category) => void;
  isDarkTheme: boolean;
  onToggleTheme: () => void;
};

export default function NavRail({
  journalHref = "#journal",
  onSearch,
  categories,
  categoryMenuOpen,
  onToggleCategories,
  onSelectCategory,
  isDarkTheme,
  onToggleTheme,
}: NavRailProps) {
  return (
    <aside className="nav-rail" aria-label="Journal quick navigation">
      <nav className="rail-nav">
        <a className="rail-item" href={journalHref} aria-label="Journal posts">
          <BookOpen aria-hidden="true" />
          <span className="rail-label">Journal</span>
        </a>
        <button
          className="rail-item"
          type="button"
          onClick={onToggleCategories}
          aria-label="Browse categories"
          aria-expanded={categoryMenuOpen}
        >
          <Tags aria-hidden="true" />
          <span className="rail-label">Categories</span>
        </button>
        {categoryMenuOpen && (
          <div className="rail-category-menu" aria-label="Choose a category">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => onSelectCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        )}
        <button
          className="rail-item"
          type="button"
          onClick={onSearch}
          aria-label="Search journal"
        >
          <Search aria-hidden="true" />
          <span className="rail-label">Search</span>
        </button>
        <button
          className="rail-item"
          type="button"
          onClick={onToggleTheme}
          aria-label={`Switch to ${isDarkTheme ? "light" : "dark"} theme`}
          aria-pressed={isDarkTheme}
        >
          {isDarkTheme ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
          <span className="rail-label">
            {isDarkTheme ? "Light theme" : "Dark theme"}
          </span>
        </button>
        <span className="rail-divider" aria-hidden="true" />
        <a className="rail-item" href="/contact" aria-label="Contact Vidhi">
          <Mail aria-hidden="true" />
          <span className="rail-label">Contact me</span>
        </a>
        <a
          className="rail-item"
          href="https://thewarriorwizardgirl.com/"
          target="_blank"
          rel="noreferrer"
          aria-label="Visit The Warrior Wizard Girl website"
        >
          <ArrowUpRight aria-hidden="true" />
          <span className="rail-label">Portfolio</span>
        </a>
      </nav>
    </aside>
  );
}
