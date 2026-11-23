# KinShow

KinShow is a tested vertical-slice prototype for turning approved family memories into a host-ready milestone game show. The demo lets an organizer approve source stories, choose a format, generate deterministic rounds, switch to a large-type host view, and complete a rehearsal checklist.

All people and stories are fictional. The static GitHub Pages demo runs entirely in the browser. The FastAPI backend is runnable/tested source and is **not deployed**.

## Run

Requires Node 26.12.1 and Python 3.12+.

```bash
npm ci
npm run dev
uv sync --directory api --frozen
uv run --directory api uvicorn api.main:app --reload
```

## Verify

```bash
npm run typecheck
npm audit --audit-level=high
uv run --directory api pytest
uv run --directory api pip-audit
npm run test:e2e
PAGES_BUILD=true npm run build
```

Source: the free IdeaBrowser Idea of the Day for November 23, 2026. See [research/notes.md](research/notes.md). No raw report text or private tracking links are included.
