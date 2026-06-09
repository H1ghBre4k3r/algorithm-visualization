import type {
  AlgorithmRequest,
  GraphEdge,
  GraphInput,
  NodeDistance,
  SortInput,
  Trace,
  TraceEvent,
} from "../types";

export function generateTraceFallback(request: AlgorithmRequest): Trace {
  if (request.algorithm === "quicksort" && request.input.type === "sort") {
    return traceQuicksort(request.input.value);
  }

  if (request.algorithm === "dijkstra" && request.input.type === "graph") {
    const stopAtTarget =
      request.options?.type === "dijkstra" ? request.options.value.stopAtTarget : true;
    return traceDijkstra(request.input.value, stopAtTarget);
  }

  throw new Error("Algorithm and input type do not match.");
}

function traceQuicksort(input: SortInput): Trace {
  const initialValues = [...input.values];
  const values = [...input.values];
  const events: TraceEvent[] = [];

  if (values.length > 128) {
    throw new Error("Quicksort input is capped at 128 values for interactive playback.");
  }

  if (values.length > 0) {
    quicksortRange(values, 0, values.length - 1, events);
    events.push({
      type: "sortMarkSorted",
      indices: values.map((_, index) => index),
      message: "All values are in sorted order.",
    });
  }

  return {
    algorithm: "quicksort",
    initialState: { type: "array", values: initialValues },
    finalState: { type: "array", values },
    events,
    metadata: {
      algorithmName: "Quicksort",
      category: "Sorting",
      inputSize: values.length,
      eventCount: events.length,
      resultSummary: `Sorted ${values.length} values.`,
    },
  };
}

function quicksortRange(values: number[], low: number, high: number, events: TraceEvent[]) {
  if (low >= high) {
    events.push({
      type: "sortMarkSorted",
      indices: [low],
      message: `Value at index ${low} is fixed.`,
    });
    return;
  }

  const pivotIndex = high;
  const pivotValue = values[pivotIndex];
  events.push({
    type: "sortPivot",
    index: pivotIndex,
    value: pivotValue,
    range: [low, high],
    message: `Choose ${pivotValue} at index ${pivotIndex} as the pivot.`,
  });

  let boundary = low;
  for (let scanner = low; scanner < high; scanner += 1) {
    events.push({
      type: "sortCompare",
      indices: [scanner, pivotIndex],
      message: `Compare ${values[scanner]} at index ${scanner} with pivot ${pivotValue}.`,
    });
    events.push({
      type: "sortPartition",
      range: [low, high],
      boundary,
      scanner,
      message: `Partition boundary is at index ${boundary}.`,
    });

    if (values[scanner] <= pivotValue) {
      if (boundary !== scanner) {
        swap(values, boundary, scanner);
        events.push({
          type: "sortSwap",
          indices: [boundary, scanner],
          values: [...values],
          message: `Move ${values[boundary]} into the left partition.`,
        });
      }
      boundary += 1;
    }
  }

  if (boundary !== pivotIndex) {
    swap(values, boundary, pivotIndex);
    events.push({
      type: "sortSwap",
      indices: [boundary, pivotIndex],
      values: [...values],
      message: `Place pivot ${pivotValue} at index ${boundary}.`,
    });
  }

  events.push({
    type: "sortMarkSorted",
    indices: [boundary],
    message: `Pivot ${pivotValue} is fixed at index ${boundary}.`,
  });

  if (boundary > low) {
    const leftHigh = boundary - 1;
    if (low === leftHigh) {
      events.push({
        type: "sortMarkSorted",
        indices: [low],
        message: `Value at index ${low} is fixed.`,
      });
    } else {
      quicksortRange(values, low, leftHigh, events);
    }
  }

  if (boundary < high) {
    const rightLow = boundary + 1;
    if (rightLow === high) {
      events.push({
        type: "sortMarkSorted",
        indices: [rightLow],
        message: `Value at index ${rightLow} is fixed.`,
      });
    } else {
      quicksortRange(values, rightLow, high, events);
    }
  }
}

