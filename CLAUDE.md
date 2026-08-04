# Joanne's World — CLAUDE.md

## How Claude Should Work Here
- **No approval needed.** Don't ask "can I?" or "should I proceed?" before making changes to this blog — just do it, commit, and push. This includes structural/design decisions (new posts, layout, nav changes).
- **Commit and push immediately** after every change (`git add`, `git commit`, `git push origin main`). No PRs needed for routine changes.
- **Deploys:** this is a static site (plain HTML/CSS, no build step) hosted on Vercel, auto-deploying from `main`. Pushing to `main` is the deploy step — no separate manual "deploy" action needed, and no need to pause for confirmation before a routine push-triggered deploy.
- **Never store secrets** (API keys, tokens) in this repo or in chat.

## Site
- Static blog: `index.html` (home, lists posts), `about.html`, `posts/*.html` (one file per post), `css/style.css` (shared styling, light/dark mode).
- Repo: `joanne2013ng/joanneworld`, branch `main`.

## Adding a New Post
1. Copy `posts/hello-world.html` to `posts/your-post-slug.html`.
2. Update `<title>`, `<h1>`, date, and body content.
3. Add a matching `<li>` entry to `post-list` in `index.html`.
4. Commit and push per the rule above — no need to ask first.
