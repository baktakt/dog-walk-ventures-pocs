# DMR Missing Results Checklist

## Status

POC scaffold + static prototype v0. Deployed to Vercel.

## Live URL

https://dmr-missing-results-checklist.vercel.app

## Source opportunity

`/home/baktakt/dog-walk-ventures/weekly-runs/2026/2026-W20-municipalities-public-sector/opportunities/dmr-missing-results-permit-checklist-assistant.md`

## Purpose

Help small wastewater/public-works teams turn pasted permit requirements and lab-result rows into a draft DMR readiness checklist before the reporting deadline.

## POC boundary

- Browser-only static prototype.
- No backend, login, storage, or official filing integration.
- Uses deterministic parsing and synthetic sample data.
- Draft checklist only; human review required.

## Run locally

```bash
python3 -m http.server 8765
```

Open `http://localhost:8765/src/`.
