# Algorithm Visualization

Browser-first algorithm visualization MVP with a Rust trace core, WASM bindings, and a React + Canvas frontend.

## What Works

- Quicksort trace generation and animated bar visualization.
- Dijkstra trace generation and animated weighted-graph visualization.
- Example, random, and custom JSON inputs.
- Playback controls for play, pause, step, reset, and speed.
- Rust unit tests for algorithm correctness and trace shape.
- TypeScript tests for custom input validation.

## Project Layout

- `crates/algorithm_core`: pure Rust algorithm tracing logic.
- `crates/wasm`: `wasm-bindgen` wrapper for browser calls.
- `web`: Vite + React + TypeScript app with Canvas 2D rendering.

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

## Verification

```bash
cargo test
cd web
npm test
npm run build
npm audit --omit=dev
```
