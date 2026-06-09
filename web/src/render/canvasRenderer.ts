import type { GraphEdge, GraphNode, Trace, TraceEvent } from "../types";

const palette = {
  ink: "#172033",
  muted: "#667085",
  panel: "#f6f8fb",
  grid: "rgba(23, 32, 51, 0.08)",
  bar: "#4f6f97",
  compare: "#e2a128",
  pivot: "#9b5de5",
  swap: "#e85d75",
  sorted: "#2a9d8f",
  node: "#ffffff",
  nodeBorder: "#2f405f",
  source: "#277da1",
  target: "#f3722c",
  active: "#f9c74f",
  path: "#43aa8b",
};

export function drawTrace(canvas: HTMLCanvasElement, trace: Trace, step: number) {
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(320, Math.floor(rect.width));
  const height = Math.max(260, Math.floor(rect.height));
  const dpr = window.devicePixelRatio || 1;

  if (canvas.width !== Math.floor(width * dpr) || canvas.height !== Math.floor(height * dpr)) {
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
  }

  const context = canvas.getContext("2d");
  if (!context) {
    return;
  }

  context.setTransform(dpr, 0, 0, dpr, 0, 0);
  drawBackground(context, width, height);

  if (
    (trace.algorithm === "quicksort" ||
      trace.algorithm === "insertionSort" ||
      trace.algorithm === "bubbleSort" ||
      trace.algorithm === "mergesort" ||
      trace.algorithm === "heapSort") &&
    trace.initialState.type === "array"
  ) {
    drawSortTrace(context, width, height, trace, step);
  }

  if (
    (trace.algorithm === "bfs" ||
      trace.algorithm === "dfs" ||
      trace.algorithm === "dijkstra" ||
      trace.algorithm === "primMst" ||
      trace.algorithm === "kruskal") &&
    trace.initialState.type === "graph"
  ) {
    drawGraphTrace(context, width, height, trace, step);
  }

  if (trace.algorithm === "kmp" && trace.initialState.type === "sequence") {
    drawSequenceTrace(context, width, height, trace, step);
  }

  if (trace.algorithm === "levenshtein" && trace.initialState.type === "sequence") {
    drawEditDistanceTrace(context, width, height, trace, step);
  }
}

function drawBackground(context: CanvasRenderingContext2D, width: number, height: number) {
  context.fillStyle = palette.panel;
  context.fillRect(0, 0, width, height);
  context.strokeStyle = palette.grid;
  context.lineWidth = 1;

  for (let x = 0; x <= width; x += 32) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, height);
    context.stroke();
  }

  for (let y = 0; y <= height; y += 32) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
  }
}

function drawSortTrace(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  trace: Trace,
  step: number,
) {
  const frame = deriveSortFrame(trace, step);
  const values = frame.values;
  const paddingX = 40;
  const paddingY = 42;
  const chartWidth = width - paddingX * 2;
  const chartHeight = height - paddingY * 2;
  const maxValue = Math.max(1, ...values);
  const minValue = Math.min(0, ...values);
  const range = Math.max(1, maxValue - minValue);
  const gap = Math.max(3, Math.min(10, chartWidth / Math.max(12, values.length) / 5));
  const barWidth = Math.max(6, (chartWidth - gap * (values.length - 1)) / Math.max(1, values.length));

  context.save();
  context.translate(paddingX, paddingY);

  if (frame.range) {
    const [low, high] = frame.range;
    const left = low * (barWidth + gap) - gap * 0.5;
    const right = (high + 1) * (barWidth + gap) - gap * 0.5;
    context.fillStyle = "rgba(155, 93, 229, 0.09)";
    context.fillRect(left, 0, Math.max(0, right - left), chartHeight);
  }

  values.forEach((value, index) => {
    const normalized = (value - minValue) / range;
    const barHeight = Math.max(4, normalized * (chartHeight - 24) + 10);
    const x = index * (barWidth + gap);
    const y = chartHeight - barHeight;
    const role = roleForSortIndex(index, frame);

    context.fillStyle = role;
    roundedRect(context, x, y, barWidth, barHeight, 5);
    context.fill();

    context.fillStyle = palette.ink;
    context.font = barWidth > 22 ? "12px Inter, system-ui, sans-serif" : "10px Inter, system-ui, sans-serif";
    context.textAlign = "center";
    context.fillText(String(value), x + barWidth / 2, y - 8);
  });

  if (frame.boundary !== null) {
    const x = frame.boundary * (barWidth + gap) - gap * 0.5;
    context.strokeStyle = palette.pivot;
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, chartHeight + 10);
    context.stroke();
  }

  context.restore();
}

