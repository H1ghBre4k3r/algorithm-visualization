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
import {
  randomDagInput,
  randomDistributedInput,
  randomEditDistanceInput,
  randomGraphInput,
  randomSequenceInput,
  randomSortInput,
  randomTimeSyncInput,
  randomTrieInput,
} from "./lib/random";
import { parseCustomInput } from "./lib/validators";
import { drawTrace } from "./render/canvasRenderer";
import type {
  AlgorithmId,
  AlgorithmRequest,
  AvailableAlgorithmId,
  DistributedInput,
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
  const [randomDag, setRandomDag] = useState<GraphInput>(() => randomDagInput(7));
  const [randomDistributed, setRandomDistributed] = useState<DistributedInput>(() => randomDistributedInput(4));
  const [randomTimeSync, setRandomTimeSync] = useState<DistributedInput>(() => randomTimeSyncInput(4));
  const [randomSequence, setRandomSequence] = useState<SequenceInput>(() => randomSequenceInput(32));
  const [randomEditDistance, setRandomEditDistance] = useState<SequenceInput>(() => randomEditDistanceInput(14));
  const [randomTrie, setRandomTrie] = useState<SequenceInput>(() => randomTrieInput(10));
  const [customJson, setCustomJson] = useState<Record<AvailableAlgorithmId, string>>({
    quicksort: customTemplate("quicksort"),
    insertionSort: customTemplate("insertionSort"),
    bubbleSort: customTemplate("bubbleSort"),
    cocktailShakerSort: customTemplate("cocktailShakerSort"),
    oddEvenSort: customTemplate("oddEvenSort"),
    pancakeSort: customTemplate("pancakeSort"),
    quickselect: customTemplate("quickselect"),
    bitonicSort: customTemplate("bitonicSort"),
    selectionSort: customTemplate("selectionSort"),
    shellSort: customTemplate("shellSort"),
    countingSort: customTemplate("countingSort"),
    radixSort: customTemplate("radixSort"),
    bucketSort: customTemplate("bucketSort"),
    combSort: customTemplate("combSort"),
    mergesort: customTemplate("mergesort"),
    timsort: customTemplate("timsort"),
    heapSort: customTemplate("heapSort"),
    bfs: customTemplate("bfs"),
    dfs: customTemplate("dfs"),
    dijkstra: customTemplate("dijkstra"),
    bellmanFord: customTemplate("bellmanFord"),
    aStar: customTemplate("aStar"),
    primMst: customTemplate("primMst"),
    kruskal: customTemplate("kruskal"),
    topologicalSort: customTemplate("topologicalSort"),
    kmp: customTemplate("kmp"),
    boyerMoore: customTemplate("boyerMoore"),
    levenshtein: customTemplate("levenshtein"),
    prefixTrie: customTemplate("prefixTrie"),
    handshake: customTemplate("handshake"),
    timeSync: customTemplate("timeSync"),
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
        randomDag,
        randomDistributed,
        randomTimeSync,
        randomSequence,
        randomEditDistance,
        randomTrie,
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
  }, [
    algorithm,
    inputMode,
    randomSort,
    randomGraph,
    randomDag,
    randomDistributed,
    randomTimeSync,
    randomSequence,
    randomEditDistance,
    randomTrie,
    customJson,
  ]);

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
    if (isSortAlgorithm(algorithm)) {
      setRandomSort(randomSortInput(sortSize));
    } else if (algorithm === "kmp" || algorithm === "boyerMoore") {
      setRandomSequence(randomSequenceInput(sequenceSize));
    } else if (algorithm === "prefixTrie") {
      setRandomTrie(randomTrieInput(sequenceSize));
    } else if (algorithm === "levenshtein") {
      setRandomEditDistance(randomEditDistanceInput(editSize));
    } else if (algorithm === "handshake") {
      setRandomDistributed(randomDistributedInput(graphSize));
    } else if (algorithm === "timeSync") {
      setRandomTimeSync(randomTimeSyncInput(graphSize));
    } else if (algorithm === "topologicalSort") {
      setRandomDag(randomDagInput(graphSize));
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
              {isSortAlgorithm(algorithm) && (
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
                    if (algorithm === "topologicalSort") {
                      setRandomDag(randomDagInput(value));
                    } else {
                      setRandomGraph(randomGraphInput(value));
                    }
                  }}
                />
              )}
              {(algorithm === "handshake" || algorithm === "timeSync") && (
                <RangeControl
                  label="Peers"
                  min={algorithm === "timeSync" ? 3 : 2}
                  max={8}
                  value={graphSize}
                  onChange={(value) => {
                    setGraphSize(value);
                    if (algorithm === "timeSync") {
                      setRandomTimeSync(randomTimeSyncInput(value));
                    } else {
                      setRandomDistributed(randomDistributedInput(value));
                    }
                  }}
                />
              )}
              {(algorithm === "kmp" || algorithm === "boyerMoore" || algorithm === "prefixTrie") && (
                <RangeControl
                  label={algorithm === "prefixTrie" ? "Words" : "Length"}
                  min={algorithm === "prefixTrie" ? 4 : 12}
                  max={algorithm === "prefixTrie" ? 16 : 80}
                  value={sequenceSize}
                  onChange={(value) => {
                    setSequenceSize(value);
                    if (algorithm === "prefixTrie") {
                      setRandomTrie(randomTrieInput(value));
                    } else {
                      setRandomSequence(randomSequenceInput(value));
                    }
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
  randomDag: GraphInput,
  randomDistributed: DistributedInput,
  randomTimeSync: DistributedInput,
  randomSequence: SequenceInput,
  randomEditDistance: SequenceInput,
  randomTrie: SequenceInput,
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

  if (isSortAlgorithm(algorithm)) {
    const sortInput = algorithm === "bitonicSort" ? normalizeBitonicSortInput(randomSort) : randomSort;
    return {
      algorithm,
      inputMode,
      input: { type: "sort", value: sortInput },
      options: optionsForAlgorithm(algorithm),
    };
  }
  if (algorithm === "kmp" || algorithm === "boyerMoore") {
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
  if (algorithm === "prefixTrie") {
    return {
      algorithm,
      inputMode,
      input: { type: "sequence", value: randomTrie },
      options: optionsForAlgorithm(algorithm),
    };
  }
  if (algorithm === "handshake") {
    return {
      algorithm,
      inputMode,
      input: { type: "distributed", value: randomDistributed },
      options: optionsForAlgorithm(algorithm),
    };
  }
  if (algorithm === "timeSync") {
    return {
      algorithm,
      inputMode,
      input: { type: "distributed", value: randomTimeSync },
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
  if (algorithm === "topologicalSort") {
    return {
      algorithm,
      inputMode,
      input: { type: "graph", value: randomDag },
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
  if (algorithm === "insertionSort") {
    return { type: "insertionSort", value: {} };
  }
  if (algorithm === "bubbleSort") {
    return { type: "bubbleSort", value: {} };
  }
  if (algorithm === "cocktailShakerSort") {
    return { type: "cocktailShakerSort", value: {} };
  }
  if (algorithm === "oddEvenSort") {
    return { type: "oddEvenSort", value: {} };
  }
  if (algorithm === "pancakeSort") {
    return { type: "pancakeSort", value: {} };
  }
  if (algorithm === "quickselect") {
    return { type: "quickselect", value: {} };
  }
  if (algorithm === "bitonicSort") {
    return { type: "bitonicSort", value: {} };
  }
  if (algorithm === "selectionSort") {
    return { type: "selectionSort", value: {} };
  }
  if (algorithm === "shellSort") {
    return { type: "shellSort", value: {} };
  }
  if (algorithm === "countingSort") {
    return { type: "countingSort", value: {} };
  }
  if (algorithm === "radixSort") {
    return { type: "radixSort", value: {} };
  }
  if (algorithm === "bucketSort") {
    return { type: "bucketSort", value: {} };
  }
  if (algorithm === "combSort") {
    return { type: "combSort", value: {} };
  }
  if (algorithm === "mergesort") {
    return { type: "mergesort", value: {} };
  }
  if (algorithm === "timsort") {
    return { type: "timsort", value: {} };
  }
  if (algorithm === "heapSort") {
    return { type: "heapSort", value: {} };
  }
  if (algorithm === "kmp") {
    return { type: "kmp", value: {} };
  }
  if (algorithm === "boyerMoore") {
    return { type: "boyerMoore", value: {} };
  }
  if (algorithm === "levenshtein") {
    return { type: "levenshtein", value: {} };
  }
  if (algorithm === "prefixTrie") {
    return { type: "prefixTrie", value: {} };
  }
  if (algorithm === "handshake") {
    return { type: "handshake", value: {} };
  }
  if (algorithm === "timeSync") {
    return { type: "timeSync", value: {} };
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
  if (algorithm === "kruskal") {
    return { type: "kruskal", value: {} };
  }
  if (algorithm === "topologicalSort") {
    return { type: "topologicalSort", value: {} };
  }
  if (algorithm === "bellmanFord") {
    return { type: "bellmanFord", value: {} };
  }
  if (algorithm === "aStar") {
    return { type: "aStar", value: { stopAtTarget: true } };
  }
  return { type: "dijkstra", value: { stopAtTarget: true } };
}

function randomControlLabel(algorithm: AvailableAlgorithmId) {
  if (isSortAlgorithm(algorithm)) return "Values";
  if (algorithm === "prefixTrie") return "Words";
  if (algorithm === "handshake" || algorithm === "timeSync") return "Peers";
  if (algorithm === "kmp" || algorithm === "boyerMoore" || algorithm === "levenshtein") return "Text";
  return "Nodes";
}

function isSortAlgorithm(algorithm: AvailableAlgorithmId) {
  return (
    algorithm === "quicksort" ||
    algorithm === "insertionSort" ||
    algorithm === "bubbleSort" ||
    algorithm === "cocktailShakerSort" ||
    algorithm === "oddEvenSort" ||
    algorithm === "pancakeSort" ||
    algorithm === "quickselect" ||
    algorithm === "bitonicSort" ||
    algorithm === "selectionSort" ||
    algorithm === "shellSort" ||
    algorithm === "countingSort" ||
    algorithm === "radixSort" ||
    algorithm === "bucketSort" ||
    algorithm === "combSort" ||
    algorithm === "mergesort" ||
    algorithm === "timsort" ||
    algorithm === "heapSort"
  );
}

function normalizeBitonicSortInput(input: SortInput): SortInput {
  const size = input.values.length <= 8 ? 8 : input.values.length <= 16 ? 16 : 32;
  const values = [...input.values];
  while (values.length < size) {
    values.push(5 + Math.floor(Math.random() * 96));
  }
  return { values: values.slice(0, size) };
}

function isGraphAlgorithm(algorithm: AvailableAlgorithmId) {
  return (
    algorithm === "bfs" ||
    algorithm === "dfs" ||
    algorithm === "dijkstra" ||
    algorithm === "bellmanFord" ||
    algorithm === "aStar" ||
    algorithm === "primMst" ||
    algorithm === "kruskal" ||
    algorithm === "topologicalSort"
  );
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
