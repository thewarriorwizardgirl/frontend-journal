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

export type MediaReference = {
  url: string;
  publicId?: string;
};

export type PublishedPost = {
  _id: string;
  title: string;
  slug: string;
  subtitle?: string;
  excerpt: string;
  category: PostCategory;
  tags: string[];
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  location?: string;
  readingTimeMinutes?: number | null;
  wordCount?: number | null;
  coverImage?: MediaReference | null;
  coverVideo?: MediaReference | null;
  content: string;
  views: number;
};
