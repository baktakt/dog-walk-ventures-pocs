# Site Photo Observation Log Design Notes

## CDO review target

This should feel like a field-friendly mobile utility for turning messy site documentation into a useful first draft.

## Product feel

- Calm, practical, and lightweight.
- Designed for someone standing on site with a phone.
- No dashboard clutter.
- No generic chatbot UI.
- Clear input → observation log output.

## Layout

- Header with Dog Walk Ventures identity.
- Hero promise with draft/confidentiality warning.
- Input workbench for captions/field notes.
- Output panel with observation cards and counts.
- Human review panel focused on safety/quality responsibility.
- Feedback panel for POC learning.

## Mobile requirements

- Single-column below 900px.
- Large tap targets.
- Textarea usable on mobile.
- Observation cards stack cleanly.
- Copy/export actions remain easy to find.

## Accessibility requirements

- Semantic landmarks.
- Skip link.
- Visible label for input textarea.
- Visible focus states.
- `aria-live` output status.
- Severity/status indicated with text, not color alone.
- Reduced-motion support inherited from template.

## Trust requirements

- Make clear this is a draft assistant.
- Say POC v0 does not analyze image pixels.
- Warn against confidential project data.
- Require human review for safety/quality issues.
