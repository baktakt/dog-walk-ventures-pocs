# Templates

Reusable starting points for Dog Walk Ventures smart-tool POCs.

## Available templates

- `static-smart-tool` — modern mobile-first accessible browser POC template.

## Template rules

A template should:

- use the Dog Walk Ventures design system
- be mobile-first
- include accessible labels and focus states
- include a draft/trust warning
- include sample data
- include copy/export actions
- avoid chat-only interfaces
- be easy to deploy to Vercel

## Creating a new POC

```bash
cd /home/baktakt/dog-walk-ventures-pocs
cp -R templates/static-smart-tool apps/[poc-slug]
```

Then update all placeholder copy and docs before committing.
