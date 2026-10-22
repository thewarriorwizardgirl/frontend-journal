# Journal posts

Each published article lives in its own JSON file named after its URL slug, for
example `a-drive-to-the-mountains.json`. This keeps long article content and its
metadata separate from other posts.

To add a post:

1. Create a `<slug>.json` file here with the article fields used by existing
   files: `title`, `category`, `tags`, `publishedAt`, `location`, `content`, and
   any optional subtitle, update date, reading-time, or cover-media fields.
2. Add its archive-card entry to `../posts.ts` and, if needed, its cover media
   to `../postPreviews.json`.

The article file is loaded on its post page by matching its filename to the
post's URL slug.
