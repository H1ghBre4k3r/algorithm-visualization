import { useEffect, useRef, useState } from "react";
import {
  Pause,
  Play,
  RefreshCw,
  RotateCcw,
  Shuffle,
  SkipForward,
} from "lucide-react";

import { customTemplate, exampleRequest } from "./data/examples";
import { generateTrace } from "./lib/engine";
import { randomGraphInput, randomSortInput } from "./lib/random";
import { parseCustomInput } from "./lib/validators";
import { drawTrace } from "./render/canvasRenderer";
import type { AlgorithmId, AlgorithmRequest, GraphInput, InputMode, SortInput, Trace } from "./types";

const algorithms: Array<{ id: AlgorithmId; label: string; category: string }> = [
  { id: "quicksort", label: "Quicksort", category: "Sorting" },
  { id: "dijkstra", label: "Dijkstra", category: "Graph" },
];

const inputModes: Array<{ id: InputMode; label: string }> = [
  { id: "example", label: "Example" },
  { id: "random", label: "Random" },
  { id: "custom", label: "Custom JSON" },
];

export default function App() {
  const [algorithm, setAlgorithm] = useState<AlgorithmId>("quicksort");
  const [inputMode, setInputMode] = useState<InputMode>("example");
  const [sortSize, setSortSize] = useState(18);
  const [graphSize, setGraphSize] = useState(7);
  const [randomSort, setRandomSort] = useState<SortInput>(() => randomSortInput(18));
  const [randomGraph, setRandomGraph] = useState<GraphInput>(() => randomGraphInput(7));
  const [customJson, setCustomJson] = useState<Record<AlgorithmId, string>>({
    quicksort: customTemplate("quicksort"),
    dijkstra: customTemplate("dijkstra"),
  });
  const [trace, setTrace] = useState<Trace | null>(null);
  const [inputError, setInputError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [step, setStep] = useState(0);
  const [speed, setSpeed] = useState(7);

  useEffect(() => {
    let cancelled = false;
    let request: AlgorithmRequest;

    try {
      request = buildRequest(algorithm, inputMode, randomSort, randomGraph, customJson[algorithm]);
      setInputError(null);
    } catch (error) {
      setTrace(null);
      setIsPlaying(false);
      setStep(0);
      setInputError(error instanceof Error ? error.message : "Input could not be parsed.");
      return;
    }

    setIsLoading(true);
    setIsPlaying(false);

    generateTrace(request)
      .then((nextTrace) => {
        if (cancelled) return;
        setTrace(nextTrace);
        setInputError(null);
        setStep(0);
      })
      .catch((error) => {
        if (cancelled) return;
        setTrace(null);
        setStep(0);
        setInputError(error instanceof Error ? error.message : "Trace generation failed.");
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [algorithm, inputMode, randomSort, randomGraph, customJson]);

  useEffect(() => {
    if (!isPlaying || !trace) return;
    if (step >= trace.events.length) {
      setIsPlaying(false);
      return;
    }

    const delay = Math.max(45, Math.round(1000 / speed));
    const timer = window.setTimeout(() => {
      setStep((current) => Math.min(current + 1, trace.events.length));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [isPlaying, speed, step, trace]);

  const activeAlgorithm = algorithms.find((item) => item.id === algorithm) ?? algorithms[0];
  const currentEvent = step > 0 ? (trace?.events[step - 1] ?? null) : null;
  const canPlay = Boolean(trace && trace.events.length > 0 && step < trace.events.length);

  function refreshRandomInput() {
    if (algorithm === "quicksort") {
      setRandomSort(randomSortInput(sortSize));
    } else {
      setRandomGraph(randomGraphInput(graphSize));
    }
  }

  function resetCustomTemplate() {
    setCustomJson((current) => ({ ...current, [algorithm]: customTemplate(algorithm) }));
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">AV</span>
          <div>
            <h1>Algorithm Visualization</h1>
            <p>{activeAlgorithm.category}</p>
          </div>
        </div>
        <div className="algorithm-tabs" role="tablist" aria-label="Algorithm">
          {algorithms.map((item) => (
            <button
              key={item.id}
              className={item.id === algorithm ? "tab active" : "tab"}
              type="button"
              onClick={() => {
                setAlgorithm(item.id);
                setStep(0);
                setIsPlaying(false);
              }}
            >
              <span>{item.label}</span>
              <small>{item.category}</small>
            </button>
          ))}
        </div>
      </header>

      <main className="workspace">
        <aside className="control-panel">
          <section className="control-section">
            <h2>Input</h2>
            <div className="segmented" role="tablist" aria-label="Input mode">
              {inputModes.map((mode) => (
                <button
                  key={mode.id}
                  className={mode.id === inputMode ? "active" : ""}
                  type="button"
                  onClick={() => {
                    setInputMode(mode.id);
                    setStep(0);
                    setIsPlaying(false);
                  }}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </section>

          {inputMode === "random" && (
            <section className="control-section">
              <div className="section-row">
                <h2>{algorithm === "quicksort" ? "Values" : "Nodes"}</h2>
                <button className="icon-button" type="button" title="Generate" onClick={refreshRandomInput}>
                  <Shuffle size={18} />
                </button>
              </div>
              {algorithm === "quicksort" ? (
                <RangeControl
                  label="Count"
                  min={6}
                  max={40}
                  value={sortSize}
                  onChange={(value) => {
                    setSortSize(value);
                    setRandomSort(randomSortInput(value));
                  }}
                />
              ) : (
                <RangeControl
                  label="Count"
                  min={4}
                  max={12}
                  value={graphSize}
                  onChange={(value) => {
                    setGraphSize(value);
                    setRandomGraph(randomGraphInput(value));
                  }}
                />
              )}
            </section>
          )}

          {inputMode === "custom" && (
            <section className="control-section fill">
              <div className="section-row">
                <h2>JSON</h2>
                <button className="icon-button" type="button" title="Reset template" onClick={resetCustomTemplate}>
                  <RefreshCw size={18} />
                </button>
              </div>
              <textarea
                spellCheck={false}
                value={customJson[algorithm]}
                onChange={(event) =>
                  setCustomJson((current) => ({ ...current, [algorithm]: event.target.value }))
                }
              />
            </section>
          )}

          <section className="control-section">
            <h2>Playback</h2>
            <div className="transport">
              <button
                className="primary-action"
                type="button"
                title={isPlaying ? "Pause" : "Play"}
                disabled={!trace || trace.events.length === 0}
                onClick={() => setIsPlaying((current) => !current && canPlay)}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                <span>{isPlaying ? "Pause" : "Play"}</span>
              </button>
              <button
                className="icon-button"
                type="button"
                title="Step"
                disabled={!trace}
                onClick={() => {
                  setIsPlaying(false);
                  setStep((current) => Math.min(current + 1, trace?.events.length ?? 0));
                }}
              >
                <SkipForward size={18} />
              </button>
              <button
                className="icon-button"
                type="button"
                title="Reset"
                disabled={!trace}
                onClick={() => {
                  setIsPlaying(false);
                  setStep(0);
                }}
              >
                <RotateCcw size={18} />
              </button>
            </div>
            <RangeControl label="Speed" min={1} max={24} value={speed} onChange={setSpeed} suffix="eps" />
          </section>

          <section className="control-section metrics">
            <Metric label="Events" value={trace ? trace.events.length : 0} />
            <Metric label="Step" value={trace ? `${step}/${trace.events.length}` : "0/0"} />
            <Metric label="Size" value={trace?.metadata.inputSize ?? 0} />
          </section>
        </aside>

        <section className="visual-area">
          <div className="canvas-shell">
            {trace && <VisualizationCanvas trace={trace} step={step} />}
            {!trace && <div className="empty-state">{isLoading ? "Loading trace" : inputError ?? "No trace"}</div>}
          </div>

          <div className="inspector">
            <div>
              <span className="eyebrow">{trace?.metadata.algorithmName ?? activeAlgorithm.label}</span>
              <h2>{currentEvent?.message ?? trace?.metadata.resultSummary ?? "Initial state"}</h2>
            </div>
            {inputError && <p className="error-text">{inputError}</p>}
          </div>
        </section>
      </main>
    </div>
  );
}

function buildRequest(
  algorithm: AlgorithmId,
  inputMode: InputMode,
  randomSort: SortInput,
  randomGraph: GraphInput,
  customJson: string,
): AlgorithmRequest {
  if (inputMode === "example") {
    return exampleRequest(algorithm);
  }

  if (inputMode === "custom") {
    return {
      algorithm,
      inputMode,
      input: parseCustomInput(algorithm, customJson),
      options:
        algorithm === "quicksort"
          ? { type: "quicksort", value: { pivotStrategy: "last" } }
          : { type: "dijkstra", value: { stopAtTarget: true } },
    };
  }

  return algorithm === "quicksort"
    ? {
        algorithm,
        inputMode,
        input: { type: "sort", value: randomSort },
        options: { type: "quicksort", value: { pivotStrategy: "last" } },
      }
    : {
        algorithm,
        inputMode,
        input: { type: "graph", value: randomGraph },
        options: { type: "dijkstra", value: { stopAtTarget: true } },
      };
}

function VisualizationCanvas({ trace, step }: { trace: Trace; step: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const render = () => drawTrace(canvas, trace, step);
    render();

    const observer = new ResizeObserver(render);
    observer.observe(canvas);
    window.addEventListener("resize", render);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", render);
    };
  }, [trace, step]);

  return <canvas ref={canvasRef} aria-label={`${trace.metadata.algorithmName} visualization`} />;
}

function RangeControl({
  label,
  min,
  max,
  value,
  onChange,
  suffix,
}: {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  suffix?: string;
}) {
  return (
    <label className="range-control">
      <span>{label}</span>
      <input
        min={min}
        max={max}
        type="range"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <output>
        {value}
        {suffix ? ` ${suffix}` : ""}
      </output>
    </label>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
