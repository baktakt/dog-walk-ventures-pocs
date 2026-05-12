# Site Photo Observation Log POC

## Status

POC scaffold + static prototype v0. Deployed to Vercel.

## Live URL

https://site-photo-observation-log.vercel.app

## Source opportunity

`/home/baktakt/dog-walk-ventures/weekly-runs/2026/2026-W20-aec-construction/opportunities/site-photo-observation-log.md`

## Product promise

For site managers, inspectors, safety coordinators, and small contractors, paste rough site-photo notes or photo captions and get a structured observation log with location prompts, likely trade, issue type, severity, status, and next action.

## Target user

- site managers
- construction inspectors
- safety coordinators
- project engineers
- clerk-of-works roles
- owners’ reps
- small contractors using phone photos, WhatsApp, email, and spreadsheets

## Input

Rough site photo notes, WhatsApp/photo captions, inspection notes, or progress-photo descriptions.

## Output

- structured observation log cards
- likely trade/category
- severity and status prompts
- next action
- review flags
- CSV export
- copyable site-report summary

## POC boundary

This first version is a browser-only static prototype. It does **not** analyze image pixels yet. It simulates the workflow using pasted photo captions/notes so we can test whether the output schema and mobile-first UX are useful.

## Trust note

This is a draft assistant. Review before using on a real project. Do not paste confidential project information or upload real project photos during POC testing.

## Run locally

```bash
python3 -m http.server 8765
```

Then open:

`http://localhost:8765/src/`

## Design system

Uses the Dog Walk Ventures common design system from `packages/design-system/`.