interface SortFrame {
  values: number[];
  pivot: number | null;
  compared: Set<number>;
  swapped: Set<number>;
  sorted: Set<number>;
  range: [number, number] | null;
  boundary: number | null;
}

function deriveSortFrame(trace: Trace, step: number): SortFrame {
  const values = trace.initialState.type === "array" ? [...trace.initialState.values] : [];
  const sorted = new Set<number>();
  const compared = new Set<number>();
  const swapped = new Set<number>();
  let pivot: number | null = null;
  let range: [number, number] | null = null;
  let boundary: number | null = null;

  for (let index = 0; index < Math.min(step, trace.events.length); index += 1) {
    const event = trace.events[index];
    compared.clear();
    swapped.clear();
    pivot = null;
    boundary = null;

    if (event.type === "sortSwap") {
      values.splice(0, values.length, ...event.values);
      event.indices.forEach((item) => swapped.add(item));
    }
    if (event.type === "sortMarkSorted") {
      event.indices.forEach((item) => sorted.add(item));
    }
    if (event.type === "sortPivot") {
      pivot = event.index;
      range = event.range;
    }
    if (event.type === "sortCompare") {
      event.indices.forEach((item) => compared.add(item));
    }
    if (event.type === "sortPartition") {
      range = event.range;
      boundary = event.boundary;
      compared.add(event.scanner);
    }
  }

  return { values, pivot, compared, swapped, sorted, range, boundary };
}

function roleForSortIndex(index: number, frame: SortFrame) {
  if (frame.swapped.has(index)) return palette.swap;
  if (frame.pivot === index) return palette.pivot;
  if (frame.compared.has(index)) return palette.compare;
  if (frame.sorted.has(index)) return palette.sorted;
  return palette.bar;
}

function drawGraphTrace(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  trace: Trace,
  step: number,
) {
  if (trace.initialState.type !== "graph") {
    return;
  }

  const frame = deriveGraphFrame(trace, step);
  const graph = trace.initialState;
  const padding = Math.max(46, Math.min(width, height) * 0.09);
  const positions = new Map(
    graph.nodes.map((node) => [
      node.id,
      {
        x: padding + node.x * (width - padding * 2),
        y: padding + node.y * (height - padding * 2),
      },
    ]),
  );

  for (const edge of graph.edges) {
    drawEdge(context, edge, positions, frame);
  }

  for (const node of graph.nodes) {
    drawNode(context, node, positions.get(node.id), frame, graph.source, graph.target ?? null);
  }
}

interface GraphFrame {
  distances: Map<string, number | null>;
  settled: Set<string>;
  activeNode: string | null;
  activeEdgeId: string | null;
  path: string[];
  selectedEdges: Set<string>;
}

function deriveGraphFrame(trace: Trace, step: number): GraphFrame {
  const distances = new Map<string, number | null>();
  const settled = new Set<string>();
  let activeNode: string | null = null;
  let activeEdgeId: string | null = null;
  let path: string[] = [];
  const selectedEdges = new Set<string>();

  if (trace.initialState.type === "graph") {
    for (const item of trace.initialState.distances) {
      distances.set(item.node, item.distance);
    }
  }

  for (let index = 0; index < Math.min(step, trace.events.length); index += 1) {
    const event = trace.events[index];
    activeNode = null;
    activeEdgeId = null;

    if (event.type === "graphVisit") {
      activeNode = event.node;
      distances.set(event.node, event.distance);
    }
    if (event.type === "graphRelaxEdge") {
      activeNode = event.to;
      activeEdgeId = event.edgeId;
      distances.set(event.to, event.newDistance);
    }
    if (event.type === "graphConsiderEdge" || event.type === "graphRejectEdge") {
      activeEdgeId = event.edgeId;
    }
    if (event.type === "graphSelectEdge") {
      activeNode = event.to;
      activeEdgeId = event.edgeId;
      selectedEdges.add(event.edgeId);
    }
    if (event.type === "graphSettle") {
      activeNode = event.node;
      settled.add(event.node);
      distances.set(event.node, event.distance);
    }
    if (event.type === "graphPath") {
      path = event.nodes;
    }
    if (event.type === "graphSpanningTree") {
      selectedEdges.clear();
      event.edgeIds.forEach((edge) => selectedEdges.add(edge));
    }
  }

  return { distances, settled, activeNode, activeEdgeId, path, selectedEdges };
}

