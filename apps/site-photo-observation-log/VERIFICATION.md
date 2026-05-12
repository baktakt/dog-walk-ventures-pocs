# Verification

## Static checks

- [x] `node --check src/app.js` passes.
- [x] No secrets in files.
- [x] `vercel.json` output directory matches app structure.

## Manual / structural checks

- [x] App opens locally via HTTP server.
- [x] `/src/` returns HTTP 200.
- [x] `/src/app.js` returns HTTP 200 and includes parser logic.
- [x] `/src/styles.css` returns HTTP 200.
- [x] Skip link exists.
- [x] Textarea has visible label.
- [x] Output panel uses `aria-live`.
- [x] Trust warning is visible.
- [x] Copy/export actions exist.
- [x] Not a generic chatbot interface.

## CDO review

- [x] CDO review completed.
- [x] Verdict: approve for POC release.

## Known limitations

- POC v0 does not analyze image pixels.
- Parser is deterministic and approximate.
- Trade/category/severity classification needs human review.
- No data is stored or uploaded.

## Deployment checks

Pending until Vercel deployment.
