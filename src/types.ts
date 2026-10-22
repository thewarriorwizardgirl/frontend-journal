export type PostCategory = "Travel" | "Life" | "Stories" | "Poetry";

export type Post = {
  title: string;
  category: PostCategory;
  readTime: string;
  views: string;
  image: string;
  date: string;
  excerpt: string;
};

export type Article = {
  title: string;
  subtitle?: string;
  excerpt: string;
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  location?: string;
  readingTimeMinutes?: string;
  wordCount?: string | null;
  coverImage?: string;
  coverVideo?: string;
  content: string;
};