function drawEdge(
  context: CanvasRenderingContext2D,
  edge: GraphEdge,
  positions: Map<string, { x: number; y: number }>,
  frame: GraphFrame,
) {
  const from = positions.get(edge.from);
  const to = positions.get(edge.to);
  if (!from || !to) return;

  const inPath = isPathEdge(edge, frame.path);
  const selected = frame.selectedEdges.has(edge.id);
  const active = frame.activeEdgeId === edge.id;
  const lineColor = active ? palette.compare : selected || inPath ? palette.path : "rgba(47, 64, 95, 0.42)";

  context.strokeStyle = lineColor;
  context.lineWidth = active || selected || inPath ? 4 : 2;
  context.beginPath();
  context.moveTo(from.x, from.y);
  context.lineTo(to.x, to.y);
  context.stroke();

  if (edge.directed) {
    drawArrowHead(context, from, to, lineColor);
  }

  const labelX = (from.x + to.x) / 2;
  const labelY = (from.y + to.y) / 2;
  context.font = "12px Inter, system-ui, sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  const text = String(edge.weight);
  const metrics = context.measureText(text);
  context.fillStyle = "rgba(255, 255, 255, 0.88)";
  roundedRect(context, labelX - metrics.width / 2 - 7, labelY - 11, metrics.width + 14, 22, 5);
  context.fill();
  context.fillStyle = palette.ink;
  context.fillText(text, labelX, labelY);
}

function drawNode(
  context: CanvasRenderingContext2D,
  node: GraphNode,
  position: { x: number; y: number } | undefined,
  frame: GraphFrame,
  source: string,
  target: string | null,
) {
  if (!position) return;

  const radius = 24;
  const isSource = node.id === source;
  const isTarget = node.id === target;
  const isActive = node.id === frame.activeNode;
  const isSettled = frame.settled.has(node.id);
  const isPath = frame.path.includes(node.id);

  context.fillStyle = isActive
    ? palette.active
    : isPath
      ? palette.path
      : isSource
        ? palette.source
        : isTarget
          ? palette.target
          : isSettled
            ? "#d8e4ec"
            : palette.node;
  context.strokeStyle = isActive || isPath ? palette.ink : palette.nodeBorder;
  context.lineWidth = isActive || isPath ? 3 : 2;
  context.beginPath();
  context.arc(position.x, position.y, radius, 0, Math.PI * 2);
  context.fill();
  context.stroke();

  context.fillStyle = isSource || isTarget || isPath ? "#ffffff" : palette.ink;
  context.font = "700 16px Inter, system-ui, sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(node.label, position.x, position.y - 2);

  const distance = frame.distances.get(node.id);
  context.fillStyle = palette.muted;
  context.font = "12px Inter, system-ui, sans-serif";
  context.fillText(distance === null || distance === undefined ? "inf" : String(distance), position.x, position.y + 36);
}

function isPathEdge(edge: GraphEdge, path: string[]) {
  for (let index = 0; index < path.length - 1; index += 1) {
    const from = path[index];
    const to = path[index + 1];
    if (edge.from === from && edge.to === to) return true;
    if (!edge.directed && edge.from === to && edge.to === from) return true;
  }
  return false;
}

function drawSequenceTrace(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  trace: Trace,
  step: number,
) {
  if (trace.initialState.type !== "sequence") {
    return;
  }

  const frame = deriveSequenceFrame(trace, step);
  const state = trace.initialState;
  const textChars = Array.from(state.text);
  const patternChars = Array.from(state.pattern);
  const paddingX = 38;
  const cellGap = 4;
  const maxCells = Math.max(textChars.length, patternChars.length, frame.lps.length);
  const cellSize = Math.max(22, Math.min(42, (width - paddingX * 2 - cellGap * (maxCells - 1)) / maxCells));
  const startY = Math.max(28, height * 0.16);

  drawSequenceRow(context, {
    label: "Text",
    chars: textChars,
    x: paddingX,
    y: startY,
    cellSize,
    cellGap,
    activeIndex: frame.textIndex,
    matchedIndices: frame.matches.flatMap((match) =>
      Array.from({ length: patternChars.length }, (_, index) => match + index),
    ),
  });

  drawSequenceRow(context, {
    label: "Pattern",
    chars: patternChars,
    x: paddingX,
    y: startY + cellSize + 58,
    cellSize,
    cellGap,
    activeIndex: frame.patternIndex,
    matchedIndices: [],
  });

  drawLpsRow(context, frame.lps, paddingX, startY + (cellSize + 58) * 2, cellSize, cellGap, frame.prefixIndex);

  if (frame.textIndex !== null && frame.patternIndex !== null) {
    const textX = paddingX + frame.textIndex * (cellSize + cellGap) + cellSize / 2;
    const patternX = paddingX + frame.patternIndex * (cellSize + cellGap) + cellSize / 2;
    const textY = startY + cellSize + 10;
    const patternY = startY + cellSize + 48;
    context.strokeStyle = frame.lastMatched === false ? palette.swap : palette.path;
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(textX, textY);
    context.lineTo(patternX, patternY);
    context.stroke();
  }
}

