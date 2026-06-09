import { spawnSync } from "node:child_process";

const args = [
  "build",
  "../crates/wasm",
  "--target",
  "web",
  "--out-dir",
  "../../web/src/wasm-pkg",
  "--out-name",
  "algorithm_visualization_wasm",
];

const result = spawnSync("wasm-pack", args, {
  cwd: new URL("..", import.meta.url),
  stdio: "inherit",
});

if (result.error?.code === "ENOENT") {
  console.error(
    "wasm-pack is not installed. Install it, then rerun `npm run build:wasm`."
  );
  process.exit(127);
}

process.exit(result.status ?? 1);
