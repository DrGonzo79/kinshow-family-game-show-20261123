# Architecture

The repository deliberately splits a deployable static review experience from a runnable backend.

1. **Next.js App Router:** static-exported organizer workroom using shared fictional JSON fixtures. `lib/show.ts` performs deterministic in-browser compilation for GitHub Pages.
2. **FastAPI:** `/shows` validates formats, story lengths, approval count, and creates attributed rounds. `/demo` exposes the same fixture. It is tested but not hosted.
3. **Production direction:** PostgreSQL stores event/version metadata; encrypted object storage holds time-limited media; a queue renders slides/PDF; an audit log captures source, approval, editor, and output version.

Security boundaries: no real family information in the public demo; no secrets in the client; event-scoped authorization before storage; explicit retention/deletion; signed media access; malware scanning; least-privilege workers; and human publication approval. Availability needs graceful PDF fallback, idempotent renders, and recovery of the last approved show version.

Observability should track intake completion, approval latency, rendering failures, editor minutes, correction/reopen rate, rehearsal completion, and show-day incidents. Do not log raw story/media content in telemetry.
