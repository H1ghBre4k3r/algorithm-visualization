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
  - Selection minimum candidate: violet range wash with amber comparisons.
  - Shell gap pass: violet range wash with amber gapped comparisons.
  - Counting rebuild: violet write range with green reconstructed prefix.
  - Radix digit pass: violet range wash with amber bucket reads.
  - Bucket distribution: violet range wash with amber assignments and green collection.
  - Comb gap pass: violet range wash with amber gapped comparisons.
  - Cocktail sweep: violet shrinking range with amber forward/backward comparisons.
  - Odd-even phase: violet full-range band with amber alternating adjacent pairs.
  - Pancake flip: violet prefix band with red flip swaps and green fixed suffix.
  - Quickselect: violet search range with amber pivot comparisons and green selected rank.
  - Bitonic network: violet merge stage bands with amber compare-exchange pairs.
  - Bubble pass fixed tail: green.
  - Merge range: violet range wash with amber comparisons.
  - Timsort run: violet natural-run bands with amber run-head comparisons.
  - Heap range: violet range wash with green fixed tail.
  - Swap: red.
  - Fixed/sorted: green.
- Graph:
  - Source: blue.
  - Target: orange.
  - Active frontier: amber.
  - Discovered traversal depth: blue labels.
  - Depth-first stack operations: amber edge focus with blue depth labels.
  - Relaxation pass updates: amber edge focus with blue distance labels.
  - Heuristic pathfinding: amber frontier with blue best-known distances.
  - Cycle rejection: red edge focus.
  - Topological order: amber dependency removals with green settled ordering path.
  - Final path or selected tree edges: green.
- Sequence:
  - Active comparison: amber.
  - Mismatch/fallback: red.
  - Boyer-Moore skip: red mismatch link with shift messaging.
  - Prefix table focus: violet.
  - Dynamic-programming active cell: blue.
  - Edit operation costs: amber/red/violet for insertion, deletion, and substitution.
  - Trie construction: amber character edges, blue active prefix depth, green terminal words.
  - Final matches: green.
