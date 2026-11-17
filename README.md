# Raj Tanishq's portfolio

A personal portfolio site in plain HTML, CSS and JavaScript, published with GitHub Pages.
There is nothing to install: no packages, no framework, no third-party requests.

## Where things live

| To change this | Edit this |
| --- | --- |
| Intro, About, Experience, Internships, Skills, Education, Contact | `index.html` |
| A project | `content/projects/<name>.md` |
| A blog post | `content/blog/<name>.md` |
| Colours, type sizes, spacing | `assets/site.css` (the tokens at the top) |
| Filters, project pages, menu, contact form | `assets/site.js` |

`content/site-content.js` is generated from the Markdown files. Don't edit it by hand.

## Preview on your computer

Open `index.html` in a browser. That's all it needs.

After you add or change anything in `content/`, rebuild the content file and refresh:

```sh
node scripts/build.js           # once
node scripts/build.js --watch   # or keep rebuilding as you edit
```

## Add or edit a project

Each project is one file in `content/projects/`. The file name becomes the address,
so `prism-ui.md` opens at `#project-prism-ui`. Use lowercase letters, numbers and hyphens.

```md
---
title: Prism UI
subtitle: Accessible React Component Library & Design System
summary: One sentence shown at the top of the project page.
start: 2026-08
end: 2026-11
order: 1
tags: [UX engineering, Accessibility]
---

- A point about the work. **Bold** marks a measured result.
- Another point. Anything Markdown can do works here: headings, images, links, tables.
```

| Field | Notes |
| --- | --- |
| `title` | Required. |
| `subtitle` | Optional. Shown under the title in the list and on the project page. |
| `summary` | One sentence. Shown on the project page, and in the list when there is no subtitle. |
| `start`, `end` | Year and month, like `2026-08`. `end` can be `present`. |
| `order` | Position in the list. Lower numbers come first. |
| `tags` | The disciplines. The filter buttons above the list are built from these. |
| `draft: true` | Keeps the file out of the site. |

## Write a blog post

The Blog section and its menu link stay hidden until `content/blog/` has a published post.

```md
---
title: What a severity rating is for
date: 2026-11-20
tags: [UX research]
summary: Optional. Without it, the opening lines of the post are used.
image: assets/some-image.png
image_alt: What the image shows.
---

Write the post in Markdown.
```

`title` and `date` are required. Posts are listed newest first. `draft: true` hides a post.

## Publish

Push to `main`. The workflow in `.github/workflows/deploy.yml` rebuilds the content file,
runs the checks and deploys. One-time setup: in the repository's settings, under
**Pages > Build and deployment**, set **Source** to **GitHub Actions**.

## Check before you push

```sh
node scripts/check.js
```

It reports content files with missing or malformed fields, a content file that is out of date,
links on the page that go nowhere, and files the page needs that are missing.
The deploy runs the same checks and stops if any fail.

## Dark mode and the dyslexia-friendly font

The two buttons at the top right switch between dark and light, and turn the OpenDyslexic
font on or off. The site opens dark; a visitor's choices are remembered in their browser.
The colours for each theme are the tokens at the top of `assets/site.css`. To open light
by default instead, change `data-theme="dark"` to `data-theme="light"` on the `<html>` tag
in `index.html`.

## Contact form

The site has no server, so the form opens a draft in the visitor's own email app.
The address comes from the form's `action` in `index.html`.

## Blog likes (optional, off by default)

Posts can show a Like button backed by a Firebase Realtime Database. To turn it on,
create your own Firebase project, then paste its web config into `FIREBASE_CONFIG`
at the top of `assets/site.js`. Counts are stored under `blog-likes/<post name>/count`.
While `FIREBASE_CONFIG` is `null`, no button is shown and nothing is loaded from Firebase.

## Credits and licences

- Site code: MIT, see `LICENSE`.
- Typefaces: Crimson Text, IBM Plex Mono and OpenDyslexic, SIL Open Font License 1.1. Licence texts are in `assets/fonts/`.
- Markdown is converted at build time by [marked](https://github.com/markedjs/marked) (MIT), kept in `scripts/vendor/`.
