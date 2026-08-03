# Joanne's World

A simple static blog. Plain HTML/CSS, no build step.

## Structure

- `index.html` — home page, lists all posts
- `about.html` — about page
- `posts/` — one HTML file per post
- `css/style.css` — shared styling (supports light/dark mode automatically)

## Adding a new post

1. Copy `posts/hello-world.html` to `posts/your-post-slug.html`.
2. Update the `<title>`, `<h1>`, date, and body content.
3. Add a matching `<li>` entry to the `post-list` in `index.html`, linking to your new file.

## Running locally

No build tools needed — open `index.html` directly in a browser, or serve the folder:

```
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploying

This is a static site, so it works as-is on GitHub Pages, Netlify, Vercel, or any static host. For GitHub Pages: enable Pages in the repo settings and point it at the `main` branch root.
