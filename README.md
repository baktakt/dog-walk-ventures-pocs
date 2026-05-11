# Dog Walk Ventures POCs

Public monorepo for Dog Walk Ventures smart-tool proof-of-concepts.

Dog Walk Ventures builds the bright side of AI: tiny, useful tools for overlooked human frustrations.

## Structure

```text
apps/
  construction-meeting-rfi-action-tracker/
packages/
  design-system/
templates/
  static-smart-tool/
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

## Templates

Reusable POC templates live in:

`templates/`

Current template:

- `templates/static-smart-tool` — modern mobile-first accessible base for simple browser POCs.

Create a new POC from the template:

```bash
cp -R templates/static-smart-tool apps/my-new-poc
```

Then customize copy, sample data, parser/extractor logic, and docs.

## Doctrine

Small tools. Real pain. Human upside.
