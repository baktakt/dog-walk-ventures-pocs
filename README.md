# Dog Walk Ventures POCs

Public monorepo for Dog Walk Ventures smart-tool proof-of-concepts.

Dog Walk Ventures builds the bright side of AI: tiny, useful tools for overlooked human frustrations.

## Structure

```text
apps/
  construction-meeting-rfi-action-tracker/
packages/
  design-system/
```

## Apps

### Construction Meeting/RFI Action Tracker

Path: `apps/construction-meeting-rfi-action-tracker`

A browser-only POC that turns pasted construction meeting notes into:

- action items
- draft RFI candidates
- decisions
- needs-review flags
- CSV export
- email summary

Run locally:

```bash
cd apps/construction-meeting-rfi-action-tracker
python3 -m http.server 8765
```

Open:

`http://localhost:8765/src/`

## Design system

Shared design system lives in:

`packages/design-system/`

Every POC should follow:

- `packages/design-system/DESIGN.md`
- `packages/design-system/poc-ui-conventions.md`
- `packages/design-system/app-shell.md`

## Doctrine

Small tools. Real pain. Human upside.
