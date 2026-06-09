# Design System Notes

This project follows the product-tool interpretation of the Impeccable design guidance: restrained hierarchy, clear product context, no generic AI-frontend gloss, and interface density appropriate for repeated algorithm exploration.

Reference: https://impeccable.style

## Product Register

- This is a working visualization tool, not a marketing page.
- The first viewport must expose the tool itself: category, algorithm, input mode, playback, canvas, and current event.
- Text should be short, operational, and attached to controls or state.
- Avoid hero sections, decorative gradients, glass panels, bokeh/orbs, and ornamental empty space.

## Visual Rules

- Radius: 8px maximum for controls, panels, and repeated items.
- Palette: neutral product shell with purposeful accents for algorithm state.
- Typography: system sans, compact labels, no viewport-scaled type, no negative letter spacing.
- Layout: left control rail plus full-height visualization work area on desktop; stacked control area on mobile.
- Canvas: framed as the primary workspace, not as a decorative preview.

## Interaction Rules

- Category and algorithm selection are separate.
- Algorithm input mode is always one of example, random, or custom JSON.
- Playback controls use icons for transport actions and concise labels where clarity matters.
- Planned algorithms can appear in the catalog, but must not silently pretend to generate traces.

## Algorithm Color Semantics

- Sorting:
  - Comparison: warm amber.
  - Pivot: violet.
  - Insertion boundary: violet range wash.
  - Bubble pass fixed tail: green.
  - Merge range: violet range wash with amber comparisons.
  - Heap range: violet range wash with green fixed tail.
  - Swap: red.
  - Fixed/sorted: green.
- Graph:
  - Source: blue.
  - Target: orange.
  - Active frontier: amber.
  - Discovered traversal depth: blue labels.
  - Depth-first stack operations: amber edge focus with blue depth labels.
  - Final path or selected tree edges: green.
- Sequence:
  - Active comparison: amber.
  - Mismatch/fallback: red.
  - Prefix table focus: violet.
  - Dynamic-programming active cell: blue.
  - Edit operation costs: amber/red/violet for insertion, deletion, and substitution.
  - Final matches: green.
