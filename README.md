# Noman Ejaz — Portfolio

Personal portfolio and project case-study site for **Noman Ejaz**, a full stack software
engineer based in Islamabad, Pakistan. Built with Next.js App Router, MDX and the Once UI design
system, with SEO as a first-class concern rather than an afterthought.

Live: [nomanejz.vercel.app](https://nomanejz.vercel.app)

## Why this site is structured this way

The site exists to rank and to convert. Every structural decision below serves one of those two
goals.

| Decision | Reason |
| --- | --- |
| One page per intent | `/` (brand + overview), `/services` (hire intent), `/work` (project browsing), `/work/[slug]` (long-tail technology keywords), `/about` (author credibility / E-E-A-T) |
| `Person` JSON-LD on every page | Connects the site to a real, verifiable human — the prerequisite for ranking on name-based and "hire a developer" queries |
| `CreativeWork` per project | Projects are work products, not blog posts. Correct structured data is what qualifies them for project and stack keywords |
| `FAQPage` on `/about` and `/services` | Eligible for rich results and covers long-tail questions that would otherwise never appear in the copy |
| Canonical + `metadataBase` on every route | Prevents duplicate-content signals from ever reaching Google |
| Self-referencing canonical URLs | Built by one helper (`src/utils/seo.ts`) so no page can ship a half-configured metadata block |
| `BasePageConfig.keywords` | Keeps target keywords next to the copy they describe, where they are actually maintained |
| No blog, no gallery | Thin and duplicate template content was the largest ranking liability. Removed rather than left to be indexed |

## Structure

```
src/
├── app/
│   ├── layout.tsx           # site-wide metadata, theme bootstrap
│   ├── page.tsx             # home: hero, capabilities, stats, featured work
│   ├── about/page.tsx       # bio, experience, skills, FAQ
│   ├── services/page.tsx    # service groups, process, FAQ, CTA
│   ├── work/page.tsx        # all projects + technology index
│   ├── work/[slug]/page.tsx # case study
│   ├── sitemap.ts           # priority + changeFrequency per route
│   ├── robots.ts
│   ├── manifest.ts
│   ├── icon.svg
│   ├── not-found.tsx
│   ├── work/projects/*.mdx  # case studies (content lives here)
│   └── api/og/generate/     # dynamic social card
├── components/
│   ├── JsonLd.tsx           # structured data renderer
│   ├── ProjectCard.tsx
│   ├── work/Projects.tsx    # sorted project list
│   └── mdx.tsx              # MDX component map
├── resources/
│   ├── content.tsx          # ALL site copy and page config
│   ├── once-ui.config.ts    # domain, routes, fonts, style tokens
│   └── icons.ts
└── utils/
    ├── seo.ts               # buildMetadata() — canonical, OG, keywords
    ├── schema.ts            # JSON-LD node builders
    ├── utils.ts             # MDX frontmatter reader
    └── formatDate.ts
```

## Adding a project

Create `src/app/work/projects/<slug>.mdx`. Frontmatter is the contract:

```yaml
---
title: "Project Name"
summary: "One or two sentences. This becomes the meta description and the card pitch."
publishedAt: "2025-11-10"
role: "Full Stack Developer"
category: "Web application"
tags: ["Django", "FastAPI", "PostgreSQL"]   # shown as tags, feeds programmingLanguage schema
keywords: ["django rest api project", "..."] # long-tail phrases this page targets
image: "/images/projects/my-project/cover-01.png" # OG image + page hero
images: ["/images/projects/my-project/cover-01.png", ...]
link: "https://example.com"   # optional live deployment
repo: "https://github.com/..." # optional source
---
```

Then write the body using these sections: **The problem**, **What I built**, **Tech stack**
(as a table), **Challenges and learnings**, **Outcome**. Consistency here is deliberate — it is
what makes the page worth reading, and the "problems and learnings" framing is the part that
signals real engineering experience rather than marketing copy.

Screenshots go in `public/images/projects/<project-name>/`.

## Changing site copy

All copy lives in `src/resources/content.tsx`. Adding a service, FAQ entry or skill group is a
data change, not a code change. Update `keywords` alongside the copy so the two never drift.

## Before deploying

1. **Set the real domain.** `src/resources/once-ui.config.ts` → `baseURL`. If you move off the
   `vercel.app` domain to a real domain, change it there — every canonical URL, sitemap entry and
   JSON-LD `@id` derives from it.
2. **Add Search Console verification** to `metadata.verification` in `src/app/layout.tsx`.
3. **Replace `src/app/icon.svg`** if the monogram is not what you want.
4. **Compress screenshots.** The project PNGs are large; they are served through the Next image
   optimiser, but smaller source files build faster.
5. Submit `https://<domain>/sitemap.xml` to Google Search Console.

## Commands

```
npm install
npm run dev        # local dev server
npm run typecheck  # tsc --noEmit
npm run lint       # biome check
npm run build      # production build
```

## Credits

Built on [Magic Portfolio](https://github.com/once-ui-system/magic-portfolio) by Lorant One, which
in turn uses the [Once UI](https://once-ui.com) design system by [Ora Studio](https://orastudio.com).
The Once UI component library is MIT licensed.

This repository remains under the original **CC BY-NC 4.0** licence — see `LICENSE`. The design
system, MDX content structure and page scaffolding originate from the template; the content,
copy, structured data and SEO implementation are original to this site.
