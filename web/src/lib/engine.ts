import type { AlgorithmRequest, Trace } from "../types";
import { generateTraceFallback } from "./fallbackEngine";

type WasmModule = {
  default?: () => Promise<void>;
  generate_trace_from_request: (request: AlgorithmRequest) => Trace;
};

let wasmModulePromise: Promise<WasmModule | null> | null = null;

export async function generateTrace(request: AlgorithmRequest): Promise<Trace> {
  const wasmModule = await loadWasmModule();
  if (wasmModule) {
    try {
      return wasmModule.generate_trace_from_request(request);
    } catch (error) {
      console.warn("WASM trace generation failed; using TypeScript fallback.", error);
    }
  }

  return generateTraceFallback(request);
}

async function loadWasmModule(): Promise<WasmModule | null> {
  wasmModulePromise ??= importWasmModule();
  return wasmModulePromise;
}

async function importWasmModule(): Promise<WasmModule | null> {
  try {
    const moduleUrl = new URL("../wasm-pkg/algorithm_visualization_wasm.js", import.meta.url).href;
    const wasmModule = (await import(/* @vite-ignore */ moduleUrl)) as WasmModule;
    await wasmModule.default?.();
    return wasmModule;
  } catch {
    return null;
  }
}
