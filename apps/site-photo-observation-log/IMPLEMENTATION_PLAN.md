# Site Photo Observation Log Implementation Plan

## Goal

Create a static browser POC that turns pasted site-photo captions or rough field notes into structured observation log entries.

## Architecture

Vanilla HTML/CSS/JS. Browser-only. Deterministic text heuristics for POC v0. No backend and no image upload processing yet.

## Tasks

1. Copy `templates/static-smart-tool` to `apps/site-photo-observation-log`.
2. Replace generic copy with site-photo observation-specific product promise.
3. Replace sample data with construction photo captions and field notes.
4. Replace expected output with observation log examples.
5. Implement parser for locations, trades/categories, issue types, severity, status, and next actions.
6. Add CSV download and copyable report summary.
7. Run `node --check src/app.js`.
8. Run local HTTP smoke test.
9. Complete CDO review checklist.
10. Commit and push.
11. Deploy to Vercel if approved.
