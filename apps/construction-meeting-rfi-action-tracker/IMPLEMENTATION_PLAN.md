# Construction Meeting/RFI Action Tracker Implementation Plan

> **For Hermes:** Use this as the local POC implementation checklist. The first build is intentionally static and browser-only.

**Goal:** Build a small Dog Walk Ventures POC that turns pasted construction meeting notes into action items, RFI candidates, decisions, open questions, CSV, and email summary.

**Architecture:** Static HTML/CSS/JS in `src/`. No backend or build step. Heuristic parser first; LLM backend can come later after workflow shape is proven.

**Tech Stack:** HTML, CSS, vanilla JavaScript.

---

### Task 1: Create static app shell

**Objective:** Create the Dog Walk Ventures POC shell with header, promise, input, output, review, and feedback sections.

**Files:**
- Create: `src/index.html`
- Create: `src/styles.css`
- Create: `src/app.js`

**Verification:** Open `src/index.html` and confirm the shell renders.

### Task 2: Add sample input loading

**Objective:** Add a button that loads `sample-data/meeting-notes.txt` content into the textarea.

**Files:**
- Modify: `src/app.js`

**Verification:** Clicking “Use sample notes” fills the textarea.

### Task 3: Add deterministic parser

**Objective:** Parse lines into action items, RFI candidates, decisions, and open questions.

**Files:**
- Modify: `src/app.js`

**Verification:** Sample notes generate at least 8 rows and include at least 2 RFI candidates.

### Task 4: Add export/copy actions

**Objective:** Allow CSV copy/download and email summary copy.

**Files:**
- Modify: `src/app.js`

**Verification:** Buttons produce non-empty CSV and email text.

### Task 5: Final CDO check

**Objective:** Verify design-system fit and trust warnings.

**Verification:** Page has one primary action, visible review warning, structured outputs, accessible labels, and export actions.
