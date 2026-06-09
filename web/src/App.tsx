import { useEffect, useRef, useState } from "react";
import {
  Pause,
  Play,
  RefreshCw,
  RotateCcw,
  Shuffle,
  SkipForward,
} from "lucide-react";

import {
  algorithms,
  categories,
  categoryForAlgorithm,
  firstAvailableAlgorithm,
  type CategoryId,
} from "./data/catalog";
import { customTemplate, exampleRequest } from "./data/examples";
import { generateTrace } from "./lib/engine";
import { randomEditDistanceInput, randomGraphInput, randomSequenceInput, randomSortInput } from "./lib/random";
import { parseCustomInput } from "./lib/validators";
import { drawTrace } from "./render/canvasRenderer";
import type {
  AlgorithmId,
  AlgorithmRequest,
  AvailableAlgorithmId,
  GraphInput,
  InputMode,
  SequenceInput,
  SortInput,
  Trace,
} from "./types";

const inputModes: Array<{ id: InputMode; label: string }> = [
  { id: "example", label: "Example" },
  { id: "random", label: "Random" },
  { id: "custom", label: "Custom JSON" },
];

export default function App() {
  const [category, setCategory] = useState<CategoryId>("sorting");
  const [algorithm, setAlgorithm] = useState<AvailableAlgorithmId>("quicksort");
  const [inputMode, setInputMode] = useState<InputMode>("example");
  const [sortSize, setSortSize] = useState(18);
  const [graphSize, setGraphSize] = useState(7);
  const [sequenceSize, setSequenceSize] = useState(32);
  const [editSize, setEditSize] = useState(14);
  const [randomSort, setRandomSort] = useState<SortInput>(() => randomSortInput(18));
  const [randomGraph, setRandomGraph] = useState<GraphInput>(() => randomGraphInput(7));
  const [randomSequence, setRandomSequence] = useState<SequenceInput>(() => randomSequenceInput(32));
  const [randomEditDistance, setRandomEditDistance] = useState<SequenceInput>(() => randomEditDistanceInput(14));
  const [customJson, setCustomJson] = useState<Record<AvailableAlgorithmId, string>>({
    quicksort: customTemplate("quicksort"),
    bfs: customTemplate("bfs"),
    dfs: customTemplate("dfs"),
    dijkstra: customTemplate("dijkstra"),
    primMst: customTemplate("primMst"),
    kmp: customTemplate("kmp"),
    levenshtein: customTemplate("levenshtein"),
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
      request = buildRequest(
        algorithm,
        inputMode,
        randomSort,
        randomGraph,
        randomSequence,
        randomEditDistance,
        customJson[algorithm],
      );
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
  }, [algorithm, inputMode, randomSort, randomGraph, randomSequence, randomEditDistance, customJson]);

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

  const activeCategory = categories.find((item) => item.id === category) ?? categories[0];
  const visibleAlgorithms = algorithms.filter((item) => item.category === category);
  const activeAlgorithm = algorithms.find((item) => item.id === algorithm) ?? algorithms[0];
  const currentEvent = step > 0 ? (trace?.events[step - 1] ?? null) : null;
  const canPlay = Boolean(trace && trace.events.length > 0 && step < trace.events.length);

  function refreshRandomInput() {
    if (algorithm === "quicksort") {
      setRandomSort(randomSortInput(sortSize));
    } else if (algorithm === "kmp") {
      setRandomSequence(randomSequenceInput(sequenceSize));
    } else if (algorithm === "levenshtein") {
      setRandomEditDistance(randomEditDistanceInput(editSize));
    } else {
      setRandomGraph(randomGraphInput(graphSize));
    }
  }

  function resetCustomTemplate() {
    setCustomJson((current) => ({ ...current, [algorithm]: customTemplate(algorithm) }));
  }

  function selectCategory(nextCategory: CategoryId) {
    setCategory(nextCategory);
    const availableAlgorithm = firstAvailableAlgorithm(nextCategory);
    if (availableAlgorithm) {
      setAlgorithm(availableAlgorithm);
      setInputMode("example");
      setInputError(null);
    } else {
      setTrace(null);
      setInputError("This category is planned. Choose an available algorithm to generate a trace.");
    }
    setStep(0);
    setIsPlaying(false);
  }

  function selectAlgorithm(nextAlgorithm: AlgorithmId) {
    const item = algorithms.find((candidate) => candidate.id === nextAlgorithm);
    if (!item || item.status !== "available") {
      setTrace(null);
      setInputError(`${item?.label ?? "This algorithm"} is planned and does not generate traces yet.`);
      setStep(0);
      setIsPlaying(false);
      return;
    }

    setCategory(categoryForAlgorithm(item.id));
    setAlgorithm(item.id);
    setInputMode("example");
    setInputError(null);
    setStep(0);
    setIsPlaying(false);
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">AV</span>
          <div>
            <h1>Algorithm Visualization</h1>
            <p>{activeCategory.label}</p>
          </div>
        </div>
        <div className="category-tabs" role="tablist" aria-label="Category">
          {categories.map((item) => (
            <button
              key={item.id}
              className={item.id === category ? "tab active" : "tab"}
              type="button"
              onClick={() => selectCategory(item.id)}
            >
              <span>{item.label}</span>
              <small>{item.summary}</small>
            </button>
          ))}
        </div>
      </header>

      <main className="workspace">
        <aside className="control-panel">
          <section className="control-section">
            <h2>Algorithm</h2>
            <div className="algorithm-list" role="list" aria-label="Algorithm">
              {visibleAlgorithms.map((item) => (
                <button
                  key={item.id}
                  className={item.id === algorithm && item.status === "available" ? "algorithm-option active" : "algorithm-option"}
                  type="button"
                  onClick={() => selectAlgorithm(item.id)}
                >
                  <span>
                    <strong>{item.label}</strong>
                    <small>{item.summary}</small>
                  </span>
                  <em>{item.status === "available" ? "Live" : "Planned"}</em>
                </button>
              ))}
            </div>
          </section>

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
                <h2>{randomControlLabel(algorithm)}</h2>
                <button className="icon-button" type="button" title="Generate" onClick={refreshRandomInput}>
                  <Shuffle size={18} />
                </button>
              </div>
              {algorithm === "quicksort" && (
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
              )}
              {isGraphAlgorithm(algorithm) && (
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
              {algorithm === "kmp" && (
                <RangeControl
                  label="Length"
                  min={12}
                  max={80}
                  value={sequenceSize}
                  onChange={(value) => {
                    setSequenceSize(value);
                    setRandomSequence(randomSequenceInput(value));
                  }}
                />
              )}
              {algorithm === "levenshtein" && (
                <RangeControl
                  label="Length"
                  min={6}
                  max={36}
                  value={editSize}
                  onChange={(value) => {
                    setEditSize(value);
                    setRandomEditDistance(randomEditDistanceInput(value));
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
  algorithm: AvailableAlgorithmId,
  inputMode: InputMode,
  randomSort: SortInput,
  randomGraph: GraphInput,
  randomSequence: SequenceInput,
  randomEditDistance: SequenceInput,
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
      options: optionsForAlgorithm(algorithm),
    };
  }

  if (algorithm === "quicksort") {
    return {
      algorithm,
      inputMode,
      input: { type: "sort", value: randomSort },
      options: optionsForAlgorithm(algorithm),
    };
  }
  if (algorithm === "kmp") {
    return {
      algorithm,
      inputMode,
      input: { type: "sequence", value: randomSequence },
      options: optionsForAlgorithm(algorithm),
    };
  }
  if (algorithm === "levenshtein") {
    return {
      algorithm,
      inputMode,
      input: { type: "sequence", value: randomEditDistance },
      options: optionsForAlgorithm(algorithm),
    };
  }
  if (algorithm === "primMst") {
    return {
      algorithm,
      inputMode,
      input: { type: "graph", value: randomGraph },
      options: optionsForAlgorithm(algorithm),
    };
  }
  return {
    algorithm,
    inputMode,
    input: { type: "graph", value: randomGraph },
    options: optionsForAlgorithm(algorithm),
  };
}

function optionsForAlgorithm(algorithm: AvailableAlgorithmId): AlgorithmRequest["options"] {
  if (algorithm === "quicksort") {
    return { type: "quicksort", value: { pivotStrategy: "last" } };
  }
  if (algorithm === "kmp") {
    return { type: "kmp", value: {} };
  }
  if (algorithm === "levenshtein") {
    return { type: "levenshtein", value: {} };
  }
  if (algorithm === "bfs") {
    return { type: "bfs", value: { stopAtTarget: true } };
  }
  if (algorithm === "dfs") {
    return { type: "dfs", value: { stopAtTarget: true } };
  }
  if (algorithm === "primMst") {
    return { type: "primMst", value: {} };
  }
  return { type: "dijkstra", value: { stopAtTarget: true } };
}

function randomControlLabel(algorithm: AvailableAlgorithmId) {
  if (algorithm === "quicksort") return "Values";
  if (algorithm === "kmp" || algorithm === "levenshtein") return "Text";
  return "Nodes";
}

function isGraphAlgorithm(algorithm: AvailableAlgorithmId) {
  return algorithm === "bfs" || algorithm === "dfs" || algorithm === "dijkstra" || algorithm === "primMst";
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
