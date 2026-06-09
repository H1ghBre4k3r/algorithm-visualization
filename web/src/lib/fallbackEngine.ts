import type {
  AlgorithmRequest,
  GraphEdge,
  GraphInput,
  NodeDistance,
  SequenceInput,
  SortInput,
  Trace,
  TraceEvent,
} from "../types";

export function generateTraceFallback(request: AlgorithmRequest): Trace {
  if (request.algorithm === "quicksort" && request.input.type === "sort") {
    return traceQuicksort(request.input.value);
  }

  if (request.algorithm === "insertionSort" && request.input.type === "sort") {
    return traceInsertionSort(request.input.value);
  }

  if (request.algorithm === "bubbleSort" && request.input.type === "sort") {
    return traceBubbleSort(request.input.value);
  }

  if (request.algorithm === "dijkstra" && request.input.type === "graph") {
    const stopAtTarget =
      request.options?.type === "dijkstra" ? request.options.value.stopAtTarget : true;
    return traceDijkstra(request.input.value, stopAtTarget);
  }

  if (request.algorithm === "bfs" && request.input.type === "graph") {
    const stopAtTarget = request.options?.type === "bfs" ? request.options.value.stopAtTarget : true;
    return traceBfs(request.input.value, stopAtTarget);
  }

  if (request.algorithm === "dfs" && request.input.type === "graph") {
    const stopAtTarget = request.options?.type === "dfs" ? request.options.value.stopAtTarget : true;
    return traceDfs(request.input.value, stopAtTarget);
  }

  if (request.algorithm === "primMst" && request.input.type === "graph") {
    return tracePrimMst(request.input.value);
  }

  if (request.algorithm === "kmp" && request.input.type === "sequence") {
    return traceKmp(request.input.value);
  }

  if (request.algorithm === "levenshtein" && request.input.type === "sequence") {
    return traceLevenshtein(request.input.value);
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

function traceInsertionSort(input: SortInput): Trace {
  const initialValues = [...input.values];
  const values = [...input.values];
  const events: TraceEvent[] = [];

  if (values.length > 128) {
    throw new Error("Insertion Sort input is capped at 128 values for interactive playback.");
  }

  if (values.length > 0) {
    events.push({
      type: "sortMarkSorted",
      indices: [0],
      message: "Start with the first value as the sorted prefix.",
    });
  }

  for (let index = 1; index < values.length; index += 1) {
    let cursor = index;
    events.push({
      type: "sortPartition",
      range: [0, index],
      boundary: index,
      scanner: index,
      message: `Insert value ${values[index]} into the sorted prefix.`,
    });

    while (cursor > 0) {
      events.push({
        type: "sortCompare",
        indices: [cursor - 1, cursor],
        message: `Compare ${values[cursor - 1]} and ${values[cursor]} around insertion cursor ${cursor}.`,
      });

      if (values[cursor - 1] <= values[cursor]) {
        break;
      }

      swap(values, cursor - 1, cursor);
      events.push({
        type: "sortSwap",
        indices: [cursor - 1, cursor],
        values: [...values],
        message: `Shift ${values[cursor - 1]} left into the sorted prefix.`,
      });
      cursor -= 1;
    }

    events.push({
      type: "sortMarkSorted",
      indices: Array.from({ length: index + 1 }, (_, sortedIndex) => sortedIndex),
      message: `Positions 0 through ${index} are sorted.`,
    });
  }

  return {
    algorithm: "insertionSort",
    initialState: { type: "array", values: initialValues },
    finalState: { type: "array", values },
    events,
    metadata: {
      algorithmName: "Insertion Sort",
      category: "Sorting",
      inputSize: values.length,
      eventCount: events.length,
      resultSummary: `Sorted ${values.length} values.`,
    },
  };
}

function traceBubbleSort(input: SortInput): Trace {
  const initialValues = [...input.values];
  const values = [...input.values];
  const events: TraceEvent[] = [];

  if (values.length > 128) {
    throw new Error("Bubble Sort input is capped at 128 values for interactive playback.");
  }

  if (values.length > 1) {
    for (let pass = 0; pass < values.length; pass += 1) {
      const unsortedEnd = values.length - 1 - pass;
      let swapped = false;

      for (let index = 0; index < unsortedEnd; index += 1) {
        events.push({
          type: "sortCompare",
          indices: [index, index + 1],
          message: `Compare adjacent values ${values[index]} and ${values[index + 1]}.`,
        });

        if (values[index] > values[index + 1]) {
          swap(values, index, index + 1);
          swapped = true;
          events.push({
            type: "sortSwap",
            indices: [index, index + 1],
            values: [...values],
            message: `Swap values at positions ${index} and ${index + 1}.`,
          });
        }
      }

      events.push({
        type: "sortMarkSorted",
        indices: Array.from({ length: values.length - unsortedEnd }, (_, offset) => unsortedEnd + offset),
        message: `Value at index ${unsortedEnd} has bubbled into place.`,
      });

      if (!swapped) {
        events.push({
          type: "sortMarkSorted",
          indices: values.map((_, index) => index),
          message: "No swaps in this pass; all values are sorted.",
        });
        break;
      }
    }
  } else if (values.length === 1) {
    events.push({
      type: "sortMarkSorted",
      indices: [0],
      message: "Single value is already sorted.",
    });
  }

  return {
    algorithm: "bubbleSort",
    initialState: { type: "array", values: initialValues },
    finalState: { type: "array", values },
    events,
    metadata: {
      algorithmName: "Bubble Sort",
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

function traceBfs(input: GraphInput, stopAtTarget: boolean): Trace {
  validateGraph(input);

  const nodeOrder = input.nodes.map((node) => node.id);
  const adjacency = buildAdjacency(input.edges);
  const distances = new Map<string, number | null>(nodeOrder.map((node) => [node, null]));
  const previous = new Map<string, string>();
  const discovered = new Set<string>([input.source]);
  const queue = [input.source];
  const events: TraceEvent[] = [];

  distances.set(input.source, 0);

  while (queue.length > 0) {
    const node = queue.shift() as string;
    const distance = distances.get(node) ?? 0;

    events.push({
      type: "graphVisit",
      node,
      distance,
      message: `Visit node ${node} at breadth-first depth ${distance}.`,
    });

    if (stopAtTarget && input.target === node) {
      events.push({
        type: "graphSettle",
        node,
        distance,
        message: `Reached target node ${node}.`,
      });
      break;
    }

    for (const edge of adjacency.get(node) ?? []) {
      events.push({
        type: "graphConsiderEdge",
        edgeId: edge.edgeId,
        from: node,
        to: edge.to,
        weight: edge.weight,
        message: `Inspect edge ${edge.edgeId} from ${node} to ${edge.to}.`,
      });

      if (discovered.has(edge.to)) {
        const previousDistance = distances.get(edge.to) ?? null;
        events.push({
          type: "graphRelaxEdge",
          edgeId: edge.edgeId,
          from: node,
          to: edge.to,
          weight: edge.weight,
          previousDistance,
          newDistance: previousDistance,
          improved: false,
          message: `${edge.to} was already discovered.`,
        });
        continue;
      }

      const nextDistance = distance + 1;
      discovered.add(edge.to);
      queue.push(edge.to);
      distances.set(edge.to, nextDistance);
      previous.set(edge.to, node);
      events.push({
        type: "graphRelaxEdge",
        edgeId: edge.edgeId,
        from: node,
        to: edge.to,
        weight: edge.weight,
        previousDistance: null,
        newDistance: nextDistance,
        improved: true,
        message: `Discover ${edge.to} at depth ${nextDistance}.`,
      });
    }

    events.push({
      type: "graphSettle",
      node,
      distance,
      message: `Finish scanning node ${node}.`,
    });
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
          : `Shortest unweighted path has ${totalDistance} edges.`,
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
    algorithm: "bfs",
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
      algorithmName: "Breadth-First Search",
      category: "Graph",
      inputSize: input.nodes.length,
      eventCount: events.length,
      resultSummary:
        totalDistance === null
          ? "No reachable target path found."
          : `Shortest unweighted path has ${totalDistance} edges.`,
    },
  };
}

function traceDfs(input: GraphInput, stopAtTarget: boolean): Trace {
  validateGraph(input);

  const nodeOrder = input.nodes.map((node) => node.id);
  const adjacency = buildAdjacency(input.edges);
  const distances = new Map<string, number | null>(nodeOrder.map((node) => [node, null]));
  const previous = new Map<string, string>();
  const visited = new Set<string>();
  const stack: Array<[string, number]> = [[input.source, 0]];
  const events: TraceEvent[] = [];

  distances.set(input.source, 0);

  while (stack.length > 0) {
    const [node, depth] = stack.pop() as [string, number];
    if (visited.has(node)) {
      continue;
    }

    visited.add(node);
    distances.set(node, depth);
    events.push({
      type: "graphVisit",
      node,
      distance: depth,
      message: `Visit node ${node} at depth-first depth ${depth}.`,
    });

    if (stopAtTarget && input.target === node) {
      events.push({
        type: "graphSettle",
        node,
        distance: depth,
        message: `Reached target node ${node}.`,
      });
      break;
    }

    const edges = adjacency.get(node) ?? [];
    for (const edge of edges) {
      events.push({
        type: "graphConsiderEdge",
        edgeId: edge.edgeId,
        from: node,
        to: edge.to,
        weight: edge.weight,
        message: `Inspect edge ${edge.edgeId} from ${node} to ${edge.to}.`,
      });
    }

    for (const edge of [...edges].reverse()) {
      if (visited.has(edge.to) || stack.some(([queued]) => queued === edge.to)) {
        const previousDistance = distances.get(edge.to) ?? null;
        events.push({
          type: "graphRelaxEdge",
          edgeId: edge.edgeId,
          from: node,
          to: edge.to,
          weight: edge.weight,
          previousDistance,
          newDistance: previousDistance,
          improved: false,
          message: `${edge.to} is already scheduled or visited.`,
        });
        continue;
      }

      const nextDepth = depth + 1;
      distances.set(edge.to, nextDepth);
      previous.set(edge.to, node);
      stack.push([edge.to, nextDepth]);
      events.push({
        type: "graphRelaxEdge",
        edgeId: edge.edgeId,
        from: node,
        to: edge.to,
        weight: edge.weight,
        previousDistance: null,
        newDistance: nextDepth,
        improved: true,
        message: `Push ${edge.to} onto the DFS stack at depth ${nextDepth}.`,
      });
    }

    events.push({
      type: "graphSettle",
      node,
      distance: depth,
      message: `Finish node ${node}.`,
    });
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
          : `Depth-first target path has ${totalDistance} edges.`,
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
    algorithm: "dfs",
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
      algorithmName: "Depth-First Search",
      category: "Graph",
      inputSize: input.nodes.length,
      eventCount: events.length,
      resultSummary:
        totalDistance === null
          ? "No reachable target path found."
          : `Depth-first target path has ${totalDistance} edges.`,
    },
  };
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

function tracePrimMst(input: GraphInput): Trace {
  validateGraph(input);
  validateMstGraph(input);

  const nodeOrder = input.nodes.map((node) => node.id);
  const visited = new Set<string>([input.source]);
  const selectedEdges: string[] = [];
  const events: TraceEvent[] = [
    {
      type: "graphVisit",
      node: input.source,
      distance: 0,
      message: `Start the spanning tree at node ${input.source}.`,
    },
  ];
  let totalWeight = 0;

  while (visited.size < input.nodes.length) {
    let best: { edge: GraphEdge; index: number; from: string; to: string } | null = null;

    for (const [index, edge] of input.edges.entries()) {
      const fromVisited = visited.has(edge.from);
      const toVisited = visited.has(edge.to);

      if (fromVisited === toVisited) {
        if (fromVisited) {
          events.push({
            type: "graphRejectEdge",
            edgeId: edge.id,
            from: edge.from,
            to: edge.to,
            weight: edge.weight,
            message: `Reject edge ${edge.id} because both endpoints are already in the tree.`,
          });
        }
        continue;
      }

      const from = fromVisited ? edge.from : edge.to;
      const to = fromVisited ? edge.to : edge.from;
      events.push({
        type: "graphConsiderEdge",
        edgeId: edge.id,
        from,
        to,
        weight: edge.weight,
        message: `Consider edge ${edge.id} from ${from} to ${to} with weight ${edge.weight}.`,
      });

      if (!best || edge.weight < best.edge.weight || (edge.weight === best.edge.weight && index < best.index)) {
        best = { edge, index, from, to };
      }
    }

    if (!best) {
      throw new Error("Prim MST requires a connected graph to span every node.");
    }

    visited.add(best.to);
    selectedEdges.push(best.edge.id);
    totalWeight += best.edge.weight;
    events.push({
      type: "graphSelectEdge",
      edgeId: best.edge.id,
      from: best.from,
      to: best.to,
      weight: best.edge.weight,
      totalWeight,
      message: `Select edge ${best.edge.id} and add node ${best.to} to the tree.`,
    });
    events.push({
      type: "graphSettle",
      node: best.to,
      distance: totalWeight,
      message: `Node ${best.to} is now connected to the spanning tree.`,
    });
  }

  events.push({
    type: "graphSpanningTree",
    edgeIds: selectedEdges,
    totalWeight,
    message: `Minimum spanning tree complete with total weight ${totalWeight}.`,
  });

  const distances = nodeOrder.map<NodeDistance>((node) => ({ node, distance: null }));

  return {
    algorithm: "primMst",
    initialState: {
      type: "graph",
      nodes: input.nodes,
      edges: input.edges,
      source: input.source,
      target: null,
      distances,
      path: [],
    },
    finalState: {
      type: "graph",
      nodes: input.nodes,
      edges: input.edges,
      source: input.source,
      target: null,
      distances,
      path: selectedEdges,
    },
    events,
    metadata: {
      algorithmName: "Prim MST",
      category: "Graph",
      inputSize: input.nodes.length,
      eventCount: events.length,
      resultSummary: `MST total weight is ${totalWeight}.`,
    },
  };
}

function traceKmp(input: SequenceInput): Trace {
  validateSequence(input);

  const text = Array.from(input.text);
  const pattern = Array.from(input.pattern);
  const events: TraceEvent[] = [];
  const lps = buildLpsTrace(pattern, events);
  const matches: number[] = [];
  let textIndex = 0;
  let patternIndex = 0;

  while (textIndex < text.length) {
    const matched = text[textIndex] === pattern[patternIndex];
    events.push({
      type: "sequenceCompare",
      textIndex,
      patternIndex,
      matched,
      message: `Compare text[${textIndex}] '${text[textIndex]}' with pattern[${patternIndex}] '${pattern[patternIndex]}'.`,
    });

    if (matched) {
      textIndex += 1;
      patternIndex += 1;

      if (patternIndex === pattern.length) {
        const startIndex = textIndex - pattern.length;
        const endIndex = textIndex - 1;
        matches.push(startIndex);
        events.push({
          type: "sequenceMatch",
          startIndex,
          endIndex,
          message: `Pattern found at text index ${startIndex}.`,
        });
        const fallback = lps[patternIndex - 1];
        events.push({
          type: "sequenceFallback",
          fromPatternIndex: patternIndex,
          toPatternIndex: fallback,
          message: `Resume from prefix length ${fallback}.`,
        });
        patternIndex = fallback;
      }
    } else if (patternIndex !== 0) {
      const fallback = lps[patternIndex - 1];
      events.push({
        type: "sequenceFallback",
        fromPatternIndex: patternIndex,
        toPatternIndex: fallback,
        message: `Mismatch: fall back from pattern index ${patternIndex} to ${fallback}.`,
      });
      patternIndex = fallback;
    } else {
      textIndex += 1;
    }
  }

  return {
    algorithm: "kmp",
    initialState: {
      type: "sequence",
      text: input.text,
      pattern: input.pattern,
      lps: Array(pattern.length).fill(0),
      matches: [],
      matrix: [],
    },
    finalState: {
      type: "sequence",
      text: input.text,
      pattern: input.pattern,
      lps,
      matches,
      matrix: [],
    },
    events,
    metadata: {
      algorithmName: "Knuth-Morris-Pratt",
      category: "Sequence",
      inputSize: text.length,
      eventCount: events.length,
      resultSummary:
        matches.length === 0 ? "No pattern matches found." : `Found ${matches.length} pattern match(es).`,
    },
  };
}

function traceLevenshtein(input: SequenceInput): Trace {
  validateEditDistance(input);

  const source = Array.from(input.text);
  const target = Array.from(input.pattern);
  const rows = source.length + 1;
  const cols = target.length + 1;
  const matrix = initialEditMatrix(rows, cols);
  const events: TraceEvent[] = [];

  for (let row = 1; row < rows; row += 1) {
    for (let col = 1; col < cols; col += 1) {
      const cost = source[row - 1] === target[col - 1] ? 0 : 1;
      const deletion = (matrix[row - 1][col] ?? 0) + 1;
      const insertion = (matrix[row][col - 1] ?? 0) + 1;
      const substitution = (matrix[row - 1][col - 1] ?? 0) + cost;
      const value = Math.min(deletion, insertion, substitution);
      const operation =
        value === substitution && cost === 0
          ? "match"
          : value === substitution
            ? "substitute"
            : value === deletion
              ? "delete"
              : "insert";

      matrix[row][col] = value;
      events.push({
        type: "sequenceEditCell",
        row,
        col,
        deletion,
        insertion,
        substitution,
        value,
        operation,
        matrix: cloneMatrix(matrix),
        message: `Set cell (${row}, ${col}) to ${value} using ${operation}.`,
      });
    }
  }

  const distance = matrix[rows - 1][cols - 1] ?? 0;
  return {
    algorithm: "levenshtein",
    initialState: {
      type: "sequence",
      text: input.text,
      pattern: input.pattern,
      lps: [],
      matches: [],
      matrix: initialEditMatrix(rows, cols),
    },
    finalState: {
      type: "sequence",
      text: input.text,
      pattern: input.pattern,
      lps: [],
      matches: [],
      matrix,
    },
    events,
    metadata: {
      algorithmName: "Levenshtein Distance",
      category: "Sequence",
      inputSize: Math.max(source.length, target.length),
      eventCount: events.length,
      resultSummary: `Edit distance is ${distance}.`,
    },
  };
}

function initialEditMatrix(rows: number, cols: number) {
  const matrix: Array<Array<number | null>> = Array.from({ length: rows }, () => Array(cols).fill(null));
  for (let row = 0; row < rows; row += 1) matrix[row][0] = row;
  for (let col = 0; col < cols; col += 1) matrix[0][col] = col;
  return matrix;
}

function cloneMatrix(matrix: Array<Array<number | null>>) {
  return matrix.map((row) => [...row]);
}

function buildLpsTrace(pattern: string[], events: TraceEvent[]) {
  const lps = Array(pattern.length).fill(0);
  let prefixIndex = 0;
  let patternIndex = 1;

  while (patternIndex < pattern.length) {
    events.push({
      type: "sequenceBuildPrefix",
      patternIndex,
      prefixIndex,
      lps: [...lps],
      message: `Build prefix: compare pattern[${patternIndex}] with pattern[${prefixIndex}].`,
    });

    if (pattern[patternIndex] === pattern[prefixIndex]) {
      prefixIndex += 1;
      lps[patternIndex] = prefixIndex;
      events.push({
        type: "sequenceBuildPrefix",
        patternIndex,
        prefixIndex,
        lps: [...lps],
        message: `Set lps[${patternIndex}] to ${prefixIndex}.`,
      });
      patternIndex += 1;
    } else if (prefixIndex !== 0) {
      const fallback = lps[prefixIndex - 1];
      events.push({
        type: "sequenceFallback",
        fromPatternIndex: prefixIndex,
        toPatternIndex: fallback,
        message: `Prefix mismatch: fall back to prefix length ${fallback}.`,
      });
      prefixIndex = fallback;
    } else {
      lps[patternIndex] = 0;
      events.push({
        type: "sequenceBuildPrefix",
        patternIndex,
        prefixIndex,
        lps: [...lps],
        message: `Set lps[${patternIndex}] to 0.`,
      });
      patternIndex += 1;
    }
  }

  return lps;
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

function validateMstGraph(input: GraphInput) {
  if (input.edges.length === 0) {
    throw new Error("Prim MST requires at least one weighted edge.");
  }
  const directedEdge = input.edges.find((edge) => edge.directed);
  if (directedEdge) {
    throw new Error(`Prim MST requires undirected edges; edge '${directedEdge.id}' is directed.`);
  }
}

function validateSequence(input: SequenceInput) {
  const textLength = Array.from(input.text).length;
  const patternLength = Array.from(input.pattern).length;

  if (textLength === 0) {
    throw new Error("KMP text cannot be empty.");
  }
  if (patternLength === 0) {
    throw new Error("KMP pattern cannot be empty.");
  }
  if (patternLength > textLength) {
    throw new Error("KMP pattern cannot be longer than the text.");
  }
  if (textLength > 160) {
    throw new Error("KMP text is capped at 160 characters for interactive playback.");
  }
  if (patternLength > 48) {
    throw new Error("KMP pattern is capped at 48 characters for interactive playback.");
  }
}

function validateEditDistance(input: SequenceInput) {
  const textLength = Array.from(input.text).length;
  const patternLength = Array.from(input.pattern).length;

  if (textLength === 0) {
    throw new Error("Levenshtein source text cannot be empty.");
  }
  if (patternLength === 0) {
    throw new Error("Levenshtein target text cannot be empty.");
  }
  if (textLength > 24) {
    throw new Error("Levenshtein source text is capped at 24 characters for interactive playback.");
  }
  if (patternLength > 24) {
    throw new Error("Levenshtein target text is capped at 24 characters for interactive playback.");
  }
}

function swap(values: number[], left: number, right: number) {
  const next = values[left];
  values[left] = values[right];
  values[right] = next;
}
