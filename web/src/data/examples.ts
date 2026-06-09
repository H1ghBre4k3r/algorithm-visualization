import type { AlgorithmRequest, AvailableAlgorithmId, GraphInput, SequenceInput, SortInput } from "../types";

export const exampleSortInput: SortInput = {
  values: [42, 12, 77, 18, 93, 31, 64, 5, 56, 29],
};

export const exampleGraphInput: GraphInput = {
  nodes: [
    { id: "A", label: "A", x: 0.13, y: 0.48 },
    { id: "B", label: "B", x: 0.35, y: 0.22 },
    { id: "C", label: "C", x: 0.39, y: 0.72 },
    { id: "D", label: "D", x: 0.62, y: 0.32 },
    { id: "E", label: "E", x: 0.66, y: 0.78 },
    { id: "F", label: "F", x: 0.87, y: 0.53 },
  ],
  edges: [
    { id: "AB", from: "A", to: "B", weight: 4 },
    { id: "AC", from: "A", to: "C", weight: 2 },
    { id: "BC", from: "B", to: "C", weight: 1 },
    { id: "BD", from: "B", to: "D", weight: 5 },
    { id: "CD", from: "C", to: "D", weight: 8 },
    { id: "CE", from: "C", to: "E", weight: 10 },
    { id: "DE", from: "D", to: "E", weight: 2 },
    { id: "DF", from: "D", to: "F", weight: 6 },
    { id: "EF", from: "E", to: "F", weight: 3 },
  ],
  source: "A",
  target: "F",
};

export const exampleSequenceInput: SequenceInput = {
  text: "ababcabcabababd",
  pattern: "ababd",
};

export const exampleEditDistanceInput: SequenceInput = {
  text: "kitten",
  pattern: "sitting",
};

export function exampleRequest(algorithm: AvailableAlgorithmId): AlgorithmRequest {
  if (algorithm === "quicksort") {
    return {
      algorithm,
      inputMode: "example",
      input: { type: "sort", value: structuredClone(exampleSortInput) },
      options: { type: "quicksort", value: { pivotStrategy: "last" } },
    };
  }

  if (algorithm === "kmp") {
    return {
      algorithm,
      inputMode: "example",
      input: { type: "sequence", value: structuredClone(exampleSequenceInput) },
      options: { type: "kmp", value: {} },
    };
  }

  if (algorithm === "levenshtein") {
    return {
      algorithm,
      inputMode: "example",
      input: { type: "sequence", value: structuredClone(exampleEditDistanceInput) },
      options: { type: "levenshtein", value: {} },
    };
  }

  if (algorithm === "bfs") {
    return {
      algorithm,
      inputMode: "example",
      input: { type: "graph", value: structuredClone(exampleGraphInput) },
      options: { type: "bfs", value: { stopAtTarget: true } },
    };
  }

  if (algorithm === "primMst") {
    return {
      algorithm,
      inputMode: "example",
      input: { type: "graph", value: structuredClone(exampleGraphInput) },
      options: { type: "primMst", value: {} },
    };
  }

  return {
    algorithm,
    inputMode: "example",
    input: { type: "graph", value: structuredClone(exampleGraphInput) },
    options: { type: "dijkstra", value: { stopAtTarget: true } },
  };
}

export function customTemplate(algorithm: AvailableAlgorithmId): string {
  const input =
    algorithm === "quicksort"
      ? exampleSortInput
      : algorithm === "kmp"
        ? exampleSequenceInput
        : algorithm === "levenshtein"
          ? exampleEditDistanceInput
          : exampleGraphInput;
  return JSON.stringify(input, null, 2);
}
