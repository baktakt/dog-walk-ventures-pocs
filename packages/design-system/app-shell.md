# Dog Walk Ventures POC App Shell

Use this shared app structure for smart-tool POCs.

## Layout

```text
┌────────────────────────────────────────────┐
│ Header: Dog Walk Ventures / Tool Name      │
├────────────────────────────────────────────┤
│ Promise: one-sentence painkiller statement │
├─────────────────────┬──────────────────────┤
│ Input Workbench     │ Output / Result      │
│ - upload/paste      │ - structured result  │
│ - sample data       │ - review flags       │
│ - primary action    │ - export/copy        │
├─────────────────────┴──────────────────────┤
│ Human Review / Trust / Feedback            │
└────────────────────────────────────────────┘
```

## Header

- left: Dog Walk Ventures
- center/left: tool name
- right: status badge such as `POC`, `Draft assistant`, or `Local demo`

## Promise

Formula:

> For [target user], this tool turns [messy input] into [useful output] so [human upside].

Example:

> For site managers, this tool turns meeting notes into subcontractor action lists and draft RFIs so fewer follow-ups get lost.

## Input workbench

Required elements:

- labeled input
- accepted formats
- sample input button
- primary action
- privacy note

## Output panel

Required elements:

- generated result
- assumptions / uncertain items
- copy button
- export button where relevant
- “needs review” labels

## Footer / trust area

Include:

- “Draft assistant — review before use”
- link/path to source opportunity if internal
- feedback prompt
