# Product Spec — Construction Meeting/RFI Action Tracker

## Problem sentence

Every week, construction project staff turn messy meeting notes, site conversations, and field questions into action lists, RFIs, and follow-up trackers by hand.

## POC hypothesis

If a site/project manager can paste rough notes and immediately receive a structured action/RFI tracker, the workflow will feel useful enough to justify deeper development.

## Primary user story

As a construction project engineer, I paste meeting notes and receive:

1. assigned action items
2. unresolved questions that may become RFIs
3. decisions made
4. follow-up tracker rows I can copy to Excel or email

## Non-goals for v0

- no accounts
- no integrations
- no professional/legal/engineering certification
- no document upload beyond pasted text
- no automatic sending to subcontractors
- no claims of correctness

## Core workflow

1. User reads promise and trust note.
2. User clicks “Use sample notes” or pastes notes.
3. User clicks “Create action list”.
4. Tool extracts draft rows.
5. User reviews flags and edits/copies/exports.

## Output schema

Action item:

- Type: Action / RFI candidate / Decision / Open question
- Responsible party
- Trade
- Item
- Source line
- Due date
- Confidence
- Needs review

## First implementation approach

Static browser prototype with heuristic parser:

- line splitting
- keyword detection for actions: `to`, `will`, `needs to`, `action`, `follow up`, `provide`, `send`, `confirm`, `coordinate`
- RFI candidate detection: `clarify`, `conflict`, `drawing`, `spec`, `unknown`, `confirm`, `?`
- decision detection: `agreed`, `decided`, `approved`, `confirmed`
- responsible party detection from common trade/company patterns and words before `to/will/shall`

## Success criteria for v0

- POC can turn sample notes into at least 8 useful structured rows.
- User can copy CSV.
- User can copy email summary.
- Interface follows Dog Walk Ventures POC shell.
- Trust/review warnings are visible.
