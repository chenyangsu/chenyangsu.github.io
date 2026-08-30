# Blog

Hand-written static HTML, same as the rest of this site. No Jekyll front matter, no build
step, no dependencies.

```
blog/
├── index.html          the post index (the list readers land on)
├── feed.xml            RSS feed — add one <item> per post
├── _template/
│   └── index.html      copy this to start a post
└── <post-slug>/
    └── index.html      one post, plus any figures it uses
```

Styling lives in `/assets/blog.css`, which is loaded after `/assets/main.css` and reuses its
design tokens. Light mode, dark mode and the theme toggle therefore work on blog pages with
no extra work — never hardcode a colour in a post, use the variables.

## Publishing a post

1. **Copy the template.**

   ```bash
   cp -r blog/_template blog/what-the-eval-actually-measured
   ```

   The slug becomes the URL: `chenyangsu.github.io/blog/what-the-eval-actually-measured/`.
   Lower case, hyphens, no dates in the slug.

2. **Edit the head block.** Everything between the two `EDIT EVERYTHING IN THIS BLOCK` comments:
   title, description, canonical URL, the three `og:` / `twitter:` fields,
   `article:published_time`, and the same values again in the JSON-LD script.
   **Delete the `<meta name="robots" content="noindex, nofollow">` line** — it is there to keep
   the template itself out of search results.

3. **Write the post.** Replace everything inside `<div class="prose">`. The template is a
   specimen of every available element: headings, lists, block quote, boxes, figures with
   captions, code blocks, tables, and footnotes. Delete what you do not use.

   **Boxes.** `<div class="takeaways">` is the summary panel that sits above the body, at most
   one per post. `<div class="callout">` is an inline box in four colours, and the colour
   carries meaning, so keep the mapping consistent across posts:

   | Class | Colour | Use it for |
   |---|---|---|
   | `callout` | blue | states a limit, or a question to carry forward |
   | `callout callout-note` | gold | defines a term, a threshold, or the key idea |
   | `callout callout-warn` | red | a caveat, or a dated correction to a published post |
   | `callout callout-good` | green | the rule to remember, or the thing to do |

   Two or three inline boxes per post. More and they stop standing out.

   Reading time is computed at page load from the real word count — leave
   `<span data-reading-time>` alone rather than typing a number.

4. **Add it to the index.** In `blog/index.html`, copy the example `<li>` block to the **top**
   of `<ul class="post-list">` and update the date, reading time, title, `href`, summary and
   tags. On the first post, also remove `hidden` from `<ul class="post-list">` and delete the
   `<div class="blog-empty">` block above it.

5. **Add it to the home page.** `index.html` has a `<section id="blog">` before Contact that
   carries the three most recent posts. Copy the same `<li>` in at the top, change its `<h2>`
   to `<h3>` (the section already owns the h2), and drop the oldest entry.

6. **Add it to `sitemap.xml` and `blog/feed.xml`.** Both files carry a commented-out block
   showing the exact shape. `pubDate` in the feed is RFC-822
   (`Sun, 30 Aug 2026 12:00:00 +0000`).

7. **Preview, then push.**

   ```bash
   python3 -m http.server 8080     # from the repo root
   # http://localhost:8080/blog/
   ```

   Check it in both themes and at phone width before pushing. GitHub Pages serves the change
   within about a minute.

## Figures

Put them in the post's own folder (`blog/<slug>/figure-1.png`) so a post stays
self-contained. Every figure needs alt text and a caption stating what is plotted, in what
units, and on how many observations.

## Two things to know

- **`_template/` is not published.** GitHub Pages runs Jekyll, which skips any directory
  starting with `_`. That is deliberate — the template is a working copy, not a page. Preview
  it with the local server above.
- **Corrections go in the post, not over it.** If something turns out to be wrong, add a dated
  `<div class="callout callout-warn">` rather than quietly editing the text.
