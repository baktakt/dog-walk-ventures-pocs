# Static Smart-Tool Template

A modern, mobile-first, accessible base template for Dog Walk Ventures smart-tool POCs.

Use this when creating a new POC app under `apps/[poc-slug]`.

## Design goals

- usable on mobile first
- accessible by default
- clear input → output workflow
- one obvious primary action
- visible draft/trust warning
- output cards that are easy to copy/export
- warm Dog Walk Ventures visual system
- no generic chatbot shell

## Quick start

```bash
cp -R templates/static-smart-tool apps/my-new-poc
cd apps/my-new-poc
python3 -m http.server 8765
```

Open:

`http://localhost:8765/src/`

## Files

```text
src/
  index.html
  styles.css
  app.js
sample-data/
  sample-input.txt
output-examples/
  expected-output.md
README.md
PRODUCT_SPEC.md
DESIGN_NOTES.md
VERIFICATION.md
vercel.json
```

## Customize for a new POC

1. Replace `[POC Name]` and product copy in `src/index.html`.
2. Replace `sample-data/sample-input.txt`.
3. Update `app.js` parser/extractor logic.
4. Update `PRODUCT_SPEC.md` and `DESIGN_NOTES.md`.
5. Run `node --check src/app.js`.
6. Open locally and test mobile width.
7. Commit under `apps/[poc-slug]`.

## Accessibility included

- semantic landmarks
- skip link
- visible labels
- visible focus states
- keyboard-accessible buttons/tabs
- `aria-live` output updates
- responsive cards
- no color-only status
- reduced-motion support

## Deploy

From the app folder:

```bash
vercel deploy --prod --yes
```
