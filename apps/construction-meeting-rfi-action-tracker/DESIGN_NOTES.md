# CDO Design Notes — Construction Meeting/RFI Action Tracker

## CDO verdict

Approved for internal POC build if it follows the Dog Walk Ventures app shell.

## Design goals

- Feel like a practical construction admin workbench, not a generic chatbot.
- Make the input → output transformation obvious.
- Keep all output draft/reviewable.
- Make export/copy actions visible.
- Use warm, calm Dog Walk Ventures styling.

## Required UI sections

- Header with Dog Walk Ventures and POC badge
- Promise panel with target user and trust note
- Input workbench with sample data button
- Output panel with tabs/sections for actions, RFIs, decisions, open questions
- Human review panel
- Feedback prompt

## Copy guidance

Use:

- “Create action list”
- “Draft RFI candidates”
- “Needs review”
- “Copy email summary”
- “Export CSV”

Avoid:

- “AI-powered platform”
- “automated construction intelligence”
- “autonomous project delivery”

## Visual direction

Use tokens from `../../design-system/DESIGN.md`:

- warm background: `#F6F3EA`
- raised cards: `#FFFFFF`
- ink: `#18211F`
- moss primary action: `#516B48`
- sun badges: `#F4B942`
- clay warning accents: `#C96F4A`
