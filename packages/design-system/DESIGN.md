---
version: alpha
name: Dog Walk Ventures
description: Calm, bright, humane utility design for tiny AI smart-tool POCs.
colors:
  primary: "#516B48"
  secondary: "#DDECF2"
  tertiary: "#F4B942"
  neutral: "#F6F3EA"
  ink: "#18211F"
  muted: "#5F6F69"
  soft: "#F6F3EA"
  surface: "#FFFCF4"
  surfaceRaised: "#FFFFFF"
  line: "#DCD6C8"
  moss: "#516B48"
  mossDark: "#33452F"
  sun: "#F4B942"
  clay: "#C96F4A"
  sky: "#DDECF2"
  success: "#2F7D4E"
  warning: "#A85D10"
  danger: "#B5473F"
  focus: "#2F6FEB"
typography:
  display:
    fontFamily: Inter
    fontSize: 2.5rem
    fontWeight: 720
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  h1:
    fontFamily: Inter
    fontSize: 2rem
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.03em"
  h2:
    fontFamily: Inter
    fontSize: 1.375rem
    fontWeight: 680
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0em"
  body-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0em"
  label:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "0.08em"
rounded:
  sm: 6px
  md: 12px
  lg: 20px
  xl: 28px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  xxl: 64px
components:
  app-background:
    backgroundColor: "{colors.soft}"
    textColor: "{colors.ink}"
  card:
    backgroundColor: "{colors.surfaceRaised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: 24px
  button-primary:
    backgroundColor: "{colors.moss}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: 12px
  button-primary-hover:
    backgroundColor: "{colors.mossDark}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: 12px
  button-secondary:
    backgroundColor: "{colors.sky}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: 12px
  input:
    backgroundColor: "{colors.surfaceRaised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: 12px
  badge:
    backgroundColor: "{colors.sun}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: 8px
---

## Overview

Dog Walk Ventures smart tools are small practical utilities for overlooked human frustrations. The interface should feel calm, capable, optimistic, and non-extractive.

The visual metaphor is a bright workshop bench: warm paper, useful labels, clear tools, visible output, no theatrics.

## Colors

- **Ink (#18211F):** main text; grounded, not pure black.
- **Soft (#F6F3EA):** warm background; avoids sterile SaaS white.
- **Surface (#FFFCF4) and Surface Raised (#FFFFFF):** readable work areas and cards.
- **Moss (#516B48):** primary action; calm, useful, ecological.
- **Sun (#F4B942):** small optimistic highlight, badges, progress hints.
- **Clay (#C96F4A):** human warmth and selected accents.
- **Sky (#DDECF2):** secondary action or informational surfaces.
- **Danger (#B5473F):** only for destructive or serious warnings.

Use color sparingly. Most screens should be warm neutral with one clear primary action.

## Typography

Use Inter or the closest available system sans-serif. Typography should be crisp and practical, with slightly tight headings and comfortable body text.

Avoid decorative type. Dog Walk Ventures tools should feel trustworthy and fast, not branded for its own sake.

## Layout

POCs should use a consistent one-page utility layout:

1. compact header
2. problem promise
3. input/workbench panel
4. output/result panel
5. small evidence/trust/help area

Prefer 12-column responsive layouts on desktop and single-column layouts on mobile. Keep line lengths readable and controls large enough for field/mobile use.

## Elevation & Depth

Use soft cards, borders, and subtle shadows only to separate work areas. Avoid heavy glassmorphism, dark mode theatrics, or dashboard clutter.

## Shapes

Rounded rectangles communicate approachable utility. Use `rounded.md` for controls and `rounded.lg` for cards. Avoid pills everywhere; reserve pill shapes for small badges or tags.

## Components

- `button-primary`: one main action per screen, usually “Generate”, “Extract”, “Compare”, “Summarize”, or “Create log”.
- `button-secondary`: supporting actions like “Upload sample”, “Clear”, “Export CSV”.
- `card`: primary workbench and result containers.
- `input`: file upload, textarea, URL, or structured form fields.
- `badge`: status, confidence, or small metadata label.

## Do's and Don'ts

Do:

- make the useful action obvious within 5 seconds
- show examples and sample data
- explain what the tool will and will not do
- make outputs exportable
- keep human review in the loop
- use plain language over AI jargon
- design for low-tech and mobile-ish workflows

Don’t:

- make the product look like generic enterprise SaaS
- hide behind chat as the only interface
- overuse gradients, animations, or dark UI
- imply professional/legal/engineering certification
- create surveillance vibes
- optimize for lock-in before usefulness
