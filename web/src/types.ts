export type AvailableAlgorithmId = "quicksort" | "dijkstra";
export type PlannedAlgorithmId =
  | "kmp"
  | "boyerMoore"
  | "levenshtein"
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
  | { type: "graph"; value: GraphInput };

export type AlgorithmOptions =
  | { type: "quicksort"; value: QuicksortOptions }
  | { type: "dijkstra"; value: DijkstraOptions };

export interface QuicksortOptions {
  pivotStrategy: "last";
}

export interface DijkstraOptions {
  stopAtTarget: boolean;
}

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
    };
