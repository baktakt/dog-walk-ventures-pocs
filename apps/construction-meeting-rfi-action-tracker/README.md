# Construction Meeting/RFI Action Tracker POC

## Status

POC scaffold + static prototype v0.

## Source opportunity

`../../weekly-runs/2026/2026-W20-aec-construction/opportunities/construction-meeting-rfi-action-tracker.md`

## Product promise

For site managers and project engineers, this tool turns messy construction meeting notes or field questions into subcontractor-specific action items, draft RFIs, and an Excel/email-ready follow-up tracker.

## Target user

- site managers
- project engineers
- construction project managers
- contract administrators
- document controllers
- small contractors without heavyweight project-management systems

## Input

Free-text meeting notes, field notes, or coordination questions.

## Output

- action items grouped by responsible party/trade
- possible RFI candidates
- decisions captured
- open questions / needs review
- CSV export for Excel
- email summary draft

## POC boundary

This first version is a browser-only static prototype. It uses deterministic text heuristics to prove the workflow and interface before adding an LLM backend.

## Trust note

This is a draft assistant. Review before using on a real project. Do not upload confidential project data during POC testing.

## Run locally

Open `src/index.html` in a browser, or serve it from this folder:

```bash
python3 -m http.server 8765
```

Then open:

`http://localhost:8765/src/`

## Design system

Uses the Dog Walk Ventures common design system:

- `../../design-system/DESIGN.md`
- `../../design-system/poc-ui-conventions.md`
- `../../design-system/app-shell.md`