function traceDijkstra(input: GraphInput, stopAtTarget: boolean): Trace {
  validateGraph(input);

  const nodeOrder = input.nodes.map((node) => node.id);
  const distances = new Map<string, number | null>();
  const previous = new Map<string, string>();
  const unvisited = new Set(nodeOrder);
  const adjacency = buildAdjacency(input.edges);
  const events: TraceEvent[] = [];

  for (const node of nodeOrder) {
    distances.set(node, node === input.source ? 0 : null);
  }

  while (unvisited.size > 0) {
    const current = pickNearestUnvisited(nodeOrder, unvisited, distances);
    if (!current) {
      break;
    }

    events.push({
      type: "graphVisit",
      node: current.node,
      distance: current.distance,
      message: `Visit node ${current.node} at distance ${current.distance}.`,
    });

    for (const edge of adjacency.get(current.node) ?? []) {
      const previousDistance = distances.get(edge.to) ?? null;
      const candidate = current.distance + edge.weight;
      const improved = previousDistance === null || candidate < previousDistance;

      if (improved) {
        distances.set(edge.to, candidate);
        previous.set(edge.to, current.node);
      }

      events.push({
        type: "graphRelaxEdge",
        edgeId: edge.edgeId,
        from: current.node,
        to: edge.to,
        weight: edge.weight,
        previousDistance,
        newDistance: improved ? candidate : previousDistance,
        improved,
        message: improved
          ? `Update ${edge.to} to distance ${candidate}.`
          : `Keep ${edge.to} at its current best distance.`,
      });
    }

    unvisited.delete(current.node);
    events.push({
      type: "graphSettle",
      node: current.node,
      distance: current.distance,
      message: `Settle node ${current.node}.`,
    });

    if (stopAtTarget && input.target === current.node) {
      break;
    }
  }

  const [path, totalDistance] = input.target
    ? reconstructPath(input.source, input.target, previous, distances)
    : [[], null];

  if (input.target) {
    events.push({
      type: "graphPath",
      nodes: path,
      totalDistance,
      message:
        totalDistance === null
          ? "No path reaches the selected target."
          : `Shortest path has total distance ${totalDistance}.`,
    });
  }

  const initialDistances = nodeOrder.map<NodeDistance>((node) => ({
    node,
    distance: node === input.source ? 0 : null,
  }));
  const finalDistances = nodeOrder.map<NodeDistance>((node) => ({
    node,
    distance: distances.get(node) ?? null,
  }));

  return {
    algorithm: "dijkstra",
    initialState: {
      type: "graph",
      nodes: input.nodes,
      edges: input.edges,
      source: input.source,
      target: input.target ?? null,
      distances: initialDistances,
      path: [],
    },
    finalState: {
      type: "graph",
      nodes: input.nodes,
      edges: input.edges,
      source: input.source,
      target: input.target ?? null,
      distances: finalDistances,
      path,
    },
    events,
    metadata: {
      algorithmName: "Dijkstra",
      category: "Graph",
      inputSize: input.nodes.length,
      eventCount: events.length,
      resultSummary:
        totalDistance === null
          ? "No reachable target path found."
          : `Shortest path distance is ${totalDistance}.`,
    },
  };
}

interface AdjacentEdge {
  edgeId: string;
  to: string;
  weight: number;
}

function buildAdjacency(edges: GraphEdge[]) {
  const adjacency = new Map<string, AdjacentEdge[]>();
  for (const edge of edges) {
    const forward = adjacency.get(edge.from) ?? [];
    forward.push({ edgeId: edge.id, to: edge.to, weight: edge.weight });
    adjacency.set(edge.from, forward);

    if (!edge.directed) {
      const backward = adjacency.get(edge.to) ?? [];
      backward.push({ edgeId: edge.id, to: edge.from, weight: edge.weight });
      adjacency.set(edge.to, backward);
    }
  }
  return adjacency;
}

function pickNearestUnvisited(
  nodeOrder: string[],
  unvisited: Set<string>,
  distances: Map<string, number | null>,
) {
  let best: { node: string; distance: number } | null = null;

  for (const node of nodeOrder) {
    if (!unvisited.has(node)) {
      continue;
    }

    const distance = distances.get(node);
    if (distance === null || distance === undefined) {
      continue;
    }

    if (!best || distance < best.distance) {
      best = { node, distance };
    }
  }

  return best;
}

function reconstructPath(
  source: string,
  target: string,
  previous: Map<string, string>,
  distances: Map<string, number | null>,
): [string[], number | null] {
  const totalDistance = distances.get(target) ?? null;
  if (totalDistance === null) {
    return [[], null];
  }

  if (source === target) {
    return [[source], totalDistance];
  }

  const path = [target];
  let current = target;
  while (current !== source) {
    const parent = previous.get(current);
    if (!parent) {
      return [[], null];
    }
    path.push(parent);
    current = parent;
  }

  path.reverse();
  return [path, totalDistance];
}

function validateGraph(input: GraphInput) {
  if (input.nodes.length === 0) {
    throw new Error("Graph input needs at least one node.");
  }

  const nodes = new Set(input.nodes.map((node) => node.id));
  if (!nodes.has(input.source)) {
    throw new Error(`Source node '${input.source}' does not exist.`);
  }
  if (input.target && !nodes.has(input.target)) {
    throw new Error(`Target node '${input.target}' does not exist.`);
  }
  for (const edge of input.edges) {
    if (!nodes.has(edge.from) || !nodes.has(edge.to)) {
      throw new Error(`Edge '${edge.id}' references an unknown node.`);
    }
  }
}

function swap(values: number[], left: number, right: number) {
  const next = values[left];
  values[left] = values[right];
  values[right] = next;
}
