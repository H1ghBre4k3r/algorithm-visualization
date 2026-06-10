# Algorithm Visualization

Browser-first algorithm visualization MVP with a Rust trace core, WASM bindings, and a React + Canvas frontend.

## What Works

- Quicksort trace generation and animated bar visualization.
- Insertion Sort trace generation and animated bar visualization.
- Bubble Sort trace generation and animated bar visualization.
- Cocktail Shaker Sort trace generation and animated bar visualization.
- Odd-Even Sort trace generation and animated bar visualization.
- Pancake Sort trace generation and animated bar visualization.
- Quickselect trace generation and animated rank-selection visualization.
- Bitonic Sort trace generation and animated sorting-network visualization.
- Selection Sort trace generation and animated bar visualization.
- Shell Sort trace generation and animated bar visualization.
- Counting Sort trace generation and animated bar visualization.
- Radix Sort trace generation and animated bar visualization.
- Bucket Sort trace generation and animated bar visualization.
- Comb Sort trace generation and animated bar visualization.
- Mergesort trace generation and animated bar visualization.
- Timsort trace generation and animated bar visualization.
- Heap Sort trace generation and animated bar visualization.
- Breadth-first search trace generation and animated graph traversal visualization.
- Depth-first search trace generation and animated graph traversal visualization.
- Dijkstra trace generation and animated weighted-graph visualization.
- Bellman-Ford trace generation and animated weighted-graph visualization.
- A* trace generation and heuristic weighted-graph visualization.
- Prim minimum-spanning-tree trace generation and graph visualization.
- Kruskal minimum-spanning-tree trace generation and graph visualization.
- Topological Sort trace generation and directed-DAG visualization.
- Knuth-Morris-Pratt trace generation and sequence/prefix-table visualization.
- Boyer-Moore trace generation and right-to-left string-search visualization.
- Levenshtein Distance trace generation and dynamic-programming table visualization.
- Prefix Tree trace generation and shared-prefix trie visualization.
- Handshake Protocol trace generation and distributed message-lane visualization.
- Time Synchronization trace generation and clock-offset convergence visualization.
- Paxos trace generation and proposer/acceptor/learner message-lane visualization.
- Example, random, and custom JSON inputs.
- Playback controls for play, pause, step, reset, and speed.
- Rust unit tests for algorithm correctness and trace shape.
- TypeScript tests for custom input validation.

## Project Layout

- `crates/algorithm_core`: pure Rust algorithm tracing logic.
- `crates/wasm`: `wasm-bindgen` wrapper for browser calls.
- `web`: Vite + React + TypeScript app with Canvas 2D rendering.
- `DESIGN.md`: product UI rules inspired by Impeccable's restrained design guidance.
- `docs/PLANNING.md`: roadmap and acceptance gates for adding more algorithms.

## Run Locally

```bash
cargo test
cd web
npm install
npm run dev
```

Open `http://127.0.0.1:5173/`.

## Optional WASM Build

The web app can run immediately through its TypeScript fallback tracer. To use the Rust/WASM tracer in the browser, install `wasm-pack` and run:

```bash
cd web
npm run build:wasm
npm run dev
```

Generated WASM files are written to `web/src/wasm-pkg` and are ignored by git.

## Deploy

Production deployment artifacts live in `deploy/`.

```bash
docker compose up --build
```

For K3s, build and push the image, update the image/host in `deploy/kubernetes`, then apply the kustomization. The provided ingress targets K3s' default Traefik controller.

GitHub Pages is also supported for static hosting. Enable Pages with **GitHub Actions** as the source, then push to `main` or run the `Deploy GitHub Pages` workflow manually. The workflow builds the Rust/WASM package and publishes `web/dist`.

## Verification

```bash
cargo test
cd web
npm test
npm run build
npm audit --omit=dev
```