interface SequenceFrame {
  lps: number[];
  textIndex: number | null;
  patternIndex: number | null;
  prefixIndex: number | null;
  matches: number[];
  lastMatched: boolean | null;
}

function deriveSequenceFrame(trace: Trace, step: number): SequenceFrame {
  const lps = trace.initialState.type === "sequence" ? [...trace.initialState.lps] : [];
  let textIndex: number | null = null;
  let patternIndex: number | null = null;
  let prefixIndex: number | null = null;
  let lastMatched: boolean | null = null;
  const matches: number[] = [];

  for (let index = 0; index < Math.min(step, trace.events.length); index += 1) {
    const event = trace.events[index];

    if (event.type === "sequenceBuildPrefix") {
      lps.splice(0, lps.length, ...event.lps);
      patternIndex = event.patternIndex;
      prefixIndex = event.prefixIndex;
      textIndex = null;
      lastMatched = null;
    }
    if (event.type === "sequenceCompare") {
      textIndex = event.textIndex;
      patternIndex = event.patternIndex;
      prefixIndex = null;
      lastMatched = event.matched;
    }
    if (event.type === "sequenceFallback") {
      patternIndex = event.toPatternIndex;
      prefixIndex = event.toPatternIndex;
      lastMatched = false;
    }
    if (event.type === "sequenceMatch") {
      matches.push(event.startIndex);
      textIndex = event.endIndex;
      patternIndex = null;
      prefixIndex = null;
      lastMatched = true;
    }
  }

  return { lps, textIndex, patternIndex, prefixIndex, matches, lastMatched };
}

function drawSequenceRow(
  context: CanvasRenderingContext2D,
  options: {
    label: string;
    chars: string[];
    x: number;
    y: number;
    cellSize: number;
    cellGap: number;
    activeIndex: number | null;
    matchedIndices: number[];
  },
) {
  context.fillStyle = palette.muted;
  context.font = "700 12px Inter, system-ui, sans-serif";
  context.textAlign = "left";
  context.textBaseline = "middle";
  context.fillText(options.label, options.x, options.y - 18);

  const matched = new Set(options.matchedIndices);
  options.chars.forEach((char, index) => {
    const x = options.x + index * (options.cellSize + options.cellGap);
    const isActive = options.activeIndex === index;
    const isMatched = matched.has(index);
    context.fillStyle = isActive ? palette.active : isMatched ? "rgba(67, 170, 139, 0.22)" : "#ffffff";
    context.strokeStyle = isActive ? palette.ink : isMatched ? palette.path : "rgba(47, 64, 95, 0.24)";
    context.lineWidth = isActive ? 2 : 1;
    roundedRect(context, x, options.y, options.cellSize, options.cellSize, 6);
    context.fill();
    context.stroke();

    context.fillStyle = palette.ink;
    context.font = "700 15px Inter, system-ui, sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(char, x + options.cellSize / 2, options.y + options.cellSize / 2);
  });
}

function drawLpsRow(
  context: CanvasRenderingContext2D,
  lps: number[],
  x: number,
  y: number,
  cellSize: number,
  cellGap: number,
  activeIndex: number | null,
) {
  context.fillStyle = palette.muted;
  context.font = "700 12px Inter, system-ui, sans-serif";
  context.textAlign = "left";
  context.textBaseline = "middle";
  context.fillText("LPS", x, y - 18);

  lps.forEach((value, index) => {
    const cellX = x + index * (cellSize + cellGap);
    const isActive = activeIndex === index;
    context.fillStyle = isActive ? "rgba(155, 93, 229, 0.16)" : "#ffffff";
    context.strokeStyle = isActive ? palette.pivot : "rgba(47, 64, 95, 0.24)";
    context.lineWidth = isActive ? 2 : 1;
    roundedRect(context, cellX, y, cellSize, cellSize, 6);
    context.fill();
    context.stroke();

    context.fillStyle = palette.ink;
    context.font = "700 14px Inter, system-ui, sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(String(value), cellX + cellSize / 2, y + cellSize / 2);
  });
}

