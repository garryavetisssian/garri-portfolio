#!/bin/bash
# Auto-deploy: at the end of each Claude turn, commit any pending changes
# and push to origin/main. Vercel's Git integration handles the deploy
# to garri-portfolio.vercel.app.
#
# Safe by design:
#   - exits silently if no origin remote is configured
#   - exits silently if there's nothing to commit or push
#   - never blocks Claude (always exits 0)

cd "$(git rev-parse --show-toplevel 2>/dev/null)" || exit 0

# Need an origin remote
git remote get-url origin >/dev/null 2>&1 || {
  echo "[auto-deploy] no origin remote configured; skip" >&2
  exit 0
}

# Determine push branch (defaults to current branch, fallback main)
branch="$(git symbolic-ref --short HEAD 2>/dev/null)"
branch="${branch:-main}"

# Stage everything
git add -A 2>/dev/null

# Commit if there's anything staged
if ! git diff --cached --quiet; then
  msg="auto-deploy: $(date '+%Y-%m-%d %H:%M:%S')"
  git -c user.name="Claude (auto-deploy)" \
      -c user.email="noreply@anthropic.com" \
      commit -m "$msg" >/dev/null 2>&1 \
    && echo "[auto-deploy] committed pending changes" >&2
fi

# Push if there's anything ahead of upstream
ahead=$(git log "@{u}..HEAD" --oneline 2>/dev/null | wc -l | tr -d ' ')
if [ "$ahead" -gt 0 ] 2>/dev/null; then
  if git push origin "$branch" >/dev/null 2>&1; then
    echo "[auto-deploy] pushed $ahead commit(s) → Vercel deploying" >&2
  else
    echo "[auto-deploy] push failed (check 'git push' manually)" >&2
  fi
elif [ -z "$(git rev-parse --abbrev-ref --symbolic-full-name @{u} 2>/dev/null)" ]; then
  # No upstream set — first push
  if git push -u origin "$branch" >/dev/null 2>&1; then
    echo "[auto-deploy] first push → Vercel deploying" >&2
  else
    echo "[auto-deploy] first push failed (set upstream manually)" >&2
  fi
fi

exit 0
