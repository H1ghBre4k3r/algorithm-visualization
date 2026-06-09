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

  if (trace.algorithm === "quicksort" && trace.initialState.type === "array") {
    drawSortTrace(context, width, height, trace, step);
  }

  if (trace.algorithm === "dijkstra" && trace.initialState.type === "graph") {
    drawGraphTrace(context, width, height, trace, step);
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
}

function deriveGraphFrame(trace: Trace, step: number): GraphFrame {
  const distances = new Map<string, number | null>();
  const settled = new Set<string>();
  let activeNode: string | null = null;
  let activeEdgeId: string | null = null;
  let path: string[] = [];

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
    if (event.type === "graphSettle") {
      activeNode = event.node;
      settled.add(event.node);
      distances.set(event.node, event.distance);
    }
    if (event.type === "graphPath") {
      path = event.nodes;
    }
  }

  return { distances, settled, activeNode, activeEdgeId, path };
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
  const active = frame.activeEdgeId === edge.id;
  const lineColor = active ? palette.compare : inPath ? palette.path : "rgba(47, 64, 95, 0.42)";

  context.strokeStyle = lineColor;
  context.lineWidth = active || inPath ? 4 : 2;
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
