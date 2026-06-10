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
  if (
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
  ) {
    const input = parseSortInput(raw);
    if (algorithm === "bitonicSort" && !isPowerOfTwo(input.values.length)) {
      throw new InputValidationError("Bitonic Sort needs a power-of-two number of values.");
    }
    return { type: "sort", value: input };
  }
  if (algorithm === "kmp") {
    return { type: "sequence", value: parseKmpInput(raw) };
  }
  if (algorithm === "boyerMoore") {
    return { type: "sequence", value: parseBoyerMooreInput(raw) };
  }
  if (algorithm === "levenshtein") {
    return { type: "sequence", value: parseEditDistanceInput(raw) };
  }
  if (algorithm === "prefixTrie") {
    return { type: "sequence", value: parsePrefixTrieInput(raw) };
  }
  const graphInput = parseGraphInput(raw);
  if (algorithm === "topologicalSort") {
    validateDirectedAcyclicGraph(graphInput);
  }
  return { type: "graph", value: graphInput };
}

export function parseSortInput(raw: string): SortInput {
  const parsed = parseJson(raw);
  const record = Array.isArray(parsed) ? null : readRecord(parsed);
  const values = Array.isArray(parsed) ? parsed : record?.values;

  if (!Array.isArray(values)) {
    throw new InputValidationError("Sort input must be an array or an object with a values array.");
  }
  if (values.length > 128) {
    throw new InputValidationError("Sorting visualizations support up to 128 values.");
  }

  const mappedValues = values.map((value, index) => {
    if (!Number.isFinite(value) || !Number.isInteger(value)) {
      throw new InputValidationError(`Value at index ${index} must be an integer.`);
    }
    return value;
  });

  const targetIndex = record?.targetIndex;
  if (targetIndex === undefined) {
    return { values: mappedValues };
  }
  if (
    typeof targetIndex !== "number" ||
    !Number.isFinite(targetIndex) ||
    !Number.isInteger(targetIndex) ||
    targetIndex < 0 ||
    targetIndex >= mappedValues.length
  ) {
    throw new InputValidationError("targetIndex must be an integer inside the values array.");
  }

  return { values: mappedValues, targetIndex };
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
  return parsePatternSearchInput(raw, "KMP");
}

export function parseBoyerMooreInput(raw: string): SequenceInput {
  return parsePatternSearchInput(raw, "Boyer-Moore");
}

function parsePatternSearchInput(raw: string, label: string): SequenceInput {
  const parsed = readRecord(parseJson(raw));
  const text = readString(parsed.text, `${label} text`);
  const pattern = readString(parsed.pattern, `${label} pattern`);
  const textLength = Array.from(text).length;
  const patternLength = Array.from(pattern).length;

  if (patternLength > textLength) {
    throw new InputValidationError(`${label} pattern cannot be longer than the text.`);
  }
  if (textLength > 160) {
    throw new InputValidationError(`${label} text supports up to 160 characters.`);
  }
  if (patternLength > 48) {
    throw new InputValidationError(`${label} pattern supports up to 48 characters.`);
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

export function parsePrefixTrieInput(raw: string): SequenceInput {
  const parsed = readRecord(parseJson(raw));
  const wordsRaw = parsed.words;

  if (!Array.isArray(wordsRaw) || wordsRaw.length === 0) {
    throw new InputValidationError("Prefix Tree input needs a non-empty words array.");
  }
  if (wordsRaw.length > 24) {
    throw new InputValidationError("Prefix Tree supports up to 24 words.");
  }

  const words = wordsRaw.map((word, index) => {
    if (typeof word !== "string") {
      throw new InputValidationError(`Prefix Tree word at index ${index} must be a string.`);
    }
    if (word.trim() === "") {
      throw new InputValidationError(`Prefix Tree word at index ${index} cannot be empty.`);
    }
    if (Array.from(word).length > 18) {
      throw new InputValidationError(`Prefix Tree word at index ${index} supports up to 18 characters.`);
    }
    return word;
  });

  return { text: "", pattern: "", words };
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

function validateDirectedAcyclicGraph(input: GraphInput) {
  const undirectedEdge = input.edges.find((edge) => !edge.directed);
  if (undirectedEdge) {
    throw new InputValidationError(
      `Topological Sort needs every edge to be directed; edge '${undirectedEdge.id}' is undirected.`,
    );
  }

  const nodeOrder = input.nodes.map((node) => node.id);
  const indegree = new Map(nodeOrder.map((node) => [node, 0]));
  const outgoing = new Map<string, GraphEdge[]>(nodeOrder.map((node) => [node, []]));
  for (const edge of input.edges) {
    indegree.set(edge.to, (indegree.get(edge.to) ?? 0) + 1);
    outgoing.get(edge.from)?.push(edge);
  }

  const queue = nodeOrder.filter((node) => (indegree.get(node) ?? 0) === 0);
  let visited = 0;
  while (queue.length > 0) {
    const node = queue.shift()!;
    visited += 1;
    for (const edge of outgoing.get(node) ?? []) {
      const next = Math.max(0, (indegree.get(edge.to) ?? 0) - 1);
      indegree.set(edge.to, next);
      if (next === 0) {
        queue.push(edge.to);
      }
    }
  }

  if (visited !== nodeOrder.length) {
    throw new InputValidationError("Topological Sort needs an acyclic directed graph.");
  }
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

function isPowerOfTwo(value: number): boolean {
  return value === 0 || (value > 0 && (value & (value - 1)) === 0);
}
