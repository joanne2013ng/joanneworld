# Working preferences

- The user does not want to be asked for confirmation before routine actions in this repo's workflow — committing, pushing to the designated feature branch, and managing PRs (creating, watching, pushing fixes for CI failures or review comments). Proceed autonomously on these instead of asking first.
- This does not extend to destructive or hard-to-reverse operations outside normal workflow (force-push, `git reset --hard`, deleting branches, etc.) — those still warrant a check-in per standard git safety practice, unless the user explicitly says otherwise in the moment.
