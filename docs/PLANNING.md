# Algorithm Visualization Planning

## Current Milestone

The current milestone establishes the website architecture and proves the trace model across three algorithm families:

- Sorting: Quicksort, Insertion Sort, Bubble Sort, Mergesort, Heap Sort.
- Graph: Breadth-first search, depth-first search, Dijkstra, Prim MST.
- Sequence: Knuth-Morris-Pratt, Levenshtein Distance.
- Input modes: example, random, custom JSON.
- Rendering: Canvas 2D with real-time playback controls.
- Engine: Rust trace core, WASM wrapper, TypeScript fallback for local development before `wasm-pack` output is generated.

## Acceptance Gates For Every New Algorithm

Before an algorithm is marked live in the catalog, it must have:

- A typed input model and example input.
- Random input generation when a meaningful random mode exists.
- Custom JSON validation with actionable error messages.
- Pure trace generation in Rust.
- Unit tests proving final correctness.
- Unit tests validating trace event references and step ordering.
- A Canvas replay path or a documented renderer extension.
- Browser smoke coverage for category, algorithm, input mode, and at least one step.

## Roadmap

1. Strengthen the platform.
   - Generate and load the real WASM package in development.
   - Add a browser smoke-test script that can run in CI.
   - Split renderer modules by visualization family as the event catalog grows.

2. Expand sorting.
   - Add selection sort, shell sort, counting sort, and radix sort.
   - Reuse the array renderer where possible, adding events only when the animation needs them.

3. Expand graph algorithms.
   - Add Kruskal, Bellman-Ford, and A*.
   - Introduce graph input presets for sparse, dense, directed, and grid-style graphs.

4. Add sequence processing.
   - Add Boyer-Moore and prefix tree construction.
   - Extend the sequence renderer into trie views while keeping table rendering for dynamic-programming algorithms.

5. Add distributed algorithms.
   - Add handshake protocols, time synchronization, leader election, and Paxos.
   - Add timeline/message-lane rendering with deterministic simulation steps.

## Current Gaps

- Only Quicksort, Insertion Sort, Bubble Sort, Mergesort, Heap Sort, Breadth-first search, depth-first search, Dijkstra, Prim MST, Knuth-Morris-Pratt, and Levenshtein Distance are live.
- Planned algorithms are visible in the catalog but intentionally do not generate traces yet.
- Browser verification is manual right now.
- The frontend can run without generated WASM through a TypeScript fallback, but full Rust/WASM browser execution still requires `wasm-pack`.