function drawEditDistanceTrace(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  trace: Trace,
  step: number,
) {
  if (trace.initialState.type !== "sequence") {
    return;
  }

  const frame = deriveEditDistanceFrame(trace, step);
  const source = Array.from(trace.initialState.text);
  const target = Array.from(trace.initialState.pattern);
  const rows = source.length + 1;
  const cols = target.length + 1;
  const paddingX = 52;
  const paddingY = 58;
  const cellGap = 3;
  const cellSize = Math.max(
    24,
    Math.min(46, (Math.min(width - paddingX * 2, height - paddingY * 2) - cellGap * Math.max(rows, cols)) / Math.max(rows, cols)),
  );

  context.fillStyle = palette.muted;
  context.font = "700 12px Inter, system-ui, sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";

  target.forEach((char, index) => {
    context.fillText(char, paddingX + (index + 1) * (cellSize + cellGap) + cellSize / 2, paddingY - 18);
  });
  source.forEach((char, index) => {
    context.fillText(char, paddingX - 18, paddingY + (index + 1) * (cellSize + cellGap) + cellSize / 2);
  });

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = paddingX + col * (cellSize + cellGap);
      const y = paddingY + row * (cellSize + cellGap);
      const active = frame.row === row && frame.col === col;
      const initialized = row === 0 || col === 0;
      context.fillStyle = active ? palette.active : initialized ? "rgba(79, 111, 151, 0.12)" : "#ffffff";
      context.strokeStyle = active ? palette.ink : "rgba(47, 64, 95, 0.22)";
      context.lineWidth = active ? 2 : 1;
      roundedRect(context, x, y, cellSize, cellSize, 6);
      context.fill();
      context.stroke();

      const value = frame.matrix[row]?.[col];
      if (value !== null && value !== undefined) {
        context.fillStyle = palette.ink;
        context.font = "700 14px Inter, system-ui, sans-serif";
        context.fillText(String(value), x + cellSize / 2, y + cellSize / 2);
      }
    }
  }

  if (frame.operation) {
    context.fillStyle = palette.muted;
    context.font = "700 12px Inter, system-ui, sans-serif";
    context.textAlign = "left";
    context.fillText(`operation: ${frame.operation}`, paddingX, paddingY + rows * (cellSize + cellGap) + 24);
  }
}

interface EditDistanceFrame {
  matrix: Array<Array<number | null>>;
  row: number | null;
  col: number | null;
  operation: string | null;
}

function deriveEditDistanceFrame(trace: Trace, step: number): EditDistanceFrame {
  const matrix =
    trace.initialState.type === "sequence"
      ? trace.initialState.matrix.map((row) => [...row])
      : [];
  let row: number | null = null;
  let col: number | null = null;
  let operation: string | null = null;

  for (let index = 0; index < Math.min(step, trace.events.length); index += 1) {
    const event = trace.events[index];
    if (event.type === "sequenceEditCell") {
      matrix.splice(0, matrix.length, ...event.matrix.map((item) => [...item]));
      row = event.row;
      col = event.col;
      operation = event.operation;
    }
  }

  return { matrix, row, col, operation };
}

function drawArrowHead(
  context: CanvasRenderingContext2D,
  from: { x: number; y: number },
  to: { x: number; y: number },
  color: string,
) {
  const angle = Math.atan2(to.y - from.y, to.x - from.x);
  const nodeRadius = 28;
  const tip = {
    x: to.x - Math.cos(angle) * nodeRadius,
    y: to.y - Math.sin(angle) * nodeRadius,
  };

  context.fillStyle = color;
  context.beginPath();
  context.moveTo(tip.x, tip.y);
  context.lineTo(tip.x - Math.cos(angle - Math.PI / 7) * 12, tip.y - Math.sin(angle - Math.PI / 7) * 12);
  context.lineTo(tip.x - Math.cos(angle + Math.PI / 7) * 12, tip.y - Math.sin(angle + Math.PI / 7) * 12);
  context.closePath();
  context.fill();
}

function roundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  const size = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + size, y);
  context.lineTo(x + width - size, y);
  context.quadraticCurveTo(x + width, y, x + width, y + size);
  context.lineTo(x + width, y + height - size);
  context.quadraticCurveTo(x + width, y + height, x + width - size, y + height);
  context.lineTo(x + size, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - size);
  context.lineTo(x, y + size);
  context.quadraticCurveTo(x, y, x + size, y);
  context.closePath();
}
