# Smart-Tool POC UI Conventions

## POC design principle

A Dog Walk Ventures POC is not a platform. It is a small utility that proves one workflow can become easier.

Design for:

- immediate usefulness
- low setup
- low trust barrier
- human review
- exportable outputs
- clear before/after value

## Common page sections

Every POC should generally include:

1. **Header**
   - Dog Walk Ventures mark/name
   - tool name
   - small doctrine line: “Small tools. Real pain. Human upside.”

2. **Promise panel**
   - one-sentence promise
   - target user
   - what it does / does not do

3. **Input workbench**
   - upload, paste, URL, or simple form
   - sample data button
   - privacy/trust note

4. **Processing state**
   - calm progress text
   - no fake magic
   - explain current step in plain language

5. **Output panel**
   - structured results
   - confidence/needs-review labels where relevant
   - copy/export/download actions

6. **Human review panel**
   - warnings
   - assumptions
   - “check these before using” list

7. **Feedback prompt**
   - “Was this useful?”
   - “What did it miss?”
   - optional email/contact field for POC learning

## Interface patterns

Prefer structured UI over chat.

Good:

- upload PDF → extracted table
- paste meeting notes → action list + draft RFIs
- upload photos → observation log
- compare files → change summary + checklist

Avoid as default:

- blank chatbot
- giant dashboard
- complex onboarding
- account creation before trying
- hidden exports

## Copy style

Use plain language:

- “Create action list”
- “Extract RFI candidates”
- “Flag missing fields”
- “Export to Excel”
- “Needs human review”

Avoid:

- “AI-powered transformation platform”
- “revolutionize construction workflows”
- “autonomous intelligence layer”
- “disrupt project delivery”

## Trust rules

Every POC handling professional workflows must say:

> This is a draft assistant. Review before using on a real project.

If relevant:

> Do not upload confidential project data during POC testing.

## Output rules

Outputs should be:

- editable
- copyable
- exportable
- traceable to source input where possible
- clear about uncertainty

## Accessibility rules

- visible focus states
- sufficient contrast
- labels for all inputs
- avoid color-only status
- support keyboard navigation for core actions
- readable on mobile widths
