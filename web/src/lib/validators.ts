import type {
  AvailableAlgorithmId,
  GraphEdge,
  GraphInput,
  GraphNode,
  InputData,
  SequenceInput,
  SortInput,
} from "../types";

export class InputValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InputValidationError";
  }
}

export function parseCustomInput(algorithm: AvailableAlgorithmId, raw: string): InputData {
  if (algorithm === "quicksort") {
    return { type: "sort", value: parseSortInput(raw) };
  }
  if (algorithm === "kmp") {
    return { type: "sequence", value: parseKmpInput(raw) };
  }
  if (algorithm === "levenshtein") {
    return { type: "sequence", value: parseEditDistanceInput(raw) };
  }
  return { type: "graph", value: parseGraphInput(raw) };
}

export function parseSortInput(raw: string): SortInput {
  const parsed = parseJson(raw);
  const values = Array.isArray(parsed) ? parsed : readRecord(parsed).values;

  if (!Array.isArray(values)) {
    throw new InputValidationError("Quicksort input must be an array or an object with a values array.");
  }
  if (values.length > 128) {
    throw new InputValidationError("Quicksort supports up to 128 values.");
  }

  return {
    values: values.map((value, index) => {
      if (!Number.isFinite(value) || !Number.isInteger(value)) {
        throw new InputValidationError(`Value at index ${index} must be an integer.`);
      }
      return value;
    }),
  };
}

export function parseGraphInput(raw: string): GraphInput {
  const parsed = readRecord(parseJson(raw));
  const nodesRaw = parsed.nodes;
  const edgesRaw = parsed.edges;
  const source = parsed.source;
  const target = parsed.target ?? null;

  if (!Array.isArray(nodesRaw) || nodesRaw.length === 0) {
    throw new InputValidationError("Graph input needs a non-empty nodes array.");
  }
  if (!Array.isArray(edgesRaw)) {
    throw new InputValidationError("Graph input needs an edges array.");
  }
  if (typeof source !== "string" || source.trim() === "") {
    throw new InputValidationError("Graph input needs a source node id.");
  }
  if (target !== null && typeof target !== "string") {
    throw new InputValidationError("Target must be a node id string or null.");
  }

  const nodes = nodesRaw.map(parseNode);
  const nodeIds = new Set<string>();
  for (const node of nodes) {
    if (nodeIds.has(node.id)) {
      throw new InputValidationError(`Duplicate node id '${node.id}'.`);
    }
    nodeIds.add(node.id);
  }
  if (!nodeIds.has(source)) {
    throw new InputValidationError(`Source node '${source}' does not exist.`);
  }
  if (target !== null && !nodeIds.has(target)) {
    throw new InputValidationError(`Target node '${target}' does not exist.`);
  }

  const edgeIds = new Set<string>();
  const edges = edgesRaw.map((value, index) => parseEdge(value, index, nodeIds, edgeIds));

  return {
    nodes,
    edges,
    source,
    target,
  };
}

export function parseKmpInput(raw: string): SequenceInput {
  const parsed = readRecord(parseJson(raw));
  const text = readString(parsed.text, "KMP text");
  const pattern = readString(parsed.pattern, "KMP pattern");
  const textLength = Array.from(text).length;
  const patternLength = Array.from(pattern).length;

  if (patternLength > textLength) {
    throw new InputValidationError("KMP pattern cannot be longer than the text.");
  }
  if (textLength > 160) {
    throw new InputValidationError("KMP text supports up to 160 characters.");
  }
  if (patternLength > 48) {
    throw new InputValidationError("KMP pattern supports up to 48 characters.");
  }

  return { text, pattern };
}

export function parseEditDistanceInput(raw: string): SequenceInput {
  const parsed = readRecord(parseJson(raw));
  const text = readString(parsed.text, "Levenshtein source text");
  const pattern = readString(parsed.pattern, "Levenshtein target text");
  const textLength = Array.from(text).length;
  const patternLength = Array.from(pattern).length;

  if (textLength > 24) {
    throw new InputValidationError("Levenshtein source text supports up to 24 characters.");
  }
  if (patternLength > 24) {
    throw new InputValidationError("Levenshtein target text supports up to 24 characters.");
  }

  return { text, pattern };
}

function parseNode(value: unknown, index: number): GraphNode {
  const node = readRecord(value, `Node ${index}`);
  const id = readString(node.id, `Node ${index} id`);
  const label = typeof node.label === "string" && node.label.trim() !== "" ? node.label : id;
  const x = readUnitNumber(node.x, `Node ${id} x`);
  const y = readUnitNumber(node.y, `Node ${id} y`);

  return { id, label, x, y };
}

function parseEdge(
  value: unknown,
  index: number,
  nodeIds: Set<string>,
  edgeIds: Set<string>,
): GraphEdge {
  const edge = readRecord(value, `Edge ${index}`);
  const id = readString(edge.id, `Edge ${index} id`);
  const from = readString(edge.from, `Edge ${id} from`);
  const to = readString(edge.to, `Edge ${id} to`);
  const weight = edge.weight;

  if (edgeIds.has(id)) {
    throw new InputValidationError(`Duplicate edge id '${id}'.`);
  }
  edgeIds.add(id);
  if (!nodeIds.has(from)) {
    throw new InputValidationError(`Edge '${id}' starts at unknown node '${from}'.`);
  }
  if (!nodeIds.has(to)) {
    throw new InputValidationError(`Edge '${id}' ends at unknown node '${to}'.`);
  }
  if (typeof weight !== "number" || !Number.isFinite(weight) || !Number.isInteger(weight) || weight < 0) {
    throw new InputValidationError(`Edge '${id}' weight must be a non-negative integer.`);
  }

  return {
    id,
    from,
    to,
    weight,
    directed: Boolean(edge.directed),
  };
}

function parseJson(raw: string): unknown {
  try {
    return JSON.parse(raw);
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Invalid JSON.";
    throw new InputValidationError(detail);
  }
}

function readRecord(value: unknown, label = "Input"): Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    throw new InputValidationError(`${label} must be a JSON object.`);
  }
  return value as Record<string, unknown>;
}

function readString(value: unknown, label: string): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new InputValidationError(`${label} must be a non-empty string.`);
  }
  return value;
}

function readUnitNumber(value: unknown, label: string): number {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0 || value > 1) {
    throw new InputValidationError(`${label} must be a number between 0 and 1.`);
  }
  return value;
}
