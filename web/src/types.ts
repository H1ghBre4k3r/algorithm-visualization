export type AvailableAlgorithmId =
  | "quicksort"
  | "insertionSort"
  | "bubbleSort"
  | "mergesort"
  | "heapSort"
  | "bfs"
  | "dfs"
  | "dijkstra"
  | "bellmanFord"
  | "primMst"
  | "kruskal"
  | "kmp"
  | "levenshtein";
export type PlannedAlgorithmId =
  | "boyerMoore"
  | "prefixTrie"
  | "handshake"
  | "timeSync"
  | "paxos";
export type AlgorithmId = AvailableAlgorithmId | PlannedAlgorithmId;
export type InputMode = "example" | "random" | "custom";

export interface AlgorithmRequest {
  algorithm: AlgorithmId;
  inputMode: InputMode;
  input: InputData;
  options?: AlgorithmOptions;
}

export type InputData =
  | { type: "sort"; value: SortInput }
  | { type: "graph"; value: GraphInput }
  | { type: "sequence"; value: SequenceInput };

export type AlgorithmOptions =
  | { type: "quicksort"; value: QuicksortOptions }
  | { type: "insertionSort"; value: InsertionSortOptions }
  | { type: "bubbleSort"; value: BubbleSortOptions }
  | { type: "mergesort"; value: MergesortOptions }
  | { type: "heapSort"; value: HeapSortOptions }
  | { type: "bfs"; value: BfsOptions }
  | { type: "dfs"; value: DfsOptions }
  | { type: "dijkstra"; value: DijkstraOptions }
  | { type: "bellmanFord"; value: BellmanFordOptions }
  | { type: "primMst"; value: PrimMstOptions }
  | { type: "kruskal"; value: KruskalOptions }
  | { type: "kmp"; value: KmpOptions }
  | { type: "levenshtein"; value: LevenshteinOptions };

export interface QuicksortOptions {
  pivotStrategy: "last";
}

export type InsertionSortOptions = Record<string, never>;
export type BubbleSortOptions = Record<string, never>;
export type MergesortOptions = Record<string, never>;
export type HeapSortOptions = Record<string, never>;

export interface BfsOptions {
  stopAtTarget: boolean;
}

export interface DfsOptions {
  stopAtTarget: boolean;
}

export interface DijkstraOptions {
  stopAtTarget: boolean;
}

export type BellmanFordOptions = Record<string, never>;
export type PrimMstOptions = Record<string, never>;
export type KruskalOptions = Record<string, never>;
export type KmpOptions = Record<string, never>;
export type LevenshteinOptions = Record<string, never>;

export interface SortInput {
  values: number[];
}

export interface GraphInput {
  nodes: GraphNode[];
  edges: GraphEdge[];
  source: string;
  target?: string | null;
}

export interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

export interface GraphEdge {
  id: string;
  from: string;
  to: string;
  weight: number;
  directed?: boolean;
}

export interface SequenceInput {
  text: string;
  pattern: string;
}

export interface Trace {
  algorithm: AlgorithmId;
  initialState: VisualizationState;
  finalState: VisualizationState;
  events: TraceEvent[];
  metadata: TraceMetadata;
}

export type VisualizationState =
  | { type: "array"; values: number[] }
  | {
      type: "graph";
      nodes: GraphNode[];
      edges: GraphEdge[];
      source: string;
      target?: string | null;
      distances: NodeDistance[];
      path: string[];
    }
  | {
      type: "sequence";
      text: string;
      pattern: string;
      lps: number[];
      matches: number[];
      matrix: Array<Array<number | null>>;
    };

export interface NodeDistance {
  node: string;
  distance: number | null;
}

export interface TraceMetadata {
  algorithmName: string;
  category: string;
  inputSize: number;
  eventCount: number;
  resultSummary: string;
}

export type TraceEvent =
  | {
      type: "sortPivot";
      index: number;
      value: number;
      range: [number, number];
      message: string;
    }
  | {
      type: "sortCompare";
      indices: [number, number];
      message: string;
    }
  | {
      type: "sortSwap";
      indices: [number, number];
      values: number[];
      message: string;
    }
  | {
      type: "sortPartition";
      range: [number, number];
      boundary: number;
      scanner: number;
      message: string;
    }
  | {
      type: "sortMarkSorted";
      indices: number[];
      message: string;
    }
  | {
      type: "graphVisit";
      node: string;
      distance: number;
      message: string;
    }
  | {
      type: "graphRelaxEdge";
      edgeId: string;
      from: string;
      to: string;
      weight: number;
      previousDistance: number | null;
      newDistance: number | null;
      improved: boolean;
      message: string;
    }
  | {
      type: "graphSettle";
      node: string;
      distance: number;
      message: string;
    }
  | {
      type: "graphPath";
      nodes: string[];
      totalDistance: number | null;
      message: string;
    }
  | {
      type: "graphConsiderEdge";
      edgeId: string;
      from: string;
      to: string;
      weight: number;
      message: string;
    }
  | {
      type: "graphSelectEdge";
      edgeId: string;
      from: string;
      to: string;
      weight: number;
      totalWeight: number;
      message: string;
    }
  | {
      type: "graphRejectEdge";
      edgeId: string;
      from: string;
      to: string;
      weight: number;
      message: string;
    }
  | {
      type: "graphSpanningTree";
      edgeIds: string[];
      totalWeight: number;
      message: string;
    }
  | {
      type: "sequenceBuildPrefix";
      patternIndex: number;
      prefixIndex: number;
      lps: number[];
      message: string;
    }
  | {
      type: "sequenceCompare";
      textIndex: number;
      patternIndex: number;
      matched: boolean;
      message: string;
    }
  | {
      type: "sequenceFallback";
      fromPatternIndex: number;
      toPatternIndex: number;
      message: string;
    }
  | {
      type: "sequenceMatch";
      startIndex: number;
      endIndex: number;
      message: string;
    }
  | {
      type: "sequenceEditCell";
      row: number;
      col: number;
      deletion: number;
      insertion: number;
      substitution: number;
      value: number;
      operation: string;
      matrix: Array<Array<number | null>>;
      message: string;
    };
