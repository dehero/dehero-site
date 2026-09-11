# dehero.site

Source code for personal site of Anton Kuryanov, aka dehero:

- [English version](https://dehero.site)
- [Russian version](https://dehero.ru)

The site contains a personal profile and pages about projects, communities, software, photography, and other work.

## Stack

- [Astro 7](https://astro.build/) with static production builds
- MDX with GitHub Flavored Markdown
- TypeScript with Astro's strictest configuration
- Prettier with `prettier-plugin-astro`

## Development

Requirements: Node.js 20 or newer and npm.

Install dependencies:

```sh
npm ci
```

Start the development server:

```sh
npm start
```

English is used by default. Add `?language=ru` to a local URL to view the Russian version, for example:

```text
http://localhost:4321/?language=ru
```

Run the type checks and both production builds:

```sh
npm run check
npm run build
LANGUAGE=ru npm run build
```

Preview the latest build with `npm run preview`. Format source and content files with `npm run prettify`.

## Content

Content pages are MDX files in `docs/`. The root document is rendered at `/`. Every other document is rendered at a
root-level URL based on its filename:

```text
docs/mwscr.mdx       -> /mwscr/
docs/moddersmuse.mdx -> /moddersmuse/
```

Documents may contain separate English and Russian sections:

```mdx
<Content lang="en">

# English title

English text.

</Content>

<Content lang="ru">

# Русский заголовок

Русский текст.

</Content>
```

`<Content>` displays only the section for the active language. A document without language sections is shared by both
versions. The first level-one heading is used as the page title and index-card title.

Supported frontmatter fields are `description`, `metaTitle`, `metaDescription`, `started`, `published`, `finished`,
`links`, `icon`, and `updateFrequency`. All fields are optional. Descriptions and metadata can be strings or language
objects with `en` and `ru` values.

The root page lists all documents except `index`, ordered by `updateFrequency`, start date, and document ID. Links are
grouped when their services are recognised by `src/entities/services.ts`.

## Assets

Store images used by a document next to it in `docs/images/` and reference them with relative Markdown paths. Files in
`public/` are copied to the site root unchanged. For example, `public/files/example.zip` is available at
`/files/example.zip`.

## Content Model

`dehero.site` is the permanent index of significant projects, works, documents,
and other materials. Materials use root-level URLs without mandatory category
prefixes, for example:

```text
/mwscr/
/moddersmuse/
/highlights/
```

A material can grow from a small work into a project, become archived, or get
its own site without changing its `dehero.site` URL. Types, dates, tags, and
relationships are presentation metadata, not restrictions on what a material
can become.

## Site Roles

- `dehero.site` — permanent pages for significant materials and the index that
  connects them.
- `highlights.dehero.site` — planned dedicated site for Dehero Highlights, a
  chronological microblog with announcements, project updates, process notes,
  thoughts, and impressions.
- Project subdomains, such as `mwscr.dehero.site` — independent products with
  their own native content.

The `/highlights/` page already exists on the main site as the permanent page
for Dehero Highlights. It can later link to the dedicated subdomain.

## Publishing Works

Use this rule when publishing new work:

1. If it naturally belongs to an independent project site, publish the
   canonical result there.
2. Otherwise, publish it as a permanent root-level page on `dehero.site`.
3. Announce every newly published work page or project-site result in Dehero
   Highlights, linking to its canonical location.

Highlights entries do not need a corresponding page on `dehero.site`. They may
remain short, time-bound posts about work in progress, minor updates, thoughts,
personal events, or impressions.

For work related to a project without its own subdomain, both pages stay at the
root of `dehero.site` and link to one another:

```text
/project/
/project-related-work/
```
