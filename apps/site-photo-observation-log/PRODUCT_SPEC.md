# Site Photo Observation Log Product Spec

## Problem sentence

Every day on active sites, field teams take photos but later waste time turning scattered WhatsApp/email/photo-folder evidence into usable observation logs, punch items, safety notes, progress reports, or backcharge documentation.

## Product promise

For site managers and inspectors, paste site-photo captions or rough field notes and get structured observation records that can be reviewed, copied, and exported.

## Target user

- Primary: site managers and inspectors at small/mid-sized construction teams.
- Secondary: safety coordinators, project engineers, owners’ reps, and small contractors.

## Input

- Type: free-text site photo captions, WhatsApp messages, inspection notes, or daily photo notes.
- Example: `Photo 12 - Level 2 corridor - drywall damage near stair core. Ask interiors subcontractor to inspect by Friday.`
- Constraints: POC v0 does not process images directly.

## Output

- observation title/description
- location prompt
- likely trade/category
- issue type
- severity
- status
- suggested next action
- review flags
- CSV export
- copyable report summary

## Non-goals for POC v0

- No image analysis.
- No accounts.
- No project-management integrations.
- No automatic safety judgment.
- No automatic sending to subcontractors.
- No storage of project data.

## Success criteria

- User understands the tool within 5 seconds.
- Sample notes create useful observation cards.
- Output is copyable/exportable.
- Draft/trust warning is visible.
- App works on mobile width.
- CDO checklist passes.
