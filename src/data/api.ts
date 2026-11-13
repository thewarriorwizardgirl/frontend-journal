import type { PublishedPost } from "../types";

const API_URL = (import.meta.env.VITE_API_URL ?? "http://localhost:4000")
  .replace(/\/$/, "");

type PostListResponse = {
  posts: PublishedPost[];
  total: number;
  page: number;
  pages: number;
};

async function getJson<T>(path: string, signal?: AbortSignal): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      signal,
      headers: { Accept: "application/json" },
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") throw error;
    throw new Error(`Could not connect to the journal API at ${API_URL}.`);
  }

  if (!response.ok) {
    let message = `The journal API returned ${response.status}.`;
    try {
      const body = (await response.json()) as { error?: string };
      if (body.error) message = body.error;
    } catch {
      // Keep the HTTP status message for non-JSON API responses.
    }
    const error = new Error(message) as Error & { status?: number };
    error.status = response.status;
    throw error;
  }
  return response.json() as Promise<T>;
}

export async function fetchPublishedPosts(
  signal?: AbortSignal,
): Promise<PublishedPost[]> {
  const firstPage = await getJson<PostListResponse>(
    "/api/posts?page=1&limit=100",
    signal,
  );
  if (firstPage.pages <= 1) return firstPage.posts;

  const remainingPages = await Promise.all(
    Array.from({ length: firstPage.pages - 1 }, (_, index) =>
      getJson<PostListResponse>(
        `/api/posts?page=${index + 2}&limit=100`,
        signal,
      ),
    ),
  );
  return [firstPage, ...remainingPages].flatMap((page) => page.posts);
}

export function fetchPublishedPost(
  slug: string,
  signal?: AbortSignal,
): Promise<PublishedPost> {
  return getJson(`/api/posts/${encodeURIComponent(slug)}`, signal);
}
