# @orbital/web

**The public Orbital site** — landing page, documentation, and live testnet demos. Built with Next.js 16, Tailwind CSS, and Framer Motion.

## Running locally

```bash
pnpm install
pnpm --filter orbital/web dev
```

The site runs on `http://localhost:3000`.

## Structure

| Path | Purpose |
|---|---|
| `app/` | Next.js App Router pages and layouts |
| `components/` | Reusable UI components |
| `content/` | Markdown-sourced content (docs, blog posts) rendered via `gray-matter` + `marked` |
| `lib/` | Utilities — content loaders, formatters, config |

## Content authoring

Documentation pages are authored in Markdown under `content/`. Frontmatter is parsed by `gray-matter`; body is rendered by `marked`. Add a new page by dropping a new `.md` file into the appropriate `content/` subdirectory — the route is inferred from the filename.

## Styling

Tailwind CSS 4 is configured in `tailwind.config.ts`. Use utility classes directly; avoid authoring bespoke CSS modules. Design tokens (color palette, typography scale) are defined in the Tailwind config.

## Deployment

The site is deployed via Vercel from the `main` branch. Preview deploys run automatically on pull requests.

## Contributing

Content corrections, typo fixes, and new tutorial pages are welcome. For larger changes (new sections, design overhauls) open an issue first — the design system is intentionally constrained.

## License

MIT
