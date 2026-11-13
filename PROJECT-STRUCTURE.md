# Project structure

This is a React + TypeScript journal app built with Vite. The posts archive,
individual post pages, contact page, and shared visual components live in
`src/`. Original article text and media are stored locally where possible.

```text
.
├── index.html                  # HTML entry point
├── public/
│   ├── _redirects              # Netlify SPA route fallback
│   └── post-images/            # Local post photos and video
├── src/
│   ├── App.tsx                 # Route selection, archive, search, categories
│   ├── main.tsx                # React application entry point
│   ├── types.ts                # Shared TypeScript data types
│   ├── components/
│   │   ├── BrandMark.tsx       # Portfolio logo
│   │   ├── ContactPage.tsx     # Contact details and return-to-journal link
│   │   ├── JournalContactCard.tsx # Reusable owl, message, and contact link
│   │   ├── NavRail.tsx         # Fixed journal navigation
│   │   ├── OwlIllustration.tsx # Reusable inline owl SVG
│   │   ├── PoemFeature.tsx     # Homepage poem feature
│   │   ├── PostCard.tsx        # Archive card
│   │   ├── PostContent.tsx     # Sanitized Markdown article renderer
│   │   └── PostPage.tsx        # Individual article page
│   ├── data/
│   │   ├── posts.ts            # Archive card data and URL slug helper
│   │   ├── postPreviews.json   # Optional local cover media by post slug
│   │   └── posts/
│   │       ├── README.md       # Instructions for adding posts
│   │       └── <post-slug>.json # One full article per file (35 currently)
│   └── styles/
│       ├── fonts.css           # Font imports
│       ├── index.css           # Components, layout, and responsive styles
│       └── theme.css           # Theme colors and CSS variables
├── package.json                # Scripts and dependencies
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── vite.config.js
```

## Useful commands

- `npm run dev` starts the local Vite development server.
- `npm run typecheck` runs TypeScript without emitting files.
- `npm run build` type-checks and creates the production site in `dist/`.
- `npm run preview` serves the production build locally.

## Adding a journal post

1. Add the archive-card metadata to `src/data/posts.ts`.
2. Create `src/data/posts/<slug>.json` for the full article. The filename must
   match the slug generated from the archive post title.
3. Add optional cover-image/video paths to `src/data/postPreviews.json`. Local
   media should be placed in `public/post-images/` and referenced with a
   `/post-images/...` URL.
4. Run `npm run build` to validate types and the production bundle.

Post routes use `/posts/<slug>`. Contact uses `/contact`. Netlify's
`public/_redirects` sends app routes to the SPA entry point so direct links and
refreshes can be handled by the client app.
